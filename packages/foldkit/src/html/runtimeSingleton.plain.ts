import type { BoundaryId, BoundaryRegistry } from './boundary.js'
import type { Frame } from './runtimeSingleton.vibe'

// NOTE: synchronous VibeLang code never throws (Will, 2026-10-31). The frame
// stack and the functions that throw on a missing or unbalanced frame live
// here, outside VibeLang, unchanged; runtimeSingleton.vibe re-exports them
// with their public declarations.

export const stack: Array<Frame> = []

export const requireFrame = (): Frame => {
  const frame = stack[stack.length - 1]
  if (frame === undefined) {
    throw new Error(
      'Foldkit: html element constructors must be called inside a runtime-driven ' +
        'render. The element was built outside a view, or foldkit was loaded as ' +
        'more than one instance (a bundler split foldkit and @foldkit/ui into ' +
        'separate copies).',
    )
  }
  return frame
}

/** Pushes a new frame that inherits the current frame's dispatch, context,
 *  and registry, but uses a different boundary. Used by `h.submodel` to
 *  enter a child Submodel's wrapping context. Must be paired with
 *  {@link clearRuntime}. */
export const pushBoundary = (boundaryId: BoundaryId): void => {
  const parent = stack[stack.length - 1]
  if (parent === undefined) {
    throw new Error(
      'Foldkit: pushBoundary called without an active runtime frame',
    )
  }
  stack.push({
    outerDispatch: parent.outerDispatch,
    mountOuterDispatch: parent.mountOuterDispatch,
    mountRenderOwner: parent.mountRenderOwner,
    runtimeContext: parent.runtimeContext,
    boundaryRegistry: parent.boundaryRegistry,
    boundaryId,
  })
}

/** Pops the current frame, restoring whatever frame was previously active.
 *  Must be paired with a `setRuntime` or {@link pushBoundary} on the
 *  same call stack, including via `try`/`finally` so an exception inside
 *  view code does not leak the frame to subsequent renders.
 *
 *  Throws when called on an empty stack. That signals an unmatched
 *  push/pop pair somewhere upstream and would silently corrupt later
 *  renders if it slid by. */
export const clearRuntime = (): void => {
  if (stack.length === 0) {
    throw new Error(
      'Foldkit: clearRuntime called on an empty runtime stack. This means ' +
        'a `pushBoundary` or `setRuntime` was not paired with `clearRuntime` ' +
        '(or vice versa) upstream. Likely a bug in a custom Submodel ' +
        'integration or view-time helper.',
    )
  }
  stack.pop()
}

/** Returns the current frame's boundary registry and boundary id. Used by
 *  `h.submodel` to register wrapping descriptors and compute child
 *  boundary ids. Throws when called outside of a runtime frame. */
export const requireBoundary = (): Readonly<{
  registry: BoundaryRegistry
  boundaryId: BoundaryId
}> => {
  const frame = stack[stack.length - 1]
  if (frame === undefined) {
    throw new Error(
      'Foldkit: h.submodel must be called inside a runtime-driven render',
    )
  }
  return { registry: frame.boundaryRegistry, boundaryId: frame.boundaryId }
}

/** Returns the full current frame, used by `h.submodel` to snapshot the
 *  parent's context before pushing a child boundary. The snapshot is
 *  captured into slot-callback closures so they can replay the parent's
 *  full frame via `pushFrame` when invoked, instead of inheriting
 *  from whatever happens to be on the stack at invocation time. Throws
 *  when called outside of a runtime frame. */
export const getCurrentFrame = (): Frame => {
  const frame = stack[stack.length - 1]
  if (frame === undefined) {
    throw new Error(
      'Foldkit: getCurrentFrame called without an active runtime frame',
    )
  }
  return frame
}
