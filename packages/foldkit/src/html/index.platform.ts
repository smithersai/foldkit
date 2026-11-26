// NOTE: raw DOM access for index.vibe: VibeLang code reaches the
// platform through Effect services, and Effect has none for the element and
// event predicates, element lookup by selector or microtask scheduling yet
//, so these calls stay here unchanged. They run
// inside synchronous DOM event handlers, which no service could serve anyway.

export const isElement = (value: unknown): value is Element =>
  value instanceof Element

export const isNode = (value: unknown): value is Node => value instanceof Node

export const isCustomEvent = (event: Event): event is CustomEvent =>
  event instanceof CustomEvent

export const focusElementMatching = (selector: string): void => {
  const focusTarget = document.querySelector(selector)
  if (focusTarget instanceof HTMLElement) {
    focusTarget.focus()
  }
}

export const scheduleMicrotask = (callback: () => void): void => {
  queueMicrotask(callback)
}
