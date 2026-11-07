// Timers, the default document and window, and the user agent are platform code that a .vibe module
// does not use directly; the key-binding listener installs synchronously, so the raw calls
// live here unchanged.

export type TimerHandle = ReturnType<typeof setTimeout>

export const startTimer = (callback: () => void, ms: number): TimerHandle =>
  setTimeout(callback, ms)

export const cancelTimer = (handle: TimerHandle): void => {
  clearTimeout(handle)
}

export const defaultDocument = (): Document => document

export const defaultWindow = (): Window => window

export const userAgent = (): string | undefined =>
  typeof navigator === 'undefined' ? undefined : navigator.userAgent
