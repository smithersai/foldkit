import { Cause, Effect, Exit, Result } from 'effect'
import fc from 'fast-check'
import type * as Command from 'foldkit/command'
import * as Dom from 'foldkit/dom'
import { afterEach, expect, it, vi } from 'vitest'

import * as Calendar from './calendar/index.vibe'
import * as Combobox from './combobox/shared.vibe'
import * as DragAndDrop from './dragAndDrop/index.vibe'
import * as Listbox from './listbox/shared.vibe'
import * as Menu from './menu/index.vibe'
import * as Popover from './popover/index.vibe'
import * as RadioGroup from './radioGroup/index.vibe'
import * as Tabs from './tabs/index.vibe'

vi.mock('foldkit/dom', async importOriginal => {
  const actual = await importOriginal<typeof import('foldkit/dom')>()
  return {
    ...actual,
    focus: vi.fn(actual.focus),
    scrollIntoView: vi.fn(actual.scrollIntoView),
    clickElement: vi.fn(actual.clickElement),
  }
})

afterEach(() => vi.clearAllMocks())

const cases: ReadonlyArray<{
  create: (id: string, index: number) => Command.Command<unknown>
  tag: string
}> = [
  { create: id => Calendar.FocusGrid({ id }), tag: 'CompletedFocusGrid' },
  { create: id => Combobox.FocusInput({ id }), tag: 'CompletedFocusInput' },
  {
    create: (id, index) => Combobox.ScrollIntoView({ id, index }),
    tag: 'CompletedScrollIntoView',
  },
  {
    create: (id, index) => Combobox.ClickItem({ id, index }),
    tag: 'CompletedClickItem',
  },
  {
    create: id => DragAndDrop.FocusItem({ itemId: id }),
    tag: 'CompletedFocusItem',
  },
  { create: id => Listbox.FocusButton({ id }), tag: 'CompletedFocusButton' },
  { create: id => Listbox.FocusItems({ id }), tag: 'CompletedFocusItems' },
  {
    create: (id, index) => Listbox.ScrollIntoView({ id, index }),
    tag: 'CompletedScrollIntoView',
  },
  {
    create: (id, index) => Listbox.ClickItem({ id, index }),
    tag: 'CompletedClickItem',
  },
  { create: id => Menu.FocusItems({ id }), tag: 'CompletedFocusItems' },
  { create: id => Menu.FocusButton({ id }), tag: 'CompletedFocusButton' },
  {
    create: (id, index) => Menu.ScrollIntoView({ id, index }),
    tag: 'CompletedScrollIntoView',
  },
  {
    create: (id, index) => Menu.ClickItem({ id, index }),
    tag: 'CompletedClickItem',
  },
  { create: id => Popover.FocusPanel({ id }), tag: 'CompletedFocusPanel' },
  { create: id => Popover.FocusButton({ id }), tag: 'CompletedFocusButton' },
  {
    create: (id, index) => RadioGroup.FocusOption({ id, index }),
    tag: 'CompletedFocusOption',
  },
  {
    create: (id, index) => Tabs.FocusTab({ id, index }),
    tag: 'CompletedFocusTab',
  },
]

it('DOM Commands complete after missing targets and preserve defects', async () => {
  await fc.assert(
    fc.asyncProperty(
      fc.constantFrom(...cases),
      fc.string({ maxLength: 20 }),
      fc.integer({ min: 0, max: 100 }),
      fc.constantFrom('success', 'missing', 'defect'),
      async (selected, id, index, outcome) => {
        const defect = new Error(id)
        const result =
          outcome === 'missing'
            ? Effect.fail(new Dom.ElementNotFound({ selector: id }))
            : outcome === 'defect'
              ? Effect.die(defect)
              : Effect.void
        vi.mocked(Dom.focus).mockReturnValue(result)
        vi.mocked(Dom.scrollIntoView).mockReturnValue(result)
        vi.mocked(Dom.clickElement).mockReturnValue(result)
        const command = selected.create(id, index)
        const exit = await Effect.runPromiseExit(command.effect)
        if (outcome === 'defect') {
          expect(Exit.isFailure(exit)).toBe(true)
          if (Exit.isFailure(exit)) {
            const found = Cause.findDefect(exit.cause)
            expect(Result.isSuccess(found)).toBe(true)
            if (Result.isSuccess(found)) expect(found.success).toBe(defect)
          }
        } else {
          expect(exit).toEqual(Exit.succeed({ _tag: selected.tag }))
        }
      },
    ),
    { seed: 531186, numRuns: 204 },
  )
})
