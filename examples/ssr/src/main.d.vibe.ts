import { Effect, Schema } from 'effect';
import { Command, Runtime, type Update } from 'foldkit';
import { type Document, type HtmlBuilder } from 'foldkit/html';
export declare const Model: Schema.Struct<{
    readonly count: Schema.Number;
    readonly renderedAt: Schema.String;
    readonly renderedOn: Schema.Literals<readonly ["Server", "Client"]>;
}>;
export type Model = typeof Model.Type;
export declare const Flags: Schema.Struct<{
    readonly initialCount: Schema.Number;
    readonly renderedAt: Schema.String;
    readonly renderedOn: Schema.Literals<readonly ["Server", "Client"]>;
}>;
export type Flags = typeof Flags.Type;
export declare const Message: import("foldkit/message").MessageUnion<{
    readonly ClickedDecrement: {};
    readonly ClickedIncrement: {};
    readonly CompletedPersistCount: {};
}>;
export type Message = typeof Message.Type;
export declare const update: (model: Model, message: Message) => Readonly<{
    model: {
        readonly count: number;
        readonly renderedAt: string;
        readonly renderedOn: "Client" | "Server";
    };
    commands?: Update.Commands<{
        readonly _tag: "ClickedDecrement";
    } | {
        readonly _tag: "ClickedIncrement";
    } | {
        readonly _tag: "CompletedPersistCount";
    }, never>;
    outMessage?: never;
}>;
export declare const PersistCount: Command.CommandDefinitionWithArgs<"PersistCount", {
    count: Schema.Number;
}, Effect.Effect<{
    readonly _tag: "CompletedPersistCount";
}, never, never>>;
export declare const init: Runtime.ApplicationInit<Model, Message, Flags>;
export declare const view: (model: Model, h: HtmlBuilder<Message>) => Document;
