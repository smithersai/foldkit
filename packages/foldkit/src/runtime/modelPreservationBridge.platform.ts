// console.warn is platform code that a .vibe module does not use directly (VIP-33); the missing
// plugin warning is a one-off dev message, so the raw call lives here.

export const warnMissingVitePlugin = (): void => {
  console.warn(
    '[foldkit] No response from @foldkit/vite-plugin. Add it to your vite.config.ts for Model preservation across reloads:\n\n' +
      "  import { foldkit } from '@foldkit/vite-plugin'\n\n" +
      '  export default defineConfig({ plugins: [foldkit()] })\n\n' +
      'Starting without Model preservation.',
  )
}
