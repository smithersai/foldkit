import { Schema } from "effect";
import { Runtime, type Update } from 'foldkit';
import { Document, type HtmlBuilder } from 'foldkit/html';
export declare const Model: Schema.Struct<{
    readonly tickCount: Schema.Number;
    readonly lastReceivedPayloadSize: Schema.Number;
    readonly largeArray: Schema.$Array<Schema.Struct<{
        readonly id: Schema.Number;
        readonly label: Schema.String;
        readonly category: Schema.String;
        readonly isActive: Schema.Boolean;
    }>>;
}>;
type Model = typeof Model.Type;
export declare const Message: import("foldkit/message").MessageUnion<{
    readonly ClickedTick: {};
    readonly ClickedDispatchLargeMessage: {
        payload: Schema.$Array<Schema.Struct<{
            readonly id: Schema.Number;
            readonly label: Schema.String;
            readonly category: Schema.String;
            readonly isActive: Schema.Boolean;
        }>>;
    };
    readonly ClickedFillLargeModel: {
        items: Schema.$Array<Schema.Struct<{
            readonly id: Schema.Number;
            readonly label: Schema.String;
            readonly category: Schema.String;
            readonly isActive: Schema.Boolean;
        }>>;
    };
    readonly ClickedClearLargeModel: {};
    readonly ClickedFillHistory: {};
    readonly CompletedFillHistoryStep: {
        remaining: Schema.Number;
    };
}>;
type Message = typeof Message.Type;
export declare const update: (model: Model, message: Message) => Readonly<{
    model: {
        readonly tickCount: number;
        readonly lastReceivedPayloadSize: number;
        readonly largeArray: readonly {
            readonly id: number;
            readonly label: string;
            readonly category: string;
            readonly isActive: boolean;
        }[];
    };
    commands?: Update.Commands<{
        readonly _tag: "ClickedClearLargeModel";
    } | {
        readonly _tag: "ClickedFillHistory";
    } | {
        readonly _tag: "ClickedTick";
    } | {
        readonly _tag: "ClickedDispatchLargeMessage";
        readonly payload: readonly {
            readonly id: number;
            readonly label: string;
            readonly category: string;
            readonly isActive: boolean;
        }[];
    } | {
        readonly _tag: "ClickedFillLargeModel";
        readonly items: readonly {
            readonly id: number;
            readonly label: string;
            readonly category: string;
            readonly isActive: boolean;
        }[];
    } | {
        readonly _tag: "CompletedFillHistoryStep";
        readonly remaining: number;
    }, never>;
    outMessage?: never;
}>;
export declare const init: Runtime.ApplicationInit<Model, Message>;
export declare const view: (model: Model, h: HtmlBuilder<Message>) => Document;
export {};
