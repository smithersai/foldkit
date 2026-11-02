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
