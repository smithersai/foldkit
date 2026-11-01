export const createResizeObserver = (
  callback: ResizeObserverCallback,
): ResizeObserver => new ResizeObserver(callback)

export const isHtmlElement = (value: unknown): value is HTMLElement =>
  value instanceof HTMLElement
