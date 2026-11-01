import { Schema } from 'effect';
export declare const Message: import("foldkit/message").MessageUnion<{
    readonly PressedCell: {
        x: Schema.Number;
        y: Schema.Number;
    };
    readonly EnteredCell: {
        x: Schema.Number;
        y: Schema.Number;
    };
    readonly LeftCanvas: {};
    readonly ReleasedMouse: {};
    readonly SelectedColor: {
        colorIndex: Schema.Literals<readonly [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]>;
    };
    readonly SelectedTool: {
        tool: Schema.Literals<readonly ["Brush", "Fill", "Eraser"]>;
    };
    readonly SelectedGridSize: {
        size: Schema.Number;
    };
    readonly ToggledMirrorHorizontal: {};
    readonly ToggledMirrorVertical: {};
    readonly ClickedUndo: {};
    readonly ClickedRedo: {};
    readonly ClickedHistoryStep: {
        stepIndex: Schema.Number;
    };
    readonly ClickedRedoStep: {
        stepIndex: Schema.Number;
    };
    readonly ClickedClear: {};
    readonly ClickedExport: {};
    readonly SucceededExportPng: {};
    readonly FailedExportPng: {
        error: Schema.String;
    };
    readonly GotErrorDialogMessage: {
        message: import("foldkit/message").MessageUnion<{
            readonly RequestedOpen: {};
            readonly RequestedClose: {};
            readonly SucceededShowDialog: {};
            readonly FailedShowDialog: {};
            readonly SucceededAcquireResources: {};
            readonly FailedAcquireResources: {};
            readonly CompletedCloseDialog: {};
            readonly Unmounted: {};
            readonly CompletedReleaseDialogResources: {};
            readonly GotAnimationMessage: {
                message: import("foldkit/message").MessageUnion<{
                    readonly Showed: {};
                    readonly Hid: {};
                    readonly CompletedWaitForPaint: {
                        generation: Schema.Number;
                    };
                    readonly EndedAnimation: {
                        generation: Schema.Number;
                    };
                }>;
            };
        }>;
    };
    readonly GotThemeListboxMessage: {
        message: import("foldkit/message").MessageUnion<{
            readonly Opened: {
                maybeActiveItemIndex: Schema.Option<Schema.Number>;
            };
            readonly Closed: {};
            readonly BlurredItems: {};
            readonly ActivatedItem: {
                index: Schema.Number;
                activationTrigger: Schema.Literals<readonly ["Pointer", "Keyboard"]>;
            };
            readonly DeactivatedItem: {};
            readonly SelectedItem: {
                item: Schema.String;
            };
            readonly MovedPointerOverItem: {
                index: Schema.Number;
                screenX: Schema.Number;
                screenY: Schema.Number;
            };
            readonly RequestedItemClick: {
                index: Schema.Number;
            };
            readonly Searched: {
                key: Schema.String;
                maybeTargetIndex: Schema.Option<Schema.Number>;
            };
            readonly CompletedDelayClearSearch: {
                version: Schema.Number;
            };
            readonly CompletedLockScroll: {};
            readonly CompletedUnlockScroll: {};
            readonly CompletedInertOthers: {};
            readonly CompletedRestoreInert: {};
            readonly CompletedFocusButton: {};
            readonly CompletedFocusItems: {};
            readonly CompletedScrollIntoView: {};
            readonly CompletedClickItem: {};
            readonly ClickedButton: {};
            readonly IgnoredMouseClick: {};
            readonly SuppressedSpaceScroll: {};
            readonly SuppressedItemCommit: {};
            readonly CompletedAnchorListbox: {};
            readonly CompletedPortalListboxBackdrop: {};
            readonly GotAnimationMessage: {
                message: import("foldkit/message").MessageUnion<{
                    readonly Showed: {};
                    readonly Hid: {};
                    readonly CompletedWaitForPaint: {
                        generation: Schema.Number;
                    };
                    readonly EndedAnimation: {
                        generation: Schema.Number;
                    };
                }>;
            };
            readonly PressedPointerOnButton: {
                pointerType: Schema.String;
                button: Schema.Number;
            };
        }>;
    };
    readonly GotToolRadioGroupMessage: {
        message: import("foldkit/message").MessageUnion<{
            readonly SelectedOption: {
                index: Schema.Number;
                value: Schema.String;
            };
            readonly FocusedOption: {
                index: Schema.Number;
            };
            readonly CompletedFocusOption: {};
        }>;
    };
    readonly GotGridSizeRadioGroupMessage: {
        message: import("foldkit/message").MessageUnion<{
            readonly SelectedOption: {
                index: Schema.Number;
                value: Schema.String;
            };
            readonly FocusedOption: {
                index: Schema.Number;
            };
            readonly CompletedFocusOption: {};
        }>;
    };
    readonly GotPaletteRadioGroupMessage: {
        message: import("foldkit/message").MessageUnion<{
            readonly SelectedOption: {
                index: Schema.Number;
                value: Schema.String;
            };
            readonly FocusedOption: {
                index: Schema.Number;
            };
            readonly CompletedFocusOption: {};
        }>;
    };
    readonly ConfirmedGridSizeChange: {};
    readonly GotGridSizeConfirmDialogMessage: {
        message: import("foldkit/message").MessageUnion<{
            readonly RequestedOpen: {};
            readonly RequestedClose: {};
            readonly SucceededShowDialog: {};
            readonly FailedShowDialog: {};
            readonly SucceededAcquireResources: {};
            readonly FailedAcquireResources: {};
            readonly CompletedCloseDialog: {};
            readonly Unmounted: {};
            readonly CompletedReleaseDialogResources: {};
            readonly GotAnimationMessage: {
                message: import("foldkit/message").MessageUnion<{
                    readonly Showed: {};
                    readonly Hid: {};
                    readonly CompletedWaitForPaint: {
                        generation: Schema.Number;
                    };
                    readonly EndedAnimation: {
                        generation: Schema.Number;
                    };
                }>;
            };
        }>;
    };
    readonly CompletedSaveCanvas: {};
}>;
export type Message = typeof Message.Type;
