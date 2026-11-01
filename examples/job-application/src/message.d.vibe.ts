import { Schema } from 'effect';
export declare const Message: import("foldkit/message").MessageUnion<{
    readonly GotPersonalInfoMessage: {
        message: import("foldkit/message").MessageUnion<{
            readonly UpdatedFirstName: {
                value: Schema.String;
            };
            readonly UpdatedLastName: {
                value: Schema.String;
            };
            readonly UpdatedEmail: {
                value: Schema.String;
            };
            readonly CompletedValidateEmailAsync: {
                validationId: Schema.Number;
                field: Schema.Union<readonly [Schema.TaggedStruct<"NotValidated", {
                    readonly value: Schema.Codec<string, string, never, never>;
                }>, Schema.TaggedStruct<"Validating", {
                    readonly value: Schema.Codec<string, string, never, never>;
                }>, Schema.TaggedStruct<"Valid", {
                    readonly value: Schema.Codec<string, string, never, never>;
                }>, Schema.TaggedStruct<"Invalid", {
                    readonly value: Schema.Codec<string, string, never, never>;
                    readonly errors: Schema.NonEmptyArray<Schema.String>;
                }>]>;
            };
            readonly UpdatedPhone: {
                value: Schema.String;
            };
            readonly GotPronounsMessage: {
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
            readonly UpdatedCustomPronouns: {
                value: Schema.String;
            };
            readonly UpdatedPortfolioUrl: {
                value: Schema.String;
            };
            readonly GotAvailableDateMessage: {
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
        }>;
    };
    readonly GotWorkHistoryMessage: {
        message: import("foldkit/message").MessageUnion<{
            readonly ClickedAddEntry: {};
            readonly SucceededGenerateEntryId: {
                entryId: Schema.String;
            };
            readonly FailedGenerateEntryId: {};
            readonly RemovedEntry: {
                entryId: Schema.String;
            };
            readonly GotEntryMessage: {
                entryId: Schema.String;
                message: import("foldkit/message").MessageUnion<{
                    readonly UpdatedCompany: {
                        value: Schema.String;
                    };
                    readonly UpdatedTitle: {
                        value: Schema.String;
                    };
                    readonly GotStartDateMessage: {
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
                    readonly GotEndDateMessage: {
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
                    readonly ToggledCurrentlyEmployed: {
                        isChecked: Schema.Boolean;
                    };
                    readonly UpdatedDescription: {
                        value: Schema.String;
                    };
                    readonly ClickedRemoveSelf: {};
                }>;
            };
        }>;
    };
    readonly GotEducationMessage: {
        message: import("foldkit/message").MessageUnion<{
            readonly ClickedAddEntry: {};
            readonly SucceededGenerateEntryId: {
                entryId: Schema.String;
            };
            readonly FailedGenerateEntryId: {};
            readonly RemovedEntry: {
                entryId: Schema.String;
            };
            readonly GotEntryMessage: {
                entryId: Schema.String;
                message: import("foldkit/message").MessageUnion<{
                    readonly UpdatedSchool: {
                        value: Schema.String;
                    };
                    readonly UpdatedDegree: {
                        value: Schema.String;
                    };
                    readonly UpdatedFieldOfStudy: {
                        value: Schema.String;
                    };
                    readonly GotGraduationYearListboxMessage: {
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
                    readonly ToggledCurrentlyEnrolled: {
                        isChecked: Schema.Boolean;
                    };
                    readonly ClickedRemoveSelf: {};
                }>;
            };
        }>;
    };
    readonly GotSkillsMessage: {
        message: import("foldkit/message").MessageUnion<{
            readonly ClickedAddEntry: {};
            readonly SucceededGenerateEntryId: {
                entryId: Schema.String;
            };
            readonly FailedGenerateEntryId: {};
            readonly RemovedEntry: {
                entryId: Schema.String;
            };
            readonly GotEntryMessage: {
                entryId: Schema.String;
                message: import("foldkit/message").MessageUnion<{
                    readonly UpdatedName: {
                        value: Schema.String;
                    };
                    readonly GotProficiencyRadioGroupMessage: {
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
                    readonly ClickedRemoveSelf: {};
                }>;
            };
        }>;
    };
    readonly GotCoverLetterMessage: {
        message: import("foldkit/message").MessageUnion<{
            readonly UpdatedContent: {
                value: Schema.String;
            };
        }>;
    };
    readonly GotAttachmentsMessage: {
        message: import("foldkit/message").MessageUnion<{
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
    };
    readonly GotStepMenuMessage: {
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
    readonly GotStepTabsMessage: {
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
    readonly ClickedNext: {};
    readonly ClickedPrevious: {};
    readonly ToggledPreview: {};
    readonly ClickedSubmit: {};
    readonly SucceededSubmitApplication: {};
    readonly FailedSubmitApplication: {
        error: Schema.String;
    };
}>;
export type Message = typeof Message.Type;
