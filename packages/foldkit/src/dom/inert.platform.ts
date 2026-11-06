// NOTE: raw DOM access for inert.vibe (VIP-33): VibeLang code reaches the
// platform through Effect services, and Effect has none for element lookup,
// the document body or the HTML element predicate yet (foldkit-30,
// foldkit-64), so these calls stay here unchanged.

export const queryElement = (selector: string): Element | null =>
  document.querySelector(selector)

export const isHTMLElement = (
  element: Element | null,
): element is HTMLElement => element instanceof HTMLElement

export const isDocumentBody = (element: HTMLElement): boolean =>
  element === document.body
