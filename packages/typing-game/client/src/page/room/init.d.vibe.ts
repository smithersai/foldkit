import { type Update } from 'foldkit';
import { AppRoute } from '../../route.vibe';
import { RoomsClient } from '../../rpc.vibe';
import { Message } from './message.vibe';
import { Model } from './model.vibe';
export type InitReturn = Update.Return<Model, Message, RoomsClient>;
export declare const init: (route: AppRoute) => InitReturn;
