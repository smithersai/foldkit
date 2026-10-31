import { Schema } from "effect";
import { CustomElement, Runtime, type Update } from 'foldkit';
import { Document, HtmlBuilder } from 'foldkit/html';
import 'vanilla-colorful/hex-color-picker.js';
import '@shoelace-style/shoelace/dist/components/qr-code/qr-code.js';
export declare const Model: Schema.Struct<{
    readonly content: Schema.String;
    readonly fillColor: Schema.String;
    readonly backgroundColor: Schema.String;
}>;
export type Model = typeof Model.Type;
export declare const Message: import("foldkit/message").MessageUnion<{
    readonly UpdatedContent: {
        value: Schema.String;
    };
    readonly ChangedFillColor: {
        value: Schema.String;
    };
    readonly ChangedBackgroundColor: {
        value: Schema.String;
    };
}>;
export type Message = typeof Message.Type;
export declare const init: Runtime.ApplicationInit<Model, Message>;
export declare const update: (model: Model, message: Message) => Readonly<{
    model: {
        readonly content: string;
        readonly fillColor: string;
        readonly backgroundColor: string;
    };
    commands?: Update.Commands<{
        readonly _tag: "ChangedBackgroundColor";
        readonly value: string;
    } | {
        readonly _tag: "ChangedFillColor";
        readonly value: string;
    } | {
        readonly _tag: "UpdatedContent";
        readonly value: string;
    }, never>;
    outMessage?: never;
}>;
export declare const hexColorPicker: CustomElement.CustomElementSpec<"hex-color-picker", {
    color: Schema.String;
}, {
    'color-changed': Schema.Struct<{
        readonly value: Schema.String;
    }>;
}>;
export declare const view: (model: Model, h: HtmlBuilder<Message>) => Document;
