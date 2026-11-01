import { Array, Option, Schema } from 'effect';
import type { Command } from '../../command/index.vibe';
import type * as Update from '../../update/index.js';
/** Any value discriminated by a `_tag` field. Both states and Messages satisfy this shape. */
export type Tagged = Readonly<{
    _tag: string;
}>;
/** The union of `_tag` literals in a Tagged union. */
export type TagOf<Union extends Tagged> = Union['_tag'];
/** The single variant of a Tagged union carrying the given tag. */
export type Variant<Union extends Tagged, Tag extends TagOf<Union>> = Extract<Union, Readonly<{
    _tag: Tag;
}>>;
declare const NoMachineContextTypeId: unique symbol;
type NoMachineContext = typeof NoMachineContextTypeId;
type IsAny<Value> = 0 extends 1 & Value ? true : false;
type IsNever<Value> = [Value] extends [never] ? true : false;
type HasMachineContext<Context> = IsAny<Context> extends true ? true : [Context] extends [never] ? true : [Context] extends [NoMachineContext] ? false : true;
type ContextArguments<Context> = HasMachineContext<Context> extends true ? [context: Context] : [];
type MachineContextArgument<Context> = IsAny<Context> extends true ? Context : IsNever<Context> extends true ? Context : undefined extends Context ? Exclude<Context, void | undefined> | undefined : Context;
type MachineContextArguments<Context> = HasMachineContext<Context> extends true ? [context: MachineContextArgument<Context>] : [];
/**
 * The single argument an Edge handler receives: the source state, the
 * triggering Message, the guard value produced by the Edge's {@link when}
 * guard (`void` on unguarded and boolean-guarded Edges), and the read-only
 * context declared for the Machine when one exists. Destructure the fields you
 * need.
 */
export type EdgeInput<SourceState extends Tagged, TriggerMessage extends Tagged, GuardValue = void, Context = NoMachineContext> = HasMachineContext<Context> extends true ? Readonly<{
    state: SourceState;
    message: TriggerMessage;
    guardValue: GuardValue;
    context: Context;
}> : Readonly<{
    state: SourceState;
    message: TriggerMessage;
    guardValue: GuardValue;
}>;
/**
 * A single transition edge. The target state tag is a literal value, so the
 * edge set of a Machine is enumerable data. `handler` returns the target
 * variant and any transition-time Commands as an `Update.Return` record.
 *
 * The correlation between `target` and `handler`'s Model variant is enforced
 * by {@link to}'s signature, not by this type. Keeping this type free of the
 * target tag is what lets TypeScript infer the source state and trigger
 * Message from the transition-map position.
 *
 * Construct with {@link to}.
 */
export type Edge<State extends Tagged, Message extends Tagged, SourceState extends State, TriggerMessage extends Message, GuardValue = void, R = never, Context = NoMachineContext> = Readonly<{
    _tag: 'Edge';
    target: TagOf<State>;
    handler: (input: EdgeInput<SourceState, TriggerMessage, unknown, Context>) => Update.Return<State, Message, R>;
    readonly '~foldkit/EdgeGuardValue'?: GuardValue;
}>;
/** A guarded Edge that fires only when its guard passes. Construct with {@link when}. */
export type When<State extends Tagged, Message extends Tagged, SourceState extends State, TriggerMessage extends Message, GuardValue = unknown, R = never, Context = NoMachineContext> = Readonly<{
    _tag: 'When';
    guard: (state: SourceState, message: TriggerMessage, ...context: ContextArguments<Context>) => Option.Option<unknown>;
    edge: Edge<State, Message, SourceState, TriggerMessage, GuardValue, R, Context>;
}>;
/** The unconditional fallback Edge at the end of a guard list. Construct with {@link otherwise}. */
export type Otherwise<State extends Tagged, Message extends Tagged, SourceState extends State, TriggerMessage extends Message, R = never, Context = NoMachineContext> = Readonly<{
    _tag: 'Otherwise';
    edge: Edge<State, Message, SourceState, TriggerMessage, void, R, Context>;
}>;
/** An explicit no-transition fallback at the end of a guard list. Construct with {@link ignore}. */
export type Ignore = Readonly<{
    _tag: 'Ignore';
}>;
/** One entry in an ordered guard list: a {@link When}, the {@link Otherwise}
 * transition fallback, or the {@link Ignore} no-transition fallback. */
