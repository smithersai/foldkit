import { Context, Effect, Schema, Scope, Stream } from "effect";
declare const MountTracker_base: Context.ServiceClass<MountTracker, "@foldkit/MountTracker", {
    readonly started: (name: string, args?: Record<string, unknown>) => void;
    readonly ended: (name: string, args?: Record<string, unknown>) => void;
}>;
/** Effect service tag that observes Mount lifecycle events. The runtime
 *  provides an implementation that buffers events for DevTools history;
 *  the OnMount snabbdom hooks call `started` synchronously when an element
 *  with an OnMount attribute is inserted and `ended` when it is destroyed.
 *  Test renderers do not provide this service, since snabbdom hooks never
 *  fire in their VNode-only environment. */
export declare class MountTracker extends MountTracker_base {
}
/** The state of the DOM currently owned by the Foldkit renderer. `Live` means
 *  it represents the current live Model. `Paused` means time travel has
 *  installed a historical view while the live application continues running. */
export declare const ViewState: Schema.Literals<readonly ["Live", "Paused"]>;
export type ViewState = typeof ViewState.Type;
declare const MountRuntime_base: Context.ServiceClass<MountRuntime, "@foldkit/MountRuntime", {
    readonly captureViewStateChanges: () => Stream.Stream<ViewState>;
}>;
/** @internal Runtime state used by `OnMount` to supply
 *  `viewStateChanges`. */
export declare class MountRuntime extends MountRuntime_base {
}
/** Type-level brand for MountDefinition values. */
export declare const MountDefinitionTypeId: unique symbol;
/** Type-level brand for MountDefinition values. */
export type MountDefinitionTypeId = typeof MountDefinitionTypeId;
/** A named, type-constrained per-element side effect, optionally carrying the
 *  args used to construct it. The runtime invokes `f` with the live `Element`
 *  and required view-state Stream when the element mounts. A Mount acquired by
 *  a live render keeps live dispatch, while one acquired by a historical
 *  render uses no-op dispatch. When resume reuses a replay-created element,
 *  the runtime releases its historical Mount before starting the live action.
 *  Otherwise the Stream's scope is tied to the element's lifetime: when the
 *  element unmounts, the runtime interrupts the fiber, which closes the
 *  Stream's scope and runs any registered `acquireRelease` finalizers.
 *
 *  Authors don't construct this shape directly. `Mount.define` builds it from
 *  an `execute` returning `Effect<Message>` for the one-shot case; only
 *  `Mount.defineStream` exposes the raw Stream shape for continuous-event
 *  cases. */
export type MountAction<Message, E = never> = Readonly<{
    name: string;
    args?: Record<string, unknown>;
    f: (element: Element, viewStateChanges: Stream.Stream<ViewState>) => Stream.Stream<Message, E>;
}>;
/** A Mount definition for a Mount with no declared args. Call as `Definition()` to produce a MountAction. */
export interface MountDefinitionNoArgs<Name extends string, ResultMessage> {
    [MountDefinitionTypeId]: MountDefinitionTypeId;
    name: Name;
    (): Readonly<{
        name: Name;
        f: (element: Element, viewStateChanges: Stream.Stream<ViewState>) => Stream.Stream<ResultMessage>;
    }>;
}
/** A Mount definition for a Mount with declared args. Call as `Definition(args)` to produce a MountAction. */
export interface MountDefinitionWithArgs<Name extends string, Fields extends Schema.Struct.Fields, ResultMessage> {
    [MountDefinitionTypeId]: MountDefinitionTypeId;
    name: Name;
    (args: Schema.Schema.Type<Schema.Struct<Fields>>): Readonly<{
        name: Name;
        args: Schema.Schema.Type<Schema.Struct<Fields>>;
        f: (element: Element, viewStateChanges: Stream.Stream<ViewState>) => Stream.Stream<ResultMessage>;
    }>;
}
/** A Mount definition created with `Mount.define` or `Mount.defineStream`.
 *  Union over the no-args and with-args shapes; consumers that only need
 *  name/identity can accept this. */
