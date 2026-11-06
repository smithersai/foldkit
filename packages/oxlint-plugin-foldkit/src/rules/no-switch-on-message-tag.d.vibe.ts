/**
 * Forbids `switch (x._tag)` in favor of the tagged union's match helper or
 * Effect Match, whose exhaustiveness check turns a forgotten Message or state
 * variant into a compile error instead of a silent runtime fall-through.
 */
export declare const noSwitchOnMessageTag: import("effect-oxlint").CreateRule;
