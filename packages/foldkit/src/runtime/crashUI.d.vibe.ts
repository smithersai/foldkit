import { Effect, Option } from 'effect';
import { Document, Html, type HtmlBuilder } from '../html/index.ts';
import { VNode } from '../vdom.vibe';
/** Context provided to crash.view and crash.report when the runtime encounters
 *  an unrecoverable error. `message` is the Message being processed when the
 *  crash occurred, present as an `Option` because a crash during the initial
 *  render has no triggering Message. */
export type CrashContext<Model, Message> = Readonly<{
    error: Error;
    model: Model;
    message: Option.Option<Message>;
}>;
/** Configuration for crash handling, with custom crash UI and/or crash
 *  reporting. The crash view renders after the dispatch loop has stopped, so
 *  its builder's Message is `never` and no handler is expressible. Reload or
 *  navigate with a raw DOM attribute instead. */
export type CrashConfig<Model, Message> = Readonly<{
    view?: (context: CrashContext<Model, Message>, h: HtmlBuilder<never>) => Document;
    report?: (context: CrashContext<Model, Message>) => void;
}>;
/** Configuration for crash handling in a `makeElement` app. The crash view
 *  returns `Html`, not a `Document`, because a scoped app never owns the
 *  document `<head>`. */
export type ElementCrashConfig<Model, Message> = Readonly<{
    view?: (context: CrashContext<Model, Message>, h: HtmlBuilder<never>) => Html;
    report?: (context: CrashContext<Model, Message>) => void;
}>;
export declare const noOpDispatch: {
    dispatchAsync: (_message: unknown) => Effect.Effect<void, never, never>;
    dispatchSync: (_message: unknown) => void;
};
export declare const defaultCrashView: (context: CrashContext<unknown, unknown>, viewError?: unknown) => Document;
/** Mutable holder for the vnode tree currently mounted in the container.
 *  The render frame writes it after every patch; the dispose finalizer, the
 *  replay render, and {@link renderCrashView} read it. A plain object rather
 *  than a Ref because every reader runs synchronously on the main thread. */
export type VNodeSlot = {
    maybeCurrentVNode: Option.Option<VNode>;
};
export declare const renderCrashView: <Model, Message>(context: CrashContext<Model, Message>, crash: CrashConfig<Model, Message> | undefined, container: HTMLElement, vnodeSlot: VNodeSlot, manageDocument: boolean) => void;
