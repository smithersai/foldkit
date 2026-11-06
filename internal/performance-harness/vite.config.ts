import vibelang from 'vibelang-vite'
import { defineConfig } from 'vite'

import { foldkit } from '@foldkit/vite-plugin'
import tailwindcss from '@tailwindcss/vite'

import { foldkitAliases } from '../../examples/vite.aliases'

export default defineConfig({
  plugins: [
    vibelang({ register: true }),
    tailwindcss(),
    foldkit({ devToolsMcpPort: 9988 }),
  ],
  resolve: {
    alias: foldkitAliases(__dirname),
  },
  server: {
    fs: {
      allow: ['../../'],
    },
  },
})
