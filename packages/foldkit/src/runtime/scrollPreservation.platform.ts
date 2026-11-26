// sessionStorage and the window scroll offset are platform code that a .vibe module does not use
// directly; the preservation API is synchronous (it runs inside Vite's beforeFullReload
// handler), so the raw calls live here unchanged.

export const writeSessionItem = (key: string, value: string): void => {
  window.sessionStorage.setItem(key, value)
}

export const takeSessionItem = (key: string): string | null => {
  const value = window.sessionStorage.getItem(key)
  window.sessionStorage.removeItem(key)
  return value
}

export const windowScrollOffset = (): {
  readonly x: number
  readonly y: number
} => ({
  x: window.scrollX,
  y: window.scrollY,
})

export const scrollWindowInstantly = (x: number, y: number): void => {
  window.scrollTo({ left: x, top: y, behavior: 'instant' })
}
