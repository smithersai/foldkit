import { Schema, Types } from 'effect';
/** A `TaggedStruct` schema that can be called directly as a constructor: `Foo({ count: 1 })` instead of `Foo.make({ count: 1 })`. */
export type CallableTaggedStruct<Tag extends string, Fields extends Schema.Struct.Fields> = Schema.TaggedStruct<Tag, Fields> & (keyof Fields extends never ? (value?: Parameters<Schema.TaggedStruct<Tag, Fields>['make']>[0] | void) => Types.Simplify<Schema.Struct.Type<{
    readonly _tag: Schema.tag<Tag>;
} & Fields>> : (value: Parameters<Schema.TaggedStruct<Tag, Fields>['make']>[0]) => Types.Simplify<Schema.Struct.Type<{
    readonly _tag: Schema.tag<Tag>;
} & Fields>>);
type TaggedUnionProperty = keyof Schema.TaggedUnion<{}>;
type UnionProperty = TaggedUnionProperty | 'members' | 'subset';
type VariantNameCollision<Name extends PropertyKey> = Readonly<{
    'Variant names must not conflict with union properties': Name;
}>;
type ValidateVariantNames<CasesByTag extends Record<string, Schema.Struct.Fields>> = Extract<keyof CasesByTag, UnionProperty> extends infer Name ? [Name] extends [never] ? unknown : VariantNameCollision<Name & PropertyKey> : never;
type BaseTaggedUnion<CasesByTag extends Record<string, Schema.Struct.Fields>> = Schema.TaggedUnion<{
    readonly [Tag in keyof CasesByTag & string]: Schema.TaggedStruct<Tag, CasesByTag[Tag]>;
}>;
type TaggedUnionType<CasesByTag extends Record<string, Schema.Struct.Fields>> = BaseTaggedUnion<CasesByTag>['Type'];
type TaggedUnionMatchCases<CasesByTag extends Record<string, Schema.Struct.Fields>, Input extends TaggedUnionType<CasesByTag>, Output> = {
    readonly [Tag in keyof CasesByTag & string]: (value: Extract<Input, {
        readonly _tag: Tag;
    }>) => Output;
};
type TaggedUnionMatchOrElseCases<CasesByTag extends Record<string, Schema.Struct.Fields>, Input extends TaggedUnionType<CasesByTag>, Output> = {
    readonly [Tag in keyof CasesByTag & string]?: (value: Extract<Input, {
        readonly _tag: Tag;
    }>) => Output;
};
type TaggedUnionCaseReturns<Cases> = {
    [Tag in keyof Cases]-?: NonNullable<Cases[Tag]> extends (...args: never) => infer Output ? Output : never;
}[keyof Cases];
type TaggedUnionMatchOrElseOutput<Cases, OrElse> = TaggedUnionCaseReturns<Cases> | (OrElse extends (...args: never) => infer Output ? Output : never);
type TaggedUnionMatchOrElseHandledTags<CasesByTag extends Record<string, Schema.Struct.Fields>, Cases> = Extract<{
    [Tag in keyof Cases]-?: {} extends Pick<Cases, Tag> ? never : Tag;
}[keyof Cases], keyof CasesByTag & string>;
type ValidateTaggedUnionCases<CasesByTag extends Record<string, Schema.Struct.Fields>, Cases> = {
    readonly [Tag in Exclude<keyof Cases, keyof CasesByTag & string>]: never;
};
type TaggedUnionMatch<CasesByTag extends Record<string, Schema.Struct.Fields>> = {
    <Input extends TaggedUnionType<CasesByTag>, const Cases extends TaggedUnionMatchCases<CasesByTag, Input, unknown>>(value: Input, cases: Cases & ValidateTaggedUnionCases<CasesByTag, Cases>): TaggedUnionCaseReturns<Cases>;
    <const Cases extends TaggedUnionMatchCases<CasesByTag, TaggedUnionType<CasesByTag>, unknown>>(cases: Cases & ValidateTaggedUnionCases<CasesByTag, Cases>): (value: TaggedUnionType<CasesByTag>) => TaggedUnionCaseReturns<Cases>;
    <Output, Input extends TaggedUnionType<CasesByTag> = TaggedUnionType<CasesByTag>>(cases: TaggedUnionMatchCases<CasesByTag, Input, Output>): (value: Input) => Output;
    <Output, Input extends TaggedUnionType<CasesByTag> = TaggedUnionType<CasesByTag>>(value: Input, cases: TaggedUnionMatchCases<CasesByTag, Input, Output>): Output;
};
type TaggedUnionMatchOrElse<CasesByTag extends Record<string, Schema.Struct.Fields>> = {
    <Input extends TaggedUnionType<CasesByTag>, const Cases extends TaggedUnionMatchOrElseCases<CasesByTag, Input, unknown>, OrElse extends (value: Exclude<Input, {
        readonly _tag: TaggedUnionMatchOrElseHandledTags<CasesByTag, Cases>;
    }>) => unknown>(value: Input, cases: Cases & ValidateTaggedUnionCases<CasesByTag, Cases>, orElse: OrElse): TaggedUnionMatchOrElseOutput<Cases, OrElse>;
    <const Cases extends TaggedUnionMatchOrElseCases<CasesByTag, TaggedUnionType<CasesByTag>, unknown>, OrElse extends (value: Exclude<TaggedUnionType<CasesByTag>, {
        readonly _tag: TaggedUnionMatchOrElseHandledTags<CasesByTag, Cases>;
    }>) => unknown>(cases: Cases & ValidateTaggedUnionCases<CasesByTag, Cases>, orElse: OrElse): (value: TaggedUnionType<CasesByTag>) => TaggedUnionMatchOrElseOutput<Cases, OrElse>;
    <Output, Input extends TaggedUnionType<CasesByTag> = TaggedUnionType<CasesByTag>>(cases: TaggedUnionMatchOrElseCases<CasesByTag, Input, Output>, orElse: (value: Input) => Output): (value: Input) => Output;
    <Output, Input extends TaggedUnionType<CasesByTag> = TaggedUnionType<CasesByTag>>(value: Input, cases: TaggedUnionMatchOrElseCases<CasesByTag, Input, Output>, orElse: (value: Input) => Output): Output;
};
interface UnionSchema<CasesByTag extends Record<string, Schema.Struct.Fields>> extends Schema.BottomLazy<BaseTaggedUnion<CasesByTag>['ast'], UnionSchema<CasesByTag>> {
    readonly Type: BaseTaggedUnion<CasesByTag>['Type'];
    readonly Encoded: BaseTaggedUnion<CasesByTag>['Encoded'];
    readonly DecodingServices: BaseTaggedUnion<CasesByTag>['DecodingServices'];
    readonly EncodingServices: BaseTaggedUnion<CasesByTag>['EncodingServices'];
    readonly '~type.make.in': BaseTaggedUnion<CasesByTag>['~type.make.in'];
    readonly '~type.make': BaseTaggedUnion<CasesByTag>['~type.make'];
    readonly Iso: BaseTaggedUnion<CasesByTag>['Iso'];
    readonly match: TaggedUnionMatch<CasesByTag>;
}
type TaggedUnionMemberFor<CasesByTag extends Record<string, Schema.Struct.Fields>, Tag extends keyof CasesByTag & string> = CallableTaggedStruct<Tag, CasesByTag[Tag]>;
type TaggedUnionMember<CasesByTag extends Record<string, Schema.Struct.Fields>> = {
    readonly [Tag in keyof CasesByTag & string]: TaggedUnionMemberFor<CasesByTag, Tag>;
}[keyof CasesByTag & string];
type TaggedUnionSubsetMembers<CasesByTag extends Record<string, Schema.Struct.Fields>, Tags extends ReadonlyArray<keyof CasesByTag & string>> = {
    readonly [Index in keyof Tags]: Tags[Index] extends keyof CasesByTag & string ? TaggedUnionMemberFor<CasesByTag, Tags[Index]> : never;
};
interface RichUnionSchema<CasesByTag extends Record<string, Schema.Struct.Fields>> extends UnionSchema<CasesByTag> {
    readonly guards: BaseTaggedUnion<CasesByTag>['guards'];
    readonly isAnyOf: BaseTaggedUnion<CasesByTag>['isAnyOf'];
    readonly matchOrElse: TaggedUnionMatchOrElse<CasesByTag>;
    readonly members: ReadonlyArray<TaggedUnionMember<CasesByTag>>;
    /** Returns a Schema that accepts only the named variants. */
    readonly subset: <const Tags extends ReadonlyArray<keyof CasesByTag & string>>(tags: Tags) => Schema.Union<TaggedUnionSubsetMembers<CasesByTag, Tags>>;
}
/** The Schema returned by `defineTaggedUnion`. It includes callable variant
 * constructors, exhaustive `match`, partial `matchOrElse`, `guards`,
 * `isAnyOf`, `subset`, and `members`. With no output type argument, `match`
 * returns the union of the handler results. Pass an output type argument when
 * every handler must return that type. Pass a structurally refined union as
 * the optional second type argument to preserve narrower payload fields in
 * each handler. */
