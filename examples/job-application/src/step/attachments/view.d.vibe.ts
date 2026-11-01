import { Option } from "effect";
import { Submodel } from 'foldkit';
export declare const view: Submodel.View<{
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
}, {
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
}, void>;
