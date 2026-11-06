import { Schema } from 'effect';
export declare const Message: import("foldkit/message").MessageUnion<{
    readonly ToggledFaq: {
        id: Schema.String;
        isOpen: Schema.Boolean;
    };
}>;
export type Message = typeof Message.Type;
