// document and window.location are platform code that a .vibe module does not use directly
//; makeApplication resolves its container synchronously, so the raw reads live here.

export const currentDocument = (): Document => document

export const locationHref = (): string => window.location.href
