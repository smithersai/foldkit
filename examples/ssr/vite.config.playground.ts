import vibelang from 'vibelang-vite'
import { defineConfig } from 'vite'

import { foldkit } from '@foldkit/vite-plugin'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    vibelang(),
    tailwindcss(),
    foldkit({
      devToolsMcpPort: false,
      ssr: {
        serverEntry: '/src/entry.server.vibe',
        clientEntry: '/src/entry.ts',
        build: true,
      },
    }),
  ],
})
