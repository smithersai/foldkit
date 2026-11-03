import { Schema } from 'effect';
export declare const Model: Schema.Struct<{
    readonly grid: any;
    readonly undoStack: Schema.$Array<any>;
    readonly redoStack: Schema.$Array<any>;
    readonly selectedColorIndex: any;
    readonly gridSize: Schema.Number;
    readonly tool: any;
    readonly mirrorMode: any;
    readonly isDrawing: Schema.Boolean;
    readonly maybeHoveredCell: Schema.Option<any>;
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