export type TaggedUnion<CasesByTag extends Record<string, Schema.Struct.Fields>> = RichUnionSchema<CasesByTag> & {
    readonly [Tag in keyof CasesByTag & string]: CallableTaggedStruct<Tag, CasesByTag[Tag]>;
};
/** The Schema returned by `defineMessageUnion`. Each variant is a callable
 * property on the union, and `match` handles the union exhaustively. With no
 * output type argument, `match` returns the union of the handler results. Pass
 * an output type argument when every handler must return that type. Pass a
 * structurally refined union as `match`'s optional second type argument to
 * preserve narrower payload fields in each handler. */
export type MessageUnion<CasesByTag extends Record<string, Schema.Struct.Fields>> = UnionSchema<CasesByTag> & {
    readonly [Tag in keyof CasesByTag & string]: CallableTaggedStruct<Tag, CasesByTag[Tag]>;
};
/** The Schema returned by `defineRouteUnion`. It has the same constructors and
 * helpers as `TaggedUnion`, with a Route-specific name for public signatures. */
export type RouteUnion<CasesByTag extends Record<string, Schema.Struct.Fields>> = TaggedUnion<CasesByTag>;
/**
 * Declares every Message variant in one object. Each key is a tag, and its
 * value lists that Message's fields.
 *
 * The result is both a Schema and a namespace. Construct a Message with a
 * variant such as `Message.ClickedReset()`, and handle every variant with
 * `Message.match`. Each constructor is also a Schema, so it can appear in a
 * `Command.define` `messages` list.
 *
 * Message unions intentionally expose only constructors and exhaustive
 * `match`. Use Effect `Match` when only some tags need handling or several tags
 * share one handler.
 *
 * Declare a Submodel's OutMessages in their own `defineMessageUnion`. Messages
 * are facts the Submodel handles; OutMessages are facts it reports to its
 * parent. Keep the two unions separate even when two variants carry the same
 * fields.
 *
 * A tag cannot use a name already owned by the union, such as `make`, `match`,
 * `matchOrElse`, `cases`, `ast`, `members`, or `subset`. TypeScript rejects
 * these names, and untyped calls throw an error.
 *
 * @example
 * ```typescript
 * export const Message = defineMessageUnion({
 *   ClickedReset: {},
 *   ChangedCount: { count: Schema.Number },
 * })
 * export type Message = typeof Message.Type
 *
 * Message.ClickedReset() // { _tag: 'ClickedReset' }
 * Message.ChangedCount({ count: 1 }) // { _tag: 'ChangedCount', count: 1 }
 * ```
 */
