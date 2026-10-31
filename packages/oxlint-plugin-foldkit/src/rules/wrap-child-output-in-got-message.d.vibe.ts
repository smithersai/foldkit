/**
 * Requires inline Command mappers and Subscription.lift toParentMessage
 * mappers to wrap child Submodel output in a Got*Message constructor.
 *
 * NOTE: only inline arrow mappers are analyzed. A mapper extracted to a named
 * helper is out of scope and passes, so this catches the common inline mistake
 * rather than every possible one.
 */
export declare const wrapChildOutputInGotMessage: import("effect-oxlint").CreateRule;
