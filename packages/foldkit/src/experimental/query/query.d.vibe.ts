import { Effect, Schema } from "effect";
import * as AsyncData from '../../asyncData/index.js';
import * as Command from '../../command/index.js';
import * as Update from '../../update/index.js';
import { type CompletedFetchOf, type LiftQuery } from './internal.vibe';
export type QueryConfig<Name extends string, A, AI, E, EI, R> = Readonly<{
    name: Name;
    data: Schema.Codec<A, AI, never, never>;
    error: Schema.Codec<E, EI, never, never>;
    execute: Effect.Effect<A, E, R>;
}>;
declare const makeQueryMessage: <A, AI, E, EI>(data: Schema.Codec<A, AI>, error: Schema.Codec<E, EI>) => import("../../schema/index.js").MessageUnion<{
    readonly CompletedFetch: {
        generation: Schema.Number;
        result: Schema.Result<Schema.Codec<A, AI, never, never>, Schema.Codec<E, EI, never, never>>;
    };
}>;
/**
 * Schema-backed Message union dispatched when a Query Fetch completes.
 *
 * @experimental Ships from `foldkit/experimental/query`; expect breaking changes while the API settles.
 */
export type QueryMessage<A, AI, E, EI> = ReturnType<typeof makeQueryMessage<A, AI, E, EI>>;
/** Builds the Model Schema for a Query. */
export declare const makeQueryModel: <A, AI, E, EI>(data: Schema.Codec<A, AI>, error: Schema.Codec<E, EI>) => Schema.Struct<{
    readonly data: Schema.Codec<AsyncData.AsyncData<A, E>, AsyncData.AsyncDataEncoded<AI, EI>, never, never>;
    readonly generation: Schema.Number;
}>;
/**
 * Model Schema for a Query containing one `AsyncData` value.
 *
 * @experimental Ships from `foldkit/experimental/query`; expect breaking changes while the API settles.
 */
export type QueryModel<A, AI, E, EI> = ReturnType<typeof makeQueryModel<A, AI, E, EI>>;
/**
 * Submodel for fetching and retaining one `AsyncData` value.
 *
 * @experimental Ships from `foldkit/experimental/query`; expect breaking changes while the API settles.
 */
export interface Query<Name extends string, A, AI, E, EI, R = never> {
    /** Schema for this Query's Model. */
    readonly Model: QueryModel<A, AI, E, EI>;
    /** Schema-backed union of Messages handled by this Query. */
    readonly Message: QueryMessage<A, AI, E, EI>;
    /**
     * Command definition for matching this Query's pending fetch in Story and
     * Scene tests. Start fetches through a loading operation so the Model and
     * request generation advance together; do not call this directly.
     */
    readonly Fetch: Command.CommandDefinitionWithArgs<`Fetch${Name}`, {
        readonly generation: typeof Schema.Number;
    }, Effect.Effect<CompletedFetchOf<QueryMessage<A, AI, E, EI>>, never, R>>;
    /**
     * Creates a Query Model for initial parent Model construction. Never replace
     * a live Query with `init()`: it can reuse an in-flight request generation.
     * Use `reset` instead.
     */
    readonly init: () => QueryModel<A, AI, E, EI>['Type'];
    /** Clears the Query while preserving its request identity. */
    readonly reset: (model: QueryModel<A, AI, E, EI>['Type']) => Update.Return<QueryModel<A, AI, E, EI>['Type'], QueryMessage<A, AI, E, EI>['Type']>;
    /** Reads the `AsyncData` value from the Query Model. */
    readonly read: (model: QueryModel<A, AI, E, EI>['Type']) => AsyncData.AsyncData<A, E>;
    /** Folds a Fetch completion into the Query Model. */
    readonly update: (model: QueryModel<A, AI, E, EI>['Type'], message: QueryMessage<A, AI, E, EI>['Type']) => Update.Return<QueryModel<A, AI, E, EI>['Type'], QueryMessage<A, AI, E, EI>['Type']>;
    /** Refreshes loaded data and does nothing when no data is present. */
    readonly revalidate: (model: QueryModel<A, AI, E, EI>['Type']) => Update.Return<QueryModel<A, AI, E, EI>['Type'], QueryMessage<A, AI, E, EI>['Type'], R>;
    /** Loads missing data or refreshes loaded data. */
    readonly revalidateOrLoad: (model: QueryModel<A, AI, E, EI>['Type']) => Update.Return<QueryModel<A, AI, E, EI>['Type'], QueryMessage<A, AI, E, EI>['Type'], R>;
    /** Loads data only when the Query has no usable value. */
    readonly loadIfMissing: (model: QueryModel<A, AI, E, EI>['Type']) => Update.Return<QueryModel<A, AI, E, EI>['Type'], QueryMessage<A, AI, E, EI>['Type'], R>;
    /** Lifts this Query's update and loading operations into a parent Model. */
    readonly lift: LiftQuery<QueryModel<A, AI, E, EI>['Type'], QueryMessage<A, AI, E, EI>['Type'], R>;
    /** Executes the configured fetch directly and returns settled `AsyncData`. */
    readonly run: Effect.Effect<AsyncData.AsyncData<A, E>, never, R>;
}
export declare function defineQuery<Name extends string, A, AI, E, EI, R>(config: QueryConfig<Name, A, AI, E, EI, R>): Query<Name, A, AI, E, EI, R>;
export {};
