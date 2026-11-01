import { Option } from 'effect';
import { Update } from 'foldkit';
import { Message } from './message.vibe';
import type { Model } from './model.vibe';
export type UpdateReturn = Update.Return<Model, Message>;
export declare const update: (model: Model, message: Message) => Readonly<{
    model: {
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
    commands?: Update.Commands<{
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
    }, never>;
    outMessage?: never;
}>;
