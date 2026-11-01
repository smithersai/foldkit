import { Effect, Schema } from "effect";
import { Command } from 'foldkit';
export declare const GenerateCardId: Command.CommandDefinitionWithArgs<"GenerateCardId", {
    columnId: Schema.String;
    title: Schema.String;
}, Effect.Effect<{
    readonly _tag: "CompletedGenerateCardId";
    readonly cardId: string;
    readonly columnId: string;
    readonly title: string;
}, never, never>>;
export declare const SaveBoard: Command.CommandDefinitionWithArgs<"SaveBoard", {
    columns: Schema.$Array<Schema.Struct<{
        readonly id: Schema.String;
        readonly name: Schema.String;
        readonly cards: Schema.$Array<Schema.Struct<{
            readonly id: Schema.String;
            readonly title: Schema.String;
            readonly description: Schema.String;
            readonly sortKey: Schema.String;
        }>>;
    }>>;
}, Effect.Effect<{
    readonly _tag: "CompletedSaveBoard";
}, never, never>>;
export declare const FocusAddCardInput: Command.CommandDefinitionNoArgs<"FocusAddCardInput", Effect.Effect<{
    readonly _tag: "CompletedFocusAddCardInput";
}, never, never>>;
