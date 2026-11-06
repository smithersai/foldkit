import { Option } from 'effect';
import { type CalendarDate } from 'foldkit/calendar';
/** Formats a CalendarDate as `Apr 2026` for human-readable display. */
export declare const yearMonth: (date: CalendarDate) => string;
/** Formats a CalendarDate as `2026-04-16` (zero-padded ISO-style). */
export declare const fullDate: (date: CalendarDate) => string;
/** Formats a work-history date range for display. When the user is
 *  currently employed, shows `start – Present`. When they have an end date,
 *  shows `start – end`. Otherwise shows just `start`. */
export declare const employmentRange: (start: CalendarDate, isCurrentlyEmployed: boolean, maybeEnd: Option.Option<CalendarDate>) => string;
/** Singular/plural-aware count string (`0 items`, `1 item`, `2 items`). */
export declare const pluralize: (count: number, singular: string, plural: string) => string;
