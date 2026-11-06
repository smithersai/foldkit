import { Array, Effect, Schema } from 'effect';
import { Command, Runtime, type Update } from 'foldkit';
import { Document, HtmlBuilder } from 'foldkit/html';
export declare const UploadStatus: Schema.Literals<readonly ["Uploading", "Done", "Cancelled"]>;
export type UploadStatus = typeof UploadStatus.Type;
export declare const Upload: Schema.Struct<{
    readonly id: Schema.Number;
    readonly fileName: Schema.String;
    readonly sizeMegabytes: Schema.Number;
    readonly status: Schema.Literals<readonly ["Uploading", "Done", "Cancelled"]>;
}>;
export type Upload = typeof Upload.Type;
export declare const Model: Schema.Struct<{
    readonly uploadId: Schema.Number;
    readonly uploads: Schema.$Array<Schema.Struct<{
        readonly id: Schema.Number;
        readonly fileName: Schema.String;
        readonly sizeMegabytes: Schema.Number;
        readonly status: Schema.Literals<readonly ["Uploading", "Done", "Cancelled"]>;
    }>>;
}>;
export type Model = typeof Model.Type;
export declare const Message: import("foldkit/message").MessageUnion<{
    readonly ClickedStartUpload: {};
    readonly ClickedCancelUpload: {
        uploadId: Schema.Number;
    };
    readonly ClickedCancelAllUploads: {};
    readonly ClickedRestartUpload: {
        uploadId: Schema.Number;
    };
    readonly SucceededUploadFile: {
        uploadId: Schema.Number;
    };
    readonly CompletedCancelUploadFile: {
        uploadId: Schema.Number;
        outcome: import("foldkit/schema").TaggedUnion<{
            readonly Interrupted: {};
            readonly NotFound: {};
        }>;
    };
}>;
export type Message = typeof Message.Type;
export declare const initialModel: Model;
export declare const init: Runtime.ApplicationInit<Model, Message>;
export declare const FakeFile: Schema.Struct<{
    readonly name: Schema.String;
    readonly sizeMegabytes: Schema.Number;
}>;
export type FakeFile = typeof FakeFile.Type;
export declare const FAKE_FILES: Array.NonEmptyReadonlyArray<FakeFile>;
export declare const UploadKey: Schema.Struct<{
    readonly uploadId: Schema.Number;
}>;
export type UploadKey = typeof UploadKey.Type;
export declare const UploadFile: Command.Interruptible.DefinitionWithArgs<"UploadFile", {
    uploadId: Schema.Number;
    sizeMegabytes: Schema.Number;
}, Pick<{
    readonly uploadId: number;
    readonly sizeMegabytes: number;
}, "uploadId">, Effect.Effect<{
    readonly _tag: "SucceededUploadFile";
    readonly uploadId: number;
}, never, never>>;
export declare const CancelUploadFile: ({ uploadId }: UploadKey) => Readonly<{
    name: "UploadFile.Interrupt";
    args: Pick<{
        readonly uploadId: number;
        readonly sizeMegabytes: number;
    }, "uploadId">;
    interruptsKey: string;
    effect: Effect.Effect<{
        readonly _tag: "CompletedCancelUploadFile";
        readonly uploadId: number;
        readonly outcome: {
            readonly _tag: "Interrupted";
        } | {
            readonly _tag: "NotFound";
        };
    }, never, never>;
}>;
export declare const update: (model: Model, message: Message) => Readonly<{
    model: {
        readonly uploadId: number;
        readonly uploads: readonly {
            readonly id: number;
            readonly fileName: string;
            readonly sizeMegabytes: number;
            readonly status: "Cancelled" | "Done" | "Uploading";
        }[];
    };
    commands?: Update.Commands<{
        readonly _tag: "ClickedCancelAllUploads";
    } | {
        readonly _tag: "ClickedStartUpload";
    } | {
        readonly _tag: "ClickedCancelUpload";
        readonly uploadId: number;
    } | {
        readonly _tag: "ClickedRestartUpload";
        readonly uploadId: number;
    } | {
        readonly _tag: "CompletedCancelUploadFile";
        readonly uploadId: number;
        readonly outcome: {
            readonly _tag: "Interrupted";
        } | {
            readonly _tag: "NotFound";
        };
    } | {
        readonly _tag: "SucceededUploadFile";
        readonly uploadId: number;
    }, never>;
    outMessage?: never;
}>;
export declare const view: (model: Model, h: HtmlBuilder<Message>) => Document;
