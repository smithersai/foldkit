// NOTE: synchronous VibeLang code never throws (Will, 2026-10-31). The schema
// factories reject an invalid definition by throwing, so the throws live
// here, outside VibeLang, and the factories in index.vibe call them.

/** Rejects an invalid union or variant definition. */
export function failSchemaDefinition(message: string): never {
  throw new Error(message)
}

/** Rejects a constructor operation that threw something other than a schema issue. */
export function failConstructorOperation(cause: unknown): never {
  throw new Error('Constructor adapter can only throw schema issues', {
    cause,
  })
}
