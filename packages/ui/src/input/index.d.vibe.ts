import type { Attribute, Html, HtmlBuilder } from 'foldkit/html';
/** Attribute groups the input component provides to the consumer's `toView` callback. */
export type InputAttributes<Message> = Readonly<{
    input: ReadonlyArray<Attribute<Message>>;
    label: ReadonlyArray<Attribute<Message>>;
    description: ReadonlyArray<Attribute<Message>>;
}>;
/** Configuration for rendering an input with `view`. */
export type ViewConfig<Message> = Readonly<{
    id: string;
    toView: (attributes: InputAttributes<Message>) => Html;
    onInput?: (value: string) => Message;
    value?: string;
    isDisabled?: boolean;
    isReadOnly?: boolean;
    isInvalid?: boolean;
    isAutofocus?: boolean;
    hasDescription?: boolean;
    name?: string;
    type?: string;
    placeholder?: string;
}>;
/** Returns the description element id, derived from the input's base id. */
export declare const descriptionId: (id: string) => string;
/** Renders an accessible input by building ARIA attribute groups and delegating layout to the consumer's `toView` callback. */
export declare const view: <Message>(config: ViewConfig<Message>, h: HtmlBuilder<Message>) => Html;
