/**
 * Forbids hardcoded route strings and route template literals as the first
 * argument of navigation calls. Routers are bidirectional, so URLs come from
 * calling the Router as a printer.
 */
export declare const noHardcodedRouteStrings: import("effect-oxlint").CreateRule;
