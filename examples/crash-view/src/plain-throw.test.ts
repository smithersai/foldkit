import { Cause, Effect, Exit } from 'effect'
import fc from 'fast-check'
import { expect, test } from 'vitest'

import { Message, update } from './main.vibe'

// The unchanged original plain update body is the synchronous behavior oracle.
const originalUpdate = () => {
  throw new Error('This is a simulated crash!')
}

type Action = 'direct' | 'run' | 'build'

const observe = (update: () => unknown, actions: ReadonlyArray<Action>) => {
  let calls = 0
  const errors: Array<unknown> = []
  const invoke = () => {
    calls++
    try {
      return update()
    } catch (error) {
      errors.push(error)
      throw error
    }
  }
  const result = actions.map(action => {
    if (action === 'direct') {
      try {
        invoke()
        return 'returned'
      } catch (error) {
        return error instanceof Error
          ? `${error.name}:${error.message}`
          : 'non-Error'
      }
    }
    const previous = calls
    const program = Effect.sync(invoke)
    expect(calls).toBe(previous)
    if (action === 'build') return 'cold'
    const exit = Effect.runSyncExit(program)
    if (Exit.isFailure(exit)) {
      expect(exit.cause.reasons).toHaveLength(1)
      expect(exit.cause.reasons.every(Cause.isDieReason)).toBe(true)
      return 'defect'
    }
    return 'success'
  })
  expect(new Set(errors).size).toBe(errors.length)
  return { result, calls }
}

test('public update keeps synchronous exceptions and the defect channel', () => {
  fc.assert(
    fc.property(
      fc.array(fc.constantFrom<Action>('direct', 'run', 'build'), {
        maxLength: 30,
      }),
      actions => {
        const original = observe(() => originalUpdate(), actions)
        const native = observe(
          () => update(null, Message.ClickedCrash()),
          actions,
        )
        expect(native).toEqual(original)
      },
    ),
    { seed: 33173, numRuns: 100 },
  )
})
