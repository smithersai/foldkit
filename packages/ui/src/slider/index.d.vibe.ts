import { Schema } from 'effect';
import { type Update } from 'foldkit';
import { type ChildAttribute, type Html } from 'foldkit/html';
import { type Reflect } from 'foldkit/submodel';
import * as Subscription from 'foldkit/subscription';
export { fractionOfValue } from '../internal/range.js';
/** Schema for the Slider's private interaction state. The current
 *  value is owned by the parent and passed in via `ViewInputs.value`, so it is
 *  not stored here. `min`, `max`, and `step` configure how the drag Subscription
 *  maps pointer positions into values. `dragState` tracks the active drag phase
 *  and captures the pre-drag value so Escape can restore it. */
export declare const Model: Schema.Struct<{
    readonly id: Schema.String;
    readonly min: Schema.Number;
    readonly max: Schema.Number;
    readonly step: Schema.Number;
    readonly dragState: import("foldkit/schema").TaggedUnion<{
        readonly Idle: {};
        readonly Dragging: {
            originValue: Schema.Number;
        };
    }>;
}>;
export type Model = typeof Model.Type;
/** Union of all Messages the Slider can produce. */
export declare const Message: import("foldkit/message").MessageUnion<{
    readonly PressedThumb: {
        originValue: Schema.Number;
    };
    readonly PressedPointer: {
        value: Schema.Number;
        originValue: Schema.Number;
    };
    readonly MovedDragPointer: {
        value: Schema.Number;
    };
    readonly ReleasedDragPointer: {};
    readonly CancelledDrag: {};
    readonly PressedKeyboardNavigation: {
        direction: Schema.Literals<readonly ["StepDecrement", "StepIncrement", "PageDecrement", "PageIncrement", "Min", "Max"]>;
        value: Schema.Number;
    };
}>;
export type Message = typeof Message.Type;
export type PressedThumb = typeof Message.PressedThumb.Type;
export type PressedPointer = typeof Message.PressedPointer.Type;
export type MovedDragPointer = typeof Message.MovedDragPointer.Type;
export type ReleasedDragPointer = typeof Message.ReleasedDragPointer.Type;
export type CancelledDrag = typeof Message.CancelledDrag.Type;
export type PressedKeyboardNavigation = typeof Message.PressedKeyboardNavigation.Type;
/** Union of all OutMessages the Slider can emit to its parent. */
export declare const OutMessage: import("foldkit/message").MessageUnion<{
    readonly ChangedValue: {
        value: Schema.Number;
    };
}>;
export type OutMessage = typeof OutMessage.Type;
/** Configuration for creating a Slider Model with `init`. */
export type InitConfig = Readonly<{
    id: string;
    min: number;
    max: number;
    step: number;
}>;
/** Creates an initial Slider Model from a config. The value lives in the
 *  parent Model; initialize it there and snap it with {@link snapAndClamp}. */
export declare const init: (config: InitConfig) => Model;
/** Snaps a value to the nearest step and clamps it into `[min, max]`. Exported
 *  so a parent can conform the value it owns to the Slider's range, for example
 *  when seeding the initial value or reacting to an external update. */
export declare const snapAndClamp: (value: number, min: number, max: number, step: number) => number;
/** Processes a Slider Message and returns the next Model, optional Commands,
 *  and an optional OutMessage for the parent. The value lives in the parent
 *  Model: the view supplies the current value on the Messages that need it,
 *  and value changes surface as `ChangedValue` rather than mutating this
 *  Model. */
export declare const update: (model: Model, message: Message) => Readonly<{
    model: {
        readonly id: string;
        readonly min: number;
        readonly max: number;
        readonly step: number;
        readonly dragState: {
            readonly _tag: "Idle";
        } | {
            readonly _tag: "Dragging";
            readonly originValue: number;
        };
    };
    commands?: Update.Commands<{
        readonly _tag: "CancelledDrag";
    } | {
        readonly _tag: "ReleasedDragPointer";
    } | {
        readonly _tag: "MovedDragPointer";
        readonly value: number;
    } | {
        readonly _tag: "PressedKeyboardNavigation";
        readonly direction: "Max" | "Min" | "PageDecrement" | "PageIncrement" | "StepDecrement" | "StepIncrement";
        readonly value: number;
    } | {
        readonly _tag: "PressedPointer";
        readonly value: number;
        readonly originValue: number;
    } | {
        readonly _tag: "PressedThumb";
        readonly originValue: number;
    }, never>;
    outMessage?: {
        readonly _tag: "ChangedValue";
        readonly value: number;
    };
}>;
/** Reflects an externally-driven range onto the slider. Use this when min/max
 *  derive from external state (e.g. a bounded buffer whose first/last index
 *  shifts over time). The parent owns the value, so conform it to the new range
 *  in the same update with {@link snapAndClamp}. */
