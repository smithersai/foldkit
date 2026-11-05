import { Effect, Option, Schema } from 'effect'
import fc from 'fast-check'
import { renderToString } from 'foldkit/experimental/server'
import type { HtmlBuilder } from 'foldkit/html'
import { expect, it } from 'vitest'

import * as Shared from '@typing-game/shared'

import type { Message } from '../message.vibe'
import { finished } from './finished.vibe'

const Model = Schema.Struct({ scoreboard: Shared.Scoreboard })
type Model = typeof Model.Type

it('renders the scoreboard in descending WPM order, retaining ties and every player', async () => {
  await fc.assert(
    fc.asyncProperty(
      fc.array(fc.integer({ min: 0, max: 500 }), { maxLength: 12 }),
      async speeds => {
        const scoreboard = speeds.map((wpm, index) =>
          Shared.PlayerScore.make({
            playerId: String(index),
            username: `player-${index}`,
            charsTyped: 0,
            correctChars: 0,
            wpm,
            accuracy: 0,
          }),
        )
        const rendered = await Effect.runPromise(
          renderToString(
            {
              init: () => ({ model: Model.make({ scoreboard }) }),
              view: (model: Model, h: HtmlBuilder<Message>) => ({
                title: 'Scoreboard',
                body: finished(
                  Option.some(model.scoreboard),
                  '',
                  Option.none(),
                  h,
                ),
              }),
            },
            { isHydratable: false },
          ),
        )
        const container = document.createElement('div')
        container.innerHTML = rendered.html
        const names = Array.from(container.querySelectorAll('tbody tr'), row =>
          row.querySelector('td')?.textContent?.trim().replace(/^> /, ''),
        )
        const expected = scoreboard
          .map((score, index) => ({ score, index }))
          .sort(
            (left, right) =>
              right.score.wpm - left.score.wpm || left.index - right.index,
          )
          .map(({ score }) => score.username)
        expect(names).toEqual(expected)
      },
    ),
    { seed: 5311801, numRuns: 100, examples: [[[]], [[0, 0, 20]]] },
  )
})
