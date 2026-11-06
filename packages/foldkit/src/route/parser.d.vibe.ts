import { Array, Effect, Record, Schema } from 'effect';
import { Url } from '../url/index.vibe';
declare const ParseError_base: new <A extends Record<string, any> = {}>(args: import("effect/Types").VoidIfEmpty<{ readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }>) => import("effect/Cause").YieldableError & {
    readonly _tag: "ParseError";
} & Readonly<A>;
/**
 * Error type for route parsing failures.
 *
 * Includes optional `expected`, `actual`, and `position` fields for
 * diagnostic context when a URL segment does not match.
 */
export declare class ParseError extends ParseError_base<{
    readonly message: string;
    readonly expected?: string;
    readonly actual?: string;
    readonly position?: number;
}> {
}
/**
 * The result of parsing: a tuple of the parsed value and remaining URL segments.
 */
export type ParseResult<A> = [A, ReadonlyArray<string>];
type PrintState = {
    segments: ReadonlyArray<string>;
    queryParams: URLSearchParams;
};
/**
 * A bidirectional parser that can both parse URL segments into a value
 * and print a value back to URL segments.
 */
export type Biparser<A> = {
    parse: (segments: ReadonlyArray<string>, search?: string) => Effect.Effect<ParseResult<A>, ParseError>;
    print: (value: A, state: PrintState) => Effect.Effect<PrintState, ParseError>;
};
type BuildFn<A> = A extends {
    _tag: string;
} ? keyof Omit<A, '_tag'> extends never ? (value?: Omit<A, '_tag'>) => string : (value: Omit<A, '_tag'>) => string : never;
/**
 * A parser with a `build` method that can reconstruct URLs from parsed values.
 *
 * Created by applying `mapTo` to a `Biparser`, binding it to a tagged
 * type constructor so parsed values carry a discriminant tag and URLs can be
 * built from tag payloads.
 *
 * Routers are callable — `homeRouter()` or `personRouter({ id: 42 })` —
 * and also expose `.build` as an alias and `.parse` for URL matching.
 */
export type Router<A> = BuildFn<A> & {
    parse: (segments: ReadonlyArray<string>, search?: string) => Effect.Effect<ParseResult<A>, ParseError>;
    build: BuildFn<A>;
};
/**
 * A `Biparser` that has been terminated (e.g. by `query` or `rest`)
 * and cannot be extended with `slash`.
 */
export type TerminalParser<A> = Biparser<A> & {
    readonly __terminal: true;
};
/**
 * A `Biparser` that can still be extended with `slash`. Terminal parsers
 * (`query`, `rest`) do not qualify, since nothing can follow them in
 * the path.
 */
export type ExtendableBiparser<A> = Biparser<A> & {
    readonly __terminal?: never;
    readonly 'Cannot use slash after a terminal parser - nothing can follow query or rest'?: never;
};
/**
 * Creates a parser that matches an exact URL path segment.
 *
 * @example
 * ```ts
 * literal('users') // matches /users
 * ```
 */
export declare const literal: (segment: string) => Biparser<{}>;
/**
 * Creates a parser for a dynamic URL segment with custom parse and print functions.
 *
 * @param label - A descriptive name used in error messages.
 * @param parse - Converts a raw URL segment string into the parsed value.
 * @param print - Converts the parsed value back into a URL segment string.
 */
export declare const param: <A>(label: string, parse: (segment: string) => Effect.Effect<A, ParseError>, print: (value: A) => string) => Biparser<A>;
/**
 * Creates a parser that captures a URL segment as a named string field.
 *
 * @example
 * ```ts
 * string('slug') // parses /hello into { slug: "hello" }
 * ```
 */
export declare const string: <K extends string>(name: K) => Biparser<Record<K, string>>;
/**
 * Creates a parser that captures a URL segment as a named integer field.
 *
 * Fails if the segment is not a valid integer.
 *
 * @example
 * ```ts
 * int('id') // parses /42 into { id: 42 }
 * ```
 */
export declare const int: <K extends string>(name: K) => Biparser<Record<K, number>>;
export declare const __isSingleSegment: (segment: string) => boolean;
/**
 * Creates a parser that captures a URL segment and decodes it through an
 * Effect `Schema`, producing a named field of the schema's decoded type.
 *
 * Decodes the raw segment when parsing and encodes the value back when
 * printing, so branded ids, refined strings, and string-literal unions
 * round-trip through the route. The decoded type flows straight into the
 * route value, so a model carries `UserId` rather than a bare `string`.
 *
 * The schema's encoded form must be a single URL segment string. For shapes
 * that span multiple segments or live in the query string, use `rest` or
 * `query`.
 *
 * @example
 * ```ts
 * const UserId = Schema.String.pipe(Schema.brand('UserId'))
 * pipe(literal('users'), slash(schemaSegment('userId', UserId)), mapTo(UserRoute))
 * // parses /users/abc into { _tag: 'UserRoute', userId: UserId.make('abc') }
 * ```
 *
 * @param name - The field name the decoded value is captured under.
 * @param schema - A codec whose encoded form is a single URL segment string.
 */
export declare const schemaSegment: <K extends string, A, I extends string>(name: K, schema: Schema.Codec<A, I>) => Biparser<Record<K, A>>;
/**
 * A parser that matches the root path with no remaining segments.
 *
 * Succeeds only when the URL path is exactly `/`.
 */
