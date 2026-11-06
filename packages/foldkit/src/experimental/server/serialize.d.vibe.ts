import type { VNode } from '../../snabbdom/vnode.ts';
/** Extra attributes appended to the serialized root element, used by
 *  `renderToString` to stamp the hydration marker without threading
 *  server-only concerns through view code. Root attributes are applied after
 *  the vnode's own data, so the stamp always wins over a same-named
 *  attribute in the view.
 *
 * `emitHydrationMarkers` turns on the key and identity markers hydration
 * verifies adoption against. They are part of the hydration handoff, so a
 * render nobody will hydrate carries none of them.
 *
 * @internal Not part of the `foldkit/experimental/server` surface; `renderToString` is the public entry to serialization.
 */
export type SerializeOptions = Readonly<{
    rootAttributes?: Readonly<Record<string, string>>;
    emitHydrationMarkers?: boolean;
}>;
/** Escapes a string for use as HTML text content.
 *
 * @internal Shared with the template injector; not part of the `foldkit/experimental/server` surface.
 */
export declare const escapeText: (value: string) => string;
/** Escapes a string for use inside a double-quoted HTML attribute value.
 *
 * @internal Shared with the template injector; not part of the `foldkit/experimental/server` surface.
 */
export declare const escapeAttributeValue: (value: string) => string;
export declare const controlledValueContent: (properties: Readonly<Record<string, unknown>> | undefined) => string | undefined;
/** Serializes a view-produced vnode tree to an HTML string. Event handlers and
 *  hooks are behavior, not markup, and are skipped; attrs, class, dataset,
 *  prop-backed attributes, and inline style are emitted in that order. A `null`
 *  tree serializes to an empty comment, mirroring how the runtime patches
 *  `null` as a comment node.
 *
 * A hydratable render also stamps a fingerprint of each vnode's key and
 * identity, so hydration can tell one logical entity from another; the raw key
 * and the compiler's source identity never appear in the markup. A render that
 * is not hydratable emits neither.
 *
 * @internal Not part of the `foldkit/experimental/server` surface; `renderToString` is the public entry to serialization.
 */
export declare const serializeHtml: (root: VNode | null, options?: SerializeOptions) => string;
