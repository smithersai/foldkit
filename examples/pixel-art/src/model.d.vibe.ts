import { Schema } from 'effect';
export declare const PaletteIndex: Schema.Literals<readonly [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]>;
export type PaletteIndex = typeof PaletteIndex.Type;
export declare const HexColor: Schema.brand<Schema.String, "HexColor">;
export type HexColor = typeof HexColor.Type;
export declare const Tool: Schema.Literals<readonly ["Brush", "Fill", "Eraser"]>;
export type Tool = typeof Tool.Type;
export declare const MirrorMode: Schema.Literals<readonly ["None", "Horizontal", "Vertical", "Both"]>;
export type MirrorMode = typeof MirrorMode.Type;
export declare const Cell: Schema.Option<Schema.Literals<readonly [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]>>;
export type Cell = typeof Cell.Type;
export declare const Grid: Schema.$Array<Schema.$Array<Schema.Option<Schema.Literals<readonly [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]>>>>;
export type Grid = typeof Grid.Type;
export declare const Position: Schema.Struct<{
    readonly x: Schema.Number;
    readonly y: Schema.Number;
}>;
export type Position = typeof Position.Type;
export declare const SavedCanvas: Schema.Struct<{
    readonly grid: Schema.$Array<Schema.$Array<Schema.Option<Schema.Literals<readonly [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]>>>>;
    readonly gridSize: Schema.Number;
    readonly paletteThemeIndex: Schema.Number;
    readonly selectedColorIndex: Schema.Literals<readonly [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]>;
}>;
export type SavedCanvas = typeof SavedCanvas.Type;
export declare const SavedCanvasJsonString: Schema.fromJsonString<Schema.toCodecJson<Schema.Struct<{
    readonly grid: Schema.$Array<Schema.$Array<Schema.Option<Schema.Literals<readonly [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]>>>>;
    readonly gridSize: Schema.Number;
    readonly paletteThemeIndex: Schema.Number;
    readonly selectedColorIndex: Schema.Literals<readonly [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]>;
}>>>;
export declare const Model: Schema.Struct<{
    readonly grid: Schema.$Array<Schema.$Array<Schema.Option<Schema.Literals<readonly [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]>>>>;
    readonly undoStack: Schema.$Array<Schema.$Array<Schema.$Array<Schema.Option<Schema.Literals<readonly [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]>>>>>;
    readonly redoStack: Schema.$Array<Schema.$Array<Schema.$Array<Schema.Option<Schema.Literals<readonly [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]>>>>>;
    readonly selectedColorIndex: Schema.Literals<readonly [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]>;
    readonly gridSize: Schema.Number;
    readonly tool: Schema.Literals<readonly ["Brush", "Fill", "Eraser"]>;
    readonly mirrorMode: Schema.Literals<readonly ["None", "Horizontal", "Vertical", "Both"]>;
    readonly isDrawing: Schema.Boolean;
    readonly maybeHoveredCell: Schema.Option<Schema.Struct<{
        readonly x: Schema.Number;
        readonly y: Schema.Number;
    }>>;
    readonly errorDialog: Schema.Struct<{
        readonly id: Schema.String;
        readonly isOpen: Schema.Boolean;
        readonly isAnimated: Schema.Boolean;
        readonly animation: Schema.Struct<{
            readonly id: Schema.String;
            readonly isShowing: Schema.Boolean;
            readonly transitionState: Schema.Literals<readonly ["Idle", "EnterStart", "EnterAnimating", "LeaveStart", "LeaveAnimating"]>;
            readonly transitionGeneration: Schema.Number;
        }>;
        readonly maybeFocusSelector: Schema.Option<Schema.String>;
    }>;
    readonly maybeExportError: Schema.Option<Schema.String>;
    readonly paletteThemeIndex: Schema.Number;
    readonly gridSizeConfirmDialog: Schema.Struct<{
        readonly id: Schema.String;
        readonly isOpen: Schema.Boolean;
        readonly isAnimated: Schema.Boolean;
        readonly animation: Schema.Struct<{
            readonly id: Schema.String;
            readonly isShowing: Schema.Boolean;
            readonly transitionState: Schema.Literals<readonly ["Idle", "EnterStart", "EnterAnimating", "LeaveStart", "LeaveAnimating"]>;
            readonly transitionGeneration: Schema.Number;
        }>;
        readonly maybeFocusSelector: Schema.Option<Schema.String>;
    }>;
    readonly maybePendingGridSize: Schema.Option<Schema.Number>;
    readonly themeListbox: Schema.Struct<{
        readonly id: Schema.String;
        readonly isOpen: Schema.Boolean;
        readonly isAnimated: Schema.Boolean;
        readonly isModal: Schema.Boolean;
        readonly orientation: Schema.Literals<readonly ["Vertical", "Horizontal"]>;
        readonly animation: Schema.Struct<{
            readonly id: Schema.String;
            readonly isShowing: Schema.Boolean;
            readonly transitionState: Schema.Literals<readonly ["Idle", "EnterStart", "EnterAnimating", "LeaveStart", "LeaveAnimating"]>;
            readonly transitionGeneration: Schema.Number;
        }>;
        readonly maybeActiveItemIndex: Schema.Option<Schema.Number>;
        readonly activationTrigger: Schema.Literals<readonly ["Pointer", "Keyboard"]>;
        readonly searchQuery: Schema.String;
        readonly searchVersion: Schema.Number;
        readonly maybeLastPointerPosition: Schema.Option<Schema.Struct<{
            readonly screenX: Schema.Number;
            readonly screenY: Schema.Number;
        }>>;
        readonly maybeLastButtonPointerType: Schema.Option<Schema.String>;
    }>;
    readonly toolRadioGroup: Schema.Struct<{
        readonly id: Schema.String;
        readonly maybeFocusedIndex: Schema.Option<Schema.Number>;
    }>;
    readonly gridSizeRadioGroup: Schema.Struct<{
        readonly id: Schema.String;
        readonly maybeFocusedIndex: Schema.Option<Schema.Number>;
    }>;
    readonly paletteRadioGroup: Schema.Struct<{
        readonly id: Schema.String;
        readonly maybeFocusedIndex: Schema.Option<Schema.Number>;
    }>;
}>;
export type Model = typeof Model.Type;
export declare const paletteIndexFromValue: (value: string, fallback: PaletteIndex) => PaletteIndex;
