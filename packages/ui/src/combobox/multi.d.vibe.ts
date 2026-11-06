import { Option, Schema } from 'effect';
import { type Update } from 'foldkit';
import type { View as SubmodelView } from 'foldkit/submodel';
import { type BaseInitConfig, type BaseViewInputs, Message, OutMessage } from './shared.vibe';
/** Schema for the multi-select combobox's private interaction state (open/closed status, active item, activation trigger, typed input value). The selection is owned by the parent and passed in via `ViewInputs.selectedValues`. */
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
/** Configuration for creating a multi-select combobox model with `init`. `isAnimated` enables CSS transition coordination (default `false`). `isModal` locks page scroll and inerts other elements when open (default `false`). */
export type InitConfig = BaseInitConfig;
/** Creates an initial multi-select combobox model from a config. Defaults to closed with no active item and an empty input. */
export declare const init: (config: InitConfig) => Model;
/** Processes a Combobox Message and returns the next Model, optional Commands,
 *  and an optional OutMessage. Selection leaves the multi-select Combobox open
 *  and emits `Selected({ value })` for the parent to fold by toggling
 *  membership.
 *  Closing never emits `ClearedSelection` because its input rests empty by
 *  design. Clear the selection by toggling each value off. */
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
 *  focus and modal Commands. The multi-select input always rests empty on
 *  close. Use this in domain-event handlers to close the combobox. */
export declare const close: (model: Model) => UpdateReturn;
/** Programmatically activates an item in the multi-select combobox. Emits
 *  `Selected({ value })`; the parent toggles the value's membership. */
export declare const selectItem: (model: Model, item: string) => UpdateReturn;
/** Per-render view inputs passed to the view via `h.submodel`'s `viewInputs` field. */
export type ViewInputs<Item extends string> = BaseViewInputs<Item>;
type BundleUpdateReturn<Item extends string> = Update.ReturnWithOutMessage<Model, Message, OutMessage<Item>>;
/** The `view`, `update`, and programmatic helpers that
 *  `Combobox.Multi.create` returns, bound to one `Item` type. Name it to
 *  annotate a value that holds a created bundle, such as a field on a
 *  config object or a function parameter that takes the bundle rather than
 *  calling `create` itself. */
export type Bundle<Item extends string = string> = Readonly<{
    view: SubmodelView<Model, Message, ViewInputs<Item>>;
    update: (model: Model, message: Message) => BundleUpdateReturn<Item>;
    selectItem: (model: Model, item: Item) => BundleUpdateReturn<Item>;
    open: (model: Model) => BundleUpdateReturn<Item>;
    close: (model: Model) => BundleUpdateReturn<Item>;
}>;
/** Pairs the multi-select combobox's `view` and `update` (and programmatic
 *  helpers) behind a single Item-typed entry point. `selectItem` emits
 *  `Selected({ value })`; the parent toggles the value's membership. */
export declare const create: <Item extends string = string>() => Bundle<Item>;
export {};
