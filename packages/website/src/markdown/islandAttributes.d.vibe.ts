import { Schema } from "effect";
/**
 * Attribute schemas for every markdown island directive used on the site. One
 * record drives both halves of the pipeline: the markdown Vite plugin validates
 * each directive against it at build time (unknown names, unknown attributes,
 * and attribute values outside the schema all fail the build), and `islandsFor`
 * decodes attributes with it before dispatching to the matching island view.
 *
 * Kept dependency-light (Schema only) so `vite.config.ts` and `vitest.config.ts`
 * can import it without pulling in the browser view layer.
 */
export declare const islandAttributes: {
    Snippet: Schema.Struct<{
        readonly name: Schema.String;
        readonly label: Schema.String;
        readonly class: Schema.optionalKey<Schema.String>;
    }>;
    Info: Schema.Struct<{
        readonly label: Schema.String;
    }>;
    Warning: Schema.Struct<{
        readonly label: Schema.String;
    }>;
    Cta: Schema.Struct<{}>;
    Demo: Schema.Struct<{
        readonly name: Schema.String;
    }>;
    Faq: Schema.Struct<{
        readonly id: Schema.String;
        readonly question: Schema.String;
    }>;
};
