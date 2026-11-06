import { Submodel } from 'foldkit';
import { Html } from 'foldkit/html';
import { type CodeBlock } from '../../component/index.ts';
import { type RenderHeadingLink } from '../../prose.vibe';
declare const { tableOfContents, view: renderPage }: Readonly<{
    tableOfContents: readonly Readonly<{
        id: string;
        text: string;
        level: 'h2' | 'h3' | 'h4';
    }>[];
    view: (slots: Readonly<{
        demos: Readonly<Record<never, Html>>;
        renderFaq?: import("../../markdown/slots.vibe").RenderFaq;
        renderCopyButton: CodeBlock.RenderCopyButton;
        renderSnippet: CodeBlock.RenderSnippet;
        renderHeadingLink: RenderHeadingLink;
    }>) => Html;
}>;
export { tableOfContents };
export declare const view: Submodel.View<{
    readonly [x: string]: boolean;
}, {
    readonly _tag: "ToggledFaq";
    readonly id: string;
    readonly isOpen: boolean;
}, Readonly<{
    renderCopyButton: CodeBlock.RenderCopyButton;
    renderSnippet: CodeBlock.RenderSnippet;
    renderHeadingLink: RenderHeadingLink;
}>>;
