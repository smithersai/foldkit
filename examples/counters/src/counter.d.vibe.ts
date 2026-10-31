import { Schema } from "effect";
import { Submodel, type Update } from 'foldkit';
export declare const Model: Schema.Struct<{
    readonly count: Schema.Number;
}>;
export type Model = typeof Model.Type;
export declare const init: Model;
export declare const Message: import("foldkit/message").MessageUnion<{
    readonly ClickedDecrement: {};
    readonly ClickedIncrement: {};
}>;
export type Message = typeof Message.Type;
export declare const update: (model: Model, message: Message) => Readonly<{
    model: {
        readonly count: number;
    };
    commands?: Update.Commands<{
        readonly _tag: "ClickedDecrement";
    } | {
        readonly _tag: "ClickedIncrement";
    }, never>;
    outMessage?: never;
}>;
export declare const view: Submodel.View<{
    readonly count: number;
}, {
    readonly _tag: "ClickedDecrement";
} | {
    readonly _tag: "ClickedIncrement";
}, void>;
