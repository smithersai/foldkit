import { Effect, Schema } from 'effect';
import { Command, Update } from 'foldkit';
import { type CalendarDate } from 'foldkit/calendar';
export declare const Model: Schema.Struct<{
    readonly entries: Schema.$Array<Schema.Struct<{
        readonly id: Schema.String;
        readonly company: Schema.Union<readonly [Schema.TaggedStruct<"NotValidated", {
            readonly value: Schema.Codec<string, string, never, never>;
        }>, Schema.TaggedStruct<"Validating", {
            readonly value: Schema.Codec<string, string, never, never>;
        }>, Schema.TaggedStruct<"Valid", {
            readonly value: Schema.Codec<string, string, never, never>;
        }>, Schema.TaggedStruct<"Invalid", {
            readonly value: Schema.Codec<string, string, never, never>;
            readonly errors: Schema.NonEmptyArray<Schema.String>;
        }>]>;
        readonly title: Schema.Union<readonly [Schema.TaggedStruct<"NotValidated", {
            readonly value: Schema.Codec<string, string, never, never>;
        }>, Schema.TaggedStruct<"Validating", {
            readonly value: Schema.Codec<string, string, never, never>;
        }>, Schema.TaggedStruct<"Valid", {
            readonly value: Schema.Codec<string, string, never, never>;
        }>, Schema.TaggedStruct<"Invalid", {
            readonly value: Schema.Codec<string, string, never, never>;
            readonly errors: Schema.NonEmptyArray<Schema.String>;
        }>]>;
        readonly startDate: Schema.Struct<{
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
        readonly maybeStartDate: Schema.Option<Schema.Struct<{
            readonly year: Schema.Int;
            readonly month: Schema.Int;
            readonly day: Schema.Int;
        }>>;
        readonly endDate: Schema.Struct<{
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
        readonly maybeEndDate: Schema.Option<Schema.Struct<{
            readonly year: Schema.Int;
            readonly month: Schema.Int;
            readonly day: Schema.Int;
        }>>;
        readonly isCurrentlyEmployed: Schema.Boolean;
        readonly description: Schema.String;
    }>>;
    readonly today: Schema.Struct<{
        readonly year: Schema.Int;
        readonly month: Schema.Int;
        readonly day: Schema.Int;
    }>;
}>;
export type Model = typeof Model.Type;
export declare const Message: import("foldkit/message").MessageUnion<{
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
export type Message = typeof Message.Type;
export declare const init: (today: CalendarDate, initialEntryId: string) => Model;
export declare const GenerateEntryId: Command.CommandDefinitionNoArgs<"GenerateEntryId", Effect.Effect<{
    readonly _tag: "FailedGenerateEntryId";
} | {
    readonly _tag: "SucceededGenerateEntryId";
    readonly entryId: string;
}, never, never>>;
export declare const update: (model: Model, message: Message) => Readonly<{
    model: {
        readonly entries: readonly {
            readonly id: string;
            readonly company: {
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
            readonly title: {
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
            readonly startDate: {
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
                    readonly maybeFocusedDate: import("effect/Option").Option<{
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
                    readonly maybeMinDate: import("effect/Option").Option<{
                        readonly year: number;
                        readonly month: number;
                        readonly day: number;
                    }>;
                    readonly maybeMaxDate: import("effect/Option").Option<{
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
                    readonly maybeLastButtonPointerType: import("effect/Option").Option<string>;
                };
            };
            readonly maybeStartDate: import("effect/Option").Option<{
                readonly year: number;
                readonly month: number;
                readonly day: number;
            }>;
            readonly endDate: {
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
                    readonly maybeFocusedDate: import("effect/Option").Option<{
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
                    readonly maybeMinDate: import("effect/Option").Option<{
                        readonly year: number;
                        readonly month: number;
                        readonly day: number;
                    }>;
                    readonly maybeMaxDate: import("effect/Option").Option<{
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
                    readonly maybeLastButtonPointerType: import("effect/Option").Option<string>;
                };
            };
            readonly maybeEndDate: import("effect/Option").Option<{
                readonly year: number;
                readonly month: number;
                readonly day: number;
            }>;
            readonly isCurrentlyEmployed: boolean;
            readonly description: string;
        }[];
        readonly today: {
            readonly year: number;
            readonly month: number;
            readonly day: number;
        };
    };
    commands?: Update.Commands<{
        readonly _tag: "ClickedAddEntry";
    } | {
        readonly _tag: "FailedGenerateEntryId";
    } | {
        readonly _tag: "GotEntryMessage";
        readonly entryId: string;
        readonly message: {
            readonly _tag: "ClickedRemoveSelf";
        } | {
            readonly _tag: "GotEndDateMessage";
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
            readonly _tag: "GotStartDateMessage";
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
            readonly _tag: "ToggledCurrentlyEmployed";
            readonly isChecked: boolean;
        } | {
            readonly _tag: "UpdatedCompany";
            readonly value: string;
        } | {
            readonly _tag: "UpdatedDescription";
            readonly value: string;
        } | {
            readonly _tag: "UpdatedTitle";
            readonly value: string;
        };
    } | {
        readonly _tag: "RemovedEntry";
        readonly entryId: string;
    } | {
        readonly _tag: "SucceededGenerateEntryId";
        readonly entryId: string;
    }, never>;
    outMessage?: never;
}>;
export declare const hasErrors: (model: Model) => boolean;
export declare const isComplete: (model: Model) => boolean;
export declare const revealErrors: (model: Model) => Model;
