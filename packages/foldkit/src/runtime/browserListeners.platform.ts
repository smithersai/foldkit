// NOTE: raw DOM access for browserListeners.vibe: VibeLang code
// reaches the platform through Effect services, and Effect has none for the
// window and document event targets, the current location or the element
// predicate yet, so these calls stay here
// unchanged. The listeners are synchronous callbacks, so no service could
// serve them anyway.

export const addWindowListener = (
  type: string,
  listener: () => void,
): (() => void) => {
  window.addEventListener(type, listener)
  return () => {
    window.removeEventListener(type, listener)
  }
}

export const addDocumentClickListener = (
  listener: (event: MouseEvent) => void,
): (() => void) => {
  document.addEventListener('click', listener)
  return () => {
    document.removeEventListener('click', listener)
  }
}

export const currentHref = (): string => window.location.href

export const isElement = (target: EventTarget | null): target is Element =>
  target instanceof Element
