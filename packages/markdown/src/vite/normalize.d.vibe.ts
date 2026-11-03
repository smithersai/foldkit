import type { Root } from 'mdast';
import { MarkdownDocument } from '../ast/index.js';
import type { IslandDefinitions } from '../island/index.js';
/**
 * Options for {@link normalizeRoot}. `islands`, when provided, maps each
 * allowed directive name to the schema for its attributes; unknown names,
 * unknown attributes, and attribute values outside the schema all fail with
 * an error naming the offender.
 */
export type NormalizeOptions = Readonly<{
    islands?: IslandDefinitions | undefined;
}>;
/**
 * Converts a parsed mdast tree into a typed {@link MarkdownDocument}.
 * Throws on any node outside the markdown vocabulary.
 */
export declare const normalizeRoot: (root: Root, options?: NormalizeOptions) => MarkdownDocument;