export type GuardedEdge<State extends Tagged, Message extends Tagged, SourceState extends State, TriggerMessage extends Message, R = never, Context = NoMachineContext> = When<State, Message, SourceState, TriggerMessage, unknown, R, Context> | Otherwise<State, Message, SourceState, TriggerMessage, R, Context> | Ignore;
type OptionValue<MaybeValue> = MaybeValue extends Option.Option<infer Value> ? Value : never;
type GuardValueOf<GuardResult> = [GuardResult] extends [boolean] ? void : OptionValue<GuardResult>;
/**
 * The transition table: for each source state tag, the Messages it responds
 * to and the Edge (or ordered guard list) each Message fires. States absent
 * from the table, and Messages absent from a state's `on` record, are
 * ignored: `Machine.step` reports them as `Ignored` rather than
 * transitioning.
 *
 * @experimental Ships from `foldkit/experimental/machine`; expect breaking changes while the API settles.
 */
export type TransitionTable<State extends Tagged, Message extends Tagged, R = never, Context = NoMachineContext> = Readonly<{
    [SourceTag in TagOf<State>]?: Readonly<{
        on: Readonly<{
            [MessageTag in TagOf<Message>]?: Edge<State, Message, Variant<State, SourceTag>, Variant<Message, MessageTag>, void, R, Context> | ReadonlyArray<GuardedEdge<State, Message, Variant<State, SourceTag>, Variant<Message, MessageTag>, R, Context>>;
        }>;
    }>;
}>;
declare const ForStatesTypeId: unique symbol;
declare const ForStatesVarianceTypeId: unique symbol;
type ForStatesFragment<State extends Tagged, Message extends Tagged, R, Context, SourceTags extends ReadonlyArray<string> = ReadonlyArray<TagOf<State>>> = Readonly<{
    _tag: 'ForStates';
    [ForStatesTypeId]: typeof ForStatesTypeId;
    sourceTags: SourceTags;
    on: unknown;
    readonly [ForStatesVarianceTypeId]?: Readonly<{
        state: State;
        message: Message;
        requirements: R;
        context: Context;
    }>;
}>;
type SharedTransitionMap<State extends Tagged, Message extends Tagged, SourceState extends State, R, Context> = Readonly<{
    [MessageTag in TagOf<Message>]?: Edge<State, Message, SourceState, Variant<Message, MessageTag>, void, R, Context> | ReadonlyArray<GuardedEdge<State, Message, SourceState, Variant<Message, MessageTag>, R, Context>>;
}>;
type RequirementsOfGuarded<Value> = Value extends When<any, any, any, any, any, infer R, any> ? R : Value extends Otherwise<any, any, any, any, infer R, any> ? R : never;
type RequirementsOfTransition<Value> = Value extends Edge<any, any, any, any, any, infer R, any> ? R : Value extends ReadonlyArray<infer GuardedEdge> ? RequirementsOfGuarded<GuardedEdge> : never;
type RequirementsOfTransitionMap<Transitions> = RequirementsOfTransition<NonNullable<Transitions[keyof Transitions]>>;
type ForStatesBuilder<SourceTags extends Array.NonEmptyReadonlyArray<string>> = Readonly<{
    on: <State extends Tagged, Message extends Tagged, Context, R, const Transitions extends SharedTransitionMap<State, Message, Variant<State, Extract<SourceTags[number], TagOf<State>>>, R, Context>>(transitions: Exclude<SourceTags[number], TagOf<State>> extends never ? Exclude<keyof Transitions, TagOf<Message>> extends never ? Transitions : never : never) => ForStatesFragment<State, Message, RequirementsOfTransitionMap<Transitions>, Context, SourceTags>;
}>;
/** Selects source state tags for a shared transition map. The `on` handler's
 * `state` is narrowed to the union of the selected variants, and its `message`
 * is narrowed by the map key.
 *
 * Add the resulting fragment to a Machine definition's `shared` array. Shared
 * transitions are defaults: a state-local transition for the same Message
 * replaces the shared transition. Defining the same state/Message pair in two
 * shared fragments throws when the Machine is defined.
 *
 * @example
 * ```ts
 * shared: [
 *   forStates(['Editing', 'Reviewing']).on({
 *     ClickedCancel: to('Cancelled', ({ state }) => ({
 *       model: CheckoutState.Cancelled({ draftId: state.draftId }),
 *     })),
 *   }),
 * ]
 * ```
 *
 * @experimental Ships from `foldkit/experimental/machine`; expect breaking changes while the API settles.
 */
