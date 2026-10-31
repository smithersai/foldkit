import { Effect, Option } from 'effect'
import fc from 'fast-check'
import { describe, expect, it } from 'vitest'

import { when } from './optionExtensions.vibe'

describe('when', () => {
  it('keeps program-valued payloads cold in both dual forms', () => {
    fc.assert(
      fc.property(fc.boolean(), fc.integer(), (condition, value) => {
        let runs = 0
        const program = Effect.sync(() => {
          runs++
          return value
        })
        const curried = when(program)
        const direct = when(condition, program)
        const selected = curried(condition)
        expect(runs).toBe(0)
        expect(Option.isSome(direct)).toBe(condition)
        expect(Option.isSome(selected)).toBe(condition)
        if (Option.isSome(direct) && Option.isSome(selected)) {
          expect(direct.value).toBe(program)
          expect(selected.value).toBe(program)
          expect(Effect.runSync(selected.value)).toBe(value)
          expect(runs).toBe(1)
        }
        expect(Option.isSome(curried(!condition))).toBe(!condition)
        expect(runs).toBe(condition ? 1 : 0)
      }),
      { seed: 33175, numRuns: 250 },
    )
  })

  it('can carry failing and nonterminating programs without executing them', () => {
    const programs = [
      Effect.fail('expected failure'),
      Effect.die(new Error('fixture defect')),
      Effect.never,
    ]
    for (const program of programs) {
      const direct = when(true, program)
      const curried = when(program)
      expect(Option.isSome(direct)).toBe(true)
      if (Option.isSome(direct)) {
        expect(direct.value).toBe(program)
      }
      expect(curried(false)).toEqual(Option.none())
    }
  })
})
