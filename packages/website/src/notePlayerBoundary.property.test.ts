// @vitest-environment node
import { spawnSync } from 'node:child_process'
import { mkdtempSync, rmSync, symlinkSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { expect, test } from 'vitest'

import corpus from './fixtures/foldkit-note-player-native-boundary.json'
import source from './page/home/notePlayerDemo.vibe?raw'

test('keeps note fallback timing and all failure channels during replay', () => {
  const directory = mkdtempSync(join(tmpdir(), 'foldkit-note-boundary-'))
  try {
    symlinkSync(
      join(process.cwd(), 'node_modules'),
      join(directory, 'node_modules'),
    )
    const start = source.lastIndexOf('match (error) {')
    expect(start).toBeGreaterThanOrEqual(0)
    let depth = 0
    let end = start
    for (
      let index = source.indexOf('{', start);
      index < source.length;
      index++
    ) {
      const value = source.charAt(index)
      if (value === '{') depth++
      if (value === '}' && --depth === 0) {
        end = index + 1
        break
      }
    }
    const matchSource = source.slice(start, end)
    expect(matchSource).toContain('ResourceNotAvailable')
    writeFileSync(
      join(directory, 'command.vibe'),
      `
import { defineMessageUnion } from 'foldkit/message'
export const Message = defineMessageUnion({ CompletedPlayNote: { noteIndex: Schema.Number } })
type Failure = { readonly _tag: 'ResourceNotAvailable' } | { readonly _tag: 'Other'; readonly value: unknown }
export const recover = effect (input: unknown!Failure, noteIndex: number, milliseconds: number) => {
  const duration = 'Quarter'
  const DURATION_MILLISECONDS = { Quarter: milliseconds }
  return input catch effect (error) => ` +
        matchSource +
        '\n}\n',
    )
    writeFileSync(join(directory, 'package.json'), '{"type":"module"}')
    writeFileSync(
      join(directory, 'tsconfig.json'),
      JSON.stringify({
        compilerOptions: {
          strict: true,
          skipLibCheck: true,
          module: 'ESNext',
          moduleResolution: 'Bundler',
          target: 'ESNext',
          types: [],
          outDir: '.',
          rewriteRelativeImportExtensions: true,
        },
        files: ['command.vibe'],
      }),
    )
    const compiled = spawnSync(
      join(process.cwd(), 'node_modules/.bin/vibelang'),
      [
        '--singleThreaded',
        '-p',
        join(directory, 'tsconfig.json'),
        '--pretty',
        'false',
      ],
      { encoding: 'utf8', timeout: 30_000 },
    )
    expect(compiled.status, compiled.stdout + compiled.stderr).toBe(0)
    writeFileSync(
      join(directory, 'run.mjs'),
      `
import assert from 'node:assert/strict'
import fc from 'fast-check'
import { Clock, Duration, Effect, Exit } from 'effect'
import { Message, recover } from './command.js'
const baseClock = Effect.runSync(Clock.Clock)
let events = [], expectedMilliseconds = 0, currentDefect, constructorFails = false, expectedIndex = 0
const clock = new Proxy(baseClock, { get(target, key) {
  if (key === 'sleep') return duration => Effect.sync(() => {
    events.push('sleep')
    assert.equal(Duration.toMillis(duration), expectedMilliseconds)
  })
  const value = Reflect.get(target, key, target)
  return typeof value === 'function' ? value.bind(target) : value
}})
const withClock = program => Effect.provideService(program, Clock.Clock, clock)
await Effect.runPromise(withClock(Effect.sleep(Duration.millis(0))))
assert.deepEqual(events, ['sleep'])
const original = Message.CompletedPlayNote
Message.CompletedPlayNote = new Proxy(original, { apply(target, self, args) {
  events.push('construct')
  assert.deepEqual(args, [{ noteIndex: expectedIndex }])
  if (constructorFails) throw currentDefect
  return Reflect.apply(target, self, args)
}})
await fc.assert(fc.asyncProperty(fc.jsonValue(), fc.integer({ min: 0, max: 15 }), fc.integer({ min: 0, max: 10000 }), async (defect, noteIndex, milliseconds) => {
  currentDefect = defect; expectedIndex = noteIndex; expectedMilliseconds = milliseconds
  for (const mode of ['success', 'resource', 'other', 'die', 'interrupt']) {
    for (const fails of [false, true]) {
      events = []; constructorFails = fails
      const unchanged = { unchanged: defect }
      const error = { _tag: mode === 'resource' ? 'ResourceNotAvailable' : 'Other', value: defect }
      const input = mode === 'success' ? Effect.succeed(unchanged) :
        mode === 'resource' || mode === 'other' ? Effect.fail(error) :
        mode === 'die' ? Effect.die(defect) : Effect.interrupt
      const program = withClock(recover(input, noteIndex, milliseconds))
      assert.deepEqual(events, [])
      for (let replay = 1; replay <= 2; replay++) {
        const result = await Effect.runPromiseExit(program)
        assert.deepEqual(events, mode === 'resource' ? Array.from({ length: replay }, () => ['sleep', 'construct']).flat() : [])
        if (mode === 'success' || (mode === 'resource' && !fails)) {
          assert.equal(Exit.isSuccess(result), true)
          if (mode === 'success') assert.equal(result.value, unchanged)
          else assert.deepEqual(result.value, original({ noteIndex }))
        } else {
          assert.equal(Exit.isFailure(result), true)
          const reason = result.cause.reasons[0]
          assert.equal(reason._tag, mode === 'other' ? 'Fail' : mode === 'interrupt' ? 'Interrupt' : 'Die')
          if (mode === 'other') assert.equal(reason.error, error)
          if (mode === 'die' || mode === 'resource') assert.equal(reason.defect, defect)
        }
      }
    }
  }
}), { seed: ${corpus.seed}, numRuns: ${corpus.runs} })
console.log('NOTE_BOUNDARY_PROPERTY 200 models, 4000 exits, exact sleep-before-construction and cold replay')
`,
    )
    const executed = spawnSync(process.execPath, [join(directory, 'run.mjs')], {
      encoding: 'utf8',
      timeout: 20_000,
    })
    expect(executed.status, executed.stdout + executed.stderr).toBe(0)
  } finally {
    rmSync(directory, { recursive: true, force: true })
  }
})
