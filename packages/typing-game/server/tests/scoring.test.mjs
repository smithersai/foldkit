import { Effect, HashMap, Option, SubscriptionRef } from 'effect'
import fc from 'fast-check'
import assert from 'node:assert/strict'
import { test } from 'node:test'

import * as Shared from '@typing-game/shared'

import { CHARS_PER_WORD, PLAYING_SECONDS } from '../dist/game.js'
import { calculateScoreboard, getPlayerProgress } from '../dist/scoring.js'

test('scoring is cold, replayable, and preserves each player and zero-typing accuracy', async () => {
  await fc.assert(
    fc.asyncProperty(
      fc.array(
        fc.record({
          username: fc.string({ maxLength: 20 }),
          userText: fc.string({ maxLength: 100 }),
          charsTyped: fc.integer({ min: 0, max: 250 }),
          hasProgress: fc.boolean(),
        }),
        { maxLength: 8 },
      ),
      fc.boolean(),
      async (inputs, hasGame) => {
        const game = Shared.Game.make({ id: 'test-game', text: 'synthetic' })
        const players = inputs.map((input, index) =>
          Shared.Player.make({ id: String(index), username: input.username }),
        )
        const room = Shared.Room.make({
          id: 'test-room',
          hostId: '0',
          players,
          createdAt: 0,
          status: Shared.Finished.make({}),
          usedGameTexts: [],
          maybeGame: hasGame ? Option.some(game) : Option.none(),
          maybeScoreboard: Option.none(),
        })
        let progress = HashMap.empty()
        for (const [index, input] of inputs.entries()) {
          if (!input.hasProgress) continue
          const identity = { gameId: game.id, playerId: String(index) }
          progress = HashMap.set(
            progress,
            Shared.GamePlayer.make(identity),
            Shared.PlayerProgress.make({ ...identity, ...input, updatedAt: 0 }),
          )
        }

        const expected = hasGame
          ? inputs.map((input, index) => {
              const charsTyped = input.hasProgress ? input.charsTyped : 0
              const correctChars = input.hasProgress ? input.userText.length : 0
              return Shared.PlayerScore.make({
                playerId: String(index),
                username: input.username,
                charsTyped,
                correctChars,
                wpm: charsTyped / CHARS_PER_WORD / (PLAYING_SECONDS / 60),
                accuracy:
                  charsTyped === 0 ? 0 : (correctChars / charsTyped) * 100,
              })
            })
          : []
        const program = calculateScoreboard(room, progress)
        assert(Effect.isEffect(program))
        assert.deepEqual(await Effect.runPromise(program), expected)
        assert.deepEqual(await Effect.runPromise(program), expected)

        const reference = await Effect.runPromise(
          SubscriptionRef.make(progress),
        )
        assert.deepEqual(
          await Effect.runPromise(getPlayerProgress(reference, '0', game.id)),
          HashMap.get(
            progress,
            Shared.GamePlayer.make({ gameId: game.id, playerId: '0' }),
          ),
        )
      },
    ),
    { seed: 53131, numRuns: 1000 },
  )
})
