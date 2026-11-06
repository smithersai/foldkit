import { Option } from 'effect'
import fc from 'fast-check'
import { Calendar } from 'foldkit'
import * as Url from 'foldkit/url'
import { describe, expect, test } from 'vitest'

import { VirtualList } from '@foldkit/ui'

import { Deployment } from './deployment.vibe'
import corpus from './fixtures/foldkit-browser-environment-preservation.json'
import { init, update } from './main.vibe'
import { Message } from './message.vibe'
import * as Ui from './page/ui'

const serverToday = Calendar.make(2026, 10, 31)
const localToday = Calendar.make(2026, 11, 1)
const flags = {
  currentYear: serverToday.year,
  today: serverToday,
  deployment: Deployment.Canary({ commit: 'test' }),
  maybeApiData: Option.none(),
  maybeExampleSources: Option.none(),
}
const url = Option.getOrThrow(
  Url.fromString('https://foldkit.dev/ui/virtual-list'),
)
const initial = () => init(flags, url).model
const environment = (today: Calendar.CalendarDate) =>
  Message.CompletedLoadBrowserEnvironment({
    maybeThemePreference: Option.none(),
    maybeSidebarState: Option.none(),
    systemTheme: 'Light',
    isPlaygroundSupported: true,
    currentYear: today.year,
    today,
  })
const measurements = (
  width: number,
  height: number,
): ReadonlyArray<Message> => [
  Message.GotUiPageMessage({
    message: Ui.Message.GotVirtualListDemoMessage({
      message: VirtualList.Message.ResizedContainer({
        containerWidth: width,
        containerHeight: height,
      }),
    }),
  }),
  Message.GotUiPageMessage({
    message: Ui.Message.GotVirtualListVariableDemoMessage({
      message: VirtualList.Message.ResizedContainer({
        containerWidth: width,
        containerHeight: height,
      }),
    }),
  }),
  Message.GotUiPageMessage({
    message: Ui.Message.GotVirtualListChatDemoMessage({
      message: VirtualList.Message.ResizedContainer({
        containerWidth: width,
        containerHeight: height,
      }),
    }),
  }),
]
const lists = (model: ReturnType<typeof initial>) => [
  model.uiPages.virtualListDemo,
  model.uiPages.virtualListVariableDemo,
  model.uiPages.virtualListChatDemo,
]
const expectMeasured = (
  model: ReturnType<typeof initial>,
  width: number,
  height: number,
) => {
  for (const list of lists(model)) {
    expect(list.measurement._tag).toBe('Measured')
    expect(list.measurement).toMatchObject({
      _tag: 'Measured',
      containerWidth: width,
      containerHeight: height,
    })
  }
}
const applyOrder = (
  order: ReadonlyArray<number>,
  width: number,
  height: number,
  today: Calendar.CalendarDate,
) => {
  const events = [...measurements(width, height), environment(today)]
  let model = initial()
  for (const index of order) {
    const event = events[index]
    if (event === undefined) throw new Error('Invalid event order')
    model = update(model, event).model
  }
  return model
}

describe('browser environment completion preserves mounted UI state', () => {
  test('keeps measurements that arrive before the local clock loads', () => {
    const before = measurements(606, 320).reduce(
      (model, event) => update(model, event).model,
      initial(),
    )
    expectMeasured(before, 606, 320)
    const after = update(before, environment(localToday)).model
    expectMeasured(after, 606, 320)
    expect(lists(after)).toEqual(lists(before))
  })

  test('covers the saved startup orders', () => {
    for (const order of corpus.orders)
      expectMeasured(applyOrder(order, 606, 384, localToday), 606, 384)
  })

  test('all measurement/completion permutations converge to measured lists', () => {
    fc.assert(
      fc.property(
        fc.shuffledSubarray([0, 1, 2, 3], { minLength: 4, maxLength: 4 }),
        fc.integer({ min: 1, max: 2048 }),
        fc.integer({ min: 1, max: 1024 }),
        (order, width, height) =>
          expectMeasured(
            applyOrder(order, width, height, localToday),
            width,
            height,
          ),
      ),
      { seed: 2011742, numRuns: 200 },
    )
  })

  test('refreshes local date demos while preserving every unrelated field', () => {
    fc.assert(
      fc.property(
        fc.string(),
        fc.nat(1000),
        fc.boolean(),
        fc.integer({ min: 1, max: 28 }),
        (text, clicks, checked, day) => {
          const measured = measurements(400, 300).reduce(
            (model, event) => update(model, event).model,
            initial(),
          )
          const before = {
            ...measured,
            uiPages: {
              ...measured.uiPages,
              inputDemoValue: text,
              buttonClickCount: clicks,
              isCheckboxBasicDemoChecked: checked,
            },
          }
          const today = Calendar.make(2027, 1, day)
          const result = update(before, environment(today))
          const expectedDateDemos = Ui.init(today).model
          const refreshed = new Set(corpus.dateFields)
          const afterFields = new Map(Object.entries(result.model.uiPages))
          for (const [key, value] of Object.entries(before.uiPages)) {
            if (!refreshed.has(key)) expect(afterFields.get(key)).toBe(value)
          }
          expect(result.model.uiPages.calendarBasicDemo).toEqual(
            expectedDateDemos.calendarBasicDemo,
          )
          expect(result.model.uiPages.datePickerBasicDemo).toEqual(
            expectedDateDemos.datePickerBasicDemo,
          )
          expect(
            result.model.uiPages.maybeCalendarBasicDemoSelectedDate,
          ).toEqual(Option.none())
          expect(
            result.model.uiPages.maybeDatePickerBasicDemoSelectedDate,
          ).toEqual(Option.none())
          expect(result.model.currentYear).toBe(today.year)
          expect(result.commands?.map(command => command.name)).toEqual([
            'ApplyTheme',
          ])
        },
      ),
      { seed: 2011743, numRuns: 200 },
    )
  })
})
