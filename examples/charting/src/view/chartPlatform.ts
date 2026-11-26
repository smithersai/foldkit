import type { EChartsType } from 'echarts/core'

// Effect has no ResizeObserver API. Keep the raw browser operations here.
export const createChartResizeObserver = (chart: EChartsType): ResizeObserver =>
  new ResizeObserver(() => chart.resize())

export const observeChartResize = (
  observer: ResizeObserver,
  element: HTMLElement,
): void => {
  observer.observe(element)
}

export const disconnectChartResize = (observer: ResizeObserver): void => {
  observer.disconnect()
}

export const htmlElementOrUndefined = (
  element: Element,
): HTMLElement | undefined =>
  element instanceof HTMLElement ? element : undefined
