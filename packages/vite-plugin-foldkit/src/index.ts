import { Array, ConfigProvider, Effect, Fiber, Layer, Queue } from 'effect'
import { ExperimentalNodeProcess } from 'vibelang-runtime/experimental/platform-node'
import type {
  EnvironmentOptions,
  Plugin,
  ResolvedConfig,
  ViteDevServer,
} from 'vite'

import * as NodeChildProcessSpawner from '@effect/platform-node/NodeChildProcessSpawner'
import * as NodeCrypto from '@effect/platform-node/NodeCrypto'
import * as NodeFileSystem from '@effect/platform-node/NodeFileSystem'
import * as NodePath from '@effect/platform-node/NodePath'

import type { FoldkitBuildOptions } from './build.vibe'
import { foldkitBuild } from './buildPlugin.js'
import { foldkitBuildToken } from './buildToken.js'
import type { FoldkitSsrOptions } from './ssr.vibe'
import { foldkitSsr } from './ssrPlugin.js'
import { foldkitViewIdentity } from './viewIdentity.js'

import { Event, main } from '#vibelang/emitted/src/devServer'
import { devToolsOverlayPlugin } from '#vibelang/emitted/src/devToolsOverlay'
import { crawlFoldkitPackages } from '#vibelang/emitted/src/foldkitPackages'

export { type BrandDistResult, brandDistDirectory } from './brandDist.js'
export type {
  FoldkitBuildApi,
  FoldkitBuildOptions,
  FoldkitPrerenderOptions,
} from './build.vibe'
export {
  FOLDKIT_FETCH_MODULE_ID,
  FoldkitBuildManifest,
  FoldkitBuildMetadata,
  foldkitBuild,
} from './buildPlugin.js'
export type { FoldkitSsrOptions } from './ssr.vibe'
export { foldkitSsr } from './ssrPlugin.js'
export {
  type ViewIdentityTransformResult,
  foldkitViewIdentity,
  transformViewIdentity,
} from './viewIdentity.js'

// This entry stays TypeScript: `foldkit` is a plain public function that
// throws on a misconfiguration (Will, 2026-10-31), the fixture Vite configs
// bundle this file with esbuild (foldkit-98), and scripts/check-effect-prebundle
// reads FORCE_INCLUDED_EFFECT_ENTRIES from this file's source text. The dev
// server program it starts is VibeLang in devServer.vibe.

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
  devToolsMcpPort?: number | false
  /**
   * Serve server-rendered pages from the Vite dev server, and, with
   * `ssr.build`, emit a Web `fetch` handler as the server bundle. When
   * set, `vite` passes HTML navigations that fall through Vite, plus
   * non-GET requests, to `renderPage` from the module at
   * `ssr.serverEntry`. When `undefined` (the default), the dev server
   * serves the client entry only.
   */
  ssr?: Omit<
    FoldkitSsrOptions,
    'buildId' | 'quietStandDown' | 'clientEntry' | 'containerId'
  > &
    (
      | Readonly<{
          /** Root-relative browser script for the server entry's code-rendered document. */
          clientEntry: string
          containerId?: never
          /**
           * Build a Web `fetch` handler alongside the browser build, and generate
           * static HTML from the server entry, inside this project's own
           * `vite build`. The handler is the server bundle: Node and Workers
           * both run it. `true` builds it with the default output directories
           * and generates nothing.
           *
           * When this is absent, `vite build` builds the browser bundle only.
           */
          build?: boolean | Omit<FoldkitBuildOptions, 'clientEntry'>
        }>
      | Readonly<{
          /** Use a custom template-based development and build pipeline. */
          clientEntry?: never
          containerId?: string
          build?: false
        }>
    )
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
  buildId?: string
}>

// NOTE: Vite does not scan imports through `foldkit` because the plugin
// excludes the package from optimization in every environment. A consumer can
// import only Effect subpaths while Foldkit's compiled distribution imports the
// bare barrel, so include both the barrel and every top-level namespace Foldkit
// imports. This keeps them in one optimized dependency graph. Over-inclusion is
// harmless; under-inclusion is the bug. `scripts/check-effect-prebundle.ts`
// keeps the entries in sync with Foldkit's source and runs in `pnpm check`.
const FORCE_INCLUDED_EFFECT_ENTRIES: ReadonlyArray<string> = [
  'effect',
  'effect/Array',
  'effect/Boolean',
  'effect/Cause',
  'effect/Clock',
  'effect/Console',
  'effect/Context',
  'effect/Data',
  'effect/DateTime',
  'effect/Duration',
  'effect/Effect',
  'effect/Equal',
  'effect/Equivalence',
  'effect/Exit',
  'effect/Fiber',
  'effect/Function',
  'effect/Hash',
  'effect/HashMap',
  'effect/HashSet',
  'effect/Layer',
  'effect/Logger',
  'effect/Match',
  'effect/Number',
  'effect/Option',
  'effect/Order',
  'effect/Predicate',
  'effect/PubSub',
  'effect/Queue',
  'effect/Record',
  'effect/Redacted',
  'effect/Ref',
  'effect/Result',
  'effect/Runtime',
  'effect/Scheduler',
  'effect/Schema',
  'effect/SchemaAST',
  'effect/SchemaIssue',
  'effect/SchemaTransformation',
  'effect/Scope',
  'effect/Stream',
  'effect/String',
  'effect/Struct',
  'effect/SubscriptionRef',
  'effect/Types',
  'effect/http/FetchHttpClient',
  'effect/http/HttpClient',
]

