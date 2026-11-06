import { Schema } from 'effect';
export declare const Message: import("foldkit/message").MessageUnion<{
    readonly SubmittedLoginForm: {};
    readonly SucceededAuthenticate: {
        sessionId: Schema.String;
    };
}>;
export type Message = typeof Message.Type;
export declare const OutMessage: import("foldkit/message").MessageUnion<{
    readonly SucceededLogin: {
        sessionId: Schema.String;
    };
}>;
export type OutMessage = typeof OutMessage.Type;
