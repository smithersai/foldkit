import { Effect, Option, Schema } from 'effect';
import * as Command from 'foldkit/command';
import type { ChildAttribute, Html } from 'foldkit/html';
import * as Mount from 'foldkit/mount';
import { type View as SubmodelView } from 'foldkit/submodel';
import * as Update from 'foldkit/update';
import { AnchorConfig } from '../anchor/index.js';
import { groupContiguous } from '../group.vibe';
export { groupContiguous };
/** Schema for the activation trigger: whether the user interacted via mouse or keyboard. */
export declare const ActivationTrigger: Schema.Literals<readonly ["Pointer", "Keyboard"]>;
export type ActivationTrigger = typeof ActivationTrigger.Type;
/** Schema fields shared by all combobox variants (single-select and multi-select). Spread into each variant's `Schema.Struct` to avoid duplicating field definitions. */
export declare const BaseModel: Schema.Struct<{
    readonly id: Schema.String;
    readonly isOpen: Schema.Boolean;
    readonly isAnimated: Schema.Boolean;
    readonly isModal: Schema.Boolean;
    readonly nullable: Schema.Boolean;
    readonly immediate: Schema.Boolean;
    readonly selectInputOnFocus: Schema.Boolean;
    readonly animation: Schema.Struct<{
        readonly id: Schema.String;
        readonly isShowing: Schema.Boolean;
        readonly transitionState: Schema.Literals<readonly ["Idle", "EnterStart", "EnterAnimating", "LeaveStart", "LeaveAnimating"]>;
        readonly transitionGeneration: Schema.Number;
    }>;
    readonly maybeActiveItemIndex: Schema.Option<Schema.Number>;
    readonly activationTrigger: Schema.Literals<readonly ["Pointer", "Keyboard"]>;
    readonly inputValue: Schema.String;
    readonly maybeLastPointerPosition: Schema.Option<Schema.Struct<{
        readonly screenX: Schema.Number;
        readonly screenY: Schema.Number;
    }>>;
}>;
export type BaseModel = typeof BaseModel.Type;
/** Configuration fields shared by all combobox variant `init` functions. */
export type BaseInitConfig = Readonly<{
    id: string;
    isAnimated?: boolean;
    isModal?: boolean;
    nullable?: boolean;
    /** Emits `Selected` on every keyboard activation while open, so arrow keys
     *  commit as they move instead of waiting for Enter. Combining `immediate`
     *  with `nullable` is discouraged: a nullable toggle fold would deselect as
     *  the arrows pass back over the selected item (see issue #693). Default
     *  `false`. */
    immediate?: boolean;
    selectInputOnFocus?: boolean;
}>;
/** Creates the shared base fields for a combobox model from a config. Each variant spreads this and adds its selection fields. */
export declare const baseInit: (config: BaseInitConfig) => BaseModel;
/** Union of all messages the combobox component can produce. */
export declare const Message: import("foldkit/message").MessageUnion<{
    readonly Opened: {
        maybeActiveItemIndex: Schema.Option<Schema.Number>;
    };
    readonly Closed: {
        restingInputValue: Schema.String;
        isClearable: Schema.Boolean;
    };
    readonly BlurredInput: {
        restingInputValue: Schema.String;
        isClearable: Schema.Boolean;
    };
    readonly ActivatedItem: {
        index: Schema.Number;
        activationTrigger: Schema.Literals<readonly ["Pointer", "Keyboard"]>;
        maybeImmediateSelection: Schema.Option<Schema.Struct<{
            readonly item: Schema.String;
        }>>;
    };
    readonly DeactivatedItem: {};
    readonly SelectedItem: {
        item: Schema.String;
        displayText: Schema.String;
        wasSelected: Schema.Boolean;
    };
    readonly MovedPointerOverItem: {
        index: Schema.Number;
        screenX: Schema.Number;
        screenY: Schema.Number;
    };
    readonly RequestedItemClick: {
        index: Schema.Number;
    };
    readonly SuppressedItemCommit: {};
    readonly SuppressedEmptyItemNavigation: {};
    readonly CompletedLockScroll: {};
    readonly CompletedUnlockScroll: {};
    readonly CompletedInertOthers: {};
    readonly CompletedRestoreInert: {};
    readonly CompletedFocusInput: {};
    readonly CompletedScrollIntoView: {};
    readonly CompletedClickItem: {};
    readonly CompletedAnchorCombobox: {};
    readonly CompletedAttachComboboxPreventBlur: {};
    readonly CompletedAttachComboboxSelectOnFocus: {};
    readonly CompletedPortalComboboxBackdrop: {};
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
    readonly UpdatedInputValue: {
        value: Schema.String;
    };
    readonly PressedToggleButton: {
        restingInputValue: Schema.String;
        isClearable: Schema.Boolean;
    };
}>;
export type Opened = typeof Message.Opened.Type;
export type Closed = typeof Message.Closed.Type;
export type BlurredInput = typeof Message.BlurredInput.Type;
export type ActivatedItem = typeof Message.ActivatedItem.Type;
export type DeactivatedItem = typeof Message.DeactivatedItem.Type;
export type SelectedItem = typeof Message.SelectedItem.Type;
export type MovedPointerOverItem = typeof Message.MovedPointerOverItem.Type;
export type RequestedItemClick = typeof Message.RequestedItemClick.Type;
export type SuppressedItemCommit = typeof Message.SuppressedItemCommit.Type;
export type SuppressedEmptyItemNavigation = typeof Message.SuppressedEmptyItemNavigation.Type;
export type CompletedLockScroll = typeof Message.CompletedLockScroll.Type;
export type CompletedUnlockScroll = typeof Message.CompletedUnlockScroll.Type;
export type CompletedInertOthers = typeof Message.CompletedInertOthers.Type;
export type CompletedRestoreInert = typeof Message.CompletedRestoreInert.Type;
export type CompletedFocusInput = typeof Message.CompletedFocusInput.Type;
export type CompletedScrollIntoView = typeof Message.CompletedScrollIntoView.Type;
export type CompletedClickItem = typeof Message.CompletedClickItem.Type;
export type UpdatedInputValue = typeof Message.UpdatedInputValue.Type;
export type PressedToggleButton = typeof Message.PressedToggleButton.Type;
export type Message = typeof Message.Type;
export type Selected<Value extends string = string> = Readonly<{
    readonly _tag: 'Selected';
    readonly value: Value;
}>;
export type ClearedSelection = typeof OutMessage.ClearedSelection.Type;
/** Union of out-messages the combobox component can produce. The parent folds `Selected` into the selection it owns and clears that selection on `ClearedSelection`. */
export declare const OutMessage: import("foldkit/message").MessageUnion<{
    readonly Selected: {
        value: Schema.String;
    };
    readonly ClearedSelection: {};
}>;
/** Generic over `Value extends string` so consumers who create the combobox
 *  via `Combobox.create<MyUnion>()` receive `value: MyUnion` in the
 *  `Selected` OutMessage from the factory's `update`, instead of
 *  `value: string`. Defaults to `string`. */
