import { Schema } from "effect";
import { Route } from 'foldkit';
export declare const AppRoute: Route.RouteUnion<{
    readonly Products: {
        searchText: Schema.Option<Schema.String>;
    };
    readonly Cart: {};
    readonly Checkout: {};
    readonly NotFound: {
        path: Schema.String;
    };
}>;
export type AppRoute = typeof AppRoute.Type;
export declare const productsRouter: Route.Router<{
    readonly _tag: "Products";
    readonly searchText: import("effect/Option").Option<string>;
}>;
export declare const cartRouter: Route.Router<{
    readonly _tag: "Cart";
}>;
export declare const checkoutRouter: Route.Router<{
    readonly _tag: "Checkout";
}>;
export declare const urlToAppRoute: (url: import("foldkit/url").Url) => {
    readonly _tag: "Cart";
} | {
    readonly _tag: "Checkout";
} | {
    readonly _tag: "NotFound";
    readonly path: string;
} | {
    readonly _tag: "Products";
    readonly searchText: import("effect/Option").Option<string>;
};