export declare function defineMessageUnion<const CasesByTag extends Record<string, Schema.Struct.Fields>>(casesByTag: CasesByTag & ValidateVariantNames<CasesByTag>): MessageUnion<CasesByTag>;
/**
 * Declares every variant of a domain union in one object. Use it for Model
 * states, submission results, filter modes, and other unions that are not
 * Messages or Routes.
 *
 * The result is both a Schema and a namespace. It provides:
 *
 * - One callable Schema constructor per variant.
 * - `match` for exhaustive handling.
 * - `matchOrElse` for selected variants with a fallback for the rest.
 * - `guards` and `isAnyOf` for variant checks.
 * - `subset` for a Schema that accepts only the named variants.
 * - `members` for APIs such as `Machine.define` that enumerate the union.
 *
 * Use `taggedStruct` when the variants cannot be declared together. Recursive
 * unions and standalone tagged structs are the common cases.
 *
 * A tag cannot use a name already owned by the union, such as `make`, `match`,
 * `matchOrElse`, `cases`, `ast`, `members`, or `subset`. TypeScript rejects
 * these names, and untyped calls throw an error.
 *
 * @example
 * ```typescript
 * export const Submission = defineTaggedUnion({
 *   NotSubmitted: {},
 *   Submitting: {},
 *   Succeeded: {},
 *   Failed: { error: Schema.String },
 * })
 * export type Submission = typeof Submission.Type
 *
 * Submission.NotSubmitted() // { _tag: 'NotSubmitted' }
 * Submission.Failed({ error: 'timeout' })
 * ```
 */
