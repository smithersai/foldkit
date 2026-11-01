const DEFAULT_AUTO_SCROLL_EDGE_PIXELS = 40
const DEFAULT_AUTO_SCROLL_MAX_SPEED = 15

export const autoScroll = (clientY: number): void => {
  const viewportHeight = window.innerHeight
  const distanceFromTop = clientY
  const distanceFromBottom = viewportHeight - clientY

  if (distanceFromTop < DEFAULT_AUTO_SCROLL_EDGE_PIXELS) {
    const speed =
      DEFAULT_AUTO_SCROLL_MAX_SPEED *
      (1 - distanceFromTop / DEFAULT_AUTO_SCROLL_EDGE_PIXELS)
    window.scrollBy(0, -speed)
  } else if (distanceFromBottom < DEFAULT_AUTO_SCROLL_EDGE_PIXELS) {
    const speed =
      DEFAULT_AUTO_SCROLL_MAX_SPEED *
      (1 - distanceFromBottom / DEFAULT_AUTO_SCROLL_EDGE_PIXELS)
    window.scrollBy(0, speed)
  }
}
