import { Duration, Stream } from 'effect';
/** Whether a key binding may fire when its event comes from an editable element. */
export type WhileTyping = 'Suppress' | 'Allow';
/** A single key press or a sequence of two or more key presses. */
export type KeySequence = string | Readonly<[string, string, ...Array<string>]>;
type BindingBase<Output> = Readonly<{
    keys: KeySequence;
    mapEvent: (event: KeyboardEvent) => Output;
    isEnabled?: boolean;
    whileTyping?: WhileTyping;
    preventDefault?: boolean;
}>;
/**
 * One entry in a {@link streamFromKeyBindings} binding table.
 *
 * A string describes one key press, such as `'/'`, `'Escape'`, or `'Mod+K'`.
 * An array describes a sequence of at least two presses, such as
 * `['G', 'H']` or `['G', 'Shift+G']`.
 */
export type KeyBinding<Output> = BindingBase<Output> & (Readonly<{
    keys: string;
    whenRepeated?: 'Ignore' | 'Allow';
}> | Readonly<{
    keys: Readonly<[string, string, ...Array<string>]>;
    whenRepeated?: never;
}>);
type ModKey = 'Control' | 'Meta';
/** Configuration for the {@link streamFromKeyBindings} Stream helper. */
export type StreamFromKeyBindingsConfig<Output> = Readonly<{
    bindings: ReadonlyArray<KeyBinding<Output>>;
    target?: EventTarget | (() => EventTarget);
    modKey?: ModKey;
    sequenceTimeout?: Duration.Input;
}>;
/**
 * Build a Stream that maps declarative key bindings to values. The output is
 * inferred from each binding's `mapEvent` callback; `Subscription.make`
 * checks that the final Stream emits the application's Message type.
 *
 * A string describes one key press. Modifiers are joined with `+`:
 * `'Mod+K'`, `'Control+Shift+P'`, or `'Alt+ArrowDown'`. The supported modifiers
 * are `Mod`, `Control`, `Meta`, `Alt`, and `Shift`. `Mod` resolves to Meta on
 * Apple platforms and Control elsewhere; `modKey` can override that choice.
 * Matching uses `KeyboardEvent.key`, case-insensitively, after the active
 * keyboard layout has been applied. Use `Space` and `Plus` for those keys.
 *
 * An array describes an ordered sequence of two or more presses. Every press
 * uses the same grammar, so `['G', 'Shift+G']` is valid. Sequences reset after
 * one second by default; `sequenceTimeout` accepts any Effect Duration input.
 * Modifier-only events and repeated keydowns do not advance a sequence.
 *
 * Bindings are suppressed by default when the event's composed path contains
 * an `input`, `textarea`, `select`, or contenteditable element. Set
 * `whileTyping` to `'Allow'` for a binding that must work there. Events emitted
 * during IME composition are always ignored, including a keydown some browsers
 * report with `keyCode` 229 and `isComposing` false. Repeated keydowns are
 * ignored for one-press bindings unless `whenRepeated` is `'Allow'`. An event
 * another handler already canceled is ignored and clears any sequence in
 * progress.
 *
 * Matched key presses call `preventDefault()` before dispatching. For a
 * sequence, that policy applies to every matched press. Set `preventDefault`
 * to `false` to opt out. Sequences sharing a prefix must use the same policy.
 * Duplicate bindings and a complete binding that is also a sequence prefix
 * are rejected when the Stream is created.
 *
 * This helper returns a Stream, not a complete Subscription entry. Use
 * `Subscription.persistentEntry` for a fixed table. When availability depends on
 * the Model that owns the entry, build it inside `dependenciesToStream` and
 * derive each binding's `isEnabled` from the dependency record. A dependency
 * change opens a new Stream scope and resets any sequence in progress. If a
 * parent owns a condition for a lifted child, declare the table at that parent
 * or put bindings with different parent-owned lifetimes in separate child
 * entries so `Subscription.lift` can gate them individually. If the meaning
 * of a key depends on the Model, dispatch a factual key Message and decide
 * what it means in update instead of reading the Model from `mapEvent`.
 *
 * @example
 * ```typescript
 * const subscriptions = Subscription.make<Model, Message>()(entry => ({
 *   keyBindings: entry(
 *     { isPaletteOpen: Schema.Boolean },
 *     {
 *       modelToDependencies: model => ({
 *         isPaletteOpen: model.paletteState._tag === 'Open',
 *       }),
 *       dependenciesToStream: ({ isPaletteOpen }) =>
 *         Dom.streamFromKeyBindings<Message>({
 *           bindings: [
 *             {
 *               keys: 'Escape',
 *               isEnabled: isPaletteOpen,
 *               whileTyping: 'Allow',
 *               mapEvent: () => Message.PressedEscape(),
 *             },
 *             {
 *               keys: 'Mod+K',
 *               whileTyping: 'Allow',
 *               mapEvent: () => Message.PressedSearchShortcut(),
 *             },
 *             {
 *               keys: ['G', 'L'],
 *               mapEvent: () => Message.PressedListShortcut(),
 *             },
 *           ],
 *         }),
 *     },
 *   ),
 * }))
 * ```
 */
export declare const streamFromKeyBindings: <Output>(config: StreamFromKeyBindingsConfig<Output>) => Stream.Stream<Output>;
export {};
