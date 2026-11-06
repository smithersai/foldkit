import type { Plugin } from 'vite';
import type { FoldkitBuildOptions } from './build.vibe';
import type { FoldkitSsrOptions } from './ssr.vibe';
export { type BrandDistResult, brandDistDirectory } from './brandDist.ts';
export type { FoldkitBuildApi, FoldkitBuildOptions, FoldkitPrerenderOptions, } from './build.vibe';
export { FOLDKIT_FETCH_MODULE_ID, foldkitBuild } from './buildPlugin.ts';
export { FoldkitBuildManifest, FoldkitBuildMetadata } from './build.vibe';
export type { FoldkitSsrOptions } from './ssr.vibe';
export { foldkitSsr } from './ssrPlugin.ts';
export { type ViewIdentityTransformResult, foldkitViewIdentity, transformViewIdentity, } from './viewIdentity.ts';
/** Options for the `foldkit` Vite plugin. */
export type FoldkitPluginOptions = Readonly<{
    /**
     * By default, the DevTools MCP relay listens on a loopback port of its own
     * and publishes its address for the MCP server to find. Automatically
     * discovered addresses carry an access token.
     *
     * A number starts an unauthenticated listener on that port on every
     * interface; set `FOLDKIT_DEVTOOLS_MCP_PORT` in the MCP server to match.
     * Do not use a fixed port on a shared or untrusted network. `false`
     * disables the relay. Vitest never starts it.
     */
    devToolsMcpPort?: number | false;
    /**
     * Serve server-rendered pages from the Vite dev server, and, with
     * `ssr.build`, emit a Web `fetch` handler as the server bundle. When
     * set, `vite` passes HTML navigations that fall through Vite, plus
     * non-GET requests, to `renderPage` from the module at
     * `ssr.serverEntry`. When `undefined` (the default), the dev server
     * serves the client entry only.
     */
    ssr?: Omit<FoldkitSsrOptions, 'buildId' | 'quietStandDown' | 'clientEntry' | 'containerId'> & (Readonly<{
        /** Root-relative browser script for the server entry's code-rendered document. */
        clientEntry: string;
        containerId?: never;
        /**
         * Build a Web `fetch` handler alongside the browser build, and generate
         * static HTML from the server entry, inside this project's own
         * `vite build`. The handler is the server bundle: Node and Workers
         * both run it. `true` builds it with the default output directories
         * and generates nothing.
         *
         * When this is absent, `vite build` builds the browser bundle only.
         */
        build?: boolean | Omit<FoldkitBuildOptions, 'clientEntry'>;
    }> | Readonly<{
        /** Use a custom template-based development and build pipeline. */
        clientEntry?: never;
        containerId?: string;
        build?: false;
    }>);
    /**
     * An explicit identity for the deployment this build belongs to. Foldkit
     * normally generates an opaque identity when one Vite app build coordinates
     * the client and server artifacts, then compiles it into the framework in
     * both. Hydration compares that value against the id the server stamped and
     * refuses a page from another deployment before adopting its DOM.
     *
     * Set this when the client and server are built separately, or when the id
     * should name a deployment in another system. The `FOLDKIT_BUILD_ID`
     * environment variable supplies the same override when this option is
     * absent. Give every artifact the same value. It is published in the page,
     * so it must not be a secret.
     *
     * Reusing an override across deployments makes stale pages appear current.
     * Use a value that changes whenever the deployment's rendering inputs can
     * change.
     */
    buildId?: string;
}>;
export declare const foldkit: (options?: FoldkitPluginOptions) => Array<Plugin>;
