import { Effect, Option, Schema } from 'effect';
import * as Command from 'foldkit/command';
import { type ChildAttribute, type Html } from 'foldkit/html';
import * as Mount from 'foldkit/mount';
import * as Update from 'foldkit/update';
import { AnchorConfig } from '../anchor/index.js';
/** Schema for the popover component's state, tracking open/closed status and animation lifecycle. */
export declare const Model: Schema.Struct<{
    readonly id: Schema.String;
    readonly isOpen: Schema.Boolean;
    readonly isAnimated: Schema.Boolean;
    readonly isModal: Schema.Boolean;
    readonly contentFocus: Schema.Boolean;
    readonly animation: Schema.Struct<{
        readonly id: Schema.String;
        readonly isShowing: Schema.Boolean;
        readonly transitionState: Schema.Literals<readonly ["Idle", "EnterStart", "EnterAnimating", "LeaveStart", "LeaveAnimating"]>;
        readonly transitionGeneration: Schema.Number;
    }>;
    readonly maybeLastButtonPointerType: Schema.Option<Schema.String>;
}>;
export type Model = typeof Model.Type;
/** Union of all messages the popover component can produce. */
export declare const Message: import("foldkit/message").MessageUnion<{
    readonly RequestedOpen: {};
    readonly RequestedClose: {};
    readonly BlurredPanel: {};
    readonly PressedPointerOnButton: {
        pointerType: Schema.String;
        button: Schema.Number;
    };
    readonly CompletedFocusPanel: {};
    readonly CompletedFocusButton: {};
    readonly CompletedLockScroll: {};
    readonly CompletedUnlockScroll: {};
    readonly CompletedInertOthers: {};
    readonly CompletedRestoreInert: {};
    readonly ClickedButton: {};
    readonly IgnoredMouseClick: {};
    readonly SuppressedSpaceScroll: {};
    readonly CompletedAnchorPopover: {};
    readonly CompletedPortalPopoverBackdrop: {};
    readonly GotAnimationMessage: {
        message: import("foldkit/message").MessageUnion<{
            readonly Showed: {};
            readonly Hid: {};
            readonly CompletedWaitForPaint: {
                generation: Schema.Number;
            };
            readonly EndedAnimation: {
                generation: Schema.Number;
            };
        }>;
    };
}>;
export type RequestedOpen = typeof Message.RequestedOpen.Type;
export type RequestedClose = typeof Message.RequestedClose.Type;
export type BlurredPanel = typeof Message.BlurredPanel.Type;
export type PressedPointerOnButton = typeof Message.PressedPointerOnButton.Type;
/** A click on the Popover trigger button. */
export type ClickedButton = typeof Message.ClickedButton.Type;
export type IgnoredMouseClick = typeof Message.IgnoredMouseClick.Type;
export type SuppressedSpaceScroll = typeof Message.SuppressedSpaceScroll.Type;
export type Message = typeof Message.Type;
/** Union of OutMessages the popover component can produce. Handle open and
 *  close transitions in the `foldOutMessage` of the Popover's
 *  `Update.foldChild` config. */
export declare const OutMessage: import("foldkit/message").MessageUnion<{
    readonly Opened: {};
    readonly Closed: {};
}>;
export type OutMessage = typeof OutMessage.Type;
export type Opened = typeof OutMessage.Opened.Type;
export type Closed = typeof OutMessage.Closed.Type;
/** Configuration for creating a Popover Model with `init`.
 *
 *  `isAnimated` enables animation coordination. `isModal` locks page scroll
 *  and marks other elements inert while the Popover is open. Both default to
 *  `false`.
 *
 *  With `contentFocus: true`, the panel has no tab stop and focus leaving
 *  it does not close the Popover. Focus a descendant when opening and
 *  handle focus leaving the content in the application. Defaults to `false`. */
export type InitConfig = Readonly<{
    id: string;
    isAnimated?: boolean;
    isModal?: boolean;
    contentFocus?: boolean;
}>;
/** Creates an initial popover model from a config. Defaults to closed. */
export declare const init: (config: InitConfig) => Model;
/** Returns the bare DOM id of the popover trigger button, derived from the
 *  popover's base id. Use this to associate an external label with the
 *  trigger via a native `<label for={Popover.buttonId(id)}>` or an
 *  `aria-labelledby` reference. */
export declare const buttonId: (id: string) => string;
/** Returns the bare DOM id of the popover arrow, derived from the popover's
 *  base id. The `arrow` bundle already carries this id, so reach for this when
 *  you need the id on its own, such as asserting the panel Mount's `arrowId`
 *  argument in a Scene test. */
