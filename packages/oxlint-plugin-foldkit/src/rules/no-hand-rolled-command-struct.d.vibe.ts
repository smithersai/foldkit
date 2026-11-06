/**
 * Forbids object literals that rebuild the Command struct by hand, either
 * from scratch or by spreading an existing Command and overriding effect.
 */
export declare const noHandRolledCommandStruct: import("effect-oxlint").CreateRule;
