import { Clock, Duration, Effect, SubscriptionRef } from 'effect'
import fc from 'fast-check'
import { describe, expect, it } from 'vitest'

import { type Bridge, createDevToolsStore } from './store.vibe'

const recordAt = (ticks: ReadonlyArray<bigint>) => {
  let reads = 0
  const readTime = (): bigint => {
    const value = ticks[reads] ?? ticks[ticks.length - 1] ?? 0n
    reads += 1
    return value
  }
  const clock: Clock.Clock = {
    currentTimeMillisUnsafe: () => 0,
    currentTimeMillis: Effect.succeed(0),
    currentTimeNanosUnsafe: () => 0n,
    currentTimeNanos: Effect.succeed(0n),
    monotonicTimeNanosUnsafe: readTime,
    monotonicTimeNanos: Effect.sync(readTime),
    sleep: () => Effect.void,
  }
  const bridge: Bridge = {
    replay: model => model,
    render: () => Effect.void,
    markRenderPending: Effect.void,
  }
  const store = Effect.runSync(createDevToolsStore(bridge))
  expect(reads).toBe(0)
  Effect.runSync(store.recordInit({ count: 0 }, []))
  expect(reads).toBe(0)

  for (let index = 0; index < ticks.length; index += 1) {
    Effect.runSync(
      store
        .recordMessage(
          { _tag: 'RecordedTick' },
          { count: index },
          { count: index + 1 },
          [],
          true,
        )
        .pipe(Effect.provideService(Clock.Clock, clock)),
    )
    expect(reads).toBe(index + 1)
  }

  return Effect.runSync(SubscriptionRef.get(store.stateRef)).entries.map(
    entry => entry.timestamp,
  )
}

describe('DevTools history uses the provided monotonic clock', () => {
  it('reads each timestamp when its Message is recorded', () => {
    const ticks = [1_000_001n, 1_000_002n, 4_000_003n]
    expect(recordAt(ticks)).toEqual(
      ticks.map(tick => Duration.toMillis(Duration.nanos(tick))),
    )
  })

  it('keeps clock reads and history entries aligned across generated sequences', () => {
    fc.assert(
      fc.property(
        fc.array(fc.bigInt({ min: 0n, max: 1_000_000_000_000n }), {
          minLength: 1,
          maxLength: 12,
        }),
        intervals => {
          let elapsed = 0n
          const ticks = intervals.map(interval => {
            elapsed += interval
            return elapsed
          })
          expect(recordAt(ticks)).toEqual(
            ticks.map(tick => Duration.toMillis(Duration.nanos(tick))),
          )
        },
      ),
      { numRuns: 250, seed: 413902 },
    )
  })
})
