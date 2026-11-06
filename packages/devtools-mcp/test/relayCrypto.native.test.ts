import fc from 'fast-check'
import { createHmac } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

import {
  computeRelayProof,
  createRelayChallenge,
  matchesRelayProof,
} from '../src/relayCrypto.vibe'

const corpus: {
  seed: number
  runs: number
  byteCounts: ReadonlyArray<number>
  cases: ReadonlyArray<{
    token: string
    role: 'client' | 'server'
    challenge: string
  }>
} = JSON.parse(
  readFileSync(
    join(import.meta.dirname, 'fixtures/foldkit-relay-crypto.json'),
    'utf8',
  ),
)
const hex = (bytes: Uint8Array): string => Buffer.from(bytes).toString('hex')
const check = (token: string, role: 'client' | 'server', challenge: string) => {
  const expected = createHmac('sha256', token)
    .update(`${role}:${challenge}`)
    .digest('hex')
  const actual = computeRelayProof(token, role, challenge)
  expect(actual).toBe(expected)
  expect(matchesRelayProof(expected, actual)).toBe(true)
  const changed = (actual[0] === '0' ? '1' : '0') + actual.slice(1)
  expect(matchesRelayProof(expected, changed)).toBe(false)
}

describe('relay crypto service parity', () => {
  it('preserves the UTF-8 key, domain separator and exact authentication bytes', () => {
    for (const item of corpus.cases) {
      check(item.token, item.role, item.challenge)
    }
    fc.assert(
      fc.property(
        fc.uint8Array({ minLength: 32, maxLength: 32 }),
        fc.constantFrom<'client' | 'server'>('client', 'server'),
        fc.uint8Array({ minLength: 32, maxLength: 32 }),
        (token, role, challenge) => check(hex(token), role, hex(challenge)),
      ),
      { seed: corpus.seed, numRuns: corpus.runs },
    )
  })

  it('keeps the requested number of native random bytes in lowercase hex', () => {
    for (const bytes of corpus.byteCounts) {
      const challenge = createRelayChallenge(bytes)
      expect(challenge.length).toBe(bytes * 2)
      expect(challenge).toMatch(/^(?:[0-9a-f]{2})*$/)
    }
  })
})