export type OutMessage<Value extends string = string> = Selected<Value> | ClearedSelection;
/** Returns the bare DOM id of the combobox input, derived from the
 *  combobox's base id. Use this to associate an external label with the
 *  input via a native `<label for={Combobox.inputId(id)}>` or an
 *  `aria-labelledby` reference. Mirrors `inputSelector`, which returns the
 *  CSS selector form (`#${id}-input`) rather than the bare id. */
export declare const inputId: (id: string) => string;
export declare const inputSelector: (id: string) => string;
export declare const inputWrapperSelector: (id: string) => string;
export declare const itemsSelector: (id: string) => string;
export declare const itemSelector: (id: string, index: number) => string;
export declare const itemId: (id: string, index: number) => string;
/** Resets only shared base fields to their closed state. Does not touch inputValue. That is variant-specific. */
export declare const closedBaseModel: <Model extends BaseModel>(model: Model) => Model;
type SelectedItemContext<Model extends BaseModel> = Readonly<{
    closeWithFocus: (model: Model, outMessage?: OutMessage) => Update.ReturnWithOutMessage<Model, Message, OutMessage>;
}>;
type HandlerReturn<Model> = Readonly<{
    model: Model;
    outMessage?: OutMessage;
}>;
/** Prevents page scrolling while the combobox popup is open in modal mode. */
export declare const LockScroll: Command.CommandDefinitionNoArgs<"LockScroll", Effect.Effect<{
    readonly _tag: "CompletedLockScroll";
}, never, never>>;
/** Re-enables page scrolling after the combobox popup closes. */
export declare const UnlockScroll: Command.CommandDefinitionNoArgs<"UnlockScroll", Effect.Effect<{
    readonly _tag: "CompletedUnlockScroll";
}, never, never>>;
/** Marks all elements outside the combobox as inert for modal behavior. */
export declare const InertOthers: Command.CommandDefinitionWithArgs<"InertOthers", {
    id: Schema.String;
}, Effect.Effect<{
    readonly _tag: "CompletedInertOthers";
}, never, never>>;
/** Removes the inert attribute from elements outside the combobox. */
export declare const RestoreInert: Command.CommandDefinitionWithArgs<"RestoreInert", {
    id: Schema.String;
}, Effect.Effect<{
    readonly _tag: "CompletedRestoreInert";
}, never, never>>;
/** Moves focus to the combobox input after selection or close. */
export declare const FocusInput: Command.CommandDefinitionWithArgs<"FocusInput", {
    id: Schema.String;
}, Effect.Effect<{
    readonly _tag: "CompletedFocusInput";
}, never, never>>;
/** Scrolls the active combobox item into view after keyboard navigation. */
export declare const ScrollIntoView: Command.CommandDefinitionWithArgs<"ScrollIntoView", {
    id: Schema.String;
    index: Schema.Number;
}, Effect.Effect<{
    readonly _tag: "CompletedScrollIntoView";
}, never, never>>;
/** Programmatically clicks the active combobox item's DOM element. */
export declare const ClickItem: Command.CommandDefinitionWithArgs<"ClickItem", {
    id: Schema.String;
    index: Schema.Number;
}, Effect.Effect<{
    readonly _tag: "CompletedClickItem";
}, never, never>>;
/** Detects whether the combobox input wrapper moved or the leave animation ended. Whichever comes first; both outcomes signal the Animation submodel that leave is complete. */
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
/** Creates a combobox update function from variant-specific handlers. Shared logic (open, close, activate, transition) is handled internally; only close, selection, and immediate-activation behavior varies by variant. */
export declare const makeUpdate: <Model extends BaseModel>(handlers: Readonly<{
    handleClose: (model: Model, restingInputValue: string, isClearable: boolean) => HandlerReturn<Model>;
    handleSelectedItem: (model: Model, item: string, displayText: string, wasSelected: boolean, context: SelectedItemContext<Model>) => Update.ReturnWithOutMessage<Model, Message, OutMessage>;
    handleImmediateActivation: (model: Model, item: string) => HandlerReturn<Model>;
}>) => (model: Model, message: Message) => Readonly<{
    model: Model;
    commands?: Update.Commands<{
        readonly _tag: "CompletedAnchorCombobox";
    } | {
        readonly _tag: "CompletedAttachComboboxPreventBlur";
    } | {
        readonly _tag: "CompletedAttachComboboxSelectOnFocus";
    } | {
        readonly _tag: "CompletedClickItem";
    } | {
        readonly _tag: "CompletedFocusInput";
    } | {
        readonly _tag: "CompletedInertOthers";
    } | {
        readonly _tag: "CompletedLockScroll";
    } | {
        readonly _tag: "CompletedPortalComboboxBackdrop";
    } | {
        readonly _tag: "CompletedRestoreInert";
    } | {
        readonly _tag: "CompletedScrollIntoView";
    } | {
        readonly _tag: "CompletedUnlockScroll";
    } | {
        readonly _tag: "DeactivatedItem";
    } | {
        readonly _tag: "SuppressedEmptyItemNavigation";
    } | {
        readonly _tag: "SuppressedItemCommit";
    } | {
        readonly _tag: "ActivatedItem";
        readonly index: number;
        readonly activationTrigger: "Keyboard" | "Pointer";
        readonly maybeImmediateSelection: Option.Option<{
            readonly item: string;
        }>;
    } | {
        readonly _tag: "BlurredInput";
        readonly restingInputValue: string;
        readonly isClearable: boolean;
    } | {
        readonly _tag: "Closed";
        readonly restingInputValue: string;
        readonly isClearable: boolean;
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
        readonly _tag: "PressedToggleButton";
        readonly restingInputValue: string;
        readonly isClearable: boolean;
    } | {
        readonly _tag: "RequestedItemClick";
        readonly index: number;
    } | {
        readonly _tag: "SelectedItem";
        readonly item: string;
        readonly displayText: string;
        readonly wasSelected: boolean;
    } | {
        readonly _tag: "UpdatedInputValue";
        readonly value: string;
    }, never>;
    outMessage?: OutMessage<string>;
}>;
/** The anchor-positioning Mount this Combobox renders on its items panel.
 *  The panel is always anchored to the input wrapper via Floating UI and
 *  portaled to the document body, or into the enclosing `<dialog>` when
 *  there is one (opt out of portaling with `anchor.portal: false`), so it
 *  escapes ancestor stacking contexts and overflow clipping. The Mount also
 *  installs the `pointerdown`-cancelling capture listener that prevents
 *  input blur on item presses. Exposed so Scene tests can call
 *  `Scene.Mount.resolve(AnchorCombobox, CompletedAnchorCombobox())`. */
