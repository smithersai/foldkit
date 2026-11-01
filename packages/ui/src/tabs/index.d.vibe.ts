import { Effect, Option, Schema } from 'effect';
import { type Update } from 'foldkit';
import * as Command from 'foldkit/command';
import { type ChildAttribute, type Html } from 'foldkit/html';
import { type View as SubmodelView } from 'foldkit/submodel';
export { wrapIndex, findFirstEnabledIndex, keyToIndex } from '../keyboard.vibe';
/** Controls the tab list layout direction and which arrow keys navigate between tabs. */
export declare const Orientation: Schema.Literals<readonly ["Horizontal", "Vertical"]>;
export type Orientation = typeof Orientation.Type;
/** Controls whether tabs activate on focus (`Automatic`) or require an explicit selection (`Manual`). */
export declare const ActivationMode: Schema.Literals<readonly ["Automatic", "Manual"]>;
export type ActivationMode = typeof ActivationMode.Type;
/** Schema for the tabs component's private interaction state. The active
 *  tab is owned by the parent and passed in via `ViewInputs.selectedValue`,
 *  so it is not stored here. `maybeFocusedIndex` is the roving-tabindex
 *  cursor: `None` means keyboard focus follows the selected tab, and `Manual`
 *  activation stores `Some(index)` while focus diverges from the selection. */
export declare const Model: Schema.Struct<{
    readonly id: Schema.String;
    readonly maybeFocusedIndex: Schema.Option<Schema.Number>;
    readonly activationMode: Schema.Literals<readonly ["Automatic", "Manual"]>;
}>;
export type Model = typeof Model.Type;
/** Union of all messages the tabs component can produce. */
export declare const Message: import("foldkit/message").MessageUnion<{
    readonly SelectedTab: {
        index: Schema.Number;
        value: Schema.String;
    };
    readonly FocusedTab: {
        index: Schema.Number;
    };
    readonly CompletedFocusTab: {};
}>;
export type SelectedTab = typeof Message.SelectedTab.Type;
export type FocusedTab = typeof Message.FocusedTab.Type;
export type Message = typeof Message.Type;
export type Selected<Value extends string = string> = Readonly<{
    readonly _tag: 'Selected';
    readonly value: Value;
    readonly index: number;
}>;
/** Union of OutMessages the tabs component can produce. The parent's
 *  `Update.foldChild` config handles them through `foldOutMessage`. */
export declare const OutMessage: import("foldkit/message").MessageUnion<{
    readonly Selected: {
        value: Schema.String;
        index: Schema.Number;
    };
}>;
/** Generic over `Value extends string` so consumers using
 *  `Tabs.create<MyUnion>()` receive `value: MyUnion` in the
 *  `Selected` OutMessage. Defaults to `string`. */
export type OutMessage<Value extends string = string> = Selected<Value>;
/** Configuration for creating a tabs model with `init`. */
export type InitConfig = Readonly<{
    id: string;
    activationMode?: ActivationMode;
}>;
/** Creates an initial tabs model from a config. Focus follows the selected
 *  tab until the user navigates in `Manual` mode, so `maybeFocusedIndex`
 *  starts `None`. Defaults to automatic activation. */
export declare const init: (config: InitConfig) => Model;
/** Moves focus to the tab at the given index. */
export declare const FocusTab: Command.CommandDefinitionWithArgs<"FocusTab", {
    id: Schema.String;
    index: Schema.Number;
}, Effect.Effect<{
    readonly _tag: "CompletedFocusTab";
}, never, never>>;
/** Processes a Tabs Message and returns the next Model, optional Commands, and
 *  an optional OutMessage. `Selected` fires when a tab is committed via click
 *  or keyboard; the parent stores the new value and passes it back in as
 *  `selectedValue`. */
export declare const update: (model: Model, message: Message) => Readonly<{
    model: {
        readonly id: string;
        readonly maybeFocusedIndex: Option.Option<number>;
        readonly activationMode: "Automatic" | "Manual";
    };
    commands?: Update.Commands<{
        readonly _tag: "CompletedFocusTab";
    } | {
        readonly _tag: "FocusedTab";
        readonly index: number;
    } | {
        readonly _tag: "SelectedTab";
        readonly index: number;
        readonly value: string;
    }, never>;
    outMessage?: Readonly<{
        readonly _tag: 'Selected';
        readonly value: string;
        readonly index: number;
    }>;
}>;
/** Per-tab render info passed to the consumer's `toView`. Generic over
 *  `Value extends string`: when `Tabs.create<MyUnion>()` is declared,
 *  `tab.value` is typed `MyUnion` so the consumer can switch on it without
 *  casting. */
