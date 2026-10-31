import vibelang from 'vibelang-vite'
import { defineConfig } from 'vitest/config'

import { markdown } from '@foldkit/markdown/vite'

import { islandAttributes } from './src/island/islandAttributes.vibe'

export default defineConfig({
  plugins: [vibelang(), markdown({ islands: islandAttributes })],
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
