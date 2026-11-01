// console.warn is platform code that a .vibe module does not use directly (VIP-33); the
// hydration mismatch report is a synchronous dev-only warning, so the raw call lives here.

export const warnHydrationMismatch = (message: string): void => {
  console.warn(message)
}
