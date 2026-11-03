// @vitest-environment node
import { spawnSync } from 'node:child_process'
import {
  cpSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { afterAll, expect, test } from 'vitest'

const scripts = dirname(fileURLToPath(import.meta.url))
const website = resolve(scripts, '..')
const root = resolve(website, '../..')
const fixtures = join(scripts, 'fixtures')
const nativePath = join(website, 'src/snippet/atomCompareAtomEffect.vibe')
const legacyPath = join(website, 'src/snippet/atomCompareAtomEffect.tsx')
const corpus = JSON.parse(
  readFileSync(join(fixtures, 'foldkit-atom-effect-listener.json'), 'utf8'),
)
const suffix = '\nexport { createTodoAtom, mouseUpAtom, Canvas }\n'
let temporary
let prepared

const prepare = () => {
  if (prepared !== undefined) return prepared
  temporary = mkdtempSync(join(scripts, '.atom-effect-native-'))
  const source = join(temporary, 'source')
  const output = join(temporary, 'results')
  mkdirSync(output, { recursive: true })
  mkdirSync(source, { recursive: true })
  const hasNative = existsSync(nativePath)
  const current = readFileSync(hasNative ? nativePath : legacyPath, 'utf8')
  const original = readFileSync(
    join(fixtures, 'foldkit-atom-effect-listener-original.tsx.txt'),
    'utf8',
  )
  const removedCleanup = hasNative
    ? /get\.addFinalizer\(stop\)/
    : /get\.addFinalizer\(\(\) => window\.removeEventListener\('mouseup', onUp\)\)/
  expect(current.match(removedCleanup)).not.toBeNull()
  const mutant = current.replace(removedCleanup, 'get.addFinalizer(() => {})')
  const run = (name, command, args) => {
    const result = spawnSync(command, args, {
      cwd: source,
      encoding: 'utf8',
      timeout: 120000,
      maxBuffer: 16 * 1024 * 1024,
    })
    writeFileSync(
      join(output, name + '.log'),
      (result.stdout ?? '') + (result.stderr ?? ''),
    )
    expect(result.error, result.stdout + result.stderr).toBeUndefined()
    return result
  }
  writeFileSync(
    join(source, 'package.json'),
    JSON.stringify({ private: true, type: 'module' }),
  )
  writeFileSync(
    join(source, 'context.d.ts'),
    readFileSync(
      join(fixtures, 'foldkit-atom-effect-listener-context.d.ts.txt'),
    ),
  )
  writeFileSync(
    join(source, 'foldkit-atom-effect-listener-runtime.json'),
    JSON.stringify(corpus),
  )
  writeFileSync(
    join(source, 'effect-runtime-probe.mjs'),
    readFileSync(
      join(fixtures, 'foldkit-atom-effect-listener-runtime.mjs.txt'),
    ),
  )
  const compilation = []
  for (const [name, extension, text] of [
    ['original', 'tsx', original],
    ['native', hasNative ? 'vibe' : 'tsx', current],
    ['mutants', hasNative ? 'vibe' : 'tsx', mutant],
  ]) {
    const directory = join(source, 'src', name)
    mkdirSync(directory, { recursive: true })
    const file = join(directory, 'atomCompareAtomEffect.' + extension)
    writeFileSync(file, text + suffix)
    const config = join(source, name + '.json')
    writeFileSync(
      config,
      JSON.stringify({
        compilerOptions: {
          target: 'ES2022',
          module: 'NodeNext',
          moduleResolution: 'NodeNext',
          strict: true,
          skipLibCheck: true,
          jsx: 'react-jsx',
          types: ['react'],
          lib: ['ES2022', 'DOM'],
        },
        files: [file, join(source, 'context.d.ts')],
        include: [],
      }),
    )
    const result = run(
      name + '-compile',
      join(root, 'node_modules/vibelang/native/vibelang'),
      [
        '-p',
        config,
        '--noEmit',
        'false',
        '--noEmitOnError',
        'true',
        '--singleThreaded',
        '--incremental',
        'false',
        '--composite',
        'false',
        '--pretty',
        'false',
        '--declaration',
        'false',
        '--sourceMap',
        'false',
        '--outDir',
        join(source, 'runtime-output', 'atomCompareAtomEffect-' + name),
        '--rootDir',
        directory,
      ],
    )
    compilation.push({
      name,
      exit: result.status,
      diagnostics: result.stdout + result.stderr,
    })
  }
  const allCompile = compilation.every(result => result.exit === 0)
  const positive = allCompile
    ? run('positive', process.execPath, [
        join(source, 'effect-runtime-probe.mjs'),
        'native',
      ])
    : undefined
  const negative = allCompile
    ? run('missing-cancellation-mutant', process.execPath, [
        join(source, 'effect-runtime-probe.mjs'),
        'mutant',
      ])
    : undefined
  prepared = { compilation, positive, negative, hasNative }
  return prepared
}

afterAll(() => {
  if (temporary === undefined) return
  try {
    if (process.env.FOLDKIT_ATOM_EFFECT_PROOF_DIR) {
      cpSync(temporary, process.env.FOLDKIT_ATOM_EFFECT_PROOF_DIR, {
        recursive: true,
      })
    }
  } finally {
    rmSync(temporary, { recursive: true, force: true })
  }
})

test('uses a native explicit atom program without raw window calls', () => {
  expect(existsSync(nativePath)).toBe(true)
  expect(existsSync(legacyPath)).toBe(false)
  const source = readFileSync(nativePath, 'utf8')
  expect(source).not.toMatch(/Effect\.(?:gen|fnUntraced)\b/)
  expect(source).not.toMatch(
    /window\.(?:addEventListener|removeEventListener)\b/,
  )
})

test('preserves the original atom mutation and browser listener lifetimes', () => {
  const proof = prepare()
  for (const result of proof.compilation)
    expect(result.exit, result.diagnostics).toBe(0)
  expect(
    proof.positive?.status,
    proof.positive?.stdout + proof.positive?.stderr,
  ).toBe(0)
  const matches = [
    ...proof.positive.stdout.matchAll(
      /ATOM_EFFECT_LISTENER_RUNTIME (\{[^\n]+\})/g,
    ),
  ]
  expect(matches).toHaveLength(1)
  const observed = JSON.parse(matches[0][1])
  expect(observed.seed).toBe(corpus.seed)
  expect(observed.models).toBe(corpus.numRuns + corpus.fixed.length)
  expect(observed.generatedModels).toBe(corpus.numRuns)
  expect(observed.fixedModels).toBe(corpus.fixed.length)
  expect(observed.realWindowAndAtomRegistry).toBe(true)
  expect(observed.coldConstruction).toBe(true)
  expect(observed.synchronousAndSettledTracesIdentical).toBe(true)
  expect(observed.inputUnchanged).toBe(true)
  process.stdout.write('ATOM_EFFECT_NATIVE ' + JSON.stringify(observed) + '\n')
}, 120000)

test('rejects a compiled atom listener that forgets cancellation', () => {
  const proof = prepare()
  for (const result of proof.compilation)
    expect(result.exit, result.diagnostics).toBe(0)
  expect(
    proof.negative?.status,
    proof.negative?.stdout + proof.negative?.stderr,
  ).toBe(1)
  expect(proof.negative.stderr).toContain('AssertionError')
  expect(proof.negative.stderr).toContain(
    'registry disposal removes every browser listener',
  )
}, 120000)
