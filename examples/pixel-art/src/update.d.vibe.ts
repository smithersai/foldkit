import { Option } from 'effect';
import { Update } from 'foldkit';
import { Message } from './message.vibe';
import { type Model } from './model.vibe';
export declare const update: (model: Model, message: Message) => Readonly<{
    model: {
        readonly grid: readonly (readonly Option.Option<0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15>[])[];
        readonly undoStack: readonly (readonly (readonly Option.Option<0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15>[])[])[];
        readonly redoStack: readonly (readonly (readonly Option.Option<0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15>[])[])[];
        readonly selectedColorIndex: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15;
        readonly gridSize: number;
        readonly tool: "Brush" | "Eraser" | "Fill";
        readonly mirrorMode: "Both" | "Horizontal" | "None" | "Vertical";
        readonly isDrawing: boolean;
        readonly maybeHoveredCell: Option.Option<{
            readonly x: number;
            readonly y: number;
        }>;
        readonly errorDialog: {
            readonly id: string;
            readonly isOpen: boolean;
            readonly isAnimated: boolean;
            readonly animation: {
                readonly id: string;
                readonly isShowing: boolean;
                readonly transitionState: "EnterAnimating" | "EnterStart" | "Idle" | "LeaveAnimating" | "LeaveStart";
                readonly transitionGeneration: number;
            };
            readonly maybeFocusSelector: Option.Option<string>;
        };
        readonly maybeExportError: Option.Option<string>;
        readonly paletteThemeIndex: number;
        readonly gridSizeConfirmDialog: {
            readonly id: string;
            readonly isOpen: boolean;
            readonly isAnimated: boolean;
            readonly animation: {
                readonly id: string;
                readonly isShowing: boolean;
                readonly transitionState: "EnterAnimating" | "EnterStart" | "Idle" | "LeaveAnimating" | "LeaveStart";
                readonly transitionGeneration: number;
            };
            readonly maybeFocusSelector: Option.Option<string>;
        };
        readonly maybePendingGridSize: Option.Option<number>;
        readonly themeListbox: {
            readonly id: string;
            readonly isOpen: boolean;
            readonly isAnimated: boolean;
            readonly isModal: boolean;
            readonly orientation: "Horizontal" | "Vertical";
            readonly animation: {
                readonly id: string;
                readonly isShowing: boolean;
                readonly transitionState: "EnterAnimating" | "EnterStart" | "Idle" | "LeaveAnimating" | "LeaveStart";
                readonly transitionGeneration: number;
            };
            readonly maybeActiveItemIndex: Option.Option<number>;
            readonly activationTrigger: "Keyboard" | "Pointer";
            readonly searchQuery: string;
            readonly searchVersion: number;
            readonly maybeLastPointerPosition: Option.Option<{
                readonly screenX: number;
                readonly screenY: number;
            }>;
            readonly maybeLastButtonPointerType: Option.Option<string>;
        };
        readonly toolRadioGroup: {
            readonly id: string;
            readonly maybeFocusedIndex: Option.Option<number>;
        };
        readonly gridSizeRadioGroup: {
            readonly id: string;
            readonly maybeFocusedIndex: Option.Option<number>;
        };
        readonly paletteRadioGroup: {
            readonly id: string;
            readonly maybeFocusedIndex: Option.Option<number>;
        };
    };
    commands?: Update.Commands<{
        readonly _tag: "ClickedClear";
    } | {
        readonly _tag: "ClickedExport";
    } | {
        readonly _tag: "ClickedRedo";
    } | {
        readonly _tag: "ClickedUndo";
    } | {
        readonly _tag: "CompletedSaveCanvas";
    } | {
        readonly _tag: "ConfirmedGridSizeChange";
    } | {
        readonly _tag: "LeftCanvas";
    } | {
        readonly _tag: "ReleasedMouse";
    } | {
        readonly _tag: "SucceededExportPng";
    } | {
        readonly _tag: "ToggledMirrorHorizontal";
    } | {
        readonly _tag: "ToggledMirrorVertical";
    } | {
        readonly _tag: "ClickedHistoryStep";
        readonly stepIndex: number;
    } | {
        readonly _tag: "ClickedRedoStep";
        readonly stepIndex: number;
    } | {
        readonly _tag: "EnteredCell";
        readonly x: number;
        readonly y: number;
    } | {
        readonly _tag: "FailedExportPng";
        readonly error: string;
    } | {
        readonly _tag: "GotErrorDialogMessage";
        readonly message: {
            readonly _tag: "CompletedCloseDialog";
        } | {
            readonly _tag: "CompletedReleaseDialogResources";
        } | {
            readonly _tag: "FailedAcquireResources";
        } | {
            readonly _tag: "FailedShowDialog";
        } | {
            readonly _tag: "RequestedClose";
        } | {
            readonly _tag: "RequestedOpen";
        } | {
            readonly _tag: "SucceededAcquireResources";
        } | {
            readonly _tag: "SucceededShowDialog";
        } | {
            readonly _tag: "Unmounted";
        } | {
            readonly _tag: "GotAnimationMessage";
            readonly message: {
                readonly _tag: "Hid";
            } | {
                readonly _tag: "Showed";
            } | {
                readonly _tag: "CompletedWaitForPaint";
                readonly generation: number;
            } | {
                readonly _tag: "EndedAnimation";
                readonly generation: number;
            };
        };
    } | {
        readonly _tag: "GotGridSizeConfirmDialogMessage";
        readonly message: {
            readonly _tag: "CompletedCloseDialog";
        } | {
            readonly _tag: "CompletedReleaseDialogResources";
        } | {
            readonly _tag: "FailedAcquireResources";
        } | {
            readonly _tag: "FailedShowDialog";
        } | {
            readonly _tag: "RequestedClose";
        } | {
            readonly _tag: "RequestedOpen";
        } | {
            readonly _tag: "SucceededAcquireResources";
        } | {
            readonly _tag: "SucceededShowDialog";
        } | {
            readonly _tag: "Unmounted";
        } | {
            readonly _tag: "GotAnimationMessage";
            readonly message: {
                readonly _tag: "Hid";
            } | {
                readonly _tag: "Showed";
            } | {
                readonly _tag: "CompletedWaitForPaint";
                readonly generation: number;
            } | {
                readonly _tag: "EndedAnimation";
                readonly generation: number;
            };
        };
    } | {
        readonly _tag: "GotGridSizeRadioGroupMessage";
        readonly message: {
            readonly _tag: "CompletedFocusOption";
        } | {
            readonly _tag: "FocusedOption";
            readonly index: number;
        } | {
            readonly _tag: "SelectedOption";
            readonly index: number;
            readonly value: string;
        };
    } | {
        readonly _tag: "GotPaletteRadioGroupMessage";
        readonly message: {
            readonly _tag: "CompletedFocusOption";
        } | {
            readonly _tag: "FocusedOption";
            readonly index: number;
        } | {
            readonly _tag: "SelectedOption";
            readonly index: number;
            readonly value: string;
        };
    } | {
        readonly _tag: "GotThemeListboxMessage";
        readonly message: {
            readonly _tag: "BlurredItems";
        } | {
            readonly _tag: "ClickedButton";
        } | {
            readonly _tag: "Closed";
        } | {
            readonly _tag: "CompletedAnchorListbox";
        } | {
            readonly _tag: "CompletedClickItem";
        } | {
            readonly _tag: "CompletedFocusButton";
        } | {
            readonly _tag: "CompletedFocusItems";
        } | {
            readonly _tag: "CompletedInertOthers";
        } | {
            readonly _tag: "CompletedLockScroll";
        } | {
            readonly _tag: "CompletedPortalListboxBackdrop";
        } | {
            readonly _tag: "CompletedRestoreInert";
        } | {
            readonly _tag: "CompletedScrollIntoView";
        } | {
            readonly _tag: "CompletedUnlockScroll";
        } | {
            readonly _tag: "DeactivatedItem";
        } | {
            readonly _tag: "IgnoredMouseClick";
        } | {
            readonly _tag: "SuppressedItemCommit";
        } | {
            readonly _tag: "SuppressedSpaceScroll";
        } | {
            readonly _tag: "ActivatedItem";
            readonly index: number;
            readonly activationTrigger: "Keyboard" | "Pointer";
        } | {
            readonly _tag: "CompletedDelayClearSearch";
            readonly version: number;
        } | {
            readonly _tag: "GotAnimationMessage";
            readonly message: {
                readonly _tag: "Hid";
            } | {
                readonly _tag: "Showed";
            } | {
                readonly _tag: "CompletedWaitForPaint";
                readonly generation: number;
            } | {
                readonly _tag: "EndedAnimation";
                readonly generation: number;
            };
        } | {
            readonly _tag: "MovedPointerOverItem";
            readonly index: number;
            readonly screenX: number;
            readonly screenY: number;
        } | {
            readonly _tag: "Opened";
            readonly maybeActiveItemIndex: Option.Option<number>;
        } | {
            readonly _tag: "PressedPointerOnButton";
            readonly pointerType: string;
            readonly button: number;
        } | {
            readonly _tag: "RequestedItemClick";
            readonly index: number;
        } | {
            readonly _tag: "Searched";
            readonly key: string;
            readonly maybeTargetIndex: Option.Option<number>;
        } | {
            readonly _tag: "SelectedItem";
            readonly item: string;
        };
    } | {
        readonly _tag: "GotToolRadioGroupMessage";
        readonly message: {
            readonly _tag: "CompletedFocusOption";
        } | {
            readonly _tag: "FocusedOption";
            readonly index: number;
        } | {
            readonly _tag: "SelectedOption";
            readonly index: number;
            readonly value: string;
        };
    } | {
        readonly _tag: "PressedCell";
        readonly x: number;
        readonly y: number;
    } | {
        readonly _tag: "SelectedColor";
        readonly colorIndex: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15;
    } | {
        readonly _tag: "SelectedGridSize";
        readonly size: number;
    } | {
        readonly _tag: "SelectedTool";
        readonly tool: "Brush" | "Eraser" | "Fill";
    }, never>;
    outMessage?: never;
}>;
