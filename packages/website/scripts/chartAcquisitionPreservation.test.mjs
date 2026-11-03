import { Effect, Exit, Fiber, Stream } from 'effect'
import fc from 'fast-check'
import { spawnSync } from 'node:child_process'
import {
  existsSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs'
import { createRequire } from 'node:module'
import { join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { afterAll, beforeAll, expect, test } from 'vitest'

const scripts = import.meta.dirname
const root = resolve(scripts, '../../..')
const website = resolve(scripts, '..')
const ts = createRequire(join(root, 'package.json'))('typescript')
const corpus = JSON.parse(
  readFileSync(
    join(scripts, 'fixtures/foldkit-mount-third-party-chart.json'),
    'utf8',
  ),
)
let temporary
let original
let native
let mutant
let sequence = 0
let mockTemplate

const consumer = (source, name, makeInterruptible = false) => {
  const ast = ts.createSourceFile(
    name,
    source,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.JS,
  )
  const calls = []
  const visit = node => {
    if (
      ts.isCallExpression(node) &&
      ts.isPropertyAccessExpression(node.expression) &&
      node.expression.name.text === 'acquireRelease'
    )
      calls.push(node)
    ts.forEachChild(node, visit)
  }
  visit(ast)
  expect(calls).toHaveLength(1)
  let code = source
  if (makeInterruptible) {
    const call = calls[0]
    const changed = ts.factory.updateCallExpression(
      call,
      call.expression,
      call.typeArguments,
      [
        ...call.arguments.slice(0, 2),
        ts.factory.createObjectLiteralExpression([
          ts.factory.createPropertyAssignment(
            'interruptible',
            ts.factory.createTrue(),
          ),
        ]),
      ],
    )
    code =
      source.slice(0, call.getStart(ast)) +
      ts.createPrinter().printNode(ts.EmitHint.Expression, changed, ast) +
      source.slice(call.end)
  }
  return { code, name }
}

beforeAll(() => {
  temporary = mkdtempSync(join(scripts, '.chart-acquisition-'))
  mockTemplate = `import { appendFileSync, existsSync, writeFileSync } from 'node:fs';
import { setTimeout as delay } from 'node:timers/promises';
const stem = __CHART_CASE_STEM__;
writeFileSync(stem + '.started', '');
while (!existsSync(stem + '.ready')) await delay(1);
export class Chart {
  constructor(_element, { data }) { appendFileSync(stem + '.events', JSON.stringify(['acquire', ...data]) + '\\n'); }
  destroy() { appendFileSync(stem + '.events', JSON.stringify(['release']) + '\\n'); }
}
`
  const config = join(temporary, 'tsconfig.json')
  const out = join(temporary, 'compiled')
  const source = join(website, 'src/snippet/mountThirdPartyChart.vibe')
  writeFileSync(
    config,
    JSON.stringify({
      extends: join(website, 'tsconfig.json'),
      compilerOptions: {
        rootDir: root,
        outDir: out,
        noEmit: false,
        noEmitOnError: false,
        declaration: false,
        composite: false,
        incremental: false,
        singleThreaded: true,
        sourceMap: false,
        inlineSourceMap: false,
      },
      files: [source],
      include: [],
      exclude: [],
    }),
  )
  const result = spawnSync(
    join(root, 'node_modules/vibelang/native/vibelang'),
    ['-p', config, '--singleThreaded', '--pretty', 'false'],
    {
      cwd: root,
      env: { ...process.env, GOMAXPROCS: '2' },
      encoding: 'utf8',
      timeout: 30000,
    },
  )
  expect(result.error, result.stderr).toBeUndefined()
  // The excerpt intentionally omits its chart dependency and Message type.
  // We exercise its real emitted JavaScript, not a standalone-compile claim.
  expect([0, 2], result.stdout + result.stderr).toContain(result.status)
  const emitted = readFileSync(
    join(out, 'packages/website/src/snippet/mountThirdPartyChart.js'),
    'utf8',
  )
  const before = ts.transpileModule(corpus.originalSource, {
    compilerOptions: {
      target: ts.ScriptTarget.ESNext,
      module: ts.ModuleKind.ESNext,
    },
  }).outputText
  original = consumer(before, 'original.mjs')
  native = consumer(emitted, 'native.mjs')
  mutant = consumer(emitted, 'interruptible-mutant.mjs', true)
}, 60000)

afterAll(() => {
  if (temporary) rmSync(temporary, { recursive: true, force: true })
})

const run = async (implementation, data, interrupt) => {
  const id = String(++sequence)
  const stem = join(temporary, 'case-' + id)
  const mock = join(temporary, 'case-' + id + '.chart.mjs')
  writeFileSync(
    mock,
    mockTemplate.replace('__CHART_CASE_STEM__', JSON.stringify(stem)),
  )
  const file = join(temporary, implementation.name + '-' + id + '.mjs')
  const code = implementation.code.replace(
    /import\(['"]some-chart-library['"]\)/g,
    'import(' + JSON.stringify(pathToFileURL(mock).href) + ')',
  )
  expect(code).not.toContain("import('some-chart-library')")
  writeFileSync(file, code + '\nexport { MountChart };\n')
  const mount = (await import(pathToFileURL(file).href)).MountChart

  const events = () =>
    existsSync(stem + '.events')
      ? readFileSync(stem + '.events', 'utf8')
          .trim()
          .split('\n')
          .filter(Boolean)
          .map(line => JSON.parse(line))
      : []
  const fiber = Effect.runFork(
    Effect.scoped(Stream.runHead(mount({ data }).f({}, Stream.never))),
  )
  let finished = false
  const completion = Effect.runPromise(Fiber.await(fiber)).then(exit => {
    finished = true
    return exit
  })
  await Promise.race([
    (async () => {
      while (!existsSync(stem + '.started') && !finished)
        await new Promise(resolve => setTimeout(resolve, 1))
    })(),
    completion.then(exit => {
      throw new Error(
        'Excerpt finished before chart import: ' + JSON.stringify(exit),
      )
    }),
  ])
  if (interrupt) Effect.runFork(Fiber.interrupt(fiber))
  await new Promise(setImmediate)
  await new Promise(setImmediate)
  const beforeRelease = { finished, events: events() }
  writeFileSync(stem + '.ready', '')
  const exit = await completion
  return { beforeRelease, events: events(), interrupted: Exit.isFailure(exit) }
}

test('the native chart excerpt preserves masked acquisition and cleanup', async () => {
  expect(await run(native, [1, 2], true)).toEqual(
    await run(original, [1, 2], true),
  )
})

test('chart acquisition matches the original across cancellation and data models', async () => {
  await fc.assert(
    fc.asyncProperty(
      fc.array(fc.integer({ min: -100, max: 100 }), { maxLength: 8 }),
      fc.boolean(),
      async (data, interrupt) => {
        expect(await run(native, data, interrupt)).toEqual(
          await run(original, data, interrupt),
        )
      },
    ),
    { seed: corpus.seed, numRuns: corpus.numRuns },
  )
}, 20000)

test('the interruptible acquisition mutant is observably different', async () => {
  expect(await run(mutant, [3], true)).not.toEqual(
    await run(original, [3], true),
  )
})