export declare const root: Biparser<{}>;
/**
 * Creates a parser that captures all remaining URL segments as a named
 * non-empty array field.
 *
 * Requires at least one remaining segment. A bare prefix like `/files`
 * does not match; give it its own route alongside the rest route.
 *
 * A rest route also matches every URL that a more specific route under
 * the same prefix accepts, so in `oneOf` the specific route must come
 * first.
 *
 * Nothing can follow `rest` in the path, so the result is a
 * `TerminalParser`. It can still be extended with `query`.
 *
 * @example
 * ```ts
 * pipe(literal('files'), slash(rest('path')))
 * // parses /files/documents/taxes/2024.pdf
 * // into { path: ['documents', 'taxes', '2024.pdf'] }
 * ```
 */
export declare const rest: <K extends string>(name: K) => TerminalParser<Record<K, Array.NonEmptyReadonlyArray<string>>>;
/**
 * Creates a parser that captures all remaining URL segments as a single
 * named string field, preserving the slashes between them.
 *
 * Where `rest` yields a `NonEmptyArray` of segments, `restString` rejoins
 * the tail into one raw path string, so a value that itself contains both
 * slashes and dots, like a repository-relative file path
 * `documents/taxes/2024.pdf`, round-trips through the bidirectional router
 * as `{ path: string }` route data.
 *
 * Requires at least one remaining segment. A bare prefix like `/vault`
 * does not match; give it its own route alongside the restString route.
 *
 * A restString route also matches every URL that a more specific route under
 * the same prefix accepts, so in `oneOf` the specific route must come first.
 *
 * Printing requires a normalized path: non-empty, with no leading,
 * trailing, or repeated slashes. Any other value would build a URL that
 * parses back differently, so printing fails instead of building it.
 *
 * Nothing can follow `restString` in the path, so the result is a
 * `TerminalParser`. It can still be extended with `query`.
 *
 * @example
 * ```ts
 * pipe(literal('vault'), slash(restString('path')))
 * // parses /vault/a/b/c.md   into { path: 'a/b/c.md' }
 * // builds { path: 'a/b/c.md' } into /vault/a/b/c.md
 * ```
 */
export declare const restString: <K extends string>(name: K) => TerminalParser<Record<K, string>>;
/**
 * A parse-only parser with no print/build capabilities.
 *
 * Returned by `oneOf`, which combines multiple parsers whose print
 * types may differ and therefore cannot be unified into a single `Biparser`.
 */
export type Parser<A> = {
    parse: (segments: ReadonlyArray<string>, search?: string) => Effect.Effect<ParseResult<A>, ParseError>;
};
type ParserInput = Biparser<any> | Parser<any>;
type InferParsed<P> = P extends Biparser<infer A> ? A : P extends Parser<infer A> ? A : never;
/**
 * Combines multiple parsers, trying each in order until one matches the
 * entire path.
 *
 * A parser only matches when it consumes every segment, so a route never
 * shadows a longer route that shares its prefix. When several parsers
 * fully match the same URL, the first one wins.
 *
 * Returns a `Parser` (parse-only) since the union of different route
 * shapes cannot provide a single unified print function.
 */
export declare const oneOf: <Parsers extends ReadonlyArray<ParserInput>>(...parsers: Parsers) => Parser<InferParsed<Parsers[number]>>;
/**
 * Converts a `Biparser` into a `Router` by mapping parsed values to a
 * tagged type constructor.
 *
 * The resulting `Router` can both parse URLs into tagged route values and
 * build URLs from route payloads.
 *
 * @example
 * ```ts
 * pipe(literal('users'), slash(int('id')), mapTo(UserRoute))
 * ```
 */
export declare const mapTo: {
    <T>(appRouteConstructor: {
        make: () => T;
    }): (parser: Biparser<{}>) => Router<T>;
    <A, T>(appRouteConstructor: {
        make: (data: A) => T;
    }): (parser: Biparser<A>) => Router<T>;
};
/**
 * Composes two `Biparser`s sequentially, combining their parsed values.
 *
 * Cannot be used after a terminal parser (`query` or `rest`).
 * Composing with a terminal second parser yields a `TerminalParser`,
 * so terminality survives the composition.
 *
 * @example
 * ```ts
 * pipe(literal('users'), slash(int('id'))) // matches /users/42
 * ```
 */
export declare const slash: {
    <A extends Record<string, unknown>, B extends Record<string, unknown>>(parserB: TerminalParser<A>): (parserA: ExtendableBiparser<B>) => TerminalParser<B & A>;
    <A extends Record<string, unknown>, B extends Record<string, unknown>>(parserB: Biparser<A>): (parserA: ExtendableBiparser<B>) => Biparser<B & A>;
};
/**
 * Adds query parameter parsing to a `Biparser` using an Effect `Schema`.
 *
 * Produces a `TerminalParser` that cannot be extended with `slash`,
 * since query parameters must appear at the end of a route definition.
 *
 * @example
 * ```ts
 * pipe(
 *   literal('search'),
 *   query(Schema.Struct({ q: Schema.String })),
 *   mapTo(SearchRoute),
 * )
 * ```
 *
 * @param schema - An Effect Schema describing the expected query parameters.
 */
export declare const query: <A, I extends Record.ReadonlyRecord<string, unknown>>(schema: Schema.Codec<A, I>) => <B extends Record<string, unknown>>(parser: Biparser<B>) => TerminalParser<B & A>;
/**
 * Parses a URL against a parser, falling back to a not-found route if no
 * parser matches.
 *
 * @param parser - The parser (typically from `oneOf`) to attempt.
 * @param notFoundRouteConstructor - Constructor called with `{ path }` when
 *   no route matches.
 */
export declare const parseUrlWithFallback: <A, B>(parser: Parser<A>, notFoundRouteConstructor: {
    make: (data: {
        path: string;
    }) => B;
}) => (url: Url) => A | B;
export {};
