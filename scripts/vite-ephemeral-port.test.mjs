import fc from 'fast-check'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

import {
  fixedPortControl,
  nonAddressErrorControl,
  portZeroRace,
} from './fixtures/vite/port-zero-race.mjs'

const corpus = JSON.parse(
  readFileSync(
    new URL(
      './fixtures/vite/foldkit-port-zero-bind-race.json',
      import.meta.url,
    ),
    'utf8',
  ),
)

test('Vite reselects an automatic port stolen by a competing listener', async () => {
  for (const scenario of corpus.scenarios) {
    await portZeroRace(scenario)
  }
})

test('Vite preserves automatic startup across generated bind collisions', async () => {
  await fc.assert(
    fc.asyncProperty(
      fc.record({
        collisions: fc.integer({ min: 0, max: corpus.maxBindAttempts - 1 }),
        strictPort: fc.boolean(),
      }),
      async scenario => {
        await portZeroRace(scenario)
      },
    ),
    { seed: corpus.seed, numRuns: 100 },
  )
})

test('Vite reports bounded automatic-port exhaustion with the bind cause', async () => {
  await assert.rejects(
    () =>
      portZeroRace({
        collisions: corpus.maxBindAttempts,
        strictPort: false,
      }),
    error => {
      assert.match(error.message, /after 3 ephemeral bind attempts/)
      assert.equal(error.cause?.code, 'EADDRINUSE')
      const candidates = error.message.match(/candidates: ([\d, ]+)/)?.[1]
      assert.ok(candidates)
      const ports = candidates.split(', ').map(Number)
      assert.equal(ports.length, corpus.maxBindAttempts)
      assert.equal(ports.at(-1), error.cause.port)
      return true
    },
  )
})

test('Vite preserves explicit strict and incrementing port policies', async () => {
  await fixedPortControl(true)
  await fixedPortControl(false)
})

test('Vite preserves non-address bind errors without retrying', async () => {
  await nonAddressErrorControl()
})
