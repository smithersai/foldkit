import { Schema } from "effect";
export declare const Model: Schema.Struct<{
    readonly copiedSnippetIds: Schema.HashSet<Schema.String>;
}>;
export type Model = typeof Model.Type;
