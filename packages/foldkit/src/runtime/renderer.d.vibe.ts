import { Cause, Context, Effect, Option, type Scope } from 'effect';
import { type Document, type HtmlBuilder } from '../html/index.vibe';
import type { CommitNotifier } from '../render/commit.vibe';
import { type CrashConfig } from './crashUI.vibe';
import type { DevToolsIntegration, DevToolsRenderBridge } from './devToolsIntegration.vibe';
import type { DuplicateIdScanner } from './duplicateIdScanner.vibe';
import type { MessageQueue } from './messageQueue.vibe';
import type { RuntimeStatus } from './runtimeStatus.js';
import { type ResolvedSlowPhaseConfig, type SlowPatchContext, type SlowViewContext } from './slowPhase.vibe';
import { type StartViewTransition, type ViewTransitionConfig } from './viewTransition.vibe';
/** The `viewTransition` config resolved against the running browser: the
 *  predicate, the feature-detected `startViewTransition`, and the cached
 *  reduced-motion query. Absent (the runtime holds `Option.none()`) when the
 *  app did not configure `viewTransition` or the browser lacks the API. */
export type ResolvedViewTransition<Model, Message> = Readonly<{
    decide: ViewTransitionConfig<Model, Message>;
    startViewTransition: StartViewTransition;
    reducedMotionQuery: MediaQueryList;
}>;
/**
 * What the boot closure uses from the render side. `crashWith` paints the
 * crash view and stops the runtime, `render` runs one live render (the boot
 * calls it for the first paint), `setLastDirtyMessage` records the Message
 * the next frame is attributed to, `scheduleRenderFrame` asks for a frame,
 * `skipPendingViewTransition` cuts short a transition the browser is still
 * animating, and `devToolsRenderBridge` is what the DevTools store needs to
 * repaint during time travel.
 */
export type Renderer<Model, Message> = Readonly<{
    crashWith: (cause: Cause.Cause<never>, maybeMessage: Option.Option<Message>) => Effect.Effect<void>;
    render: (model: Model, maybeMessage: Option.Option<Message>) => Effect.Effect<void>;
    setLastDirtyMessage: (message: Message) => void;
    scheduleRenderFrame: () => void;
    skipPendingViewTransition: () => void;
    devToolsRenderBridge: DevToolsRenderBridge;
}>;
/**
 * Builds the render side of one runtime: the current vnode and, when
 * hydrating, the server-rendered root the first render adopts, the crash
 * renderer, the `Dispatch` service the view binds handlers to, the
 * synchronous render that runs the view and patches the DOM, the render
 * frame that runs in `requestAnimationFrame`, and the View Transition
 * that frame may run inside. It also registers the teardown finalizer
 * that patches the tree away and restores the container, so build it
 * before forking the perpetual fibers: scope finalizers run
 * last-registered first, and the container must be restored only after
 * those fibers are interrupted.
 */
export declare const makeRenderer: <Model, Message>({ status, container, view, htmlBuilder, manageDocument, crash, buildId, initModel, maybeHydrationRoot, maybeSlowView, maybeSlowPatch, duplicateIdScanner, maybeResolvedViewTransition, commitNotifier, runtimeContext, readLiveModel, messageQueue, devToolsIntegration, }: Readonly<{
    status: RuntimeStatus;
    container: HTMLElement;
    view: (model: Model, h: HtmlBuilder<Message>) => Document;
    htmlBuilder: HtmlBuilder<Message>;
    manageDocument: boolean;
    crash: CrashConfig<Model, Message> | undefined;
    buildId: string | undefined;
    initModel: Model;
    maybeHydrationRoot: Option.Option<HTMLElement>;
    maybeSlowView: Option.Option<ResolvedSlowPhaseConfig<SlowViewContext<Model, Message>>>;
    maybeSlowPatch: Option.Option<ResolvedSlowPhaseConfig<SlowPatchContext<Model, Message>>>;
    duplicateIdScanner: DuplicateIdScanner | undefined;
    maybeResolvedViewTransition: Option.Option<ResolvedViewTransition<Model, Message>>;
    commitNotifier: CommitNotifier;
    runtimeContext: Context.Context<never>;
    readLiveModel: () => Model;
    messageQueue: MessageQueue<Message>;
    devToolsIntegration: DevToolsIntegration<Model, Message>;
}>) => Effect.Effect<Renderer<Model, Message>, never, Scope.Scope>;