export type MountDefinition<Name extends string = string, ResultMessage = any> = MountDefinitionNoArgs<Name, ResultMessage> | MountDefinitionWithArgs<Name, any, ResultMessage>;
/** @internal Rejects an args field named `element`. `execute` receives the live
 *  element under that name, so an arg of the same name would shadow it. The
 *  literal is the type error a colliding declaration produces. */
type ElementFieldIsReserved = "Mount args cannot declare `element`: execute already receives the live element";
/** @internal Rejects an args field named `viewStateChanges`. `execute`
 *  receives the runtime-owned Stream under that name. */
type ViewStateChangesFieldIsReserved = "Mount args cannot declare `viewStateChanges`: execute already receives the view-state Stream";
/** @internal Fields the runtime supplies to every Mount execution. */
type ExecuteRuntimeInput = Readonly<{
    element: Element;
    viewStateChanges: Stream.Stream<ViewState>;
}>;
/** @internal Type-level rejection for args that collide with runtime fields. */
type ReservedExecuteFields = Readonly<{
    element?: ElementFieldIsReserved;
    viewStateChanges?: ViewStateChangesFieldIsReserved;
}>;
/** A never-ending view-state Stream for renderers without time travel.
 *  It emits `Live` immediately and never completes. Custom renderers and
 *  low-level MountAction wrappers can pass it as the required second argument
 *  to `MountAction.f` when the rendered view is always live. */
