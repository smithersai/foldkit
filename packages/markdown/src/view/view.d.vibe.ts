import { Html } from 'foldkit/html';
import { Alignment, Blockquote, CodeBlock, Emphasis, HardBreak, Heading, Image, InlineCode, Link, List, ListItem, MarkdownDocument, Paragraph, Strikethrough, Strong, Table, TableCell, TableRow, Text, ThematicBreak } from '../ast/index.js';
import type { IslandDefinitions } from '../island/index.js';
/** Rendered inline content, ready to pass as element children. */
export type InlineContent = ReadonlyArray<Html | string>;
/**
 * Renders one island directive. Receives the directive's attributes, the
 * rendered nested blocks (empty for leaf directives), and the zero-based
 * occurrence of this island name in the document, in document order. Use the
 * occurrence index to derive identifiers that must be unique per instance,
 * such as an `h.submodel` slotId.
 */
export type IslandView = (attributes: Readonly<globalThis.Record<string, string>>, content: ReadonlyArray<Html>, occurrenceIndex: number) => Html;
/** Island views by directive name. */
export type Islands = Readonly<globalThis.Record<string, IslandView>>;
/**
 * One typed island view per definition. Each view receives its attributes
 * already decoded through the island's schema, so the record is exhaustive
 * over the declared island names by construction.
 */
export type IslandViewsFor<Definitions extends IslandDefinitions> = Readonly<{
    [Name in keyof Definitions]: (attributes: Definitions[Name]['Type'], content: ReadonlyArray<Html>, occurrenceIndex: number) => Html;
}>;
/**
 * One view function per markdown node. Container nodes receive their already
 * rendered content alongside the node itself. Code blocks additionally receive
 * their zero-based occurrence index in document order so consumers can derive
 * stable per-instance identifiers.
 */
export type Views = Readonly<{
    Text: (text: Text) => Html | string;
    InlineCode: (inlineCode: InlineCode) => Html;
    HardBreak: (hardBreak: HardBreak) => Html;
    Emphasis: (emphasis: Emphasis, content: InlineContent) => Html;
    Strong: (strong: Strong, content: InlineContent) => Html;
    Strikethrough: (strikethrough: Strikethrough, content: InlineContent) => Html;
    Link: (link: Link, content: InlineContent) => Html;
    Image: (image: Image) => Html;
    Heading: (heading: Heading, content: InlineContent) => Html;
    Paragraph: (paragraph: Paragraph, content: InlineContent) => Html;
    CodeBlock: (codeBlock: CodeBlock, occurrenceIndex: number) => Html;
    List: (list: List, items: ReadonlyArray<Html>) => Html;
    ListItem: (listItem: ListItem, blocks: ReadonlyArray<Html>) => Html;
    Blockquote: (blockquote: Blockquote, blocks: ReadonlyArray<Html>) => Html;
    ThematicBreak: (thematicBreak: ThematicBreak) => Html;
    Table: (table: Table, headerRow: Html, bodyRows: ReadonlyArray<Html>) => Html;
    TableRow: (tableRow: TableRow, cells: ReadonlyArray<Html>) => Html;
    TableCell: (tableCell: TableCell, content: InlineContent, alignment: Alignment, isHeader: boolean) => Html;
}>;
/** Configuration for {@link view} and {@link viewBlocks}. */
export type ViewConfig = Readonly<{
    islands?: Islands | undefined;
    views?: Partial<Views> | undefined;
}>;
/**
 * Unstyled semantic defaults for every markdown node. Spread these into your
 * own record and replace the nodes you want to restyle:
 *
 * @example
 * ```typescript
 * const blogViews: Markdown.Views = {
 *   ...Markdown.defaultViews,
 *   Paragraph: (paragraph, content) =>
 *     ih.p([ih.Class('leading-relaxed text-stone-700')], content),
 * }
 * ```
 */
export declare const defaultViews: Views;
/**
 * Pairs island attribute schemas with typed views, producing the plain
 * {@link Islands} record the fold consumes. Attributes decode through each
 * island's schema before dispatch, and the views record must cover every
 * declared island name. Pass the same definitions to the markdown Vite
 * plugin's `islands` option so invalid directives fail the build instead of
 * reaching this decode.
 */
export declare const islandsFor: <const Definitions extends IslandDefinitions>(definitions: Definitions, islandViews: IslandViewsFor<Definitions>) => Islands;
/**
 * Folds a document into one Html node per top-level block. Use this when the
 * blocks should land directly inside your own container element.
 */
export declare const viewBlocks: (document: MarkdownDocument, config?: ViewConfig) => ReadonlyArray<Html>;
/**
 * Folds a document into a single Html tree. Every node renders through
 * {@link defaultViews} unless overridden in `config.views`, and every Island
 * directive renders through the matching entry in `config.islands`.
 */
export declare const view: (document: MarkdownDocument, config?: ViewConfig) => Html;
