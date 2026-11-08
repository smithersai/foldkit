export const makeIntersectionObserver = (
  callback: IntersectionObserverCallback,
  options: IntersectionObserverInit,
): IntersectionObserver => new IntersectionObserver(callback, options)

export const observeIntersectionTarget = (
  observer: IntersectionObserver,
  target: Element,
): void => observer.observe(target)

export const disconnectIntersectionObserver = (
  observer: IntersectionObserver,
): void => observer.disconnect()
