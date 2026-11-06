import { Effect, Option, Schema } from 'effect';
import { Command, Submodel, type Update } from 'foldkit';
import { type PeopleRoute } from '../route.vibe';
declare const Person: Schema.Struct<{
    readonly id: Schema.Number;
    readonly name: Schema.String;
    readonly role: Schema.String;
}>;
type Person = typeof Person.Type;
export declare const searchPeople: (searchText: string) => ReadonlyArray<Person>;
export declare const findPerson: (id: number) => Option.Option<{
    readonly id: number;
    readonly name: string;
    readonly role: string;
}>;
export declare const SearchResults: import("foldkit/schema").TaggedUnion<{
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
export type SearchResults = typeof SearchResults.Type;
export declare const Model: Schema.Struct<{
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
export type Model = typeof Model.Type;
export declare const Message: import("foldkit/message").MessageUnion<{
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
export type Message = typeof Message.Type;
type InitReturn = Update.Return<Model, Message>;
export declare const init: (route: PeopleRoute) => InitReturn;
export declare const PushSearchUrl: Command.CommandDefinitionWithArgs<"PushSearchUrl", {
    searchText: Schema.Option<Schema.String>;
}, Effect.Effect<{
    readonly _tag: "CompletedPushSearchUrl";
}, never, never>>;
export declare const FetchPeople: Command.CommandDefinitionWithArgs<"FetchPeople", {
    searchText: Schema.String;
}, Effect.Effect<{
    readonly _tag: "SucceededFetchPeople";
    readonly query: string;
    readonly people: readonly {
        readonly id: number;
        readonly name: string;
        readonly role: string;
    }[];
}, never, never>>;
export type UpdateReturn = Update.Return<Model, Message>;
export declare const update: (model: Model, message: Message) => Readonly<{
    model: {
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
    commands?: Update.Commands<{
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
    }, never>;
    outMessage?: never;
}>;
/** Tells the People page that the route changed. People does not own the
 *  route; it derives its own state (the search input and history) from the new
 *  route and returns the refetch Command. The parent calls this from its
 *  `ChangedUrl` handler. Contrast a `reflect*` setter, which writes a field the
 *  Submodel owns from an external value, with no derivation and no Command. */
export declare const informRouteChanged: (model: Model, route: PeopleRoute) => Readonly<{
    model: {
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
    commands?: Update.Commands<{
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
    }, never>;
    outMessage?: never;
}>;
export declare const view: Submodel.View<{
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
}, {
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
}, void>;
export {};
