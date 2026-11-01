import { Effect, Schema } from 'effect';
import { Command, Submodel, type Update } from 'foldkit';
import { Cart, Item } from '../domain/index.ts';
export declare const Model: Schema.Struct<{
    readonly products: Schema.$Array<Schema.Struct<{
        readonly id: Schema.String;
        readonly name: Schema.String;
        readonly price: Schema.Number;
    }>>;
    readonly searchText: Schema.String;
}>;
export type Model = typeof Model.Type;
export declare const Message: import("foldkit/message").MessageUnion<{
    readonly CompletedReplaceSearchUrl: {};
    readonly ChangedSearchInput: {
        value: Schema.String;
    };
    readonly ClickedAddToCart: {
        item: Schema.Struct<{
            readonly id: Schema.String;
            readonly name: Schema.String;
            readonly price: Schema.Number;
        }>;
    };
    readonly ClickedIncrementQuantity: {
        itemId: Schema.String;
    };
    readonly ClickedDecrementQuantity: {
        itemId: Schema.String;
    };
}>;
export type Message = typeof Message.Type;
export declare const OutMessage: import("foldkit/message").MessageUnion<{
    readonly AddedToCart: {
        item: Schema.Struct<{
            readonly id: Schema.String;
            readonly name: Schema.String;
            readonly price: Schema.Number;
        }>;
    };
    readonly IncrementedQuantity: {
        itemId: Schema.String;
    };
    readonly DecrementedQuantity: {
        itemId: Schema.String;
    };
}>;
export type OutMessage = typeof OutMessage.Type;
export type AddedToCart = typeof OutMessage.AddedToCart.Type;
export type IncrementedQuantity = typeof OutMessage.IncrementedQuantity.Type;
export type DecrementedQuantity = typeof OutMessage.DecrementedQuantity.Type;
export declare const init: (products: ReadonlyArray<Item.Item>) => Model;
export declare const ReplaceSearchUrl: Command.CommandDefinitionWithArgs<"ReplaceSearchUrl", {
    url: Schema.String;
}, Effect.Effect<{
    readonly _tag: "CompletedReplaceSearchUrl";
}, never, never>>;
export declare const update: (model: Model, message: Message) => Readonly<{
    model: {
        readonly products: readonly {
            readonly id: string;
            readonly name: string;
            readonly price: number;
        }[];
        readonly searchText: string;
    };
    commands?: Update.Commands<{
        readonly _tag: "CompletedReplaceSearchUrl";
    } | {
        readonly _tag: "ChangedSearchInput";
        readonly value: string;
    } | {
        readonly _tag: "ClickedAddToCart";
        readonly item: {
            readonly id: string;
            readonly name: string;
            readonly price: number;
        };
    } | {
        readonly _tag: "ClickedDecrementQuantity";
        readonly itemId: string;
    } | {
        readonly _tag: "ClickedIncrementQuantity";
        readonly itemId: string;
    }, never>;
    outMessage?: {
        readonly _tag: "AddedToCart";
        readonly item: {
            readonly id: string;
            readonly name: string;
            readonly price: number;
        };
    } | {
        readonly _tag: "DecrementedQuantity";
        readonly itemId: string;
    } | {
        readonly _tag: "IncrementedQuantity";
        readonly itemId: string;
    };
}>;
export type ViewInputs = Readonly<{
    cart: Cart.Cart;
}>;
export declare const view: Submodel.View<{
    readonly products: readonly {
        readonly id: string;
        readonly name: string;
        readonly price: number;
    }[];
    readonly searchText: string;
}, {
    readonly _tag: "CompletedReplaceSearchUrl";
} | {
    readonly _tag: "ChangedSearchInput";
    readonly value: string;
} | {
    readonly _tag: "ClickedAddToCart";
    readonly item: {
        readonly id: string;
        readonly name: string;
        readonly price: number;
    };
} | {
    readonly _tag: "ClickedDecrementQuantity";
    readonly itemId: string;
} | {
    readonly _tag: "ClickedIncrementQuantity";
    readonly itemId: string;
}, Readonly<{
    cart: Cart.Cart;
}>>;