export declare const reflectRange: Reflect<Model, Readonly<{
    min: number;
    max: number;
}>>;
/** Maps a pointer position to a Slider value. Vertical tracks place `min` at
 *  the bottom and `max` at the top. Edge-aligned tracks measure the rendered
 *  thumb and map the pointer across the same inset range it travels through. */
export declare const valueFromPointer: (clientX: number, clientY: number, track: Element, min: number, max: number) => number;
/** Builds Slider drag Subscriptions that find the track through the supplied
 *  root resolver. Use this when the Slider is rendered inside a Shadow DOM.
 *  The resolver runs at subscription time. */
export declare const subscriptionsForRoot: (getTrackRoot: () => Document | ShadowRoot) => {
    readonly dragPointer: Subscription.EntryWithoutKeepAlive<{
        readonly id: string;
        readonly min: number;
        readonly max: number;
        readonly step: number;
        readonly dragState: {
            readonly _tag: "Idle";
        } | {
            readonly _tag: "Dragging";
            readonly originValue: number;
        };
    }, {
        readonly _tag: "CancelledDrag";
    } | {
        readonly _tag: "ReleasedDragPointer";
    } | {
        readonly _tag: "MovedDragPointer";
        readonly value: number;
    } | {
        readonly _tag: "PressedKeyboardNavigation";
        readonly direction: "Max" | "Min" | "PageDecrement" | "PageIncrement" | "StepDecrement" | "StepIncrement";
        readonly value: number;
    } | {
        readonly _tag: "PressedPointer";
        readonly value: number;
        readonly originValue: number;
    } | {
        readonly _tag: "PressedThumb";
        readonly originValue: number;
    }, {
        readonly dragActivity: "Active" | "Idle";
        readonly id: string;
        readonly min: number;
        readonly max: number;
    }, never> & {
        readonly __subscription: never;
    };
    readonly dragEscape: Subscription.EntryWithoutKeepAlive<{
        readonly id: string;
        readonly min: number;
        readonly max: number;
        readonly step: number;
        readonly dragState: {
            readonly _tag: "Idle";
        } | {
            readonly _tag: "Dragging";
            readonly originValue: number;
        };
    }, {
        readonly _tag: "CancelledDrag";
    } | {
        readonly _tag: "ReleasedDragPointer";
    } | {
        readonly _tag: "MovedDragPointer";
        readonly value: number;
    } | {
        readonly _tag: "PressedKeyboardNavigation";
        readonly direction: "Max" | "Min" | "PageDecrement" | "PageIncrement" | "StepDecrement" | "StepIncrement";
        readonly value: number;
    } | {
        readonly _tag: "PressedPointer";
        readonly value: number;
        readonly originValue: number;
    } | {
        readonly _tag: "PressedThumb";
        readonly originValue: number;
    }, {
        readonly dragActivity: "Active" | "Idle";
    }, never> & {
        readonly __subscription: never;
    };
};
/** Default drag Subscriptions, with the track looked up via `document`. */
export declare const subscriptions: {
    readonly dragPointer: Subscription.EntryWithoutKeepAlive<{
        readonly id: string;
        readonly min: number;
        readonly max: number;
        readonly step: number;
        readonly dragState: {
            readonly _tag: "Idle";
        } | {
            readonly _tag: "Dragging";
            readonly originValue: number;
        };
    }, {
        readonly _tag: "CancelledDrag";
    } | {
        readonly _tag: "ReleasedDragPointer";
    } | {
        readonly _tag: "MovedDragPointer";
        readonly value: number;
    } | {
        readonly _tag: "PressedKeyboardNavigation";
        readonly direction: "Max" | "Min" | "PageDecrement" | "PageIncrement" | "StepDecrement" | "StepIncrement";
        readonly value: number;
    } | {
        readonly _tag: "PressedPointer";
        readonly value: number;
        readonly originValue: number;
    } | {
        readonly _tag: "PressedThumb";
        readonly originValue: number;
    }, {
        readonly dragActivity: "Active" | "Idle";
        readonly id: string;
        readonly min: number;
        readonly max: number;
    }, never> & {
        readonly __subscription: never;
    };
    readonly dragEscape: Subscription.EntryWithoutKeepAlive<{
        readonly id: string;
        readonly min: number;
        readonly max: number;
        readonly step: number;
        readonly dragState: {
            readonly _tag: "Idle";
        } | {
            readonly _tag: "Dragging";
            readonly originValue: number;
        };
    }, {
        readonly _tag: "CancelledDrag";
    } | {
        readonly _tag: "ReleasedDragPointer";
    } | {
        readonly _tag: "MovedDragPointer";
        readonly value: number;
    } | {
        readonly _tag: "PressedKeyboardNavigation";
        readonly direction: "Max" | "Min" | "PageDecrement" | "PageIncrement" | "StepDecrement" | "StepIncrement";
        readonly value: number;
    } | {
        readonly _tag: "PressedPointer";
        readonly value: number;
        readonly originValue: number;
    } | {
        readonly _tag: "PressedThumb";
        readonly originValue: number;
    }, {
        readonly dragActivity: "Active" | "Idle";
    }, never> & {
        readonly __subscription: never;
    };
};
/** Attribute groups the Slider provides to the consumer's `toView`
 *  callback. Each group carries the boundary's captured dispatch, so the
 *  consumer can spread it directly into element attributes without manual
 *  Message wrapping. */
