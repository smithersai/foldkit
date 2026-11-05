import { fileURLToPath } from 'node:url'
import { defineConfig } from 'rolldown'
import vibelang from 'vibelang-unplugin/rolldown'

export default defineConfig({
  input: 'src/server.vibe',
  platform: 'node',
  plugins: [vibelang()],
  external: ['bufferutil', 'utf-8-validate'],
  resolve: {
    alias: {
      'foldkit/devtools-protocol': fileURLToPath(
        new URL('../foldkit/src/devTools/public.ts', import.meta.url),
      ),
    },
  },
  output: {
    dir: 'dist',
    entryFileNames: 'server.js',
    format: 'esm',
  },
})
