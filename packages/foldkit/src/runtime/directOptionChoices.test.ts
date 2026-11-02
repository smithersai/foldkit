import { Effect, Exit, Option, Schema } from 'effect'
import fc from 'fast-check'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

import { __makeRegistry } from '../command/interruptible/interruptible.vibe'
import { diagnoseVariantPath } from '../devTools/schemaSummarize.vibe'
import * as Port from '../port/index.ts'
import { defineMessageUnion } from '../schema/index.js'
import { makeHostConnector, makePortChannels } from './hostConnector.vibe'

const directory = dirname(fileURLToPath(import.meta.url))
const corpus: {
  seed: number
  runs: number
  maxEvents: number
  originalDirectChoices: number
  files: ReadonlyArray<string>
} = JSON.parse(
  readFileSync(
    join(directory, 'fixtures/foldkit-direct-option-choices.json'),
    'utf8',
  ),
)
const parameters = { seed: corpus.seed, numRuns: corpus.runs }

type HostEvent = Readonly<{
  kind: 'send' | 'bind' | 'unbind' | 'dispose'
  right: boolean
  value: number
}>
const hostEvent: fc.Arbitrary<HostEvent> = fc.record({
  kind: fc.constantFrom('send', 'bind', 'unbind', 'dispose'),
  right: fc.boolean(),
  value: fc.integer(),
})
type Delivery = Readonly<{ port: 'Left' | 'Right'; value: unknown }>

const compareHost = (events: ReadonlyArray<HostEvent>): void => {
  const left = Port.inbound(Schema.Number)
  const right = Port.inbound(Schema.Number)
  const connector = makeHostConnector()
  const actual: Array<Delivery> = []
  const expected: Array<Delivery> = []
  let pending: Array<Delivery> = []
  let isDisposed = false
  let isBound = false
  for (const event of events) {
    if (event.kind === 'send') {
      const port = event.right ? right : left
      expect(
        Exit.isSuccess(connector.sendInbound('input', port, event.value)),
      ).toBe(true)
      const delivery: Delivery = {
        port: event.right ? 'Right' : 'Left',
        value: event.value,
      }
      if (!isDisposed) {
        if (isBound) expected.push(delivery)
        else pending.push(delivery)
      }
    } else if (event.kind === 'bind') {
      connector.bind((port, value) => {
        actual.push({ port: port === left ? 'Left' : 'Right', value })
      })
      isBound = true
      expected.push(...pending)
      pending = []
    } else if (event.kind === 'unbind') {
      connector.unbind()
      isBound = false
    } else {
      connector.dispose()
      isDisposed = true
      pending = []
    }
    expect(actual).toEqual(expected)
  }
  connector.dispose()
}

describe('direct native Option choices', () => {
  it('finishes the six direct choices in the named Core corpus', () => {
    expect(corpus.originalDirectChoices).toBe(6)
    for (const file of corpus.files) {
      expect(
        readFileSync(join(directory, file), 'utf8').match(
          /\bOption\.match\s*\(/g,
        ),
        file,
      ).toBeNull()
    }
  })

  it('preserves inbound queue order across binding and disposal', () => {
    compareHost([
      { kind: 'send', right: false, value: 7 },
      { kind: 'send', right: true, value: 8 },
      { kind: 'bind', right: false, value: 0 },
    ])
    fc.assert(
      fc.property(
        fc.array(hostEvent, { maxLength: corpus.maxEvents }),
        compareHost,
      ),
      parameters,
    )
  })

  it('preserves outbound delivery with and without a connector', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.boolean(),
        fc.array(
          fc.record({ isDisposing: fc.boolean(), value: fc.integer() }),
          { maxLength: corpus.maxEvents },
        ),
        async (hasConnector, events) => {
          const outbound = Port.outbound(Schema.Number)
          const connector = makeHostConnector()
          const actual: Array<unknown> = []
          const expected: Array<number> = []
          connector.addListener(outbound, value => {
            actual.push(value)
          })
          const bundle = makePortChannels(
            { outbound: { changed: outbound } },
            hasConnector ? Option.some(connector) : Option.none(),
          )
          const emit = Option.getOrThrow(
            bundle.channels.lookupOutbound(outbound),
          )
          let isDisposed = false
          for (const event of events) {
            if (event.isDisposing) {
              connector.dispose()
              isDisposed = true
            } else {
              emit(event.value)
              if (hasConnector && !isDisposed) expected.push(event.value)
            }
            await Promise.resolve()
            expect(actual).toEqual(expected)
          }
          connector.dispose()
        },
      ),
      parameters,
    )
  })

  it('keeps fiber registration, deduplication and release identities', async () => {
    await fc.assert(
      fc.asyncProperty(
        fc.array(
          fc.record({
            key: fc.constantFrom('left', 'right', ''),
            isReleasing: fc.boolean(),
            second: fc.boolean(),
          }),
          { maxLength: corpus.maxEvents },
        ),
        async actions => {
          await Effect.runPromise(
            Effect.scoped(
              Effect.gen(function* () {
                const first = yield* Effect.forkChild(Effect.void)
                const second = yield* Effect.forkChild(Effect.void)
                const registry = __makeRegistry()
                const expected = new Map<string, Array<number>>()
                for (const action of actions) {
                  const fiber = action.second ? second : first
                  const id = action.second ? 1 : 0
                  const previous = expected.get(action.key) ?? []
                  if (action.isReleasing) {
                    registry.release(action.key, fiber)
                    expected.set(
                      action.key,
                      previous.filter(value => value !== id),
                    )
                  } else {
                    registry.register(action.key, fiber)
                    if (!previous.includes(id))
                      expected.set(action.key, [...previous, id])
                  }
                  for (const key of ['left', 'right', '']) {
                    const wanted = expected.get(key) ?? []
                    const found = registry.lookup(key)
                    expect(found).toHaveLength(wanted.length)
                    wanted.forEach((value, index) => {
                      expect(found[index]).toBe(value === 0 ? first : second)
                    })
                  }
                }
              }),
            ),
          )
        },
      ),
      parameters,
    )
  })

  it('keeps the deepest schema prefix and available tag order', () => {
    const Child = defineMessageUnion({ Opened: {}, Closed: {} })
    const Message = defineMessageUnion({
      Completed: {},
      GotChildMessage: { message: Child },
    })
    const document = Schema.toJsonSchemaDocument(Message)
    fc.assert(
      fc.property(
        fc.array(
          fc.constantFrom('GotChildMessage', 'Opened', 'Closed', 'Unknown'),
          { maxLength: 7 },
        ),
        segments => {
          const expected =
            segments.length === 0
              ? Option.none()
              : Option.some({
                  prefix:
                    segments.length > 1 && segments[0] === 'GotChildMessage'
                      ? ['GotChildMessage']
                      : [],
                  failingSegment: Option.some(
                    segments[
                      segments.length > 1 && segments[0] === 'GotChildMessage'
                        ? 1
                        : 0
                    ],
                  ),
                  available:
                    segments.length > 1 && segments[0] === 'GotChildMessage'
                      ? ['Opened', 'Closed']
                      : ['Completed', 'GotChildMessage'],
                })
          expect(diagnoseVariantPath(document, segments)).toEqual(expected)
        },
      ),
      parameters,
    )
  })
})
