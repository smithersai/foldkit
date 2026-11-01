import { Schema } from 'effect';
import { Route } from 'foldkit';
export declare const AppRoute: Route.RouteUnion<{
    readonly Home: {};
    readonly Posts: {};
    readonly Post: {
        slug: Schema.String;
    };
    readonly NotFound: {
        path: Schema.String;
    };
}>;
export type AppRoute = typeof AppRoute.Type;
export declare const homeRouter: Route.Router<{
    readonly _tag: "Home";
}>;
export declare const postsRouter: Route.Router<{
    readonly _tag: "Posts";
}>;
export declare const postRouter: Route.Router<{
    readonly _tag: "Post";
    readonly slug: string;
}>;
export declare const urlToAppRoute: (url: import("foldkit/url").Url) => {
    readonly _tag: "Home";
} | {
    readonly _tag: "Posts";
} | {
    readonly _tag: "NotFound";
    readonly path: string;
} | {
    readonly _tag: "Post";
    readonly slug: string;
};
export declare const isPostOrPosts: (value: {
    readonly _tag: "Home";
} | {
    readonly _tag: "Posts";
} | {
    readonly _tag: "NotFound";
    readonly path: string;
} | {
    readonly _tag: "Post";
    readonly slug: string;
}) => value is {
    readonly _tag: "Posts";
} | {
    readonly _tag: "Post";
    readonly slug: string;
};
