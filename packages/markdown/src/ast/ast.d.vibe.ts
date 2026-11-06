import { Option, Schema } from 'effect';
import type { Array, SchemaAST } from 'effect';
/** Plain text. */
export type Text = Readonly<{
    _tag: 'Text';
    value: string;
}>;
/** Inline code span. */
export type InlineCode = Readonly<{
    _tag: 'InlineCode';
    value: string;
}>;
/** Hard line break. */
export type HardBreak = Readonly<{
    _tag: 'HardBreak';
}>;
/** Emphasized content, usually rendered as `em`. */
export type Emphasis = Readonly<{
    _tag: 'Emphasis';
    content: ReadonlyArray<Inline>;
}>;
/** Strongly emphasized content, usually rendered as `strong`. */
export type Strong = Readonly<{
    _tag: 'Strong';
    content: ReadonlyArray<Inline>;
}>;
/** Struck-through content, usually rendered as `del`. */
export type Strikethrough = Readonly<{
    _tag: 'Strikethrough';
    content: ReadonlyArray<Inline>;
}>;
/** Hyperlink with inline content. */
export type Link = Readonly<{
    _tag: 'Link';
    url: string;
    maybeTitle: Option.Option<string>;
    content: ReadonlyArray<Inline>;
}>;
/** Image with alt text. */
export type Image = Readonly<{
    _tag: 'Image';
    url: string;
    alt: string;
    maybeTitle: Option.Option<string>;
}>;
/** Any inline node. */
export type Inline = Text | InlineCode | HardBreak | Emphasis | Strong | Strikethrough | Link | Image;
/** The wire form of {@link Inline}, as emitted into compiled markdown modules. */
export type InlineEncoded = Readonly<{
    _tag: 'Text';
    value: string;
}> | Readonly<{
    _tag: 'InlineCode';
    value: string;
}> | Readonly<{
    _tag: 'HardBreak';
}> | Readonly<{
    _tag: 'Emphasis';
    content: ReadonlyArray<InlineEncoded>;
}> | Readonly<{
    _tag: 'Strong';
    content: ReadonlyArray<InlineEncoded>;
}> | Readonly<{
    _tag: 'Strikethrough';
    content: ReadonlyArray<InlineEncoded>;
}> | Readonly<{
    _tag: 'Link';
    url: string;
    maybeTitle: string | null | undefined;
    content: ReadonlyArray<InlineEncoded>;
}> | Readonly<{
    _tag: 'Image';
    url: string;
    alt: string;
    maybeTitle: string | null | undefined;
}>;
/** Schema for {@link Text}. */
export declare const Text: import("foldkit/schema").CallableTaggedStruct<"Text", {
    value: Schema.String;
}>;
/** Schema for {@link InlineCode}. */
export declare const InlineCode: import("foldkit/schema").CallableTaggedStruct<"InlineCode", {
    value: Schema.String;
}>;
/** Schema for {@link HardBreak}. */
export declare const HardBreak: import("foldkit/schema").CallableTaggedStruct<"HardBreak", {}>;
/** Schema for {@link Inline}. */
export declare const Inline: Schema.Codec<Inline, InlineEncoded>;
/** Schema for {@link Emphasis}. */
export declare const Emphasis: import("foldkit/schema").CallableTaggedStruct<"Emphasis", {
    content: Schema.$Array<Schema.Codec<Inline, InlineEncoded, never, never>>;
}>;
/** Schema for {@link Strong}. */
export declare const Strong: import("foldkit/schema").CallableTaggedStruct<"Strong", {
    content: Schema.$Array<Schema.Codec<Inline, InlineEncoded, never, never>>;
}>;
/** Schema for {@link Strikethrough}. */
export declare const Strikethrough: import("foldkit/schema").CallableTaggedStruct<"Strikethrough", {
    content: Schema.$Array<Schema.Codec<Inline, InlineEncoded, never, never>>;
}>;
/** Schema for {@link Link}. */
export declare const Link: import("foldkit/schema").CallableTaggedStruct<"Link", {
    url: Schema.String;
    maybeTitle: Schema.OptionFromNullishOr<Schema.String>;
    content: Schema.$Array<Schema.Codec<Inline, InlineEncoded, never, never>>;
}>;
/** Schema for {@link Image}. */
export declare const Image: import("foldkit/schema").CallableTaggedStruct<"Image", {
    url: Schema.String;
    alt: Schema.String;
    maybeTitle: Schema.OptionFromNullishOr<Schema.String>;
}>;
/** Heading depth, `1` through `6`. */
export declare const HeadingLevel: Schema.Literals<readonly [1, 2, 3, 4, 5, 6]>;
export type HeadingLevel = typeof HeadingLevel.Type;
/** Column alignment of a table, from the delimiter row of the source. */
export declare const Alignment: Schema.Literals<readonly ["None", "Left", "Center", "Right"]>;
export type Alignment = typeof Alignment.Type;
/** Section heading. */
export type Heading = Readonly<{
    _tag: 'Heading';
    level: HeadingLevel;
    content: ReadonlyArray<Inline>;
}>;
/** Paragraph of inline content. */
export type Paragraph = Readonly<{
    _tag: 'Paragraph';
    content: ReadonlyArray<Inline>;
}>;
/** Fenced code block. `maybeMeta` carries everything after the language on the opening fence. */
export type CodeBlock = Readonly<{
    _tag: 'CodeBlock';
    maybeLanguage: Option.Option<string>;
    maybeMeta: Option.Option<string>;
    value: string;
}>;
/** Single list item holding block content, so lists nest. */
export type ListItem = Readonly<{
    _tag: 'ListItem';
    blocks: ReadonlyArray<Block>;
}>;
/** Ordered or unordered list. */
export type List = Readonly<{
    _tag: 'List';
    isOrdered: boolean;
    maybeStartNumber: Option.Option<number>;
    items: Array.NonEmptyReadonlyArray<ListItem>;
}>;
/** Block quotation holding block content. */
export type Blockquote = Readonly<{
    _tag: 'Blockquote';
    blocks: ReadonlyArray<Block>;
}>;
/** Thematic break, usually rendered as `hr`. */
export type ThematicBreak = Readonly<{
    _tag: 'ThematicBreak';
}>;
/** Single table cell of inline content. */
export type TableCell = Readonly<{
    _tag: 'TableCell';
    content: ReadonlyArray<Inline>;
}>;
/** Single table row. */
export type TableRow = Readonly<{
    _tag: 'TableRow';
    cells: ReadonlyArray<TableCell>;
}>;
/** GFM table. The first source row is the header row. */
export type Table = Readonly<{
    _tag: 'Table';
    alignments: ReadonlyArray<Alignment>;
    headerRow: TableRow;
    bodyRows: ReadonlyArray<TableRow>;
}>;
/**
 * Directive node reserved for live application views. A leaf directive
 * (`::Name{attr="value"}`) has no blocks; a container directive
 * (`:::Name` ... `:::`) carries its nested markdown as blocks.
 */