export declare const liveViewStateChanges: Stream.Stream<ViewState>;
/**
 * Defines a one-shot Mount. Every input is a named field: `args` declares the
 * args Schema, `messages` lists the Messages this Mount can produce, and
 * `execute` holds the work. `execute` receives the live `Element` as `element`
 * and the runtime's `viewStateChanges` Stream alongside the declared args, and
 * returns an `Effect<Message>` that runs once when the element mounts and
 * produces exactly one Message.
 *
 * `args` is optional. Omit it and the Definition is callable as `Definition()`;
 * declare it and the Definition is callable as `Definition(args)`. `execute`
 * keeps the same shape either way, because a Mount always has an element and a
 * view-state Stream. Args fields named `element` or `viewStateChanges` are
 * rejected where you declare them, since they would collide with the runtime
 * fields `execute` receives.
 *
 * Constructing a MountAction never runs `execute`. The runtime calls it when
 * the element enters the DOM, so nothing the body does happens inside the pure
 * view that built the action.
 *
 * `viewStateChanges` begins with the rendered view's `Live | Paused` state at
 * the moment the Mount is acquired, followed by changes. This acquisition
 * state stays available when `execute` performs asynchronous setup before
 * consuming the Stream, so a Mount inserted by a historical render always
 * observes `Paused` first. Time travel pauses the rendered view, not the live
 * application. Use this Stream to make an imperative integration read-only
 * while historical DOM is installed. A surviving live Mount stays acquired
 * throughout pause and resume. Its live async work and external event sources
 * also continue, so the integration must use the Stream to stop DOM-derived
 * interaction while paused. Mounts acquired by a historical render cannot
 * dispatch to the live Model. If the resumed live view owns the same element,
 * Foldkit releases the replay acquisition before starting the live action. The
 * Stream stays open for the Mount's lifetime. When time travel is unavailable,
 * it emits only `Live`.
 *
 * Cleanup composes via `Effect.acquireRelease` inside the Effect: registered
 * finalizers run when the element unmounts. The Mount's scope stays open
 * across the element's full lifetime, even after the Effect completes.
 * Acquisition is uninterruptible by default. For asynchronous setup that
 * must stop when the element unmounts, pass `{ interruptible: true }` as
 * the third argument to `Effect.acquireRelease`. Construct the resource
 * after the interruptible wait so cancellation leaves no handle to release.
 *
 * At least one result Message schema is required. The Effect's success
 * type is `Schema.Schema.Type<Messages[number]>`; without a declared
 * result, `execute` would have to return `Effect.never`, leaving
 * `update` with no record of the work and removing DevTools, Scene,
 * and time-travel replay's reference point. Fire-and-forget Mounts
 * follow the same convention as fire-and-forget Commands: declare a
 * `Completed*` result Message that `update` no-ops on. The side
 * effect stays observable; `update` simply has nothing meaningful to
 * do with the acknowledgment.
 *
 * The runtime starts cleanup from snabbdom's `destroy` hook by forking
 * `Fiber.interrupt` without waiting. A release with no asynchronous step
 * normally finishes inside `destroy`, before snabbdom removes the element's
 * event listeners; one with an asynchronous step finishes later. For idempotent
 * DOM operations (`element.remove()`, observer `disconnect()`,
 * `removeEventListener`) this is fine; if your cleanup has ordering
 * requirements relative to other DOM removals, prefer doing the imperative
 * work synchronously inside `acquire` and using `release` only for
 * self-contained teardown.
 *
 * **Construct resources INSIDE the acquire body, never before it.**
 * `Effect.acquireRelease` only guarantees atomicity of "acquire body
 * completes → release is registered". If you construct a handle before
 * calling `acquireRelease` and your acquire body just returns that handle
 * (`Effect.sync(() => alreadyExistingValue)`), interruption between the
 * construction and the registration leaks the handle. For third-party
 * library instantiation, express the construction as the success value of
 * the acquire Effect: `Effect.tryPromise(() => import(...)).pipe(Effect.map(...))`
 * for async imports, `Effect.sync(() => new Thing(...))` for sync
 * construction. The discipline: whatever the release function needs as
 * input must be the success value of the acquire Effect.
 *
 * Use this form whenever a Mount produces a single Message at acquire and
 * holds lifecycle-scoped resources for the element's lifetime. For Mounts
 * that emit a continuum of events (scroll listeners, IntersectionObservers,
 * MutationObservers), reach for `Mount.defineStream`.
 *
 * @example One-shot, no cleanup (read element geometry on mount)
 * ```ts
 * const MeasurePanelWidth = Mount.define('MeasurePanelWidth', {
 *   messages: [MeasuredPanelWidth],
 *   execute: ({ element }) =>
 *     Effect.sync(() =>
 *       MeasuredPanelWidth({ width: element.getBoundingClientRect().width }),
 *     ),
 * })
 * ```
 *
 * @example One-shot with cleanup (portal-to-body)
 * ```ts
 * const PortalToBody = Mount.define('PortalToBody', {
 *   messages: [CompletedPortalToBody],
 *   execute: ({ element }) =>
 *     Effect.gen(function* () {
 *       yield* Effect.acquireRelease(
 *         Effect.sync(() => document.body.appendChild(element)),
 *         () => Effect.sync(() => element.remove()),
 *       )
 *       return CompletedPortalToBody()
 *     }),
 * })
 * ```
 *
 * @example With args
 * ```ts
 * const AnchorPopover = Mount.define('AnchorPopover', {
 *   args: { buttonId: Schema.String, anchor: AnchorConfig },
 *   messages: [CompletedAnchorPopover],
 *   execute: ({ element, buttonId, anchor }) =>
 *     Effect.gen(function* () {
 *       yield* Effect.acquireRelease(
 *         Effect.sync(() => anchorSetup(element, { buttonId, anchor })),
 *         cleanup => Effect.sync(cleanup),
 *       )
 *       return CompletedAnchorPopover()
 *     }),
 * })
 * ```
 *
 * **Args are captured at mount, not refreshed across renders.** `execute`
 * runs once when the element enters the DOM. Subsequent renders construct
 * fresh `MountAction` values with updated arg values, but those values are
 * captured in closures that never execute. `OnMount` only binds to
 * snabbdom's `insert` and `destroy` hooks; there is no `update` hook in
 * between. Name args to reflect this. Prefer `initialScroll` over
 * `currentScroll` for values whose role is to seed state at mount time.
 *
 * If you need Model changes to drive ongoing DOM behavior post-mount, the
 * proximate cause is the Message that updated the Model. Dispatch a Command
 * from `update`'s handler for that Message. The Command can find the
 * element and do the imperative work. Don't reach for a Subscription here.
 * Subscriptions watch Model state via `modelToDependencies` to gate their
 * lifetime, but their emissions come from external event sources (timers,
 * document events, library callbacks), not from Model state itself.
 * Translating Model changes into side effects is what `update` does on
 * every Message, via the Commands it returns. (Subscriptions do legitimately
 * touch the DOM in some contexts: calling `preventDefault` in a non-passive
 * event handler where going through `update` would arrive too late, or
 * maintaining DOM state for as long as a Model condition is true (like
 * applying `user-select: none` to the document while a drag is in progress
 * and undoing it when the drag ends).)
 */
