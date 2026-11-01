import { Effect, Schema } from 'effect';
import { type Update } from 'foldkit';
import * as Command from 'foldkit/command';
import { type Hid, Message, type Model, OutMessage, type Showed } from './schema.vibe';
type UpdateReturn = Update.ReturnWithOutMessage<Model, Message, OutMessage>;
/** Waits for paint via double-rAF, then reports the transition generation that
 *  scheduled the wait. */
export declare const WaitForPaint: Command.CommandDefinitionWithArgs<"WaitForPaint", {
    generation: Schema.Number;
}, Effect.Effect<{
    readonly _tag: "CompletedWaitForPaint";
    readonly generation: number;
}, never, never>>;
/** Waits for all CSS transitions and keyframe animations on the element to
 *  settle, then reports the transition generation that scheduled the wait. */
export declare const WaitForAnimationSettled: Command.CommandDefinitionWithArgs<"WaitForAnimationSettled", {
    id: Schema.String;
    generation: Schema.Number;
}, Effect.Effect<{
    readonly _tag: "EndedAnimation";
    readonly generation: number;
}, never, never>>;
/** Processes an Animation Message and returns the next Model, optional
 *  Commands, and an optional OutMessage. `Showed` and `Hid` start a transition
 *  but cannot finish one, so direct calls with either Message return a plain
 *  update result. Results from an earlier transition generation leave the Model
 *  unchanged. */
export declare function update(model: Model, message: Showed | Hid): Update.Return<Model, Message>;
export declare function update(model: Model, message: Message): UpdateReturn;
/** Programmatically starts the enter lifecycle. */
export declare const show: (model: Model) => Update.Return<Model, Message>;
/** Programmatically starts the leave lifecycle. */
export declare const hide: (model: Model) => Update.Return<Model, Message>;
/** Toggles the animation between its shown and hidden states. */
export declare const toggle: (model: Model) => Update.Return<Model, Message>;
/** Creates the standard leave Command for the Model's current transition. Use
 *  this when handling `StartedLeaveAnimating` unless the component needs its
 *  own settlement strategy. */
export declare const defaultLeaveCommand: (model: Model) => Command.Command<Message>;
export {};