export type TabInfo<Value extends string = string> = Readonly<{
    value: Value;
    index: number;
    isActive: boolean;
    isFocused: boolean;
    isDisabled: boolean;
    tab: ReadonlyArray<ChildAttribute>;
    panel: ReadonlyArray<ChildAttribute>;
}>;
/** Render-time payload published to the consumer's `toView`.
 *
 *  - `tablist`: ARIA + role attributes for the wrapping tablist element.
 *  - `tabs`: one entry per tab in `viewInputs.tabs`, in the same order, with
 *    the tab button's attribute bundle, the panel's attribute bundle,
 *    and derived state.
 *  - `activeIndex`: the index of `viewInputs.selectedValue` within
 *    `viewInputs.tabs`, convenient when the consumer wants to render only the
 *    active panel (vs all panels with `Hidden` for transitions). */
export type RenderInfo<Value extends string = string> = Readonly<{
    tablist: ReadonlyArray<ChildAttribute>;
    tabs: ReadonlyArray<TabInfo<Value>>;
    activeIndex: number;
}>;
/** Describes whether a consumer renders only the active tab panel or keeps
 *  every panel mounted and hides inactive ones. Tab-to-panel references follow
 *  the rendered panel strategy. */
export declare const PanelMount: Schema.Literals<readonly ["ActiveOnly", "All"]>;
export type PanelMount = typeof PanelMount.Type;
/** Per-render view inputs passed to `view` via `h.submodel`'s `viewInputs` field.
 *  Generic over `Value extends string` so consumers using
 *  `Tabs.create<MyUnion>()` receive `tab.value: MyUnion` in `toView`
 *  and `(value: MyUnion, index) => boolean` in `isTabDisabled`, without
 *  casting.
 *
 *  - `selectedValue`: the active tab, read straight from the parent Model.
 *    `aria-selected`, the `data-selected` marker, and which panel is active
 *    all derive from it.
 *  - `panelMount`: defaults to `ActiveOnly`, where the consumer renders only
 *    the active panel. Set `All` when the consumer keeps every panel mounted
 *    and hides inactive ones, so every tab retains its panel relationship. */
export type ViewInputs<Value extends string = string> = Readonly<{
    tabs: ReadonlyArray<Value>;
    selectedValue: Value;
    ariaLabel: string;
    toView: (render: RenderInfo<Value>) => Html;
    isTabDisabled?: (value: Value, index: number) => boolean;
    orientation?: Orientation;
    panelMount?: PanelMount;
}>;
/** The `view` and `update` pair that `Tabs.create` returns, bound to one
 *  `Value` type. Name it to annotate a value that holds a created bundle,
 *  such as a field on a config object or a function parameter that takes
 *  the bundle rather than calling `create` itself. */
export type Bundle<Value extends string = string> = Readonly<{
    view: SubmodelView<Model, Message, ViewInputs<Value>>;
    update: (model: Model, message: Message) => Update.ReturnWithOutMessage<Model, Message, OutMessage<Value>>;
}>;
/** Pairs the tabs `view` and `update` behind a single Value-typed entry
 *  point. Declare once at module scope so consumers receive
 *  `tab.value: Value` in `toView` and the `Selected` OutMessage without an
 *  `as` cast:
 *
 *  ```ts
 *  const DemoTabs = Tabs.create<DemoTab>()
 *
 *  // In view (selectedValue is the parent-owned active tab):
 *  h.submodel({ view: DemoTabs.view, viewInputs: { selectedValue, ... }, ... })
 *
 *  // In the parent update, pass DemoTabs.update to Update.foldChild and
 *  // fold the Selected OutMessage into your Model.
 *  ```
 *
 *  The internal view stays typed `ReadonlyArray<string>`; consumers can
 *  pass a `ReadonlyArray<MyUnion>` (assignable) and the fenced cast inside
 *  `create` types `TabInfo.value` as `MyUnion`. */
export declare const create: <Value extends string = string>() => Bundle<Value>;
