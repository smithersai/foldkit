// requestAnimationFrame and its high-resolution timestamps are platform code that a .vibe module
// does not use directly, and Effect has no service for the browser's animation callbacks,
// so the frame loop lives here unchanged.

/** Starts a `requestAnimationFrame` loop that reports the inter-frame delta in
 *  milliseconds; the returned function cancels the pending frame. */
export const startAnimationFrameLoop = (
  onFrame: (deltaTime: number) => void,
): (() => void) => {
  const state = {
    frameId: 0,
    lastTime: performance.now(),
  }

  const tick = (now: number): void => {
    const deltaTime = now - state.lastTime
    state.lastTime = now
    onFrame(deltaTime)
    state.frameId = requestAnimationFrame(tick)
  }

  state.frameId = requestAnimationFrame(tick)
  return () => cancelAnimationFrame(state.frameId)
}
