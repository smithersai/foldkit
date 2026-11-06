import { Schema } from 'effect';
import { Route } from 'foldkit';
export declare const AppRoute: Route.RouteUnion<{
    readonly Home: {};
    readonly Login: {};
    readonly Dashboard: {};
    readonly Settings: {};
    readonly NotFound: {
        path: Schema.String;
    };
}>;
export type AppRoute = typeof AppRoute.Type;
export declare const LoggedOutRoute: Schema.Union<readonly [Schema.TaggedStruct<"Home", {}> & ((value?: void | {
    readonly _tag?: "Home";
} | undefined) => {
    readonly _tag: "Home";
}), Schema.TaggedStruct<"Login", {}> & ((value?: void | {
    readonly _tag?: "Login";
} | undefined) => {
    readonly _tag: "Login";
}), Schema.TaggedStruct<"NotFound", {
    readonly path: Schema.String;
}> & ((value: {
    readonly _tag?: "NotFound";
    readonly path: string;
}) => {
    readonly _tag: "NotFound";
    readonly path: string;
})]>;
export declare const LoggedInRoute: Schema.Union<readonly [Schema.TaggedStruct<"Dashboard", {}> & ((value?: void | {
    readonly _tag?: "Dashboard";
} | undefined) => {
    readonly _tag: "Dashboard";
}), Schema.TaggedStruct<"Settings", {}> & ((value?: void | {
    readonly _tag?: "Settings";
} | undefined) => {
    readonly _tag: "Settings";
}), Schema.TaggedStruct<"NotFound", {
    readonly path: Schema.String;
}> & ((value: {
    readonly _tag?: "NotFound";
    readonly path: string;
}) => {
    readonly _tag: "NotFound";
    readonly path: string;
})]>;
export type LoggedOutRoute = typeof LoggedOutRoute.Type;
export type LoggedInRoute = typeof LoggedInRoute.Type;
export declare const homeRouter: Route.Router<{
    readonly _tag: "Home";
}>;
export declare const loginRouter: Route.Router<{
    readonly _tag: "Login";
}>;
export declare const dashboardRouter: Route.Router<{
    readonly _tag: "Dashboard";
}>;
export declare const settingsRouter: Route.Router<{
    readonly _tag: "Settings";
}>;
export declare const urlToAppRoute: (url: import("foldkit/url").Url) => {
    readonly _tag: "Dashboard";
} | {
    readonly _tag: "Home";
} | {
    readonly _tag: "Login";
} | {
    readonly _tag: "Settings";
} | {
    readonly _tag: "NotFound";
    readonly path: string;
};
