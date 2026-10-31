import { Schema } from "effect";
export declare const Message: import("foldkit/message").MessageUnion<{
    readonly ToggledMapMessagesUnderHood: {
        isOpen: Schema.Boolean;
    };
}>;
export type Message = typeof Message.Type;
