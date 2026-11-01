import { Effect, Option, Schema } from 'effect';
import * as Calendar from 'foldkit/calendar';
import type { CalendarDate } from 'foldkit/calendar';
import * as Command from 'foldkit/command';
import { type ChildAttribute, type Html } from 'foldkit/html';
import { type Reflect } from 'foldkit/submodel';
import * as Update from 'foldkit/update';
/** Which grid the calendar is currently displaying. `Days` is the standard
 * 6×7 day grid; `Months` is a 3×4 month-name grid for fast month jumps;
 * `Years` is a 3×4 year grid paged in 12-year windows for fast year jumps. */
export declare const ViewMode: Schema.Literals<readonly ["Days", "Months", "Years"]>;
export type ViewMode = typeof ViewMode.Type;
/** Schema for the calendar component's state. Tracks the visible month/year,
 * the keyboard-focused and user-selected dates, the active view mode, and
 * the configuration that governs navigation (locale, min/max, disabled
 * days). */
export declare const Model: Schema.Struct<{
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
export type Model = typeof Model.Type;
/** Union of all messages the calendar component can produce. */
export declare const Message: import("foldkit/message").MessageUnion<{
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
export type Message = typeof Message.Type;
export type ClickedDay = typeof Message.ClickedDay.Type;
export type PressedKeyOnGrid = typeof Message.PressedKeyOnGrid.Type;
export type SelectedMonth = typeof Message.SelectedMonth.Type;
export type SelectedYear = typeof Message.SelectedYear.Type;
/** Union of the calendar's OutMessages. */
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
}>;
export type OutMessage = typeof OutMessage.Type;
export type ChangedViewMonth = typeof OutMessage.ChangedViewMonth.Type;
export type SelectedDate = typeof OutMessage.SelectedDate.Type;
/** Configuration for creating a calendar model with `init`. */
export type InitConfig = Readonly<{
    id: string;
    today: CalendarDate;
    initialViewDate?: CalendarDate;
    locale?: Calendar.LocaleConfig;
    minDate?: CalendarDate;
    maxDate?: CalendarDate;
    disabledDaysOfWeek?: ReadonlyArray<Calendar.DayOfWeek>;
    disabledDates?: ReadonlyArray<CalendarDate>;
}>;
/** Creates an initial calendar model. The selected date is owned by the
 * parent and passed in via `ViewInputs.maybeSelectedDate`. The view month
 * defaults to `initialViewDate` (pass the parent's selected date to open onto
 * it), or today when omitted. */
export declare const init: (config: InitConfig) => Model;
type UpdateReturn = Update.ReturnWithOutMessage<Model, Message, OutMessage>;
/** Focuses the calendar grid container. Parent components like DatePicker
 * dispatch this after opening to hand focus to the grid's keyboard layer. */
export declare const FocusGrid: Command.CommandDefinitionWithArgs<"FocusGrid", {
    id: Schema.String;
}, Effect.Effect<{
    readonly _tag: "CompletedFocusGrid";
}, never, never>>;
/** Programmatically selects a date on the calendar, committing it as the
 * chosen value and moving the cursor onto it. Use this in controlled-mode
 * handlers (when the view's `onSelectedDate` callback is provided) to write
 * the selection back to the calendar's internal state.
 *
 * Equivalent to dispatching `ClickedDay({ date })` through `update`. */
export declare const selectDate: (model: Model, date: CalendarDate) => UpdateReturn;
/** Moves the calendar's view and cursor to a date without changing the
 *  selection (which the parent owns). Use it to navigate to a known date, for
 *  example when opening a date picker onto its current value so the selected
 *  month is visible. Returns the model directly because it produces no
 *  commands and no OutMessage. */
export declare const focusDate: Reflect<Model, CalendarDate>;
/** Reflects the minimum selectable date onto the model. Pass `Option.none()`
 * to remove the minimum. Use this when the minimum derives from other Model
 * state (e.g. a start date field whose current selection constrains an end
 * date picker).
 *
 * Does NOT reconcile the current selection. If a previously-selected date
 * is now below the new minimum, it remains selected. Callers should clear or
 * reassign the selection explicitly if their domain requires it. */
export declare const reflectMinDate: Reflect<Model, Option.Option<CalendarDate>>;
/** Reflects the maximum selectable date onto the model. Pass `Option.none()`
 * to remove the maximum. Does NOT reconcile the current selection. */
export declare const reflectMaxDate: Reflect<Model, Option.Option<CalendarDate>>;
/** Reflects the list of individually-disabled dates onto the model. Pass an
 * empty array to clear. Does NOT reconcile the current selection. */
export declare const reflectDisabledDates: Reflect<Model, ReadonlyArray<CalendarDate>>;
/** Reflects the days of the week that are disabled (e.g. weekends) onto the
 * model. Pass an empty array to clear. Does NOT reconcile the current
 * selection. */
export declare const reflectDisabledDaysOfWeek: Reflect<Model, ReadonlyArray<Calendar.DayOfWeek>>;
/** Returns the calendar to Days mode regardless of current depth. Useful for
 * standalone (non-popovered) consumers that want to wire their own back-out
 * gesture. Popovered consumers like `DatePicker` don't need this. Escape
 * closes the popover, and the calendar resets to Days on next open.
 *
 * Reconciles `maybeFocusedDate` to a date inside the visible (`viewYear`,
 * `viewMonth`). Months/Years navigation can leave the cursor on a date
 * outside the days grid (paged-away year, etc.), which would otherwise
 * cause `aria-activedescendant` to point at a non-rendered cell and the
 * next ArrowLeft to jump to the cursor's stale year. */
export declare const dropToDays: (model: Model) => Model;
/** Processes a Calendar Message and returns the next Model, optional Commands,
 *  and an optional OutMessage. */
export declare const update: (model: Model, message: Message) => Readonly<{
    model: {
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
    commands?: Update.Commands<{
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
    }, never>;
    outMessage?: {
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
/** Information about a single day cell in the rendered calendar grid. */
export type DayCell = Readonly<{
    date: CalendarDate;
    label: string;
    cellAttributes: ReadonlyArray<ChildAttribute>;
    buttonAttributes: ReadonlyArray<ChildAttribute>;
    isSelected: boolean;
    isFocused: boolean;
    isToday: boolean;
    isInViewMonth: boolean;
    isDisabled: boolean;
}>;
/** A column header for the day grid's first row (day-of-week labels). */
export type ColumnHeader = Readonly<{
    name: string;
    attributes: ReadonlyArray<ChildAttribute>;
}>;
/** A single week row in the day grid, carrying its own row attributes (role,
 * aria-rowindex) alongside its 7 day cells. */
export type Week = Readonly<{
    attributes: ReadonlyArray<ChildAttribute>;
    cells: ReadonlyArray<DayCell>;
}>;
/** Information about a single month cell in the rendered months grid.
 * `label` is the locale-aware full month name (e.g. "September"); `shortLabel`
 * is the locale-aware abbreviation (e.g. "Sep"). Render whichever fits the
 * cell. Never substring `label` to abbreviate, since that's not safe across
 * locales. */
export type MonthCell = Readonly<{
    month: number;
    label: string;
    shortLabel: string;
    cellAttributes: ReadonlyArray<ChildAttribute>;
    buttonAttributes: ReadonlyArray<ChildAttribute>;
    isSelected: boolean;
    isFocused: boolean;
    isCurrentMonth: boolean;
    isDisabled: boolean;
}>;
/** Information about a single year cell in the rendered years grid. */
export type YearCell = Readonly<{
    year: number;
    label: string;
    cellAttributes: ReadonlyArray<ChildAttribute>;
    buttonAttributes: ReadonlyArray<ChildAttribute>;
    isSelected: boolean;
    isFocused: boolean;
    isCurrentYear: boolean;
    isDisabled: boolean;
}>;
/** Attributes provided to the consumer when rendering the day grid. */
export type DaysModeAttributes = Readonly<{
    _tag: 'Days';
    root: ReadonlyArray<ChildAttribute>;
    previousMonthButton: ReadonlyArray<ChildAttribute>;
    nextMonthButton: ReadonlyArray<ChildAttribute>;
    headingButton: ReadonlyArray<ChildAttribute>;
    heading: Readonly<{
        id: string;
        text: string;
    }>;
    grid: ReadonlyArray<ChildAttribute>;
    headerRow: ReadonlyArray<ChildAttribute>;
    columnHeaders: ReadonlyArray<ColumnHeader>;
    weeks: ReadonlyArray<Week>;
}>;
/** Attributes provided to the consumer when rendering the months grid. The
 * 12 cells are pre-built in calendar (locale-ordered). The consumer arranges
 * them in whatever grid layout they prefer (3×4 is the typical choice). */
export type MonthsModeAttributes = Readonly<{
    _tag: 'Months';
    root: ReadonlyArray<ChildAttribute>;
    headingButton: ReadonlyArray<ChildAttribute>;
    heading: Readonly<{
        id: string;
        text: string;
    }>;
    grid: ReadonlyArray<ChildAttribute>;
    cells: ReadonlyArray<MonthCell>;
}>;
/** Attributes provided to the consumer when rendering the years grid. The
 * 12 cells span one paged window; prev/next buttons page by 12 years. */
export type YearsModeAttributes = Readonly<{
    _tag: 'Years';
    root: ReadonlyArray<ChildAttribute>;
    previousPageButton: ReadonlyArray<ChildAttribute>;
    nextPageButton: ReadonlyArray<ChildAttribute>;
    heading: Readonly<{
        id: string;
        text: string;
    }>;
    grid: ReadonlyArray<ChildAttribute>;
    cells: ReadonlyArray<YearCell>;
}>;
/** Discriminated union of attribute groups and derived data the calendar
 * component provides to the consumer's `toView` callback. The variant
 * matches `model.viewMode`. Pattern-match on `_tag` with `Match.tagsExhaustive`
 * to render each mode. */
export type CalendarAttributes = DaysModeAttributes | MonthsModeAttributes | YearsModeAttributes;
/** Accessible labels and label builders accepted by Calendar views. DatePicker
 * accepts the same fields and forwards them to its embedded Calendar. */
export type ViewLabels = Readonly<{
    previousMonthLabel?: string;
    nextMonthLabel?: string;
    previousYearsPageLabel?: string;
    nextYearsPageLabel?: string;
    daysHeadingButtonLabel?: string;
    monthsHeadingButtonLabel?: string;
    /** Builds the day grid's `aria-label` from the heading text the locale's
     *  `monthYearFormat` produced. Defaults to English. */
    toDaysGridLabel?: (monthYear: string) => string;
    /** Builds a week row's `aria-label` from the date that starts the week.
     *  Defaults to English. */
    toWeekLabel?: (weekStart: CalendarDate) => string;
    /** Builds the month grid's `aria-label` from the displayed year. Defaults
     *  to English. */
    toMonthsGridLabel?: (year: number) => string;
    /** Builds the year grid's `aria-label` from the displayed year range.
     *  Defaults to English. */
    toYearsGridLabel?: (startYear: number, endYear: number) => string;
}>;
/** Per-render view inputs passed to `view` via `h.submodel`'s `viewInputs` field.
 *
 *  The Calendar dispatches its own `ClickedDay` message on date commit
 *  and emits a `SelectedDate` OutMessage. Handle the selection in the
 *  `foldOutMessage` of the Calendar's `Update.foldChild` config. */
export type ViewInputs = Readonly<{
    /** The selected date, read straight from the parent Model. The selected-day
     *  marker derives from it. */
    maybeSelectedDate: Option.Option<CalendarDate>;
    toView: (attributes: CalendarAttributes) => Html;
}> & ViewLabels;
/** Renders an accessible calendar. Publishes mode-specific ARIA attribute
 *  bundles + derived cell data, then delegates layout to the consumer's
 *  `toView` callback. The variant of `CalendarAttributes` passed to
 *  `toView` matches `model.viewMode`. */
export declare const view: import("foldkit/submodel").View<{
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
}, {
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
}, ViewInputs>;
export {};
