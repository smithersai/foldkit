import { Schema } from 'effect';
import { type Update } from 'foldkit';
export declare const Theme: Schema.Literals<readonly ["Light", "Dark", "System"]>;
export type Theme = typeof Theme.Type;
export declare const FontSize: Schema.Literals<readonly ["Small", "Medium", "Large"]>;
export type FontSize = typeof FontSize.Type;
export declare const Model: Schema.Struct<{
    readonly theme: Schema.Literals<readonly ["Light", "Dark", "System"]>;
    readonly fontSize: Schema.Literals<readonly ["Small", "Medium", "Large"]>;
    readonly notificationsEnabled: Schema.Boolean;
}>;
export type Model = typeof Model.Type;
export declare const Message: import("foldkit/message").MessageUnion<{
    readonly ChangedTheme: {
        theme: Schema.Literals<readonly ["Light", "Dark", "System"]>;
    };
    readonly ChangedFontSize: {
        fontSize: Schema.Literals<readonly ["Small", "Medium", "Large"]>;
    };
    readonly ToggledNotifications: {};
}>;
export type Message = typeof Message.Type;
export declare const update: (model: Model, message: Message) => Readonly<{
    model: {
        readonly theme: "Dark" | "Light" | "System";
        readonly fontSize: "Large" | "Medium" | "Small";
        readonly notificationsEnabled: boolean;
    };
    commands?: Update.Commands<{
        readonly _tag: "ToggledNotifications";
    } | {
        readonly _tag: "ChangedFontSize";
        readonly fontSize: "Large" | "Medium" | "Small";
    } | {
        readonly _tag: "ChangedTheme";
        readonly theme: "Dark" | "Light" | "System";
    }, never>;
    outMessage?: never;
}>;
