import { type ExampleMeta } from '../src/page/example/meta.vibe';
import { type BlogPostEntry } from './blogPosts.vibe';
import { type PageMetadata } from './metadata.vibe';
/** The only version of the content API that is currently served. */
export declare const API_VERSION = "v1";
export declare const API_BASE_PATH = "/api/v1";
/** The advisory request ceiling reported by the `RateLimit` header fields. */
export declare const RATE_LIMIT_QUOTA = 600;
export declare const RATE_LIMIT_WINDOW_SECONDS = 60;
export declare const RATE_LIMIT_POLICY_NAME = "default";
/** How long a deprecated version keeps answering after its `Deprecation` date. */
export declare const DEPRECATION_NOTICE_DAYS = 180;
/**
 * The `type` URI of a problem document, pointing at the heading on the API page
 * that documents that error.
 */
export declare const problemTypeUrl: (slug: string) => string;
export declare const apiPagePath: (urlPath: string) => string;
export declare const apiPageUrl: (urlPath: string) => string;
export type ApiPageEntry = Readonly<{
    urlPath: string;
    metadata: PageMetadata;
    markdown: string;
}>;
export declare const buildPagesIndex: (entries: ReadonlyArray<ApiPageEntry>, generated: string) => unknown;
export declare const buildPageDocument: (entry: ApiPageEntry, generated: string) => unknown;
export declare const buildSectionsIndex: (entries: ReadonlyArray<ApiPageEntry>, generated: string) => unknown;
export declare const buildExamplesIndex: (examples: ReadonlyArray<ExampleMeta>, generated: string) => unknown;
export declare const buildBlogIndex: (posts: ReadonlyArray<BlogPostEntry>, generated: string) => unknown;
type EndpointCounts = Readonly<{
    pageCount: number;
    exampleCount: number;
    postCount: number;
}>;
export declare const buildServiceIndex: ({ pageCount, exampleCount, postCount }: EndpointCounts, generated: string) => unknown;
type Problem = Readonly<{
    slug: string;
    title: string;
    status: number;
    code: string;
    detail: string;
    hints: ReadonlyArray<string>;
}>;
export declare const buildProblemDocument: (problem: Problem) => unknown;
export declare const NOT_FOUND_PROBLEM: Problem;
export declare const METHOD_NOT_ALLOWED_PROBLEM: Problem;
export declare const PROBLEMS: ReadonlyArray<Problem>;
export declare const problemPath: (problem: Problem) => string;
/** The site-wide JSON error body, served for unknown paths in any format. */
export declare const SITE_NOT_FOUND_PATH = "/404.json";
export type ContentApiDocument = Readonly<{
    path: string;
    document: unknown;
}>;
export type ContentApiInput = Readonly<{
    pages: ReadonlyArray<ApiPageEntry>;
    examples: ReadonlyArray<ExampleMeta>;
    posts: ReadonlyArray<BlogPostEntry>;
    generated: string;
}>;
/**
 * Every JSON document the build writes into `dist`, as the path it is served
 * from and the value to serialize. The prerender script only writes what this
 * returns, so a document that stops being listed here stops being published,
 * and `contentApi.test.ts` fails.
 */
export declare const contentApiDocuments: ({ pages, examples, posts, generated, }: ContentApiInput) => ReadonlyArray<ContentApiDocument>;
export {};
