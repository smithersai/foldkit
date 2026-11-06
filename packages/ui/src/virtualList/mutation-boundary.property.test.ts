import { Cause, Effect, Exit, Result, Stream } from 'effect'
import fc from 'fast-check'
import * as Mount from 'foldkit/mount'
import { expect, it, vi } from 'vitest'

import examples from './fixtures/foldkit-mutation-observer-failure.json' with { type: 'json' }
import { ObserveVirtualList } from './index.vibe'

it('preserves observer setup defects and releases an acquired mutation observer', async () => {
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
          expect(disconnects).toBe(isConstructorFailure ? 0 : 1)
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
