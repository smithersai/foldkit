import { Effect, Schema } from "effect";
import { Runtime } from 'foldkit';
import { Message } from './message.vibe';
import { Model } from './model.vibe';
export declare const Flags: Schema.Struct<{
    readonly maybeSession: Schema.Option<Schema.Struct<{
        readonly userId: Schema.String;
        readonly email: Schema.String;
        readonly name: Schema.String;
    }>>;
}>;
export declare const flags: Effect.Effect<Flags>;
export type Flags = typeof Flags.Type;
export declare const init: Runtime.RoutingApplicationInit<Model, Message, Flags>;
