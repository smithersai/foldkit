import fc from 'fast-check'
import { EventEmitter } from 'node:events'
import { setImmediate as tick } from 'node:timers/promises'
import { expect, it } from 'vitest'

import { toNodeResponseBody } from '../src/node.platform.ts'
import corpus from './fixtures/foldkit-node-response-close.json' with { type: 'json' }

it('owns and cancels unpulled response bodies exactly once over generated close traces', async () => {
  await fc.assert(
    fc.asyncProperty(
      fc.record({
        abortedBefore: fc.boolean(),
        chunks: fc.array(fc.uint8Array({ maxLength: 16 }), { maxLength: 8 }),
        events: fc.array(fc.constantFrom(...corpus.events), {
          minLength: 1,
          maxLength: corpus.maxEvents,
        }),
      }),
      async input => {
        let canceled = 0
        const source = new ReadableStream<Uint8Array<ArrayBuffer>>({
          start(controller) {
            for (const chunk of input.chunks) {
              controller.enqueue(new Uint8Array(chunk))
            }
          },
          cancel() {
            canceled++
          },
        })
        const response = new EventEmitter()
        const controller = new AbortController()
        if (input.abortedBefore) {
          controller.abort()
        }
        const body = toNodeResponseBody(source, response, controller.signal)
        const errors: Array<unknown> = []
        body.on('error', error => {
          errors.push(error)
        })
        const closed = new Promise<void>(resolve => body.once('close', resolve))
        try {
          expect(source.locked).toBe(true)
          expect(body.destroyed).toBe(input.abortedBefore)
          for (const event of input.events) {
            if (event === 'response-close') {
              response.emit('close')
            } else if (event === 'destroy') {
              body.destroy()
            } else {
              controller.abort()
            }
          }
          const shouldClose =
            input.abortedBefore ||
            input.events.some(
              event => event === 'response-close' || event === 'destroy',
            )
          expect(body.destroyed).toBe(shouldClose)
          await tick()
          expect(canceled).toBe(shouldClose ? 1 : 0)
          expect(response.listenerCount('close')).toBe(shouldClose ? 0 : 1)
          expect(errors).toEqual([])
        } finally {
          body.destroy()
          await closed
        }
        expect(canceled).toBe(1)
        expect(response.listenerCount('close')).toBe(0)
        expect(errors).toEqual([])
      },
    ),
    { seed: corpus.seed, numRuns: corpus.runs, endOnFailure: true },
  )
})
