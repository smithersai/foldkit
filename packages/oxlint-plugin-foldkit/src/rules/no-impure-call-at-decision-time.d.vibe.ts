/**
 * Flags direct calls to known nondeterministic globals unless they appear in a
 * recognized deferred Effect, Stream, Command, Mount, Subscription, or
 * ManagedResource callback.
 */
export declare const noImpureCallAtDecisionTime: import("effect-oxlint").CreateRule;
