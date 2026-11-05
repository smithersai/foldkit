import { Effect, Fiber, Stream } from 'effect'
import { TestClock } from 'effect/testing'
import fc from 'fast-check'
import assert from 'node:assert/strict'
import { test } from 'node:test'

import {
  COUNTDOWN_SECONDS,
  PLAYING_SECONDS,
  gameSequence,
} from '../dist/game.js'

const expected = [
  { _tag: 'GetReady' },
  ...Array.from({ length: COUNTDOWN_SECONDS }, (_, index) => ({
    _tag: 'Countdown',
    secondsLeft: COUNTDOWN_SECONDS - index,
  })),
  ...Array.from({ length: PLAYING_SECONDS }, (_, index) => ({
    _tag: 'Playing',
    secondsLeft: PLAYING_SECONDS - index,
  })),
  { _tag: 'Finished' },
]

const collectPrefix = count =>
  Effect.runPromise(
    Effect.gen(function* () {
      const fiber = yield* Effect.forkChild(
        Stream.runCollect(Stream.take(gameSequence, count)),
      )
      yield* TestClock.adjust('1 minute')
      return yield* Fiber.join(fiber)
    }).pipe(Effect.provide(TestClock.layer())),
  )

test('the scheduled game stream preserves status order across independent runs', async () => {
  assert.deepEqual(await collectPrefix(expected.length), expected)
  await fc.assert(
    fc.asyncProperty(
      fc.integer({ min: 0, max: expected.length }),
      async count => {
        const prefix = expected.slice(0, count)
        assert.deepEqual(await collectPrefix(count), prefix)
        assert.deepEqual(await collectPrefix(count), prefix)
      },
    ),
    { seed: 531188, numRuns: 64 },
  )
})