export declare const forStates: <const SourceTags extends Array.NonEmptyReadonlyArray<string>>(sourceTags: SourceTags) => ForStatesBuilder<SourceTags>;
/** The transition table entry for one source state. Use this alias when
 * extracting an entry from a Machine's `states` record to preserve the source
 * state and triggering Message narrowing inside its Edges.
 *
 * @experimental Ships from `foldkit/experimental/machine`; expect breaking changes while the API settles.
 */
export type StateTransitions<State extends Tagged, Message extends Tagged, SourceTag extends TagOf<State>, R = never, Context = NoMachineContext> = NonNullable<TransitionTable<State, Message, R, Context>[SourceTag]>;
/**
 * Declares a transition Edge to the state variant named by `target`. The
 * `handler` receives an {@link EdgeInput} whose state and Message are narrowed
 * to the variants the Edge sits under in a state-local or shared transition
 * map, and returns an `Update.Return` record whose `model` is the target
 * variant and whose optional `commands` are transition-time effects. When the
 * Machine declares a context, the input also contains that context for the
 * current transition.
 *
 * The handler's `commands` field may contain Commands whose Effects need
 * services. The requirements they carry flow into the Machine's `R` through
 * {@link define}.
 *
 * Only meaningful inside a Machine definition's state-local or shared
 * transition map: the source and trigger types flow in from that position
 * contextually.
 *
 * @experimental Ships from `foldkit/experimental/machine`; expect breaking changes while the API settles.
 */
export declare const to: <State extends Tagged, Message extends Tagged, SourceState extends State, TriggerMessage extends Message, const TargetTag extends TagOf<State>, R = never, Context = NoMachineContext>(target: TargetTag, handler: (input: NoInfer<EdgeInput<SourceState, TriggerMessage, void, Context>>) => Update.Return<NoInfer<Variant<State, TargetTag>>, NoInfer<Message>, R>) => Edge<State, Message, SourceState, TriggerMessage, void, R, Context>;
/**
 * Guards an Edge. Guard lists run in order, and the first guard that passes
 * fires its Edge. A guard either resolves the state and Message to an
 * `Option` (returning `Option.some` passes, and the wrapped value flows into
 * the Edge's handler as `guardValue`) or returns a
 * plain boolean when there is nothing to extract (returning `true` passes,
 * and `guardValue` is `void`).
 *
 * When the Machine declares a context, the guard receives it as a third
 * parameter and its Edge handler receives it in {@link EdgeInput}. The state,
 * Message, and context parameters are `NoInfer` so they resolve from the guard
 * list's transition-map position alone.
 *
 * @experimental Ships from `foldkit/experimental/machine`; expect breaking changes while the API settles.
 */
export declare const when: <State extends Tagged, Message extends Tagged, SourceState extends State, TriggerMessage extends Message, GuardResult extends Option.Option<unknown> | boolean, const TargetTag extends TagOf<State>, R = never, Context = NoMachineContext>(guard: (state: NoInfer<SourceState>, message: NoInfer<TriggerMessage>, ...context: ContextArguments<NoInfer<Context>>) => GuardResult, target: TargetTag, handler: (input: NoInfer<EdgeInput<SourceState, TriggerMessage, GuardValueOf<GuardResult>, Context>>) => Update.Return<NoInfer<Variant<State, TargetTag>>, NoInfer<Message>, R>) => When<State, Message, SourceState, TriggerMessage, GuardValueOf<GuardResult>, R, Context>;
/**
 * The unconditional fallback at the end of a guard list. Its Edge handler may
 * return Commands whose Effects need services, threading their requirements
 * into the Machine's `R` the same way {@link to} and {@link when} do.
 *
 * @experimental Ships from `foldkit/experimental/machine`; expect breaking changes while the API settles.
 */
export declare const otherwise: <State extends Tagged, Message extends Tagged, SourceState extends State, TriggerMessage extends Message, R = never, Context = NoMachineContext>(edge: Edge<State, Message, SourceState, TriggerMessage, void, R, Context>) => Otherwise<State, Message, SourceState, TriggerMessage, R, Context>;
/**
 * Declares that a Message is intentionally ignored when every preceding
 * {@link when} guard declines. Evaluation stops at this fallback, and
 * `Machine.step` reports `ExplicitlyIgnored`. Edges listed after it are
 * reported by `Machine.deadTransitions` as `ShadowedByIgnore`.
 *
 * @experimental Ships from `foldkit/experimental/machine`; expect breaking changes while the API settles.
 */
