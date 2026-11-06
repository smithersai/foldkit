import { Option, Schema } from 'effect';
import type { Visibility } from './visibility.vibe';
/** Context provided when view construction exceeds its configured time budget. */
export type SlowViewContext<Model, Message> = Readonly<{
    _tag: 'View';
    model: Model;
    message: Option.Option<Message>;
    durationMs: number;
    thresholdMs: number;
}>;
/** Context provided when update exceeds its configured time budget. */
export type SlowUpdateContext<Model, Message> = Readonly<{
    _tag: 'Update';
    previousModel: Model;
    nextModel: Model;
    message: Message;
    durationMs: number;
    thresholdMs: number;
}>;
/** Context provided when DOM patching exceeds its configured time budget. */
export type SlowPatchContext<Model, Message> = Readonly<{
    _tag: 'Patch';
    model: Model;
    message: Option.Option<Message>;
    durationMs: number;
    thresholdMs: number;
}>;
/** Context provided when subscription dependency extraction exceeds its configured time budget. */
export type SlowSubscriptionDependenciesContext<Model> = Readonly<{
    _tag: 'SubscriptionDependencies';
    subscriptionKey: string;
    model: Model;
    durationMs: number;
    thresholdMs: number;
}>;
/** Tagged union of every slow-phase context passed to `slow.onSlow`. */
export type SlowContext<Model, Message> = SlowViewContext<Model, Message> | SlowUpdateContext<Model, Message> | SlowPatchContext<Model, Message> | SlowSubscriptionDependenciesContext<Model>;
/** Phase names measured by the slow warning runtime option. */
export declare const SlowPhase: Schema.Literals<readonly ["Update", "View", "Patch", "SubscriptionDependencies"]>;
export type SlowPhase = typeof SlowPhase.Type;
/** Budget overrides for slow warning phases. Omitted fields use Foldkit defaults. */
export type SlowThresholdOverrides = Readonly<{
    Update?: number;
    View?: number;
    Patch?: number;
    SubscriptionDependencies?: number;
}>;
/** One measured phase: its budget and the callback fired when it is exceeded. */
export type ResolvedSlowPhaseConfig<Context> = Readonly<{
    thresholdMs: number;
    onSlow: (context: Context) => void;
}>;
type ResolvedSlowConfig<Model, Message> = Readonly<{
    view: Option.Option<ResolvedSlowPhaseConfig<SlowViewContext<Model, Message>>>;
    update: Option.Option<ResolvedSlowPhaseConfig<SlowUpdateContext<Model, Message>>>;
    patch: Option.Option<ResolvedSlowPhaseConfig<SlowPatchContext<Model, Message>>>;
    subscriptionDependencies: Option.Option<ResolvedSlowPhaseConfig<SlowSubscriptionDependenciesContext<Model>>>;
}>;
/**
 * Slow-phase warning configuration.
 *
 * By default, all phases are enabled in development with Foldkit's default
 * thresholds. Pass `false` to disable warnings entirely. Pass an object to
 * refine those defaults.
 *
 * - `show`: `'Development'` (default) enables warnings only under Vite's dev
 *   server. `'Always'` enables them in every environment.
 * - `measuredPhases`: Phases to measure. Defaults to every slow warning phase.
 * - `thresholdOverrides`: Per-phase budget overrides. Omitted fields keep defaults; overrides for unmeasured phases are ignored.
 * - `onSlow`: Callback for every measured phase that exceeds its budget. Replaces Foldkit's default `console.warn`; Foldkit will not also warn for tags your callback ignores.
 */
export type SlowConfig<Model, Message> = false | Readonly<{
    show?: Visibility;
    measuredPhases?: ReadonlyArray<SlowPhase>;
    thresholdOverrides?: SlowThresholdOverrides;
    onSlow?: (context: SlowContext<Model, Message>) => void;
}>;
export declare const __resolveSlowConfig: <Model, Message>(slow: SlowConfig<Model, Message> | undefined, isSlowVisible: (show: Visibility) => boolean) => Option.Option<ResolvedSlowConfig<Model, Message>>;
export declare const measureSlowPhase: <Context, Result>(maybeConfig: Option.Option<ResolvedSlowPhaseConfig<Context>>, run: () => Result) => readonly [Result, Option.Option<number>];
export declare const reportSlowPhase: <Context>(maybeConfig: Option.Option<ResolvedSlowPhaseConfig<Context>>, maybeDurationMs: Option.Option<number>, makeContext: (durationMs: number, thresholdMs: number) => Context) => void;
export declare const defaultSlowCallback: (context: SlowContext<unknown, unknown>) => void;
export {};
