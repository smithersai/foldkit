import { Option, Schema } from "effect";
import { MarkdownDocument } from '@foldkit/markdown';
export declare const about: MarkdownDocument;
export declare const Post: Schema.Struct<{
    readonly slug: Schema.String;
    readonly title: Schema.String;
    readonly publishedOn: Schema.String;
    readonly summary: Schema.String;
    readonly document: Schema.Struct<{
        readonly blocks: Schema.$Array<Schema.Codec<import("@foldkit/markdown").Block, import("@foldkit/markdown").BlockEncoded, never, never>>;
    }>;
}>;
export type Post = typeof Post.Type;
export declare const posts: ReadonlyArray<Post>;
export declare const findPost: (slug: string) => Option.Option<Post>;
