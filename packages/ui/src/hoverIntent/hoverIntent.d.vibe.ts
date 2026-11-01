import { Duration, Effect, Option, Schema } from 'effect';
import * as Command from 'foldkit/command';
import { type ChildAttribute, type Html } from 'foldkit/html';
import * as Update from 'foldkit/update';
import { Message, OutMessage } from './message.vibe';
/** Schema for HoverIntent state. It tracks pointer and focus engagement over a trigger and its panel, visibility, delay timers, and Escape dismissal. */
export declare const Model: Schema.Struct<{
    readonly isOpen: Schema.Boolean;
    readonly isTriggerHovered: Schema.Boolean;
    readonly isPanelHovered: Schema.Boolean;
    readonly maybeFocusLocation: Schema.Option<Schema.Literals<readonly ["Trigger", "Panel"]>>;
    readonly isDismissed: Schema.Boolean;
    readonly openDelay: Schema.DurationFromMillis;
    readonly closeDelay: Schema.DurationFromMillis;
    readonly pendingOpenVersion: Schema.Number;
    readonly pendingCloseVersion: Schema.Number;
}>;
export type Model = typeof Model.Type;
/** Configuration for creating a HoverIntent Model. */
export type InitConfig = Readonly<{
    openDelay?: Duration.Input;
    closeDelay?: Duration.Input;
}>;
/** Creates a HoverIntent Model. Pointer entry opens after 200 milliseconds and pointer departure closes after a 300-millisecond grace period by default. Focus entry opens immediately, and focus departure closes without that pointer grace period. */
export declare const init: (config?: InitConfig) => Model;
/** Waits before opening, then emits the version that scheduled the wait. */
export declare const WaitBeforeOpening: Command.CommandDefinitionWithArgs<"WaitBeforeOpening", {
    delay: Schema.DurationFromMillis;
    version: Schema.Number;
}, Effect.Effect<{
    readonly _tag: "CompletedWaitBeforeOpening";
    readonly version: number;
}, never, never>>;
/** Waits before closing, then emits the version that scheduled the wait. */
export declare const WaitBeforeClosing: Command.CommandDefinitionWithArgs<"WaitBeforeClosing", {
    delay: Schema.DurationFromMillis;
    version: Schema.Number;
}, Effect.Effect<{
    readonly _tag: "CompletedWaitBeforeClosing";
    readonly version: number;
}, never, never>>;
type UpdateReturn = Update.ReturnWithOutMessage<Model, Message, OutMessage>;
/** Programmatically closes HoverIntent immediately, invalidating pending
 *  transitions and suppressing reopening until the trigger disengages. */
export declare const close: (model: Model) => UpdateReturn;
/** Processes a HoverIntent Message and returns the next Model, optional Commands, and an optional OutMessage. */
export declare const update: (model: Model, message: Message) => UpdateReturn;
/** Render-time payload published to the consumer's `toView`.
 *
 * - `trigger`: event attributes for the element that starts intent.
 * - `panel`: event attributes for the element that remains open while hovered or focused.
 * - `isVisible`: whether the consumer should render its panel. */
export type RenderInfo = Readonly<{
    trigger: ReadonlyArray<ChildAttribute>;
    panel: ReadonlyArray<ChildAttribute>;
    isVisible: boolean;
}>;
/** Per-render view inputs passed to `view` via `h.submodel`'s `viewInputs` field. */
export type ViewInputs = Readonly<{
    /** Selector for the trigger to focus before Escape removes panel content. If it does not resolve to a focusable element, HoverIntent leaves fallback focus behavior to the browser. */
    focusTriggerSelector?: string;
    toView: (render: RenderInfo) => Html;
}>;
/** Renders headless HoverIntent event bundles. It owns no markup, ARIA semantics, positioning, or styling. */
export declare const view: import("foldkit/submodel").View<{
    readonly isOpen: boolean;
    readonly isTriggerHovered: boolean;
    readonly isPanelHovered: boolean;
    readonly maybeFocusLocation: Option.Option<"Panel" | "Trigger">;
    readonly isDismissed: boolean;
    readonly openDelay: Duration.Duration;
    readonly closeDelay: Duration.Duration;
    readonly pendingOpenVersion: number;
    readonly pendingCloseVersion: number;
}, {
    readonly _tag: "BlurredPanel";
} | {
    readonly _tag: "BlurredTrigger";
} | {
    readonly _tag: "EnteredPanel";
} | {
    readonly _tag: "EnteredTrigger";
} | {
    readonly _tag: "FocusedPanel";
} | {
    readonly _tag: "FocusedTrigger";
} | {
    readonly _tag: "LeftPanel";
} | {
    readonly _tag: "LeftTrigger";
} | {
    readonly _tag: "CompletedWaitBeforeClosing";
    readonly version: number;
} | {
    readonly _tag: "CompletedWaitBeforeOpening";
    readonly version: number;
} | {
    readonly _tag: "PressedEscape";
    readonly source: "Panel" | "Trigger";
}, Readonly<{
    /** Selector for the trigger to focus before Escape removes panel content. If it does not resolve to a focusable element, HoverIntent leaves fallback focus behavior to the browser. */
    focusTriggerSelector?: string;
    toView: (render: RenderInfo) => Html;
}>>;
export {};
