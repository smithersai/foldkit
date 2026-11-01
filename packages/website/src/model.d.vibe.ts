import { Schema } from 'effect';
export declare const Model: Schema.Struct<{
    readonly route: import("foldkit/route").RouteUnion<{
        readonly Home: {};
        readonly WhyFoldkit: {};
        readonly Performance: {};
        readonly ComingFromReact: {};
        readonly ComingFromTanStackQuery: {};
        readonly ReactComparison: {};
        readonly EffectAtomComparison: {};
        readonly ElmComparison: {};
        readonly GetStarted: {};
        readonly Roadmap: {};
        readonly RoutingAndNavigation: {};
        readonly FieldValidation: {};
        readonly Testing: {};
        readonly TestingStory: {};
        readonly TestingScene: {};
        readonly Examples: {};
        readonly ExampleDetail: {
            exampleSlug: Schema.String;
        };
        readonly TypingTerminal: {};
        readonly Playground: {
            exampleSlug: Schema.String;
        };
        readonly BestPracticesSideEffects: {};
        readonly BestPracticesMessages: {};
        readonly BestPracticesKeying: {};
        readonly BestPracticesImmutability: {};
        readonly ProjectOrganization: {};
        readonly ToolingLinting: {};
        readonly ApiModule: {
            moduleSlug: Schema.String;
        };
        readonly CoreArchitecture: {};
        readonly CoreCounterExample: {};
        readonly CoreModel: {};
        readonly CoreMessages: {};
        readonly CoreUpdate: {};
        readonly CoreView: {};
        readonly CoreCommands: {};
        readonly CoreMount: {};
        readonly CoreCustomElement: {};
        readonly CoreSubscriptions: {};
        readonly CoreInitAndFlags: {};
        readonly CoreDom: {};
        readonly CoreRender: {};
        readonly CoreFile: {};
        readonly CoreHttp: {};
        readonly CoreQuery: {};
        readonly CoreCanvas: {};
        readonly CoreRuntime: {};
        readonly CoreServerRendering: {};
        readonly CoreResources: {};
        readonly CoreManagedResources: {};
        readonly CoreDevTools: {};
        readonly CoreCrashView: {};
        readonly CoreViewTransitions: {};
        readonly CoreSlowWarnings: {};
        readonly CoreFreezeModel: {};
        readonly CorePreserveScroll: {};
        readonly CoreViewMemoization: {};
        readonly CoreEmbedding: {};
        readonly CoreSubmodel: {};
        readonly CoreMachine: {};
        readonly AsyncData: {};
        readonly PatternsAntiPatterns: {};
        readonly PatternsInformingSubmodels: {};
        readonly PatternsSubscriptionOrganization: {};
        readonly UiOverview: {};
        readonly UiSelectionSubmodels: {};
        readonly UiButton: {};
        readonly UiCalendar: {};
        readonly UiDatePicker: {};
        readonly UiCheckbox: {};
        readonly UiTabs: {};
        readonly UiNav: {};
        readonly UiDisclosure: {};
        readonly UiDialog: {};
        readonly UiMenu: {};
        readonly UiPopover: {};
        readonly UiListbox: {};
        readonly UiRadioGroup: {};
        readonly UiSelect: {};
        readonly UiSlider: {};
        readonly UiMeter: {};
        readonly UiProgress: {};
        readonly UiSwitch: {};
        readonly UiCombobox: {};
        readonly UiInput: {};
        readonly UiTextarea: {};
        readonly UiFieldset: {};
        readonly UiDragAndDrop: {};
        readonly UiFileDrop: {};
        readonly UiHoverIntent: {};
        readonly UiToast: {};
        readonly UiTooltip: {};
        readonly UiAnimation: {};
        readonly UiAnchor: {};
        readonly UiVirtualList: {};
        readonly About: {};
        readonly Contact: {};
        readonly Privacy: {};
        readonly ContentApi: {};
        readonly AiOverview: {};
        readonly AiSkills: {};
        readonly AiMcp: {};
        readonly Newsletter: {};
        readonly Blog: {};
        readonly BlogPost: {
            postSlug: Schema.String;
        };
        readonly NotFound: {
            path: Schema.String;
        };
    }>;
    readonly url: Schema.Struct<{
        readonly protocol: Schema.String;
        readonly host: Schema.String;
        readonly port: Schema.Option<Schema.String>;
        readonly pathname: Schema.String;
        readonly search: Schema.Option<Schema.String>;
        readonly hash: Schema.Option<Schema.String>;
    }>;
    readonly deployment: import("foldkit/schema").TaggedUnion<{
        readonly Production: {};
        readonly Canary: {
            commit: Schema.NonEmptyString;
        };
    }>;
    readonly snippetCopy: Schema.Struct<{
        readonly copiedSnippetIds: Schema.HashSet<Schema.String>;
    }>;
    readonly snippetDisclosure: Schema.Struct<{
        readonly openDisclosureIds: Schema.HashSet<Schema.String>;
        readonly snippetSizes: Schema.HashMap<Schema.String, import("foldkit/schema").TaggedUnion<{
            readonly Fits: {};
            readonly Overflows: {};
        }>>;
    }>;
    readonly maybeGitHubStarCount: Schema.Option<Schema.Number>;
    readonly currentYear: Schema.Number;
    readonly newsletterEmail: Schema.String;
    readonly mobileMenuDialog: Schema.Struct<{
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
    readonly isMobileTableOfContentsOpen: Schema.Boolean;
    readonly activeSection: Schema.Option<Schema.String>;
    readonly isNarrowViewport: Schema.Boolean;
    readonly maybeIsPlaygroundSupported: Schema.Option<Schema.Boolean>;
    readonly playground: Schema.Option<Schema.Struct<{
        readonly slug: Schema.String;
        readonly state: import("foldkit/schema").TaggedUnion<{
            readonly Idle: {};
            readonly Booting: {};
            readonly Booted: {
                preview: import("foldkit/schema").TaggedUnion<{
                    readonly Loading: {
                        previewUrl: Schema.String;
                    };
                    readonly Loaded: {
                        previewUrl: Schema.String;
                    };
                }>;
            };
            readonly Failed: {
                reason: Schema.String;
            };
        }>;
        readonly files: Schema.$Record<Schema.String, Schema.String>;
        readonly fileTabs: Schema.Struct<{
            readonly id: Schema.String;
            readonly maybeFocusedIndex: Schema.Option<Schema.Number>;
            readonly activationMode: Schema.Literals<readonly ["Automatic", "Manual"]>;
        }>;
        readonly activeFilePath: Schema.String;
        readonly dirtyPaths: Schema.$Array<Schema.String>;
        readonly lastWriteError: Schema.Option<Schema.String>;
    }>>;
    readonly sidebarGroups: Schema.$Record<Schema.Literals<readonly ["blog", "introduction", "coreConcepts", "comparisons", "faq", "testing", "bestPractices", "patterns", "tooling", "foldkitUi", "ai", "examples", "apiReference"]>, Schema.Boolean>;
    readonly coreSubmodelPage: Schema.Struct<{
        readonly isMapMessagesUnderHoodOpen: Schema.Boolean;
    }>;
    readonly maybeHome: Schema.Option<Schema.Struct<{
        readonly demoTabs: Schema.Struct<{
            readonly id: Schema.String;
            readonly maybeFocusedIndex: Schema.Option<Schema.Number>;
            readonly activationMode: Schema.Literals<readonly ["Automatic", "Manual"]>;
        }>;
        readonly activeDemoTab: Schema.Literals<readonly ["Architecture", "Note Player"]>;
        readonly playgroundMenu: Schema.Struct<{
            readonly id: Schema.String;
            readonly isOpen: Schema.Boolean;
            readonly isAnimated: Schema.Boolean;
            readonly isModal: Schema.Boolean;
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
            readonly maybePointerOrigin: Schema.Option<Schema.Struct<{
                readonly screenX: Schema.Number;
                readonly screenY: Schema.Number;
                readonly timeStamp: Schema.Number;
            }>>;
        }>;
        readonly asyncCounterDemo: Schema.Struct<{
            readonly count: Schema.Number;
            readonly isResetting: Schema.Boolean;
            readonly resetDuration: Schema.Number;
            readonly phase: Schema.Literals<readonly ["Idle", "IncrementMessage", "IncrementUpdate", "IncrementModel", "DurationMessage", "DurationUpdate", "DurationModel", "ResetMessage", "ResetUpdate", "ResetCommand", "ResetCommandMessage", "ResetCommandUpdate", "ResetModel"]>;
            readonly generation: Schema.Number;
            readonly messageLog: Schema.$Array<Schema.String>;
        }>;
        readonly notePlayerDemo: Schema.Struct<{
            readonly noteInput: Schema.Union<readonly [Schema.TaggedStruct<"NotValidated", {
                readonly value: Schema.Codec<string, string, never, never>;
            }>, Schema.TaggedStruct<"Validating", {
                readonly value: Schema.Codec<string, string, never, never>;
            }>, Schema.TaggedStruct<"Valid", {
                readonly value: Schema.Codec<string, string, never, never>;
            }>, Schema.TaggedStruct<"Invalid", {
                readonly value: Schema.Codec<string, string, never, never>;
                readonly errors: Schema.NonEmptyArray<Schema.String>;
            }>]>;
            readonly noteDurationRadioGroup: Schema.Struct<{
                readonly id: Schema.String;
                readonly maybeFocusedIndex: Schema.Option<Schema.Number>;
            }>;
            readonly noteDuration: Schema.Literals<readonly ["Short", "Medium", "Long"]>;
            readonly playbackState: import("foldkit/schema").TaggedUnion<{
                readonly Idle: {};
                readonly Playing: {
                    noteSequence: Schema.$Array<Schema.Literals<readonly ["A", "B", "C", "D", "E", "F", "G"]>>;
                    currentNoteIndex: Schema.Number;
                };
                readonly Paused: {
                    noteSequence: Schema.$Array<Schema.Literals<readonly ["A", "B", "C", "D", "E", "F", "G"]>>;
                    currentNoteIndex: Schema.Number;
                };
            }>;
            readonly highlightPhase: Schema.Literals<readonly ["Idle", "PlayMessage", "PlayUpdate", "PlayModel", "PauseMessage", "NoteMessage", "NoteUpdate", "NoteModel", "NoteCommand"]>;
            readonly generation: Schema.Number;
            readonly messageLog: Schema.$Array<Schema.String>;
            readonly audio: import("foldkit/schema").TaggedUnion<{
                readonly Acquiring: {};
                readonly Ready: {};
                readonly Unavailable: {};
            }>;
        }>;
    }>>;
    readonly themeMenu: Schema.Struct<{
        readonly id: Schema.String;
        readonly isOpen: Schema.Boolean;
        readonly isAnimated: Schema.Boolean;
        readonly isModal: Schema.Boolean;
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
        readonly maybePointerOrigin: Schema.Option<Schema.Struct<{
            readonly screenX: Schema.Number;
            readonly screenY: Schema.Number;
            readonly timeStamp: Schema.Number;
        }>>;
    }>;
    readonly maybeThemePreference: Schema.Option<Schema.Literals<readonly ["Dark", "Light", "System"]>>;
    readonly systemTheme: Schema.Literals<readonly ["Dark", "Light"]>;
    readonly resolvedTheme: Schema.Literals<readonly ["Dark", "Light"]>;
    readonly uiPages: Schema.Struct<{
        readonly buttonClickCount: Schema.Number;
        readonly inputDemoValue: Schema.String;
        readonly textareaDemoValue: Schema.String;
        readonly fieldsetInputValue: Schema.String;
        readonly fieldsetTextareaValue: Schema.String;
        readonly isFieldsetCheckboxDemoChecked: Schema.Boolean;
        readonly calendarBasicDemo: Schema.Struct<{
            readonly id: Schema.String;
            readonly today: Schema.Struct<{
                readonly year: Schema.Int;
                readonly month: Schema.Int;
                readonly day: Schema.Int;
            }>;
            readonly viewYear: Schema.Int;
            readonly viewMonth: Schema.Int;
            readonly viewMode: Schema.Literals<readonly ["Days", "Months", "Years"]>;
            readonly maybeFocusedDate: Schema.Option<Schema.Struct<{
                readonly year: Schema.Int;
                readonly month: Schema.Int;
                readonly day: Schema.Int;
            }>>;
            readonly isGridFocused: Schema.Boolean;
            readonly locale: Schema.Struct<{
                readonly firstDayOfWeek: Schema.Literals<readonly ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]>;
                readonly monthNames: Schema.Tuple<readonly [Schema.String, Schema.String, Schema.String, Schema.String, Schema.String, Schema.String, Schema.String, Schema.String, Schema.String, Schema.String, Schema.String, Schema.String]>;
                readonly shortMonthNames: Schema.Tuple<readonly [Schema.String, Schema.String, Schema.String, Schema.String, Schema.String, Schema.String, Schema.String, Schema.String, Schema.String, Schema.String, Schema.String, Schema.String]>;
                readonly dayNames: Schema.Tuple<readonly [Schema.String, Schema.String, Schema.String, Schema.String, Schema.String, Schema.String, Schema.String]>;
                readonly shortDayNames: Schema.Tuple<readonly [Schema.String, Schema.String, Schema.String, Schema.String, Schema.String, Schema.String, Schema.String]>;
                readonly longFormat: Schema.NonEmptyArray<import("foldkit/schema").TaggedUnion<{
                    readonly MonthName: {};
                    readonly ShortMonthName: {};
                    readonly MonthNumber: {};
                    readonly PaddedMonthNumber: {};
                    readonly DayNumber: {};
                    readonly PaddedDayNumber: {};
                    readonly DayName: {};
                    readonly ShortDayName: {};
                    readonly YearNumber: {};
                    readonly LiteralText: {
                        text: Schema.String;
                    };
                }>>;
                readonly shortFormat: Schema.NonEmptyArray<import("foldkit/schema").TaggedUnion<{
                    readonly MonthName: {};
                    readonly ShortMonthName: {};
                    readonly MonthNumber: {};
                    readonly PaddedMonthNumber: {};
                    readonly DayNumber: {};
                    readonly PaddedDayNumber: {};
                    readonly DayName: {};
                    readonly ShortDayName: {};
                    readonly YearNumber: {};
                    readonly LiteralText: {
                        text: Schema.String;
                    };
                }>>;
                readonly ariaLabelFormat: Schema.NonEmptyArray<import("foldkit/schema").TaggedUnion<{
                    readonly MonthName: {};
                    readonly ShortMonthName: {};
                    readonly MonthNumber: {};
                    readonly PaddedMonthNumber: {};
                    readonly DayNumber: {};
                    readonly PaddedDayNumber: {};
                    readonly DayName: {};
                    readonly ShortDayName: {};
                    readonly YearNumber: {};
                    readonly LiteralText: {
                        text: Schema.String;
                    };
                }>>;
                readonly monthYearFormat: Schema.NonEmptyArray<Schema.Union<readonly [Schema.TaggedStruct<"MonthName", {}> & ((value?: void | {
                    readonly _tag?: "MonthName";
                } | undefined) => {
                    readonly _tag: "MonthName";
                }), Schema.TaggedStruct<"ShortMonthName", {}> & ((value?: void | {
                    readonly _tag?: "ShortMonthName";
                } | undefined) => {
                    readonly _tag: "ShortMonthName";
                }), Schema.TaggedStruct<"MonthNumber", {}> & ((value?: void | {
                    readonly _tag?: "MonthNumber";
                } | undefined) => {
                    readonly _tag: "MonthNumber";
                }), Schema.TaggedStruct<"PaddedMonthNumber", {}> & ((value?: void | {
                    readonly _tag?: "PaddedMonthNumber";
                } | undefined) => {
                    readonly _tag: "PaddedMonthNumber";
                }), Schema.TaggedStruct<"YearNumber", {}> & ((value?: void | {
                    readonly _tag?: "YearNumber";
                } | undefined) => {
                    readonly _tag: "YearNumber";
                }), Schema.TaggedStruct<"LiteralText", {
                    readonly text: Schema.String;
                }> & ((value: {
                    readonly _tag?: "LiteralText";
                    readonly text: string;
                }) => {
                    readonly _tag: "LiteralText";
                    readonly text: string;
                })]>>;
            }>;
            readonly maybeMinDate: Schema.Option<Schema.Struct<{
                readonly year: Schema.Int;
                readonly month: Schema.Int;
                readonly day: Schema.Int;
            }>>;
            readonly maybeMaxDate: Schema.Option<Schema.Struct<{
                readonly year: Schema.Int;
                readonly month: Schema.Int;
                readonly day: Schema.Int;
            }>>;
            readonly disabledDaysOfWeek: Schema.$Array<Schema.Literals<readonly ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]>>;
            readonly disabledDates: Schema.$Array<Schema.Struct<{
                readonly year: Schema.Int;
                readonly month: Schema.Int;
                readonly day: Schema.Int;
            }>>;
        }>;
        readonly maybeCalendarBasicDemoSelectedDate: Schema.Option<Schema.Struct<{
            readonly year: Schema.Int;
            readonly month: Schema.Int;
            readonly day: Schema.Int;
        }>>;
        readonly datePickerBasicDemo: Schema.Struct<{
            readonly id: Schema.String;
            readonly calendar: Schema.Struct<{
                readonly id: Schema.String;
                readonly today: Schema.Struct<{
                    readonly year: Schema.Int;
                    readonly month: Schema.Int;
                    readonly day: Schema.Int;
                }>;
                readonly viewYear: Schema.Int;
                readonly viewMonth: Schema.Int;
                readonly viewMode: Schema.Literals<readonly ["Days", "Months", "Years"]>;
                readonly maybeFocusedDate: Schema.Option<Schema.Struct<{
                    readonly year: Schema.Int;
                    readonly month: Schema.Int;
                    readonly day: Schema.Int;
                }>>;
                readonly isGridFocused: Schema.Boolean;
                readonly locale: Schema.Struct<{
                    readonly firstDayOfWeek: Schema.Literals<readonly ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]>;
                    readonly monthNames: Schema.Tuple<readonly [Schema.String, Schema.String, Schema.String, Schema.String, Schema.String, Schema.String, Schema.String, Schema.String, Schema.String, Schema.String, Schema.String, Schema.String]>;
                    readonly shortMonthNames: Schema.Tuple<readonly [Schema.String, Schema.String, Schema.String, Schema.String, Schema.String, Schema.String, Schema.String, Schema.String, Schema.String, Schema.String, Schema.String, Schema.String]>;
                    readonly dayNames: Schema.Tuple<readonly [Schema.String, Schema.String, Schema.String, Schema.String, Schema.String, Schema.String, Schema.String]>;
                    readonly shortDayNames: Schema.Tuple<readonly [Schema.String, Schema.String, Schema.String, Schema.String, Schema.String, Schema.String, Schema.String]>;
                    readonly longFormat: Schema.NonEmptyArray<import("foldkit/schema").TaggedUnion<{
                        readonly MonthName: {};
                        readonly ShortMonthName: {};
                        readonly MonthNumber: {};
                        readonly PaddedMonthNumber: {};
                        readonly DayNumber: {};
                        readonly PaddedDayNumber: {};
                        readonly DayName: {};
                        readonly ShortDayName: {};
                        readonly YearNumber: {};
                        readonly LiteralText: {
                            text: Schema.String;
                        };
                    }>>;
                    readonly shortFormat: Schema.NonEmptyArray<import("foldkit/schema").TaggedUnion<{
                        readonly MonthName: {};
                        readonly ShortMonthName: {};
                        readonly MonthNumber: {};
                        readonly PaddedMonthNumber: {};
                        readonly DayNumber: {};
                        readonly PaddedDayNumber: {};
                        readonly DayName: {};
                        readonly ShortDayName: {};
                        readonly YearNumber: {};
                        readonly LiteralText: {
                            text: Schema.String;
                        };
                    }>>;
                    readonly ariaLabelFormat: Schema.NonEmptyArray<import("foldkit/schema").TaggedUnion<{
                        readonly MonthName: {};
                        readonly ShortMonthName: {};
                        readonly MonthNumber: {};
                        readonly PaddedMonthNumber: {};
                        readonly DayNumber: {};
                        readonly PaddedDayNumber: {};
                        readonly DayName: {};
                        readonly ShortDayName: {};
                        readonly YearNumber: {};
                        readonly LiteralText: {
                            text: Schema.String;
                        };
                    }>>;
                    readonly monthYearFormat: Schema.NonEmptyArray<Schema.Union<readonly [Schema.TaggedStruct<"MonthName", {}> & ((value?: void | {
                        readonly _tag?: "MonthName";
                    } | undefined) => {
                        readonly _tag: "MonthName";
                    }), Schema.TaggedStruct<"ShortMonthName", {}> & ((value?: void | {
                        readonly _tag?: "ShortMonthName";
                    } | undefined) => {
                        readonly _tag: "ShortMonthName";
                    }), Schema.TaggedStruct<"MonthNumber", {}> & ((value?: void | {
                        readonly _tag?: "MonthNumber";
                    } | undefined) => {
                        readonly _tag: "MonthNumber";
                    }), Schema.TaggedStruct<"PaddedMonthNumber", {}> & ((value?: void | {
                        readonly _tag?: "PaddedMonthNumber";
                    } | undefined) => {
                        readonly _tag: "PaddedMonthNumber";
                    }), Schema.TaggedStruct<"YearNumber", {}> & ((value?: void | {
                        readonly _tag?: "YearNumber";
                    } | undefined) => {
                        readonly _tag: "YearNumber";
                    }), Schema.TaggedStruct<"LiteralText", {
                        readonly text: Schema.String;
                    }> & ((value: {
                        readonly _tag?: "LiteralText";
                        readonly text: string;
                    }) => {
                        readonly _tag: "LiteralText";
                        readonly text: string;
                    })]>>;
                }>;
                readonly maybeMinDate: Schema.Option<Schema.Struct<{
                    readonly year: Schema.Int;
                    readonly month: Schema.Int;
                    readonly day: Schema.Int;
                }>>;
                readonly maybeMaxDate: Schema.Option<Schema.Struct<{
                    readonly year: Schema.Int;
                    readonly month: Schema.Int;
                    readonly day: Schema.Int;
                }>>;
                readonly disabledDaysOfWeek: Schema.$Array<Schema.Literals<readonly ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]>>;
                readonly disabledDates: Schema.$Array<Schema.Struct<{
                    readonly year: Schema.Int;
                    readonly month: Schema.Int;
                    readonly day: Schema.Int;
                }>>;
            }>;
            readonly popover: Schema.Struct<{
                readonly id: Schema.String;
                readonly isOpen: Schema.Boolean;
                readonly isAnimated: Schema.Boolean;
                readonly isModal: Schema.Boolean;
                readonly contentFocus: Schema.Boolean;
                readonly animation: Schema.Struct<{
                    readonly id: Schema.String;
                    readonly isShowing: Schema.Boolean;
                    readonly transitionState: Schema.Literals<readonly ["Idle", "EnterStart", "EnterAnimating", "LeaveStart", "LeaveAnimating"]>;
                    readonly transitionGeneration: Schema.Number;
                }>;
                readonly maybeLastButtonPointerType: Schema.Option<Schema.String>;
            }>;
        }>;
        readonly maybeDatePickerBasicDemoSelectedDate: Schema.Option<Schema.Struct<{
            readonly year: Schema.Int;
            readonly month: Schema.Int;
            readonly day: Schema.Int;
        }>>;
        readonly isCheckboxBasicDemoChecked: Schema.Boolean;
        readonly isCheckboxOptionADemoChecked: Schema.Boolean;
        readonly isCheckboxOptionBDemoChecked: Schema.Boolean;
        readonly comboboxDemo: Schema.Struct<{
            readonly id: Schema.String;
            readonly isOpen: Schema.Boolean;
            readonly isAnimated: Schema.Boolean;
            readonly isModal: Schema.Boolean;
            readonly nullable: Schema.Boolean;
            readonly immediate: Schema.Boolean;
            readonly selectInputOnFocus: Schema.Boolean;
            readonly animation: Schema.Struct<{
                readonly id: Schema.String;
                readonly isShowing: Schema.Boolean;
                readonly transitionState: Schema.Literals<readonly ["Idle", "EnterStart", "EnterAnimating", "LeaveStart", "LeaveAnimating"]>;
                readonly transitionGeneration: Schema.Number;
            }>;
            readonly maybeActiveItemIndex: Schema.Option<Schema.Number>;
            readonly activationTrigger: Schema.Literals<readonly ["Pointer", "Keyboard"]>;
            readonly inputValue: Schema.String;
            readonly maybeLastPointerPosition: Schema.Option<Schema.Struct<{
                readonly screenX: Schema.Number;
                readonly screenY: Schema.Number;
            }>>;
        }>;
        readonly maybeComboboxDemoSelectedCity: Schema.Option<Schema.Literals<readonly ["Johannesburg", "Kyiv", "Oxford", "Plymouth", "Quito", "Wellington", "Zurich"]>>;
        readonly comboboxPlacementLockDemo: Schema.Struct<{
            readonly id: Schema.String;
            readonly isOpen: Schema.Boolean;
            readonly isAnimated: Schema.Boolean;
            readonly isModal: Schema.Boolean;
            readonly nullable: Schema.Boolean;
            readonly immediate: Schema.Boolean;
            readonly selectInputOnFocus: Schema.Boolean;
            readonly animation: Schema.Struct<{
                readonly id: Schema.String;
                readonly isShowing: Schema.Boolean;
                readonly transitionState: Schema.Literals<readonly ["Idle", "EnterStart", "EnterAnimating", "LeaveStart", "LeaveAnimating"]>;
                readonly transitionGeneration: Schema.Number;
            }>;
            readonly maybeActiveItemIndex: Schema.Option<Schema.Number>;
            readonly activationTrigger: Schema.Literals<readonly ["Pointer", "Keyboard"]>;
            readonly inputValue: Schema.String;
            readonly maybeLastPointerPosition: Schema.Option<Schema.Struct<{
                readonly screenX: Schema.Number;
                readonly screenY: Schema.Number;
            }>>;
        }>;
        readonly maybeComboboxPlacementLockDemoSelectedCity: Schema.Option<Schema.Literals<readonly ["Johannesburg", "Kyiv", "Oxford", "Plymouth", "Quito", "Wellington", "Zurich"]>>;
        readonly comboboxNullableDemo: Schema.Struct<{
            readonly id: Schema.String;
            readonly isOpen: Schema.Boolean;
            readonly isAnimated: Schema.Boolean;
            readonly isModal: Schema.Boolean;
            readonly nullable: Schema.Boolean;
            readonly immediate: Schema.Boolean;
            readonly selectInputOnFocus: Schema.Boolean;
            readonly animation: Schema.Struct<{
                readonly id: Schema.String;
                readonly isShowing: Schema.Boolean;
                readonly transitionState: Schema.Literals<readonly ["Idle", "EnterStart", "EnterAnimating", "LeaveStart", "LeaveAnimating"]>;
                readonly transitionGeneration: Schema.Number;
            }>;
            readonly maybeActiveItemIndex: Schema.Option<Schema.Number>;
            readonly activationTrigger: Schema.Literals<readonly ["Pointer", "Keyboard"]>;
            readonly inputValue: Schema.String;
            readonly maybeLastPointerPosition: Schema.Option<Schema.Struct<{
                readonly screenX: Schema.Number;
                readonly screenY: Schema.Number;
            }>>;
        }>;
        readonly maybeComboboxNullableDemoSelectedCity: Schema.Option<Schema.Literals<readonly ["Johannesburg", "Kyiv", "Oxford", "Plymouth", "Quito", "Wellington", "Zurich"]>>;
        readonly comboboxMultiDemo: Schema.Struct<{
            readonly id: Schema.String;
            readonly isOpen: Schema.Boolean;
            readonly isAnimated: Schema.Boolean;
            readonly isModal: Schema.Boolean;
            readonly nullable: Schema.Boolean;
            readonly immediate: Schema.Boolean;
            readonly selectInputOnFocus: Schema.Boolean;
            readonly animation: Schema.Struct<{
                readonly id: Schema.String;
                readonly isShowing: Schema.Boolean;
                readonly transitionState: Schema.Literals<readonly ["Idle", "EnterStart", "EnterAnimating", "LeaveStart", "LeaveAnimating"]>;
                readonly transitionGeneration: Schema.Number;
            }>;
            readonly maybeActiveItemIndex: Schema.Option<Schema.Number>;
            readonly activationTrigger: Schema.Literals<readonly ["Pointer", "Keyboard"]>;
            readonly inputValue: Schema.String;
            readonly maybeLastPointerPosition: Schema.Option<Schema.Struct<{
                readonly screenX: Schema.Number;
                readonly screenY: Schema.Number;
            }>>;
        }>;
        readonly comboboxMultiDemoSelectedCities: Schema.$Array<Schema.Literals<readonly ["Johannesburg", "Kyiv", "Oxford", "Plymouth", "Quito", "Wellington", "Zurich"]>>;
        readonly comboboxSelectOnFocusDemo: Schema.Struct<{
            readonly id: Schema.String;
            readonly isOpen: Schema.Boolean;
            readonly isAnimated: Schema.Boolean;
            readonly isModal: Schema.Boolean;
            readonly nullable: Schema.Boolean;
            readonly immediate: Schema.Boolean;
            readonly selectInputOnFocus: Schema.Boolean;
            readonly animation: Schema.Struct<{
                readonly id: Schema.String;
                readonly isShowing: Schema.Boolean;
                readonly transitionState: Schema.Literals<readonly ["Idle", "EnterStart", "EnterAnimating", "LeaveStart", "LeaveAnimating"]>;
                readonly transitionGeneration: Schema.Number;
            }>;
            readonly maybeActiveItemIndex: Schema.Option<Schema.Number>;
            readonly activationTrigger: Schema.Literals<readonly ["Pointer", "Keyboard"]>;
            readonly inputValue: Schema.String;
            readonly maybeLastPointerPosition: Schema.Option<Schema.Struct<{
                readonly screenX: Schema.Number;
                readonly screenY: Schema.Number;
            }>>;
        }>;
        readonly maybeComboboxSelectOnFocusDemoSelectedCity: Schema.Option<Schema.Literals<readonly ["Johannesburg", "Kyiv", "Oxford", "Plymouth", "Quito", "Wellington", "Zurich"]>>;
        readonly dialogDemo: Schema.Struct<{
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
        readonly dialogAnimatedDemo: Schema.Struct<{
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
        readonly overlayDialogDemo: Schema.Struct<{
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
        readonly overlayComboboxDemo: Schema.Struct<{
            readonly id: Schema.String;
            readonly isOpen: Schema.Boolean;
            readonly isAnimated: Schema.Boolean;
            readonly isModal: Schema.Boolean;
            readonly nullable: Schema.Boolean;
            readonly immediate: Schema.Boolean;
            readonly selectInputOnFocus: Schema.Boolean;
            readonly animation: Schema.Struct<{
                readonly id: Schema.String;
                readonly isShowing: Schema.Boolean;
                readonly transitionState: Schema.Literals<readonly ["Idle", "EnterStart", "EnterAnimating", "LeaveStart", "LeaveAnimating"]>;
                readonly transitionGeneration: Schema.Number;
            }>;
            readonly maybeActiveItemIndex: Schema.Option<Schema.Number>;
            readonly activationTrigger: Schema.Literals<readonly ["Pointer", "Keyboard"]>;
            readonly inputValue: Schema.String;
            readonly maybeLastPointerPosition: Schema.Option<Schema.Struct<{
                readonly screenX: Schema.Number;
                readonly screenY: Schema.Number;
            }>>;
        }>;
        readonly maybeOverlayComboboxDemoSelectedCity: Schema.Option<Schema.Literals<readonly ["Johannesburg", "Kyiv", "Oxford", "Plymouth", "Quito", "Wellington", "Zurich"]>>;
        readonly nestedDialogParentDemo: Schema.Struct<{
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
        readonly nestedDialogChildDemo: Schema.Struct<{
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
        readonly isDisclosureDemoOpen: Schema.Boolean;
        readonly isDisclosureCollapsedPreviewDemoOpen: Schema.Boolean;
        readonly listboxDemo: Schema.Struct<{
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
        readonly maybeListboxDemoSelectedItem: Schema.Option<Schema.Literals<readonly ["Michael Bluth", "Lindsay Funke", "Gob Bluth", "George Michael", "Maeby Funke", "Buster Bluth", "Tobias Funke", "Lucille Bluth"]>>;
        readonly listboxMultiDemo: Schema.Struct<{
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
        readonly listboxMultiDemoSelectedItems: Schema.$Array<Schema.Literals<readonly ["Michael Bluth", "Lindsay Funke", "Gob Bluth", "George Michael", "Maeby Funke", "Buster Bluth", "Tobias Funke", "Lucille Bluth"]>>;
        readonly listboxGroupedDemo: Schema.Struct<{
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
        readonly maybeListboxGroupedDemoSelectedItem: Schema.Option<Schema.String>;
        readonly menuBasicDemo: Schema.Struct<{
            readonly id: Schema.String;
            readonly isOpen: Schema.Boolean;
            readonly isAnimated: Schema.Boolean;
            readonly isModal: Schema.Boolean;
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
            readonly maybePointerOrigin: Schema.Option<Schema.Struct<{
                readonly screenX: Schema.Number;
                readonly screenY: Schema.Number;
                readonly timeStamp: Schema.Number;
            }>>;
        }>;
        readonly menuAnimatedDemo: Schema.Struct<{
            readonly id: Schema.String;
            readonly isOpen: Schema.Boolean;
            readonly isAnimated: Schema.Boolean;
            readonly isModal: Schema.Boolean;
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
            readonly maybePointerOrigin: Schema.Option<Schema.Struct<{
                readonly screenX: Schema.Number;
                readonly screenY: Schema.Number;
                readonly timeStamp: Schema.Number;
            }>>;
        }>;
        readonly popoverBasicDemo: Schema.Struct<{
            readonly id: Schema.String;
            readonly isOpen: Schema.Boolean;
            readonly isAnimated: Schema.Boolean;
            readonly isModal: Schema.Boolean;
            readonly contentFocus: Schema.Boolean;
            readonly animation: Schema.Struct<{
                readonly id: Schema.String;
                readonly isShowing: Schema.Boolean;
                readonly transitionState: Schema.Literals<readonly ["Idle", "EnterStart", "EnterAnimating", "LeaveStart", "LeaveAnimating"]>;
                readonly transitionGeneration: Schema.Number;
            }>;
            readonly maybeLastButtonPointerType: Schema.Option<Schema.String>;
        }>;
        readonly popoverAnimatedDemo: Schema.Struct<{
            readonly id: Schema.String;
            readonly isOpen: Schema.Boolean;
            readonly isAnimated: Schema.Boolean;
            readonly isModal: Schema.Boolean;
            readonly contentFocus: Schema.Boolean;
            readonly animation: Schema.Struct<{
                readonly id: Schema.String;
                readonly isShowing: Schema.Boolean;
                readonly transitionState: Schema.Literals<readonly ["Idle", "EnterStart", "EnterAnimating", "LeaveStart", "LeaveAnimating"]>;
                readonly transitionGeneration: Schema.Number;
            }>;
            readonly maybeLastButtonPointerType: Schema.Option<Schema.String>;
        }>;
        readonly popoverArrowDemo: Schema.Struct<{
            readonly id: Schema.String;
            readonly isOpen: Schema.Boolean;
            readonly isAnimated: Schema.Boolean;
            readonly isModal: Schema.Boolean;
            readonly contentFocus: Schema.Boolean;
            readonly animation: Schema.Struct<{
                readonly id: Schema.String;
                readonly isShowing: Schema.Boolean;
                readonly transitionState: Schema.Literals<readonly ["Idle", "EnterStart", "EnterAnimating", "LeaveStart", "LeaveAnimating"]>;
                readonly transitionGeneration: Schema.Number;
            }>;
            readonly maybeLastButtonPointerType: Schema.Option<Schema.String>;
        }>;
        readonly popoverNestedParentDemo: Schema.Struct<{
            readonly id: Schema.String;
            readonly isOpen: Schema.Boolean;
            readonly isAnimated: Schema.Boolean;
            readonly isModal: Schema.Boolean;
            readonly contentFocus: Schema.Boolean;
            readonly animation: Schema.Struct<{
                readonly id: Schema.String;
                readonly isShowing: Schema.Boolean;
                readonly transitionState: Schema.Literals<readonly ["Idle", "EnterStart", "EnterAnimating", "LeaveStart", "LeaveAnimating"]>;
                readonly transitionGeneration: Schema.Number;
            }>;
            readonly maybeLastButtonPointerType: Schema.Option<Schema.String>;
        }>;
        readonly popoverNestedChildDemo: Schema.Struct<{
            readonly id: Schema.String;
            readonly isOpen: Schema.Boolean;
            readonly isAnimated: Schema.Boolean;
            readonly isModal: Schema.Boolean;
            readonly contentFocus: Schema.Boolean;
            readonly animation: Schema.Struct<{
                readonly id: Schema.String;
                readonly isShowing: Schema.Boolean;
                readonly transitionState: Schema.Literals<readonly ["Idle", "EnterStart", "EnterAnimating", "LeaveStart", "LeaveAnimating"]>;
                readonly transitionGeneration: Schema.Number;
            }>;
            readonly maybeLastButtonPointerType: Schema.Option<Schema.String>;
        }>;
        readonly verticalRadioGroupDemo: Schema.Struct<{
            readonly id: Schema.String;
            readonly maybeFocusedIndex: Schema.Option<Schema.Number>;
        }>;
        readonly verticalRadioGroupDemoValue: Schema.Option<Schema.Literals<readonly ["Startup", "Business", "Enterprise"]>>;
        readonly horizontalRadioGroupDemo: Schema.Struct<{
            readonly id: Schema.String;
            readonly maybeFocusedIndex: Schema.Option<Schema.Number>;
        }>;
        readonly horizontalRadioGroupDemoValue: Schema.Option<Schema.Literals<readonly ["Startup", "Business", "Enterprise"]>>;
        readonly selectDemoValue: Schema.String;
        readonly sliderRatingDemo: Schema.Struct<{
            readonly id: Schema.String;
            readonly min: Schema.Number;
            readonly max: Schema.Number;
            readonly step: Schema.Number;
            readonly dragState: import("foldkit/schema").TaggedUnion<{
                readonly Idle: {};
                readonly Dragging: {
                    originValue: Schema.Number;
                };
            }>;
        }>;
        readonly sliderRatingValue: Schema.Number;
        readonly sliderVolumeDemo: Schema.Struct<{
            readonly id: Schema.String;
            readonly min: Schema.Number;
            readonly max: Schema.Number;
            readonly step: Schema.Number;
            readonly dragState: import("foldkit/schema").TaggedUnion<{
                readonly Idle: {};
                readonly Dragging: {
                    originValue: Schema.Number;
                };
            }>;
        }>;
        readonly sliderVolumeValue: Schema.Number;
        readonly isSwitchDemoChecked: Schema.Boolean;
        readonly horizontalTabsDemo: Schema.Struct<{
            readonly id: Schema.String;
            readonly maybeFocusedIndex: Schema.Option<Schema.Number>;
            readonly activationMode: Schema.Literals<readonly ["Automatic", "Manual"]>;
        }>;
        readonly horizontalTabsDemoTab: Schema.Literals<readonly ["Foldkit", "React", "Elm"]>;
        readonly verticalTabsDemo: Schema.Struct<{
            readonly id: Schema.String;
            readonly maybeFocusedIndex: Schema.Option<Schema.Number>;
            readonly activationMode: Schema.Literals<readonly ["Automatic", "Manual"]>;
        }>;
        readonly verticalTabsDemoTab: Schema.Literals<readonly ["Foldkit", "React", "Elm"]>;
        readonly dragAndDropDemo: Schema.Struct<{
            readonly id: Schema.String;
            readonly orientation: Schema.Literals<readonly ["Horizontal", "Vertical"]>;
            readonly activationThreshold: Schema.Number;
            readonly dragState: import("foldkit/schema").TaggedUnion<{
                readonly Idle: {};
                readonly Pending: {
                    itemId: Schema.String;
                    containerId: Schema.String;
                    index: Schema.Number;
                    origin: Schema.Struct<{
                        readonly screenX: Schema.Number;
                        readonly screenY: Schema.Number;
                    }>;
                };
                readonly Dragging: {
                    itemId: Schema.String;
                    sourceContainerId: Schema.String;
                    sourceIndex: Schema.Number;
                    origin: Schema.Struct<{
                        readonly screenX: Schema.Number;
                        readonly screenY: Schema.Number;
                    }>;
                    current: Schema.Struct<{
                        readonly clientX: Schema.Number;
                        readonly clientY: Schema.Number;
                    }>;
                    maybeDropTarget: Schema.Option<Schema.Struct<{
                        readonly containerId: Schema.String;
                        readonly index: Schema.Number;
                    }>>;
                };
                readonly KeyboardDragging: {
                    itemId: Schema.String;
                    sourceContainerId: Schema.String;
                    sourceIndex: Schema.Number;
                    targetContainerId: Schema.String;
                    targetIndex: Schema.Number;
                };
            }>;
        }>;
        readonly dragAndDropDemoColumns: Schema.$Array<Schema.Struct<{
            readonly id: Schema.String;
            readonly label: Schema.String;
            readonly cards: Schema.mutable<Schema.$Array<Schema.Struct<{
                readonly id: Schema.String;
                readonly label: Schema.String;
            }>>>;
        }>>;
        readonly dragAndDropDemoAnnouncement: Schema.String;
        readonly fileDropBasicDemo: Schema.Struct<{
            readonly id: Schema.String;
            readonly isDragOver: Schema.Boolean;
        }>;
        readonly fileDropBasicDemoFiles: Schema.$Array<Schema.Schema<File>>;
        readonly toastDemo: Schema.Struct<{
            readonly id: Schema.String;
            readonly defaultDuration: Schema.DurationFromMillis;
            readonly entries: Schema.$Array<Schema.Struct<{
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
            }>>;
            readonly nextEntryKey: Schema.Number;
            readonly maybeSwipeConfig: Schema.Option<Schema.Struct<{
                readonly direction: Schema.Literals<readonly ["Left", "Right"]>;
                readonly threshold: Schema.Number;
            }>>;
        }>;
        readonly maybeLastDismissedToastTitle: Schema.Option<Schema.String>;
        readonly tooltipDemo: Schema.Struct<{
            readonly id: Schema.String;
            readonly isOpen: Schema.Boolean;
            readonly isHovered: Schema.Boolean;
            readonly isFocused: Schema.Boolean;
            readonly isDismissed: Schema.Boolean;
            readonly showDelay: Schema.DurationFromMillis;
            readonly pendingShowVersion: Schema.Number;
            readonly maybeLastPointerType: Schema.Option<Schema.String>;
        }>;
        readonly hoverIntentCardDemo: Schema.Struct<{
            readonly isOpen: Schema.Boolean;
            readonly isTriggerHovered: Schema.Boolean;
            readonly isPanelHovered: Schema.Boolean;
            readonly maybeFocusLocation: Schema.Option<Schema.Literals<readonly ["Trigger", "Panel"]>>;
            readonly isDismissed: Schema.Boolean;
            readonly openDelay: Schema.DurationFromMillis;
            readonly closeDelay: Schema.DurationFromMillis;
            readonly pendingOpenVersion: Schema.Number;
            readonly pendingCloseVersion: Schema.Number;
        }>;
        readonly hoverIntentMenuDemo: Schema.Struct<{
            readonly isOpen: Schema.Boolean;
            readonly isTriggerHovered: Schema.Boolean;
            readonly isPanelHovered: Schema.Boolean;
            readonly maybeFocusLocation: Schema.Option<Schema.Literals<readonly ["Trigger", "Panel"]>>;
            readonly isDismissed: Schema.Boolean;
            readonly openDelay: Schema.DurationFromMillis;
            readonly closeDelay: Schema.DurationFromMillis;
            readonly pendingOpenVersion: Schema.Number;
            readonly pendingCloseVersion: Schema.Number;
        }>;
        readonly animationDemo: Schema.Struct<{
            readonly id: Schema.String;
            readonly isShowing: Schema.Boolean;
            readonly transitionState: Schema.Literals<readonly ["Idle", "EnterStart", "EnterAnimating", "LeaveStart", "LeaveAnimating"]>;
            readonly transitionGeneration: Schema.Number;
        }>;
        readonly virtualListDemo: Schema.Struct<{
            readonly id: Schema.String;
            readonly rowHeightPx: Schema.Number;
            readonly scrollTop: Schema.Number;
            readonly measurement: import("foldkit/schema").TaggedUnion<{
                readonly Unmeasured: {};
                readonly Measured: {
                    containerWidth: Schema.Number;
                    containerHeight: Schema.Number;
                };
            }>;
            readonly viewportAnchor: import("foldkit/schema").TaggedUnion<{
                readonly Offset: {
                    scrollTop: Schema.Number;
                };
                readonly Row: {
                    key: Schema.String;
                    index: Schema.Number;
                    viewportOffset: Schema.Number;
                };
                readonly End: {};
            }>;
            readonly measuredRowHeights: Schema.$Record<Schema.String, Schema.Number>;
            readonly layoutVersion: Schema.Number;
            readonly initialScroll: import("foldkit/schema").TaggedUnion<{
                readonly Applied: {};
                readonly Pending: {
                    target: import("foldkit/schema").TaggedUnion<{
                        readonly Index: {
                            index: Schema.Number;
                        };
                        readonly Key: {
                            key: Schema.String;
                        };
                        readonly Offset: {
                            offset: Schema.Number;
                        };
                        readonly End: {};
                    }>;
                    alignment: Schema.Literals<readonly ["Start", "Center", "End", "Nearest"]>;
                };
            }>;
            readonly endBehavior: import("foldkit/schema").TaggedUnion<{
                readonly PreserveAnchor: {};
                readonly Follow: {
                    thresholdPx: Schema.Number;
                };
            }>;
            readonly pendingScroll: import("foldkit/schema").TaggedUnion<{
                readonly Idle: {};
                readonly Pending: {
                    request: import("foldkit/schema").TaggedUnion<{
                        readonly Target: {
                            target: import("foldkit/schema").TaggedUnion<{
                                readonly Index: {
                                    index: Schema.Number;
                                };
                                readonly Key: {
                                    key: Schema.String;
                                };
                                readonly Offset: {
                                    offset: Schema.Number;
                                };
                                readonly End: {};
                            }>;
                            alignment: Schema.Literals<readonly ["Start", "Center", "End", "Nearest"]>;
                        };
                        readonly Anchor: {
                            anchor: import("foldkit/schema").TaggedUnion<{
                                readonly Offset: {
                                    scrollTop: Schema.Number;
                                };
                                readonly Row: {
                                    key: Schema.String;
                                    index: Schema.Number;
                                    viewportOffset: Schema.Number;
                                };
                                readonly End: {};
                            }>;
                        };
                    }>;
                    version: Schema.Number;
                };
            }>;
            readonly pendingScrollVersion: Schema.Number;
        }>;
        readonly virtualListVariableDemo: Schema.Struct<{
            readonly id: Schema.String;
            readonly rowHeightPx: Schema.Number;
            readonly scrollTop: Schema.Number;
            readonly measurement: import("foldkit/schema").TaggedUnion<{
                readonly Unmeasured: {};
                readonly Measured: {
                    containerWidth: Schema.Number;
                    containerHeight: Schema.Number;
                };
            }>;
            readonly viewportAnchor: import("foldkit/schema").TaggedUnion<{
                readonly Offset: {
                    scrollTop: Schema.Number;
                };
                readonly Row: {
                    key: Schema.String;
                    index: Schema.Number;
                    viewportOffset: Schema.Number;
                };
                readonly End: {};
            }>;
            readonly measuredRowHeights: Schema.$Record<Schema.String, Schema.Number>;
            readonly layoutVersion: Schema.Number;
            readonly initialScroll: import("foldkit/schema").TaggedUnion<{
                readonly Applied: {};
                readonly Pending: {
                    target: import("foldkit/schema").TaggedUnion<{
                        readonly Index: {
                            index: Schema.Number;
                        };
                        readonly Key: {
                            key: Schema.String;
                        };
                        readonly Offset: {
                            offset: Schema.Number;
                        };
                        readonly End: {};
                    }>;
                    alignment: Schema.Literals<readonly ["Start", "Center", "End", "Nearest"]>;
                };
            }>;
            readonly endBehavior: import("foldkit/schema").TaggedUnion<{
                readonly PreserveAnchor: {};
                readonly Follow: {
                    thresholdPx: Schema.Number;
                };
            }>;
            readonly pendingScroll: import("foldkit/schema").TaggedUnion<{
                readonly Idle: {};
                readonly Pending: {
                    request: import("foldkit/schema").TaggedUnion<{
                        readonly Target: {
                            target: import("foldkit/schema").TaggedUnion<{
                                readonly Index: {
                                    index: Schema.Number;
                                };
                                readonly Key: {
                                    key: Schema.String;
                                };
                                readonly Offset: {
                                    offset: Schema.Number;
                                };
                                readonly End: {};
                            }>;
                            alignment: Schema.Literals<readonly ["Start", "Center", "End", "Nearest"]>;
                        };
                        readonly Anchor: {
                            anchor: import("foldkit/schema").TaggedUnion<{
                                readonly Offset: {
                                    scrollTop: Schema.Number;
                                };
                                readonly Row: {
                                    key: Schema.String;
                                    index: Schema.Number;
                                    viewportOffset: Schema.Number;
                                };
                                readonly End: {};
                            }>;
                        };
                    }>;
                    version: Schema.Number;
                };
            }>;
            readonly pendingScrollVersion: Schema.Number;
        }>;
        readonly virtualListChatDemo: Schema.Struct<{
            readonly id: Schema.String;
            readonly rowHeightPx: Schema.Number;
            readonly scrollTop: Schema.Number;
            readonly measurement: import("foldkit/schema").TaggedUnion<{
                readonly Unmeasured: {};
                readonly Measured: {
                    containerWidth: Schema.Number;
                    containerHeight: Schema.Number;
                };
            }>;
            readonly viewportAnchor: import("foldkit/schema").TaggedUnion<{
                readonly Offset: {
                    scrollTop: Schema.Number;
                };
                readonly Row: {
                    key: Schema.String;
                    index: Schema.Number;
                    viewportOffset: Schema.Number;
                };
                readonly End: {};
            }>;
            readonly measuredRowHeights: Schema.$Record<Schema.String, Schema.Number>;
            readonly layoutVersion: Schema.Number;
            readonly initialScroll: import("foldkit/schema").TaggedUnion<{
                readonly Applied: {};
                readonly Pending: {
                    target: import("foldkit/schema").TaggedUnion<{
                        readonly Index: {
                            index: Schema.Number;
                        };
                        readonly Key: {
                            key: Schema.String;
                        };
                        readonly Offset: {
                            offset: Schema.Number;
                        };
                        readonly End: {};
                    }>;
                    alignment: Schema.Literals<readonly ["Start", "Center", "End", "Nearest"]>;
                };
            }>;
            readonly endBehavior: import("foldkit/schema").TaggedUnion<{
                readonly PreserveAnchor: {};
                readonly Follow: {
                    thresholdPx: Schema.Number;
                };
            }>;
            readonly pendingScroll: import("foldkit/schema").TaggedUnion<{
                readonly Idle: {};
                readonly Pending: {
                    request: import("foldkit/schema").TaggedUnion<{
                        readonly Target: {
                            target: import("foldkit/schema").TaggedUnion<{
                                readonly Index: {
                                    index: Schema.Number;
                                };
                                readonly Key: {
                                    key: Schema.String;
                                };
                                readonly Offset: {
                                    offset: Schema.Number;
                                };
                                readonly End: {};
                            }>;
                            alignment: Schema.Literals<readonly ["Start", "Center", "End", "Nearest"]>;
                        };
                        readonly Anchor: {
                            anchor: import("foldkit/schema").TaggedUnion<{
                                readonly Offset: {
                                    scrollTop: Schema.Number;
                                };
                                readonly Row: {
                                    key: Schema.String;
                                    index: Schema.Number;
                                    viewportOffset: Schema.Number;
                                };
                                readonly End: {};
                            }>;
                        };
                    }>;
                    version: Schema.Number;
                };
            }>;
            readonly pendingScrollVersion: Schema.Number;
        }>;
        readonly virtualListChatMessages: Schema.$Array<Schema.Struct<{
            readonly id: Schema.Number;
            readonly body: Schema.String;
            readonly isExpanded: Schema.Boolean;
        }>>;
        readonly virtualListChatNextId: Schema.Number;
        readonly virtualListChatStartProximity: import("foldkit/schema").TaggedUnion<{
            readonly Away: {};
            readonly Near: {};
        }>;
    }>;
    readonly comingFromReact: Schema.$Record<Schema.String, Schema.Boolean>;
    readonly apiReference: Schema.Struct<{
        readonly apiData: Schema.Codec<import("foldkit/asyncData").AsyncData<{
            readonly parsedApi: {
                readonly modules: readonly {
                    readonly name: string;
                    readonly functions: readonly {
                        readonly name: string;
                        readonly description: import("effect/Option").Option<string>;
                        readonly signatures: readonly {
                            readonly parameters: readonly {
                                readonly name: string;
                                readonly type: string;
                                readonly isOptional: boolean;
                                readonly isRest: boolean;
                                readonly defaultValue: import("effect/Option").Option<string>;
                                readonly description: import("effect/Option").Option<string>;
                            }[];
                            readonly returnType: string;
                            readonly typeParameters: readonly string[];
                        }[];
                        readonly sourceUrl: import("effect/Option").Option<string>;
                    }[];
                    readonly types: readonly {
                        readonly name: string;
                        readonly description: import("effect/Option").Option<string>;
                        readonly typeDefinition: string;
                        readonly sourceUrl: import("effect/Option").Option<string>;
                    }[];
                    readonly interfaces: readonly {
                        readonly name: string;
                        readonly description: import("effect/Option").Option<string>;
                        readonly typeDefinition: string;
                        readonly sourceUrl: import("effect/Option").Option<string>;
                    }[];
                    readonly variables: readonly {
                        readonly name: string;
                        readonly description: import("effect/Option").Option<string>;
                        readonly type: string;
                        readonly sourceUrl: import("effect/Option").Option<string>;
                    }[];
                }[];
            };
            readonly highlights: {
                readonly [x: string]: string;
            };
        }, string>, import("foldkit/asyncData").AsyncDataEncoded<{
            readonly parsedApi: {
                readonly modules: readonly {
                    readonly name: string;
                    readonly functions: readonly {
                        readonly name: string;
                        readonly description: string | null | undefined;
                        readonly signatures: readonly {
                            readonly parameters: readonly {
                                readonly name: string;
                                readonly type: string;
                                readonly isOptional: boolean;
                                readonly isRest: boolean;
                                readonly defaultValue: string | null | undefined;
                                readonly description: string | null | undefined;
                            }[];
                            readonly returnType: string;
                            readonly typeParameters: readonly string[];
                        }[];
                        readonly sourceUrl: string | null | undefined;
                    }[];
                    readonly types: readonly {
                        readonly name: string;
                        readonly description: string | null | undefined;
                        readonly typeDefinition: string;
                        readonly sourceUrl: string | null | undefined;
                    }[];
                    readonly interfaces: readonly {
                        readonly name: string;
                        readonly description: string | null | undefined;
                        readonly typeDefinition: string;
                        readonly sourceUrl: string | null | undefined;
                    }[];
                    readonly variables: readonly {
                        readonly name: string;
                        readonly description: string | null | undefined;
                        readonly type: string;
                        readonly sourceUrl: string | null | undefined;
                    }[];
                }[];
            };
            readonly highlights: {
                readonly [x: string]: string;
            };
        }, string>, never, never>;
        readonly disclosures: Schema.$Record<Schema.String, Schema.Boolean>;
    }>;
    readonly exampleDetail: Schema.Struct<{
        readonly sourceFileTabs: Schema.Struct<{
            readonly id: Schema.String;
            readonly maybeFocusedIndex: Schema.Option<Schema.Number>;
            readonly activationMode: Schema.Literals<readonly ["Automatic", "Manual"]>;
        }>;
        readonly maybeActiveSourceFilePath: Schema.Option<Schema.String>;
        readonly maybeExampleUrl: Schema.Option<Schema.String>;
        readonly isLivePreviewOpen: Schema.Boolean;
        readonly currentSources: Schema.Codec<import("foldkit/asyncData").AsyncData<{
            readonly files: readonly {
                readonly path: string;
                readonly highlightedHtml: string;
                readonly rawCode: string;
            }[];
        }, string>, import("foldkit/asyncData").AsyncDataEncoded<{
            readonly files: readonly {
                readonly path: string;
                readonly highlightedHtml: string;
                readonly rawCode: string;
            }[];
        }, string>, never, never>;
    }>;
    readonly search: Schema.Struct<{
        readonly dialog: Schema.Struct<{
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
        readonly query: Schema.String;
        readonly searchState: import("foldkit/schema").TaggedUnion<{
            readonly Idle: {};
            readonly Loading: {
                results: Schema.$Array<Schema.Struct<{
                    readonly url: Schema.String;
                    readonly title: Schema.String;
                    readonly excerpt: Schema.String;
                    readonly section: Schema.String;
                    readonly kind: Schema.String;
                }>>;
            };
            readonly Ok: {
                results: Schema.$Array<Schema.Struct<{
                    readonly url: Schema.String;
                    readonly title: Schema.String;
                    readonly excerpt: Schema.String;
                    readonly section: Schema.String;
                    readonly kind: Schema.String;
                }>>;
            };
        }>;
        readonly activeResultIndex: Schema.Number;
    }>;
}>;
export type Model = typeof Model.Type;
