import { Effect, Layer, Schema } from 'effect';
import { Html, type HtmlBuilder } from '../html/index.ts';
import type { ManagedResources } from '../managedResource/index.ts';
import type { Ports } from '../port/index.ts';
import type { Subscriptions } from '../subscription/subscription.vibe';
import type { Return as UpdateReturn } from '../update/index.ts';
import type { ElementCrashConfig } from './crashUI.vibe';
import type { DevToolsConfig } from './devToolsConfig.vibe';
import type { ApplicationInit } from './makeApplication.vibe';
import { type FlagsSchemaConfig, type MakeRuntimeReturn } from './runtime.ts';
import type { SlowConfig } from './slowPhase.vibe';
import type { ViewTransitionConfig } from './viewTransition.vibe';
type BaseElementConfig<Model, Message, Resources = never, ManagedResourceServices = never, P extends Ports | undefined = undefined> = Readonly<{
    Model: Schema.Codec<Model, any, unknown, unknown>;
    update: (model: Model, message: Message) => UpdateReturn<Model, Message, Resources | ManagedResourceServices>;
    view: (model: Model, h: HtmlBuilder<Message>) => Html;
    subscriptions?: Subscriptions<Model, Message, Resources | ManagedResourceServices>;
    container: HTMLElement | null;
    ports?: P;
    crash?: ElementCrashConfig<Model, Message>;
    slow?: SlowConfig<Model, Message>;
    viewTransition?: ViewTransitionConfig<Model, Message>;
    freezeModel?: boolean;
    resources?: Layer.Layer<Resources>;
    managedResources?: ManagedResources<Model, Message, ManagedResourceServices>;
    devTools?: DevToolsConfig;
}>;
/** Configuration for `makeElement` with Flags. */
export type ElementConfigWithFlags<Model, Message, Flags, Resources = never, ManagedResourceServices = never, P extends Ports | undefined = undefined> = BaseElementConfig<Model, Message, Resources, ManagedResourceServices, P> & FlagsSchemaConfig<Flags> & Readonly<{
    /**
     * Resolves the Flags once at startup, before `init` runs. Services this
     * Effect requires are provided from the `resources` Layer, which the
     * runtime builds a single time and shares with every Command and
     * Subscription. The error channel is `never`, so this Effect handles its
     * own failures with `Effect.catch`, the same contract a Command's Effect
     * has.
     */
    flags: Effect.Effect<Flags, never, NoInfer<Resources>>;
    init: (flags: Flags) => UpdateReturn<Model, Message, Resources | ManagedResourceServices>;
}>;
/** Configuration for `makeElement` without Flags. */
export type ElementConfig<Model, Message, Resources = never, ManagedResourceServices = never, P extends Ports | undefined = undefined> = BaseElementConfig<Model, Message, Resources, ManagedResourceServices, P> & Readonly<{
    init: () => UpdateReturn<Model, Message, Resources | ManagedResourceServices>;
}>;
/** The `init` function type for a `makeElement` app. A scoped app never owns
 *  the URL, so its `init` has the same shape as a non-routing
 *  `ApplicationInit`: argless, or receiving Flags when `Flags` is set. */
export type ElementInit<Model, Message, Flags = void, Resources = never, ManagedResourceServices = never> = ApplicationInit<Model, Message, Flags, Resources, ManagedResourceServices>;
/**
 * Creates a Foldkit app scoped to its container and returns a runtime that
 * can be passed to `run`.
 *
 * Unlike `makeApplication`, the `view` returns `Html` directly rather than a
 * `Document`, and the runtime never touches the document `<head>`. This lets a
 * Foldkit app be embedded at a node (a widget on a page it does not own)
 * without clobbering the host page's `title`, `canonical`, or `og:url`. Use
 * `makeApplication` when the app owns the page and should manage those tags, and
 * `makeElement` when it is one component among others on a page it does not
 * control. Embedded apps do not own the URL bar, so `makeElement` has no
 * `routing` config.
 */
export declare function makeElement<Model, Message extends {
    _tag: string;
}, Flags, Resources = never, ManagedResourceServices = never, P extends Ports | undefined = undefined>(config: ElementConfigWithFlags<Model, Message, Flags, Resources, ManagedResourceServices, P>): MakeRuntimeReturn<P, void, Resources, 'Element'>;
export declare function makeElement<Model, Message extends {
    _tag: string;
}, Resources = never, ManagedResourceServices = never, P extends Ports | undefined = undefined>(config: ElementConfig<Model, Message, Resources, ManagedResourceServices, P>): MakeRuntimeReturn<P, void, Resources, 'Element'>;
export {};
