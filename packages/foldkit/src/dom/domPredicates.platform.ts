// Each check reads its original host constructor only when the check runs.
export const asHtmlElement = (element: Element | null): HTMLElement | null =>
  element instanceof HTMLElement ? element : null

export const asDialogElement = (
  element: Element | null,
): HTMLDialogElement | null =>
  element instanceof HTMLDialogElement ? element : null
