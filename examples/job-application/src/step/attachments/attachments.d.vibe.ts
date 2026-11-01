import { Option, Schema } from "effect";
import { Update } from 'foldkit';
export declare const Model: Schema.Struct<{
    readonly resumeDrop: Schema.Struct<{
        readonly id: Schema.String;
        readonly isDragOver: Schema.Boolean;
    }>;
    readonly maybeResume: Schema.Option<Schema.Schema<File>>;
    readonly additionalFilesDrop: Schema.Struct<{
        readonly id: Schema.String;
        readonly isDragOver: Schema.Boolean;
    }>;
    readonly additionalFiles: Schema.$Array<Schema.Schema<File>>;
}>;
export type Model = typeof Model.Type;
export declare const Message: import("foldkit/message").MessageUnion<{
    readonly GotResumeDropMessage: {
        message: import("foldkit/message").MessageUnion<{
            readonly EnteredDragZone: {};
            readonly LeftDragZone: {};
            readonly DroppedFiles: {
                files: Schema.NonEmptyArray<Schema.Schema<File>>;
            };
            readonly DroppedNonFiles: {};
        }>;
    };
    readonly GotAdditionalFilesDropMessage: {
        message: import("foldkit/message").MessageUnion<{
            readonly EnteredDragZone: {};
            readonly LeftDragZone: {};
            readonly DroppedFiles: {
                files: Schema.NonEmptyArray<Schema.Schema<File>>;
            };
            readonly DroppedNonFiles: {};
        }>;
    };
    readonly RemovedResume: {};
    readonly RemovedAdditionalFile: {
        fileIndex: Schema.Number;
    };
}>;
export type Message = typeof Message.Type;
export declare const init: () => Model;
export declare const update: (model: Model, message: Message) => Readonly<{
    model: {
        readonly resumeDrop: {
            readonly id: string;
            readonly isDragOver: boolean;
        };
        readonly maybeResume: Option.Option<File>;
        readonly additionalFilesDrop: {
            readonly id: string;
            readonly isDragOver: boolean;
        };
        readonly additionalFiles: readonly File[];
    };
    commands?: Update.Commands<{
        readonly _tag: "RemovedResume";
    } | {
        readonly _tag: "GotAdditionalFilesDropMessage";
        readonly message: {
            readonly _tag: "DroppedNonFiles";
        } | {
            readonly _tag: "EnteredDragZone";
        } | {
            readonly _tag: "LeftDragZone";
        } | {
            readonly _tag: "DroppedFiles";
            readonly files: readonly [File, ...File[]];
        };
    } | {
        readonly _tag: "GotResumeDropMessage";
        readonly message: {
            readonly _tag: "DroppedNonFiles";
        } | {
            readonly _tag: "EnteredDragZone";
        } | {
            readonly _tag: "LeftDragZone";
        } | {
            readonly _tag: "DroppedFiles";
            readonly files: readonly [File, ...File[]];
        };
    } | {
        readonly _tag: "RemovedAdditionalFile";
        readonly fileIndex: number;
    }, never>;
    outMessage?: never;
}>;
