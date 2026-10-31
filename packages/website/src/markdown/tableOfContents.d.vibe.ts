import type { Heading, MarkdownDocument } from '@foldkit/markdown';
import type { TableOfContentsEntry } from '../tableOfContentsEntry.js';
/** Stable heading ids by node identity, shared by the view and the extractor. */
export type HeadingIds = ReadonlyMap<Heading, string>;
/** The extracted table of contents plus the id assigned to every heading. */
export type CollectedHeadings = Readonly<{
    tableOfContents: ReadonlyArray<TableOfContentsEntry>;
    idByHeading: HeadingIds;
}>;
/**
 * Walks a document's top-level blocks, assigns a slug id to every heading
 * (deduplicating repeats within the document), and returns both the id map and
 * the `h2`–`h4` table of contents the sidebar consumes. Assigning ids here, once
 * per document, keeps the heading view and the sidebar in agreement by
 * construction.
 */
export declare const collectHeadings: (document: MarkdownDocument) => CollectedHeadings;
/** Resolves a heading's id from the shared map, falling back to a fresh slug. */
export declare const headingId: (idByHeading: HeadingIds, heading: Heading) => string;
