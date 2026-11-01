import { Schema } from 'effect';
export declare const Message: import("foldkit/message").MessageUnion<{
    readonly GotMobileMenuDialogMessage: {
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
    readonly ClickedButtonDemo: {};
    readonly GotAnimationDemoMessage: {
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
    readonly ToggledAnimationDemo: {};
    readonly UpdatedInputDemoValue: {
        value: Schema.String;
    };
    readonly UpdatedTextareaDemoValue: {
        value: Schema.String;
    };
    readonly UpdatedFieldsetInputValue: {
        value: Schema.String;
    };
    readonly UpdatedFieldsetTextareaValue: {
        value: Schema.String;
    };
    readonly ToggledFieldsetCheckboxDemo: {
        isChecked: Schema.Boolean;
    };
    readonly ToggledCheckboxBasicDemo: {
        isChecked: Schema.Boolean;
    };
    readonly ToggledCheckboxAllDemo: {
        isChecked: Schema.Boolean;
    };
    readonly ToggledCheckboxOptionADemo: {
        isChecked: Schema.Boolean;
    };
    readonly ToggledCheckboxOptionBDemo: {
        isChecked: Schema.Boolean;
    };
    readonly GotComboboxDemoMessage: {
        message: import("foldkit/message").MessageUnion<{
            readonly Opened: {
                maybeActiveItemIndex: Schema.Option<Schema.Number>;
            };
            readonly Closed: {
                restingInputValue: Schema.String;
                isClearable: Schema.Boolean;
            };
            readonly BlurredInput: {
                restingInputValue: Schema.String;
                isClearable: Schema.Boolean;
            };
            readonly ActivatedItem: {
                index: Schema.Number;
                activationTrigger: Schema.Literals<readonly ["Pointer", "Keyboard"]>;
                maybeImmediateSelection: Schema.Option<Schema.Struct<{
                    readonly item: Schema.String;
                }>>;
            };
            readonly DeactivatedItem: {};
            readonly SelectedItem: {
                item: Schema.String;
                displayText: Schema.String;
                wasSelected: Schema.Boolean;
            };
            readonly MovedPointerOverItem: {
                index: Schema.Number;
                screenX: Schema.Number;
                screenY: Schema.Number;
            };
            readonly RequestedItemClick: {
                index: Schema.Number;
            };
            readonly SuppressedItemCommit: {};
            readonly SuppressedEmptyItemNavigation: {};
            readonly CompletedLockScroll: {};
            readonly CompletedUnlockScroll: {};
            readonly CompletedInertOthers: {};
            readonly CompletedRestoreInert: {};
            readonly CompletedFocusInput: {};
            readonly CompletedScrollIntoView: {};
            readonly CompletedClickItem: {};
            readonly CompletedAnchorCombobox: {};
            readonly CompletedAttachComboboxPreventBlur: {};
            readonly CompletedAttachComboboxSelectOnFocus: {};
            readonly CompletedPortalComboboxBackdrop: {};
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
            readonly UpdatedInputValue: {
                value: Schema.String;
            };
            readonly PressedToggleButton: {
                restingInputValue: Schema.String;
                isClearable: Schema.Boolean;
            };
        }>;
    };
    readonly GotComboboxNullableDemoMessage: {
        message: import("foldkit/message").MessageUnion<{
            readonly Opened: {
                maybeActiveItemIndex: Schema.Option<Schema.Number>;
            };
            readonly Closed: {
                restingInputValue: Schema.String;
                isClearable: Schema.Boolean;
            };
            readonly BlurredInput: {
                restingInputValue: Schema.String;
                isClearable: Schema.Boolean;
            };
            readonly ActivatedItem: {
                index: Schema.Number;
                activationTrigger: Schema.Literals<readonly ["Pointer", "Keyboard"]>;
                maybeImmediateSelection: Schema.Option<Schema.Struct<{
                    readonly item: Schema.String;
                }>>;
            };
            readonly DeactivatedItem: {};
            readonly SelectedItem: {
                item: Schema.String;
                displayText: Schema.String;
                wasSelected: Schema.Boolean;
            };
            readonly MovedPointerOverItem: {
                index: Schema.Number;
                screenX: Schema.Number;
                screenY: Schema.Number;
            };
            readonly RequestedItemClick: {
                index: Schema.Number;
            };
            readonly SuppressedItemCommit: {};
            readonly SuppressedEmptyItemNavigation: {};
            readonly CompletedLockScroll: {};
            readonly CompletedUnlockScroll: {};
            readonly CompletedInertOthers: {};
            readonly CompletedRestoreInert: {};
            readonly CompletedFocusInput: {};
            readonly CompletedScrollIntoView: {};
            readonly CompletedClickItem: {};
            readonly CompletedAnchorCombobox: {};
            readonly CompletedAttachComboboxPreventBlur: {};
            readonly CompletedAttachComboboxSelectOnFocus: {};
            readonly CompletedPortalComboboxBackdrop: {};
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
            readonly UpdatedInputValue: {
                value: Schema.String;
            };
            readonly PressedToggleButton: {
                restingInputValue: Schema.String;
                isClearable: Schema.Boolean;
            };
        }>;
    };
    readonly GotComboboxMultiDemoMessage: {
        message: import("foldkit/message").MessageUnion<{
            readonly Opened: {
                maybeActiveItemIndex: Schema.Option<Schema.Number>;
            };
            readonly Closed: {
                restingInputValue: Schema.String;
                isClearable: Schema.Boolean;
            };
            readonly BlurredInput: {
                restingInputValue: Schema.String;
                isClearable: Schema.Boolean;
            };
            readonly ActivatedItem: {
                index: Schema.Number;
                activationTrigger: Schema.Literals<readonly ["Pointer", "Keyboard"]>;
                maybeImmediateSelection: Schema.Option<Schema.Struct<{
                    readonly item: Schema.String;
                }>>;
            };
            readonly DeactivatedItem: {};
            readonly SelectedItem: {
                item: Schema.String;
                displayText: Schema.String;
                wasSelected: Schema.Boolean;
            };
            readonly MovedPointerOverItem: {
                index: Schema.Number;
                screenX: Schema.Number;
                screenY: Schema.Number;
            };
            readonly RequestedItemClick: {
                index: Schema.Number;
            };
            readonly SuppressedItemCommit: {};
            readonly SuppressedEmptyItemNavigation: {};
            readonly CompletedLockScroll: {};
            readonly CompletedUnlockScroll: {};
            readonly CompletedInertOthers: {};
            readonly CompletedRestoreInert: {};
            readonly CompletedFocusInput: {};
            readonly CompletedScrollIntoView: {};
            readonly CompletedClickItem: {};
            readonly CompletedAnchorCombobox: {};
            readonly CompletedAttachComboboxPreventBlur: {};
            readonly CompletedAttachComboboxSelectOnFocus: {};
            readonly CompletedPortalComboboxBackdrop: {};
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
            readonly UpdatedInputValue: {
                value: Schema.String;
            };
            readonly PressedToggleButton: {
                restingInputValue: Schema.String;
                isClearable: Schema.Boolean;
            };
        }>;
    };
    readonly GotComboboxPlacementLockDemoMessage: {
        message: import("foldkit/message").MessageUnion<{
            readonly Opened: {
                maybeActiveItemIndex: Schema.Option<Schema.Number>;
            };
            readonly Closed: {
                restingInputValue: Schema.String;
                isClearable: Schema.Boolean;
            };
            readonly BlurredInput: {
                restingInputValue: Schema.String;
                isClearable: Schema.Boolean;
            };
            readonly ActivatedItem: {
                index: Schema.Number;
                activationTrigger: Schema.Literals<readonly ["Pointer", "Keyboard"]>;
                maybeImmediateSelection: Schema.Option<Schema.Struct<{
                    readonly item: Schema.String;
                }>>;
            };
            readonly DeactivatedItem: {};
            readonly SelectedItem: {
                item: Schema.String;
                displayText: Schema.String;
                wasSelected: Schema.Boolean;
            };
            readonly MovedPointerOverItem: {
                index: Schema.Number;
                screenX: Schema.Number;
                screenY: Schema.Number;
            };
            readonly RequestedItemClick: {
                index: Schema.Number;
            };
            readonly SuppressedItemCommit: {};
            readonly SuppressedEmptyItemNavigation: {};
            readonly CompletedLockScroll: {};
            readonly CompletedUnlockScroll: {};
            readonly CompletedInertOthers: {};
            readonly CompletedRestoreInert: {};
            readonly CompletedFocusInput: {};
            readonly CompletedScrollIntoView: {};
            readonly CompletedClickItem: {};
            readonly CompletedAnchorCombobox: {};
            readonly CompletedAttachComboboxPreventBlur: {};
            readonly CompletedAttachComboboxSelectOnFocus: {};
            readonly CompletedPortalComboboxBackdrop: {};
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
            readonly UpdatedInputValue: {
                value: Schema.String;
            };
            readonly PressedToggleButton: {
                restingInputValue: Schema.String;
                isClearable: Schema.Boolean;
            };
        }>;
    };
    readonly GotComboboxSelectOnFocusDemoMessage: {
        message: import("foldkit/message").MessageUnion<{
            readonly Opened: {
                maybeActiveItemIndex: Schema.Option<Schema.Number>;
            };
            readonly Closed: {
                restingInputValue: Schema.String;
                isClearable: Schema.Boolean;
            };
            readonly BlurredInput: {
                restingInputValue: Schema.String;
                isClearable: Schema.Boolean;
            };
            readonly ActivatedItem: {
                index: Schema.Number;
                activationTrigger: Schema.Literals<readonly ["Pointer", "Keyboard"]>;
                maybeImmediateSelection: Schema.Option<Schema.Struct<{
                    readonly item: Schema.String;
                }>>;
            };
            readonly DeactivatedItem: {};
            readonly SelectedItem: {
                item: Schema.String;
                displayText: Schema.String;
                wasSelected: Schema.Boolean;
            };
            readonly MovedPointerOverItem: {
                index: Schema.Number;
                screenX: Schema.Number;
                screenY: Schema.Number;
            };
            readonly RequestedItemClick: {
                index: Schema.Number;
            };
            readonly SuppressedItemCommit: {};
            readonly SuppressedEmptyItemNavigation: {};
            readonly CompletedLockScroll: {};
            readonly CompletedUnlockScroll: {};
            readonly CompletedInertOthers: {};
            readonly CompletedRestoreInert: {};
            readonly CompletedFocusInput: {};
            readonly CompletedScrollIntoView: {};
            readonly CompletedClickItem: {};
            readonly CompletedAnchorCombobox: {};
            readonly CompletedAttachComboboxPreventBlur: {};
            readonly CompletedAttachComboboxSelectOnFocus: {};
            readonly CompletedPortalComboboxBackdrop: {};
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
            readonly UpdatedInputValue: {
                value: Schema.String;
            };
            readonly PressedToggleButton: {
                restingInputValue: Schema.String;
                isClearable: Schema.Boolean;
            };
        }>;
    };
    readonly GotDialogDemoMessage: {
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
    readonly GotDialogAnimatedDemoMessage: {
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
    readonly GotOverlayDialogDemoMessage: {
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
    readonly GotOverlayComboboxDemoMessage: {
        message: import("foldkit/message").MessageUnion<{
            readonly Opened: {
                maybeActiveItemIndex: Schema.Option<Schema.Number>;
            };
            readonly Closed: {
                restingInputValue: Schema.String;
                isClearable: Schema.Boolean;
            };
            readonly BlurredInput: {
                restingInputValue: Schema.String;
                isClearable: Schema.Boolean;
            };
            readonly ActivatedItem: {
                index: Schema.Number;
                activationTrigger: Schema.Literals<readonly ["Pointer", "Keyboard"]>;
                maybeImmediateSelection: Schema.Option<Schema.Struct<{
                    readonly item: Schema.String;
                }>>;
            };
            readonly DeactivatedItem: {};
            readonly SelectedItem: {
                item: Schema.String;
                displayText: Schema.String;
                wasSelected: Schema.Boolean;
            };
            readonly MovedPointerOverItem: {
                index: Schema.Number;
                screenX: Schema.Number;
                screenY: Schema.Number;
            };
            readonly RequestedItemClick: {
                index: Schema.Number;
            };
            readonly SuppressedItemCommit: {};
            readonly SuppressedEmptyItemNavigation: {};
            readonly CompletedLockScroll: {};
            readonly CompletedUnlockScroll: {};
            readonly CompletedInertOthers: {};
            readonly CompletedRestoreInert: {};
            readonly CompletedFocusInput: {};
            readonly CompletedScrollIntoView: {};
            readonly CompletedClickItem: {};
            readonly CompletedAnchorCombobox: {};
            readonly CompletedAttachComboboxPreventBlur: {};
            readonly CompletedAttachComboboxSelectOnFocus: {};
            readonly CompletedPortalComboboxBackdrop: {};
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
            readonly UpdatedInputValue: {
                value: Schema.String;
            };
            readonly PressedToggleButton: {
                restingInputValue: Schema.String;
                isClearable: Schema.Boolean;
            };
        }>;
    };
    readonly GotNestedDialogParentDemoMessage: {
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
    readonly GotNestedDialogChildDemoMessage: {
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
    readonly ClickedDeleteProject: {};
    readonly ClickedOpenDialog: {};
    readonly ClickedOpenAnimatedDialog: {};
    readonly ClickedEditFilters: {};
    readonly ClickedOpenProjectSettings: {};
    readonly ToggledDisclosureBasicDemo: {
        isOpen: Schema.Boolean;
    };
    readonly ToggledDisclosureAnimatedDemo: {
        isOpen: Schema.Boolean;
    };
    readonly ToggledDisclosureCollapsedPreviewDemo: {
        isOpen: Schema.Boolean;
    };
    readonly GotCalendarBasicDemoMessage: {
        message: import("foldkit/message").MessageUnion<{
            readonly ClickedDay: {
                date: Schema.Struct<{
                    readonly year: Schema.Int;
                    readonly month: Schema.Int;
                    readonly day: Schema.Int;
                }>;
            };
            readonly PressedKeyOnGrid: {
                key: Schema.String;
                isShift: Schema.Boolean;
            };
            readonly ClickedPreviousMonthButton: {};
            readonly ClickedNextMonthButton: {};
            readonly ClickedHeading: {};
            readonly SelectedMonth: {
                month: Schema.Int;
            };
            readonly SelectedYear: {
                year: Schema.Int;
            };
            readonly PagedYears: {
                direction: Schema.Literals<readonly [1, -1]>;
            };
            readonly FocusedGrid: {};
            readonly BlurredGrid: {};
            readonly RefreshedToday: {
                today: Schema.Struct<{
                    readonly year: Schema.Int;
                    readonly month: Schema.Int;
                    readonly day: Schema.Int;
                }>;
            };
            readonly CompletedFocusGrid: {};
        }>;
    };
    readonly GotDatePickerBasicDemoMessage: {
        message: import("foldkit/message").MessageUnion<{
            readonly GotCalendarMessage: {
                message: import("foldkit/message").MessageUnion<{
                    readonly ClickedDay: {
                        date: Schema.Struct<{
                            readonly year: Schema.Int;
                            readonly month: Schema.Int;
                            readonly day: Schema.Int;
                        }>;
                    };
                    readonly PressedKeyOnGrid: {
                        key: Schema.String;
                        isShift: Schema.Boolean;
                    };
                    readonly ClickedPreviousMonthButton: {};
                    readonly ClickedNextMonthButton: {};
                    readonly ClickedHeading: {};
                    readonly SelectedMonth: {
                        month: Schema.Int;
                    };
                    readonly SelectedYear: {
                        year: Schema.Int;
                    };
                    readonly PagedYears: {
                        direction: Schema.Literals<readonly [1, -1]>;
                    };
                    readonly FocusedGrid: {};
                    readonly BlurredGrid: {};
                    readonly RefreshedToday: {
                        today: Schema.Struct<{
                            readonly year: Schema.Int;
                            readonly month: Schema.Int;
                            readonly day: Schema.Int;
                        }>;
                    };
                    readonly CompletedFocusGrid: {};
                }>;
            };
            readonly GotPopoverMessage: {
                message: import("foldkit/message").MessageUnion<{
                    readonly RequestedOpen: {};
                    readonly RequestedClose: {};
                    readonly BlurredPanel: {};
                    readonly PressedPointerOnButton: {
                        pointerType: Schema.String;
                        button: Schema.Number;
                    };
                    readonly CompletedFocusPanel: {};
                    readonly CompletedFocusButton: {};
                    readonly CompletedLockScroll: {};
                    readonly CompletedUnlockScroll: {};
                    readonly CompletedInertOthers: {};
                    readonly CompletedRestoreInert: {};
                    readonly ClickedButton: {};
                    readonly IgnoredMouseClick: {};
                    readonly SuppressedSpaceScroll: {};
                    readonly CompletedAnchorPopover: {};
                    readonly CompletedPortalPopoverBackdrop: {};
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
            readonly RequestedSelectDate: {
                date: Schema.Struct<{
                    readonly year: Schema.Int;
                    readonly month: Schema.Int;
                    readonly day: Schema.Int;
                }>;
            };
            readonly Cleared: {};
            readonly Opened: {};
            readonly Closed: {};
        }>;
    };
    readonly GotDragAndDropDemoMessage: {
        message: import("foldkit/message").MessageUnion<{
            readonly PressedDraggable: {
                itemId: Schema.String;
                containerId: Schema.String;
                index: Schema.Number;
                screenX: Schema.Number;
                screenY: Schema.Number;
            };
            readonly MovedPointer: {
                screenX: Schema.Number;
                screenY: Schema.Number;
                clientX: Schema.Number;
                clientY: Schema.Number;
                maybeDropTarget: Schema.Option<Schema.Struct<{
                    readonly containerId: Schema.String;
                    readonly index: Schema.Number;
                }>>;
            };
            readonly ReleasedPointer: {};
            readonly CancelledDrag: {};
            readonly ActivatedKeyboardDrag: {
                itemId: Schema.String;
                containerId: Schema.String;
                index: Schema.Number;
            };
            readonly CompletedResolveKeyboardMove: {
                targetContainerId: Schema.String;
                targetIndex: Schema.Number;
            };
            readonly ConfirmedKeyboardDrop: {};
            readonly PressedArrowKey: {
                direction: Schema.Literals<readonly ["Up", "Down", "Left", "Right", "NextContainer", "PreviousContainer"]>;
            };
            readonly AdvancedAutoScrollFrame: {};
            readonly CompletedFocusItem: {};
        }>;
    };
    readonly GotFileDropBasicDemoMessage: {
        message: import("foldkit/message").MessageUnion<{
            readonly EnteredDragZone: {};
            readonly LeftDragZone: {};
            readonly DroppedFiles: {
                files: Schema.NonEmptyArray<Schema.Schema<File>>;
            };
            readonly DroppedNonFiles: {};
        }>;
    };
    readonly ClickedRemoveFileDropDemoFile: {
        fileIndex: Schema.Number;
    };
    readonly GotHoverIntentDemoMessage: {
        message: import("foldkit/message").MessageUnion<{
            readonly EnteredTrigger: {};
            readonly LeftTrigger: {};
            readonly EnteredPanel: {};
            readonly LeftPanel: {};
            readonly FocusedTrigger: {};
            readonly BlurredTrigger: {};
            readonly FocusedPanel: {};
            readonly BlurredPanel: {};
            readonly PressedEscape: {
                source: Schema.Literals<readonly ["Trigger", "Panel"]>;
            };
            readonly CompletedWaitBeforeOpening: {
                version: Schema.Number;
            };
            readonly CompletedWaitBeforeClosing: {
                version: Schema.Number;
            };
        }>;
    };
    readonly GotListboxDemoMessage: {
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
    readonly GotListboxMultiDemoMessage: {
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
    readonly GotListboxGroupedDemoMessage: {
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
    readonly GotMenuBasicDemoMessage: {
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
                index: Schema.Number;
                item: Schema.String;
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
            readonly MovedPointerOverItem: {
                index: Schema.Number;
                screenX: Schema.Number;
                screenY: Schema.Number;
            };
            readonly CompletedFocusItems: {};
            readonly CompletedFocusButton: {};
            readonly CompletedLockScroll: {};
            readonly CompletedUnlockScroll: {};
            readonly CompletedInertOthers: {};
            readonly CompletedRestoreInert: {};
            readonly CompletedScrollIntoView: {};
            readonly CompletedClickItem: {};
            readonly ClickedButton: {};
            readonly IgnoredMouseClick: {};
            readonly SuppressedSpaceScroll: {};
            readonly CompletedAnchorMenu: {};
            readonly CompletedPortalMenuBackdrop: {};
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
                screenX: Schema.Number;
                screenY: Schema.Number;
                timeStamp: Schema.Number;
            };
            readonly ReleasedPointerOnItems: {
                screenX: Schema.Number;
                screenY: Schema.Number;
                timeStamp: Schema.Number;
            };
        }>;
    };
    readonly GotMenuAnimatedDemoMessage: {
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
                index: Schema.Number;
                item: Schema.String;
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
            readonly MovedPointerOverItem: {
                index: Schema.Number;
                screenX: Schema.Number;
                screenY: Schema.Number;
            };
            readonly CompletedFocusItems: {};
            readonly CompletedFocusButton: {};
            readonly CompletedLockScroll: {};
            readonly CompletedUnlockScroll: {};
            readonly CompletedInertOthers: {};
            readonly CompletedRestoreInert: {};
            readonly CompletedScrollIntoView: {};
            readonly CompletedClickItem: {};
            readonly ClickedButton: {};
            readonly IgnoredMouseClick: {};
            readonly SuppressedSpaceScroll: {};
            readonly CompletedAnchorMenu: {};
            readonly CompletedPortalMenuBackdrop: {};
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
                screenX: Schema.Number;
                screenY: Schema.Number;
                timeStamp: Schema.Number;
            };
            readonly ReleasedPointerOnItems: {
                screenX: Schema.Number;
                screenY: Schema.Number;
                timeStamp: Schema.Number;
            };
        }>;
    };
    readonly GotPopoverBasicDemoMessage: {
        message: import("foldkit/message").MessageUnion<{
            readonly RequestedOpen: {};
            readonly RequestedClose: {};
            readonly BlurredPanel: {};
            readonly PressedPointerOnButton: {
                pointerType: Schema.String;
                button: Schema.Number;
            };
            readonly CompletedFocusPanel: {};
            readonly CompletedFocusButton: {};
            readonly CompletedLockScroll: {};
            readonly CompletedUnlockScroll: {};
            readonly CompletedInertOthers: {};
            readonly CompletedRestoreInert: {};
            readonly ClickedButton: {};
            readonly IgnoredMouseClick: {};
            readonly SuppressedSpaceScroll: {};
            readonly CompletedAnchorPopover: {};
            readonly CompletedPortalPopoverBackdrop: {};
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
    readonly GotPopoverAnimatedDemoMessage: {
        message: import("foldkit/message").MessageUnion<{
            readonly RequestedOpen: {};
            readonly RequestedClose: {};
            readonly BlurredPanel: {};
            readonly PressedPointerOnButton: {
                pointerType: Schema.String;
                button: Schema.Number;
            };
            readonly CompletedFocusPanel: {};
            readonly CompletedFocusButton: {};
            readonly CompletedLockScroll: {};
            readonly CompletedUnlockScroll: {};
            readonly CompletedInertOthers: {};
            readonly CompletedRestoreInert: {};
            readonly ClickedButton: {};
            readonly IgnoredMouseClick: {};
            readonly SuppressedSpaceScroll: {};
            readonly CompletedAnchorPopover: {};
            readonly CompletedPortalPopoverBackdrop: {};
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
    readonly GotPopoverNestedParentDemoMessage: {
        message: import("foldkit/message").MessageUnion<{
            readonly RequestedOpen: {};
            readonly RequestedClose: {};
            readonly BlurredPanel: {};
            readonly PressedPointerOnButton: {
                pointerType: Schema.String;
                button: Schema.Number;
            };
            readonly CompletedFocusPanel: {};
            readonly CompletedFocusButton: {};
            readonly CompletedLockScroll: {};
            readonly CompletedUnlockScroll: {};
            readonly CompletedInertOthers: {};
            readonly CompletedRestoreInert: {};
            readonly ClickedButton: {};
            readonly IgnoredMouseClick: {};
            readonly SuppressedSpaceScroll: {};
            readonly CompletedAnchorPopover: {};
            readonly CompletedPortalPopoverBackdrop: {};
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
    readonly GotPopoverNestedChildDemoMessage: {
        message: import("foldkit/message").MessageUnion<{
            readonly RequestedOpen: {};
            readonly RequestedClose: {};
            readonly BlurredPanel: {};
            readonly PressedPointerOnButton: {
                pointerType: Schema.String;
                button: Schema.Number;
            };
            readonly CompletedFocusPanel: {};
            readonly CompletedFocusButton: {};
            readonly CompletedLockScroll: {};
            readonly CompletedUnlockScroll: {};
            readonly CompletedInertOthers: {};
            readonly CompletedRestoreInert: {};
            readonly ClickedButton: {};
            readonly IgnoredMouseClick: {};
            readonly SuppressedSpaceScroll: {};
            readonly CompletedAnchorPopover: {};
            readonly CompletedPortalPopoverBackdrop: {};
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
    readonly GotVerticalRadioGroupDemoMessage: {
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
    readonly GotHorizontalRadioGroupDemoMessage: {
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
    readonly UpdatedSelectDemoValue: {
        value: Schema.String;
    };
    readonly GotSliderRatingDemoMessage: {
        message: import("foldkit/message").MessageUnion<{
            readonly PressedThumb: {
                originValue: Schema.Number;
            };
            readonly PressedPointer: {
                value: Schema.Number;
                originValue: Schema.Number;
            };
            readonly MovedDragPointer: {
                value: Schema.Number;
            };
            readonly ReleasedDragPointer: {};
            readonly CancelledDrag: {};
            readonly PressedKeyboardNavigation: {
                direction: Schema.Literals<readonly ["StepDecrement", "StepIncrement", "PageDecrement", "PageIncrement", "Min", "Max"]>;
                value: Schema.Number;
            };
        }>;
    };
    readonly GotSliderVolumeDemoMessage: {
        message: import("foldkit/message").MessageUnion<{
            readonly PressedThumb: {
                originValue: Schema.Number;
            };
            readonly PressedPointer: {
                value: Schema.Number;
                originValue: Schema.Number;
            };
            readonly MovedDragPointer: {
                value: Schema.Number;
            };
            readonly ReleasedDragPointer: {};
            readonly CancelledDrag: {};
            readonly PressedKeyboardNavigation: {
                direction: Schema.Literals<readonly ["StepDecrement", "StepIncrement", "PageDecrement", "PageIncrement", "Min", "Max"]>;
                value: Schema.Number;
            };
        }>;
    };
    readonly ToggledSwitchDemo: {
        isChecked: Schema.Boolean;
    };
    readonly GotHorizontalTabsDemoMessage: {
        message: import("foldkit/message").MessageUnion<{
            readonly SelectedTab: {
                index: Schema.Number;
                value: Schema.String;
            };
            readonly FocusedTab: {
                index: Schema.Number;
            };
            readonly CompletedFocusTab: {};
        }>;
    };
    readonly GotVerticalTabsDemoMessage: {
        message: import("foldkit/message").MessageUnion<{
            readonly SelectedTab: {
                index: Schema.Number;
                value: Schema.String;
            };
            readonly FocusedTab: {
                index: Schema.Number;
            };
            readonly CompletedFocusTab: {};
        }>;
    };
    readonly GotToastDemoMessage: {
        message: import("foldkit/message").MessageUnion<{
            readonly Added: {
                readonly entry: Schema.Struct<{
                    readonly id: Schema.String;
                    readonly variant: Schema.Literals<readonly ["Info", "Success", "Warning", "Error"]>;
                    readonly animation: Schema.Struct<{
                        readonly id: Schema.String;
                        readonly isShowing: Schema.Boolean;
                        readonly transitionState: Schema.Literals<readonly ["Idle", "EnterStart", "EnterAnimating", "LeaveStart", "LeaveAnimating"]>;
                        readonly transitionGeneration: Schema.Number;
                    }>;
                    readonly maybeDuration: Schema.Option<Schema.DurationFromMillis>;
                    readonly pendingDismissVersion: Schema.Number;
                    readonly isHovered: Schema.Boolean;
                    readonly swipeState: import("foldkit/schema").TaggedUnion<{
                        readonly Idle: {};
                        readonly Dragging: {
                            pointerId: Schema.Number;
                            startX: Schema.Number;
                            currentX: Schema.Number;
                        };
                        readonly Settling: {
                            offsetX: Schema.Number;
                        };
                        readonly Dismissing: {
                            offsetX: Schema.Number;
                            direction: Schema.Literals<readonly ["Left", "Right"]>;
                        };
                    }>;
                    readonly swipeVersion: Schema.Number;
                    readonly payload: Schema.Codec<{
                        readonly title: string;
                        readonly maybeDescription: import("effect/Option").Option<string>;
                    }, {
                        readonly title: string;
                        readonly maybeDescription: import("effect/Option").Option<string>;
                    }, never, never>;
                }>;
            };
            readonly Dismissed: {
                entryId: Schema.String;
            };
            readonly DismissedAll: {};
            readonly CompletedWaitBeforeDismissal: {
                entryId: Schema.String;
                version: Schema.Number;
            };
            readonly HoveredEntry: {
                entryId: Schema.String;
            };
            readonly LeftEntry: {
                entryId: Schema.String;
            };
            readonly GotAnimationMessage: {
                entryId: Schema.String;
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
            readonly PressedEntryPointer: {
                entryId: Schema.String;
                pointerId: Schema.Number;
                clientX: Schema.Number;
            };
            readonly MovedSwipePointer: {
                pointerId: Schema.Number;
                clientX: Schema.Number;
            };
            readonly ReleasedSwipePointer: {
                pointerId: Schema.Number;
                clientX: Schema.Number;
            };
            readonly CancelledSwipe: {
                pointerId: Schema.Number;
            };
            readonly PressedEscape: {};
            readonly CompletedWaitForSwipeSettled: {
                entryId: Schema.String;
                version: Schema.Number;
            };
        }>;
    };
    readonly ClickedShowInfoToast: {};
    readonly ClickedShowSuccessToast: {};
    readonly ClickedShowWarningToast: {};
    readonly ClickedShowErrorToast: {};
    readonly ClickedShowStickyToast: {};
    readonly ClickedDismissAllToasts: {};
    readonly GotTooltipBasicDemoMessage: {
        message: import("foldkit/message").MessageUnion<{
            readonly EnteredTrigger: {};
            readonly LeftTrigger: {};
            readonly FocusedTrigger: {};
            readonly BlurredTrigger: {};
            readonly PressedEscape: {};
            readonly PressedPointerOnTrigger: {
                pointerType: Schema.String;
            };
            readonly CompletedWaitBeforeShowing: {
                version: Schema.Number;
            };
            readonly CompletedAnchorTooltip: {};
        }>;
    };
    readonly GotTooltipNoDelayDemoMessage: {
        message: import("foldkit/message").MessageUnion<{
            readonly EnteredTrigger: {};
            readonly LeftTrigger: {};
            readonly FocusedTrigger: {};
            readonly BlurredTrigger: {};
            readonly PressedEscape: {};
            readonly PressedPointerOnTrigger: {
                pointerType: Schema.String;
            };
            readonly CompletedWaitBeforeShowing: {
                version: Schema.Number;
            };
            readonly CompletedAnchorTooltip: {};
        }>;
    };
    readonly GotVirtualListDemoMessage: {
        message: import("foldkit/message").MessageUnion<{
            readonly ObservedContainerScroll: {
                scrollTop: Schema.Number;
                scrollHeight: Schema.Number;
                containerHeight: Schema.Number;
                anchor: import("foldkit/schema").TaggedUnion<{
                    readonly None: {};
                    readonly Row: {
                        key: Schema.String;
                        index: Schema.Number;
                        viewportOffset: Schema.Number;
                    };
                }>;
            };
            readonly ResizedContainer: {
                containerWidth: Schema.Number;
                containerHeight: Schema.Number;
            };
            readonly MeasuredRows: {
                measurements: Schema.$Array<Schema.Struct<{
                    readonly key: Schema.String;
                    readonly height: Schema.Number;
                    readonly layoutVersion: Schema.Number;
                }>>;
            };
            readonly CompletedApplyScroll: {
                version: Schema.Number;
                outcome: import("foldkit/schema").TaggedUnion<{
                    readonly Applied: {
                        scrollTop: Schema.Number;
                        scrollHeight: Schema.Number;
                        containerHeight: Schema.Number;
                        anchor: import("foldkit/schema").TaggedUnion<{
                            readonly None: {};
                            readonly Row: {
                                key: Schema.String;
                                index: Schema.Number;
                                viewportOffset: Schema.Number;
                            };
                        }>;
                    };
                    readonly Skipped: {};
                }>;
            };
        }>;
    };
    readonly ClickedVirtualListScrollToMiddle: {};
    readonly GotVirtualListVariableDemoMessage: {
        message: import("foldkit/message").MessageUnion<{
            readonly ObservedContainerScroll: {
                scrollTop: Schema.Number;
                scrollHeight: Schema.Number;
                containerHeight: Schema.Number;
                anchor: import("foldkit/schema").TaggedUnion<{
                    readonly None: {};
                    readonly Row: {
                        key: Schema.String;
                        index: Schema.Number;
                        viewportOffset: Schema.Number;
                    };
                }>;
            };
            readonly ResizedContainer: {
                containerWidth: Schema.Number;
                containerHeight: Schema.Number;
            };
            readonly MeasuredRows: {
                measurements: Schema.$Array<Schema.Struct<{
                    readonly key: Schema.String;
                    readonly height: Schema.Number;
                    readonly layoutVersion: Schema.Number;
                }>>;
            };
            readonly CompletedApplyScroll: {
                version: Schema.Number;
                outcome: import("foldkit/schema").TaggedUnion<{
                    readonly Applied: {
                        scrollTop: Schema.Number;
                        scrollHeight: Schema.Number;
                        containerHeight: Schema.Number;
                        anchor: import("foldkit/schema").TaggedUnion<{
                            readonly None: {};
                            readonly Row: {
                                key: Schema.String;
                                index: Schema.Number;
                                viewportOffset: Schema.Number;
                            };
                        }>;
                    };
                    readonly Skipped: {};
                }>;
            };
        }>;
    };
    readonly ClickedVirtualListVariableScrollToMiddle: {};
}>;
export type Message = typeof Message.Type;
