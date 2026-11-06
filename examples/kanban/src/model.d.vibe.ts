import { Schema } from 'effect';
export declare const SavedBoard: Schema.Struct<{
    readonly columns: Schema.$Array<Schema.Struct<{
        readonly id: Schema.String;
        readonly name: Schema.String;
        readonly cards: Schema.$Array<Schema.Struct<{
            readonly id: Schema.String;
            readonly title: Schema.String;
            readonly description: Schema.String;
            readonly sortKey: Schema.String;
        }>>;
    }>>;
}>;
export type SavedBoard = typeof SavedBoard.Type;
export declare const SavedBoardJsonString: Schema.fromJsonString<Schema.toCodecJson<Schema.Struct<{
    readonly columns: Schema.$Array<Schema.Struct<{
        readonly id: Schema.String;
        readonly name: Schema.String;
        readonly cards: Schema.$Array<Schema.Struct<{
            readonly id: Schema.String;
            readonly title: Schema.String;
            readonly description: Schema.String;
            readonly sortKey: Schema.String;
        }>>;
    }>>;
}>>>;
export declare const Model: Schema.Struct<{
    readonly columns: Schema.$Array<Schema.Struct<{
        readonly id: Schema.String;
        readonly name: Schema.String;
        readonly cards: Schema.$Array<Schema.Struct<{
            readonly id: Schema.String;
            readonly title: Schema.String;
            readonly description: Schema.String;
            readonly sortKey: Schema.String;
        }>>;
    }>>;
    readonly dragAndDrop: Schema.Struct<{
        readonly id: Schema.String;
        readonly orientation: Schema.Literals<readonly ["Horizontal", "Vertical"]>;
        readonly activationThreshold: Schema.Number;
        readonly dragState: import("foldkit/schema").TaggedUnion<{
            readonly Idle: {};
            readonly Pending: {
                itemId: Schema.String;
                containerId: Schema.String;
                index: Schema.Number;
                origin: Schema.Struct<{
                    readonly screenX: Schema.Number;
                    readonly screenY: Schema.Number;
                }>;
            };
            readonly Dragging: {
                itemId: Schema.String;
                sourceContainerId: Schema.String;
                sourceIndex: Schema.Number;
                origin: Schema.Struct<{
                    readonly screenX: Schema.Number;
                    readonly screenY: Schema.Number;
                }>;
                current: Schema.Struct<{
                    readonly clientX: Schema.Number;
                    readonly clientY: Schema.Number;
                }>;
                maybeDropTarget: Schema.Option<Schema.Struct<{
                    readonly containerId: Schema.String;
                    readonly index: Schema.Number;
                }>>;
            };
            readonly KeyboardDragging: {
                itemId: Schema.String;
                sourceContainerId: Schema.String;
                sourceIndex: Schema.Number;
                targetContainerId: Schema.String;
                targetIndex: Schema.Number;
            };
        }>;
    }>;
    readonly maybeNewCardColumnId: Schema.Option<Schema.String>;
    readonly newCardTitle: Schema.String;
    readonly announcement: Schema.String;
}>;
export type Model = typeof Model.Type;
