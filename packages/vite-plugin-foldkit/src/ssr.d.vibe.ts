import type { ServerResponse } from 'node:http';
import type { Connect, ViteDevServer } from 'vite';
export { foldkitSsr } from './ssrPlugin.ts';
/** Options for serving server-rendered pages from the Vite dev server. */
export type FoldkitSsrOptions = Readonly<{
    /**
     * Module path of the server entry, resolved by Vite (e.g.
     * `'/src/entry.server.ts'`). The module must export a `renderPage`
     * function taking a Web `Request` and returning a
     * `Promise<EntryResult>`.
     */
    serverEntry: string;
    /**
     * Root-relative browser script entry for a code-rendered document. The server entry must
     * also export `renderDocument(application, assets)`. When absent, the dev
     * host uses `index.html` for a custom template-based build pipeline.
     */
    clientEntry?: string;
    /**
     * The `id` of the empty container element in `index.html` the rendered
     * markup replaces. Defaults to `'root'`.
     */
    containerId?: string;
    /**
     * The origin the entry sees as `Request.url`, such as
     * `'https://app.example'`. Defaults to the origin the dev server itself
     * resolved from its own configuration.
     *
     * The origin is deployment configuration rather than something a request
     * carries. A client chooses its own `Host` header, and Vite accepts IP
     * literals and (with `allowedHosts`) arbitrary names, so deriving the origin
     * from the request would let the client pick the redirects, canonical URLs,
     * and cookie domains an entry builds from `Request.url`. Set this when the
     * dev server sits behind a proxy or TLS terminator that serves a different
     * public origin.
     */
    origin?: string;
    /**
     * The deployment id compiled into a server entry when `foldkitSsr` is used
     * as a standalone plugin. It defaults to `FOLDKIT_BUILD_ID`, or to the fixed
     * development id in serve mode. The aggregate `foldkit` plugin supplies its
     * top-level `buildId` here automatically.
     *
     * The value is public in rendered HTML, so it must not be a secret.
     */
    buildId?: string;
    /**
     * Skip the stand-down warning when the `ssr` environment is not runnable.
     * The aggregate plugin sets this when `ssr.build` is on, because production
     * still needs `serverEntry` and the host is supposed to serve.
     */
    quietStandDown?: boolean;
}>;
export declare const requestTargetMiddleware: (server: ViteDevServer, options: FoldkitSsrOptions, requestUrls: WeakMap<Connect.IncomingMessage, string>, render: Connect.NextHandleFunction) => Connect.NextHandleFunction;
type HeaderValue = string | number | ReadonlyArray<string> | undefined;
type HeaderMutation = Readonly<{
    name: string;
    before: HeaderValue;
    after: HeaderValue;
}>;
type HeaderWriteTracking = Readonly<{
    names: ReadonlySet<string>;
    stop: () => void;
}>;
export type CorsResponseState = Readonly<{
    mutations: ReadonlyArray<HeaderMutation>;
    tracking: HeaderWriteTracking;
}>;
/** A Vite CORS middleware layer and the handler it installed. */
export type ViteCorsLayer = Readonly<{
    layer: Connect.ServerStackItem;
    handle: Connect.HandleFunction;
}>;
/**
 * Vite's CORS middleware on the dev server's stack, the ownership boundary the
 * host wraps, or `undefined` on a Vite whose stack has none.
 */
export declare const findViteCorsLayer: (server: ViteDevServer) => ViteCorsLayer | undefined;
/**
 * Vite's CORS handler wrapped at the ownership boundary: the request target
 * is validated first, preflights Vite does not own pass through, and the
 * headers CORS wrote are recorded so the render middleware can restore the
 * application's own.
 */
export declare const wrapCorsHandle: (viteCors: Connect.HandleFunction, server: ViteDevServer, options: FoldkitSsrOptions, requestUrls: WeakMap<Connect.IncomingMessage, string>, stateByRequest: WeakMap<Connect.IncomingMessage, CorsResponseState>) => Connect.NextHandleFunction;
export declare const renderMiddleware: (server: ViteDevServer, options: FoldkitSsrOptions, requestUrls: WeakMap<Connect.IncomingMessage, string>, stateByRequest: WeakMap<Connect.IncomingMessage, CorsResponseState>) => (nodeRequest: Connect.IncomingMessage, nodeResponse: ServerResponse, next: Connect.NextFunction) => void;
