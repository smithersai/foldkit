/**
 * Forbids Schema.withConstructorDefault on Route.query fields. Constructor
 * defaults run only during Schema construction, while Route.query decodes and
 * encodes, so the annotation has no effect on a missing query parameter.
 */
export declare const noRouteQueryConstructorDefault: import("effect-oxlint").CreateRule;
