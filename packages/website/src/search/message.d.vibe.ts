import { Schema } from "effect";
export declare const SearchResult: Schema.Struct<{
    readonly url: Schema.String;
    readonly title: Schema.String;
    readonly excerpt: Schema.String;
    readonly section: Schema.String;
    readonly kind: Schema.String;
}>;
export type SearchResult = typeof SearchResult.Type;
export declare const Message: import("foldkit/message").MessageUnion<{
    readonly UpdatedSearchQuery: {
        query: Schema.String;
    };
    readonly CompletedFetchSearchResults: {
        results: Schema.$Array<Schema.Struct<{
            readonly url: Schema.String;
            readonly title: Schema.String;
            readonly excerpt: Schema.String;
            readonly section: Schema.String;
            readonly kind: Schema.String;
        }>>;
        query: Schema.String;
    };
    readonly SelectedSearchResult: {
        url: Schema.String;
    };
    readonly GotSearchDialogMessage: {
        message: import("foldkit/message").MessageUnion<{
            readonly RequestedOpen: {};
            readonly RequestedClose: {};
            readonly SucceededShowDialog: {};
            readonly FailedShowDialog: {};
            readonly SucceededAcquireResources: {};
            readonly FailedAcquireResources: {};
            readonly CompletedCloseDialog: {};
            readonly Unmounted: {};
            readonly CompletedReleaseDialogResources: {};
            readonly GotAnimationMessage: {
                message: import("foldkit/message").MessageUnion<{
                    readonly Showed: {};
                    readonly Hid: {};
                    readonly CompletedWaitForPaint: {
                        generation: Schema.Number;
                    };
                    readonly EndedAnimation: {
                        generation: Schema.Number;
                    };
                }>;
            };
        }>;
    };
    readonly ClearedSearchQuery: {};
    readonly CompletedNavigateToResult: {};
    readonly CompletedScrollToResult: {};
    readonly CompletedFocusSearchInput: {};
    readonly PressedArrowKey: {
        direction: Schema.Literals<readonly ["Up", "Down"]>;
    };
}>;
export type Message = typeof Message.Type;
