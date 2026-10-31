export const browserDocument = (): Document => document

export const elementWithId = (id: string): HTMLElement | null =>
  document.getElementById(id)
