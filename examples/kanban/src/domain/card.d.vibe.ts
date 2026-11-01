import { Schema } from "effect";
export declare const Card: Schema.Struct<{
    readonly id: Schema.String;
    readonly title: Schema.String;
    readonly description: Schema.String;
    readonly sortKey: Schema.String;
}>;
export type Card = typeof Card.Type;
