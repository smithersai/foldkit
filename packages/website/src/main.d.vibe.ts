import { Effect, Layer, Option, Schema } from 'effect';
import { Command, ManagedResource, Runtime, Subscription, Update } from 'foldkit';
import { Message } from './message.vibe';
import { Model } from './model.vibe';
import * as Search from './search/index.ts';
export type { Message } from './message.vibe';
export { Model } from './model.vibe';
export type { TableOfContentsEntry } from './tableOfContentsEntry.ts';
export { view } from './view/application.vibe';
export type AppResources = Search.PagefindService;
export type AppManagedResources = ManagedResource.ServicesOf<typeof managedResources>;
export { type ThemePreference, type ResolvedTheme } from './message.vibe';
export declare const Flags: Schema.Struct<{
    readonly currentYear: Schema.Number;
    readonly today: Schema.Struct<{
        readonly year: Schema.Int;
        readonly month: Schema.Int;
        readonly day: Schema.Int;
    }>;
    readonly deployment: import("foldkit/schema").TaggedUnion<{
        readonly Production: {};
        readonly Canary: {
            commit: Schema.NonEmptyString;
        };
    }>;
    readonly maybeApiData: Schema.Option<Schema.Struct<{
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
    }>>;
    readonly maybeExampleSources: Schema.Option<Schema.Struct<{
        readonly files: Schema.$Array<Schema.Struct<{
            readonly path: Schema.String;
            readonly highlightedHtml: Schema.String;
            readonly rawCode: Schema.String;
        }>>;
    }>>;
}>;
type Flags = typeof Flags.Type;
export declare const init: Runtime.RoutingApplicationInit<Model, Message, Flags, AppResources, AppManagedResources>;
export declare const update: (model: Model, message: Message) => Readonly<{
    model: {
        readonly route: {
            readonly _tag: "About";
        } | {
            readonly _tag: "AiMcp";
        } | {
            readonly _tag: "AiOverview";
        } | {
            readonly _tag: "AiSkills";
        } | {
            readonly _tag: "AsyncData";
        } | {
            readonly _tag: "BestPracticesImmutability";
        } | {
            readonly _tag: "BestPracticesKeying";
        } | {
            readonly _tag: "BestPracticesMessages";
        } | {
            readonly _tag: "BestPracticesSideEffects";
        } | {
            readonly _tag: "Blog";
        } | {
            readonly _tag: "ComingFromReact";
        } | {
            readonly _tag: "ComingFromTanStackQuery";
        } | {
            readonly _tag: "Contact";
        } | {
            readonly _tag: "ContentApi";
        } | {
            readonly _tag: "CoreArchitecture";
        } | {
            readonly _tag: "CoreCanvas";
        } | {
            readonly _tag: "CoreCommands";
        } | {
            readonly _tag: "CoreCounterExample";
        } | {
            readonly _tag: "CoreCrashView";
        } | {
            readonly _tag: "CoreCustomElement";
        } | {
            readonly _tag: "CoreDevTools";
        } | {
            readonly _tag: "CoreDom";
        } | {
            readonly _tag: "CoreEmbedding";
        } | {
            readonly _tag: "CoreFile";
        } | {
            readonly _tag: "CoreFreezeModel";
        } | {
            readonly _tag: "CoreHttp";
        } | {
            readonly _tag: "CoreInitAndFlags";
        } | {
            readonly _tag: "CoreMachine";
        } | {
            readonly _tag: "CoreManagedResources";
        } | {
            readonly _tag: "CoreMessages";
        } | {
            readonly _tag: "CoreModel";
        } | {
            readonly _tag: "CoreMount";
        } | {
            readonly _tag: "CorePreserveScroll";
        } | {
            readonly _tag: "CoreQuery";
        } | {
            readonly _tag: "CoreRender";
        } | {
            readonly _tag: "CoreResources";
        } | {
            readonly _tag: "CoreRuntime";
        } | {
            readonly _tag: "CoreServerRendering";
        } | {
            readonly _tag: "CoreSlowWarnings";
        } | {
            readonly _tag: "CoreSubmodel";
        } | {
            readonly _tag: "CoreSubscriptions";
        } | {
            readonly _tag: "CoreUpdate";
        } | {
            readonly _tag: "CoreView";
        } | {
            readonly _tag: "CoreViewMemoization";
        } | {
            readonly _tag: "CoreViewTransitions";
        } | {
            readonly _tag: "EffectAtomComparison";
        } | {
            readonly _tag: "ElmComparison";
        } | {
            readonly _tag: "Examples";
        } | {
            readonly _tag: "FieldValidation";
        } | {
            readonly _tag: "GetStarted";
        } | {
            readonly _tag: "Home";
        } | {
            readonly _tag: "Newsletter";
        } | {
            readonly _tag: "PatternsAntiPatterns";
        } | {
            readonly _tag: "PatternsInformingSubmodels";
        } | {
            readonly _tag: "PatternsSubscriptionOrganization";
        } | {
            readonly _tag: "Performance";
        } | {
            readonly _tag: "Privacy";
        } | {
            readonly _tag: "ProjectOrganization";
        } | {
            readonly _tag: "ReactComparison";
        } | {
            readonly _tag: "Roadmap";
        } | {
            readonly _tag: "RoutingAndNavigation";
        } | {
            readonly _tag: "Testing";
        } | {
            readonly _tag: "TestingScene";
        } | {
            readonly _tag: "TestingStory";
        } | {
            readonly _tag: "ToolingLinting";
        } | {
            readonly _tag: "TypingTerminal";
        } | {
            readonly _tag: "UiAnchor";
        } | {
            readonly _tag: "UiAnimation";
        } | {
            readonly _tag: "UiButton";
        } | {
            readonly _tag: "UiCalendar";
        } | {
            readonly _tag: "UiCheckbox";
        } | {
            readonly _tag: "UiCombobox";
        } | {
            readonly _tag: "UiDatePicker";
        } | {
            readonly _tag: "UiDialog";
        } | {
            readonly _tag: "UiDisclosure";
        } | {
            readonly _tag: "UiDragAndDrop";
        } | {
            readonly _tag: "UiFieldset";
        } | {
            readonly _tag: "UiFileDrop";
        } | {
            readonly _tag: "UiHoverIntent";
        } | {
            readonly _tag: "UiInput";
        } | {
            readonly _tag: "UiListbox";
        } | {
            readonly _tag: "UiMenu";
        } | {
            readonly _tag: "UiMeter";
        } | {
            readonly _tag: "UiNav";
        } | {
            readonly _tag: "UiOverview";
        } | {
            readonly _tag: "UiPopover";
        } | {
            readonly _tag: "UiProgress";
        } | {
            readonly _tag: "UiRadioGroup";
        } | {
            readonly _tag: "UiSelect";
        } | {
            readonly _tag: "UiSelectionSubmodels";
        } | {
            readonly _tag: "UiSlider";
        } | {
            readonly _tag: "UiSwitch";
        } | {
            readonly _tag: "UiTabs";
        } | {
            readonly _tag: "UiTextarea";
        } | {
            readonly _tag: "UiToast";
        } | {
            readonly _tag: "UiTooltip";
        } | {
            readonly _tag: "UiVirtualList";
        } | {
            readonly _tag: "WhyFoldkit";
        } | {
            readonly _tag: "ApiModule";
            readonly moduleSlug: string;
        } | {
            readonly _tag: "BlogPost";
            readonly postSlug: string;
        } | {
            readonly _tag: "ExampleDetail";
            readonly exampleSlug: string;
        } | {
            readonly _tag: "NotFound";
            readonly path: string;
        } | {
            readonly _tag: "Playground";
            readonly exampleSlug: string;
        };
        readonly url: {
            readonly protocol: string;
            readonly host: string;
            readonly port: Option.Option<string>;
            readonly pathname: string;
            readonly search: Option.Option<string>;
            readonly hash: Option.Option<string>;
        };
        readonly deployment: {
            readonly _tag: "Production";
        } | {
            readonly _tag: "Canary";
            readonly commit: string;
        };
        readonly snippetCopy: {
            readonly copiedSnippetIds: import("effect/HashSet").HashSet<string>;
        };
        readonly snippetDisclosure: {
            readonly openDisclosureIds: import("effect/HashSet").HashSet<string>;
            readonly snippetSizes: import("effect/HashMap").HashMap<string, {
                readonly _tag: "Fits";
            } | {
                readonly _tag: "Overflows";
            }>;
        };
        readonly maybeGitHubStarCount: Option.Option<number>;
        readonly currentYear: number;
        readonly newsletterEmail: string;
        readonly mobileMenuDialog: {
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
        readonly isMobileTableOfContentsOpen: boolean;
        readonly activeSection: Option.Option<string>;
        readonly isNarrowViewport: boolean;
        readonly maybeIsPlaygroundSupported: Option.Option<boolean>;
        readonly playground: Option.Option<{
            readonly slug: string;
            readonly state: {
                readonly _tag: "Booting";
            } | {
                readonly _tag: "Idle";
            } | {
                readonly _tag: "Booted";
                readonly preview: {
                    readonly _tag: "Loaded";
                    readonly previewUrl: string;
                } | {
                    readonly _tag: "Loading";
                    readonly previewUrl: string;
                };
            } | {
                readonly _tag: "Failed";
                readonly reason: string;
            };
            readonly files: {
                readonly [x: string]: string;
            };
            readonly fileTabs: {
                readonly id: string;
                readonly maybeFocusedIndex: Option.Option<number>;
                readonly activationMode: "Automatic" | "Manual";
            };
            readonly activeFilePath: string;
            readonly dirtyPaths: readonly string[];
            readonly lastWriteError: Option.Option<string>;
        }>;
        readonly sidebarGroups: {
            readonly ai: boolean;
            readonly apiReference: boolean;
            readonly bestPractices: boolean;
            readonly blog: boolean;
            readonly comparisons: boolean;
            readonly coreConcepts: boolean;
            readonly examples: boolean;
            readonly faq: boolean;
            readonly foldkitUi: boolean;
            readonly introduction: boolean;
            readonly patterns: boolean;
            readonly testing: boolean;
            readonly tooling: boolean;
        };
        readonly coreSubmodelPage: {
            readonly isMapMessagesUnderHoodOpen: boolean;
        };
        readonly maybeHome: Option.Option<{
            readonly demoTabs: {
                readonly id: string;
                readonly maybeFocusedIndex: Option.Option<number>;
                readonly activationMode: "Automatic" | "Manual";
            };
            readonly activeDemoTab: "Architecture" | "Note Player";
            readonly playgroundMenu: {
                readonly id: string;
                readonly isOpen: boolean;
                readonly isAnimated: boolean;
                readonly isModal: boolean;
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
                readonly maybePointerOrigin: Option.Option<{
                    readonly screenX: number;
                    readonly screenY: number;
                    readonly timeStamp: number;
                }>;
            };
            readonly asyncCounterDemo: {
                readonly count: number;
                readonly isResetting: boolean;
                readonly resetDuration: number;
                readonly phase: "DurationMessage" | "DurationModel" | "DurationUpdate" | "Idle" | "IncrementMessage" | "IncrementModel" | "IncrementUpdate" | "ResetCommand" | "ResetCommandMessage" | "ResetCommandUpdate" | "ResetMessage" | "ResetModel" | "ResetUpdate";
                readonly generation: number;
                readonly messageLog: readonly string[];
            };
            readonly notePlayerDemo: {
                readonly noteInput: {
                    readonly _tag: "Invalid";
                    readonly value: string;
                    readonly errors: readonly [string, ...string[]];
                } | {
                    readonly _tag: "NotValidated";
                    readonly value: string;
                } | {
                    readonly _tag: "Valid";
                    readonly value: string;
                } | {
                    readonly _tag: "Validating";
                    readonly value: string;
                };
                readonly noteDurationRadioGroup: {
                    readonly id: string;
                    readonly maybeFocusedIndex: Option.Option<number>;
                };
                readonly noteDuration: "Long" | "Medium" | "Short";
                readonly playbackState: {
                    readonly _tag: "Idle";
                } | {
                    readonly _tag: "Paused";
                    readonly noteSequence: readonly ("A" | "B" | "C" | "D" | "E" | "F" | "G")[];
                    readonly currentNoteIndex: number;
                } | {
                    readonly _tag: "Playing";
                    readonly noteSequence: readonly ("A" | "B" | "C" | "D" | "E" | "F" | "G")[];
                    readonly currentNoteIndex: number;
                };
                readonly highlightPhase: "Idle" | "NoteCommand" | "NoteMessage" | "NoteModel" | "NoteUpdate" | "PauseMessage" | "PlayMessage" | "PlayModel" | "PlayUpdate";
                readonly generation: number;
                readonly messageLog: readonly string[];
                readonly audio: {
                    readonly _tag: "Acquiring";
                } | {
                    readonly _tag: "Ready";
                } | {
                    readonly _tag: "Unavailable";
                };
            };
        }>;
        readonly themeMenu: {
            readonly id: string;
            readonly isOpen: boolean;
            readonly isAnimated: boolean;
            readonly isModal: boolean;
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
            readonly maybePointerOrigin: Option.Option<{
                readonly screenX: number;
                readonly screenY: number;
                readonly timeStamp: number;
            }>;
        };
        readonly maybeThemePreference: Option.Option<"Dark" | "Light" | "System">;
        readonly systemTheme: "Dark" | "Light";
        readonly resolvedTheme: "Dark" | "Light";
        readonly uiPages: {
            readonly buttonClickCount: number;
            readonly inputDemoValue: string;
            readonly textareaDemoValue: string;
            readonly fieldsetInputValue: string;
            readonly fieldsetTextareaValue: string;
            readonly isFieldsetCheckboxDemoChecked: boolean;
            readonly calendarBasicDemo: {
                readonly id: string;
                readonly today: {
                    readonly year: number;
                    readonly month: number;
                    readonly day: number;
                };
                readonly viewYear: number;
                readonly viewMonth: number;
                readonly viewMode: "Days" | "Months" | "Years";
                readonly maybeFocusedDate: Option.Option<{
                    readonly year: number;
                    readonly month: number;
                    readonly day: number;
                }>;
                readonly isGridFocused: boolean;
                readonly locale: {
                    readonly firstDayOfWeek: "Friday" | "Monday" | "Saturday" | "Sunday" | "Thursday" | "Tuesday" | "Wednesday";
                    readonly monthNames: readonly [string, string, string, string, string, string, string, string, string, string, string, string];
                    readonly shortMonthNames: readonly [string, string, string, string, string, string, string, string, string, string, string, string];
                    readonly dayNames: readonly [string, string, string, string, string, string, string];
                    readonly shortDayNames: readonly [string, string, string, string, string, string, string];
                    readonly longFormat: readonly [{
                        readonly _tag: "DayName";
                    } | {
                        readonly _tag: "DayNumber";
                    } | {
                        readonly _tag: "MonthName";
                    } | {
                        readonly _tag: "MonthNumber";
                    } | {
                        readonly _tag: "PaddedDayNumber";
                    } | {
                        readonly _tag: "PaddedMonthNumber";
                    } | {
                        readonly _tag: "ShortDayName";
                    } | {
                        readonly _tag: "ShortMonthName";
                    } | {
                        readonly _tag: "YearNumber";
                    } | {
                        readonly _tag: "LiteralText";
                        readonly text: string;
                    }, ...({
                        readonly _tag: "DayName";
                    } | {
                        readonly _tag: "DayNumber";
                    } | {
                        readonly _tag: "MonthName";
                    } | {
                        readonly _tag: "MonthNumber";
                    } | {
                        readonly _tag: "PaddedDayNumber";
                    } | {
                        readonly _tag: "PaddedMonthNumber";
                    } | {
                        readonly _tag: "ShortDayName";
                    } | {
                        readonly _tag: "ShortMonthName";
                    } | {
                        readonly _tag: "YearNumber";
                    } | {
                        readonly _tag: "LiteralText";
                        readonly text: string;
                    })[]];
                    readonly shortFormat: readonly [{
                        readonly _tag: "DayName";
                    } | {
                        readonly _tag: "DayNumber";
                    } | {
                        readonly _tag: "MonthName";
                    } | {
                        readonly _tag: "MonthNumber";
                    } | {
                        readonly _tag: "PaddedDayNumber";
                    } | {
                        readonly _tag: "PaddedMonthNumber";
                    } | {
                        readonly _tag: "ShortDayName";
                    } | {
                        readonly _tag: "ShortMonthName";
                    } | {
                        readonly _tag: "YearNumber";
                    } | {
                        readonly _tag: "LiteralText";
                        readonly text: string;
                    }, ...({
                        readonly _tag: "DayName";
                    } | {
                        readonly _tag: "DayNumber";
                    } | {
                        readonly _tag: "MonthName";
                    } | {
                        readonly _tag: "MonthNumber";
                    } | {
                        readonly _tag: "PaddedDayNumber";
                    } | {
                        readonly _tag: "PaddedMonthNumber";
                    } | {
                        readonly _tag: "ShortDayName";
                    } | {
                        readonly _tag: "ShortMonthName";
                    } | {
                        readonly _tag: "YearNumber";
                    } | {
                        readonly _tag: "LiteralText";
                        readonly text: string;
                    })[]];
                    readonly ariaLabelFormat: readonly [{
                        readonly _tag: "DayName";
                    } | {
                        readonly _tag: "DayNumber";
                    } | {
                        readonly _tag: "MonthName";
                    } | {
                        readonly _tag: "MonthNumber";
                    } | {
                        readonly _tag: "PaddedDayNumber";
                    } | {
                        readonly _tag: "PaddedMonthNumber";
                    } | {
                        readonly _tag: "ShortDayName";
                    } | {
                        readonly _tag: "ShortMonthName";
                    } | {
                        readonly _tag: "YearNumber";
                    } | {
                        readonly _tag: "LiteralText";
                        readonly text: string;
                    }, ...({
                        readonly _tag: "DayName";
                    } | {
                        readonly _tag: "DayNumber";
                    } | {
                        readonly _tag: "MonthName";
                    } | {
                        readonly _tag: "MonthNumber";
                    } | {
                        readonly _tag: "PaddedDayNumber";
                    } | {
                        readonly _tag: "PaddedMonthNumber";
                    } | {
                        readonly _tag: "ShortDayName";
                    } | {
                        readonly _tag: "ShortMonthName";
                    } | {
                        readonly _tag: "YearNumber";
                    } | {
                        readonly _tag: "LiteralText";
                        readonly text: string;
                    })[]];
                    readonly monthYearFormat: readonly [{
                        readonly _tag: "MonthName";
                    } | {
                        readonly _tag: "MonthNumber";
                    } | {
                        readonly _tag: "PaddedMonthNumber";
                    } | {
                        readonly _tag: "ShortMonthName";
                    } | {
                        readonly _tag: "YearNumber";
                    } | {
                        readonly _tag: "LiteralText";
                        readonly text: string;
                    }, ...({
                        readonly _tag: "MonthName";
                    } | {
                        readonly _tag: "MonthNumber";
                    } | {
                        readonly _tag: "PaddedMonthNumber";
                    } | {
                        readonly _tag: "ShortMonthName";
                    } | {
                        readonly _tag: "YearNumber";
                    } | {
                        readonly _tag: "LiteralText";
                        readonly text: string;
                    })[]];
                };
                readonly maybeMinDate: Option.Option<{
                    readonly year: number;
                    readonly month: number;
                    readonly day: number;
                }>;
                readonly maybeMaxDate: Option.Option<{
                    readonly year: number;
                    readonly month: number;
                    readonly day: number;
                }>;
                readonly disabledDaysOfWeek: readonly ("Friday" | "Monday" | "Saturday" | "Sunday" | "Thursday" | "Tuesday" | "Wednesday")[];
                readonly disabledDates: readonly {
                    readonly year: number;
                    readonly month: number;
                    readonly day: number;
                }[];
            };
            readonly maybeCalendarBasicDemoSelectedDate: Option.Option<{
                readonly year: number;
                readonly month: number;
                readonly day: number;
            }>;
            readonly datePickerBasicDemo: {
                readonly id: string;
                readonly calendar: {
                    readonly id: string;
                    readonly today: {
                        readonly year: number;
                        readonly month: number;
                        readonly day: number;
                    };
                    readonly viewYear: number;
                    readonly viewMonth: number;
                    readonly viewMode: "Days" | "Months" | "Years";
                    readonly maybeFocusedDate: Option.Option<{
                        readonly year: number;
                        readonly month: number;
                        readonly day: number;
                    }>;
                    readonly isGridFocused: boolean;
                    readonly locale: {
                        readonly firstDayOfWeek: "Friday" | "Monday" | "Saturday" | "Sunday" | "Thursday" | "Tuesday" | "Wednesday";
                        readonly monthNames: readonly [string, string, string, string, string, string, string, string, string, string, string, string];
                        readonly shortMonthNames: readonly [string, string, string, string, string, string, string, string, string, string, string, string];
                        readonly dayNames: readonly [string, string, string, string, string, string, string];
                        readonly shortDayNames: readonly [string, string, string, string, string, string, string];
                        readonly longFormat: readonly [{
                            readonly _tag: "DayName";
                        } | {
                            readonly _tag: "DayNumber";
                        } | {
                            readonly _tag: "MonthName";
                        } | {
                            readonly _tag: "MonthNumber";
                        } | {
                            readonly _tag: "PaddedDayNumber";
                        } | {
                            readonly _tag: "PaddedMonthNumber";
                        } | {
                            readonly _tag: "ShortDayName";
                        } | {
                            readonly _tag: "ShortMonthName";
                        } | {
                            readonly _tag: "YearNumber";
                        } | {
                            readonly _tag: "LiteralText";
                            readonly text: string;
                        }, ...({
                            readonly _tag: "DayName";
                        } | {
                            readonly _tag: "DayNumber";
                        } | {
                            readonly _tag: "MonthName";
                        } | {
                            readonly _tag: "MonthNumber";
                        } | {
                            readonly _tag: "PaddedDayNumber";
                        } | {
                            readonly _tag: "PaddedMonthNumber";
                        } | {
                            readonly _tag: "ShortDayName";
                        } | {
                            readonly _tag: "ShortMonthName";
                        } | {
                            readonly _tag: "YearNumber";
                        } | {
                            readonly _tag: "LiteralText";
                            readonly text: string;
                        })[]];
                        readonly shortFormat: readonly [{
                            readonly _tag: "DayName";
                        } | {
                            readonly _tag: "DayNumber";
                        } | {
                            readonly _tag: "MonthName";
                        } | {
                            readonly _tag: "MonthNumber";
                        } | {
                            readonly _tag: "PaddedDayNumber";
                        } | {
                            readonly _tag: "PaddedMonthNumber";
                        } | {
                            readonly _tag: "ShortDayName";
                        } | {
                            readonly _tag: "ShortMonthName";
                        } | {
                            readonly _tag: "YearNumber";
                        } | {
                            readonly _tag: "LiteralText";
                            readonly text: string;
                        }, ...({
                            readonly _tag: "DayName";
                        } | {
                            readonly _tag: "DayNumber";
                        } | {
                            readonly _tag: "MonthName";
                        } | {
                            readonly _tag: "MonthNumber";
                        } | {
                            readonly _tag: "PaddedDayNumber";
                        } | {
                            readonly _tag: "PaddedMonthNumber";
                        } | {
                            readonly _tag: "ShortDayName";
                        } | {
                            readonly _tag: "ShortMonthName";
                        } | {
                            readonly _tag: "YearNumber";
                        } | {
                            readonly _tag: "LiteralText";
                            readonly text: string;
                        })[]];
                        readonly ariaLabelFormat: readonly [{
                            readonly _tag: "DayName";
                        } | {
                            readonly _tag: "DayNumber";
                        } | {
                            readonly _tag: "MonthName";
                        } | {
                            readonly _tag: "MonthNumber";
                        } | {
                            readonly _tag: "PaddedDayNumber";
                        } | {
                            readonly _tag: "PaddedMonthNumber";
                        } | {
                            readonly _tag: "ShortDayName";
                        } | {
                            readonly _tag: "ShortMonthName";
                        } | {
                            readonly _tag: "YearNumber";
                        } | {
                            readonly _tag: "LiteralText";
                            readonly text: string;
                        }, ...({
                            readonly _tag: "DayName";
                        } | {
                            readonly _tag: "DayNumber";
                        } | {
                            readonly _tag: "MonthName";
                        } | {
                            readonly _tag: "MonthNumber";
                        } | {
                            readonly _tag: "PaddedDayNumber";
                        } | {
                            readonly _tag: "PaddedMonthNumber";
                        } | {
                            readonly _tag: "ShortDayName";
                        } | {
                            readonly _tag: "ShortMonthName";
                        } | {
                            readonly _tag: "YearNumber";
                        } | {
                            readonly _tag: "LiteralText";
                            readonly text: string;
                        })[]];
                        readonly monthYearFormat: readonly [{
                            readonly _tag: "MonthName";
                        } | {
                            readonly _tag: "MonthNumber";
                        } | {
                            readonly _tag: "PaddedMonthNumber";
                        } | {
                            readonly _tag: "ShortMonthName";
                        } | {
                            readonly _tag: "YearNumber";
                        } | {
                            readonly _tag: "LiteralText";
                            readonly text: string;
                        }, ...({
                            readonly _tag: "MonthName";
                        } | {
                            readonly _tag: "MonthNumber";
                        } | {
                            readonly _tag: "PaddedMonthNumber";
                        } | {
                            readonly _tag: "ShortMonthName";
                        } | {
                            readonly _tag: "YearNumber";
                        } | {
                            readonly _tag: "LiteralText";
                            readonly text: string;
                        })[]];
                    };
                    readonly maybeMinDate: Option.Option<{
                        readonly year: number;
                        readonly month: number;
                        readonly day: number;
                    }>;
                    readonly maybeMaxDate: Option.Option<{
                        readonly year: number;
                        readonly month: number;
                        readonly day: number;
                    }>;
                    readonly disabledDaysOfWeek: readonly ("Friday" | "Monday" | "Saturday" | "Sunday" | "Thursday" | "Tuesday" | "Wednesday")[];
                    readonly disabledDates: readonly {
                        readonly year: number;
                        readonly month: number;
                        readonly day: number;
                    }[];
                };
                readonly popover: {
                    readonly id: string;
                    readonly isOpen: boolean;
                    readonly isAnimated: boolean;
                    readonly isModal: boolean;
                    readonly contentFocus: boolean;
                    readonly animation: {
                        readonly id: string;
                        readonly isShowing: boolean;
                        readonly transitionState: "EnterAnimating" | "EnterStart" | "Idle" | "LeaveAnimating" | "LeaveStart";
                        readonly transitionGeneration: number;
                    };
                    readonly maybeLastButtonPointerType: Option.Option<string>;
                };
            };
            readonly maybeDatePickerBasicDemoSelectedDate: Option.Option<{
                readonly year: number;
                readonly month: number;
                readonly day: number;
            }>;
            readonly isCheckboxBasicDemoChecked: boolean;
            readonly isCheckboxOptionADemoChecked: boolean;
            readonly isCheckboxOptionBDemoChecked: boolean;
            readonly comboboxDemo: {
                readonly id: string;
                readonly isOpen: boolean;
                readonly isAnimated: boolean;
                readonly isModal: boolean;
                readonly nullable: boolean;
                readonly immediate: boolean;
                readonly selectInputOnFocus: boolean;
                readonly animation: {
                    readonly id: string;
                    readonly isShowing: boolean;
                    readonly transitionState: "EnterAnimating" | "EnterStart" | "Idle" | "LeaveAnimating" | "LeaveStart";
                    readonly transitionGeneration: number;
                };
                readonly maybeActiveItemIndex: Option.Option<number>;
                readonly activationTrigger: "Keyboard" | "Pointer";
                readonly inputValue: string;
                readonly maybeLastPointerPosition: Option.Option<{
                    readonly screenX: number;
                    readonly screenY: number;
                }>;
            };
            readonly maybeComboboxDemoSelectedCity: Option.Option<"Johannesburg" | "Kyiv" | "Oxford" | "Plymouth" | "Quito" | "Wellington" | "Zurich">;
            readonly comboboxPlacementLockDemo: {
                readonly id: string;
                readonly isOpen: boolean;
                readonly isAnimated: boolean;
                readonly isModal: boolean;
                readonly nullable: boolean;
                readonly immediate: boolean;
                readonly selectInputOnFocus: boolean;
                readonly animation: {
                    readonly id: string;
                    readonly isShowing: boolean;
                    readonly transitionState: "EnterAnimating" | "EnterStart" | "Idle" | "LeaveAnimating" | "LeaveStart";
                    readonly transitionGeneration: number;
                };
                readonly maybeActiveItemIndex: Option.Option<number>;
                readonly activationTrigger: "Keyboard" | "Pointer";
                readonly inputValue: string;
                readonly maybeLastPointerPosition: Option.Option<{
                    readonly screenX: number;
                    readonly screenY: number;
                }>;
            };
            readonly maybeComboboxPlacementLockDemoSelectedCity: Option.Option<"Johannesburg" | "Kyiv" | "Oxford" | "Plymouth" | "Quito" | "Wellington" | "Zurich">;
            readonly comboboxNullableDemo: {
                readonly id: string;
                readonly isOpen: boolean;
                readonly isAnimated: boolean;
                readonly isModal: boolean;
                readonly nullable: boolean;
                readonly immediate: boolean;
                readonly selectInputOnFocus: boolean;
                readonly animation: {
                    readonly id: string;
                    readonly isShowing: boolean;
                    readonly transitionState: "EnterAnimating" | "EnterStart" | "Idle" | "LeaveAnimating" | "LeaveStart";
                    readonly transitionGeneration: number;
                };
                readonly maybeActiveItemIndex: Option.Option<number>;
                readonly activationTrigger: "Keyboard" | "Pointer";
                readonly inputValue: string;
                readonly maybeLastPointerPosition: Option.Option<{
                    readonly screenX: number;
                    readonly screenY: number;
                }>;
            };
            readonly maybeComboboxNullableDemoSelectedCity: Option.Option<"Johannesburg" | "Kyiv" | "Oxford" | "Plymouth" | "Quito" | "Wellington" | "Zurich">;
            readonly comboboxMultiDemo: {
                readonly id: string;
                readonly isOpen: boolean;
                readonly isAnimated: boolean;
                readonly isModal: boolean;
                readonly nullable: boolean;
                readonly immediate: boolean;
                readonly selectInputOnFocus: boolean;
                readonly animation: {
                    readonly id: string;
                    readonly isShowing: boolean;
                    readonly transitionState: "EnterAnimating" | "EnterStart" | "Idle" | "LeaveAnimating" | "LeaveStart";
                    readonly transitionGeneration: number;
                };
                readonly maybeActiveItemIndex: Option.Option<number>;
                readonly activationTrigger: "Keyboard" | "Pointer";
                readonly inputValue: string;
                readonly maybeLastPointerPosition: Option.Option<{
                    readonly screenX: number;
                    readonly screenY: number;
                }>;
            };
            readonly comboboxMultiDemoSelectedCities: readonly ("Johannesburg" | "Kyiv" | "Oxford" | "Plymouth" | "Quito" | "Wellington" | "Zurich")[];
            readonly comboboxSelectOnFocusDemo: {
                readonly id: string;
                readonly isOpen: boolean;
                readonly isAnimated: boolean;
                readonly isModal: boolean;
                readonly nullable: boolean;
                readonly immediate: boolean;
                readonly selectInputOnFocus: boolean;
                readonly animation: {
                    readonly id: string;
                    readonly isShowing: boolean;
                    readonly transitionState: "EnterAnimating" | "EnterStart" | "Idle" | "LeaveAnimating" | "LeaveStart";
                    readonly transitionGeneration: number;
                };
                readonly maybeActiveItemIndex: Option.Option<number>;
                readonly activationTrigger: "Keyboard" | "Pointer";
                readonly inputValue: string;
                readonly maybeLastPointerPosition: Option.Option<{
                    readonly screenX: number;
                    readonly screenY: number;
                }>;
            };
            readonly maybeComboboxSelectOnFocusDemoSelectedCity: Option.Option<"Johannesburg" | "Kyiv" | "Oxford" | "Plymouth" | "Quito" | "Wellington" | "Zurich">;
            readonly dialogDemo: {
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
            readonly dialogAnimatedDemo: {
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
            readonly overlayDialogDemo: {
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
            readonly overlayComboboxDemo: {
                readonly id: string;
                readonly isOpen: boolean;
                readonly isAnimated: boolean;
                readonly isModal: boolean;
                readonly nullable: boolean;
                readonly immediate: boolean;
                readonly selectInputOnFocus: boolean;
                readonly animation: {
                    readonly id: string;
                    readonly isShowing: boolean;
                    readonly transitionState: "EnterAnimating" | "EnterStart" | "Idle" | "LeaveAnimating" | "LeaveStart";
                    readonly transitionGeneration: number;
                };
                readonly maybeActiveItemIndex: Option.Option<number>;
                readonly activationTrigger: "Keyboard" | "Pointer";
                readonly inputValue: string;
                readonly maybeLastPointerPosition: Option.Option<{
                    readonly screenX: number;
                    readonly screenY: number;
                }>;
            };
            readonly maybeOverlayComboboxDemoSelectedCity: Option.Option<"Johannesburg" | "Kyiv" | "Oxford" | "Plymouth" | "Quito" | "Wellington" | "Zurich">;
            readonly nestedDialogParentDemo: {
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
            readonly nestedDialogChildDemo: {
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
            readonly isDisclosureDemoOpen: boolean;
            readonly isDisclosureCollapsedPreviewDemoOpen: boolean;
            readonly listboxDemo: {
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
            readonly maybeListboxDemoSelectedItem: Option.Option<"Buster Bluth" | "George Michael" | "Gob Bluth" | "Lindsay Funke" | "Lucille Bluth" | "Maeby Funke" | "Michael Bluth" | "Tobias Funke">;
            readonly listboxMultiDemo: {
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
            readonly listboxMultiDemoSelectedItems: readonly ("Buster Bluth" | "George Michael" | "Gob Bluth" | "Lindsay Funke" | "Lucille Bluth" | "Maeby Funke" | "Michael Bluth" | "Tobias Funke")[];
            readonly listboxGroupedDemo: {
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
            readonly maybeListboxGroupedDemoSelectedItem: Option.Option<string>;
            readonly menuBasicDemo: {
                readonly id: string;
                readonly isOpen: boolean;
                readonly isAnimated: boolean;
                readonly isModal: boolean;
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
                readonly maybePointerOrigin: Option.Option<{
                    readonly screenX: number;
                    readonly screenY: number;
                    readonly timeStamp: number;
                }>;
            };
            readonly menuAnimatedDemo: {
                readonly id: string;
                readonly isOpen: boolean;
                readonly isAnimated: boolean;
                readonly isModal: boolean;
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
                readonly maybePointerOrigin: Option.Option<{
                    readonly screenX: number;
                    readonly screenY: number;
                    readonly timeStamp: number;
                }>;
            };
            readonly popoverBasicDemo: {
                readonly id: string;
                readonly isOpen: boolean;
                readonly isAnimated: boolean;
                readonly isModal: boolean;
                readonly contentFocus: boolean;
                readonly animation: {
                    readonly id: string;
                    readonly isShowing: boolean;
                    readonly transitionState: "EnterAnimating" | "EnterStart" | "Idle" | "LeaveAnimating" | "LeaveStart";
                    readonly transitionGeneration: number;
                };
                readonly maybeLastButtonPointerType: Option.Option<string>;
            };
            readonly popoverAnimatedDemo: {
                readonly id: string;
                readonly isOpen: boolean;
                readonly isAnimated: boolean;
                readonly isModal: boolean;
                readonly contentFocus: boolean;
                readonly animation: {
                    readonly id: string;
                    readonly isShowing: boolean;
                    readonly transitionState: "EnterAnimating" | "EnterStart" | "Idle" | "LeaveAnimating" | "LeaveStart";
                    readonly transitionGeneration: number;
                };
                readonly maybeLastButtonPointerType: Option.Option<string>;
            };
            readonly popoverArrowDemo: {
                readonly id: string;
                readonly isOpen: boolean;
                readonly isAnimated: boolean;
                readonly isModal: boolean;
                readonly contentFocus: boolean;
                readonly animation: {
                    readonly id: string;
                    readonly isShowing: boolean;
                    readonly transitionState: "EnterAnimating" | "EnterStart" | "Idle" | "LeaveAnimating" | "LeaveStart";
                    readonly transitionGeneration: number;
                };
                readonly maybeLastButtonPointerType: Option.Option<string>;
            };
            readonly popoverNestedParentDemo: {
                readonly id: string;
                readonly isOpen: boolean;
                readonly isAnimated: boolean;
                readonly isModal: boolean;
                readonly contentFocus: boolean;
                readonly animation: {
                    readonly id: string;
                    readonly isShowing: boolean;
                    readonly transitionState: "EnterAnimating" | "EnterStart" | "Idle" | "LeaveAnimating" | "LeaveStart";
                    readonly transitionGeneration: number;
                };
                readonly maybeLastButtonPointerType: Option.Option<string>;
            };
            readonly popoverNestedChildDemo: {
                readonly id: string;
                readonly isOpen: boolean;
                readonly isAnimated: boolean;
                readonly isModal: boolean;
                readonly contentFocus: boolean;
                readonly animation: {
                    readonly id: string;
                    readonly isShowing: boolean;
                    readonly transitionState: "EnterAnimating" | "EnterStart" | "Idle" | "LeaveAnimating" | "LeaveStart";
                    readonly transitionGeneration: number;
                };
                readonly maybeLastButtonPointerType: Option.Option<string>;
            };
            readonly verticalRadioGroupDemo: {
                readonly id: string;
                readonly maybeFocusedIndex: Option.Option<number>;
            };
            readonly verticalRadioGroupDemoValue: Option.Option<"Business" | "Enterprise" | "Startup">;
            readonly horizontalRadioGroupDemo: {
                readonly id: string;
                readonly maybeFocusedIndex: Option.Option<number>;
            };
            readonly horizontalRadioGroupDemoValue: Option.Option<"Business" | "Enterprise" | "Startup">;
            readonly selectDemoValue: string;
            readonly sliderRatingDemo: {
                readonly id: string;
                readonly min: number;
                readonly max: number;
                readonly step: number;
                readonly dragState: {
                    readonly _tag: "Idle";
                } | {
                    readonly _tag: "Dragging";
                    readonly originValue: number;
                };
            };
            readonly sliderRatingValue: number;
            readonly sliderVolumeDemo: {
                readonly id: string;
                readonly min: number;
                readonly max: number;
                readonly step: number;
                readonly dragState: {
                    readonly _tag: "Idle";
                } | {
                    readonly _tag: "Dragging";
                    readonly originValue: number;
                };
            };
            readonly sliderVolumeValue: number;
            readonly isSwitchDemoChecked: boolean;
            readonly horizontalTabsDemo: {
                readonly id: string;
                readonly maybeFocusedIndex: Option.Option<number>;
                readonly activationMode: "Automatic" | "Manual";
            };
            readonly horizontalTabsDemoTab: "Elm" | "Foldkit" | "React";
            readonly verticalTabsDemo: {
                readonly id: string;
                readonly maybeFocusedIndex: Option.Option<number>;
                readonly activationMode: "Automatic" | "Manual";
            };
            readonly verticalTabsDemoTab: "Elm" | "Foldkit" | "React";
            readonly dragAndDropDemo: {
                readonly id: string;
                readonly orientation: "Horizontal" | "Vertical";
                readonly activationThreshold: number;
                readonly dragState: {
                    readonly _tag: "Idle";
                } | {
                    readonly _tag: "Dragging";
                    readonly itemId: string;
                    readonly sourceContainerId: string;
                    readonly sourceIndex: number;
                    readonly origin: {
                        readonly screenX: number;
                        readonly screenY: number;
                    };
                    readonly current: {
                        readonly clientX: number;
                        readonly clientY: number;
                    };
                    readonly maybeDropTarget: Option.Option<{
                        readonly containerId: string;
                        readonly index: number;
                    }>;
                } | {
                    readonly _tag: "KeyboardDragging";
                    readonly itemId: string;
                    readonly sourceContainerId: string;
                    readonly sourceIndex: number;
                    readonly targetContainerId: string;
                    readonly targetIndex: number;
                } | {
                    readonly _tag: "Pending";
                    readonly itemId: string;
                    readonly containerId: string;
                    readonly index: number;
                    readonly origin: {
                        readonly screenX: number;
                        readonly screenY: number;
                    };
                };
            };
            readonly dragAndDropDemoColumns: readonly {
                readonly id: string;
                readonly label: string;
                readonly cards: {
                    readonly id: string;
                    readonly label: string;
                }[];
            }[];
            readonly dragAndDropDemoAnnouncement: string;
            readonly fileDropBasicDemo: {
                readonly id: string;
                readonly isDragOver: boolean;
            };
            readonly fileDropBasicDemoFiles: readonly File[];
            readonly toastDemo: {
                readonly id: string;
                readonly defaultDuration: import("effect/Duration").Duration;
                readonly entries: readonly {
                    readonly id: string;
                    readonly variant: "Error" | "Info" | "Success" | "Warning";
                    readonly animation: {
                        readonly id: string;
                        readonly isShowing: boolean;
                        readonly transitionState: "EnterAnimating" | "EnterStart" | "Idle" | "LeaveAnimating" | "LeaveStart";
                        readonly transitionGeneration: number;
                    };
                    readonly maybeDuration: Option.Option<import("effect/Duration").Duration>;
                    readonly pendingDismissVersion: number;
                    readonly isHovered: boolean;
                    readonly swipeState: {
                        readonly _tag: "Idle";
                    } | {
                        readonly _tag: "Dismissing";
                        readonly offsetX: number;
                        readonly direction: "Left" | "Right";
                    } | {
                        readonly _tag: "Dragging";
                        readonly pointerId: number;
                        readonly startX: number;
                        readonly currentX: number;
                    } | {
                        readonly _tag: "Settling";
                        readonly offsetX: number;
                    };
                    readonly swipeVersion: number;
                    readonly payload: {
                        readonly title: string;
                        readonly maybeDescription: Option.Option<string>;
                    };
                }[];
                readonly nextEntryKey: number;
                readonly maybeSwipeConfig: Option.Option<{
                    readonly direction: "Left" | "Right";
                    readonly threshold: number;
                }>;
            };
            readonly maybeLastDismissedToastTitle: Option.Option<string>;
            readonly tooltipDemo: {
                readonly id: string;
                readonly isOpen: boolean;
                readonly isHovered: boolean;
                readonly isFocused: boolean;
                readonly isDismissed: boolean;
                readonly showDelay: import("effect/Duration").Duration;
                readonly pendingShowVersion: number;
                readonly maybeLastPointerType: Option.Option<string>;
            };
            readonly hoverIntentCardDemo: {
                readonly isOpen: boolean;
                readonly isTriggerHovered: boolean;
                readonly isPanelHovered: boolean;
                readonly maybeFocusLocation: Option.Option<"Panel" | "Trigger">;
                readonly isDismissed: boolean;
                readonly openDelay: import("effect/Duration").Duration;
                readonly closeDelay: import("effect/Duration").Duration;
                readonly pendingOpenVersion: number;
                readonly pendingCloseVersion: number;
            };
            readonly hoverIntentMenuDemo: {
                readonly isOpen: boolean;
                readonly isTriggerHovered: boolean;
                readonly isPanelHovered: boolean;
                readonly maybeFocusLocation: Option.Option<"Panel" | "Trigger">;
                readonly isDismissed: boolean;
                readonly openDelay: import("effect/Duration").Duration;
                readonly closeDelay: import("effect/Duration").Duration;
                readonly pendingOpenVersion: number;
                readonly pendingCloseVersion: number;
            };
            readonly animationDemo: {
                readonly id: string;
                readonly isShowing: boolean;
                readonly transitionState: "EnterAnimating" | "EnterStart" | "Idle" | "LeaveAnimating" | "LeaveStart";
                readonly transitionGeneration: number;
            };
            readonly virtualListDemo: {
                readonly id: string;
                readonly rowHeightPx: number;
                readonly scrollTop: number;
                readonly measurement: {
                    readonly _tag: "Unmeasured";
                } | {
                    readonly _tag: "Measured";
                    readonly containerWidth: number;
                    readonly containerHeight: number;
                };
                readonly viewportAnchor: {
                    readonly _tag: "End";
                } | {
                    readonly _tag: "Offset";
                    readonly scrollTop: number;
                } | {
                    readonly _tag: "Row";
                    readonly key: string;
                    readonly index: number;
                    readonly viewportOffset: number;
                };
                readonly measuredRowHeights: {
                    readonly [x: string]: number;
                };
                readonly layoutVersion: number;
                readonly initialScroll: {
                    readonly _tag: "Applied";
                } | {
                    readonly _tag: "Pending";
                    readonly target: {
                        readonly _tag: "End";
                    } | {
                        readonly _tag: "Index";
                        readonly index: number;
                    } | {
                        readonly _tag: "Key";
                        readonly key: string;
                    } | {
                        readonly _tag: "Offset";
                        readonly offset: number;
                    };
                    readonly alignment: "Center" | "End" | "Nearest" | "Start";
                };
                readonly endBehavior: {
                    readonly _tag: "PreserveAnchor";
                } | {
                    readonly _tag: "Follow";
                    readonly thresholdPx: number;
                };
                readonly pendingScroll: {
                    readonly _tag: "Idle";
                } | {
                    readonly _tag: "Pending";
                    readonly request: {
                        readonly _tag: "Anchor";
                        readonly anchor: {
                            readonly _tag: "End";
                        } | {
                            readonly _tag: "Offset";
                            readonly scrollTop: number;
                        } | {
                            readonly _tag: "Row";
                            readonly key: string;
                            readonly index: number;
                            readonly viewportOffset: number;
                        };
                    } | {
                        readonly _tag: "Target";
                        readonly target: {
                            readonly _tag: "End";
                        } | {
                            readonly _tag: "Index";
                            readonly index: number;
                        } | {
                            readonly _tag: "Key";
                            readonly key: string;
                        } | {
                            readonly _tag: "Offset";
                            readonly offset: number;
                        };
                        readonly alignment: "Center" | "End" | "Nearest" | "Start";
                    };
                    readonly version: number;
                };
                readonly pendingScrollVersion: number;
            };
            readonly virtualListVariableDemo: {
                readonly id: string;
                readonly rowHeightPx: number;
                readonly scrollTop: number;
                readonly measurement: {
                    readonly _tag: "Unmeasured";
                } | {
                    readonly _tag: "Measured";
                    readonly containerWidth: number;
                    readonly containerHeight: number;
                };
                readonly viewportAnchor: {
                    readonly _tag: "End";
                } | {
                    readonly _tag: "Offset";
                    readonly scrollTop: number;
                } | {
                    readonly _tag: "Row";
                    readonly key: string;
                    readonly index: number;
                    readonly viewportOffset: number;
                };
                readonly measuredRowHeights: {
                    readonly [x: string]: number;
                };
                readonly layoutVersion: number;
                readonly initialScroll: {
                    readonly _tag: "Applied";
                } | {
                    readonly _tag: "Pending";
                    readonly target: {
                        readonly _tag: "End";
                    } | {
                        readonly _tag: "Index";
                        readonly index: number;
                    } | {
                        readonly _tag: "Key";
                        readonly key: string;
                    } | {
                        readonly _tag: "Offset";
                        readonly offset: number;
                    };
                    readonly alignment: "Center" | "End" | "Nearest" | "Start";
                };
                readonly endBehavior: {
                    readonly _tag: "PreserveAnchor";
                } | {
                    readonly _tag: "Follow";
                    readonly thresholdPx: number;
                };
                readonly pendingScroll: {
                    readonly _tag: "Idle";
                } | {
                    readonly _tag: "Pending";
                    readonly request: {
                        readonly _tag: "Anchor";
                        readonly anchor: {
                            readonly _tag: "End";
                        } | {
                            readonly _tag: "Offset";
                            readonly scrollTop: number;
                        } | {
                            readonly _tag: "Row";
                            readonly key: string;
                            readonly index: number;
                            readonly viewportOffset: number;
                        };
                    } | {
                        readonly _tag: "Target";
                        readonly target: {
                            readonly _tag: "End";
                        } | {
                            readonly _tag: "Index";
                            readonly index: number;
                        } | {
                            readonly _tag: "Key";
                            readonly key: string;
                        } | {
                            readonly _tag: "Offset";
                            readonly offset: number;
                        };
                        readonly alignment: "Center" | "End" | "Nearest" | "Start";
                    };
                    readonly version: number;
                };
                readonly pendingScrollVersion: number;
            };
            readonly virtualListChatDemo: {
                readonly id: string;
                readonly rowHeightPx: number;
                readonly scrollTop: number;
                readonly measurement: {
                    readonly _tag: "Unmeasured";
                } | {
                    readonly _tag: "Measured";
                    readonly containerWidth: number;
                    readonly containerHeight: number;
                };
                readonly viewportAnchor: {
                    readonly _tag: "End";
                } | {
                    readonly _tag: "Offset";
                    readonly scrollTop: number;
                } | {
                    readonly _tag: "Row";
                    readonly key: string;
                    readonly index: number;
                    readonly viewportOffset: number;
                };
                readonly measuredRowHeights: {
                    readonly [x: string]: number;
                };
                readonly layoutVersion: number;
                readonly initialScroll: {
                    readonly _tag: "Applied";
                } | {
                    readonly _tag: "Pending";
                    readonly target: {
                        readonly _tag: "End";
                    } | {
                        readonly _tag: "Index";
                        readonly index: number;
                    } | {
                        readonly _tag: "Key";
                        readonly key: string;
                    } | {
                        readonly _tag: "Offset";
                        readonly offset: number;
                    };
                    readonly alignment: "Center" | "End" | "Nearest" | "Start";
                };
                readonly endBehavior: {
                    readonly _tag: "PreserveAnchor";
                } | {
                    readonly _tag: "Follow";
                    readonly thresholdPx: number;
                };
                readonly pendingScroll: {
                    readonly _tag: "Idle";
                } | {
                    readonly _tag: "Pending";
                    readonly request: {
                        readonly _tag: "Anchor";
                        readonly anchor: {
                            readonly _tag: "End";
                        } | {
                            readonly _tag: "Offset";
                            readonly scrollTop: number;
                        } | {
                            readonly _tag: "Row";
                            readonly key: string;
                            readonly index: number;
                            readonly viewportOffset: number;
                        };
                    } | {
                        readonly _tag: "Target";
                        readonly target: {
                            readonly _tag: "End";
                        } | {
                            readonly _tag: "Index";
                            readonly index: number;
                        } | {
                            readonly _tag: "Key";
                            readonly key: string;
                        } | {
                            readonly _tag: "Offset";
                            readonly offset: number;
                        };
                        readonly alignment: "Center" | "End" | "Nearest" | "Start";
                    };
                    readonly version: number;
                };
                readonly pendingScrollVersion: number;
            };
            readonly virtualListChatMessages: readonly {
                readonly id: number;
                readonly body: string;
                readonly isExpanded: boolean;
            }[];
            readonly virtualListChatNextId: number;
            readonly virtualListChatStartProximity: {
                readonly _tag: "Away";
            } | {
                readonly _tag: "Near";
            };
        };
        readonly comingFromReact: {
            readonly [x: string]: boolean;
        };
        readonly apiReference: {
            readonly apiData: import("foldkit/asyncData").AsyncData<{
                readonly parsedApi: {
                    readonly modules: readonly {
                        readonly name: string;
                        readonly functions: readonly {
                            readonly name: string;
                            readonly description: Option.Option<string>;
                            readonly signatures: readonly {
                                readonly parameters: readonly {
                                    readonly name: string;
                                    readonly type: string;
                                    readonly isOptional: boolean;
                                    readonly isRest: boolean;
                                    readonly defaultValue: Option.Option<string>;
                                    readonly description: Option.Option<string>;
                                }[];
                                readonly returnType: string;
                                readonly typeParameters: readonly string[];
                            }[];
                            readonly sourceUrl: Option.Option<string>;
                        }[];
                        readonly types: readonly {
                            readonly name: string;
                            readonly description: Option.Option<string>;
                            readonly typeDefinition: string;
                            readonly sourceUrl: Option.Option<string>;
                        }[];
                        readonly interfaces: readonly {
                            readonly name: string;
                            readonly description: Option.Option<string>;
                            readonly typeDefinition: string;
                            readonly sourceUrl: Option.Option<string>;
                        }[];
                        readonly variables: readonly {
                            readonly name: string;
                            readonly description: Option.Option<string>;
                            readonly type: string;
                            readonly sourceUrl: Option.Option<string>;
                        }[];
                    }[];
                };
                readonly highlights: {
                    readonly [x: string]: string;
                };
            }, string>;
            readonly disclosures: {
                readonly [x: string]: boolean;
            };
        };
        readonly exampleDetail: {
            readonly sourceFileTabs: {
                readonly id: string;
                readonly maybeFocusedIndex: Option.Option<number>;
                readonly activationMode: "Automatic" | "Manual";
            };
            readonly maybeActiveSourceFilePath: Option.Option<string>;
            readonly maybeExampleUrl: Option.Option<string>;
            readonly isLivePreviewOpen: boolean;
            readonly currentSources: import("foldkit/asyncData").AsyncData<{
                readonly files: readonly {
                    readonly path: string;
                    readonly highlightedHtml: string;
                    readonly rawCode: string;
                }[];
            }, string>;
        };
        readonly search: {
            readonly dialog: {
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
            readonly query: string;
            readonly searchState: {
                readonly _tag: "Idle";
            } | {
                readonly _tag: "Loading";
                readonly results: readonly {
                    readonly url: string;
                    readonly title: string;
                    readonly excerpt: string;
                    readonly section: string;
                    readonly kind: string;
                }[];
            } | {
                readonly _tag: "Ok";
                readonly results: readonly {
                    readonly url: string;
                    readonly title: string;
                    readonly excerpt: string;
                    readonly section: string;
                    readonly kind: string;
                }[];
            };
            readonly activeResultIndex: number;
        };
    };
    commands?: Update.Commands<{
        readonly _tag: "ClickedOpenMobileMenu";
    } | {
        readonly _tag: "ClickedOpenSearch";
    } | {
        readonly _tag: "CompletedApplyTheme";
    } | {
        readonly _tag: "CompletedInjectAnalytics";
    } | {
        readonly _tag: "CompletedInjectSpeedInsights";
    } | {
        readonly _tag: "CompletedLoadExternal";
    } | {
        readonly _tag: "CompletedLoadPlayground";
    } | {
        readonly _tag: "CompletedNavigateInternal";
    } | {
        readonly _tag: "CompletedSaveSidebarState";
    } | {
        readonly _tag: "CompletedSaveThemePreference";
    } | {
        readonly _tag: "CompletedScrollMobileMenuActiveLinkIntoView";
    } | {
        readonly _tag: "CompletedScrollSidebarActiveLinkIntoView";
    } | {
        readonly _tag: "CompletedScrollToAnchor";
    } | {
        readonly _tag: "CompletedScrollToTop";
    } | {
        readonly _tag: "FailedCopyLink";
    } | {
        readonly _tag: "PressedSearchShortcut";
    } | {
        readonly _tag: "SucceededCopyLink";
    } | {
        readonly _tag: "ChangedActiveSection";
        readonly sectionId: string;
    } | {
        readonly _tag: "ChangedSystemTheme";
        readonly theme: "Dark" | "Light";
    } | {
        readonly _tag: "ChangedUrl";
        readonly url: {
            readonly protocol: string;
            readonly host: string;
            readonly port: Option.Option<string>;
            readonly pathname: string;
            readonly search: Option.Option<string>;
            readonly hash: Option.Option<string>;
        };
    } | {
        readonly _tag: "ChangedViewportWidth";
        readonly isNarrow: boolean;
    } | {
        readonly _tag: "ClickedCopyLink";
        readonly hash: string;
    } | {
        readonly _tag: "ClickedLink";
        readonly request: {
            readonly _tag: "External";
            readonly href: string;
        } | {
            readonly _tag: "Internal";
            readonly url: {
                readonly protocol: string;
                readonly host: string;
                readonly port: Option.Option<string>;
                readonly pathname: string;
                readonly search: Option.Option<string>;
                readonly hash: Option.Option<string>;
            };
        };
    } | {
        readonly _tag: "ClickedMobileTableOfContentsLink";
        readonly sectionId: string;
    } | {
        readonly _tag: "CompletedLoadBrowserEnvironment";
        readonly maybeThemePreference: Option.Option<"Dark" | "Light" | "System">;
        readonly maybeSidebarState: Option.Option<{
            readonly open: {
                readonly [x: string]: boolean;
            };
        }>;
        readonly systemTheme: "Dark" | "Light";
        readonly isPlaygroundSupported: boolean;
        readonly currentYear: number;
        readonly today: {
            readonly year: number;
            readonly month: number;
            readonly day: number;
        };
    } | {
        readonly _tag: "GotApiReferenceMessage";
        readonly message: {
            readonly _tag: "RequestedApiData";
        } | {
            readonly _tag: "FailedLoadApiData";
            readonly error: string;
        } | {
            readonly _tag: "SucceededLoadApiData";
            readonly apiData: {
                readonly parsedApi: {
                    readonly modules: readonly {
                        readonly name: string;
                        readonly functions: readonly {
                            readonly name: string;
                            readonly description: Option.Option<string>;
                            readonly signatures: readonly {
                                readonly parameters: readonly {
                                    readonly name: string;
                                    readonly type: string;
                                    readonly isOptional: boolean;
                                    readonly isRest: boolean;
                                    readonly defaultValue: Option.Option<string>;
                                    readonly description: Option.Option<string>;
                                }[];
                                readonly returnType: string;
                                readonly typeParameters: readonly string[];
                            }[];
                            readonly sourceUrl: Option.Option<string>;
                        }[];
                        readonly types: readonly {
                            readonly name: string;
                            readonly description: Option.Option<string>;
                            readonly typeDefinition: string;
                            readonly sourceUrl: Option.Option<string>;
                        }[];
                        readonly interfaces: readonly {
                            readonly name: string;
                            readonly description: Option.Option<string>;
                            readonly typeDefinition: string;
                            readonly sourceUrl: Option.Option<string>;
                        }[];
                        readonly variables: readonly {
                            readonly name: string;
                            readonly description: Option.Option<string>;
                            readonly type: string;
                            readonly sourceUrl: Option.Option<string>;
                        }[];
                    }[];
                };
                readonly highlights: {
                    readonly [x: string]: string;
                };
            };
        } | {
            readonly _tag: "ToggledSignature";
            readonly id: string;
            readonly isOpen: boolean;
        };
    } | {
        readonly _tag: "GotComingFromReactMessage";
        readonly message: {
            readonly _tag: "ToggledFaq";
            readonly id: string;
            readonly isOpen: boolean;
        };
    } | {
        readonly _tag: "GotCoreSubmodelPageMessage";
        readonly message: {
            readonly _tag: "ToggledMapMessagesUnderHood";
            readonly isOpen: boolean;
        };
    } | {
        readonly _tag: "GotExampleDetailMessage";
        readonly message: {
            readonly _tag: "ChangedExampleUrl";
            readonly url: string;
        } | {
            readonly _tag: "FailedLoadExampleSources";
            readonly error: string;
        } | {
            readonly _tag: "GotSourceFileTabsMessage";
            readonly message: {
                readonly _tag: "CompletedFocusTab";
            } | {
                readonly _tag: "FocusedTab";
                readonly index: number;
            } | {
                readonly _tag: "SelectedTab";
                readonly index: number;
                readonly value: string;
            };
        } | {
            readonly _tag: "RequestedExampleSources";
            readonly slug: string;
        } | {
            readonly _tag: "SucceededLoadExampleSources";
            readonly sources: {
                readonly files: readonly {
                    readonly path: string;
                    readonly highlightedHtml: string;
                    readonly rawCode: string;
                }[];
            };
        } | {
            readonly _tag: "ToggledLivePreview";
            readonly isOpen: boolean;
        };
    } | {
        readonly _tag: "GotHomeMessage";
        readonly message: {
            readonly _tag: "GotAsyncCounterDemoMessage";
            readonly message: {
                readonly _tag: "ClickedDemoIncrement";
            } | {
                readonly _tag: "ClickedDemoReset";
            } | {
                readonly _tag: "ChangedDemoResetDuration";
                readonly seconds: number;
            } | {
                readonly _tag: "CompletedDelayAdvancePhase";
                readonly generation: number;
            };
        } | {
            readonly _tag: "GotDemoTabsMessage";
            readonly message: {
                readonly _tag: "CompletedFocusTab";
            } | {
                readonly _tag: "FocusedTab";
                readonly index: number;
            } | {
                readonly _tag: "SelectedTab";
                readonly index: number;
                readonly value: string;
            };
        } | {
            readonly _tag: "GotNotePlayerDemoMessage";
            readonly message: {
                readonly _tag: "ClickedPause";
            } | {
                readonly _tag: "ClickedPlay";
            } | {
                readonly _tag: "ClickedStop";
            } | {
                readonly _tag: "FailedAcquireAudioContext";
            } | {
                readonly _tag: "ReleasedAudioContext";
            } | {
                readonly _tag: "SucceededAcquireAudioContext";
            } | {
                readonly _tag: "ChangedNoteInput";
                readonly value: string;
            } | {
                readonly _tag: "CompletedDelayAdvancePhase";
                readonly generation: number;
            } | {
                readonly _tag: "CompletedPlayNote";
                readonly noteIndex: number;
            } | {
                readonly _tag: "GotNoteDurationMessage";
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
            };
        } | {
            readonly _tag: "GotPlaygroundMenuMessage";
            readonly message: {
                readonly _tag: "BlurredItems";
            } | {
                readonly _tag: "ClickedButton";
            } | {
                readonly _tag: "Closed";
            } | {
                readonly _tag: "CompletedAnchorMenu";
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
                readonly _tag: "CompletedPortalMenuBackdrop";
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
                readonly screenX: number;
                readonly screenY: number;
                readonly timeStamp: number;
            } | {
                readonly _tag: "ReleasedPointerOnItems";
                readonly screenX: number;
                readonly screenY: number;
                readonly timeStamp: number;
            } | {
                readonly _tag: "RequestedItemClick";
                readonly index: number;
            } | {
                readonly _tag: "Searched";
                readonly key: string;
                readonly maybeTargetIndex: Option.Option<number>;
            } | {
                readonly _tag: "SelectedItem";
                readonly index: number;
                readonly item: string;
            };
        } | {
            readonly _tag: "UpdatedNewsletterEmail";
            readonly value: string;
        };
    } | {
        readonly _tag: "GotMobileMenuDialogMessage";
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
        readonly _tag: "GotPlaygroundMessage";
        readonly message: {
            readonly _tag: "ReleasedPlayground";
        } | {
            readonly _tag: "ScheduledWritePlaygroundFile";
        } | {
            readonly _tag: "SucceededMountPlaygroundEditor";
        } | {
            readonly _tag: "BootedPlayground";
            readonly previewUrl: string;
        } | {
            readonly _tag: "CompletedWaitForPlaygroundServerFailure";
            readonly reason: string;
        } | {
            readonly _tag: "EditedPlaygroundFile";
            readonly path: string;
            readonly content: string;
        } | {
            readonly _tag: "FailedBootPlayground";
            readonly reason: string;
        } | {
            readonly _tag: "FailedMountPlaygroundEditor";
            readonly reason: string;
        } | {
            readonly _tag: "FailedWritePlaygroundFile";
            readonly reason: string;
        } | {
            readonly _tag: "GotFileTabsMessage";
            readonly message: {
                readonly _tag: "CompletedFocusTab";
            } | {
                readonly _tag: "FocusedTab";
                readonly index: number;
            } | {
                readonly _tag: "SelectedTab";
                readonly index: number;
                readonly value: string;
            };
        } | {
            readonly _tag: "LoadedPlaygroundPreview";
            readonly previewUrl: string;
        };
    } | {
        readonly _tag: "GotSearchMessage";
        readonly message: {
            readonly _tag: "ClearedSearchQuery";
        } | {
            readonly _tag: "CompletedFocusSearchInput";
        } | {
            readonly _tag: "CompletedNavigateToResult";
        } | {
            readonly _tag: "CompletedScrollToResult";
        } | {
            readonly _tag: "CompletedFetchSearchResults";
            readonly results: readonly {
                readonly url: string;
                readonly title: string;
                readonly excerpt: string;
                readonly section: string;
                readonly kind: string;
            }[];
            readonly query: string;
        } | {
            readonly _tag: "GotSearchDialogMessage";
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
            readonly _tag: "PressedArrowKey";
            readonly direction: "Down" | "Up";
        } | {
            readonly _tag: "SelectedSearchResult";
            readonly url: string;
        } | {
            readonly _tag: "UpdatedSearchQuery";
            readonly query: string;
        };
    } | {
        readonly _tag: "GotSnippetCopyMessage";
        readonly message: {
            readonly _tag: "FailedCopySnippet";
        } | {
            readonly _tag: "ClickedCopySnippet";
            readonly snippetId: string;
            readonly text: string;
        } | {
            readonly _tag: "CompletedWaitBeforeHidingCopiedIndicator";
            readonly snippetId: string;
        } | {
            readonly _tag: "SucceededCopySnippet";
            readonly snippetId: string;
        };
    } | {
        readonly _tag: "GotSnippetDisclosureMessage";
        readonly message: {
            readonly _tag: "CompletedMeasureSnippetHeight";
            readonly snippetId: string;
            readonly snippetSize: {
                readonly _tag: "Fits";
            } | {
                readonly _tag: "Overflows";
            };
        } | {
            readonly _tag: "ToggledCodeDisclosure";
            readonly disclosureId: string;
            readonly isOpen: boolean;
        };
    } | {
        readonly _tag: "GotThemeMenuMessage";
        readonly message: {
            readonly _tag: "BlurredItems";
        } | {
            readonly _tag: "ClickedButton";
        } | {
            readonly _tag: "Closed";
        } | {
            readonly _tag: "CompletedAnchorMenu";
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
            readonly _tag: "CompletedPortalMenuBackdrop";
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
            readonly screenX: number;
            readonly screenY: number;
            readonly timeStamp: number;
        } | {
            readonly _tag: "ReleasedPointerOnItems";
            readonly screenX: number;
            readonly screenY: number;
            readonly timeStamp: number;
        } | {
            readonly _tag: "RequestedItemClick";
            readonly index: number;
        } | {
            readonly _tag: "Searched";
            readonly key: string;
            readonly maybeTargetIndex: Option.Option<number>;
        } | {
            readonly _tag: "SelectedItem";
            readonly index: number;
            readonly item: string;
        };
    } | {
        readonly _tag: "GotUiPageMessage";
        readonly message: {
            readonly _tag: "ClickedButtonDemo";
        } | {
            readonly _tag: "ClickedDeleteProject";
        } | {
            readonly _tag: "ClickedDismissAllToasts";
        } | {
            readonly _tag: "ClickedEditFilters";
        } | {
            readonly _tag: "ClickedHoverIntentMenuItem";
        } | {
            readonly _tag: "ClickedOpenAnimatedDialog";
        } | {
            readonly _tag: "ClickedOpenDialog";
        } | {
            readonly _tag: "ClickedOpenProjectSettings";
        } | {
            readonly _tag: "ClickedShowErrorToast";
        } | {
            readonly _tag: "ClickedShowInfoToast";
        } | {
            readonly _tag: "ClickedShowStickyToast";
        } | {
            readonly _tag: "ClickedShowSuccessToast";
        } | {
            readonly _tag: "ClickedToggleAnimationDemo";
        } | {
            readonly _tag: "ClickedVirtualListChatAppend";
        } | {
            readonly _tag: "ClickedVirtualListChatPrepend";
        } | {
            readonly _tag: "ClickedVirtualListChatScrollToMessage";
        } | {
            readonly _tag: "ClickedVirtualListScrollToMiddle";
        } | {
            readonly _tag: "ClickedVirtualListVariableScrollToMiddle";
        } | {
            readonly _tag: "ClickedRemoveFileDropDemoFile";
            readonly fileIndex: number;
        } | {
            readonly _tag: "ClickedVirtualListChatToggleMessage";
            readonly messageId: number;
        } | {
            readonly _tag: "GotAnimationDemoMessage";
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
            readonly _tag: "GotCalendarBasicDemoMessage";
            readonly message: {
                readonly _tag: "BlurredGrid";
            } | {
                readonly _tag: "ClickedHeading";
            } | {
                readonly _tag: "ClickedNextMonthButton";
            } | {
                readonly _tag: "ClickedPreviousMonthButton";
            } | {
                readonly _tag: "CompletedFocusGrid";
            } | {
                readonly _tag: "FocusedGrid";
            } | {
                readonly _tag: "ClickedDay";
                readonly date: {
                    readonly year: number;
                    readonly month: number;
                    readonly day: number;
                };
            } | {
                readonly _tag: "PagedYears";
                readonly direction: -1 | 1;
            } | {
                readonly _tag: "PressedKeyOnGrid";
                readonly key: string;
                readonly isShift: boolean;
            } | {
                readonly _tag: "RefreshedToday";
                readonly today: {
                    readonly year: number;
                    readonly month: number;
                    readonly day: number;
                };
            } | {
                readonly _tag: "SelectedMonth";
                readonly month: number;
            } | {
                readonly _tag: "SelectedYear";
                readonly year: number;
            };
        } | {
            readonly _tag: "GotComboboxDemoMessage";
            readonly message: {
                readonly _tag: "CompletedAnchorCombobox";
            } | {
                readonly _tag: "CompletedAttachComboboxPreventBlur";
            } | {
                readonly _tag: "CompletedAttachComboboxSelectOnFocus";
            } | {
                readonly _tag: "CompletedClickItem";
            } | {
                readonly _tag: "CompletedFocusInput";
            } | {
                readonly _tag: "CompletedInertOthers";
            } | {
                readonly _tag: "CompletedLockScroll";
            } | {
                readonly _tag: "CompletedPortalComboboxBackdrop";
            } | {
                readonly _tag: "CompletedRestoreInert";
            } | {
                readonly _tag: "CompletedScrollIntoView";
            } | {
                readonly _tag: "CompletedUnlockScroll";
            } | {
                readonly _tag: "DeactivatedItem";
            } | {
                readonly _tag: "SuppressedEmptyItemNavigation";
            } | {
                readonly _tag: "SuppressedItemCommit";
            } | {
                readonly _tag: "ActivatedItem";
                readonly index: number;
                readonly activationTrigger: "Keyboard" | "Pointer";
                readonly maybeImmediateSelection: Option.Option<{
                    readonly item: string;
                }>;
            } | {
                readonly _tag: "BlurredInput";
                readonly restingInputValue: string;
                readonly isClearable: boolean;
            } | {
                readonly _tag: "Closed";
                readonly restingInputValue: string;
                readonly isClearable: boolean;
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
                readonly _tag: "PressedToggleButton";
                readonly restingInputValue: string;
                readonly isClearable: boolean;
            } | {
                readonly _tag: "RequestedItemClick";
                readonly index: number;
            } | {
                readonly _tag: "SelectedItem";
                readonly item: string;
                readonly displayText: string;
                readonly wasSelected: boolean;
            } | {
                readonly _tag: "UpdatedInputValue";
                readonly value: string;
            };
        } | {
            readonly _tag: "GotComboboxMultiDemoMessage";
            readonly message: {
                readonly _tag: "CompletedAnchorCombobox";
            } | {
                readonly _tag: "CompletedAttachComboboxPreventBlur";
            } | {
                readonly _tag: "CompletedAttachComboboxSelectOnFocus";
            } | {
                readonly _tag: "CompletedClickItem";
            } | {
                readonly _tag: "CompletedFocusInput";
            } | {
                readonly _tag: "CompletedInertOthers";
            } | {
                readonly _tag: "CompletedLockScroll";
            } | {
                readonly _tag: "CompletedPortalComboboxBackdrop";
            } | {
                readonly _tag: "CompletedRestoreInert";
            } | {
                readonly _tag: "CompletedScrollIntoView";
            } | {
                readonly _tag: "CompletedUnlockScroll";
            } | {
                readonly _tag: "DeactivatedItem";
            } | {
                readonly _tag: "SuppressedEmptyItemNavigation";
            } | {
                readonly _tag: "SuppressedItemCommit";
            } | {
                readonly _tag: "ActivatedItem";
                readonly index: number;
                readonly activationTrigger: "Keyboard" | "Pointer";
                readonly maybeImmediateSelection: Option.Option<{
                    readonly item: string;
                }>;
            } | {
                readonly _tag: "BlurredInput";
                readonly restingInputValue: string;
                readonly isClearable: boolean;
            } | {
                readonly _tag: "Closed";
                readonly restingInputValue: string;
                readonly isClearable: boolean;
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
                readonly _tag: "PressedToggleButton";
                readonly restingInputValue: string;
                readonly isClearable: boolean;
            } | {
                readonly _tag: "RequestedItemClick";
                readonly index: number;
            } | {
                readonly _tag: "SelectedItem";
                readonly item: string;
                readonly displayText: string;
                readonly wasSelected: boolean;
            } | {
                readonly _tag: "UpdatedInputValue";
                readonly value: string;
            };
        } | {
            readonly _tag: "GotComboboxNullableDemoMessage";
            readonly message: {
                readonly _tag: "CompletedAnchorCombobox";
            } | {
                readonly _tag: "CompletedAttachComboboxPreventBlur";
            } | {
                readonly _tag: "CompletedAttachComboboxSelectOnFocus";
            } | {
                readonly _tag: "CompletedClickItem";
            } | {
                readonly _tag: "CompletedFocusInput";
            } | {
                readonly _tag: "CompletedInertOthers";
            } | {
                readonly _tag: "CompletedLockScroll";
            } | {
                readonly _tag: "CompletedPortalComboboxBackdrop";
            } | {
                readonly _tag: "CompletedRestoreInert";
            } | {
                readonly _tag: "CompletedScrollIntoView";
            } | {
                readonly _tag: "CompletedUnlockScroll";
            } | {
                readonly _tag: "DeactivatedItem";
            } | {
                readonly _tag: "SuppressedEmptyItemNavigation";
            } | {
                readonly _tag: "SuppressedItemCommit";
            } | {
                readonly _tag: "ActivatedItem";
                readonly index: number;
                readonly activationTrigger: "Keyboard" | "Pointer";
                readonly maybeImmediateSelection: Option.Option<{
                    readonly item: string;
                }>;
            } | {
                readonly _tag: "BlurredInput";
                readonly restingInputValue: string;
                readonly isClearable: boolean;
            } | {
                readonly _tag: "Closed";
                readonly restingInputValue: string;
                readonly isClearable: boolean;
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
                readonly _tag: "PressedToggleButton";
                readonly restingInputValue: string;
                readonly isClearable: boolean;
            } | {
                readonly _tag: "RequestedItemClick";
                readonly index: number;
            } | {
                readonly _tag: "SelectedItem";
                readonly item: string;
                readonly displayText: string;
                readonly wasSelected: boolean;
            } | {
                readonly _tag: "UpdatedInputValue";
                readonly value: string;
            };
        } | {
            readonly _tag: "GotComboboxPlacementLockDemoMessage";
            readonly message: {
                readonly _tag: "CompletedAnchorCombobox";
            } | {
                readonly _tag: "CompletedAttachComboboxPreventBlur";
            } | {
                readonly _tag: "CompletedAttachComboboxSelectOnFocus";
            } | {
                readonly _tag: "CompletedClickItem";
            } | {
                readonly _tag: "CompletedFocusInput";
            } | {
                readonly _tag: "CompletedInertOthers";
            } | {
                readonly _tag: "CompletedLockScroll";
            } | {
                readonly _tag: "CompletedPortalComboboxBackdrop";
            } | {
                readonly _tag: "CompletedRestoreInert";
            } | {
                readonly _tag: "CompletedScrollIntoView";
            } | {
                readonly _tag: "CompletedUnlockScroll";
            } | {
                readonly _tag: "DeactivatedItem";
            } | {
                readonly _tag: "SuppressedEmptyItemNavigation";
            } | {
                readonly _tag: "SuppressedItemCommit";
            } | {
                readonly _tag: "ActivatedItem";
                readonly index: number;
                readonly activationTrigger: "Keyboard" | "Pointer";
                readonly maybeImmediateSelection: Option.Option<{
                    readonly item: string;
                }>;
            } | {
                readonly _tag: "BlurredInput";
                readonly restingInputValue: string;
                readonly isClearable: boolean;
            } | {
                readonly _tag: "Closed";
                readonly restingInputValue: string;
                readonly isClearable: boolean;
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
                readonly _tag: "PressedToggleButton";
                readonly restingInputValue: string;
                readonly isClearable: boolean;
            } | {
                readonly _tag: "RequestedItemClick";
                readonly index: number;
            } | {
                readonly _tag: "SelectedItem";
                readonly item: string;
                readonly displayText: string;
                readonly wasSelected: boolean;
            } | {
                readonly _tag: "UpdatedInputValue";
                readonly value: string;
            };
        } | {
            readonly _tag: "GotComboboxSelectOnFocusDemoMessage";
            readonly message: {
                readonly _tag: "CompletedAnchorCombobox";
            } | {
                readonly _tag: "CompletedAttachComboboxPreventBlur";
            } | {
                readonly _tag: "CompletedAttachComboboxSelectOnFocus";
            } | {
                readonly _tag: "CompletedClickItem";
            } | {
                readonly _tag: "CompletedFocusInput";
            } | {
                readonly _tag: "CompletedInertOthers";
            } | {
                readonly _tag: "CompletedLockScroll";
            } | {
                readonly _tag: "CompletedPortalComboboxBackdrop";
            } | {
                readonly _tag: "CompletedRestoreInert";
            } | {
                readonly _tag: "CompletedScrollIntoView";
            } | {
                readonly _tag: "CompletedUnlockScroll";
            } | {
                readonly _tag: "DeactivatedItem";
            } | {
                readonly _tag: "SuppressedEmptyItemNavigation";
            } | {
                readonly _tag: "SuppressedItemCommit";
            } | {
                readonly _tag: "ActivatedItem";
                readonly index: number;
                readonly activationTrigger: "Keyboard" | "Pointer";
                readonly maybeImmediateSelection: Option.Option<{
                    readonly item: string;
                }>;
            } | {
                readonly _tag: "BlurredInput";
                readonly restingInputValue: string;
                readonly isClearable: boolean;
            } | {
                readonly _tag: "Closed";
                readonly restingInputValue: string;
                readonly isClearable: boolean;
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
                readonly _tag: "PressedToggleButton";
                readonly restingInputValue: string;
                readonly isClearable: boolean;
            } | {
                readonly _tag: "RequestedItemClick";
                readonly index: number;
            } | {
                readonly _tag: "SelectedItem";
                readonly item: string;
                readonly displayText: string;
                readonly wasSelected: boolean;
            } | {
                readonly _tag: "UpdatedInputValue";
                readonly value: string;
            };
        } | {
            readonly _tag: "GotDatePickerBasicDemoMessage";
            readonly message: {
                readonly _tag: "Cleared";
            } | {
                readonly _tag: "Closed";
            } | {
                readonly _tag: "Opened";
            } | {
                readonly _tag: "GotCalendarMessage";
                readonly message: {
                    readonly _tag: "BlurredGrid";
                } | {
                    readonly _tag: "ClickedHeading";
                } | {
                    readonly _tag: "ClickedNextMonthButton";
                } | {
                    readonly _tag: "ClickedPreviousMonthButton";
                } | {
                    readonly _tag: "CompletedFocusGrid";
                } | {
                    readonly _tag: "FocusedGrid";
                } | {
                    readonly _tag: "ClickedDay";
                    readonly date: {
                        readonly year: number;
                        readonly month: number;
                        readonly day: number;
                    };
                } | {
                    readonly _tag: "PagedYears";
                    readonly direction: -1 | 1;
                } | {
                    readonly _tag: "PressedKeyOnGrid";
                    readonly key: string;
                    readonly isShift: boolean;
                } | {
                    readonly _tag: "RefreshedToday";
                    readonly today: {
                        readonly year: number;
                        readonly month: number;
                        readonly day: number;
                    };
                } | {
                    readonly _tag: "SelectedMonth";
                    readonly month: number;
                } | {
                    readonly _tag: "SelectedYear";
                    readonly year: number;
                };
            } | {
                readonly _tag: "GotPopoverMessage";
                readonly message: {
                    readonly _tag: "BlurredPanel";
                } | {
                    readonly _tag: "ClickedButton";
                } | {
                    readonly _tag: "CompletedAnchorPopover";
                } | {
                    readonly _tag: "CompletedFocusButton";
                } | {
                    readonly _tag: "CompletedFocusPanel";
                } | {
                    readonly _tag: "CompletedInertOthers";
                } | {
                    readonly _tag: "CompletedLockScroll";
                } | {
                    readonly _tag: "CompletedPortalPopoverBackdrop";
                } | {
                    readonly _tag: "CompletedRestoreInert";
                } | {
                    readonly _tag: "CompletedUnlockScroll";
                } | {
                    readonly _tag: "IgnoredMouseClick";
                } | {
                    readonly _tag: "RequestedClose";
                } | {
                    readonly _tag: "RequestedOpen";
                } | {
                    readonly _tag: "SuppressedSpaceScroll";
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
                    readonly _tag: "PressedPointerOnButton";
                    readonly pointerType: string;
                    readonly button: number;
                };
            } | {
                readonly _tag: "RequestedSelectDate";
                readonly date: {
                    readonly year: number;
                    readonly month: number;
                    readonly day: number;
                };
            };
        } | {
            readonly _tag: "GotDialogAnimatedDemoMessage";
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
            readonly _tag: "GotDialogDemoMessage";
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
            readonly _tag: "GotDragAndDropDemoMessage";
            readonly message: {
                readonly _tag: "AdvancedAutoScrollFrame";
            } | {
                readonly _tag: "CancelledDrag";
            } | {
                readonly _tag: "CompletedFocusItem";
            } | {
                readonly _tag: "ConfirmedKeyboardDrop";
            } | {
                readonly _tag: "ReleasedPointer";
            } | {
                readonly _tag: "ActivatedKeyboardDrag";
                readonly itemId: string;
                readonly containerId: string;
                readonly index: number;
            } | {
                readonly _tag: "CompletedResolveKeyboardMove";
                readonly targetContainerId: string;
                readonly targetIndex: number;
            } | {
                readonly _tag: "MovedPointer";
                readonly screenX: number;
                readonly screenY: number;
                readonly clientX: number;
                readonly clientY: number;
                readonly maybeDropTarget: Option.Option<{
                    readonly containerId: string;
                    readonly index: number;
                }>;
            } | {
                readonly _tag: "PressedArrowKey";
                readonly direction: "Down" | "Left" | "NextContainer" | "PreviousContainer" | "Right" | "Up";
            } | {
                readonly _tag: "PressedDraggable";
                readonly itemId: string;
                readonly containerId: string;
                readonly index: number;
                readonly screenX: number;
                readonly screenY: number;
            };
        } | {
            readonly _tag: "GotFileDropBasicDemoMessage";
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
            readonly _tag: "GotHorizontalRadioGroupDemoMessage";
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
            readonly _tag: "GotHorizontalTabsDemoMessage";
            readonly message: {
                readonly _tag: "CompletedFocusTab";
            } | {
                readonly _tag: "FocusedTab";
                readonly index: number;
            } | {
                readonly _tag: "SelectedTab";
                readonly index: number;
                readonly value: string;
            };
        } | {
            readonly _tag: "GotHoverIntentCardDemoMessage";
            readonly message: {
                readonly _tag: "BlurredPanel";
            } | {
                readonly _tag: "BlurredTrigger";
            } | {
                readonly _tag: "EnteredPanel";
            } | {
                readonly _tag: "EnteredTrigger";
            } | {
                readonly _tag: "FocusedPanel";
            } | {
                readonly _tag: "FocusedTrigger";
            } | {
                readonly _tag: "LeftPanel";
            } | {
                readonly _tag: "LeftTrigger";
            } | {
                readonly _tag: "CompletedWaitBeforeClosing";
                readonly version: number;
            } | {
                readonly _tag: "CompletedWaitBeforeOpening";
                readonly version: number;
            } | {
                readonly _tag: "PressedEscape";
                readonly source: "Panel" | "Trigger";
            };
        } | {
            readonly _tag: "GotHoverIntentMenuDemoMessage";
            readonly message: {
                readonly _tag: "BlurredPanel";
            } | {
                readonly _tag: "BlurredTrigger";
            } | {
                readonly _tag: "EnteredPanel";
            } | {
                readonly _tag: "EnteredTrigger";
            } | {
                readonly _tag: "FocusedPanel";
            } | {
                readonly _tag: "FocusedTrigger";
            } | {
                readonly _tag: "LeftPanel";
            } | {
                readonly _tag: "LeftTrigger";
            } | {
                readonly _tag: "CompletedWaitBeforeClosing";
                readonly version: number;
            } | {
                readonly _tag: "CompletedWaitBeforeOpening";
                readonly version: number;
            } | {
                readonly _tag: "PressedEscape";
                readonly source: "Panel" | "Trigger";
            };
        } | {
            readonly _tag: "GotListboxDemoMessage";
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
            readonly _tag: "GotListboxGroupedDemoMessage";
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
            readonly _tag: "GotListboxMultiDemoMessage";
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
            readonly _tag: "GotMenuAnimatedDemoMessage";
            readonly message: {
                readonly _tag: "BlurredItems";
            } | {
                readonly _tag: "ClickedButton";
            } | {
                readonly _tag: "Closed";
            } | {
                readonly _tag: "CompletedAnchorMenu";
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
                readonly _tag: "CompletedPortalMenuBackdrop";
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
                readonly screenX: number;
                readonly screenY: number;
                readonly timeStamp: number;
            } | {
                readonly _tag: "ReleasedPointerOnItems";
                readonly screenX: number;
                readonly screenY: number;
                readonly timeStamp: number;
            } | {
                readonly _tag: "RequestedItemClick";
                readonly index: number;
            } | {
                readonly _tag: "Searched";
                readonly key: string;
                readonly maybeTargetIndex: Option.Option<number>;
            } | {
                readonly _tag: "SelectedItem";
                readonly index: number;
                readonly item: string;
            };
        } | {
            readonly _tag: "GotMenuBasicDemoMessage";
            readonly message: {
                readonly _tag: "BlurredItems";
            } | {
                readonly _tag: "ClickedButton";
            } | {
                readonly _tag: "Closed";
            } | {
                readonly _tag: "CompletedAnchorMenu";
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
                readonly _tag: "CompletedPortalMenuBackdrop";
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
                readonly screenX: number;
                readonly screenY: number;
                readonly timeStamp: number;
            } | {
                readonly _tag: "ReleasedPointerOnItems";
                readonly screenX: number;
                readonly screenY: number;
                readonly timeStamp: number;
            } | {
                readonly _tag: "RequestedItemClick";
                readonly index: number;
            } | {
                readonly _tag: "Searched";
                readonly key: string;
                readonly maybeTargetIndex: Option.Option<number>;
            } | {
                readonly _tag: "SelectedItem";
                readonly index: number;
                readonly item: string;
            };
        } | {
            readonly _tag: "GotNestedDialogChildDemoMessage";
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
            readonly _tag: "GotNestedDialogParentDemoMessage";
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
            readonly _tag: "GotOverlayComboboxDemoMessage";
            readonly message: {
                readonly _tag: "CompletedAnchorCombobox";
            } | {
                readonly _tag: "CompletedAttachComboboxPreventBlur";
            } | {
                readonly _tag: "CompletedAttachComboboxSelectOnFocus";
            } | {
                readonly _tag: "CompletedClickItem";
            } | {
                readonly _tag: "CompletedFocusInput";
            } | {
                readonly _tag: "CompletedInertOthers";
            } | {
                readonly _tag: "CompletedLockScroll";
            } | {
                readonly _tag: "CompletedPortalComboboxBackdrop";
            } | {
                readonly _tag: "CompletedRestoreInert";
            } | {
                readonly _tag: "CompletedScrollIntoView";
            } | {
                readonly _tag: "CompletedUnlockScroll";
            } | {
                readonly _tag: "DeactivatedItem";
            } | {
                readonly _tag: "SuppressedEmptyItemNavigation";
            } | {
                readonly _tag: "SuppressedItemCommit";
            } | {
                readonly _tag: "ActivatedItem";
                readonly index: number;
                readonly activationTrigger: "Keyboard" | "Pointer";
                readonly maybeImmediateSelection: Option.Option<{
                    readonly item: string;
                }>;
            } | {
                readonly _tag: "BlurredInput";
                readonly restingInputValue: string;
                readonly isClearable: boolean;
            } | {
                readonly _tag: "Closed";
                readonly restingInputValue: string;
                readonly isClearable: boolean;
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
                readonly _tag: "PressedToggleButton";
                readonly restingInputValue: string;
                readonly isClearable: boolean;
            } | {
                readonly _tag: "RequestedItemClick";
                readonly index: number;
            } | {
                readonly _tag: "SelectedItem";
                readonly item: string;
                readonly displayText: string;
                readonly wasSelected: boolean;
            } | {
                readonly _tag: "UpdatedInputValue";
                readonly value: string;
            };
        } | {
            readonly _tag: "GotOverlayDialogDemoMessage";
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
            readonly _tag: "GotPopoverAnimatedDemoMessage";
            readonly message: {
                readonly _tag: "BlurredPanel";
            } | {
                readonly _tag: "ClickedButton";
            } | {
                readonly _tag: "CompletedAnchorPopover";
            } | {
                readonly _tag: "CompletedFocusButton";
            } | {
                readonly _tag: "CompletedFocusPanel";
            } | {
                readonly _tag: "CompletedInertOthers";
            } | {
                readonly _tag: "CompletedLockScroll";
            } | {
                readonly _tag: "CompletedPortalPopoverBackdrop";
            } | {
                readonly _tag: "CompletedRestoreInert";
            } | {
                readonly _tag: "CompletedUnlockScroll";
            } | {
                readonly _tag: "IgnoredMouseClick";
            } | {
                readonly _tag: "RequestedClose";
            } | {
                readonly _tag: "RequestedOpen";
            } | {
                readonly _tag: "SuppressedSpaceScroll";
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
                readonly _tag: "PressedPointerOnButton";
                readonly pointerType: string;
                readonly button: number;
            };
        } | {
            readonly _tag: "GotPopoverArrowDemoMessage";
            readonly message: {
                readonly _tag: "BlurredPanel";
            } | {
                readonly _tag: "ClickedButton";
            } | {
                readonly _tag: "CompletedAnchorPopover";
            } | {
                readonly _tag: "CompletedFocusButton";
            } | {
                readonly _tag: "CompletedFocusPanel";
            } | {
                readonly _tag: "CompletedInertOthers";
            } | {
                readonly _tag: "CompletedLockScroll";
            } | {
                readonly _tag: "CompletedPortalPopoverBackdrop";
            } | {
                readonly _tag: "CompletedRestoreInert";
            } | {
                readonly _tag: "CompletedUnlockScroll";
            } | {
                readonly _tag: "IgnoredMouseClick";
            } | {
                readonly _tag: "RequestedClose";
            } | {
                readonly _tag: "RequestedOpen";
            } | {
                readonly _tag: "SuppressedSpaceScroll";
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
                readonly _tag: "PressedPointerOnButton";
                readonly pointerType: string;
                readonly button: number;
            };
        } | {
            readonly _tag: "GotPopoverBasicDemoMessage";
            readonly message: {
                readonly _tag: "BlurredPanel";
            } | {
                readonly _tag: "ClickedButton";
            } | {
                readonly _tag: "CompletedAnchorPopover";
            } | {
                readonly _tag: "CompletedFocusButton";
            } | {
                readonly _tag: "CompletedFocusPanel";
            } | {
                readonly _tag: "CompletedInertOthers";
            } | {
                readonly _tag: "CompletedLockScroll";
            } | {
                readonly _tag: "CompletedPortalPopoverBackdrop";
            } | {
                readonly _tag: "CompletedRestoreInert";
            } | {
                readonly _tag: "CompletedUnlockScroll";
            } | {
                readonly _tag: "IgnoredMouseClick";
            } | {
                readonly _tag: "RequestedClose";
            } | {
                readonly _tag: "RequestedOpen";
            } | {
                readonly _tag: "SuppressedSpaceScroll";
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
                readonly _tag: "PressedPointerOnButton";
                readonly pointerType: string;
                readonly button: number;
            };
        } | {
            readonly _tag: "GotPopoverNestedChildDemoMessage";
            readonly message: {
                readonly _tag: "BlurredPanel";
            } | {
                readonly _tag: "ClickedButton";
            } | {
                readonly _tag: "CompletedAnchorPopover";
            } | {
                readonly _tag: "CompletedFocusButton";
            } | {
                readonly _tag: "CompletedFocusPanel";
            } | {
                readonly _tag: "CompletedInertOthers";
            } | {
                readonly _tag: "CompletedLockScroll";
            } | {
                readonly _tag: "CompletedPortalPopoverBackdrop";
            } | {
                readonly _tag: "CompletedRestoreInert";
            } | {
                readonly _tag: "CompletedUnlockScroll";
            } | {
                readonly _tag: "IgnoredMouseClick";
            } | {
                readonly _tag: "RequestedClose";
            } | {
                readonly _tag: "RequestedOpen";
            } | {
                readonly _tag: "SuppressedSpaceScroll";
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
                readonly _tag: "PressedPointerOnButton";
                readonly pointerType: string;
                readonly button: number;
            };
        } | {
            readonly _tag: "GotPopoverNestedParentDemoMessage";
            readonly message: {
                readonly _tag: "BlurredPanel";
            } | {
                readonly _tag: "ClickedButton";
            } | {
                readonly _tag: "CompletedAnchorPopover";
            } | {
                readonly _tag: "CompletedFocusButton";
            } | {
                readonly _tag: "CompletedFocusPanel";
            } | {
                readonly _tag: "CompletedInertOthers";
            } | {
                readonly _tag: "CompletedLockScroll";
            } | {
                readonly _tag: "CompletedPortalPopoverBackdrop";
            } | {
                readonly _tag: "CompletedRestoreInert";
            } | {
                readonly _tag: "CompletedUnlockScroll";
            } | {
                readonly _tag: "IgnoredMouseClick";
            } | {
                readonly _tag: "RequestedClose";
            } | {
                readonly _tag: "RequestedOpen";
            } | {
                readonly _tag: "SuppressedSpaceScroll";
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
                readonly _tag: "PressedPointerOnButton";
                readonly pointerType: string;
                readonly button: number;
            };
        } | {
            readonly _tag: "GotSliderRatingDemoMessage";
            readonly message: {
                readonly _tag: "CancelledDrag";
            } | {
                readonly _tag: "ReleasedDragPointer";
            } | {
                readonly _tag: "MovedDragPointer";
                readonly value: number;
            } | {
                readonly _tag: "PressedKeyboardNavigation";
                readonly direction: "Max" | "Min" | "PageDecrement" | "PageIncrement" | "StepDecrement" | "StepIncrement";
                readonly value: number;
            } | {
                readonly _tag: "PressedPointer";
                readonly value: number;
                readonly originValue: number;
            } | {
                readonly _tag: "PressedThumb";
                readonly originValue: number;
            };
        } | {
            readonly _tag: "GotSliderVolumeDemoMessage";
            readonly message: {
                readonly _tag: "CancelledDrag";
            } | {
                readonly _tag: "ReleasedDragPointer";
            } | {
                readonly _tag: "MovedDragPointer";
                readonly value: number;
            } | {
                readonly _tag: "PressedKeyboardNavigation";
                readonly direction: "Max" | "Min" | "PageDecrement" | "PageIncrement" | "StepDecrement" | "StepIncrement";
                readonly value: number;
            } | {
                readonly _tag: "PressedPointer";
                readonly value: number;
                readonly originValue: number;
            } | {
                readonly _tag: "PressedThumb";
                readonly originValue: number;
            };
        } | {
            readonly _tag: "GotToastDemoMessage";
            readonly message: {
                readonly _tag: "DismissedAll";
            } | {
                readonly _tag: "PressedEscape";
            } | {
                readonly _tag: "Added";
                readonly entry: {
                    readonly id: string;
                    readonly variant: "Error" | "Info" | "Success" | "Warning";
                    readonly animation: {
                        readonly id: string;
                        readonly isShowing: boolean;
                        readonly transitionState: "EnterAnimating" | "EnterStart" | "Idle" | "LeaveAnimating" | "LeaveStart";
                        readonly transitionGeneration: number;
                    };
                    readonly maybeDuration: Option.Option<import("effect/Duration").Duration>;
                    readonly pendingDismissVersion: number;
                    readonly isHovered: boolean;
                    readonly swipeState: {
                        readonly _tag: "Idle";
                    } | {
                        readonly _tag: "Dismissing";
                        readonly offsetX: number;
                        readonly direction: "Left" | "Right";
                    } | {
                        readonly _tag: "Dragging";
                        readonly pointerId: number;
                        readonly startX: number;
                        readonly currentX: number;
                    } | {
                        readonly _tag: "Settling";
                        readonly offsetX: number;
                    };
                    readonly swipeVersion: number;
                    readonly payload: {
                        readonly title: string;
                        readonly maybeDescription: Option.Option<string>;
                    };
                };
            } | {
                readonly _tag: "CancelledSwipe";
                readonly pointerId: number;
            } | {
                readonly _tag: "CompletedWaitBeforeDismissal";
                readonly entryId: string;
                readonly version: number;
            } | {
                readonly _tag: "CompletedWaitForSwipeSettled";
                readonly entryId: string;
                readonly version: number;
            } | {
                readonly _tag: "Dismissed";
                readonly entryId: string;
            } | {
                readonly _tag: "GotAnimationMessage";
                readonly entryId: string;
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
                readonly _tag: "HoveredEntry";
                readonly entryId: string;
            } | {
                readonly _tag: "LeftEntry";
                readonly entryId: string;
            } | {
                readonly _tag: "MovedSwipePointer";
                readonly pointerId: number;
                readonly clientX: number;
            } | {
                readonly _tag: "PressedEntryPointer";
                readonly entryId: string;
                readonly pointerId: number;
                readonly clientX: number;
            } | {
                readonly _tag: "ReleasedSwipePointer";
                readonly pointerId: number;
                readonly clientX: number;
            };
        } | {
            readonly _tag: "GotTooltipDemoMessage";
            readonly message: {
                readonly _tag: "BlurredTrigger";
            } | {
                readonly _tag: "CompletedAnchorTooltip";
            } | {
                readonly _tag: "EnteredTrigger";
            } | {
                readonly _tag: "FocusedTrigger";
            } | {
                readonly _tag: "LeftTrigger";
            } | {
                readonly _tag: "PressedEscape";
            } | {
                readonly _tag: "CompletedWaitBeforeShowing";
                readonly version: number;
            } | {
                readonly _tag: "PressedPointerOnTrigger";
                readonly pointerType: string;
            };
        } | {
            readonly _tag: "GotVerticalRadioGroupDemoMessage";
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
            readonly _tag: "GotVerticalTabsDemoMessage";
            readonly message: {
                readonly _tag: "CompletedFocusTab";
            } | {
                readonly _tag: "FocusedTab";
                readonly index: number;
            } | {
                readonly _tag: "SelectedTab";
                readonly index: number;
                readonly value: string;
            };
        } | {
            readonly _tag: "GotVirtualListChatDemoMessage";
            readonly message: {
                readonly _tag: "CompletedApplyScroll";
                readonly version: number;
                readonly outcome: {
                    readonly _tag: "Skipped";
                } | {
                    readonly _tag: "Applied";
                    readonly scrollTop: number;
                    readonly scrollHeight: number;
                    readonly containerHeight: number;
                    readonly anchor: {
                        readonly _tag: "None";
                    } | {
                        readonly _tag: "Row";
                        readonly key: string;
                        readonly index: number;
                        readonly viewportOffset: number;
                    };
                };
            } | {
                readonly _tag: "MeasuredRows";
                readonly measurements: readonly {
                    readonly key: string;
                    readonly height: number;
                    readonly layoutVersion: number;
                }[];
            } | {
                readonly _tag: "ObservedContainerScroll";
                readonly scrollTop: number;
                readonly scrollHeight: number;
                readonly containerHeight: number;
                readonly anchor: {
                    readonly _tag: "None";
                } | {
                    readonly _tag: "Row";
                    readonly key: string;
                    readonly index: number;
                    readonly viewportOffset: number;
                };
            } | {
                readonly _tag: "ResizedContainer";
                readonly containerWidth: number;
                readonly containerHeight: number;
            };
        } | {
            readonly _tag: "GotVirtualListDemoMessage";
            readonly message: {
                readonly _tag: "CompletedApplyScroll";
                readonly version: number;
                readonly outcome: {
                    readonly _tag: "Skipped";
                } | {
                    readonly _tag: "Applied";
                    readonly scrollTop: number;
                    readonly scrollHeight: number;
                    readonly containerHeight: number;
                    readonly anchor: {
                        readonly _tag: "None";
                    } | {
                        readonly _tag: "Row";
                        readonly key: string;
                        readonly index: number;
                        readonly viewportOffset: number;
                    };
                };
            } | {
                readonly _tag: "MeasuredRows";
                readonly measurements: readonly {
                    readonly key: string;
                    readonly height: number;
                    readonly layoutVersion: number;
                }[];
            } | {
                readonly _tag: "ObservedContainerScroll";
                readonly scrollTop: number;
                readonly scrollHeight: number;
                readonly containerHeight: number;
                readonly anchor: {
                    readonly _tag: "None";
                } | {
                    readonly _tag: "Row";
                    readonly key: string;
                    readonly index: number;
                    readonly viewportOffset: number;
                };
            } | {
                readonly _tag: "ResizedContainer";
                readonly containerWidth: number;
                readonly containerHeight: number;
            };
        } | {
            readonly _tag: "GotVirtualListVariableDemoMessage";
            readonly message: {
                readonly _tag: "CompletedApplyScroll";
                readonly version: number;
                readonly outcome: {
                    readonly _tag: "Skipped";
                } | {
                    readonly _tag: "Applied";
                    readonly scrollTop: number;
                    readonly scrollHeight: number;
                    readonly containerHeight: number;
                    readonly anchor: {
                        readonly _tag: "None";
                    } | {
                        readonly _tag: "Row";
                        readonly key: string;
                        readonly index: number;
                        readonly viewportOffset: number;
                    };
                };
            } | {
                readonly _tag: "MeasuredRows";
                readonly measurements: readonly {
                    readonly key: string;
                    readonly height: number;
                    readonly layoutVersion: number;
                }[];
            } | {
                readonly _tag: "ObservedContainerScroll";
                readonly scrollTop: number;
                readonly scrollHeight: number;
                readonly containerHeight: number;
                readonly anchor: {
                    readonly _tag: "None";
                } | {
                    readonly _tag: "Row";
                    readonly key: string;
                    readonly index: number;
                    readonly viewportOffset: number;
                };
            } | {
                readonly _tag: "ResizedContainer";
                readonly containerWidth: number;
                readonly containerHeight: number;
            };
        } | {
            readonly _tag: "ToggledCheckboxAllDemo";
            readonly isChecked: boolean;
        } | {
            readonly _tag: "ToggledCheckboxBasicDemo";
            readonly isChecked: boolean;
        } | {
            readonly _tag: "ToggledCheckboxOptionADemo";
            readonly isChecked: boolean;
        } | {
            readonly _tag: "ToggledCheckboxOptionBDemo";
            readonly isChecked: boolean;
        } | {
            readonly _tag: "ToggledDisclosureCollapsedPreviewDemo";
            readonly isOpen: boolean;
        } | {
            readonly _tag: "ToggledDisclosureDemo";
            readonly isOpen: boolean;
        } | {
            readonly _tag: "ToggledFieldsetCheckboxDemo";
            readonly isChecked: boolean;
        } | {
            readonly _tag: "ToggledSwitchDemo";
            readonly isChecked: boolean;
        } | {
            readonly _tag: "UpdatedFieldsetInputValue";
            readonly value: string;
        } | {
            readonly _tag: "UpdatedFieldsetTextareaValue";
            readonly value: string;
        } | {
            readonly _tag: "UpdatedInputDemoValue";
            readonly value: string;
        } | {
            readonly _tag: "UpdatedSelectDemoValue";
            readonly value: string;
        } | {
            readonly _tag: "UpdatedTextareaDemoValue";
            readonly value: string;
        };
    } | {
        readonly _tag: "ToggledMobileTableOfContents";
        readonly isOpen: boolean;
    } | {
        readonly _tag: "ToggledSidebarGroup";
        readonly key: "ai" | "apiReference" | "bestPractices" | "blog" | "comparisons" | "coreConcepts" | "examples" | "faq" | "foldkitUi" | "introduction" | "patterns" | "testing" | "tooling";
        readonly isOpen: boolean;
    } | {
        readonly _tag: "UpdatedNewsletterEmail";
        readonly value: string;
    }, Search.PagefindService | AppManagedResources>;
    outMessage?: never;
}>;
export declare const ScrollToTop: Command.CommandDefinitionNoArgs<"ScrollToTop", Effect.Effect<{
    readonly _tag: "CompletedScrollToTop";
}, never, never>>;
export declare const ScrollSidebarActiveLinkIntoView: Command.CommandDefinitionNoArgs<"ScrollSidebarActiveLinkIntoView", Effect.Effect<{
    readonly _tag: "CompletedScrollSidebarActiveLinkIntoView";
}, never, never>>;
export declare const LoadPlayground: Command.CommandDefinitionWithArgs<"LoadPlayground", {
    exampleSlug: Schema.Literals<readonly ["counter", "counters", "todo", "stopwatch", "crash-view", "slow-warnings", "form", "job-application", "weather", "api-cache", "api-cache-query", "charting", "routing", "route-transitions", "interrupting-commands", "view-transitions", "query-sync", "snake", "auth", "shopping-cart", "state-machine", "pixel-art", "websocket-chat", "managed-resource-layer", "kanban", "map", "canvas-art", "generative-art", "web-components", "embedding", "ssg", "ssr", "ui-showcase", "personal-blog", "livestore"]>;
}, Effect.Effect<{
    readonly _tag: "CompletedLoadPlayground";
}, never, never>>;
export declare const subscriptions: Subscription.Subscriptions<Model, Message, AppResources>;
export declare const managedResources: {
    readonly audioContext: ManagedResource.Entry<{
        readonly route: {
            readonly _tag: "About";
        } | {
            readonly _tag: "AiMcp";
        } | {
            readonly _tag: "AiOverview";
        } | {
            readonly _tag: "AiSkills";
        } | {
            readonly _tag: "AsyncData";
        } | {
            readonly _tag: "BestPracticesImmutability";
        } | {
            readonly _tag: "BestPracticesKeying";
        } | {
            readonly _tag: "BestPracticesMessages";
        } | {
            readonly _tag: "BestPracticesSideEffects";
        } | {
            readonly _tag: "Blog";
        } | {
            readonly _tag: "ComingFromReact";
        } | {
            readonly _tag: "ComingFromTanStackQuery";
        } | {
            readonly _tag: "Contact";
        } | {
            readonly _tag: "ContentApi";
        } | {
            readonly _tag: "CoreArchitecture";
        } | {
            readonly _tag: "CoreCanvas";
        } | {
            readonly _tag: "CoreCommands";
        } | {
            readonly _tag: "CoreCounterExample";
        } | {
            readonly _tag: "CoreCrashView";
        } | {
            readonly _tag: "CoreCustomElement";
        } | {
            readonly _tag: "CoreDevTools";
        } | {
            readonly _tag: "CoreDom";
        } | {
            readonly _tag: "CoreEmbedding";
        } | {
            readonly _tag: "CoreFile";
        } | {
            readonly _tag: "CoreFreezeModel";
        } | {
            readonly _tag: "CoreHttp";
        } | {
            readonly _tag: "CoreInitAndFlags";
        } | {
            readonly _tag: "CoreMachine";
        } | {
            readonly _tag: "CoreManagedResources";
        } | {
            readonly _tag: "CoreMessages";
        } | {
            readonly _tag: "CoreModel";
        } | {
            readonly _tag: "CoreMount";
        } | {
            readonly _tag: "CorePreserveScroll";
        } | {
            readonly _tag: "CoreQuery";
        } | {
            readonly _tag: "CoreRender";
        } | {
            readonly _tag: "CoreResources";
        } | {
            readonly _tag: "CoreRuntime";
        } | {
            readonly _tag: "CoreServerRendering";
        } | {
            readonly _tag: "CoreSlowWarnings";
        } | {
            readonly _tag: "CoreSubmodel";
        } | {
            readonly _tag: "CoreSubscriptions";
        } | {
            readonly _tag: "CoreUpdate";
        } | {
            readonly _tag: "CoreView";
        } | {
            readonly _tag: "CoreViewMemoization";
        } | {
            readonly _tag: "CoreViewTransitions";
        } | {
            readonly _tag: "EffectAtomComparison";
        } | {
            readonly _tag: "ElmComparison";
        } | {
            readonly _tag: "Examples";
        } | {
            readonly _tag: "FieldValidation";
        } | {
            readonly _tag: "GetStarted";
        } | {
            readonly _tag: "Home";
        } | {
            readonly _tag: "Newsletter";
        } | {
            readonly _tag: "PatternsAntiPatterns";
        } | {
            readonly _tag: "PatternsInformingSubmodels";
        } | {
            readonly _tag: "PatternsSubscriptionOrganization";
        } | {
            readonly _tag: "Performance";
        } | {
            readonly _tag: "Privacy";
        } | {
            readonly _tag: "ProjectOrganization";
        } | {
            readonly _tag: "ReactComparison";
        } | {
            readonly _tag: "Roadmap";
        } | {
            readonly _tag: "RoutingAndNavigation";
        } | {
            readonly _tag: "Testing";
        } | {
            readonly _tag: "TestingScene";
        } | {
            readonly _tag: "TestingStory";
        } | {
            readonly _tag: "ToolingLinting";
        } | {
            readonly _tag: "TypingTerminal";
        } | {
            readonly _tag: "UiAnchor";
        } | {
            readonly _tag: "UiAnimation";
        } | {
            readonly _tag: "UiButton";
        } | {
            readonly _tag: "UiCalendar";
        } | {
            readonly _tag: "UiCheckbox";
        } | {
            readonly _tag: "UiCombobox";
        } | {
            readonly _tag: "UiDatePicker";
        } | {
            readonly _tag: "UiDialog";
        } | {
            readonly _tag: "UiDisclosure";
        } | {
            readonly _tag: "UiDragAndDrop";
        } | {
            readonly _tag: "UiFieldset";
        } | {
            readonly _tag: "UiFileDrop";
        } | {
            readonly _tag: "UiHoverIntent";
        } | {
            readonly _tag: "UiInput";
        } | {
            readonly _tag: "UiListbox";
        } | {
            readonly _tag: "UiMenu";
        } | {
            readonly _tag: "UiMeter";
        } | {
            readonly _tag: "UiNav";
        } | {
            readonly _tag: "UiOverview";
        } | {
            readonly _tag: "UiPopover";
        } | {
            readonly _tag: "UiProgress";
        } | {
            readonly _tag: "UiRadioGroup";
        } | {
            readonly _tag: "UiSelect";
        } | {
            readonly _tag: "UiSelectionSubmodels";
        } | {
            readonly _tag: "UiSlider";
        } | {
            readonly _tag: "UiSwitch";
        } | {
            readonly _tag: "UiTabs";
        } | {
            readonly _tag: "UiTextarea";
        } | {
            readonly _tag: "UiToast";
        } | {
            readonly _tag: "UiTooltip";
        } | {
            readonly _tag: "UiVirtualList";
        } | {
            readonly _tag: "WhyFoldkit";
        } | {
            readonly _tag: "ApiModule";
            readonly moduleSlug: string;
        } | {
            readonly _tag: "BlogPost";
            readonly postSlug: string;
        } | {
            readonly _tag: "ExampleDetail";
            readonly exampleSlug: string;
        } | {
            readonly _tag: "NotFound";
            readonly path: string;
        } | {
            readonly _tag: "Playground";
            readonly exampleSlug: string;
        };
        readonly url: {
            readonly protocol: string;
            readonly host: string;
            readonly port: Option.Option<string>;
            readonly pathname: string;
            readonly search: Option.Option<string>;
            readonly hash: Option.Option<string>;
        };
        readonly deployment: {
            readonly _tag: "Production";
        } | {
            readonly _tag: "Canary";
            readonly commit: string;
        };
        readonly snippetCopy: {
            readonly copiedSnippetIds: import("effect/HashSet").HashSet<string>;
        };
        readonly snippetDisclosure: {
            readonly openDisclosureIds: import("effect/HashSet").HashSet<string>;
            readonly snippetSizes: import("effect/HashMap").HashMap<string, {
                readonly _tag: "Fits";
            } | {
                readonly _tag: "Overflows";
            }>;
        };
        readonly maybeGitHubStarCount: Option.Option<number>;
        readonly currentYear: number;
        readonly newsletterEmail: string;
        readonly mobileMenuDialog: {
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
        readonly isMobileTableOfContentsOpen: boolean;
        readonly activeSection: Option.Option<string>;
        readonly isNarrowViewport: boolean;
        readonly maybeIsPlaygroundSupported: Option.Option<boolean>;
        readonly playground: Option.Option<{
            readonly slug: string;
            readonly state: {
                readonly _tag: "Booting";
            } | {
                readonly _tag: "Idle";
            } | {
                readonly _tag: "Booted";
                readonly preview: {
                    readonly _tag: "Loaded";
                    readonly previewUrl: string;
                } | {
                    readonly _tag: "Loading";
                    readonly previewUrl: string;
                };
            } | {
                readonly _tag: "Failed";
                readonly reason: string;
            };
            readonly files: {
                readonly [x: string]: string;
            };
            readonly fileTabs: {
                readonly id: string;
                readonly maybeFocusedIndex: Option.Option<number>;
                readonly activationMode: "Automatic" | "Manual";
            };
            readonly activeFilePath: string;
            readonly dirtyPaths: readonly string[];
            readonly lastWriteError: Option.Option<string>;
        }>;
        readonly sidebarGroups: {
            readonly ai: boolean;
            readonly apiReference: boolean;
            readonly bestPractices: boolean;
            readonly blog: boolean;
            readonly comparisons: boolean;
            readonly coreConcepts: boolean;
            readonly examples: boolean;
            readonly faq: boolean;
            readonly foldkitUi: boolean;
            readonly introduction: boolean;
            readonly patterns: boolean;
            readonly testing: boolean;
            readonly tooling: boolean;
        };
        readonly coreSubmodelPage: {
            readonly isMapMessagesUnderHoodOpen: boolean;
        };
        readonly maybeHome: Option.Option<{
            readonly demoTabs: {
                readonly id: string;
                readonly maybeFocusedIndex: Option.Option<number>;
                readonly activationMode: "Automatic" | "Manual";
            };
            readonly activeDemoTab: "Architecture" | "Note Player";
            readonly playgroundMenu: {
                readonly id: string;
                readonly isOpen: boolean;
                readonly isAnimated: boolean;
                readonly isModal: boolean;
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
                readonly maybePointerOrigin: Option.Option<{
                    readonly screenX: number;
                    readonly screenY: number;
                    readonly timeStamp: number;
                }>;
            };
            readonly asyncCounterDemo: {
                readonly count: number;
                readonly isResetting: boolean;
                readonly resetDuration: number;
                readonly phase: "DurationMessage" | "DurationModel" | "DurationUpdate" | "Idle" | "IncrementMessage" | "IncrementModel" | "IncrementUpdate" | "ResetCommand" | "ResetCommandMessage" | "ResetCommandUpdate" | "ResetMessage" | "ResetModel" | "ResetUpdate";
                readonly generation: number;
                readonly messageLog: readonly string[];
            };
            readonly notePlayerDemo: {
                readonly noteInput: {
                    readonly _tag: "Invalid";
                    readonly value: string;
                    readonly errors: readonly [string, ...string[]];
                } | {
                    readonly _tag: "NotValidated";
                    readonly value: string;
                } | {
                    readonly _tag: "Valid";
                    readonly value: string;
                } | {
                    readonly _tag: "Validating";
                    readonly value: string;
                };
                readonly noteDurationRadioGroup: {
                    readonly id: string;
                    readonly maybeFocusedIndex: Option.Option<number>;
                };
                readonly noteDuration: "Long" | "Medium" | "Short";
                readonly playbackState: {
                    readonly _tag: "Idle";
                } | {
                    readonly _tag: "Paused";
                    readonly noteSequence: readonly ("A" | "B" | "C" | "D" | "E" | "F" | "G")[];
                    readonly currentNoteIndex: number;
                } | {
                    readonly _tag: "Playing";
                    readonly noteSequence: readonly ("A" | "B" | "C" | "D" | "E" | "F" | "G")[];
                    readonly currentNoteIndex: number;
                };
                readonly highlightPhase: "Idle" | "NoteCommand" | "NoteMessage" | "NoteModel" | "NoteUpdate" | "PauseMessage" | "PlayMessage" | "PlayModel" | "PlayUpdate";
                readonly generation: number;
                readonly messageLog: readonly string[];
                readonly audio: {
                    readonly _tag: "Acquiring";
                } | {
                    readonly _tag: "Ready";
                } | {
                    readonly _tag: "Unavailable";
                };
            };
        }>;
        readonly themeMenu: {
            readonly id: string;
            readonly isOpen: boolean;
            readonly isAnimated: boolean;
            readonly isModal: boolean;
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
            readonly maybePointerOrigin: Option.Option<{
                readonly screenX: number;
                readonly screenY: number;
                readonly timeStamp: number;
            }>;
        };
        readonly maybeThemePreference: Option.Option<"Dark" | "Light" | "System">;
        readonly systemTheme: "Dark" | "Light";
        readonly resolvedTheme: "Dark" | "Light";
        readonly uiPages: {
            readonly buttonClickCount: number;
            readonly inputDemoValue: string;
            readonly textareaDemoValue: string;
            readonly fieldsetInputValue: string;
            readonly fieldsetTextareaValue: string;
            readonly isFieldsetCheckboxDemoChecked: boolean;
            readonly calendarBasicDemo: {
                readonly id: string;
                readonly today: {
                    readonly year: number;
                    readonly month: number;
                    readonly day: number;
                };
                readonly viewYear: number;
                readonly viewMonth: number;
                readonly viewMode: "Days" | "Months" | "Years";
                readonly maybeFocusedDate: Option.Option<{
                    readonly year: number;
                    readonly month: number;
                    readonly day: number;
                }>;
                readonly isGridFocused: boolean;
                readonly locale: {
                    readonly firstDayOfWeek: "Friday" | "Monday" | "Saturday" | "Sunday" | "Thursday" | "Tuesday" | "Wednesday";
                    readonly monthNames: readonly [string, string, string, string, string, string, string, string, string, string, string, string];
                    readonly shortMonthNames: readonly [string, string, string, string, string, string, string, string, string, string, string, string];
                    readonly dayNames: readonly [string, string, string, string, string, string, string];
                    readonly shortDayNames: readonly [string, string, string, string, string, string, string];
                    readonly longFormat: readonly [{
                        readonly _tag: "DayName";
                    } | {
                        readonly _tag: "DayNumber";
                    } | {
                        readonly _tag: "MonthName";
                    } | {
                        readonly _tag: "MonthNumber";
                    } | {
                        readonly _tag: "PaddedDayNumber";
                    } | {
                        readonly _tag: "PaddedMonthNumber";
                    } | {
                        readonly _tag: "ShortDayName";
                    } | {
                        readonly _tag: "ShortMonthName";
                    } | {
                        readonly _tag: "YearNumber";
                    } | {
                        readonly _tag: "LiteralText";
                        readonly text: string;
                    }, ...({
                        readonly _tag: "DayName";
                    } | {
                        readonly _tag: "DayNumber";
                    } | {
                        readonly _tag: "MonthName";
                    } | {
                        readonly _tag: "MonthNumber";
                    } | {
                        readonly _tag: "PaddedDayNumber";
                    } | {
                        readonly _tag: "PaddedMonthNumber";
                    } | {
                        readonly _tag: "ShortDayName";
                    } | {
                        readonly _tag: "ShortMonthName";
                    } | {
                        readonly _tag: "YearNumber";
                    } | {
                        readonly _tag: "LiteralText";
                        readonly text: string;
                    })[]];
                    readonly shortFormat: readonly [{
                        readonly _tag: "DayName";
                    } | {
                        readonly _tag: "DayNumber";
                    } | {
                        readonly _tag: "MonthName";
                    } | {
                        readonly _tag: "MonthNumber";
                    } | {
                        readonly _tag: "PaddedDayNumber";
                    } | {
                        readonly _tag: "PaddedMonthNumber";
                    } | {
                        readonly _tag: "ShortDayName";
                    } | {
                        readonly _tag: "ShortMonthName";
                    } | {
                        readonly _tag: "YearNumber";
                    } | {
                        readonly _tag: "LiteralText";
                        readonly text: string;
                    }, ...({
                        readonly _tag: "DayName";
                    } | {
                        readonly _tag: "DayNumber";
                    } | {
                        readonly _tag: "MonthName";
                    } | {
                        readonly _tag: "MonthNumber";
                    } | {
                        readonly _tag: "PaddedDayNumber";
                    } | {
                        readonly _tag: "PaddedMonthNumber";
                    } | {
                        readonly _tag: "ShortDayName";
                    } | {
                        readonly _tag: "ShortMonthName";
                    } | {
                        readonly _tag: "YearNumber";
                    } | {
                        readonly _tag: "LiteralText";
                        readonly text: string;
                    })[]];
                    readonly ariaLabelFormat: readonly [{
                        readonly _tag: "DayName";
                    } | {
                        readonly _tag: "DayNumber";
                    } | {
                        readonly _tag: "MonthName";
                    } | {
                        readonly _tag: "MonthNumber";
                    } | {
                        readonly _tag: "PaddedDayNumber";
                    } | {
                        readonly _tag: "PaddedMonthNumber";
                    } | {
                        readonly _tag: "ShortDayName";
                    } | {
                        readonly _tag: "ShortMonthName";
                    } | {
                        readonly _tag: "YearNumber";
                    } | {
                        readonly _tag: "LiteralText";
                        readonly text: string;
                    }, ...({
                        readonly _tag: "DayName";
                    } | {
                        readonly _tag: "DayNumber";
                    } | {
                        readonly _tag: "MonthName";
                    } | {
                        readonly _tag: "MonthNumber";
                    } | {
                        readonly _tag: "PaddedDayNumber";
                    } | {
                        readonly _tag: "PaddedMonthNumber";
                    } | {
                        readonly _tag: "ShortDayName";
                    } | {
                        readonly _tag: "ShortMonthName";
                    } | {
                        readonly _tag: "YearNumber";
                    } | {
                        readonly _tag: "LiteralText";
                        readonly text: string;
                    })[]];
                    readonly monthYearFormat: readonly [{
                        readonly _tag: "MonthName";
                    } | {
                        readonly _tag: "MonthNumber";
                    } | {
                        readonly _tag: "PaddedMonthNumber";
                    } | {
                        readonly _tag: "ShortMonthName";
                    } | {
                        readonly _tag: "YearNumber";
                    } | {
                        readonly _tag: "LiteralText";
                        readonly text: string;
                    }, ...({
                        readonly _tag: "MonthName";
                    } | {
                        readonly _tag: "MonthNumber";
                    } | {
                        readonly _tag: "PaddedMonthNumber";
                    } | {
                        readonly _tag: "ShortMonthName";
                    } | {
                        readonly _tag: "YearNumber";
                    } | {
                        readonly _tag: "LiteralText";
                        readonly text: string;
                    })[]];
                };
                readonly maybeMinDate: Option.Option<{
                    readonly year: number;
                    readonly month: number;
                    readonly day: number;
                }>;
                readonly maybeMaxDate: Option.Option<{
                    readonly year: number;
                    readonly month: number;
                    readonly day: number;
                }>;
                readonly disabledDaysOfWeek: readonly ("Friday" | "Monday" | "Saturday" | "Sunday" | "Thursday" | "Tuesday" | "Wednesday")[];
                readonly disabledDates: readonly {
                    readonly year: number;
                    readonly month: number;
                    readonly day: number;
                }[];
            };
            readonly maybeCalendarBasicDemoSelectedDate: Option.Option<{
                readonly year: number;
                readonly month: number;
                readonly day: number;
            }>;
            readonly datePickerBasicDemo: {
                readonly id: string;
                readonly calendar: {
                    readonly id: string;
                    readonly today: {
                        readonly year: number;
                        readonly month: number;
                        readonly day: number;
                    };
                    readonly viewYear: number;
                    readonly viewMonth: number;
                    readonly viewMode: "Days" | "Months" | "Years";
                    readonly maybeFocusedDate: Option.Option<{
                        readonly year: number;
                        readonly month: number;
                        readonly day: number;
                    }>;
                    readonly isGridFocused: boolean;
                    readonly locale: {
                        readonly firstDayOfWeek: "Friday" | "Monday" | "Saturday" | "Sunday" | "Thursday" | "Tuesday" | "Wednesday";
                        readonly monthNames: readonly [string, string, string, string, string, string, string, string, string, string, string, string];
                        readonly shortMonthNames: readonly [string, string, string, string, string, string, string, string, string, string, string, string];
                        readonly dayNames: readonly [string, string, string, string, string, string, string];
                        readonly shortDayNames: readonly [string, string, string, string, string, string, string];
                        readonly longFormat: readonly [{
                            readonly _tag: "DayName";
                        } | {
                            readonly _tag: "DayNumber";
                        } | {
                            readonly _tag: "MonthName";
                        } | {
                            readonly _tag: "MonthNumber";
                        } | {
                            readonly _tag: "PaddedDayNumber";
                        } | {
                            readonly _tag: "PaddedMonthNumber";
                        } | {
                            readonly _tag: "ShortDayName";
                        } | {
                            readonly _tag: "ShortMonthName";
                        } | {
                            readonly _tag: "YearNumber";
                        } | {
                            readonly _tag: "LiteralText";
                            readonly text: string;
                        }, ...({
                            readonly _tag: "DayName";
                        } | {
                            readonly _tag: "DayNumber";
                        } | {
                            readonly _tag: "MonthName";
                        } | {
                            readonly _tag: "MonthNumber";
                        } | {
                            readonly _tag: "PaddedDayNumber";
                        } | {
                            readonly _tag: "PaddedMonthNumber";
                        } | {
                            readonly _tag: "ShortDayName";
                        } | {
                            readonly _tag: "ShortMonthName";
                        } | {
                            readonly _tag: "YearNumber";
                        } | {
                            readonly _tag: "LiteralText";
                            readonly text: string;
                        })[]];
                        readonly shortFormat: readonly [{
                            readonly _tag: "DayName";
                        } | {
                            readonly _tag: "DayNumber";
                        } | {
                            readonly _tag: "MonthName";
                        } | {
                            readonly _tag: "MonthNumber";
                        } | {
                            readonly _tag: "PaddedDayNumber";
                        } | {
                            readonly _tag: "PaddedMonthNumber";
                        } | {
                            readonly _tag: "ShortDayName";
                        } | {
                            readonly _tag: "ShortMonthName";
                        } | {
                            readonly _tag: "YearNumber";
                        } | {
                            readonly _tag: "LiteralText";
                            readonly text: string;
                        }, ...({
                            readonly _tag: "DayName";
                        } | {
                            readonly _tag: "DayNumber";
                        } | {
                            readonly _tag: "MonthName";
                        } | {
                            readonly _tag: "MonthNumber";
                        } | {
                            readonly _tag: "PaddedDayNumber";
                        } | {
                            readonly _tag: "PaddedMonthNumber";
                        } | {
                            readonly _tag: "ShortDayName";
                        } | {
                            readonly _tag: "ShortMonthName";
                        } | {
                            readonly _tag: "YearNumber";
                        } | {
                            readonly _tag: "LiteralText";
                            readonly text: string;
                        })[]];
                        readonly ariaLabelFormat: readonly [{
                            readonly _tag: "DayName";
                        } | {
                            readonly _tag: "DayNumber";
                        } | {
                            readonly _tag: "MonthName";
                        } | {
                            readonly _tag: "MonthNumber";
                        } | {
                            readonly _tag: "PaddedDayNumber";
                        } | {
                            readonly _tag: "PaddedMonthNumber";
                        } | {
                            readonly _tag: "ShortDayName";
                        } | {
                            readonly _tag: "ShortMonthName";
                        } | {
                            readonly _tag: "YearNumber";
                        } | {
                            readonly _tag: "LiteralText";
                            readonly text: string;
                        }, ...({
                            readonly _tag: "DayName";
                        } | {
                            readonly _tag: "DayNumber";
                        } | {
                            readonly _tag: "MonthName";
                        } | {
                            readonly _tag: "MonthNumber";
                        } | {
                            readonly _tag: "PaddedDayNumber";
                        } | {
                            readonly _tag: "PaddedMonthNumber";
                        } | {
                            readonly _tag: "ShortDayName";
                        } | {
                            readonly _tag: "ShortMonthName";
                        } | {
                            readonly _tag: "YearNumber";
                        } | {
                            readonly _tag: "LiteralText";
                            readonly text: string;
                        })[]];
                        readonly monthYearFormat: readonly [{
                            readonly _tag: "MonthName";
                        } | {
                            readonly _tag: "MonthNumber";
                        } | {
                            readonly _tag: "PaddedMonthNumber";
                        } | {
                            readonly _tag: "ShortMonthName";
                        } | {
                            readonly _tag: "YearNumber";
                        } | {
                            readonly _tag: "LiteralText";
                            readonly text: string;
                        }, ...({
                            readonly _tag: "MonthName";
                        } | {
                            readonly _tag: "MonthNumber";
                        } | {
                            readonly _tag: "PaddedMonthNumber";
                        } | {
                            readonly _tag: "ShortMonthName";
                        } | {
                            readonly _tag: "YearNumber";
                        } | {
                            readonly _tag: "LiteralText";
                            readonly text: string;
                        })[]];
                    };
                    readonly maybeMinDate: Option.Option<{
                        readonly year: number;
                        readonly month: number;
                        readonly day: number;
                    }>;
                    readonly maybeMaxDate: Option.Option<{
                        readonly year: number;
                        readonly month: number;
                        readonly day: number;
                    }>;
                    readonly disabledDaysOfWeek: readonly ("Friday" | "Monday" | "Saturday" | "Sunday" | "Thursday" | "Tuesday" | "Wednesday")[];
                    readonly disabledDates: readonly {
                        readonly year: number;
                        readonly month: number;
                        readonly day: number;
                    }[];
                };
                readonly popover: {
                    readonly id: string;
                    readonly isOpen: boolean;
                    readonly isAnimated: boolean;
                    readonly isModal: boolean;
                    readonly contentFocus: boolean;
                    readonly animation: {
                        readonly id: string;
                        readonly isShowing: boolean;
                        readonly transitionState: "EnterAnimating" | "EnterStart" | "Idle" | "LeaveAnimating" | "LeaveStart";
                        readonly transitionGeneration: number;
                    };
                    readonly maybeLastButtonPointerType: Option.Option<string>;
                };
            };
            readonly maybeDatePickerBasicDemoSelectedDate: Option.Option<{
                readonly year: number;
                readonly month: number;
                readonly day: number;
            }>;
            readonly isCheckboxBasicDemoChecked: boolean;
            readonly isCheckboxOptionADemoChecked: boolean;
            readonly isCheckboxOptionBDemoChecked: boolean;
            readonly comboboxDemo: {
                readonly id: string;
                readonly isOpen: boolean;
                readonly isAnimated: boolean;
                readonly isModal: boolean;
                readonly nullable: boolean;
                readonly immediate: boolean;
                readonly selectInputOnFocus: boolean;
                readonly animation: {
                    readonly id: string;
                    readonly isShowing: boolean;
                    readonly transitionState: "EnterAnimating" | "EnterStart" | "Idle" | "LeaveAnimating" | "LeaveStart";
                    readonly transitionGeneration: number;
                };
                readonly maybeActiveItemIndex: Option.Option<number>;
                readonly activationTrigger: "Keyboard" | "Pointer";
                readonly inputValue: string;
                readonly maybeLastPointerPosition: Option.Option<{
                    readonly screenX: number;
                    readonly screenY: number;
                }>;
            };
            readonly maybeComboboxDemoSelectedCity: Option.Option<"Johannesburg" | "Kyiv" | "Oxford" | "Plymouth" | "Quito" | "Wellington" | "Zurich">;
            readonly comboboxPlacementLockDemo: {
                readonly id: string;
                readonly isOpen: boolean;
                readonly isAnimated: boolean;
                readonly isModal: boolean;
                readonly nullable: boolean;
                readonly immediate: boolean;
                readonly selectInputOnFocus: boolean;
                readonly animation: {
                    readonly id: string;
                    readonly isShowing: boolean;
                    readonly transitionState: "EnterAnimating" | "EnterStart" | "Idle" | "LeaveAnimating" | "LeaveStart";
                    readonly transitionGeneration: number;
                };
                readonly maybeActiveItemIndex: Option.Option<number>;
                readonly activationTrigger: "Keyboard" | "Pointer";
                readonly inputValue: string;
                readonly maybeLastPointerPosition: Option.Option<{
                    readonly screenX: number;
                    readonly screenY: number;
                }>;
            };
            readonly maybeComboboxPlacementLockDemoSelectedCity: Option.Option<"Johannesburg" | "Kyiv" | "Oxford" | "Plymouth" | "Quito" | "Wellington" | "Zurich">;
            readonly comboboxNullableDemo: {
                readonly id: string;
                readonly isOpen: boolean;
                readonly isAnimated: boolean;
                readonly isModal: boolean;
                readonly nullable: boolean;
                readonly immediate: boolean;
                readonly selectInputOnFocus: boolean;
                readonly animation: {
                    readonly id: string;
                    readonly isShowing: boolean;
                    readonly transitionState: "EnterAnimating" | "EnterStart" | "Idle" | "LeaveAnimating" | "LeaveStart";
                    readonly transitionGeneration: number;
                };
                readonly maybeActiveItemIndex: Option.Option<number>;
                readonly activationTrigger: "Keyboard" | "Pointer";
                readonly inputValue: string;
                readonly maybeLastPointerPosition: Option.Option<{
                    readonly screenX: number;
                    readonly screenY: number;
                }>;
            };
            readonly maybeComboboxNullableDemoSelectedCity: Option.Option<"Johannesburg" | "Kyiv" | "Oxford" | "Plymouth" | "Quito" | "Wellington" | "Zurich">;
            readonly comboboxMultiDemo: {
                readonly id: string;
                readonly isOpen: boolean;
                readonly isAnimated: boolean;
                readonly isModal: boolean;
                readonly nullable: boolean;
                readonly immediate: boolean;
                readonly selectInputOnFocus: boolean;
                readonly animation: {
                    readonly id: string;
                    readonly isShowing: boolean;
                    readonly transitionState: "EnterAnimating" | "EnterStart" | "Idle" | "LeaveAnimating" | "LeaveStart";
                    readonly transitionGeneration: number;
                };
                readonly maybeActiveItemIndex: Option.Option<number>;
                readonly activationTrigger: "Keyboard" | "Pointer";
                readonly inputValue: string;
                readonly maybeLastPointerPosition: Option.Option<{
                    readonly screenX: number;
                    readonly screenY: number;
                }>;
            };
            readonly comboboxMultiDemoSelectedCities: readonly ("Johannesburg" | "Kyiv" | "Oxford" | "Plymouth" | "Quito" | "Wellington" | "Zurich")[];
            readonly comboboxSelectOnFocusDemo: {
                readonly id: string;
                readonly isOpen: boolean;
                readonly isAnimated: boolean;
                readonly isModal: boolean;
                readonly nullable: boolean;
                readonly immediate: boolean;
                readonly selectInputOnFocus: boolean;
                readonly animation: {
                    readonly id: string;
                    readonly isShowing: boolean;
                    readonly transitionState: "EnterAnimating" | "EnterStart" | "Idle" | "LeaveAnimating" | "LeaveStart";
                    readonly transitionGeneration: number;
                };
                readonly maybeActiveItemIndex: Option.Option<number>;
                readonly activationTrigger: "Keyboard" | "Pointer";
                readonly inputValue: string;
                readonly maybeLastPointerPosition: Option.Option<{
                    readonly screenX: number;
                    readonly screenY: number;
                }>;
            };
            readonly maybeComboboxSelectOnFocusDemoSelectedCity: Option.Option<"Johannesburg" | "Kyiv" | "Oxford" | "Plymouth" | "Quito" | "Wellington" | "Zurich">;
            readonly dialogDemo: {
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
            readonly dialogAnimatedDemo: {
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
            readonly overlayDialogDemo: {
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
            readonly overlayComboboxDemo: {
                readonly id: string;
                readonly isOpen: boolean;
                readonly isAnimated: boolean;
                readonly isModal: boolean;
                readonly nullable: boolean;
                readonly immediate: boolean;
                readonly selectInputOnFocus: boolean;
                readonly animation: {
                    readonly id: string;
                    readonly isShowing: boolean;
                    readonly transitionState: "EnterAnimating" | "EnterStart" | "Idle" | "LeaveAnimating" | "LeaveStart";
                    readonly transitionGeneration: number;
                };
                readonly maybeActiveItemIndex: Option.Option<number>;
                readonly activationTrigger: "Keyboard" | "Pointer";
                readonly inputValue: string;
                readonly maybeLastPointerPosition: Option.Option<{
                    readonly screenX: number;
                    readonly screenY: number;
                }>;
            };
            readonly maybeOverlayComboboxDemoSelectedCity: Option.Option<"Johannesburg" | "Kyiv" | "Oxford" | "Plymouth" | "Quito" | "Wellington" | "Zurich">;
            readonly nestedDialogParentDemo: {
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
            readonly nestedDialogChildDemo: {
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
            readonly isDisclosureDemoOpen: boolean;
            readonly isDisclosureCollapsedPreviewDemoOpen: boolean;
            readonly listboxDemo: {
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
            readonly maybeListboxDemoSelectedItem: Option.Option<"Buster Bluth" | "George Michael" | "Gob Bluth" | "Lindsay Funke" | "Lucille Bluth" | "Maeby Funke" | "Michael Bluth" | "Tobias Funke">;
            readonly listboxMultiDemo: {
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
            readonly listboxMultiDemoSelectedItems: readonly ("Buster Bluth" | "George Michael" | "Gob Bluth" | "Lindsay Funke" | "Lucille Bluth" | "Maeby Funke" | "Michael Bluth" | "Tobias Funke")[];
            readonly listboxGroupedDemo: {
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
            readonly maybeListboxGroupedDemoSelectedItem: Option.Option<string>;
            readonly menuBasicDemo: {
                readonly id: string;
                readonly isOpen: boolean;
                readonly isAnimated: boolean;
                readonly isModal: boolean;
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
                readonly maybePointerOrigin: Option.Option<{
                    readonly screenX: number;
                    readonly screenY: number;
                    readonly timeStamp: number;
                }>;
            };
            readonly menuAnimatedDemo: {
                readonly id: string;
                readonly isOpen: boolean;
                readonly isAnimated: boolean;
                readonly isModal: boolean;
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
                readonly maybePointerOrigin: Option.Option<{
                    readonly screenX: number;
                    readonly screenY: number;
                    readonly timeStamp: number;
                }>;
            };
            readonly popoverBasicDemo: {
                readonly id: string;
                readonly isOpen: boolean;
                readonly isAnimated: boolean;
                readonly isModal: boolean;
                readonly contentFocus: boolean;
                readonly animation: {
                    readonly id: string;
                    readonly isShowing: boolean;
                    readonly transitionState: "EnterAnimating" | "EnterStart" | "Idle" | "LeaveAnimating" | "LeaveStart";
                    readonly transitionGeneration: number;
                };
                readonly maybeLastButtonPointerType: Option.Option<string>;
            };
            readonly popoverAnimatedDemo: {
                readonly id: string;
                readonly isOpen: boolean;
                readonly isAnimated: boolean;
                readonly isModal: boolean;
                readonly contentFocus: boolean;
                readonly animation: {
                    readonly id: string;
                    readonly isShowing: boolean;
                    readonly transitionState: "EnterAnimating" | "EnterStart" | "Idle" | "LeaveAnimating" | "LeaveStart";
                    readonly transitionGeneration: number;
                };
                readonly maybeLastButtonPointerType: Option.Option<string>;
            };
            readonly popoverArrowDemo: {
                readonly id: string;
                readonly isOpen: boolean;
                readonly isAnimated: boolean;
                readonly isModal: boolean;
                readonly contentFocus: boolean;
                readonly animation: {
                    readonly id: string;
                    readonly isShowing: boolean;
                    readonly transitionState: "EnterAnimating" | "EnterStart" | "Idle" | "LeaveAnimating" | "LeaveStart";
                    readonly transitionGeneration: number;
                };
                readonly maybeLastButtonPointerType: Option.Option<string>;
            };
            readonly popoverNestedParentDemo: {
                readonly id: string;
                readonly isOpen: boolean;
                readonly isAnimated: boolean;
                readonly isModal: boolean;
                readonly contentFocus: boolean;
                readonly animation: {
                    readonly id: string;
                    readonly isShowing: boolean;
                    readonly transitionState: "EnterAnimating" | "EnterStart" | "Idle" | "LeaveAnimating" | "LeaveStart";
                    readonly transitionGeneration: number;
                };
                readonly maybeLastButtonPointerType: Option.Option<string>;
            };
            readonly popoverNestedChildDemo: {
                readonly id: string;
                readonly isOpen: boolean;
                readonly isAnimated: boolean;
                readonly isModal: boolean;
                readonly contentFocus: boolean;
                readonly animation: {
                    readonly id: string;
                    readonly isShowing: boolean;
                    readonly transitionState: "EnterAnimating" | "EnterStart" | "Idle" | "LeaveAnimating" | "LeaveStart";
                    readonly transitionGeneration: number;
                };
                readonly maybeLastButtonPointerType: Option.Option<string>;
            };
            readonly verticalRadioGroupDemo: {
                readonly id: string;
                readonly maybeFocusedIndex: Option.Option<number>;
            };
            readonly verticalRadioGroupDemoValue: Option.Option<"Business" | "Enterprise" | "Startup">;
            readonly horizontalRadioGroupDemo: {
                readonly id: string;
                readonly maybeFocusedIndex: Option.Option<number>;
            };
            readonly horizontalRadioGroupDemoValue: Option.Option<"Business" | "Enterprise" | "Startup">;
            readonly selectDemoValue: string;
            readonly sliderRatingDemo: {
                readonly id: string;
                readonly min: number;
                readonly max: number;
                readonly step: number;
                readonly dragState: {
                    readonly _tag: "Idle";
                } | {
                    readonly _tag: "Dragging";
                    readonly originValue: number;
                };
            };
            readonly sliderRatingValue: number;
            readonly sliderVolumeDemo: {
                readonly id: string;
                readonly min: number;
                readonly max: number;
                readonly step: number;
                readonly dragState: {
                    readonly _tag: "Idle";
                } | {
                    readonly _tag: "Dragging";
                    readonly originValue: number;
                };
            };
            readonly sliderVolumeValue: number;
            readonly isSwitchDemoChecked: boolean;
            readonly horizontalTabsDemo: {
                readonly id: string;
                readonly maybeFocusedIndex: Option.Option<number>;
                readonly activationMode: "Automatic" | "Manual";
            };
            readonly horizontalTabsDemoTab: "Elm" | "Foldkit" | "React";
            readonly verticalTabsDemo: {
                readonly id: string;
                readonly maybeFocusedIndex: Option.Option<number>;
                readonly activationMode: "Automatic" | "Manual";
            };
            readonly verticalTabsDemoTab: "Elm" | "Foldkit" | "React";
            readonly dragAndDropDemo: {
                readonly id: string;
                readonly orientation: "Horizontal" | "Vertical";
                readonly activationThreshold: number;
                readonly dragState: {
                    readonly _tag: "Idle";
                } | {
                    readonly _tag: "Dragging";
                    readonly itemId: string;
                    readonly sourceContainerId: string;
                    readonly sourceIndex: number;
                    readonly origin: {
                        readonly screenX: number;
                        readonly screenY: number;
                    };
                    readonly current: {
                        readonly clientX: number;
                        readonly clientY: number;
                    };
                    readonly maybeDropTarget: Option.Option<{
                        readonly containerId: string;
                        readonly index: number;
                    }>;
                } | {
                    readonly _tag: "KeyboardDragging";
                    readonly itemId: string;
                    readonly sourceContainerId: string;
                    readonly sourceIndex: number;
                    readonly targetContainerId: string;
                    readonly targetIndex: number;
                } | {
                    readonly _tag: "Pending";
                    readonly itemId: string;
                    readonly containerId: string;
                    readonly index: number;
                    readonly origin: {
                        readonly screenX: number;
                        readonly screenY: number;
                    };
                };
            };
            readonly dragAndDropDemoColumns: readonly {
                readonly id: string;
                readonly label: string;
                readonly cards: {
                    readonly id: string;
                    readonly label: string;
                }[];
            }[];
            readonly dragAndDropDemoAnnouncement: string;
            readonly fileDropBasicDemo: {
                readonly id: string;
                readonly isDragOver: boolean;
            };
            readonly fileDropBasicDemoFiles: readonly File[];
            readonly toastDemo: {
                readonly id: string;
                readonly defaultDuration: import("effect/Duration").Duration;
                readonly entries: readonly {
                    readonly id: string;
                    readonly variant: "Error" | "Info" | "Success" | "Warning";
                    readonly animation: {
                        readonly id: string;
                        readonly isShowing: boolean;
                        readonly transitionState: "EnterAnimating" | "EnterStart" | "Idle" | "LeaveAnimating" | "LeaveStart";
                        readonly transitionGeneration: number;
                    };
                    readonly maybeDuration: Option.Option<import("effect/Duration").Duration>;
                    readonly pendingDismissVersion: number;
                    readonly isHovered: boolean;
                    readonly swipeState: {
                        readonly _tag: "Idle";
                    } | {
                        readonly _tag: "Dismissing";
                        readonly offsetX: number;
                        readonly direction: "Left" | "Right";
                    } | {
                        readonly _tag: "Dragging";
                        readonly pointerId: number;
                        readonly startX: number;
                        readonly currentX: number;
                    } | {
                        readonly _tag: "Settling";
                        readonly offsetX: number;
                    };
                    readonly swipeVersion: number;
                    readonly payload: {
                        readonly title: string;
                        readonly maybeDescription: Option.Option<string>;
                    };
                }[];
                readonly nextEntryKey: number;
                readonly maybeSwipeConfig: Option.Option<{
                    readonly direction: "Left" | "Right";
                    readonly threshold: number;
                }>;
            };
            readonly maybeLastDismissedToastTitle: Option.Option<string>;
            readonly tooltipDemo: {
                readonly id: string;
                readonly isOpen: boolean;
                readonly isHovered: boolean;
                readonly isFocused: boolean;
                readonly isDismissed: boolean;
                readonly showDelay: import("effect/Duration").Duration;
                readonly pendingShowVersion: number;
                readonly maybeLastPointerType: Option.Option<string>;
            };
            readonly hoverIntentCardDemo: {
                readonly isOpen: boolean;
                readonly isTriggerHovered: boolean;
                readonly isPanelHovered: boolean;
                readonly maybeFocusLocation: Option.Option<"Panel" | "Trigger">;
                readonly isDismissed: boolean;
                readonly openDelay: import("effect/Duration").Duration;
                readonly closeDelay: import("effect/Duration").Duration;
                readonly pendingOpenVersion: number;
                readonly pendingCloseVersion: number;
            };
            readonly hoverIntentMenuDemo: {
                readonly isOpen: boolean;
                readonly isTriggerHovered: boolean;
                readonly isPanelHovered: boolean;
                readonly maybeFocusLocation: Option.Option<"Panel" | "Trigger">;
                readonly isDismissed: boolean;
                readonly openDelay: import("effect/Duration").Duration;
                readonly closeDelay: import("effect/Duration").Duration;
                readonly pendingOpenVersion: number;
                readonly pendingCloseVersion: number;
            };
            readonly animationDemo: {
                readonly id: string;
                readonly isShowing: boolean;
                readonly transitionState: "EnterAnimating" | "EnterStart" | "Idle" | "LeaveAnimating" | "LeaveStart";
                readonly transitionGeneration: number;
            };
            readonly virtualListDemo: {
                readonly id: string;
                readonly rowHeightPx: number;
                readonly scrollTop: number;
                readonly measurement: {
                    readonly _tag: "Unmeasured";
                } | {
                    readonly _tag: "Measured";
                    readonly containerWidth: number;
                    readonly containerHeight: number;
                };
                readonly viewportAnchor: {
                    readonly _tag: "End";
                } | {
                    readonly _tag: "Offset";
                    readonly scrollTop: number;
                } | {
                    readonly _tag: "Row";
                    readonly key: string;
                    readonly index: number;
                    readonly viewportOffset: number;
                };
                readonly measuredRowHeights: {
                    readonly [x: string]: number;
                };
                readonly layoutVersion: number;
                readonly initialScroll: {
                    readonly _tag: "Applied";
                } | {
                    readonly _tag: "Pending";
                    readonly target: {
                        readonly _tag: "End";
                    } | {
                        readonly _tag: "Index";
                        readonly index: number;
                    } | {
                        readonly _tag: "Key";
                        readonly key: string;
                    } | {
                        readonly _tag: "Offset";
                        readonly offset: number;
                    };
                    readonly alignment: "Center" | "End" | "Nearest" | "Start";
                };
                readonly endBehavior: {
                    readonly _tag: "PreserveAnchor";
                } | {
                    readonly _tag: "Follow";
                    readonly thresholdPx: number;
                };
                readonly pendingScroll: {
                    readonly _tag: "Idle";
                } | {
                    readonly _tag: "Pending";
                    readonly request: {
                        readonly _tag: "Anchor";
                        readonly anchor: {
                            readonly _tag: "End";
                        } | {
                            readonly _tag: "Offset";
                            readonly scrollTop: number;
                        } | {
                            readonly _tag: "Row";
                            readonly key: string;
                            readonly index: number;
                            readonly viewportOffset: number;
                        };
                    } | {
                        readonly _tag: "Target";
                        readonly target: {
                            readonly _tag: "End";
                        } | {
                            readonly _tag: "Index";
                            readonly index: number;
                        } | {
                            readonly _tag: "Key";
                            readonly key: string;
                        } | {
                            readonly _tag: "Offset";
                            readonly offset: number;
                        };
                        readonly alignment: "Center" | "End" | "Nearest" | "Start";
                    };
                    readonly version: number;
                };
                readonly pendingScrollVersion: number;
            };
            readonly virtualListVariableDemo: {
                readonly id: string;
                readonly rowHeightPx: number;
                readonly scrollTop: number;
                readonly measurement: {
                    readonly _tag: "Unmeasured";
                } | {
                    readonly _tag: "Measured";
                    readonly containerWidth: number;
                    readonly containerHeight: number;
                };
                readonly viewportAnchor: {
                    readonly _tag: "End";
                } | {
                    readonly _tag: "Offset";
                    readonly scrollTop: number;
                } | {
                    readonly _tag: "Row";
                    readonly key: string;
                    readonly index: number;
                    readonly viewportOffset: number;
                };
                readonly measuredRowHeights: {
                    readonly [x: string]: number;
                };
                readonly layoutVersion: number;
                readonly initialScroll: {
                    readonly _tag: "Applied";
                } | {
                    readonly _tag: "Pending";
                    readonly target: {
                        readonly _tag: "End";
                    } | {
                        readonly _tag: "Index";
                        readonly index: number;
                    } | {
                        readonly _tag: "Key";
                        readonly key: string;
                    } | {
                        readonly _tag: "Offset";
                        readonly offset: number;
                    };
                    readonly alignment: "Center" | "End" | "Nearest" | "Start";
                };
                readonly endBehavior: {
                    readonly _tag: "PreserveAnchor";
                } | {
                    readonly _tag: "Follow";
                    readonly thresholdPx: number;
                };
                readonly pendingScroll: {
                    readonly _tag: "Idle";
                } | {
                    readonly _tag: "Pending";
                    readonly request: {
                        readonly _tag: "Anchor";
                        readonly anchor: {
                            readonly _tag: "End";
                        } | {
                            readonly _tag: "Offset";
                            readonly scrollTop: number;
                        } | {
                            readonly _tag: "Row";
                            readonly key: string;
                            readonly index: number;
                            readonly viewportOffset: number;
                        };
                    } | {
                        readonly _tag: "Target";
                        readonly target: {
                            readonly _tag: "End";
                        } | {
                            readonly _tag: "Index";
                            readonly index: number;
                        } | {
                            readonly _tag: "Key";
                            readonly key: string;
                        } | {
                            readonly _tag: "Offset";
                            readonly offset: number;
                        };
                        readonly alignment: "Center" | "End" | "Nearest" | "Start";
                    };
                    readonly version: number;
                };
                readonly pendingScrollVersion: number;
            };
            readonly virtualListChatDemo: {
                readonly id: string;
                readonly rowHeightPx: number;
                readonly scrollTop: number;
                readonly measurement: {
                    readonly _tag: "Unmeasured";
                } | {
                    readonly _tag: "Measured";
                    readonly containerWidth: number;
                    readonly containerHeight: number;
                };
                readonly viewportAnchor: {
                    readonly _tag: "End";
                } | {
                    readonly _tag: "Offset";
                    readonly scrollTop: number;
                } | {
                    readonly _tag: "Row";
                    readonly key: string;
                    readonly index: number;
                    readonly viewportOffset: number;
                };
                readonly measuredRowHeights: {
                    readonly [x: string]: number;
                };
                readonly layoutVersion: number;
                readonly initialScroll: {
                    readonly _tag: "Applied";
                } | {
                    readonly _tag: "Pending";
                    readonly target: {
                        readonly _tag: "End";
                    } | {
                        readonly _tag: "Index";
                        readonly index: number;
                    } | {
                        readonly _tag: "Key";
                        readonly key: string;
                    } | {
                        readonly _tag: "Offset";
                        readonly offset: number;
                    };
                    readonly alignment: "Center" | "End" | "Nearest" | "Start";
                };
                readonly endBehavior: {
                    readonly _tag: "PreserveAnchor";
                } | {
                    readonly _tag: "Follow";
                    readonly thresholdPx: number;
                };
                readonly pendingScroll: {
                    readonly _tag: "Idle";
                } | {
                    readonly _tag: "Pending";
                    readonly request: {
                        readonly _tag: "Anchor";
                        readonly anchor: {
                            readonly _tag: "End";
                        } | {
                            readonly _tag: "Offset";
                            readonly scrollTop: number;
                        } | {
                            readonly _tag: "Row";
                            readonly key: string;
                            readonly index: number;
                            readonly viewportOffset: number;
                        };
                    } | {
                        readonly _tag: "Target";
                        readonly target: {
                            readonly _tag: "End";
                        } | {
                            readonly _tag: "Index";
                            readonly index: number;
                        } | {
                            readonly _tag: "Key";
                            readonly key: string;
                        } | {
                            readonly _tag: "Offset";
                            readonly offset: number;
                        };
                        readonly alignment: "Center" | "End" | "Nearest" | "Start";
                    };
                    readonly version: number;
                };
                readonly pendingScrollVersion: number;
            };
            readonly virtualListChatMessages: readonly {
                readonly id: number;
                readonly body: string;
                readonly isExpanded: boolean;
            }[];
            readonly virtualListChatNextId: number;
            readonly virtualListChatStartProximity: {
                readonly _tag: "Away";
            } | {
                readonly _tag: "Near";
            };
        };
        readonly comingFromReact: {
            readonly [x: string]: boolean;
        };
        readonly apiReference: {
            readonly apiData: import("foldkit/asyncData").AsyncData<{
                readonly parsedApi: {
                    readonly modules: readonly {
                        readonly name: string;
                        readonly functions: readonly {
                            readonly name: string;
                            readonly description: Option.Option<string>;
                            readonly signatures: readonly {
                                readonly parameters: readonly {
                                    readonly name: string;
                                    readonly type: string;
                                    readonly isOptional: boolean;
                                    readonly isRest: boolean;
                                    readonly defaultValue: Option.Option<string>;
                                    readonly description: Option.Option<string>;
                                }[];
                                readonly returnType: string;
                                readonly typeParameters: readonly string[];
                            }[];
                            readonly sourceUrl: Option.Option<string>;
                        }[];
                        readonly types: readonly {
                            readonly name: string;
                            readonly description: Option.Option<string>;
                            readonly typeDefinition: string;
                            readonly sourceUrl: Option.Option<string>;
                        }[];
                        readonly interfaces: readonly {
                            readonly name: string;
                            readonly description: Option.Option<string>;
                            readonly typeDefinition: string;
                            readonly sourceUrl: Option.Option<string>;
                        }[];
                        readonly variables: readonly {
                            readonly name: string;
                            readonly description: Option.Option<string>;
                            readonly type: string;
                            readonly sourceUrl: Option.Option<string>;
                        }[];
                    }[];
                };
                readonly highlights: {
                    readonly [x: string]: string;
                };
            }, string>;
            readonly disclosures: {
                readonly [x: string]: boolean;
            };
        };
        readonly exampleDetail: {
            readonly sourceFileTabs: {
                readonly id: string;
                readonly maybeFocusedIndex: Option.Option<number>;
                readonly activationMode: "Automatic" | "Manual";
            };
            readonly maybeActiveSourceFilePath: Option.Option<string>;
            readonly maybeExampleUrl: Option.Option<string>;
            readonly isLivePreviewOpen: boolean;
            readonly currentSources: import("foldkit/asyncData").AsyncData<{
                readonly files: readonly {
                    readonly path: string;
                    readonly highlightedHtml: string;
                    readonly rawCode: string;
                }[];
            }, string>;
        };
        readonly search: {
            readonly dialog: {
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
            readonly query: string;
            readonly searchState: {
                readonly _tag: "Idle";
            } | {
                readonly _tag: "Loading";
                readonly results: readonly {
                    readonly url: string;
                    readonly title: string;
                    readonly excerpt: string;
                    readonly section: string;
                    readonly kind: string;
                }[];
            } | {
                readonly _tag: "Ok";
                readonly results: readonly {
                    readonly url: string;
                    readonly title: string;
                    readonly excerpt: string;
                    readonly section: string;
                    readonly kind: string;
                }[];
            };
            readonly activeResultIndex: number;
        };
    }, {
        readonly _tag: "ClickedOpenMobileMenu";
    } | {
        readonly _tag: "ClickedOpenSearch";
    } | {
        readonly _tag: "CompletedApplyTheme";
    } | {
        readonly _tag: "CompletedInjectAnalytics";
    } | {
        readonly _tag: "CompletedInjectSpeedInsights";
    } | {
        readonly _tag: "CompletedLoadExternal";
    } | {
        readonly _tag: "CompletedLoadPlayground";
    } | {
        readonly _tag: "CompletedNavigateInternal";
    } | {
        readonly _tag: "CompletedSaveSidebarState";
    } | {
        readonly _tag: "CompletedSaveThemePreference";
    } | {
        readonly _tag: "CompletedScrollMobileMenuActiveLinkIntoView";
    } | {
        readonly _tag: "CompletedScrollSidebarActiveLinkIntoView";
    } | {
        readonly _tag: "CompletedScrollToAnchor";
    } | {
        readonly _tag: "CompletedScrollToTop";
    } | {
        readonly _tag: "FailedCopyLink";
    } | {
        readonly _tag: "PressedSearchShortcut";
    } | {
        readonly _tag: "SucceededCopyLink";
    } | {
        readonly _tag: "ChangedActiveSection";
        readonly sectionId: string;
    } | {
        readonly _tag: "ChangedSystemTheme";
        readonly theme: "Dark" | "Light";
    } | {
        readonly _tag: "ChangedUrl";
        readonly url: {
            readonly protocol: string;
            readonly host: string;
            readonly port: Option.Option<string>;
            readonly pathname: string;
            readonly search: Option.Option<string>;
            readonly hash: Option.Option<string>;
        };
    } | {
        readonly _tag: "ChangedViewportWidth";
        readonly isNarrow: boolean;
    } | {
        readonly _tag: "ClickedCopyLink";
        readonly hash: string;
    } | {
        readonly _tag: "ClickedLink";
        readonly request: {
            readonly _tag: "External";
            readonly href: string;
        } | {
            readonly _tag: "Internal";
            readonly url: {
                readonly protocol: string;
                readonly host: string;
                readonly port: Option.Option<string>;
                readonly pathname: string;
                readonly search: Option.Option<string>;
                readonly hash: Option.Option<string>;
            };
        };
    } | {
        readonly _tag: "ClickedMobileTableOfContentsLink";
        readonly sectionId: string;
    } | {
        readonly _tag: "CompletedLoadBrowserEnvironment";
        readonly maybeThemePreference: Option.Option<"Dark" | "Light" | "System">;
        readonly maybeSidebarState: Option.Option<{
            readonly open: {
                readonly [x: string]: boolean;
            };
        }>;
        readonly systemTheme: "Dark" | "Light";
        readonly isPlaygroundSupported: boolean;
        readonly currentYear: number;
        readonly today: {
            readonly year: number;
            readonly month: number;
            readonly day: number;
        };
    } | {
        readonly _tag: "GotApiReferenceMessage";
        readonly message: {
            readonly _tag: "RequestedApiData";
        } | {
            readonly _tag: "FailedLoadApiData";
            readonly error: string;
        } | {
            readonly _tag: "SucceededLoadApiData";
            readonly apiData: {
                readonly parsedApi: {
                    readonly modules: readonly {
                        readonly name: string;
                        readonly functions: readonly {
                            readonly name: string;
                            readonly description: Option.Option<string>;
                            readonly signatures: readonly {
                                readonly parameters: readonly {
                                    readonly name: string;
                                    readonly type: string;
                                    readonly isOptional: boolean;
                                    readonly isRest: boolean;
                                    readonly defaultValue: Option.Option<string>;
                                    readonly description: Option.Option<string>;
                                }[];
                                readonly returnType: string;
                                readonly typeParameters: readonly string[];
                            }[];
                            readonly sourceUrl: Option.Option<string>;
                        }[];
                        readonly types: readonly {
                            readonly name: string;
                            readonly description: Option.Option<string>;
                            readonly typeDefinition: string;
                            readonly sourceUrl: Option.Option<string>;
                        }[];
                        readonly interfaces: readonly {
                            readonly name: string;
                            readonly description: Option.Option<string>;
                            readonly typeDefinition: string;
                            readonly sourceUrl: Option.Option<string>;
                        }[];
                        readonly variables: readonly {
                            readonly name: string;
                            readonly description: Option.Option<string>;
                            readonly type: string;
                            readonly sourceUrl: Option.Option<string>;
                        }[];
                    }[];
                };
                readonly highlights: {
                    readonly [x: string]: string;
                };
            };
        } | {
            readonly _tag: "ToggledSignature";
            readonly id: string;
            readonly isOpen: boolean;
        };
    } | {
        readonly _tag: "GotComingFromReactMessage";
        readonly message: {
            readonly _tag: "ToggledFaq";
            readonly id: string;
            readonly isOpen: boolean;
        };
    } | {
        readonly _tag: "GotCoreSubmodelPageMessage";
        readonly message: {
            readonly _tag: "ToggledMapMessagesUnderHood";
            readonly isOpen: boolean;
        };
    } | {
        readonly _tag: "GotExampleDetailMessage";
        readonly message: {
            readonly _tag: "ChangedExampleUrl";
            readonly url: string;
        } | {
            readonly _tag: "FailedLoadExampleSources";
            readonly error: string;
        } | {
            readonly _tag: "GotSourceFileTabsMessage";
            readonly message: {
                readonly _tag: "CompletedFocusTab";
            } | {
                readonly _tag: "FocusedTab";
                readonly index: number;
            } | {
                readonly _tag: "SelectedTab";
                readonly index: number;
                readonly value: string;
            };
        } | {
            readonly _tag: "RequestedExampleSources";
            readonly slug: string;
        } | {
            readonly _tag: "SucceededLoadExampleSources";
            readonly sources: {
                readonly files: readonly {
                    readonly path: string;
                    readonly highlightedHtml: string;
                    readonly rawCode: string;
                }[];
            };
        } | {
            readonly _tag: "ToggledLivePreview";
            readonly isOpen: boolean;
        };
    } | {
        readonly _tag: "GotHomeMessage";
        readonly message: {
            readonly _tag: "GotAsyncCounterDemoMessage";
            readonly message: {
                readonly _tag: "ClickedDemoIncrement";
            } | {
                readonly _tag: "ClickedDemoReset";
            } | {
                readonly _tag: "ChangedDemoResetDuration";
                readonly seconds: number;
            } | {
                readonly _tag: "CompletedDelayAdvancePhase";
                readonly generation: number;
            };
        } | {
            readonly _tag: "GotDemoTabsMessage";
            readonly message: {
                readonly _tag: "CompletedFocusTab";
            } | {
                readonly _tag: "FocusedTab";
                readonly index: number;
            } | {
                readonly _tag: "SelectedTab";
                readonly index: number;
                readonly value: string;
            };
        } | {
            readonly _tag: "GotNotePlayerDemoMessage";
            readonly message: {
                readonly _tag: "ClickedPause";
            } | {
                readonly _tag: "ClickedPlay";
            } | {
                readonly _tag: "ClickedStop";
            } | {
                readonly _tag: "FailedAcquireAudioContext";
            } | {
                readonly _tag: "ReleasedAudioContext";
            } | {
                readonly _tag: "SucceededAcquireAudioContext";
            } | {
                readonly _tag: "ChangedNoteInput";
                readonly value: string;
            } | {
                readonly _tag: "CompletedDelayAdvancePhase";
                readonly generation: number;
            } | {
                readonly _tag: "CompletedPlayNote";
                readonly noteIndex: number;
            } | {
                readonly _tag: "GotNoteDurationMessage";
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
            };
        } | {
            readonly _tag: "GotPlaygroundMenuMessage";
            readonly message: {
                readonly _tag: "BlurredItems";
            } | {
                readonly _tag: "ClickedButton";
            } | {
                readonly _tag: "Closed";
            } | {
                readonly _tag: "CompletedAnchorMenu";
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
                readonly _tag: "CompletedPortalMenuBackdrop";
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
                readonly screenX: number;
                readonly screenY: number;
                readonly timeStamp: number;
            } | {
                readonly _tag: "ReleasedPointerOnItems";
                readonly screenX: number;
                readonly screenY: number;
                readonly timeStamp: number;
            } | {
                readonly _tag: "RequestedItemClick";
                readonly index: number;
            } | {
                readonly _tag: "Searched";
                readonly key: string;
                readonly maybeTargetIndex: Option.Option<number>;
            } | {
                readonly _tag: "SelectedItem";
                readonly index: number;
                readonly item: string;
            };
        } | {
            readonly _tag: "UpdatedNewsletterEmail";
            readonly value: string;
        };
    } | {
        readonly _tag: "GotMobileMenuDialogMessage";
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
        readonly _tag: "GotPlaygroundMessage";
        readonly message: {
            readonly _tag: "ReleasedPlayground";
        } | {
            readonly _tag: "ScheduledWritePlaygroundFile";
        } | {
            readonly _tag: "SucceededMountPlaygroundEditor";
        } | {
            readonly _tag: "BootedPlayground";
            readonly previewUrl: string;
        } | {
            readonly _tag: "CompletedWaitForPlaygroundServerFailure";
            readonly reason: string;
        } | {
            readonly _tag: "EditedPlaygroundFile";
            readonly path: string;
            readonly content: string;
        } | {
            readonly _tag: "FailedBootPlayground";
            readonly reason: string;
        } | {
            readonly _tag: "FailedMountPlaygroundEditor";
            readonly reason: string;
        } | {
            readonly _tag: "FailedWritePlaygroundFile";
            readonly reason: string;
        } | {
            readonly _tag: "GotFileTabsMessage";
            readonly message: {
                readonly _tag: "CompletedFocusTab";
            } | {
                readonly _tag: "FocusedTab";
                readonly index: number;
            } | {
                readonly _tag: "SelectedTab";
                readonly index: number;
                readonly value: string;
            };
        } | {
            readonly _tag: "LoadedPlaygroundPreview";
            readonly previewUrl: string;
        };
    } | {
        readonly _tag: "GotSearchMessage";
        readonly message: {
            readonly _tag: "ClearedSearchQuery";
        } | {
            readonly _tag: "CompletedFocusSearchInput";
        } | {
            readonly _tag: "CompletedNavigateToResult";
        } | {
            readonly _tag: "CompletedScrollToResult";
        } | {
            readonly _tag: "CompletedFetchSearchResults";
            readonly results: readonly {
                readonly url: string;
                readonly title: string;
                readonly excerpt: string;
                readonly section: string;
                readonly kind: string;
            }[];
            readonly query: string;
        } | {
            readonly _tag: "GotSearchDialogMessage";
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
            readonly _tag: "PressedArrowKey";
            readonly direction: "Down" | "Up";
        } | {
            readonly _tag: "SelectedSearchResult";
            readonly url: string;
        } | {
            readonly _tag: "UpdatedSearchQuery";
            readonly query: string;
        };
    } | {
        readonly _tag: "GotSnippetCopyMessage";
        readonly message: {
            readonly _tag: "FailedCopySnippet";
        } | {
            readonly _tag: "ClickedCopySnippet";
            readonly snippetId: string;
            readonly text: string;
        } | {
            readonly _tag: "CompletedWaitBeforeHidingCopiedIndicator";
            readonly snippetId: string;
        } | {
            readonly _tag: "SucceededCopySnippet";
            readonly snippetId: string;
        };
    } | {
        readonly _tag: "GotSnippetDisclosureMessage";
        readonly message: {
            readonly _tag: "CompletedMeasureSnippetHeight";
            readonly snippetId: string;
            readonly snippetSize: {
                readonly _tag: "Fits";
            } | {
                readonly _tag: "Overflows";
            };
        } | {
            readonly _tag: "ToggledCodeDisclosure";
            readonly disclosureId: string;
            readonly isOpen: boolean;
        };
    } | {
        readonly _tag: "GotThemeMenuMessage";
        readonly message: {
            readonly _tag: "BlurredItems";
        } | {
            readonly _tag: "ClickedButton";
        } | {
            readonly _tag: "Closed";
        } | {
            readonly _tag: "CompletedAnchorMenu";
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
            readonly _tag: "CompletedPortalMenuBackdrop";
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
            readonly screenX: number;
            readonly screenY: number;
            readonly timeStamp: number;
        } | {
            readonly _tag: "ReleasedPointerOnItems";
            readonly screenX: number;
            readonly screenY: number;
            readonly timeStamp: number;
        } | {
            readonly _tag: "RequestedItemClick";
            readonly index: number;
        } | {
            readonly _tag: "Searched";
            readonly key: string;
            readonly maybeTargetIndex: Option.Option<number>;
        } | {
            readonly _tag: "SelectedItem";
            readonly index: number;
            readonly item: string;
        };
    } | {
        readonly _tag: "GotUiPageMessage";
        readonly message: {
            readonly _tag: "ClickedButtonDemo";
        } | {
            readonly _tag: "ClickedDeleteProject";
        } | {
            readonly _tag: "ClickedDismissAllToasts";
        } | {
            readonly _tag: "ClickedEditFilters";
        } | {
            readonly _tag: "ClickedHoverIntentMenuItem";
        } | {
            readonly _tag: "ClickedOpenAnimatedDialog";
        } | {
            readonly _tag: "ClickedOpenDialog";
        } | {
            readonly _tag: "ClickedOpenProjectSettings";
        } | {
            readonly _tag: "ClickedShowErrorToast";
        } | {
            readonly _tag: "ClickedShowInfoToast";
        } | {
            readonly _tag: "ClickedShowStickyToast";
        } | {
            readonly _tag: "ClickedShowSuccessToast";
        } | {
            readonly _tag: "ClickedToggleAnimationDemo";
        } | {
            readonly _tag: "ClickedVirtualListChatAppend";
        } | {
            readonly _tag: "ClickedVirtualListChatPrepend";
        } | {
            readonly _tag: "ClickedVirtualListChatScrollToMessage";
        } | {
            readonly _tag: "ClickedVirtualListScrollToMiddle";
        } | {
            readonly _tag: "ClickedVirtualListVariableScrollToMiddle";
        } | {
            readonly _tag: "ClickedRemoveFileDropDemoFile";
            readonly fileIndex: number;
        } | {
            readonly _tag: "ClickedVirtualListChatToggleMessage";
            readonly messageId: number;
        } | {
            readonly _tag: "GotAnimationDemoMessage";
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
            readonly _tag: "GotCalendarBasicDemoMessage";
            readonly message: {
                readonly _tag: "BlurredGrid";
            } | {
                readonly _tag: "ClickedHeading";
            } | {
                readonly _tag: "ClickedNextMonthButton";
            } | {
                readonly _tag: "ClickedPreviousMonthButton";
            } | {
                readonly _tag: "CompletedFocusGrid";
            } | {
                readonly _tag: "FocusedGrid";
            } | {
                readonly _tag: "ClickedDay";
                readonly date: {
                    readonly year: number;
                    readonly month: number;
                    readonly day: number;
                };
            } | {
                readonly _tag: "PagedYears";
                readonly direction: -1 | 1;
            } | {
                readonly _tag: "PressedKeyOnGrid";
                readonly key: string;
                readonly isShift: boolean;
            } | {
                readonly _tag: "RefreshedToday";
                readonly today: {
                    readonly year: number;
                    readonly month: number;
                    readonly day: number;
                };
            } | {
                readonly _tag: "SelectedMonth";
                readonly month: number;
            } | {
                readonly _tag: "SelectedYear";
                readonly year: number;
            };
        } | {
            readonly _tag: "GotComboboxDemoMessage";
            readonly message: {
                readonly _tag: "CompletedAnchorCombobox";
            } | {
                readonly _tag: "CompletedAttachComboboxPreventBlur";
            } | {
                readonly _tag: "CompletedAttachComboboxSelectOnFocus";
            } | {
                readonly _tag: "CompletedClickItem";
            } | {
                readonly _tag: "CompletedFocusInput";
            } | {
                readonly _tag: "CompletedInertOthers";
            } | {
                readonly _tag: "CompletedLockScroll";
            } | {
                readonly _tag: "CompletedPortalComboboxBackdrop";
            } | {
                readonly _tag: "CompletedRestoreInert";
            } | {
                readonly _tag: "CompletedScrollIntoView";
            } | {
                readonly _tag: "CompletedUnlockScroll";
            } | {
                readonly _tag: "DeactivatedItem";
            } | {
                readonly _tag: "SuppressedEmptyItemNavigation";
            } | {
                readonly _tag: "SuppressedItemCommit";
            } | {
                readonly _tag: "ActivatedItem";
                readonly index: number;
                readonly activationTrigger: "Keyboard" | "Pointer";
                readonly maybeImmediateSelection: Option.Option<{
                    readonly item: string;
                }>;
            } | {
                readonly _tag: "BlurredInput";
                readonly restingInputValue: string;
                readonly isClearable: boolean;
            } | {
                readonly _tag: "Closed";
                readonly restingInputValue: string;
                readonly isClearable: boolean;
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
                readonly _tag: "PressedToggleButton";
                readonly restingInputValue: string;
                readonly isClearable: boolean;
            } | {
                readonly _tag: "RequestedItemClick";
                readonly index: number;
            } | {
                readonly _tag: "SelectedItem";
                readonly item: string;
                readonly displayText: string;
                readonly wasSelected: boolean;
            } | {
                readonly _tag: "UpdatedInputValue";
                readonly value: string;
            };
        } | {
            readonly _tag: "GotComboboxMultiDemoMessage";
            readonly message: {
                readonly _tag: "CompletedAnchorCombobox";
            } | {
                readonly _tag: "CompletedAttachComboboxPreventBlur";
            } | {
                readonly _tag: "CompletedAttachComboboxSelectOnFocus";
            } | {
                readonly _tag: "CompletedClickItem";
            } | {
                readonly _tag: "CompletedFocusInput";
            } | {
                readonly _tag: "CompletedInertOthers";
            } | {
                readonly _tag: "CompletedLockScroll";
            } | {
                readonly _tag: "CompletedPortalComboboxBackdrop";
            } | {
                readonly _tag: "CompletedRestoreInert";
            } | {
                readonly _tag: "CompletedScrollIntoView";
            } | {
                readonly _tag: "CompletedUnlockScroll";
            } | {
                readonly _tag: "DeactivatedItem";
            } | {
                readonly _tag: "SuppressedEmptyItemNavigation";
            } | {
                readonly _tag: "SuppressedItemCommit";
            } | {
                readonly _tag: "ActivatedItem";
                readonly index: number;
                readonly activationTrigger: "Keyboard" | "Pointer";
                readonly maybeImmediateSelection: Option.Option<{
                    readonly item: string;
                }>;
            } | {
                readonly _tag: "BlurredInput";
                readonly restingInputValue: string;
                readonly isClearable: boolean;
            } | {
                readonly _tag: "Closed";
                readonly restingInputValue: string;
                readonly isClearable: boolean;
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
                readonly _tag: "PressedToggleButton";
                readonly restingInputValue: string;
                readonly isClearable: boolean;
            } | {
                readonly _tag: "RequestedItemClick";
                readonly index: number;
            } | {
                readonly _tag: "SelectedItem";
                readonly item: string;
                readonly displayText: string;
                readonly wasSelected: boolean;
            } | {
                readonly _tag: "UpdatedInputValue";
                readonly value: string;
            };
        } | {
            readonly _tag: "GotComboboxNullableDemoMessage";
            readonly message: {
                readonly _tag: "CompletedAnchorCombobox";
            } | {
                readonly _tag: "CompletedAttachComboboxPreventBlur";
            } | {
                readonly _tag: "CompletedAttachComboboxSelectOnFocus";
            } | {
                readonly _tag: "CompletedClickItem";
            } | {
                readonly _tag: "CompletedFocusInput";
            } | {
                readonly _tag: "CompletedInertOthers";
            } | {
                readonly _tag: "CompletedLockScroll";
            } | {
                readonly _tag: "CompletedPortalComboboxBackdrop";
            } | {
                readonly _tag: "CompletedRestoreInert";
            } | {
                readonly _tag: "CompletedScrollIntoView";
            } | {
                readonly _tag: "CompletedUnlockScroll";
            } | {
                readonly _tag: "DeactivatedItem";
            } | {
                readonly _tag: "SuppressedEmptyItemNavigation";
            } | {
                readonly _tag: "SuppressedItemCommit";
            } | {
                readonly _tag: "ActivatedItem";
                readonly index: number;
                readonly activationTrigger: "Keyboard" | "Pointer";
                readonly maybeImmediateSelection: Option.Option<{
                    readonly item: string;
                }>;
            } | {
                readonly _tag: "BlurredInput";
                readonly restingInputValue: string;
                readonly isClearable: boolean;
            } | {
                readonly _tag: "Closed";
                readonly restingInputValue: string;
                readonly isClearable: boolean;
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
                readonly _tag: "PressedToggleButton";
                readonly restingInputValue: string;
                readonly isClearable: boolean;
            } | {
                readonly _tag: "RequestedItemClick";
                readonly index: number;
            } | {
                readonly _tag: "SelectedItem";
                readonly item: string;
                readonly displayText: string;
                readonly wasSelected: boolean;
            } | {
                readonly _tag: "UpdatedInputValue";
                readonly value: string;
            };
        } | {
            readonly _tag: "GotComboboxPlacementLockDemoMessage";
            readonly message: {
                readonly _tag: "CompletedAnchorCombobox";
            } | {
                readonly _tag: "CompletedAttachComboboxPreventBlur";
            } | {
                readonly _tag: "CompletedAttachComboboxSelectOnFocus";
            } | {
                readonly _tag: "CompletedClickItem";
            } | {
                readonly _tag: "CompletedFocusInput";
            } | {
                readonly _tag: "CompletedInertOthers";
            } | {
                readonly _tag: "CompletedLockScroll";
            } | {
                readonly _tag: "CompletedPortalComboboxBackdrop";
            } | {
                readonly _tag: "CompletedRestoreInert";
            } | {
                readonly _tag: "CompletedScrollIntoView";
            } | {
                readonly _tag: "CompletedUnlockScroll";
            } | {
                readonly _tag: "DeactivatedItem";
            } | {
                readonly _tag: "SuppressedEmptyItemNavigation";
            } | {
                readonly _tag: "SuppressedItemCommit";
            } | {
                readonly _tag: "ActivatedItem";
                readonly index: number;
                readonly activationTrigger: "Keyboard" | "Pointer";
                readonly maybeImmediateSelection: Option.Option<{
                    readonly item: string;
                }>;
            } | {
                readonly _tag: "BlurredInput";
                readonly restingInputValue: string;
                readonly isClearable: boolean;
            } | {
                readonly _tag: "Closed";
                readonly restingInputValue: string;
                readonly isClearable: boolean;
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
                readonly _tag: "PressedToggleButton";
                readonly restingInputValue: string;
                readonly isClearable: boolean;
            } | {
                readonly _tag: "RequestedItemClick";
                readonly index: number;
            } | {
                readonly _tag: "SelectedItem";
                readonly item: string;
                readonly displayText: string;
                readonly wasSelected: boolean;
            } | {
                readonly _tag: "UpdatedInputValue";
                readonly value: string;
            };
        } | {
            readonly _tag: "GotComboboxSelectOnFocusDemoMessage";
            readonly message: {
                readonly _tag: "CompletedAnchorCombobox";
            } | {
                readonly _tag: "CompletedAttachComboboxPreventBlur";
            } | {
                readonly _tag: "CompletedAttachComboboxSelectOnFocus";
            } | {
                readonly _tag: "CompletedClickItem";
            } | {
                readonly _tag: "CompletedFocusInput";
            } | {
                readonly _tag: "CompletedInertOthers";
            } | {
                readonly _tag: "CompletedLockScroll";
            } | {
                readonly _tag: "CompletedPortalComboboxBackdrop";
            } | {
                readonly _tag: "CompletedRestoreInert";
            } | {
                readonly _tag: "CompletedScrollIntoView";
            } | {
                readonly _tag: "CompletedUnlockScroll";
            } | {
                readonly _tag: "DeactivatedItem";
            } | {
                readonly _tag: "SuppressedEmptyItemNavigation";
            } | {
                readonly _tag: "SuppressedItemCommit";
            } | {
                readonly _tag: "ActivatedItem";
                readonly index: number;
                readonly activationTrigger: "Keyboard" | "Pointer";
                readonly maybeImmediateSelection: Option.Option<{
                    readonly item: string;
                }>;
            } | {
                readonly _tag: "BlurredInput";
                readonly restingInputValue: string;
                readonly isClearable: boolean;
            } | {
                readonly _tag: "Closed";
                readonly restingInputValue: string;
                readonly isClearable: boolean;
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
                readonly _tag: "PressedToggleButton";
                readonly restingInputValue: string;
                readonly isClearable: boolean;
            } | {
                readonly _tag: "RequestedItemClick";
                readonly index: number;
            } | {
                readonly _tag: "SelectedItem";
                readonly item: string;
                readonly displayText: string;
                readonly wasSelected: boolean;
            } | {
                readonly _tag: "UpdatedInputValue";
                readonly value: string;
            };
        } | {
            readonly _tag: "GotDatePickerBasicDemoMessage";
            readonly message: {
                readonly _tag: "Cleared";
            } | {
                readonly _tag: "Closed";
            } | {
                readonly _tag: "Opened";
            } | {
                readonly _tag: "GotCalendarMessage";
                readonly message: {
                    readonly _tag: "BlurredGrid";
                } | {
                    readonly _tag: "ClickedHeading";
                } | {
                    readonly _tag: "ClickedNextMonthButton";
                } | {
                    readonly _tag: "ClickedPreviousMonthButton";
                } | {
                    readonly _tag: "CompletedFocusGrid";
                } | {
                    readonly _tag: "FocusedGrid";
                } | {
                    readonly _tag: "ClickedDay";
                    readonly date: {
                        readonly year: number;
                        readonly month: number;
                        readonly day: number;
                    };
                } | {
                    readonly _tag: "PagedYears";
                    readonly direction: -1 | 1;
                } | {
                    readonly _tag: "PressedKeyOnGrid";
                    readonly key: string;
                    readonly isShift: boolean;
                } | {
                    readonly _tag: "RefreshedToday";
                    readonly today: {
                        readonly year: number;
                        readonly month: number;
                        readonly day: number;
                    };
                } | {
                    readonly _tag: "SelectedMonth";
                    readonly month: number;
                } | {
                    readonly _tag: "SelectedYear";
                    readonly year: number;
                };
            } | {
                readonly _tag: "GotPopoverMessage";
                readonly message: {
                    readonly _tag: "BlurredPanel";
                } | {
                    readonly _tag: "ClickedButton";
                } | {
                    readonly _tag: "CompletedAnchorPopover";
                } | {
                    readonly _tag: "CompletedFocusButton";
                } | {
                    readonly _tag: "CompletedFocusPanel";
                } | {
                    readonly _tag: "CompletedInertOthers";
                } | {
                    readonly _tag: "CompletedLockScroll";
                } | {
                    readonly _tag: "CompletedPortalPopoverBackdrop";
                } | {
                    readonly _tag: "CompletedRestoreInert";
                } | {
                    readonly _tag: "CompletedUnlockScroll";
                } | {
                    readonly _tag: "IgnoredMouseClick";
                } | {
                    readonly _tag: "RequestedClose";
                } | {
                    readonly _tag: "RequestedOpen";
                } | {
                    readonly _tag: "SuppressedSpaceScroll";
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
                    readonly _tag: "PressedPointerOnButton";
                    readonly pointerType: string;
                    readonly button: number;
                };
            } | {
                readonly _tag: "RequestedSelectDate";
                readonly date: {
                    readonly year: number;
                    readonly month: number;
                    readonly day: number;
                };
            };
        } | {
            readonly _tag: "GotDialogAnimatedDemoMessage";
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
            readonly _tag: "GotDialogDemoMessage";
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
            readonly _tag: "GotDragAndDropDemoMessage";
            readonly message: {
                readonly _tag: "AdvancedAutoScrollFrame";
            } | {
                readonly _tag: "CancelledDrag";
            } | {
                readonly _tag: "CompletedFocusItem";
            } | {
                readonly _tag: "ConfirmedKeyboardDrop";
            } | {
                readonly _tag: "ReleasedPointer";
            } | {
                readonly _tag: "ActivatedKeyboardDrag";
                readonly itemId: string;
                readonly containerId: string;
                readonly index: number;
            } | {
                readonly _tag: "CompletedResolveKeyboardMove";
                readonly targetContainerId: string;
                readonly targetIndex: number;
            } | {
                readonly _tag: "MovedPointer";
                readonly screenX: number;
                readonly screenY: number;
                readonly clientX: number;
                readonly clientY: number;
                readonly maybeDropTarget: Option.Option<{
                    readonly containerId: string;
                    readonly index: number;
                }>;
            } | {
                readonly _tag: "PressedArrowKey";
                readonly direction: "Down" | "Left" | "NextContainer" | "PreviousContainer" | "Right" | "Up";
            } | {
                readonly _tag: "PressedDraggable";
                readonly itemId: string;
                readonly containerId: string;
                readonly index: number;
                readonly screenX: number;
                readonly screenY: number;
            };
        } | {
            readonly _tag: "GotFileDropBasicDemoMessage";
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
            readonly _tag: "GotHorizontalRadioGroupDemoMessage";
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
            readonly _tag: "GotHorizontalTabsDemoMessage";
            readonly message: {
                readonly _tag: "CompletedFocusTab";
            } | {
                readonly _tag: "FocusedTab";
                readonly index: number;
            } | {
                readonly _tag: "SelectedTab";
                readonly index: number;
                readonly value: string;
            };
        } | {
            readonly _tag: "GotHoverIntentCardDemoMessage";
            readonly message: {
                readonly _tag: "BlurredPanel";
            } | {
                readonly _tag: "BlurredTrigger";
            } | {
                readonly _tag: "EnteredPanel";
            } | {
                readonly _tag: "EnteredTrigger";
            } | {
                readonly _tag: "FocusedPanel";
            } | {
                readonly _tag: "FocusedTrigger";
            } | {
                readonly _tag: "LeftPanel";
            } | {
                readonly _tag: "LeftTrigger";
            } | {
                readonly _tag: "CompletedWaitBeforeClosing";
                readonly version: number;
            } | {
                readonly _tag: "CompletedWaitBeforeOpening";
                readonly version: number;
            } | {
                readonly _tag: "PressedEscape";
                readonly source: "Panel" | "Trigger";
            };
        } | {
            readonly _tag: "GotHoverIntentMenuDemoMessage";
            readonly message: {
                readonly _tag: "BlurredPanel";
            } | {
                readonly _tag: "BlurredTrigger";
            } | {
                readonly _tag: "EnteredPanel";
            } | {
                readonly _tag: "EnteredTrigger";
            } | {
                readonly _tag: "FocusedPanel";
            } | {
                readonly _tag: "FocusedTrigger";
            } | {
                readonly _tag: "LeftPanel";
            } | {
                readonly _tag: "LeftTrigger";
            } | {
                readonly _tag: "CompletedWaitBeforeClosing";
                readonly version: number;
            } | {
                readonly _tag: "CompletedWaitBeforeOpening";
                readonly version: number;
            } | {
                readonly _tag: "PressedEscape";
                readonly source: "Panel" | "Trigger";
            };
        } | {
            readonly _tag: "GotListboxDemoMessage";
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
            readonly _tag: "GotListboxGroupedDemoMessage";
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
            readonly _tag: "GotListboxMultiDemoMessage";
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
            readonly _tag: "GotMenuAnimatedDemoMessage";
            readonly message: {
                readonly _tag: "BlurredItems";
            } | {
                readonly _tag: "ClickedButton";
            } | {
                readonly _tag: "Closed";
            } | {
                readonly _tag: "CompletedAnchorMenu";
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
                readonly _tag: "CompletedPortalMenuBackdrop";
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
                readonly screenX: number;
                readonly screenY: number;
                readonly timeStamp: number;
            } | {
                readonly _tag: "ReleasedPointerOnItems";
                readonly screenX: number;
                readonly screenY: number;
                readonly timeStamp: number;
            } | {
                readonly _tag: "RequestedItemClick";
                readonly index: number;
            } | {
                readonly _tag: "Searched";
                readonly key: string;
                readonly maybeTargetIndex: Option.Option<number>;
            } | {
                readonly _tag: "SelectedItem";
                readonly index: number;
                readonly item: string;
            };
        } | {
            readonly _tag: "GotMenuBasicDemoMessage";
            readonly message: {
                readonly _tag: "BlurredItems";
            } | {
                readonly _tag: "ClickedButton";
            } | {
                readonly _tag: "Closed";
            } | {
                readonly _tag: "CompletedAnchorMenu";
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
                readonly _tag: "CompletedPortalMenuBackdrop";
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
                readonly screenX: number;
                readonly screenY: number;
                readonly timeStamp: number;
            } | {
                readonly _tag: "ReleasedPointerOnItems";
                readonly screenX: number;
                readonly screenY: number;
                readonly timeStamp: number;
            } | {
                readonly _tag: "RequestedItemClick";
                readonly index: number;
            } | {
                readonly _tag: "Searched";
                readonly key: string;
                readonly maybeTargetIndex: Option.Option<number>;
            } | {
                readonly _tag: "SelectedItem";
                readonly index: number;
                readonly item: string;
            };
        } | {
            readonly _tag: "GotNestedDialogChildDemoMessage";
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
            readonly _tag: "GotNestedDialogParentDemoMessage";
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
            readonly _tag: "GotOverlayComboboxDemoMessage";
            readonly message: {
                readonly _tag: "CompletedAnchorCombobox";
            } | {
                readonly _tag: "CompletedAttachComboboxPreventBlur";
            } | {
                readonly _tag: "CompletedAttachComboboxSelectOnFocus";
            } | {
                readonly _tag: "CompletedClickItem";
            } | {
                readonly _tag: "CompletedFocusInput";
            } | {
                readonly _tag: "CompletedInertOthers";
            } | {
                readonly _tag: "CompletedLockScroll";
            } | {
                readonly _tag: "CompletedPortalComboboxBackdrop";
            } | {
                readonly _tag: "CompletedRestoreInert";
            } | {
                readonly _tag: "CompletedScrollIntoView";
            } | {
                readonly _tag: "CompletedUnlockScroll";
            } | {
                readonly _tag: "DeactivatedItem";
            } | {
                readonly _tag: "SuppressedEmptyItemNavigation";
            } | {
                readonly _tag: "SuppressedItemCommit";
            } | {
                readonly _tag: "ActivatedItem";
                readonly index: number;
                readonly activationTrigger: "Keyboard" | "Pointer";
                readonly maybeImmediateSelection: Option.Option<{
                    readonly item: string;
                }>;
            } | {
                readonly _tag: "BlurredInput";
                readonly restingInputValue: string;
                readonly isClearable: boolean;
            } | {
                readonly _tag: "Closed";
                readonly restingInputValue: string;
                readonly isClearable: boolean;
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
                readonly _tag: "PressedToggleButton";
                readonly restingInputValue: string;
                readonly isClearable: boolean;
            } | {
                readonly _tag: "RequestedItemClick";
                readonly index: number;
            } | {
                readonly _tag: "SelectedItem";
                readonly item: string;
                readonly displayText: string;
                readonly wasSelected: boolean;
            } | {
                readonly _tag: "UpdatedInputValue";
                readonly value: string;
            };
        } | {
            readonly _tag: "GotOverlayDialogDemoMessage";
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
            readonly _tag: "GotPopoverAnimatedDemoMessage";
            readonly message: {
                readonly _tag: "BlurredPanel";
            } | {
                readonly _tag: "ClickedButton";
            } | {
                readonly _tag: "CompletedAnchorPopover";
            } | {
                readonly _tag: "CompletedFocusButton";
            } | {
                readonly _tag: "CompletedFocusPanel";
            } | {
                readonly _tag: "CompletedInertOthers";
            } | {
                readonly _tag: "CompletedLockScroll";
            } | {
                readonly _tag: "CompletedPortalPopoverBackdrop";
            } | {
                readonly _tag: "CompletedRestoreInert";
            } | {
                readonly _tag: "CompletedUnlockScroll";
            } | {
                readonly _tag: "IgnoredMouseClick";
            } | {
                readonly _tag: "RequestedClose";
            } | {
                readonly _tag: "RequestedOpen";
            } | {
                readonly _tag: "SuppressedSpaceScroll";
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
                readonly _tag: "PressedPointerOnButton";
                readonly pointerType: string;
                readonly button: number;
            };
        } | {
            readonly _tag: "GotPopoverArrowDemoMessage";
            readonly message: {
                readonly _tag: "BlurredPanel";
            } | {
                readonly _tag: "ClickedButton";
            } | {
                readonly _tag: "CompletedAnchorPopover";
            } | {
                readonly _tag: "CompletedFocusButton";
            } | {
                readonly _tag: "CompletedFocusPanel";
            } | {
                readonly _tag: "CompletedInertOthers";
            } | {
                readonly _tag: "CompletedLockScroll";
            } | {
                readonly _tag: "CompletedPortalPopoverBackdrop";
            } | {
                readonly _tag: "CompletedRestoreInert";
            } | {
                readonly _tag: "CompletedUnlockScroll";
            } | {
                readonly _tag: "IgnoredMouseClick";
            } | {
                readonly _tag: "RequestedClose";
            } | {
                readonly _tag: "RequestedOpen";
            } | {
                readonly _tag: "SuppressedSpaceScroll";
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
                readonly _tag: "PressedPointerOnButton";
                readonly pointerType: string;
                readonly button: number;
            };
        } | {
            readonly _tag: "GotPopoverBasicDemoMessage";
            readonly message: {
                readonly _tag: "BlurredPanel";
            } | {
                readonly _tag: "ClickedButton";
            } | {
                readonly _tag: "CompletedAnchorPopover";
            } | {
                readonly _tag: "CompletedFocusButton";
            } | {
                readonly _tag: "CompletedFocusPanel";
            } | {
                readonly _tag: "CompletedInertOthers";
            } | {
                readonly _tag: "CompletedLockScroll";
            } | {
                readonly _tag: "CompletedPortalPopoverBackdrop";
            } | {
                readonly _tag: "CompletedRestoreInert";
            } | {
                readonly _tag: "CompletedUnlockScroll";
            } | {
                readonly _tag: "IgnoredMouseClick";
            } | {
                readonly _tag: "RequestedClose";
            } | {
                readonly _tag: "RequestedOpen";
            } | {
                readonly _tag: "SuppressedSpaceScroll";
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
                readonly _tag: "PressedPointerOnButton";
                readonly pointerType: string;
                readonly button: number;
            };
        } | {
            readonly _tag: "GotPopoverNestedChildDemoMessage";
            readonly message: {
                readonly _tag: "BlurredPanel";
            } | {
                readonly _tag: "ClickedButton";
            } | {
                readonly _tag: "CompletedAnchorPopover";
            } | {
                readonly _tag: "CompletedFocusButton";
            } | {
                readonly _tag: "CompletedFocusPanel";
            } | {
                readonly _tag: "CompletedInertOthers";
            } | {
                readonly _tag: "CompletedLockScroll";
            } | {
                readonly _tag: "CompletedPortalPopoverBackdrop";
            } | {
                readonly _tag: "CompletedRestoreInert";
            } | {
                readonly _tag: "CompletedUnlockScroll";
            } | {
                readonly _tag: "IgnoredMouseClick";
            } | {
                readonly _tag: "RequestedClose";
            } | {
                readonly _tag: "RequestedOpen";
            } | {
                readonly _tag: "SuppressedSpaceScroll";
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
                readonly _tag: "PressedPointerOnButton";
                readonly pointerType: string;
                readonly button: number;
            };
        } | {
            readonly _tag: "GotPopoverNestedParentDemoMessage";
            readonly message: {
                readonly _tag: "BlurredPanel";
            } | {
                readonly _tag: "ClickedButton";
            } | {
                readonly _tag: "CompletedAnchorPopover";
            } | {
                readonly _tag: "CompletedFocusButton";
            } | {
                readonly _tag: "CompletedFocusPanel";
            } | {
                readonly _tag: "CompletedInertOthers";
            } | {
                readonly _tag: "CompletedLockScroll";
            } | {
                readonly _tag: "CompletedPortalPopoverBackdrop";
            } | {
                readonly _tag: "CompletedRestoreInert";
            } | {
                readonly _tag: "CompletedUnlockScroll";
            } | {
                readonly _tag: "IgnoredMouseClick";
            } | {
                readonly _tag: "RequestedClose";
            } | {
                readonly _tag: "RequestedOpen";
            } | {
                readonly _tag: "SuppressedSpaceScroll";
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
                readonly _tag: "PressedPointerOnButton";
                readonly pointerType: string;
                readonly button: number;
            };
        } | {
            readonly _tag: "GotSliderRatingDemoMessage";
            readonly message: {
                readonly _tag: "CancelledDrag";
            } | {
                readonly _tag: "ReleasedDragPointer";
            } | {
                readonly _tag: "MovedDragPointer";
                readonly value: number;
            } | {
                readonly _tag: "PressedKeyboardNavigation";
                readonly direction: "Max" | "Min" | "PageDecrement" | "PageIncrement" | "StepDecrement" | "StepIncrement";
                readonly value: number;
            } | {
                readonly _tag: "PressedPointer";
                readonly value: number;
                readonly originValue: number;
            } | {
                readonly _tag: "PressedThumb";
                readonly originValue: number;
            };
        } | {
            readonly _tag: "GotSliderVolumeDemoMessage";
            readonly message: {
                readonly _tag: "CancelledDrag";
            } | {
                readonly _tag: "ReleasedDragPointer";
            } | {
                readonly _tag: "MovedDragPointer";
                readonly value: number;
            } | {
                readonly _tag: "PressedKeyboardNavigation";
                readonly direction: "Max" | "Min" | "PageDecrement" | "PageIncrement" | "StepDecrement" | "StepIncrement";
                readonly value: number;
            } | {
                readonly _tag: "PressedPointer";
                readonly value: number;
                readonly originValue: number;
            } | {
                readonly _tag: "PressedThumb";
                readonly originValue: number;
            };
        } | {
            readonly _tag: "GotToastDemoMessage";
            readonly message: {
                readonly _tag: "DismissedAll";
            } | {
                readonly _tag: "PressedEscape";
            } | {
                readonly _tag: "Added";
                readonly entry: {
                    readonly id: string;
                    readonly variant: "Error" | "Info" | "Success" | "Warning";
                    readonly animation: {
                        readonly id: string;
                        readonly isShowing: boolean;
                        readonly transitionState: "EnterAnimating" | "EnterStart" | "Idle" | "LeaveAnimating" | "LeaveStart";
                        readonly transitionGeneration: number;
                    };
                    readonly maybeDuration: Option.Option<import("effect/Duration").Duration>;
                    readonly pendingDismissVersion: number;
                    readonly isHovered: boolean;
                    readonly swipeState: {
                        readonly _tag: "Idle";
                    } | {
                        readonly _tag: "Dismissing";
                        readonly offsetX: number;
                        readonly direction: "Left" | "Right";
                    } | {
                        readonly _tag: "Dragging";
                        readonly pointerId: number;
                        readonly startX: number;
                        readonly currentX: number;
                    } | {
                        readonly _tag: "Settling";
                        readonly offsetX: number;
                    };
                    readonly swipeVersion: number;
                    readonly payload: {
                        readonly title: string;
                        readonly maybeDescription: Option.Option<string>;
                    };
                };
            } | {
                readonly _tag: "CancelledSwipe";
                readonly pointerId: number;
            } | {
                readonly _tag: "CompletedWaitBeforeDismissal";
                readonly entryId: string;
                readonly version: number;
            } | {
                readonly _tag: "CompletedWaitForSwipeSettled";
                readonly entryId: string;
                readonly version: number;
            } | {
                readonly _tag: "Dismissed";
                readonly entryId: string;
            } | {
                readonly _tag: "GotAnimationMessage";
                readonly entryId: string;
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
                readonly _tag: "HoveredEntry";
                readonly entryId: string;
            } | {
                readonly _tag: "LeftEntry";
                readonly entryId: string;
            } | {
                readonly _tag: "MovedSwipePointer";
                readonly pointerId: number;
                readonly clientX: number;
            } | {
                readonly _tag: "PressedEntryPointer";
                readonly entryId: string;
                readonly pointerId: number;
                readonly clientX: number;
            } | {
                readonly _tag: "ReleasedSwipePointer";
                readonly pointerId: number;
                readonly clientX: number;
            };
        } | {
            readonly _tag: "GotTooltipDemoMessage";
            readonly message: {
                readonly _tag: "BlurredTrigger";
            } | {
                readonly _tag: "CompletedAnchorTooltip";
            } | {
                readonly _tag: "EnteredTrigger";
            } | {
                readonly _tag: "FocusedTrigger";
            } | {
                readonly _tag: "LeftTrigger";
            } | {
                readonly _tag: "PressedEscape";
            } | {
                readonly _tag: "CompletedWaitBeforeShowing";
                readonly version: number;
            } | {
                readonly _tag: "PressedPointerOnTrigger";
                readonly pointerType: string;
            };
        } | {
            readonly _tag: "GotVerticalRadioGroupDemoMessage";
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
            readonly _tag: "GotVerticalTabsDemoMessage";
            readonly message: {
                readonly _tag: "CompletedFocusTab";
            } | {
                readonly _tag: "FocusedTab";
                readonly index: number;
            } | {
                readonly _tag: "SelectedTab";
                readonly index: number;
                readonly value: string;
            };
        } | {
            readonly _tag: "GotVirtualListChatDemoMessage";
            readonly message: {
                readonly _tag: "CompletedApplyScroll";
                readonly version: number;
                readonly outcome: {
                    readonly _tag: "Skipped";
                } | {
                    readonly _tag: "Applied";
                    readonly scrollTop: number;
                    readonly scrollHeight: number;
                    readonly containerHeight: number;
                    readonly anchor: {
                        readonly _tag: "None";
                    } | {
                        readonly _tag: "Row";
                        readonly key: string;
                        readonly index: number;
                        readonly viewportOffset: number;
                    };
                };
            } | {
                readonly _tag: "MeasuredRows";
                readonly measurements: readonly {
                    readonly key: string;
                    readonly height: number;
                    readonly layoutVersion: number;
                }[];
            } | {
                readonly _tag: "ObservedContainerScroll";
                readonly scrollTop: number;
                readonly scrollHeight: number;
                readonly containerHeight: number;
                readonly anchor: {
                    readonly _tag: "None";
                } | {
                    readonly _tag: "Row";
                    readonly key: string;
                    readonly index: number;
                    readonly viewportOffset: number;
                };
            } | {
                readonly _tag: "ResizedContainer";
                readonly containerWidth: number;
                readonly containerHeight: number;
            };
        } | {
            readonly _tag: "GotVirtualListDemoMessage";
            readonly message: {
                readonly _tag: "CompletedApplyScroll";
                readonly version: number;
                readonly outcome: {
                    readonly _tag: "Skipped";
                } | {
                    readonly _tag: "Applied";
                    readonly scrollTop: number;
                    readonly scrollHeight: number;
                    readonly containerHeight: number;
                    readonly anchor: {
                        readonly _tag: "None";
                    } | {
                        readonly _tag: "Row";
                        readonly key: string;
                        readonly index: number;
                        readonly viewportOffset: number;
                    };
                };
            } | {
                readonly _tag: "MeasuredRows";
                readonly measurements: readonly {
                    readonly key: string;
                    readonly height: number;
                    readonly layoutVersion: number;
                }[];
            } | {
                readonly _tag: "ObservedContainerScroll";
                readonly scrollTop: number;
                readonly scrollHeight: number;
                readonly containerHeight: number;
                readonly anchor: {
                    readonly _tag: "None";
                } | {
                    readonly _tag: "Row";
                    readonly key: string;
                    readonly index: number;
                    readonly viewportOffset: number;
                };
            } | {
                readonly _tag: "ResizedContainer";
                readonly containerWidth: number;
                readonly containerHeight: number;
            };
        } | {
            readonly _tag: "GotVirtualListVariableDemoMessage";
            readonly message: {
                readonly _tag: "CompletedApplyScroll";
                readonly version: number;
                readonly outcome: {
                    readonly _tag: "Skipped";
                } | {
                    readonly _tag: "Applied";
                    readonly scrollTop: number;
                    readonly scrollHeight: number;
                    readonly containerHeight: number;
                    readonly anchor: {
                        readonly _tag: "None";
                    } | {
                        readonly _tag: "Row";
                        readonly key: string;
                        readonly index: number;
                        readonly viewportOffset: number;
                    };
                };
            } | {
                readonly _tag: "MeasuredRows";
                readonly measurements: readonly {
                    readonly key: string;
                    readonly height: number;
                    readonly layoutVersion: number;
                }[];
            } | {
                readonly _tag: "ObservedContainerScroll";
                readonly scrollTop: number;
                readonly scrollHeight: number;
                readonly containerHeight: number;
                readonly anchor: {
                    readonly _tag: "None";
                } | {
                    readonly _tag: "Row";
                    readonly key: string;
                    readonly index: number;
                    readonly viewportOffset: number;
                };
            } | {
                readonly _tag: "ResizedContainer";
                readonly containerWidth: number;
                readonly containerHeight: number;
            };
        } | {
            readonly _tag: "ToggledCheckboxAllDemo";
            readonly isChecked: boolean;
        } | {
            readonly _tag: "ToggledCheckboxBasicDemo";
            readonly isChecked: boolean;
        } | {
            readonly _tag: "ToggledCheckboxOptionADemo";
            readonly isChecked: boolean;
        } | {
            readonly _tag: "ToggledCheckboxOptionBDemo";
            readonly isChecked: boolean;
        } | {
            readonly _tag: "ToggledDisclosureCollapsedPreviewDemo";
            readonly isOpen: boolean;
        } | {
            readonly _tag: "ToggledDisclosureDemo";
            readonly isOpen: boolean;
        } | {
            readonly _tag: "ToggledFieldsetCheckboxDemo";
            readonly isChecked: boolean;
        } | {
            readonly _tag: "ToggledSwitchDemo";
            readonly isChecked: boolean;
        } | {
            readonly _tag: "UpdatedFieldsetInputValue";
            readonly value: string;
        } | {
            readonly _tag: "UpdatedFieldsetTextareaValue";
            readonly value: string;
        } | {
            readonly _tag: "UpdatedInputDemoValue";
            readonly value: string;
        } | {
            readonly _tag: "UpdatedSelectDemoValue";
            readonly value: string;
        } | {
            readonly _tag: "UpdatedTextareaDemoValue";
            readonly value: string;
        };
    } | {
        readonly _tag: "ToggledMobileTableOfContents";
        readonly isOpen: boolean;
    } | {
        readonly _tag: "ToggledSidebarGroup";
        readonly key: "ai" | "apiReference" | "bestPractices" | "blog" | "comparisons" | "coreConcepts" | "examples" | "faq" | "foldkitUi" | "introduction" | "patterns" | "testing" | "tooling";
        readonly isOpen: boolean;
    } | {
        readonly _tag: "UpdatedNewsletterEmail";
        readonly value: string;
    }, Option.Option<null>, AudioContext, ManagedResource.ManagedResourceService<"AudioContext">, () => {
        readonly _tag: "ClickedOpenMobileMenu";
    } | {
        readonly _tag: "ClickedOpenSearch";
    } | {
        readonly _tag: "CompletedApplyTheme";
    } | {
        readonly _tag: "CompletedInjectAnalytics";
    } | {
        readonly _tag: "CompletedInjectSpeedInsights";
    } | {
        readonly _tag: "CompletedLoadExternal";
    } | {
        readonly _tag: "CompletedLoadPlayground";
    } | {
        readonly _tag: "CompletedNavigateInternal";
    } | {
        readonly _tag: "CompletedSaveSidebarState";
    } | {
        readonly _tag: "CompletedSaveThemePreference";
    } | {
        readonly _tag: "CompletedScrollMobileMenuActiveLinkIntoView";
    } | {
        readonly _tag: "CompletedScrollSidebarActiveLinkIntoView";
    } | {
        readonly _tag: "CompletedScrollToAnchor";
    } | {
        readonly _tag: "CompletedScrollToTop";
    } | {
        readonly _tag: "FailedCopyLink";
    } | {
        readonly _tag: "PressedSearchShortcut";
    } | {
        readonly _tag: "SucceededCopyLink";
    } | {
        readonly _tag: "ChangedActiveSection";
        readonly sectionId: string;
    } | {
        readonly _tag: "ChangedSystemTheme";
        readonly theme: "Dark" | "Light";
    } | {
        readonly _tag: "ChangedUrl";
        readonly url: {
            readonly protocol: string;
            readonly host: string;
            readonly port: Option.Option<string>;
            readonly pathname: string;
            readonly search: Option.Option<string>;
            readonly hash: Option.Option<string>;
        };
    } | {
        readonly _tag: "ChangedViewportWidth";
        readonly isNarrow: boolean;
    } | {
        readonly _tag: "ClickedCopyLink";
        readonly hash: string;
    } | {
        readonly _tag: "ClickedLink";
        readonly request: {
            readonly _tag: "External";
            readonly href: string;
        } | {
            readonly _tag: "Internal";
            readonly url: {
                readonly protocol: string;
                readonly host: string;
                readonly port: Option.Option<string>;
                readonly pathname: string;
                readonly search: Option.Option<string>;
                readonly hash: Option.Option<string>;
            };
        };
    } | {
        readonly _tag: "ClickedMobileTableOfContentsLink";
        readonly sectionId: string;
    } | {
        readonly _tag: "CompletedLoadBrowserEnvironment";
        readonly maybeThemePreference: Option.Option<"Dark" | "Light" | "System">;
        readonly maybeSidebarState: Option.Option<{
            readonly open: {
                readonly [x: string]: boolean;
            };
        }>;
        readonly systemTheme: "Dark" | "Light";
        readonly isPlaygroundSupported: boolean;
        readonly currentYear: number;
        readonly today: {
            readonly year: number;
            readonly month: number;
            readonly day: number;
        };
    } | {
        readonly _tag: "GotApiReferenceMessage";
        readonly message: {
            readonly _tag: "RequestedApiData";
        } | {
            readonly _tag: "FailedLoadApiData";
            readonly error: string;
        } | {
            readonly _tag: "SucceededLoadApiData";
            readonly apiData: {
                readonly parsedApi: {
                    readonly modules: readonly {
                        readonly name: string;
                        readonly functions: readonly {
                            readonly name: string;
                            readonly description: Option.Option<string>;
                            readonly signatures: readonly {
                                readonly parameters: readonly {
                                    readonly name: string;
                                    readonly type: string;
                                    readonly isOptional: boolean;
                                    readonly isRest: boolean;
                                    readonly defaultValue: Option.Option<string>;
                                    readonly description: Option.Option<string>;
                                }[];
                                readonly returnType: string;
                                readonly typeParameters: readonly string[];
                            }[];
                            readonly sourceUrl: Option.Option<string>;
                        }[];
                        readonly types: readonly {
                            readonly name: string;
                            readonly description: Option.Option<string>;
                            readonly typeDefinition: string;
                            readonly sourceUrl: Option.Option<string>;
                        }[];
                        readonly interfaces: readonly {
                            readonly name: string;
                            readonly description: Option.Option<string>;
                            readonly typeDefinition: string;
                            readonly sourceUrl: Option.Option<string>;
                        }[];
                        readonly variables: readonly {
                            readonly name: string;
                            readonly description: Option.Option<string>;
                            readonly type: string;
                            readonly sourceUrl: Option.Option<string>;
                        }[];
                    }[];
                };
                readonly highlights: {
                    readonly [x: string]: string;
                };
            };
        } | {
            readonly _tag: "ToggledSignature";
            readonly id: string;
            readonly isOpen: boolean;
        };
    } | {
        readonly _tag: "GotComingFromReactMessage";
        readonly message: {
            readonly _tag: "ToggledFaq";
            readonly id: string;
            readonly isOpen: boolean;
        };
    } | {
        readonly _tag: "GotCoreSubmodelPageMessage";
        readonly message: {
            readonly _tag: "ToggledMapMessagesUnderHood";
            readonly isOpen: boolean;
        };
    } | {
        readonly _tag: "GotExampleDetailMessage";
        readonly message: {
            readonly _tag: "ChangedExampleUrl";
            readonly url: string;
        } | {
            readonly _tag: "FailedLoadExampleSources";
            readonly error: string;
        } | {
            readonly _tag: "GotSourceFileTabsMessage";
            readonly message: {
                readonly _tag: "CompletedFocusTab";
            } | {
                readonly _tag: "FocusedTab";
                readonly index: number;
            } | {
                readonly _tag: "SelectedTab";
                readonly index: number;
                readonly value: string;
            };
        } | {
            readonly _tag: "RequestedExampleSources";
            readonly slug: string;
        } | {
            readonly _tag: "SucceededLoadExampleSources";
            readonly sources: {
                readonly files: readonly {
                    readonly path: string;
                    readonly highlightedHtml: string;
                    readonly rawCode: string;
                }[];
            };
        } | {
            readonly _tag: "ToggledLivePreview";
            readonly isOpen: boolean;
        };
    } | {
        readonly _tag: "GotHomeMessage";
        readonly message: {
            readonly _tag: "GotAsyncCounterDemoMessage";
            readonly message: {
                readonly _tag: "ClickedDemoIncrement";
            } | {
                readonly _tag: "ClickedDemoReset";
            } | {
                readonly _tag: "ChangedDemoResetDuration";
                readonly seconds: number;
            } | {
                readonly _tag: "CompletedDelayAdvancePhase";
                readonly generation: number;
            };
        } | {
            readonly _tag: "GotDemoTabsMessage";
            readonly message: {
                readonly _tag: "CompletedFocusTab";
            } | {
                readonly _tag: "FocusedTab";
                readonly index: number;
            } | {
                readonly _tag: "SelectedTab";
                readonly index: number;
                readonly value: string;
            };
        } | {
            readonly _tag: "GotNotePlayerDemoMessage";
            readonly message: {
                readonly _tag: "ClickedPause";
            } | {
                readonly _tag: "ClickedPlay";
            } | {
                readonly _tag: "ClickedStop";
            } | {
                readonly _tag: "FailedAcquireAudioContext";
            } | {
                readonly _tag: "ReleasedAudioContext";
            } | {
                readonly _tag: "SucceededAcquireAudioContext";
            } | {
                readonly _tag: "ChangedNoteInput";
                readonly value: string;
            } | {
                readonly _tag: "CompletedDelayAdvancePhase";
                readonly generation: number;
            } | {
                readonly _tag: "CompletedPlayNote";
                readonly noteIndex: number;
            } | {
                readonly _tag: "GotNoteDurationMessage";
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
            };
        } | {
            readonly _tag: "GotPlaygroundMenuMessage";
            readonly message: {
                readonly _tag: "BlurredItems";
            } | {
                readonly _tag: "ClickedButton";
            } | {
                readonly _tag: "Closed";
            } | {
                readonly _tag: "CompletedAnchorMenu";
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
                readonly _tag: "CompletedPortalMenuBackdrop";
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
                readonly screenX: number;
                readonly screenY: number;
                readonly timeStamp: number;
            } | {
                readonly _tag: "ReleasedPointerOnItems";
                readonly screenX: number;
                readonly screenY: number;
                readonly timeStamp: number;
            } | {
                readonly _tag: "RequestedItemClick";
                readonly index: number;
            } | {
                readonly _tag: "Searched";
                readonly key: string;
                readonly maybeTargetIndex: Option.Option<number>;
            } | {
                readonly _tag: "SelectedItem";
                readonly index: number;
                readonly item: string;
            };
        } | {
            readonly _tag: "UpdatedNewsletterEmail";
            readonly value: string;
        };
    } | {
        readonly _tag: "GotMobileMenuDialogMessage";
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
        readonly _tag: "GotPlaygroundMessage";
        readonly message: {
            readonly _tag: "ReleasedPlayground";
        } | {
            readonly _tag: "ScheduledWritePlaygroundFile";
        } | {
            readonly _tag: "SucceededMountPlaygroundEditor";
        } | {
            readonly _tag: "BootedPlayground";
            readonly previewUrl: string;
        } | {
            readonly _tag: "CompletedWaitForPlaygroundServerFailure";
            readonly reason: string;
        } | {
            readonly _tag: "EditedPlaygroundFile";
            readonly path: string;
            readonly content: string;
        } | {
            readonly _tag: "FailedBootPlayground";
            readonly reason: string;
        } | {
            readonly _tag: "FailedMountPlaygroundEditor";
            readonly reason: string;
        } | {
            readonly _tag: "FailedWritePlaygroundFile";
            readonly reason: string;
        } | {
            readonly _tag: "GotFileTabsMessage";
            readonly message: {
                readonly _tag: "CompletedFocusTab";
            } | {
                readonly _tag: "FocusedTab";
                readonly index: number;
            } | {
                readonly _tag: "SelectedTab";
                readonly index: number;
                readonly value: string;
            };
        } | {
            readonly _tag: "LoadedPlaygroundPreview";
            readonly previewUrl: string;
        };
    } | {
        readonly _tag: "GotSearchMessage";
        readonly message: {
            readonly _tag: "ClearedSearchQuery";
        } | {
            readonly _tag: "CompletedFocusSearchInput";
        } | {
            readonly _tag: "CompletedNavigateToResult";
        } | {
            readonly _tag: "CompletedScrollToResult";
        } | {
            readonly _tag: "CompletedFetchSearchResults";
            readonly results: readonly {
                readonly url: string;
                readonly title: string;
                readonly excerpt: string;
                readonly section: string;
                readonly kind: string;
            }[];
            readonly query: string;
        } | {
            readonly _tag: "GotSearchDialogMessage";
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
            readonly _tag: "PressedArrowKey";
            readonly direction: "Down" | "Up";
        } | {
            readonly _tag: "SelectedSearchResult";
            readonly url: string;
        } | {
            readonly _tag: "UpdatedSearchQuery";
            readonly query: string;
        };
    } | {
        readonly _tag: "GotSnippetCopyMessage";
        readonly message: {
            readonly _tag: "FailedCopySnippet";
        } | {
            readonly _tag: "ClickedCopySnippet";
            readonly snippetId: string;
            readonly text: string;
        } | {
            readonly _tag: "CompletedWaitBeforeHidingCopiedIndicator";
            readonly snippetId: string;
        } | {
            readonly _tag: "SucceededCopySnippet";
            readonly snippetId: string;
        };
    } | {
        readonly _tag: "GotSnippetDisclosureMessage";
        readonly message: {
            readonly _tag: "CompletedMeasureSnippetHeight";
            readonly snippetId: string;
            readonly snippetSize: {
                readonly _tag: "Fits";
            } | {
                readonly _tag: "Overflows";
            };
        } | {
            readonly _tag: "ToggledCodeDisclosure";
            readonly disclosureId: string;
            readonly isOpen: boolean;
        };
    } | {
        readonly _tag: "GotThemeMenuMessage";
        readonly message: {
            readonly _tag: "BlurredItems";
        } | {
            readonly _tag: "ClickedButton";
        } | {
            readonly _tag: "Closed";
        } | {
            readonly _tag: "CompletedAnchorMenu";
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
            readonly _tag: "CompletedPortalMenuBackdrop";
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
            readonly screenX: number;
            readonly screenY: number;
            readonly timeStamp: number;
        } | {
            readonly _tag: "ReleasedPointerOnItems";
            readonly screenX: number;
            readonly screenY: number;
            readonly timeStamp: number;
        } | {
            readonly _tag: "RequestedItemClick";
            readonly index: number;
        } | {
            readonly _tag: "Searched";
            readonly key: string;
            readonly maybeTargetIndex: Option.Option<number>;
        } | {
            readonly _tag: "SelectedItem";
            readonly index: number;
            readonly item: string;
        };
    } | {
        readonly _tag: "GotUiPageMessage";
        readonly message: {
            readonly _tag: "ClickedButtonDemo";
        } | {
            readonly _tag: "ClickedDeleteProject";
        } | {
            readonly _tag: "ClickedDismissAllToasts";
        } | {
            readonly _tag: "ClickedEditFilters";
        } | {
            readonly _tag: "ClickedHoverIntentMenuItem";
        } | {
            readonly _tag: "ClickedOpenAnimatedDialog";
        } | {
            readonly _tag: "ClickedOpenDialog";
        } | {
            readonly _tag: "ClickedOpenProjectSettings";
        } | {
            readonly _tag: "ClickedShowErrorToast";
        } | {
            readonly _tag: "ClickedShowInfoToast";
        } | {
            readonly _tag: "ClickedShowStickyToast";
        } | {
            readonly _tag: "ClickedShowSuccessToast";
        } | {
            readonly _tag: "ClickedToggleAnimationDemo";
        } | {
            readonly _tag: "ClickedVirtualListChatAppend";
        } | {
            readonly _tag: "ClickedVirtualListChatPrepend";
        } | {
            readonly _tag: "ClickedVirtualListChatScrollToMessage";
        } | {
            readonly _tag: "ClickedVirtualListScrollToMiddle";
        } | {
            readonly _tag: "ClickedVirtualListVariableScrollToMiddle";
        } | {
            readonly _tag: "ClickedRemoveFileDropDemoFile";
            readonly fileIndex: number;
        } | {
            readonly _tag: "ClickedVirtualListChatToggleMessage";
            readonly messageId: number;
        } | {
            readonly _tag: "GotAnimationDemoMessage";
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
            readonly _tag: "GotCalendarBasicDemoMessage";
            readonly message: {
                readonly _tag: "BlurredGrid";
            } | {
                readonly _tag: "ClickedHeading";
            } | {
                readonly _tag: "ClickedNextMonthButton";
            } | {
                readonly _tag: "ClickedPreviousMonthButton";
            } | {
                readonly _tag: "CompletedFocusGrid";
            } | {
                readonly _tag: "FocusedGrid";
            } | {
                readonly _tag: "ClickedDay";
                readonly date: {
                    readonly year: number;
                    readonly month: number;
                    readonly day: number;
                };
            } | {
                readonly _tag: "PagedYears";
                readonly direction: -1 | 1;
            } | {
                readonly _tag: "PressedKeyOnGrid";
                readonly key: string;
                readonly isShift: boolean;
            } | {
                readonly _tag: "RefreshedToday";
                readonly today: {
                    readonly year: number;
                    readonly month: number;
                    readonly day: number;
                };
            } | {
                readonly _tag: "SelectedMonth";
                readonly month: number;
            } | {
                readonly _tag: "SelectedYear";
                readonly year: number;
            };
        } | {
            readonly _tag: "GotComboboxDemoMessage";
            readonly message: {
                readonly _tag: "CompletedAnchorCombobox";
            } | {
                readonly _tag: "CompletedAttachComboboxPreventBlur";
            } | {
                readonly _tag: "CompletedAttachComboboxSelectOnFocus";
            } | {
                readonly _tag: "CompletedClickItem";
            } | {
                readonly _tag: "CompletedFocusInput";
            } | {
                readonly _tag: "CompletedInertOthers";
            } | {
                readonly _tag: "CompletedLockScroll";
            } | {
                readonly _tag: "CompletedPortalComboboxBackdrop";
            } | {
                readonly _tag: "CompletedRestoreInert";
            } | {
                readonly _tag: "CompletedScrollIntoView";
            } | {
                readonly _tag: "CompletedUnlockScroll";
            } | {
                readonly _tag: "DeactivatedItem";
            } | {
                readonly _tag: "SuppressedEmptyItemNavigation";
            } | {
                readonly _tag: "SuppressedItemCommit";
            } | {
                readonly _tag: "ActivatedItem";
                readonly index: number;
                readonly activationTrigger: "Keyboard" | "Pointer";
                readonly maybeImmediateSelection: Option.Option<{
                    readonly item: string;
                }>;
            } | {
                readonly _tag: "BlurredInput";
                readonly restingInputValue: string;
                readonly isClearable: boolean;
            } | {
                readonly _tag: "Closed";
                readonly restingInputValue: string;
                readonly isClearable: boolean;
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
                readonly _tag: "PressedToggleButton";
                readonly restingInputValue: string;
                readonly isClearable: boolean;
            } | {
                readonly _tag: "RequestedItemClick";
                readonly index: number;
            } | {
                readonly _tag: "SelectedItem";
                readonly item: string;
                readonly displayText: string;
                readonly wasSelected: boolean;
            } | {
                readonly _tag: "UpdatedInputValue";
                readonly value: string;
            };
        } | {
            readonly _tag: "GotComboboxMultiDemoMessage";
            readonly message: {
                readonly _tag: "CompletedAnchorCombobox";
            } | {
                readonly _tag: "CompletedAttachComboboxPreventBlur";
            } | {
                readonly _tag: "CompletedAttachComboboxSelectOnFocus";
            } | {
                readonly _tag: "CompletedClickItem";
            } | {
                readonly _tag: "CompletedFocusInput";
            } | {
                readonly _tag: "CompletedInertOthers";
            } | {
                readonly _tag: "CompletedLockScroll";
            } | {
                readonly _tag: "CompletedPortalComboboxBackdrop";
            } | {
                readonly _tag: "CompletedRestoreInert";
            } | {
                readonly _tag: "CompletedScrollIntoView";
            } | {
                readonly _tag: "CompletedUnlockScroll";
            } | {
                readonly _tag: "DeactivatedItem";
            } | {
                readonly _tag: "SuppressedEmptyItemNavigation";
            } | {
                readonly _tag: "SuppressedItemCommit";
            } | {
                readonly _tag: "ActivatedItem";
                readonly index: number;
                readonly activationTrigger: "Keyboard" | "Pointer";
                readonly maybeImmediateSelection: Option.Option<{
                    readonly item: string;
                }>;
            } | {
                readonly _tag: "BlurredInput";
                readonly restingInputValue: string;
                readonly isClearable: boolean;
            } | {
                readonly _tag: "Closed";
                readonly restingInputValue: string;
                readonly isClearable: boolean;
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
                readonly _tag: "PressedToggleButton";
                readonly restingInputValue: string;
                readonly isClearable: boolean;
            } | {
                readonly _tag: "RequestedItemClick";
                readonly index: number;
            } | {
                readonly _tag: "SelectedItem";
                readonly item: string;
                readonly displayText: string;
                readonly wasSelected: boolean;
            } | {
                readonly _tag: "UpdatedInputValue";
                readonly value: string;
            };
        } | {
            readonly _tag: "GotComboboxNullableDemoMessage";
            readonly message: {
                readonly _tag: "CompletedAnchorCombobox";
            } | {
                readonly _tag: "CompletedAttachComboboxPreventBlur";
            } | {
                readonly _tag: "CompletedAttachComboboxSelectOnFocus";
            } | {
                readonly _tag: "CompletedClickItem";
            } | {
                readonly _tag: "CompletedFocusInput";
            } | {
                readonly _tag: "CompletedInertOthers";
            } | {
                readonly _tag: "CompletedLockScroll";
            } | {
                readonly _tag: "CompletedPortalComboboxBackdrop";
            } | {
                readonly _tag: "CompletedRestoreInert";
            } | {
                readonly _tag: "CompletedScrollIntoView";
            } | {
                readonly _tag: "CompletedUnlockScroll";
            } | {
                readonly _tag: "DeactivatedItem";
            } | {
                readonly _tag: "SuppressedEmptyItemNavigation";
            } | {
                readonly _tag: "SuppressedItemCommit";
            } | {
                readonly _tag: "ActivatedItem";
                readonly index: number;
                readonly activationTrigger: "Keyboard" | "Pointer";
                readonly maybeImmediateSelection: Option.Option<{
                    readonly item: string;
                }>;
            } | {
                readonly _tag: "BlurredInput";
                readonly restingInputValue: string;
                readonly isClearable: boolean;
            } | {
                readonly _tag: "Closed";
                readonly restingInputValue: string;
                readonly isClearable: boolean;
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
                readonly _tag: "PressedToggleButton";
                readonly restingInputValue: string;
                readonly isClearable: boolean;
            } | {
                readonly _tag: "RequestedItemClick";
                readonly index: number;
            } | {
                readonly _tag: "SelectedItem";
                readonly item: string;
                readonly displayText: string;
                readonly wasSelected: boolean;
            } | {
                readonly _tag: "UpdatedInputValue";
                readonly value: string;
            };
        } | {
            readonly _tag: "GotComboboxPlacementLockDemoMessage";
            readonly message: {
                readonly _tag: "CompletedAnchorCombobox";
            } | {
                readonly _tag: "CompletedAttachComboboxPreventBlur";
            } | {
                readonly _tag: "CompletedAttachComboboxSelectOnFocus";
            } | {
                readonly _tag: "CompletedClickItem";
            } | {
                readonly _tag: "CompletedFocusInput";
            } | {
                readonly _tag: "CompletedInertOthers";
            } | {
                readonly _tag: "CompletedLockScroll";
            } | {
                readonly _tag: "CompletedPortalComboboxBackdrop";
            } | {
                readonly _tag: "CompletedRestoreInert";
            } | {
                readonly _tag: "CompletedScrollIntoView";
            } | {
                readonly _tag: "CompletedUnlockScroll";
            } | {
                readonly _tag: "DeactivatedItem";
            } | {
                readonly _tag: "SuppressedEmptyItemNavigation";
            } | {
                readonly _tag: "SuppressedItemCommit";
            } | {
                readonly _tag: "ActivatedItem";
                readonly index: number;
                readonly activationTrigger: "Keyboard" | "Pointer";
                readonly maybeImmediateSelection: Option.Option<{
                    readonly item: string;
                }>;
            } | {
                readonly _tag: "BlurredInput";
                readonly restingInputValue: string;
                readonly isClearable: boolean;
            } | {
                readonly _tag: "Closed";
                readonly restingInputValue: string;
                readonly isClearable: boolean;
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
                readonly _tag: "PressedToggleButton";
                readonly restingInputValue: string;
                readonly isClearable: boolean;
            } | {
                readonly _tag: "RequestedItemClick";
                readonly index: number;
            } | {
                readonly _tag: "SelectedItem";
                readonly item: string;
                readonly displayText: string;
                readonly wasSelected: boolean;
            } | {
                readonly _tag: "UpdatedInputValue";
                readonly value: string;
            };
        } | {
            readonly _tag: "GotComboboxSelectOnFocusDemoMessage";
            readonly message: {
                readonly _tag: "CompletedAnchorCombobox";
            } | {
                readonly _tag: "CompletedAttachComboboxPreventBlur";
            } | {
                readonly _tag: "CompletedAttachComboboxSelectOnFocus";
            } | {
                readonly _tag: "CompletedClickItem";
            } | {
                readonly _tag: "CompletedFocusInput";
            } | {
                readonly _tag: "CompletedInertOthers";
            } | {
                readonly _tag: "CompletedLockScroll";
            } | {
                readonly _tag: "CompletedPortalComboboxBackdrop";
            } | {
                readonly _tag: "CompletedRestoreInert";
            } | {
                readonly _tag: "CompletedScrollIntoView";
            } | {
                readonly _tag: "CompletedUnlockScroll";
            } | {
                readonly _tag: "DeactivatedItem";
            } | {
                readonly _tag: "SuppressedEmptyItemNavigation";
            } | {
                readonly _tag: "SuppressedItemCommit";
            } | {
                readonly _tag: "ActivatedItem";
                readonly index: number;
                readonly activationTrigger: "Keyboard" | "Pointer";
                readonly maybeImmediateSelection: Option.Option<{
                    readonly item: string;
                }>;
            } | {
                readonly _tag: "BlurredInput";
                readonly restingInputValue: string;
                readonly isClearable: boolean;
            } | {
                readonly _tag: "Closed";
                readonly restingInputValue: string;
                readonly isClearable: boolean;
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
                readonly _tag: "PressedToggleButton";
                readonly restingInputValue: string;
                readonly isClearable: boolean;
            } | {
                readonly _tag: "RequestedItemClick";
                readonly index: number;
            } | {
                readonly _tag: "SelectedItem";
                readonly item: string;
                readonly displayText: string;
                readonly wasSelected: boolean;
            } | {
                readonly _tag: "UpdatedInputValue";
                readonly value: string;
            };
        } | {
            readonly _tag: "GotDatePickerBasicDemoMessage";
            readonly message: {
                readonly _tag: "Cleared";
            } | {
                readonly _tag: "Closed";
            } | {
                readonly _tag: "Opened";
            } | {
                readonly _tag: "GotCalendarMessage";
                readonly message: {
                    readonly _tag: "BlurredGrid";
                } | {
                    readonly _tag: "ClickedHeading";
                } | {
                    readonly _tag: "ClickedNextMonthButton";
                } | {
                    readonly _tag: "ClickedPreviousMonthButton";
                } | {
                    readonly _tag: "CompletedFocusGrid";
                } | {
                    readonly _tag: "FocusedGrid";
                } | {
                    readonly _tag: "ClickedDay";
                    readonly date: {
                        readonly year: number;
                        readonly month: number;
                        readonly day: number;
                    };
                } | {
                    readonly _tag: "PagedYears";
                    readonly direction: -1 | 1;
                } | {
                    readonly _tag: "PressedKeyOnGrid";
                    readonly key: string;
                    readonly isShift: boolean;
                } | {
                    readonly _tag: "RefreshedToday";
                    readonly today: {
                        readonly year: number;
                        readonly month: number;
                        readonly day: number;
                    };
                } | {
                    readonly _tag: "SelectedMonth";
                    readonly month: number;
                } | {
                    readonly _tag: "SelectedYear";
                    readonly year: number;
                };
            } | {
                readonly _tag: "GotPopoverMessage";
                readonly message: {
                    readonly _tag: "BlurredPanel";
                } | {
                    readonly _tag: "ClickedButton";
                } | {
                    readonly _tag: "CompletedAnchorPopover";
                } | {
                    readonly _tag: "CompletedFocusButton";
                } | {
                    readonly _tag: "CompletedFocusPanel";
                } | {
                    readonly _tag: "CompletedInertOthers";
                } | {
                    readonly _tag: "CompletedLockScroll";
                } | {
                    readonly _tag: "CompletedPortalPopoverBackdrop";
                } | {
                    readonly _tag: "CompletedRestoreInert";
                } | {
                    readonly _tag: "CompletedUnlockScroll";
                } | {
                    readonly _tag: "IgnoredMouseClick";
                } | {
                    readonly _tag: "RequestedClose";
                } | {
                    readonly _tag: "RequestedOpen";
                } | {
                    readonly _tag: "SuppressedSpaceScroll";
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
                    readonly _tag: "PressedPointerOnButton";
                    readonly pointerType: string;
                    readonly button: number;
                };
            } | {
                readonly _tag: "RequestedSelectDate";
                readonly date: {
                    readonly year: number;
                    readonly month: number;
                    readonly day: number;
                };
            };
        } | {
            readonly _tag: "GotDialogAnimatedDemoMessage";
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
            readonly _tag: "GotDialogDemoMessage";
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
            readonly _tag: "GotDragAndDropDemoMessage";
            readonly message: {
                readonly _tag: "AdvancedAutoScrollFrame";
            } | {
                readonly _tag: "CancelledDrag";
            } | {
                readonly _tag: "CompletedFocusItem";
            } | {
                readonly _tag: "ConfirmedKeyboardDrop";
            } | {
                readonly _tag: "ReleasedPointer";
            } | {
                readonly _tag: "ActivatedKeyboardDrag";
                readonly itemId: string;
                readonly containerId: string;
                readonly index: number;
            } | {
                readonly _tag: "CompletedResolveKeyboardMove";
                readonly targetContainerId: string;
                readonly targetIndex: number;
            } | {
                readonly _tag: "MovedPointer";
                readonly screenX: number;
                readonly screenY: number;
                readonly clientX: number;
                readonly clientY: number;
                readonly maybeDropTarget: Option.Option<{
                    readonly containerId: string;
                    readonly index: number;
                }>;
            } | {
                readonly _tag: "PressedArrowKey";
                readonly direction: "Down" | "Left" | "NextContainer" | "PreviousContainer" | "Right" | "Up";
            } | {
                readonly _tag: "PressedDraggable";
                readonly itemId: string;
                readonly containerId: string;
                readonly index: number;
                readonly screenX: number;
                readonly screenY: number;
            };
        } | {
            readonly _tag: "GotFileDropBasicDemoMessage";
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
            readonly _tag: "GotHorizontalRadioGroupDemoMessage";
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
            readonly _tag: "GotHorizontalTabsDemoMessage";
            readonly message: {
                readonly _tag: "CompletedFocusTab";
            } | {
                readonly _tag: "FocusedTab";
                readonly index: number;
            } | {
                readonly _tag: "SelectedTab";
                readonly index: number;
                readonly value: string;
            };
        } | {
            readonly _tag: "GotHoverIntentCardDemoMessage";
            readonly message: {
                readonly _tag: "BlurredPanel";
            } | {
                readonly _tag: "BlurredTrigger";
            } | {
                readonly _tag: "EnteredPanel";
            } | {
                readonly _tag: "EnteredTrigger";
            } | {
                readonly _tag: "FocusedPanel";
            } | {
                readonly _tag: "FocusedTrigger";
            } | {
                readonly _tag: "LeftPanel";
            } | {
                readonly _tag: "LeftTrigger";
            } | {
                readonly _tag: "CompletedWaitBeforeClosing";
                readonly version: number;
            } | {
                readonly _tag: "CompletedWaitBeforeOpening";
                readonly version: number;
            } | {
                readonly _tag: "PressedEscape";
                readonly source: "Panel" | "Trigger";
            };
        } | {
            readonly _tag: "GotHoverIntentMenuDemoMessage";
            readonly message: {
                readonly _tag: "BlurredPanel";
            } | {
                readonly _tag: "BlurredTrigger";
            } | {
                readonly _tag: "EnteredPanel";
            } | {
                readonly _tag: "EnteredTrigger";
            } | {
                readonly _tag: "FocusedPanel";
            } | {
                readonly _tag: "FocusedTrigger";
            } | {
                readonly _tag: "LeftPanel";
            } | {
                readonly _tag: "LeftTrigger";
            } | {
                readonly _tag: "CompletedWaitBeforeClosing";
                readonly version: number;
            } | {
                readonly _tag: "CompletedWaitBeforeOpening";
                readonly version: number;
            } | {
                readonly _tag: "PressedEscape";
                readonly source: "Panel" | "Trigger";
            };
        } | {
            readonly _tag: "GotListboxDemoMessage";
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
            readonly _tag: "GotListboxGroupedDemoMessage";
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
            readonly _tag: "GotListboxMultiDemoMessage";
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
            readonly _tag: "GotMenuAnimatedDemoMessage";
            readonly message: {
                readonly _tag: "BlurredItems";
            } | {
                readonly _tag: "ClickedButton";
            } | {
                readonly _tag: "Closed";
            } | {
                readonly _tag: "CompletedAnchorMenu";
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
                readonly _tag: "CompletedPortalMenuBackdrop";
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
                readonly screenX: number;
                readonly screenY: number;
                readonly timeStamp: number;
            } | {
                readonly _tag: "ReleasedPointerOnItems";
                readonly screenX: number;
                readonly screenY: number;
                readonly timeStamp: number;
            } | {
                readonly _tag: "RequestedItemClick";
                readonly index: number;
            } | {
                readonly _tag: "Searched";
                readonly key: string;
                readonly maybeTargetIndex: Option.Option<number>;
            } | {
                readonly _tag: "SelectedItem";
                readonly index: number;
                readonly item: string;
            };
        } | {
            readonly _tag: "GotMenuBasicDemoMessage";
            readonly message: {
                readonly _tag: "BlurredItems";
            } | {
                readonly _tag: "ClickedButton";
            } | {
                readonly _tag: "Closed";
            } | {
                readonly _tag: "CompletedAnchorMenu";
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
                readonly _tag: "CompletedPortalMenuBackdrop";
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
                readonly screenX: number;
                readonly screenY: number;
                readonly timeStamp: number;
            } | {
                readonly _tag: "ReleasedPointerOnItems";
                readonly screenX: number;
                readonly screenY: number;
                readonly timeStamp: number;
            } | {
                readonly _tag: "RequestedItemClick";
                readonly index: number;
            } | {
                readonly _tag: "Searched";
                readonly key: string;
                readonly maybeTargetIndex: Option.Option<number>;
            } | {
                readonly _tag: "SelectedItem";
                readonly index: number;
                readonly item: string;
            };
        } | {
            readonly _tag: "GotNestedDialogChildDemoMessage";
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
            readonly _tag: "GotNestedDialogParentDemoMessage";
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
            readonly _tag: "GotOverlayComboboxDemoMessage";
            readonly message: {
                readonly _tag: "CompletedAnchorCombobox";
            } | {
                readonly _tag: "CompletedAttachComboboxPreventBlur";
            } | {
                readonly _tag: "CompletedAttachComboboxSelectOnFocus";
            } | {
                readonly _tag: "CompletedClickItem";
            } | {
                readonly _tag: "CompletedFocusInput";
            } | {
                readonly _tag: "CompletedInertOthers";
            } | {
                readonly _tag: "CompletedLockScroll";
            } | {
                readonly _tag: "CompletedPortalComboboxBackdrop";
            } | {
                readonly _tag: "CompletedRestoreInert";
            } | {
                readonly _tag: "CompletedScrollIntoView";
            } | {
                readonly _tag: "CompletedUnlockScroll";
            } | {
                readonly _tag: "DeactivatedItem";
            } | {
                readonly _tag: "SuppressedEmptyItemNavigation";
            } | {
                readonly _tag: "SuppressedItemCommit";
            } | {
                readonly _tag: "ActivatedItem";
                readonly index: number;
                readonly activationTrigger: "Keyboard" | "Pointer";
                readonly maybeImmediateSelection: Option.Option<{
                    readonly item: string;
                }>;
            } | {
                readonly _tag: "BlurredInput";
                readonly restingInputValue: string;
                readonly isClearable: boolean;
            } | {
                readonly _tag: "Closed";
                readonly restingInputValue: string;
                readonly isClearable: boolean;
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
                readonly _tag: "PressedToggleButton";
                readonly restingInputValue: string;
                readonly isClearable: boolean;
            } | {
                readonly _tag: "RequestedItemClick";
                readonly index: number;
            } | {
                readonly _tag: "SelectedItem";
                readonly item: string;
                readonly displayText: string;
                readonly wasSelected: boolean;
            } | {
                readonly _tag: "UpdatedInputValue";
                readonly value: string;
            };
        } | {
            readonly _tag: "GotOverlayDialogDemoMessage";
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
            readonly _tag: "GotPopoverAnimatedDemoMessage";
            readonly message: {
                readonly _tag: "BlurredPanel";
            } | {
                readonly _tag: "ClickedButton";
            } | {
                readonly _tag: "CompletedAnchorPopover";
            } | {
                readonly _tag: "CompletedFocusButton";
            } | {
                readonly _tag: "CompletedFocusPanel";
            } | {
                readonly _tag: "CompletedInertOthers";
            } | {
                readonly _tag: "CompletedLockScroll";
            } | {
                readonly _tag: "CompletedPortalPopoverBackdrop";
            } | {
                readonly _tag: "CompletedRestoreInert";
            } | {
                readonly _tag: "CompletedUnlockScroll";
            } | {
                readonly _tag: "IgnoredMouseClick";
            } | {
                readonly _tag: "RequestedClose";
            } | {
                readonly _tag: "RequestedOpen";
            } | {
                readonly _tag: "SuppressedSpaceScroll";
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
                readonly _tag: "PressedPointerOnButton";
                readonly pointerType: string;
                readonly button: number;
            };
        } | {
            readonly _tag: "GotPopoverArrowDemoMessage";
            readonly message: {
                readonly _tag: "BlurredPanel";
            } | {
                readonly _tag: "ClickedButton";
            } | {
                readonly _tag: "CompletedAnchorPopover";
            } | {
                readonly _tag: "CompletedFocusButton";
            } | {
                readonly _tag: "CompletedFocusPanel";
            } | {
                readonly _tag: "CompletedInertOthers";
            } | {
                readonly _tag: "CompletedLockScroll";
            } | {
                readonly _tag: "CompletedPortalPopoverBackdrop";
            } | {
                readonly _tag: "CompletedRestoreInert";
            } | {
                readonly _tag: "CompletedUnlockScroll";
            } | {
                readonly _tag: "IgnoredMouseClick";
            } | {
                readonly _tag: "RequestedClose";
            } | {
                readonly _tag: "RequestedOpen";
            } | {
                readonly _tag: "SuppressedSpaceScroll";
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
                readonly _tag: "PressedPointerOnButton";
                readonly pointerType: string;
                readonly button: number;
            };
        } | {
            readonly _tag: "GotPopoverBasicDemoMessage";
            readonly message: {
                readonly _tag: "BlurredPanel";
            } | {
                readonly _tag: "ClickedButton";
            } | {
                readonly _tag: "CompletedAnchorPopover";
            } | {
                readonly _tag: "CompletedFocusButton";
            } | {
                readonly _tag: "CompletedFocusPanel";
            } | {
                readonly _tag: "CompletedInertOthers";
            } | {
                readonly _tag: "CompletedLockScroll";
            } | {
                readonly _tag: "CompletedPortalPopoverBackdrop";
            } | {
                readonly _tag: "CompletedRestoreInert";
            } | {
                readonly _tag: "CompletedUnlockScroll";
            } | {
                readonly _tag: "IgnoredMouseClick";
            } | {
                readonly _tag: "RequestedClose";
            } | {
                readonly _tag: "RequestedOpen";
            } | {
                readonly _tag: "SuppressedSpaceScroll";
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
                readonly _tag: "PressedPointerOnButton";
                readonly pointerType: string;
                readonly button: number;
            };
        } | {
            readonly _tag: "GotPopoverNestedChildDemoMessage";
            readonly message: {
                readonly _tag: "BlurredPanel";
            } | {
                readonly _tag: "ClickedButton";
            } | {
                readonly _tag: "CompletedAnchorPopover";
            } | {
                readonly _tag: "CompletedFocusButton";
            } | {
                readonly _tag: "CompletedFocusPanel";
            } | {
                readonly _tag: "CompletedInertOthers";
            } | {
                readonly _tag: "CompletedLockScroll";
            } | {
                readonly _tag: "CompletedPortalPopoverBackdrop";
            } | {
                readonly _tag: "CompletedRestoreInert";
            } | {
                readonly _tag: "CompletedUnlockScroll";
            } | {
                readonly _tag: "IgnoredMouseClick";
            } | {
                readonly _tag: "RequestedClose";
            } | {
                readonly _tag: "RequestedOpen";
            } | {
                readonly _tag: "SuppressedSpaceScroll";
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
                readonly _tag: "PressedPointerOnButton";
                readonly pointerType: string;
                readonly button: number;
            };
        } | {
            readonly _tag: "GotPopoverNestedParentDemoMessage";
            readonly message: {
                readonly _tag: "BlurredPanel";
            } | {
                readonly _tag: "ClickedButton";
            } | {
                readonly _tag: "CompletedAnchorPopover";
            } | {
                readonly _tag: "CompletedFocusButton";
            } | {
                readonly _tag: "CompletedFocusPanel";
            } | {
                readonly _tag: "CompletedInertOthers";
            } | {
                readonly _tag: "CompletedLockScroll";
            } | {
                readonly _tag: "CompletedPortalPopoverBackdrop";
            } | {
                readonly _tag: "CompletedRestoreInert";
            } | {
                readonly _tag: "CompletedUnlockScroll";
            } | {
                readonly _tag: "IgnoredMouseClick";
            } | {
                readonly _tag: "RequestedClose";
            } | {
                readonly _tag: "RequestedOpen";
            } | {
                readonly _tag: "SuppressedSpaceScroll";
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
                readonly _tag: "PressedPointerOnButton";
                readonly pointerType: string;
                readonly button: number;
            };
        } | {
            readonly _tag: "GotSliderRatingDemoMessage";
            readonly message: {
                readonly _tag: "CancelledDrag";
            } | {
                readonly _tag: "ReleasedDragPointer";
            } | {
                readonly _tag: "MovedDragPointer";
                readonly value: number;
            } | {
                readonly _tag: "PressedKeyboardNavigation";
                readonly direction: "Max" | "Min" | "PageDecrement" | "PageIncrement" | "StepDecrement" | "StepIncrement";
                readonly value: number;
            } | {
                readonly _tag: "PressedPointer";
                readonly value: number;
                readonly originValue: number;
            } | {
                readonly _tag: "PressedThumb";
                readonly originValue: number;
            };
        } | {
            readonly _tag: "GotSliderVolumeDemoMessage";
            readonly message: {
                readonly _tag: "CancelledDrag";
            } | {
                readonly _tag: "ReleasedDragPointer";
            } | {
                readonly _tag: "MovedDragPointer";
                readonly value: number;
            } | {
                readonly _tag: "PressedKeyboardNavigation";
                readonly direction: "Max" | "Min" | "PageDecrement" | "PageIncrement" | "StepDecrement" | "StepIncrement";
                readonly value: number;
            } | {
                readonly _tag: "PressedPointer";
                readonly value: number;
                readonly originValue: number;
            } | {
                readonly _tag: "PressedThumb";
                readonly originValue: number;
            };
        } | {
            readonly _tag: "GotToastDemoMessage";
            readonly message: {
                readonly _tag: "DismissedAll";
            } | {
                readonly _tag: "PressedEscape";
            } | {
                readonly _tag: "Added";
                readonly entry: {
                    readonly id: string;
                    readonly variant: "Error" | "Info" | "Success" | "Warning";
                    readonly animation: {
                        readonly id: string;
                        readonly isShowing: boolean;
                        readonly transitionState: "EnterAnimating" | "EnterStart" | "Idle" | "LeaveAnimating" | "LeaveStart";
                        readonly transitionGeneration: number;
                    };
                    readonly maybeDuration: Option.Option<import("effect/Duration").Duration>;
                    readonly pendingDismissVersion: number;
                    readonly isHovered: boolean;
                    readonly swipeState: {
                        readonly _tag: "Idle";
                    } | {
                        readonly _tag: "Dismissing";
                        readonly offsetX: number;
                        readonly direction: "Left" | "Right";
                    } | {
                        readonly _tag: "Dragging";
                        readonly pointerId: number;
                        readonly startX: number;
                        readonly currentX: number;
                    } | {
                        readonly _tag: "Settling";
                        readonly offsetX: number;
                    };
                    readonly swipeVersion: number;
                    readonly payload: {
                        readonly title: string;
                        readonly maybeDescription: Option.Option<string>;
                    };
                };
            } | {
                readonly _tag: "CancelledSwipe";
                readonly pointerId: number;
            } | {
                readonly _tag: "CompletedWaitBeforeDismissal";
                readonly entryId: string;
                readonly version: number;
            } | {
                readonly _tag: "CompletedWaitForSwipeSettled";
                readonly entryId: string;
                readonly version: number;
            } | {
                readonly _tag: "Dismissed";
                readonly entryId: string;
            } | {
                readonly _tag: "GotAnimationMessage";
                readonly entryId: string;
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
                readonly _tag: "HoveredEntry";
                readonly entryId: string;
            } | {
                readonly _tag: "LeftEntry";
                readonly entryId: string;
            } | {
                readonly _tag: "MovedSwipePointer";
                readonly pointerId: number;
                readonly clientX: number;
            } | {
                readonly _tag: "PressedEntryPointer";
                readonly entryId: string;
                readonly pointerId: number;
                readonly clientX: number;
            } | {
                readonly _tag: "ReleasedSwipePointer";
                readonly pointerId: number;
                readonly clientX: number;
            };
        } | {
            readonly _tag: "GotTooltipDemoMessage";
            readonly message: {
                readonly _tag: "BlurredTrigger";
            } | {
                readonly _tag: "CompletedAnchorTooltip";
            } | {
                readonly _tag: "EnteredTrigger";
            } | {
                readonly _tag: "FocusedTrigger";
            } | {
                readonly _tag: "LeftTrigger";
            } | {
                readonly _tag: "PressedEscape";
            } | {
                readonly _tag: "CompletedWaitBeforeShowing";
                readonly version: number;
            } | {
                readonly _tag: "PressedPointerOnTrigger";
                readonly pointerType: string;
            };
        } | {
            readonly _tag: "GotVerticalRadioGroupDemoMessage";
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
            readonly _tag: "GotVerticalTabsDemoMessage";
            readonly message: {
                readonly _tag: "CompletedFocusTab";
            } | {
                readonly _tag: "FocusedTab";
                readonly index: number;
            } | {
                readonly _tag: "SelectedTab";
                readonly index: number;
                readonly value: string;
            };
        } | {
            readonly _tag: "GotVirtualListChatDemoMessage";
            readonly message: {
                readonly _tag: "CompletedApplyScroll";
                readonly version: number;
                readonly outcome: {
                    readonly _tag: "Skipped";
                } | {
                    readonly _tag: "Applied";
                    readonly scrollTop: number;
                    readonly scrollHeight: number;
                    readonly containerHeight: number;
                    readonly anchor: {
                        readonly _tag: "None";
                    } | {
                        readonly _tag: "Row";
                        readonly key: string;
                        readonly index: number;
                        readonly viewportOffset: number;
                    };
                };
            } | {
                readonly _tag: "MeasuredRows";
                readonly measurements: readonly {
                    readonly key: string;
                    readonly height: number;
                    readonly layoutVersion: number;
                }[];
            } | {
                readonly _tag: "ObservedContainerScroll";
                readonly scrollTop: number;
                readonly scrollHeight: number;
                readonly containerHeight: number;
                readonly anchor: {
                    readonly _tag: "None";
                } | {
                    readonly _tag: "Row";
                    readonly key: string;
                    readonly index: number;
                    readonly viewportOffset: number;
                };
            } | {
                readonly _tag: "ResizedContainer";
                readonly containerWidth: number;
                readonly containerHeight: number;
            };
        } | {
            readonly _tag: "GotVirtualListDemoMessage";
            readonly message: {
                readonly _tag: "CompletedApplyScroll";
                readonly version: number;
                readonly outcome: {
                    readonly _tag: "Skipped";
                } | {
                    readonly _tag: "Applied";
                    readonly scrollTop: number;
                    readonly scrollHeight: number;
                    readonly containerHeight: number;
                    readonly anchor: {
                        readonly _tag: "None";
                    } | {
                        readonly _tag: "Row";
                        readonly key: string;
                        readonly index: number;
                        readonly viewportOffset: number;
                    };
                };
            } | {
                readonly _tag: "MeasuredRows";
                readonly measurements: readonly {
                    readonly key: string;
                    readonly height: number;
                    readonly layoutVersion: number;
                }[];
            } | {
                readonly _tag: "ObservedContainerScroll";
                readonly scrollTop: number;
                readonly scrollHeight: number;
                readonly containerHeight: number;
                readonly anchor: {
                    readonly _tag: "None";
                } | {
                    readonly _tag: "Row";
                    readonly key: string;
                    readonly index: number;
                    readonly viewportOffset: number;
                };
            } | {
                readonly _tag: "ResizedContainer";
                readonly containerWidth: number;
                readonly containerHeight: number;
            };
        } | {
            readonly _tag: "GotVirtualListVariableDemoMessage";
            readonly message: {
                readonly _tag: "CompletedApplyScroll";
                readonly version: number;
                readonly outcome: {
                    readonly _tag: "Skipped";
                } | {
                    readonly _tag: "Applied";
                    readonly scrollTop: number;
                    readonly scrollHeight: number;
                    readonly containerHeight: number;
                    readonly anchor: {
                        readonly _tag: "None";
                    } | {
                        readonly _tag: "Row";
                        readonly key: string;
                        readonly index: number;
                        readonly viewportOffset: number;
                    };
                };
            } | {
                readonly _tag: "MeasuredRows";
                readonly measurements: readonly {
                    readonly key: string;
                    readonly height: number;
                    readonly layoutVersion: number;
                }[];
            } | {
                readonly _tag: "ObservedContainerScroll";
                readonly scrollTop: number;
                readonly scrollHeight: number;
                readonly containerHeight: number;
                readonly anchor: {
                    readonly _tag: "None";
                } | {
                    readonly _tag: "Row";
                    readonly key: string;
                    readonly index: number;
                    readonly viewportOffset: number;
                };
            } | {
                readonly _tag: "ResizedContainer";
                readonly containerWidth: number;
                readonly containerHeight: number;
            };
        } | {
            readonly _tag: "ToggledCheckboxAllDemo";
            readonly isChecked: boolean;
        } | {
            readonly _tag: "ToggledCheckboxBasicDemo";
            readonly isChecked: boolean;
        } | {
            readonly _tag: "ToggledCheckboxOptionADemo";
            readonly isChecked: boolean;
        } | {
            readonly _tag: "ToggledCheckboxOptionBDemo";
            readonly isChecked: boolean;
        } | {
            readonly _tag: "ToggledDisclosureCollapsedPreviewDemo";
            readonly isOpen: boolean;
        } | {
            readonly _tag: "ToggledDisclosureDemo";
            readonly isOpen: boolean;
        } | {
            readonly _tag: "ToggledFieldsetCheckboxDemo";
            readonly isChecked: boolean;
        } | {
            readonly _tag: "ToggledSwitchDemo";
            readonly isChecked: boolean;
        } | {
            readonly _tag: "UpdatedFieldsetInputValue";
            readonly value: string;
        } | {
            readonly _tag: "UpdatedFieldsetTextareaValue";
            readonly value: string;
        } | {
            readonly _tag: "UpdatedInputDemoValue";
            readonly value: string;
        } | {
            readonly _tag: "UpdatedSelectDemoValue";
            readonly value: string;
        } | {
            readonly _tag: "UpdatedTextareaDemoValue";
            readonly value: string;
        };
    } | {
        readonly _tag: "ToggledMobileTableOfContents";
        readonly isOpen: boolean;
    } | {
        readonly _tag: "ToggledSidebarGroup";
        readonly key: "ai" | "apiReference" | "bestPractices" | "blog" | "comparisons" | "coreConcepts" | "examples" | "faq" | "foldkitUi" | "introduction" | "patterns" | "testing" | "tooling";
        readonly isOpen: boolean;
    } | {
        readonly _tag: "UpdatedNewsletterEmail";
        readonly value: string;
    }>;
} & {
    readonly webContainerPlayground: ManagedResource.Entry<{
        readonly route: {
            readonly _tag: "About";
        } | {
            readonly _tag: "AiMcp";
        } | {
            readonly _tag: "AiOverview";
        } | {
            readonly _tag: "AiSkills";
        } | {
            readonly _tag: "AsyncData";
        } | {
            readonly _tag: "BestPracticesImmutability";
        } | {
            readonly _tag: "BestPracticesKeying";
        } | {
            readonly _tag: "BestPracticesMessages";
        } | {
            readonly _tag: "BestPracticesSideEffects";
        } | {
            readonly _tag: "Blog";
        } | {
            readonly _tag: "ComingFromReact";
        } | {
            readonly _tag: "ComingFromTanStackQuery";
        } | {
            readonly _tag: "Contact";
        } | {
            readonly _tag: "ContentApi";
        } | {
            readonly _tag: "CoreArchitecture";
        } | {
            readonly _tag: "CoreCanvas";
        } | {
            readonly _tag: "CoreCommands";
        } | {
            readonly _tag: "CoreCounterExample";
        } | {
            readonly _tag: "CoreCrashView";
        } | {
            readonly _tag: "CoreCustomElement";
        } | {
            readonly _tag: "CoreDevTools";
        } | {
            readonly _tag: "CoreDom";
        } | {
            readonly _tag: "CoreEmbedding";
        } | {
            readonly _tag: "CoreFile";
        } | {
            readonly _tag: "CoreFreezeModel";
        } | {
            readonly _tag: "CoreHttp";
        } | {
            readonly _tag: "CoreInitAndFlags";
        } | {
            readonly _tag: "CoreMachine";
        } | {
            readonly _tag: "CoreManagedResources";
        } | {
            readonly _tag: "CoreMessages";
        } | {
            readonly _tag: "CoreModel";
        } | {
            readonly _tag: "CoreMount";
        } | {
            readonly _tag: "CorePreserveScroll";
        } | {
            readonly _tag: "CoreQuery";
        } | {
            readonly _tag: "CoreRender";
        } | {
            readonly _tag: "CoreResources";
        } | {
            readonly _tag: "CoreRuntime";
        } | {
            readonly _tag: "CoreServerRendering";
        } | {
            readonly _tag: "CoreSlowWarnings";
        } | {
            readonly _tag: "CoreSubmodel";
        } | {
            readonly _tag: "CoreSubscriptions";
        } | {
            readonly _tag: "CoreUpdate";
        } | {
            readonly _tag: "CoreView";
        } | {
            readonly _tag: "CoreViewMemoization";
        } | {
            readonly _tag: "CoreViewTransitions";
        } | {
            readonly _tag: "EffectAtomComparison";
        } | {
            readonly _tag: "ElmComparison";
        } | {
            readonly _tag: "Examples";
        } | {
            readonly _tag: "FieldValidation";
        } | {
            readonly _tag: "GetStarted";
        } | {
            readonly _tag: "Home";
        } | {
            readonly _tag: "Newsletter";
        } | {
            readonly _tag: "PatternsAntiPatterns";
        } | {
            readonly _tag: "PatternsInformingSubmodels";
        } | {
            readonly _tag: "PatternsSubscriptionOrganization";
        } | {
            readonly _tag: "Performance";
        } | {
            readonly _tag: "Privacy";
        } | {
            readonly _tag: "ProjectOrganization";
        } | {
            readonly _tag: "ReactComparison";
        } | {
            readonly _tag: "Roadmap";
        } | {
            readonly _tag: "RoutingAndNavigation";
        } | {
            readonly _tag: "Testing";
        } | {
            readonly _tag: "TestingScene";
        } | {
            readonly _tag: "TestingStory";
        } | {
            readonly _tag: "ToolingLinting";
        } | {
            readonly _tag: "TypingTerminal";
        } | {
            readonly _tag: "UiAnchor";
        } | {
            readonly _tag: "UiAnimation";
        } | {
            readonly _tag: "UiButton";
        } | {
            readonly _tag: "UiCalendar";
        } | {
            readonly _tag: "UiCheckbox";
        } | {
            readonly _tag: "UiCombobox";
        } | {
            readonly _tag: "UiDatePicker";
        } | {
            readonly _tag: "UiDialog";
        } | {
            readonly _tag: "UiDisclosure";
        } | {
            readonly _tag: "UiDragAndDrop";
        } | {
            readonly _tag: "UiFieldset";
        } | {
            readonly _tag: "UiFileDrop";
        } | {
            readonly _tag: "UiHoverIntent";
        } | {
            readonly _tag: "UiInput";
        } | {
            readonly _tag: "UiListbox";
        } | {
            readonly _tag: "UiMenu";
        } | {
            readonly _tag: "UiMeter";
        } | {
            readonly _tag: "UiNav";
        } | {
            readonly _tag: "UiOverview";
        } | {
            readonly _tag: "UiPopover";
        } | {
            readonly _tag: "UiProgress";
        } | {
            readonly _tag: "UiRadioGroup";
        } | {
            readonly _tag: "UiSelect";
        } | {
            readonly _tag: "UiSelectionSubmodels";
        } | {
            readonly _tag: "UiSlider";
        } | {
            readonly _tag: "UiSwitch";
        } | {
            readonly _tag: "UiTabs";
        } | {
            readonly _tag: "UiTextarea";
        } | {
            readonly _tag: "UiToast";
        } | {
            readonly _tag: "UiTooltip";
        } | {
            readonly _tag: "UiVirtualList";
        } | {
            readonly _tag: "WhyFoldkit";
        } | {
            readonly _tag: "ApiModule";
            readonly moduleSlug: string;
        } | {
            readonly _tag: "BlogPost";
            readonly postSlug: string;
        } | {
            readonly _tag: "ExampleDetail";
            readonly exampleSlug: string;
        } | {
            readonly _tag: "NotFound";
            readonly path: string;
        } | {
            readonly _tag: "Playground";
            readonly exampleSlug: string;
        };
        readonly url: {
            readonly protocol: string;
            readonly host: string;
            readonly port: Option.Option<string>;
            readonly pathname: string;
            readonly search: Option.Option<string>;
            readonly hash: Option.Option<string>;
        };
        readonly deployment: {
            readonly _tag: "Production";
        } | {
            readonly _tag: "Canary";
            readonly commit: string;
        };
        readonly snippetCopy: {
            readonly copiedSnippetIds: import("effect/HashSet").HashSet<string>;
        };
        readonly snippetDisclosure: {
            readonly openDisclosureIds: import("effect/HashSet").HashSet<string>;
            readonly snippetSizes: import("effect/HashMap").HashMap<string, {
                readonly _tag: "Fits";
            } | {
                readonly _tag: "Overflows";
            }>;
        };
        readonly maybeGitHubStarCount: Option.Option<number>;
        readonly currentYear: number;
        readonly newsletterEmail: string;
        readonly mobileMenuDialog: {
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
        readonly isMobileTableOfContentsOpen: boolean;
        readonly activeSection: Option.Option<string>;
        readonly isNarrowViewport: boolean;
        readonly maybeIsPlaygroundSupported: Option.Option<boolean>;
        readonly playground: Option.Option<{
            readonly slug: string;
            readonly state: {
                readonly _tag: "Booting";
            } | {
                readonly _tag: "Idle";
            } | {
                readonly _tag: "Booted";
                readonly preview: {
                    readonly _tag: "Loaded";
                    readonly previewUrl: string;
                } | {
                    readonly _tag: "Loading";
                    readonly previewUrl: string;
                };
            } | {
                readonly _tag: "Failed";
                readonly reason: string;
            };
            readonly files: {
                readonly [x: string]: string;
            };
            readonly fileTabs: {
                readonly id: string;
                readonly maybeFocusedIndex: Option.Option<number>;
                readonly activationMode: "Automatic" | "Manual";
            };
            readonly activeFilePath: string;
            readonly dirtyPaths: readonly string[];
            readonly lastWriteError: Option.Option<string>;
        }>;
        readonly sidebarGroups: {
            readonly ai: boolean;
            readonly apiReference: boolean;
            readonly bestPractices: boolean;
            readonly blog: boolean;
            readonly comparisons: boolean;
            readonly coreConcepts: boolean;
            readonly examples: boolean;
            readonly faq: boolean;
            readonly foldkitUi: boolean;
            readonly introduction: boolean;
            readonly patterns: boolean;
            readonly testing: boolean;
            readonly tooling: boolean;
        };
        readonly coreSubmodelPage: {
            readonly isMapMessagesUnderHoodOpen: boolean;
        };
        readonly maybeHome: Option.Option<{
            readonly demoTabs: {
                readonly id: string;
                readonly maybeFocusedIndex: Option.Option<number>;
                readonly activationMode: "Automatic" | "Manual";
            };
            readonly activeDemoTab: "Architecture" | "Note Player";
            readonly playgroundMenu: {
                readonly id: string;
                readonly isOpen: boolean;
                readonly isAnimated: boolean;
                readonly isModal: boolean;
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
                readonly maybePointerOrigin: Option.Option<{
                    readonly screenX: number;
                    readonly screenY: number;
                    readonly timeStamp: number;
                }>;
            };
            readonly asyncCounterDemo: {
                readonly count: number;
                readonly isResetting: boolean;
                readonly resetDuration: number;
                readonly phase: "DurationMessage" | "DurationModel" | "DurationUpdate" | "Idle" | "IncrementMessage" | "IncrementModel" | "IncrementUpdate" | "ResetCommand" | "ResetCommandMessage" | "ResetCommandUpdate" | "ResetMessage" | "ResetModel" | "ResetUpdate";
                readonly generation: number;
                readonly messageLog: readonly string[];
            };
            readonly notePlayerDemo: {
                readonly noteInput: {
                    readonly _tag: "Invalid";
                    readonly value: string;
                    readonly errors: readonly [string, ...string[]];
                } | {
                    readonly _tag: "NotValidated";
                    readonly value: string;
                } | {
                    readonly _tag: "Valid";
                    readonly value: string;
                } | {
                    readonly _tag: "Validating";
                    readonly value: string;
                };
                readonly noteDurationRadioGroup: {
                    readonly id: string;
                    readonly maybeFocusedIndex: Option.Option<number>;
                };
                readonly noteDuration: "Long" | "Medium" | "Short";
                readonly playbackState: {
                    readonly _tag: "Idle";
                } | {
                    readonly _tag: "Paused";
                    readonly noteSequence: readonly ("A" | "B" | "C" | "D" | "E" | "F" | "G")[];
                    readonly currentNoteIndex: number;
                } | {
                    readonly _tag: "Playing";
                    readonly noteSequence: readonly ("A" | "B" | "C" | "D" | "E" | "F" | "G")[];
                    readonly currentNoteIndex: number;
                };
                readonly highlightPhase: "Idle" | "NoteCommand" | "NoteMessage" | "NoteModel" | "NoteUpdate" | "PauseMessage" | "PlayMessage" | "PlayModel" | "PlayUpdate";
                readonly generation: number;
                readonly messageLog: readonly string[];
                readonly audio: {
                    readonly _tag: "Acquiring";
                } | {
                    readonly _tag: "Ready";
                } | {
                    readonly _tag: "Unavailable";
                };
            };
        }>;
        readonly themeMenu: {
            readonly id: string;
            readonly isOpen: boolean;
            readonly isAnimated: boolean;
            readonly isModal: boolean;
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
            readonly maybePointerOrigin: Option.Option<{
                readonly screenX: number;
                readonly screenY: number;
                readonly timeStamp: number;
            }>;
        };
        readonly maybeThemePreference: Option.Option<"Dark" | "Light" | "System">;
        readonly systemTheme: "Dark" | "Light";
        readonly resolvedTheme: "Dark" | "Light";
        readonly uiPages: {
            readonly buttonClickCount: number;
            readonly inputDemoValue: string;
            readonly textareaDemoValue: string;
            readonly fieldsetInputValue: string;
            readonly fieldsetTextareaValue: string;
            readonly isFieldsetCheckboxDemoChecked: boolean;
            readonly calendarBasicDemo: {
                readonly id: string;
                readonly today: {
                    readonly year: number;
                    readonly month: number;
                    readonly day: number;
                };
                readonly viewYear: number;
                readonly viewMonth: number;
                readonly viewMode: "Days" | "Months" | "Years";
                readonly maybeFocusedDate: Option.Option<{
                    readonly year: number;
                    readonly month: number;
                    readonly day: number;
                }>;
                readonly isGridFocused: boolean;
                readonly locale: {
                    readonly firstDayOfWeek: "Friday" | "Monday" | "Saturday" | "Sunday" | "Thursday" | "Tuesday" | "Wednesday";
                    readonly monthNames: readonly [string, string, string, string, string, string, string, string, string, string, string, string];
                    readonly shortMonthNames: readonly [string, string, string, string, string, string, string, string, string, string, string, string];
                    readonly dayNames: readonly [string, string, string, string, string, string, string];
                    readonly shortDayNames: readonly [string, string, string, string, string, string, string];
                    readonly longFormat: readonly [{
                        readonly _tag: "DayName";
                    } | {
                        readonly _tag: "DayNumber";
                    } | {
                        readonly _tag: "MonthName";
                    } | {
                        readonly _tag: "MonthNumber";
                    } | {
                        readonly _tag: "PaddedDayNumber";
                    } | {
                        readonly _tag: "PaddedMonthNumber";
                    } | {
                        readonly _tag: "ShortDayName";
                    } | {
                        readonly _tag: "ShortMonthName";
                    } | {
                        readonly _tag: "YearNumber";
                    } | {
                        readonly _tag: "LiteralText";
                        readonly text: string;
                    }, ...({
                        readonly _tag: "DayName";
                    } | {
                        readonly _tag: "DayNumber";
                    } | {
                        readonly _tag: "MonthName";
                    } | {
                        readonly _tag: "MonthNumber";
                    } | {
                        readonly _tag: "PaddedDayNumber";
                    } | {
                        readonly _tag: "PaddedMonthNumber";
                    } | {
                        readonly _tag: "ShortDayName";
                    } | {
                        readonly _tag: "ShortMonthName";
                    } | {
                        readonly _tag: "YearNumber";
                    } | {
                        readonly _tag: "LiteralText";
                        readonly text: string;
                    })[]];
                    readonly shortFormat: readonly [{
                        readonly _tag: "DayName";
                    } | {
                        readonly _tag: "DayNumber";
                    } | {
                        readonly _tag: "MonthName";
                    } | {
                        readonly _tag: "MonthNumber";
                    } | {
                        readonly _tag: "PaddedDayNumber";
                    } | {
                        readonly _tag: "PaddedMonthNumber";
                    } | {
                        readonly _tag: "ShortDayName";
                    } | {
                        readonly _tag: "ShortMonthName";
                    } | {
                        readonly _tag: "YearNumber";
                    } | {
                        readonly _tag: "LiteralText";
                        readonly text: string;
                    }, ...({
                        readonly _tag: "DayName";
                    } | {
                        readonly _tag: "DayNumber";
                    } | {
                        readonly _tag: "MonthName";
                    } | {
                        readonly _tag: "MonthNumber";
                    } | {
                        readonly _tag: "PaddedDayNumber";
                    } | {
                        readonly _tag: "PaddedMonthNumber";
                    } | {
                        readonly _tag: "ShortDayName";
                    } | {
                        readonly _tag: "ShortMonthName";
                    } | {
                        readonly _tag: "YearNumber";
                    } | {
                        readonly _tag: "LiteralText";
                        readonly text: string;
                    })[]];
                    readonly ariaLabelFormat: readonly [{
                        readonly _tag: "DayName";
                    } | {
                        readonly _tag: "DayNumber";
                    } | {
                        readonly _tag: "MonthName";
                    } | {
                        readonly _tag: "MonthNumber";
                    } | {
                        readonly _tag: "PaddedDayNumber";
                    } | {
                        readonly _tag: "PaddedMonthNumber";
                    } | {
                        readonly _tag: "ShortDayName";
                    } | {
                        readonly _tag: "ShortMonthName";
                    } | {
                        readonly _tag: "YearNumber";
                    } | {
                        readonly _tag: "LiteralText";
                        readonly text: string;
                    }, ...({
                        readonly _tag: "DayName";
                    } | {
                        readonly _tag: "DayNumber";
                    } | {
                        readonly _tag: "MonthName";
                    } | {
                        readonly _tag: "MonthNumber";
                    } | {
                        readonly _tag: "PaddedDayNumber";
                    } | {
                        readonly _tag: "PaddedMonthNumber";
                    } | {
                        readonly _tag: "ShortDayName";
                    } | {
                        readonly _tag: "ShortMonthName";
                    } | {
                        readonly _tag: "YearNumber";
                    } | {
                        readonly _tag: "LiteralText";
                        readonly text: string;
                    })[]];
                    readonly monthYearFormat: readonly [{
                        readonly _tag: "MonthName";
                    } | {
                        readonly _tag: "MonthNumber";
                    } | {
                        readonly _tag: "PaddedMonthNumber";
                    } | {
                        readonly _tag: "ShortMonthName";
                    } | {
                        readonly _tag: "YearNumber";
                    } | {
                        readonly _tag: "LiteralText";
                        readonly text: string;
                    }, ...({
                        readonly _tag: "MonthName";
                    } | {
                        readonly _tag: "MonthNumber";
                    } | {
                        readonly _tag: "PaddedMonthNumber";
                    } | {
                        readonly _tag: "ShortMonthName";
                    } | {
                        readonly _tag: "YearNumber";
                    } | {
                        readonly _tag: "LiteralText";
                        readonly text: string;
                    })[]];
                };
                readonly maybeMinDate: Option.Option<{
                    readonly year: number;
                    readonly month: number;
                    readonly day: number;
                }>;
                readonly maybeMaxDate: Option.Option<{
                    readonly year: number;
                    readonly month: number;
                    readonly day: number;
                }>;
                readonly disabledDaysOfWeek: readonly ("Friday" | "Monday" | "Saturday" | "Sunday" | "Thursday" | "Tuesday" | "Wednesday")[];
                readonly disabledDates: readonly {
                    readonly year: number;
                    readonly month: number;
                    readonly day: number;
                }[];
            };
            readonly maybeCalendarBasicDemoSelectedDate: Option.Option<{
                readonly year: number;
                readonly month: number;
                readonly day: number;
            }>;
            readonly datePickerBasicDemo: {
                readonly id: string;
                readonly calendar: {
                    readonly id: string;
                    readonly today: {
                        readonly year: number;
                        readonly month: number;
                        readonly day: number;
                    };
                    readonly viewYear: number;
                    readonly viewMonth: number;
                    readonly viewMode: "Days" | "Months" | "Years";
                    readonly maybeFocusedDate: Option.Option<{
                        readonly year: number;
                        readonly month: number;
                        readonly day: number;
                    }>;
                    readonly isGridFocused: boolean;
                    readonly locale: {
                        readonly firstDayOfWeek: "Friday" | "Monday" | "Saturday" | "Sunday" | "Thursday" | "Tuesday" | "Wednesday";
                        readonly monthNames: readonly [string, string, string, string, string, string, string, string, string, string, string, string];
                        readonly shortMonthNames: readonly [string, string, string, string, string, string, string, string, string, string, string, string];
                        readonly dayNames: readonly [string, string, string, string, string, string, string];
                        readonly shortDayNames: readonly [string, string, string, string, string, string, string];
                        readonly longFormat: readonly [{
                            readonly _tag: "DayName";
                        } | {
                            readonly _tag: "DayNumber";
                        } | {
                            readonly _tag: "MonthName";
                        } | {
                            readonly _tag: "MonthNumber";
                        } | {
                            readonly _tag: "PaddedDayNumber";
                        } | {
                            readonly _tag: "PaddedMonthNumber";
                        } | {
                            readonly _tag: "ShortDayName";
                        } | {
                            readonly _tag: "ShortMonthName";
                        } | {
                            readonly _tag: "YearNumber";
                        } | {
                            readonly _tag: "LiteralText";
                            readonly text: string;
                        }, ...({
                            readonly _tag: "DayName";
                        } | {
                            readonly _tag: "DayNumber";
                        } | {
                            readonly _tag: "MonthName";
                        } | {
                            readonly _tag: "MonthNumber";
                        } | {
                            readonly _tag: "PaddedDayNumber";
                        } | {
                            readonly _tag: "PaddedMonthNumber";
                        } | {
                            readonly _tag: "ShortDayName";
                        } | {
                            readonly _tag: "ShortMonthName";
                        } | {
                            readonly _tag: "YearNumber";
                        } | {
                            readonly _tag: "LiteralText";
                            readonly text: string;
                        })[]];
                        readonly shortFormat: readonly [{
                            readonly _tag: "DayName";
                        } | {
                            readonly _tag: "DayNumber";
                        } | {
                            readonly _tag: "MonthName";
                        } | {
                            readonly _tag: "MonthNumber";
                        } | {
                            readonly _tag: "PaddedDayNumber";
                        } | {
                            readonly _tag: "PaddedMonthNumber";
                        } | {
                            readonly _tag: "ShortDayName";
                        } | {
                            readonly _tag: "ShortMonthName";
                        } | {
                            readonly _tag: "YearNumber";
                        } | {
                            readonly _tag: "LiteralText";
                            readonly text: string;
                        }, ...({
                            readonly _tag: "DayName";
                        } | {
                            readonly _tag: "DayNumber";
                        } | {
                            readonly _tag: "MonthName";
                        } | {
                            readonly _tag: "MonthNumber";
                        } | {
                            readonly _tag: "PaddedDayNumber";
                        } | {
                            readonly _tag: "PaddedMonthNumber";
                        } | {
                            readonly _tag: "ShortDayName";
                        } | {
                            readonly _tag: "ShortMonthName";
                        } | {
                            readonly _tag: "YearNumber";
                        } | {
                            readonly _tag: "LiteralText";
                            readonly text: string;
                        })[]];
                        readonly ariaLabelFormat: readonly [{
                            readonly _tag: "DayName";
                        } | {
                            readonly _tag: "DayNumber";
                        } | {
                            readonly _tag: "MonthName";
                        } | {
                            readonly _tag: "MonthNumber";
                        } | {
                            readonly _tag: "PaddedDayNumber";
                        } | {
                            readonly _tag: "PaddedMonthNumber";
                        } | {
                            readonly _tag: "ShortDayName";
                        } | {
                            readonly _tag: "ShortMonthName";
                        } | {
                            readonly _tag: "YearNumber";
                        } | {
                            readonly _tag: "LiteralText";
                            readonly text: string;
                        }, ...({
                            readonly _tag: "DayName";
                        } | {
                            readonly _tag: "DayNumber";
                        } | {
                            readonly _tag: "MonthName";
                        } | {
                            readonly _tag: "MonthNumber";
                        } | {
                            readonly _tag: "PaddedDayNumber";
                        } | {
                            readonly _tag: "PaddedMonthNumber";
                        } | {
                            readonly _tag: "ShortDayName";
                        } | {
                            readonly _tag: "ShortMonthName";
                        } | {
                            readonly _tag: "YearNumber";
                        } | {
                            readonly _tag: "LiteralText";
                            readonly text: string;
                        })[]];
                        readonly monthYearFormat: readonly [{
                            readonly _tag: "MonthName";
                        } | {
                            readonly _tag: "MonthNumber";
                        } | {
                            readonly _tag: "PaddedMonthNumber";
                        } | {
                            readonly _tag: "ShortMonthName";
                        } | {
                            readonly _tag: "YearNumber";
                        } | {
                            readonly _tag: "LiteralText";
                            readonly text: string;
                        }, ...({
                            readonly _tag: "MonthName";
                        } | {
                            readonly _tag: "MonthNumber";
                        } | {
                            readonly _tag: "PaddedMonthNumber";
                        } | {
                            readonly _tag: "ShortMonthName";
                        } | {
                            readonly _tag: "YearNumber";
                        } | {
                            readonly _tag: "LiteralText";
                            readonly text: string;
                        })[]];
                    };
                    readonly maybeMinDate: Option.Option<{
                        readonly year: number;
                        readonly month: number;
                        readonly day: number;
                    }>;
                    readonly maybeMaxDate: Option.Option<{
                        readonly year: number;
                        readonly month: number;
                        readonly day: number;
                    }>;
                    readonly disabledDaysOfWeek: readonly ("Friday" | "Monday" | "Saturday" | "Sunday" | "Thursday" | "Tuesday" | "Wednesday")[];
                    readonly disabledDates: readonly {
                        readonly year: number;
                        readonly month: number;
                        readonly day: number;
                    }[];
                };
                readonly popover: {
                    readonly id: string;
                    readonly isOpen: boolean;
                    readonly isAnimated: boolean;
                    readonly isModal: boolean;
                    readonly contentFocus: boolean;
                    readonly animation: {
                        readonly id: string;
                        readonly isShowing: boolean;
                        readonly transitionState: "EnterAnimating" | "EnterStart" | "Idle" | "LeaveAnimating" | "LeaveStart";
                        readonly transitionGeneration: number;
                    };
                    readonly maybeLastButtonPointerType: Option.Option<string>;
                };
            };
            readonly maybeDatePickerBasicDemoSelectedDate: Option.Option<{
                readonly year: number;
                readonly month: number;
                readonly day: number;
            }>;
            readonly isCheckboxBasicDemoChecked: boolean;
            readonly isCheckboxOptionADemoChecked: boolean;
            readonly isCheckboxOptionBDemoChecked: boolean;
            readonly comboboxDemo: {
                readonly id: string;
                readonly isOpen: boolean;
                readonly isAnimated: boolean;
                readonly isModal: boolean;
                readonly nullable: boolean;
                readonly immediate: boolean;
                readonly selectInputOnFocus: boolean;
                readonly animation: {
                    readonly id: string;
                    readonly isShowing: boolean;
                    readonly transitionState: "EnterAnimating" | "EnterStart" | "Idle" | "LeaveAnimating" | "LeaveStart";
                    readonly transitionGeneration: number;
                };
                readonly maybeActiveItemIndex: Option.Option<number>;
                readonly activationTrigger: "Keyboard" | "Pointer";
                readonly inputValue: string;
                readonly maybeLastPointerPosition: Option.Option<{
                    readonly screenX: number;
                    readonly screenY: number;
                }>;
            };
            readonly maybeComboboxDemoSelectedCity: Option.Option<"Johannesburg" | "Kyiv" | "Oxford" | "Plymouth" | "Quito" | "Wellington" | "Zurich">;
            readonly comboboxPlacementLockDemo: {
                readonly id: string;
                readonly isOpen: boolean;
                readonly isAnimated: boolean;
                readonly isModal: boolean;
                readonly nullable: boolean;
                readonly immediate: boolean;
                readonly selectInputOnFocus: boolean;
                readonly animation: {
                    readonly id: string;
                    readonly isShowing: boolean;
                    readonly transitionState: "EnterAnimating" | "EnterStart" | "Idle" | "LeaveAnimating" | "LeaveStart";
                    readonly transitionGeneration: number;
                };
                readonly maybeActiveItemIndex: Option.Option<number>;
                readonly activationTrigger: "Keyboard" | "Pointer";
                readonly inputValue: string;
                readonly maybeLastPointerPosition: Option.Option<{
                    readonly screenX: number;
                    readonly screenY: number;
                }>;
            };
            readonly maybeComboboxPlacementLockDemoSelectedCity: Option.Option<"Johannesburg" | "Kyiv" | "Oxford" | "Plymouth" | "Quito" | "Wellington" | "Zurich">;
            readonly comboboxNullableDemo: {
                readonly id: string;
                readonly isOpen: boolean;
                readonly isAnimated: boolean;
                readonly isModal: boolean;
                readonly nullable: boolean;
                readonly immediate: boolean;
                readonly selectInputOnFocus: boolean;
                readonly animation: {
                    readonly id: string;
                    readonly isShowing: boolean;
                    readonly transitionState: "EnterAnimating" | "EnterStart" | "Idle" | "LeaveAnimating" | "LeaveStart";
                    readonly transitionGeneration: number;
                };
                readonly maybeActiveItemIndex: Option.Option<number>;
                readonly activationTrigger: "Keyboard" | "Pointer";
                readonly inputValue: string;
                readonly maybeLastPointerPosition: Option.Option<{
                    readonly screenX: number;
                    readonly screenY: number;
                }>;
            };
            readonly maybeComboboxNullableDemoSelectedCity: Option.Option<"Johannesburg" | "Kyiv" | "Oxford" | "Plymouth" | "Quito" | "Wellington" | "Zurich">;
            readonly comboboxMultiDemo: {
                readonly id: string;
                readonly isOpen: boolean;
                readonly isAnimated: boolean;
                readonly isModal: boolean;
                readonly nullable: boolean;
                readonly immediate: boolean;
                readonly selectInputOnFocus: boolean;
                readonly animation: {
                    readonly id: string;
                    readonly isShowing: boolean;
                    readonly transitionState: "EnterAnimating" | "EnterStart" | "Idle" | "LeaveAnimating" | "LeaveStart";
                    readonly transitionGeneration: number;
                };
                readonly maybeActiveItemIndex: Option.Option<number>;
                readonly activationTrigger: "Keyboard" | "Pointer";
                readonly inputValue: string;
                readonly maybeLastPointerPosition: Option.Option<{
                    readonly screenX: number;
                    readonly screenY: number;
                }>;
            };
            readonly comboboxMultiDemoSelectedCities: readonly ("Johannesburg" | "Kyiv" | "Oxford" | "Plymouth" | "Quito" | "Wellington" | "Zurich")[];
            readonly comboboxSelectOnFocusDemo: {
                readonly id: string;
                readonly isOpen: boolean;
                readonly isAnimated: boolean;
                readonly isModal: boolean;
                readonly nullable: boolean;
                readonly immediate: boolean;
                readonly selectInputOnFocus: boolean;
                readonly animation: {
                    readonly id: string;
                    readonly isShowing: boolean;
                    readonly transitionState: "EnterAnimating" | "EnterStart" | "Idle" | "LeaveAnimating" | "LeaveStart";
                    readonly transitionGeneration: number;
                };
                readonly maybeActiveItemIndex: Option.Option<number>;
                readonly activationTrigger: "Keyboard" | "Pointer";
                readonly inputValue: string;
                readonly maybeLastPointerPosition: Option.Option<{
                    readonly screenX: number;
                    readonly screenY: number;
                }>;
            };
            readonly maybeComboboxSelectOnFocusDemoSelectedCity: Option.Option<"Johannesburg" | "Kyiv" | "Oxford" | "Plymouth" | "Quito" | "Wellington" | "Zurich">;
            readonly dialogDemo: {
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
            readonly dialogAnimatedDemo: {
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
            readonly overlayDialogDemo: {
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
            readonly overlayComboboxDemo: {
                readonly id: string;
                readonly isOpen: boolean;
                readonly isAnimated: boolean;
                readonly isModal: boolean;
                readonly nullable: boolean;
                readonly immediate: boolean;
                readonly selectInputOnFocus: boolean;
                readonly animation: {
                    readonly id: string;
                    readonly isShowing: boolean;
                    readonly transitionState: "EnterAnimating" | "EnterStart" | "Idle" | "LeaveAnimating" | "LeaveStart";
                    readonly transitionGeneration: number;
                };
                readonly maybeActiveItemIndex: Option.Option<number>;
                readonly activationTrigger: "Keyboard" | "Pointer";
                readonly inputValue: string;
                readonly maybeLastPointerPosition: Option.Option<{
                    readonly screenX: number;
                    readonly screenY: number;
                }>;
            };
            readonly maybeOverlayComboboxDemoSelectedCity: Option.Option<"Johannesburg" | "Kyiv" | "Oxford" | "Plymouth" | "Quito" | "Wellington" | "Zurich">;
            readonly nestedDialogParentDemo: {
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
            readonly nestedDialogChildDemo: {
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
            readonly isDisclosureDemoOpen: boolean;
            readonly isDisclosureCollapsedPreviewDemoOpen: boolean;
            readonly listboxDemo: {
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
            readonly maybeListboxDemoSelectedItem: Option.Option<"Buster Bluth" | "George Michael" | "Gob Bluth" | "Lindsay Funke" | "Lucille Bluth" | "Maeby Funke" | "Michael Bluth" | "Tobias Funke">;
            readonly listboxMultiDemo: {
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
            readonly listboxMultiDemoSelectedItems: readonly ("Buster Bluth" | "George Michael" | "Gob Bluth" | "Lindsay Funke" | "Lucille Bluth" | "Maeby Funke" | "Michael Bluth" | "Tobias Funke")[];
            readonly listboxGroupedDemo: {
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
            readonly maybeListboxGroupedDemoSelectedItem: Option.Option<string>;
            readonly menuBasicDemo: {
                readonly id: string;
                readonly isOpen: boolean;
                readonly isAnimated: boolean;
                readonly isModal: boolean;
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
                readonly maybePointerOrigin: Option.Option<{
                    readonly screenX: number;
                    readonly screenY: number;
                    readonly timeStamp: number;
                }>;
            };
            readonly menuAnimatedDemo: {
                readonly id: string;
                readonly isOpen: boolean;
                readonly isAnimated: boolean;
                readonly isModal: boolean;
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
                readonly maybePointerOrigin: Option.Option<{
                    readonly screenX: number;
                    readonly screenY: number;
                    readonly timeStamp: number;
                }>;
            };
            readonly popoverBasicDemo: {
                readonly id: string;
                readonly isOpen: boolean;
                readonly isAnimated: boolean;
                readonly isModal: boolean;
                readonly contentFocus: boolean;
                readonly animation: {
                    readonly id: string;
                    readonly isShowing: boolean;
                    readonly transitionState: "EnterAnimating" | "EnterStart" | "Idle" | "LeaveAnimating" | "LeaveStart";
                    readonly transitionGeneration: number;
                };
                readonly maybeLastButtonPointerType: Option.Option<string>;
            };
            readonly popoverAnimatedDemo: {
                readonly id: string;
                readonly isOpen: boolean;
                readonly isAnimated: boolean;
                readonly isModal: boolean;
                readonly contentFocus: boolean;
                readonly animation: {
                    readonly id: string;
                    readonly isShowing: boolean;
                    readonly transitionState: "EnterAnimating" | "EnterStart" | "Idle" | "LeaveAnimating" | "LeaveStart";
                    readonly transitionGeneration: number;
                };
                readonly maybeLastButtonPointerType: Option.Option<string>;
            };
            readonly popoverArrowDemo: {
                readonly id: string;
                readonly isOpen: boolean;
                readonly isAnimated: boolean;
                readonly isModal: boolean;
                readonly contentFocus: boolean;
                readonly animation: {
                    readonly id: string;
                    readonly isShowing: boolean;
                    readonly transitionState: "EnterAnimating" | "EnterStart" | "Idle" | "LeaveAnimating" | "LeaveStart";
                    readonly transitionGeneration: number;
                };
                readonly maybeLastButtonPointerType: Option.Option<string>;
            };
            readonly popoverNestedParentDemo: {
                readonly id: string;
                readonly isOpen: boolean;
                readonly isAnimated: boolean;
                readonly isModal: boolean;
                readonly contentFocus: boolean;
                readonly animation: {
                    readonly id: string;
                    readonly isShowing: boolean;
                    readonly transitionState: "EnterAnimating" | "EnterStart" | "Idle" | "LeaveAnimating" | "LeaveStart";
                    readonly transitionGeneration: number;
                };
                readonly maybeLastButtonPointerType: Option.Option<string>;
            };
            readonly popoverNestedChildDemo: {
                readonly id: string;
                readonly isOpen: boolean;
                readonly isAnimated: boolean;
                readonly isModal: boolean;
                readonly contentFocus: boolean;
                readonly animation: {
                    readonly id: string;
                    readonly isShowing: boolean;
                    readonly transitionState: "EnterAnimating" | "EnterStart" | "Idle" | "LeaveAnimating" | "LeaveStart";
                    readonly transitionGeneration: number;
                };
                readonly maybeLastButtonPointerType: Option.Option<string>;
            };
            readonly verticalRadioGroupDemo: {
                readonly id: string;
                readonly maybeFocusedIndex: Option.Option<number>;
            };
            readonly verticalRadioGroupDemoValue: Option.Option<"Business" | "Enterprise" | "Startup">;
            readonly horizontalRadioGroupDemo: {
                readonly id: string;
                readonly maybeFocusedIndex: Option.Option<number>;
            };
            readonly horizontalRadioGroupDemoValue: Option.Option<"Business" | "Enterprise" | "Startup">;
            readonly selectDemoValue: string;
            readonly sliderRatingDemo: {
                readonly id: string;
                readonly min: number;
                readonly max: number;
                readonly step: number;
                readonly dragState: {
                    readonly _tag: "Idle";
                } | {
                    readonly _tag: "Dragging";
                    readonly originValue: number;
                };
            };
            readonly sliderRatingValue: number;
            readonly sliderVolumeDemo: {
                readonly id: string;
                readonly min: number;
                readonly max: number;
                readonly step: number;
                readonly dragState: {
                    readonly _tag: "Idle";
                } | {
                    readonly _tag: "Dragging";
                    readonly originValue: number;
                };
            };
            readonly sliderVolumeValue: number;
            readonly isSwitchDemoChecked: boolean;
            readonly horizontalTabsDemo: {
                readonly id: string;
                readonly maybeFocusedIndex: Option.Option<number>;
                readonly activationMode: "Automatic" | "Manual";
            };
            readonly horizontalTabsDemoTab: "Elm" | "Foldkit" | "React";
            readonly verticalTabsDemo: {
                readonly id: string;
                readonly maybeFocusedIndex: Option.Option<number>;
                readonly activationMode: "Automatic" | "Manual";
            };
            readonly verticalTabsDemoTab: "Elm" | "Foldkit" | "React";
            readonly dragAndDropDemo: {
                readonly id: string;
                readonly orientation: "Horizontal" | "Vertical";
                readonly activationThreshold: number;
                readonly dragState: {
                    readonly _tag: "Idle";
                } | {
                    readonly _tag: "Dragging";
                    readonly itemId: string;
                    readonly sourceContainerId: string;
                    readonly sourceIndex: number;
                    readonly origin: {
                        readonly screenX: number;
                        readonly screenY: number;
                    };
                    readonly current: {
                        readonly clientX: number;
                        readonly clientY: number;
                    };
                    readonly maybeDropTarget: Option.Option<{
                        readonly containerId: string;
                        readonly index: number;
                    }>;
                } | {
                    readonly _tag: "KeyboardDragging";
                    readonly itemId: string;
                    readonly sourceContainerId: string;
                    readonly sourceIndex: number;
                    readonly targetContainerId: string;
                    readonly targetIndex: number;
                } | {
                    readonly _tag: "Pending";
                    readonly itemId: string;
                    readonly containerId: string;
                    readonly index: number;
                    readonly origin: {
                        readonly screenX: number;
                        readonly screenY: number;
                    };
                };
            };
            readonly dragAndDropDemoColumns: readonly {
                readonly id: string;
                readonly label: string;
                readonly cards: {
                    readonly id: string;
                    readonly label: string;
                }[];
            }[];
            readonly dragAndDropDemoAnnouncement: string;
            readonly fileDropBasicDemo: {
                readonly id: string;
                readonly isDragOver: boolean;
            };
            readonly fileDropBasicDemoFiles: readonly File[];
            readonly toastDemo: {
                readonly id: string;
                readonly defaultDuration: import("effect/Duration").Duration;
                readonly entries: readonly {
                    readonly id: string;
                    readonly variant: "Error" | "Info" | "Success" | "Warning";
                    readonly animation: {
                        readonly id: string;
                        readonly isShowing: boolean;
                        readonly transitionState: "EnterAnimating" | "EnterStart" | "Idle" | "LeaveAnimating" | "LeaveStart";
                        readonly transitionGeneration: number;
                    };
                    readonly maybeDuration: Option.Option<import("effect/Duration").Duration>;
                    readonly pendingDismissVersion: number;
                    readonly isHovered: boolean;
                    readonly swipeState: {
                        readonly _tag: "Idle";
                    } | {
                        readonly _tag: "Dismissing";
                        readonly offsetX: number;
                        readonly direction: "Left" | "Right";
                    } | {
                        readonly _tag: "Dragging";
                        readonly pointerId: number;
                        readonly startX: number;
                        readonly currentX: number;
                    } | {
                        readonly _tag: "Settling";
                        readonly offsetX: number;
                    };
                    readonly swipeVersion: number;
                    readonly payload: {
                        readonly title: string;
                        readonly maybeDescription: Option.Option<string>;
                    };
                }[];
                readonly nextEntryKey: number;
                readonly maybeSwipeConfig: Option.Option<{
                    readonly direction: "Left" | "Right";
                    readonly threshold: number;
                }>;
            };
            readonly maybeLastDismissedToastTitle: Option.Option<string>;
            readonly tooltipDemo: {
                readonly id: string;
                readonly isOpen: boolean;
                readonly isHovered: boolean;
                readonly isFocused: boolean;
                readonly isDismissed: boolean;
                readonly showDelay: import("effect/Duration").Duration;
                readonly pendingShowVersion: number;
                readonly maybeLastPointerType: Option.Option<string>;
            };
            readonly hoverIntentCardDemo: {
                readonly isOpen: boolean;
                readonly isTriggerHovered: boolean;
                readonly isPanelHovered: boolean;
                readonly maybeFocusLocation: Option.Option<"Panel" | "Trigger">;
                readonly isDismissed: boolean;
                readonly openDelay: import("effect/Duration").Duration;
                readonly closeDelay: import("effect/Duration").Duration;
                readonly pendingOpenVersion: number;
                readonly pendingCloseVersion: number;
            };
            readonly hoverIntentMenuDemo: {
                readonly isOpen: boolean;
                readonly isTriggerHovered: boolean;
                readonly isPanelHovered: boolean;
                readonly maybeFocusLocation: Option.Option<"Panel" | "Trigger">;
                readonly isDismissed: boolean;
                readonly openDelay: import("effect/Duration").Duration;
                readonly closeDelay: import("effect/Duration").Duration;
                readonly pendingOpenVersion: number;
                readonly pendingCloseVersion: number;
            };
            readonly animationDemo: {
                readonly id: string;
                readonly isShowing: boolean;
                readonly transitionState: "EnterAnimating" | "EnterStart" | "Idle" | "LeaveAnimating" | "LeaveStart";
                readonly transitionGeneration: number;
            };
            readonly virtualListDemo: {
                readonly id: string;
                readonly rowHeightPx: number;
                readonly scrollTop: number;
                readonly measurement: {
                    readonly _tag: "Unmeasured";
                } | {
                    readonly _tag: "Measured";
                    readonly containerWidth: number;
                    readonly containerHeight: number;
                };
                readonly viewportAnchor: {
                    readonly _tag: "End";
                } | {
                    readonly _tag: "Offset";
                    readonly scrollTop: number;
                } | {
                    readonly _tag: "Row";
                    readonly key: string;
                    readonly index: number;
                    readonly viewportOffset: number;
                };
                readonly measuredRowHeights: {
                    readonly [x: string]: number;
                };
                readonly layoutVersion: number;
                readonly initialScroll: {
                    readonly _tag: "Applied";
                } | {
                    readonly _tag: "Pending";
                    readonly target: {
                        readonly _tag: "End";
                    } | {
                        readonly _tag: "Index";
                        readonly index: number;
                    } | {
                        readonly _tag: "Key";
                        readonly key: string;
                    } | {
                        readonly _tag: "Offset";
                        readonly offset: number;
                    };
                    readonly alignment: "Center" | "End" | "Nearest" | "Start";
                };
                readonly endBehavior: {
                    readonly _tag: "PreserveAnchor";
                } | {
                    readonly _tag: "Follow";
                    readonly thresholdPx: number;
                };
                readonly pendingScroll: {
                    readonly _tag: "Idle";
                } | {
                    readonly _tag: "Pending";
                    readonly request: {
                        readonly _tag: "Anchor";
                        readonly anchor: {
                            readonly _tag: "End";
                        } | {
                            readonly _tag: "Offset";
                            readonly scrollTop: number;
                        } | {
                            readonly _tag: "Row";
                            readonly key: string;
                            readonly index: number;
                            readonly viewportOffset: number;
                        };
                    } | {
                        readonly _tag: "Target";
                        readonly target: {
                            readonly _tag: "End";
                        } | {
                            readonly _tag: "Index";
                            readonly index: number;
                        } | {
                            readonly _tag: "Key";
                            readonly key: string;
                        } | {
                            readonly _tag: "Offset";
                            readonly offset: number;
                        };
                        readonly alignment: "Center" | "End" | "Nearest" | "Start";
                    };
                    readonly version: number;
                };
                readonly pendingScrollVersion: number;
            };
            readonly virtualListVariableDemo: {
                readonly id: string;
                readonly rowHeightPx: number;
                readonly scrollTop: number;
                readonly measurement: {
                    readonly _tag: "Unmeasured";
                } | {
                    readonly _tag: "Measured";
                    readonly containerWidth: number;
                    readonly containerHeight: number;
                };
                readonly viewportAnchor: {
                    readonly _tag: "End";
                } | {
                    readonly _tag: "Offset";
                    readonly scrollTop: number;
                } | {
                    readonly _tag: "Row";
                    readonly key: string;
                    readonly index: number;
                    readonly viewportOffset: number;
                };
                readonly measuredRowHeights: {
                    readonly [x: string]: number;
                };
                readonly layoutVersion: number;
                readonly initialScroll: {
                    readonly _tag: "Applied";
                } | {
                    readonly _tag: "Pending";
                    readonly target: {
                        readonly _tag: "End";
                    } | {
                        readonly _tag: "Index";
                        readonly index: number;
                    } | {
                        readonly _tag: "Key";
                        readonly key: string;
                    } | {
                        readonly _tag: "Offset";
                        readonly offset: number;
                    };
                    readonly alignment: "Center" | "End" | "Nearest" | "Start";
                };
                readonly endBehavior: {
                    readonly _tag: "PreserveAnchor";
                } | {
                    readonly _tag: "Follow";
                    readonly thresholdPx: number;
                };
                readonly pendingScroll: {
                    readonly _tag: "Idle";
                } | {
                    readonly _tag: "Pending";
                    readonly request: {
                        readonly _tag: "Anchor";
                        readonly anchor: {
                            readonly _tag: "End";
                        } | {
                            readonly _tag: "Offset";
                            readonly scrollTop: number;
                        } | {
                            readonly _tag: "Row";
                            readonly key: string;
                            readonly index: number;
                            readonly viewportOffset: number;
                        };
                    } | {
                        readonly _tag: "Target";
                        readonly target: {
                            readonly _tag: "End";
                        } | {
                            readonly _tag: "Index";
                            readonly index: number;
                        } | {
                            readonly _tag: "Key";
                            readonly key: string;
                        } | {
                            readonly _tag: "Offset";
                            readonly offset: number;
                        };
                        readonly alignment: "Center" | "End" | "Nearest" | "Start";
                    };
                    readonly version: number;
                };
                readonly pendingScrollVersion: number;
            };
            readonly virtualListChatDemo: {
                readonly id: string;
                readonly rowHeightPx: number;
                readonly scrollTop: number;
                readonly measurement: {
                    readonly _tag: "Unmeasured";
                } | {
                    readonly _tag: "Measured";
                    readonly containerWidth: number;
                    readonly containerHeight: number;
                };
                readonly viewportAnchor: {
                    readonly _tag: "End";
                } | {
                    readonly _tag: "Offset";
                    readonly scrollTop: number;
                } | {
                    readonly _tag: "Row";
                    readonly key: string;
                    readonly index: number;
                    readonly viewportOffset: number;
                };
                readonly measuredRowHeights: {
                    readonly [x: string]: number;
                };
                readonly layoutVersion: number;
                readonly initialScroll: {
                    readonly _tag: "Applied";
                } | {
                    readonly _tag: "Pending";
                    readonly target: {
                        readonly _tag: "End";
                    } | {
                        readonly _tag: "Index";
                        readonly index: number;
                    } | {
                        readonly _tag: "Key";
                        readonly key: string;
                    } | {
                        readonly _tag: "Offset";
                        readonly offset: number;
                    };
                    readonly alignment: "Center" | "End" | "Nearest" | "Start";
                };
                readonly endBehavior: {
                    readonly _tag: "PreserveAnchor";
                } | {
                    readonly _tag: "Follow";
                    readonly thresholdPx: number;
                };
                readonly pendingScroll: {
                    readonly _tag: "Idle";
                } | {
                    readonly _tag: "Pending";
                    readonly request: {
                        readonly _tag: "Anchor";
                        readonly anchor: {
                            readonly _tag: "End";
                        } | {
                            readonly _tag: "Offset";
                            readonly scrollTop: number;
                        } | {
                            readonly _tag: "Row";
                            readonly key: string;
                            readonly index: number;
                            readonly viewportOffset: number;
                        };
                    } | {
                        readonly _tag: "Target";
                        readonly target: {
                            readonly _tag: "End";
                        } | {
                            readonly _tag: "Index";
                            readonly index: number;
                        } | {
                            readonly _tag: "Key";
                            readonly key: string;
                        } | {
                            readonly _tag: "Offset";
                            readonly offset: number;
                        };
                        readonly alignment: "Center" | "End" | "Nearest" | "Start";
                    };
                    readonly version: number;
                };
                readonly pendingScrollVersion: number;
            };
            readonly virtualListChatMessages: readonly {
                readonly id: number;
                readonly body: string;
                readonly isExpanded: boolean;
            }[];
            readonly virtualListChatNextId: number;
            readonly virtualListChatStartProximity: {
                readonly _tag: "Away";
            } | {
                readonly _tag: "Near";
            };
        };
        readonly comingFromReact: {
            readonly [x: string]: boolean;
        };
        readonly apiReference: {
            readonly apiData: import("foldkit/asyncData").AsyncData<{
                readonly parsedApi: {
                    readonly modules: readonly {
                        readonly name: string;
                        readonly functions: readonly {
                            readonly name: string;
                            readonly description: Option.Option<string>;
                            readonly signatures: readonly {
                                readonly parameters: readonly {
                                    readonly name: string;
                                    readonly type: string;
                                    readonly isOptional: boolean;
                                    readonly isRest: boolean;
                                    readonly defaultValue: Option.Option<string>;
                                    readonly description: Option.Option<string>;
                                }[];
                                readonly returnType: string;
                                readonly typeParameters: readonly string[];
                            }[];
                            readonly sourceUrl: Option.Option<string>;
                        }[];
                        readonly types: readonly {
                            readonly name: string;
                            readonly description: Option.Option<string>;
                            readonly typeDefinition: string;
                            readonly sourceUrl: Option.Option<string>;
                        }[];
                        readonly interfaces: readonly {
                            readonly name: string;
                            readonly description: Option.Option<string>;
                            readonly typeDefinition: string;
                            readonly sourceUrl: Option.Option<string>;
                        }[];
                        readonly variables: readonly {
                            readonly name: string;
                            readonly description: Option.Option<string>;
                            readonly type: string;
                            readonly sourceUrl: Option.Option<string>;
                        }[];
                    }[];
                };
                readonly highlights: {
                    readonly [x: string]: string;
                };
            }, string>;
            readonly disclosures: {
                readonly [x: string]: boolean;
            };
        };
        readonly exampleDetail: {
            readonly sourceFileTabs: {
                readonly id: string;
                readonly maybeFocusedIndex: Option.Option<number>;
                readonly activationMode: "Automatic" | "Manual";
            };
            readonly maybeActiveSourceFilePath: Option.Option<string>;
            readonly maybeExampleUrl: Option.Option<string>;
            readonly isLivePreviewOpen: boolean;
            readonly currentSources: import("foldkit/asyncData").AsyncData<{
                readonly files: readonly {
                    readonly path: string;
                    readonly highlightedHtml: string;
                    readonly rawCode: string;
                }[];
            }, string>;
        };
        readonly search: {
            readonly dialog: {
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
            readonly query: string;
            readonly searchState: {
                readonly _tag: "Idle";
            } | {
                readonly _tag: "Loading";
                readonly results: readonly {
                    readonly url: string;
                    readonly title: string;
                    readonly excerpt: string;
                    readonly section: string;
                    readonly kind: string;
                }[];
            } | {
                readonly _tag: "Ok";
                readonly results: readonly {
                    readonly url: string;
                    readonly title: string;
                    readonly excerpt: string;
                    readonly section: string;
                    readonly kind: string;
                }[];
            };
            readonly activeResultIndex: number;
        };
    }, {
        readonly _tag: "ClickedOpenMobileMenu";
    } | {
        readonly _tag: "ClickedOpenSearch";
    } | {
        readonly _tag: "CompletedApplyTheme";
    } | {
        readonly _tag: "CompletedInjectAnalytics";
    } | {
        readonly _tag: "CompletedInjectSpeedInsights";
    } | {
        readonly _tag: "CompletedLoadExternal";
    } | {
        readonly _tag: "CompletedLoadPlayground";
    } | {
        readonly _tag: "CompletedNavigateInternal";
    } | {
        readonly _tag: "CompletedSaveSidebarState";
    } | {
        readonly _tag: "CompletedSaveThemePreference";
    } | {
        readonly _tag: "CompletedScrollMobileMenuActiveLinkIntoView";
    } | {
        readonly _tag: "CompletedScrollSidebarActiveLinkIntoView";
    } | {
        readonly _tag: "CompletedScrollToAnchor";
    } | {
        readonly _tag: "CompletedScrollToTop";
    } | {
        readonly _tag: "FailedCopyLink";
    } | {
        readonly _tag: "PressedSearchShortcut";
    } | {
        readonly _tag: "SucceededCopyLink";
    } | {
        readonly _tag: "ChangedActiveSection";
        readonly sectionId: string;
    } | {
        readonly _tag: "ChangedSystemTheme";
        readonly theme: "Dark" | "Light";
    } | {
        readonly _tag: "ChangedUrl";
        readonly url: {
            readonly protocol: string;
            readonly host: string;
            readonly port: Option.Option<string>;
            readonly pathname: string;
            readonly search: Option.Option<string>;
            readonly hash: Option.Option<string>;
        };
    } | {
        readonly _tag: "ChangedViewportWidth";
        readonly isNarrow: boolean;
    } | {
        readonly _tag: "ClickedCopyLink";
        readonly hash: string;
    } | {
        readonly _tag: "ClickedLink";
        readonly request: {
            readonly _tag: "External";
            readonly href: string;
        } | {
            readonly _tag: "Internal";
            readonly url: {
                readonly protocol: string;
                readonly host: string;
                readonly port: Option.Option<string>;
                readonly pathname: string;
                readonly search: Option.Option<string>;
                readonly hash: Option.Option<string>;
            };
        };
    } | {
        readonly _tag: "ClickedMobileTableOfContentsLink";
        readonly sectionId: string;
    } | {
        readonly _tag: "CompletedLoadBrowserEnvironment";
        readonly maybeThemePreference: Option.Option<"Dark" | "Light" | "System">;
        readonly maybeSidebarState: Option.Option<{
            readonly open: {
                readonly [x: string]: boolean;
            };
        }>;
        readonly systemTheme: "Dark" | "Light";
        readonly isPlaygroundSupported: boolean;
        readonly currentYear: number;
        readonly today: {
            readonly year: number;
            readonly month: number;
            readonly day: number;
        };
    } | {
        readonly _tag: "GotApiReferenceMessage";
        readonly message: {
            readonly _tag: "RequestedApiData";
        } | {
            readonly _tag: "FailedLoadApiData";
            readonly error: string;
        } | {
            readonly _tag: "SucceededLoadApiData";
            readonly apiData: {
                readonly parsedApi: {
                    readonly modules: readonly {
                        readonly name: string;
                        readonly functions: readonly {
                            readonly name: string;
                            readonly description: Option.Option<string>;
                            readonly signatures: readonly {
                                readonly parameters: readonly {
                                    readonly name: string;
                                    readonly type: string;
                                    readonly isOptional: boolean;
                                    readonly isRest: boolean;
                                    readonly defaultValue: Option.Option<string>;
                                    readonly description: Option.Option<string>;
                                }[];
                                readonly returnType: string;
                                readonly typeParameters: readonly string[];
                            }[];
                            readonly sourceUrl: Option.Option<string>;
                        }[];
                        readonly types: readonly {
                            readonly name: string;
                            readonly description: Option.Option<string>;
                            readonly typeDefinition: string;
                            readonly sourceUrl: Option.Option<string>;
                        }[];
                        readonly interfaces: readonly {
                            readonly name: string;
                            readonly description: Option.Option<string>;
                            readonly typeDefinition: string;
                            readonly sourceUrl: Option.Option<string>;
                        }[];
                        readonly variables: readonly {
                            readonly name: string;
                            readonly description: Option.Option<string>;
                            readonly type: string;
                            readonly sourceUrl: Option.Option<string>;
                        }[];
                    }[];
                };
                readonly highlights: {
                    readonly [x: string]: string;
                };
            };
        } | {
            readonly _tag: "ToggledSignature";
            readonly id: string;
            readonly isOpen: boolean;
        };
    } | {
        readonly _tag: "GotComingFromReactMessage";
        readonly message: {
            readonly _tag: "ToggledFaq";
            readonly id: string;
            readonly isOpen: boolean;
        };
    } | {
        readonly _tag: "GotCoreSubmodelPageMessage";
        readonly message: {
            readonly _tag: "ToggledMapMessagesUnderHood";
            readonly isOpen: boolean;
        };
    } | {
        readonly _tag: "GotExampleDetailMessage";
        readonly message: {
            readonly _tag: "ChangedExampleUrl";
            readonly url: string;
        } | {
            readonly _tag: "FailedLoadExampleSources";
            readonly error: string;
        } | {
            readonly _tag: "GotSourceFileTabsMessage";
            readonly message: {
                readonly _tag: "CompletedFocusTab";
            } | {
                readonly _tag: "FocusedTab";
                readonly index: number;
            } | {
                readonly _tag: "SelectedTab";
                readonly index: number;
                readonly value: string;
            };
        } | {
            readonly _tag: "RequestedExampleSources";
            readonly slug: string;
        } | {
            readonly _tag: "SucceededLoadExampleSources";
            readonly sources: {
                readonly files: readonly {
                    readonly path: string;
                    readonly highlightedHtml: string;
                    readonly rawCode: string;
                }[];
            };
        } | {
            readonly _tag: "ToggledLivePreview";
            readonly isOpen: boolean;
        };
    } | {
        readonly _tag: "GotHomeMessage";
        readonly message: {
            readonly _tag: "GotAsyncCounterDemoMessage";
            readonly message: {
                readonly _tag: "ClickedDemoIncrement";
            } | {
                readonly _tag: "ClickedDemoReset";
            } | {
                readonly _tag: "ChangedDemoResetDuration";
                readonly seconds: number;
            } | {
                readonly _tag: "CompletedDelayAdvancePhase";
                readonly generation: number;
            };
        } | {
            readonly _tag: "GotDemoTabsMessage";
            readonly message: {
                readonly _tag: "CompletedFocusTab";
            } | {
                readonly _tag: "FocusedTab";
                readonly index: number;
            } | {
                readonly _tag: "SelectedTab";
                readonly index: number;
                readonly value: string;
            };
        } | {
            readonly _tag: "GotNotePlayerDemoMessage";
            readonly message: {
                readonly _tag: "ClickedPause";
            } | {
                readonly _tag: "ClickedPlay";
            } | {
                readonly _tag: "ClickedStop";
            } | {
                readonly _tag: "FailedAcquireAudioContext";
            } | {
                readonly _tag: "ReleasedAudioContext";
            } | {
                readonly _tag: "SucceededAcquireAudioContext";
            } | {
                readonly _tag: "ChangedNoteInput";
                readonly value: string;
            } | {
                readonly _tag: "CompletedDelayAdvancePhase";
                readonly generation: number;
            } | {
                readonly _tag: "CompletedPlayNote";
                readonly noteIndex: number;
            } | {
                readonly _tag: "GotNoteDurationMessage";
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
            };
        } | {
            readonly _tag: "GotPlaygroundMenuMessage";
            readonly message: {
                readonly _tag: "BlurredItems";
            } | {
                readonly _tag: "ClickedButton";
            } | {
                readonly _tag: "Closed";
            } | {
                readonly _tag: "CompletedAnchorMenu";
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
                readonly _tag: "CompletedPortalMenuBackdrop";
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
                readonly screenX: number;
                readonly screenY: number;
                readonly timeStamp: number;
            } | {
                readonly _tag: "ReleasedPointerOnItems";
                readonly screenX: number;
                readonly screenY: number;
                readonly timeStamp: number;
            } | {
                readonly _tag: "RequestedItemClick";
                readonly index: number;
            } | {
                readonly _tag: "Searched";
                readonly key: string;
                readonly maybeTargetIndex: Option.Option<number>;
            } | {
                readonly _tag: "SelectedItem";
                readonly index: number;
                readonly item: string;
            };
        } | {
            readonly _tag: "UpdatedNewsletterEmail";
            readonly value: string;
        };
    } | {
        readonly _tag: "GotMobileMenuDialogMessage";
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
        readonly _tag: "GotPlaygroundMessage";
        readonly message: {
            readonly _tag: "ReleasedPlayground";
        } | {
            readonly _tag: "ScheduledWritePlaygroundFile";
        } | {
            readonly _tag: "SucceededMountPlaygroundEditor";
        } | {
            readonly _tag: "BootedPlayground";
            readonly previewUrl: string;
        } | {
            readonly _tag: "CompletedWaitForPlaygroundServerFailure";
            readonly reason: string;
        } | {
            readonly _tag: "EditedPlaygroundFile";
            readonly path: string;
            readonly content: string;
        } | {
            readonly _tag: "FailedBootPlayground";
            readonly reason: string;
        } | {
            readonly _tag: "FailedMountPlaygroundEditor";
            readonly reason: string;
        } | {
            readonly _tag: "FailedWritePlaygroundFile";
            readonly reason: string;
        } | {
            readonly _tag: "GotFileTabsMessage";
            readonly message: {
                readonly _tag: "CompletedFocusTab";
            } | {
                readonly _tag: "FocusedTab";
                readonly index: number;
            } | {
                readonly _tag: "SelectedTab";
                readonly index: number;
                readonly value: string;
            };
        } | {
            readonly _tag: "LoadedPlaygroundPreview";
            readonly previewUrl: string;
        };
    } | {
        readonly _tag: "GotSearchMessage";
        readonly message: {
            readonly _tag: "ClearedSearchQuery";
        } | {
            readonly _tag: "CompletedFocusSearchInput";
        } | {
            readonly _tag: "CompletedNavigateToResult";
        } | {
            readonly _tag: "CompletedScrollToResult";
        } | {
            readonly _tag: "CompletedFetchSearchResults";
            readonly results: readonly {
                readonly url: string;
                readonly title: string;
                readonly excerpt: string;
                readonly section: string;
                readonly kind: string;
            }[];
            readonly query: string;
        } | {
            readonly _tag: "GotSearchDialogMessage";
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
            readonly _tag: "PressedArrowKey";
            readonly direction: "Down" | "Up";
        } | {
            readonly _tag: "SelectedSearchResult";
            readonly url: string;
        } | {
            readonly _tag: "UpdatedSearchQuery";
            readonly query: string;
        };
    } | {
        readonly _tag: "GotSnippetCopyMessage";
        readonly message: {
            readonly _tag: "FailedCopySnippet";
        } | {
            readonly _tag: "ClickedCopySnippet";
            readonly snippetId: string;
            readonly text: string;
        } | {
            readonly _tag: "CompletedWaitBeforeHidingCopiedIndicator";
            readonly snippetId: string;
        } | {
            readonly _tag: "SucceededCopySnippet";
            readonly snippetId: string;
        };
    } | {
        readonly _tag: "GotSnippetDisclosureMessage";
        readonly message: {
            readonly _tag: "CompletedMeasureSnippetHeight";
            readonly snippetId: string;
            readonly snippetSize: {
                readonly _tag: "Fits";
            } | {
                readonly _tag: "Overflows";
            };
        } | {
            readonly _tag: "ToggledCodeDisclosure";
            readonly disclosureId: string;
            readonly isOpen: boolean;
        };
    } | {
        readonly _tag: "GotThemeMenuMessage";
        readonly message: {
            readonly _tag: "BlurredItems";
        } | {
            readonly _tag: "ClickedButton";
        } | {
            readonly _tag: "Closed";
        } | {
            readonly _tag: "CompletedAnchorMenu";
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
            readonly _tag: "CompletedPortalMenuBackdrop";
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
            readonly screenX: number;
            readonly screenY: number;
            readonly timeStamp: number;
        } | {
            readonly _tag: "ReleasedPointerOnItems";
            readonly screenX: number;
            readonly screenY: number;
            readonly timeStamp: number;
        } | {
            readonly _tag: "RequestedItemClick";
            readonly index: number;
        } | {
            readonly _tag: "Searched";
            readonly key: string;
            readonly maybeTargetIndex: Option.Option<number>;
        } | {
            readonly _tag: "SelectedItem";
            readonly index: number;
            readonly item: string;
        };
    } | {
        readonly _tag: "GotUiPageMessage";
        readonly message: {
            readonly _tag: "ClickedButtonDemo";
        } | {
            readonly _tag: "ClickedDeleteProject";
        } | {
            readonly _tag: "ClickedDismissAllToasts";
        } | {
            readonly _tag: "ClickedEditFilters";
        } | {
            readonly _tag: "ClickedHoverIntentMenuItem";
        } | {
            readonly _tag: "ClickedOpenAnimatedDialog";
        } | {
            readonly _tag: "ClickedOpenDialog";
        } | {
            readonly _tag: "ClickedOpenProjectSettings";
        } | {
            readonly _tag: "ClickedShowErrorToast";
        } | {
            readonly _tag: "ClickedShowInfoToast";
        } | {
            readonly _tag: "ClickedShowStickyToast";
        } | {
            readonly _tag: "ClickedShowSuccessToast";
        } | {
            readonly _tag: "ClickedToggleAnimationDemo";
        } | {
            readonly _tag: "ClickedVirtualListChatAppend";
        } | {
            readonly _tag: "ClickedVirtualListChatPrepend";
        } | {
            readonly _tag: "ClickedVirtualListChatScrollToMessage";
        } | {
            readonly _tag: "ClickedVirtualListScrollToMiddle";
        } | {
            readonly _tag: "ClickedVirtualListVariableScrollToMiddle";
        } | {
            readonly _tag: "ClickedRemoveFileDropDemoFile";
            readonly fileIndex: number;
        } | {
            readonly _tag: "ClickedVirtualListChatToggleMessage";
            readonly messageId: number;
        } | {
            readonly _tag: "GotAnimationDemoMessage";
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
            readonly _tag: "GotCalendarBasicDemoMessage";
            readonly message: {
                readonly _tag: "BlurredGrid";
            } | {
                readonly _tag: "ClickedHeading";
            } | {
                readonly _tag: "ClickedNextMonthButton";
            } | {
                readonly _tag: "ClickedPreviousMonthButton";
            } | {
                readonly _tag: "CompletedFocusGrid";
            } | {
                readonly _tag: "FocusedGrid";
            } | {
                readonly _tag: "ClickedDay";
                readonly date: {
                    readonly year: number;
                    readonly month: number;
                    readonly day: number;
                };
            } | {
                readonly _tag: "PagedYears";
                readonly direction: -1 | 1;
            } | {
                readonly _tag: "PressedKeyOnGrid";
                readonly key: string;
                readonly isShift: boolean;
            } | {
                readonly _tag: "RefreshedToday";
                readonly today: {
                    readonly year: number;
                    readonly month: number;
                    readonly day: number;
                };
            } | {
                readonly _tag: "SelectedMonth";
                readonly month: number;
            } | {
                readonly _tag: "SelectedYear";
                readonly year: number;
            };
        } | {
            readonly _tag: "GotComboboxDemoMessage";
            readonly message: {
                readonly _tag: "CompletedAnchorCombobox";
            } | {
                readonly _tag: "CompletedAttachComboboxPreventBlur";
            } | {
                readonly _tag: "CompletedAttachComboboxSelectOnFocus";
            } | {
                readonly _tag: "CompletedClickItem";
            } | {
                readonly _tag: "CompletedFocusInput";
            } | {
                readonly _tag: "CompletedInertOthers";
            } | {
                readonly _tag: "CompletedLockScroll";
            } | {
                readonly _tag: "CompletedPortalComboboxBackdrop";
            } | {
                readonly _tag: "CompletedRestoreInert";
            } | {
                readonly _tag: "CompletedScrollIntoView";
            } | {
                readonly _tag: "CompletedUnlockScroll";
            } | {
                readonly _tag: "DeactivatedItem";
            } | {
                readonly _tag: "SuppressedEmptyItemNavigation";
            } | {
                readonly _tag: "SuppressedItemCommit";
            } | {
                readonly _tag: "ActivatedItem";
                readonly index: number;
                readonly activationTrigger: "Keyboard" | "Pointer";
                readonly maybeImmediateSelection: Option.Option<{
                    readonly item: string;
                }>;
            } | {
                readonly _tag: "BlurredInput";
                readonly restingInputValue: string;
                readonly isClearable: boolean;
            } | {
                readonly _tag: "Closed";
                readonly restingInputValue: string;
                readonly isClearable: boolean;
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
                readonly _tag: "PressedToggleButton";
                readonly restingInputValue: string;
                readonly isClearable: boolean;
            } | {
                readonly _tag: "RequestedItemClick";
                readonly index: number;
            } | {
                readonly _tag: "SelectedItem";
                readonly item: string;
                readonly displayText: string;
                readonly wasSelected: boolean;
            } | {
                readonly _tag: "UpdatedInputValue";
                readonly value: string;
            };
        } | {
            readonly _tag: "GotComboboxMultiDemoMessage";
            readonly message: {
                readonly _tag: "CompletedAnchorCombobox";
            } | {
                readonly _tag: "CompletedAttachComboboxPreventBlur";
            } | {
                readonly _tag: "CompletedAttachComboboxSelectOnFocus";
            } | {
                readonly _tag: "CompletedClickItem";
            } | {
                readonly _tag: "CompletedFocusInput";
            } | {
                readonly _tag: "CompletedInertOthers";
            } | {
                readonly _tag: "CompletedLockScroll";
            } | {
                readonly _tag: "CompletedPortalComboboxBackdrop";
            } | {
                readonly _tag: "CompletedRestoreInert";
            } | {
                readonly _tag: "CompletedScrollIntoView";
            } | {
                readonly _tag: "CompletedUnlockScroll";
            } | {
                readonly _tag: "DeactivatedItem";
            } | {
                readonly _tag: "SuppressedEmptyItemNavigation";
            } | {
                readonly _tag: "SuppressedItemCommit";
            } | {
                readonly _tag: "ActivatedItem";
                readonly index: number;
                readonly activationTrigger: "Keyboard" | "Pointer";
                readonly maybeImmediateSelection: Option.Option<{
                    readonly item: string;
                }>;
            } | {
                readonly _tag: "BlurredInput";
                readonly restingInputValue: string;
                readonly isClearable: boolean;
            } | {
                readonly _tag: "Closed";
                readonly restingInputValue: string;
                readonly isClearable: boolean;
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
                readonly _tag: "PressedToggleButton";
                readonly restingInputValue: string;
                readonly isClearable: boolean;
            } | {
                readonly _tag: "RequestedItemClick";
                readonly index: number;
            } | {
                readonly _tag: "SelectedItem";
                readonly item: string;
                readonly displayText: string;
                readonly wasSelected: boolean;
            } | {
                readonly _tag: "UpdatedInputValue";
                readonly value: string;
            };
        } | {
            readonly _tag: "GotComboboxNullableDemoMessage";
            readonly message: {
                readonly _tag: "CompletedAnchorCombobox";
            } | {
                readonly _tag: "CompletedAttachComboboxPreventBlur";
            } | {
                readonly _tag: "CompletedAttachComboboxSelectOnFocus";
            } | {
                readonly _tag: "CompletedClickItem";
            } | {
                readonly _tag: "CompletedFocusInput";
            } | {
                readonly _tag: "CompletedInertOthers";
            } | {
                readonly _tag: "CompletedLockScroll";
            } | {
                readonly _tag: "CompletedPortalComboboxBackdrop";
            } | {
                readonly _tag: "CompletedRestoreInert";
            } | {
                readonly _tag: "CompletedScrollIntoView";
            } | {
                readonly _tag: "CompletedUnlockScroll";
            } | {
                readonly _tag: "DeactivatedItem";
            } | {
                readonly _tag: "SuppressedEmptyItemNavigation";
            } | {
                readonly _tag: "SuppressedItemCommit";
            } | {
                readonly _tag: "ActivatedItem";
                readonly index: number;
                readonly activationTrigger: "Keyboard" | "Pointer";
                readonly maybeImmediateSelection: Option.Option<{
                    readonly item: string;
                }>;
            } | {
                readonly _tag: "BlurredInput";
                readonly restingInputValue: string;
                readonly isClearable: boolean;
            } | {
                readonly _tag: "Closed";
                readonly restingInputValue: string;
                readonly isClearable: boolean;
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
                readonly _tag: "PressedToggleButton";
                readonly restingInputValue: string;
                readonly isClearable: boolean;
            } | {
                readonly _tag: "RequestedItemClick";
                readonly index: number;
            } | {
                readonly _tag: "SelectedItem";
                readonly item: string;
                readonly displayText: string;
                readonly wasSelected: boolean;
            } | {
                readonly _tag: "UpdatedInputValue";
                readonly value: string;
            };
        } | {
            readonly _tag: "GotComboboxPlacementLockDemoMessage";
            readonly message: {
                readonly _tag: "CompletedAnchorCombobox";
            } | {
                readonly _tag: "CompletedAttachComboboxPreventBlur";
            } | {
                readonly _tag: "CompletedAttachComboboxSelectOnFocus";
            } | {
                readonly _tag: "CompletedClickItem";
            } | {
                readonly _tag: "CompletedFocusInput";
            } | {
                readonly _tag: "CompletedInertOthers";
            } | {
                readonly _tag: "CompletedLockScroll";
            } | {
                readonly _tag: "CompletedPortalComboboxBackdrop";
            } | {
                readonly _tag: "CompletedRestoreInert";
            } | {
                readonly _tag: "CompletedScrollIntoView";
            } | {
                readonly _tag: "CompletedUnlockScroll";
            } | {
                readonly _tag: "DeactivatedItem";
            } | {
                readonly _tag: "SuppressedEmptyItemNavigation";
            } | {
                readonly _tag: "SuppressedItemCommit";
            } | {
                readonly _tag: "ActivatedItem";
                readonly index: number;
                readonly activationTrigger: "Keyboard" | "Pointer";
                readonly maybeImmediateSelection: Option.Option<{
                    readonly item: string;
                }>;
            } | {
                readonly _tag: "BlurredInput";
                readonly restingInputValue: string;
                readonly isClearable: boolean;
            } | {
                readonly _tag: "Closed";
                readonly restingInputValue: string;
                readonly isClearable: boolean;
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
                readonly _tag: "PressedToggleButton";
                readonly restingInputValue: string;
                readonly isClearable: boolean;
            } | {
                readonly _tag: "RequestedItemClick";
                readonly index: number;
            } | {
                readonly _tag: "SelectedItem";
                readonly item: string;
                readonly displayText: string;
                readonly wasSelected: boolean;
            } | {
                readonly _tag: "UpdatedInputValue";
                readonly value: string;
            };
        } | {
            readonly _tag: "GotComboboxSelectOnFocusDemoMessage";
            readonly message: {
                readonly _tag: "CompletedAnchorCombobox";
            } | {
                readonly _tag: "CompletedAttachComboboxPreventBlur";
            } | {
                readonly _tag: "CompletedAttachComboboxSelectOnFocus";
            } | {
                readonly _tag: "CompletedClickItem";
            } | {
                readonly _tag: "CompletedFocusInput";
            } | {
                readonly _tag: "CompletedInertOthers";
            } | {
                readonly _tag: "CompletedLockScroll";
            } | {
                readonly _tag: "CompletedPortalComboboxBackdrop";
            } | {
                readonly _tag: "CompletedRestoreInert";
            } | {
                readonly _tag: "CompletedScrollIntoView";
            } | {
                readonly _tag: "CompletedUnlockScroll";
            } | {
                readonly _tag: "DeactivatedItem";
            } | {
                readonly _tag: "SuppressedEmptyItemNavigation";
            } | {
                readonly _tag: "SuppressedItemCommit";
            } | {
                readonly _tag: "ActivatedItem";
                readonly index: number;
                readonly activationTrigger: "Keyboard" | "Pointer";
                readonly maybeImmediateSelection: Option.Option<{
                    readonly item: string;
                }>;
            } | {
                readonly _tag: "BlurredInput";
                readonly restingInputValue: string;
                readonly isClearable: boolean;
            } | {
                readonly _tag: "Closed";
                readonly restingInputValue: string;
                readonly isClearable: boolean;
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
                readonly _tag: "PressedToggleButton";
                readonly restingInputValue: string;
                readonly isClearable: boolean;
            } | {
                readonly _tag: "RequestedItemClick";
                readonly index: number;
            } | {
                readonly _tag: "SelectedItem";
                readonly item: string;
                readonly displayText: string;
                readonly wasSelected: boolean;
            } | {
                readonly _tag: "UpdatedInputValue";
                readonly value: string;
            };
        } | {
            readonly _tag: "GotDatePickerBasicDemoMessage";
            readonly message: {
                readonly _tag: "Cleared";
            } | {
                readonly _tag: "Closed";
            } | {
                readonly _tag: "Opened";
            } | {
                readonly _tag: "GotCalendarMessage";
                readonly message: {
                    readonly _tag: "BlurredGrid";
                } | {
                    readonly _tag: "ClickedHeading";
                } | {
                    readonly _tag: "ClickedNextMonthButton";
                } | {
                    readonly _tag: "ClickedPreviousMonthButton";
                } | {
                    readonly _tag: "CompletedFocusGrid";
                } | {
                    readonly _tag: "FocusedGrid";
                } | {
                    readonly _tag: "ClickedDay";
                    readonly date: {
                        readonly year: number;
                        readonly month: number;
                        readonly day: number;
                    };
                } | {
                    readonly _tag: "PagedYears";
                    readonly direction: -1 | 1;
                } | {
                    readonly _tag: "PressedKeyOnGrid";
                    readonly key: string;
                    readonly isShift: boolean;
                } | {
                    readonly _tag: "RefreshedToday";
                    readonly today: {
                        readonly year: number;
                        readonly month: number;
                        readonly day: number;
                    };
                } | {
                    readonly _tag: "SelectedMonth";
                    readonly month: number;
                } | {
                    readonly _tag: "SelectedYear";
                    readonly year: number;
                };
            } | {
                readonly _tag: "GotPopoverMessage";
                readonly message: {
                    readonly _tag: "BlurredPanel";
                } | {
                    readonly _tag: "ClickedButton";
                } | {
                    readonly _tag: "CompletedAnchorPopover";
                } | {
                    readonly _tag: "CompletedFocusButton";
                } | {
                    readonly _tag: "CompletedFocusPanel";
                } | {
                    readonly _tag: "CompletedInertOthers";
                } | {
                    readonly _tag: "CompletedLockScroll";
                } | {
                    readonly _tag: "CompletedPortalPopoverBackdrop";
                } | {
                    readonly _tag: "CompletedRestoreInert";
                } | {
                    readonly _tag: "CompletedUnlockScroll";
                } | {
                    readonly _tag: "IgnoredMouseClick";
                } | {
                    readonly _tag: "RequestedClose";
                } | {
                    readonly _tag: "RequestedOpen";
                } | {
                    readonly _tag: "SuppressedSpaceScroll";
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
                    readonly _tag: "PressedPointerOnButton";
                    readonly pointerType: string;
                    readonly button: number;
                };
            } | {
                readonly _tag: "RequestedSelectDate";
                readonly date: {
                    readonly year: number;
                    readonly month: number;
                    readonly day: number;
                };
            };
        } | {
            readonly _tag: "GotDialogAnimatedDemoMessage";
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
            readonly _tag: "GotDialogDemoMessage";
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
            readonly _tag: "GotDragAndDropDemoMessage";
            readonly message: {
                readonly _tag: "AdvancedAutoScrollFrame";
            } | {
                readonly _tag: "CancelledDrag";
            } | {
                readonly _tag: "CompletedFocusItem";
            } | {
                readonly _tag: "ConfirmedKeyboardDrop";
            } | {
                readonly _tag: "ReleasedPointer";
            } | {
                readonly _tag: "ActivatedKeyboardDrag";
                readonly itemId: string;
                readonly containerId: string;
                readonly index: number;
            } | {
                readonly _tag: "CompletedResolveKeyboardMove";
                readonly targetContainerId: string;
                readonly targetIndex: number;
            } | {
                readonly _tag: "MovedPointer";
                readonly screenX: number;
                readonly screenY: number;
                readonly clientX: number;
                readonly clientY: number;
                readonly maybeDropTarget: Option.Option<{
                    readonly containerId: string;
                    readonly index: number;
                }>;
            } | {
                readonly _tag: "PressedArrowKey";
                readonly direction: "Down" | "Left" | "NextContainer" | "PreviousContainer" | "Right" | "Up";
            } | {
                readonly _tag: "PressedDraggable";
                readonly itemId: string;
                readonly containerId: string;
                readonly index: number;
                readonly screenX: number;
                readonly screenY: number;
            };
        } | {
            readonly _tag: "GotFileDropBasicDemoMessage";
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
            readonly _tag: "GotHorizontalRadioGroupDemoMessage";
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
            readonly _tag: "GotHorizontalTabsDemoMessage";
            readonly message: {
                readonly _tag: "CompletedFocusTab";
            } | {
                readonly _tag: "FocusedTab";
                readonly index: number;
            } | {
                readonly _tag: "SelectedTab";
                readonly index: number;
                readonly value: string;
            };
        } | {
            readonly _tag: "GotHoverIntentCardDemoMessage";
            readonly message: {
                readonly _tag: "BlurredPanel";
            } | {
                readonly _tag: "BlurredTrigger";
            } | {
                readonly _tag: "EnteredPanel";
            } | {
                readonly _tag: "EnteredTrigger";
            } | {
                readonly _tag: "FocusedPanel";
            } | {
                readonly _tag: "FocusedTrigger";
            } | {
                readonly _tag: "LeftPanel";
            } | {
                readonly _tag: "LeftTrigger";
            } | {
                readonly _tag: "CompletedWaitBeforeClosing";
                readonly version: number;
            } | {
                readonly _tag: "CompletedWaitBeforeOpening";
                readonly version: number;
            } | {
                readonly _tag: "PressedEscape";
                readonly source: "Panel" | "Trigger";
            };
        } | {
            readonly _tag: "GotHoverIntentMenuDemoMessage";
            readonly message: {
                readonly _tag: "BlurredPanel";
            } | {
                readonly _tag: "BlurredTrigger";
            } | {
                readonly _tag: "EnteredPanel";
            } | {
                readonly _tag: "EnteredTrigger";
            } | {
                readonly _tag: "FocusedPanel";
            } | {
                readonly _tag: "FocusedTrigger";
            } | {
                readonly _tag: "LeftPanel";
            } | {
                readonly _tag: "LeftTrigger";
            } | {
                readonly _tag: "CompletedWaitBeforeClosing";
                readonly version: number;
            } | {
                readonly _tag: "CompletedWaitBeforeOpening";
                readonly version: number;
            } | {
                readonly _tag: "PressedEscape";
                readonly source: "Panel" | "Trigger";
            };
        } | {
            readonly _tag: "GotListboxDemoMessage";
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
            readonly _tag: "GotListboxGroupedDemoMessage";
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
            readonly _tag: "GotListboxMultiDemoMessage";
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
            readonly _tag: "GotMenuAnimatedDemoMessage";
            readonly message: {
                readonly _tag: "BlurredItems";
            } | {
                readonly _tag: "ClickedButton";
            } | {
                readonly _tag: "Closed";
            } | {
                readonly _tag: "CompletedAnchorMenu";
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
                readonly _tag: "CompletedPortalMenuBackdrop";
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
                readonly screenX: number;
                readonly screenY: number;
                readonly timeStamp: number;
            } | {
                readonly _tag: "ReleasedPointerOnItems";
                readonly screenX: number;
                readonly screenY: number;
                readonly timeStamp: number;
            } | {
                readonly _tag: "RequestedItemClick";
                readonly index: number;
            } | {
                readonly _tag: "Searched";
                readonly key: string;
                readonly maybeTargetIndex: Option.Option<number>;
            } | {
                readonly _tag: "SelectedItem";
                readonly index: number;
                readonly item: string;
            };
        } | {
            readonly _tag: "GotMenuBasicDemoMessage";
            readonly message: {
                readonly _tag: "BlurredItems";
            } | {
                readonly _tag: "ClickedButton";
            } | {
                readonly _tag: "Closed";
            } | {
                readonly _tag: "CompletedAnchorMenu";
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
                readonly _tag: "CompletedPortalMenuBackdrop";
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
                readonly screenX: number;
                readonly screenY: number;
                readonly timeStamp: number;
            } | {
                readonly _tag: "ReleasedPointerOnItems";
                readonly screenX: number;
                readonly screenY: number;
                readonly timeStamp: number;
            } | {
                readonly _tag: "RequestedItemClick";
                readonly index: number;
            } | {
                readonly _tag: "Searched";
                readonly key: string;
                readonly maybeTargetIndex: Option.Option<number>;
            } | {
                readonly _tag: "SelectedItem";
                readonly index: number;
                readonly item: string;
            };
        } | {
            readonly _tag: "GotNestedDialogChildDemoMessage";
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
            readonly _tag: "GotNestedDialogParentDemoMessage";
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
            readonly _tag: "GotOverlayComboboxDemoMessage";
            readonly message: {
                readonly _tag: "CompletedAnchorCombobox";
            } | {
                readonly _tag: "CompletedAttachComboboxPreventBlur";
            } | {
                readonly _tag: "CompletedAttachComboboxSelectOnFocus";
            } | {
                readonly _tag: "CompletedClickItem";
            } | {
                readonly _tag: "CompletedFocusInput";
            } | {
                readonly _tag: "CompletedInertOthers";
            } | {
                readonly _tag: "CompletedLockScroll";
            } | {
                readonly _tag: "CompletedPortalComboboxBackdrop";
            } | {
                readonly _tag: "CompletedRestoreInert";
            } | {
                readonly _tag: "CompletedScrollIntoView";
            } | {
                readonly _tag: "CompletedUnlockScroll";
            } | {
                readonly _tag: "DeactivatedItem";
            } | {
                readonly _tag: "SuppressedEmptyItemNavigation";
            } | {
                readonly _tag: "SuppressedItemCommit";
            } | {
                readonly _tag: "ActivatedItem";
                readonly index: number;
                readonly activationTrigger: "Keyboard" | "Pointer";
                readonly maybeImmediateSelection: Option.Option<{
                    readonly item: string;
                }>;
            } | {
                readonly _tag: "BlurredInput";
                readonly restingInputValue: string;
                readonly isClearable: boolean;
            } | {
                readonly _tag: "Closed";
                readonly restingInputValue: string;
                readonly isClearable: boolean;
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
                readonly _tag: "PressedToggleButton";
                readonly restingInputValue: string;
                readonly isClearable: boolean;
            } | {
                readonly _tag: "RequestedItemClick";
                readonly index: number;
            } | {
                readonly _tag: "SelectedItem";
                readonly item: string;
                readonly displayText: string;
                readonly wasSelected: boolean;
            } | {
                readonly _tag: "UpdatedInputValue";
                readonly value: string;
            };
        } | {
            readonly _tag: "GotOverlayDialogDemoMessage";
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
            readonly _tag: "GotPopoverAnimatedDemoMessage";
            readonly message: {
                readonly _tag: "BlurredPanel";
            } | {
                readonly _tag: "ClickedButton";
            } | {
                readonly _tag: "CompletedAnchorPopover";
            } | {
                readonly _tag: "CompletedFocusButton";
            } | {
                readonly _tag: "CompletedFocusPanel";
            } | {
                readonly _tag: "CompletedInertOthers";
            } | {
                readonly _tag: "CompletedLockScroll";
            } | {
                readonly _tag: "CompletedPortalPopoverBackdrop";
            } | {
                readonly _tag: "CompletedRestoreInert";
            } | {
                readonly _tag: "CompletedUnlockScroll";
            } | {
                readonly _tag: "IgnoredMouseClick";
            } | {
                readonly _tag: "RequestedClose";
            } | {
                readonly _tag: "RequestedOpen";
            } | {
                readonly _tag: "SuppressedSpaceScroll";
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
                readonly _tag: "PressedPointerOnButton";
                readonly pointerType: string;
                readonly button: number;
            };
        } | {
            readonly _tag: "GotPopoverArrowDemoMessage";
            readonly message: {
                readonly _tag: "BlurredPanel";
            } | {
                readonly _tag: "ClickedButton";
            } | {
                readonly _tag: "CompletedAnchorPopover";
            } | {
                readonly _tag: "CompletedFocusButton";
            } | {
                readonly _tag: "CompletedFocusPanel";
            } | {
                readonly _tag: "CompletedInertOthers";
            } | {
                readonly _tag: "CompletedLockScroll";
            } | {
                readonly _tag: "CompletedPortalPopoverBackdrop";
            } | {
                readonly _tag: "CompletedRestoreInert";
            } | {
                readonly _tag: "CompletedUnlockScroll";
            } | {
                readonly _tag: "IgnoredMouseClick";
            } | {
                readonly _tag: "RequestedClose";
            } | {
                readonly _tag: "RequestedOpen";
            } | {
                readonly _tag: "SuppressedSpaceScroll";
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
                readonly _tag: "PressedPointerOnButton";
                readonly pointerType: string;
                readonly button: number;
            };
        } | {
            readonly _tag: "GotPopoverBasicDemoMessage";
            readonly message: {
                readonly _tag: "BlurredPanel";
            } | {
                readonly _tag: "ClickedButton";
            } | {
                readonly _tag: "CompletedAnchorPopover";
            } | {
                readonly _tag: "CompletedFocusButton";
            } | {
                readonly _tag: "CompletedFocusPanel";
            } | {
                readonly _tag: "CompletedInertOthers";
            } | {
                readonly _tag: "CompletedLockScroll";
            } | {
                readonly _tag: "CompletedPortalPopoverBackdrop";
            } | {
                readonly _tag: "CompletedRestoreInert";
            } | {
                readonly _tag: "CompletedUnlockScroll";
            } | {
                readonly _tag: "IgnoredMouseClick";
            } | {
                readonly _tag: "RequestedClose";
            } | {
                readonly _tag: "RequestedOpen";
            } | {
                readonly _tag: "SuppressedSpaceScroll";
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
                readonly _tag: "PressedPointerOnButton";
                readonly pointerType: string;
                readonly button: number;
            };
        } | {
            readonly _tag: "GotPopoverNestedChildDemoMessage";
            readonly message: {
                readonly _tag: "BlurredPanel";
            } | {
                readonly _tag: "ClickedButton";
            } | {
                readonly _tag: "CompletedAnchorPopover";
            } | {
                readonly _tag: "CompletedFocusButton";
            } | {
                readonly _tag: "CompletedFocusPanel";
            } | {
                readonly _tag: "CompletedInertOthers";
            } | {
                readonly _tag: "CompletedLockScroll";
            } | {
                readonly _tag: "CompletedPortalPopoverBackdrop";
            } | {
                readonly _tag: "CompletedRestoreInert";
            } | {
                readonly _tag: "CompletedUnlockScroll";
            } | {
                readonly _tag: "IgnoredMouseClick";
            } | {
                readonly _tag: "RequestedClose";
            } | {
                readonly _tag: "RequestedOpen";
            } | {
                readonly _tag: "SuppressedSpaceScroll";
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
                readonly _tag: "PressedPointerOnButton";
                readonly pointerType: string;
                readonly button: number;
            };
        } | {
            readonly _tag: "GotPopoverNestedParentDemoMessage";
            readonly message: {
                readonly _tag: "BlurredPanel";
            } | {
                readonly _tag: "ClickedButton";
            } | {
                readonly _tag: "CompletedAnchorPopover";
            } | {
                readonly _tag: "CompletedFocusButton";
            } | {
                readonly _tag: "CompletedFocusPanel";
            } | {
                readonly _tag: "CompletedInertOthers";
            } | {
                readonly _tag: "CompletedLockScroll";
            } | {
                readonly _tag: "CompletedPortalPopoverBackdrop";
            } | {
                readonly _tag: "CompletedRestoreInert";
            } | {
                readonly _tag: "CompletedUnlockScroll";
            } | {
                readonly _tag: "IgnoredMouseClick";
            } | {
                readonly _tag: "RequestedClose";
            } | {
                readonly _tag: "RequestedOpen";
            } | {
                readonly _tag: "SuppressedSpaceScroll";
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
                readonly _tag: "PressedPointerOnButton";
                readonly pointerType: string;
                readonly button: number;
            };
        } | {
            readonly _tag: "GotSliderRatingDemoMessage";
            readonly message: {
                readonly _tag: "CancelledDrag";
            } | {
                readonly _tag: "ReleasedDragPointer";
            } | {
                readonly _tag: "MovedDragPointer";
                readonly value: number;
            } | {
                readonly _tag: "PressedKeyboardNavigation";
                readonly direction: "Max" | "Min" | "PageDecrement" | "PageIncrement" | "StepDecrement" | "StepIncrement";
                readonly value: number;
            } | {
                readonly _tag: "PressedPointer";
                readonly value: number;
                readonly originValue: number;
            } | {
                readonly _tag: "PressedThumb";
                readonly originValue: number;
            };
        } | {
            readonly _tag: "GotSliderVolumeDemoMessage";
            readonly message: {
                readonly _tag: "CancelledDrag";
            } | {
                readonly _tag: "ReleasedDragPointer";
            } | {
                readonly _tag: "MovedDragPointer";
                readonly value: number;
            } | {
                readonly _tag: "PressedKeyboardNavigation";
                readonly direction: "Max" | "Min" | "PageDecrement" | "PageIncrement" | "StepDecrement" | "StepIncrement";
                readonly value: number;
            } | {
                readonly _tag: "PressedPointer";
                readonly value: number;
                readonly originValue: number;
            } | {
                readonly _tag: "PressedThumb";
                readonly originValue: number;
            };
        } | {
            readonly _tag: "GotToastDemoMessage";
            readonly message: {
                readonly _tag: "DismissedAll";
            } | {
                readonly _tag: "PressedEscape";
            } | {
                readonly _tag: "Added";
                readonly entry: {
                    readonly id: string;
                    readonly variant: "Error" | "Info" | "Success" | "Warning";
                    readonly animation: {
                        readonly id: string;
                        readonly isShowing: boolean;
                        readonly transitionState: "EnterAnimating" | "EnterStart" | "Idle" | "LeaveAnimating" | "LeaveStart";
                        readonly transitionGeneration: number;
                    };
                    readonly maybeDuration: Option.Option<import("effect/Duration").Duration>;
                    readonly pendingDismissVersion: number;
                    readonly isHovered: boolean;
                    readonly swipeState: {
                        readonly _tag: "Idle";
                    } | {
                        readonly _tag: "Dismissing";
                        readonly offsetX: number;
                        readonly direction: "Left" | "Right";
                    } | {
                        readonly _tag: "Dragging";
                        readonly pointerId: number;
                        readonly startX: number;
                        readonly currentX: number;
                    } | {
                        readonly _tag: "Settling";
                        readonly offsetX: number;
                    };
                    readonly swipeVersion: number;
                    readonly payload: {
                        readonly title: string;
                        readonly maybeDescription: Option.Option<string>;
                    };
                };
            } | {
                readonly _tag: "CancelledSwipe";
                readonly pointerId: number;
            } | {
                readonly _tag: "CompletedWaitBeforeDismissal";
                readonly entryId: string;
                readonly version: number;
            } | {
                readonly _tag: "CompletedWaitForSwipeSettled";
                readonly entryId: string;
                readonly version: number;
            } | {
                readonly _tag: "Dismissed";
                readonly entryId: string;
            } | {
                readonly _tag: "GotAnimationMessage";
                readonly entryId: string;
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
                readonly _tag: "HoveredEntry";
                readonly entryId: string;
            } | {
                readonly _tag: "LeftEntry";
                readonly entryId: string;
            } | {
                readonly _tag: "MovedSwipePointer";
                readonly pointerId: number;
                readonly clientX: number;
            } | {
                readonly _tag: "PressedEntryPointer";
                readonly entryId: string;
                readonly pointerId: number;
                readonly clientX: number;
            } | {
                readonly _tag: "ReleasedSwipePointer";
                readonly pointerId: number;
                readonly clientX: number;
            };
        } | {
            readonly _tag: "GotTooltipDemoMessage";
            readonly message: {
                readonly _tag: "BlurredTrigger";
            } | {
                readonly _tag: "CompletedAnchorTooltip";
            } | {
                readonly _tag: "EnteredTrigger";
            } | {
                readonly _tag: "FocusedTrigger";
            } | {
                readonly _tag: "LeftTrigger";
            } | {
                readonly _tag: "PressedEscape";
            } | {
                readonly _tag: "CompletedWaitBeforeShowing";
                readonly version: number;
            } | {
                readonly _tag: "PressedPointerOnTrigger";
                readonly pointerType: string;
            };
        } | {
            readonly _tag: "GotVerticalRadioGroupDemoMessage";
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
            readonly _tag: "GotVerticalTabsDemoMessage";
            readonly message: {
                readonly _tag: "CompletedFocusTab";
            } | {
                readonly _tag: "FocusedTab";
                readonly index: number;
            } | {
                readonly _tag: "SelectedTab";
                readonly index: number;
                readonly value: string;
            };
        } | {
            readonly _tag: "GotVirtualListChatDemoMessage";
            readonly message: {
                readonly _tag: "CompletedApplyScroll";
                readonly version: number;
                readonly outcome: {
                    readonly _tag: "Skipped";
                } | {
                    readonly _tag: "Applied";
                    readonly scrollTop: number;
                    readonly scrollHeight: number;
                    readonly containerHeight: number;
                    readonly anchor: {
                        readonly _tag: "None";
                    } | {
                        readonly _tag: "Row";
                        readonly key: string;
                        readonly index: number;
                        readonly viewportOffset: number;
                    };
                };
            } | {
                readonly _tag: "MeasuredRows";
                readonly measurements: readonly {
                    readonly key: string;
                    readonly height: number;
                    readonly layoutVersion: number;
                }[];
            } | {
                readonly _tag: "ObservedContainerScroll";
                readonly scrollTop: number;
                readonly scrollHeight: number;
                readonly containerHeight: number;
                readonly anchor: {
                    readonly _tag: "None";
                } | {
                    readonly _tag: "Row";
                    readonly key: string;
                    readonly index: number;
                    readonly viewportOffset: number;
                };
            } | {
                readonly _tag: "ResizedContainer";
                readonly containerWidth: number;
                readonly containerHeight: number;
            };
        } | {
            readonly _tag: "GotVirtualListDemoMessage";
            readonly message: {
                readonly _tag: "CompletedApplyScroll";
                readonly version: number;
                readonly outcome: {
                    readonly _tag: "Skipped";
                } | {
                    readonly _tag: "Applied";
                    readonly scrollTop: number;
                    readonly scrollHeight: number;
                    readonly containerHeight: number;
                    readonly anchor: {
                        readonly _tag: "None";
                    } | {
                        readonly _tag: "Row";
                        readonly key: string;
                        readonly index: number;
                        readonly viewportOffset: number;
                    };
                };
            } | {
                readonly _tag: "MeasuredRows";
                readonly measurements: readonly {
                    readonly key: string;
                    readonly height: number;
                    readonly layoutVersion: number;
                }[];
            } | {
                readonly _tag: "ObservedContainerScroll";
                readonly scrollTop: number;
                readonly scrollHeight: number;
                readonly containerHeight: number;
                readonly anchor: {
                    readonly _tag: "None";
                } | {
                    readonly _tag: "Row";
                    readonly key: string;
                    readonly index: number;
                    readonly viewportOffset: number;
                };
            } | {
                readonly _tag: "ResizedContainer";
                readonly containerWidth: number;
                readonly containerHeight: number;
            };
        } | {
            readonly _tag: "GotVirtualListVariableDemoMessage";
            readonly message: {
                readonly _tag: "CompletedApplyScroll";
                readonly version: number;
                readonly outcome: {
                    readonly _tag: "Skipped";
                } | {
                    readonly _tag: "Applied";
                    readonly scrollTop: number;
                    readonly scrollHeight: number;
                    readonly containerHeight: number;
                    readonly anchor: {
                        readonly _tag: "None";
                    } | {
                        readonly _tag: "Row";
                        readonly key: string;
                        readonly index: number;
                        readonly viewportOffset: number;
                    };
                };
            } | {
                readonly _tag: "MeasuredRows";
                readonly measurements: readonly {
                    readonly key: string;
                    readonly height: number;
                    readonly layoutVersion: number;
                }[];
            } | {
                readonly _tag: "ObservedContainerScroll";
                readonly scrollTop: number;
                readonly scrollHeight: number;
                readonly containerHeight: number;
                readonly anchor: {
                    readonly _tag: "None";
                } | {
                    readonly _tag: "Row";
                    readonly key: string;
                    readonly index: number;
                    readonly viewportOffset: number;
                };
            } | {
                readonly _tag: "ResizedContainer";
                readonly containerWidth: number;
                readonly containerHeight: number;
            };
        } | {
            readonly _tag: "ToggledCheckboxAllDemo";
            readonly isChecked: boolean;
        } | {
            readonly _tag: "ToggledCheckboxBasicDemo";
            readonly isChecked: boolean;
        } | {
            readonly _tag: "ToggledCheckboxOptionADemo";
            readonly isChecked: boolean;
        } | {
            readonly _tag: "ToggledCheckboxOptionBDemo";
            readonly isChecked: boolean;
        } | {
            readonly _tag: "ToggledDisclosureCollapsedPreviewDemo";
            readonly isOpen: boolean;
        } | {
            readonly _tag: "ToggledDisclosureDemo";
            readonly isOpen: boolean;
        } | {
            readonly _tag: "ToggledFieldsetCheckboxDemo";
            readonly isChecked: boolean;
        } | {
            readonly _tag: "ToggledSwitchDemo";
            readonly isChecked: boolean;
        } | {
            readonly _tag: "UpdatedFieldsetInputValue";
            readonly value: string;
        } | {
            readonly _tag: "UpdatedFieldsetTextareaValue";
            readonly value: string;
        } | {
            readonly _tag: "UpdatedInputDemoValue";
            readonly value: string;
        } | {
            readonly _tag: "UpdatedSelectDemoValue";
            readonly value: string;
        } | {
            readonly _tag: "UpdatedTextareaDemoValue";
            readonly value: string;
        };
    } | {
        readonly _tag: "ToggledMobileTableOfContents";
        readonly isOpen: boolean;
    } | {
        readonly _tag: "ToggledSidebarGroup";
        readonly key: "ai" | "apiReference" | "bestPractices" | "blog" | "comparisons" | "coreConcepts" | "examples" | "faq" | "foldkitUi" | "introduction" | "patterns" | "testing" | "tooling";
        readonly isOpen: boolean;
    } | {
        readonly _tag: "UpdatedNewsletterEmail";
        readonly value: string;
    }, Option.Option<{
        readonly slug: string;
    }>, Readonly<{
        container: import("@webcontainer/api").WebContainer;
        previewUrl: string;
        pendingWrites: import("effect/FiberMap").FiberMap<string, void, never>;
        serverFailure: import("effect/Deferred").Deferred<never, Error>;
    }>, ManagedResource.ManagedResourceService<"WebContainerPlayground">, (args_0: Readonly<{
        container: import("@webcontainer/api").WebContainer;
        previewUrl: string;
        pendingWrites: import("effect/FiberMap").FiberMap<string, void, never>;
        serverFailure: import("effect/Deferred").Deferred<never, Error>;
    }>) => {
        readonly _tag: "ClickedOpenMobileMenu";
    } | {
        readonly _tag: "ClickedOpenSearch";
    } | {
        readonly _tag: "CompletedApplyTheme";
    } | {
        readonly _tag: "CompletedInjectAnalytics";
    } | {
        readonly _tag: "CompletedInjectSpeedInsights";
    } | {
        readonly _tag: "CompletedLoadExternal";
    } | {
        readonly _tag: "CompletedLoadPlayground";
    } | {
        readonly _tag: "CompletedNavigateInternal";
    } | {
        readonly _tag: "CompletedSaveSidebarState";
    } | {
        readonly _tag: "CompletedSaveThemePreference";
    } | {
        readonly _tag: "CompletedScrollMobileMenuActiveLinkIntoView";
    } | {
        readonly _tag: "CompletedScrollSidebarActiveLinkIntoView";
    } | {
        readonly _tag: "CompletedScrollToAnchor";
    } | {
        readonly _tag: "CompletedScrollToTop";
    } | {
        readonly _tag: "FailedCopyLink";
    } | {
        readonly _tag: "PressedSearchShortcut";
    } | {
        readonly _tag: "SucceededCopyLink";
    } | {
        readonly _tag: "ChangedActiveSection";
        readonly sectionId: string;
    } | {
        readonly _tag: "ChangedSystemTheme";
        readonly theme: "Dark" | "Light";
    } | {
        readonly _tag: "ChangedUrl";
        readonly url: {
            readonly protocol: string;
            readonly host: string;
            readonly port: Option.Option<string>;
            readonly pathname: string;
            readonly search: Option.Option<string>;
            readonly hash: Option.Option<string>;
        };
    } | {
        readonly _tag: "ChangedViewportWidth";
        readonly isNarrow: boolean;
    } | {
        readonly _tag: "ClickedCopyLink";
        readonly hash: string;
    } | {
        readonly _tag: "ClickedLink";
        readonly request: {
            readonly _tag: "External";
            readonly href: string;
        } | {
            readonly _tag: "Internal";
            readonly url: {
                readonly protocol: string;
                readonly host: string;
                readonly port: Option.Option<string>;
                readonly pathname: string;
                readonly search: Option.Option<string>;
                readonly hash: Option.Option<string>;
            };
        };
    } | {
        readonly _tag: "ClickedMobileTableOfContentsLink";
        readonly sectionId: string;
    } | {
        readonly _tag: "CompletedLoadBrowserEnvironment";
        readonly maybeThemePreference: Option.Option<"Dark" | "Light" | "System">;
        readonly maybeSidebarState: Option.Option<{
            readonly open: {
                readonly [x: string]: boolean;
            };
        }>;
        readonly systemTheme: "Dark" | "Light";
        readonly isPlaygroundSupported: boolean;
        readonly currentYear: number;
        readonly today: {
            readonly year: number;
            readonly month: number;
            readonly day: number;
        };
    } | {
        readonly _tag: "GotApiReferenceMessage";
        readonly message: {
            readonly _tag: "RequestedApiData";
        } | {
            readonly _tag: "FailedLoadApiData";
            readonly error: string;
        } | {
            readonly _tag: "SucceededLoadApiData";
            readonly apiData: {
                readonly parsedApi: {
                    readonly modules: readonly {
                        readonly name: string;
                        readonly functions: readonly {
                            readonly name: string;
                            readonly description: Option.Option<string>;
                            readonly signatures: readonly {
                                readonly parameters: readonly {
                                    readonly name: string;
                                    readonly type: string;
                                    readonly isOptional: boolean;
                                    readonly isRest: boolean;
                                    readonly defaultValue: Option.Option<string>;
                                    readonly description: Option.Option<string>;
                                }[];
                                readonly returnType: string;
                                readonly typeParameters: readonly string[];
                            }[];
                            readonly sourceUrl: Option.Option<string>;
                        }[];
                        readonly types: readonly {
                            readonly name: string;
                            readonly description: Option.Option<string>;
                            readonly typeDefinition: string;
                            readonly sourceUrl: Option.Option<string>;
                        }[];
                        readonly interfaces: readonly {
                            readonly name: string;
                            readonly description: Option.Option<string>;
                            readonly typeDefinition: string;
                            readonly sourceUrl: Option.Option<string>;
                        }[];
                        readonly variables: readonly {
                            readonly name: string;
                            readonly description: Option.Option<string>;
                            readonly type: string;
                            readonly sourceUrl: Option.Option<string>;
                        }[];
                    }[];
                };
                readonly highlights: {
                    readonly [x: string]: string;
                };
            };
        } | {
            readonly _tag: "ToggledSignature";
            readonly id: string;
            readonly isOpen: boolean;
        };
    } | {
        readonly _tag: "GotComingFromReactMessage";
        readonly message: {
            readonly _tag: "ToggledFaq";
            readonly id: string;
            readonly isOpen: boolean;
        };
    } | {
        readonly _tag: "GotCoreSubmodelPageMessage";
        readonly message: {
            readonly _tag: "ToggledMapMessagesUnderHood";
            readonly isOpen: boolean;
        };
    } | {
        readonly _tag: "GotExampleDetailMessage";
        readonly message: {
            readonly _tag: "ChangedExampleUrl";
            readonly url: string;
        } | {
            readonly _tag: "FailedLoadExampleSources";
            readonly error: string;
        } | {
            readonly _tag: "GotSourceFileTabsMessage";
            readonly message: {
                readonly _tag: "CompletedFocusTab";
            } | {
                readonly _tag: "FocusedTab";
                readonly index: number;
            } | {
                readonly _tag: "SelectedTab";
                readonly index: number;
                readonly value: string;
            };
        } | {
            readonly _tag: "RequestedExampleSources";
            readonly slug: string;
        } | {
            readonly _tag: "SucceededLoadExampleSources";
            readonly sources: {
                readonly files: readonly {
                    readonly path: string;
                    readonly highlightedHtml: string;
                    readonly rawCode: string;
                }[];
            };
        } | {
            readonly _tag: "ToggledLivePreview";
            readonly isOpen: boolean;
        };
    } | {
        readonly _tag: "GotHomeMessage";
        readonly message: {
            readonly _tag: "GotAsyncCounterDemoMessage";
            readonly message: {
                readonly _tag: "ClickedDemoIncrement";
            } | {
                readonly _tag: "ClickedDemoReset";
            } | {
                readonly _tag: "ChangedDemoResetDuration";
                readonly seconds: number;
            } | {
                readonly _tag: "CompletedDelayAdvancePhase";
                readonly generation: number;
            };
        } | {
            readonly _tag: "GotDemoTabsMessage";
            readonly message: {
                readonly _tag: "CompletedFocusTab";
            } | {
                readonly _tag: "FocusedTab";
                readonly index: number;
            } | {
                readonly _tag: "SelectedTab";
                readonly index: number;
                readonly value: string;
            };
        } | {
            readonly _tag: "GotNotePlayerDemoMessage";
            readonly message: {
                readonly _tag: "ClickedPause";
            } | {
                readonly _tag: "ClickedPlay";
            } | {
                readonly _tag: "ClickedStop";
            } | {
                readonly _tag: "FailedAcquireAudioContext";
            } | {
                readonly _tag: "ReleasedAudioContext";
            } | {
                readonly _tag: "SucceededAcquireAudioContext";
            } | {
                readonly _tag: "ChangedNoteInput";
                readonly value: string;
            } | {
                readonly _tag: "CompletedDelayAdvancePhase";
                readonly generation: number;
            } | {
                readonly _tag: "CompletedPlayNote";
                readonly noteIndex: number;
            } | {
                readonly _tag: "GotNoteDurationMessage";
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
            };
        } | {
            readonly _tag: "GotPlaygroundMenuMessage";
            readonly message: {
                readonly _tag: "BlurredItems";
            } | {
                readonly _tag: "ClickedButton";
            } | {
                readonly _tag: "Closed";
            } | {
                readonly _tag: "CompletedAnchorMenu";
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
                readonly _tag: "CompletedPortalMenuBackdrop";
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
                readonly screenX: number;
                readonly screenY: number;
                readonly timeStamp: number;
            } | {
                readonly _tag: "ReleasedPointerOnItems";
                readonly screenX: number;
                readonly screenY: number;
                readonly timeStamp: number;
            } | {
                readonly _tag: "RequestedItemClick";
                readonly index: number;
            } | {
                readonly _tag: "Searched";
                readonly key: string;
                readonly maybeTargetIndex: Option.Option<number>;
            } | {
                readonly _tag: "SelectedItem";
                readonly index: number;
                readonly item: string;
            };
        } | {
            readonly _tag: "UpdatedNewsletterEmail";
            readonly value: string;
        };
    } | {
        readonly _tag: "GotMobileMenuDialogMessage";
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
        readonly _tag: "GotPlaygroundMessage";
        readonly message: {
            readonly _tag: "ReleasedPlayground";
        } | {
            readonly _tag: "ScheduledWritePlaygroundFile";
        } | {
            readonly _tag: "SucceededMountPlaygroundEditor";
        } | {
            readonly _tag: "BootedPlayground";
            readonly previewUrl: string;
        } | {
            readonly _tag: "CompletedWaitForPlaygroundServerFailure";
            readonly reason: string;
        } | {
            readonly _tag: "EditedPlaygroundFile";
            readonly path: string;
            readonly content: string;
        } | {
            readonly _tag: "FailedBootPlayground";
            readonly reason: string;
        } | {
            readonly _tag: "FailedMountPlaygroundEditor";
            readonly reason: string;
        } | {
            readonly _tag: "FailedWritePlaygroundFile";
            readonly reason: string;
        } | {
            readonly _tag: "GotFileTabsMessage";
            readonly message: {
                readonly _tag: "CompletedFocusTab";
            } | {
                readonly _tag: "FocusedTab";
                readonly index: number;
            } | {
                readonly _tag: "SelectedTab";
                readonly index: number;
                readonly value: string;
            };
        } | {
            readonly _tag: "LoadedPlaygroundPreview";
            readonly previewUrl: string;
        };
    } | {
        readonly _tag: "GotSearchMessage";
        readonly message: {
            readonly _tag: "ClearedSearchQuery";
        } | {
            readonly _tag: "CompletedFocusSearchInput";
        } | {
            readonly _tag: "CompletedNavigateToResult";
        } | {
            readonly _tag: "CompletedScrollToResult";
        } | {
            readonly _tag: "CompletedFetchSearchResults";
            readonly results: readonly {
                readonly url: string;
                readonly title: string;
                readonly excerpt: string;
                readonly section: string;
                readonly kind: string;
            }[];
            readonly query: string;
        } | {
            readonly _tag: "GotSearchDialogMessage";
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
            readonly _tag: "PressedArrowKey";
            readonly direction: "Down" | "Up";
        } | {
            readonly _tag: "SelectedSearchResult";
            readonly url: string;
        } | {
            readonly _tag: "UpdatedSearchQuery";
            readonly query: string;
        };
    } | {
        readonly _tag: "GotSnippetCopyMessage";
        readonly message: {
            readonly _tag: "FailedCopySnippet";
        } | {
            readonly _tag: "ClickedCopySnippet";
            readonly snippetId: string;
            readonly text: string;
        } | {
            readonly _tag: "CompletedWaitBeforeHidingCopiedIndicator";
            readonly snippetId: string;
        } | {
            readonly _tag: "SucceededCopySnippet";
            readonly snippetId: string;
        };
    } | {
        readonly _tag: "GotSnippetDisclosureMessage";
        readonly message: {
            readonly _tag: "CompletedMeasureSnippetHeight";
            readonly snippetId: string;
            readonly snippetSize: {
                readonly _tag: "Fits";
            } | {
                readonly _tag: "Overflows";
            };
        } | {
            readonly _tag: "ToggledCodeDisclosure";
            readonly disclosureId: string;
            readonly isOpen: boolean;
        };
    } | {
        readonly _tag: "GotThemeMenuMessage";
        readonly message: {
            readonly _tag: "BlurredItems";
        } | {
            readonly _tag: "ClickedButton";
        } | {
            readonly _tag: "Closed";
        } | {
            readonly _tag: "CompletedAnchorMenu";
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
            readonly _tag: "CompletedPortalMenuBackdrop";
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
            readonly screenX: number;
            readonly screenY: number;
            readonly timeStamp: number;
        } | {
            readonly _tag: "ReleasedPointerOnItems";
            readonly screenX: number;
            readonly screenY: number;
            readonly timeStamp: number;
        } | {
            readonly _tag: "RequestedItemClick";
            readonly index: number;
        } | {
            readonly _tag: "Searched";
            readonly key: string;
            readonly maybeTargetIndex: Option.Option<number>;
        } | {
            readonly _tag: "SelectedItem";
            readonly index: number;
            readonly item: string;
        };
    } | {
        readonly _tag: "GotUiPageMessage";
        readonly message: {
            readonly _tag: "ClickedButtonDemo";
        } | {
            readonly _tag: "ClickedDeleteProject";
        } | {
            readonly _tag: "ClickedDismissAllToasts";
        } | {
            readonly _tag: "ClickedEditFilters";
        } | {
            readonly _tag: "ClickedHoverIntentMenuItem";
        } | {
            readonly _tag: "ClickedOpenAnimatedDialog";
        } | {
            readonly _tag: "ClickedOpenDialog";
        } | {
            readonly _tag: "ClickedOpenProjectSettings";
        } | {
            readonly _tag: "ClickedShowErrorToast";
        } | {
            readonly _tag: "ClickedShowInfoToast";
        } | {
            readonly _tag: "ClickedShowStickyToast";
        } | {
            readonly _tag: "ClickedShowSuccessToast";
        } | {
            readonly _tag: "ClickedToggleAnimationDemo";
        } | {
            readonly _tag: "ClickedVirtualListChatAppend";
        } | {
            readonly _tag: "ClickedVirtualListChatPrepend";
        } | {
            readonly _tag: "ClickedVirtualListChatScrollToMessage";
        } | {
            readonly _tag: "ClickedVirtualListScrollToMiddle";
        } | {
            readonly _tag: "ClickedVirtualListVariableScrollToMiddle";
        } | {
            readonly _tag: "ClickedRemoveFileDropDemoFile";
            readonly fileIndex: number;
        } | {
            readonly _tag: "ClickedVirtualListChatToggleMessage";
            readonly messageId: number;
        } | {
            readonly _tag: "GotAnimationDemoMessage";
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
            readonly _tag: "GotCalendarBasicDemoMessage";
            readonly message: {
                readonly _tag: "BlurredGrid";
            } | {
                readonly _tag: "ClickedHeading";
            } | {
                readonly _tag: "ClickedNextMonthButton";
            } | {
                readonly _tag: "ClickedPreviousMonthButton";
            } | {
                readonly _tag: "CompletedFocusGrid";
            } | {
                readonly _tag: "FocusedGrid";
            } | {
                readonly _tag: "ClickedDay";
                readonly date: {
                    readonly year: number;
                    readonly month: number;
                    readonly day: number;
                };
            } | {
                readonly _tag: "PagedYears";
                readonly direction: -1 | 1;
            } | {
                readonly _tag: "PressedKeyOnGrid";
                readonly key: string;
                readonly isShift: boolean;
            } | {
                readonly _tag: "RefreshedToday";
                readonly today: {
                    readonly year: number;
                    readonly month: number;
                    readonly day: number;
                };
            } | {
                readonly _tag: "SelectedMonth";
                readonly month: number;
            } | {
                readonly _tag: "SelectedYear";
                readonly year: number;
            };
        } | {
            readonly _tag: "GotComboboxDemoMessage";
            readonly message: {
                readonly _tag: "CompletedAnchorCombobox";
            } | {
                readonly _tag: "CompletedAttachComboboxPreventBlur";
            } | {
                readonly _tag: "CompletedAttachComboboxSelectOnFocus";
            } | {
                readonly _tag: "CompletedClickItem";
            } | {
                readonly _tag: "CompletedFocusInput";
            } | {
                readonly _tag: "CompletedInertOthers";
            } | {
                readonly _tag: "CompletedLockScroll";
            } | {
                readonly _tag: "CompletedPortalComboboxBackdrop";
            } | {
                readonly _tag: "CompletedRestoreInert";
            } | {
                readonly _tag: "CompletedScrollIntoView";
            } | {
                readonly _tag: "CompletedUnlockScroll";
            } | {
                readonly _tag: "DeactivatedItem";
            } | {
                readonly _tag: "SuppressedEmptyItemNavigation";
            } | {
                readonly _tag: "SuppressedItemCommit";
            } | {
                readonly _tag: "ActivatedItem";
                readonly index: number;
                readonly activationTrigger: "Keyboard" | "Pointer";
                readonly maybeImmediateSelection: Option.Option<{
                    readonly item: string;
                }>;
            } | {
                readonly _tag: "BlurredInput";
                readonly restingInputValue: string;
                readonly isClearable: boolean;
            } | {
                readonly _tag: "Closed";
                readonly restingInputValue: string;
                readonly isClearable: boolean;
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
                readonly _tag: "PressedToggleButton";
                readonly restingInputValue: string;
                readonly isClearable: boolean;
            } | {
                readonly _tag: "RequestedItemClick";
                readonly index: number;
            } | {
                readonly _tag: "SelectedItem";
                readonly item: string;
                readonly displayText: string;
                readonly wasSelected: boolean;
            } | {
                readonly _tag: "UpdatedInputValue";
                readonly value: string;
            };
        } | {
            readonly _tag: "GotComboboxMultiDemoMessage";
            readonly message: {
                readonly _tag: "CompletedAnchorCombobox";
            } | {
                readonly _tag: "CompletedAttachComboboxPreventBlur";
            } | {
                readonly _tag: "CompletedAttachComboboxSelectOnFocus";
            } | {
                readonly _tag: "CompletedClickItem";
            } | {
                readonly _tag: "CompletedFocusInput";
            } | {
                readonly _tag: "CompletedInertOthers";
            } | {
                readonly _tag: "CompletedLockScroll";
            } | {
                readonly _tag: "CompletedPortalComboboxBackdrop";
            } | {
                readonly _tag: "CompletedRestoreInert";
            } | {
                readonly _tag: "CompletedScrollIntoView";
            } | {
                readonly _tag: "CompletedUnlockScroll";
            } | {
                readonly _tag: "DeactivatedItem";
            } | {
                readonly _tag: "SuppressedEmptyItemNavigation";
            } | {
                readonly _tag: "SuppressedItemCommit";
            } | {
                readonly _tag: "ActivatedItem";
                readonly index: number;
                readonly activationTrigger: "Keyboard" | "Pointer";
                readonly maybeImmediateSelection: Option.Option<{
                    readonly item: string;
                }>;
            } | {
                readonly _tag: "BlurredInput";
                readonly restingInputValue: string;
                readonly isClearable: boolean;
            } | {
                readonly _tag: "Closed";
                readonly restingInputValue: string;
                readonly isClearable: boolean;
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
                readonly _tag: "PressedToggleButton";
                readonly restingInputValue: string;
                readonly isClearable: boolean;
            } | {
                readonly _tag: "RequestedItemClick";
                readonly index: number;
            } | {
                readonly _tag: "SelectedItem";
                readonly item: string;
                readonly displayText: string;
                readonly wasSelected: boolean;
            } | {
                readonly _tag: "UpdatedInputValue";
                readonly value: string;
            };
        } | {
            readonly _tag: "GotComboboxNullableDemoMessage";
            readonly message: {
                readonly _tag: "CompletedAnchorCombobox";
            } | {
                readonly _tag: "CompletedAttachComboboxPreventBlur";
            } | {
                readonly _tag: "CompletedAttachComboboxSelectOnFocus";
            } | {
                readonly _tag: "CompletedClickItem";
            } | {
                readonly _tag: "CompletedFocusInput";
            } | {
                readonly _tag: "CompletedInertOthers";
            } | {
                readonly _tag: "CompletedLockScroll";
            } | {
                readonly _tag: "CompletedPortalComboboxBackdrop";
            } | {
                readonly _tag: "CompletedRestoreInert";
            } | {
                readonly _tag: "CompletedScrollIntoView";
            } | {
                readonly _tag: "CompletedUnlockScroll";
            } | {
                readonly _tag: "DeactivatedItem";
            } | {
                readonly _tag: "SuppressedEmptyItemNavigation";
            } | {
                readonly _tag: "SuppressedItemCommit";
            } | {
                readonly _tag: "ActivatedItem";
                readonly index: number;
                readonly activationTrigger: "Keyboard" | "Pointer";
                readonly maybeImmediateSelection: Option.Option<{
                    readonly item: string;
                }>;
            } | {
                readonly _tag: "BlurredInput";
                readonly restingInputValue: string;
                readonly isClearable: boolean;
            } | {
                readonly _tag: "Closed";
                readonly restingInputValue: string;
                readonly isClearable: boolean;
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
                readonly _tag: "PressedToggleButton";
                readonly restingInputValue: string;
                readonly isClearable: boolean;
            } | {
                readonly _tag: "RequestedItemClick";
                readonly index: number;
            } | {
                readonly _tag: "SelectedItem";
                readonly item: string;
                readonly displayText: string;
                readonly wasSelected: boolean;
            } | {
                readonly _tag: "UpdatedInputValue";
                readonly value: string;
            };
        } | {
            readonly _tag: "GotComboboxPlacementLockDemoMessage";
            readonly message: {
                readonly _tag: "CompletedAnchorCombobox";
            } | {
                readonly _tag: "CompletedAttachComboboxPreventBlur";
            } | {
                readonly _tag: "CompletedAttachComboboxSelectOnFocus";
            } | {
                readonly _tag: "CompletedClickItem";
            } | {
                readonly _tag: "CompletedFocusInput";
            } | {
                readonly _tag: "CompletedInertOthers";
            } | {
                readonly _tag: "CompletedLockScroll";
            } | {
                readonly _tag: "CompletedPortalComboboxBackdrop";
            } | {
                readonly _tag: "CompletedRestoreInert";
            } | {
                readonly _tag: "CompletedScrollIntoView";
            } | {
                readonly _tag: "CompletedUnlockScroll";
            } | {
                readonly _tag: "DeactivatedItem";
            } | {
                readonly _tag: "SuppressedEmptyItemNavigation";
            } | {
                readonly _tag: "SuppressedItemCommit";
            } | {
                readonly _tag: "ActivatedItem";
                readonly index: number;
                readonly activationTrigger: "Keyboard" | "Pointer";
                readonly maybeImmediateSelection: Option.Option<{
                    readonly item: string;
                }>;
            } | {
                readonly _tag: "BlurredInput";
                readonly restingInputValue: string;
                readonly isClearable: boolean;
            } | {
                readonly _tag: "Closed";
                readonly restingInputValue: string;
                readonly isClearable: boolean;
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
                readonly _tag: "PressedToggleButton";
                readonly restingInputValue: string;
                readonly isClearable: boolean;
            } | {
                readonly _tag: "RequestedItemClick";
                readonly index: number;
            } | {
                readonly _tag: "SelectedItem";
                readonly item: string;
                readonly displayText: string;
                readonly wasSelected: boolean;
            } | {
                readonly _tag: "UpdatedInputValue";
                readonly value: string;
            };
        } | {
            readonly _tag: "GotComboboxSelectOnFocusDemoMessage";
            readonly message: {
                readonly _tag: "CompletedAnchorCombobox";
            } | {
                readonly _tag: "CompletedAttachComboboxPreventBlur";
            } | {
                readonly _tag: "CompletedAttachComboboxSelectOnFocus";
            } | {
                readonly _tag: "CompletedClickItem";
            } | {
                readonly _tag: "CompletedFocusInput";
            } | {
                readonly _tag: "CompletedInertOthers";
            } | {
                readonly _tag: "CompletedLockScroll";
            } | {
                readonly _tag: "CompletedPortalComboboxBackdrop";
            } | {
                readonly _tag: "CompletedRestoreInert";
            } | {
                readonly _tag: "CompletedScrollIntoView";
            } | {
                readonly _tag: "CompletedUnlockScroll";
            } | {
                readonly _tag: "DeactivatedItem";
            } | {
                readonly _tag: "SuppressedEmptyItemNavigation";
            } | {
                readonly _tag: "SuppressedItemCommit";
            } | {
                readonly _tag: "ActivatedItem";
                readonly index: number;
                readonly activationTrigger: "Keyboard" | "Pointer";
                readonly maybeImmediateSelection: Option.Option<{
                    readonly item: string;
                }>;
            } | {
                readonly _tag: "BlurredInput";
                readonly restingInputValue: string;
                readonly isClearable: boolean;
            } | {
                readonly _tag: "Closed";
                readonly restingInputValue: string;
                readonly isClearable: boolean;
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
                readonly _tag: "PressedToggleButton";
                readonly restingInputValue: string;
                readonly isClearable: boolean;
            } | {
                readonly _tag: "RequestedItemClick";
                readonly index: number;
            } | {
                readonly _tag: "SelectedItem";
                readonly item: string;
                readonly displayText: string;
                readonly wasSelected: boolean;
            } | {
                readonly _tag: "UpdatedInputValue";
                readonly value: string;
            };
        } | {
            readonly _tag: "GotDatePickerBasicDemoMessage";
            readonly message: {
                readonly _tag: "Cleared";
            } | {
                readonly _tag: "Closed";
            } | {
                readonly _tag: "Opened";
            } | {
                readonly _tag: "GotCalendarMessage";
                readonly message: {
                    readonly _tag: "BlurredGrid";
                } | {
                    readonly _tag: "ClickedHeading";
                } | {
                    readonly _tag: "ClickedNextMonthButton";
                } | {
                    readonly _tag: "ClickedPreviousMonthButton";
                } | {
                    readonly _tag: "CompletedFocusGrid";
                } | {
                    readonly _tag: "FocusedGrid";
                } | {
                    readonly _tag: "ClickedDay";
                    readonly date: {
                        readonly year: number;
                        readonly month: number;
                        readonly day: number;
                    };
                } | {
                    readonly _tag: "PagedYears";
                    readonly direction: -1 | 1;
                } | {
                    readonly _tag: "PressedKeyOnGrid";
                    readonly key: string;
                    readonly isShift: boolean;
                } | {
                    readonly _tag: "RefreshedToday";
                    readonly today: {
                        readonly year: number;
                        readonly month: number;
                        readonly day: number;
                    };
                } | {
                    readonly _tag: "SelectedMonth";
                    readonly month: number;
                } | {
                    readonly _tag: "SelectedYear";
                    readonly year: number;
                };
            } | {
                readonly _tag: "GotPopoverMessage";
                readonly message: {
                    readonly _tag: "BlurredPanel";
                } | {
                    readonly _tag: "ClickedButton";
                } | {
                    readonly _tag: "CompletedAnchorPopover";
                } | {
                    readonly _tag: "CompletedFocusButton";
                } | {
                    readonly _tag: "CompletedFocusPanel";
                } | {
                    readonly _tag: "CompletedInertOthers";
                } | {
                    readonly _tag: "CompletedLockScroll";
                } | {
                    readonly _tag: "CompletedPortalPopoverBackdrop";
                } | {
                    readonly _tag: "CompletedRestoreInert";
                } | {
                    readonly _tag: "CompletedUnlockScroll";
                } | {
                    readonly _tag: "IgnoredMouseClick";
                } | {
                    readonly _tag: "RequestedClose";
                } | {
                    readonly _tag: "RequestedOpen";
                } | {
                    readonly _tag: "SuppressedSpaceScroll";
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
                    readonly _tag: "PressedPointerOnButton";
                    readonly pointerType: string;
                    readonly button: number;
                };
            } | {
                readonly _tag: "RequestedSelectDate";
                readonly date: {
                    readonly year: number;
                    readonly month: number;
                    readonly day: number;
                };
            };
        } | {
            readonly _tag: "GotDialogAnimatedDemoMessage";
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
            readonly _tag: "GotDialogDemoMessage";
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
            readonly _tag: "GotDragAndDropDemoMessage";
            readonly message: {
                readonly _tag: "AdvancedAutoScrollFrame";
            } | {
                readonly _tag: "CancelledDrag";
            } | {
                readonly _tag: "CompletedFocusItem";
            } | {
                readonly _tag: "ConfirmedKeyboardDrop";
            } | {
                readonly _tag: "ReleasedPointer";
            } | {
                readonly _tag: "ActivatedKeyboardDrag";
                readonly itemId: string;
                readonly containerId: string;
                readonly index: number;
            } | {
                readonly _tag: "CompletedResolveKeyboardMove";
                readonly targetContainerId: string;
                readonly targetIndex: number;
            } | {
                readonly _tag: "MovedPointer";
                readonly screenX: number;
                readonly screenY: number;
                readonly clientX: number;
                readonly clientY: number;
                readonly maybeDropTarget: Option.Option<{
                    readonly containerId: string;
                    readonly index: number;
                }>;
            } | {
                readonly _tag: "PressedArrowKey";
                readonly direction: "Down" | "Left" | "NextContainer" | "PreviousContainer" | "Right" | "Up";
            } | {
                readonly _tag: "PressedDraggable";
                readonly itemId: string;
                readonly containerId: string;
                readonly index: number;
                readonly screenX: number;
                readonly screenY: number;
            };
        } | {
            readonly _tag: "GotFileDropBasicDemoMessage";
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
            readonly _tag: "GotHorizontalRadioGroupDemoMessage";
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
            readonly _tag: "GotHorizontalTabsDemoMessage";
            readonly message: {
                readonly _tag: "CompletedFocusTab";
            } | {
                readonly _tag: "FocusedTab";
                readonly index: number;
            } | {
                readonly _tag: "SelectedTab";
                readonly index: number;
                readonly value: string;
            };
        } | {
            readonly _tag: "GotHoverIntentCardDemoMessage";
            readonly message: {
                readonly _tag: "BlurredPanel";
            } | {
                readonly _tag: "BlurredTrigger";
            } | {
                readonly _tag: "EnteredPanel";
            } | {
                readonly _tag: "EnteredTrigger";
            } | {
                readonly _tag: "FocusedPanel";
            } | {
                readonly _tag: "FocusedTrigger";
            } | {
                readonly _tag: "LeftPanel";
            } | {
                readonly _tag: "LeftTrigger";
            } | {
                readonly _tag: "CompletedWaitBeforeClosing";
                readonly version: number;
            } | {
                readonly _tag: "CompletedWaitBeforeOpening";
                readonly version: number;
            } | {
                readonly _tag: "PressedEscape";
                readonly source: "Panel" | "Trigger";
            };
        } | {
            readonly _tag: "GotHoverIntentMenuDemoMessage";
            readonly message: {
                readonly _tag: "BlurredPanel";
            } | {
                readonly _tag: "BlurredTrigger";
            } | {
                readonly _tag: "EnteredPanel";
            } | {
                readonly _tag: "EnteredTrigger";
            } | {
                readonly _tag: "FocusedPanel";
            } | {
                readonly _tag: "FocusedTrigger";
            } | {
                readonly _tag: "LeftPanel";
            } | {
                readonly _tag: "LeftTrigger";
            } | {
                readonly _tag: "CompletedWaitBeforeClosing";
                readonly version: number;
            } | {
                readonly _tag: "CompletedWaitBeforeOpening";
                readonly version: number;
            } | {
                readonly _tag: "PressedEscape";
                readonly source: "Panel" | "Trigger";
            };
        } | {
            readonly _tag: "GotListboxDemoMessage";
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
            readonly _tag: "GotListboxGroupedDemoMessage";
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
            readonly _tag: "GotListboxMultiDemoMessage";
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
            readonly _tag: "GotMenuAnimatedDemoMessage";
            readonly message: {
                readonly _tag: "BlurredItems";
            } | {
                readonly _tag: "ClickedButton";
            } | {
                readonly _tag: "Closed";
            } | {
                readonly _tag: "CompletedAnchorMenu";
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
                readonly _tag: "CompletedPortalMenuBackdrop";
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
                readonly screenX: number;
                readonly screenY: number;
                readonly timeStamp: number;
            } | {
                readonly _tag: "ReleasedPointerOnItems";
                readonly screenX: number;
                readonly screenY: number;
                readonly timeStamp: number;
            } | {
                readonly _tag: "RequestedItemClick";
                readonly index: number;
            } | {
                readonly _tag: "Searched";
                readonly key: string;
                readonly maybeTargetIndex: Option.Option<number>;
            } | {
                readonly _tag: "SelectedItem";
                readonly index: number;
                readonly item: string;
            };
        } | {
            readonly _tag: "GotMenuBasicDemoMessage";
            readonly message: {
                readonly _tag: "BlurredItems";
            } | {
                readonly _tag: "ClickedButton";
            } | {
                readonly _tag: "Closed";
            } | {
                readonly _tag: "CompletedAnchorMenu";
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
                readonly _tag: "CompletedPortalMenuBackdrop";
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
                readonly screenX: number;
                readonly screenY: number;
                readonly timeStamp: number;
            } | {
                readonly _tag: "ReleasedPointerOnItems";
                readonly screenX: number;
                readonly screenY: number;
                readonly timeStamp: number;
            } | {
                readonly _tag: "RequestedItemClick";
                readonly index: number;
            } | {
                readonly _tag: "Searched";
                readonly key: string;
                readonly maybeTargetIndex: Option.Option<number>;
            } | {
                readonly _tag: "SelectedItem";
                readonly index: number;
                readonly item: string;
            };
        } | {
            readonly _tag: "GotNestedDialogChildDemoMessage";
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
            readonly _tag: "GotNestedDialogParentDemoMessage";
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
            readonly _tag: "GotOverlayComboboxDemoMessage";
            readonly message: {
                readonly _tag: "CompletedAnchorCombobox";
            } | {
                readonly _tag: "CompletedAttachComboboxPreventBlur";
            } | {
                readonly _tag: "CompletedAttachComboboxSelectOnFocus";
            } | {
                readonly _tag: "CompletedClickItem";
            } | {
                readonly _tag: "CompletedFocusInput";
            } | {
                readonly _tag: "CompletedInertOthers";
            } | {
                readonly _tag: "CompletedLockScroll";
            } | {
                readonly _tag: "CompletedPortalComboboxBackdrop";
            } | {
                readonly _tag: "CompletedRestoreInert";
            } | {
                readonly _tag: "CompletedScrollIntoView";
            } | {
                readonly _tag: "CompletedUnlockScroll";
            } | {
                readonly _tag: "DeactivatedItem";
            } | {
                readonly _tag: "SuppressedEmptyItemNavigation";
            } | {
                readonly _tag: "SuppressedItemCommit";
            } | {
                readonly _tag: "ActivatedItem";
                readonly index: number;
                readonly activationTrigger: "Keyboard" | "Pointer";
                readonly maybeImmediateSelection: Option.Option<{
                    readonly item: string;
                }>;
            } | {
                readonly _tag: "BlurredInput";
                readonly restingInputValue: string;
                readonly isClearable: boolean;
            } | {
                readonly _tag: "Closed";
                readonly restingInputValue: string;
                readonly isClearable: boolean;
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
                readonly _tag: "PressedToggleButton";
                readonly restingInputValue: string;
                readonly isClearable: boolean;
            } | {
                readonly _tag: "RequestedItemClick";
                readonly index: number;
            } | {
                readonly _tag: "SelectedItem";
                readonly item: string;
                readonly displayText: string;
                readonly wasSelected: boolean;
            } | {
                readonly _tag: "UpdatedInputValue";
                readonly value: string;
            };
        } | {
            readonly _tag: "GotOverlayDialogDemoMessage";
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
            readonly _tag: "GotPopoverAnimatedDemoMessage";
            readonly message: {
                readonly _tag: "BlurredPanel";
            } | {
                readonly _tag: "ClickedButton";
            } | {
                readonly _tag: "CompletedAnchorPopover";
            } | {
                readonly _tag: "CompletedFocusButton";
            } | {
                readonly _tag: "CompletedFocusPanel";
            } | {
                readonly _tag: "CompletedInertOthers";
            } | {
                readonly _tag: "CompletedLockScroll";
            } | {
                readonly _tag: "CompletedPortalPopoverBackdrop";
            } | {
                readonly _tag: "CompletedRestoreInert";
            } | {
                readonly _tag: "CompletedUnlockScroll";
            } | {
                readonly _tag: "IgnoredMouseClick";
            } | {
                readonly _tag: "RequestedClose";
            } | {
                readonly _tag: "RequestedOpen";
            } | {
                readonly _tag: "SuppressedSpaceScroll";
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
                readonly _tag: "PressedPointerOnButton";
                readonly pointerType: string;
                readonly button: number;
            };
        } | {
            readonly _tag: "GotPopoverArrowDemoMessage";
            readonly message: {
                readonly _tag: "BlurredPanel";
            } | {
                readonly _tag: "ClickedButton";
            } | {
                readonly _tag: "CompletedAnchorPopover";
            } | {
                readonly _tag: "CompletedFocusButton";
            } | {
                readonly _tag: "CompletedFocusPanel";
            } | {
                readonly _tag: "CompletedInertOthers";
            } | {
                readonly _tag: "CompletedLockScroll";
            } | {
                readonly _tag: "CompletedPortalPopoverBackdrop";
            } | {
                readonly _tag: "CompletedRestoreInert";
            } | {
                readonly _tag: "CompletedUnlockScroll";
            } | {
                readonly _tag: "IgnoredMouseClick";
            } | {
                readonly _tag: "RequestedClose";
            } | {
                readonly _tag: "RequestedOpen";
            } | {
                readonly _tag: "SuppressedSpaceScroll";
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
                readonly _tag: "PressedPointerOnButton";
                readonly pointerType: string;
                readonly button: number;
            };
        } | {
            readonly _tag: "GotPopoverBasicDemoMessage";
            readonly message: {
                readonly _tag: "BlurredPanel";
            } | {
                readonly _tag: "ClickedButton";
            } | {
                readonly _tag: "CompletedAnchorPopover";
            } | {
                readonly _tag: "CompletedFocusButton";
            } | {
                readonly _tag: "CompletedFocusPanel";
            } | {
                readonly _tag: "CompletedInertOthers";
            } | {
                readonly _tag: "CompletedLockScroll";
            } | {
                readonly _tag: "CompletedPortalPopoverBackdrop";
            } | {
                readonly _tag: "CompletedRestoreInert";
            } | {
                readonly _tag: "CompletedUnlockScroll";
            } | {
                readonly _tag: "IgnoredMouseClick";
            } | {
                readonly _tag: "RequestedClose";
            } | {
                readonly _tag: "RequestedOpen";
            } | {
                readonly _tag: "SuppressedSpaceScroll";
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
                readonly _tag: "PressedPointerOnButton";
                readonly pointerType: string;
                readonly button: number;
            };
        } | {
            readonly _tag: "GotPopoverNestedChildDemoMessage";
            readonly message: {
                readonly _tag: "BlurredPanel";
            } | {
                readonly _tag: "ClickedButton";
            } | {
                readonly _tag: "CompletedAnchorPopover";
            } | {
                readonly _tag: "CompletedFocusButton";
            } | {
                readonly _tag: "CompletedFocusPanel";
            } | {
                readonly _tag: "CompletedInertOthers";
            } | {
                readonly _tag: "CompletedLockScroll";
            } | {
                readonly _tag: "CompletedPortalPopoverBackdrop";
            } | {
                readonly _tag: "CompletedRestoreInert";
            } | {
                readonly _tag: "CompletedUnlockScroll";
            } | {
                readonly _tag: "IgnoredMouseClick";
            } | {
                readonly _tag: "RequestedClose";
            } | {
                readonly _tag: "RequestedOpen";
            } | {
                readonly _tag: "SuppressedSpaceScroll";
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
                readonly _tag: "PressedPointerOnButton";
                readonly pointerType: string;
                readonly button: number;
            };
        } | {
            readonly _tag: "GotPopoverNestedParentDemoMessage";
            readonly message: {
                readonly _tag: "BlurredPanel";
            } | {
                readonly _tag: "ClickedButton";
            } | {
                readonly _tag: "CompletedAnchorPopover";
            } | {
                readonly _tag: "CompletedFocusButton";
            } | {
                readonly _tag: "CompletedFocusPanel";
            } | {
                readonly _tag: "CompletedInertOthers";
            } | {
                readonly _tag: "CompletedLockScroll";
            } | {
                readonly _tag: "CompletedPortalPopoverBackdrop";
            } | {
                readonly _tag: "CompletedRestoreInert";
            } | {
                readonly _tag: "CompletedUnlockScroll";
            } | {
                readonly _tag: "IgnoredMouseClick";
            } | {
                readonly _tag: "RequestedClose";
            } | {
                readonly _tag: "RequestedOpen";
            } | {
                readonly _tag: "SuppressedSpaceScroll";
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
                readonly _tag: "PressedPointerOnButton";
                readonly pointerType: string;
                readonly button: number;
            };
        } | {
            readonly _tag: "GotSliderRatingDemoMessage";
            readonly message: {
                readonly _tag: "CancelledDrag";
            } | {
                readonly _tag: "ReleasedDragPointer";
            } | {
                readonly _tag: "MovedDragPointer";
                readonly value: number;
            } | {
                readonly _tag: "PressedKeyboardNavigation";
                readonly direction: "Max" | "Min" | "PageDecrement" | "PageIncrement" | "StepDecrement" | "StepIncrement";
                readonly value: number;
            } | {
                readonly _tag: "PressedPointer";
                readonly value: number;
                readonly originValue: number;
            } | {
                readonly _tag: "PressedThumb";
                readonly originValue: number;
            };
        } | {
            readonly _tag: "GotSliderVolumeDemoMessage";
            readonly message: {
                readonly _tag: "CancelledDrag";
            } | {
                readonly _tag: "ReleasedDragPointer";
            } | {
                readonly _tag: "MovedDragPointer";
                readonly value: number;
            } | {
                readonly _tag: "PressedKeyboardNavigation";
                readonly direction: "Max" | "Min" | "PageDecrement" | "PageIncrement" | "StepDecrement" | "StepIncrement";
                readonly value: number;
            } | {
                readonly _tag: "PressedPointer";
                readonly value: number;
                readonly originValue: number;
            } | {
                readonly _tag: "PressedThumb";
                readonly originValue: number;
            };
        } | {
            readonly _tag: "GotToastDemoMessage";
            readonly message: {
                readonly _tag: "DismissedAll";
            } | {
                readonly _tag: "PressedEscape";
            } | {
                readonly _tag: "Added";
                readonly entry: {
                    readonly id: string;
                    readonly variant: "Error" | "Info" | "Success" | "Warning";
                    readonly animation: {
                        readonly id: string;
                        readonly isShowing: boolean;
                        readonly transitionState: "EnterAnimating" | "EnterStart" | "Idle" | "LeaveAnimating" | "LeaveStart";
                        readonly transitionGeneration: number;
                    };
                    readonly maybeDuration: Option.Option<import("effect/Duration").Duration>;
                    readonly pendingDismissVersion: number;
                    readonly isHovered: boolean;
                    readonly swipeState: {
                        readonly _tag: "Idle";
                    } | {
                        readonly _tag: "Dismissing";
                        readonly offsetX: number;
                        readonly direction: "Left" | "Right";
                    } | {
                        readonly _tag: "Dragging";
                        readonly pointerId: number;
                        readonly startX: number;
                        readonly currentX: number;
                    } | {
                        readonly _tag: "Settling";
                        readonly offsetX: number;
                    };
                    readonly swipeVersion: number;
                    readonly payload: {
                        readonly title: string;
                        readonly maybeDescription: Option.Option<string>;
                    };
                };
            } | {
                readonly _tag: "CancelledSwipe";
                readonly pointerId: number;
            } | {
                readonly _tag: "CompletedWaitBeforeDismissal";
                readonly entryId: string;
                readonly version: number;
            } | {
                readonly _tag: "CompletedWaitForSwipeSettled";
                readonly entryId: string;
                readonly version: number;
            } | {
                readonly _tag: "Dismissed";
                readonly entryId: string;
            } | {
                readonly _tag: "GotAnimationMessage";
                readonly entryId: string;
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
                readonly _tag: "HoveredEntry";
                readonly entryId: string;
            } | {
                readonly _tag: "LeftEntry";
                readonly entryId: string;
            } | {
                readonly _tag: "MovedSwipePointer";
                readonly pointerId: number;
                readonly clientX: number;
            } | {
                readonly _tag: "PressedEntryPointer";
                readonly entryId: string;
                readonly pointerId: number;
                readonly clientX: number;
            } | {
                readonly _tag: "ReleasedSwipePointer";
                readonly pointerId: number;
                readonly clientX: number;
            };
        } | {
            readonly _tag: "GotTooltipDemoMessage";
            readonly message: {
                readonly _tag: "BlurredTrigger";
            } | {
                readonly _tag: "CompletedAnchorTooltip";
            } | {
                readonly _tag: "EnteredTrigger";
            } | {
                readonly _tag: "FocusedTrigger";
            } | {
                readonly _tag: "LeftTrigger";
            } | {
                readonly _tag: "PressedEscape";
            } | {
                readonly _tag: "CompletedWaitBeforeShowing";
                readonly version: number;
            } | {
                readonly _tag: "PressedPointerOnTrigger";
                readonly pointerType: string;
            };
        } | {
            readonly _tag: "GotVerticalRadioGroupDemoMessage";
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
            readonly _tag: "GotVerticalTabsDemoMessage";
            readonly message: {
                readonly _tag: "CompletedFocusTab";
            } | {
                readonly _tag: "FocusedTab";
                readonly index: number;
            } | {
                readonly _tag: "SelectedTab";
                readonly index: number;
                readonly value: string;
            };
        } | {
            readonly _tag: "GotVirtualListChatDemoMessage";
            readonly message: {
                readonly _tag: "CompletedApplyScroll";
                readonly version: number;
                readonly outcome: {
                    readonly _tag: "Skipped";
                } | {
                    readonly _tag: "Applied";
                    readonly scrollTop: number;
                    readonly scrollHeight: number;
                    readonly containerHeight: number;
                    readonly anchor: {
                        readonly _tag: "None";
                    } | {
                        readonly _tag: "Row";
                        readonly key: string;
                        readonly index: number;
                        readonly viewportOffset: number;
                    };
                };
            } | {
                readonly _tag: "MeasuredRows";
                readonly measurements: readonly {
                    readonly key: string;
                    readonly height: number;
                    readonly layoutVersion: number;
                }[];
            } | {
                readonly _tag: "ObservedContainerScroll";
                readonly scrollTop: number;
                readonly scrollHeight: number;
                readonly containerHeight: number;
                readonly anchor: {
                    readonly _tag: "None";
                } | {
                    readonly _tag: "Row";
                    readonly key: string;
                    readonly index: number;
                    readonly viewportOffset: number;
                };
            } | {
                readonly _tag: "ResizedContainer";
                readonly containerWidth: number;
                readonly containerHeight: number;
            };
        } | {
            readonly _tag: "GotVirtualListDemoMessage";
            readonly message: {
                readonly _tag: "CompletedApplyScroll";
                readonly version: number;
                readonly outcome: {
                    readonly _tag: "Skipped";
                } | {
                    readonly _tag: "Applied";
                    readonly scrollTop: number;
                    readonly scrollHeight: number;
                    readonly containerHeight: number;
                    readonly anchor: {
                        readonly _tag: "None";
                    } | {
                        readonly _tag: "Row";
                        readonly key: string;
                        readonly index: number;
                        readonly viewportOffset: number;
                    };
                };
            } | {
                readonly _tag: "MeasuredRows";
                readonly measurements: readonly {
                    readonly key: string;
                    readonly height: number;
                    readonly layoutVersion: number;
                }[];
            } | {
                readonly _tag: "ObservedContainerScroll";
                readonly scrollTop: number;
                readonly scrollHeight: number;
                readonly containerHeight: number;
                readonly anchor: {
                    readonly _tag: "None";
                } | {
                    readonly _tag: "Row";
                    readonly key: string;
                    readonly index: number;
                    readonly viewportOffset: number;
                };
            } | {
                readonly _tag: "ResizedContainer";
                readonly containerWidth: number;
                readonly containerHeight: number;
            };
        } | {
            readonly _tag: "GotVirtualListVariableDemoMessage";
            readonly message: {
                readonly _tag: "CompletedApplyScroll";
                readonly version: number;
                readonly outcome: {
                    readonly _tag: "Skipped";
                } | {
                    readonly _tag: "Applied";
                    readonly scrollTop: number;
                    readonly scrollHeight: number;
                    readonly containerHeight: number;
                    readonly anchor: {
                        readonly _tag: "None";
                    } | {
                        readonly _tag: "Row";
                        readonly key: string;
                        readonly index: number;
                        readonly viewportOffset: number;
                    };
                };
            } | {
                readonly _tag: "MeasuredRows";
                readonly measurements: readonly {
                    readonly key: string;
                    readonly height: number;
                    readonly layoutVersion: number;
                }[];
            } | {
                readonly _tag: "ObservedContainerScroll";
                readonly scrollTop: number;
                readonly scrollHeight: number;
                readonly containerHeight: number;
                readonly anchor: {
                    readonly _tag: "None";
                } | {
                    readonly _tag: "Row";
                    readonly key: string;
                    readonly index: number;
                    readonly viewportOffset: number;
                };
            } | {
                readonly _tag: "ResizedContainer";
                readonly containerWidth: number;
                readonly containerHeight: number;
            };
        } | {
            readonly _tag: "ToggledCheckboxAllDemo";
            readonly isChecked: boolean;
        } | {
            readonly _tag: "ToggledCheckboxBasicDemo";
            readonly isChecked: boolean;
        } | {
            readonly _tag: "ToggledCheckboxOptionADemo";
            readonly isChecked: boolean;
        } | {
            readonly _tag: "ToggledCheckboxOptionBDemo";
            readonly isChecked: boolean;
        } | {
            readonly _tag: "ToggledDisclosureCollapsedPreviewDemo";
            readonly isOpen: boolean;
        } | {
            readonly _tag: "ToggledDisclosureDemo";
            readonly isOpen: boolean;
        } | {
            readonly _tag: "ToggledFieldsetCheckboxDemo";
            readonly isChecked: boolean;
        } | {
            readonly _tag: "ToggledSwitchDemo";
            readonly isChecked: boolean;
        } | {
            readonly _tag: "UpdatedFieldsetInputValue";
            readonly value: string;
        } | {
            readonly _tag: "UpdatedFieldsetTextareaValue";
            readonly value: string;
        } | {
            readonly _tag: "UpdatedInputDemoValue";
            readonly value: string;
        } | {
            readonly _tag: "UpdatedSelectDemoValue";
            readonly value: string;
        } | {
            readonly _tag: "UpdatedTextareaDemoValue";
            readonly value: string;
        };
    } | {
        readonly _tag: "ToggledMobileTableOfContents";
        readonly isOpen: boolean;
    } | {
        readonly _tag: "ToggledSidebarGroup";
        readonly key: "ai" | "apiReference" | "bestPractices" | "blog" | "comparisons" | "coreConcepts" | "examples" | "faq" | "foldkitUi" | "introduction" | "patterns" | "testing" | "tooling";
        readonly isOpen: boolean;
    } | {
        readonly _tag: "UpdatedNewsletterEmail";
        readonly value: string;
    }>;
};
export declare const devTracerLayer: Layer.Layer<never>;
