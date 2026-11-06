import { Schema } from 'effect';
import { Route } from 'foldkit';
export declare const AppRoute: Route.RouteUnion<{
    readonly Home: {};
    readonly Room: {
        roomId: Schema.String;
    };
    readonly NotFound: {
        path: Schema.String;
    };
}>;
export type AppRoute = typeof AppRoute.Type;
export declare const homeRouter: Route.Router<{
    readonly _tag: "Home";
}>;
export declare const roomRouter: Route.Router<{
    readonly _tag: "Room";
    readonly roomId: string;
}>;
export declare const urlToAppRoute: (url: import("foldkit/url").Url) => {
    readonly _tag: "Home";
} | {
    readonly _tag: "NotFound";
    readonly path: string;
} | {
    readonly _tag: "Room";
    readonly roomId: string;
};
