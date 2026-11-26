import { createRequire } from 'node:module'

import type { PlaywrightBrowserType } from './check-dom-state-parity.vibe'

// CreateRequire has no Effect service; other platform work stays native.
export const loadChromium = (manifestPath: string): PlaywrightBrowserType => {
  const requireFromE2e = createRequire(manifestPath)
  const playwright: Readonly<{ chromium: PlaywrightBrowserType }> =
    requireFromE2e('playwright')
  return playwright.chromium
}
