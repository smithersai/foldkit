import { Schema } from 'effect';
import { type Update } from 'foldkit';
import { type ChildAttribute, type Html } from 'foldkit/html';
/** Schema for the file-drop component's state.
 *
 * `isDragOver` controls the `data-drag-over` attribute on the root while a
 * drag is hovering. The html layer's `OnDragEnter`/`OnDragLeave` handlers
 * track the per-element active state internally so transitions between
 * children of the zone do not flicker the boolean off-and-on. */
export declare const Model: Schema.Struct<{
    readonly id: Schema.String;
    readonly isDragOver: Schema.Boolean;
}>;
export type Model = typeof Model.Type;
/** Union of all messages the file-drop component can produce. */
export declare const Message: import("foldkit/message").MessageUnion<{
    readonly EnteredDragZone: {};
    readonly LeftDragZone: {};
    readonly DroppedFiles: {
        files: Schema.NonEmptyArray<Schema.Schema<File>>;
    };
    readonly DroppedNonFiles: {};
}>;
export type Message = typeof Message.Type;
/** The file-drop component's OutMessages: `ReceivedFiles` on the happy
 * path and `RejectedNonFiles` when a drop event fires without files. */
export declare const OutMessage: import("foldkit/message").MessageUnion<{
    readonly ReceivedFiles: {
        files: Schema.NonEmptyArray<Schema.Schema<File>>;
    };
    readonly RejectedNonFiles: {};
}>;
export type OutMessage = typeof OutMessage.Type;
/** Configuration for creating a file-drop model with `init`. */
export type InitConfig = Readonly<{
    id: string;
}>;
/** Creates an initial file-drop model. Drag state starts cleared. */
export declare const init: (config: InitConfig) => Model;
/** Processes a file-drop Message and returns the next Model, optional Commands,
 *  and an optional OutMessage. */
export declare const update: (model: Model, message: Message) => Readonly<{
    model: {
        readonly id: string;
        readonly isDragOver: boolean;
    };
    commands?: Update.Commands<{
        readonly _tag: "DroppedNonFiles";
    } | {
        readonly _tag: "EnteredDragZone";
    } | {
        readonly _tag: "LeftDragZone";
    } | {
        readonly _tag: "DroppedFiles";
        readonly files: readonly [File, ...File[]];
    }, never>;
    outMessage?: {
        readonly _tag: "RejectedNonFiles";
    } | {
        readonly _tag: "ReceivedFiles";
        readonly files: readonly [File, ...File[]];
    };
}>;
/** Attribute groups the file-drop component provides to the consumer's
 *  `toView` callback. */
export type FileDropAttributes = Readonly<{
    /** Attributes for the outer drop zone element (typically a `<label>`):
     *  drag-and-drop handlers, `data-drag-over` while a drag hovers, and
     *  `data-disabled` when disabled. */
    root: ReadonlyArray<ChildAttribute>;
    /** Attributes for a hidden `<input type="file">` nested inside the
     *  root: file-change handler, `type`, `id`, `multiple`, `accept`, and
     *  `sr-only` class. */
    input: ReadonlyArray<ChildAttribute>;
}>;
/** Per-render view inputs passed to `view` via `h.submodel`'s `viewInputs` field. */
export type ViewInputs = Readonly<{
    toView: (attributes: FileDropAttributes) => Html;
    accept?: ReadonlyArray<string>;
    multiple?: boolean;
    isDisabled?: boolean;
}>;
/** Renders an accessible file-drop zone by publishing attribute groups
 *  for a `<label>`-wrapped hidden file input. */
export declare const view: import("foldkit/submodel").View<{
    readonly id: string;
    readonly isDragOver: boolean;
}, {
    readonly _tag: "DroppedNonFiles";
} | {
    readonly _tag: "EnteredDragZone";
} | {
    readonly _tag: "LeftDragZone";
} | {
    readonly _tag: "DroppedFiles";
    readonly files: readonly [File, ...File[]];
}, Readonly<{
    toView: (attributes: FileDropAttributes) => Html;
    accept?: ReadonlyArray<string>;
    multiple?: boolean;
    isDisabled?: boolean;
}>>;
