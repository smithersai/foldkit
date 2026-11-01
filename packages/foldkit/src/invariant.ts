// A programmer-error exception is plain TypeScript, not VibeLang (Will, 2026-10-31: an exception
// lives in a .ts file). Plain synchronous VibeLang code that must fail loudly on an invariant calls
// these instead of throwing, so the exception and its stack keep their original shape. They are
// function declarations so TypeScript narrows on their `never` return.

/** Throws an `Error` with `message`; its return type lets callers use it where a value is expected. */
export function invariant(message: string, options?: ErrorOptions): never {
  throw new Error(message, options)
}

/** Throws `error` as it is. */
export function raise(error: unknown): never {
  throw error
}
