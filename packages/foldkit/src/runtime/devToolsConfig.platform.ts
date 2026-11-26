// window.self and window.top are platform code that a .vibe module does not use directly.

/** Whether the page runs inside another document's frame. */
export const isEmbeddedInFrame = (): boolean => window.self !== window.top
