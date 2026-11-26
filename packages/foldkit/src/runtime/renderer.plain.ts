// NOTE: synchronous VibeLang code never throws (Will, 2026-10-31). A failed
// patch is recovered from and then rethrown to the render frame, which
// crashes the runtime with it; the rethrow lives here, outside VibeLang.

/** Rethrows a patch failure after the VNode slot has been recovered. */
export function rethrow(error: unknown): never {
  throw error
}
