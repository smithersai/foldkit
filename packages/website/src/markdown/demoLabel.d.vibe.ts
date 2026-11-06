import type { MarkdownDocument } from '@foldkit/markdown';
import type { HeadingIds } from './tableOfContents.vibe';
/** The id of the heading each `::Demo` island sits under, by the demo's name. */
export type DemoLabels = ReadonlyMap<string, string>;
/**
 * Pairs every `::Demo` island with the heading it sits under, so the island view
 * can render the demo as a region labelled by that heading. Ids come from the map
 * {@link collectHeadings} already assigned rather than a second slug pass, so a
 * demo's label cannot drift from the heading it points at. A demo with no heading
 * above it is absent from the map and renders unlabelled.
 */
export declare const collectDemoLabels: (document: MarkdownDocument, idByHeading: HeadingIds) => DemoLabels;
