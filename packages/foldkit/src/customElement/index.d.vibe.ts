import { Schema } from 'effect';
import type { Attribute, Child, ChildAttribute, Html, HtmlBuilder } from '../html/index.vibe';
/** Type-level kebab-case to PascalCase, used to convert event names like
 *  `'change-rating'` into the corresponding factory name `'OnChangeRating'`. */
type KebabToPascal<S extends string> = S extends `${infer Head}-${infer Tail}` ? `${Capitalize<Head>}${KebabToPascal<Tail>}` : Capitalize<S>;
type PropertyFactory<Message, ValueType> = (value: ValueType) => Attribute<Message>;
type EventFactory<Message, DetailType> = (toMessage: (detail: DetailType) => Message) => Attribute<Message>;
/** Constraint on a declared event's `detail` Schema. The runtime decodes
 * `detail` synchronously inside the DOM event handler, where there is no
 * Effect context to draw from, so a Schema requiring decoding services
 * cannot describe an event payload. */
export type EventSchema = Schema.Codec<unknown, unknown, never, unknown>;
/** @internal */
type PropertyFactories<Message, Properties extends Record<string, Schema.Top>> = {
    readonly [K in keyof Properties as Capitalize<string & K>]: PropertyFactory<Message, Schema.Schema.Type<Properties[K]>>;
};
/** @internal */
type EventFactories<Message, Events extends Record<string, EventSchema>> = {
    readonly [K in keyof Events as `On${KebabToPascal<string & K>}`]: EventFactory<Message, Schema.Schema.Type<Events[K]>>;
};
/** Typed call site for a defined custom element. The element constructor
 *  itself is callable; each declared property gets a PascalCase factory
 *  method, and each declared event gets an `On{PascalCase}` factory method.
 *  The attribute array accepts {@link ChildAttribute} alongside
 *  `Attribute<Message>`, like every html element builder, so a Submodel's
 *  published attribute groups can be spread into a custom element. */
export type ElementBuilder<Message, Properties extends Record<string, Schema.Top>, Events extends Record<string, EventSchema>> = ((attributes?: ReadonlyArray<Attribute<Message> | ChildAttribute>, children?: ReadonlyArray<Child>) => Html) & PropertyFactories<Message, Properties> & EventFactories<Message, Events>;
/** Configuration accepted by `CustomElement.define`. */
export interface CustomElementConfig<Tag extends string, Properties extends Record<string, Schema.Top>, Events extends Record<string, EventSchema>> {
    readonly tag: Tag;
    readonly properties: Properties;
    readonly events: Events;
}
/** A defined custom element, untyped on Message at definition time so the
 *  spec can be exported and shared across modules. Call `.withMessage(h)`
 *  with a view's builder to mint a typed `ElementBuilder` bound to that
 *  frame's Message universe. The builder argument is a type witness: it
 *  fixes `Message` to the frame the element renders in, so the spec cannot
 *  be bound to a Message universe its events will not dispatch into. */
export interface CustomElementSpec<Tag extends string, Properties extends Record<string, Schema.Top>, Events extends Record<string, EventSchema>> {
    readonly tag: Tag;
    readonly properties: Properties;
    readonly events: Events;
    readonly withMessage: <Message>(h: HtmlBuilder<Message>) => ElementBuilder<Message, Properties, Events>;
}
/** The typed builder for a given spec and Message universe. Equivalent to
 *  the value `Spec.withMessage<Message>()` returns, expressed as a type
 *  consumers can name without reaching for `ReturnType<typeof ...>`. */
export type Builder<Spec, Message> = Spec extends CustomElementSpec<string, infer Properties, infer Events> ? ElementBuilder<Message, Properties, Events> : never;
/** @internal Shared with the Scene test helpers so their error messages name
 *  the same `On*` factory this module generates. */
export declare const kebabToPascal: (input: string) => string;
/**
 * Define a typed binding for a custom element. The returned spec describes
 * the element's properties and events with Schema, and exposes a
 * `.withMessage<Message>()` factory that yields a typed `ElementBuilder` for
 * the consumer's Message universe.
 *
 * Property changes diff across renders; declared `CustomEvent` details are
 * decoded against their Schema before the runtime converts them to Messages.
 * A detail the Schema rejects is reported to the console and dispatches no
 * Message.
 *
 * @example
 * ```ts
 * // main.ts
 * import 'vanilla-colorful/hex-color-picker.js'
 * import { CustomElement } from 'foldkit'
 *
 * const hexColorPicker = CustomElement.define({
 *   tag: 'hex-color-picker',
 *   properties: {
 *     color: Schema.String,
 *   },
 *   events: {
 *     'color-changed': Schema.Struct({ value: Schema.String }),
 *   },
 * })
 *
 * // Inside a view, with its `h` in scope:
 * const picker = hexColorPicker.withMessage(h)
 *
 * picker(
 *   [
 *     picker.Color(model.fillColor),
 *     picker.OnColorChanged(detail => ChangedFillColor({ value: detail.value })),
 *   ],
 *   [],
 * )
 * ```
 */
export declare const define: <Tag extends string, Properties extends Record<string, Schema.Top>, Events extends Record<string, EventSchema>>(config: CustomElementConfig<Tag, Properties, Events>) => CustomElementSpec<Tag, Properties, Events>;
export {};
