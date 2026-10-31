/**
 * Requires the acquire Effect of Effect.acquireRelease to construct its
 * resource in place. Flags an acquire that merely returns a pre-existing
 * identifier or uses eager Effect.succeed, which leaks the handle if
 * interruption strikes between construction and acquire.
 */
export declare const acquireReleaseConstructsInAcquireBody: import("effect-oxlint").CreateRule;
