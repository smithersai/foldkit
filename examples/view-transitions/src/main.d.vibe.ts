import { Option, Schema } from 'effect';
import { Runtime, type Update } from 'foldkit';
import { Document, HtmlBuilder } from 'foldkit/html';
export { AppRoute } from './route.vibe';
export declare const Model: Schema.Struct<{
    readonly route: import("foldkit/route").RouteUnion<{
        readonly Gallery: {};
        readonly Artwork: {
            artworkId: Schema.Number;
        };
        readonly NotFound: {
            path: Schema.String;
        };
    }>;
    readonly filterText: Schema.String;
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
    readonly UpdatedFilterText: {
        filterText: Schema.String;
    };
}>;
export type Message = typeof Message.Type;
export declare const init: Runtime.RoutingApplicationInit<Model, Message>;
export declare const update: (model: Model, message: Message) => Readonly<{
    model: {
        readonly route: {
            readonly _tag: "Gallery";
        } | {
            readonly _tag: "Artwork";
            readonly artworkId: number;
        } | {
            readonly _tag: "NotFound";
            readonly path: string;
        };
        readonly filterText: string;
    };
    commands?: Update.Commands<{
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
        readonly _tag: "UpdatedFilterText";
        readonly filterText: string;
    }, never>;
    outMessage?: never;
}>;
export declare const viewTransition: Runtime.ViewTransitionConfig<Model, Message>;
export declare const view: (model: Model, h: HtmlBuilder<Message>) => Document;
