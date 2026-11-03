import { Option } from 'effect';
import type { Html } from 'foldkit/html';
import type { Inline } from '@foldkit/markdown';
/**
 * Flattens inline markdown content to its plain text, dropping formatting. Used
 * to derive heading ids, heading aria labels, and table of contents entry text
 * from a heading's inline content.
 */
export declare const inlineToText: (content: ReadonlyArray<Inline>) => string;
/**
 * Derives a URL fragment id from heading text: lowercased, with apostrophes
 * dropped, every run of non-alphanumeric characters collapsed to a single dash,
 * and surrounding dashes trimmed. `"HTTP Requests"` becomes `"http-requests"`.
 * Apostrophes go before the collapse so a contraction stays one word:
 * `"Don’t Compute in Update"` becomes `"dont-compute-in-update"`, not
 * `"don-t-compute-in-update"`.
 */
export declare const slugify: (text: string) => string;
/**
 * Reads an optional trailing `{#custom-id}` override off a heading's inline
 * content. The override counts only when the marker is the heading's terminal
 * plain-text run: `## createLazy {#create-lazy}` returns
 * `{ maybeId: Some("create-lazy"), text: "createLazy" }`. A marker nested inside
 * emphasis or inline code (`## **Use {#use}**`) is left as ordinary text, because
 * the rendered heading can only strip a terminal plain-text marker. Returning
 * `{ maybeId: None, text: <the whole flattened heading> }` there keeps the derived
 * id and the visible heading in agreement. The override pins an anchor that
 * `slugify` alone would not produce.
 */
export declare const parseHeadingId: (content: ReadonlyArray<Inline>) => Readonly<{
    maybeId: Option.Option<string>;
    text: string;
}>;
/**
 * Drops a trailing `{#custom-id}` marker from a heading's rendered inline content,
 * leaving inline formatting intact. The marker is plain text, so it is always the
 * final string element: `["Use ", codeHtml, " {#lazy}"]` becomes `["Use ",
 * codeHtml]`.
 */
export declare const stripHeadingIdMarker: (content: ReadonlyArray<Html | string>) => ReadonlyArray<Html | string>;
