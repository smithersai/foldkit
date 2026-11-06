import { Option, Schema } from "effect";
export declare const TypeDocFlags: Schema.Struct<{
    readonly isOptional: Schema.withDecodingDefaultKey<Schema.Boolean, never>;
    readonly isPrivate: Schema.withDecodingDefaultKey<Schema.Boolean, never>;
    readonly isProtected: Schema.withDecodingDefaultKey<Schema.Boolean, never>;
    readonly isRest: Schema.withDecodingDefaultKey<Schema.Boolean, never>;
    readonly isStatic: Schema.withDecodingDefaultKey<Schema.Boolean, never>;
}>;
export type TypeDocFlags = typeof TypeDocFlags.Type;
export declare const TypeDocCommentPart: Schema.Struct<{
    readonly kind: Schema.String;
    readonly text: Schema.String;
}>;
export type TypeDocCommentPart = typeof TypeDocCommentPart.Type;
export declare const TypeDocBlockTag: Schema.Struct<{
    readonly tag: Schema.String;
    readonly content: Schema.$Array<Schema.Struct<{
        readonly kind: Schema.String;
        readonly text: Schema.String;
    }>>;
}>;
export type TypeDocBlockTag = typeof TypeDocBlockTag.Type;
export declare const TypeDocComment: Schema.Struct<{
    readonly summary: Schema.OptionFromOptional<Schema.$Array<Schema.Struct<{
        readonly kind: Schema.String;
        readonly text: Schema.String;
    }>>>;
    readonly blockTags: Schema.OptionFromOptional<Schema.$Array<Schema.Struct<{
        readonly tag: Schema.String;
        readonly content: Schema.$Array<Schema.Struct<{
            readonly kind: Schema.String;
            readonly text: Schema.String;
        }>>;
    }>>>;
}>;
export type TypeDocComment = typeof TypeDocComment.Type;
export declare const TypeDocSource: Schema.Struct<{
    readonly fileName: Schema.String;
    readonly line: Schema.Number;
    readonly character: Schema.Number;
    readonly url: Schema.OptionFromOptional<Schema.String>;
}>;
export type TypeDocSource = typeof TypeDocSource.Type;
type TypeDocIntrinsicType = Readonly<{
    type: 'intrinsic';
    name: string;
}>;
type TypeDocLiteralType = Readonly<{
    type: 'literal';
    value: unknown;
}>;
type TypeDocReferenceTarget = number | Readonly<{
    packageName?: string | undefined;
    packagePath?: string | undefined;
    qualifiedName?: string | undefined;
}>;
interface TypeDocReferenceType<Self> {
    readonly type: 'reference';
    readonly name: string;
    readonly package?: string | undefined;
    readonly target?: TypeDocReferenceTarget | undefined;
    readonly typeArguments?: ReadonlyArray<Self> | undefined;
}
interface TypeDocArrayType<Self> {
    readonly type: 'array';
    readonly elementType: Self;
}
interface TypeDocRestType<Self> {
    readonly type: 'rest';
    readonly elementType: Self;
}
interface TypeDocTupleType<Self> {
    readonly type: 'tuple';
    readonly elements: ReadonlyArray<Self>;
}
interface TypeDocUnionType<Self> {
    readonly type: 'union';
    readonly types: ReadonlyArray<Self>;
}
interface TypeDocIntersectionType<Self> {
    readonly type: 'intersection';
    readonly types: ReadonlyArray<Self>;
}
interface TypeDocReflectionType<Declaration> {
    readonly type: 'reflection';
    readonly declaration: Declaration;
}
interface TypeDocTypeOperatorType<Self> {
    readonly type: 'typeOperator';
    readonly operator: string;
    readonly target: Self;
}
interface TypeDocMappedType<Self> {
    readonly type: 'mapped';
    readonly parameter: string;
    readonly parameterType: Self;
    readonly templateType: Self;
    readonly readonlyModifier?: string | undefined;
}
interface TypeDocConditionalType<Self> {
    readonly type: 'conditional';
    readonly checkType: Self;
    readonly extendsType: Self;
    readonly trueType: Self;
    readonly falseType: Self;
}
interface TypeDocIndexedAccessType<Self> {
    readonly type: 'indexedAccess';
    readonly objectType: Self;
    readonly indexType: Self;
}
interface TypeDocQueryType<Self> {
    readonly type: 'query';
    readonly queryType: Self;
}
interface TypeDocTemplateLiteralType<Self> {
    readonly type: 'templateLiteral';
    readonly head: string;
    readonly tail: ReadonlyArray<readonly [Self, string]>;
}
type TypeDocInferredType = Readonly<{
    type: 'inferred';
    name: string;
}>;
type TypeDocPredicateType = Readonly<{
    type: 'predicate';
}>;
type TypeDocUnknownType = Readonly<{
    type: 'unknown';
}>;
export type TypeDocType = TypeDocIntrinsicType | TypeDocLiteralType | TypeDocReferenceType<TypeDocType> | TypeDocArrayType<TypeDocType> | TypeDocRestType<TypeDocType> | TypeDocTupleType<TypeDocType> | TypeDocUnionType<TypeDocType> | TypeDocIntersectionType<TypeDocType> | TypeDocReflectionType<Option.Option<TypeDocItem>> | TypeDocTypeOperatorType<TypeDocType> | TypeDocMappedType<TypeDocType> | TypeDocConditionalType<TypeDocType> | TypeDocIndexedAccessType<TypeDocType> | TypeDocQueryType<TypeDocType> | TypeDocTemplateLiteralType<TypeDocType> | TypeDocInferredType | TypeDocPredicateType | TypeDocUnknownType;
type TypeDocTypeEncoded = TypeDocIntrinsicType | TypeDocLiteralType | TypeDocReferenceType<TypeDocTypeEncoded> | TypeDocArrayType<TypeDocTypeEncoded> | TypeDocRestType<TypeDocTypeEncoded> | TypeDocTupleType<TypeDocTypeEncoded> | TypeDocUnionType<TypeDocTypeEncoded> | TypeDocIntersectionType<TypeDocTypeEncoded> | TypeDocReflectionType<TypeDocItemEncoded> | TypeDocTypeOperatorType<TypeDocTypeEncoded> | TypeDocMappedType<TypeDocTypeEncoded> | TypeDocConditionalType<TypeDocTypeEncoded> | TypeDocIndexedAccessType<TypeDocTypeEncoded> | TypeDocQueryType<TypeDocTypeEncoded> | TypeDocTemplateLiteralType<TypeDocTypeEncoded> | TypeDocInferredType | TypeDocPredicateType | TypeDocUnknownType;
export declare const TypeDocTypeSchema: Schema.Codec<TypeDocType, TypeDocTypeEncoded>;
export declare const TypeDocTypeParam: Schema.Struct<{
    readonly id: Schema.Number;
    readonly name: Schema.String;
    readonly variant: Schema.String;
    readonly kind: Schema.Number;
    readonly type: Schema.OptionFromOptional<Schema.Codec<TypeDocType, TypeDocTypeEncoded, never, never>>;
    readonly default: Schema.OptionFromOptional<Schema.Codec<TypeDocType, TypeDocTypeEncoded, never, never>>;
}>;
export type TypeDocTypeParam = typeof TypeDocTypeParam.Type;
export declare const TypeDocParam: Schema.Struct<{
    readonly id: Schema.Number;
    readonly name: Schema.String;
    readonly variant: Schema.String;
    readonly kind: Schema.Number;
    readonly flags: Schema.withDecodingDefaultKey<Schema.Struct<{
        readonly isOptional: Schema.withDecodingDefaultKey<Schema.Boolean, never>;
        readonly isPrivate: Schema.withDecodingDefaultKey<Schema.Boolean, never>;
        readonly isProtected: Schema.withDecodingDefaultKey<Schema.Boolean, never>;
        readonly isRest: Schema.withDecodingDefaultKey<Schema.Boolean, never>;
        readonly isStatic: Schema.withDecodingDefaultKey<Schema.Boolean, never>;
    }>, never>;
    readonly type: Schema.OptionFromOptional<Schema.Codec<TypeDocType, TypeDocTypeEncoded, never, never>>;
    readonly defaultValue: Schema.OptionFromOptional<Schema.String>;
    readonly comment: Schema.OptionFromOptional<Schema.Struct<{
        readonly summary: Schema.OptionFromOptional<Schema.$Array<Schema.Struct<{
            readonly kind: Schema.String;
            readonly text: Schema.String;
        }>>>;
        readonly blockTags: Schema.OptionFromOptional<Schema.$Array<Schema.Struct<{
            readonly tag: Schema.String;
            readonly content: Schema.$Array<Schema.Struct<{
                readonly kind: Schema.String;
                readonly text: Schema.String;
            }>>;
        }>>>;
    }>>;
}>;
export type TypeDocParam = typeof TypeDocParam.Type;
export declare const TypeDocSignature: Schema.Struct<{
    readonly id: Schema.Number;
    readonly name: Schema.String;
    readonly variant: Schema.String;
    readonly kind: Schema.Number;
    readonly comment: Schema.OptionFromOptional<Schema.Struct<{
        readonly summary: Schema.OptionFromOptional<Schema.$Array<Schema.Struct<{
            readonly kind: Schema.String;
            readonly text: Schema.String;
        }>>>;
        readonly blockTags: Schema.OptionFromOptional<Schema.$Array<Schema.Struct<{
            readonly tag: Schema.String;
            readonly content: Schema.$Array<Schema.Struct<{
                readonly kind: Schema.String;
                readonly text: Schema.String;
            }>>;
        }>>>;
    }>>;
    readonly parameters: Schema.OptionFromOptional<Schema.$Array<Schema.Struct<{
        readonly id: Schema.Number;
        readonly name: Schema.String;
        readonly variant: Schema.String;
        readonly kind: Schema.Number;
        readonly flags: Schema.withDecodingDefaultKey<Schema.Struct<{
            readonly isOptional: Schema.withDecodingDefaultKey<Schema.Boolean, never>;
            readonly isPrivate: Schema.withDecodingDefaultKey<Schema.Boolean, never>;
            readonly isProtected: Schema.withDecodingDefaultKey<Schema.Boolean, never>;
            readonly isRest: Schema.withDecodingDefaultKey<Schema.Boolean, never>;
            readonly isStatic: Schema.withDecodingDefaultKey<Schema.Boolean, never>;
        }>, never>;
        readonly type: Schema.OptionFromOptional<Schema.Codec<TypeDocType, TypeDocTypeEncoded, never, never>>;
        readonly defaultValue: Schema.OptionFromOptional<Schema.String>;
        readonly comment: Schema.OptionFromOptional<Schema.Struct<{
            readonly summary: Schema.OptionFromOptional<Schema.$Array<Schema.Struct<{
                readonly kind: Schema.String;
                readonly text: Schema.String;
            }>>>;
            readonly blockTags: Schema.OptionFromOptional<Schema.$Array<Schema.Struct<{
                readonly tag: Schema.String;
                readonly content: Schema.$Array<Schema.Struct<{
                    readonly kind: Schema.String;
                    readonly text: Schema.String;
                }>>;
            }>>>;
        }>>;
    }>>>;
    readonly type: Schema.OptionFromOptional<Schema.Codec<TypeDocType, TypeDocTypeEncoded, never, never>>;
    readonly typeParameters: Schema.OptionFromOptional<Schema.$Array<Schema.Struct<{
        readonly id: Schema.Number;
        readonly name: Schema.String;
        readonly variant: Schema.String;
        readonly kind: Schema.Number;
        readonly type: Schema.OptionFromOptional<Schema.Codec<TypeDocType, TypeDocTypeEncoded, never, never>>;
        readonly default: Schema.OptionFromOptional<Schema.Codec<TypeDocType, TypeDocTypeEncoded, never, never>>;
    }>>>;
}>;
export type TypeDocSignature = typeof TypeDocSignature.Type;
declare const typeDocItemFields: {
    id: Schema.Number;
    name: Schema.String;
    variant: Schema.String;
    kind: Schema.Number;
    flags: Schema.withDecodingDefaultKey<Schema.Struct<{
        readonly isOptional: Schema.withDecodingDefaultKey<Schema.Boolean, never>;
        readonly isPrivate: Schema.withDecodingDefaultKey<Schema.Boolean, never>;
        readonly isProtected: Schema.withDecodingDefaultKey<Schema.Boolean, never>;
        readonly isRest: Schema.withDecodingDefaultKey<Schema.Boolean, never>;
        readonly isStatic: Schema.withDecodingDefaultKey<Schema.Boolean, never>;
    }>, never>;
    comment: Schema.OptionFromOptional<Schema.Struct<{
        readonly summary: Schema.OptionFromOptional<Schema.$Array<Schema.Struct<{
            readonly kind: Schema.String;
            readonly text: Schema.String;
        }>>>;
        readonly blockTags: Schema.OptionFromOptional<Schema.$Array<Schema.Struct<{
            readonly tag: Schema.String;
            readonly content: Schema.$Array<Schema.Struct<{
                readonly kind: Schema.String;
                readonly text: Schema.String;
            }>>;
        }>>>;
    }>>;
    sources: Schema.OptionFromOptional<Schema.$Array<Schema.Struct<{
        readonly fileName: Schema.String;
        readonly line: Schema.Number;
        readonly character: Schema.Number;
        readonly url: Schema.OptionFromOptional<Schema.String>;
    }>>>;
    signatures: Schema.OptionFromOptional<Schema.$Array<Schema.Struct<{
        readonly id: Schema.Number;
        readonly name: Schema.String;
        readonly variant: Schema.String;
        readonly kind: Schema.Number;
        readonly comment: Schema.OptionFromOptional<Schema.Struct<{
            readonly summary: Schema.OptionFromOptional<Schema.$Array<Schema.Struct<{
                readonly kind: Schema.String;
                readonly text: Schema.String;
            }>>>;
            readonly blockTags: Schema.OptionFromOptional<Schema.$Array<Schema.Struct<{
                readonly tag: Schema.String;
                readonly content: Schema.$Array<Schema.Struct<{
                    readonly kind: Schema.String;
                    readonly text: Schema.String;
                }>>;
            }>>>;
        }>>;
        readonly parameters: Schema.OptionFromOptional<Schema.$Array<Schema.Struct<{
            readonly id: Schema.Number;
            readonly name: Schema.String;
            readonly variant: Schema.String;
            readonly kind: Schema.Number;
            readonly flags: Schema.withDecodingDefaultKey<Schema.Struct<{
                readonly isOptional: Schema.withDecodingDefaultKey<Schema.Boolean, never>;
                readonly isPrivate: Schema.withDecodingDefaultKey<Schema.Boolean, never>;
                readonly isProtected: Schema.withDecodingDefaultKey<Schema.Boolean, never>;
                readonly isRest: Schema.withDecodingDefaultKey<Schema.Boolean, never>;
                readonly isStatic: Schema.withDecodingDefaultKey<Schema.Boolean, never>;
            }>, never>;
            readonly type: Schema.OptionFromOptional<Schema.Codec<TypeDocType, TypeDocTypeEncoded, never, never>>;
            readonly defaultValue: Schema.OptionFromOptional<Schema.String>;
            readonly comment: Schema.OptionFromOptional<Schema.Struct<{
                readonly summary: Schema.OptionFromOptional<Schema.$Array<Schema.Struct<{
                    readonly kind: Schema.String;
                    readonly text: Schema.String;
                }>>>;
                readonly blockTags: Schema.OptionFromOptional<Schema.$Array<Schema.Struct<{
                    readonly tag: Schema.String;
                    readonly content: Schema.$Array<Schema.Struct<{
                        readonly kind: Schema.String;
                        readonly text: Schema.String;
                    }>>;
                }>>>;
            }>>;
        }>>>;
        readonly type: Schema.OptionFromOptional<Schema.Codec<TypeDocType, TypeDocTypeEncoded, never, never>>;
        readonly typeParameters: Schema.OptionFromOptional<Schema.$Array<Schema.Struct<{
            readonly id: Schema.Number;
            readonly name: Schema.String;
            readonly variant: Schema.String;
            readonly kind: Schema.Number;
            readonly type: Schema.OptionFromOptional<Schema.Codec<TypeDocType, TypeDocTypeEncoded, never, never>>;
            readonly default: Schema.OptionFromOptional<Schema.Codec<TypeDocType, TypeDocTypeEncoded, never, never>>;
        }>>>;
    }>>>;
    typeParameters: Schema.OptionFromOptional<Schema.$Array<Schema.Struct<{
        readonly id: Schema.Number;
        readonly name: Schema.String;
        readonly variant: Schema.String;
        readonly kind: Schema.Number;
        readonly type: Schema.OptionFromOptional<Schema.Codec<TypeDocType, TypeDocTypeEncoded, never, never>>;
        readonly default: Schema.OptionFromOptional<Schema.Codec<TypeDocType, TypeDocTypeEncoded, never, never>>;
    }>>>;
};
export interface TypeDocItem extends Schema.Struct.Type<typeof typeDocItemFields> {
    readonly type: Option.Option<TypeDocType>;
    readonly children: Option.Option<ReadonlyArray<TypeDocItem>>;
}
interface TypeDocItemEncoded extends Schema.Struct.Encoded<typeof typeDocItemFields> {
    readonly type?: TypeDocTypeEncoded;
    readonly children?: ReadonlyArray<TypeDocItemEncoded>;
}
export declare const TypeDocItem: Schema.Codec<TypeDocItem, TypeDocItemEncoded>;
export declare const TypeDocModule: Schema.Struct<{
    readonly id: Schema.Number;
    readonly name: Schema.String;
    readonly variant: Schema.String;
    readonly kind: Schema.Number;
    readonly children: Schema.withDecodingDefaultKey<Schema.$Array<Schema.Codec<TypeDocItem, TypeDocItemEncoded, never, never>>, never>;
}>;
export type TypeDocModule = typeof TypeDocModule.Type;
export declare const TypeDocJson: Schema.Struct<{
    readonly schemaVersion: Schema.String;
    readonly id: Schema.Number;
    readonly name: Schema.String;
    readonly variant: Schema.String;
    readonly kind: Schema.Number;
    readonly children: Schema.$Array<Schema.Struct<{
        readonly id: Schema.Number;
        readonly name: Schema.String;
        readonly variant: Schema.String;
        readonly kind: Schema.Number;
        readonly children: Schema.withDecodingDefaultKey<Schema.$Array<Schema.Codec<TypeDocItem, TypeDocItemEncoded, never, never>>, never>;
    }>>;
}>;
export type TypeDocJson = typeof TypeDocJson.Type;
export declare const Kind: {
    Project: number;
    Module: number;
    Namespace: number;
    Enum: number;
    EnumMember: number;
    Variable: number;
    Function: number;
    Class: number;
    Interface: number;
    Constructor: number;
    Property: number;
    Method: number;
    CallSignature: number;
    IndexSignature: number;
    ConstructorSignature: number;
    Parameter: number;
    TypeLiteral: number;
    TypeParameter: number;
    Accessor: number;
    GetSignature: number;
    SetSignature: number;
    TypeAlias: number;
    Reference: number;
};
export {};
