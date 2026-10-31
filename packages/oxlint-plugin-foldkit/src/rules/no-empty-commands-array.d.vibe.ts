/** Flags only a `commands` property whose value is a literal empty array. A
 *  producer with statically no Commands omits the property; a producer with a
 *  computed Commands collection returns it directly. This syntax-only rule
 *  does not determine whether the enclosing object is an update result. */
export declare const noEmptyCommandsArray: import("effect-oxlint").CreateRule;
