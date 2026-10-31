import { Option, Schema } from 'effect';
import * as Calendar from 'foldkit/calendar';
import type { CalendarDate } from 'foldkit/calendar';
import type { ChildAttribute, Html } from 'foldkit/html';
import { type Reflect } from 'foldkit/submodel';
import * as Update from 'foldkit/update';
import type { AnchorConfig } from '../anchor/index.js';
import * as UiCalendar from '../calendar/index.js';
/** Schema for the date picker component's private interaction state. The
 * selected date is owned by the parent and passed in via
 * `ViewInputs.maybeSelectedDate`. This holds the embedded Calendar submodel
 * (the visible grid) and the embedded Popover submodel (the open/close +
 * transition layer). */
export declare const Model: Schema.Struct<{
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
export type Model = typeof Model.Type;
/** Union of all messages the date picker component can produce. */
export declare const Message: import("foldkit/message").MessageUnion<{
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
export type Message = typeof Message.Type;
/** Union of out-messages the date picker can produce. */
export declare const OutMessage: import("foldkit/message").MessageUnion<{
    readonly ChangedViewMonth: {
        year: Schema.Int;
        month: Schema.Int;
    };
    readonly SelectedDate: {
        date: Schema.Struct<{
            readonly year: Schema.Int;
            readonly month: Schema.Int;
            readonly day: Schema.Int;
        }>;
    };
    readonly ClearedDate: {};
}>;
export type OutMessage = typeof OutMessage.Type;
export type ChangedViewMonth = typeof OutMessage.ChangedViewMonth.Type;
export type SelectedDate = typeof OutMessage.SelectedDate.Type;
export type ClearedDate = typeof OutMessage.ClearedDate.Type;
/** Configuration for creating a date picker model with `init`. */
export type InitConfig = Readonly<{
    id: string;
    today: CalendarDate;
    initialViewDate?: CalendarDate;
    isAnimated?: boolean;
    locale?: Calendar.LocaleConfig;
    minDate?: CalendarDate;
    maxDate?: CalendarDate;
    disabledDaysOfWeek?: ReadonlyArray<Calendar.DayOfWeek>;
    disabledDates?: ReadonlyArray<CalendarDate>;
}>;
/** Creates an initial date picker model from a config. The selected date is
 * owned by the parent; pass its current value as `initialViewDate` to open the
 * calendar onto that month. The calendar and popover submodels are created
 * with derived ids so their DOM elements stay addressable. The popover is
 * opened in `contentFocus` mode so focus lands on the calendar grid instead of
 * the panel. */
export declare const init: (config: InitConfig) => Model;
type UpdateReturn = Update.ReturnWithOutMessage<Model, Message, OutMessage>;
/** Processes a DatePicker Message and returns the next Model, optional
 *  Commands, and an optional OutMessage. */
export declare const update: (model: Model, message: Message) => Readonly<{
    model: {
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
    commands?: Update.Commands<{
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
    }, never>;
    outMessage?: {
        readonly _tag: "ClearedDate";
    } | {
        readonly _tag: "ChangedViewMonth";
        readonly year: number;
        readonly month: number;
    } | {
        readonly _tag: "SelectedDate";
        readonly date: {
            readonly year: number;
            readonly month: number;
            readonly day: number;
        };
    };
}>;
/** Programmatically opens the DatePicker, updating the Model and returning
 *  focus and Popover Commands. Use this in domain-event handlers. */
export declare const open: (model: Model) => UpdateReturn;
/** Programmatically closes the date picker. Use this in domain-event handlers. */
export declare const close: (model: Model) => UpdateReturn;
/** Programmatically selects a date, committing it and closing the popover. Emits a `SelectedDate` OutMessage just like a user-initiated selection. */
export declare const selectDate: (model: Model, date: CalendarDate) => UpdateReturn;
/** Programmatically clears the selected date. */
export declare const clear: (model: Model) => UpdateReturn;
/** Moves the embedded calendar's view and cursor to a date without changing
 *  the selection (which the parent owns). Use it to navigate the picker onto a
 *  known date, for example after the parent sets its value externally (a URL
 *  parameter, a saved draft) so opening the picker shows that month. Returns
 *  the Model directly because it produces no Commands and no OutMessage. */
export declare const focusDate: Reflect<Model, CalendarDate>;
/** Reflects the minimum selectable date onto the embedded calendar. Pass
 * `Option.none()` to remove the minimum. Use this when the minimum derives
 * from other Model state (e.g. a start date field whose current selection
 * constrains an end date picker).
 *
 * Does NOT reconcile the current selection. If a previously-selected date
 * is now below the new minimum, it remains selected. Callers should `clear`
 * or reassign the selection explicitly if their domain requires it. */
export declare const reflectMinDate: Reflect<Model, Option.Option<CalendarDate>>;
/** Reflects the maximum selectable date onto the embedded calendar. Pass
 * `Option.none()` to remove the maximum. Does NOT reconcile the current
 * selection. */
export declare const reflectMaxDate: Reflect<Model, Option.Option<CalendarDate>>;
/** Reflects the list of individually-disabled dates onto the embedded
 * calendar. Pass an empty array to clear. Does NOT reconcile the current
 * selection. */
export declare const reflectDisabledDates: Reflect<Model, ReadonlyArray<CalendarDate>>;
/** Reflects the days of the week that are disabled onto the embedded calendar
 * (e.g. weekends). Pass an empty array to clear. Does NOT reconcile the
 * current selection. */
export declare const reflectDisabledDaysOfWeek: Reflect<Model, ReadonlyArray<Calendar.DayOfWeek>>;
/** Returns the bare DOM id of the date picker trigger button, derived from
 *  the date picker's base id. The trigger is the embedded Popover's button,
 *  so the id is suffixed `-popover-button`. Use this to associate an external
 *  label with the trigger via a native `<label for={DatePicker.triggerId(id)}>`
 *  or an `aria-labelledby` reference. */
export declare const triggerId: (id: string) => string;
/** Per-render view inputs passed to `view` via `h.submodel`'s `viewInputs` field.
 *
 *  The DatePicker emits a `SelectedDate({ date })` OutMessage when the
 *  user commits a date. Handle it in the `foldOutMessage` of the
 *  DatePicker's `Update.foldChild` config to lift the date into domain
 *  state. Calendar label fields are forwarded to the embedded Calendar. */
export type ViewInputs = Readonly<{
    anchor: AnchorConfig;
    /** The selected date, read straight from the parent Model. The trigger
     * content, the calendar's selected-day marker, and the hidden form input all
     * derive from it. */
    maybeSelectedDate: Option.Option<CalendarDate>;
    /** Renders the trigger button's content (typically the formatted selected
     * date or a placeholder). Receives the current selection. */
    triggerContent: (maybeDate: Option.Option<CalendarDate>) => Html;
    /** Renders the calendar grid layout inside the popover panel. The
     * consumer lays out the attribute bundles exactly as they would for
     * an inline calendar. */
    toCalendarView: (attributes: UiCalendar.CalendarAttributes) => Html;
    isDisabled?: boolean;
    /** Name for the hidden form input. When provided, a hidden `<input>` is
     * rendered alongside the trigger so native form submission captures the
     * selected date as an ISO string (`YYYY-MM-DD`). */
    name?: string;
    className?: string;
    attributes?: ReadonlyArray<ChildAttribute>;
    triggerClassName?: string;
    triggerAttributes?: ReadonlyArray<ChildAttribute>;
    ariaLabel?: string;
    ariaLabelledBy?: string;
    panelClassName?: string;
    panelAttributes?: ReadonlyArray<ChildAttribute>;
    backdropClassName?: string;
    backdropAttributes?: ReadonlyArray<ChildAttribute>;
}> & UiCalendar.ViewLabels;
/** Renders an accessible date picker: a trigger button that opens a popover
 * containing an accessible calendar grid. The date picker assembles the
 * embedded Calendar and Popover components into one flat API. Consumers
 * provide the trigger face and the calendar grid layout, DatePicker handles
 * focus choreography, open/close state, and form submission. */
export declare const view: import("foldkit/submodel").View<{
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
}, {
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
}, ViewInputs>;
export {};
