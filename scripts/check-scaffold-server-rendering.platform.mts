import { createRequire } from 'node:module'

// The shape of Playwright this gate drives. The package is resolved from the
// examples-e2e workspace, so the types stay local to the two files that use it.
export type PlaywrightConsoleMessage = Readonly<{
  type: () => string
  text: () => string
}>

export type PlaywrightLocator = Readonly<{
  click: () => Promise<void>
  textContent: () => Promise<string | null>
}>

export type PlaywrightResponse = Readonly<{
  status: () => number
  text: () => Promise<string>
}>

export type PlaywrightRoute = Readonly<{
  fetch: () => Promise<PlaywrightResponse>
  fulfill: (options: {
    response: PlaywrightResponse
    body: string
  }) => Promise<void>
}>

export type PlaywrightPage = Readonly<{
  route: (
    url: string,
    handler: (route: PlaywrightRoute) => Promise<void>,
  ) => Promise<void>
  goto: (
    url: string,
    options: { waitUntil: 'domcontentloaded' },
  ) => Promise<PlaywrightResponse | null>
  waitForFunction: (
    expression: string,
    argument?: unknown,
    options?: { timeout?: number },
  ) => Promise<void>
  evaluate: <A>(expression: string) => Promise<A>
  locator: (selector: string) => PlaywrightLocator
  getByRole: (role: string, options: { name: string }) => PlaywrightLocator
  url: () => string
  on: {
    (event: 'pageerror', listener: (error: Error) => void): void
    (
      event: 'console',
      listener: (message: PlaywrightConsoleMessage) => void,
    ): void
  }
  close: () => Promise<void>
}>

export type PlaywrightBrowser = Readonly<{
  newPage: () => Promise<PlaywrightPage>
  close: () => Promise<void>
}>

export type PlaywrightBrowserType = Readonly<{
  launch: (options: { executablePath?: string }) => Promise<PlaywrightBrowser>
}>

// foldkit-106: createRequire has no Effect service; the module-relative
// require of the examples-e2e Playwright stays native.
export const loadChromium = (manifestPath: string): PlaywrightBrowserType => {
  const requireFromE2e = createRequire(manifestPath)
  const playwright: Readonly<{ chromium: PlaywrightBrowserType }> =
    requireFromE2e('playwright')
  return playwright.chromium
}

// foldkit-106: the gate exits the host itself after stopping the generated
// servers on SIGINT and SIGTERM, and on a failed run, without running the
// program's finalizers, as the original did. Effect has no service for the
// host's exit, so the one call stays native.
export const exitProcess = (exitCode: number): never => process.exit(exitCode)
