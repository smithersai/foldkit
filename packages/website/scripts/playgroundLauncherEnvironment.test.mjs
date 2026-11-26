// @vitest-environment node
import fc from 'fast-check'
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
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { afterAll, expect, test } from 'vitest'

const scripts = dirname(fileURLToPath(import.meta.url))
const root = resolve(scripts, '../../..')
const fixtures = join(scripts, 'fixtures')
const corpus = JSON.parse(
  readFileSync(
    join(fixtures, 'foldkit-playground-launcher-environment.json'),
    'utf8',
  ),
)
const launcher = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'))
  .scripts['check:playground-ssg-build']
const temporary = mkdtempSync(join(scripts, '.playground-launcher-'))
const project = join(temporary, 'project')
const childDirectory = mkdtempSync(
  join(tmpdir(), 'foldkit-empty-generated-project-'),
)
const output = join(temporary, 'results')
for (const directory of [project, output]) mkdirSync(directory)
const probe = join(project, 'probe.mjs')
writeFileSync(
  probe,
  readFileSync(join(fixtures, 'foldkit-playground-launcher-environment.mjs')),
)
writeFileSync(join(project, 'marker.vibe'), 'export const marker = 42\n')
writeFileSync(
  join(project, 'package.json'),
  JSON.stringify({ private: true, type: 'module' }),
)
writeFileSync(
  join(project, 'tsconfig.json'),
  JSON.stringify({
    compilerOptions: {
      target: 'ES2022',
      module: 'NodeNext',
      moduleResolution: 'NodeNext',
      strict: true,
      skipLibCheck: true,
      types: [],
    },
    files: ['marker.vibe'],
  }),
)
const quote = value => "'" + value.replaceAll("'", "'\\''") + "'"
let attempts = 0
const run = (mode, options, command = launcher) => {
  expect(command.split(corpus.scriptPath)).toHaveLength(2)
  expect(existsSync(join(childDirectory, 'node_modules'))).toBe(false)
  const result = spawnSync(
    '/bin/sh',
    ['-c', command.replace(corpus.scriptPath, quote(probe))],
    {
      cwd: root,
      env: {
        ...process.env,
        NODE_OPTIONS: options,
        FOLDKIT_LAUNCHER_CHILD_MODE: mode,
        FOLDKIT_LAUNCHER_EMPTY_CHILD: childDirectory,
        npm_config_offline: 'true',
        npm_config_update_notifier: 'false',
      },
      encoding: 'utf8',
      timeout: 30000,
      maxBuffer: 2 * 1024 * 1024,
    },
  )
  const label = String(attempts++)
  writeFileSync(
    join(output, label + '.log'),
    (result.stdout ?? '') + (result.stderr ?? ''),
  )
  expect(result.error, result.stdout + result.stderr).toBeUndefined()
  const matches = [
    ...(result.stdout ?? '').matchAll(
      /PLAYGROUND_LAUNCHER_OBSERVATION (\{[^\n]+\})/g,
    ),
  ]
  const observation =
    matches.length === 1 ? JSON.parse(matches[0][1]) : undefined
  return { result, observation }
}
const assertParent = (proof, options) => {
  expect(proof.result.status, proof.result.stdout + proof.result.stderr).toBe(0)
  expect(proof.observation?.marker).toBe(42)
  expect(proof.observation.parentNodeOptions).toBe(options)
  expect(proof.observation.parentExecArgv).toContain(
    '--import=vibelang/register',
  )
  expect(proof.observation.childStatus, proof.observation.childStderr).toBe(0)
}

afterAll(() => {
  try {
    if (process.env.FOLDKIT_PLAYGROUND_LAUNCHER_PROOF_DIR) {
      cpSync(temporary, process.env.FOLDKIT_PLAYGROUND_LAUNCHER_PROOF_DIR, {
        recursive: true,
      })
    }
  } finally {
    rmSync(temporary, { recursive: true, force: true })
    rmSync(childDirectory, { recursive: true, force: true })
  }
})

test('loads native checker code while npm starts in an uninstalled generated project', () => {
  for (const options of corpus.fixedOptions) {
    const proof = run('npm', options)
    assertParent(proof, options)
    expect(proof.observation.childStdout.trim()).toMatch(
      /^\d+\.\d+\.\d+(?:-[\w.-]+)?$/,
    )
  }
  const legacy = run('npm', '', corpus.legacyLauncher)
  expect(
    legacy.observation?.marker,
    legacy.result.stdout + legacy.result.stderr,
  ).toBe(42)
  expect(legacy.observation.childStatus).not.toBe(0)
  expect(legacy.observation.childStderr).toContain('ERR_MODULE_NOT_FOUND')
  expect(legacy.observation.childStderr).toContain('vibelang')
  process.stdout.write(
    'PLAYGROUND_LAUNCHER_FIXED ' +
      JSON.stringify({
        actualNpmChildren: corpus.fixedOptions.length,
        nativeMarker: 42,
        legacyMutantRejected: true,
      }) +
      '\n',
  )
}, 120000)

test('preserves caller Node flags without adding the native loader to child environments', () => {
  let checked = 0
  fc.assert(
    fc.property(
      fc.record({
        noWarnings: fc.boolean(),
        sourceMaps: fc.boolean(),
        stackLimit: fc.integer({ min: 1, max: 50 }),
        heapMegabytes: fc.integer({ min: 192, max: 512 }),
      }),
      model => {
        const options = [
          model.noWarnings ? '--no-warnings' : '',
          model.sourceMaps ? '--enable-source-maps' : '',
          '--stack-trace-limit=' + model.stackLimit,
          '--max-old-space-size=' + model.heapMegabytes,
        ]
          .filter(Boolean)
          .join(' ')
        const proof = run('node', options)
        assertParent(proof, options)
        const child = JSON.parse(proof.observation.childStdout)
        expect(child.nodeOptions).toBe(options)
        expect(
          child.execArgv.some(argument =>
            argument.includes('vibelang/register'),
          ),
        ).toBe(false)
        checked++
      },
    ),
    { seed: corpus.seed, numRuns: corpus.numRuns },
  )
  expect(checked).toBe(corpus.numRuns)
  process.stdout.write(
    'PLAYGROUND_LAUNCHER_PROPERTY ' +
      JSON.stringify({
        seed: corpus.seed,
        checked,
        nativeMarker: 42,
        callerFlagsPreserved: true,
        childLoaderImports: 0,
      }) +
      '\n',
  )
}, 120000)
