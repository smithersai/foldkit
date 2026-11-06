import type { Plugin } from 'vite';
/**
 * Determines whether the Vite integration should include the DevTools overlay.
 * Development serves it whenever the package is installed. Production builds
 * additionally require it in regular `dependencies`, which is the opt-in that
 * keeps a development dependency out of the shipped bundle.
 */
export declare const shouldInjectDevToolsOverlay: (command: 'serve' | 'build', root: string) => boolean;
/** Creates the Vite plugin that registers the appropriate DevTools overlay. */
export declare const devToolsOverlayPlugin: () => Plugin;
