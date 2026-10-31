import { Schema } from "effect";
export declare const ExampleSourceFile: Schema.Struct<{
    readonly path: Schema.String;
    readonly highlightedHtml: Schema.String;
    readonly rawCode: Schema.String;
}>;
export type ExampleSourceFile = typeof ExampleSourceFile.Type;
export declare const ExampleSources: Schema.Struct<{
    readonly files: Schema.$Array<Schema.Struct<{
        readonly path: Schema.String;
        readonly highlightedHtml: Schema.String;
        readonly rawCode: Schema.String;
    }>>;
}>;
export type ExampleSources = typeof ExampleSources.Type;
export declare const loadSourcesForSlug: (slug: string) => Promise<ExampleSources>;
