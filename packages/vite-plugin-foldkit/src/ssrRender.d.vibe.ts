import { Effect } from 'effect';
import type { Connect, ViteDevServer } from 'vite';
import type { FoldkitSsrOptions } from './ssr.vibe';
/**
 * Renders one application-owned request with the Node platform services the
 * renderer needs. The middleware runs it with `Effect.runPromise`.
 *
 * @internal
 */
export declare const renderPage: (server: ViteDevServer, options: FoldkitSsrOptions, nodeRequest: Connect.IncomingMessage, requestUrl: string) => Effect.Effect<globalThis.Response>;
