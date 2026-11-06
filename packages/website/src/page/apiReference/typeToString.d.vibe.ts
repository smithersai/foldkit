import { Option } from 'effect';
import type { TypeDocItem, TypeDocType } from './typedoc.vibe';
/** Map from a reflection fingerprint to the qualified type name to render in
 * its place. The fingerprint identifies a Schema-derived struct by its sorted
 * field names, so that inlined `typeof Model.Type` reflections in function
 * signatures collapse back to the `Module.Model` name a reader recognizes.
 * TypeDoc strips source positions from inlined reflections, so the fingerprint
 * cannot rely on file/line info that's only present on the original
 * declaration. */
export type NamedSchemas = ReadonlyMap<string, string>;
/** Fingerprint a struct-like reflection by its sorted field names joined with
 * `|`. Stable across TypeScript inlining of `typeof Model.Type` aliases. */
export declare const reflectionFingerprint: (children: ReadonlyArray<TypeDocItem>) => string;
export declare const typeToString: (maybeType: Option.Option<TypeDocType>, depth?: number, namedSchemas?: NamedSchemas) => string;
export declare const typeDefFromChildren: (maybeChildren: Option.Option<ReadonlyArray<TypeDocItem>>, namedSchemas?: NamedSchemas) => string;
