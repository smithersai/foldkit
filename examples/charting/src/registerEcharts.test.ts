import * as echarts from 'echarts/core'
import * as fc from 'fast-check'
import { expect, test, vi } from 'vitest'

import { installAriaComponent } from './fixtures/foldkit-echarts-install-signatures'
import { registerEcharts } from './registerEcharts'

const registration = vi.hoisted(() => ({
  use: vi.fn<(components: ReadonlyArray<unknown>) => void>(),
}))

vi.mock('echarts/core', () => registration)

test('accepts the single-component installation corpus', () => {
  registration.use.mockReset()
  installAriaComponent()
  expect(registration.use).toHaveBeenCalledTimes(1)
  expect(registration.use.mock.calls[0]?.[0]).toHaveLength(1)
})

test('registers the complete plugin set on every call', () => {
  fc.assert(
    fc.property(fc.integer({ min: 1, max: 30 }), repetitions => {
      registration.use.mockReset()
      for (let index = 0; index < repetitions; index++) {
        expect(registerEcharts()).toBe(echarts)
      }
      expect(registration.use).toHaveBeenCalledTimes(repetitions)
      const first = registration.use.mock.calls[0]?.[0]
      expect(first).toHaveLength(14)
      expect(new Set(first).size).toBe(14)
      for (const [components] of registration.use.mock.calls) {
        expect(components).toEqual(first)
      }
    }),
    { seed: 3187189, numRuns: 200 },
  )
})

test('preserves the identity of registration failures', () => {
  fc.assert(
    fc.property(fc.anything(), failure => {
      registration.use.mockReset()
      registration.use.mockImplementation(() => {
        throw failure
      })
      let threw = false
      let caught: unknown
      try {
        registerEcharts()
      } catch (error) {
        threw = true
        caught = error
      }
      expect(threw).toBe(true)
      expect(caught).toBe(failure)
      expect(registration.use).toHaveBeenCalledTimes(1)
    }),
    { seed: 3187188, numRuns: 200 },
  )
})
