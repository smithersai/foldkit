import { Option, Schema } from "effect";
export declare const Artwork: Schema.Struct<{
    readonly id: Schema.Number;
    readonly title: Schema.String;
    readonly medium: Schema.String;
    readonly description: Schema.String;
    readonly gradientClassName: Schema.String;
}>;
export type Artwork = typeof Artwork.Type;
export declare const artworks: ReadonlyArray<Artwork>;
export declare const findArtwork: (artworkId: number) => Option.Option<Artwork>;