export declare function define<const Name extends string, Fields extends Schema.Struct.Fields, const Messages extends readonly [Schema.Top, ...ReadonlyArray<Schema.Top>]>(name: Name, config: Readonly<{
    args: Fields & ReservedExecuteFields;
    messages: Messages;
    execute: (input: ExecuteRuntimeInput & Schema.Schema.Type<Schema.Struct<Fields>>) => Effect.Effect<Schema.Schema.Type<Messages[number]>, never, Scope.Scope>;
}>): MountDefinitionWithArgs<Name, Fields, Schema.Schema.Type<Messages[number]>>;
export declare function define<const Name extends string, const Messages extends readonly [Schema.Top, ...ReadonlyArray<Schema.Top>]>(name: Name, config: Readonly<{
    args?: never;
    messages: Messages;
    execute: (input: ExecuteRuntimeInput) => Effect.Effect<Schema.Schema.Type<Messages[number]>, never, Scope.Scope>;
}>): MountDefinitionNoArgs<Name, Schema.Schema.Type<Messages[number]>>;
/**
 * Defines a streaming Mount. Every input is a named field, exactly as in
 * `Mount.define`: `args` declares the args Schema, `messages` lists the
 * Messages this Mount can produce, and `execute` holds the work. `execute`
 * receives the live `Element` as `element` and the runtime's
 * `viewStateChanges` Stream alongside the declared args, and returns a
 * `Stream<Message>` whose lifetime is bound to the element's lifetime: each
 * emitted Message is dispatched, and the Stream's scope is closed (running any
 * registered `Effect.acquireRelease` finalizers) when the element unmounts.
 * Use this form when the Mount emits a continuum of events from observers or
 * listeners attached to the element.
 *
 * `args` is optional. Omit it and the Definition is callable as `Definition()`;
 * declare it and the Definition is callable as `Definition(args)`. `execute`
 * keeps the same shape either way, because a Mount always has an element and a
 * view-state Stream. Args fields named `element` or `viewStateChanges` are
 * rejected where you declare them, since they would collide with the runtime
 * fields `execute` receives.
 *
 * Constructing a MountAction never runs `execute`. The runtime calls it when
 * the element enters the DOM, so nothing the body does happens inside the pure
 * view that built the action.
 *
 * `viewStateChanges` has the same semantics as in `Mount.define`: it begins
 * with the rendered view's state at acquisition even after asynchronous
 * setup, keeps a surviving live Mount acquired, and returns to `Live` only
 * after the latest live view has been patched back into the DOM. A live
 * Mount's external sources continue while paused, so use the state to stop
 * listeners from turning historical DOM interaction into Messages. A Mount
 * acquired by a historical render cannot dispatch to the live Model. If the
 * resumed live view owns the same element, Foldkit releases the replay
 * acquisition before starting the live action. The state Stream stays open
 * for the Mount's lifetime. When time travel is unavailable, it emits only
 * `Live`.
 *
 * At least one result Message schema is required. The Stream's emission
 * type is `Schema.Schema.Type<Messages[number]>`; without a declared
 * result, `execute` would have to return `Stream<never>`, leaving
 * `update` with no record of the work and removing DevTools, Scene,
 * and time-travel replay's reference point. Fire-and-forget Mounts
 * follow the same convention as fire-and-forget Commands: declare a
 * `Completed*` result Message that `update` no-ops on. The side
 * effect stays observable; `update` simply has nothing meaningful to
 * do with the acknowledgment. Re-check the cause.
 *
 * Cleanup has the same timing relative to snabbdom's `destroy` hook as
 * `Mount.define`.
 *
 * For a Mount that produces exactly one Message at acquire and then holds
 * lifecycle-scoped resources, use `Mount.define` with `Effect<Message>`.
 * That form encodes "exactly one Message" in the type system. Reserve
 * `defineStream` for cases that genuinely emit a stream of events.
 *
 * @example Continuous scroll events from an element
 * ```ts
 * const SyncSidebarScroll = Mount.defineStream('SyncSidebarScroll', {
 *   messages: [ScrolledSidebar],
 *   execute: ({ element }) =>
 *     Stream.callback<typeof ScrolledSidebar.Type>(queue =>
 *       Effect.gen(function* () {
 *         yield* Effect.acquireRelease(
 *           Effect.sync(() => {
 *             const handler = () =>
 *               Queue.offerUnsafe(
 *                 queue,
 *                 ScrolledSidebar({ scroll: element.scrollTop }),
 *               )
 *             element.addEventListener('scroll', handler, { passive: true })
 *             return handler
 *           }),
 *           handler =>
 *             Effect.sync(() =>
 *               element.removeEventListener('scroll', handler),
 *             ),
 *         )
 *         return yield* Effect.never
 *       }),
 *     ),
 * })
 * ```
 *
 * @example IntersectionObserver events
 * ```ts
 * const ObserveHeroVisibility = Mount.defineStream('ObserveHeroVisibility', {
 *   messages: [ChangedHeroVisibility],
 *   execute: ({ element }) =>
 *     Stream.callback<typeof ChangedHeroVisibility.Type>(queue =>
 *       Effect.gen(function* () {
 *         yield* Effect.acquireRelease(
 *           Effect.sync(() => {
 *             const observer = new IntersectionObserver(entries => {
 *               pipe(
 *                 Array.head(entries),
 *                 Option.match({
 *                   onNone: Function.constVoid,
 *                   onSome: entry =>
 *                     Queue.offerUnsafe(
 *                       queue,
 *                       ChangedHeroVisibility({
 *                         isVisible: entry.isIntersecting,
 *                       }),
 *                     ),
 *                 }),
 *               )
 *             })
 *             observer.observe(element)
 *             return observer
 *           }),
 *           observer => Effect.sync(() => observer.disconnect()),
 *         )
 *         return yield* Effect.never
 *       }),
 *     ),
 * })
 * ```
 *
 * The args-captured-at-mount and Subscriptions-vs-Mount guidance from
 * `Mount.define` apply identically here. See that constructor's docs for
 * the mental model.
 */
