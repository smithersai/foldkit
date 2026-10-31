export const detectPlaygroundSupport = (): boolean =>
  window.crossOriginIsolated === true &&
  typeof SharedArrayBuffer !== 'undefined' &&
  !navigator.userAgent.includes('Firefox/')
