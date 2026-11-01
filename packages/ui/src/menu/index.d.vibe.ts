import { Effect, Option, Schema } from 'effect';
import * as Command from 'foldkit/command';
import type { ChildAttribute, Html } from 'foldkit/html';
import * as Mount from 'foldkit/mount';
import { type View as SubmodelView } from 'foldkit/submodel';
import * as Update from 'foldkit/update';
import { AnchorConfig } from '../anchor/index.js';
import { groupContiguous } from '../group.vibe';
import { resolveTypeaheadMatch } from '../typeahead.vibe';
/** Schema for the activation trigger: whether the user interacted via mouse or keyboard. */
export declare const ActivationTrigger: Schema.Literals<readonly ["Pointer", "Keyboard"]>;
export type ActivationTrigger = typeof ActivationTrigger.Type;
/** Schema for the menu component's state, tracking open/closed status, active item, activation trigger, and typeahead search. */
export declare const Model: Schema.Struct<{
    readonly id: Schema.String;
    readonly isOpen: Schema.Boolean;
    readonly isAnimated: Schema.Boolean;
    readonly isModal: Schema.Boolean;
    readonly animation: Schema.Struct<{
        readonly id: Schema.String;
        readonly isShowing: Schema.Boolean;
        readonly transitionState: Schema.Literals<readonly ["Idle", "EnterStart", "EnterAnimating", "LeaveStart", "LeaveAnimating"]>;
        readonly transitionGeneration: Schema.Number;
    }>;
    readonly maybeActiveItemIndex: Schema.Option<Schema.Number>;
    readonly activationTrigger: Schema.Literals<readonly ["Pointer", "Keyboard"]>;
    readonly searchQuery: Schema.String;
    readonly searchVersion: Schema.Number;
    readonly maybeLastPointerPosition: Schema.Option<Schema.Struct<{
        readonly screenX: Schema.Number;
        readonly screenY: Schema.Number;
    }>>;
    readonly maybeLastButtonPointerType: Schema.Option<Schema.String>;
    readonly maybePointerOrigin: Schema.Option<Schema.Struct<{
        readonly screenX: Schema.Number;
        readonly screenY: Schema.Number;
        readonly timeStamp: Schema.Number;
    }>>;
}>;
export type Model = typeof Model.Type;
/** Union of all messages the menu component can produce. */
export declare const Message: import("foldkit/message").MessageUnion<{
    readonly Opened: {
        maybeActiveItemIndex: Schema.Option<Schema.Number>;
    };
    readonly Closed: {};
    readonly BlurredItems: {};
    readonly ActivatedItem: {
        index: Schema.Number;
        activationTrigger: Schema.Literals<readonly ["Pointer", "Keyboard"]>;
    };
    readonly DeactivatedItem: {};
    readonly SelectedItem: {
        index: Schema.Number;
        item: Schema.String;
    };
    readonly RequestedItemClick: {
        index: Schema.Number;
    };
    readonly Searched: {
        key: Schema.String;
        maybeTargetIndex: Schema.Option<Schema.Number>;
    };
    readonly CompletedDelayClearSearch: {
        version: Schema.Number;
    };
    readonly MovedPointerOverItem: {
        index: Schema.Number;
        screenX: Schema.Number;
        screenY: Schema.Number;
    };
    readonly CompletedFocusItems: {};
    readonly CompletedFocusButton: {};
    readonly CompletedLockScroll: {};
    readonly CompletedUnlockScroll: {};
    readonly CompletedInertOthers: {};
    readonly CompletedRestoreInert: {};
    readonly CompletedScrollIntoView: {};
    readonly CompletedClickItem: {};
    readonly ClickedButton: {};
    readonly IgnoredMouseClick: {};
    readonly SuppressedSpaceScroll: {};
    readonly CompletedAnchorMenu: {};
    readonly CompletedPortalMenuBackdrop: {};
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
    readonly PressedPointerOnButton: {
        pointerType: Schema.String;
        button: Schema.Number;
        screenX: Schema.Number;
        screenY: Schema.Number;
        timeStamp: Schema.Number;
    };
    readonly ReleasedPointerOnItems: {
        screenX: Schema.Number;
        screenY: Schema.Number;
        timeStamp: Schema.Number;
    };
}>;
export type Message = typeof Message.Type;
/** Union of OutMessages the menu component can produce. The parent's
 *  `Update.foldChild` config handles them through `foldOutMessage`. */
export declare const OutMessage: import("foldkit/message").MessageUnion<{
    readonly Selected: {
        value: Schema.String;
        index: Schema.Number;
    };
}>;
export type Selected<Value extends string = string> = Readonly<{
    readonly _tag: 'Selected';
    readonly value: Value;
    readonly index: number;
}>;
/** Generic over `Value extends string` so consumers using the typed
 *  `Menu.create<MyUnion>()` factory receive `value: MyUnion` in the
 *  `Selected` OutMessage. Defaults to `string`. */
