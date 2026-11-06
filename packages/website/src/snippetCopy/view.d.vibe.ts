import { HashSet } from 'effect';
import { Submodel } from 'foldkit';
export type ViewInputs = Readonly<{
    snippetId: string;
    text: string;
    ariaLabel: string;
    positionClass: string;
    variant: 'Header' | 'Overlay';
}>;
export declare const view: Submodel.View<{
    readonly copiedSnippetIds: HashSet.HashSet<string>;
}, {
    readonly _tag: "FailedCopySnippet";
} | {
    readonly _tag: "ClickedCopySnippet";
    readonly snippetId: string;
    readonly text: string;
} | {
    readonly _tag: "CompletedWaitBeforeHidingCopiedIndicator";
    readonly snippetId: string;
} | {
    readonly _tag: "SucceededCopySnippet";
    readonly snippetId: string;
}, Readonly<{
    snippetId: string;
    text: string;
    ariaLabel: string;
    positionClass: string;
    variant: 'Header' | 'Overlay';
}>>;
