import { Option, Schema } from 'effect';
import type { Card } from './card.vibe';
export declare const Column: Schema.Struct<{
    readonly id: Schema.String;
    readonly name: Schema.String;
    readonly cards: Schema.$Array<Schema.Struct<{
        readonly id: Schema.String;
        readonly title: Schema.String;
        readonly description: Schema.String;
        readonly sortKey: Schema.String;
    }>>;
}>;
export type Column = typeof Column.Type;
export declare const removeCard: (column: Column, cardId: string) => {
    readonly column: Column;
    readonly maybeCard: Option.Option<Card>;
};
export declare const insertCard: (column: Column, card: Card, targetIndex: number) => Column;
export declare const appendCard: (column: Column, card: Card) => Column;
export declare const reorder: (columns: ReadonlyArray<Column>, itemId: string, fromContainerId: string, toContainerId: string, toIndex: number) => ReadonlyArray<Column>;
