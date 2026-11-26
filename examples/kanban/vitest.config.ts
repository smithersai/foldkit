import vibelang from 'vibelang-vite'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [vibelang({ register: true })],
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
