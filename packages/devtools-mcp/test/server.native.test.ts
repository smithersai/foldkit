import { Schema } from 'effect'
import fc from 'fast-check'
import { EventEmitter } from 'node:events'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { expect, it, vi } from 'vitest'

import { observeStdinClose } from '../src/server.platform.ts'

const Event = Schema.Literals(['end', 'close', 'cleanup', 'data'])
const Model = Schema.Struct({
  ended: Schema.Boolean,
  destroyed: Schema.Boolean,
  events: Schema.Array(Event),
})
const corpus = Schema.decodeUnknownSync(
  Schema.Struct({
    seed: Schema.Number,
    cases: Schema.Array(Model),
  }),
)(
  JSON.parse(
    readFileSync(
      join(
        dirname(fileURLToPath(import.meta.url)),
        'corpus/foldkit-mcp-stdin-lifecycle.json',
      ),
      'utf8',
    ),
  ),
)
class Input extends EventEmitter {
  readableEnded: boolean
  destroyed: boolean
  reads = 0
  constructor(ended: boolean, destroyed: boolean) {
    super()
    this.readableEnded = ended
    this.destroyed = destroyed
  }
  read() {
    this.reads += 1
    return null
  }
  resume() {
    this.reads += 1
    return this
  }
  pipe() {
    this.reads += 1
    return this
  }
}
it('observes closure once, detaches on interruption and never consumes protocol bytes', () => {
  const generated = fc.record({
    ended: fc.boolean(),
    destroyed: fc.boolean(),
    events: fc.array(fc.constantFrom('end', 'close', 'cleanup', 'data'), {
      maxLength: 24,
    }),
  })
  fc.assert(
    fc.property(
      fc.oneof(fc.constantFrom(...corpus.cases), generated),
      model => {
        const input = new Input(model.ended, model.destroyed)
        const original = process
        let calls = 0
        let expected = model.ended || model.destroyed ? 1 : 0
        let active = expected === 0
        vi.stubGlobal(
          'process',
          new Proxy(original, {
            get(target, key, receiver) {
              return key === 'stdin'
                ? input
                : Reflect.get(target, key, receiver)
            },
          }),
        )
        try {
          const detach = observeStdinClose(() => {
            calls += 1
          })
          expect(typeof detach).toBe(active ? 'function' : 'undefined')
          expect(calls).toBe(expected)
          for (const event of model.events) {
            if (event === 'cleanup') {
              detach?.()
              active = false
            } else {
              if (event !== 'data' && active) {
                expected += 1
                active = false
              }
              input.emit(event, new Uint8Array([82, 80, 67]))
            }
            expect(calls).toBe(expected)
            expect(input.listenerCount('end')).toBe(active ? 1 : 0)
            expect(input.listenerCount('close')).toBe(active ? 1 : 0)
            expect(input.reads).toBe(0)
          }
          detach?.()
          expect(input.listenerCount('end')).toBe(0)
          expect(input.listenerCount('close')).toBe(0)
          expect(input.reads).toBe(0)
        } finally {
          vi.unstubAllGlobals()
        }
      },
    ),
    { numRuns: 500, seed: corpus.seed },
  )
})
