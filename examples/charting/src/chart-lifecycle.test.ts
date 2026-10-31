import { Effect, Option, Stream } from 'effect'
import fc from 'fast-check'
import { afterEach, describe, expect, test, vi } from 'vitest'

import { getChart } from './chartHost.vibe'
import { Message } from './message.ts'
import { MountChart } from './view/chart.ts'

const chartState = vi.hoisted(() => {
  let handler: ((event: unknown) => void) | undefined
  let failRegistration = false
  const chart = {
    resize: vi.fn(() => {}),
    on: vi.fn((_type: string, callback: (event: unknown) => void) => {
      handler = callback
      if (failRegistration) throw new Error('click registration rejected')
    }),
    off: vi.fn((_type: string, callback?: (event: unknown) => void) => {
      if (handler === callback) handler = undefined
    }),
    dispose: vi.fn(() => {}),
  }
  const init = vi.fn(() => chart)
  return {
    chart,
    init,
    emit: (event: unknown) => handler?.(event),
    hasHandler: () => handler !== undefined,
    failOn: () => {
      failRegistration = true
    },
    reset: () => {
      handler = undefined
      failRegistration = false
      chart.resize.mockClear()
      chart.on.mockClear()
      chart.off.mockClear()
      chart.dispose.mockClear()
      init.mockClear()
    },
  }
})

vi.mock('echarts/core', () => ({ init: chartState.init }))

class FakeResizeObserver implements ResizeObserver {
  static instances: FakeResizeObserver[] = []
  static failConstruct = false
  static failObserve = false
  element: Element | undefined
  disconnected = 0
  private readonly callback: ResizeObserverCallback

  constructor(callback: ResizeObserverCallback) {
    this.callback = callback
    if (FakeResizeObserver.failConstruct)
      throw new Error('observer constructor rejected')
    FakeResizeObserver.instances.push(this)
  }

  observe(element: Element) {
    this.element = element
    if (FakeResizeObserver.failObserve) throw new Error('observe rejected')
  }

  unobserve(element: Element) {
    if (this.element === element) this.element = undefined
  }

  disconnect() {
    this.disconnected += 1
    this.element = undefined
  }

  notify() {
    if (this.element !== undefined) this.callback([], this)
  }
}

const reset = () => {
  chartState.reset()
  FakeResizeObserver.instances = []
  FakeResizeObserver.failConstruct = false
  FakeResizeObserver.failObserve = false
}

afterEach(() => {
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
  reset()
})

const streamFor = (element: Element) =>
  MountChart({ hostId: 'test-chart-host' }).f(element, Stream.empty)

const assertReleased = () => {
  expect(chartState.chart.dispose).toHaveBeenCalledTimes(1)
  expect(chartState.hasHandler()).toBe(false)
  expect(getChart('test-chart-host')).toEqual(Option.none())
  const previous = chartState.chart.resize.mock.calls.length
  window.dispatchEvent(new Event('resize'))
  for (const observer of FakeResizeObserver.instances) observer.notify()
  expect(chartState.chart.resize).toHaveBeenCalledTimes(previous)
}

describe('chart lifecycle', () => {
  test('handles generated resize and click traces and releases every registration', async () => {
    vi.stubGlobal('ResizeObserver', FakeResizeObserver)
    const added = vi.spyOn(window, 'addEventListener')
    const removed = vi.spyOn(window, 'removeEventListener')
    await fc.assert(
      fc.asyncProperty(
        fc.array(
          fc.record({
            kind: fc.constantFrom('window', 'observer', 'click'),
            datumId: fc.string(),
          }),
          { minLength: 1, maxLength: 8 },
        ),
        async actions => {
          reset()
          added.mockClear()
          removed.mockClear()
          const element = document.createElement('div')
          await Effect.runPromise(
            Effect.scoped(
              Effect.gen(function* () {
                const pull = yield* Stream.toPull(streamFor(element))
                expect(yield* pull).toEqual([
                  Message.SucceededMountChart({ hostId: 'test-chart-host' }),
                ])
                for (
                  let turn = 0;
                  turn < 100 &&
                  !added.mock.calls.some(([type]) => type === 'resize');
                  turn++
                ) {
                  yield* Effect.yieldNow
                }
                expect(
                  added.mock.calls.filter(([type]) => type === 'resize'),
                ).toHaveLength(1)
                const observer = FakeResizeObserver.instances.at(-1)
                if (observer === undefined)
                  throw new Error('Expected an acquired ResizeObserver')
                expect(observer.element).toBe(element)
                for (const action of actions) {
                  if (action.kind === 'click') {
                    chartState.emit({ data: { id: action.datumId } })
                    expect(yield* pull).toEqual([
                      Message.ClickedChartDatum({ datumId: action.datumId }),
                    ])
                  } else {
                    const previous = chartState.chart.resize.mock.calls.length
                    if (action.kind === 'window') {
                      window.dispatchEvent(new Event('resize'))
                      for (
                        let turn = 0;
                        turn < 100 &&
                        chartState.chart.resize.mock.calls.length === previous;
                        turn++
                      ) {
                        yield* Effect.yieldNow
                      }
                    } else {
                      observer.notify()
                    }
                    expect(chartState.chart.resize).toHaveBeenCalledTimes(
                      previous + 1,
                    )
                  }
                }
              }),
            ),
          )
          expect(
            removed.mock.calls.filter(([type]) => type === 'resize'),
          ).toHaveLength(1)
          expect(FakeResizeObserver.instances[0]?.disconnected).toBe(1)
          assertReleased()
        },
      ),
      { numRuns: 100, seed: 33135 },
    )
  }, 30_000)

  test('releases the chart when the observer constructor fails', async () => {
    reset()
    vi.stubGlobal('ResizeObserver', FakeResizeObserver)
    FakeResizeObserver.failConstruct = true
    const result = await Effect.runPromise(
      Stream.runHead(streamFor(document.createElement('div'))),
    )
    expect(result).toEqual(
      Option.some(
        Message.FailedMountChart({ reason: 'observer constructor rejected' }),
      ),
    )
    assertReleased()
  })

  test('disconnects an observer whose observe call fails', async () => {
    reset()
    vi.stubGlobal('ResizeObserver', FakeResizeObserver)
    FakeResizeObserver.failObserve = true
    const result = await Effect.runPromise(
      Stream.runHead(streamFor(document.createElement('div'))),
    )
    expect(result).toEqual(
      Option.some(Message.FailedMountChart({ reason: 'observe rejected' })),
    )
    expect(FakeResizeObserver.instances[0]?.disconnected).toBe(1)
    assertReleased()
  })

  test('rolls back a partially registered chart click handler', async () => {
    reset()
    vi.stubGlobal('ResizeObserver', FakeResizeObserver)
    chartState.failOn()
    const result = await Effect.runPromise(
      Stream.runHead(streamFor(document.createElement('div'))),
    )
    expect(result).toEqual(
      Option.some(
        Message.FailedMountChart({ reason: 'click registration rejected' }),
      ),
    )
    expect(FakeResizeObserver.instances[0]?.disconnected).toBe(1)
    assertReleased()
  })

  test('reports a non-HTML host without constructing a chart', async () => {
    reset()
    vi.stubGlobal('ResizeObserver', FakeResizeObserver)
    const element = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'svg',
    )
    const result = await Effect.runPromise(Stream.runHead(streamFor(element)))
    expect(result).toEqual(
      Option.some(
        Message.FailedMountChart({
          reason: 'Chart host is not an HTMLElement.',
        }),
      ),
    )
    expect(chartState.init).not.toHaveBeenCalled()
  })
})
