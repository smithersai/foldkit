import { Schema } from "effect";
export declare const Item: Schema.Struct<{
    readonly id: Schema.String;
    readonly name: Schema.String;
    readonly price: Schema.Number;
}>;
export type Item = typeof Item.Type;
export declare const CartItem: Schema.Struct<{
    readonly item: Schema.Struct<{
        readonly id: Schema.String;
        readonly name: Schema.String;
        readonly price: Schema.Number;
    }>;
    readonly quantity: Schema.Number;
}>;
export type CartItem = typeof CartItem.Type;
