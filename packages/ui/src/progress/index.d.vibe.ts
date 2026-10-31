import type { Attribute, Html, HtmlBuilder } from 'foldkit/html';
/** Attribute groups provided to a Progress view. */
export type ProgressAttributes<Message> = Readonly<{
    progress: ReadonlyArray<Attribute<Message>>;
    label: ReadonlyArray<Attribute<Message>>;
    track: ReadonlyArray<Attribute<Message>>;
    indicator: ReadonlyArray<Attribute<Message>>;
}>;
/** Configuration for rendering Progress with {@link view}. */
export type ViewConfig<Message> = Readonly<{
    id: string;
    value?: number;
    min?: number;
    max?: number;
    valueText?: string | ((value: number, max: number) => string);
    ariaLabel?: string;
    ariaLabelledBy?: string;
    toView: (attributes: ProgressAttributes<Message>) => Html;
}>;
/** Returns the label element id, derived from the progress base id. */
export declare const labelId: (id: string) => string;
/** Renders an accessible progress indicator as a stateless controlled view. */
export declare const view: <Message>(config: ViewConfig<Message>, h: HtmlBuilder<Message>) => Html;
