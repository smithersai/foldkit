import { Schema } from 'effect';
export declare const Message: import("foldkit/message").MessageUnion<{
    readonly GotDragAndDropMessage: {
        message: import("foldkit/message").MessageUnion<{
            readonly PressedDraggable: {
                itemId: Schema.String;
                containerId: Schema.String;
                index: Schema.Number;
                screenX: Schema.Number;
                screenY: Schema.Number;
            };
            readonly MovedPointer: {
                screenX: Schema.Number;
                screenY: Schema.Number;
                clientX: Schema.Number;
                clientY: Schema.Number;
                maybeDropTarget: Schema.Option<Schema.Struct<{
                    readonly containerId: Schema.String;
                    readonly index: Schema.Number;
                }>>;
            };
            readonly ReleasedPointer: {};
            readonly CancelledDrag: {};
            readonly ActivatedKeyboardDrag: {
                itemId: Schema.String;
                containerId: Schema.String;
                index: Schema.Number;
            };
            readonly CompletedResolveKeyboardMove: {
                targetContainerId: Schema.String;
                targetIndex: Schema.Number;
            };
            readonly ConfirmedKeyboardDrop: {};
            readonly PressedArrowKey: {
                direction: Schema.Literals<readonly ["Up", "Down", "Left", "Right", "NextContainer", "PreviousContainer"]>;
            };
            readonly AdvancedAutoScrollFrame: {};
            readonly CompletedFocusItem: {};
        }>;
    };
    readonly ClickedAddCard: {
        columnId: Schema.String;
    };
    readonly ChangedNewCardTitle: {
        value: Schema.String;
    };
    readonly SubmittedNewCard: {};
    readonly CancelledNewCard: {};
    readonly CompletedGenerateCardId: {
        cardId: Schema.String;
        columnId: Schema.String;
        title: Schema.String;
    };
    readonly CompletedSaveBoard: {};
    readonly CompletedFocusAddCardInput: {};
}>;
export type Message = typeof Message.Type;
