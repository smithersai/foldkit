import { Schema } from "effect";
export declare const Message: import("foldkit/message").MessageUnion<{
    readonly ToggledCodeDisclosure: {
        disclosureId: Schema.String;
        isOpen: Schema.Boolean;
    };
    readonly CompletedMeasureSnippetHeight: {
        snippetId: Schema.String;
        snippetSize: import("foldkit/schema").TaggedUnion<{
            readonly Fits: {};
            readonly Overflows: {};
        }>;
    };
}>;
export type Message = typeof Message.Type;
