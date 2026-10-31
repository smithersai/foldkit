/**
 * Disallows using a map callback's array index parameter as the key fed into
 * a keyed element, a Key attribute, a Submodel slotId, or a createKeyedLazy
 * slot call. Array positions shift when a list mutates, so view keys must
 * come from stable Model identifiers.
 */
export declare const noArrayIndexViewKeys: import("effect-oxlint").CreateRule;
