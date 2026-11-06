import { Effect, Schema } from 'effect';
import { type Document, type HtmlBuilder } from '../../html/index.vibe';
import { FOLDKIT_APP_ATTRIBUTE, FOLDKIT_FLAGS_ATTRIBUTE } from '../../hydrationMarker.js';
import type { Return as UpdateReturn } from '../../update/index.js';
import { Url } from '../../url/index.vibe';
export { __assertNoDeclarativeShadowRoot, __assertNoDocumentStructureEscape, __assertNoLiveBaseElement, } from './serverChecks.js';
export { FOLDKIT_APP_ATTRIBUTE, FOLDKIT_FLAGS_ATTRIBUTE };
/** The server render of one request: the body markup and the `Document` head
 *  fields for the document renderer or a custom host's template. Hydratable output
 *  contains a stamped root and, when the application declares Flags, its
 *  payload script. Static output carries no handoff markers.
 *
 * @experimental Ships from `foldkit/experimental/server`; expect breaking changes while the API settles.
 */
export type RenderedApplication = Readonly<{
    html: string;
    title: string;
    lang?: string;
    dir?: 'ltr' | 'rtl' | 'auto';
    canonical?: string;
    ogUrl?: string;
}>;
declare const InvalidUrl_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "InvalidUrl";
} & Readonly<A>;
/** Failure of a routing render whose `url` option cannot be parsed.
 *
 * @experimental Ships from `foldkit/experimental/server`; expect breaking changes while the API settles.
 */
export declare class InvalidUrl extends InvalidUrl_base<{
    readonly url: string;
}> {
}
declare const FlagsEncodeError_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "FlagsEncodeError";
} & Readonly<A>;
/** Failure producing the Flags payload: the Schema encode step rejected the
 *  Flags value, the encoded value could not be serialized to JSON, or the
 *  encoded value could not be decoded back for the hydration-consistent
 *  render.
 *
 * @experimental Ships from `foldkit/experimental/server`; expect breaking changes while the API settles.
 */
export declare class FlagsEncodeError extends FlagsEncodeError_base<{
    readonly cause: unknown;
}> {
}
declare const SerializationError_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "SerializationError";
} & Readonly<A>;
/** Failure serializing the view-produced vnode tree to safe HTML.
 *
 * @experimental Ships from `foldkit/experimental/server`; expect breaking changes while the API settles.
 */
export declare class SerializationError extends SerializationError_base<{
    readonly cause: unknown;
}> {
}
declare const InvalidRuntimeId_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "InvalidRuntimeId";
} & Readonly<A>;
/** Failure of a render whose `runtimeId` is empty.
 *
 * @experimental Ships from `foldkit/experimental/server`; expect breaking changes while the API settles.
 */
export declare class InvalidRuntimeId extends InvalidRuntimeId_base<{
    readonly runtimeId: string;
}> {
}
declare const InvalidHydrationRoot_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "InvalidHydrationRoot";
} & Readonly<A>;
/** Failure of a hydratable render whose view did not return an element root.
 * Text, comments, and an empty body cannot carry the hydration marker the
 * client runtime uses to adopt the server-rendered DOM.
 *
 * @experimental Ships from `foldkit/experimental/server`; expect breaking changes while the API settles.
 */
export declare class InvalidHydrationRoot extends InvalidHydrationRoot_base<{
    readonly rootKind: 'Empty' | 'Text' | 'Comment';
}> {
}
declare const MissingBuildId_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "MissingBuildId";
} & Readonly<A>;
/** Failure of a hydratable render that has no build id. Hydration
 * compares the id on the served root with the client's own to refuse a page
 * from another deployment, so a render that carries none has no such
 * protection. Build both artifacts together with `@foldkit/vite-plugin`, or
 * supply the same nonempty `buildId` explicitly when client and server builds
 * are orchestrated separately. A render that nothing will hydrate
 * (`isHydratable: false`) needs none.
 *
 * @experimental Ships from `foldkit/experimental/server`; expect breaking changes while the API settles.
 */
