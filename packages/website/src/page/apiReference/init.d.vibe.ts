import { Option } from "effect";
import { Update } from 'foldkit';
import { Message } from './message.vibe';
import { type ApiData, type Model } from './model.vibe';
export type InitReturn = Update.Return<Model, Message>;
export declare const init: () => InitReturn;
export declare const boot: (maybeApiData?: Option.Option<ApiData>) => InitReturn;
