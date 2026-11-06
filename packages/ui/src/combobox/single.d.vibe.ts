import { Option, Schema } from 'effect';
import { type Update } from 'foldkit';
import { type View as SubmodelView } from 'foldkit/submodel';
import { type BaseInitConfig, type BaseViewInputsCommon, Message, OutMessage } from './shared.vibe';
/** Schema for the single-select combobox's private interaction state (open/closed status, active item, activation trigger, typed input value). The selection is owned by the parent and passed in via `ViewInputs.maybeSelectedValue`. */
export declare const Model: Schema.Struct<{
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
export type Model = typeof Model.Type;
/** Configuration for creating a single-select combobox model with `init`. `isAnimated` enables CSS transition coordination (default `false`). `isModal` locks page scroll and inerts other elements when open (default `false`). */
export type InitConfig = BaseInitConfig;
/** Creates an initial single-select combobox model from a config. Defaults to closed with no active item and an empty input. */
export declare const init: (config: InitConfig) => Model;
/** Processes a Combobox Message and returns the next Model, optional Commands,
 *  and an optional OutMessage. Selection closes the Combobox and emits
 *  `Selected({ value })` for the parent to store. A nullable Combobox also
 *  emits `ClearedSelection` when it closes with an empty input. */
export declare const update: (model: {
    readonly id: string;
    readonly isOpen: boolean;
    readonly isAnimated: boolean;
    readonly isModal: boolean;
    readonly nullable: boolean;
    readonly immediate: boolean;
    readonly selectInputOnFocus: boolean;
    readonly animation: {
        readonly id: string;
        readonly isShowing: boolean;
        readonly transitionState: "EnterAnimating" | "EnterStart" | "Idle" | "LeaveAnimating" | "LeaveStart";
        readonly transitionGeneration: number;
    };
    readonly maybeActiveItemIndex: Option.Option<number>;
    readonly activationTrigger: "Keyboard" | "Pointer";
    readonly inputValue: string;
    readonly maybeLastPointerPosition: Option.Option<{
        readonly screenX: number;
        readonly screenY: number;
    }>;
}, message: Message) => Readonly<{
    model: {
        readonly id: string;
        readonly isOpen: boolean;
        readonly isAnimated: boolean;
        readonly isModal: boolean;
        readonly nullable: boolean;
        readonly immediate: boolean;
        readonly selectInputOnFocus: boolean;
        readonly animation: {
            readonly id: string;
            readonly isShowing: boolean;
            readonly transitionState: "EnterAnimating" | "EnterStart" | "Idle" | "LeaveAnimating" | "LeaveStart";
            readonly transitionGeneration: number;
        };
        readonly maybeActiveItemIndex: Option.Option<number>;
        readonly activationTrigger: "Keyboard" | "Pointer";
        readonly inputValue: string;
        readonly maybeLastPointerPosition: Option.Option<{
            readonly screenX: number;
            readonly screenY: number;
        }>;
    };
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
type UpdateReturn = ReturnType<typeof update>;
/** Programmatically opens the Combobox, updating the Model and returning
 *  focus and modal Commands. When it is already open, returns the Model
 *  unchanged with no Commands. Use this in domain-event handlers. */
export declare const open: (model: Model) => UpdateReturn;
/** Programmatically closes the Combobox, updating the Model and returning
 *  focus and modal Commands. `restingInputValue` is the text the input
 *  returns to (the parent-owned selection's display text, or empty). Use
 *  this in domain-event handlers to close the combobox. */
export declare const close: (model: Model, restingInputValue: string) => UpdateReturn;
/** Programmatically selects an item in the single-select combobox, closing
 *  the combobox and emitting `Selected({ value })`. The Submodel treats the
 *  select as fresh (`wasSelected: false`), so the input rests on
 *  `displayText`; what the selection becomes is the parent's fold to decide,
 *  and a parent that toggles on its own state will still deselect an
 *  already-selected value. */
export declare const selectItem: (model: Model, item: string, displayText: string) => UpdateReturn;
/** Per-render view inputs passed to the view via `h.submodel`'s `viewInputs` field. */
export type ViewInputs<Item extends string> = BaseViewInputsCommon<Item> & Readonly<{
    /** The selection the parent owns, passed in fresh on every render.
     *  `Option` because a single-select combobox may have no selection
     *  yet. Marks the selected item and drives the hidden form input
     *  submitted under `formName`. */
    maybeSelectedValue: Option.Option<Item>;
}>;
type BundleUpdateReturn<Item extends string> = Update.ReturnWithOutMessage<Model, Message, OutMessage<Item>>;
/** The `view`, `update`, and programmatic helpers that `Combobox.create`
 *  returns, bound to one `Item` type. Name it to annotate a value that
 *  holds a created bundle, such as a field on a config object or a
 *  function parameter that takes the bundle rather than calling `create`
 *  itself. */
export type Bundle<Item extends string = string> = Readonly<{
    view: SubmodelView<Model, Message, ViewInputs<Item>>;
    update: (model: Model, message: Message) => BundleUpdateReturn<Item>;
    selectItem: (model: Model, item: Item, displayText: string) => BundleUpdateReturn<Item>;
    open: (model: Model) => BundleUpdateReturn<Item>;
    close: (model: Model, restingInputValue: string) => BundleUpdateReturn<Item>;
}>;
/** Pairs the single-select combobox's `view` and `update` (and programmatic
 *  helpers) behind a single Item-typed entry point. See `Listbox.create`
 *  for the rationale; the combobox factory follows the same shape with
 *  `selectItem` taking both `item` and `displayText`. `selectItem` emits
 *  `Selected({ value })` with the input resting on `displayText`; what the
 *  selection becomes is the parent's fold to decide. */
export declare const create: <Item extends string = string>() => Bundle<Item>;
export {};
