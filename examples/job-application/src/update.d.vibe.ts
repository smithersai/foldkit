import { Option } from "effect";
import { Update } from 'foldkit';
import { Message } from './message.vibe';
import { type Model } from './model.vibe';
export declare const update: (model: Model, message: Message) => Readonly<{
    model: {
        readonly currentStep: "Attachments" | "CoverLetter" | "Education" | "PersonalInfo" | "Review" | "Skills" | "WorkHistory";
        readonly personalInfo: {
            readonly firstName: {
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
            readonly lastName: {
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
            readonly email: {
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
            readonly emailValidationId: number;
            readonly phone: {
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
            readonly pronouns: {
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
            readonly maybeSelectedPronoun: Option.Option<string>;
            readonly customPronouns: string;
            readonly portfolioUrl: {
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
            readonly availableDate: {
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
            readonly maybeAvailableDate: Option.Option<{
                readonly year: number;
                readonly month: number;
                readonly day: number;
            }>;
        };
        readonly workHistory: {
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
                readonly maybeStartDate: Option.Option<{
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
                readonly maybeEndDate: Option.Option<{
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
        readonly education: {
            readonly entries: readonly {
                readonly id: string;
                readonly school: {
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
                readonly degree: {
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
                readonly fieldOfStudy: {
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
                readonly maybeGraduationYear: Option.Option<string>;
                readonly graduationYearListbox: {
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
                readonly isCurrentlyEnrolled: boolean;
            }[];
            readonly today: {
                readonly year: number;
                readonly month: number;
                readonly day: number;
            };
        };
        readonly skills: {
            readonly entries: readonly {
                readonly id: string;
                readonly name: {
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
                readonly proficiency: "Advanced" | "Beginner" | "Expert" | "Intermediate";
                readonly proficiencyRadioGroup: {
                    readonly id: string;
                    readonly maybeFocusedIndex: Option.Option<number>;
                };
            }[];
        };
        readonly coverLetter: {
            readonly content: string;
        };
        readonly attachments: {
            readonly resumeDrop: {
                readonly id: string;
                readonly isDragOver: boolean;
            };
            readonly maybeResume: Option.Option<File>;
            readonly additionalFilesDrop: {
                readonly id: string;
                readonly isDragOver: boolean;
            };
            readonly additionalFiles: readonly File[];
        };
        readonly isPreviewVisible: boolean;
        readonly submission: {
            readonly _tag: "NotSubmitted";
        } | {
            readonly _tag: "SubmitSuccess";
        } | {
            readonly _tag: "Submitting";
        } | {
            readonly _tag: "SubmitError";
            readonly error: string;
        };
        readonly stepMenu: {
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
        readonly stepTabs: {
            readonly id: string;
            readonly maybeFocusedIndex: Option.Option<number>;
            readonly activationMode: "Automatic" | "Manual";
        };
        readonly isSubmitAttempted: boolean;
    };
    commands?: Update.Commands<{
        readonly _tag: "ClickedNext";
    } | {
        readonly _tag: "ClickedPrevious";
    } | {
        readonly _tag: "ClickedSubmit";
    } | {
        readonly _tag: "SucceededSubmitApplication";
    } | {
        readonly _tag: "ToggledPreview";
    } | {
        readonly _tag: "FailedSubmitApplication";
        readonly error: string;
    } | {
        readonly _tag: "GotAttachmentsMessage";
        readonly message: {
            readonly _tag: "RemovedResume";
        } | {
            readonly _tag: "GotAdditionalFilesDropMessage";
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
            readonly _tag: "GotResumeDropMessage";
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
            readonly _tag: "RemovedAdditionalFile";
            readonly fileIndex: number;
        };
    } | {
        readonly _tag: "GotCoverLetterMessage";
        readonly message: {
            readonly _tag: "UpdatedContent";
            readonly value: string;
        };
    } | {
        readonly _tag: "GotEducationMessage";
        readonly message: {
            readonly _tag: "ClickedAddEntry";
        } | {
            readonly _tag: "FailedGenerateEntryId";
        } | {
            readonly _tag: "GotEntryMessage";
            readonly entryId: string;
            readonly message: {
                readonly _tag: "ClickedRemoveSelf";
            } | {
                readonly _tag: "GotGraduationYearListboxMessage";
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
                readonly _tag: "ToggledCurrentlyEnrolled";
                readonly isChecked: boolean;
            } | {
                readonly _tag: "UpdatedDegree";
                readonly value: string;
            } | {
                readonly _tag: "UpdatedFieldOfStudy";
                readonly value: string;
            } | {
                readonly _tag: "UpdatedSchool";
                readonly value: string;
            };
        } | {
            readonly _tag: "RemovedEntry";
            readonly entryId: string;
        } | {
            readonly _tag: "SucceededGenerateEntryId";
            readonly entryId: string;
        };
    } | {
        readonly _tag: "GotPersonalInfoMessage";
        readonly message: {
            readonly _tag: "CompletedValidateEmailAsync";
            readonly validationId: number;
            readonly field: {
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
        } | {
            readonly _tag: "GotAvailableDateMessage";
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
            readonly _tag: "GotPronounsMessage";
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
            readonly _tag: "UpdatedCustomPronouns";
            readonly value: string;
        } | {
            readonly _tag: "UpdatedEmail";
            readonly value: string;
        } | {
            readonly _tag: "UpdatedFirstName";
            readonly value: string;
        } | {
            readonly _tag: "UpdatedLastName";
            readonly value: string;
        } | {
            readonly _tag: "UpdatedPhone";
            readonly value: string;
        } | {
            readonly _tag: "UpdatedPortfolioUrl";
            readonly value: string;
        };
    } | {
        readonly _tag: "GotSkillsMessage";
        readonly message: {
            readonly _tag: "ClickedAddEntry";
        } | {
            readonly _tag: "FailedGenerateEntryId";
        } | {
            readonly _tag: "GotEntryMessage";
            readonly entryId: string;
            readonly message: {
                readonly _tag: "ClickedRemoveSelf";
            } | {
                readonly _tag: "GotProficiencyRadioGroupMessage";
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
                readonly _tag: "UpdatedName";
                readonly value: string;
            };
        } | {
            readonly _tag: "RemovedEntry";
            readonly entryId: string;
        } | {
            readonly _tag: "SucceededGenerateEntryId";
            readonly entryId: string;
        };
    } | {
        readonly _tag: "GotStepMenuMessage";
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
        readonly _tag: "GotStepTabsMessage";
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
        readonly _tag: "GotWorkHistoryMessage";
        readonly message: {
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
        };
    }, never>;
    outMessage?: never;
}>;
