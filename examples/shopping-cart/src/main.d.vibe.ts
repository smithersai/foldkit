import { Option, Schema } from "effect";
import { Runtime, Update } from 'foldkit';
import { Document, HtmlBuilder } from 'foldkit/html';
export declare const Model: Schema.Struct<{
    readonly route: import("foldkit/route").RouteUnion<{
        readonly Products: {
            searchText: Schema.Option<Schema.String>;
        };
        readonly Cart: {};
        readonly Checkout: {};
        readonly NotFound: {
            path: Schema.String;
        };
    }>;
    readonly cart: Schema.$Array<Schema.Struct<{
        readonly item: Schema.Struct<{
            readonly id: Schema.String;
            readonly name: Schema.String;
            readonly price: Schema.Number;
        }>;
        readonly quantity: Schema.Number;
    }>>;
    readonly deliveryInstructions: Schema.String;
    readonly orderPlaced: Schema.Boolean;
    readonly productsPage: Schema.Struct<{
        readonly products: Schema.$Array<Schema.Struct<{
            readonly id: Schema.String;
            readonly name: Schema.String;
            readonly price: Schema.Number;
        }>>;
        readonly searchText: Schema.String;
    }>;
}>;
export type Model = typeof Model.Type;
export declare const Message: import("foldkit/message").MessageUnion<{
    readonly CompletedNavigateInternal: {};
    readonly CompletedLoadExternal: {};
    readonly ClickedLink: {
        request: import("foldkit/schema").TaggedUnion<{
            readonly Internal: {
                url: Schema.Struct<{
                    readonly protocol: Schema.String;
                    readonly host: Schema.String;
                    readonly port: Schema.Option<Schema.String>;
                    readonly pathname: Schema.String;
                    readonly search: Schema.Option<Schema.String>;
                    readonly hash: Schema.Option<Schema.String>;
                }>;
            };
            readonly External: {
                href: Schema.String;
            };
        }>;
    };
    readonly ChangedUrl: {
        url: Schema.Struct<{
            readonly protocol: Schema.String;
            readonly host: Schema.String;
            readonly port: Schema.Option<Schema.String>;
            readonly pathname: Schema.String;
            readonly search: Schema.Option<Schema.String>;
            readonly hash: Schema.Option<Schema.String>;
        }>;
    };
    readonly GotProductsMessage: {
        message: import("foldkit/message").MessageUnion<{
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
    };
    readonly ClickedIncrementQuantity: {
        itemId: Schema.String;
    };
    readonly ClickedDecrementQuantity: {
        itemId: Schema.String;
    };
    readonly ClickedRemoveCartItem: {
        itemId: Schema.String;
    };
    readonly ClickedClearCart: {};
    readonly UpdatedDeliveryInstructions: {
        value: Schema.String;
    };
    readonly ClickedPlaceOrder: {};
}>;
export type Message = typeof Message.Type;
export declare const init: Runtime.RoutingApplicationInit<Model, Message>;
export declare const update: (model: Model, message: Message) => Readonly<{
    model: {
        readonly route: {
            readonly _tag: "Cart";
        } | {
            readonly _tag: "Checkout";
        } | {
            readonly _tag: "NotFound";
            readonly path: string;
        } | {
            readonly _tag: "Products";
            readonly searchText: Option.Option<string>;
        };
        readonly cart: readonly {
            readonly item: {
                readonly id: string;
                readonly name: string;
                readonly price: number;
            };
            readonly quantity: number;
        }[];
        readonly deliveryInstructions: string;
        readonly orderPlaced: boolean;
        readonly productsPage: {
            readonly products: readonly {
                readonly id: string;
                readonly name: string;
                readonly price: number;
            }[];
            readonly searchText: string;
        };
    };
    commands?: Update.Commands<{
        readonly _tag: "ClickedClearCart";
    } | {
        readonly _tag: "ClickedPlaceOrder";
    } | {
        readonly _tag: "CompletedLoadExternal";
    } | {
        readonly _tag: "CompletedNavigateInternal";
    } | {
        readonly _tag: "ChangedUrl";
        readonly url: {
            readonly protocol: string;
            readonly host: string;
            readonly port: Option.Option<string>;
            readonly pathname: string;
            readonly search: Option.Option<string>;
            readonly hash: Option.Option<string>;
        };
    } | {
        readonly _tag: "ClickedDecrementQuantity";
        readonly itemId: string;
    } | {
        readonly _tag: "ClickedIncrementQuantity";
        readonly itemId: string;
    } | {
        readonly _tag: "ClickedLink";
        readonly request: {
            readonly _tag: "External";
            readonly href: string;
        } | {
            readonly _tag: "Internal";
            readonly url: {
                readonly protocol: string;
                readonly host: string;
                readonly port: Option.Option<string>;
                readonly pathname: string;
                readonly search: Option.Option<string>;
                readonly hash: Option.Option<string>;
            };
        };
    } | {
        readonly _tag: "ClickedRemoveCartItem";
        readonly itemId: string;
    } | {
        readonly _tag: "GotProductsMessage";
        readonly message: {
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
        };
    } | {
        readonly _tag: "UpdatedDeliveryInstructions";
        readonly value: string;
    }, never>;
    outMessage?: never;
}>;
export declare const view: (model: Model, h: HtmlBuilder<Message>) => Document;
