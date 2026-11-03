export const rawByPath = import.meta.glob<string>(
  [
    '../snippet/*.{vibe,vibex,ts,tsx,elm,json,html,sh,txt}',
    '!../snippet/*.d.{vibe,vibex}.ts',
  ],
  {
    query: '?raw',
    import: 'default',
    eager: true,
  },
)

export const highlightedByPath = import.meta.glob<string>(
  [
    '../snippet/*.{vibe,vibex,ts,tsx,elm,json,html,sh,txt}',
    '!../snippet/*.d.{vibe,vibex}.ts',
  ],
  { query: '?highlighted', import: 'default', eager: true },
)
