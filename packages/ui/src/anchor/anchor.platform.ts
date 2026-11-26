export const browserDocument = (): Document => document
export const requestFrame = (callback: FrameRequestCallback): number =>
  requestAnimationFrame(callback)
export const computedStyle = (element: Element): CSSStyleDeclaration =>
  getComputedStyle(element)
export const isHtmlElement = (value: unknown): value is HTMLElement =>
  value instanceof HTMLElement
export const isShadowRoot = (value: unknown): value is ShadowRoot =>
  value instanceof ShadowRoot
export const isKeyboardEvent = (value: unknown): value is KeyboardEvent =>
  value instanceof KeyboardEvent
export const portalElementCleanup =
  (element: Element, portalRoot: HTMLElement): (() => void) =>
  () => {
    try {
      element.remove()
    } catch {
      // NOTE: a re-render may unmount the element before this cleanup fires,
      // so the remove() call can throw on a node that's already been removed.
      // Swallow the error.
    }

    // NOTE: a modal overlay isolates siblings before its Mount portals the
    // panel. An empty shared root would become inert, then receive the panel.
    // Removing empty roots lets the next open create one after isolation.
    // Dialog roots must also be removed so a reopened dialog appends its portal
    // root after the newly rendered content. Occupied shared roots are retained;
    // opening a modal overlay while one exists can still make its panel inert.
    if (!portalRoot.hasChildNodes()) {
      portalRoot.remove()
    }
  }
