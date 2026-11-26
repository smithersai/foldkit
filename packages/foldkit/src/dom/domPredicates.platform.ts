// Each check reads its original host constructor only when the check runs.
export const asHtmlElement = (element: Element | null): HTMLElement | null =>
  element instanceof HTMLElement ? element : null

export const asDialogElement = (
  element: Element | null,
): HTMLDialogElement | null =>
  element instanceof HTMLDialogElement ? element : null

export const isElementNode = (node: Node): node is Element =>
  node instanceof Element

export const isDocumentFragmentNode = (node: Node): node is DocumentFragment =>
  node instanceof DocumentFragment

export const isHtmlElementNode = (node: Node): node is HTMLElement =>
  node instanceof HTMLElement

export const isHiddenInputElement = (element: Element): boolean =>
  element instanceof HTMLInputElement && element.type === 'hidden'
