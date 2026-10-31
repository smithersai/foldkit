import { Cause, Effect, Option, PubSub, Scope } from "effect";
import type { Subscriptions } from '../subscription/subscription.js';
import { type ResolvedSlowPhaseConfig, type SlowSubscriptionDependenciesContext } from './slowPhase.js';
/**
 * Forks one fiber per Subscription into the runtime scope. Each fiber
 * derives the Subscription's dependencies from every Model, restarts its
 * stream when they change under its equivalence, and feeds the Messages
 * the stream emits into the queue. A defect anywhere in that pipeline
 * crashes the runtime instead of dying silently in the fiber.
 */
export declare const forkSubscriptionFibers: <Model, Message, Services>({ subscriptions, initModel, modelPubSub, runtimeScope, maybeSlowSubscriptionDependencies, enqueueMessageEffect, provideAllResources, crashWith, }: Readonly<{
    subscriptions: Subscriptions<Model, Message, Services>;
    initModel: Model;
    modelPubSub: PubSub.PubSub<Model>;
    runtimeScope: Scope.Scope;
    maybeSlowSubscriptionDependencies: Option.Option<ResolvedSlowPhaseConfig<SlowSubscriptionDependenciesContext<Model>>>;
    enqueueMessageEffect: (message: Message) => Effect.Effect<void>;
    provideAllResources: <A>(effect: Effect.Effect<A, never, Services>) => Effect.Effect<A>;
    crashWith: (cause: Cause.Cause<never>, maybeMessage: Option.Option<Message>) => Effect.Effect<void>;
}>) => Effect.Effect<void>;
