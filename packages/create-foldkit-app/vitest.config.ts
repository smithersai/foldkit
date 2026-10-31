import vibelang from 'vibelang-vite'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [vibelang()],
  test: {
    include: ['src/**/*.test.ts'],
    environment: 'node',
  },
})
