import { Deferred, Effect, HashMap, Ref, Schema } from 'effect'
import fc from 'fast-check'
import { Response, ResponseFrame } from 'foldkit/devtools-protocol'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

import { handleIncomingMessage } from '../src/relayMessages.vibe'

const corpus: {
  seed: number
  runs: number
  cases: ReadonlyArray<{ id: string; known: boolean; reason: string }>
} = JSON.parse(
  readFileSync(
    join(import.meta.dirname, 'fixtures/foldkit-relay-response-phase.json'),
    'utf8',
  ),
)
const encode = Schema.encodeUnknownSync(Schema.fromJsonString(ResponseFrame))

const check = (id: string, known: boolean, reason: string) => {
  const deferred = Deferred.makeUnsafe<typeof Response.Type, Error>()
  const pending = Ref.makeUnsafe(HashMap.make([id, deferred]))
  const response = Response.ResponseError({ reason })
  const raw = Buffer.from(
    encode({ id: known ? id : `${id}\0absent`, response }),
  )
  let reads = 0
  const originalToString = raw.toString.bind(raw)
  Object.defineProperty(raw, 'toString', {
    value: (...args: Parameters<typeof raw.toString>) => {
      reads += 1
      return originalToString(...args)
    },
  })
  const program = handleIncomingMessage(raw, pending)
  expect(reads).toBe(1)
  expect(Effect.runSync(Deferred.isDone(deferred))).toBe(false)
  expect(HashMap.has(Effect.runSync(Ref.get(pending)), id)).toBe(true)
  raw.fill(0)
  Effect.runSync(program)
  expect(reads).toBe(1)
  expect(Effect.runSync(Deferred.isDone(deferred))).toBe(known)
  expect(HashMap.has(Effect.runSync(Ref.get(pending)), id)).toBe(!known)
  if (known) expect(Effect.runSync(Deferred.await(deferred))).toEqual(response)
}

describe('relay response construction phase', () => {
  it('decodes before fork and changes pending responses only when the program runs', () => {
    for (const item of corpus.cases) check(item.id, item.known, item.reason)
    fc.assert(
      fc.property(
        fc.string({ maxLength: 24 }),
        fc.boolean(),
        fc.string({ maxLength: 40 }),
        check,
      ),
      { seed: corpus.seed, numRuns: corpus.runs },
    )
  })
})
