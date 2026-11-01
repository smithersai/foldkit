import { Effect, Schema } from 'effect';
import { Runtime } from 'foldkit';
import { Message } from './message.vibe';
import { Model } from './model.vibe';
import { subscriptions } from './subscription.vibe';
import { update } from './update.vibe';
import { view } from './view/index.js';
export declare const Flags: Schema.Struct<{
    readonly maybeSavedBoard: Schema.Option<Schema.Struct<{
        readonly columns: Schema.$Array<Schema.Struct<{
            readonly id: Schema.String;
            readonly name: Schema.String;
            readonly cards: Schema.$Array<Schema.Struct<{
                readonly id: Schema.String;
                readonly title: Schema.String;
                readonly description: Schema.String;
                readonly sortKey: Schema.String;
            }>>;
        }>>;
    }>>;
}>;
export type Flags = typeof Flags.Type;
export declare const flags: Effect.Effect<Flags>;
export declare const init: Runtime.ApplicationInit<Model, Message, Flags>;
export { Message, Model, subscriptions, update, view };
