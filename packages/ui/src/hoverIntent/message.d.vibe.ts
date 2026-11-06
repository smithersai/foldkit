import { Schema } from 'effect';
/** Union of all Messages the HoverIntent component can produce. */
export declare const Message: import("foldkit/message").MessageUnion<{
    readonly EnteredTrigger: {};
    readonly LeftTrigger: {};
    readonly EnteredPanel: {};
    readonly LeftPanel: {};
    readonly FocusedTrigger: {};
    readonly BlurredTrigger: {};
    readonly FocusedPanel: {};
    readonly BlurredPanel: {};
    readonly PressedEscape: {
        source: Schema.Literals<readonly ["Trigger", "Panel"]>;
    };
    readonly CompletedWaitBeforeOpening: {
        version: Schema.Number;
    };
    readonly CompletedWaitBeforeClosing: {
        version: Schema.Number;
    };
}>;
export type Message = typeof Message.Type;
export type EnteredTrigger = typeof Message.EnteredTrigger.Type;
export type LeftTrigger = typeof Message.LeftTrigger.Type;
export type EnteredPanel = typeof Message.EnteredPanel.Type;
export type LeftPanel = typeof Message.LeftPanel.Type;
export type FocusedTrigger = typeof Message.FocusedTrigger.Type;
export type BlurredTrigger = typeof Message.BlurredTrigger.Type;
export type FocusedPanel = typeof Message.FocusedPanel.Type;
export type BlurredPanel = typeof Message.BlurredPanel.Type;
export type PressedEscape = typeof Message.PressedEscape.Type;
export type CompletedWaitBeforeOpening = typeof Message.CompletedWaitBeforeOpening.Type;
export type CompletedWaitBeforeClosing = typeof Message.CompletedWaitBeforeClosing.Type;
/** Union of visibility-transition OutMessages emitted by HoverIntent. */
export declare const OutMessage: import("foldkit/message").MessageUnion<{
    readonly Opened: {};
    readonly Closed: {};
}>;
export type OutMessage = typeof OutMessage.Type;
export type Opened = typeof OutMessage.Opened.Type;
export type Closed = typeof OutMessage.Closed.Type;
