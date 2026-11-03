import type { Context } from 'effect';
import { type BoundaryId, type BoundaryRegistry } from './boundary.js';
/** Synchronous message dispatcher provided to view-time element constructors. */
export type DispatchSync = (message: unknown) => void;
/** Identifies which kind of render acquired a Mount. */
export type MountRenderOwner = 'Live' | 'Replay';
/** Resolves the render-owned dispatcher for a Mount at insertion time. */
export type MountDispatchResolver = Readonly<{
    owner: MountRenderOwner;
    resolve: () => DispatchSync;
}>;
export type Frame = Readonly<{
    outerDispatch: DispatchSync;
    mountOuterDispatch: DispatchSync;
    mountRenderOwner: MountRenderOwner;
    runtimeContext: Context.Context<never>;
    boundaryRegistry: BoundaryRegistry;
    boundaryId: BoundaryId;
}>;
/** Pushes a new dispatch and runtime context onto the singleton stack. The
 *  runtime calls this before invoking a user `view`, and any test or
 *  framework helper that builds VNodes outside of a normal render uses the
 *  same pair. Nested calls are supported: each push must be matched by a
 *  paired {@link clearRuntime} so the previous frame is restored.
 *
 *  Optionally accepts a {@link BoundaryRegistry}; the runtime supplies the
 *  same registry across renders so Submodel wrap descriptors persist. When
 *  omitted (e.g. crash views, test helpers that don't use Submodels), a
 *  fresh empty registry is created. The frame starts in the root
 *  boundary. */
export declare const setRuntime: (dispatch: DispatchSync, runtimeContext: Context.Context<never>, boundaryRegistry?: BoundaryRegistry, mountRenderOwner?: MountRenderOwner) => void;
/** Pushes a new frame that inherits the current frame's dispatch, context,
 *  and registry, but uses a different boundary. Used by `h.submodel` to
 *  enter a child Submodel's wrapping context. Must be paired with
 *  {@link clearRuntime}. */
export declare const pushBoundary: (boundaryId: BoundaryId) => void;
/** Pushes a fully-specified frame, ignoring whatever is currently on the
 *  stack. Used by `h.submodel`'s slot-callback wrapping so the wrapped
 *  callback runs in the OUTER (parent) Submodel's context, regardless of
 *  what frame is active at the time the callback is invoked.
 *
 *  Unlike {@link pushBoundary} (which inherits dispatch/registry/context
 *  from the current top), this lets the caller capture a full frame
 *  snapshot at one point and replay it later. Without this primitive, a
 *  slot callback invoked from a deferred context (setTimeout, Promise,
 *  stored callback) would inherit from whatever render's frame happens
 *  to be on the stack at the time, silently mis-binding dispatch and
 *  registry. Must be paired with {@link clearRuntime}. */
export declare const pushFrame: (frame: Frame) => void;
/** Pops the current frame, restoring whatever frame was previously active.
 *  Must be paired with a {@link setRuntime} or {@link pushBoundary} on the
 *  same call stack, including via `try`/`finally` so an exception inside
 *  view code does not leak the frame to subsequent renders.
 *
 *  Throws when called on an empty stack. That signals an unmatched
 *  push/pop pair somewhere upstream and would silently corrupt later
 *  renders if it slid by. */
export declare const clearRuntime: () => void;
/** Returns the current dispatcher. For frames in the root boundary, this
 *  is the runtime's actual dispatch; for nested Submodel boundaries, this
 *  is a cached per-boundary dispatcher that applies the wrapping chain at
 *  event-fire time. Throws when called outside of a runtime frame. */
export declare const requireDispatch: () => DispatchSync;
/** Returns the render-owned root dispatcher for Mount results. A live render
 *  supplies live dispatch, while a historical render supplies no-op dispatch
 *  for acquisitions owned by that replay. */
export declare const requireMountDispatch: () => DispatchSync;
/** Returns whether the current frame is rendering the live or replayed view. */
export declare const requireMountRenderOwner: () => MountRenderOwner;
/** A function that, given a message, resolves it through the current
 *  boundary's wrapping chain immediately and returns a thunk that dispatches
 *  the fully wrapped root message. */
export type UnmountResolver = (message: unknown) => () => void;
/** Returns an {@link UnmountResolver} bound to the current frame's boundary.
 *  `OnUnmount` calls the resolver at build time (boundary alive) to capture a
 *  dispatch thunk that does not depend on what the registry holds when the
 *  element is torn down. Throws when called outside of a runtime frame. */
export declare const requireUnmountResolver: () => UnmountResolver;
/** Returns the current frame's Submodel wrapping chain (innermost first), or an
 *  empty array at the root boundary. `OnMount` records this build-time snapshot
 *  for the Scene test harness, which replays the chain when the Mount is
 *  resolved. Production Mount dispatch uses the ownership-aware resolver below.
 *  Returns `[]` when there is no active frame, mirroring the lazy tolerance of
 *  handler-free Html built outside a render. */
export declare const requireBoundaryMappers: () => ReadonlyArray<(message: unknown) => unknown>;
/** Returns a resolver bound to the current frame's render owner and Submodel
 *  boundary. Mounts invoke it from their insert hook, so a cached VNode uses
 *  the dispatcher for the render that acquires it. That dispatcher follows
 *  later wrapper registrations from the same owner without crossing between
 *  live and replay renders. */
export declare const requireMountDispatchResolver: () => MountDispatchResolver;
/** Returns the current runtime Effect Context, used by Mount integrations
 *  that fork message-producing Effects against the live runtime services. */
export declare const requireRuntimeContext: () => Context.Context<never>;
/** Returns the current frame's boundary registry and boundary id. Used by
 *  `h.submodel` to register wrapping descriptors and compute child
 *  boundary ids. Throws when called outside of a runtime frame. */
export declare const requireBoundary: () => Readonly<{
    registry: BoundaryRegistry;
    boundaryId: BoundaryId;
}>;
/** Returns the full current frame, used by `h.submodel` to snapshot the
 *  parent's context before pushing a child boundary. The snapshot is
 *  captured into slot-callback closures so they can replay the parent's
 *  full frame via {@link pushFrame} when invoked, instead of inheriting
 *  from whatever happens to be on the stack at invocation time. Throws
 *  when called outside of a runtime frame. */
export declare const getCurrentFrame: () => Frame;
