import { Schema } from 'effect';
import { Route } from 'foldkit';
export declare const AppRoute: Route.RouteUnion<{
    readonly Home: {};
    readonly Gallery: {};
    readonly Painting: {
        paintingId: Schema.Number;
    };
    readonly Studio: {};
    readonly NotFound: {
        path: Schema.String;
    };
}>;
export type AppRoute = typeof AppRoute.Type;
export declare const homeRouter: Route.Router<{
    readonly _tag: "Home";
}>;
export declare const galleryRouter: Route.Router<{
    readonly _tag: "Gallery";
}>;
export declare const paintingRouter: Route.Router<{
    readonly _tag: "Painting";
    readonly paintingId: number;
}>;
export declare const studioRouter: Route.Router<{
    readonly _tag: "Studio";
}>;
export declare const urlToAppRoute: (url: import("foldkit/url").Url) => {
    readonly _tag: "Gallery";
} | {
    readonly _tag: "Home";
} | {
    readonly _tag: "Studio";
} | {
    readonly _tag: "NotFound";
    readonly path: string;
} | {
    readonly _tag: "Painting";
    readonly paintingId: number;
};
