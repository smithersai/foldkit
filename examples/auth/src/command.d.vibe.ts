import { Effect, Schema } from "effect";
import { Command } from 'foldkit';
export declare const SaveSession: Command.CommandDefinitionWithArgs<"SaveSession", {
    session: Schema.Struct<{
        readonly userId: Schema.String;
        readonly email: Schema.String;
        readonly name: Schema.String;
    }>;
}, Effect.Effect<{
    readonly _tag: "SucceededSaveSession";
} | {
    readonly _tag: "FailedSaveSession";
    readonly error: string;
}, never, never>>;
export declare const ClearSession: Command.CommandDefinitionNoArgs<"ClearSession", Effect.Effect<{
    readonly _tag: "SucceededClearSession";
} | {
    readonly _tag: "FailedClearSession";
    readonly error: string;
}, never, never>>;
export declare const LogError: Command.CommandDefinitionWithArgs<"LogError", {
    entries: Schema.$Array<Schema.Unknown>;
}, Effect.Effect<{
    readonly _tag: "CompletedLogError";
}, never, never>>;