export type SliderAttributes = Readonly<{
    root: ReadonlyArray<ChildAttribute>;
    track: ReadonlyArray<ChildAttribute>;
    filledTrack: ReadonlyArray<ChildAttribute>;
    thumb: ReadonlyArray<ChildAttribute>;
    label: ReadonlyArray<ChildAttribute>;
    hiddenInput: ReadonlyArray<ChildAttribute>;
}>;
/** Direction in which the Slider lays out its track and maps pointer input. */
export declare const Orientation: Schema.Literals<readonly ["Horizontal", "Vertical"]>;
export type Orientation = typeof Orientation.Type;
/** Whether the thumb's center or outer edge aligns with the track endpoints. */
export declare const ThumbAlignment: Schema.Literals<readonly ["Center", "Edge"]>;
export type ThumbAlignment = typeof ThumbAlignment.Type;
/** Per-render view inputs passed to `view` via `h.submodel`'s `viewInputs` field. */
export type ViewInputs = Readonly<{
    /** The current value, read straight from the parent Model. The thumb
     *  position, `aria-valuenow`, and the filled track all derive from it. */
    value: number;
    toView: (attributes: SliderAttributes) => Html;
    /** Layout axis for the track, filled track, and thumb. Vertical Sliders
     *  place `min` at the bottom and `max` at the top. */
    orientation?: Orientation;
    /** How the thumb aligns within the track. `Center` keeps the thumb's
     *  center on the value point and lets it overflow by half its size at the
     *  extremes, matching the Slider's previous behavior. `Edge` insets the
     *  thumb's travel by `thumbSize` so it stays fully inside the track.
     *  Defaults to `Center` so existing Sliders keep their geometry. */
    thumbAlignment?: ThumbAlignment;
    /** CSS length of the thumb along the track axis, used only when
     *  `thumbAlignment` is `Edge` to inset the thumb's travel and align the
     *  fill with the thumb's center. Set this to the size your `toView`
     *  callback styles the thumb with. Defaults to `0.75rem`. */
    thumbSize?: string;
    ariaLabel?: string;
    ariaLabelledBy?: string;
    formatValue?: (value: number) => string;
    /** Marks the Slider unavailable with `aria-disabled="true"` and
     *  `data-disabled`. The thumb remains focusable, following Foldkit's
     *  convention that unavailable controls stay discoverable by keyboard and
     *  assistive technology. */
    isDisabled?: boolean;
    /** Prevents value changes while exposing read-only semantics with
     *  `aria-readonly="true"` and `data-readonly`. The thumb remains focusable.
     *  Independent of `isDisabled`: setting both emits both attribute sets, and
     *  either one removes the pointer and keyboard handlers.
     *
     *  A drag already in flight is not interrupted. The handlers this flag
     *  removes are what start a drag, and the pointermove Subscription runs off
     *  `dragState` in the Model until pointerup. `isDisabled` behaves the same
     *  way. */
    isReadOnly?: boolean;
    name?: string;
    /** Resolves the DOM root containing the Slider track. Defaults to `document`.
     *  Provide a ShadowRoot when rendering the Slider inside a shadow tree so pointer
     *  events on the track can map the pointer position into a value. */
    getTrackRoot?: () => Document | ShadowRoot;
}>;
/** Renders an accessible slider by building ARIA attribute groups and
 *  delegating layout to the consumer's `toView` callback. Follows the
 *  WAI-ARIA slider pattern: role="slider" on the thumb, aria-valuemin /
 *  aria-valuemax / aria-valuenow, keyboard navigation by step / page / home /
 *  end. Pointer drag is handled by the Slider's drag Subscriptions. */
