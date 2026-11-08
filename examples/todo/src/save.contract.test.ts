import { Effect } from 'effect'
import * as fc from 'fast-check'
import { expect, test, vi } from 'vitest'

import { persistedTodoCases } from './fixtures/foldkit-todo-save-union'
import { SaveTodos } from './main.vibe'

const todos = fc.oneof(
  fc.constantFrom(...persistedTodoCases),
  fc.array(
    fc.record({
      id: fc.string({ maxLength: 12 }),
      text: fc.string({ maxLength: 80 }),
      completed: fc.boolean(),
      createdAt: fc.integer({ min: 0, max: Number.MAX_SAFE_INTEGER }),
    }),
    { maxLength: 20 },
  ),
)

test('save commands keep both storage outcomes cold and replayable', async () => {
  const storage = globalThis.localStorage
  const originalSetItem = storage.setItem.bind(storage)
  let writes: Array<readonly [string, string]> = []
  let failWrites = false
  const writeSpy = vi
    .spyOn(storage, 'setItem')
    .mockImplementation((key, value) => {
      writes.push([key, value])
      if (failWrites) throw new Error('Storage unavailable')
      originalSetItem(key, value)
    })
  try {
    await fc.assert(
      fc.asyncProperty(todos, fc.boolean(), async (items, shouldFail) => {
        storage.clear()
        writes = []
        failWrites = shouldFail
        const command = SaveTodos({ todos: items })
        expect(writes).toEqual([])
        expect(storage.getItem('todos')).toBeNull()
        const result = await Effect.runPromise(command.effect)
        expect(result._tag).toBe(
          shouldFail ? 'FailedSaveTodos' : 'SucceededSaveTodos',
        )
        expect(writes).toHaveLength(1)
        expect(writes[0]?.[0]).toBe('todos')
        expect(JSON.parse(writes[0]?.[1] ?? '')).toEqual(items)
        if (result._tag === 'SucceededSaveTodos') {
          expect(result.todos).toEqual(items)
          expect(JSON.parse(storage.getItem('todos') ?? '')).toEqual(items)
        } else {
          expect(storage.getItem('todos')).toBeNull()
        }
        expect(await Effect.runPromise(command.effect)).toEqual(result)
        expect(writes).toHaveLength(2)
      }),
      { seed: 1783196, numRuns: 200 },
    )
  } finally {
    writeSpy.mockRestore()
    storage.clear()
  }
})
