import type { Connect, DevEnvironment, Plugin, ViteDevServer } from 'vite'

import { buildIdForCommand } from './buildToken.ts'
import type { FoldkitSsrOptions } from './ssr.vibe'

import {
  type CorsResponseState,
  findViteCorsLayer,
  renderMiddleware,
  requestTargetMiddleware,
  wrapCorsHandle,
} from '#vibelang/emitted/src/ssr'

// The `foldkitSsr` plugin, whose hooks throw on a misconfiguration, and the
// CORS wrapper that throws on an incompatible Vite. A plain function that
// throws stays TypeScript (Will, 2026-10-31); the request handling itself is
// VibeLang in ssr.vibe and the page renderer in ssrRender.vibe.
// NOTE: Vite's `isRunnableDevEnvironment` is an `instanceof` check against the
// plugin's own copy of Vite, and the server may have been created by another
// copy, so it can call a runnable environment not runnable. The lazy `runner`
// getter is the shape every copy shares, and `in` reads its descriptor without
// invoking it.
const isRunnable = (environment: DevEnvironment): boolean =>
  'runner' in environment

const wrapViteCors = (
  server: ViteDevServer,
  options: FoldkitSsrOptions,
  requestUrls: WeakMap<Connect.IncomingMessage, string>,
  stateByRequest: WeakMap<Connect.IncomingMessage, CorsResponseState>,
): void => {
  if (server.config.server.cors === false) {
    return
  }
  const corsLayer = findViteCorsLayer(server)
  if (corsLayer === undefined) {
    throw new Error(
      '[foldkit] Could not find Vite\u2019s CORS middleware at the expected ' +
        'ownership boundary. This Vite version is not compatible with ' +
        '@foldkit/vite-plugin.',
    )
  }
  corsLayer.layer.handle = wrapCorsHandle(
    corsLayer.handle,
    server,
    options,
    requestUrls,
    stateByRequest,
  )
}

/**
 * Serves server-rendered pages from the Vite dev server.
 *
 * Vite retains ownership of configured proxies, source modules, HMR, and
 * assets. Requests that fall through load the server entry through Vite's SSR
 * module loader, call its `renderPage` with a Web `Request`, and send the
 * resulting Web `Response`. Vite's host validation applies before either
 * owner. Foldkit then validates and normalizes the request target before Vite
 * or the server entry can resolve it. Vite's CORS option applies only to
 * Vite-owned responses, while the server entry owns CORS for application
 * responses. Server entry edits take effect without a restart.
 */
export const foldkitSsr = (options: FoldkitSsrOptions): Plugin => {
  let isDevelopmentHost = false

  return {
    name: 'foldkit-ssr',
    configResolved(config) {
      if (!isDevelopmentHost || options.clientEntry === undefined) {
        return
      }

      if (
        !options.clientEntry.startsWith('/') ||
        options.clientEntry.startsWith('//') ||
        /\.html(?:[?#]|$)/.test(options.clientEntry)
      ) {
        throw new Error(
          '[foldkit] clientEntry must be a root-relative browser script URL, such as "/src/entry.ts".',
        )
      }

      if (options.containerId !== undefined) {
        throw new Error(
          '[foldkit] containerId is only used by the template-based dev host. A code-rendered document owns its application placement.',
        )
      }

      if (config.base === '' || config.base === './') {
        throw new Error(
          '[foldkit] code-rendered documents require an absolute URL or root-relative base so browser assets resolve consistently on nested routes.',
        )
      }
    },
    config: (config, { command, isPreview }) => {
      isDevelopmentHost = command === 'serve' && isPreview !== true

      if (
        isDevelopmentHost &&
        options.clientEntry !== undefined &&
        (config.base === '' || config.base === './')
      ) {
        throw new Error(
          '[foldkit] code-rendered documents require an absolute URL or root-relative base so browser assets resolve consistently on nested routes.',
        )
      }

      const buildId = buildIdForCommand(command, options.buildId)
      return {
        // NOTE: `vite preview` also resolves with command 'serve', but it
        // serves built output and never runs configureServer. Setting custom
        // there would strip preview's HTML middleware. A build still needs the
        // define below even though only a dev server needs this app type.
        ...(command === 'serve' && isPreview !== true
          ? { appType: 'custom' }
          : {}),
        ...(buildId === undefined
          ? {}
          : {
              define: {
                'import.meta.env.FOLDKIT_BUILD_ID': JSON.stringify(buildId),
              },
            }),
      }
    },
    configureServer: server => {
      // Rendering here loads the server entry through the `ssr` environment's
      // module runner, which only a runnable environment has. A host plugin
      // that backs that environment with its own runtime — workerd, under a
      // Workers plugin — leaves it non-runnable, and that host is already the
      // one serving pages: its entry imports `renderPage` and answers the
      // request itself. Standing down hands those requests to it. Rendering
      // them here instead would run the application in Node, without the
      // bindings the deployed entry holds, while the deployment it is standing
      // in for renders in workerd.
      if (!isRunnable(server.environments.ssr)) {
        if (options.quietStandDown !== true) {
          server.config.logger.warn(
            '[foldkit] the "ssr" environment is not runnable, so another plugin owns' +
              " server-side execution. Dev-time rendering through Foldkit's Vite" +
              ' middleware is off; page requests go to that host.',
          )
        }
        return
      }

      const requestUrls = new WeakMap<Connect.IncomingMessage, string>()
      const stateByRequest = new WeakMap<
        Connect.IncomingMessage,
        CorsResponseState
      >()
      const render = renderMiddleware(
        server,
        options,
        requestUrls,
        stateByRequest,
      )
      server.middlewares.use(
        requestTargetMiddleware(server, options, requestUrls, render),
      )
      wrapViteCors(server, options, requestUrls, stateByRequest)

      return () => {
        server.middlewares.use(render)
      }
    },
  }
}