export declare const AnchorCombobox: Mount.MountDefinitionWithArgs<"AnchorCombobox", {
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
    readonly _tag: "CompletedAnchorCombobox";
}>;
/** The Mount this Combobox renders to install a `pointerdown`-cancelling
 *  capture listener that prevents blur on item presses. Exposed so Scene
 *  tests can call
 *  `Scene.Mount.resolve(AttachComboboxPreventBlur, CompletedAttachComboboxPreventBlur())`. */
export declare const AttachComboboxPreventBlur: Mount.MountDefinitionNoArgs<"AttachComboboxPreventBlur", {
    readonly _tag: "CompletedAttachComboboxPreventBlur";
}>;
/** The Mount this Combobox renders to install the input's select-on-focus
 *  behavior. Exposed so Scene tests can call
 *  `Scene.Mount.resolve(AttachComboboxSelectOnFocus, CompletedAttachComboboxSelectOnFocus())`. */
export declare const AttachComboboxSelectOnFocus: Mount.MountDefinitionNoArgs<"AttachComboboxSelectOnFocus", {
    readonly _tag: "CompletedAttachComboboxSelectOnFocus";
}>;
/** The backdrop-portaling Mount this Combobox renders. Exposed so Scene tests can
 *  call `Scene.Mount.resolve(PortalComboboxBackdrop, CompletedPortalComboboxBackdrop())` to
 *  acknowledge the mount produced by the rendered backdrop. */
