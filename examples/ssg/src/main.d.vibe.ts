import { Schema } from "effect";
import { Runtime, type Update } from 'foldkit';
import { type Document, type HtmlBuilder } from 'foldkit/html';
export declare const Model: Schema.Struct<{
    readonly route: import("foldkit/route").RouteUnion<{
        readonly Home: {};
        readonly About: {};
        readonly NotFound: {
            path: Schema.String;
        };
    }>;
    readonly count: Schema.Number;
}>;
export type Model = typeof Model.Type;
export declare const Message: import("foldkit/message").MessageUnion<{
    readonly ClickedIncrement: {};
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
    readonly CompletedNavigateInternal: {};
    readonly CompletedLoadExternal: {};
}>;
export type Message = typeof Message.Type;
export declare const init: Runtime.RoutingApplicationInit<Model, Message>;
export declare const update: (model: Model, message: Message) => Readonly<{
    model: {
        readonly route: {
            readonly _tag: "About";
        } | {
            readonly _tag: "Home";
        } | {
            readonly _tag: "NotFound";
            readonly path: string;
        };
        readonly count: number;
    };
    commands?: Update.Commands<{
        readonly _tag: "ClickedIncrement";
    } | {
        readonly _tag: "CompletedLoadExternal";
    } | {
        readonly _tag: "CompletedNavigateInternal";
    } | {
        readonly _tag: "ChangedUrl";
        readonly url: {
            readonly protocol: string;
            readonly host: string;
            readonly port: import("effect/Option").Option<string>;
            readonly pathname: string;
            readonly search: import("effect/Option").Option<string>;
            readonly hash: import("effect/Option").Option<string>;
        };
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
                readonly port: import("effect/Option").Option<string>;
                readonly pathname: string;
                readonly search: import("effect/Option").Option<string>;
                readonly hash: import("effect/Option").Option<string>;
            };
        };
    }, never>;
    outMessage?: never;
}>;
export declare const view: (model: Model, h: HtmlBuilder<Message>) => Document;
