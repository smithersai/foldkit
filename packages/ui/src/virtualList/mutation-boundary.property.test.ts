import { Cause, Effect, Exit, Result, Stream } from 'effect'
import fc from 'fast-check'
import * as Mount from 'foldkit/mount'
import { expect, it, vi } from 'vitest'

import examples from './fixtures/foldkit-mutation-observer-failure.json' with { type: 'json' }
import { ObserveVirtualList } from './index.vibe'

it('preserves observer setup defects and original acquisition-failure cleanup', async () => {
  await fc.assert(
    fc.asyncProperty(
      fc.record({
        isConstructorFailure: fc.boolean(),
        fault: fc.anything(),
      }),
      async ({ isConstructorFailure, fault }) => {
        let disconnects = 0

        class ResizeProbe implements ResizeObserver {
          readonly callback: ResizeObserverCallback

          constructor(callback: ResizeObserverCallback) {
            this.callback = callback
          }

          observe(): void {}
          unobserve(): void {}
          disconnect(): void {}
        }

        class MutationProbe implements MutationObserver {
          readonly callback: MutationCallback

          constructor(callback: MutationCallback) {
            this.callback = callback
            if (isConstructorFailure) throw fault
          }

          observe(): void {
            throw fault
          }

          disconnect(): void {
            disconnects += 1
          }

          takeRecords(): MutationRecord[] {
            return []
          }
        }

        vi.stubGlobal('ResizeObserver', ResizeProbe)
        vi.stubGlobal('MutationObserver', MutationProbe)
        const element = document.createElement('div')

        try {
          const exit = await Effect.runPromiseExit(
            Effect.scoped(
              ObserveVirtualList({ id: 'observer-failure-property' })
                .f(element, Mount.liveViewStateChanges)
                .pipe(Stream.runDrain, Effect.timeoutOption('500 millis')),
            ),
          )

          expect(Exit.isFailure(exit)).toBe(true)
          if (Exit.isFailure(exit)) {
            const found = Cause.findDefect(exit.cause)
            expect(Result.isSuccess(found)).toBe(true)
            if (Result.isSuccess(found)) expect(found.success).toBe(fault)
          }
          const actualDisconnects = disconnects
          disconnects = 0
          // The original acquisition returns its cleanup only after observe succeeds.
          const originalExit = await Effect.runPromiseExit(
            Effect.scoped(
              Effect.acquireRelease(
                Effect.sync(() => {
                  const observer = new MutationProbe(() => {})
                  observer.observe()
                  return () => observer.disconnect()
                }),
                cleanup => Effect.sync(cleanup),
              ),
            ),
          )
          expect(Exit.isFailure(originalExit)).toBe(true)
          expect(disconnects).toBe(0)
          expect(actualDisconnects).toBe(disconnects)
        } finally {
          vi.unstubAllGlobals()
        }
      },
    ),
    {
      numRuns: 128,
      examples: examples.map((example): [typeof example] => [example]),
    },
  )
})
