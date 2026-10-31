import { Schema } from "effect";
export declare const Message: import("foldkit/message").MessageUnion<{
    readonly GotSourceFileTabsMessage: {
        message: import("foldkit/message").MessageUnion<{
            readonly SelectedTab: {
                index: Schema.Number;
                value: Schema.String;
            };
            readonly FocusedTab: {
                index: Schema.Number;
            };
            readonly CompletedFocusTab: {};
        }>;
    };
    readonly ChangedExampleUrl: {
        url: Schema.String;
    };
    readonly ToggledLivePreview: {
        isOpen: Schema.Boolean;
    };
    readonly RequestedExampleSources: {
        slug: Schema.String;
    };
    readonly SucceededLoadExampleSources: {
        sources: Schema.Struct<{
            readonly files: Schema.$Array<Schema.Struct<{
                readonly path: Schema.String;
                readonly highlightedHtml: Schema.String;
                readonly rawCode: Schema.String;
            }>>;
        }>;
    };
    readonly FailedLoadExampleSources: {
        error: Schema.String;
    };
}>;
export type Message = typeof Message.Type;
