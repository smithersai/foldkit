import { Effect } from 'effect';
import type { Root } from 'mdast';
import { MarkdownDocument } from '../ast/index.js';
import type { IslandDefinitions } from '../island/index.js';
import { type InvalidFields } from './validateFields.vibe';
/**
 * Options for {@link normalizeRoot}. `islands`, when provided, maps each
 * allowed directive name to the schema for its attributes; unknown names,
 * unknown attributes, and attribute values outside the schema all fail with
 * an error naming the offender.
 */
export type NormalizeOptions = Readonly<{
    islands?: IslandDefinitions | undefined;
}>;
declare const UnsupportedMarkdown_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "UnsupportedMarkdown";
} & Readonly<A>;
/** A node outside the markdown vocabulary, or a URL with an executable scheme. */
export declare class UnsupportedMarkdown extends UnsupportedMarkdown_base<{
    readonly message: string;
}> {
}
declare const UnknownIsland_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "UnknownIsland";
} & Readonly<A>;
/** A directive naming an island the options do not declare. */
export declare class UnknownIsland extends UnknownIsland_base<{
    readonly message: string;
}> {
}
/** Every way a document can fall outside the vocabulary. */
export type NormalizeError = UnsupportedMarkdown | UnknownIsland | InvalidFields;
/**
 * The converter as a program: a typed {@link MarkdownDocument}, or a
 * `NormalizeError` for the first node outside the vocabulary.
 * {@link normalizeRoot} runs it for plain callers.
 */
export declare const normalize: (root: Root, options: NormalizeOptions) => Effect.Effect<MarkdownDocument, NormalizeError>;
/**
 * Converts a parsed mdast tree into a typed {@link MarkdownDocument}.
 * Throws on any node outside the markdown vocabulary.
 */
export declare const normalizeRoot: (root: Root, options?: NormalizeOptions) => MarkdownDocument;
export {};
