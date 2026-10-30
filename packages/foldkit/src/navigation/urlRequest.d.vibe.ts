import { Schema } from "effect";
/** Union of `Internal` and `External` URL request types. */
export declare const UrlRequest: import("../schema/index.js").TaggedUnion<{
    readonly Internal: {
        url: Schema.Struct<{
            readonly protocol: Schema.String;
            readonly host: Schema.String;
            readonly port: Schema.Option<Schema.String>;
            readonly pathname: Schema.String;
            readonly search: Schema.Option<Schema.String>;
            readonly hash: Schema.Option<Schema.String>;
        }>;
    };
    readonly External: {
        href: Schema.String;
    };
}>;
/** Union of `Internal` and `External` URL request types. */
export type UrlRequest = typeof UrlRequest.Type;
