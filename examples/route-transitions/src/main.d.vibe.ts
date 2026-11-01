import { Effect, Option, Schema } from "effect";
import { Command, Runtime, Update } from 'foldkit';
import { Document, HtmlBuilder } from 'foldkit/html';
import { Transition } from 'foldkit/route';
import { AppRoute } from './route.vibe';
export { AppRoute } from './route.vibe';
export declare const CatalogStatus: Schema.Literals<readonly ["Idle", "Loading", "Ready"]>;
export type CatalogStatus = typeof CatalogStatus.Type;
export declare const PaintingStatus: import("foldkit/schema").TaggedUnion<{
    readonly Idle: {};
    readonly Loading: {
        paintingId: Schema.Number;
    };
    readonly Ready: {
        paintingId: Schema.Number;
    };
}>;
export type PaintingStatus = typeof PaintingStatus.Type;
export declare const LoggedTransition: Schema.Struct<{
    readonly sequenceNumber: Schema.Number;
    readonly maybePreviousRoute: Schema.Option<import("foldkit/route").RouteUnion<{
        readonly Home: {};
        readonly Gallery: {};
        readonly Painting: {
            paintingId: Schema.Number;
        };
        readonly Studio: {};
        readonly NotFound: {
            path: Schema.String;
        };
    }>>;
    readonly nextRoute: import("foldkit/route").RouteUnion<{
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
}>;
export type LoggedTransition = typeof LoggedTransition.Type;
export declare const Model: Schema.Struct<{
    readonly route: import("foldkit/route").RouteUnion<{
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
    readonly transitionLog: Schema.$Array<Schema.Struct<{
        readonly sequenceNumber: Schema.Number;
        readonly maybePreviousRoute: Schema.Option<import("foldkit/route").RouteUnion<{
            readonly Home: {};
            readonly Gallery: {};
            readonly Painting: {
                paintingId: Schema.Number;
            };
            readonly Studio: {};
            readonly NotFound: {
                path: Schema.String;
            };
        }>>;
        readonly nextRoute: import("foldkit/route").RouteUnion<{
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
    }>>;
    readonly catalogStatus: Schema.Literals<readonly ["Idle", "Loading", "Ready"]>;
    readonly paintingStatus: import("foldkit/schema").TaggedUnion<{
        readonly Idle: {};
        readonly Loading: {
            paintingId: Schema.Number;
        };
        readonly Ready: {
            paintingId: Schema.Number;
        };
    }>;
    readonly studioDraft: Schema.String;
    readonly maybeSavedDraft: Schema.Option<Schema.String>;
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
    readonly SucceededLoadCatalog: {};
    readonly SucceededLoadPainting: {
        paintingId: Schema.Number;
    };
    readonly UpdatedStudioDraft: {
        value: Schema.String;
    };
    readonly SucceededSaveDraft: {
        draft: Schema.String;
    };
}>;
export type Message = typeof Message.Type;
export declare const LoadCatalog: Command.CommandDefinitionNoArgs<"LoadCatalog", Effect.Effect<{
    readonly _tag: "SucceededLoadCatalog";
}, never, never>>;
export declare const LoadPainting: Command.CommandDefinitionWithArgs<"LoadPainting", {
    paintingId: Schema.Number;
}, Effect.Effect<{
    readonly _tag: "SucceededLoadPainting";
    readonly paintingId: number;
}, never, never>>;
export declare const SaveDraft: Command.CommandDefinitionWithArgs<"SaveDraft", {
    draft: Schema.String;
}, Effect.Effect<{
    readonly _tag: "SucceededSaveDraft";
    readonly draft: string;
}, never, never>>;
export type AppTransition = Transition.Transition<AppRoute>;
export declare const update: (model: Model, message: Message) => Readonly<{
    model: {
        readonly route: {
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
        readonly transitionLog: readonly {
            readonly sequenceNumber: number;
            readonly maybePreviousRoute: Option.Option<{
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
            }>;
            readonly nextRoute: {
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
        }[];
        readonly catalogStatus: "Idle" | "Loading" | "Ready";
        readonly paintingStatus: {
            readonly _tag: "Idle";
        } | {
            readonly _tag: "Loading";
            readonly paintingId: number;
        } | {
            readonly _tag: "Ready";
            readonly paintingId: number;
        };
        readonly studioDraft: string;
        readonly maybeSavedDraft: Option.Option<string>;
    };
    commands?: Update.Commands<{
        readonly _tag: "CompletedLoadExternal";
    } | {
        readonly _tag: "CompletedNavigateInternal";
    } | {
        readonly _tag: "SucceededLoadCatalog";
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
        readonly _tag: "SucceededLoadPainting";
        readonly paintingId: number;
    } | {
        readonly _tag: "SucceededSaveDraft";
        readonly draft: string;
    } | {
        readonly _tag: "UpdatedStudioDraft";
        readonly value: string;
    }, never>;
    outMessage?: never;
}>;
export declare const init: Runtime.RoutingApplicationInit<Model, Message>;
export declare const view: (model: Model, h: HtmlBuilder<Message>) => Document;
