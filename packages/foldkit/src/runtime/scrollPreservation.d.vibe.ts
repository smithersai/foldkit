import { Effect, Option } from "effect";
/** The `sessionStorage` key a runtime uses for its preserved scroll offset,
 *  scoped by runtime id so multiple runtimes never read each other's value. */
export declare const preservedScrollStorageKey: (runtimeId: string) => string;
/** Captures the current window scroll offset under the runtime's key. Called
 *  from the `vite:beforeFullReload` handler so the offset is stored just
 *  before Vite reloads the page. */
export declare const preserveScrollPosition: (runtimeId: string) => void;
/** Reads and clears the preserved scroll offset for a runtime. Returns
 *  `Option.none()` when nothing was preserved or the stored value is malformed.
 *  The key is removed on every call, so a stale offset from an earlier reload
 *  is never reapplied. */
export declare const takePreservedScrollPosition: (runtimeId: string) => Option.Option<{
    readonly x: number;
    readonly y: number;
}>;
/** Reapplies the preserved scroll offset with an instant (non-smooth) jump,
 *  defeating any CSS `scroll-behavior: smooth`. A no-op when nothing was
 *  preserved. Consumes the stored offset, so a second call restores nothing. */
export declare const restorePreservedScrollPosition: (runtimeId: string) => Effect.Effect<void>;
