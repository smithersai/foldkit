import { type ESTree, type Reference } from 'effect-oxlint';
export type MessageCase = Readonly<{
    name: string;
    nameNode: ESTree.Node;
    fields: ESTree.ObjectExpression;
}>;
export declare const recordFoldkitMessageUnionBindings: (bindings: Set<string>, node: ESTree.Node) => void;
export declare const isFoldkitMessageUnionCall: (node: ESTree.CallExpression, bindings: ReadonlySet<string>, references: WeakMap<ESTree.Node, Reference> | undefined) => boolean;
export declare const messageCases: (node: ESTree.CallExpression, bindings: ReadonlySet<string>, references: WeakMap<ESTree.Node, Reference> | undefined) => ReadonlyArray<MessageCase>;
export declare const hasMessagePayloadProperty: (fields: ESTree.ObjectExpression) => boolean;
export declare const hasSubmodelMessagePayload: (fields: ESTree.ObjectExpression, references: WeakMap<ESTree.Node, Reference> | undefined) => boolean;
