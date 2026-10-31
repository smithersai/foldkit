import { Schema } from "effect";
import { Mount } from 'foldkit';
export declare const COLLAPSED_PREVIEW_HEIGHT_PX = 300;
export declare const MINIMUM_EXPANSION_HEIGHT_PX = 48;
export declare const MeasureSnippetHeight: Mount.MountDefinitionWithArgs<"MeasureSnippetHeight", {
    snippetId: Schema.String;
}, {
    readonly _tag: "CompletedMeasureSnippetHeight";
    readonly snippetId: string;
    readonly snippetSize: {
        readonly _tag: "Fits";
    } | {
        readonly _tag: "Overflows";
    };
}>;