export declare function defineStream<const Name extends string, Fields extends Schema.Struct.Fields, const Messages extends readonly [Schema.Top, ...ReadonlyArray<Schema.Top>]>(name: Name, config: Readonly<{
    args: Fields & ReservedExecuteFields;
    messages: Messages;
    execute: (input: ExecuteRuntimeInput & Schema.Schema.Type<Schema.Struct<Fields>>) => Stream.Stream<Schema.Schema.Type<Messages[number]>, never, never>;
}>): MountDefinitionWithArgs<Name, Fields, Schema.Schema.Type<Messages[number]>>;
export declare function defineStream<const Name extends string, const Messages extends readonly [Schema.Top, ...ReadonlyArray<Schema.Top>]>(name: Name, config: Readonly<{
    args?: never;
    messages: Messages;
    execute: (input: ExecuteRuntimeInput) => Stream.Stream<Schema.Schema.Type<Messages[number]>, never, never>;
}>): MountDefinitionNoArgs<Name, Schema.Schema.Type<Messages[number]>>;
/** Lifts a `MountAction` from one Message universe to another by mapping its
 *  dispatched Messages through a transform. Used by Submodel components to
 *  emit lifecycle action results into the parent's Message union via the
 *  consumer-supplied `toParentMessage` lift. Preserves `name` and `args`. */
export declare const mapMessage: {
    <A, B>(f: (message: A) => B): <E>(action: MountAction<A, E>) => MountAction<B, E>;
    <A, B, E>(action: MountAction<A, E>, f: (message: A) => B): MountAction<B, E>;
};
export {};
