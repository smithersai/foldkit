import { type Update } from 'foldkit';
import type { Message } from './message.vibe';
import type { Model } from './model.vibe';
export type InitReturn = Update.Return<Model, Message>;
export declare const init: () => InitReturn;