export type OutMessage<Value extends string = string> = Selected<Value>;
export type Opened = typeof Message.Opened.Type;
export type Closed = typeof Message.Closed.Type;
export type BlurredItems = typeof Message.BlurredItems.Type;
export type ActivatedItem = typeof Message.ActivatedItem.Type;
export type DeactivatedItem = typeof Message.DeactivatedItem.Type;
export type SelectedItem = typeof Message.SelectedItem.Type;
export type MovedPointerOverItem = typeof Message.MovedPointerOverItem.Type;
export type RequestedItemClick = typeof Message.RequestedItemClick.Type;
export type Searched = typeof Message.Searched.Type;
export type CompletedDelayClearSearch = typeof Message.CompletedDelayClearSearch.Type;
/** A click on the Menu trigger button. */
export type ClickedButton = typeof Message.ClickedButton.Type;
export type IgnoredMouseClick = typeof Message.IgnoredMouseClick.Type;
export type SuppressedSpaceScroll = typeof Message.SuppressedSpaceScroll.Type;
export type PressedPointerOnButton = typeof Message.PressedPointerOnButton.Type;
export type ReleasedPointerOnItems = typeof Message.ReleasedPointerOnItems.Type;
/** Configuration for creating a menu model with `init`. `isAnimated` enables animation coordination (default `false`). `isModal` locks page scroll and inerts other elements when open (default `false`). */
export type InitConfig = Readonly<{
    id: string;
    isAnimated?: boolean;
    isModal?: boolean;
}>;
/** Creates an initial menu model from a config. Defaults to closed with no active item. */
export declare const init: (config: InitConfig) => Model;
/** Returns the bare DOM id of the menu trigger button, derived from the
 *  menu's base id. Use this to associate an external label with the trigger
 *  via a native `<label for={Menu.buttonId(id)}>` or an `aria-labelledby`
 *  reference. */
export declare const buttonId: (id: string) => string;
type UpdateReturn = Update.ReturnWithOutMessage<Model, Message, OutMessage>;
/** Prevents page scrolling while the menu is open. */
export declare const LockScroll: Command.CommandDefinitionNoArgs<"LockScroll", Effect.Effect<{
    readonly _tag: "CompletedLockScroll";
}, never, never>>;
/** Re-enables page scrolling after the menu closes. */
export declare const UnlockScroll: Command.CommandDefinitionNoArgs<"UnlockScroll", Effect.Effect<{
    readonly _tag: "CompletedUnlockScroll";
}, never, never>>;
/** Marks all elements outside the menu as inert for modal behavior. */
export declare const InertOthers: Command.CommandDefinitionWithArgs<"InertOthers", {
    id: Schema.String;
}, Effect.Effect<{
    readonly _tag: "CompletedInertOthers";
}, never, never>>;
/** Removes the inert attribute from elements outside the menu. */
export declare const RestoreInert: Command.CommandDefinitionWithArgs<"RestoreInert", {
    id: Schema.String;
}, Effect.Effect<{
    readonly _tag: "CompletedRestoreInert";
}, never, never>>;
/** Moves focus to the menu items container after opening. */
export declare const FocusItems: Command.CommandDefinitionWithArgs<"FocusItems", {
    id: Schema.String;
}, Effect.Effect<{
    readonly _tag: "CompletedFocusItems";
}, never, never>>;
/** Moves focus back to the menu button after closing. */
export declare const FocusButton: Command.CommandDefinitionWithArgs<"FocusButton", {
    id: Schema.String;
}, Effect.Effect<{
    readonly _tag: "CompletedFocusButton";
}, never, never>>;
/** Scrolls the active menu item into view after keyboard navigation. */
export declare const ScrollIntoView: Command.CommandDefinitionWithArgs<"ScrollIntoView", {
    id: Schema.String;
    index: Schema.Number;
}, Effect.Effect<{
    readonly _tag: "CompletedScrollIntoView";
}, never, never>>;
/** Programmatically clicks the active menu item's DOM element. */
export declare const ClickItem: Command.CommandDefinitionWithArgs<"ClickItem", {
    id: Schema.String;
    index: Schema.Number;
}, Effect.Effect<{
    readonly _tag: "CompletedClickItem";
}, never, never>>;
/** Waits for the typeahead search debounce period before clearing the query. */
export declare const DelayClearSearch: Command.CommandDefinitionWithArgs<"DelayClearSearch", {
    version: Schema.Number;
}, Effect.Effect<{
    readonly _tag: "CompletedDelayClearSearch";
    readonly version: number;
}, never, never>>;
/** Detects whether the menu button moved or the leave animation ended. Whichever comes first; both outcomes signal the Animation submodel that leave is complete. */
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
/** Processes a Menu Message and returns the next Model, optional Commands, and
 *  an optional OutMessage. */
