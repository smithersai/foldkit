import { Effect, Schema } from 'effect';
import { Command } from 'foldkit';
export declare const ReportCount: Command.CommandDefinitionWithArgs<"ReportCount", {
    count: Schema.Number;
}, Effect.Effect<any, never, never>>;
