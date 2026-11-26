// @vitest-environment node
import { Effect, Exit } from 'effect'
import fc from 'fast-check'
import { expect, test, vi } from 'vitest'

import corpus from './fixtures/foldkit-camera-platform.json'
import { acquireCamera, releaseCamera } from './snippet/camera.platform.ts'

test('camera acquisition preserves constraints, promises and both failure paths', async () => {
  try {
    await fc.assert(
      fc.asyncProperty(
        fc.string(),
        fc.jsonValue(),
        async (facingMode, failure) => {
          const value = { facingMode }
          const promise = Promise.resolve(value)
          const constraints: Array<MediaStreamConstraints> = []
          vi.stubGlobal('navigator', {
            mediaDevices: {
              getUserMedia: (input: MediaStreamConstraints) => {
                constraints.push(input)
                return promise
              },
            },
          })
          const operation = Effect.tryPromise(() => acquireCamera(facingMode))
          expect(constraints).toEqual([])
          const result = await Effect.runPromise(operation)
          expect(result).toBe(value)
          expect(constraints).toEqual([{ video: { facingMode } }])
          expect(acquireCamera(facingMode)).toBe(promise)

          vi.stubGlobal('navigator', {
            mediaDevices: { getUserMedia: () => Promise.reject(failure) },
          })
          await expect(acquireCamera(facingMode)).rejects.toBe(failure)
          vi.stubGlobal('navigator', {
            mediaDevices: {
              getUserMedia: () => {
                throw failure
              },
            },
          })
          let observed: unknown = Symbol('not thrown')
          try {
            acquireCamera(facingMode)
          } catch (error) {
            observed = error
          }
          expect(observed).toBe(failure)
        },
      ),
      { seed: corpus.seed, numRuns: corpus.runs },
    )
  } finally {
    vi.unstubAllGlobals()
  }
})

test('camera release remains cold and stops tracks in their original order', () => {
  fc.assert(
    fc.property(fc.array(fc.integer(), { maxLength: 24 }), ids => {
      let reads = 0
      const stopped: Array<number> = []
      const stream = {
        getTracks: () => {
          reads++
          return ids.map(id => ({
            stop: () => {
              stopped.push(id)
            },
          }))
        },
      }
      const operation = Effect.sync(() => releaseCamera(stream))
      expect(reads).toBe(0)
      expect(stopped).toEqual([])
      expect(Effect.runSyncExit(operation)).toEqual(Exit.void)
      expect(reads).toBe(1)
      expect(stopped).toEqual(ids)
    }),
    { seed: corpus.seed + 1, numRuns: corpus.runs },
  )
})
