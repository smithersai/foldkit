// NOTE: synchronous VibeLang code never throws (Will, 2026-10-31).
// `defineKeyedQuery` rejects a definition without keyed args by throwing, so
// the throw lives here, outside VibeLang, and keyedQuery.vibe calls it.

/** Rejects a KeyedQuery definition. */
export function failKeyedQueryDefinition(message: string): never {
  throw new Error(message)
}
