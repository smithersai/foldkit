import { Effect, Option } from 'effect'
import fc from 'fast-check'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it, vi } from 'vitest'

import * as AsyncData from '../asyncData/index.js'
import type { Command } from '../command/index.vibe'
import { define, to } from '../experimental/machine/machine.vibe'
import { defineMessageUnion, defineTaggedUnion } from '../schema/index.js'
import { refresh } from '../update/update.vibe'
import {
  resolveDevToolsKeyframeInterval,
  resolveDevToolsMaxEntries,
  resolveExcludeFromHistoryTags,
} from './devToolsConfig.vibe'
import { type SlowUpdateContext, defaultSlowCallback } from './slowPhase.vibe'

const directory = dirname(fileURLToPath(import.meta.url))
const corpus: {
  seed: number
  runs: number
  files: ReadonlyArray<string>
  originalChoices: number
  maxEntriesMinimum: number
  maxEntriesMaximum: number
  keyframeMinimum: number
} = JSON.parse(
  readFileSync(
    join(directory, 'fixtures/foldkit-option-receiver-choices.json'),
    'utf8',
  ),
)
const parameters = { seed: corpus.seed, numRuns: corpus.runs }

describe('native Option choices', () => {
  it('finishes the seven receiver choices in the Core migration corpus', () => {
    expect(corpus.originalChoices).toBe(7)
    for (const file of corpus.files) {
      const source = readFileSync(join(directory, file), 'utf8')
      expect(source.match(/^\s*\.match\s*\(\s*\{\s*onNone:/m), file).toBeNull()
    }
  })

  it('keeps optional DevTools values, clamps and field reads', () => {
    fc.assert(
      fc.property(
        fc.boolean(),
        fc.option(fc.double({ noNaN: false }), { nil: undefined }),
        fc.array(fc.string(), { maxLength: 12 }),
        (enabled, value, tags) => {
          const reads: Array<string> = []
          const numericValue = value ?? 0
          const config =
            value === undefined
              ? {
                  get excludeFromHistory() {
                    reads.push('excludeFromHistory')
                    return tags
                  },
                }
              : {
                  get maxEntries() {
                    reads.push('maxEntries')
                    return numericValue
                  },
                  get keyframeInterval() {
                    reads.push('keyframeInterval')
                    return numericValue
                  },
                  get excludeFromHistory() {
                    reads.push('excludeFromHistory')
                    return tags
                  },
                }
          const input = enabled ? config : false
          expect(resolveDevToolsMaxEntries(input)).toBe(
            enabled && value !== undefined
              ? Math.max(
                  corpus.maxEntriesMinimum,
                  Math.min(corpus.maxEntriesMaximum, value),
                )
              : undefined,
          )
          expect(resolveDevToolsKeyframeInterval(input)).toBe(
            enabled && value !== undefined
              ? Math.max(corpus.keyframeMinimum, Math.floor(value))
              : undefined,
          )
          expect([...resolveExcludeFromHistoryTags(input)]).toEqual(
            enabled ? [...new Set(tags)] : [],
          )
          expect(reads).toEqual(
            enabled
              ? [
                  ...(value === undefined
                    ? []
                    : ['maxEntries', 'keyframeInterval']),
                  'excludeFromHistory',
                ]
              : [],
          )
        },
      ),
      parameters,
    )
    expect(resolveDevToolsMaxEntries(undefined)).toBeUndefined()
    expect(resolveDevToolsKeyframeInterval(undefined)).toBeUndefined()
    expect([...resolveExcludeFromHistoryTags(undefined)]).toEqual([])
  })

  it('keeps refresh reads, revalidation, writes and load getters in order', () => {
    fc.assert(
      fc.property(
        fc.boolean(),
        fc.boolean(),
        fc.integer(),
        fc.integer(),
        (hasEntry, canRefresh, previous, next) => {
          const events: Array<string> = []
          const previousState = AsyncData.Success({ data: previous })
          const nextState = AsyncData.Success({ data: next })
          type CacheState = AsyncData.AsyncData<number, string>
          type CacheModel = Readonly<{ value: CacheState }>
          const model: CacheModel = { value: previousState }
          const command: Command<{ _tag: 'Reloaded' }> = {
            name: 'Reload',
            effect: Effect.succeed({ _tag: 'Reloaded' }),
          }
          const step = refresh<
            CacheModel,
            { _tag: 'Reloaded' },
            number,
            string
          >({
            read: (current: CacheModel): Option.Option<CacheState> => {
              events.push('read')
              expect(current).toBe(model)
              return hasEntry ? Option.some(current.value) : Option.none()
            },
            get revalidate() {
              events.push('getRevalidate')
              return (value: CacheState): Option.Option<CacheState> => {
                events.push('revalidate')
                expect(value).toBe(previousState)
                return canRefresh ? Option.some(nextState) : Option.none()
              }
            },
            get write() {
              events.push('getWrite')
              return (current: CacheModel, value: CacheState) => {
                events.push('write')
                expect(current).toBe(model)
                return { value }
              }
            },
            get load() {
              events.push('getLoad')
              return command
            },
          })
          expect(events).toEqual([])
          const actual = step(model)
          const expectedEvents = ['read', 'getRevalidate']
          if (hasEntry) expectedEvents.push('revalidate')
          if (hasEntry && canRefresh) {
            expectedEvents.push('getWrite', 'write', 'getLoad')
            expect(actual.model).toEqual({ value: nextState })
            expect(actual.commands).toEqual([command])
            expect(actual.commands?.[0]).toBe(command)
          } else {
            expect(actual.model).toBe(model)
            expect(Object.hasOwn(actual, 'commands')).toBe(false)
          }
          expect(events).toEqual(expectedEvents)
        },
      ),
      parameters,
    )
  })

  it('reads and stringifies a slow Message tag only once', () => {
    const warning = vi.spyOn(console, 'warn').mockImplementation(() => {})
    try {
      fc.assert(
        fc.property(fc.string(), tag => {
          warning.mockClear()
          let reads = 0
          const message = {
            get _tag() {
              reads += 1
              return tag
            },
          }
          const context: SlowUpdateContext<unknown, unknown> = {
            _tag: 'Update',
            previousModel: {},
            nextModel: {},
            message,
            durationMs: 10,
            thresholdMs: 2,
          }
          defaultSlowCallback(context)
          expect(reads).toBe(1)
          expect(warning).toHaveBeenCalledOnce()
          expect(warning.mock.calls[0]?.[0]).toContain(
            'triggered by ' + tag + '.',
          )
          expect(warning.mock.calls[0]?.[1]).toBe(context)
          expect(warning.mock.calls[0]?.[2]).toBe(message)
        }),
        parameters,
      )
    } finally {
      warning.mockRestore()
    }
  })

  it('keeps Machine transition and ignored choices over message sequences', () => {
    const State = defineTaggedUnion({ Idle: {}, Busy: {} })
    const Message = defineMessageUnion({ Started: {}, Stopped: {}, Pinged: {} })
    const machine = define({ state: State, message: Message })({
      initial: State.Idle(),
      states: {
        Idle: { on: { Started: to('Busy', () => ({ model: State.Busy() })) } },
        Busy: { on: { Stopped: to('Idle', () => ({ model: State.Idle() })) } },
      },
    })
    fc.assert(
      fc.property(
        fc.array(fc.constantFrom('Started', 'Stopped', 'Pinged'), {
          maxLength: 40,
        }),
        tags => {
          let state: typeof State.Type = State.Idle()
          let reference: 'Idle' | 'Busy' = 'Idle'
          for (const tag of tags) {
            const message =
              tag === 'Started'
                ? Message.Started()
                : tag === 'Stopped'
                  ? Message.Stopped()
                  : Message.Pinged()
            const transitioned =
              (reference === 'Idle' && tag === 'Started') ||
              (reference === 'Busy' && tag === 'Stopped')
            if (transitioned) reference = reference === 'Idle' ? 'Busy' : 'Idle'
            const result = machine.step(state, message)
            expect(result._tag).toBe(transitioned ? 'Transitioned' : 'Ignored')
            if (result._tag === 'Transitioned') {
              expect(result.state._tag).toBe(reference)
              state = result.state
            } else {
              expect(result.state).toBe(state)
              expect(result.reason).toBe(
                tag === 'Pinged' ? 'OutOfAlphabet' : 'NotApplicable',
              )
            }
          }
        },
      ),
      parameters,
    )
  })
})
