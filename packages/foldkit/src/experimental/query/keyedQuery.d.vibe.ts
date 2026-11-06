import { Effect, Schema } from 'effect';
import * as AsyncData from '../../asyncData/index.js';
import * as Command from '../../command/index.vibe';
import * as Update from '../../update/index.js';
import { type CompletedFetchOf, type KeyedArgs, type LiftKeyedQuery } from './internal.vibe';
export type SyncFields = {
    readonly [x: PropertyKey]: Schema.Codec<unknown, unknown, never, never>;
};
export type KeyedQueryConfig<Name extends string, A, AI, E, EI, Fields extends SyncFields, R> = Readonly<{
    name: Name;
    data: Schema.Codec<A, AI, never, never>;
    error: Schema.Codec<E, EI, never, never>;
    args: Fields;
    toKey?: (args: Schema.Schema.Type<Schema.Struct<Fields>>) => string;
    execute: (args: Schema.Schema.Type<Schema.Struct<Fields>>) => Effect.Effect<A, E, R>;
}>;
declare const makeKeyedQueryMessage: <A, AI, E, EI, Fields extends SyncFields>(data: Schema.Codec<A, AI>, error: Schema.Codec<E, EI>, Args: Schema.Struct<Fields>) => import("../../schema/index.vibe").MessageUnion<{
    readonly CompletedFetch: {
        args: Schema.Struct<Fields>;
        generation: Schema.Number;
        result: Schema.Result<Schema.Codec<A, AI, never, never>, Schema.Codec<E, EI, never, never>>;
    };
}>;
/**
 * Schema-backed Message union dispatched when a KeyedQuery fetch completes.
 *
 * @experimental Ships from `foldkit/experimental/query`; expect breaking changes while the API settles.
 */
export type KeyedQueryMessage<A, AI, E, EI, Fields extends SyncFields> = ReturnType<typeof makeKeyedQueryMessage<A, AI, E, EI, Fields>>;
/** Builds the Model Schema for a KeyedQuery. */
export declare const makeKeyedQueryModel: <A, AI, E, EI, Fields extends SyncFields>(data: Schema.Codec<A, AI>, error: Schema.Codec<E, EI>, Args: Schema.Struct<Fields>) => Schema.Struct<{
    readonly generation: Schema.Number;
    readonly entries: Schema.HashMap<Schema.String, Schema.Struct<{
        readonly args: Schema.Struct<Fields>;
        readonly data: Schema.Codec<AsyncData.AsyncData<A, E>, AsyncData.AsyncDataEncoded<AI, EI>, never, never>;
        readonly generation: Schema.Number;
    }>>;
}>;
/**
 * Model Schema for a KeyedQuery containing retained `AsyncData` entries.
 *
 * @experimental Ships from `foldkit/experimental/query`; expect breaking changes while the API settles.
 */
export type KeyedQueryModel<A, AI, E, EI, Fields extends SyncFields> = ReturnType<typeof makeKeyedQueryModel<A, AI, E, EI, Fields>>;
/**
 * Submodel for fetching and retaining `AsyncData` values by argument key.
 *
 * @experimental Ships from `foldkit/experimental/query`; expect breaking changes while the API settles.
 */
export interface KeyedQuery<Name extends string, A, AI, E, EI, Fields extends SyncFields, R = never> {
    /** Schema for this KeyedQuery's Model. */
    readonly Model: KeyedQueryModel<A, AI, E, EI, Fields>;
    /** Schema-backed union of Messages handled by this KeyedQuery. */
    readonly Message: KeyedQueryMessage<A, AI, E, EI, Fields>;
    /**
     * Command definition for matching this KeyedQuery's pending fetch in Story
     * and Scene tests. Start fetches through a loading operation so the Model
     * and request generation advance together; do not call this directly.
     */
    readonly Fetch: Command.CommandDefinitionWithArgs<`Fetch${Name}`, {
        readonly args: Schema.Struct<Fields>;
        readonly generation: typeof Schema.Number;
    }, Effect.Effect<CompletedFetchOf<KeyedQueryMessage<A, AI, E, EI, Fields>>, never, R>>;
    /**
     * Creates a KeyedQuery Model for initial parent Model construction. Never
     * replace a live KeyedQuery with `init()`: it can reuse an in-flight request
     * generation. Use `reset` instead.
     */
    readonly init: () => KeyedQueryModel<A, AI, E, EI, Fields>['Type'];
    /** Clears every entry while preserving request identity. */
    readonly reset: (model: KeyedQueryModel<A, AI, E, EI, Fields>['Type']) => Update.Return<KeyedQueryModel<A, AI, E, EI, Fields>['Type'], KeyedQueryMessage<A, AI, E, EI, Fields>['Type']>;
    /** Reads one entry, returning `Idle` when that entry does not exist. */
    readonly read: (model: KeyedQueryModel<A, AI, E, EI, Fields>['Type'], args: KeyedArgs<Fields>) => AsyncData.AsyncData<A, E>;
    /** Folds a keyed Fetch completion into the matching entry. */
    readonly update: (model: KeyedQueryModel<A, AI, E, EI, Fields>['Type'], message: KeyedQueryMessage<A, AI, E, EI, Fields>['Type']) => Update.Return<KeyedQueryModel<A, AI, E, EI, Fields>['Type'], KeyedQueryMessage<A, AI, E, EI, Fields>['Type']>;
    /** Refreshes a loaded entry and does nothing when it has no data. */
    readonly revalidate: Update.Fold<KeyedQueryModel<A, AI, E, EI, Fields>['Type'], KeyedQueryMessage<A, AI, E, EI, Fields>['Type'], KeyedArgs<Fields>, R>;
    /** Loads a missing entry or refreshes a loaded entry. */
    readonly revalidateOrLoad: Update.Fold<KeyedQueryModel<A, AI, E, EI, Fields>['Type'], KeyedQueryMessage<A, AI, E, EI, Fields>['Type'], KeyedArgs<Fields>, R>;
    /** Loads an entry only when it has no usable value. */
    readonly loadIfMissing: Update.Fold<KeyedQueryModel<A, AI, E, EI, Fields>['Type'], KeyedQueryMessage<A, AI, E, EI, Fields>['Type'], KeyedArgs<Fields>, R>;
    /** Lifts this KeyedQuery's update and loading operations into a parent Model. */
    readonly lift: LiftKeyedQuery<KeyedQueryModel<A, AI, E, EI, Fields>['Type'], KeyedQueryMessage<A, AI, E, EI, Fields>['Type'], KeyedArgs<Fields>, R>;
    /** Executes one keyed fetch directly and returns settled `AsyncData`. */
    readonly run: (args: KeyedArgs<Fields>) => Effect.Effect<AsyncData.AsyncData<A, E>, never, R>;
}
export declare function defineKeyedQuery<Name extends string, A, AI, E, EI, Fields extends SyncFields, R>(config: KeyedQueryConfig<Name, A, AI, E, EI, Fields, R>): KeyedQuery<Name, A, AI, E, EI, Fields, R>;
export {};
