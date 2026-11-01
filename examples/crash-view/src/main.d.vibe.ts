import { Schema } from 'effect';
import { Runtime } from 'foldkit';
import { Document, HtmlBuilder } from 'foldkit/html';
export declare const Model: Schema.Null;
export type Model = typeof Model.Type;
export declare const Message: import("foldkit/message").MessageUnion<{
    readonly ClickedCrash: {};
}>;
export type Message = typeof Message.Type;
export { update } from './crashUpdate.js';
export declare const init: Runtime.ApplicationInit<Model, Message>;
export declare const view: (_model: Model, h: HtmlBuilder<Message>) => Document;
export declare const crashView: ({ error }: Runtime.CrashContext<Model, Message>, h: HtmlBuilder<never>) => Document;
