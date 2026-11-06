import { Effect, Fiber } from 'effect'
import fc from 'fast-check'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { expect, it, vi } from 'vitest'

import { waitForAnimationSettled } from './waitForAnimation.vibe'

const corpus: { seed: number; numRuns: number } = JSON.parse(
  readFileSync(
    join(
      dirname(fileURLToPath(import.meta.url)),
      'fixtures/foldkit-animation-frame-effect.json',
    ),
    'utf8',
  ),
)

it('uses the frame Effect instead of the retired callback API', () => {
  const source = readFileSync(
    join(dirname(fileURLToPath(import.meta.url)), 'waitForAnimation.vibe'),
    'utf8',
  )
  expect(source).not.toMatch(/\.onNextFrame\s*\(/)
})

it('keeps cold, same-turn registration and detached frame completion', async () => {
  await fc.assert(
    fc.asyncProperty(
      fc.constantFrom('html', 'svg', 'missing'),
      fc.boolean(),
      fc.array(fc.boolean(), { maxLength: 10 }),
      async (kind, interruptBeforeFrame, outcomes) => {
        const frames: FrameRequestCallback[] = []
        const trace: string[] = []
        const cancel = vi.fn()
        vi.stubGlobal(
          'requestAnimationFrame',
          (frame: FrameRequestCallback) => {
            trace.push('register')
            frames.push(frame)
            return frames.length
          },
        )
        vi.stubGlobal('cancelAnimationFrame', cancel)
        const element =
          kind === 'missing'
            ? undefined
            : kind === 'html'
              ? document.createElement('div')
              : document.createElementNS('http://www.w3.org/2000/svg', 'svg')
        const getAnimations = vi.fn(() => {
          trace.push('read')
          return outcomes.map((succeeds, index) => ({
            finished: succeeds
              ? Promise.resolve(index)
              : Promise.reject(new Error('cancelled animation')),
          }))
        })
        if (element !== undefined) {
          element.id = 'foldkit-frame-effect'
          Object.defineProperty(element, 'getAnimations', {
            value: getAnimations,
          })
          document.body.append(element)
        }
        const program = waitForAnimationSettled('#foldkit-frame-effect')
        expect(trace).toEqual([])
        const fiber = Effect.runFork(program)
        try {
          expect(trace).toEqual(['register'])
          expect(getAnimations).not.toHaveBeenCalled()
          if (interruptBeforeFrame)
            await Effect.runPromise(Fiber.interrupt(fiber))
          expect(cancel).not.toHaveBeenCalled()
          const frame = frames[0]
          if (frame === undefined) throw new Error('Missing registered frame')
          frame(0)
          expect(trace).toEqual(
            kind === 'html' ? ['register', 'read'] : ['register'],
          )
          if (!interruptBeforeFrame) await Effect.runPromise(Fiber.join(fiber))
          else await Promise.resolve()
          expect(getAnimations).toHaveBeenCalledTimes(kind === 'html' ? 1 : 0)
          expect(cancel).not.toHaveBeenCalled()
        } finally {
          await Effect.runPromise(Fiber.interrupt(fiber))
          element?.remove()
          vi.unstubAllGlobals()
        }
      },
    ),
    { seed: corpus.seed, numRuns: corpus.numRuns },
  )
})
