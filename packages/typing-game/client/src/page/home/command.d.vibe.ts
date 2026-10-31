import { Effect, Schema } from "effect";
import { Command } from 'foldkit';
import { RoomsClient } from '../../rpc.vibe';
export declare const CreateRoom: Command.CommandDefinitionWithArgs<"CreateRoom", {
    username: Schema.String;
}, Effect.Effect<{
    readonly _tag: "FailedCreateRoom";
    readonly error: string;
} | {
    readonly _tag: "SucceededCreateRoom";
    readonly roomId: string;
    readonly player: {
        readonly id: string;
        readonly username: string;
    };
}, never, RoomsClient>>;
export declare const JoinRoom: Command.CommandDefinitionWithArgs<"JoinRoom", {
    username: Schema.String;
    roomId: Schema.String;
}, Effect.Effect<{
    readonly _tag: "FailedJoinRoom";
    readonly error: string;
} | {
    readonly _tag: "SucceededJoinRoom";
    readonly roomId: string;
    readonly player: {
        readonly id: string;
        readonly username: string;
    };
}, never, RoomsClient>>;
export declare const FocusUsernameInput: Command.CommandDefinitionNoArgs<"FocusUsernameInput", Effect.Effect<{
    readonly _tag: "CompletedFocusUsernameInput";
}, never, never>>;
export declare const FocusRoomIdInput: Command.CommandDefinitionNoArgs<"FocusRoomIdInput", Effect.Effect<{
    readonly _tag: "CompletedFocusRoomIdInput";
}, never, never>>;
