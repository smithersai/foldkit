import { Effect } from 'effect'
import * as fc from 'fast-check'
import { expect, test, vi } from 'vitest'

import { weatherCommandCases } from './fixtures/foldkit-weather-command-union'
import { FetchWeather } from './main.vibe'

const weatherCases = fc.oneof(
  fc.constantFrom(...weatherCommandCases),
  fc.record({
    zipCode: fc
      .integer({ min: 0, max: 99999 })
      .map(value => String(value).padStart(5, '0')),
    found: fc.boolean(),
    temperature: fc.integer({ min: -500, max: 1500 }).map(value => value / 10),
  }),
)

test('weather commands keep both union outcomes cold and replayable', async () => {
  let active: { zipCode: string; found: boolean; temperature: number } =
    weatherCommandCases[0]
  let calls: Array<string> = []
  vi.stubGlobal('fetch', async (input: RequestInfo | URL) => {
    const url =
      typeof input === 'string'
        ? input
        : 'url' in input
          ? input.url
          : input.href
    calls.push(url)
    const body = url.includes('geocoding')
      ? {
          results: active.found
            ? [{ name: 'Example', latitude: 1, longitude: 2, admin1: 'Region' }]
            : [],
        }
      : {
          current: {
            temperature_2m: active.temperature,
            relative_humidity_2m: 45,
            wind_speed_10m: 9.8,
            weather_code: 0,
          },
        }
    return new Response(JSON.stringify(body), { status: 200 })
  })
  try {
    await fc.assert(
      fc.asyncProperty(weatherCases, async sample => {
        active = sample
        calls = []
        const command = FetchWeather({ zipCode: sample.zipCode })
        expect(calls).toEqual([])
        const result = await Effect.runPromise(command.effect)
        expect(result._tag).toBe(
          sample.found ? 'SucceededFetchWeather' : 'FailedFetchWeather',
        )
        if (result._tag === 'SucceededFetchWeather') {
          expect(result.weather.zipCode).toBe(sample.zipCode)
          expect(result.weather.temperature).toBe(
            Math.round(sample.temperature),
          )
        } else {
          expect(result.error).toBe('Location not found')
        }
        expect(calls).toHaveLength(sample.found ? 2 : 1)
        expect(await Effect.runPromise(command.effect)).toEqual(result)
        expect(calls).toHaveLength(sample.found ? 4 : 2)
      }),
      { seed: 1783194, numRuns: 200 },
    )
  } finally {
    vi.unstubAllGlobals()
  }
})
