import { Submodel } from 'foldkit';
import { type ChildAttribute, type Html } from 'foldkit/html';
type SlotItem = Readonly<{
    id: string;
    label: string;
    isActive: boolean;
    attributes: ReadonlyArray<ChildAttribute>;
}>;
type Slot = Readonly<{
    isOpen: boolean;
    buttonAttributes: ReadonlyArray<ChildAttribute>;
    menuAttributes: ReadonlyArray<ChildAttribute>;
    items: ReadonlyArray<SlotItem>;
}>;
export declare const view: Submodel.View<Model, Message, Readonly<{
    items: ReadonlyArray<string>;
    toView: (slot: Slot) => Html;
}>>;
export {};