export declare const ignore: () => Ignore;
/** A step that matched an Edge: the next state plus any transition-time Commands. */
export type Transitioned<State extends Tagged, Message extends Tagged, R = never> = Readonly<{
    _tag: 'Transitioned';
    from: TagOf<State>;
    target: TagOf<State>;
    messageTag: TagOf<Message>;
    state: State;
    commands: ReadonlyArray<Command<Message, never, R>>;
}>;
/**
 * Why a step matched no Edge. `OutOfAlphabet` means the Message tag appears
 * in no state's `on` record anywhere in the table, so the Message is outside
 * the Machine's alphabet. `NotApplicable` means the Message tag is in the
 * alphabet, but no Edge for it exists from the current state, whether the
 * state is absent from the table or its `on` record lacks the tag.
 * `GuardsFellThrough` means an Edge entry exists for this state and Message,
 * but every guard declined and no {@link otherwise} or {@link ignore} fallback
 * was present.
 * `ExplicitlyIgnored` means evaluation reached an {@link ignore} fallback.
 */
export type IgnoredReason = 'OutOfAlphabet' | 'NotApplicable' | 'GuardsFellThrough' | 'ExplicitlyIgnored';
/**
 * A step that matched no Edge: the state is unchanged and the Message is
 * observable as ignored. `reason` distinguishes the four causes, described
 * on {@link IgnoredReason}.
 */
export type Ignored<State extends Tagged, Message extends Tagged> = Readonly<{
    _tag: 'Ignored';
    stateTag: TagOf<State>;
    messageTag: TagOf<Message>;
    state: State;
    reason: IgnoredReason;
}>;
/** The observable outcome of one step: `Transitioned` or `Ignored`.
 *
 * @experimental Ships from `foldkit/experimental/machine`; expect breaking changes while the API settles.
 */
export type TransitionResult<State extends Tagged, Message extends Tagged, R = never> = Transitioned<State, Message, R> | Ignored<State, Message>;
/** Which guard construct an Edge sits under, with its position in the guard list. */
export type EdgeGuard = Readonly<{
    _tag: 'Unguarded';
}> | Readonly<{
    _tag: 'When';
    position: number;
}> | Readonly<{
    _tag: 'Otherwise';
    position: number;
}>;
/** One Edge of the table as plain data: source, trigger, target, and guard placement. */
export type EdgeSummary<State extends Tagged, Message extends Tagged> = Readonly<{
    from: TagOf<State>;
    messageTag: TagOf<Message>;
    target: TagOf<State>;
    guard: EdgeGuard;
}>;
/**
 * Why an Edge cannot fire in a walk of the declared Edge set:
 * `UnreachableSource` means no path from the walk roots reaches the Edge's
 * source state, and `ShadowedByOtherwise` means an earlier `otherwise` in the
 * Edge's guard list always fires first. `ShadowedByIgnore` means an earlier
 * {@link ignore} stops evaluation first.
 */
export type DeadTransitionReason = 'UnreachableSource' | 'ShadowedByOtherwise' | 'ShadowedByIgnore';
/** An Edge that cannot fire in a walk of the declared Edge set, with the reason. */
export type DeadTransition<State extends Tagged, Message extends Tagged> = Readonly<{
    edge: EdgeSummary<State, Message>;
    reason: DeadTransitionReason;
}>;
/** A compiled state Machine: a pure transition function plus static analysis over the Edge set.
 *
 * @experimental Ships from `foldkit/experimental/machine`; expect breaking changes while the API settles.
 */
