import { Data, Schema } from 'effect';
import type { DocumentRenderer } from 'foldkit/experimental/server';
import type { FOLDKIT_FETCH_MODULE_ID } from './buildPlugin.ts';
export { FOLDKIT_FETCH_MODULE_ID, foldkitBuild, manifestPath, renderTargetFor, } from './buildPlugin.ts';
/** How a build materializes the URLs a server entry can render. */
export type FoldkitPrerenderOptions = Readonly<{
    /**
     * The paths to generate. Defaults to the `prerenderPaths` the server entry
     * exports, so the application names its own static routes.
     */
    paths?: ReadonlyArray<string>;
    /**
     * The origin used for `Request.url` while generating, such as
     * `'https://app.example'`. This option does not set canonical or Open Graph
     * metadata. It affects those fields only when the server entry derives them
     * from `Request.url`, in which case it should match the published origin.
     */
    origin?: string;
}>;
/** How `vite build` builds a server entry and what it generates from it. */
export type FoldkitBuildOptions = Readonly<{
    /** Root-relative browser script entry resolved by Vite, such as `'/src/entry.ts'`. Import stylesheets from this module. */
    clientEntry: string;
    /** Where the browser build is written. */
    clientOutDir?: string;
    /** Where the server build is written. */
    serverOutDir?: string;
    /**
     * Generate static HTML for a set of URLs after both builds. `true` takes the
     * paths from the entry's `prerenderPaths` export.
     */
    prerender?: boolean | FoldkitPrerenderOptions;
}>;
/** The `foldkit:build` plugin's public integration API. */
export type FoldkitBuildApi = Readonly<{
    /** Configured application source entry. */
    serverEntry: string;
    /** Virtual module used to bundle the fetch handler. */
    fetchModuleId: typeof FOLDKIT_FETCH_MODULE_ID;
    /**
     * Read after a successful `await builder.buildApp()`. Throws before Foldkit
     * finalizes or after another client or server build starts. Later plugin failures
     * still require callers to await the full build successfully.
     */
    getBuildMetadata: () => FoldkitBuildMetadata;
}>;
/**
 * What an `ssr.build` build produced, written beside the server bundle.
 *
 * An SSR host serves generated paths as files and sends requests without a
 * matching file to the server entry. A static-only SSG host serves the files
 * and leaves other paths as misses.
 */
export declare const FoldkitBuildManifest: Schema.Struct<{
    /**
     * The shape of this document. A consumer decodes before reading and refuses
     * a version it does not know, so a manifest written by a newer Foldkit is a
     * clear refusal rather than a field silently read as undefined.
     */
    readonly schemaVersion: Schema.Literals<readonly [1]>;
    /**
     * Where the browser build was written, as a POSIX path relative to the Vite
     * root. Relative and normalized so a manifest survives being moved with the
     * build it describes.
     */
    readonly client: Schema.String;
    /** Where the server build was written, on the same terms as {@link client}. */
    readonly server: Schema.String;
    /** The server build's entry file, relative to `server`. */
    readonly serverEntry: Schema.String;
    /** Every path this build generated a page for, in the order it generated. */
    readonly prerendered: Schema.$Array<Schema.String>;
}>;
/**
 * The decoded shape of `foldkit.build.json`.
 *
 * A deployment host decodes the manifest before using it. The Schema rejects
 * unknown versions rather than letting the host read missing fields.
 */
export type FoldkitBuildManifest = typeof FoldkitBuildManifest.Type;
/** Completed application build data for an in-process deployment integration. */
export declare const FoldkitBuildMetadata: Schema.Struct<{
    /** Absolute resolved Vite application root. */
    readonly root: Schema.String;
    /** Absolute resolved browser output directory. */
    readonly clientDirectory: Schema.String;
    /** Absolute resolved server output directory. */
    readonly serverDirectory: Schema.String;
    /** Absolute path to the emitted fetch handler. */
    readonly serverEntry: Schema.String;
    /** Portable data also written to `foldkit.build.json`. */
    readonly manifest: Schema.Struct<{
        /**
         * The shape of this document. A consumer decodes before reading and refuses
         * a version it does not know, so a manifest written by a newer Foldkit is a
         * clear refusal rather than a field silently read as undefined.
         */
        readonly schemaVersion: Schema.Literals<readonly [1]>;
        /**
         * Where the browser build was written, as a POSIX path relative to the Vite
         * root. Relative and normalized so a manifest survives being moved with the
         * build it describes.
         */
        readonly client: Schema.String;
        /** Where the server build was written, on the same terms as {@link client}. */
        readonly server: Schema.String;
        /** The server build's entry file, relative to `server`. */
        readonly serverEntry: Schema.String;
        /** Every path this build generated a page for, in the order it generated. */
        readonly prerendered: Schema.$Array<Schema.String>;
    }>;
}>;
/** The serializable, frozen snapshot of a completed Foldkit build. */
export type FoldkitBuildMetadata = typeof FoldkitBuildMetadata.Type;
/** A validated manifest from its fields. */
export declare const makeBuildManifest: (fields: FoldkitBuildManifest) => FoldkitBuildManifest;
/** The manifest as the pretty-printed JSON document the build writes. */
export declare const encodeBuildManifest: (manifest: FoldkitBuildManifest) => string;
/** Validated build metadata from its fields. */
export declare const makeBuildMetadata: (fields: FoldkitBuildMetadata) => FoldkitBuildMetadata;
/** Whether a server entry export is a `renderDocument` function. */
export declare const isDocumentRenderer: (value: unknown) => value is DocumentRenderer;
/** The module ids a Rolldown `input` option names, in either of its shapes. */
export declare const configuredInputs: (input: string | ReadonlyArray<string> | Readonly<Record<string, string>> | undefined) => ReadonlyArray<string>;
/** What a `renderBuiltUrl` result says about a document asset's URL. */
export type BuiltUrl = Data.TaggedEnum<{
    /** No override: the asset is served from the configured `base`. */
    FromBase: {};
    /** An absolute or root-relative URL, usable as written. */
    Usable: {
        url: string;
    };
    /** A URL that is neither absolute nor root-relative. */
    NotAbsolute: {
        url: string;
    };
    /** A runtime or relative result, which a static document cannot carry. */
    Dynamic: {};
}>;
/** What a `renderBuiltUrl` result says about a document asset's URL. */
export declare const BuiltUrl: Data.TaggedEnum.Constructor<{
    readonly _tag: "Dynamic";
} | {
    readonly _tag: "FromBase";
} | {
    readonly _tag: "NotAbsolute";
    readonly url: string;
} | {
    readonly _tag: "Usable";
    readonly url: string;
}>;
/** Classifies a `renderBuiltUrl` result for a document asset. */
export declare const classifyBuiltUrl: (builtUrl: string | Readonly<{
    relative?: boolean | undefined;
    runtime?: string | undefined;
}> | undefined) => BuiltUrl;
