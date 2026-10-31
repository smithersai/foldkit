import type { Attribute, Html, HtmlBuilder, TextareaAttribute } from 'foldkit/html';
/** Attribute groups the textarea component provides to the consumer's `toView` callback. */
export type TextareaAttributes<Message> = Readonly<{
    textarea: ReadonlyArray<TextareaAttribute<Message>>;
    label: ReadonlyArray<Attribute<Message>>;
    description: ReadonlyArray<Attribute<Message>>;
}>;
/** Configuration for rendering a textarea with `view`. */
export type ViewConfig<Message> = Readonly<{
    id: string;
    toView: (attributes: TextareaAttributes<Message>) => Html;
    onInput?: (value: string) => Message;
    value?: string;
    isDisabled?: boolean;
    isReadOnly?: boolean;
    isInvalid?: boolean;
    isAutofocus?: boolean;
    hasDescription?: boolean;
    name?: string;
    rows?: number;
    placeholder?: string;
}>;
/** Returns the description element id, derived from the textarea's base id. */
export declare const descriptionId: (id: string) => string;
/** Renders an accessible textarea by building ARIA attribute groups and delegating layout to the consumer's `toView` callback. */
export declare const view: <Message>(config: ViewConfig<Message>, h: HtmlBuilder<Message>) => Html;
