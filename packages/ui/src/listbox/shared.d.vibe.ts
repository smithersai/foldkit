import { Effect, Option, Schema } from 'effect';
import * as Command from 'foldkit/command';
import type { ChildAttribute, Html } from 'foldkit/html';
import * as Mount from 'foldkit/mount';
import { type View as SubmodelView } from 'foldkit/submodel';
import * as Update from 'foldkit/update';
import { AnchorConfig } from '../anchor/index.js';
import { resolveTypeaheadMatch } from '../typeahead.vibe';
export { resolveTypeaheadMatch };
/** Schema for the activation trigger: whether the user interacted via mouse or keyboard. */
export declare const ActivationTrigger: Schema.Literals<readonly ["Pointer", "Keyboard"]>;
export type ActivationTrigger = typeof ActivationTrigger.Type;
/** Schema for the listbox orientation: whether items flow vertically or horizontally. */
export declare const Orientation: Schema.Literals<readonly ["Vertical", "Horizontal"]>;
export type Orientation = typeof Orientation.Type;
/** Schema fields shared by all listbox variants (single-select and multi-select). Spread into each variant's `Schema.Struct` to avoid duplicating field definitions. */
export declare const BaseModel: Schema.Struct<{
    readonly id: Schema.String;
    readonly isOpen: Schema.Boolean;
    readonly isAnimated: Schema.Boolean;
    readonly isModal: Schema.Boolean;
    readonly orientation: Schema.Literals<readonly ["Vertical", "Horizontal"]>;
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
}>;
export type BaseModel = typeof BaseModel.Type;
/** Configuration fields shared by all listbox variant `init` functions. */
export type BaseInitConfig = Readonly<{
    id: string;
    isAnimated?: boolean;
    isModal?: boolean;
    orientation?: typeof Orientation.Type;
}>;
/** Creates the shared base fields for a listbox model from a config. Each variant spreads this and adds its selection field. */
export declare const baseInit: (config: BaseInitConfig) => BaseModel;
/** Union of all messages the listbox component can produce. */
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
        item: Schema.String;
    };
    readonly MovedPointerOverItem: {
        index: Schema.Number;
        screenX: Schema.Number;
        screenY: Schema.Number;
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
    readonly CompletedLockScroll: {};
    readonly CompletedUnlockScroll: {};
    readonly CompletedInertOthers: {};
    readonly CompletedRestoreInert: {};
    readonly CompletedFocusButton: {};
    readonly CompletedFocusItems: {};
    readonly CompletedScrollIntoView: {};
    readonly CompletedClickItem: {};
    readonly ClickedButton: {};
    readonly IgnoredMouseClick: {};
    readonly SuppressedSpaceScroll: {};
    readonly SuppressedItemCommit: {};
    readonly CompletedAnchorListbox: {};
    readonly CompletedPortalListboxBackdrop: {};
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
    };
}>;
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
/** A click on the Listbox trigger button. */
export type ClickedButton = typeof Message.ClickedButton.Type;
export type IgnoredMouseClick = typeof Message.IgnoredMouseClick.Type;
export type SuppressedSpaceScroll = typeof Message.SuppressedSpaceScroll.Type;
export type SuppressedItemCommit = typeof Message.SuppressedItemCommit.Type;
export type PressedPointerOnButton = typeof Message.PressedPointerOnButton.Type;
export type Message = typeof Message.Type;
export type Selected<Value extends string = string> = Readonly<{
    readonly _tag: 'Selected';
    readonly value: Value;
}>;
/** Union of out-messages the listbox component can produce. The parent folds `Selected` into the selection it owns: single-select stores the value, multi-select toggles the value's membership. */
export declare const OutMessage: import("foldkit/message").MessageUnion<{
    readonly Selected: {
        value: Schema.String;
    };
}>;
/** Generic over `Value extends string` so consumers who create the listbox
 *  via `Listbox.create<MyUnion>()` receive `value: MyUnion` in the
 *  `Selected` OutMessage from the factory's `update`, instead of
 *  `value: string`. Defaults to `string`. */
export type OutMessage<Value extends string = string> = Selected<Value>;
export declare const SEARCH_DEBOUNCE_MILLISECONDS = 350;
export declare const LEFT_MOUSE_BUTTON = 0;
export declare const buttonSelector: (id: string) => string;
/** Returns the bare DOM id of the listbox trigger button, derived from the
 *  listbox's base id. Use this to associate an external label with the
 *  trigger via a native `<label for={Listbox.buttonId(id)}>` or an
 *  `aria-labelledby` reference. Mirrors `buttonSelector`, which returns the
 *  CSS selector form (`#${id}-button`) rather than the bare id. */
