import { Effect, Schema } from 'effect';
import { Runtime } from 'foldkit';
import { Message } from './message.vibe';
import { Model } from './model.vibe';
import { subscriptions } from './subscription.vibe';
import { update } from './update.vibe';
import { view } from './view/index.ts';
export declare const Flags: Schema.Struct<{
    readonly maybeSavedCanvas: Schema.Option<Schema.Struct<{
        readonly grid: Schema.$Array<Schema.$Array<Schema.Option<Schema.Literals<readonly [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]>>>>;
        readonly gridSize: Schema.Number;
        readonly paletteThemeIndex: Schema.Number;
        readonly selectedColorIndex: Schema.Literals<readonly [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]>;
    }>>;
}>;
export type Flags = typeof Flags.Type;
export declare const flags: Effect.Effect<Flags>;
export declare const init: Runtime.ApplicationInit<Model, Message, Flags>;
export { Message, Model, subscriptions, update, view };
