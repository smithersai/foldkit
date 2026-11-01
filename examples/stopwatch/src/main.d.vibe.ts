import { Effect, Schema } from 'effect';
import { Command, Runtime, Subscription, type Update } from 'foldkit';
import { Document, HtmlBuilder } from 'foldkit/html';
export declare const Model: Schema.Struct<{
    readonly elapsedMs: Schema.Number;
    readonly isRunning: Schema.Boolean;
    readonly startTime: Schema.Number;
}>;
export type Model = typeof Model.Type;
export declare const Message: import("foldkit/message").MessageUnion<{
    readonly ClickedStart: {};
    readonly CompletedDetermineStartTime: {
        startTime: Schema.Number;
    };
    readonly ClickedStop: {};
    readonly ClickedReset: {};
    readonly Ticked: {};
    readonly CompletedDetermineTickTime: {
        elapsedMs: Schema.Number;
    };
}>;
export type Message = typeof Message.Type;
export declare const DetermineStartTime: Command.CommandDefinitionWithArgs<"DetermineStartTime", {
    elapsedMs: Schema.Number;
}, Effect.Effect<{
    readonly _tag: "CompletedDetermineStartTime";
    readonly startTime: number;
}, never, never>>;
export declare const DetermineTickTime: Command.CommandDefinitionWithArgs<"DetermineTickTime", {
    startTime: Schema.Number;
}, Effect.Effect<{
    readonly _tag: "CompletedDetermineTickTime";
    readonly elapsedMs: number;
}, never, never>>;
export declare const update: (model: Model, message: Message) => Readonly<{
    model: {
        readonly elapsedMs: number;
        readonly isRunning: boolean;
        readonly startTime: number;
    };
    commands?: Update.Commands<{
        readonly _tag: "ClickedReset";
    } | {
        readonly _tag: "ClickedStart";
    } | {
        readonly _tag: "ClickedStop";
    } | {
        readonly _tag: "Ticked";
    } | {
        readonly _tag: "CompletedDetermineStartTime";
        readonly startTime: number;
    } | {
        readonly _tag: "CompletedDetermineTickTime";
        readonly elapsedMs: number;
    }, never>;
    outMessage?: never;
}>;
export declare const init: Runtime.ApplicationInit<Model, Message>;
export declare const subscriptions: {
    readonly tick: Subscription.EntryWithoutKeepAlive<{
        readonly elapsedMs: number;
        readonly isRunning: boolean;
        readonly startTime: number;
    }, {
        readonly _tag: "ClickedReset";
    } | {
        readonly _tag: "ClickedStart";
    } | {
        readonly _tag: "ClickedStop";
    } | {
        readonly _tag: "Ticked";
    } | {
        readonly _tag: "CompletedDetermineStartTime";
        readonly startTime: number;
    } | {
        readonly _tag: "CompletedDetermineTickTime";
        readonly elapsedMs: number;
    }, {
        readonly isRunning: boolean;
    }, never> & {
        readonly __subscription: never;
    };
};
export declare const view: (model: Model, h: HtmlBuilder<Message>) => Document;
