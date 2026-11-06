/**
 * Requires attribute arrays containing Target('_blank') to also carry a Rel
 * attribute whose value includes noopener or noreferrer, protecting the
 * opener window from tabnabbing and referrer leaks.
 */
export declare const requireRelForExternalLink: import("effect-oxlint").CreateRule;
