import type { ChildAttribute, Html, TagName } from 'foldkit/html';
import { Message, Model, OutMessage, TransitionState, init } from './schema.js';
import { WaitForAnimationSettled, WaitForPaint, defaultLeaveCommand, hide, show, toggle, update } from './update.js';
export type { Hid, InitConfig, Showed } from './schema.js';
export { init, Message, Model, OutMessage, TransitionState };
export { WaitForAnimationSettled, WaitForPaint, defaultLeaveCommand, hide, show, toggle, update, };
/** Per-render view inputs passed to `view` via `h.submodel`'s `viewInputs` field. */
export type ViewInputs = Readonly<{
    content: Html;
    className?: string;
    attributes?: ReadonlyArray<ChildAttribute>;
    element?: Exclude<TagName, 'textarea'>;
    /** When true, wraps content in a CSS grid container that smoothly animates
     *  height via `grid-template-rows: 0fr → 1fr`. The element stays in the DOM
     *  when hidden (collapsed to zero height) instead of being removed. */
    animateSize?: boolean;
}>;
/** Renders a headless animation wrapper that coordinates CSS transitions and
 *  CSS keyframe animations via data attributes.
 *
 *  Data attributes reflect the current lifecycle phase:
 *  - `data-closed`: element is in its hidden/initial state
 *  - `data-enter`: enter animation is active
 *  - `data-leave`: leave animation is active
 *  - `data-transition`: any animation is active
 */
export declare const view: import("foldkit/submodel").View<{
    readonly id: string;
    readonly isShowing: boolean;
    readonly transitionState: "EnterAnimating" | "EnterStart" | "Idle" | "LeaveAnimating" | "LeaveStart";
    readonly transitionGeneration: number;
}, {
    readonly _tag: "Hid";
} | {
    readonly _tag: "Showed";
} | {
    readonly _tag: "CompletedWaitForPaint";
    readonly generation: number;
} | {
    readonly _tag: "EndedAnimation";
    readonly generation: number;
}, Readonly<{
    content: Html;
    className?: string;
    attributes?: ReadonlyArray<ChildAttribute>;
    element?: Exclude<TagName, 'textarea'>;
    /** When true, wraps content in a CSS grid container that smoothly animates
     *  height via `grid-template-rows: 0fr → 1fr`. The element stays in the DOM
     *  when hidden (collapsed to zero height) instead of being removed. */
    animateSize?: boolean;
}>>;
