/** Flags array literals carrying two or more top-level OnMount attributes. Foldkit installs a single insert hook and tracks a single Mount fiber per element, so a later OnMount silently replaces the earlier one. */
export declare const noDuplicateOnmountPerElement: import("effect-oxlint").CreateRule;
