import vibelang from 'vibelang-vite'
import { defineConfig } from 'vite'

import { markdown } from '@foldkit/markdown/vite'
import { foldkit } from '@foldkit/vite-plugin'
import tailwindcss from '@tailwindcss/vite'

import { foldkitAliases } from '../vite.aliases.ts'
import { islandAttributes } from './src/island/islandAttributes.ts'

export default defineConfig({
  plugins: [
    vibelang(),
    tailwindcss(),
    foldkit({ devToolsMcpPort: 9988 }),
    markdown({ islands: islandAttributes }),
  ],
  resolve: {
    alias: foldkitAliases(import.meta.dirname),
  },
  server: {
    fs: {
      allow: ['../../'],
    },
  },
})
