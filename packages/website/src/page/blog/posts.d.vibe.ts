import { Option } from 'effect';
import { PostFrontmatter } from './frontmatter.vibe';
/**
 * A blog post: its slug, its decoded frontmatter, and its compiled markdown
 * document. The document stays encoded here; the post page view turns it into
 * rendered prose. Keeping this module free of the view layer lets tests and
 * the app shell read post metadata without entering the render import graph.
 */
export type BlogPost = Readonly<{
    slug: string;
    frontmatter: PostFrontmatter;
    document: unknown;
}>;
/** Every blog post, newest first. */
export declare const posts: ReadonlyArray<BlogPost>;
/** Looks up a post by the slug in its URL. */
export declare const findPostBySlug: (slug: string) => Option.Option<BlogPost>;
/** Formats a post's `YYYY-MM-DD` date for display, e.g. `August 1, 2026`. */
export declare const formatPostDate: (date: string) => string;
