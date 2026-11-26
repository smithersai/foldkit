import { Effect, Fiber, Stream } from 'effect'
import fc from 'fast-check'
import { expect, test, vi } from 'vitest'

import corpus from './fixtures/foldkit-drag-and-drop-retired-frame.json' with { type: 'json' }
import { subscriptions } from './index.vibe'

const nextTurn = (): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, 0))

test('auto-scroll owns cold repeated frames, reads current dependencies and cancels on close', async () => {
  await fc.assert(
    fc.asyncProperty(
      fc.boolean(),
      fc.array(fc.integer({ min: -40, max: 900 }), { maxLength: 8 }),
      async (isDragging, positions) => {
        const frames = new Map<number, FrameRequestCallback>()
        const cancelled: Array<number> = []
        const reads: Array<number> = []
        let nextId = 0
        let clientY = 0
        let received = 0
        vi.stubGlobal(
          'requestAnimationFrame',
          (callback: FrameRequestCallback) => {
            nextId += 1
            frames.set(nextId, callback)
            return nextId
          },
        )
        vi.stubGlobal('cancelAnimationFrame', (id: number) => {
          cancelled.push(id)
          frames.delete(id)
        })
        const scroll = vi.spyOn(window, 'scrollBy').mockImplementation(() => {})
        const stream = subscriptions.autoScroll.dependenciesToStream(
          { isDragging, clientY },
          () => {
            reads.push(clientY)
            return { isDragging, clientY }
          },
        )
        expect(frames.size).toBe(0)
        expect(reads).toEqual([])
        expect(scroll).not.toHaveBeenCalled()
        const fiber = Effect.runFork(
          Stream.runForEach(stream, () =>
            Effect.sync(() => {
              received += 1
            }),
          ),
        )
        try {
          await nextTurn()
          expect(frames.size).toBe(isDragging ? 1 : 0)
          expect(received).toBe(0)
          expect(reads).toEqual([])
          if (isDragging) {
            const delivered: Array<number> = []
            for (const position of positions) {
              clientY = position
              const next = frames.entries().next().value
              expect(next).toBeDefined()
              if (next === undefined) throw new Error('Missing requested frame')
              const [id, callback] = next
              frames.delete(id)
              delivered.push(position)
              callback(delivered.length * 16)
              await nextTurn()
              expect(received).toBe(delivered.length)
              expect(reads).toEqual(delivered)
              expect(frames.size).toBe(1)
            }
          }
          const pending = frames.entries().next().value
          await Effect.runPromise(Fiber.interrupt(fiber))
          expect(frames.size).toBe(0)
          const completed = received
          if (pending !== undefined) {
            const [id, callback] = pending
            expect(cancelled).toContain(id)
            callback(1000)
          } else {
            expect(cancelled).toEqual([])
          }
          await nextTurn()
          expect(received).toBe(completed)
        } finally {
          await Effect.runPromise(Fiber.interrupt(fiber))
          vi.restoreAllMocks()
          vi.unstubAllGlobals()
        }
      },
    ),
    { seed: corpus.seed, numRuns: corpus.runs },
  )
}, 30_000)
