import { Schema } from "effect";
export declare const SnippetSize: import("foldkit/schema").TaggedUnion<{
    readonly Fits: {};
    readonly Overflows: {};
}>;
export type SnippetSize = typeof SnippetSize.Type;
export declare const Model: Schema.Struct<{
    readonly openDisclosureIds: Schema.HashSet<Schema.String>;
    readonly snippetSizes: Schema.HashMap<Schema.String, import("foldkit/schema").TaggedUnion<{
        readonly Fits: {};
        readonly Overflows: {};
    }>>;
}>;
export type Model = typeof Model.Type;
