import { Schema } from 'effect';
/** Schema for the animation lifecycle state, tracking enter/leave phases. */
export declare const TransitionState: Schema.Literals<readonly ["Idle", "EnterStart", "EnterAnimating", "LeaveStart", "LeaveAnimating"]>;
export type TransitionState = typeof TransitionState.Type;
/** Schema for Animation state, including the transition generation used to reject
 *  stale Command results. */
export declare const Model: Schema.Struct<{
    readonly id: Schema.String;
    readonly isShowing: Schema.Boolean;
    readonly transitionState: Schema.Literals<readonly ["Idle", "EnterStart", "EnterAnimating", "LeaveStart", "LeaveAnimating"]>;
    readonly transitionGeneration: Schema.Number;
}>;
export type Model = typeof Model.Type;
/** Union of all messages the animation component can produce. */
export declare const Message: import("foldkit/message").MessageUnion<{
    readonly Showed: {};
    readonly Hid: {};
    readonly CompletedWaitForPaint: {
        generation: Schema.Number;
    };
    readonly EndedAnimation: {
        generation: Schema.Number;
    };
}>;
export type Message = typeof Message.Type;
export type Showed = typeof Message.Showed.Type;
export type Hid = typeof Message.Hid.Type;
/** Union of the facts Animation reports to its parent. */
export declare const OutMessage: import("foldkit/message").MessageUnion<{
    readonly StartedLeaveAnimating: {
        generation: Schema.Number;
    };
    readonly TransitionedOut: {};
}>;
export type OutMessage = typeof OutMessage.Type;
/** Configuration for creating an animation model with `init`. */
export type InitConfig = Readonly<{
    id: string;
    isShowing?: boolean;
}>;
/** Creates an initial animation model from a config. Defaults to hidden. */
export declare const init: (config: InitConfig) => Model;
