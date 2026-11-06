import type { Attribute, Html, HtmlBuilder } from 'foldkit/html';
/** Attribute groups the select component provides to the consumer's `toView` callback. */
export type SelectAttributes<Message> = Readonly<{
    select: ReadonlyArray<Attribute<Message>>;
    label: ReadonlyArray<Attribute<Message>>;
    description: ReadonlyArray<Attribute<Message>>;
}>;
/** Configuration for rendering a select with `view`. */
export type ViewConfig<Message> = Readonly<{
    id: string;
    toView: (attributes: SelectAttributes<Message>) => Html;
    onChange?: (value: string) => Message;
    value?: string;
    isDisabled?: boolean;
    isInvalid?: boolean;
    isAutofocus?: boolean;
    hasDescription?: boolean;
    name?: string;
}>;
/** Returns the description element id, derived from the select's base id. */
export declare const descriptionId: (id: string) => string;
/** Renders an accessible select by building ARIA attribute groups and delegating layout to the consumer's `toView` callback. */
export declare const view: <Message>(config: ViewConfig<Message>, h: HtmlBuilder<Message>) => Html;
