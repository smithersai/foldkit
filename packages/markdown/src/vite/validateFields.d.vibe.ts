import { Effect, Option, Schema } from 'effect';
/**
 * A struct schema describing a flat record of string values, the shape shared
 * by island attribute definitions and frontmatter definitions.
 */
export type FieldsSchema = Schema.Struct<Schema.Struct.Fields> & Readonly<{
    DecodingServices: never;
    EncodingServices: never;
}>;
/**
 * What a field validation checks: the schema, the parsed string values, and
 * the caller's phrasing for the two failures.
 */
export type ValidateFieldsConfig = Readonly<{
    schema: FieldsSchema;
    values: Readonly<Record<string, string>>;
    memberNounPlural: string;
    unknownField: (fieldName: string, allowedDescription: string) => string;
    invalidValues: (detail: string, maybeFieldName: Option.Option<string>) => string;
}>;
declare const InvalidFields_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "InvalidFields";
} & Readonly<A>;
/** A record outside its schema, with the message the caller phrased. */
export declare class InvalidFields extends InvalidFields_base<{
    readonly message: string;
}> {
}
/**
 * The validation as a program: names outside the schema and values the schema
 * rejects both fail with `InvalidFields`, carrying the message the caller
 * phrased. {@link validateFields} runs it for plain callers.
 */
export declare const checkFields: (config: ValidateFieldsConfig) => Effect.Effect<void, InvalidFields>;
/**
 * Validates a parsed string record against its schema: names outside the
 * schema and values the schema rejects both fail with an error the caller
 * phrases, and a rejected value's message also receives the failing field's
 * name when the schema issue carries one. One implementation serves island
 * attributes and frontmatter fields, so unknown-name detection and
 * decode-error wrapping cannot drift between the two.
 */
export declare const validateFields: (config: ValidateFieldsConfig) => void;
export {};
