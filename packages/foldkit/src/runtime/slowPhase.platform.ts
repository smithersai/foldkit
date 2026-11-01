// performance.now and console.warn are platform code that a .vibe module does not use directly
// (VIP-33); the slow-phase measurement wraps a synchronous render phase, so the raw calls live here.

export const nowMilliseconds = (): number => performance.now()

export const warnSlowPhase = (...args: ReadonlyArray<unknown>): void => {
  console.warn(...args)
}