export declare const buttonId: (id: string) => string;
export declare const itemsSelector: (id: string) => string;
export declare const itemSelector: (id: string, index: number) => string;
export declare const itemId: (id: string, index: number) => string;
export declare const closedModel: <Model extends BaseModel>(model: Model) => Model;
type SelectedItemContext<Model extends BaseModel> = Readonly<{
    closeWithFocus: (model: Model, outMessage?: OutMessage) => Update.ReturnWithOutMessage<Model, Message, OutMessage>;
    closeWithoutFocus: (model: Model, outMessage?: OutMessage) => Update.ReturnWithOutMessage<Model, Message, OutMessage>;
}>;
/** Prevents page scrolling while the listbox is open in modal mode. */
export declare const LockScroll: Command.CommandDefinitionNoArgs<"LockScroll", Effect.Effect<{
    readonly _tag: "CompletedLockScroll";
}, never, never>>;
/** Re-enables page scrolling after the listbox closes. */
export declare const UnlockScroll: Command.CommandDefinitionNoArgs<"UnlockScroll", Effect.Effect<{
    readonly _tag: "CompletedUnlockScroll";
}, never, never>>;
/** Marks all elements outside the listbox as inert for modal behavior. */
export declare const InertOthers: Command.CommandDefinitionWithArgs<"InertOthers", {
    id: Schema.String;
}, Effect.Effect<{
    readonly _tag: "CompletedInertOthers";
}, never, never>>;
/** Removes the inert attribute from elements outside the listbox. */
export declare const RestoreInert: Command.CommandDefinitionWithArgs<"RestoreInert", {
    id: Schema.String;
}, Effect.Effect<{
    readonly _tag: "CompletedRestoreInert";
}, never, never>>;
/** Moves focus back to the listbox button after closing. */
export declare const FocusButton: Command.CommandDefinitionWithArgs<"FocusButton", {
    id: Schema.String;
}, Effect.Effect<{
    readonly _tag: "CompletedFocusButton";
}, never, never>>;
/** Moves focus to the listbox items container after opening. */
export declare const FocusItems: Command.CommandDefinitionWithArgs<"FocusItems", {
    id: Schema.String;
}, Effect.Effect<{
    readonly _tag: "CompletedFocusItems";
}, never, never>>;
/** Scrolls the active listbox item into view after keyboard navigation. */
export declare const ScrollIntoView: Command.CommandDefinitionWithArgs<"ScrollIntoView", {
    id: Schema.String;
    index: Schema.Number;
}, Effect.Effect<{
    readonly _tag: "CompletedScrollIntoView";
}, never, never>>;
/** Programmatically clicks the active listbox item's DOM element. */
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
/** Detects whether the listbox button moved or the leave animation ended. Whichever comes first; both outcomes signal the Animation submodel that leave is complete. */
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
export declare const makeUpdate: <Model extends BaseModel>(handleSelectedItem: (model: Model, item: string, context: SelectedItemContext<Model>) => Update.ReturnWithOutMessage<Model, Message, OutMessage>) => (model: Model, message: Message) => Readonly<{
    model: Model;
    commands?: Update.Commands<{
        readonly _tag: "BlurredItems";
    } | {
        readonly _tag: "ClickedButton";
    } | {
        readonly _tag: "Closed";
    } | {
        readonly _tag: "CompletedAnchorListbox";
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
        readonly _tag: "CompletedPortalListboxBackdrop";
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
        readonly _tag: "SuppressedItemCommit";
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
    } | {
        readonly _tag: "RequestedItemClick";
        readonly index: number;
    } | {
        readonly _tag: "Searched";
        readonly key: string;
        readonly maybeTargetIndex: Option.Option<number>;
    } | {
        readonly _tag: "SelectedItem";
        readonly item: string;
    }, never>;
    outMessage?: Readonly<{
        readonly _tag: 'Selected';
        readonly value: string;
    }>;
}>;
/** The anchor-positioning Mount this Listbox renders on its items panel.
 *  The panel is always anchored to the button via Floating UI and portaled
 *  to the document body, or into the enclosing `<dialog>` when there is one
 *  (opt out of portaling with `anchor.portal: false`), so it escapes ancestor
 *  stacking contexts and overflow clipping.
 *
 *  It also carries the open-focus for the anchored panel. An anchored panel
 *  renders `visibility: hidden` until Floating UI resolves its first position,
 *  and `.focus()` does not land on a hidden element, so `FocusItems` alone
 *  cannot focus it. `focusAfterPosition` focuses the panel as part of that
 *  first reveal. `FocusItems` still focuses the panel when no anchor is
 *  configured, where the panel is visible as soon as the render commits.
 *
 *  Exposed so Scene tests can call
 *  `Scene.Mount.resolve(AnchorListbox, CompletedAnchorListbox())`. */
