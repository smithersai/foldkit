import { type KeyedQuery, type KeyedQueryConfig, type SyncFields } from './keyedQuery.js';
import { type Query, type QueryConfig } from './query.vibe';
/**
 * Defines a Submodel that fetches data and retains it in the application
 * Model. Add `args` to define a {@link KeyedQuery}; omit them to define a
 * {@link Query}.
 *
 * @experimental Ships from `foldkit/experimental/query`; expect breaking changes while the API settles.
 */
export declare function define<Name extends string, A, AI, E, EI, Fields extends SyncFields, R = never>(config: KeyedQueryConfig<Name, A, AI, E, EI, Fields, R>): KeyedQuery<Name, A, AI, E, EI, Fields, R>;
export declare function define<Name extends string, A, AI, E, EI, R = never>(config: QueryConfig<Name, A, AI, E, EI, R> & {
    readonly args?: never;
    readonly toKey?: never;
}): Query<Name, A, AI, E, EI, R>;
