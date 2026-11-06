import { Schema } from 'effect';
import { Item } from './item.vibe';
export declare const Cart: Schema.$Array<Schema.Struct<{
    readonly item: Schema.Struct<{
        readonly id: Schema.String;
        readonly name: Schema.String;
        readonly price: Schema.Number;
    }>;
    readonly quantity: Schema.Number;
}>>;
export type Cart = typeof Cart.Type;
export declare const addItem: (item: Item) => (cart: Cart) => Cart;
export declare const removeItem: (itemId: string) => (cart: Cart) => Cart;
export declare const changeQuantity: (itemId: string, quantity: number) => (cart: Cart) => Cart;
export declare const incrementQuantity: (itemId: string) => (self: readonly {
    readonly item: {
        readonly id: string;
        readonly name: string;
        readonly price: number;
    };
    readonly quantity: number;
}[]) => {
    readonly item: {
        readonly id: string;
        readonly name: string;
        readonly price: number;
    };
    readonly quantity: number;
}[];
export declare const decrementQuantity: (itemId: string) => (cart: Cart) => Cart;
export declare const itemQuantity: (itemId: string) => (cart: Cart) => number;
export declare const totalItems: (cart: Cart) => number;