export declare const PortalComboboxBackdrop: Mount.MountDefinitionNoArgs<"PortalComboboxBackdrop", {
    readonly _tag: "CompletedPortalComboboxBackdrop";
}>;
/** Configuration for an individual combobox item's appearance. */
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
 *  The Combobox emits a `Selected({ value })` OutMessage on commit.
 *  Fold it in the Combobox's `Update.foldChild` config: single-select
 *  stores the value, while multi-select toggles the value's membership.
 *  `restingInputValue` is the text the input returns to on
 *  close (the selection's display text for single-select, empty for
 *  multi-select). The selection is not part of this shared shape. Each
 *  variant adds its own selection field. */
export type BaseViewInputsCommon<Item extends string> = Readonly<{
    items: ReadonlyArray<Item>;
    restingInputValue: string;
    itemToConfig: (item: Item, context: Readonly<{
        isActive: boolean;
        isDisabled: boolean;
        /** Mirrors the view input of the same name, so `itemToConfig` can
         *  style items for read-only state without closing over `viewInputs`. */
        isReadOnly: boolean;
        isSelected: boolean;
    }>) => ItemConfig;
    itemToValue: (item: Item, index: number) => Item;
    itemToDisplayText: (item: Item, index: number) => string;
    isItemDisabled?: (item: Item, index: number) => boolean;
    inputClassName?: string;
    inputAttributes?: ReadonlyArray<ChildAttribute>;
    inputPlaceholder?: string;
    inputWrapperClassName?: string;
    inputWrapperAttributes?: ReadonlyArray<ChildAttribute>;
    itemsClassName?: string;
    itemsAttributes?: ReadonlyArray<ChildAttribute>;
    itemsScrollClassName?: string;
    itemsScrollAttributes?: ReadonlyArray<ChildAttribute>;
    backdropClassName?: string;
    backdropAttributes?: ReadonlyArray<ChildAttribute>;
    /** CSS class for the outer wrapper. Keep the wrapper positioned when the
     *  Combobox renders a backdrop, so the input paints above it. */
    className?: string;
    attributes?: ReadonlyArray<ChildAttribute>;
    buttonContent?: Html;
    buttonClassName?: string;
    buttonAttributes?: ReadonlyArray<ChildAttribute>;
    formName?: string;
    /** Marks the Combobox unavailable with `aria-disabled="true"` on the input
     *  and the toggle button and `data-disabled` on both plus the wrapper, and
     *  removes their handlers so the dropdown cannot be opened. */
    isDisabled?: boolean;
    /** Prevents committing a selection while exposing read-only semantics with
     *  the native `readonly` attribute plus `aria-readonly="true"` on the input,
     *  `aria-readonly="true"` on the items panel, and `data-readonly` on the
     *  wrapper, input, toggle button, items panel, and every item. The Combobox
     *  still opens, navigates, and closes, and the input still takes focus and
     *  allows text selection and copying. Typing is frozen, since the input
     *  value doubles as the display of the selection. Independent of
     *  `isDisabled`: setting both emits both attribute sets, and `isDisabled`
     *  still wins for interaction, since it drops every handler, so a Combobox
     *  that is both read-only and disabled cannot be opened at all. */
    isReadOnly?: boolean;
    isInvalid?: boolean;
    openOnFocus?: boolean;
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
/** Per-render view inputs for the shared array-based Combobox view. The
 *  multi-select variant exposes this shape directly; the single-select
 *  variant swaps `selectedValues` for `maybeSelectedValue` at its public
 *  seam and adapts to this shape internally. */
export type BaseViewInputs<Item extends string> = BaseViewInputsCommon<Item> & Readonly<{
    /** The selection the parent owns, passed in fresh on every render.
     *  Marks items as selected and drives the hidden form inputs
     *  submitted under `formName`. */
    selectedValues: ReadonlyArray<Item>;
}>;
/** Variant-specific view behavior injected into the shared combobox view factory. */
export type ViewBehavior = Readonly<{
    ariaMultiSelectable: boolean;
}>;
/** Creates a combobox view function from variant-specific behavior. Shared rendering logic (input, items, transitions, keyboard navigation) is handled internally; only listbox multi-select semantics vary by variant. */
export declare const makeView: <Model extends BaseModel>(behavior: ViewBehavior) => <Item extends string>() => SubmodelView<Model, Message, BaseViewInputs<Item>>;
