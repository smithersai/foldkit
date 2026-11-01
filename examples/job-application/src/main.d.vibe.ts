import { Effect, Schema } from "effect";
import { Runtime } from 'foldkit';
import { Message } from './message.vibe';
import { Model } from './model.vibe';
import { update } from './update.vibe';
import { view } from './view/view.vibe';
export declare const Flags: Schema.Struct<{
    readonly today: Schema.Struct<{
        readonly year: Schema.Int;
        readonly month: Schema.Int;
        readonly day: Schema.Int;
    }>;
    readonly initialWorkHistoryEntryId: Schema.String;
    readonly initialEducationEntryId: Schema.String;
    readonly initialSkillsEntryId: Schema.String;
}>;
export type Flags = typeof Flags.Type;
export declare const flags: Effect.Effect<Flags>;
export declare const init: Runtime.ApplicationInit<Model, Message, Flags>;
export { Message, Model, update, view };
