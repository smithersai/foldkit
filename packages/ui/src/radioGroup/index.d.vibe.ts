import { Effect, Option, Schema } from 'effect';
import { type Update } from 'foldkit';
import * as Command from 'foldkit/command';
import { type ChildAttribute, type Html } from 'foldkit/html';
import { type View as SubmodelView } from 'foldkit/submodel';
/** Controls the radio group layout direction and which arrow keys navigate between options. */
export declare const Orientation: Schema.Literals<readonly ["Horizontal", "Vertical"]>;
export type Orientation = typeof Orientation.Type;
/** Schema for the radio group's private interaction state. The selected
 *  option is owned by the parent and passed in via `ViewInputs.selectedValue`,
 *  so it is not stored here. `maybeFocusedIndex` is the roving-tabindex
 *  cursor: `None` means keyboard focus follows the selection, and a read-only
 *  group stores `Some(index)` while focus diverges from it. */
export declare const Model: Schema.Struct<{
    readonly id: Schema.String;
    readonly maybeFocusedIndex: Schema.Option<Schema.Number>;
}>;
export type Model = typeof Model.Type;
/** Union of all messages the radio group can produce. */
export declare const Message: import("foldkit/message").MessageUnion<{
    readonly SelectedOption: {
        index: Schema.Number;
        value: Schema.String;
    };
    readonly FocusedOption: {
        index: Schema.Number;
    };
    readonly CompletedFocusOption: {};
}>;
export type SelectedOption = typeof Message.SelectedOption.Type;
export type FocusedOption = typeof Message.FocusedOption.Type;
export type Message = typeof Message.Type;
export type Selected<Value extends string = string> = Readonly<{
    readonly _tag: 'Selected';
    readonly value: Value;
    readonly index: number;
}>;
/** Union of OutMessages the radio group can produce. The parent's
 *  `Update.foldChild` config handles them through `foldOutMessage`. */
export declare const OutMessage: import("foldkit/message").MessageUnion<{
    readonly Selected: {
        value: Schema.String;
        index: Schema.Number;
    };
}>;
/** Generic over `Value extends string` so consumers using
 *  `RadioGroup.create<MyUnion>()` receive `value: MyUnion` in the
 *  `Selected` OutMessage. Defaults to `string`. */
export type OutMessage<Value extends string = string> = Selected<Value>;
/** Configuration for creating a radio group model with `init`. */
export type InitConfig = Readonly<{
    id: string;
}>;
/** Creates an initial radio group model from a config. Focus follows the
 *  selected option until the user navigates a read-only group, so
 *  `maybeFocusedIndex` starts `None`. */
export declare const init: (config: InitConfig) => Model;
/** Moves focus to the option at the given index. */
export declare const FocusOption: Command.CommandDefinitionWithArgs<"FocusOption", {
    id: Schema.String;
    index: Schema.Number;
}, Effect.Effect<{
    readonly _tag: "CompletedFocusOption";
}, never, never>>;
/** Processes a RadioGroup Message and returns the next Model, optional
 *  Commands, and an optional OutMessage. `Selected` fires when an option is
 *  committed via click or keyboard; the parent stores the new value and passes
 *  it back in as `selectedValue`. */
export declare const update: (model: Model, message: Message) => Readonly<{
    model: {
        readonly id: string;
        readonly maybeFocusedIndex: Option.Option<number>;
    };
    commands?: Update.Commands<{
        readonly _tag: "CompletedFocusOption";
    } | {
        readonly _tag: "FocusedOption";
        readonly index: number;
    } | {
        readonly _tag: "SelectedOption";
        readonly index: number;
        readonly value: string;
    }, never>;
    outMessage?: Readonly<{
        readonly _tag: 'Selected';
        readonly value: string;
        readonly index: number;
    }>;
}>;
/** Per-option render info passed to the consumer's `toView`. The consumer
 *  spreads `option`, `label`, and `description` onto whichever elements carry
 *  that role in their layout. Generic over `Value extends string` so
 *  `option.value` carries the consumer's union type.
 *
 *  The `option` bundle sets `type="button"` so that rendering the option as a
 *  `button` element inside a `form` element selects without also submitting the
 *  form. Setting it is harmless on the other elements an option might use, such
 *  as a `div` or a `span`, because the builder assigns a DOM property rather
 *  than an HTML attribute. Spread a later `h.Type` to override it. */