export declare const AnchorListbox: Mount.MountDefinitionWithArgs<"AnchorListbox", {
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
    readonly _tag: "CompletedAnchorListbox";
}>;
/** The backdrop-portaling Mount this Listbox renders. Exposed so Scene tests can
 *  call `Scene.Mount.resolve(PortalListboxBackdrop, CompletedPortalListboxBackdrop())` to
 *  acknowledge the mount produced by the rendered backdrop. */
export declare const PortalListboxBackdrop: Mount.MountDefinitionNoArgs<"PortalListboxBackdrop", {
    readonly _tag: "CompletedPortalListboxBackdrop";
}>;
/** Configuration for an individual listbox item's appearance. */
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
 *  The Listbox emits a `Selected({ value })` OutMessage on commit.
 *  Fold it in the Listbox's `Update.foldChild` config: single-select stores
 *  the value, while multi-select toggles its membership. */
export type BaseViewInputsCommon<Item> = Readonly<{
    items: ReadonlyArray<Item>;
    itemToConfig: (item: Item, context: Readonly<{
        isActive: boolean;
        isDisabled: boolean;
        /** Mirrors the view input of the same name, so `itemToConfig` can
         *  style items for read-only state without closing over `viewInputs`. */
        isReadOnly: boolean;
        isSelected: boolean;
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
    name?: string;
    form?: string;
    /** Marks the Listbox unavailable with `aria-disabled="true"` on the button
     *  and `data-disabled` on the button and the wrapper, and removes the
     *  button's handlers so the dropdown cannot be opened. */
    isDisabled?: boolean;
    /** Prevents committing a selection while exposing read-only semantics
     *  with `aria-readonly="true"` and `data-readonly` on the items panel, and
     *  `data-readonly` on the wrapper, button, and every item. The Listbox
     *  still opens, navigates, and searches. Independent of `isDisabled`:
     *  setting both emits both attribute sets, and `isDisabled` still wins for
     *  interaction, since its button drops every handler, so a Listbox that is
     *  both read-only and disabled cannot be opened at all. */
    isReadOnly?: boolean;
    isInvalid?: boolean;
    ariaLabel?: string;
    ariaLabelledBy?: string;
}>;
/** The `itemToValue` extractor piece of a Listbox's view inputs. The
 *  extractor is optional when `Item` is itself a string (the default
 *  returns the item unchanged) and required when items are objects, so the
 *  OutMessage payload type can't drift from what the consumer actually
 *  emits. */
export type ItemToValueInput<Item, Value extends string = string> = [
    Item
] extends [string] ? Readonly<{
    itemToValue?: (item: Item) => Value;
}> : Readonly<{
    itemToValue: (item: Item) => Value;
}>;
/** Per-render view inputs for the shared array-based Listbox view. The
 *  multi-select variant exposes this shape directly; the single-select
 *  variant swaps `selectedValues` for `maybeSelectedValue` at its public
 *  seam and adapts to this shape internally. */
export type BaseViewInputs<Item, Value extends string = string> = BaseViewInputsCommon<Item> & Readonly<{
    /** The selection the parent owns, passed in fresh on every render.
     *  Drives `aria-selected` and `data-selected` on items, which item the
     *  Listbox highlights when it opens onto a selection, and the hidden
     *  form inputs submitted under `name`. */
    selectedValues: ReadonlyArray<Value>;
}> & ItemToValueInput<Item, Value>;
type ViewBehavior = Readonly<{
    ariaMultiSelectable: boolean;
}>;
export declare const makeView: <Model extends BaseModel>(behavior: ViewBehavior) => <Item, Value extends string = string>() => SubmodelView<Model, Message, BaseViewInputs<Item, Value>>;
