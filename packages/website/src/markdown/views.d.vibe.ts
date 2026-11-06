import 'foldkit/html';
import type * as Markdown from '@foldkit/markdown';
import { CodeBlock } from '../component/index.ts';
import { type RenderHeadingLink } from '../prose.vibe';
import { type HeadingIds } from './tableOfContents.vibe';
/** Everything a document needs to render its nodes with the site's styling. */
export type DocViewConfig = Readonly<{
    pageId: string;
    idByHeading: HeadingIds;
    renderCopyButton: CodeBlock.RenderCopyButton;
    renderHeadingLink: RenderHeadingLink;
}>;
/**
 * The site's markdown node views. Every node not overridden here keeps the
 * package's unstyled semantic default. Headings resolve their id from the shared
 * map so anchors and the sidebar agree; code blocks and headings carry the copy
 * affordances and search attributes the hand-written prose helpers produce.
 */
export declare const docViews: (config: DocViewConfig) => Partial<Markdown.Views>;
