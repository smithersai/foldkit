import { type EntryResult } from './entry.vibe';
import type { RenderedApplication } from './server.vibe';
/** How {@link handleRequest} renders a page request.
 *
 * @experimental Ships from `foldkit/experimental/server`; expect breaking changes while the API settles.
 */
export type HandleRequestOptions = Readonly<{
    /**
     * The application's server entry. One Web `Request` in, one delivery
     * result out.
     */
    renderPage: (request: Request) => Promise<EntryResult>;
}> & (Readonly<{
    /** Produces the complete HTML document for a rendered application. */
    renderDocument: (application: RenderedApplication) => string;
    template?: never;
    containerId?: never;
}> | Readonly<{
    /** The unfilled HTML shell owned by a custom host. */
    template: string;
    /** The empty container replaced by the application. Defaults to `'root'`. */
    containerId?: string;
    renderDocument?: never;
}>);
/**
 * Answers one request as a Web `fetch` handler: refuse methods the
 * `Request` constructor cannot represent, classify a static miss so a
 * hashed asset is not answered with the application shell, and otherwise
 * call `renderPage`.
 *
 * Static files are the platform's job. This function is what remains
 * after Vite, a file server, or Worker assets have already missed.
 * Node and workerd both call it, so development predicts production.
 *
 * `Request.url` is trusted as the platform constructed it. On Workers and
 * Deno that is the URL the platform resolved. A Node adapter receives a raw
 * request target instead, which may be an absolute URL or a network-path
 * reference naming another host, so the adapter resolves that target
 * against its configured origin with `resolveRequestUrl` and refuses an
 * off-origin one before constructing the `Request` it passes here.
 *
 * @experimental Ships from `foldkit/experimental/server`; expect breaking changes while the API settles.
 */
export declare const handleRequest: (request: Request, options: HandleRequestOptions) => Promise<Response>;
