import type { DocumentRenderer } from './document.vibe';
import type { RenderedApplication } from './server.vibe';
import { type InjectIntoTemplateOptions } from './template.js';
/** Optional HTTP metadata for a rendered application.
 *
 * @experimental Ships from `foldkit/experimental/server`; expect breaking changes while the API settles.
 */
export type ResponseOptions = Readonly<{
    status?: number;
    headers?: HeadersInit;
}>;
/** A server entry result whose application markup still needs a document.
 *
 * @experimental Ships from `foldkit/experimental/server`; expect breaking changes while the API settles.
 */
export type Rendered = Readonly<{
    _tag: 'Rendered';
    application: RenderedApplication;
    status?: number;
    headers?: HeadersInit;
}>;
/** Constructs a rendered server entry result with optional HTTP status and
 * headers.
 *
 * @experimental Ships from `foldkit/experimental/server`; expect breaking changes while the API settles.
 */
export declare const Rendered: (application: RenderedApplication, options?: ResponseOptions) => Rendered;
/** A server entry result that bypasses application rendering and returns a
 * complete Web `Response`, such as a redirect or another non-page response to
 * a page request. A dedicated data API belongs on a separate backend rather
 * than the render host; this is for responses the page request itself
 * resolves without rendering the shell.
 *
 * @experimental Ships from `foldkit/experimental/server`; expect breaking changes while the API settles.
 */
export type Responded = Readonly<{
    _tag: 'Responded';
    response: Response;
}>;
/** Constructs a complete Web `Response` server entry result.
 *
 * @experimental Ships from `foldkit/experimental/server`; expect breaking changes while the API settles.
 */
export declare const Responded: (response: Response) => Responded;
/** The result of handling one request through a Foldkit server entry.
 *
 * @experimental Ships from `foldkit/experimental/server`; expect breaking changes while the API settles.
 */
export type EntryResult = Rendered | Responded;
/** The module shape a Foldkit server entry exports for hosts to call: one Web
 * `Request` in, one delivery result out.
 *
 * The outer boundary is a `Promise` so Vite, build scripts, serverless
 * functions, and long-running HTTP hosts can call it without owning the
 * application's Effect requirements. The entry may use Effect internally and
 * settles that work before returning. Rendering itself must run in the same
 * Foldkit module instance as the application's view because the HTML builder's
 * render frame is module-local.
 *
 * @experimental Ships from `foldkit/experimental/server`; expect breaking changes while the API settles.
 */
export type EntryModule = Readonly<{
    renderPage: (request: Request) => Promise<EntryResult>;
}>;
/** The server entry shape used when the application renders the complete HTML document.
 *
 * @experimental Ships from `foldkit/experimental/server`; expect breaking changes while the API settles.
 */
export type DocumentEntryModule = EntryModule & Readonly<{
    renderDocument: DocumentRenderer;
}>;
/** Turns a server entry result into the Web `Response` a host sends. Supply a
 * document renderer, or an HTML template for a host that owns one. Rendered
 * applications default to status 200 with a UTF-8 HTML content type. Complete
 * responses pass through unchanged without calling the document renderer.
 *
 * @experimental Ships from `foldkit/experimental/server`; expect breaking changes while the API settles.
 */
export declare const toResponse: (document: string | ((application: RenderedApplication) => string), result: EntryResult, options?: InjectIntoTemplateOptions) => Response;
