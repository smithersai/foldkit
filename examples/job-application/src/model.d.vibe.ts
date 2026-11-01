import { Schema } from "effect";
export declare const Submission: import("foldkit/schema").TaggedUnion<{
    readonly NotSubmitted: {};
    readonly Submitting: {};
    readonly SubmitSuccess: {};
    readonly SubmitError: {
        error: Schema.String;
    };
}>;
export type Submission = typeof Submission.Type;
export declare const Model: Schema.Struct<{
    readonly currentStep: Schema.Literals<readonly ["PersonalInfo", "WorkHistory", "Education", "Skills", "CoverLetter", "Attachments", "Review"]>;
    readonly personalInfo: Schema.Struct<{
        readonly firstName: Schema.Union<readonly [Schema.TaggedStruct<"NotValidated", {
            readonly value: Schema.Codec<string, string, never, never>;
        }>, Schema.TaggedStruct<"Validating", {
            readonly value: Schema.Codec<string, string, never, never>;
        }>, Schema.TaggedStruct<"Valid", {
            readonly value: Schema.Codec<string, string, never, never>;
        }>, Schema.TaggedStruct<"Invalid", {
            readonly value: Schema.Codec<string, string, never, never>;
            readonly errors: Schema.NonEmptyArray<Schema.String>;
        }>]>;
        readonly lastName: Schema.Union<readonly [Schema.TaggedStruct<"NotValidated", {
            readonly value: Schema.Codec<string, string, never, never>;
        }>, Schema.TaggedStruct<"Validating", {
            readonly value: Schema.Codec<string, string, never, never>;
        }>, Schema.TaggedStruct<"Valid", {
            readonly value: Schema.Codec<string, string, never, never>;
        }>, Schema.TaggedStruct<"Invalid", {
            readonly value: Schema.Codec<string, string, never, never>;
            readonly errors: Schema.NonEmptyArray<Schema.String>;
        }>]>;
        readonly email: Schema.Union<readonly [Schema.TaggedStruct<"NotValidated", {
            readonly value: Schema.Codec<string, string, never, never>;
        }>, Schema.TaggedStruct<"Validating", {
            readonly value: Schema.Codec<string, string, never, never>;
        }>, Schema.TaggedStruct<"Valid", {
            readonly value: Schema.Codec<string, string, never, never>;
        }>, Schema.TaggedStruct<"Invalid", {
            readonly value: Schema.Codec<string, string, never, never>;
            readonly errors: Schema.NonEmptyArray<Schema.String>;
        }>]>;
        readonly emailValidationId: Schema.Number;
        readonly phone: Schema.Union<readonly [Schema.TaggedStruct<"NotValidated", {
            readonly value: Schema.Codec<string, string, never, never>;
        }>, Schema.TaggedStruct<"Validating", {
            readonly value: Schema.Codec<string, string, never, never>;
        }>, Schema.TaggedStruct<"Valid", {
            readonly value: Schema.Codec<string, string, never, never>;
        }>, Schema.TaggedStruct<"Invalid", {
            readonly value: Schema.Codec<string, string, never, never>;
            readonly errors: Schema.NonEmptyArray<Schema.String>;
        }>]>;
        readonly pronouns: Schema.Struct<{
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
        readonly maybeSelectedPronoun: Schema.Option<Schema.String>;
        readonly customPronouns: Schema.String;
        readonly portfolioUrl: Schema.Union<readonly [Schema.TaggedStruct<"NotValidated", {
            readonly value: Schema.Codec<string, string, never, never>;
        }>, Schema.TaggedStruct<"Validating", {
            readonly value: Schema.Codec<string, string, never, never>;
        }>, Schema.TaggedStruct<"Valid", {
            readonly value: Schema.Codec<string, string, never, never>;
        }>, Schema.TaggedStruct<"Invalid", {
            readonly value: Schema.Codec<string, string, never, never>;
            readonly errors: Schema.NonEmptyArray<Schema.String>;
        }>]>;
        readonly availableDate: Schema.Struct<{
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
        readonly maybeAvailableDate: Schema.Option<Schema.Struct<{
            readonly year: Schema.Int;
            readonly month: Schema.Int;
            readonly day: Schema.Int;
        }>>;
    }>;
    readonly workHistory: Schema.Struct<{
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
    readonly education: Schema.Struct<{
        readonly entries: Schema.$Array<Schema.Struct<{
            readonly id: Schema.String;
            readonly school: Schema.Union<readonly [Schema.TaggedStruct<"NotValidated", {
                readonly value: Schema.Codec<string, string, never, never>;
            }>, Schema.TaggedStruct<"Validating", {
                readonly value: Schema.Codec<string, string, never, never>;
            }>, Schema.TaggedStruct<"Valid", {
                readonly value: Schema.Codec<string, string, never, never>;
            }>, Schema.TaggedStruct<"Invalid", {
                readonly value: Schema.Codec<string, string, never, never>;
                readonly errors: Schema.NonEmptyArray<Schema.String>;
            }>]>;
            readonly degree: Schema.Union<readonly [Schema.TaggedStruct<"NotValidated", {
                readonly value: Schema.Codec<string, string, never, never>;
            }>, Schema.TaggedStruct<"Validating", {
                readonly value: Schema.Codec<string, string, never, never>;
            }>, Schema.TaggedStruct<"Valid", {
                readonly value: Schema.Codec<string, string, never, never>;
            }>, Schema.TaggedStruct<"Invalid", {
                readonly value: Schema.Codec<string, string, never, never>;
                readonly errors: Schema.NonEmptyArray<Schema.String>;
            }>]>;
            readonly fieldOfStudy: Schema.Union<readonly [Schema.TaggedStruct<"NotValidated", {
                readonly value: Schema.Codec<string, string, never, never>;
            }>, Schema.TaggedStruct<"Validating", {
                readonly value: Schema.Codec<string, string, never, never>;
            }>, Schema.TaggedStruct<"Valid", {
                readonly value: Schema.Codec<string, string, never, never>;
            }>, Schema.TaggedStruct<"Invalid", {
                readonly value: Schema.Codec<string, string, never, never>;
                readonly errors: Schema.NonEmptyArray<Schema.String>;
            }>]>;
            readonly maybeGraduationYear: Schema.Option<Schema.String>;
            readonly graduationYearListbox: Schema.Struct<{
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
            readonly isCurrentlyEnrolled: Schema.Boolean;
        }>>;
        readonly today: Schema.Struct<{
            readonly year: Schema.Int;
            readonly month: Schema.Int;
            readonly day: Schema.Int;
        }>;
    }>;
    readonly skills: Schema.Struct<{
        readonly entries: Schema.$Array<Schema.Struct<{
            readonly id: Schema.String;
            readonly name: Schema.Union<readonly [Schema.TaggedStruct<"NotValidated", {
                readonly value: Schema.Codec<string, string, never, never>;
            }>, Schema.TaggedStruct<"Validating", {
                readonly value: Schema.Codec<string, string, never, never>;
            }>, Schema.TaggedStruct<"Valid", {
                readonly value: Schema.Codec<string, string, never, never>;
            }>, Schema.TaggedStruct<"Invalid", {
                readonly value: Schema.Codec<string, string, never, never>;
                readonly errors: Schema.NonEmptyArray<Schema.String>;
            }>]>;
            readonly proficiency: Schema.Literals<readonly ["Beginner", "Intermediate", "Advanced", "Expert"]>;
            readonly proficiencyRadioGroup: Schema.Struct<{
                readonly id: Schema.String;
                readonly maybeFocusedIndex: Schema.Option<Schema.Number>;
            }>;
        }>>;
    }>;
    readonly coverLetter: Schema.Struct<{
        readonly content: Schema.String;
    }>;
    readonly attachments: Schema.Struct<{
        readonly resumeDrop: Schema.Struct<{
            readonly id: Schema.String;
            readonly isDragOver: Schema.Boolean;
        }>;
        readonly maybeResume: Schema.Option<Schema.Schema<File>>;
        readonly additionalFilesDrop: Schema.Struct<{
            readonly id: Schema.String;
            readonly isDragOver: Schema.Boolean;
        }>;
        readonly additionalFiles: Schema.$Array<Schema.Schema<File>>;
    }>;
    readonly isPreviewVisible: Schema.Boolean;
    readonly submission: import("foldkit/schema").TaggedUnion<{
        readonly NotSubmitted: {};
        readonly Submitting: {};
        readonly SubmitSuccess: {};
        readonly SubmitError: {
            error: Schema.String;
        };
    }>;
    readonly stepMenu: Schema.Struct<{
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
    readonly stepTabs: Schema.Struct<{
        readonly id: Schema.String;
        readonly maybeFocusedIndex: Schema.Option<Schema.Number>;
        readonly activationMode: Schema.Literals<readonly ["Automatic", "Manual"]>;
    }>;
    readonly isSubmitAttempted: Schema.Boolean;
}>;
export type Model = typeof Model.Type;
