type PlaywrightPage = Readonly<{
    setContent: (html: string) => Promise<unknown>;
    evaluate: <A>(body: string) => Promise<A>;
}>;
type PlaywrightBrowser = Readonly<{
    newPage: () => Promise<PlaywrightPage>;
    close: () => Promise<void>;
}>;
export type PlaywrightBrowserType = Readonly<{
    launch: (options: Readonly<Record<string, never>>) => Promise<PlaywrightBrowser>;
}>;
export {};