export declare const arrowId: (id: string) => string;
type UpdateReturn = Update.ReturnWithOutMessage<Model, Message, OutMessage>;
/** Prevents page scrolling while the popover is open in modal mode. */
export declare const LockScroll: Command.CommandDefinitionNoArgs<"LockScroll", Effect.Effect<{
    readonly _tag: "CompletedLockScroll";
}, never, never>>;
/** Re-enables page scrolling after the popover closes. */
export declare const UnlockScroll: Command.CommandDefinitionNoArgs<"UnlockScroll", Effect.Effect<{
    readonly _tag: "CompletedUnlockScroll";
}, never, never>>;
/** Marks all elements outside the popover as inert for modal behavior. */
export declare const InertOthers: Command.CommandDefinitionWithArgs<"InertOthers", {
    id: Schema.String;
}, Effect.Effect<{
    readonly _tag: "CompletedInertOthers";
}, never, never>>;
/** Removes the inert attribute from elements outside the popover. */
export declare const RestoreInert: Command.CommandDefinitionWithArgs<"RestoreInert", {
    id: Schema.String;
}, Effect.Effect<{
    readonly _tag: "CompletedRestoreInert";
}, never, never>>;
/** Moves focus to the popover panel after opening. */
export declare const FocusPanel: Command.CommandDefinitionWithArgs<"FocusPanel", {
    id: Schema.String;
}, Effect.Effect<{
    readonly _tag: "CompletedFocusPanel";
}, never, never>>;
/** Moves focus back to the popover button after closing. */
export declare const FocusButton: Command.CommandDefinitionWithArgs<"FocusButton", {
    id: Schema.String;
}, Effect.Effect<{
    readonly _tag: "CompletedFocusButton";
}, never, never>>;
/** Detects whether the popover button moved or the leave animation ended. Whichever comes first; both outcomes signal the Animation submodel that leave is complete. */
export declare const DetectMovementOrAnimationEnd: Command.CommandDefinitionWithArgs<"DetectMovementOrAnimationEnd", {
    id: Schema.String;
    generation: Schema.Number;
}, Effect.Effect<{
    readonly _tag: "GotAnimationMessage";
    readonly message: {
        readonly _tag: "Hid";
    } | {
        readonly _tag: "Showed";
    } | {
        readonly _tag: "CompletedWaitForPaint";
        readonly generation: number;
    } | {
        readonly _tag: "EndedAnimation";
        readonly generation: number;
    };
}, never, never>>;
/** Processes a Popover Message and returns the next Model, optional Commands,
 *  and an optional OutMessage. */
export declare const update: (model: Model, message: Message) => Readonly<{
    model: {
        readonly id: string;
        readonly isOpen: boolean;
        readonly isAnimated: boolean;
        readonly isModal: boolean;
        readonly contentFocus: boolean;
        readonly animation: {
            readonly id: string;
            readonly isShowing: boolean;
            readonly transitionState: "EnterAnimating" | "EnterStart" | "Idle" | "LeaveAnimating" | "LeaveStart";
            readonly transitionGeneration: number;
        };
        readonly maybeLastButtonPointerType: Option.Option<string>;
    };
    commands?: Update.Commands<{
        readonly _tag: "BlurredPanel";
    } | {
        readonly _tag: "ClickedButton";
    } | {
        readonly _tag: "CompletedAnchorPopover";
    } | {
        readonly _tag: "CompletedFocusButton";
    } | {
        readonly _tag: "CompletedFocusPanel";
    } | {
        readonly _tag: "CompletedInertOthers";
    } | {
        readonly _tag: "CompletedLockScroll";
    } | {
        readonly _tag: "CompletedPortalPopoverBackdrop";
    } | {
        readonly _tag: "CompletedRestoreInert";
    } | {
        readonly _tag: "CompletedUnlockScroll";
    } | {
        readonly _tag: "IgnoredMouseClick";
    } | {
        readonly _tag: "RequestedClose";
    } | {
        readonly _tag: "RequestedOpen";
    } | {
        readonly _tag: "SuppressedSpaceScroll";
    } | {
        readonly _tag: "GotAnimationMessage";
        readonly message: {
            readonly _tag: "Hid";
        } | {
            readonly _tag: "Showed";
        } | {
            readonly _tag: "CompletedWaitForPaint";
            readonly generation: number;
        } | {
            readonly _tag: "EndedAnimation";
            readonly generation: number;
        };
    } | {
        readonly _tag: "PressedPointerOnButton";
        readonly pointerType: string;
        readonly button: number;
    }, never>;
    outMessage?: {
        readonly _tag: "Closed";
    } | {
        readonly _tag: "Opened";
    };
}>;
/** The anchor-positioning Mount this Popover renders on its panel. Exposed so
 *  Scene tests can call `Scene.Mount.resolve(AnchorPopover, CompletedAnchorPopover())`
 *  to acknowledge the mount produced by the rendered panel. */
export declare const AnchorPopover: Mount.MountDefinitionWithArgs<"AnchorPopover", {
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
    focusSelector: Schema.optional<Schema.String>;
    arrowId: Schema.optional<Schema.String>;
    arrowPadding: Schema.optional<Schema.Number>;
}, {
    readonly _tag: "CompletedAnchorPopover";
}>;
/** The backdrop-portaling Mount this Popover renders. Exposed so Scene tests can
 *  call `Scene.Mount.resolve(PortalPopoverBackdrop, CompletedPortalPopoverBackdrop())` to
 *  acknowledge the mount produced by the rendered backdrop. */
