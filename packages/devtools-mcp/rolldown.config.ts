import { fileURLToPath } from 'node:url'
import { defineConfig } from 'rolldown'
import vibelang from 'vibelang-unplugin/rolldown'

export default defineConfig({
  input: 'src/server.ts',
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
    file: 'dist/server.js',
    format: 'esm',
  },
})
