import type { Attribute, Html, HtmlBuilder } from 'foldkit/html';
/** Attribute groups provided to a Meter view. */
export type MeterAttributes<Message> = Readonly<{
    meter: ReadonlyArray<Attribute<Message>>;
    label: ReadonlyArray<Attribute<Message>>;
    fill: ReadonlyArray<Attribute<Message>>;
}>;
/** Configuration for rendering a Meter with {@link view}. */
export type ViewConfig<Message> = Readonly<{
    id: string;
    value: number;
    min?: number;
    max?: number;
    low?: number;
    high?: number;
    optimum?: number;
    valueText?: string | ((value: number, max: number) => string);
    ariaLabel?: string;
    ariaLabelledBy?: string;
    toView: (attributes: MeterAttributes<Message>) => Html;
}>;
/** Returns the label element id, derived from the meter's base id. */
export declare const labelId: (id: string) => string;
/** Renders an accessible meter as a stateless controlled view. */
export declare const view: <Message>(config: ViewConfig<Message>, h: HtmlBuilder<Message>) => Html;