export declare const view: import("foldkit/submodel").View<{
    readonly id: string;
    readonly min: number;
    readonly max: number;
    readonly step: number;
    readonly dragState: {
        readonly _tag: "Idle";
    } | {
        readonly _tag: "Dragging";
        readonly originValue: number;
    };
}, {
    readonly _tag: "CancelledDrag";
} | {
    readonly _tag: "ReleasedDragPointer";
} | {
    readonly _tag: "MovedDragPointer";
    readonly value: number;
} | {
    readonly _tag: "PressedKeyboardNavigation";
    readonly direction: "Max" | "Min" | "PageDecrement" | "PageIncrement" | "StepDecrement" | "StepIncrement";
    readonly value: number;
} | {
    readonly _tag: "PressedPointer";
    readonly value: number;
    readonly originValue: number;
} | {
    readonly _tag: "PressedThumb";
    readonly originValue: number;
}, Readonly<{
    /** The current value, read straight from the parent Model. The thumb
     *  position, `aria-valuenow`, and the filled track all derive from it. */
    value: number;
    toView: (attributes: SliderAttributes) => Html;
    /** Layout axis for the track, filled track, and thumb. Vertical Sliders
     *  place `min` at the bottom and `max` at the top. */
    orientation?: Orientation;
    /** How the thumb aligns within the track. `Center` keeps the thumb's
     *  center on the value point and lets it overflow by half its size at the
     *  extremes, matching the Slider's previous behavior. `Edge` insets the
     *  thumb's travel by `thumbSize` so it stays fully inside the track.
     *  Defaults to `Center` so existing Sliders keep their geometry. */
    thumbAlignment?: ThumbAlignment;
    /** CSS length of the thumb along the track axis, used only when
     *  `thumbAlignment` is `Edge` to inset the thumb's travel and align the
     *  fill with the thumb's center. Set this to the size your `toView`
     *  callback styles the thumb with. Defaults to `0.75rem`. */
    thumbSize?: string;
    ariaLabel?: string;
    ariaLabelledBy?: string;
    formatValue?: (value: number) => string;
    /** Marks the Slider unavailable with `aria-disabled="true"` and
     *  `data-disabled`. The thumb remains focusable, following Foldkit's
     *  convention that unavailable controls stay discoverable by keyboard and
     *  assistive technology. */
    isDisabled?: boolean;
    /** Prevents value changes while exposing read-only semantics with
     *  `aria-readonly="true"` and `data-readonly`. The thumb remains focusable.
     *  Independent of `isDisabled`: setting both emits both attribute sets, and
     *  either one removes the pointer and keyboard handlers.
     *
     *  A drag already in flight is not interrupted. The handlers this flag
     *  removes are what start a drag, and the pointermove Subscription runs off
     *  `dragState` in the Model until pointerup. `isDisabled` behaves the same
     *  way. */
    isReadOnly?: boolean;
    name?: string;
    /** Resolves the DOM root containing the Slider track. Defaults to `document`.
     *  Provide a ShadowRoot when rendering the Slider inside a shadow tree so pointer
     *  events on the track can map the pointer position into a value. */
    getTrackRoot?: () => Document | ShadowRoot;
}>>;
