import { Schema } from "effect";
export declare const islandAttributes: {
    Counter: Schema.Struct<{
        readonly label: Schema.optionalKey<Schema.String>;
    }>;
    Note: Schema.Struct<{}>;
};
