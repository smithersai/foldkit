// console.error is platform code that a .vibe module does not use directly (VIP-33); the
// rejected event detail is reported synchronously from a DOM event handler, so the raw call lives here.

export const reportEventDetailError = (label: string, cause: unknown): void => {
  console.error(label, cause)
}