export type OptionInfo<Value extends string = string> = Readonly<{
    value: Value;
    index: number;
    isSelected: boolean;
    isActive: boolean;
    isDisabled: boolean;
    isReadOnly: boolean;
    option: ReadonlyArray<ChildAttribute>;
    label: ReadonlyArray<ChildAttribute>;
    description: ReadonlyArray<ChildAttribute>;
}>;
/** Render-time payload published to the consumer's `toView`.
 *
 *  - `group`: ARIA + role attributes for the wrapping radiogroup element.
 *  - `options`: one entry per option in `viewInputs.options`, in the same
 *    order. Includes the value, derived state, and the attribute bundles for
 *    the option element, its label, and its description.
 *  - `selectedValue`: the currently-selected value, if any. Convenient for the
 *    consumer when rendering selected-state visuals next to the option
 *    attributes.
 *  - `hiddenInput`: when `name` was supplied, attributes for a hidden form
 *    input carrying the selected value. The consumer renders the `<input>`
 *    themselves. Empty array when `name` is undefined. */
export type RenderInfo<Value extends string = string> = Readonly<{
    group: ReadonlyArray<ChildAttribute>;
    options: ReadonlyArray<OptionInfo<Value>>;
    selectedValue: Option.Option<Value>;
    hiddenInput: ReadonlyArray<ChildAttribute>;
}>;
/** Per-render view inputs passed to `view` via `h.submodel`'s `viewInputs`
 *  field. Generic over `Value extends string` so consumers using
 *  `RadioGroup.create<MyUnion>()` receive `option.value: MyUnion` in `toView`
 *  and `(value: MyUnion, index) => boolean` in `isOptionDisabled`, without
 *  casting.
 *
 *  - `selectedValue`: the current selection, read straight from the parent
 *    Model. `aria-checked` and the `data-checked` marker derive from it, as
 *    does the roving tabindex whenever keyboard focus has not diverged.
 *  - `isReadOnly`: keeps the group navigable but not selectable. Arrow, Home,
 *    End, PageUp, and PageDown still move focus, and the group reports that
 *    focus through `FocusedOption`, so `data-active` and `tabindex` follow it.
 *    Space and clicking do nothing. */
export type ViewInputs<Value extends string = string> = Readonly<{
    options: ReadonlyArray<Value>;
    selectedValue: Option.Option<Value>;
    ariaLabel: string;
    toView: (render: RenderInfo<Value>) => Html;
    orientation?: Orientation;
    isOptionDisabled?: (value: Value, index: number) => boolean;
    hasOptionDescription?: (value: Value, index: number) => boolean;
    isDisabled?: boolean;
    isReadOnly?: boolean;
    name?: string;
}>;
/** The `view` and `update` pair that `RadioGroup.create` returns, bound to one
 *  `Value` type. Name it to annotate a value that holds a created bundle,
 *  such as a field on a config object or a function parameter that takes
 *  the bundle rather than calling `create` itself. */
export type Bundle<Value extends string = string> = Readonly<{
    view: SubmodelView<Model, Message, ViewInputs<Value>>;
    update: (model: Model, message: Message) => Update.ReturnWithOutMessage<Model, Message, OutMessage<Value>>;
}>;
/** Pairs the radio group `view` and `update` behind a single Value-typed
 *  entry point. Declare once at module scope so consumers receive
 *  `option.value: Value` in `toView` and the `Selected` OutMessage without an
 *  `as` cast:
 *
 *  ```ts
 *  const PlanRadioGroup = RadioGroup.create<Plan>()
 *
 *  // In view (selectedValue is the parent-owned selection):
 *  h.submodel({ view: PlanRadioGroup.view, viewInputs: { selectedValue, ... }, ... })
 *
 *  // In the parent update, pass PlanRadioGroup.update to Update.foldChild
 *  // and fold the Selected OutMessage into your Model.
 *  ```
 *
 *  The internal view stays typed `ReadonlyArray<string>`; consumers can
 *  pass a `ReadonlyArray<MyUnion>` (assignable) and the fenced cast inside
 *  `create` types `OptionInfo.value` as `MyUnion`. */
export declare const create: <Value extends string = string>() => Bundle<Value>;
