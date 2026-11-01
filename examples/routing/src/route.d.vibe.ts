import { Schema } from 'effect';
import { Route } from 'foldkit';
export declare const AppRoute: Route.RouteUnion<{
    readonly Home: {};
    readonly Nested: {};
    readonly People: {
        searchText: Schema.Option<Schema.String>;
    };
    readonly Person: {
        personId: Schema.Number;
    };
    readonly FilesIndex: {};
    readonly Files: {
        path: Schema.NonEmptyArray<Schema.String>;
    };
    readonly NotFound: {
        path: Schema.String;
    };
}>;
export type AppRoute = typeof AppRoute.Type;
export type PeopleRoute = typeof AppRoute.People.Type;
export declare const homeRouter: Route.Router<{
    readonly _tag: "Home";
}>;
export declare const nestedRouter: Route.Router<{
    readonly _tag: "Nested";
}>;
export declare const peopleRouter: Route.Router<{
    readonly _tag: "People";
    readonly searchText: import("effect/Option").Option<string>;
}>;
export declare const personRouter: Route.Router<{
    readonly _tag: "Person";
    readonly personId: number;
}>;
export declare const filesIndexRouter: Route.Router<{
    readonly _tag: "FilesIndex";
}>;
export declare const filesRouter: Route.Router<{
    readonly _tag: "Files";
    readonly path: readonly [string, ...string[]];
}>;
export declare const urlToAppRoute: (url: import("foldkit/url").Url) => {
    readonly _tag: "FilesIndex";
} | {
    readonly _tag: "Home";
} | {
    readonly _tag: "Nested";
} | {
    readonly _tag: "Files";
    readonly path: readonly [string, ...string[]];
} | {
    readonly _tag: "NotFound";
    readonly path: string;
} | {
    readonly _tag: "People";
    readonly searchText: import("effect/Option").Option<string>;
} | {
    readonly _tag: "Person";
    readonly personId: number;
};
