import { Effect, Option, Schema } from 'effect';
/** Whether a boot adopts a server-rendered root (`Hydrate`) or builds the DOM
 *  fresh in the container (`Fresh`). */
export type BootMode = 'Fresh' | 'Hydrate';
export type HydrationConfig = Readonly<{
    root: HTMLElement;
    runtimeId: string;
    flagsScripts: ReadonlyArray<HTMLScriptElement>;
    isFlagsRequired: boolean;
}>;
export declare const buildSkew: (root: HTMLElement, buildId: unknown, runtimeId: string) => Error | undefined;
export declare const containRefusedPage: (ownerDocument: Document) => void;
export declare const hasServerRenderedMarkup: (ownerDocument: Document) => boolean;
export declare const findDocumentHydration: (container: HTMLElement | null, isFlagsRequired: boolean) => HydrationConfig | undefined;
/** What the boot takes from the handoff: the server-rendered root the first
 *  render adopts, when this boot adopts one, and the Effect that produces the
 *  Flags `init` runs with, from the page's payload or from the app's own
 *  Flags Effect. */
export type ResolvedHydrationHandoff<Flags> = Readonly<{
    maybeHydrationRoot: Option.Option<HTMLElement>;
    resolveFlags: Effect.Effect<Flags>;
}>;
/**
 * Decides whether this boot adopts the server-rendered root and where its
 * Flags come from. A hydrating boot with no stamped root, a root served by
 * another deployment, or a missing, duplicated, or undecodable Flags
 * payload contains the served page and stops startup. The build id is
 * compared before the payload text is read and before `init` runs, so
 * nothing acts on another deployment's data. A Model restored after a
 * development reload skips adoption and gets a fresh patch against the
 * stamped root.
 */
export declare const resolveHydrationHandoff: <Flags, Resources>({ bootMode, hydration, bootFlags, configuredFlags, isFlagsRequired, FlagsCodec, preservedModel, container, buildId, provideResources, }: Readonly<{
    bootMode: BootMode;
    hydration: HydrationConfig | undefined;
    bootFlags: Effect.Effect<Flags, never, Resources> | undefined;
    configuredFlags: Option.Option<Effect.Effect<Flags, never, Resources>>;
    isFlagsRequired: boolean;
    FlagsCodec: Schema.Codec<Flags, any, unknown, unknown>;
    preservedModel: unknown;
    container: HTMLElement;
    buildId: string | undefined;
    provideResources: <A>(effect: Effect.Effect<A, never, Resources>) => Effect.Effect<A>;
}>) => Effect.Effect<ResolvedHydrationHandoff<Flags>>;
