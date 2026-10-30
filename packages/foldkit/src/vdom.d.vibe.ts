import { Option } from "effect";
import { type VNode, toVNode } from './snabbdom/index.js';
export type { VNode } from './snabbdom/index.js';
export { toVNode };
export declare const patch: (oldVnode: VNode | Element | DocumentFragment, vnode: VNode, onRootPatched?: (vnode: VNode) => void) => VNode;
export declare const memoizedVNodes: WeakSet<VNode>;
/** Clones any reused vnode in the tree so snabbdom never sees one object at two
 *  positions. Memoized subtrees (createLazy/createKeyedLazy results) are left
 *  opaque so their same-vnode short-circuit survives. Pass a shared `seen` set
 *  to coordinate with `dedupeMemoizedResult` across a render; omit it for
 *  one-off use. */
export declare const dedupeSharedVNodes: (root: VNode, seen?: Set<object>) => VNode;
/** Dedupes the freshly built subtree of a memoized view (a
 *  createLazy/createKeyedLazy result) so a const shared inside it, or across
 *  memoized siblings sharing `seen`, is cloned even though the top-level pass
 *  leaves memoized subtrees opaque. A root owned by an earlier tree or lazy slot
 *  is cloned before this slot caches it. The result root stays untracked so the
 *  top-level pass exempts it rather than treating it as a duplicate. */
export declare const dedupeMemoizedResult: (root: VNode, seen?: Set<object>) => VNode;
export declare const __patchVNode: (maybeCurrentVNode: Option.Option<VNode>, nextVNode: VNode | null, container: HTMLElement, seen?: Set<object>, onRootPatched?: (vnode: VNode) => void) => VNode;
export declare const __recoverVNodeAfterPatchFailure: (currentVNode: VNode) => VNode;