export declare const PortalPopoverBackdrop: Mount.MountDefinitionNoArgs<"PortalPopoverBackdrop", {
    readonly _tag: "CompletedPortalPopoverBackdrop";
}>;
/** Programmatically opens the Popover, updating the Model and returning
 *  focus and modal Commands plus an `Opened` OutMessage. When it is already
 *  open, it is a no-op: no Commands and no OutMessage. */
export declare const open: (model: Model) => UpdateReturn;
/** Programmatically closes the popover. When it was open, updates the Model
 *  and returns focus and modal Commands plus a `Closed` OutMessage. When it
 *  was already closed, it is a no-op: no Commands and no OutMessage. */
export declare const close: (model: Model) => UpdateReturn;
/** Render-time payload published to the consumer's `toView`.
 *
 *  - `button`: attribute bundle for the trigger button.
 *  - `panel`: attribute bundle for the floating panel. Includes the
 *    anchor Mount that positions the panel via Floating UI, ARIA
 *    linkage to the button, and panel keydown and focus-leave handlers.
 *  - `backdrop`: attribute bundle for the modal backdrop. Includes the
 *    portal Mount that moves the backdrop to document.body. Inside a
 *    `<dialog>`, it moves the backdrop to directly before the element it
 *    is rendered in, so render it inside the positioned wrapper that holds
 *    the button. The backdrop's OnClick closes the popover.
 *  - `arrow`: attribute bundle for an arrow element inside the panel.
 *    Carries the id the anchor Mount resolves and hides the element from
 *    assistive technology. Spread it onto your own element and place it
 *    with the `--arrow-x` and `--arrow-y` custom properties Anchor
 *    publishes on the panel. Nothing renders until you do.
 *  - `isVisible`: derived from `isOpen` and the Animation
 *    `transitionState`. The consumer renders the panel + backdrop only
 *    while this is true. */
export type RenderInfo = Readonly<{
    button: ReadonlyArray<ChildAttribute>;
    panel: ReadonlyArray<ChildAttribute>;
    backdrop: ReadonlyArray<ChildAttribute>;
    arrow: ReadonlyArray<ChildAttribute>;
    isVisible: boolean;
}>;
/** Per-render view inputs passed to `view` via `h.submodel`'s `viewInputs` field. */
export type ViewInputs = Readonly<{
    anchor: AnchorConfig;
    toView: (render: RenderInfo) => Html;
    isDisabled?: boolean;
    focusSelector?: string;
    arrowPadding?: number;
    ariaLabel?: string;
    ariaLabelledBy?: string;
}>;
/** Renders a headless popover with a trigger button and a floating panel. */
export declare const view: import("foldkit/submodel").View<{
    readonly id: string;
    readonly isOpen: boolean;
    readonly isAnimated: boolean;
    readonly isModal: boolean;
    readonly contentFocus: boolean;
    readonly animation: {
        readonly id: string;
        readonly isShowing: boolean;
        readonly transitionState: "EnterAnimating" | "EnterStart" | "Idle" | "LeaveAnimating" | "LeaveStart";
        readonly transitionGeneration: number;
    };
    readonly maybeLastButtonPointerType: Option.Option<string>;
}, {
    readonly _tag: "BlurredPanel";
} | {
    readonly _tag: "ClickedButton";
} | {
    readonly _tag: "CompletedAnchorPopover";
} | {
    readonly _tag: "CompletedFocusButton";
} | {
    readonly _tag: "CompletedFocusPanel";
} | {
    readonly _tag: "CompletedInertOthers";
} | {
    readonly _tag: "CompletedLockScroll";
} | {
    readonly _tag: "CompletedPortalPopoverBackdrop";
} | {
    readonly _tag: "CompletedRestoreInert";
} | {
    readonly _tag: "CompletedUnlockScroll";
} | {
    readonly _tag: "IgnoredMouseClick";
} | {
    readonly _tag: "RequestedClose";
} | {
    readonly _tag: "RequestedOpen";
} | {
    readonly _tag: "SuppressedSpaceScroll";
} | {
    readonly _tag: "GotAnimationMessage";
    readonly message: {
        readonly _tag: "Hid";
    } | {
        readonly _tag: "Showed";
    } | {
        readonly _tag: "CompletedWaitForPaint";
        readonly generation: number;
    } | {
        readonly _tag: "EndedAnimation";
        readonly generation: number;
    };
} | {
    readonly _tag: "PressedPointerOnButton";
    readonly pointerType: string;
    readonly button: number;
}, Readonly<{
    anchor: AnchorConfig;
    toView: (render: RenderInfo) => Html;
    isDisabled?: boolean;
    focusSelector?: string;
    arrowPadding?: number;
    ariaLabel?: string;
    ariaLabelledBy?: string;
}>>;
export {};