export declare const update: (model: Model, message: Message) => Readonly<{
    model: {
        readonly id: string;
        readonly isOpen: boolean;
        readonly isAnimated: boolean;
        readonly isModal: boolean;
        readonly animation: {
            readonly id: string;
            readonly isShowing: boolean;
            readonly transitionState: "EnterAnimating" | "EnterStart" | "Idle" | "LeaveAnimating" | "LeaveStart";
            readonly transitionGeneration: number;
        };
        readonly maybeActiveItemIndex: Option.Option<number>;
        readonly activationTrigger: "Keyboard" | "Pointer";
        readonly searchQuery: string;
        readonly searchVersion: number;
        readonly maybeLastPointerPosition: Option.Option<{
            readonly screenX: number;
            readonly screenY: number;
        }>;
        readonly maybeLastButtonPointerType: Option.Option<string>;
        readonly maybePointerOrigin: Option.Option<{
            readonly screenX: number;
            readonly screenY: number;
            readonly timeStamp: number;
        }>;
    };
    commands?: Update.Commands<{
        readonly _tag: "BlurredItems";
    } | {
        readonly _tag: "ClickedButton";
    } | {
        readonly _tag: "Closed";
    } | {
        readonly _tag: "CompletedAnchorMenu";
    } | {
        readonly _tag: "CompletedClickItem";
    } | {
        readonly _tag: "CompletedFocusButton";
    } | {
        readonly _tag: "CompletedFocusItems";
    } | {
        readonly _tag: "CompletedInertOthers";
    } | {
        readonly _tag: "CompletedLockScroll";
    } | {
        readonly _tag: "CompletedPortalMenuBackdrop";
    } | {
        readonly _tag: "CompletedRestoreInert";
    } | {
        readonly _tag: "CompletedScrollIntoView";
    } | {
        readonly _tag: "CompletedUnlockScroll";
    } | {
        readonly _tag: "DeactivatedItem";
    } | {
        readonly _tag: "IgnoredMouseClick";
    } | {
        readonly _tag: "SuppressedSpaceScroll";
    } | {
        readonly _tag: "ActivatedItem";
        readonly index: number;
        readonly activationTrigger: "Keyboard" | "Pointer";
    } | {
        readonly _tag: "CompletedDelayClearSearch";
        readonly version: number;
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
        readonly _tag: "MovedPointerOverItem";
        readonly index: number;
        readonly screenX: number;
        readonly screenY: number;
    } | {
        readonly _tag: "Opened";
        readonly maybeActiveItemIndex: Option.Option<number>;
    } | {
        readonly _tag: "PressedPointerOnButton";
        readonly pointerType: string;
        readonly button: number;
        readonly screenX: number;
        readonly screenY: number;
        readonly timeStamp: number;
    } | {
        readonly _tag: "ReleasedPointerOnItems";
        readonly screenX: number;
        readonly screenY: number;
        readonly timeStamp: number;
    } | {
        readonly _tag: "RequestedItemClick";
        readonly index: number;
    } | {
        readonly _tag: "Searched";
        readonly key: string;
        readonly maybeTargetIndex: Option.Option<number>;
    } | {
        readonly _tag: "SelectedItem";
        readonly index: number;
        readonly item: string;
    }, never>;
    outMessage?: Readonly<{
        readonly _tag: 'Selected';
        readonly value: string;
        readonly index: number;
    }>;
}>;
/** The anchor-positioning Mount this Menu renders on its panel. The panel is
 *  always anchored to the button via Floating UI and portaled to the document
 *  body, or into the enclosing `<dialog>` when there is one (opt out of
 *  portaling with `anchor.portal: false`), so it escapes ancestor stacking
 *  contexts and overflow clipping.
 *
 *  It also carries the open-focus for the anchored panel. An anchored panel
 *  renders `visibility: hidden` until Floating UI resolves its first position,
 *  and `.focus()` does not land on a hidden element, so `FocusItems` alone
 *  cannot focus it. `focusAfterPosition` focuses the panel as part of that
 *  first reveal. `FocusItems` still focuses the panel when no anchor is
 *  configured, where the panel is visible as soon as the render commits.
 *
 *  Exposed so Scene tests can call
 *  `Scene.Mount.resolve(AnchorMenu, Message.CompletedAnchorMenu())`. */
