import { Data } from 'effect';
import { type VNode } from '../vdom.vibe';
/** Why a lazy call ran its view instead of reusing the cached result. */
export type LazyMissReason = Data.TaggedEnum<{
    NoCachedEntry: {};
    FunctionChanged: {};
    FrameChanged: {};
    ArgumentCountChanged: Readonly<{
        previousCount: number;
        currentCount: number;
    }>;
    ArgumentsChanged: Readonly<{
        indices: ReadonlyArray<number>;
    }>;
}>;
/** @internal Constructors and matching for lazy cache miss reasons. */
export declare const LazyMissReason: Data.TaggedEnum.Constructor<{
    readonly _tag: "ArgumentCountChanged";
    readonly previousCount: number;
    readonly currentCount: number;
} | {
    readonly _tag: "ArgumentsChanged";
    readonly indices: ReadonlyArray<number>;
} | {
    readonly _tag: "FrameChanged";
} | {
    readonly _tag: "FunctionChanged";
} | {
    readonly _tag: "NoCachedEntry";
}>;
/** The result of a lazy cache lookup. `slot` identifies the `createLazy` or
 *  `createKeyedLazy` instance. `key` is undefined for unkeyed calls, and
 *  `missReason` is undefined when the cached result is reused. */
export type LazyResolution = Readonly<{
    slot: object;
    key: PropertyKey | undefined;
    missReason: LazyMissReason | undefined;
}>;
/** @internal Reports lazy cache hits and misses while `run` executes.
 *  Restores the previous observer when `run` returns or throws. */
export declare const observeLazyResolutions: <A>(observer: (resolution: LazyResolution) => void, run: () => A) => A;
/** Creates a memoization slot for a view function. On each render, if the
 *  function reference, dispatchers, Mount render owner, and all arguments are
 *  equal to the previous call, the cached VNode is returned without
 *  re-running the view function. Snabbdom's `patchVnode` short-circuits when
 *  it sees the same VNode reference, so both VNode construction and subtree
 *  diffing are skipped.
 *
 *  Dispatchers and Mount render ownership are part of the cache key because
 *  event handlers and Mounts in the cached VNode close over the frame active
 *  when the VNode was built. Returning a VNode built under a different frame
 *  would silently misroute events or retain the wrong Mount lifecycle owner.
 *
 *  The cached VNode must be rendered at a single position in the tree.
 *  Snabbdom tracks the real DOM through each VNode's mutable `.elm` field
 *  and assumes one VNode per position. Rendering the same cached VNode at
 *  two positions causes patches to collide and can duplicate or misplace
 *  DOM nodes. If the same content needs to appear in multiple positions,
 *  create one slot per position. */
export declare const createLazy: () => (<Args extends ReadonlyArray<unknown>>(fn: (...args: Args) => VNode | null, args: Args) => VNode | null);
/** Creates a keyed memoization map for one view function rendered under many
 *  keys. Each key gets its own independent cache slot, compared exactly the way
 *  `createLazy` compares its single slot: on each render, only the keys whose
 *  function reference, dispatch, or arguments changed by reference are
 *  recomputed. For example: a list rendering one row view per item, a detail
 *  view rendering one entity per route, or one view function rendered at two
 *  call sites.
 *
 *  Key by the identifier that already gives the rendered thing its DOM
 *  identity. A row keyed `todo.id` through `h.keyed` memoizes under `todo.id`;
 *  a detail page keyed `post.slug` memoizes under `post.slug`. Reusing that one
 *  identifier keeps the memo and the DOM invalidating together.
 *
 *  Entries are never evicted, so keys are expected to be bounded, such as an
 *  entity registry, a route table, or a fixed set of call sites. A key drawn
 *  from something unbounded, such as a search query or a paged cursor, grows
 *  the map for the lifetime of the page. If that becomes the shape an app
 *  needs, the upgrade path is a variant that drops keys absent from the latest
 *  render pass, not a cap on this one.
 *
 *  Like `createLazy`, each key's cached VNode must be rendered at a single
 *  position in the tree. If the same content needs to appear in multiple
 *  positions, give each position its own key. */
export declare const createKeyedLazy: () => (<Args extends ReadonlyArray<unknown>>(key: PropertyKey, fn: (...args: Args) => VNode | null, args: Args) => VNode | null);
