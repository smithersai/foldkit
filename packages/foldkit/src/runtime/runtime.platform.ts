// NOTE: raw platform access for runtime.vibe (VIP-33): development-only
// behavior reads Vite's HMR context, the reduced-motion media query, the
// current location and the microtask queue, which no Effect service covers
// yet (foldkit-25, foldkit-128, foldkit-129), so these reads stay here
// unchanged.

export const hot = import.meta.hot

export const isHot = !!import.meta.hot

export const prefersReducedMotionQuery = (): MediaQueryList =>
  window.matchMedia('(prefers-reduced-motion: reduce)')

export const currentHref = (): string => window.location.href

export const scheduleMicrotask = (callback: () => void): void => {
  queueMicrotask(callback)
}
