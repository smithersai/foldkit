import { Schema } from 'effect';
import type { Html, HtmlBuilder } from 'foldkit/html';
import 'vanilla-colorful/hex-color-picker.js';
import '@shoelace-style/shoelace/dist/components/qr-code/qr-code.js';
declare const Message: import("foldkit/message").MessageUnion<{
    readonly ChangedFillColor: {
        value: Schema.String;
    };
}>;
type Message = typeof Message.Type;
export declare const designerView: (model: {
    content: string;
    fillColor: string;
}, h: HtmlBuilder<Message>) => Html;
export {};