export declare class MissingBuildId extends MissingBuildId_base<{}> {
}
/** Union of the failures {@link renderToString} can produce.
 *
 * @experimental Ships from `foldkit/experimental/server`; expect breaking changes while the API settles.
 */
export type RenderError = MissingBuildId | InvalidUrl | FlagsEncodeError | SerializationError | InvalidRuntimeId | InvalidHydrationRoot;
type InitReturn<Model, Message> = UpdateReturn<Model, Message, any>;
/** Server-side subset of a routing `makeApplication` config with Flags. The
 *  full application config is structurally assignable; `container`, `update`,
 *  and `subscriptions` play no part in a server render.
 *
 * @experimental Ships from `foldkit/experimental/server`; expect breaking changes while the API settles.
 */
export type RoutingApplicationConfigWithFlags<Model, Message, Flags> = Readonly<{
    Flags: Schema.Codec<Flags, any, never, never>;
    routing: unknown;
    init: (flags: Flags, url: Url) => InitReturn<Model, Message>;
    view: (model: Model, h: HtmlBuilder<Message>) => Document;
}>;
/** Server-side subset of a routing `makeApplication` config without Flags.
 *
 * @experimental Ships from `foldkit/experimental/server`; expect breaking changes while the API settles.
 */
export type RoutingApplicationConfig<Model, Message> = Readonly<{
    routing: unknown;
    init: (url: Url) => InitReturn<Model, Message>;
    view: (model: Model, h: HtmlBuilder<Message>) => Document;
}>;
/** Server-side subset of a non-routing `makeApplication` config with Flags.
 *
 * @experimental Ships from `foldkit/experimental/server`; expect breaking changes while the API settles.
 */
export type ApplicationConfigWithFlags<Model, Message, Flags> = Readonly<{
    Flags: Schema.Codec<Flags, any, never, never>;
    init: (flags: Flags) => InitReturn<Model, Message>;
    view: (model: Model, h: HtmlBuilder<Message>) => Document;
}>;
/** Server-side subset of a non-routing `makeApplication` config.
 *
 * @experimental Ships from `foldkit/experimental/server`; expect breaking changes while the API settles.
 */
export type ApplicationConfig<Model, Message> = Readonly<{
    init: () => InitReturn<Model, Message>;
    view: (model: Model, h: HtmlBuilder<Message>) => Document;
}>;
type CommonRenderOptions = Readonly<{
    runtimeId?: string;
}>;
/** Render options for output a client will hydrate, which is the default.
 *  Hydration compares the render's build id against the client's own before
 *  adopting any DOM, and a page carrying none has no such protection.
 *
 * @experimental Ships from `foldkit/experimental/server`; expect breaking changes while the API settles.
 */
export type HydratableRenderOptions = CommonRenderOptions & Readonly<{
    isHydratable?: true;
    /**
     * The deployment this render belongs to, stamped on the root so hydration
     * can refuse a page from a different one before adopting its DOM. Foldkit
     * normally reads the identity compiled into the server artifact by
     * `@foldkit/vite-plugin`. This explicit option is for integrations that
     * cannot compile the shared identity into the artifact. Give the client
     * the same public value.
     */
    buildId?: string;
}>;
/** Render options for static markup nothing will hydrate. No build id applies,
 *  because no client will compare one.
 *
 * @experimental Ships from `foldkit/experimental/server`; expect breaking changes while the API settles.
 */
