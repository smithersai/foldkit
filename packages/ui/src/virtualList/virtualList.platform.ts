export const createResizeObserver = (
  callback: ResizeObserverCallback,
): ResizeObserver => new ResizeObserver(callback)

export const createMutationObserver = (
  callback: MutationCallback,
): MutationObserver => new MutationObserver(callback)

export const observeMutations = (
  observer: MutationObserver,
  target: Node,
  options: MutationObserverInit,
): void => observer.observe(target, options)

export const disconnectMutationObserver = (observer: MutationObserver): void =>
  observer.disconnect()
