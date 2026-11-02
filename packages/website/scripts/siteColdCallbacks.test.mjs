import { Effect } from 'effect'
import fc from 'fast-check'
import { spawnSync } from 'node:child_process'
import {
  cpSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  realpathSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from 'node:fs'
import { createRequire } from 'node:module'
import { tmpdir } from 'node:os'
import { dirname, join, relative, resolve, sep } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'

const scripts = dirname(fileURLToPath(import.meta.url))
const website = resolve(scripts, '..')
const root = resolve(website, '../..')
const compiler = join(root, 'node_modules/vibelang/native/vibelang')
const ts = createRequire(join(root, 'package.json'))('typescript')
const corpus = JSON.parse(
  readFileSync(
    join(scripts, 'fixtures/foldkit-website-cold-callbacks.json'),
    'utf8',
  ),
)
const temporary = []
const directory = (outsideSource = false) => {
  const value = mkdtempSync(
    join(outsideSource ? tmpdir() : scripts, '.site-callbacks-'),
  )
  temporary.push(value)
  return value
}
const compile = args => {
  const result = spawnSync(
    compiler,
    [
      '--singleThreaded',
      '--incremental',
      'false',
      '--composite',
      'false',
      '--pretty',
      'false',
      ...args,
    ],
    {
      cwd: root,
      env: { ...process.env, GOMAXPROCS: '2' },
      encoding: 'utf8',
      timeout: 30000,
      maxBuffer: 16 * 1024 * 1024,
    },
  )
  expect(
    result.error,
    (result.stdout ?? '') + (result.stderr ?? ''),
  ).toBeUndefined()
  expect(result.status, (result.stdout ?? '') + (result.stderr ?? '')).toBe(0)
  return (result.stdout ?? '') + (result.stderr ?? '')
}
const config = (path, files, rootDir = path) => {
  const file = join(path, 'tsconfig.json')
  writeFileSync(
    file,
    JSON.stringify({
      extends: join(website, 'tsconfig.json'),
      compilerOptions: { rootDir },
      files,
      include: [],
      exclude: [],
    }),
  )
  return file
}
afterAll(() => {
  for (const value of temporary) rmSync(value, { recursive: true, force: true })
})
const mirrorDependencies = (source, destination, copiedRoot) => {
  mkdirSync(destination, { recursive: true })
  for (const entry of readdirSync(source, { withFileTypes: true })) {
    const actual = join(source, entry.name)
    const target = join(destination, entry.name)
    if (
      entry.name.startsWith('@') &&
      entry.isDirectory() &&
      !entry.isSymbolicLink()
    ) {
      mirrorDependencies(actual, target, copiedRoot)
    } else {
      const resolved = realpathSync(actual)
      const local = relative(root, resolved)
      const workspace =
        !local.startsWith('..') && !local.split(sep).includes('node_modules')
      symlinkSync(
        workspace ? join(copiedRoot, local) : resolved,
        target,
        entry.isDirectory() ? 'dir' : undefined,
      )
    }
  }
}
describe('site callbacks have completed the official VIP-only migration', () => {
  let before
  let after
  beforeAll(() => {
    const path = directory(true)
    const copied = join(path, 'source')
    const omit = new Set([
      'node_modules',
      '.git',
      '.jj',
      '.vibelang-toolchain',
      'coverage',
      'test-results',
      'playwright-report',
    ])
    cpSync(root, copied, {
      recursive: true,
      filter: source => {
        const parts = relative(root, source).split(sep)
        return !parts.some(
          part => omit.has(part) || part.startsWith('.site-callbacks-'),
        )
      },
    })
    const visit = destination => {
      if (existsSync(join(destination, 'package.json'))) {
        const actual = join(root, relative(copied, destination), 'node_modules')
        if (existsSync(actual))
          mirrorDependencies(actual, join(destination, 'node_modules'), copied)
      }
      for (const entry of readdirSync(destination, { withFileTypes: true })) {
        if (entry.isDirectory() && entry.name !== 'node_modules')
          visit(join(destination, entry.name))
      }
    }
    visit(copied)
    before = Object.fromEntries(
      corpus.files.map(file => [
        file,
        readFileSync(join(copied, file), 'utf8'),
      ]),
    )
    const project = config(
      copied,
      [
        ...corpus.files.map(file => join(copied, file)),
        join(copied, 'packages/website/src/vite-env.d.ts'),
      ],
      copied,
    )
    compile(['-p', project, '--fix', '--fix-vip-only', '--noEmit'])
    after = Object.fromEntries(
      corpus.files.map(file => [
        file,
        readFileSync(join(copied, file), 'utf8'),
      ]),
    )
    for (const file of corpus.files)
      expect(readFileSync(join(root, file), 'utf8')).toBe(before[file])
  }, 60000)
  test.each(corpus.files)(
    '%s needs no further official VIP-only source rewrite',
    file => {
      expect(after[file]).toBe(before[file])
    },
  )
})

const flags =
  ts.NodeFlags.Const |
  ts.NodeFlags.Let |
  ts.NodeFlags.Using |
  ts.NodeFlags.AwaitUsing
const shape = node => {
  const children = []
  ts.forEachChild(node, child => {
    children.push(shape(child))
  })
  const value = { kind: node.kind, children }
  if (node.flags & flags) value.flags = node.flags & flags
  if (typeof node.text === 'string' && node.kind !== ts.SyntaxKind.SourceFile)
    value.text = node.text
  if (typeof node.rawText === 'string') value.rawText = node.rawText
  return value
}
const javascript = file => {
  const sf = ts.createSourceFile(
    file,
    readFileSync(file, 'utf8'),
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.JS,
  )
  expect(sf.parseDiagnostics).toEqual([])
  return shape(sf)
}
const program = (model, native) =>
  [
    'export type Page = { close: () => Promise<number> }',
    'export type Args = { element: { readonly scrollHeight: number }; snippetId: string }',
    'export const cleanup = ' +
      (native ? 'effect ' : '') +
      '(page: Page) => ' +
      (native ? 'try ' : '') +
      'Effect.promise(() => page.close())',
    'export const execute = ' +
      (native ? 'effect ' : '') +
      '({ element, snippetId }: Args) => ' +
      (native ? 'try ' : '') +
      'Effect.sync(() => ({ snippetId, size: element.scrollHeight > ' +
      model.threshold +
      ' ? "Overflows" : "Fits" }))',
  ].join('\n') + '\n'

test('explicit-effects callbacks preserve TypeScript declarations and cold call phases', async () => {
  const model = fc.record({
    value: fc.integer({ min: -1000, max: 1000 }),
    threshold: fc.integer({ min: -100, max: 1000 }),
    height: fc.integer({ min: -200, max: 2000 }),
    nextHeight: fc.integer({ min: -200, max: 2000 }),
    snippetId: fc.string({ maxLength: 24 }),
  })
  await fc.assert(
    fc.asyncProperty(
      fc.array(model, {
        minLength: corpus.generatedModels,
        maxLength: corpus.generatedModels,
      }),
      async generated => {
        const models = [...corpus.fixedModels, ...generated]
        const path = directory()
        const outputs = {}
        for (const side of ['typescript', 'native']) {
          const source = join(path, side)
          mkdirSync(source)
          const files = models.map((value, index) => {
            const file = join(
              source,
              'case_' + index + (side === 'native' ? '.vibe' : '.ts'),
            )
            writeFileSync(
              file,
              'import { Effect } from "effect"\n' +
                program(value, side === 'native'),
            )
            return file
          })
          const project = config(source, files, path)
          outputs[side] = join(path, 'emit-' + side)
          compile([
            '-p',
            project,
            '--noEmit',
            'false',
            '--declaration',
            'true',
            '--declarationMap',
            'false',
            '--sourceMap',
            'false',
            '--rewriteRelativeImportExtensions',
            'true',
            '--outDir',
            outputs[side],
          ])
        }
        let runs = 0
        for (let index = 0; index < models.length; index += 1) {
          const value = models[index]
          const before = join(outputs.typescript, 'typescript', 'case_' + index)
          const after = join(outputs.native, 'native', 'case_' + index)
          expect(readFileSync(after + '.d.ts')).toEqual(
            readFileSync(before + '.d.ts'),
          )
          const callbacks = await import(pathToFileURL(after + '.js').href)
          const trace = []
          const cleanup = callbacks.cleanup({
            close: () => {
              trace.push('close')
              return Promise.resolve(value.value)
            },
          })
          expect(trace).toEqual([])
          expect(await Effect.runPromise(cleanup)).toBe(value.value)
          expect(await Effect.runPromise(cleanup)).toBe(value.value)
          expect(trace).toEqual(['close', 'close'])
          let reads = 0
          let height = value.height
          const execute = callbacks.execute({
            element: {
              get scrollHeight() {
                reads += 1
                return height
              },
            },
            snippetId: value.snippetId,
          })
          expect(reads).toBe(0)
          expect(await Effect.runPromise(execute)).toEqual({
            snippetId: value.snippetId,
            size: height > value.threshold ? 'Overflows' : 'Fits',
          })
          height = value.nextHeight
          expect(await Effect.runPromise(execute)).toEqual({
            snippetId: value.snippetId,
            size: height > value.threshold ? 'Overflows' : 'Fits',
          })
          expect(reads).toBe(2)
          runs += 4
        }
        const mutant = join(path, 'mutant')
        mkdirSync(mutant)
        const model = corpus.fixedModels[0]
        const eager =
          'export const execute = ({ element, snippetId }: Args): infer _ => { const height = element.scrollHeight; return effect { return { snippetId, size: height > ' +
          model.threshold +
          ' ? "Overflows" : "Fits" } } }'
        const text = program(model, true)
          .split('\n')
          .map(line =>
            line.startsWith('export const execute = ') ? eager : line,
          )
          .join('\n')
        const file = join(mutant, 'main.vibe')
        writeFileSync(file, text)
        const mutantOutput = join(path, 'emit-mutant')
        compile([
          '-p',
          config(mutant, [file], path),
          '--noEmit',
          'false',
          '--declaration',
          'true',
          '--declarationMap',
          'false',
          '--sourceMap',
          'false',
          '--rewriteRelativeImportExtensions',
          'true',
          '--outDir',
          mutantOutput,
        ])
        const mutated = await import(
          pathToFileURL(join(mutantOutput, 'mutant/main.js')).href
        )
        let eagerReads = 0
        const eagerProgram = mutated.execute({
          element: {
            get scrollHeight() {
              eagerReads += 1
              return model.height
            },
          },
          snippetId: model.snippetId,
        })
        expect(eagerReads === 0).toBe(false)
        expect(eagerReads).toBe(1)
        expect(javascript(join(mutantOutput, 'mutant/main.js'))).not.toEqual(
          javascript(join(outputs.native, 'native/case_0.js')),
        )
        await Effect.runPromise(eagerProgram)
        expect(eagerReads).toBe(1)
        console.info(
          'SITE_COLD_CALLBACKS ' +
            JSON.stringify({
              seed: corpus.seed,
              propertyRuns: 1,
              generatedModels: generated.length,
              corpusModels: corpus.fixedModels.length,
              compared: models.length,
              actualRuntimeRuns: runs,
              declarationsRawIdentical: true,
              explicitEffectsAgainstTypeScriptDeclarations: true,
              coldConstructionAndRepeatedRuns: true,
              validTypedEagerMutantRejected: true,
            }),
        )
      },
    ),
    { seed: corpus.seed, numRuns: 1, endOnFailure: true },
  )
}, 90000)
