import { Submodel } from 'foldkit';
import type { Html } from 'foldkit/html';
export type ViewInputs = Readonly<{
    buttonLabel: Html;
    items: ReadonlyArray<string>;
}>;
export declare const view: Submodel.View<Model, Message, Readonly<{
    buttonLabel: Html;
    items: ReadonlyArray<string>;
}>>;
