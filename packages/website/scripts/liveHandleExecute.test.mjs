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

import { declarationContract } from './declarationContract.mjs'

const scripts = dirname(fileURLToPath(import.meta.url))
const website = resolve(scripts, '..')
const root = resolve(website, '../..')
const compiler = join(root, 'node_modules/vibelang/native/vibelang')
const corpus = JSON.parse(
  readFileSync(
    join(scripts, 'fixtures/foldkit-live-handle-execute.json'),
    'utf8',
  ),
)
const fullSource = readFileSync(
  join(website, 'src/snippet/antiPatternLiveHandleGood.vibe'),
  'utf8',
)
const extract = source => {
  const match = /execute:\s*([\s\S]+),\s*\}\)\s*$/.exec(source)
  expect(match, 'the actual Command.define execute callback').not.toBeNull()
  return match[1]
}
const current = extract(fullSource)
const temp = mkdtempSync(join(scripts, '.live-handle-'))
const source = join(temp, 'source')
const results = join(temp, 'results')
mkdirSync(join(source, 'src'), { recursive: true })
mkdirSync(results, { recursive: true })
const compile = (name, path, noEmitOnError = true) => {
  const config = join(temp, name + '.json')
  writeFileSync(
    config,
    JSON.stringify({
      extends: join(website, 'tsconfig.json'),
      files: [path],
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
    '--noEmitOnError',
    String(noEmitOnError),
    '--declaration',
    'true',
    '--declarationMap',
    'false',
    '--sourceMap',
    'false',
    '--rootDir',
    dirname(path),
    '--outDir',
    join(results, name),
  ]
  const result = spawnSync(compiler, args, {
    cwd: root,
    encoding: 'utf8',
    timeout: 30000,
    maxBuffer: 16 * 1024 * 1024,
    env: { ...process.env, GOMAXPROCS: '2' },
  })
  expect(result.error, result.stdout + result.stderr).toBeUndefined()
  const text = (result.stdout ?? '') + (result.stderr ?? '')
  writeFileSync(join(results, name + '.log'), text)
  return { code: result.status, text }
}
const codes = text =>
  [
    ...new Set(
      [...text.matchAll(/\berror ((?:TS|EK)\d+)\b/g)].map(match => match[1]),
    ),
  ].sort()
const run = variant => {
  const args = [join(source, 'verify.mjs')]
  if (variant) args.push('--mutant=' + variant)
  const result = spawnSync(process.execPath, args, {
    cwd: source,
    encoding: 'utf8',
    timeout: 30000,
    maxBuffer: 16 * 1024 * 1024,
  })
  expect(result.error, result.stdout + result.stderr).toBeUndefined()
  writeFileSync(
    join(results, 'node-' + (variant ?? 'positive') + '.log'),
    (result.stdout ?? '') + (result.stderr ?? ''),
  )
  return result
}
const declarations = []
beforeAll(() => {
  const cases = [
    ['original', 'main.ts', corpus.originalExecute],
    ['native', 'candidate.vibe', current],
    [
      'wrong',
      'mutantWrong.vibe',
      current.replace(
        'Message.CompletedSendChatMessage()',
        'Message.FailedSendChatMessage({ error: "__WRONG_SUCCESS__" })',
      ),
    ],
    ['late', 'mutantLate.vibe', corpus.lateGetterExecute],
  ]
  expect(current.match(/Message\.CompletedSendChatMessage\(\)/g)).toHaveLength(
    1,
  )
  for (const [name, file, execute] of cases) {
    const path = join(source, 'src', file)
    writeFileSync(
      path,
      corpus.scaffold.replace('__EXECUTE_CALLBACK__', execute),
    )
    const result = compile(name, path)
    expect(result.code, result.text).toBe(0)
    declarations.push(
      readFileSync(
        join(results, name, file.replace(/\.(?:ts|vibe)$/, '.d.ts')),
        'utf8',
      ),
    )
  }
  writeFileSync(join(source, 'verify.mjs'), verifyScript)
  writeFileSync(
    join(source, 'foldkit-live-handle-execute-corpus.json'),
    JSON.stringify(corpus.cases),
  )
}, 40000)
afterAll(() => {
  if (process.env.FOLDKIT_LIVE_HANDLE_PROOF_DIR) {
    const destination = process.env.FOLDKIT_LIVE_HANDLE_PROOF_DIR
    mkdirSync(destination, { recursive: true })
    cpSync(temp, destination, { recursive: true })
  }
  rmSync(temp, { recursive: true, force: true })
})
describe('native execution in the good managed WebSocket snippet', () => {
  test('uses native sequencing and checked failure handling', () => {
    expect(current).not.toMatch(/\bEffect\.(?:flatMap|match)\s*\(/)
  })
  test('retains program declarations except generated failure metadata', () => {
    const contracts = declarations.map(declarationContract)
    expect(contracts.length).toBeGreaterThan(0)
    for (const contract of contracts) expect(contract).toBe(contracts[0])
  })
  test('preserves eager lookup, cold runs, messages and failure channels', () => {
    const result = run()
    expect(result.status, result.stdout + result.stderr).toBe(0)
    const line = result.stdout
      .split('\n')
      .find(line => line.startsWith('LIVE_HANDLE_PROPERTY '))
    expect(line).toBeDefined()
    const observation = JSON.parse(line.slice('LIVE_HANDLE_PROPERTY '.length))
    expect(observation).toMatchObject({
      propertyRuns: 1,
      seed: corpus.seed,
      generatedModels: corpus.numRuns,
      fixedModels: 12,
      comparedModels: 212,
      factoryCalls: 424,
      programRuns: 1272,
      getterReads: 424,
      eagerGetAtConstruction: true,
      coldExecution: true,
      repeatedRuns: 3,
      exactGetterAndMessageTrace: true,
      checkedFailureAndDefectPreserved: true,
    })
  })
  test('rejects the compiled wrong-success mutant for its result', () => {
    const result = run('wrong')
    expect(result.status).toBe(1)
    expect(result.stderr).toContain('__WRONG_SUCCESS__')
  })
  test('rejects the compiled deferred-getter mutant at construction', () => {
    const result = run('late')
    expect(result.status).toBe(1)
    expect(result.stderr).toContain('construction getter trace')
  })
  test('adds no illustrative-snippet diagnostic family', () => {
    const before = join(source, 'full-before.vibe'),
      after = join(source, 'full-after.vibe')
    writeFileSync(before, corpus.originalFullSource)
    writeFileSync(after, fullSource)
    const a = compile('full-before', before, false),
      b = compile('full-after', after, false)
    const beforeCodes = codes(a.text),
      afterCodes = codes(b.text)
    expect(
      afterCodes.filter(code => !beforeCodes.includes(code)),
      b.text,
    ).toEqual([])
    expect(
      readFileSync(join(results, 'full-after/full-after.d.ts'), 'utf8'),
    ).toBe(readFileSync(join(results, 'full-before/full-before.d.ts'), 'utf8'))
    writeFileSync(
      join(results, 'snippet-diagnostics.json'),
      JSON.stringify({
        beforeExit: a.code,
        afterExit: b.code,
        beforeCodes,
        afterCodes,
        interpretation:
          'Paired illustrative context under accepted foldkit88; retained exits are not standalone compilation claims.',
      }),
    )
  }, 40000)
})

const verifyScript = String.raw`import assert from 'node:assert/strict'
import fs from 'node:fs'
import fc from 'fast-check'
import { Effect } from 'effect'
import { definition as original } from '../results/original/main.js'
import { definition as native } from '../results/native/candidate.js'
const variant = process.argv.find(x => x.startsWith('--mutant='))?.split('=')[1] ?? 'positive'
const selected = variant === 'wrong' ? (await import('../results/wrong/mutantWrong.js')).definition : variant === 'late' ? (await import('../results/late/mutantLate.js')).definition : native
const fixed = JSON.parse(fs.readFileSync(new URL('./foldkit-live-handle-execute-corpus.json', import.meta.url), 'utf8'))
const counts = { comparedModels: 0, factoryCalls: 0, programRuns: 0, getterReads: 0 }
function execute(definition, input) {
  let phase = 'construction'
  const trace = []
  const missing = reason => ({ _tag: 'Missing', reason, toString() { trace.push('stringify:' + phase); return 'missing:' + reason } })
  const socket = { get send() { trace.push('send:lookup:' + phase); return text => { trace.push('send:call:' + phase + ':' + text); if (input.mode === 'sendThrow') throw 'send:' + input.label } } }
  globalThis.ChatSocket = { get get() {
    counts.getterReads++
    trace.push('get:' + phase)
    if (phase !== 'construction') return Effect.fail(missing('late-getter:' + phase))
    return Effect.suspend(() => {
      trace.push('acquire:' + phase)
      if (input.mode === 'checkedFailure') return Effect.fail(missing(input.label))
      if (input.mode === 'defect') return Effect.die('defect:' + input.label)
      return Effect.succeed(socket)
    })
  } }
  globalThis.Message = {
    get CompletedSendChatMessage() { trace.push('message:lookup:complete:' + phase); return () => { trace.push('message:complete:' + phase); return { _tag: 'Completed' } } },
    get FailedSendChatMessage() { trace.push('message:lookup:failed:' + phase); return payload => { trace.push('message:failed:' + phase); return { _tag: 'Failed', error: payload.error } } },
  }
  try {
    const args = { text: input.text }, snapshot = JSON.stringify(args)
    const program = definition.execute(args)
    counts.factoryCalls++
    assert.ok(Effect.isEffect(program), 'factory must return an Effect')
    const construction = [...trace]
    assert.deepEqual(construction, ['get:construction'], 'construction getter trace')
    const exits = []
    for (let n = 1; n <= 3; n++) {
      phase = 'run:' + n
      counts.programRuns++
      exits.push(JSON.parse(JSON.stringify(Effect.runSyncExit(program))))
    }
    assert.equal(JSON.stringify(args), snapshot)
    return { construction, exits, trace }
  } finally { delete globalThis.ChatSocket; delete globalThis.Message }
}
function compare(input) {
  const a = execute(original, input)
  const b = execute(selected, input)
  assert.deepEqual(b.exits, a.exits, 'same outcomes and failure channels')
  assert.deepEqual(b.trace, a.trace, 'same get/send/message/stringify order')
  counts.comparedModels++
}
try {
  for (const input of fixed) compare(input)
  fc.assert(fc.property(fc.record({ mode: fc.constantFrom('success', 'checkedFailure', 'defect', 'sendThrow'), text: fc.string({ maxLength: 30 }), label: fc.string({ maxLength: 12 }) }), compare), { seed: 5311390, numRuns: 200 })
  console.log('LIVE_HANDLE_PROPERTY ' + JSON.stringify({ propertyRuns: 1, seed: 5311390, generatedModels: 200, fixedModels: fixed.length, ...counts, eagerGetAtConstruction: true, coldExecution: true, repeatedRuns: 3, exactGetterAndMessageTrace: true, checkedFailureAndDefectPreserved: true }))
} finally {
  fs.writeFileSync(new URL('../results/runtime-observation-' + variant + '.json', import.meta.url), JSON.stringify({ variant, ...counts }) + '\n')
}
`
