import { Schema } from 'effect';
import { Runtime, Update } from 'foldkit';
import { Document, HtmlBuilder } from 'foldkit/html';
export declare const Model: Schema.Struct<{
    readonly rows: Schema.$Array<Schema.Struct<{
        readonly id: Schema.String;
        readonly counter: Schema.Struct<{
            readonly count: Schema.Number;
        }>;
    }>>;
    readonly nextRowId: Schema.Number;
}>;
export type Model = typeof Model.Type;
export declare const Message: import("foldkit/message").MessageUnion<{
    readonly ClickedAddRow: {};
    readonly ClickedRemoveRow: {
        id: Schema.String;
    };
    readonly GotCounterMessage: {
        id: Schema.String;
        message: import("foldkit/message").MessageUnion<{
            readonly ClickedDecrement: {};
            readonly ClickedIncrement: {};
        }>;
    };
}>;
export type Message = typeof Message.Type;
export declare const update: (model: Model, message: Message) => Readonly<{
    model: {
        readonly rows: readonly {
            readonly id: string;
            readonly counter: {
                readonly count: number;
            };
        }[];
        readonly nextRowId: number;
    };
    commands?: Update.Commands<{
        readonly _tag: "ClickedAddRow";
    } | {
        readonly _tag: "ClickedRemoveRow";
        readonly id: string;
    } | {
        readonly _tag: "GotCounterMessage";
        readonly id: string;
        readonly message: {
            readonly _tag: "ClickedDecrement";
        } | {
            readonly _tag: "ClickedIncrement";
        };
    }, never>;
    outMessage?: never;
}>;
export declare const init: Runtime.ApplicationInit<Model, Message>;
export declare const view: (model: Model, h: HtmlBuilder<Message>) => Document;
