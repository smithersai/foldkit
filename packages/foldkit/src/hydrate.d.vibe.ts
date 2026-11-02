import type { VNode } from './snabbdom/index.ts';
export declare const __elementSignature: (element: Element, vnode: VNode) => string;
export declare const __hydrateVNode: (hydrationRoot: Element, nextVNode: VNode | null, seen: Set<object> | undefined, buildId: string) => VNode;
