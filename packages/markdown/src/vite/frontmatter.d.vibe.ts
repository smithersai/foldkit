import type { Position } from 'unist';
import type { FieldsSchema } from './validateFields.vibe';
/**
 * Schema for a document's frontmatter: a struct that validates the flat string
 * fields at build time. Values stay the raw strings the block declares; where
 * an app needs typed values, decode the exported `frontmatter` object with the
 * same schema at runtime.
 */
export type FrontmatterDefinition = FieldsSchema;
/**
 * A frontmatter block's parsed string fields, alongside each field's line
 * offset within the block so validation errors can point at the offending
 * line rather than the opening fence.
 */
export type ParsedFrontmatterFields = Readonly<{
    fields: Readonly<Record<string, string>>;
    fieldLineOffsets: ReadonlyMap<string, number>;
}>;
/**
 * Parses a frontmatter block's raw text into its string fields. The supported
 * shape is deliberately flat: one `key: value` pair per line, every value a
 * string, with optional surrounding quotes for values that contain special
 * characters. Nesting, lists, and multi-line values all fail with guidance.
 */
export declare const parseFrontmatterFields: (value: string, maybePosition: Position | undefined) => ParsedFrontmatterFields;
/**
 * Validates parsed frontmatter fields against the plugin's frontmatter schema.
 * Unknown fields and values outside the schema both fail with an error naming
 * the offender and its line, mirroring how island attributes are validated.
 */
export declare const validateFrontmatterFields: (definition: FrontmatterDefinition, parsed: ParsedFrontmatterFields, maybePosition: Position | undefined) => void;
