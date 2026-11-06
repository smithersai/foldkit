import { Schema } from 'effect';
export declare const Message: import("foldkit/message").MessageUnion<{
    readonly ClickedCopySnippet: {
        snippetId: Schema.String;
        text: Schema.String;
    };
    readonly SucceededCopySnippet: {
        snippetId: Schema.String;
    };
    readonly FailedCopySnippet: {};
    readonly CompletedWaitBeforeHidingCopiedIndicator: {
        snippetId: Schema.String;
    };
}>;
export type Message = typeof Message.Type;
