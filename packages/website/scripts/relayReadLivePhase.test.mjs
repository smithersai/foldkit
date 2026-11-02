import { Effect, Option } from 'effect'
import fc from 'fast-check'
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { expect, test } from 'vitest'

const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, '../../..')
const ts = createRequire(resolve(root, 'package.json'))('typescript')
const corpus = JSON.parse(
  readFileSync(resolve(here, 'fixtures/foldkit-relay-read-live.json'), 'utf8'),
)

test('alchemy-62 relay reads remain cold and retire stale records on every run', async () => {
  const source = resolve(root, 'packages/devtools-mcp/src/relayRegistry.ts')
  const emitted = ts.transpileModule(readFileSync(source, 'utf8'), {
    compilerOptions: {
      target: ts.ScriptTarget.ES2022,
      module: ts.ModuleKind.ESNext,
    },
  }).outputText
  const syntax = ts.createSourceFile(
    'relayRegistry.js',
    emitted,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.JS,
  )
  let implementation
  const visit = node => {
    if (
      ts.isVariableDeclaration(node) &&
      node.name.getText(syntax) === 'readLiveRecordFile'
    )
      implementation = node.initializer.getText(syntax)
    ts.forEachChild(node, visit)
  }
  visit(syntax)
  expect(implementation).toBeTypeOf('string')
  const run = async (text, model) => {
    const trace = []
    const readRecordFile = () => {
      trace.push('read-call')
      return Effect.sync(() => {
        trace.push('read-run')
        return model.none
          ? Option.none()
          : Option.some({ id: 'sample', pid: model.pid })
      })
    }
    const retireStaleRecord = () => {
      trace.push('retire-call')
      return Effect.sync(() => {
        trace.push('retire-run')
      })
    }
    const read = Function(
      'Effect',
      'Effect_1',
      'Option',
      'Option_1',
      'readRecordFile',
      'retireStaleRecord',
      'isProcessAlive',
      'return (' + text + ')',
    )(
      Effect,
      Effect,
      Option,
      Option,
      readRecordFile,
      retireStaleRecord,
      () => model.alive,
    )
    const program = read('sample')
    const atCall = [...trace]
    const values = []
    for (let i = 0; i < model.runs; i += 1)
      values.push(
        Option.isNone(await Effect.runPromise(program)) ? 'none' : 'some',
      )
    return { atCall, trace, values }
  }
  const generated = fc.sample(
    fc.record({
      none: fc.boolean(),
      alive: fc.boolean(),
      runs: fc.integer({ min: 1, max: 4 }),
      pid: fc.integer({ min: 0, max: 100000 }),
    }),
    { seed: corpus.seed, numRuns: corpus.generatedModels },
  )
  let rejectedMutants = 0
  for (const model of [...corpus.fixedModels, ...generated]) {
    const perRun = [
      'read-call',
      'read-run',
      ...(!model.none && !model.alive ? ['retire-call', 'retire-run'] : []),
    ]
    const expected = {
      atCall: [],
      trace: Array.from({ length: model.runs }, () => perRun).flat(),
      values: Array(model.runs).fill(
        model.none || !model.alive ? 'none' : 'some',
      ),
    }
    expect(await run(implementation, model)).toEqual(expected)
    const mutant = await run(corpus.wrongEmittedFunction, model)
    expect(mutant).not.toEqual(expected)
    rejectedMutants += 1
  }
  expect(rejectedMutants).toBe(
    corpus.generatedModels + corpus.fixedModels.length,
  )
  console.info(
    'RELAY_READ_LIVE_PHASE ' +
      JSON.stringify({
        key: corpus.key,
        seed: corpus.seed,
        models: rejectedMutants,
        runtimeOraclePassed: true,
        wrongCompilerEmissionRejected: rejectedMutants,
      }),
  )
})
