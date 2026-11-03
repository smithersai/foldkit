import { Layer, Schema } from 'effect';
import { Document, type HtmlBuilder } from '../html/index.vibe';
import type { ManagedResources } from '../managedResource/index.ts';
import type { Ports } from '../port/index.ts';
import type { Subscriptions } from '../subscription/subscription.vibe';
import type { Return as UpdateReturn } from '../update/index.ts';
import { Url } from '../url/index.vibe';
import type { RoutingConfig } from './browserListeners.vibe';
import type { CrashConfig } from './crashUI.vibe';
import type { DevToolsConfig } from './devToolsConfig.vibe';
import { type FlagsSchemaConfig, type MakeRuntimeReturn } from './runtime.vibe';
import type { SlowConfig } from './slowPhase.vibe';
import type { ViewTransitionConfig } from './viewTransition.vibe';
type BaseApplicationConfig<Model, Message, Resources = never, ManagedResourceServices = never, P extends Ports | undefined = undefined> = Readonly<{
    Model: Schema.Codec<Model, any, unknown, unknown>;
    update: (model: Model, message: Message) => UpdateReturn<Model, Message, Resources | ManagedResourceServices>;
    view: (model: Model, h: HtmlBuilder<Message>) => Document;
    subscriptions?: Subscriptions<Model, Message, Resources | ManagedResourceServices>;
    container: HTMLElement | null;
    ports?: P;
    crash?: CrashConfig<Model, Message>;
    slow?: SlowConfig<Model, Message>;
    viewTransition?: ViewTransitionConfig<Model, Message>;
    freezeModel?: boolean;
    preserveScroll?: boolean;
    resources?: Layer.Layer<Resources>;
    managedResources?: ManagedResources<Model, Message, ManagedResourceServices>;
    devTools?: DevToolsConfig;
}>;
/** Configuration for `makeApplication` with Flags and URL routing. */
export type RoutingApplicationConfigWithFlags<Model, Message, Flags, Resources = never, ManagedResourceServices = never, P extends Ports | undefined = undefined> = BaseApplicationConfig<Model, Message, Resources, ManagedResourceServices, P> & FlagsSchemaConfig<Flags> & Readonly<{
    routing: RoutingConfig<Message>;
    init: (flags: Flags, url: Url) => UpdateReturn<Model, Message, Resources | ManagedResourceServices>;
}>;
/** Configuration for `makeApplication` with URL routing but no Flags. */
export type RoutingApplicationConfig<Model, Message, Resources = never, ManagedResourceServices = never, P extends Ports | undefined = undefined> = BaseApplicationConfig<Model, Message, Resources, ManagedResourceServices, P> & Readonly<{
    routing: RoutingConfig<Message>;
    init: (url: Url) => UpdateReturn<Model, Message, Resources | ManagedResourceServices>;
}>;
/** Configuration for `makeApplication` with Flags but no URL routing. */
export type ApplicationConfigWithFlags<Model, Message, Flags, Resources = never, ManagedResourceServices = never, P extends Ports | undefined = undefined> = BaseApplicationConfig<Model, Message, Resources, ManagedResourceServices, P> & FlagsSchemaConfig<Flags> & Readonly<{
    init: (flags: Flags) => UpdateReturn<Model, Message, Resources | ManagedResourceServices>;
}>;
/** Configuration for `makeApplication` without Flags or URL routing. */
export type ApplicationConfig<Model, Message, Resources = never, ManagedResourceServices = never, P extends Ports | undefined = undefined> = BaseApplicationConfig<Model, Message, Resources, ManagedResourceServices, P> & Readonly<{
    init: () => UpdateReturn<Model, Message, Resources | ManagedResourceServices>;
}>;
/** The `init` function type for a `makeApplication` app without URL routing. */
export type ApplicationInit<Model, Message, Flags = void, Resources = never, ManagedResourceServices = never> = Flags extends void ? () => UpdateReturn<Model, Message, Resources | ManagedResourceServices> : (flags: Flags) => UpdateReturn<Model, Message, Resources | ManagedResourceServices>;
/** The `init` function type for a `makeApplication` app with URL routing, receives the current URL and optional Flags. */
export type RoutingApplicationInit<Model, Message, Flags = void, Resources = never, ManagedResourceServices = never> = Flags extends void ? (url: Url) => UpdateReturn<Model, Message, Resources | ManagedResourceServices> : (flags: Flags, url: Url) => UpdateReturn<Model, Message, Resources | ManagedResourceServices>;
/** Creates a Foldkit application that owns the page and returns a runtime that
 *  can be passed to `run`. The `view` returns a `Document`, so the runtime
 *  manages `document.title` and the canonical / og:url tags. Add a `routing`
 *  config for URL routing. Use one page-owning application per document. To
 *  mount an app scoped to a node without touching the document `<head>`, use
 *  `makeElement`. */
export declare function makeApplication<Model, Message extends {
    _tag: string;
}, Flags, Resources = never, ManagedResourceServices = never, P extends Ports | undefined = undefined>(config: RoutingApplicationConfigWithFlags<Model, Message, Flags, Resources, ManagedResourceServices, P>): MakeRuntimeReturn<P, Flags, Resources, 'Application'>;
export declare function makeApplication<Model, Message extends {
    _tag: string;
}, Resources = never, ManagedResourceServices = never, P extends Ports | undefined = undefined>(config: RoutingApplicationConfig<Model, Message, Resources, ManagedResourceServices, P>): MakeRuntimeReturn<P, void, Resources, 'Application'>;
export declare function makeApplication<Model, Message extends {
    _tag: string;
}, Flags, Resources = never, ManagedResourceServices = never, P extends Ports | undefined = undefined>(config: ApplicationConfigWithFlags<Model, Message, Flags, Resources, ManagedResourceServices, P>): MakeRuntimeReturn<P, Flags, Resources, 'Application'>;
export declare function makeApplication<Model, Message extends {
    _tag: string;
}, Resources = never, ManagedResourceServices = never, P extends Ports | undefined = undefined>(config: ApplicationConfig<Model, Message, Resources, ManagedResourceServices, P>): MakeRuntimeReturn<P, void, Resources, 'Application'>;
export {};
