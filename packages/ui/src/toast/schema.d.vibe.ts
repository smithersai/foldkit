import { Duration, Schema } from 'effect';
/** Semantic category of a toast. Drives the default ARIA role: `status` for
 *  `Info` / `Success`, `alert` for `Warning` / `Error`. Also surfaced as
 *  `data-variant` on each entry for per-variant CSS. This is the only
 *  content-adjacent field the component owns. The rest of the entry's
 *  content lives in the user-provided payload. */
export declare const Variant: Schema.Literals<readonly ["Info", "Success", "Warning", "Error"]>;
export type Variant = typeof Variant.Type;
/** Where the toast viewport is anchored on the screen and how entries stack. */
export declare const Position: Schema.Literals<readonly ["TopLeft", "TopCenter", "TopRight", "BottomLeft", "BottomCenter", "BottomRight"]>;
export type Position = typeof Position.Type;
/** Direction in which a pointer can drag an entry to dismiss it. */
export declare const SwipeDirection: Schema.Literals<readonly ["Left", "Right"]>;
export type SwipeDirection = typeof SwipeDirection.Type;
/** Per-entry swipe gesture state. `Dragging` retains the initiating
 *  `pointerId`, so move, release, and cancel Messages update only the entry
 *  that started the gesture and ignore unrelated touches. `Settling` returns
 *  a cancelled or short swipe to rest. `Dismissing` retains the release offset
 *  and direction while the leave animation carries the entry off-screen. The
 *  settle generation lives in the entry's `swipeVersion` so a stale settle
 *  timer cannot clear a later gesture. */
export declare const SwipeState: import("foldkit/schema").TaggedUnion<{
    readonly Idle: {};
    readonly Dragging: {
        pointerId: Schema.Number;
        startX: Schema.Number;
        currentX: Schema.Number;
    };
    readonly Settling: {
        offsetX: Schema.Number;
    };
    readonly Dismissing: {
        offsetX: Schema.Number;
        direction: Schema.Literals<readonly ["Left", "Right"]>;
    };
}>;
export type SwipeState = typeof SwipeState.Type;
/** Default distance in pixels a pointer must travel to dismiss a Toast. */
export declare const DEFAULT_SWIPE_THRESHOLD = 40;
/** Default direction in which a pointer can dismiss a Toast. */
export declare const DEFAULT_SWIPE_DIRECTION: SwipeDirection;
/** Time an entry remains in `Settling` after a short or cancelled swipe,
 *  allowing consumer CSS to animate it back to rest. */
export declare const SWIPE_SETTLE_DURATION: Duration.Duration;
/** Schema factory for a single toast entry. `payloadSchema` is user-provided
 *  and defines the shape of per-entry content, whatever the consumer wants
 *  to encode. The component itself owns only lifecycle + a11y fields: `id`,
 *  `variant` (for ARIA role), `animation`, `maybeDuration`,
 *  `pendingDismissVersion` (for cancellable auto-dismiss), `isHovered`
 *  (for pause-on-hover), and `swipeState` + `swipeVersion` (for the
 *  opt-in swipe gesture). */
export declare const makeEntry: <A, I>(payloadSchema: Schema.Codec<A, I>) => Schema.Struct<{
    readonly id: Schema.String;
    readonly variant: Schema.Literals<readonly ["Info", "Success", "Warning", "Error"]>;
    readonly animation: Schema.Struct<{
        readonly id: Schema.String;
        readonly isShowing: Schema.Boolean;
        readonly transitionState: Schema.Literals<readonly ["Idle", "EnterStart", "EnterAnimating", "LeaveStart", "LeaveAnimating"]>;
        readonly transitionGeneration: Schema.Number;
    }>;
    readonly maybeDuration: Schema.Option<Schema.DurationFromMillis>;
    readonly pendingDismissVersion: Schema.Number;
    readonly isHovered: Schema.Boolean;
    readonly swipeState: import("foldkit/schema").TaggedUnion<{
        readonly Idle: {};
        readonly Dragging: {
            pointerId: Schema.Number;
            startX: Schema.Number;
            currentX: Schema.Number;
        };
        readonly Settling: {
            offsetX: Schema.Number;
        };
        readonly Dismissing: {
            offsetX: Schema.Number;
            direction: Schema.Literals<readonly ["Left", "Right"]>;
        };
    }>;
    readonly swipeVersion: Schema.Number;
    readonly payload: Schema.Codec<A, I, never, never>;
}>;
/** Schema factory for the toast container's state. `nextEntryKey` is a
 *  monotonic counter used to generate unique entry IDs purely from Model
 *  state. Thread the updated model through successive `show()` calls.
 *  Calling `show()` twice against the same pre-update model in the same tick
 *  will produce duplicate entry IDs. */
