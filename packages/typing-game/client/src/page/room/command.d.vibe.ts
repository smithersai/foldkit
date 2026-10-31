import { Effect, Option, Schema } from "effect";
import { Command } from 'foldkit';
import { RoomsClient } from '../../rpc.vibe';
export declare const FetchRoom: Command.CommandDefinitionWithArgs<"FetchRoom", {
    roomId: Schema.String;
}, Effect.Effect<{
    readonly _tag: "FailedFetchRoom";
} | {
    readonly _tag: "SucceededFetchRoom";
    readonly room: {
        readonly id: string;
        readonly players: readonly {
            readonly id: string;
            readonly username: string;
        }[];
        readonly hostId: string;
        readonly status: {
            readonly _tag: "Finished";
        } | {
            readonly _tag: "GetReady";
        } | {
            readonly _tag: "Waiting";
        } | {
            readonly _tag: "Countdown";
            readonly secondsLeft: number;
        } | {
            readonly _tag: "Playing";
            readonly secondsLeft: number;
        };
        readonly maybeGame: Option.Option<{
            readonly id: string;
            readonly text: string;
        }>;
        readonly maybeScoreboard: Option.Option<readonly {
            readonly playerId: string;
            readonly username: string;
            readonly wpm: number;
            readonly accuracy: number;
            readonly charsTyped: number;
            readonly correctChars: number;
        }[]>;
        readonly createdAt: number;
        readonly usedGameTexts: readonly string[];
    };
}, never, RoomsClient>>;
export declare const LoadSession: Command.CommandDefinitionWithArgs<"LoadSession", {
    roomId: Schema.String;
}, Effect.Effect<{
    readonly _tag: "CompletedLoadSession";
    readonly maybeSession: Option.Option<{
        readonly roomId: string;
        readonly player: {
            readonly id: string;
            readonly username: string;
        };
    }>;
}, never, never>>;
export declare const JoinRoom: Command.CommandDefinitionWithArgs<"JoinRoom", {
    username: Schema.String;
    roomId: Schema.String;
}, Effect.Effect<{
    readonly _tag: "FailedJoinRoom";
} | {
    readonly _tag: "SucceededJoinRoom";
    readonly player: {
        readonly id: string;
        readonly username: string;
    };
}, never, RoomsClient>>;
export declare const StartGame: Command.CommandDefinitionWithArgs<"StartGame", {
    roomId: Schema.String;
    playerId: Schema.String;
}, Effect.Effect<{
    readonly _tag: "FailedStartGame";
} | {
    readonly _tag: "SucceededStartGame";
}, never, RoomsClient>>;
export declare const UpdatePlayerProgress: Command.CommandDefinitionWithArgs<"UpdatePlayerProgress", {
    playerId: Schema.String;
    gameId: Schema.String;
    userGameText: Schema.String;
    charsTyped: Schema.Number;
}, Effect.Effect<{
    readonly _tag: "CompletedUpdatePlayerProgress";
}, never, RoomsClient>>;
export declare const CopyRoomId: Command.CommandDefinitionWithArgs<"CopyRoomId", {
    roomId: Schema.String;
}, Effect.Effect<{
    readonly _tag: "FailedCopyRoomId";
} | {
    readonly _tag: "SucceededCopyRoomId";
}, never, never>>;
export declare const WaitForExitCountdownInterval: Command.CommandDefinitionNoArgs<"WaitForExitCountdownInterval", Effect.Effect<{
    readonly _tag: "CompletedWaitForExitCountdownInterval";
}, never, never>>;
export declare const WaitBeforeHidingRoomIdCopiedIndicator: Command.CommandDefinitionNoArgs<"WaitBeforeHidingRoomIdCopiedIndicator", Effect.Effect<{
    readonly _tag: "CompletedWaitBeforeHidingRoomIdCopiedIndicator";
}, never, never>>;
export declare const SavePlayerSession: Command.CommandDefinitionWithArgs<"SavePlayerSession", {
    session: Schema.Struct<{
        readonly roomId: Schema.String;
        readonly player: Schema.Struct<{
            readonly id: Schema.String;
            readonly username: Schema.String;
        }>;
    }>;
}, Effect.Effect<{
    readonly _tag: "CompletedSavePlayerSession";
}, never, never>>;
export declare const ClearSession: Command.CommandDefinitionNoArgs<"ClearSession", Effect.Effect<{
    readonly _tag: "CompletedClearSession";
}, never, never>>;
export declare const FocusRoomPageUsernameInput: Command.CommandDefinitionNoArgs<"FocusRoomPageUsernameInput", Effect.Effect<{
    readonly _tag: "CompletedFocusRoomPageUsernameInput";
}, never, never>>;
export declare const FocusUserGameTextInput: Command.CommandDefinitionNoArgs<"FocusUserGameTextInput", Effect.Effect<{
    readonly _tag: "CompletedFocusUserGameTextInput";
}, never, never>>;
