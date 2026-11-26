// The DOM observation is platform code that a .vibe module does not use directly, and
// Effect has no service for ResizeObserver or element geometry, so the raw code lives here unchanged.

const rectToPosition = (rect: DOMRect): string => `${rect.x},${rect.y}`

/** Calls `onMove` once the element matching `selector` moves, or at once when it is missing.
 *  Aborting `signal` removes the observer and the listeners. */
export const watchElementMovement = (
  selector: string,
  onMove: () => void,
  signal: AbortSignal,
): void => {
  const element = document.querySelector(selector)

  if (!(element instanceof HTMLElement)) {
    onMove()
    return
  }

  const initialPosition = rectToPosition(element.getBoundingClientRect())

  const cleanup = (): void => {
    observer.disconnect()
    window.removeEventListener('scroll', check, { capture: true })
    window.removeEventListener('resize', check)
  }

  const check = (): void => {
    if (rectToPosition(element.getBoundingClientRect()) !== initialPosition) {
      cleanup()
      onMove()
    }
  }

  const observer = new ResizeObserver(check)
  observer.observe(element)
  window.addEventListener('scroll', check, { passive: true, capture: true })
  window.addEventListener('resize', check)

  signal.addEventListener('abort', cleanup)
}
