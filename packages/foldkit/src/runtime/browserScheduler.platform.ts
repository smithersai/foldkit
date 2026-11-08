export const microtaskSetImmediate = (callback: () => void): (() => void) => {
  let cancelled = false
  queueMicrotask(() => {
    if (!cancelled) callback()
  })
  return () => {
    cancelled = true
  }
}