export type Island = Readonly<{
    _tag: 'Island';
    name: string;
    attributes: Readonly<Record<string, string>>;
    blocks: ReadonlyArray<Block>;
}>;
/** Any block node. */
export type Block = Heading | Paragraph | CodeBlock | List | Blockquote | ThematicBreak | Table | Island;
/** The wire form of {@link ListItem}. */
export type ListItemEncoded = Readonly<{
    _tag: 'ListItem';
    blocks: ReadonlyArray<BlockEncoded>;
}>;
/** The wire form of {@link TableCell}. */
export type TableCellEncoded = Readonly<{
    _tag: 'TableCell';
    content: ReadonlyArray<InlineEncoded>;
}>;
/** The wire form of {@link TableRow}. */
export type TableRowEncoded = Readonly<{
    _tag: 'TableRow';
    cells: ReadonlyArray<TableCellEncoded>;
}>;
/** The wire form of {@link Block}, as emitted into compiled markdown modules. */
export type BlockEncoded = Readonly<{
    _tag: 'Heading';
    level: HeadingLevel;
    content: ReadonlyArray<InlineEncoded>;
}> | Readonly<{
    _tag: 'Paragraph';
    content: ReadonlyArray<InlineEncoded>;
}> | Readonly<{
    _tag: 'CodeBlock';
    maybeLanguage: string | null | undefined;
    maybeMeta: string | null | undefined;
    value: string;
}> | Readonly<{
    _tag: 'List';
    isOrdered: boolean;
    maybeStartNumber: number | null | undefined;
    items: Array.NonEmptyReadonlyArray<ListItemEncoded>;
}> | Readonly<{
    _tag: 'Blockquote';
    blocks: ReadonlyArray<BlockEncoded>;
}> | Readonly<{
    _tag: 'ThematicBreak';
}> | Readonly<{
    _tag: 'Table';
    alignments: ReadonlyArray<Alignment>;
    headerRow: TableRowEncoded;
    bodyRows: ReadonlyArray<TableRowEncoded>;
}> | Readonly<{
    _tag: 'Island';
    name: string;
    attributes: Readonly<Record<string, string>>;
    blocks: ReadonlyArray<BlockEncoded>;
}>;
/** Schema for {@link Block}. */
export declare const Block: Schema.Codec<Block, BlockEncoded>;
/** Schema for {@link Heading}. */
export declare const Heading: import("foldkit/schema").CallableTaggedStruct<"Heading", {
    level: Schema.Literals<readonly [1, 2, 3, 4, 5, 6]>;
    content: Schema.$Array<Schema.Codec<Inline, InlineEncoded, never, never>>;
}>;
/** Schema for {@link Paragraph}. */
export declare const Paragraph: import("foldkit/schema").CallableTaggedStruct<"Paragraph", {
    content: Schema.$Array<Schema.Codec<Inline, InlineEncoded, never, never>>;
}>;
/** Schema for {@link CodeBlock}. */
export declare const CodeBlock: import("foldkit/schema").CallableTaggedStruct<"CodeBlock", {
    maybeLanguage: Schema.OptionFromNullishOr<Schema.String>;
    maybeMeta: Schema.OptionFromNullishOr<Schema.String>;
    value: Schema.String;
}>;
/** Schema for {@link ListItem}. */
export declare const ListItem: import("foldkit/schema").CallableTaggedStruct<"ListItem", {
    blocks: Schema.$Array<Schema.Codec<Block, BlockEncoded, never, never>>;
}>;
/** Schema for {@link List}. */
export declare const List: import("foldkit/schema").CallableTaggedStruct<"List", {
    isOrdered: Schema.Boolean;
    maybeStartNumber: Schema.OptionFromNullishOr<Schema.Number>;
    items: Schema.NonEmptyArray<import("foldkit/schema").CallableTaggedStruct<"ListItem", {
        blocks: Schema.$Array<Schema.Codec<Block, BlockEncoded, never, never>>;
    }>>;
}>;
/** Schema for {@link Blockquote}. */
export declare const Blockquote: import("foldkit/schema").CallableTaggedStruct<"Blockquote", {
    blocks: Schema.$Array<Schema.Codec<Block, BlockEncoded, never, never>>;
}>;
/** Schema for {@link ThematicBreak}. */
export declare const ThematicBreak: import("foldkit/schema").CallableTaggedStruct<"ThematicBreak", {}>;
/** Schema for {@link TableCell}. */
export declare const TableCell: import("foldkit/schema").CallableTaggedStruct<"TableCell", {
    content: Schema.$Array<Schema.Codec<Inline, InlineEncoded, never, never>>;
}>;
/** Schema for {@link TableRow}. */
export declare const TableRow: import("foldkit/schema").CallableTaggedStruct<"TableRow", {
    cells: Schema.$Array<import("foldkit/schema").CallableTaggedStruct<"TableCell", {
        content: Schema.$Array<Schema.Codec<Inline, InlineEncoded, never, never>>;
    }>>;
}>;
/** Schema for {@link Table}. */
export declare const Table: import("foldkit/schema").CallableTaggedStruct<"Table", {
    alignments: Schema.$Array<Schema.Literals<readonly ["None", "Left", "Center", "Right"]>>;
    headerRow: import("foldkit/schema").CallableTaggedStruct<"TableRow", {
        cells: Schema.$Array<import("foldkit/schema").CallableTaggedStruct<"TableCell", {
            content: Schema.$Array<Schema.Codec<Inline, InlineEncoded, never, never>>;
        }>>;
    }>;
    bodyRows: Schema.$Array<import("foldkit/schema").CallableTaggedStruct<"TableRow", {
        cells: Schema.$Array<import("foldkit/schema").CallableTaggedStruct<"TableCell", {
            content: Schema.$Array<Schema.Codec<Inline, InlineEncoded, never, never>>;
        }>>;
    }>>;
}>;
/** Schema for {@link Island}. */
export declare const Island: import("foldkit/schema").CallableTaggedStruct<"Island", {
    name: Schema.String;
    attributes: Schema.$Record<Schema.String, Schema.String>;
    blocks: Schema.$Array<Schema.Codec<Block, BlockEncoded, never, never>>;
}>;
/** A compiled markdown document: the block sequence of one source file. */
export declare const MarkdownDocument: Schema.Struct<{
    readonly blocks: Schema.$Array<Schema.Codec<Block, BlockEncoded, never, never>>;
}>;
export type MarkdownDocument = typeof MarkdownDocument.Type;
/** The wire form of {@link MarkdownDocument}. */
export type MarkdownDocumentEncoded = typeof MarkdownDocument.Encoded;
/**
 * Decodes the default export of a compiled markdown module into a typed
 * {@link MarkdownDocument}. Throws on input outside the markdown vocabulary.
 *
 * Results are memoized on a `WeakMap` keyed by the wire object, so decoding the
 * same compiled module again returns the document from the first decode. A
 * module's wire object is immutable build output and the decode is
 * deterministic, so a cached document can never disagree with a fresh one, and
 * each entry is collected along with the module holding its key. Calling this
 * from a view costs one decode per module rather than one per render.
 *
 * Passing `overrideOptions` bypasses the cache both ways: the decode ignores
 * cached entries and its result is not stored, since a document decoded under
 * one set of options cannot answer for another.
 */
export declare const decodeDocument: (wire: unknown, overrideOptions?: SchemaAST.ParseOptions) => MarkdownDocument;
/** Encodes a {@link MarkdownDocument} into its JSON-safe wire form. */
export declare const encodeDocument: (input: {
    readonly blocks: readonly Block[];
}, options?: SchemaAST.ParseOptions) => {
    readonly blocks: readonly BlockEncoded[];
};
