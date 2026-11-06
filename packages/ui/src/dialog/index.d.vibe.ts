import { Effect, Option, Schema } from 'effect';
import * as Command from 'foldkit/command';
import { type ChildAttribute, type Html } from 'foldkit/html';
import * as Mount from 'foldkit/mount';
import * as Update from 'foldkit/update';
/** Schema for the dialog component's state, tracking its unique ID, open/closed status, animation support, and animation lifecycle phase. */
export declare const Model: Schema.Struct<{
    readonly id: Schema.String;
    readonly isOpen: Schema.Boolean;
    readonly isAnimated: Schema.Boolean;
    readonly animation: Schema.Struct<{
        readonly id: Schema.String;
        readonly isShowing: Schema.Boolean;
        readonly transitionState: Schema.Literals<readonly ["Idle", "EnterStart", "EnterAnimating", "LeaveStart", "LeaveAnimating"]>;
        readonly transitionGeneration: Schema.Number;
    }>;
    readonly maybeFocusSelector: Schema.Option<Schema.String>;
}>;
export type Model = typeof Model.Type;
/** Union of all messages the dialog component can produce. */
export declare const Message: import("foldkit/message").MessageUnion<{
    readonly RequestedOpen: {};
    readonly RequestedClose: {};
    readonly SucceededShowDialog: {};
    readonly FailedShowDialog: {};
    readonly SucceededAcquireResources: {};
    readonly FailedAcquireResources: {};
    readonly CompletedCloseDialog: {};
    readonly Unmounted: {};
    readonly CompletedReleaseDialogResources: {};
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
export type SucceededShowDialog = typeof Message.SucceededShowDialog.Type;
export type FailedShowDialog = typeof Message.FailedShowDialog.Type;
export type SucceededAcquireResources = typeof Message.SucceededAcquireResources.Type;
export type FailedAcquireResources = typeof Message.FailedAcquireResources.Type;
export type CompletedCloseDialog = typeof Message.CompletedCloseDialog.Type;
export type Unmounted = typeof Message.Unmounted.Type;
export type CompletedReleaseDialogResources = typeof Message.CompletedReleaseDialogResources.Type;
export type Message = typeof Message.Type;
/** Union of out-messages the dialog component can produce. */
export declare const OutMessage: import("foldkit/message").MessageUnion<{
    readonly Opened: {};
    readonly Closed: {};
}>;
export type Opened = typeof OutMessage.Opened.Type;
export type Closed = typeof OutMessage.Closed.Type;
export type OutMessage = typeof OutMessage.Type;
/** Configuration for creating a dialog model with `init`. The `id` must be
 *  non-empty and unique within the document: it keys the dialog element, its
 *  ARIA references, and the framework's per-dialog resource cleanup, so a
 *  duplicate or empty id breaks cleanup accounting.
 *
 *  The dialog derives framework-managed ids from this `id`: `-dialog-title`,
 *  `-dialog-description`, and `-panel` (the animation panel). Spread
 *  `RenderInfo`'s `title` / `description` onto your heading and description
 *  elements rather than constructing those ids yourself. */
export type InitConfig = Readonly<{
    id: string;
    isAnimated?: boolean;
    /** CSS selector for the element that receives focus when the dialog opens.
     *  A selector-based override of the `initialFocus` RenderInfo marker, for the
     *  cases a spread-on marker cannot express: an element whose id you do not
     *  own, or a descendant selector. Takes precedence over `initialFocus`. With
     *  neither set, focus falls to the first focusable element. */
    focusSelector?: string;
}>;
/** Creates a closed dialog model from a config. Use `boot` when the Dialog
 *  should open as the application starts. */
export declare const init: (config: InitConfig) => Model;
/** Data attribute the dialog places on the `initialFocus` RenderInfo group and
 *  focuses on open. */
export declare const initialFocusMarkerAttribute = "foldkit-dialog-initial-focus";
/** Selector for {@link initialFocusMarkerAttribute}, focused against the open
 *  dialog when no `focusSelector` is configured. */
export declare const initialFocusMarkerSelector = "[data-foldkit-dialog-initial-focus]";
type UpdateReturn = Update.ReturnWithOutMessage<Model, Message, OutMessage>;
/** Opens the native dialog element through `Dom.showDialog`, then locks page
 *  scroll when that call acquired the dialog resources. `Dom.showDialog`
 *  makes the background inert while leaving DevTools available as a separate
 *  developer overlay. It calls `show()` rather than `showModal()` so DevTools
 *  can stay interactive, layers the dialog with a high z-index, and traps
 *  focus. For an unhandled Escape on the topmost Dialog, the
 *  helper dispatches a `CustomEvent` named `cancel`; the Dialog view maps that
 *  signal to `RequestedClose` while suppressing native `cancel` events. The
 *  Dialog component supplies its own backdrop. If the dialog element is gone
 *  by the time the show runs, the Command reports `FailedShowDialog` without
 *  taking the scroll lock. The update function then closes the Model. The
 *  acquisition becomes uninterruptible after the committed element is found,
 *  so modal resources and the scroll lock cannot split. A concurrent
 *  lifecycle acquisition reuses the resources already held by the id. */
export declare const ShowDialog: Command.CommandDefinitionWithArgs<"ShowDialog", {
    id: Schema.String;
    focusSelector: Schema.String;
}, Effect.Effect<{
    readonly _tag: "FailedShowDialog";
} | {
    readonly _tag: "SucceededShowDialog";
}, never, never>>;
/** Reacquires an initially visible Dialog's framework resources when its
 *  element mounts, including after development Model preservation restores an
 *  open Dialog without replaying initialization Commands. A successful
 *  acquisition also resumes a preserved animation transition from its current
 *  phase. */
export declare const AcquireResources: Mount.MountDefinitionWithArgs<"AcquireResources", {
    id: Schema.String;
    focusSelector: Schema.String;
}, {
    readonly _tag: "FailedAcquireResources";
} | {
    readonly _tag: "SucceededAcquireResources";
}>;
/** Calls `close()` on the native dialog element and unlocks page scroll when
 *  the close released the resources `ShowDialog` installed. A close that runs
 *  before the show has installed them leaves the lock alone. When the show
 *  then fails, it releases the lock itself. When the show succeeds, update
 *  closes the dialog again. If the dialog element is gone by the time the
 *  close runs, the Command calls `Dom.releaseDialogResources` instead. That
 *  releases the scroll lock, focus trap, return focus, and stack entry if the
 *  dialog still holds them. The background is restored before return focus. */
export declare const CloseDialog: Command.CommandDefinitionWithArgs<"CloseDialog", {
    id: Schema.String;
}, Effect.Effect<{
    readonly _tag: "CompletedCloseDialog";
}, never, never>>;
/** Releases the framework hygiene the dialog holds while open (scroll lock,
 *  focus trap, return focus, stack entry, background isolation) when the
 *  element unmounts without a purposeful close. Calling it after
 *  `CloseDialog` released those resources is a no-op. */
export declare const ReleaseDialogResources: Command.CommandDefinitionWithArgs<"ReleaseDialogResources", {
    id: Schema.String;
}, Effect.Effect<{
    readonly _tag: "CompletedReleaseDialogResources";
}, never, never>>;
/** Processes a Dialog Message and returns the next Model and optional Commands. */
export declare const update: (model: Model, message: Message) => Readonly<{
    model: {
        readonly id: string;
        readonly isOpen: boolean;
        readonly isAnimated: boolean;
        readonly animation: {
            readonly id: string;
            readonly isShowing: boolean;
            readonly transitionState: "EnterAnimating" | "EnterStart" | "Idle" | "LeaveAnimating" | "LeaveStart";
            readonly transitionGeneration: number;
        };
        readonly maybeFocusSelector: Option.Option<string>;
    };
    commands?: Update.Commands<{
        readonly _tag: "CompletedCloseDialog";
    } | {
        readonly _tag: "CompletedReleaseDialogResources";
    } | {
        readonly _tag: "FailedAcquireResources";
    } | {
        readonly _tag: "FailedShowDialog";
    } | {
        readonly _tag: "RequestedClose";
    } | {
        readonly _tag: "RequestedOpen";
    } | {
        readonly _tag: "SucceededAcquireResources";
    } | {
        readonly _tag: "SucceededShowDialog";
    } | {
        readonly _tag: "Unmounted";
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
    }, never>;
    outMessage?: {
        readonly _tag: "Closed";
    } | {
        readonly _tag: "Opened";
    };
}>;
/** Creates a Dialog and opens it through the normal update path. Use the
 *  returned Model and Commands during application initialization so the
 *  initially visible Dialog acquires modal isolation, scroll locking, focus
 *  management, stack registration, and runtime-owned cleanup. */
export declare const boot: (config: InitConfig) => UpdateReturn;
/** Programmatically opens the dialog. */
export declare const open: (model: Model) => UpdateReturn;
/** Programmatically closes the dialog. */
export declare const close: (model: Model) => UpdateReturn;
/** Returns the framework-managed id the dialog's `aria-labelledby` points at,
 *  the `-dialog-title` suffix on `model.id`.
 *
 *  The primary path is spreading `RenderInfo`'s `title` onto your heading
 *  (`h.h2([...title], [...])`), which carries this id for you. Reach for this
 *  helper only when you need the id as a value outside `toView`: a Command that
 *  calls `getElementById`, a cross-element `aria-describedby`, or a test. Do not
 *  hand-roll the id string. */
export declare const titleId: (model: Model) => string;
/** Returns the framework-managed description id, the
 *  `-dialog-description` suffix on `model.id`.
 *
 *  The primary path is spreading `RenderInfo`'s `description` onto your
 *  description element (`h.p([...description], [...])`), which carries this id
 *  for you. Reach for this helper only when you need the id as a value outside
 *  `toView`: a Command that calls `getElementById`, a cross-element
 *  `aria-describedby`, or a test. When the description is rendered, set
 *  `ViewInputs.hasDescription` so the dialog points at this id. Do not
 *  hand-roll the id string. */
export declare const descriptionId: (model: Model) => string;
/** Render-time payload published to the consumer's `toView`.
 *
 *  - `dialog`: attributes for the native `<dialog>` element. Carries
 *    the id, ARIA labelling and modal state, `open` prop, positioning style, a `cancel` handler
 *    that prevents a file picker's native cancellation from closing the dialog
 *    while mapping `Dom.showDialog`'s Escape signal to `RequestedClose`,
 *    an `OnMount` acquisition that restores modal resources for an initially
 *    visible or development-preserved Dialog, and an `OnUnmount` backstop that
 *    releases framework hygiene (scroll lock, focus trap, background
 *    isolation, return focus) if the element is removed from the DOM while
 *    still open, such as navigating away from a route-keyed subtree.
 *    The consumer MUST render an `h.dialog(...)` element so the framework
 *    can open and close it, and so the unmount backstop can fire.
 *  - `backdrop`: attributes for the backdrop element. Includes the
 *    Animation data attributes and the `OnClick` handler that closes
 *    the dialog on outside-click (suppressed while a leave animation
 *    is in progress).
 *  - `panel`: attributes for the panel element. Includes the panel id
 *    (`${model.id}-panel`) and the Animation data attributes.
 *  - `title`: attributes for the accessible-name heading. Carries the
 *    framework-managed id the dialog's `aria-labelledby` points at. Spread
 *    onto your heading element (`h.h2([...title], [...])`) so labelling
 *    wires up without hand-rolling the id.
 *  - `description`: attributes for the description element. Carries the
 *    framework-managed id referenced by `aria-describedby` when
 *    `ViewInputs.hasDescription` is true. Spread onto your description element
 *    (`h.p([...description], [...])`).
 *  - `initialFocus`: attributes for the element that should receive focus when
 *    the dialog opens. Spread onto that element (`h.input([...initialFocus])`).
 *    A configured `focusSelector` (see `init`) takes precedence, and focus
 *    falls back to the default when no element carries the group.
 *  - `closeButton`: attributes for an in-panel close control such as a Cancel
 *    or dismiss button. Carries the `OnClick` handler that closes the
 *    dialog (suppressed while a leave animation is in progress). Spread
 *    onto your own button so a plain close needs no parent message. Sets
 *    `type="button"` so that a close control inside a `form` element in the
 *    panel closes without also submitting the form. Spread a later `h.Type`
 *    to override it.
 *  - `isVisible`: derived from `isOpen` and the Animation
 *    `transitionState`. The consumer renders backdrop + panel only
 *    while this is true. */
export type RenderInfo = Readonly<{
    dialog: ReadonlyArray<ChildAttribute>;
    backdrop: ReadonlyArray<ChildAttribute>;
    panel: ReadonlyArray<ChildAttribute>;
    title: ReadonlyArray<ChildAttribute>;
    description: ReadonlyArray<ChildAttribute>;
    initialFocus: ReadonlyArray<ChildAttribute>;
    closeButton: ReadonlyArray<ChildAttribute>;
    isVisible: boolean;
}>;
/** Per-render view inputs passed to `view` via `h.submodel`'s `viewInputs` field. */
export type ViewInputs = Readonly<{
    toView: (render: RenderInfo) => Html;
    hasDescription?: boolean;
}>;
/** Renders a headless modal dialog backed by the native `<dialog>` element.
 *  `ShowDialog` and the dialog's Mount open it through `Dom.showDialog`,
 *  isolate the background, trap focus, and handle Escape on the topmost
 *  dialog. The component supplies its own backdrop. */
export declare const view: import("foldkit/submodel").View<{
    readonly id: string;
    readonly isOpen: boolean;
    readonly isAnimated: boolean;
    readonly animation: {
        readonly id: string;
        readonly isShowing: boolean;
        readonly transitionState: "EnterAnimating" | "EnterStart" | "Idle" | "LeaveAnimating" | "LeaveStart";
        readonly transitionGeneration: number;
    };
    readonly maybeFocusSelector: Option.Option<string>;
}, {
    readonly _tag: "CompletedCloseDialog";
} | {
    readonly _tag: "CompletedReleaseDialogResources";
} | {
    readonly _tag: "FailedAcquireResources";
} | {
    readonly _tag: "FailedShowDialog";
} | {
    readonly _tag: "RequestedClose";
} | {
    readonly _tag: "RequestedOpen";
} | {
    readonly _tag: "SucceededAcquireResources";
} | {
    readonly _tag: "SucceededShowDialog";
} | {
    readonly _tag: "Unmounted";
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
}, Readonly<{
    toView: (render: RenderInfo) => Html;
    hasDescription?: boolean;
}>>;
export {};
