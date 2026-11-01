// document reads are platform code that a .vibe module does not use directly (VIP-33); the handoff
// locates server-rendered roots and Flags payloads synchronously, so the raw reads live here.

export const queryAll = <T extends Element>(selector: string): Array<T> =>
  Array.from(document.querySelectorAll<T>(selector))

export const currentDocument = (): Document => document
