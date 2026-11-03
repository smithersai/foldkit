import { Option, Schema } from 'effect';
/**
 * A struct schema describing a flat record of string values, the shape shared
 * by island attribute definitions and frontmatter definitions.
 */
export type FieldsSchema = Schema.Struct<Schema.Struct.Fields> & Readonly<{
    DecodingServices: never;
    EncodingServices: never;
}>;
/**
 * Validates a parsed string record against its schema: names outside the
 * schema and values the schema rejects both fail with an error the caller
 * phrases, and a rejected value's message also receives the failing field's
 * name when the schema issue carries one. One implementation serves island
 * attributes and frontmatter fields, so unknown-name detection and
 * decode-error wrapping cannot drift between the two.
 */
export declare const validateFields: (config: Readonly<{
    schema: FieldsSchema;
    values: Readonly<Record<string, string>>;
    memberNounPlural: string;
    unknownField: (fieldName: string, allowedDescription: string) => string;
    invalidValues: (detail: string, maybeFieldName: Option.Option<string>) => string;
}>) => void;
