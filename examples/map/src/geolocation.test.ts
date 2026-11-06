import { Effect } from 'effect'
import fc from 'fast-check'
import { afterEach, expect, test, vi } from 'vitest'

import { Geolocate } from './main.vibe'

afterEach(() => vi.unstubAllGlobals())

const unavailableHosts: Array<[string, object | undefined]> = [
  ['navigator is absent', undefined],
  ['geolocation is absent', {}],
]

test.each(unavailableHosts)('Geolocate reports when %s', async (_, host) => {
  vi.stubGlobal('navigator', host)
  expect(await Effect.runPromise(Geolocate().effect)).toEqual({
    _tag: 'FailedGeolocate',
    reason: 'Geolocation is not available in this browser context.',
  })
})

test('Geolocate preserves generated coordinates and original browser error messages', async () => {
  await fc.assert(
    fc.asyncProperty(
      fc.record({
        succeeds: fc.boolean(),
        latitude: fc.double({ min: -90, max: 90, noNaN: true }),
        longitude: fc.double({ min: -180, max: 180, noNaN: true }),
        message: fc.string(),
        code: fc.constantFrom(1, 2, 3),
      }),
      async sample => {
        const position: GeolocationPosition = {
          coords: {
            latitude: sample.latitude,
            longitude: sample.longitude,
            accuracy: 1,
            altitude: null,
            altitudeAccuracy: null,
            heading: null,
            speed: null,
            toJSON: () => ({
              latitude: sample.latitude,
              longitude: sample.longitude,
            }),
          },
          timestamp: 0,
          toJSON: () => ({ timestamp: 0 }),
        }
        const failure: GeolocationPositionError = {
          code: sample.code,
          message: sample.message,
          PERMISSION_DENIED: 1,
          POSITION_UNAVAILABLE: 2,
          TIMEOUT: 3,
        }
        const reply = (
          success: PositionCallback,
          error?: PositionErrorCallback | null,
        ): void => {
          if (sample.succeeds) success(position)
          else error?.(failure)
        }
        const getCurrentPosition = vi.fn(reply)
        const watchPosition = vi.fn(
          (
            success: PositionCallback,
            error?: PositionErrorCallback | null,
            _options?: PositionOptions,
          ): number => {
            reply(success, error)
            return 17
          },
        )
        const clearWatch = vi.fn((_id: number): void => {})
        vi.stubGlobal('navigator', {
          geolocation: { getCurrentPosition, watchPosition, clearWatch },
        })

        const result = await Effect.runPromise(Geolocate().effect)
        expect(result).toEqual(
          sample.succeeds
            ? {
                _tag: 'SucceededGeolocate',
                lng: sample.longitude,
                lat: sample.latitude,
              }
            : { _tag: 'FailedGeolocate', reason: sample.message },
        )
        expect(
          getCurrentPosition.mock.calls.length +
            watchPosition.mock.calls.length,
        ).toBe(1)
        if (watchPosition.mock.calls.length > 0) {
          expect(clearWatch).toHaveBeenCalledExactlyOnceWith(17)
          expect(watchPosition.mock.calls[0]?.[2]).toEqual({
            enableHighAccuracy: false,
            timeout: 10_000,
          })
        }
      },
    ),
    { seed: 0xf01d, numRuns: 100 },
  )
})
