import { Schema } from "effect";
import { SearchResult } from './message.vibe';
export declare const SearchState: import("foldkit/schema").TaggedUnion<{
    readonly Idle: {};
    readonly Loading: {
        results: Schema.$Array<Schema.Struct<{
            readonly url: Schema.String;
            readonly title: Schema.String;
            readonly excerpt: Schema.String;
            readonly section: Schema.String;
            readonly kind: Schema.String;
        }>>;
    };
    readonly Ok: {
        results: Schema.$Array<Schema.Struct<{
            readonly url: Schema.String;
            readonly title: Schema.String;
            readonly excerpt: Schema.String;
            readonly section: Schema.String;
            readonly kind: Schema.String;
        }>>;
    };
}>;
export type SearchState = typeof SearchState.Type;
export declare const resultsFromState: (state: SearchState) => ReadonlyArray<typeof SearchResult.Type>;
export declare const Model: Schema.Struct<{
    readonly dialog: Schema.Struct<{
        readonly id: Schema.String;
        readonly isOpen: Schema.Boolean;
        readonly isAnimated: Schema.Boolean;
        readonly animation: Schema.Struct<{
            readonly id: Schema.String;
            readonly isShowing: Schema.Boolean;
            readonly transitionState: Schema.Literals<readonly ["Idle", "EnterStart", "EnterAnimating", "LeaveStart", "LeaveAnimating"]>;
            readonly transitionGeneration: Schema.Number;
        }>;
        readonly maybeFocusSelector: Schema.Option<Schema.String>;
    }>;
    readonly query: Schema.String;
    readonly searchState: import("foldkit/schema").TaggedUnion<{
        readonly Idle: {};
        readonly Loading: {
            results: Schema.$Array<Schema.Struct<{
                readonly url: Schema.String;
                readonly title: Schema.String;
                readonly excerpt: Schema.String;
                readonly section: Schema.String;
                readonly kind: Schema.String;
            }>>;
        };
        readonly Ok: {
            results: Schema.$Array<Schema.Struct<{
                readonly url: Schema.String;
                readonly title: Schema.String;
                readonly excerpt: Schema.String;
                readonly section: Schema.String;
                readonly kind: Schema.String;
            }>>;
        };
    }>;
    readonly activeResultIndex: Schema.Number;
}>;
export type Model = typeof Model.Type;
