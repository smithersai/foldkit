// The document reads and writes that dialog, focus and scroll management need
// are platform code that a .vibe module does not use directly, and
// Effect has no service for the DOM, so the raw calls live here. The behavior
// itself is VibeLang in domBehavior.vibe.

export const queryElement = (selector: string): Element | null =>
  document.querySelector(selector)

export const documentNode = (): Document => document

export const documentBody = (): HTMLElement => document.body

export const activeElement = (): Element | null => document.activeElement

export const documentContains = (node: Node): boolean => document.contains(node)

export const overflowYOf = (element: Element): string =>
  getComputedStyle(element).overflowY

/** Installs a document `keydown` listener and returns its remover. */
export const onKeydown = (
  handler: (event: KeyboardEvent) => void,
): (() => void) => {
  document.addEventListener('keydown', handler)
  return () => document.removeEventListener('keydown', handler)
}

/** Dispatches the `cancel` CustomEvent an unhandled Escape raises on a dialog. */
export const dispatchCancelEvent = (element: HTMLDialogElement): void => {
  element.dispatchEvent(new CustomEvent('cancel', { cancelable: true }))
}

export const makeMutationObserver = (
  callback: (mutations: ReadonlyArray<MutationRecord>) => void,
): MutationObserver => new MutationObserver(mutations => callback(mutations))

/** Watches the whole body: child lists, attributes and the subtree. */
export const observeBody = (observer: MutationObserver): void => {
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
  })
}
