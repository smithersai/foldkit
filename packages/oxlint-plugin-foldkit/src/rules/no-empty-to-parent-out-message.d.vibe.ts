/**
 * Flags an inline `toParentOutMessage` mapper that directly returns
 * `undefined`, including the mapper returned by a keyed mapper factory. That
 * mapper forwards nothing to the parent, so the property should be omitted.
 * This syntax-only rule does not inspect async functions, generators, getters,
 * setters, or mappers referenced by name.
 */
export declare const noEmptyToParentOutMessage: import("effect-oxlint").CreateRule;
