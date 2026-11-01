import { DateTime, Option } from 'effect';
export declare const LAST_YEAR_WEEKS = 52;
export type WeeklyCount = Readonly<{
    weekStart: string;
    count: number;
}>;
export declare const weekStartForDateTime: (dateTime: DateTime.Utc) => string;
export declare const weekStartsForLastYear: (now: DateTime.Utc) => ReadonlyArray<string>;
export declare const countByWeek: <A>(values: ReadonlyArray<A>, weekStarts: ReadonlyArray<string>, toWeekStart: (value: A) => Option.Option<string>) => ReadonlyArray<WeeklyCount>;
export declare const sumByWeek: <A>(values: ReadonlyArray<A>, weekStarts: ReadonlyArray<string>, toWeekStart: (value: A) => string, toAmount: (value: A) => number) => ReadonlyArray<Readonly<{
    weekStart: string;
    amount: number;
}>>;
export declare const valueForWeek: (values: ReadonlyArray<Readonly<{
    weekStart: string;
    amount: number;
}>>, weekStart: string) => number;
export declare const countForWeek: (values: ReadonlyArray<WeeklyCount>, weekStart: string) => number;