export type StaticRenderOptions = CommonRenderOptions & Readonly<{
    isHydratable: false;
    buildId?: undefined;
}>;
/** Options for {@link renderToString}. `runtimeId` names the application in the
 *  root stamp and Flags payload; it defaults to `'app'` and must be non-empty.
 *  A nondefault `runtimeId` changes the root stamp and the keys used for Flags,
 *  Model, and scroll preservation. It does not permit a second hydratable
 *  application in one document.
 *
 *  A hydratable render (the default) uses the build identity compiled by
 *  `@foldkit/vite-plugin`. Pass `isHydratable: false` for static markup that
 *  nothing will hydrate, which takes no build id. The explicit `buildId`
 *  option supports integrations that cannot compile the shared identity into
 *  their artifacts.
 *
 * @experimental Ships from `foldkit/experimental/server`; expect breaking changes while the API settles.
 */
export type RenderOptions = HydratableRenderOptions | StaticRenderOptions;
/** Render options for a routing application, adding the request URL.
 *
 * @experimental Ships from `foldkit/experimental/server`; expect breaking changes while the API settles.
 */
export type RenderUrlOptions = RenderOptions & Readonly<{
    url: string;
}>;
/** Render options for a Flags application, adding the per-request Flags.
 *
 * @experimental Ships from `foldkit/experimental/server`; expect breaking changes while the API settles.
 */
export type RenderFlagsOptions<Flags> = RenderOptions & Readonly<{
    flags: Flags;
}>;
/** Render options for a routing Flags application: the request URL plus the
 *  per-request Flags.
 *
 * @experimental Ships from `foldkit/experimental/server`; expect breaking changes while the API settles.
 */
export type RenderUrlFlagsOptions<Flags> = RenderUrlOptions & RenderFlagsOptions<Flags>;
/**
 * Renders a `makeApplication`-shaped config to an HTML string on the server.
 *
 * Resolves `init` for the request (with the given Flags and URL when the
 * config declares them), runs the pure `view` under a no-op dispatch frame,
 * and serializes the resulting `Document` body. For hydratable output, the
 * root element is stamped with {@link FOLDKIT_APP_ATTRIBUTE} and, when the
 * config declares `Flags`, the Schema-encoded Flags ride along in a JSON script
 * tag so a hydrating client boots from the same Model.
 *
 * Commands returned by `init` are not run: the rendered HTML is the
 * post-`init` state, and the client runs those Commands after hydration.
 *
 * A hydratable Flags render calls `init` with the encode-then-decode round
 * trip of the given Flags, the exact value the hydrating client will
 * reconstruct, so the served DOM and the client's first render agree by
 * construction even for codecs whose round trip is not the identity.
 *
 * Canonical metadata has no request URL default. The result includes
 * `canonical` only when the view supplies it. It includes `ogUrl` when the view
 * supplies it, or uses an explicit canonical when `ogUrl` is omitted. When a
 * field is absent from the result, `injectIntoTemplate` leaves the
 * corresponding tag in the template unchanged.
 *
 * Derive the canonical URL from the typed route in the Model. `Request.url`
 * gives routing applications the request to parse, but only the application
 * knows which route and query values identify the page.
 *
 * @example
 * ```typescript
 * const renderedApplication = yield* Server.renderToString(config, {
 *   url: request.url,
 *   flags: { theme },
 * })
 * ```
 *
 * @experimental Ships from `foldkit/experimental/server`; expect breaking changes while the API settles.
 */
export declare function renderToString<Model, Message, Flags>(config: RoutingApplicationConfigWithFlags<Model, Message, Flags>, options: RenderUrlFlagsOptions<Flags>): Effect.Effect<RenderedApplication, RenderError>;
export declare function renderToString<Model, Message>(config: RoutingApplicationConfig<Model, Message>, options: RenderUrlOptions): Effect.Effect<RenderedApplication, RenderError>;
export declare function renderToString<Model, Message, Flags>(config: ApplicationConfigWithFlags<Model, Message, Flags>, options: RenderFlagsOptions<Flags>): Effect.Effect<RenderedApplication, RenderError>;
export declare function renderToString<Model, Message>(config: ApplicationConfig<Model, Message>, options?: RenderOptions): Effect.Effect<RenderedApplication, RenderError>;
