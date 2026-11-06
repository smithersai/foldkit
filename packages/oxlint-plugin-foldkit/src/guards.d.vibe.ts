import { Option } from 'effect';
import { type ESTree, type OxlintScope, type Reference, type Variable } from 'effect-oxlint';
export declare const isIdentifier: (node: unknown, name?: string) => node is Readonly<{
    type: 'Identifier';
    name: string;
}>;
export declare const isIdentifierReference: (node: unknown) => node is ESTree.IdentifierReference;
export declare const isStringLiteral: (node: unknown) => node is ESTree.StringLiteral;
export declare const isTemplateLiteral: (node: unknown) => node is ESTree.TemplateLiteral;
export declare const isCallExpression: (node: unknown) => node is ESTree.CallExpression;
export declare const isMemberExpression: (node: unknown) => node is ESTree.MemberExpression;
export declare const isObjectExpression: (node: unknown) => node is ESTree.ObjectExpression;
export declare const isObjectProperty: (node: unknown) => node is ESTree.ObjectProperty;
export declare const isArrayExpression: (node: unknown) => node is Readonly<{
    type: 'ArrayExpression';
    elements: ReadonlyArray<unknown>;
}>;
export declare const isSpreadElement: (node: unknown) => boolean;
export declare const isArrowFunction: (node: unknown) => node is ESTree.ArrowFunctionExpression;
export declare const helperCalleeName: (callee: unknown) => Option.Option<string>;
export type StaticMemberPath = Readonly<{
    root: ESTree.IdentifierReference;
    members: ReadonlyArray<string>;
}>;
export declare const staticMemberPath: (node: unknown) => Option.Option<StaticMemberPath>;
export declare const calleeMatchesHelperName: (callee: unknown, helperName: string) => boolean;
export declare const staticStringValue: (node: unknown) => Option.Option<string>;
export declare const staticMemberName: (node: ESTree.MemberExpression) => Option.Option<string>;
export declare const staticPropertyName: (property: Readonly<{
    computed?: boolean;
    key: ESTree.PropertyKey;
}>) => Option.Option<string>;
export declare const indexReferences: (scopes: ReadonlyArray<OxlintScope>) => WeakMap<ESTree.Node, Reference>;
export declare const resolvedVariable: (references: WeakMap<ESTree.Node, Reference>, node: ESTree.IdentifierReference) => Option.Option<Variable>;
export type ImportedPath = Readonly<{
    source: string;
    members: ReadonlyArray<string>;
    localMembers: ReadonlyArray<string>;
}>;
export declare const resolveImportedPath: (references: WeakMap<ESTree.Node, Reference>, node: unknown) => Option.Option<ImportedPath>;
export declare const resolveFoldkitApiPath: (references: WeakMap<ESTree.Node, Reference>, node: unknown) => Option.Option<ReadonlyArray<string>>;
export declare const isFoldkitHtmlBuilderMember: (callee: unknown, memberName: string, references: WeakMap<ESTree.Node, Reference> | undefined) => boolean;
export declare const isUnshadowedReference: (references: WeakMap<ESTree.Node, Reference> | undefined, node: ESTree.Node) => boolean;
export declare const isVariableDeclarator: (node: unknown) => node is ESTree.VariableDeclarator;
export declare const isVariableDeclaration: (node: unknown) => node is ESTree.VariableDeclaration;
export declare const isProgram: (node: unknown) => node is ESTree.Program;
export declare const firstStringArgument: (node: ESTree.CallExpression) => ESTree.StringLiteral | undefined;
