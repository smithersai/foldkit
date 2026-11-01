import { Effect, Fiber } from 'effect'
import fc from 'fast-check'
import { expect, it, vi } from 'vitest'

import { waitForAnimationSettled } from './waitForAnimation.vibe'

it('preserves the original frame lifetime and HTMLElement filter', async () => {
  await fc.assert(
    fc.asyncProperty(
      fc.constantFrom('html', 'svg', 'missing'),
      fc.boolean(),
      fc.array(fc.boolean(), { maxLength: 8 }),
      async (kind, interruptBeforeFrame, outcomes) => {
        const frames = new Map<number, (time: number) => Promise<void>>()
        let nextFrame = 0
        const cancel = vi.fn((id: number) => frames.delete(id))
        vi.stubGlobal(
          'requestAnimationFrame',
          (callback: FrameRequestCallback) => {
            nextFrame += 1
            frames.set(nextFrame, time => Promise.resolve(callback(time)))
            return nextFrame
          },
        )
        vi.stubGlobal('cancelAnimationFrame', cancel)

        const element =
          kind === 'missing'
            ? undefined
            : kind === 'html'
              ? document.createElement('div')
              : document.createElementNS('http://www.w3.org/2000/svg', 'svg')
        const getAnimations = vi.fn(() =>
          outcomes.map((succeeds, index) => ({
            finished: succeeds
              ? Promise.resolve(index)
              : Promise.reject(new Error('Animation cancelled')),
          })),
        )
        if (element !== undefined) {
          element.id = 'foldkit-animation-lifetime'
          Object.defineProperty(element, 'getAnimations', {
            value: getAnimations,
          })
          document.body.append(element)
        }

        const fiber = Effect.runFork(
          waitForAnimationSettled('#foldkit-animation-lifetime'),
        )
        try {
          await vi.waitFor(() => expect(frames.size).toBe(1))
          if (interruptBeforeFrame) {
            await Effect.runPromise(Fiber.interrupt(fiber))
          }

          // The original callback still runs after caller interruption.
          expect(cancel).not.toHaveBeenCalled()
          expect(frames.size).toBe(1)
          const pending = frames.entries().next().value
          if (pending === undefined) {
            throw new Error('The animation frame was not registered')
          }
          const [id, frame] = pending
          frames.delete(id)
          await frame(0)

          if (!interruptBeforeFrame) {
            await Effect.runPromise(Fiber.join(fiber))
          }
          expect(getAnimations).toHaveBeenCalledTimes(kind === 'html' ? 1 : 0)
          expect(cancel).not.toHaveBeenCalled()
        } finally {
          await Effect.runPromise(Fiber.interrupt(fiber))
          element?.remove()
          vi.unstubAllGlobals()
        }
      },
    ),
    { numRuns: 60, seed: 413904 },
  )
})