export type Machine<State extends Tagged, Message extends Tagged, R = never, Context = NoMachineContext> = Readonly<{
    initial: State;
    stateTags: ReadonlyArray<TagOf<State>>;
    edges: ReadonlyArray<EdgeSummary<State, Message>>;
    /** Runs one Message through the Machine as a Foldkit update. The returned
     * `Update.Return<State, Message, R>` stores the next Machine state in
     * `model` and any transition-time Commands in `commands`. Use {@link fold}
     * to read and write the Machine state inside an enclosing Model. Use `step`
     * when code needs to distinguish a `Transitioned` result from an `Ignored`
     * result or inspect Edge metadata.
     */
    transition: (state: State, message: Message, ...context: MachineContextArguments<Context>) => Update.Return<State, Message, R>;
    step: (state: State, message: Message, ...context: MachineContextArguments<Context>) => TransitionResult<State, Message, R>;
    /**
     * The state tags a walk of the statically selectable declared Edges visits
     * starting from `tag`. Edges listed after an `otherwise` or {@link ignore}
     * are excluded because the runtime can never select them.
     */
    reachableFrom: (tag: TagOf<State>) => ReadonlySet<TagOf<State>>;
    /**
     * The state tags a walk of the statically selectable declared Edges never
     * visits, starting from the initial state's tag plus `extraRoots`. Edges
     * listed after an `otherwise` or {@link ignore} are excluded because the
     * runtime can never select them. The walk sees only declared Edges, so state
     * changes made outside `transition` and `step` are invisible to it, and it
     * always starts at `initial`. Entry points other than `initial`, such as
     * restored persistence, deep links, or SSR hydration, must be passed as
     * `extraRoots`, or the states they enter are reported unreachable even
     * though the running program visits them.
     */
    unreachableStates: (extraRoots?: ReadonlyArray<TagOf<State>>) => ReadonlyArray<TagOf<State>>;
    /**
     * The Edges that cannot fire in a walk of the declared Edge set starting
     * from the initial state's tag plus `extraRoots`, each with its
     * {@link DeadTransitionReason}. Each Edge appears at most once;
     * `ShadowedByOtherwise` and `ShadowedByIgnore` take precedence when a source
     * is also unreachable. The same assumptions as `unreachableStates` apply:
     * the walk cannot see state changes made outside `transition` and `step`,
     * and entry points other than `initial` must be passed as `extraRoots`, or
     * their outgoing Edges are reported as `UnreachableSource` even though the
     * running program fires them.
     */
    deadTransitions: (extraRoots?: ReadonlyArray<TagOf<State>>) => ReadonlyArray<DeadTransition<State, Message>>;
    toMermaid: () => string;
}>;
type FoldContextField<ParentModel, Context> = HasMachineContext<Context> extends true ? Readonly<{
    context: (model: NoInfer<ParentModel>) => NoInfer<MachineContextArgument<Context>>;
}> : Readonly<{
    context?: never;
}>;
/** The capabilities needed to fold a Machine state field into its enclosing
 * Model. `read` returns an `Option` because the field may be absent in the
 * current Model variant; `write` replaces it after a transition. A contextual
 * Machine also requires `context`, which reads the current context from the
 * enclosing Model for each transition. */
export type FoldConfig<ParentModel, State extends Tagged, Message extends Tagged, R = never, Context = NoMachineContext> = Readonly<{
    machine: Machine<State, Message, R, Context>;
    read: (model: ParentModel) => Option.Option<State>;
    write: (model: ParentModel, nextState: State) => ParentModel;
}> & FoldContextField<ParentModel, Context>;
/** Folds a Machine state field into an enclosing Model. Any transition-time
 * Commands pass through unchanged.
 *
 * When `read` returns `None`, the fold returns the original Model without
 * running a transition. For a contextual Machine, `context` is read only when
 * the Machine state is present and is supplied to that transition.
 *
 * ```ts
 * const foldUpload = Machine.fold({
 *   machine: uploadMachine,
 *   read: (model: Model) => Option.some(model.upload),
 *   write: (model, nextUpload) =>
 *     modifyFields(model, { upload: () => nextUpload }),
 *   context: model => model.uploadQueues,
 * })
 *
 * // Data-first in update
 * foldUpload(model, message)
 *
 * // Data-last in a composed update
 * Update.combine(model, [foldUpload(message), recordUploadAttempt])
 * ```
 *
 * @experimental Ships from `foldkit/experimental/machine`; expect breaking changes while the API settles.
 */
export declare const fold: {
    <ParentModel, State extends Tagged, Message extends Tagged, R = never, Context = NoMachineContext>(config: FoldConfig<ParentModel, State, Message, R, Context>): Update.Fold<ParentModel, Message, Message, R>;
};
/**
 * The Schemas a Machine is defined over: the state union and the Message
 * union. Passed to `define`'s first stage so the type parameters are
 * fully resolved before the Machine definition is checked.
 */
type MachineSchemaFields<State extends Tagged, Message extends Tagged> = Readonly<{
    state: Schema.Top & Readonly<{
        Type: State;
        members: ReadonlyArray<Schema.Top>;
    }>;
    message: Schema.Top & Readonly<{
        Type: Message;
    }>;
}>;
/**
 * The Schemas a Machine is defined over, including an optional read-only
 * context Schema. A declared context is required by the Machine's guards,
 * Edge handlers, `transition`, and `step`.
 */
