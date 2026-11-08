export const geolocationIsUnavailable = (): boolean =>
  typeof navigator === 'undefined' || !navigator.geolocation

export const createMarkerButton = (): HTMLButtonElement =>
  document.createElement('button')

export const lockBodyScroll = (): void => {
  document.body.classList.add('overflow-hidden')
}

export const unlockBodyScroll = (): void => {
  document.body.classList.remove('overflow-hidden')
}

export const isElement = (value: unknown): value is Element =>
  value instanceof Element

export const isHtmlElement = (value: unknown): value is HTMLElement =>
  value instanceof HTMLElement

export const asHtmlElement = (value: Element): HTMLElement | null =>
  value instanceof HTMLElement ? value : null

export const registerMapListeners = (
  map: {
    on(event: 'moveend', listener: () => void): unknown
    off(event: 'moveend', listener: () => void): unknown
  },
  container: HTMLElement,
  onMoveEnd: () => void,
  onContainerClick: (event: MouseEvent) => void,
): {
  container: HTMLElement
  onMoveEnd: () => void
  onContainerClick: (event: MouseEvent) => void
} => {
  try {
    map.on('moveend', onMoveEnd)
    container.addEventListener('click', onContainerClick)
    return { container, onMoveEnd, onContainerClick }
  } catch (error) {
    map.off('moveend', onMoveEnd)
    container.removeEventListener('click', onContainerClick)
    throw error
  }
}
