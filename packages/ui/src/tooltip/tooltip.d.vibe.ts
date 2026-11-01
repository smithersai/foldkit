import { Duration, Effect, Option, Schema } from 'effect';
import * as Command from 'foldkit/command';
import { type ChildAttribute, type Html } from 'foldkit/html';
import * as Mount from 'foldkit/mount';
import { type Reflect } from 'foldkit/submodel';
import * as Update from 'foldkit/update';
import { AnchorConfig } from '../anchor/index.js';
import { Message, OutMessage } from './message.vibe';
/** Schema for the tooltip component's state. `isOpen` is visibility; `isHovered` tracks pointer on trigger; `isFocused` tracks tooltip-affirming focus on the trigger (focus arriving without a preceding mouse press, like keyboard, touch, or pen; mouse-click-induced focus is excluded since it doesn't affirm the user wants the tooltip visible); `isDismissed` suppresses re-opening after the user dismissed the tooltip (via Escape) until they disengage (leave or blur). `showDelay` is the hover-to-show duration. `maybeLastPointerType` records the most recent pointer type that pressed the trigger, so a mouse-click-induced focus can be distinguished from other focus. */
export declare const Model: Schema.Struct<{
    readonly id: Schema.String;
    readonly isOpen: Schema.Boolean;
    readonly isHovered: Schema.Boolean;
    readonly isFocused: Schema.Boolean;
    readonly isDismissed: Schema.Boolean;
    readonly showDelay: Schema.DurationFromMillis;
    readonly pendingShowVersion: Schema.Number;
    readonly maybeLastPointerType: Schema.Option<Schema.String>;
}>;
export type Model = typeof Model.Type;
/** Returns the bare DOM id of the tooltip trigger button, derived from the
 *  tooltip's base id. Use this to associate an external label with the
 *  trigger via a native `<label for={Tooltip.triggerId(id)}>` or an
 *  `aria-labelledby` reference. */
export declare const triggerId: (id: string) => string;
/** Configuration for creating a tooltip model with `init`. */
export type InitConfig = Readonly<{
    id: string;
    showDelay?: Duration.Input;
}>;
/** Creates an initial tooltip model from a config. Defaults to hidden. */
export declare const init: (config: InitConfig) => Model;
/** Waits for the tooltip's show delay before emitting
 *  `CompletedWaitBeforeShowing`. */
export declare const WaitBeforeShowing: Command.CommandDefinitionWithArgs<"WaitBeforeShowing", {
    delay: Schema.DurationFromMillis;
    version: Schema.Number;
}, Effect.Effect<{
    readonly _tag: "CompletedWaitBeforeShowing";
    readonly version: number;
}, never, never>>;
/** The anchor-positioning Mount this Tooltip renders on its panel. */
export declare const AnchorTooltip: Mount.MountDefinitionWithArgs<"AnchorTooltip", {
    buttonId: Schema.String;
    anchor: Schema.Struct<{
        readonly placement: Schema.optional<Schema.Literals<readonly ["top", "right", "bottom", "left", "top-start", "top-end", "right-start", "right-end", "bottom-start", "bottom-end", "left-start", "left-end"]>>;
        readonly gap: Schema.optional<Schema.Number>;
        readonly offset: Schema.optional<Schema.Number>;
        readonly padding: Schema.optional<Schema.Union<readonly [Schema.Number, Schema.Struct<{
            readonly top: Schema.optionalKey<Schema.Number>;
            readonly right: Schema.optionalKey<Schema.Number>;
            readonly bottom: Schema.optionalKey<Schema.Number>;
            readonly left: Schema.optionalKey<Schema.Number>;
        }>]>>;
        readonly portal: Schema.optional<Schema.Boolean>;
        readonly isPlacementLocked: Schema.optional<Schema.Boolean>;
    }>;
}, {
    readonly _tag: "CompletedAnchorTooltip";
}>;
/** Processes a Tooltip Message and returns the next Model, optional Commands,
 *  and an optional OutMessage. `Shown`/`Hidden` fire only on `isOpen`
 *  transitions, so consumers don't get spurious events for messages that
 *  only update hover/focus/delay state without changing visibility. */
export declare const update: (model: Model, message: Message) => Update.ReturnWithOutMessage<Model, Message, OutMessage>;
/** Reflects an externally-sourced hover show-delay onto the Model without
 *  emitting an OutMessage. Use to mirror an external config value (a user
 *  preference, a restored setting) onto the tooltip. */
export declare const reflectShowDelay: Reflect<Model, Duration.Input>;
/** Render-time payload published to the consumer's `toView`.
 *
 *  - `trigger`: attribute bundle for the trigger element. Carries the
 *    hover/focus/keyboard handlers + ARIA `aria-describedby` linking to
 *    the panel.
 *  - `panel`: attribute bundle for the panel element. Carries the
 *    `role="tooltip"`, the anchor Mount that positions the panel via
 *    Floating UI, and a `data-open` attribute when visible.
 *  - `isVisible`: derived state. The consumer decides whether to render
 *    the panel conditionally on this. */
export type RenderInfo = Readonly<{
    trigger: ReadonlyArray<ChildAttribute>;
    panel: ReadonlyArray<ChildAttribute>;
    isVisible: boolean;
}>;
/** Per-render view inputs passed to `view` via `h.submodel`'s `viewInputs` field. */
export type ViewInputs = Readonly<{
    anchor: AnchorConfig;
    toView: (render: RenderInfo) => Html;
    isDisabled?: boolean;
    ariaLabel?: string;
    ariaLabelledBy?: string;
}>;
/** Renders a headless tooltip with an anchored non-interactive panel.
 *  Shows on hover (after delay) or focus (from keyboard, touch, or pen;
 *  mouse-click focus is excluded). Hides on leave, blur, or Escape. */
export declare const view: import("foldkit/submodel").View<{
    readonly id: string;
    readonly isOpen: boolean;
    readonly isHovered: boolean;
    readonly isFocused: boolean;
    readonly isDismissed: boolean;
    readonly showDelay: Duration.Duration;
    readonly pendingShowVersion: number;
    readonly maybeLastPointerType: Option.Option<string>;
}, {
    readonly _tag: "BlurredTrigger";
} | {
    readonly _tag: "CompletedAnchorTooltip";
} | {
    readonly _tag: "EnteredTrigger";
} | {
    readonly _tag: "FocusedTrigger";
} | {
    readonly _tag: "LeftTrigger";
} | {
    readonly _tag: "PressedEscape";
} | {
    readonly _tag: "CompletedWaitBeforeShowing";
    readonly version: number;
} | {
    readonly _tag: "PressedPointerOnTrigger";
    readonly pointerType: string;
}, Readonly<{
    anchor: AnchorConfig;
    toView: (render: RenderInfo) => Html;
    isDisabled?: boolean;
    ariaLabel?: string;
    ariaLabelledBy?: string;
}>>;
