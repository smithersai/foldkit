/** Flags builder calls that pass an inline empty array as children, both `h.div([...], [])` and `h.keyed(tag)(key, [...], [])`. The children argument is optional on both, so an element with no children should omit it rather than spell out `[]`. */
export declare const noEmptyChildrenArray: import("effect-oxlint").CreateRule;