export type MachineSchemas<State extends Tagged, Message extends Tagged, ContextSchema extends Schema.Top | undefined = undefined> = MachineSchemaFields<State, Message> & ([ContextSchema] extends [Schema.Top] ? Readonly<{
    context: ContextSchema;
}> : Readonly<{
    context?: never;
}>);
/** The Machine definition: the initial state, shared transition defaults, and
 * the state-local transition table. A state-local transition replaces a
 * shared transition for the same state and Message.
 *
 * @experimental Ships from `foldkit/experimental/machine`; expect breaking changes while the API settles.
 */
export type MachineDefinition<State extends Tagged, Message extends Tagged, R = never, Context = NoMachineContext> = Readonly<{
    initial: State;
    shared?: ReadonlyArray<ForStatesFragment<State, Message, R, Context>>;
    states: TransitionTable<State, Message, R, Context>;
}>;
/**
 * Compiles a declarative Machine definition into a {@link Machine}.
 *
 * Two stages: the first takes the state and Message union Schemas and fixes
 * the type parameters, the second takes the initial state, optional shared
 * transition defaults, and the state-local transition table. The split is
 * what lets TypeScript narrow `state` and `message` inside every Edge from its
 * transition-map position: a single-call form checks the definition while the
 * type parameters are still being inferred, and the narrowing collapses.
 *
 * Build shared defaults with {@link forStates}. Each fragment is expanded
 * into the ordinary state-local table before dispatch and static analysis. A
 * state-local transition replaces its shared default for that state and
 * Message; overlapping shared fragments throw when the Machine is defined.
 *
 * The Machine is not a runtime: `transition` returns an `Update.Return`, so the
 * Machine state lives in the Model and the Foldkit runtime never learns the
 * Machine exists. Use {@link fold} to read and write a Machine state field in
 * an enclosing Model. Messages that match no Edge leave the state unchanged;
 * use `step` when the `Ignored` outcome should be observable.
 *
 * Declare a `context` Schema when transitions need a read-only view of data
 * outside the Machine state. The context is passed to guards and Edge handlers
 * on each call; it is not decoded, stored, or included in static analysis. Data
 * that the state owns for its lifetime belongs in the state as a snapshot.
 * Values that should be visible as facts in Story tests and DevTools should
 * still enter through Messages.
 *
 * Because every Edge names a literal target tag, the Edge set is plain data:
 * `reachableFrom`, `unreachableStates`, `deadTransitions`, and `toMermaid`
 * all read it directly.
 *
 * The Machine's requirements `R` are the services its edge Commands need, and
 * flow into `transition` and `step`. `R` defaults to `never`. When every edge
 * Command shares one service, `R` is inferred from the table. When edges need
 * distinct services `R` cannot be inferred to their union, so supply it on the
 * second call: `define(schemas)<UploadsClient | SaveClient>({ ... })`.
 *
 * @example Read external Model data through context
 * ```ts
 * const machine = define({
 *   state: DialogState,
 *   message: DialogMessage,
 *   context: UploadQueues,
 * })({
 *   initial: Idle(),
 *   states: {
 *     Idle: {
 *       on: {
 *         ClickedSubmit: [
 *           when(
 *             (_state, message, queues) => queues.has(message.fileId),
 *             'Uploading',
 *             ({ message, context: queues }) => ({
 *               model: Uploading({ fileId: message.fileId }),
 *               commands: [UploadFromQueue({ queues, fileId: message.fileId })],
 *             }),
 *           ),
 *         ],
 *       },
 *     },
 *   },
 * })
 * machine.transition(model.dialog, message, model.uploadQueues)
 * ```
 *
 * @experimental Ships from `foldkit/experimental/machine`; expect breaking changes while the API settles.
 */
export declare function define<State extends Tagged, Message extends Tagged, ContextSchema extends Schema.Top>(schemas: MachineSchemas<State, Message, ContextSchema>): <R = never>(definition: MachineDefinition<State, Message, R, ContextSchema['Type']>) => Machine<State, Message, R, ContextSchema['Type']>;
export declare function define<State extends Tagged, Message extends Tagged>(schemas: MachineSchemas<State, Message>): <R = never>(definition: MachineDefinition<State, Message, R>) => Machine<State, Message, R>;
export {};
