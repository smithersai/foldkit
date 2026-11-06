import { Schema } from 'effect';
import { Submodel, type Update } from 'foldkit';
export declare const Model: Schema.Struct<{
    readonly content: Schema.String;
}>;
export type Model = typeof Model.Type;
export declare const Message: import("foldkit/message").MessageUnion<{
    readonly UpdatedContent: {
        value: Schema.String;
    };
}>;
export type Message = typeof Message.Type;
export declare const init: () => Model;
export declare const update: (model: Model, message: Message) => Readonly<{
    model: {
        readonly content: string;
    };
    commands?: Update.Commands<{
        readonly _tag: "UpdatedContent";
        readonly value: string;
    }, never>;
    outMessage?: never;
}>;
export declare const view: Submodel.View<{
    readonly content: string;
}, {
    readonly _tag: "UpdatedContent";
    readonly value: string;
}, void>;
