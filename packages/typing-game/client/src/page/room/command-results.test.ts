import { Cause, Effect, Exit, Result } from 'effect'
import { RpcClientError } from 'effect/rpc'
import fc from 'fast-check'
import { expect, it } from 'vitest'

import { RoomsClient } from '../../rpc.vibe'
import { FetchRoom } from './command.vibe'
import { Message } from './message.vibe'

it('turns Room RPC failures into Messages and preserves defects on every run', async () => {
  await fc.assert(
    fc.asyncProperty(
      fc.string({ maxLength: 24 }),
      fc.boolean(),
      async (roomId, isDefect) => {
        const defect = new Error(roomId)
        const failure = new RpcClientError.RpcClientError({
          reason: new RpcClientError.RpcClientDefect({
            message: 'synthetic protocol failure',
            cause: roomId,
          }),
        })
        let calls = 0
        const client = {
          createRoom: () => Effect.die(defect),
          joinRoom: () => Effect.die(defect),
          getRoomById: () => {
            calls++
            return isDefect ? Effect.die(defect) : Effect.fail(failure)
          },
          subscribeToRoom: () => {
            throw new Error('Unexpected subscription')
          },
          startGame: () => Effect.die(defect),
          updatePlayerProgress: () => Effect.die(defect),
        } satisfies RoomsClient.Shape
        const program = FetchRoom({ roomId }).effect.pipe(
          Effect.provideService(RoomsClient, client),
        )
        expect(calls).toBe(0)
        for (let run = 1; run <= 2; run++) {
          const exit = await Effect.runPromiseExit(program)
          expect(calls).toBe(run)
          if (isDefect) {
            expect(Exit.isFailure(exit)).toBe(true)
            if (Exit.isFailure(exit)) {
              const found = Cause.findDefect(exit.cause)
              expect(Result.isSuccess(found)).toBe(true)
              if (Result.isSuccess(found)) expect(found.success).toBe(defect)
            }
          } else {
            expect(exit).toEqual(Exit.succeed(Message.FailedFetchRoom()))
          }
        }
      },
    ),
    { seed: 5311861, numRuns: 200 },
  )
})
