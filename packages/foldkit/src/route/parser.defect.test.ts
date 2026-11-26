import { Effect, Exit } from 'effect'
import fc from 'fast-check'
import { expect, it } from 'vitest'

import { mapTo, root, string } from './parser.vibe'

it('preserves route constructor defect identity for both constructor arities', () => {
  fc.assert(
    fc.property(fc.anything(), fc.string(), (failure, segment) => {
      const fieldless = mapTo({
        make: (): { readonly _tag: 'Route' } => {
          throw failure
        },
      })(root)
      const withField = mapTo({
        make: (_data: {
          readonly segment: string
        }): { readonly _tag: 'Route' } => {
          throw failure
        },
      })(string('segment'))
      for (const program of [fieldless.parse([]), withField.parse([segment])]) {
        const result = Effect.runSyncExit(program)
        expect(result).toEqual(Exit.die(failure))
        if (Exit.isFailure(result)) {
          const [reason] = result.cause.reasons
          expect(reason?._tag).toBe('Die')
          if (reason?._tag === 'Die') expect(reason.defect).toBe(failure)
        }
      }
    }),
    { seed: 184185, numRuns: 200 },
  )
})
