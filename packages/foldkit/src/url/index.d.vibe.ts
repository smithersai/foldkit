import { Option, Schema } from "effect";
/** Schema representing a parsed URL with protocol, host, port, pathname, search, and hash fields. */
export declare const Url: Schema.Struct<{
    readonly protocol: Schema.String;
    readonly host: Schema.String;
    readonly port: Schema.Option<Schema.String>;
    readonly pathname: Schema.String;
    readonly search: Schema.Option<Schema.String>;
    readonly hash: Schema.Option<Schema.String>;
}>;
export type Url = typeof Url.Type;
/** Parses a URL string into a `Url`, returning `Option.None` if invalid. */
export declare const fromString: (str: string) => Option.Option<{
    readonly protocol: string;
    readonly host: string;
    readonly port: Option.Option<string>;
    readonly pathname: string;
    readonly search: Option.Option<string>;
    readonly hash: Option.Option<string>;
}>;
/** Serializes a `Url` back to a string. */
export declare const toString: (url: Url) => string;
