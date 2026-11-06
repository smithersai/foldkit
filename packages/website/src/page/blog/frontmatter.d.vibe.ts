import { Option, Schema } from 'effect';
/**
 * Frontmatter schema for blog posts. One schema drives both halves of the
 * pipeline: the markdown Vite plugin validates every post's frontmatter
 * against it at build time (unknown fields, missing fields, and malformed
 * values all fail the build), and the post registry decodes the emitted
 * `frontmatter` export with it at module load. Dates must be real calendar
 * dates in `YYYY-MM-DD` form, leap years included.
 *
 * A post with a cover declares all four `coverImage*` fields together.
 * `coverImage` is a root-relative path to a file under `public/`, by
 * convention `/blog/<slug>/cover.<ext>`. An empty `coverImageAlt` marks the
 * image decorative. `coverImageWidth` and `coverImageHeight` are the file's
 * pixel dimensions, which the views use to reserve layout space before the
 * image loads.
 *
 * Kept dependency-light (Schema only) so `vite.config.ts` and
 * `vitest.config.ts` can import it without pulling in the browser view layer.
 */
export declare const PostFrontmatter: Schema.Struct<{
    readonly title: Schema.String;
    readonly description: Schema.String;
    readonly date: Schema.String;
    readonly coverImage: Schema.optional<Schema.String>;
    readonly coverImageAlt: Schema.optional<Schema.String>;
    readonly coverImageWidth: Schema.optional<Schema.String>;
    readonly coverImageHeight: Schema.optional<Schema.String>;
}>;
export type PostFrontmatter = typeof PostFrontmatter.Type;
/**
 * A post's cover image: the root-relative path it serves from, its alt text
 * (empty for a decorative image), and its pixel dimensions, which reserve
 * layout space before the image loads.
 */
export type PostCover = Readonly<{
    src: string;
    alt: string;
    width: number;
    height: number;
}>;
/**
 * The cover a post's frontmatter declares, when it declares one. The schema
 * guarantees the four cover fields travel together, so a partial declaration
 * reads as no cover rather than a broken one.
 */
export declare const maybePostCover: (frontmatter: PostFrontmatter) => Option.Option<PostCover>;
