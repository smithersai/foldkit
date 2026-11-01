import { Option } from "effect";
import { type CalendarDate } from 'foldkit/calendar';
import { type Html } from 'foldkit/html';
import { Calendar } from '@foldkit/ui';
export declare const triggerClassName = "w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500";
export declare const panelClassName = "rounded-xl border border-gray-200 bg-white p-4 shadow-lg z-10 outline-none";
export declare const backdropClassName = "fixed inset-0";
export declare const triggerContent: (maybeDate: Option.Option<CalendarDate>, placeholder: string) => Html;
export declare const calendarView: (attributes: Calendar.CalendarAttributes) => Html;
