import { Runtime } from 'foldkit';
import { Message } from './message.vibe';
import { Model } from './model.vibe';
import { subscriptions } from './subscription.vibe';
import { update } from './update.js';
import { view } from './view.vibe';
export declare const init: Runtime.ApplicationInit<Model, Message>;
export { Message, Model, subscriptions, update, view };
