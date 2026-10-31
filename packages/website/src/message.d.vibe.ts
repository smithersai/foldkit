import { Schema } from "effect";
export declare const ThemePreference: Schema.Literals<readonly ["Dark", "Light", "System"]>;
export type ThemePreference = typeof ThemePreference.Type;
export { ResolvedTheme } from './colorScheme.vibe';
export declare const Message: import("foldkit/message").MessageUnion<{
    readonly CompletedNavigateInternal: {};
    readonly CompletedLoadExternal: {};
    readonly CompletedLoadPlayground: {};
    readonly CompletedInjectAnalytics: {};
    readonly CompletedInjectSpeedInsights: {};
    readonly CompletedScrollToTop: {};
    readonly CompletedScrollToAnchor: {};
    readonly CompletedApplyTheme: {};
    readonly CompletedSaveThemePreference: {};
    readonly CompletedSaveSidebarState: {};
    readonly CompletedLoadBrowserEnvironment: {
        maybeThemePreference: Schema.Option<Schema.Literals<readonly ["Dark", "Light", "System"]>>;
        maybeSidebarState: Schema.Option<Schema.Struct<{
            readonly open: Schema.$Record<Schema.String, Schema.Boolean>;
        }>>;
        systemTheme: Schema.Literals<readonly ["Dark", "Light"]>;
        isPlaygroundSupported: Schema.Boolean;
        currentYear: Schema.Number;
        today: Schema.Struct<{
            readonly year: Schema.Int;
            readonly month: Schema.Int;
            readonly day: Schema.Int;
        }>;
    };
    readonly CompletedScrollSidebarActiveLinkIntoView: {};
    readonly CompletedScrollMobileMenuActiveLinkIntoView: {};
    readonly SucceededCopyLink: {};
    readonly FailedCopyLink: {};
    readonly ClickedLink: {
        request: import("foldkit/schema").TaggedUnion<{
            readonly Internal: {
                url: Schema.Struct<{
                    readonly protocol: Schema.String;
                    readonly host: Schema.String;
                    readonly port: Schema.Option<Schema.String>;
                    readonly pathname: Schema.String;
                    readonly search: Schema.Option<Schema.String>;
                    readonly hash: Schema.Option<Schema.String>;
                }>;
            };
            readonly External: {
                href: Schema.String;
            };
        }>;
    };
    readonly ChangedUrl: {
        url: Schema.Struct<{
            readonly protocol: Schema.String;
            readonly host: Schema.String;
            readonly port: Schema.Option<Schema.String>;
            readonly pathname: Schema.String;
            readonly search: Schema.Option<Schema.String>;
            readonly hash: Schema.Option<Schema.String>;
        }>;
    };
    readonly ClickedCopyLink: {
        hash: Schema.String;
    };
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
    readonly ClickedOpenMobileMenu: {};
    readonly ClickedOpenSearch: {};
    readonly PressedSearchShortcut: {};
    readonly ToggledMobileTableOfContents: {
        isOpen: Schema.Boolean;
    };
    readonly ClickedMobileTableOfContentsLink: {
        sectionId: Schema.String;
    };
    readonly ChangedActiveSection: {
        sectionId: Schema.String;
    };
    readonly UpdatedNewsletterEmail: {
        value: Schema.String;
    };
    readonly GotThemeMenuMessage: {
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
    readonly ChangedSystemTheme: {
        theme: Schema.Literals<readonly ["Dark", "Light"]>;
    };
    readonly ChangedViewportWidth: {
        isNarrow: Schema.Boolean;
    };
    readonly GotHomeMessage: {
        message: import("foldkit/message").MessageUnion<{
            readonly GotDemoTabsMessage: {
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
            readonly GotPlaygroundMenuMessage: {
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
            readonly GotAsyncCounterDemoMessage: {
                message: import("foldkit/message").MessageUnion<{
                    readonly ClickedDemoIncrement: {};
                    readonly ChangedDemoResetDuration: {
                        seconds: Schema.Number;
                    };
                    readonly ClickedDemoReset: {};
                    readonly CompletedDelayAdvancePhase: {
                        generation: Schema.Number;
                    };
                }>;
            };
            readonly GotNotePlayerDemoMessage: {
                message: import("foldkit/message").MessageUnion<{
                    readonly ChangedNoteInput: {
                        value: Schema.String;
                    };
                    readonly GotNoteDurationMessage: {
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
                    readonly ClickedPlay: {};
                    readonly ClickedPause: {};
                    readonly ClickedStop: {};
                    readonly CompletedPlayNote: {
                        noteIndex: Schema.Number;
                    };
                    readonly CompletedDelayAdvancePhase: {
                        generation: Schema.Number;
                    };
                    readonly SucceededAcquireAudioContext: {};
                    readonly FailedAcquireAudioContext: {};
                    readonly ReleasedAudioContext: {};
                }>;
            };
            readonly UpdatedNewsletterEmail: {
                value: Schema.String;
            };
        }>;
    };
    readonly GotSnippetCopyMessage: {
        message: import("foldkit/message").MessageUnion<{
            readonly ClickedCopySnippet: {
                snippetId: Schema.String;
                text: Schema.String;
            };
            readonly SucceededCopySnippet: {
                snippetId: Schema.String;
            };
            readonly FailedCopySnippet: {};
            readonly CompletedWaitBeforeHidingCopiedIndicator: {
                snippetId: Schema.String;
            };
        }>;
    };
    readonly GotSnippetDisclosureMessage: {
        message: import("foldkit/message").MessageUnion<{
            readonly ToggledCodeDisclosure: {
                disclosureId: Schema.String;
                isOpen: Schema.Boolean;
            };
            readonly CompletedMeasureSnippetHeight: {
                snippetId: Schema.String;
                snippetSize: import("foldkit/schema").TaggedUnion<{
                    readonly Fits: {};
                    readonly Overflows: {};
                }>;
            };
        }>;
    };
    readonly GotCoreSubmodelPageMessage: {
        message: import("foldkit/message").MessageUnion<{
            readonly ToggledMapMessagesUnderHood: {
                isOpen: Schema.Boolean;
            };
        }>;
    };
    readonly GotPlaygroundMessage: {
        message: import("foldkit/message").MessageUnion<{
            readonly BootedPlayground: {
                previewUrl: Schema.String;
            };
            readonly FailedBootPlayground: {
                reason: Schema.String;
            };
            readonly ReleasedPlayground: {};
            readonly LoadedPlaygroundPreview: {
                previewUrl: Schema.String;
            };
            readonly GotFileTabsMessage: {
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
            readonly EditedPlaygroundFile: {
                path: Schema.String;
                content: Schema.String;
            };
            readonly SucceededMountPlaygroundEditor: {};
            readonly FailedMountPlaygroundEditor: {
                reason: Schema.String;
            };
            readonly ScheduledWritePlaygroundFile: {};
            readonly FailedWritePlaygroundFile: {
                reason: Schema.String;
            };
            readonly CompletedWaitForPlaygroundServerFailure: {
                reason: Schema.String;
            };
        }>;
    };
    readonly GotComingFromReactMessage: {
        message: import("foldkit/message").MessageUnion<{
            readonly ToggledFaq: {
                id: Schema.String;
                isOpen: Schema.Boolean;
            };
        }>;
    };
    readonly GotApiReferenceMessage: {
        message: import("foldkit/message").MessageUnion<{
            readonly RequestedApiData: {};
            readonly SucceededLoadApiData: {
                apiData: Schema.Struct<{
                    readonly parsedApi: Schema.Struct<{
                        readonly modules: Schema.$Array<Schema.Struct<{
                            readonly name: Schema.String;
                            readonly functions: Schema.$Array<Schema.Struct<{
                                readonly name: Schema.String;
                                readonly description: Schema.OptionFromNullishOr<Schema.String>;
                                readonly signatures: Schema.$Array<Schema.Struct<{
                                    readonly parameters: Schema.$Array<Schema.Struct<{
                                        readonly name: Schema.String;
                                        readonly type: Schema.String;
                                        readonly isOptional: Schema.Boolean;
                                        readonly isRest: Schema.Boolean;
                                        readonly defaultValue: Schema.OptionFromNullishOr<Schema.String>;
                                        readonly description: Schema.OptionFromNullishOr<Schema.String>;
                                    }>>;
                                    readonly returnType: Schema.String;
                                    readonly typeParameters: Schema.$Array<Schema.String>;
                                }>>;
                                readonly sourceUrl: Schema.OptionFromNullishOr<Schema.String>;
                            }>>;
                            readonly types: Schema.$Array<Schema.Struct<{
                                readonly name: Schema.String;
                                readonly description: Schema.OptionFromNullishOr<Schema.String>;
                                readonly typeDefinition: Schema.String;
                                readonly sourceUrl: Schema.OptionFromNullishOr<Schema.String>;
                            }>>;
                            readonly interfaces: Schema.$Array<Schema.Struct<{
                                readonly name: Schema.String;
                                readonly description: Schema.OptionFromNullishOr<Schema.String>;
                                readonly typeDefinition: Schema.String;
                                readonly sourceUrl: Schema.OptionFromNullishOr<Schema.String>;
                            }>>;
                            readonly variables: Schema.$Array<Schema.Struct<{
                                readonly name: Schema.String;
                                readonly description: Schema.OptionFromNullishOr<Schema.String>;
                                readonly type: Schema.String;
                                readonly sourceUrl: Schema.OptionFromNullishOr<Schema.String>;
                            }>>;
                        }>>;
                    }>;
                    readonly highlights: Schema.$Record<Schema.String, Schema.String>;
                }>;
            };
            readonly FailedLoadApiData: {
                error: Schema.String;
            };
            readonly ToggledSignature: {
                id: Schema.String;
                isOpen: Schema.Boolean;
            };
        }>;
    };
    readonly GotUiPageMessage: {
        message: import("foldkit/message").MessageUnion<{
            readonly ClickedButtonDemo: {};
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
            readonly ToggledDisclosureDemo: {
                isOpen: Schema.Boolean;
            };
            readonly ToggledDisclosureCollapsedPreviewDemo: {
                isOpen: Schema.Boolean;
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
            readonly GotPopoverArrowDemoMessage: {
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
            readonly ClickedShowErrorToast: {};
            readonly ClickedShowStickyToast: {};
            readonly ClickedDismissAllToasts: {};
            readonly GotTooltipDemoMessage: {
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
            readonly GotHoverIntentCardDemoMessage: {
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
            readonly GotHoverIntentMenuDemoMessage: {
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
            readonly ClickedHoverIntentMenuItem: {};
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
            readonly ClickedToggleAnimationDemo: {};
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
            readonly GotVirtualListChatDemoMessage: {
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
            readonly ClickedVirtualListChatPrepend: {};
            readonly ClickedVirtualListChatScrollToMessage: {};
            readonly ClickedVirtualListChatAppend: {};
            readonly ClickedVirtualListChatToggleMessage: {
                messageId: Schema.Number;
            };
        }>;
    };
    readonly ToggledSidebarGroup: {
        key: Schema.Literals<readonly ["blog", "introduction", "coreConcepts", "comparisons", "faq", "testing", "bestPractices", "patterns", "tooling", "foldkitUi", "ai", "examples", "apiReference"]>;
        isOpen: Schema.Boolean;
    };
    readonly GotExampleDetailMessage: {
        message: import("foldkit/message").MessageUnion<{
            readonly GotSourceFileTabsMessage: {
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
            readonly ChangedExampleUrl: {
                url: Schema.String;
            };
            readonly ToggledLivePreview: {
                isOpen: Schema.Boolean;
            };
            readonly RequestedExampleSources: {
                slug: Schema.String;
            };
            readonly SucceededLoadExampleSources: {
                sources: Schema.Struct<{
                    readonly files: Schema.$Array<Schema.Struct<{
                        readonly path: Schema.String;
                        readonly highlightedHtml: Schema.String;
                        readonly rawCode: Schema.String;
                    }>>;
                }>;
            };
            readonly FailedLoadExampleSources: {
                error: Schema.String;
            };
        }>;
    };
    readonly GotSearchMessage: {
        message: import("foldkit/message").MessageUnion<{
            readonly UpdatedSearchQuery: {
                query: Schema.String;
            };
            readonly CompletedFetchSearchResults: {
                results: Schema.$Array<Schema.Struct<{
                    readonly url: Schema.String;
                    readonly title: Schema.String;
                    readonly excerpt: Schema.String;
                    readonly section: Schema.String;
                    readonly kind: Schema.String;
                }>>;
                query: Schema.String;
            };
            readonly SelectedSearchResult: {
                url: Schema.String;
            };
            readonly GotSearchDialogMessage: {
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
            readonly ClearedSearchQuery: {};
            readonly CompletedNavigateToResult: {};
            readonly CompletedScrollToResult: {};
            readonly CompletedFocusSearchInput: {};
            readonly PressedArrowKey: {
                direction: Schema.Literals<readonly ["Up", "Down"]>;
            };
        }>;
    };
}>;
export type Message = typeof Message.Type;
