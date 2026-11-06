import { Effect, Schema } from 'effect';
import { Command, Runtime, Subscription, type Update } from 'foldkit';
import { Document, HtmlBuilder } from 'foldkit/html';
export declare const GameState: Schema.Literals<readonly ["NotStarted", "Playing", "Paused", "GameOver"]>;
export type GameState = typeof GameState.Type;
export declare const Model: Schema.Struct<{
    readonly snake: Schema.NonEmptyArray<Schema.Struct<{
        readonly x: Schema.Number;
        readonly y: Schema.Number;
    }>>;
    readonly apple: Schema.Struct<{
        readonly x: Schema.Number;
        readonly y: Schema.Number;
    }>;
    readonly direction: Schema.Literals<readonly ["Up", "Down", "Left", "Right"]>;
    readonly nextDirection: Schema.Literals<readonly ["Up", "Down", "Left", "Right"]>;
    readonly gameState: Schema.Literals<readonly ["NotStarted", "Playing", "Paused", "GameOver"]>;
    readonly points: Schema.Number;
    readonly highScore: Schema.Number;
}>;
export type Model = typeof Model.Type;
export declare const Message: import("foldkit/message").MessageUnion<{
    readonly TickedClock: {};
    readonly PressedKey: {
        key: Schema.String;
    };
    readonly PausedGame: {};
    readonly RestartedGame: {};
    readonly CompletedGenerateApplePosition: {
        position: Schema.Struct<{
            readonly x: Schema.Number;
            readonly y: Schema.Number;
        }>;
    };
}>;
export type Message = typeof Message.Type;
export declare const init: Runtime.ApplicationInit<Model, Message>;
export declare const update: (model: Model, message: Message) => Readonly<{
    model: {
        readonly snake: readonly [{
            readonly x: number;
            readonly y: number;
        }, ...{
            readonly x: number;
            readonly y: number;
        }[]];
        readonly apple: {
            readonly x: number;
            readonly y: number;
        };
        readonly direction: "Down" | "Left" | "Right" | "Up";
        readonly nextDirection: "Down" | "Left" | "Right" | "Up";
        readonly gameState: "GameOver" | "NotStarted" | "Paused" | "Playing";
        readonly points: number;
        readonly highScore: number;
    };
    commands?: Update.Commands<{
        readonly _tag: "PausedGame";
    } | {
        readonly _tag: "RestartedGame";
    } | {
        readonly _tag: "TickedClock";
    } | {
        readonly _tag: "CompletedGenerateApplePosition";
        readonly position: {
            readonly x: number;
            readonly y: number;
        };
    } | {
        readonly _tag: "PressedKey";
        readonly key: string;
    }, never>;
    outMessage?: never;
}>;
export declare const GenerateApplePosition: Command.CommandDefinitionWithArgs<"GenerateApplePosition", {
    snake: Schema.NonEmptyArray<Schema.Struct<{
        readonly x: Schema.Number;
        readonly y: Schema.Number;
    }>>;
}, Effect.Effect<{
    readonly _tag: "CompletedGenerateApplePosition";
    readonly position: {
        readonly x: number;
        readonly y: number;
    };
}, never, never>>;
export declare const subscriptions: {
    readonly gameClock: Subscription.EntryWithoutKeepAlive<{
        readonly snake: readonly [{
            readonly x: number;
            readonly y: number;
        }, ...{
            readonly x: number;
            readonly y: number;
        }[]];
        readonly apple: {
            readonly x: number;
            readonly y: number;
        };
        readonly direction: "Down" | "Left" | "Right" | "Up";
        readonly nextDirection: "Down" | "Left" | "Right" | "Up";
        readonly gameState: "GameOver" | "NotStarted" | "Paused" | "Playing";
        readonly points: number;
        readonly highScore: number;
    }, {
        readonly _tag: "PausedGame";
    } | {
        readonly _tag: "RestartedGame";
    } | {
        readonly _tag: "TickedClock";
    } | {
        readonly _tag: "CompletedGenerateApplePosition";
        readonly position: {
            readonly x: number;
            readonly y: number;
        };
    } | {
        readonly _tag: "PressedKey";
        readonly key: string;
    }, {
        readonly isPlaying: boolean;
        readonly interval: number;
    }, never> & {
        readonly __subscription: never;
    };
    readonly keyboard: Subscription.EntryWithoutKeepAlive<unknown, {
        readonly _tag: "PressedKey";
        readonly key: string;
    }, Record<string, never>, never> & {
        readonly __subscription: never;
    };
};
export declare const view: (model: Model, h: HtmlBuilder<Message>) => Document;
