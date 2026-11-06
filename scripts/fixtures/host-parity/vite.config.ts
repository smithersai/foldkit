import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { type Plugin, defineConfig } from 'vite'

import { foldkitAliases } from '../../../examples/vite.aliases'

type FoldkitPluginModule =
  typeof import('../../../packages/vite-plugin-foldkit/src/index')

const EXAMPLE_DIR = process.cwd()
const REPO_ROOT = resolve(EXAMPLE_DIR, '../..')
const SERVER_ENTRY = resolve(
  REPO_ROOT,
  'scripts/fixtures/host-parity/entry.server.ts',
)
const PLUGIN_URL = pathToFileURL(
  resolve(EXAMPLE_DIR, 'node_modules/@foldkit/vite-plugin/dist/index.js'),
).href
// NOTE: foldkit's source includes .vibe modules, which only the VibeLang
// plugin compiles; it is loaded from the example like the Foldkit plugin.
const VIBELANG_PLUGIN_URL = pathToFileURL(
  resolve(EXAMPLE_DIR, 'node_modules/vibelang-vite/src/index.js'),
).href

export default defineConfig(async () => {
  const { foldkit }: FoldkitPluginModule = await import(PLUGIN_URL)
  const { default: vibelang }: { default: () => Plugin } = await import(
    VIBELANG_PLUGIN_URL
  )

  return {
    plugins: [
      vibelang(),
      foldkit({
        ssr: {
          serverEntry: `/@fs/${SERVER_ENTRY}`,
          clientEntry: '/src/entry.ts',
          build: true,
        },
      }),
    ],
    resolve: {
      alias: {
        '../src/entry.server': SERVER_ENTRY,
        ...foldkitAliases(EXAMPLE_DIR),
      },
    },
    server: {
      fs: {
        allow: [REPO_ROOT],
      },
    },
  }
})
