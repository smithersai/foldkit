import { Effect, Schema } from "effect";
import { Command, Submodel, type Update } from 'foldkit';
export declare const Model: Schema.Struct<{
    readonly count: Schema.Number;
    readonly isResetting: Schema.Boolean;
    readonly resetDuration: Schema.Number;
    readonly phase: Schema.Literals<readonly ["Idle", "IncrementMessage", "IncrementUpdate", "IncrementModel", "DurationMessage", "DurationUpdate", "DurationModel", "ResetMessage", "ResetUpdate", "ResetCommand", "ResetCommandMessage", "ResetCommandUpdate", "ResetModel"]>;
    readonly generation: Schema.Number;
    readonly messageLog: Schema.$Array<Schema.String>;
}>;
export type Model = typeof Model.Type;
export declare const Message: import("foldkit/message").MessageUnion<{
    readonly ClickedDemoIncrement: {};
    readonly ChangedDemoResetDuration: {
        seconds: Schema.Number;
    };
    readonly ClickedDemoReset: {};
    readonly CompletedDelayAdvancePhase: {
        generation: Schema.Number;
    };
}>;
export type Message = typeof Message.Type;
type UpdateReturn = Update.Return<Model, Message>;
export declare const init: () => UpdateReturn;
export declare const DelayAdvancePhase: Command.CommandDefinitionWithArgs<"DelayAdvancePhase", {
    generation: Schema.Number;
    duration: Schema.DurationFromMillis;
}, Effect.Effect<{
    readonly _tag: "CompletedDelayAdvancePhase";
    readonly generation: number;
}, never, never>>;
export declare const update: (model: Model, message: Message) => Readonly<{
    model: {
        readonly count: number;
        readonly isResetting: boolean;
        readonly resetDuration: number;
        readonly phase: "DurationMessage" | "DurationModel" | "DurationUpdate" | "Idle" | "IncrementMessage" | "IncrementModel" | "IncrementUpdate" | "ResetCommand" | "ResetCommandMessage" | "ResetCommandUpdate" | "ResetMessage" | "ResetModel" | "ResetUpdate";
        readonly generation: number;
        readonly messageLog: readonly string[];
    };
    commands?: Update.Commands<{
        readonly _tag: "ClickedDemoIncrement";
    } | {
        readonly _tag: "ClickedDemoReset";
    } | {
        readonly _tag: "ChangedDemoResetDuration";
        readonly seconds: number;
    } | {
        readonly _tag: "CompletedDelayAdvancePhase";
        readonly generation: number;
    }, never>;
    outMessage?: never;
}>;
export declare const view: Submodel.View<{
    readonly count: number;
    readonly isResetting: boolean;
    readonly resetDuration: number;
    readonly phase: "DurationMessage" | "DurationModel" | "DurationUpdate" | "Idle" | "IncrementMessage" | "IncrementModel" | "IncrementUpdate" | "ResetCommand" | "ResetCommandMessage" | "ResetCommandUpdate" | "ResetMessage" | "ResetModel" | "ResetUpdate";
    readonly generation: number;
    readonly messageLog: readonly string[];
}, {
    readonly _tag: "ClickedDemoIncrement";
} | {
    readonly _tag: "ClickedDemoReset";
} | {
    readonly _tag: "ChangedDemoResetDuration";
    readonly seconds: number;
} | {
    readonly _tag: "CompletedDelayAdvancePhase";
    readonly generation: number;
}, void>;
export {};
