import { Effect, FileSystem, Option, Schema } from 'effect';
import type { UnknownError } from 'effect/Cause';
import type { PlatformError } from 'effect/PlatformError';
import { AppRoute } from '../src/route.vibe';
import { type BlogPostEntry } from './blogPosts.vibe';
import { generateOgImages } from './og-image.vibe';
declare const PrerenderError_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "PrerenderError";
} & Readonly<A>;
declare class PrerenderError extends PrerenderError_base<{
    readonly message: string;
}> {
}
export declare const STATIC_ROUTES: ReadonlyArray<AppRoute>;
export declare const INDEX_OUTPUT_PATH = "index.html";
export declare const routeToOutputPath: (route: AppRoute) => string;
export declare const enumerateRoutes: (apiModuleSlugs: ReadonlyArray<string>) => ReadonlyArray<AppRoute>;
export declare const NOT_FOUND_ROUTE: {
    readonly _tag: "NotFound";
    readonly path: string;
};
export declare const NOT_FOUND_OUTPUT_PATH = "404.html";
/**
 * Extracts a prerendered blog post page's `article` element, the cover, the
 * header, and the rendered prose, leaving out the surrounding site chrome.
 */
export declare const extractPostArticleHtml: (pageHtml: string) => Option.Option<string>;
/**
 * Prepares an extracted article for the feed: root-relative links and image
 * sources become absolute, since feed readers resolve them against nothing,
 * and the back-to-blog link is dropped, since it only makes sense on the site.
 */
export declare const toFeedArticleHtml: (articleHtml: string) => string;
export declare const buildBlogRssFeed: (posts: ReadonlyArray<BlogPostEntry>, articleHtmlBySlug: ReadonlyMap<string, string>) => string;
export declare const readTemplateFrom: (indexPath: string, templateCopyPath: string) => Effect.Effect<string, PlatformError, FileSystem.FileSystem>;
type PrerenderFailure = PrerenderError | PlatformError | Schema.SchemaError | UnknownError | Effect.Error<ReturnType<typeof generateOgImages>>;
export declare function main(): Effect.Effect<void, PrerenderFailure, never>;
export {};
