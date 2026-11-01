import { Option } from "effect";
import { Submodel } from 'foldkit';
export declare const view: Submodel.View<{
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
}, {
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
}, void>;
