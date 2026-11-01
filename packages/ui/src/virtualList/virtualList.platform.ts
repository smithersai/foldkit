export const createResizeObserver = (
  callback: ResizeObserverCallback,
): ResizeObserver => new ResizeObserver(callback)
