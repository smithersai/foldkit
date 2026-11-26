// @vitest-environment happy-dom
import { Effect } from 'effect'
import fc from 'fast-check'
import { toInspectableValue } from 'foldkit/devtools-host'
import { expect, it, vi } from 'vitest'

import corpus from './fixtures/foldkit-overlay-copy.json' with { type: 'json' }
import { CopyPayloadToClipboard } from './overlay.vibe'

it('preserves serialization and clipboard failures over generated payloads', async () => {
  await fc.assert(
    fc.asyncProperty(
      fc.record({
        payload: fc.oneof(fc.jsonValue(), fc.bigInt(), fc.constant(undefined)),
        denied: fc.boolean(),
        targetId: fc.string({ maxLength: 32 }),
        requestId: fc.nat(),
      }),
      async input => {
        const writeText = vi.fn((_text: string) =>
          input.denied
            ? Promise.reject(new Error('Denied'))
            : Promise.resolve(),
        )
        const previous = Object.getOwnPropertyDescriptor(navigator, 'clipboard')
        Object.defineProperty(navigator, 'clipboard', {
          configurable: true,
          value: { writeText },
        })
        try {
          let serialized: string | undefined
          try {
            serialized = JSON.stringify(
              toInspectableValue(input.payload),
              null,
              2,
            )
          } catch {
            serialized = undefined
          }
          const program = CopyPayloadToClipboard({
            targetId: input.targetId,
            requestId: input.requestId,
            payload: input.payload,
          }).effect
          expect(writeText).not.toHaveBeenCalled()
          const result = await Effect.runPromise(program)
          expect(result).toEqual({
            _tag:
              serialized !== undefined && !input.denied
                ? 'SucceededCopyPayloadToClipboard'
                : 'FailedCopyPayloadToClipboard',
            targetId: input.targetId,
            requestId: input.requestId,
          })
          if (serialized === undefined) {
            expect(writeText).not.toHaveBeenCalled()
          } else {
            expect(writeText).toHaveBeenCalledExactlyOnceWith(serialized)
          }
        } finally {
          if (previous) {
            Object.defineProperty(navigator, 'clipboard', previous)
          } else {
            Reflect.deleteProperty(navigator, 'clipboard')
          }
        }
      },
    ),
    { seed: corpus.seed, numRuns: corpus.runs, endOnFailure: true },
  )
})
