// requestAnimationFrame is platform code that a .vibe module does not use directly (VIP-33), and
// Effect has no service for the browser's animation callbacks, so the raw calls live here unchanged.

/** Schedules `onFrame` for the next animation frame; the returned function cancels it. */
export const requestFrame = (onFrame: () => void): (() => void) => {
  const handle = requestAnimationFrame(onFrame)
  return () => cancelAnimationFrame(handle)
}
