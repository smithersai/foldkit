import { Cause, Effect } from 'effect';
import type { Ports } from '../port/index.js';
import { type EmbedHandle } from './hostConnector.vibe';
import type { BootMode } from './hydrationHandoff.vibe';
import { type MakeRuntimeReturn } from './runtime.vibe';
/** Client-only startup input for an application that declares Flags. Pass it
 *  to `run` or `embed`; `hydrate` instead decodes the exact Flags value
 *  embedded by the server render.
 */
export type RunOptions<Flags, Resources = never> = Readonly<{
    flags: Effect.Effect<Flags, never, Resources>;
}>;
type RuntimeProgram = Readonly<{
    runtimeId: string;
    start: (preservedModel?: unknown) => Effect.Effect<void>;
    ports: Ports | undefined;
}>;
/** Starts a program Effect with explicit boot inputs for runtime tests.
 * @internal */
export declare const __startProgram: (program: RuntimeProgram, preservedModel: unknown, bootMode: BootMode, flags?: Effect.Effect<unknown, never, any>, buildId?: string) => Effect.Effect<void>;
/** Reports unhandled non-interrupt Causes using Effect's runtime policy.
 * @internal */
export declare const __reportUnhandledCause: <E>(cause: Cause.Cause<E>) => Effect.Effect<void>;
/** Starts a Foldkit runtime that owns the page for the page's whole lifetime,
 *  with state-preserving live reload for development. The first render builds
 *  the DOM fresh in the container, replacing whatever is there. On a
 *  server-rendered page use `hydrate` instead, which adopts the existing DOM.
 *  To start a runtime under a host-controlled lifecycle, use `embed`. */
export declare function run<P extends Ports | undefined, Resources, Kind extends 'Application' | 'Element'>(program: MakeRuntimeReturn<P, void, Resources, Kind>): void;
export declare function run<P extends Ports | undefined, Flags, Resources, Kind extends 'Application' | 'Element'>(program: MakeRuntimeReturn<P, Flags, Resources, Kind>, options: RunOptions<Flags, Resources>): void;
/** Options for {@link hydrate}. */
export type HydrateOptions = Readonly<{
    /**
     * The deployment this client belongs to, compared against the id the server
     * stamped on the root before the Flags payload text is accessed or decoded,
     * so a page from a different deployment stops startup rather than handing its
     * Flags to this build. When omitted, Foldkit uses the identity compiled into
     * this artifact by `@foldkit/vite-plugin`. An explicit id overrides that
     * value and must be non-empty: an absent id would equal the absent marker on
     * a page served before build ids existed.
     *
     * This explicit option is for integrations that cannot compile the shared
     * identity into the artifact. Give the server the same public,
     * deployment-specific value.
     */
    buildId?: string;
}>;
/** Starts a Foldkit runtime by adopting a server-rendered DOM in place instead
 *  of building it fresh. Use this as the client entry for a page served by
 *  `renderToString`: the first render attaches to the stamped root, keeps the
 *  existing nodes, and reconstructs the Model from the Flags the server
 *  embedded. The handoff is strict: a missing server root, an empty or
 *  duplicated root stamp, more than one stamped root, a requested root outside
 *  the document body light DOM, a missing Flags payload, an undecodable
 *  payload, or a page from another deployment terminates startup. Every one of
 *  those contains the page first:
 *  the document's body is marked `inert` and a nondismissable modal shield is
 *  opened above existing top-layer content, so pointer and physical keyboard
 *  input do not activate same-document native links, forms, or controls.
 *  Containment leaves author-owned dialogs open without calling `close` or
 *  dispatching `cancel`.
 *  Nothing is moved, so no custom element reconnects and no frame reloads.
 *  This is not a script, event, or embedded-document sandbox: existing
 *  capture-phase handlers, browser-generated top-layer events, timers, and
 *  stale scripts can still run. Controls in embedded documents can still
 *  receive input if stale code focuses them. Stale code can also open newer
 *  top-layer UI. Use `run` in a separate client-only entry when the page should
 *  boot without server output.
 *
 * @experimental Server rendering and hydration are experimental while their
 * contracts settle. */
export declare const hydrate: <P extends Ports | undefined, Flags, Resources>(program: MakeRuntimeReturn<P, Flags, Resources, 'Application'>, options?: HydrateOptions) => void;
/**
 * Starts a Foldkit runtime under a host-controlled lifecycle and returns an
 * `EmbedHandle`. This is the entry point for embedding a Foldkit app inside
 * another application: the host pushes values in through the handle's inbound
 * Ports, listens to outbound Ports, and calls `dispose` when it unmounts the
 * app. The host never touches the Model or dispatches Messages directly; the
 * Schema-typed Ports are the whole boundary.
 *
 * Works with programs from both `makeApplication` and `makeElement`; for a
 * widget on a page the host owns, `makeElement` is the natural fit.
 *
 * A program can be embedded once at a time (it owns one container). After
 * `dispose`, the same container can be embedded again with a fresh program.
 *
 * ```ts
 * const handle = Runtime.embed(element)
 *
 * handle.ports.stepChanged.send(5)
 * const unsubscribe = handle.ports.countChanged.subscribe(count => {
 *   console.log(count)
 * })
 *
 * handle.dispose()
 * ```
 */
export declare function embed<P extends Ports | undefined = undefined, Resources = never, Kind extends 'Application' | 'Element' = 'Application' | 'Element'>(program: MakeRuntimeReturn<P, void, Resources, Kind>): EmbedHandle<P>;
export declare function embed<P extends Ports | undefined, Flags, Resources, Kind extends 'Application' | 'Element'>(program: MakeRuntimeReturn<P, Flags, Resources, Kind>, options: RunOptions<Flags, Resources>): EmbedHandle<P>;
export {};
