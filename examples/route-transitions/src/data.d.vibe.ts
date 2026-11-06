import { Option, Schema } from 'effect';
export declare const Painting: Schema.Struct<{
    readonly id: Schema.Number;
    readonly title: Schema.String;
    readonly artist: Schema.String;
    readonly gradient: Schema.String;
}>;
export type Painting = typeof Painting.Type;
export declare const paintings: ReadonlyArray<Painting>;
export declare const findPaintingWithIndex: (paintingId: number) => Option.Option<Readonly<{
    painting: Painting;
    paintingIndex: number;
}>>;
