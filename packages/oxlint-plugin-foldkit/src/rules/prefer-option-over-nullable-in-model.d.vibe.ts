/**
 * Flags null, undefined, and optional field encodings inside the Model schema,
 * where absence must be modeled with Schema.Option. The rule is gated to a
 * const Model = Schema.Struct({...}) binding so wire and API schemas that
 * legitimately use null are left alone.
 */
export declare const preferOptionOverNullableInModel: import("effect-oxlint").CreateRule;
