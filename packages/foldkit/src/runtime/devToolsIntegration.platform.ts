// NOTE: raw platform access for devToolsIntegration.vibe: the
// development-only WebSocket bridge needs Vite's HMR context, which no Effect
// service covers yet, so the read stays here
// unchanged.

export const hot = import.meta.hot
