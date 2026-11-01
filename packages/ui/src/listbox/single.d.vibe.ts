import { Option, Schema } from 'effect';
import { type Update } from 'foldkit';
import { type View as SubmodelView } from 'foldkit/submodel';
import { type BaseInitConfig, type BaseViewInputsCommon, type ItemToValueInput, Message, OutMessage } from './shared.vibe';
/** Schema for the single-select listbox's private interaction state (open/closed status, active item, activation trigger, typeahead search). The selection is owned by the parent and passed in via `ViewInputs.maybeSelectedValue`. */
export declare const Model: Schema.Struct<{
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
export type Model = typeof Model.Type;
/** Configuration for creating a single-select listbox model with `init`. `isAnimated` enables CSS transition coordination (default `false`). `isModal` locks page scroll and inerts other elements when open (default `false`). */
export type InitConfig = BaseInitConfig;
/** Creates an initial single-select listbox model from a config. Defaults to closed with no active item. */
export declare const init: (config: InitConfig) => Model;
/** Processes a Listbox Message and returns the next Model, optional Commands,
 *  and an optional OutMessage. Selection closes the Listbox and emits
 *  `Selected({ value })` for the parent to store. */
export declare const update: (model: {
    readonly id: string;
    readonly isOpen: boolean;
    readonly isAnimated: boolean;
    readonly isModal: boolean;
    readonly orientation: "Horizontal" | "Vertical";
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
}, message: Message) => Readonly<{
    model: {
        readonly id: string;
        readonly isOpen: boolean;
        readonly isAnimated: boolean;
        readonly isModal: boolean;
        readonly orientation: "Horizontal" | "Vertical";
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
    };
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
type UpdateReturn = ReturnType<typeof update>;
/** Programmatically opens the Listbox, updating the Model and returning focus
 *  and modal Commands. When it is already open, returns the Model unchanged
 *  with no Commands. Use this in domain-event handlers. */
export declare const open: (model: Model) => UpdateReturn;
/** Programmatically closes the listbox. If it is open, returns the closed Model
 *  with focus and modal Commands. If it is already closed, returns the Model
 *  unchanged with no Commands. Use this in domain-event handlers to close the
 *  listbox. */
export declare const close: (model: Model) => UpdateReturn;
/** Programmatically selects an item in the single-select listbox, closing the listbox and emitting a `Selected({ value })` OutMessage. */
export declare const selectItem: (model: Model, item: string) => UpdateReturn;
/** Per-render view inputs passed to the view via `h.submodel`'s `viewInputs` field. */
export type ViewInputs<Item, Value extends string = string> = BaseViewInputsCommon<Item> & Readonly<{
    /** The selection the parent owns, passed in fresh on every render.
     *  `Option` because a single-select listbox may have no selection yet.
     *  Drives `aria-selected` and `data-selected` on items, which item the
     *  Listbox highlights when it opens onto a selection, and the hidden
     *  form input submitted under `name`. */
    maybeSelectedValue: Option.Option<Value>;
}> & ItemToValueInput<Item, Value>;
type BundleUpdateReturn<Value extends string> = Update.ReturnWithOutMessage<Model, Message, OutMessage<Value>>;
/** The `view`, `update`, and programmatic helpers that `Listbox.create`
 *  returns, bound to one `Item` and `Value` pair. Name it to annotate a
 *  value that holds a created bundle, such as a field on a config object
 *  or a function parameter that takes the bundle rather than calling
 *  `create` itself. */
export type Bundle<Item = string, Value extends string = Item extends string ? Item : string> = Readonly<{
    view: SubmodelView<Model, Message, ViewInputs<Item, Value>>;
    update: (model: Model, message: Message) => BundleUpdateReturn<Value>;
    selectItem: (model: Model, item: Value) => BundleUpdateReturn<Value>;
    open: (model: Model) => BundleUpdateReturn<Value>;
    close: (model: Model) => BundleUpdateReturn<Value>;
}>;
/** Pairs the single-select listbox's `view` and `update` (and programmatic
 *  helpers) behind a single Item-typed entry point. Declaring the listbox
 *  once at module scope ensures the view's `Item` type and the update's
 *  OutMessage `item` type can't drift:
 *
 *  ```ts
 *  const ColorListbox = Listbox.create<Color>()
 *
 *  // In view:
 *  h.submodel({ view: ColorListbox.view, ... })
 *
 *  // In the parent update, pass ColorListbox.update to Update.foldChild and
 *  // handle Listbox.OutMessage<Color> in foldOutMessage.
 *  ```
 *
 *  Two type params support object-typed items with an `itemToValue`
 *  extractor: pass `<Person, string>` when items are objects whose
 *  extracted value is a plain string. `Value` defaults to `Item` when
 *  `Item extends string`, else defaults to `string`. */
export declare const create: <Item = string, Value extends string = Item extends string ? Item : string>() => Bundle<Item, Value>;
export {};
