import { Console, Effect } from 'effect'
import fc from 'fast-check'
import { afterEach, expect, test, vi } from 'vitest'

import { LogError } from './command.vibe'
import { Message } from './message.vibe'

afterEach(() => vi.restoreAllMocks())

test('LogError preserves argument capture before its completion message', () => {
  const originalCompleted = Message.CompletedLogError
  let events: Array<string> = []
  vi.spyOn(Message, 'CompletedLogError').mockImplementation(() => {
    events.push('message')
    return originalCompleted()
  })

  fc.assert(
    fc.property(fc.array(fc.jsonValue(), { maxLength: 8 }), values => {
      const observe = (
        build: (
          entries: ReadonlyArray<unknown>,
        ) => Effect.Effect<ReturnType<typeof Message.CompletedLogError>>,
      ) => {
        events = []
        const entries = values.map(value => value)
        values.forEach((value, index) => {
          Object.defineProperty(entries, index, {
            configurable: true,
            enumerable: true,
            get: () => {
              events.push(`entry:${index}`)
              return value
            },
          })
        })
        const received: Array<ReadonlyArray<unknown>> = []
        const logger: Console.Console = Object.assign(Object.create(console), {
          error: (...args: ReadonlyArray<unknown>): void => {
            events.push('console')
            received.push(args)
          },
        })
        const program = build(entries)
        expect(events).toEqual([])
        const message = Effect.runSync(
          Effect.provideService(program, Console.Console, logger),
        )
        return { events: [...events], received, tag: message._tag }
      }

      // Original TypeScript factory, deferred by Command.define until execution.
      const original = observe(entries =>
        Effect.suspend(() =>
          Console.error(...entries).pipe(
            Effect.as(Message.CompletedLogError()),
          ),
        ),
      )
      const native = observe(entries => LogError({ entries }).effect)
      expect(original.events).toEqual([
        ...values.map((_, index) => `entry:${index}`),
        'message',
        'console',
      ])
      expect(native).toEqual(original)
    }),
    { seed: 0xf01d, numRuns: 100 },
  )
})
