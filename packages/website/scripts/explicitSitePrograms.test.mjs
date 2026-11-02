import { spawnSync } from 'node:child_process'
import {
  cpSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'

const scripts = dirname(fileURLToPath(import.meta.url))
const website = resolve(scripts, '..')
const root = resolve(website, '../..')
const compiler = join(root, 'node_modules/vibelang/native/vibelang')
const corpus = JSON.parse(
  readFileSync(
    join(scripts, 'fixtures/foldkit-playground-held-write.json'),
    'utf8',
  ),
)
const page = readFileSync(join(website, 'src/page/playground.vibe'), 'utf8')
const start = page.indexOf('export const WritePlaygroundFile')
const block = page.slice(start, page.indexOf('\n// UPDATE', start))
const match = /execute:\s*([\s\S]+),\s*\}\)\s*$/.exec(block)
if (!match) throw new Error('WritePlaygroundFile execute callback is missing')
const current = match[1]
const temp = mkdtempSync(join(scripts, '.explicit-site-'))
const source = join(temp, 'source')
const results = join(temp, 'results')
mkdirSync(join(source, 'src'), { recursive: true })
mkdirSync(results, { recursive: true })
const declarations = []
const run = mutant => {
  const args = [join(source, 'verify.mjs')]
  if (mutant) args.push('--mutant')
  const result = spawnSync(process.execPath, args, {
    cwd: source,
    encoding: 'utf8',
    timeout: 30000,
    maxBuffer: 16 * 1024 * 1024,
  })
  expect(result.error, result.stdout + result.stderr).toBeUndefined()
  writeFileSync(
    join(results, mutant ? 'mutant.log' : 'positive.log'),
    (result.stdout ?? '') + (result.stderr ?? ''),
  )
  return result
}
beforeAll(() => {
  expect(current.match(/path !== STYLES_CSS_PATH/g)).toHaveLength(1)
  const mutant = current.replace(
    'path !== STYLES_CSS_PATH',
    'path === STYLES_CSS_PATH',
  )
  for (const [name, extension, execute] of [
    ['original', '.ts', corpus.originalExecute],
    ['native', '.vibe', current],
    ['mutant', '.vibe', mutant],
  ]) {
    writeFileSync(
      join(source, 'src', name + extension),
      corpus.scaffold.replace('__EXECUTE_CALLBACK__', execute),
    )
  }
  writeFileSync(join(source, 'src/context.d.ts'), corpus.context)
  const config = join(source, 'tsconfig.json')
  writeFileSync(
    config,
    JSON.stringify({
      extends: join(website, 'tsconfig.json'),
      files: ['original.ts', 'native.vibe', 'mutant.vibe'].map(file =>
        join(source, 'src', file),
      ),
      include: [],
      exclude: [],
    }),
  )
  const args = [
    '-p',
    config,
    '--singleThreaded',
    '--incremental',
    'false',
    '--composite',
    'false',
    '--pretty',
    'false',
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
    '--rootDir',
    join(source, 'src'),
    '--outDir',
    join(source, '.write-output'),
  ]
  const compiled = spawnSync(compiler, args, {
    cwd: root,
    encoding: 'utf8',
    timeout: 30000,
    maxBuffer: 16 * 1024 * 1024,
    env: { ...process.env, GOMAXPROCS: '2' },
  })
  const text = (compiled.stdout ?? '') + (compiled.stderr ?? '')
  writeFileSync(join(results, 'compile.log'), text)
  expect(compiled.error, text).toBeUndefined()
  expect(compiled.status, text).toBe(0)
  for (const name of ['original', 'native', 'mutant'])
    declarations.push(
      readFileSync(join(source, '.write-output', name + '.d.ts'), 'utf8'),
    )
  writeFileSync(join(source, 'verify.mjs'), verifyScript)
}, 60000)
afterAll(() => {
  if (process.env.FOLDKIT_EXPLICIT_SITE_PROOF_DIR) {
    mkdirSync(process.env.FOLDKIT_EXPLICIT_SITE_PROOF_DIR, { recursive: true })
    cpSync(temp, process.env.FOLDKIT_EXPLICIT_SITE_PROOF_DIR, {
      recursive: true,
    })
  }
  rmSync(temp, { recursive: true, force: true })
})
describe('explicit programs in the website', () => {
  test('marks the template reader as an effect function', () => {
    const source = readFileSync(join(scripts, 'prerender.vibe'), 'utf8')
    expect(source).toMatch(/export const readTemplateFrom\s*=\s*effect\s*\(/)
  })
  test('runs the stored local-calendar program without calling it', () => {
    const source = readFileSync(join(website, 'src/server/flags.vibe'), 'utf8')
    expect(source).toContain('try Calendar.today.local')
    expect(source).not.toMatch(/Calendar\.today\.local\s*\(/)
  })
  test('holds the handled write program in the FiberMap argument', () => {
    expect(current).toMatch(
      /FiberMap\.run\(\s*pendingWrites,\s*path,\s*effect\s*\{/,
    )
  })
  test('retains raw declarations for the original, native and typed mutant', () => {
    expect(new Set(declarations).size).toBe(1)
  })
  test('preserves cold scheduling, cancellation, CSS refresh and failures', () => {
    const result = run(false)
    expect(result.status, result.stdout + result.stderr).toBe(0)
    const line = result.stdout
      .split('\n')
      .find(value => value.startsWith('PLAYGROUND_WRITE_PROPERTY '))
    expect(line).toBeDefined()
    expect(
      JSON.parse(line.slice('PLAYGROUND_WRITE_PROPERTY '.length)),
    ).toMatchObject({
      variant: 'native',
      propertyRuns: 1,
      seed: corpus.seed,
      generatedModels: corpus.numRuns,
      fixedModels: 9,
      comparedModels: 509,
      factories: 2398,
      scheduledRuns: 4738,
      resourceLookups: 4738,
      virtualClock: true,
      comparedToOriginalTypeScript: true,
    })
  })
  test('rejects the compiled wrong-CSS-refresh mutant for its behavior', () => {
    const result = run(true)
    expect(result.status).toBe(1)
    expect(result.stderr).toContain(
      'same delayed-write trace, messages and failure logging',
    )
    const observed = JSON.parse(
      readFileSync(join(source, 'runtime-observation-mutant.json'), 'utf8'),
    )
    expect(observed).toMatchObject({
      variant: 'mutant',
      comparedModels: 0,
      factories: 2,
      scheduledRuns: 2,
      resourceLookups: 2,
    })
  })
})

const verifyScript = String.raw`import assert from 'node:assert/strict'
import fs from 'node:fs'
import fc from 'fast-check'
import { Effect, Exit, FiberMap, Layer, Logger } from 'effect'
import { TestClock } from 'effect/testing'
const variant = process.argv.includes('--mutant') ? 'mutant' : 'native'
const { definition: originalDefinition } = await import('./.write-output/original.js')
const { definition: selectedDefinition } = await import('./.write-output/' + variant + '.js')
const base = { writes: [{ path: 'src/main.ts', content: 'first', repeat: 1 }], failure: 'none', unavailable: false, styles: '@tailwind utilities;' }
const fixed = [
  base,
  { ...base, writes: [{ path: 'src/styles.css', content: 'own styles', repeat: 1 }] },
  ...['write', 'read', 'refresh'].map(failure => ({ ...base, failure })),
  { ...base, unavailable: true },
  { ...base, writes: [{ path: 'src/main.ts', content: 'old', repeat: 1 }, { path: 'src/main.ts', content: 'new', repeat: 1 }] },
  { ...base, writes: [{ path: 'src/main.ts', content: 'repeated', repeat: 3 }] },
  { ...base, writes: [{ path: 'src/first.ts', content: 'A', repeat: 2 }, { path: 'src/second.vibe', content: 'B', repeat: 1 }] },
]
const models = []
let index = 0, scheduledRuns = 0, factories = 0, resourceLookups = 0
process.on('exit', () => fs.writeFileSync(new URL('./runtime-observation-' + variant + '.json', import.meta.url), JSON.stringify({ variant, comparedModels: models.length, factories, scheduledRuns, resourceLookups })))
const normalizeLog = value => typeof value === 'string' ? value : { name: value?.name, message: value?.message, cause: value?.cause === undefined ? undefined : String(value.cause) }
async function observe(definition, input) {
  let phase = 'construction'
  const trace = [], messages = []
  const logger = Logger.make(options => { trace.push(['log', phase, options.logLevel, options.message.map(normalizeLog)]) })
  const program = Effect.scoped(Effect.gen(function* () {
    const pendingWrites = yield* FiberMap.make()
    globalThis.WebContainerPlayground = { get get() {
      resourceLookups++; trace.push(['get', phase])
      return input.unavailable ? Effect.fail({ _tag: 'ResourceNotAvailable' }) : Effect.succeed({
        pendingWrites,
        container: { fs: {
          writeFile(path, content) { trace.push(['write', phase, path, content]); return input.failure === 'write' || input.failure === 'refresh' && path === 'src/styles.css' && content === input.styles ? Promise.reject('write:' + path) : Promise.resolve() },
          readFile(path, encoding) { trace.push(['read', phase, path, encoding]); return input.failure === 'read' ? Promise.reject('read:' + path) : Promise.resolve(input.styles) },
        } },
      })
    } }
    globalThis.Message = { ScheduledWritePlaygroundFile: () => ({ _tag: 'Scheduled' }), FailedWritePlaygroundFile: payload => ({ _tag: 'Failed', ...payload }) }
    for (const write of input.writes) {
      phase = 'construction'
      const count = trace.length, args = { path: write.path, content: write.content }, snapshot = JSON.stringify(args)
      const task = definition.execute(args)
      factories++
      assert.ok(Effect.isEffect(task))
      assert.equal(trace.length, count, 'factory is cold')
      phase = 'schedule'
      for (let n = 0; n < write.repeat; n++) {
        const result = yield* task
        scheduledRuns++
        assert.deepEqual(result, input.unavailable ? { _tag: 'Failed', reason: 'WebContainer not yet ready' } : { _tag: 'Scheduled' })
        messages.push(result)
      }
      assert.equal(JSON.stringify(args), snapshot, 'arguments unchanged')
    }
    assert.equal(trace.filter(event => event[0] === 'write' || event[0] === 'read').length, 0, 'writes wait for the debounce clock')
    phase = 'after-debounce'
    yield* TestClock.adjust(250)
    yield* FiberMap.awaitEmpty(pendingWrites)
    return { trace, messages, finalMapSize: yield* FiberMap.size(pendingWrites) }
  }))
  try { return await Effect.runPromise(Effect.provide(program, Layer.merge(TestClock.layer(), Logger.layer([logger])))) }
  finally { delete globalThis.WebContainerPlayground; delete globalThis.Message }
}
async function compare(input) {
  const expected = await observe(originalDefinition, input)
  const observation = await observe(selectedDefinition, input)
  assert.equal(expected.finalMapSize, 0)
  assert.equal(observation.finalMapSize, 0)
  assert.deepEqual(observation, expected, 'same delayed-write trace, messages and failure logging')
  models.push({ input, original: expected, native: observation }); index++
}
for (const input of fixed) await compare(input)
const write = fc.record({ path: fc.constantFrom('src/main.ts', 'src/styles.css', 'src/App.vibe', 'src/other.ts'), content: fc.string({ maxLength: 20 }), repeat: fc.integer({ min: 1, max: 3 }) })
const model = fc.record({ writes: fc.array(write, { minLength: 1, maxLength: 4 }), failure: fc.constantFrom('none', 'write', 'read', 'refresh'), unavailable: fc.boolean(), styles: fc.string({ maxLength: 20 }) })
await fc.assert(fc.asyncProperty(model, compare), { seed: 5311410, numRuns: 500 })
if (process.env.WRITE_RESULT) fs.writeFileSync(process.env.WRITE_RESULT, JSON.stringify(models))
console.log('PLAYGROUND_WRITE_PROPERTY ' + JSON.stringify({ variant, propertyRuns: 1, seed: 5311410, generatedModels: 500, fixedModels: fixed.length, comparedModels: models.length, factories, scheduledRuns, resourceLookups, virtualClock: true, comparedToOriginalTypeScript: true, logComparison: 'log level, strings and Error name/message/cause; stack paths excluded' }))
`