export declare const AnchorMenu: Mount.MountDefinitionWithArgs<"AnchorMenu", {
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
    readonly _tag: "CompletedAnchorMenu";
}>;
/** The backdrop-portaling Mount this Menu renders. Exposed so Scene tests can
 *  call `Scene.Mount.resolve(PortalMenuBackdrop, Message.CompletedPortalMenuBackdrop())` to
 *  acknowledge the mount produced by the rendered backdrop. */
export declare const PortalMenuBackdrop: Mount.MountDefinitionNoArgs<"PortalMenuBackdrop", {
    readonly _tag: "CompletedPortalMenuBackdrop";
}>;
/** Programmatically opens the Menu, updating the Model and returning focus and
 *  modal Commands. When it is already open, returns the Model unchanged with
 *  no Commands. Use this in domain-event handlers. */
export declare const open: (model: Model) => UpdateReturn;
/** Programmatically closes the menu. If it is open, returns the closed Model
 *  with focus and modal Commands. If it is already closed, returns the Model
 *  unchanged with no Commands. Use this in domain-event handlers to close the
 *  menu. */
export declare const close: (model: Model) => UpdateReturn;
/** Programmatically selects a Menu item, closing the Menu and returning focus
 *  Commands plus a `Selected` OutMessage. Use this in domain-event handlers. */
export declare const selectItem: (model: Model, item: string, index: number) => UpdateReturn;
/** Configuration for an individual menu item's appearance. */
export type ItemConfig = Readonly<{
    className?: string;
    content: Html;
}>;
/** Configuration for a group heading rendered above a group of items. */
export type GroupHeading = Readonly<{
    content: Html;
    className?: string;
}>;
/** Per-render view inputs passed to `view` via `h.submodel`'s `viewInputs` field.
 *
 *  The Menu emits an `OutMessage.Selected({ value, index })` OutMessage on commit.
 *  The menu has already closed by the time this fires. Handle it in the
 *  `foldOutMessage` of the Menu's `Update.foldChild` config. */
export type ViewInputs<Item extends string> = Readonly<{
    items: ReadonlyArray<Item>;
    itemToConfig: (item: Item, context: Readonly<{
        isActive: boolean;
        isDisabled: boolean;
    }>) => ItemConfig;
    isItemDisabled?: (item: Item, index: number) => boolean;
    itemToSearchText?: (item: Item, index: number) => string;
    isButtonDisabled?: boolean;
    buttonContent: Html;
    buttonClassName?: string;
    buttonAttributes?: ReadonlyArray<ChildAttribute>;
    itemsClassName?: string;
    itemsAttributes?: ReadonlyArray<ChildAttribute>;
    itemsScrollClassName?: string;
    itemsScrollAttributes?: ReadonlyArray<ChildAttribute>;
    backdropClassName?: string;
    backdropAttributes?: ReadonlyArray<ChildAttribute>;
    className?: string;
    attributes?: ReadonlyArray<ChildAttribute>;
    itemGroupKey?: (item: Item, index: number) => string;
    groupToHeading?: (groupKey: string) => GroupHeading | undefined;
    groupClassName?: string;
    groupAttributes?: ReadonlyArray<ChildAttribute>;
    separatorClassName?: string;
    separatorAttributes?: ReadonlyArray<ChildAttribute>;
    anchor?: AnchorConfig;
    ariaLabel?: string;
    ariaLabelledBy?: string;
}>;
export { groupContiguous, resolveTypeaheadMatch };
/** The `view`, `update`, and programmatic helpers that `Menu.create`
 *  returns, bound to one `Item` type. Name it to annotate a value that
 *  holds a created bundle, such as a field on a config object or a
 *  function parameter that takes the bundle rather than calling `create`
 *  itself. */
type BundleUpdateReturn<Item extends string> = Update.ReturnWithOutMessage<Model, Message, OutMessage<Item>>;
export type Bundle<Item extends string = string> = Readonly<{
    view: SubmodelView<Model, Message, ViewInputs<Item>>;
    update: (model: Model, message: Message) => BundleUpdateReturn<Item>;
    selectItem: (model: Model, item: Item, index: number) => BundleUpdateReturn<Item>;
    open: (model: Model) => BundleUpdateReturn<Item>;
    close: (model: Model) => BundleUpdateReturn<Item>;
}>;
/** Pairs the menu's `view` and `update` (and programmatic helpers)
 *  behind a single Item-typed entry point. Declaring the menu once at
 *  module scope ensures the view's `Item` type and the OutMessage's
 *  `item` type can't drift:
 *
 *  ```ts
 *  const ActionMenu = Menu.create<Action>()
 *
 *  // In view:
 *  h.submodel({ view: ActionMenu.view, ... })
 *
 *  // In the parent update, pass ActionMenu.update to Update.foldChild and
 *  // handle Menu.OutMessage<Action> in foldOutMessage.
 *  ```
 */
export declare const create: <Item extends string = string>() => Bundle<Item>;
