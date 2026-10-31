import { Option } from "effect";
import { PostFrontmatter } from '../src/page/blog/frontmatter.vibe';
export declare const PUBLIC_DIR: string;
export declare const maybeCoverMimeType: (src: string) => Option.Option<string>;
/**
 * A cover image as the file it serves from: its root-relative path, its MIME
 * type, and its size in bytes. The RSS feed reports all three on each item's
 * `enclosure`.
 */
export type CoverAsset = Readonly<{
    src: string;
    mimeType: string;
    byteLength: number;
}>;
export type BlogPostEntry = Readonly<{
    slug: string;
    frontmatter: PostFrontmatter;
    maybeCoverAsset: Option.Option<CoverAsset>;
}>;
/**
 * Every blog post's slug and frontmatter, newest first, read from the post
 * markdown sources. This is the node-side mirror of the app's post registry:
 * prerender and metadata read the markdown files directly rather than the
 * app's `posts.ts` registry, which keeps the build scripts off the
 * application's Vite module graph.
 */
export declare const blogPosts: ReadonlyArray<BlogPostEntry>;
export declare const blogPostSlugs: ReadonlyArray<string>;
