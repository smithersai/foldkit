import { Effect, Schema } from "effect";
import { Command } from 'foldkit';
export declare const NavigateToRoom: Command.CommandDefinitionWithArgs<"NavigateToRoom", {
    roomId: Schema.String;
}, Effect.Effect<{
    readonly _tag: "CompletedNavigateToRoom";
}, never, never>>;
