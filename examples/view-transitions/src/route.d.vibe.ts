import { Schema } from 'effect';
import { Route } from 'foldkit';
export declare const AppRoute: Route.RouteUnion<{
    readonly Gallery: {};
    readonly Artwork: {
        artworkId: Schema.Number;
    };
    readonly NotFound: {
        path: Schema.String;
    };
}>;
export type AppRoute = typeof AppRoute.Type;
export declare const galleryRouter: Route.Router<{
    readonly _tag: "Gallery";
}>;
export declare const artworkRouter: Route.Router<{
    readonly _tag: "Artwork";
    readonly artworkId: number;
}>;
export declare const urlToAppRoute: (url: import("foldkit/url").Url) => {
    readonly _tag: "Gallery";
} | {
    readonly _tag: "Artwork";
    readonly artworkId: number;
} | {
    readonly _tag: "NotFound";
    readonly path: string;
};
