import { Option } from "effect";
/**
 * One compiled snippet: `raw` is the verbatim source for the copy button,
 * `highlighted` is the build-time Shiki HTML rendered through `h.InnerHTML`.
 */
export type Snippet = Readonly<{
    raw: string;
    highlighted: string;
    language: string;
}>;
/**
 * Looks up a compiled snippet by its file basename, for example
 * `"counterCommands"` for `src/snippet/counterCommands.ts`.
 */
export declare const lookupSnippet: (name: string) => Option.Option<Snippet>;
