import { defineConfig } from 'rolldown'
import vibelang from 'vibelang-unplugin/rolldown'

export default defineConfig({
  input: 'src/index.ts',
  platform: 'node',
  plugins: [vibelang()],
  output: {
    file: 'dist/index.js',
    format: 'esm',
  },
})
