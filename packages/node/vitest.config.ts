import vibelang from 'vibelang-vite'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [vibelang({ register: true })],
  test: {
    include: ['test/**/*.test.ts'],
  },
})
