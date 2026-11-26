import type { Plugin } from 'vite'

import { foldkitBuild } from './buildPlugin.ts'
import type { FoldkitPluginOptions } from './index.vibe'
import { foldkitSsr } from './ssrPlugin.ts'

// The SSR and build plugin selection of `foldkit`, which throws on a
// misconfiguration. A plain function that throws stays TypeScript (Will,
// 2026-10-31); the plugin assembly is VibeLang in index.vibe.
export const withSsrPlugins = (
  options: FoldkitPluginOptions,
  shared: Array<Plugin>,
): Array<Plugin> => {
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
