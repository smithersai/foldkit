import { Option, Schema } from 'effect';
import { type NamedSchemas } from './typeToString.js';
import { type TypeDocJson } from './typedoc.vibe';
export declare const ApiParameter: Schema.Struct<{
    readonly name: Schema.String;
    readonly type: Schema.String;
    readonly isOptional: Schema.Boolean;
    readonly isRest: Schema.Boolean;
    readonly defaultValue: Schema.OptionFromNullishOr<Schema.String>;
    readonly description: Schema.OptionFromNullishOr<Schema.String>;
}>;
export type ApiParameter = typeof ApiParameter.Type;
export declare const ApiFunctionSignature: Schema.Struct<{
    readonly parameters: Schema.$Array<Schema.Struct<{
        readonly name: Schema.String;
        readonly type: Schema.String;
        readonly isOptional: Schema.Boolean;
        readonly isRest: Schema.Boolean;
        readonly defaultValue: Schema.OptionFromNullishOr<Schema.String>;
        readonly description: Schema.OptionFromNullishOr<Schema.String>;
    }>>;
    readonly returnType: Schema.String;
    readonly typeParameters: Schema.$Array<Schema.String>;
}>;
export type ApiFunctionSignature = typeof ApiFunctionSignature.Type;
export declare const ApiFunction: Schema.Struct<{
    readonly name: Schema.String;
    readonly description: Schema.OptionFromNullishOr<Schema.String>;
    readonly signatures: Schema.$Array<Schema.Struct<{
        readonly parameters: Schema.$Array<Schema.Struct<{
            readonly name: Schema.String;
            readonly type: Schema.String;
            readonly isOptional: Schema.Boolean;
            readonly isRest: Schema.Boolean;
            readonly defaultValue: Schema.OptionFromNullishOr<Schema.String>;
            readonly description: Schema.OptionFromNullishOr<Schema.String>;
        }>>;
        readonly returnType: Schema.String;
        readonly typeParameters: Schema.$Array<Schema.String>;
    }>>;
    readonly sourceUrl: Schema.OptionFromNullishOr<Schema.String>;
}>;
export type ApiFunction = typeof ApiFunction.Type;
export declare const ApiType: Schema.Struct<{
    readonly name: Schema.String;
    readonly description: Schema.OptionFromNullishOr<Schema.String>;
    readonly typeDefinition: Schema.String;
    readonly sourceUrl: Schema.OptionFromNullishOr<Schema.String>;
}>;
export type ApiType = typeof ApiType.Type;
export declare const ApiVariable: Schema.Struct<{
    readonly name: Schema.String;
    readonly description: Schema.OptionFromNullishOr<Schema.String>;
    readonly type: Schema.String;
    readonly sourceUrl: Schema.OptionFromNullishOr<Schema.String>;
}>;
export type ApiVariable = typeof ApiVariable.Type;
export declare const ApiInterface: Schema.Struct<{
    readonly name: Schema.String;
    readonly description: Schema.OptionFromNullishOr<Schema.String>;
    readonly typeDefinition: Schema.String;
    readonly sourceUrl: Schema.OptionFromNullishOr<Schema.String>;
}>;
export type ApiInterface = typeof ApiInterface.Type;
export declare const ApiModule: Schema.Struct<{
    readonly name: Schema.String;
    readonly functions: Schema.$Array<Schema.Struct<{
        readonly name: Schema.String;
        readonly description: Schema.OptionFromNullishOr<Schema.String>;
        readonly signatures: Schema.$Array<Schema.Struct<{
            readonly parameters: Schema.$Array<Schema.Struct<{
                readonly name: Schema.String;
                readonly type: Schema.String;
                readonly isOptional: Schema.Boolean;
                readonly isRest: Schema.Boolean;
                readonly defaultValue: Schema.OptionFromNullishOr<Schema.String>;
                readonly description: Schema.OptionFromNullishOr<Schema.String>;
            }>>;
            readonly returnType: Schema.String;
            readonly typeParameters: Schema.$Array<Schema.String>;
        }>>;
        readonly sourceUrl: Schema.OptionFromNullishOr<Schema.String>;
    }>>;
    readonly types: Schema.$Array<Schema.Struct<{
        readonly name: Schema.String;
        readonly description: Schema.OptionFromNullishOr<Schema.String>;
        readonly typeDefinition: Schema.String;
        readonly sourceUrl: Schema.OptionFromNullishOr<Schema.String>;
    }>>;
    readonly interfaces: Schema.$Array<Schema.Struct<{
        readonly name: Schema.String;
        readonly description: Schema.OptionFromNullishOr<Schema.String>;
        readonly typeDefinition: Schema.String;
        readonly sourceUrl: Schema.OptionFromNullishOr<Schema.String>;
    }>>;
    readonly variables: Schema.$Array<Schema.Struct<{
        readonly name: Schema.String;
        readonly description: Schema.OptionFromNullishOr<Schema.String>;
        readonly type: Schema.String;
        readonly sourceUrl: Schema.OptionFromNullishOr<Schema.String>;
    }>>;
}>;
export type ApiModule = typeof ApiModule.Type;
export declare const ParsedApiReference: Schema.Struct<{
    readonly modules: Schema.$Array<Schema.Struct<{
        readonly name: Schema.String;
        readonly functions: Schema.$Array<Schema.Struct<{
            readonly name: Schema.String;
            readonly description: Schema.OptionFromNullishOr<Schema.String>;
            readonly signatures: Schema.$Array<Schema.Struct<{
                readonly parameters: Schema.$Array<Schema.Struct<{
                    readonly name: Schema.String;
                    readonly type: Schema.String;
                    readonly isOptional: Schema.Boolean;
                    readonly isRest: Schema.Boolean;
                    readonly defaultValue: Schema.OptionFromNullishOr<Schema.String>;
                    readonly description: Schema.OptionFromNullishOr<Schema.String>;
                }>>;
                readonly returnType: Schema.String;
                readonly typeParameters: Schema.$Array<Schema.String>;
            }>>;
            readonly sourceUrl: Schema.OptionFromNullishOr<Schema.String>;
        }>>;
        readonly types: Schema.$Array<Schema.Struct<{
            readonly name: Schema.String;
            readonly description: Schema.OptionFromNullishOr<Schema.String>;
            readonly typeDefinition: Schema.String;
            readonly sourceUrl: Schema.OptionFromNullishOr<Schema.String>;
        }>>;
        readonly interfaces: Schema.$Array<Schema.Struct<{
            readonly name: Schema.String;
            readonly description: Schema.OptionFromNullishOr<Schema.String>;
            readonly typeDefinition: Schema.String;
            readonly sourceUrl: Schema.OptionFromNullishOr<Schema.String>;
        }>>;
        readonly variables: Schema.$Array<Schema.Struct<{
            readonly name: Schema.String;
            readonly description: Schema.OptionFromNullishOr<Schema.String>;
            readonly type: Schema.String;
            readonly sourceUrl: Schema.OptionFromNullishOr<Schema.String>;
        }>>;
    }>>;
}>;
export type ParsedApiReference = typeof ParsedApiReference.Type;
export declare const SIGNATURE_COLLAPSE_THRESHOLD = 500;
export declare const signaturesLength: (apiFunction: ApiFunction) => number;
export declare const scopedId: (kind: string, moduleName: string, name: string) => string;
export declare const scopedIdBelongsToModule: (id: string, moduleName: string) => boolean;
export declare const sectionId: (moduleName: string, label: string) => string;
export declare const collectNamedSchemas: (json: TypeDocJson) => NamedSchemas;
export declare const parseTypedocJson: (json: TypeDocJson) => ParsedApiReference;
export type TableOfContentsEntry = {
    readonly id: string;
    readonly text: string;
    readonly level: 'h2' | 'h3' | 'h4';
};
export declare const toModuleTableOfContents: (module: ApiModule) => ReadonlyArray<TableOfContentsEntry>;
export declare const moduleNameToSlug: (name: string) => string;
export declare const slugToModuleName: (slug: string) => string;
export declare const resolveModule: (parsedApi: ParsedApiReference, slug: string) => Option.Option<ApiModule>;
