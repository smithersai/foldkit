import { Effect, FileSystem as FileSystem_1, Option } from 'effect';
import type { PlatformError } from 'effect/PlatformError';
import { AppRoute } from '../src/route.vibe';
import { type BlogPostEntry } from './blogPosts.vibe';
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
export declare const readTemplateFrom: (indexPath: string, templateCopyPath: string) => Effect.Effect<string, PlatformError, FileSystem_1.FileSystem>;
