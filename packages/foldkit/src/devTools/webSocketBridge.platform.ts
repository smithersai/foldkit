// NOTE: raw platform access for webSocketBridge.vibe (VIP-33): VibeLang code
// reaches the platform through Effect services, and Effect has none for the
// console warning, the page's location and title or the window event target
// yet (foldkit-50), so these calls stay here unchanged.

/** @throws {never} */
export const warnDevTools = (message: string, error: unknown): void => {
  console.warn(message, error)
}

export const currentPageInfo = (): Readonly<{
  url: string
  title: string
}> => ({
  url: window.location.href,
  title: document.title,
})

/** @throws {never} */
export const addPageShowListener = (
  listener: (event: PageTransitionEvent) => void,
): (() => void) => {
  window.addEventListener('pageshow', listener)
  return () => {
    window.removeEventListener('pageshow', listener)
  }
}
