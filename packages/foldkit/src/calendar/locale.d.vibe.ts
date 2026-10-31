import { Schema } from "effect";
import type { CalendarDate } from './calendarDate.vibe';
/**
 * One part of a `DateFormat`. Name parts draw from the `LocaleConfig`, number
 * parts draw from the date, and `LiteralText` supplies separators,
 * punctuation, or suffixes such as `年`.
 *
 * `MonthName`, `DayName`, and their `Short*` counterparts select from the
 * corresponding locale name arrays. `MonthNumber` and `DayNumber` render
 * unpadded numbers; their `Padded*` counterparts render two digits.
 * `YearNumber` renders the full year.
 */
export declare const DatePart: import("../schema/index.js").TaggedUnion<{
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
}>;
export type DatePart = typeof DatePart.Type;
/**
 * A non-empty ordered list of parts rendered left to right. Because ordering
 * lives in the data rather than in the formatting functions, a locale whose
 * dates read day-first or year-first renders correctly without a code change.
 *
 * @example
 * ```ts
 * import { Calendar } from 'foldkit'
 *
 * // "15. Januar 2026"
 * const germanLong: Calendar.DateFormat = [
 *   Calendar.DatePart.DayNumber(),
 *   Calendar.DatePart.LiteralText({ text: '. ' }),
 *   Calendar.DatePart.MonthName(),
 *   Calendar.DatePart.LiteralText({ text: ' ' }),
 *   Calendar.DatePart.YearNumber(),
 * ]
 * ```
 */
export declare const DateFormat: Schema.NonEmptyArray<import("../schema/index.js").TaggedUnion<{
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
export type DateFormat = typeof DateFormat.Type;
/** A non-empty format restricted to month and year parts. */
export declare const MonthYearFormat: Schema.NonEmptyArray<Schema.Union<readonly [Schema.TaggedStruct<"MonthName", {}> & ((value?: void | {
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
export type MonthYearFormat = typeof MonthYearFormat.Type;
/**
 * Locale configuration for rendering calendar dates. Contains only data: the
 * month and day names, the first day of the week, and the `DateFormat` for
 * each of the four shapes the formatters produce. Formatting functions
 * (`formatLong`, `formatShort`, `formatAriaLabel`, `formatMonthYear`) are
 * separate exports that take a `LocaleConfig` as input.
 *
 * Day names are always stored Sunday-first in the config; `firstDayOfWeek`
 * controls how the view rotates them at render time.
 */
export declare const LocaleConfig: Schema.Struct<{
    readonly firstDayOfWeek: Schema.Literals<readonly ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]>;
    readonly monthNames: Schema.Tuple<readonly [Schema.String, Schema.String, Schema.String, Schema.String, Schema.String, Schema.String, Schema.String, Schema.String, Schema.String, Schema.String, Schema.String, Schema.String]>;
    readonly shortMonthNames: Schema.Tuple<readonly [Schema.String, Schema.String, Schema.String, Schema.String, Schema.String, Schema.String, Schema.String, Schema.String, Schema.String, Schema.String, Schema.String, Schema.String]>;
    readonly dayNames: Schema.Tuple<readonly [Schema.String, Schema.String, Schema.String, Schema.String, Schema.String, Schema.String, Schema.String]>;
    readonly shortDayNames: Schema.Tuple<readonly [Schema.String, Schema.String, Schema.String, Schema.String, Schema.String, Schema.String, Schema.String]>;
    readonly longFormat: Schema.NonEmptyArray<import("../schema/index.js").TaggedUnion<{
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
    readonly shortFormat: Schema.NonEmptyArray<import("../schema/index.js").TaggedUnion<{
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
    readonly ariaLabelFormat: Schema.NonEmptyArray<import("../schema/index.js").TaggedUnion<{
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
export type LocaleConfig = typeof LocaleConfig.Type;
/**
 * Default English (United States) locale. Calendar components default to this
 * when initialization receives no locale. Consumers who want a different
 * locale pass their own `LocaleConfig`.
 */
export declare const defaultEnglishLocale: LocaleConfig;
/**
 * Renders a calendar date through an arbitrary `DateFormat`. The four named
 * formatters below are this function applied to the matching field of the
 * `LocaleConfig`; reach for it directly when a view needs a shape the locale
 * does not carry.
 *
 * @example
 * ```ts
 * import { Calendar } from 'foldkit'
 *
 * Calendar.format(Calendar.make(2026, 1, 15), Calendar.defaultEnglishLocale, [
 *   Calendar.DatePart.YearNumber(),
 *   Calendar.DatePart.LiteralText({ text: '-' }),
 *   Calendar.DatePart.PaddedMonthNumber(),
 *   Calendar.DatePart.LiteralText({ text: '-' }),
 *   Calendar.DatePart.PaddedDayNumber(),
 * ])
 * // "2026-01-15"
 * ```
 */
export declare const format: {
    (locale: LocaleConfig, dateFormat: DateFormat): (self: CalendarDate) => string;
    (self: CalendarDate, locale: LocaleConfig, dateFormat: DateFormat): string;
};
/**
 * Renders a calendar date through the locale's `longFormat`. Under
 * `defaultEnglishLocale`: `"January 15, 2026"`.
 *
 * @example
 * ```ts
 * import { Calendar } from 'foldkit'
 * import { pipe } from 'effect'
 *
 * Calendar.formatLong(Calendar.make(2026, 1, 15), Calendar.defaultEnglishLocale)
 * // "January 15, 2026"
 *
 * pipe(
 *   Calendar.make(2026, 1, 15),
 *   Calendar.formatLong(Calendar.defaultEnglishLocale),
 * )
 * // "January 15, 2026"
 * ```
 */
export declare const formatLong: {
    (locale: LocaleConfig): (self: CalendarDate) => string;
    (self: CalendarDate, locale: LocaleConfig): string;
};
/**
 * Renders a calendar date through the locale's `shortFormat`. Under
 * `defaultEnglishLocale`: `"Jan 15, 2026"`.
 */
export declare const formatShort: {
    (locale: LocaleConfig): (self: CalendarDate) => string;
    (self: CalendarDate, locale: LocaleConfig): string;
};
/**
 * Renders a calendar date through the locale's `ariaLabelFormat`, suitable
 * for `aria-label` on a grid cell. Under `defaultEnglishLocale`:
 * `"Thursday, January 15, 2026"`.
 *
 * @example
 * ```ts
 * import { Calendar } from 'foldkit'
 *
 * Calendar.formatAriaLabel(Calendar.make(2026, 1, 15), Calendar.defaultEnglishLocale)
 * // "Thursday, January 15, 2026"
 * ```
 */
export declare const formatAriaLabel: {
    (locale: LocaleConfig): (self: CalendarDate) => string;
    (self: CalendarDate, locale: LocaleConfig): string;
};
/**
 * Renders the month and year of a calendar date through the locale's
 * `monthYearFormat`, for calendar headings and month-cell labels. Under
 * `defaultEnglishLocale`: `"January 2026"`.
 *
 * The day of `self` is ignored, so callers with only a year and month can pass
 * any valid day.
 *
 * @example
 * ```ts
 * import { Calendar } from 'foldkit'
 *
 * Calendar.formatMonthYear(Calendar.make(2026, 1, 1), Calendar.defaultEnglishLocale)
 * // "January 2026"
 * ```
 */
export declare const formatMonthYear: {
    (locale: LocaleConfig): (self: CalendarDate) => string;
    (self: CalendarDate, locale: LocaleConfig): string;
};