export declare function defineTaggedUnion<const CasesByTag extends Record<string, Schema.Struct.Fields>>(casesByTag: CasesByTag & ValidateVariantNames<CasesByTag>): TaggedUnion<CasesByTag>;
/**
 * Declares every application Route in one object. Each key is a tag, and its
 * value lists the fields parsed from the URL.
 *
 * The result is both a Schema and the `AppRoute` namespace. Each variant is a
 * callable Schema, so `AppRoute.Person` works with `mapTo` and
 * `parseUrlWithFallback`, while `AppRoute.Person({ personId: 42 })` constructs
 * a value.
 *
 * Use `match` to handle every Route, `matchOrElse` to handle selected Routes
 * with a fallback, `guards` or `isAnyOf` to check selected tags, and `subset`
 * when another Schema accepts only some Routes. A subset includes only the
 * tags named in the call. Adding a Route to `AppRoute` does not change an
 * existing subset.
 *
 * Routers remain separate. A Route is the parsed value; a Router describes the
 * URL that produces it.
 *
 * A tag cannot use a name already owned by the union, such as `make`, `match`,
 * `matchOrElse`, `cases`, `ast`, `members`, or `subset`. TypeScript rejects
 * these names, and untyped calls throw an error.
 *
 * @example
 * ```typescript
 * export const AppRoute = defineRouteUnion({
 *   Home: {},
 *   Person: { personId: Schema.Number },
 *   NotFound: { path: Schema.String },
 * })
 * export type AppRoute = typeof AppRoute.Type
 *
 * export const homeRouter = pipe(root, mapTo(AppRoute.Home))
 * export const personRouter = pipe(
 *   literal('people'),
 *   slash(int('personId')),
 *   mapTo(AppRoute.Person),
 * )
 *
 * export const urlToAppRoute = parseUrlWithFallback(
 *   oneOf(personRouter, homeRouter),
 *   AppRoute.NotFound,
 * )
 * ```
 */
export declare function defineRouteUnion<const CasesByTag extends Record<string, Schema.Struct.Fields>>(casesByTag: CasesByTag & ValidateVariantNames<CasesByTag>): RouteUnion<CasesByTag>;
/**
 * Declares one tagged struct as a callable Schema. Call `Loading()` instead of
 * `Loading.make()`.
 *
 * Prefer `defineTaggedUnion` when every variant can be declared together. Use
 * `taggedStruct` for a recursive union, a union assembled across modules, a
 * tagged child struct that is not a union variant, or a variant created inside
 * a generic Schema factory.
 *
 * @example
 * ```typescript
 * const Loading = taggedStruct('Loading')
 * Loading() // { _tag: 'Loading' }
 *
 * const Ok = taggedStruct('Ok', { data: Schema.String })
 * Ok({ data: 'hello' }) // { _tag: 'Ok', data: 'hello' }
 * ```
 */
export declare function taggedStruct<Tag extends string>(tag: Tag): CallableTaggedStruct<Tag, {}>;
export declare function taggedStruct<Tag extends string, Fields extends Schema.Struct.Fields>(tag: Tag, fields: Fields): CallableTaggedStruct<Tag, Fields>;
export {};
