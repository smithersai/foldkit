import { Schema } from 'effect';
import { Item } from './item';
export declare const Cart: Schema.$Array<any>;
export type Cart = typeof Cart.Type;
export declare const addItem: (item: Item) => (cart: Cart) => Cart;
export declare const removeItem: (itemId: string) => (cart: Cart) => Cart;
export declare const totalItems: (cart: Cart) => number;
