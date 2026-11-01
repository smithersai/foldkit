import { Option } from 'effect';
import { Html } from 'foldkit/html';
export type RenderCopyButton = (config: Readonly<{
    id: string;
    text: string;
    ariaLabel: string;
    positionClass: string;
    variant: 'Header' | 'Overlay';
}>) => Html;
export type RenderSnippet = (config: Readonly<{
    id: string;
    disclosureGroupId?: string;
    title?: string;
    content: Html;
    rawCode: string;
    copyAriaLabel: string;
    className?: string;
}>) => Html;
type ViewOptions = Readonly<{
    className?: string;
    maybeLanguage?: Option.Option<string>;
    copyButtonPositionClass?: string;
}>;
export declare const view: (id: string, code: string, ariaLabel: string, renderCopyButton: RenderCopyButton, { className, maybeLanguage, copyButtonPositionClass, }?: ViewOptions) => Html;
export declare const highlightedView: (id: string, content: Html, rawCode: string, copyAriaLabel: string, renderSnippet: RenderSnippet, className?: string, title?: string) => Html;
/**
 * `highlightedView` bound to a page-supplied snippet renderer, for a page
 * rendered inside a Submodel. Bind once at the top of the view and the call
 * sites below it are unchanged.
 */
export declare const highlightedViewFor: (renderSnippet: RenderSnippet) => (id: string, content: Html, rawCode: string, ariaLabel: string, className?: string, title?: string) => Html;
export {};
