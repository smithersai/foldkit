import { Effect, Exit, Fiber } from 'effect'
import fc from 'fast-check'
import { EventEmitter } from 'node:events'
import { setImmediate as tick } from 'node:timers/promises'
import { expect, it, vi } from 'vitest'

import corpus from './fixtures/foldkit-install-process.json' with { type: 'json' }
import { runCommand } from './packages-command.vibe'

const mocked = vi.hoisted(() => ({
  spawn: vi.fn<(...args: Array<unknown>) => unknown>(),
}))
vi.mock('node:child_process', () => ({ spawn: mocked.spawn }))

class Child extends EventEmitter {
  exitCode: number | null = null
  killed = false
  signals: Array<NodeJS.Signals | undefined> = []

  kill(signal?: NodeJS.Signals): boolean {
    this.signals.push(signal)
    this.killed = true
    return true
  }
}

class SpawnFailure extends Error {
  readonly code = 'ENOENT'
}

it('preserves process launch, terminal errors and non-waiting SIGTERM cleanup', async () => {
  await fc.assert(
    fc.asyncProperty(
      fc.record({
        command: fc.constantFrom(...corpus.packageManagers),
        outcome: fc.constantFrom(...corpus.outcomes),
        windows: fc.boolean(),
        terminalCode: fc.oneof(
          fc.constant(null),
          fc.integer({ min: 1, max: 255 }),
        ),
        alreadyKilled: fc.boolean(),
        alreadyExited: fc.boolean(),
        detail: fc.string({ maxLength: 24 }),
      }),
      async input => {
        mocked.spawn.mockReset()
        const child = new Child()
        mocked.spawn.mockReturnValue(child)
        const args = ['install']
        const cwd = '/fixture/project'
        const program = runCommand(input.command, args, cwd, input.windows)
        expect(mocked.spawn).not.toHaveBeenCalled()
        args.push(input.detail)
        const fiber = Effect.runFork(program)
        await tick()
        expect(mocked.spawn).toHaveBeenCalledTimes(1)
        expect(mocked.spawn.mock.calls[0]).toEqual([
          input.command,
          args,
          { cwd, shell: input.windows, stdio: 'inherit' },
        ])
        expect(mocked.spawn.mock.calls[0]?.[1]).not.toBe(args)
        let originalError: Error | undefined
        if (input.outcome === 'success') {
          child.exitCode = 0
          child.emit('exit', 0)
        } else if (input.outcome === 'exit-failure') {
          child.exitCode = input.terminalCode
          child.emit('exit', input.terminalCode)
        } else if (input.outcome === 'spawn-error') {
          originalError = new SpawnFailure(input.detail)
          child.emit('error', originalError)
        } else {
          child.killed = input.alreadyKilled
          child.exitCode = input.alreadyExited ? 7 : null
          await Effect.runPromise(Fiber.interrupt(fiber))
        }
        const exit = await Effect.runPromise(Fiber.await(fiber))
        if (input.outcome === 'success') {
          expect(Exit.isSuccess(exit)).toBe(true)
          if (Exit.isSuccess(exit)) {
            expect(exit.value).toBeUndefined()
          }
        } else {
          expect(Exit.isFailure(exit)).toBe(true)
          if (Exit.isFailure(exit)) {
            if (input.outcome === 'interrupt') {
              expect(
                exit.cause.reasons.some(reason => reason._tag === 'Interrupt'),
              ).toBe(true)
            } else {
              expect(exit.cause.reasons).toHaveLength(1)
              const reason = exit.cause.reasons[0]
              expect(reason?._tag).toBe('Fail')
              if (reason?._tag === 'Fail') {
                if (input.outcome === 'spawn-error') {
                  expect(reason.error).toBe(originalError)
                } else {
                  expect(reason.error).toBeInstanceOf(Error)
                  expect(reason.error.message).toBe(
                    input.command + ' exited with code ' + input.terminalCode,
                  )
                }
              }
            }
          }
        }
        const killed =
          input.outcome === 'interrupt' &&
          !input.alreadyKilled &&
          !input.alreadyExited
        expect(child.signals).toEqual(killed ? [undefined] : [])
      },
    ),
    { seed: corpus.seed, numRuns: corpus.runs, endOnFailure: true },
  )
})
