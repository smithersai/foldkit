import { Option } from 'effect';
import type { Plugin } from 'vite';
import { MarkdownDocument } from '../ast/index.js';
import type { FrontmatterDefinition } from './frontmatter.vibe';
import type { NormalizeOptions } from './normalize.vibe';
/** Options for {@link markdown}, {@link parseMarkdown}, and {@link parseMarkdownWithFrontmatter}. */
export type MarkdownPluginOptions = NormalizeOptions & Readonly<{
    frontmatter?: FrontmatterDefinition | undefined;
}>;
/** A parsed document together with its frontmatter fields, when it has any. */
export type ParsedMarkdown = Readonly<{
    document: MarkdownDocument;
    maybeFrontmatter: Option.Option<Readonly<Record<string, string>>>;
}>;
/**
 * Parses markdown source into a typed {@link MarkdownDocument}. Throws on any
 * construct outside the markdown vocabulary, and on malformed options. The
 * {@link markdown} plugin runs this per `.md` module; call it directly for
 * one-off compilation in scripts. Frontmatter, when enabled via the
 * `frontmatter` option, is validated and dropped; use
 * {@link parseMarkdownWithFrontmatter} to read it.
 */
export declare const parseMarkdown: (source: string, options?: MarkdownPluginOptions) => MarkdownDocument;
/**
 * Like {@link parseMarkdown}, but also returns the document's frontmatter
 * fields when the `frontmatter` option is set and the source carries a
 * frontmatter block. The fields arrive as the raw strings the block declares,
 * already validated against the schema, so decoding them with the same schema
 * cannot fail.
 */
export declare const parseMarkdownWithFrontmatter: (source: string, options?: MarkdownPluginOptions) => ParsedMarkdown;
/**
 * Vite plugin that compiles imported `.md` files at build time into typed
 * document modules. Decode the default export with `decodeDocument` and
 * render it with `Markdown.view`. Every module also carries a `frontmatter`
 * named export: with a `frontmatter` schema configured, it holds the
 * document's validated frontmatter fields, and it is `undefined` when the
 * document has no frontmatter block.
 */
export declare const markdown: (options?: MarkdownPluginOptions) => Plugin;
