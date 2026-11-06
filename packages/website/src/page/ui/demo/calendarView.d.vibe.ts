import type { Html, HtmlBuilder } from 'foldkit/html';
import type { Calendar } from '@foldkit/ui';
export declare const calendarView: <Message>(rootClassName: string, h: HtmlBuilder<Message>) => (u: Calendar.CalendarAttributes) => Html;
