// NOTE: raw platform access for devToolsIntegration.vibe (VIP-33): the
// development-only WebSocket bridge needs Vite's HMR context, which no Effect
// service covers yet (foldkit-128, foldkit-129), so the read stays here
// unchanged.

export const hot = import.meta.hot
