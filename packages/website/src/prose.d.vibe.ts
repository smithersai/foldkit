import { Html, type HtmlBuilder } from 'foldkit/html';
import { type TableOfContentsEntry } from './tableOfContentsEntry.js';
/**
 * Builds the copy-link control beside a section heading.
 *
 * A page rendered through `h.submodel` receives one of these from the boundary
 * that owns the heading-link Message. An element dispatches through the frame
 * where it is built, so the renderer keeps that ownership explicit.
 */
export type RenderHeadingLink = (id: string, text: string) => Html;
/**
 * Builds a copy-link renderer for the supplied Message boundary.
 */
export declare const renderHeadingLink: <Message>(toMessage: (id: string) => Message, h: HtmlBuilder<Message>) => RenderHeadingLink;
export declare const link: (href: string, text: string) => Html;
export declare const pageTitle: (id: string, text: string, className?: string) => Html;
/**
 * Renders a linkable section heading (`h2` through `h6`) with the hover anchor
 * button. `ariaText` labels the copy-link control; `content` is the heading's
 * rendered inline content, so a heading may carry inline code or emphasis.
 */
export declare const headingWithContent: (level: 'h2' | 'h3' | 'h4' | 'h5' | 'h6', id: string, ariaText: string, content: ReadonlyArray<string | Html>, renderHeadingLink: RenderHeadingLink) => Html;
export declare const para: (...content: ReadonlyArray<string | Html>) => Html;
export declare const subPara: (...content: ReadonlyArray<string | Html>) => Html;
/**
 * The heading helpers bound to a page-supplied copy-link renderer, for a page
 * rendered inside a Submodel. Bind once at the top of the view and the call
 * sites below it are unchanged.
 */
export declare const headingsFor: (renderHeadingLink: RenderHeadingLink) => {
    heading: (level: 'h2' | 'h3' | 'h4', id: string, text: string) => Html;
    tableOfContentsEntryToHeader: (entry: TableOfContentsEntry) => Html;
};
export declare const bullets: (...items: ReadonlyArray<string | Html>) => Html;
export declare const bulletPoint: (label: string, description: string) => Html;
export declare const inlineCode: (text: string, className?: string) => Html;
export declare const infoCallout: (label: string, ...content: ReadonlyArray<string | Html>) => Html;
export declare const demoContainer: (...content: ReadonlyArray<Html>) => Html;
export declare const warningCallout: (label: string, ...content: ReadonlyArray<string | Html>) => Html;
/**
 * An informational callout wrapping block content (paragraphs, lists, code
 * blocks). The `:::Info` markdown island renders through this.
 */
export declare const infoCalloutBlocks: (label: string, blocks: ReadonlyArray<Html>) => Html;
/**
 * A cautionary callout wrapping block content. The `:::Warning` markdown island
 * renders through this.
 */
export declare const warningCalloutBlocks: (label: string, blocks: ReadonlyArray<Html>) => Html;
/**
 * A centered, monospaced figure for ASCII diagrams. The `diagram` fenced code
 * block in markdown renders through this. It carries no copy affordance because
 * the content is a picture, not code to lift.
 */
export declare const diagram: (content: string) => Html;
/**
 * A wrapping row of call-to-action links. The `:::Cta` markdown island renders
 * its link paragraphs through this, laying them out as a row and lifting the
 * links to medium weight.
 */
export declare const ctaLinks: (blocks: ReadonlyArray<Html>) => Html;
