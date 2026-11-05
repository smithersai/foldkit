import { Cause, Effect, Exit } from 'effect'
import * as fc from 'fast-check'
import { Runtime } from 'foldkit'
import { expect, test, vi } from 'vitest'

import {
  type CrashAction,
  crashCallbackActions,
} from './fixtures/foldkit-crash-view-callback'
import { Message, update } from './main.vibe'

vi.mock('foldkit', async importOriginal => {
  const original = await importOriginal<typeof import('foldkit')>()
  return {
    ...original,
    Runtime: {
      ...original.Runtime,
      makeApplication: vi.fn(original.Runtime.makeApplication),
      run: vi.fn(),
    },
  }
})
vi.mock('./rootContainer.ts', () => ({
  getRootContainer: () => document.createElement('div'),
}))

const observe = (
  invoke: () => unknown,
  actions: ReadonlyArray<CrashAction>,
) => {
  let calls = 0
  const errors: Array<unknown> = []
  const call = () => {
    calls++
    try {
      return invoke()
    } catch (error) {
      errors.push(error)
      throw error
    }
  }
  const outcomes = actions.map(action => {
    if (action === 'direct') {
      try {
        call()
        return 'returned'
      } catch (error) {
        return error instanceof Error
          ? error.name + ':' + error.message
          : 'other throw'
      }
    }
    const before = calls
    const program = Effect.sync(call)
    expect(calls).toBe(before)
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
  return { outcomes, calls }
}

test('the configured crash callback retains cold construction and synchronous defects', async () => {
  document.body.innerHTML = '<div id="root"></div><div id="app"></div>'
  await import('./entry.vibe')
  const options = vi.mocked(Runtime.makeApplication).mock.calls[0]?.[0]
  if (options === undefined)
    throw new Error('Application options were not captured')
  expect(vi.mocked(Runtime.run)).toHaveBeenCalledOnce()
  fc.assert(
    fc.property(
      fc.oneof(
        fc.constantFrom(...crashCallbackActions),
        fc.array(fc.constantFrom<CrashAction>('direct', 'build', 'run'), {
          maxLength: 30,
        }),
      ),
      actions => {
        const original = observe(
          () => update(null, Message.ClickedCrash()),
          actions,
        )
        const configured = observe(
          () => options.update(null, Message.ClickedCrash()),
          actions,
        )
        expect(configured).toEqual(original)
      },
    ),
    { seed: 1873200, numRuns: 200 },
  )
})
