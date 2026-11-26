import { Option } from 'effect'
import fc from 'fast-check'
import * as Calendar from 'foldkit/calendar'
import { inertHtml as ih } from 'foldkit/html'
import * as Scene from 'foldkit/scene'
import { it } from 'vitest'

import examples from './fixtures/foldkit-date-picker-form-values.json' with { type: 'json' }
import { init, update, view } from './index.vibe'

const selectedDate = fc.option(
  fc.record({
    year: fc.integer({ min: 1000, max: 9999 }),
    month: fc.integer({ min: 1, max: 12 }),
    day: fc.integer({ min: 1, max: 28 }),
  }),
)
const hiddenInput = Scene.selector('input[type="hidden"]')

it('preserves optional date values in named form fields', () => {
  fc.assert(
    fc.property(selectedDate, fc.boolean(), (selected, isNamed) => {
      const maybeSelectedDate =
        selected === null
          ? Option.none()
          : Option.some(
              Calendar.make(selected.year, selected.month, selected.day),
            )
      const expected =
        selected === null
          ? ''
          : [
              selected.year,
              String(selected.month).padStart(2, '0'),
              String(selected.day).padStart(2, '0'),
            ].join('-')

      Scene.scene(
        {
          update,
          view: (model, h) =>
            view(
              model,
              {
                anchor: { placement: 'bottom-start' },
                maybeSelectedDate,
                ...(isNamed ? { name: 'selected-date' } : {}),
                triggerContent: () => ih.span([], ['Choose a date']),
                toCalendarView: () => ih.div([]),
              },
              h,
            ),
        },
        Scene.given(init({ id: 'picker', today: Calendar.make(2026, 4, 13) })),
        isNamed
          ? Scene.expect(hiddenInput).toHaveValue(expected)
          : Scene.expect(hiddenInput).toBeAbsent(),
      )
    }),
    {
      numRuns: 256,
      examples: [
        ...examples.map((selected): [typeof selected, boolean] => [
          selected,
          true,
        ]),
        [null, false],
      ],
    },
  )
})
