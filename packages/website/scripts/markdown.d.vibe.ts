import { type AppRoute } from '../src/route.vibe';
import { type PageMetadata } from './metadata.vibe';
export { extractMarkdownFromRenderedDocument } from './markdownDocument.ts';
export declare const urlPathToMarkdownPath: (urlPath: string) => string;
export declare const shouldExportMarkdown: (route: AppRoute) => boolean;
export type LlmsIndexEntry = Readonly<{
    urlPath: string;
    metadata: PageMetadata;
}>;
/**
 * Every section a page can report, in the order sections appear in `llms.txt`
 * and `llms-full.txt`. A section missing from this list ranks last, so adding a
 * new one here is part of adding it to {@link PageMetadata}.
 */
export declare const SECTION_ORDER: ReadonlyArray<string>;
export declare const buildLlmsIndex: (entries: ReadonlyArray<LlmsIndexEntry>) => string;
export type LlmsFullEntry = Readonly<{
    urlPath: string;
    metadata: PageMetadata;
    markdown: string;
    orderIndex: number;
}>;
export declare const buildLlmsFull: (entries: ReadonlyArray<LlmsFullEntry>, generatedDate: string) => string;
