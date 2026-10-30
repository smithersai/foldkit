import vibelang from 'vibelang-vite'
import { defineConfig } from 'vitest/config'

import { foldkitAliases } from '../vite.aliases'

export default defineConfig({
  plugins: [vibelang()],
  resolve: {
    alias: foldkitAliases(__dirname),
  },
  test: {
    environment: 'happy-dom',
    setupFiles: ['./src/vitest-setup.ts'],
    server: {
      deps: {
        inline: ['foldkit', '@foldkit/ui', '@foldkit/devtools'],
      },
    },
  },
})
