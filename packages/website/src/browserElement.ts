export const isHtmlElement = (element: Element): element is HTMLElement =>
  element instanceof HTMLElement

export const isHtmlIframeElement = (
  element: Element,
): element is HTMLIFrameElement => element instanceof HTMLIFrameElement
