import { Schema } from 'effect';
import { AsyncData } from 'foldkit';
export declare const Model: Schema.Struct<{
    readonly user: Schema.Codec<AsyncData.AsyncData<unknown, unknown>, AsyncData.AsyncDataEncoded<unknown, unknown>, never, never>;
}>;
type Model = typeof Model.Type;
declare const Message: import("foldkit/message").MessageUnion<{
    readonly ClickedLoadUser: {};
    readonly SucceededLoadUser: {
        user: any;
    };
    readonly FailedLoadUser: {
        error: any;
    };
}>;
type Message = typeof Message.Type;
export declare const update: (model: Model, message: Message) => unknown;
export {};
