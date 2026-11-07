// NOTE: raw platform access for renderer.vibe: the render frame is
// scheduled with requestAnimationFrame and the duplicate-id scan runs under
// Vite's HMR flag, which no Effect service covers yet, so these calls stay here unchanged.

export const isHot = !!import.meta.hot

export const requestFrame = (callback: FrameRequestCallback): void => {
  requestAnimationFrame(callback)
}

/** Puts the container back where the placeholder node sits, then empties it. */
/** @throws {never} */
export const replacePlaceholderWithContainer = (
  placeholderNode: Node | null | undefined,
  container: HTMLElement,
): void => {
  if (placeholderNode && placeholderNode.parentNode) {
    placeholderNode.parentNode.replaceChild(container, placeholderNode)
    container.replaceChildren()
  }
}
