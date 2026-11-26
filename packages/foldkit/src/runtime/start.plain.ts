// NOTE: synchronous VibeLang code never throws (Will, 2026-10-31). `embed`
// rejects a misuse by throwing to the host, so the throw lives here, outside
// VibeLang, and start.vibe calls it.

/** Rejects an `embed` call the host made wrongly. */
export function failEmbed(message: string): never {
  throw new Error(message)
}
