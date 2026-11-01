import { Schema } from 'effect';
export declare const Message: import("foldkit/message").MessageUnion<{
    readonly CompletedFocusUsernameInput: {};
    readonly CompletedFocusRoomIdInput: {};
    readonly SubmittedUsernameForm: {};
    readonly ChangedUsername: {
        value: Schema.String;
    };
    readonly BlurredUsernameInput: {};
    readonly ChangedRoomId: {
        value: Schema.String;
    };
    readonly BlurredRoomIdInput: {};
    readonly SubmittedJoinRoomForm: {};
    readonly SucceededCreateRoom: {
        roomId: Schema.String;
        player: Schema.Struct<{
            readonly id: Schema.String;
            readonly username: Schema.String;
        }>;
    };
    readonly SucceededJoinRoom: {
        roomId: Schema.String;
        player: Schema.Struct<{
            readonly id: Schema.String;
            readonly username: Schema.String;
        }>;
    };
    readonly FailedCreateRoom: {
        error: Schema.String;
    };
    readonly FailedJoinRoom: {
        error: Schema.String;
    };
    readonly PressedKey: {
        key: Schema.String;
    };
}>;
export type Message = typeof Message.Type;
export declare const OutMessage: import("foldkit/message").MessageUnion<{
    readonly CreatedRoom: {
        roomId: Schema.String;
        player: Schema.Struct<{
            readonly id: Schema.String;
            readonly username: Schema.String;
        }>;
    };
    readonly JoinedRoom: {
        roomId: Schema.String;
        player: Schema.Struct<{
            readonly id: Schema.String;
            readonly username: Schema.String;
        }>;
    };
}>;
export type OutMessage = typeof OutMessage.Type;
