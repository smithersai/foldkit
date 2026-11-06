import { Effect, Option, Schema } from 'effect';
import { Command, Runtime, Subscription, Update } from 'foldkit';
import { Document, HtmlBuilder } from 'foldkit/html';
export { AppRoute } from './route.vibe';
export declare const Model: Schema.Struct<{
    readonly route: import("foldkit/route").RouteUnion<{
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
    readonly peoplePage: Schema.Struct<{
        readonly searchInput: Schema.String;
        readonly searchHistory: Schema.$Array<Schema.String>;
        readonly results: import("foldkit/schema").TaggedUnion<{
            readonly Loading: {};
            readonly Loaded: {
                query: Schema.String;
                people: Schema.$Array<Schema.Struct<{
                    readonly id: Schema.Number;
                    readonly name: Schema.String;
                    readonly role: Schema.String;
                }>>;
            };
        }>;
    }>;
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
    readonly EnteredNavigationShortcut: {
        shortcut: Schema.Literals<readonly ["GH", "GP", "GF", "GN"]>;
    };
    readonly GotPeopleMessage: {
        message: import("foldkit/message").MessageUnion<{
            readonly ChangedSearchInput: {
                value: Schema.String;
            };
            readonly SubmittedSearch: {};
            readonly ChangedRoute: {
                route: import("foldkit/schema").CallableTaggedStruct<"People", {
                    readonly searchText: Schema.Option<Schema.String>;
                }>;
            };
            readonly SucceededFetchPeople: {
                query: Schema.String;
                people: Schema.$Array<Schema.Struct<{
                    readonly id: Schema.Number;
                    readonly name: Schema.String;
                    readonly role: Schema.String;
                }>>;
            };
            readonly CompletedPushSearchUrl: {};
        }>;
    };
}>;
export type Message = typeof Message.Type;
export declare const init: Runtime.RoutingApplicationInit<Model, Message>;
export declare const NavigateInternal: Command.CommandDefinitionWithArgs<"NavigateInternal", {
    url: Schema.String;
}, Effect.Effect<{
    readonly _tag: "CompletedNavigateInternal";
}, never, never>>;
export declare const update: (model: Model, message: Message) => Readonly<{
    model: {
        readonly route: {
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
            readonly searchText: Option.Option<string>;
        } | {
            readonly _tag: "Person";
            readonly personId: number;
        };
        readonly peoplePage: {
            readonly searchInput: string;
            readonly searchHistory: readonly string[];
            readonly results: {
                readonly _tag: "Loading";
            } | {
                readonly _tag: "Loaded";
                readonly query: string;
                readonly people: readonly {
                    readonly id: number;
                    readonly name: string;
                    readonly role: string;
                }[];
            };
        };
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
        readonly _tag: "EnteredNavigationShortcut";
        readonly shortcut: "GF" | "GH" | "GN" | "GP";
    } | {
        readonly _tag: "GotPeopleMessage";
        readonly message: {
            readonly _tag: "CompletedPushSearchUrl";
        } | {
            readonly _tag: "SubmittedSearch";
        } | {
            readonly _tag: "ChangedRoute";
            readonly route: {
                readonly _tag: "People";
                readonly searchText: Option.Option<string>;
            };
        } | {
            readonly _tag: "ChangedSearchInput";
            readonly value: string;
        } | {
            readonly _tag: "SucceededFetchPeople";
            readonly query: string;
            readonly people: readonly {
                readonly id: number;
                readonly name: string;
                readonly role: string;
            }[];
        };
    }, never>;
    outMessage?: never;
}>;
export declare const subscriptions: {
    readonly keyBindings: Subscription.EntryWithoutKeepAlive<unknown, {
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
        readonly _tag: "EnteredNavigationShortcut";
        readonly shortcut: "GF" | "GH" | "GN" | "GP";
    } | {
        readonly _tag: "GotPeopleMessage";
        readonly message: {
            readonly _tag: "CompletedPushSearchUrl";
        } | {
            readonly _tag: "SubmittedSearch";
        } | {
            readonly _tag: "ChangedRoute";
            readonly route: {
                readonly _tag: "People";
                readonly searchText: Option.Option<string>;
            };
        } | {
            readonly _tag: "ChangedSearchInput";
            readonly value: string;
        } | {
            readonly _tag: "SucceededFetchPeople";
            readonly query: string;
            readonly people: readonly {
                readonly id: number;
                readonly name: string;
                readonly role: string;
            }[];
        };
    }, Record<string, never>, never> & {
        readonly __subscription: never;
    };
};
export declare const view: (model: Model, h: HtmlBuilder<Message>) => Document;
