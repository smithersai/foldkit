import { Schema } from 'effect';
/** Union of all messages the tooltip component can produce. */
export declare const Message: import("foldkit/message").MessageUnion<{
    readonly EnteredTrigger: {};
    readonly LeftTrigger: {};
    readonly FocusedTrigger: {};
    readonly BlurredTrigger: {};
    readonly PressedEscape: {};
    readonly PressedPointerOnTrigger: {
        pointerType: Schema.String;
    };
    readonly CompletedWaitBeforeShowing: {
        version: Schema.Number;
    };
    readonly CompletedAnchorTooltip: {};
}>;
export type EnteredTrigger = typeof Message.EnteredTrigger.Type;
export type LeftTrigger = typeof Message.LeftTrigger.Type;
export type FocusedTrigger = typeof Message.FocusedTrigger.Type;
export type BlurredTrigger = typeof Message.BlurredTrigger.Type;
export type PressedEscape = typeof Message.PressedEscape.Type;
export type PressedPointerOnTrigger = typeof Message.PressedPointerOnTrigger.Type;
export type Message = typeof Message.Type;
/** Union of out-messages the tooltip component can produce. */
export declare const OutMessage: import("foldkit/message").MessageUnion<{
    readonly Shown: {};
    readonly Hidden: {};
}>;
export type Shown = typeof OutMessage.Shown.Type;
export type Hidden = typeof OutMessage.Hidden.Type;
export type OutMessage = typeof OutMessage.Type;
