import { Effect, Option } from 'effect'
import fc from 'fast-check'
import { afterEach, beforeEach, expect, test, vi } from 'vitest'

import { SESSION_STORAGE_KEY } from './constant'
import { flags } from './main.vibe'

const memoryStorage = (rejectsReads = false): Storage => {
  const values = new Map<string, string>()
  return {
    get length() {
      return values.size
    },
    key: index => [...values.keys()][index] ?? null,
    getItem: key => {
      if (rejectsReads) throw new Error('storage denied')
      return values.get(key) ?? null
    },
    setItem: (key, value) => {
      values.set(key, value)
    },
    removeItem: key => {
      values.delete(key)
    },
    clear: () => {
      values.clear()
    },
  }
}

beforeEach(() => vi.stubGlobal('localStorage', memoryStorage()))
afterEach(() => vi.unstubAllGlobals())

test('flags preserve the empty-session fallback', async () => {
  expect(await Effect.runPromise(flags)).toEqual({
    maybeSession: Option.none(),
  })
})

test('flags preserve the malformed-session fallback', async () => {
  for (const value of [
    '{invalid',
    'null',
    '{}',
    '{"userId":1,"email":"a","name":"b"}',
  ]) {
    localStorage.setItem(SESSION_STORAGE_KEY, value)
    expect(await Effect.runPromise(flags)).toEqual({
      maybeSession: Option.none(),
    })
  }
})

test('flags preserve the unavailable-storage fallback', async () => {
  vi.stubGlobal('localStorage', memoryStorage(true))
  expect(await Effect.runPromise(flags)).toEqual({
    maybeSession: Option.none(),
  })
})

test('flags read each stored session when the cold program runs', async () => {
  await fc.assert(
    fc.asyncProperty(
      fc.record({ userId: fc.string(), email: fc.string(), name: fc.string() }),
      async session => {
        localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session))
        expect(await Effect.runPromise(flags)).toEqual({
          maybeSession: Option.some(session),
        })
        localStorage.clear()
        expect(await Effect.runPromise(flags)).toEqual({
          maybeSession: Option.none(),
        })
      },
    ),
    { seed: 33171, numRuns: 100 },
  )
})
