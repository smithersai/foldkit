import vibelang from 'vibelang-vite'
import { defineConfig } from 'vitest/config'

import { foldkitAliases } from '../../examples/vite.aliases'

export default defineConfig({
  plugins: [vibelang()],
  resolve: {
    alias: foldkitAliases(__dirname),
  },
  test: {
    environment: 'happy-dom',
    pool: 'forks',
    maxWorkers: 1,
    isolate: false,
  },
})
