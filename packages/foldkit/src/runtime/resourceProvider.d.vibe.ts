import { Effect, Layer, Option, Ref, type Scope } from 'effect';
import type { ManagedResourceConfig, ManagedResources } from '../managedResource/index.js';
import type { PortChannelsBundle } from './hostConnector.vibe';
/** A Managed Resource's config next to the Ref that holds its acquired value. */
export type ManagedResourceRef<Model, Message> = Readonly<{
    config: ManagedResourceConfig<Model, Message>;
    ref: Ref.Ref<Option.Option<unknown>>;
}>;
/**
 * The functions the runtime uses to give Commands and Subscriptions the
 * app's `resources` Layer, its Managed Resources, its port channels, and
 * the interrupt registry, and to give Flags the Layer alone, plus the
 * Managed Resource refs the lifecycle fibers write to.
 */
export type ResourceProvider<Model, Message, Resources, ManagedResourceServices> = Readonly<{
    managedResourceRefs: ReadonlyArray<ManagedResourceRef<Model, Message>>;
    provideAllResources: <A>(effect: Effect.Effect<A, never, Resources | ManagedResourceServices>) => Effect.Effect<A>;
    provideResources: <A>(effect: Effect.Effect<A, never, Resources>) => Effect.Effect<A>;
}>;
/**
 * Builds the runtime's resource provider: one cached build of the
 * `resources` Layer into the runtime scope, a Ref per Managed Resource, and
 * the two functions that provide them. `provideAllResources` is for Commands
 * and Subscriptions. `provideResources` is for Flags, which run before there
 * is a Model to render a crash view against.
 */
export declare const makeResourceProvider: <Model, Message, Resources, ManagedResourceServices>({ resources, managedResources, runtimeScope, maybePortChannels, }: Readonly<{
    resources: Layer.Layer<Resources> | undefined;
    managedResources: ManagedResources<Model, Message, ManagedResourceServices> | undefined;
    runtimeScope: Scope.Scope;
    maybePortChannels: Option.Option<PortChannelsBundle>;
}>) => Effect.Effect<ResourceProvider<Model, Message, Resources, ManagedResourceServices>>;
