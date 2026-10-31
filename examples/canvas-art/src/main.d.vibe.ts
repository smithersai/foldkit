import { Effect, Schema } from "effect";
import { Command, Runtime, type Update } from 'foldkit';
import { Document, HtmlBuilder } from 'foldkit/html';
export declare const Model: Schema.Struct<{
    readonly balls: Schema.$Array<Schema.Struct<{
        readonly id: Schema.Number;
        readonly x: Schema.Number;
        readonly y: Schema.Number;
        readonly vx: Schema.Number;
        readonly vy: Schema.Number;
        readonly radius: Schema.Number;
        readonly color: Schema.String;
    }>>;
    readonly nextId: Schema.Number;
    readonly isRunning: Schema.Boolean;
}>;
export type Model = typeof Model.Type;
export declare const Message: import("foldkit/message").MessageUnion<{
    readonly TickedFrame: {
        deltaTime: Schema.Number;
    };
    readonly ClickedCanvas: {
        x: Schema.Number;
        y: Schema.Number;
    };
    readonly CompletedGenerateBall: {
        x: Schema.Number;
        y: Schema.Number;
        vx: Schema.Number;
        vy: Schema.Number;
        radius: Schema.Number;
        color: Schema.String;
    };
    readonly ClickedClear: {};
    readonly ClickedTogglePlay: {};
}>;
export type Message = typeof Message.Type;
export declare const init: Runtime.ApplicationInit<Model, Message>;
export declare const GenerateBall: Command.CommandDefinitionWithArgs<"GenerateBall", {
    x: Schema.Number;
    y: Schema.Number;
}, Effect.Effect<{
    readonly _tag: "CompletedGenerateBall";
    readonly x: number;
    readonly y: number;
    readonly vx: number;
    readonly vy: number;
    readonly radius: number;
    readonly color: string;
}, never, never>>;
export declare const update: (model: Model, message: Message) => Readonly<{
    model: {
        readonly balls: readonly {
            readonly id: number;
            readonly x: number;
            readonly y: number;
            readonly vx: number;
            readonly vy: number;
            readonly radius: number;
            readonly color: string;
        }[];
        readonly nextId: number;
        readonly isRunning: boolean;
    };
    commands?: Update.Commands<{
        readonly _tag: "ClickedClear";
    } | {
        readonly _tag: "ClickedTogglePlay";
    } | {
        readonly _tag: "ClickedCanvas";
        readonly x: number;
        readonly y: number;
    } | {
        readonly _tag: "CompletedGenerateBall";
        readonly x: number;
        readonly y: number;
        readonly vx: number;
        readonly vy: number;
        readonly radius: number;
        readonly color: string;
    } | {
        readonly _tag: "TickedFrame";
        readonly deltaTime: number;
    }, never>;
    outMessage?: never;
}>;
export declare const subscriptions: {
    readonly frame: {
        dependenciesSchema: Schema.Struct<{
            readonly isActive: Schema.Boolean;
        }>;
        modelToDependencies: (model: {
            readonly balls: readonly {
                readonly id: number;
                readonly x: number;
                readonly y: number;
                readonly vx: number;
                readonly vy: number;
                readonly radius: number;
                readonly color: string;
            }[];
            readonly nextId: number;
            readonly isRunning: boolean;
        }) => {
            isActive: boolean;
        };
        dependenciesToStream: ({ isActive }: {
            readonly isActive: boolean;
        }) => import("effect/Stream").Stream<{
            readonly _tag: "TickedFrame";
            readonly deltaTime: number;
        }, never, never>;
    } & {
        readonly __subscription: never;
    };
};
export declare const view: (model: Model, h: HtmlBuilder<Message>) => Document;
