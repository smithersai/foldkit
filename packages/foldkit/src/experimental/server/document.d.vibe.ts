import { Schema } from 'effect';
import type { RenderedApplication } from './server.ts';
/** Browser assets supplied to the server entry's document renderer.
 *
 * @experimental Ships from `foldkit/experimental/server`; expect breaking changes while the API settles.
 */
export declare const DocumentAssets: Schema.Struct<{
    readonly entryScript: Schema.String;
    readonly stylesheets: Schema.$Array<Schema.String>;
    readonly modulePreloads: Schema.$Array<Schema.String>;
}>;
/** The resolved browser asset URLs for one document.
 *
 * @experimental Ships from `foldkit/experimental/server`; expect breaking changes while the API settles.
 */
export type DocumentAssets = typeof DocumentAssets.Type;
/** Produces a complete HTML document from application markup and browser assets.
 *
 * @experimental Ships from `foldkit/experimental/server`; expect breaking changes while the API settles.
 */
export type DocumentRenderer = (application: RenderedApplication, assets: DocumentAssets) => string;
/** Author-owned defaults and additional head markup for {@link renderDocument}.
 *
 * @experimental Ships from `foldkit/experimental/server`; expect breaking changes while the API settles.
 */
export type DocumentOptions = Readonly<{
    /** Default language, overridden by the application's Document. Defaults to English. */
    lang?: string;
    /** Trusted HTML to add to the head, such as a favicon or site-wide metadata. Never pass unescaped request data. */
    head?: string;
}>;
/** Renders a complete document with UTF-8, a viewport, application metadata,
 * stylesheets, module preloads, and the client entry. The application supplies
 * the title, language, direction, canonical URL, and Open Graph URL. Additional
 * head markup belongs to the server entry through {@link DocumentOptions}.
 *
 * The rendered application's hydration markers and Flags payload are preserved.
 * Ambiguous application roots or handoff markers are rejected.
 *
 * @experimental Ships from `foldkit/experimental/server`; expect breaking changes while the API settles.
 */
export declare const renderDocument: (application: RenderedApplication, assets: DocumentAssets, options?: DocumentOptions) => string;
