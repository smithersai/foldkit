import { type Update } from 'foldkit';
import { Message } from './message.vibe';
import { Model } from './model.vibe';
export type InitReturn = Update.Return<Model, Message>;
export declare const init: () => InitReturn;