export declare const makeModel: <A, I>(payloadSchema: Schema.Codec<A, I>) => Schema.Struct<{
    readonly id: Schema.String;
    readonly defaultDuration: Schema.DurationFromMillis;
    readonly entries: Schema.$Array<Schema.Struct<{
        readonly id: Schema.String;
        readonly variant: Schema.Literals<readonly ["Info", "Success", "Warning", "Error"]>;
        readonly animation: Schema.Struct<{
            readonly id: Schema.String;
            readonly isShowing: Schema.Boolean;
            readonly transitionState: Schema.Literals<readonly ["Idle", "EnterStart", "EnterAnimating", "LeaveStart", "LeaveAnimating"]>;
            readonly transitionGeneration: Schema.Number;
        }>;
        readonly maybeDuration: Schema.Option<Schema.DurationFromMillis>;
        readonly pendingDismissVersion: Schema.Number;
        readonly isHovered: Schema.Boolean;
        readonly swipeState: import("foldkit/schema").TaggedUnion<{
            readonly Idle: {};
            readonly Dragging: {
                pointerId: Schema.Number;
                startX: Schema.Number;
                currentX: Schema.Number;
            };
            readonly Settling: {
                offsetX: Schema.Number;
            };
            readonly Dismissing: {
                offsetX: Schema.Number;
                direction: Schema.Literals<readonly ["Left", "Right"]>;
            };
        }>;
        readonly swipeVersion: Schema.Number;
        readonly payload: Schema.Codec<A, I, never, never>;
    }>>;
    readonly nextEntryKey: Schema.Number;
    readonly maybeSwipeConfig: Schema.Option<Schema.Struct<{
        readonly direction: Schema.Literals<readonly ["Left", "Right"]>;
        readonly threshold: Schema.Number;
    }>>;
}>;
/** Payload-independent Message variants shared by every bound Toast module. */
export declare const Message: import("foldkit/message").MessageUnion<{
    readonly Dismissed: {
        entryId: Schema.String;
    };
    readonly DismissedAll: {};
    readonly CompletedWaitBeforeDismissal: {
        entryId: Schema.String;
        version: Schema.Number;
    };
    readonly HoveredEntry: {
        entryId: Schema.String;
    };
    readonly LeftEntry: {
        entryId: Schema.String;
    };
    readonly GotAnimationMessage: {
        entryId: Schema.String;
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
    readonly PressedEntryPointer: {
        entryId: Schema.String;
        pointerId: Schema.Number;
        clientX: Schema.Number;
    };
    readonly MovedSwipePointer: {
        pointerId: Schema.Number;
        clientX: Schema.Number;
    };
    readonly ReleasedSwipePointer: {
        pointerId: Schema.Number;
        clientX: Schema.Number;
    };
    readonly CancelledSwipe: {
        pointerId: Schema.Number;
    };
    readonly PressedEscape: {};
    readonly CompletedWaitForSwipeSettled: {
        entryId: Schema.String;
        version: Schema.Number;
    };
}>;
export type Dismissed = typeof Message.Dismissed.Type;
export type DismissedAll = typeof Message.DismissedAll.Type;
export type CompletedWaitBeforeDismissal = typeof Message.CompletedWaitBeforeDismissal.Type;
export type HoveredEntry = typeof Message.HoveredEntry.Type;
export type LeftEntry = typeof Message.LeftEntry.Type;
export type GotAnimationMessage = typeof Message.GotAnimationMessage.Type;
export type PressedEntryPointer = typeof Message.PressedEntryPointer.Type;
export type MovedSwipePointer = typeof Message.MovedSwipePointer.Type;
export type ReleasedSwipePointer = typeof Message.ReleasedSwipePointer.Type;
export type CancelledSwipe = typeof Message.CancelledSwipe.Type;
export type PressedEscape = typeof Message.PressedEscape.Type;
export type CompletedWaitForSwipeSettled = typeof Message.CompletedWaitForSwipeSettled.Type;
/** Factory for the union of all messages the toast component can produce. */
export declare const makeMessage: <A, I>(payloadSchema: Schema.Codec<A, I>) => import("foldkit/message").MessageUnion<{
    readonly Added: {
        entry: Schema.Struct<{
            readonly id: Schema.String;
            readonly variant: Schema.Literals<readonly ["Info", "Success", "Warning", "Error"]>;
            readonly animation: Schema.Struct<{
                readonly id: Schema.String;
                readonly isShowing: Schema.Boolean;
                readonly transitionState: Schema.Literals<readonly ["Idle", "EnterStart", "EnterAnimating", "LeaveStart", "LeaveAnimating"]>;
                readonly transitionGeneration: Schema.Number;
            }>;
            readonly maybeDuration: Schema.Option<Schema.DurationFromMillis>;
            readonly pendingDismissVersion: Schema.Number;
            readonly isHovered: Schema.Boolean;
            readonly swipeState: import("foldkit/schema").TaggedUnion<{
                readonly Idle: {};
                readonly Dragging: {
                    pointerId: Schema.Number;
                    startX: Schema.Number;
                    currentX: Schema.Number;
                };
                readonly Settling: {
                    offsetX: Schema.Number;
                };
                readonly Dismissing: {
                    offsetX: Schema.Number;
                    direction: Schema.Literals<readonly ["Left", "Right"]>;
                };
            }>;
            readonly swipeVersion: Schema.Number;
            readonly payload: Schema.Codec<A, I, never, never>;
        }>;
    };
    readonly Dismissed: {
        entryId: Schema.String;
    };
    readonly DismissedAll: {};
    readonly CompletedWaitBeforeDismissal: {
        entryId: Schema.String;
        version: Schema.Number;
    };
    readonly HoveredEntry: {
        entryId: Schema.String;
    };
    readonly LeftEntry: {
        entryId: Schema.String;
    };
    readonly GotAnimationMessage: {
        entryId: Schema.String;
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
    readonly PressedEntryPointer: {
        entryId: Schema.String;
        pointerId: Schema.Number;
        clientX: Schema.Number;
    };
    readonly MovedSwipePointer: {
        pointerId: Schema.Number;
        clientX: Schema.Number;
    };
    readonly ReleasedSwipePointer: {
        pointerId: Schema.Number;
        clientX: Schema.Number;
    };
    readonly CancelledSwipe: {
        pointerId: Schema.Number;
    };
    readonly PressedEscape: {};
    readonly CompletedWaitForSwipeSettled: {
        entryId: Schema.String;
        version: Schema.Number;
    };
}>;
/** Factory for the union of out-messages the toast component can produce. */
export declare const makeOutMessage: <A, I>(payloadSchema: Schema.Codec<A, I>) => import("foldkit/message").MessageUnion<{
    readonly DismissedToast: {
        payload: Schema.Codec<A, I, never, never>;
    };
}>;
/** Opt-in configuration for swipe-to-dismiss. Without `swipeToDismiss`,
 *  the view attaches no pointer handler and swipe Messages do nothing.
 *  Pass `{}` for the default rightward swipe, `{ threshold }` to change
 *  the distance, or `{ direction: 'Left' }` to swipe left. */
export type SwipeToDismissConfig = Readonly<{
    threshold?: number;
    direction?: SwipeDirection;
}>;
/** Configuration for creating a toast container model. `defaultDuration` is
 *  applied to any `show()` call that doesn't provide its own `duration` or
 *  pass `sticky: true`. Accepts any Effect Duration input; a bare number is
 *  interpreted as milliseconds. */
export type InitConfig = Readonly<{
    id: string;
    defaultDuration?: Duration.Input;
    swipeToDismiss?: SwipeToDismissConfig;
}>;
export declare const DEFAULT_DURATION: Duration.Duration;
