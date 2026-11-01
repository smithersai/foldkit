import { Schema } from 'effect';
export declare const Message: import("foldkit/message").MessageUnion<{
    readonly CompletedFocusRoomPageUsernameInput: {};
    readonly CompletedFocusUserGameTextInput: {};
    readonly CompletedNavigateHome: {};
    readonly SucceededStartGame: {};
    readonly FailedStartGame: {};
    readonly CompletedUpdatePlayerProgress: {};
    readonly CompletedSavePlayerSession: {};
    readonly CompletedClearSession: {};
    readonly FailedJoinRoom: {};
    readonly FailedCopyRoomId: {};
    readonly PressedKey: {
        key: Schema.String;
    };
    readonly ChangedUserText: {
        value: Schema.String;
    };
    readonly BlurredRoomPageUsernameInput: {};
    readonly ChangedRoomPageUsername: {
        value: Schema.String;
    };
    readonly SubmittedJoinRoomFromPage: {};
    readonly UpdatedRoom: {
        room: Schema.Struct<{
            readonly id: Schema.String;
            readonly players: Schema.$Array<Schema.Struct<{
                readonly id: Schema.String;
                readonly username: Schema.String;
            }>>;
            readonly hostId: Schema.String;
            readonly status: Schema.Union<readonly [Schema.TaggedStruct<"Waiting", {}>, Schema.TaggedStruct<"GetReady", {}>, Schema.TaggedStruct<"Countdown", {
                readonly secondsLeft: Schema.Number;
            }>, Schema.TaggedStruct<"Playing", {
                readonly secondsLeft: Schema.Number;
            }>, Schema.TaggedStruct<"Finished", {}>]>;
            readonly maybeGame: Schema.Option<Schema.Struct<{
                readonly id: Schema.String;
                readonly text: Schema.String;
            }>>;
            readonly maybeScoreboard: Schema.Option<Schema.$Array<Schema.Struct<{
                readonly playerId: Schema.String;
                readonly username: Schema.String;
                readonly wpm: Schema.Number;
                readonly accuracy: Schema.Number;
                readonly charsTyped: Schema.Number;
                readonly correctChars: Schema.Number;
            }>>>;
            readonly createdAt: Schema.Number;
            readonly usedGameTexts: Schema.$Array<Schema.String>;
        }>;
        maybePlayerProgress: Schema.Option<Schema.Struct<{
            readonly playerId: Schema.String;
            readonly gameId: Schema.String;
            readonly userText: Schema.String;
            readonly updatedAt: Schema.Number;
            readonly charsTyped: Schema.Number;
        }>>;
    };
    readonly FailedStreamRoom: {
        error: Schema.String;
    };
    readonly CompletedLoadSession: {
        maybeSession: Schema.Option<Schema.Struct<{
            readonly roomId: Schema.String;
            readonly player: Schema.Struct<{
                readonly id: Schema.String;
                readonly username: Schema.String;
            }>;
        }>>;
    };
    readonly SucceededFetchRoom: {
        room: Schema.Struct<{
            readonly id: Schema.String;
            readonly players: Schema.$Array<Schema.Struct<{
                readonly id: Schema.String;
                readonly username: Schema.String;
            }>>;
            readonly hostId: Schema.String;
            readonly status: Schema.Union<readonly [Schema.TaggedStruct<"Waiting", {}>, Schema.TaggedStruct<"GetReady", {}>, Schema.TaggedStruct<"Countdown", {
                readonly secondsLeft: Schema.Number;
            }>, Schema.TaggedStruct<"Playing", {
                readonly secondsLeft: Schema.Number;
            }>, Schema.TaggedStruct<"Finished", {}>]>;
            readonly maybeGame: Schema.Option<Schema.Struct<{
                readonly id: Schema.String;
                readonly text: Schema.String;
            }>>;
            readonly maybeScoreboard: Schema.Option<Schema.$Array<Schema.Struct<{
                readonly playerId: Schema.String;
                readonly username: Schema.String;
                readonly wpm: Schema.Number;
                readonly accuracy: Schema.Number;
                readonly charsTyped: Schema.Number;
                readonly correctChars: Schema.Number;
            }>>>;
            readonly createdAt: Schema.Number;
            readonly usedGameTexts: Schema.$Array<Schema.String>;
        }>;
    };
    readonly FailedFetchRoom: {};
    readonly ClickedCopyRoomId: {};
    readonly SucceededCopyRoomId: {};
    readonly CompletedWaitBeforeHidingRoomIdCopiedIndicator: {};
    readonly CompletedWaitForExitCountdownInterval: {};
    readonly SucceededJoinRoom: {
        player: Schema.Struct<{
            readonly id: Schema.String;
            readonly username: Schema.String;
        }>;
    };
}>;
export type Message = typeof Message.Type;
