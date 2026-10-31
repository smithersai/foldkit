import { Schema } from "effect";
export declare const Location: Schema.Struct<{
    readonly id: Schema.String;
    readonly name: Schema.String;
    readonly region: Schema.String;
    readonly lng: Schema.Number;
    readonly lat: Schema.Number;
}>;
export type Location = typeof Location.Type;
export declare const featuredLocations: ReadonlyArray<Location>;
