import { Effect, Option } from 'effect'
import { afterEach, beforeEach, expect, test, vi } from 'vitest'

import { SaveCanvas } from './command.vibe'
import { STORAGE_KEY } from './constant'
import { flags } from './main.vibe'

const saved = {
  grid: [],
  gridSize: 1,
  paletteThemeIndex: 0,
  selectedColorIndex: 0 as const,
}

const memoryStorage = (rejectsWrites = false): Storage => {
  const values = new Map<string, string>()
  return {
    get length() {
      return values.size
    },
    key: index => [...values.keys()][index] ?? null,
    getItem: key => values.get(key) ?? null,
    setItem: (key, value) => {
      if (rejectsWrites) throw new Error('storage denied')
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

test('SaveCanvas preserves completion when storage rejects a write', async () => {
  vi.stubGlobal('localStorage', memoryStorage(true))
  expect(await Effect.runPromise(SaveCanvas(saved).effect)).toEqual({
    _tag: 'CompletedSaveCanvas',
  })
})

test('flags preserve the empty-storage fallback', async () => {
  localStorage.clear()
  expect(await Effect.runPromise(flags)).toEqual({
    maybeSavedCanvas: Option.none(),
  })
})

test('flags preserve the malformed-storage fallback', async () => {
  localStorage.setItem(STORAGE_KEY, '{invalid')
  expect(await Effect.runPromise(flags)).toEqual({
    maybeSavedCanvas: Option.none(),
  })
})

test('SaveCanvas and flags preserve a valid storage round trip', async () => {
  expect(await Effect.runPromise(SaveCanvas(saved).effect)).toEqual({
    _tag: 'CompletedSaveCanvas',
  })
  expect(await Effect.runPromise(flags)).toEqual({
    maybeSavedCanvas: Option.some(saved),
  })
})
