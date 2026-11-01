import { Calendar, type Update } from 'foldkit';
import type { Message as UiMessage } from './message.js';
import type { UiModel } from './model.vibe';
type InitReturn = Update.Return<UiModel, UiMessage>;
export declare const uiInit: (today: Calendar.CalendarDate) => InitReturn;
export {};
