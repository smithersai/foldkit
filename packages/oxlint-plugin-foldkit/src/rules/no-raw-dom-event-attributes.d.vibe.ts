/**
 * Disallows constructing raw DOM event attributes (onclick, oninput, and the
 * rest) through the Attribute and Prop escape hatches. Events must flow
 * through the typed On* attribute constructors so every interaction
 * dispatches a Message through update.
 */
export declare const noRawDomEventAttributes: import("effect-oxlint").CreateRule;
