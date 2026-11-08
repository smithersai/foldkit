import { Duration, Effect } from 'effect'
import { TestClock } from 'effect/testing'
import fc from 'fast-check'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

import { makePreserveScheduler } from './preserveScheduler.vibe'

const corpus: {
  seed: number
  runs: number
  delayMillis: number
  maxEvents: number
} = JSON.parse(
  readFileSync(
    join(
      dirname(fileURLToPath(import.meta.url)),
      'fixtures',
      'foldkit-scoped-fork-programs.json',
    ),
    'utf8',
  ),
)

type Event =
  | Readonly<{ kind: 'schedule'; model: number }>
  | Readonly<{ kind: 'tick'; millis: number }>
  | Readonly<{ kind: 'flush' }>
  | Readonly<{ kind: 'cancel' }>
type Observation = Readonly<{ kind: 'debounce' | 'flush'; model: number }>

const event: fc.Arbitrary<Event> = fc.oneof(
  fc.record({
    kind: fc.constant('schedule'),
    model: fc.integer({ min: -10, max: 10 }),
  }),
  fc.record({
    kind: fc.constant('tick'),
    millis: fc.integer({ min: 0, max: 12 }),
  }),
  fc.constant<Event>({ kind: 'flush' }),
  fc.constant<Event>({ kind: 'cancel' }),
)

const reference = (
  events: ReadonlyArray<Event>,
): ReadonlyArray<ReadonlyArray<Observation>> => {
  let now = 0
  let pending: number | undefined
  let deadline: number | undefined
  const observations: Array<Observation> = []
  return events.map(action => {
    switch (action.kind) {
      case 'schedule':
        pending = action.model
        deadline = now + corpus.delayMillis
        break
      case 'tick':
        now += action.millis
        if (deadline !== undefined && deadline <= now) {
          if (pending !== undefined)
            observations.push({ kind: 'debounce', model: pending })
          pending = undefined
          deadline = undefined
        }
        break
      case 'flush':
        if (pending !== undefined)
          observations.push({ kind: 'flush', model: pending })
        pending = undefined
        break
      case 'cancel':
        pending = undefined
        deadline = undefined
        break
    }
    return [...observations]
  })
}

const compare = async (events: ReadonlyArray<Event>): Promise<void> => {
  const actual: Array<Observation> = []
  const expected = reference(events)
  const schedulerProgram = makePreserveScheduler<number>(
    {
      onDebounce: model =>
        Effect.sync(() => {
          actual.push({ kind: 'debounce', model })
        }),
      onFlush: model =>
        Effect.sync(() => {
          actual.push({ kind: 'flush', model })
        }),
    },
    Duration.millis(corpus.delayMillis),
  )
  expect(Effect.isEffect(schedulerProgram)).toBe(true)
  expect(actual).toEqual([])
  await Effect.runPromise(
    Effect.gen(function* () {
      yield* Effect.scoped(
        Effect.gen(function* () {
          const scheduler = yield* schedulerProgram
          for (const [index, action] of events.entries()) {
            switch (action.kind) {
              case 'schedule':
                yield* scheduler.schedule(action.model)
                break
              case 'tick':
                yield* TestClock.adjust(Duration.millis(action.millis))
                break
              case 'flush':
                yield* scheduler.flush
                break
              case 'cancel':
                yield* scheduler.cancel
                break
            }
            expect(actual).toEqual(expected[index])
          }
        }),
      )
      const atClosure = [...actual]
      yield* TestClock.adjust(Duration.millis(corpus.delayMillis * 2))
      expect(actual).toEqual(atClosure)
    }).pipe(Effect.provide(TestClock.layer())),
  )
}

describe('preservation scheduler program operands', () => {
  it('keeps callback programs cold and clears them at scope closure', () =>
    compare([
      { kind: 'schedule', model: 0 },
      { kind: 'tick', millis: 6 },
      { kind: 'schedule', model: 1 },
      { kind: 'tick', millis: 2 },
      { kind: 'schedule', model: 2 },
      { kind: 'flush' },
      { kind: 'tick', millis: 9 },
      { kind: 'schedule', model: 3 },
      { kind: 'cancel' },
      { kind: 'schedule', model: 4 },
    ]))

  it('matches every generated event prefix and scope teardown', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.array(event, { maxLength: corpus.maxEvents }),
        compare,
      ),
      { seed: corpus.seed, numRuns: corpus.runs },
    )
  }, 30000)
})
