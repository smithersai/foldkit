import vibelang from 'vibelang-vite'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [vibelang()],
  test: {
    environment: 'happy-dom',
    setupFiles: ['./src/vitest-setup.ts'],
    include: ['**/*.bench.test.ts'],
    server: {
      deps: {
        inline: ['foldkit'],
      },
    },
  },
})