// NOTE: Adding includes to an environment whose optimizer is otherwise disabled
// turns on Vite's explicit optimizer, which would pre-bundle Effect in Vite's
// default Node `ssr` environment.
const shouldForceEffectEntries = (
  name: string,
  config: EnvironmentOptions,
): boolean => {
  const consumer = config.consumer ?? (name === 'client' ? 'client' : 'server')
  const isClientEnvironment = consumer === 'client'
  const isDiscoveryEnabled = config.optimizeDeps?.noDiscovery === false
  const isExplicitOptimizationEnabled = Array.isArrayNonEmpty(
    config.optimizeDeps?.include ?? [],
  )

  return (
    isClientEnvironment || isDiscoveryEnabled || isExplicitOptimizationEnabled
  )
}

// PLUGIN ENTRY

/**
 * Foldkit's Vite plugin set: the view-identity branding transform and
 * DevTools overlay injection (dev and build), plus Model preservation across
 * reloads and the optional DevTools MCP relay (dev only). Returned as
 * an array; Vite flattens nested plugin arrays, so `plugins: [foldkit()]`
 * keeps working.
 */
const relayRegistryLayer = Layer.provideMerge(
  NodeChildProcessSpawner.layer,
  Layer.mergeAll(
    NodeFileSystem.layer,
    NodePath.layer,
    NodeCrypto.layerSecureRandom,
    ExperimentalNodeProcess.layer,
  ),
)

type MainRun = Readonly<{
  events: Queue.Queue<Event>
  fiber: Fiber.Fiber<void, never>
}>

export const foldkit = (options: FoldkitPluginOptions = {}): Array<Plugin> => {
  // NOTE: During a Vite restart, old and new servers overlap. Separate queues
  // and fibers keep their events and shutdowns attached to the right server.
  const mainRuns = new WeakMap<ResolvedConfig, MainRun>()

  const stopMain = (config: ResolvedConfig) =>
    Effect.suspend(() => {
      const run = mainRuns.get(config)
      mainRuns.delete(config)
      if (run === undefined) {
        return Effect.void
      } else {
        return Fiber.interrupt(run.fiber)
      }
    })

  const reloadPlugin: Plugin = {
    name: 'foldkit',
    apply: 'serve',
    // NOTE: The `post` order runs this hook after every default-order
    // `configEnvironment` hook, so the predicate sees discovery or includes
    // that another plugin turns on there.
    configEnvironment: {
      order: 'post',
      handler: (name, config) =>
        shouldForceEffectEntries(name, config)
          ? { optimizeDeps: { include: [...FORCE_INCLUDED_EFFECT_ENTRIES] } }
          : undefined,
    },
    configureServer: server => {
      const events = Effect.runSync(Queue.unbounded<Event>())
      // NOTE: The default ConfigProvider snapshots the environment. Create a
      // fresh one so a restarted server sees current values.
      const fiber = Effect.runFork(
        Effect.scoped(main(server, events, options)).pipe(
          Effect.provide(relayRegistryLayer),
          Effect.provideService(
            ConfigProvider.ConfigProvider,
            ConfigProvider.fromEnv(),
          ),
        ),
      )
      mainRuns.set(server.config, { events, fiber })
    },
    // NOTE: Middleware mode has no HTTP server to close. Vite still calls
    // `closeBundle`, so relay cleanup belongs here.
    closeBundle() {
      return Effect.runPromise(stopMain(this.environment.getTopLevelConfig()))
    },
    handleHotUpdate: ({
      server,
      modules,
    }: {
      server: ViteDevServer
      modules: ReadonlyArray<unknown>
    }) => {
      if (modules.length === 0) {
        return
      }
      server.ws.send({ type: 'full-reload' })
      const run = mainRuns.get(server.config)
      if (run !== undefined) {
        Queue.offerUnsafe(run.events, Event.HotUpdateFired())
      }
      return []
    },
  }

  const resolutionPlugin: Plugin = {
    name: 'foldkit:resolution',
    config: async (userConfig, { command }) => {
      const foldkitPackages = await crawlFoldkitPackages(
        userConfig.root ?? process.cwd(),
        command === 'build',
        userConfig,
      )

      return {
        resolve: {
          dedupe: foldkitPackages.dedupe,
          noExternal: foldkitPackages.noExternal,
        },
        ssr: {
          noExternal: foldkitPackages.noExternal,
        },
        environments: {
          ssr: {
            resolve: {
              noExternal: foldkitPackages.noExternal,
            },
          },
        },
      }
    },
    configEnvironment: () => ({
      optimizeDeps: {
        exclude: ['foldkit'],
      },
    }),
  }

  const shared = [
    resolutionPlugin,
    ...foldkitBuildToken(options.buildId),
    foldkitViewIdentity(),
    devToolsOverlayPlugin(),
    reloadPlugin,
  ]

  if (options.ssr === undefined) {
    return shared
  }

  const { build, ...ssr } = options.ssr
  if (ssr.clientEntry !== undefined && ssr.containerId !== undefined) {
    throw new Error(
      '[foldkit] containerId belongs to an HTML template. A clientEntry build takes its complete document from renderDocument instead.',
    )
  }
  const servePages = foldkitSsr({
    ...ssr,
    ...(options.buildId === undefined ? {} : { buildId: options.buildId }),
    quietStandDown: build !== undefined && build !== false,
  })

  if (build === undefined || build === false) {
    return [...shared, servePages]
  }

  if (ssr.clientEntry === undefined) {
    throw new Error(
      '[foldkit] ssr.build requires ssr.clientEntry to name the browser script and the server entry to export renderDocument.',
    )
  }

  return [
    ...shared,
    servePages,
    foldkitBuild(ssr.serverEntry, {
      ...(build === true ? {} : build),
      clientEntry: ssr.clientEntry,
    }),
  ]
}
