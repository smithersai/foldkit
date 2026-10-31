export const createIntersectionObserver = (
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit,
): IntersectionObserver => new IntersectionObserver(callback, options)
