import { Option } from 'effect';
import { Subscription } from 'foldkit';
export declare const subscriptions: {
    readonly dragPointer: Subscription.Subscription<{
        readonly columns: readonly {
            readonly id: string;
            readonly name: string;
            readonly cards: readonly {
                readonly id: string;
                readonly title: string;
                readonly description: string;
                readonly sortKey: string;
            }[];
        }[];
        readonly dragAndDrop: {
            readonly id: string;
            readonly orientation: "Horizontal" | "Vertical";
            readonly activationThreshold: number;
            readonly dragState: {
                readonly _tag: "Idle";
            } | {
                readonly _tag: "Dragging";
                readonly itemId: string;
                readonly sourceContainerId: string;
                readonly sourceIndex: number;
                readonly origin: {
                    readonly screenX: number;
                    readonly screenY: number;
                };
                readonly current: {
                    readonly clientX: number;
                    readonly clientY: number;
                };
                readonly maybeDropTarget: Option.Option<{
                    readonly containerId: string;
                    readonly index: number;
                }>;
            } | {
                readonly _tag: "KeyboardDragging";
                readonly itemId: string;
                readonly sourceContainerId: string;
                readonly sourceIndex: number;
                readonly targetContainerId: string;
                readonly targetIndex: number;
            } | {
                readonly _tag: "Pending";
                readonly itemId: string;
                readonly containerId: string;
                readonly index: number;
                readonly origin: {
                    readonly screenX: number;
                    readonly screenY: number;
                };
            };
        };
        readonly maybeNewCardColumnId: Option.Option<string>;
        readonly newCardTitle: string;
        readonly announcement: string;
    }, {
        readonly _tag: "CancelledNewCard";
    } | {
        readonly _tag: "CompletedFocusAddCardInput";
    } | {
        readonly _tag: "CompletedSaveBoard";
    } | {
        readonly _tag: "SubmittedNewCard";
    } | {
        readonly _tag: "ChangedNewCardTitle";
        readonly value: string;
    } | {
        readonly _tag: "ClickedAddCard";
        readonly columnId: string;
    } | {
        readonly _tag: "CompletedGenerateCardId";
        readonly cardId: string;
        readonly columnId: string;
        readonly title: string;
    } | {
        readonly _tag: "GotDragAndDropMessage";
        readonly message: {
            readonly _tag: "AdvancedAutoScrollFrame";
        } | {
            readonly _tag: "CancelledDrag";
        } | {
            readonly _tag: "CompletedFocusItem";
        } | {
            readonly _tag: "ConfirmedKeyboardDrop";
        } | {
            readonly _tag: "ReleasedPointer";
        } | {
            readonly _tag: "ActivatedKeyboardDrag";
            readonly itemId: string;
            readonly containerId: string;
            readonly index: number;
        } | {
            readonly _tag: "CompletedResolveKeyboardMove";
            readonly targetContainerId: string;
            readonly targetIndex: number;
        } | {
            readonly _tag: "MovedPointer";
            readonly screenX: number;
            readonly screenY: number;
            readonly clientX: number;
            readonly clientY: number;
            readonly maybeDropTarget: Option.Option<{
                readonly containerId: string;
                readonly index: number;
            }>;
        } | {
            readonly _tag: "PressedArrowKey";
            readonly direction: "Down" | "Left" | "NextContainer" | "PreviousContainer" | "Right" | "Up";
        } | {
            readonly _tag: "PressedDraggable";
            readonly itemId: string;
            readonly containerId: string;
            readonly index: number;
            readonly screenX: number;
            readonly screenY: number;
        };
    }, Readonly<{
        maybeDependencies: Option.Option<{
            readonly dragActivity: "Active" | "Idle";
            readonly orientation: "Horizontal" | "Vertical";
        }>;
    }>, never>;
    readonly dragEscape: Subscription.Subscription<{
        readonly columns: readonly {
            readonly id: string;
            readonly name: string;
            readonly cards: readonly {
                readonly id: string;
                readonly title: string;
                readonly description: string;
                readonly sortKey: string;
            }[];
        }[];
        readonly dragAndDrop: {
            readonly id: string;
            readonly orientation: "Horizontal" | "Vertical";
            readonly activationThreshold: number;
            readonly dragState: {
                readonly _tag: "Idle";
            } | {
                readonly _tag: "Dragging";
                readonly itemId: string;
                readonly sourceContainerId: string;
                readonly sourceIndex: number;
                readonly origin: {
                    readonly screenX: number;
                    readonly screenY: number;
                };
                readonly current: {
                    readonly clientX: number;
                    readonly clientY: number;
                };
                readonly maybeDropTarget: Option.Option<{
                    readonly containerId: string;
                    readonly index: number;
                }>;
            } | {
                readonly _tag: "KeyboardDragging";
                readonly itemId: string;
                readonly sourceContainerId: string;
                readonly sourceIndex: number;
                readonly targetContainerId: string;
                readonly targetIndex: number;
            } | {
                readonly _tag: "Pending";
                readonly itemId: string;
                readonly containerId: string;
                readonly index: number;
                readonly origin: {
                    readonly screenX: number;
                    readonly screenY: number;
                };
            };
        };
        readonly maybeNewCardColumnId: Option.Option<string>;
        readonly newCardTitle: string;
        readonly announcement: string;
    }, {
        readonly _tag: "CancelledNewCard";
    } | {
        readonly _tag: "CompletedFocusAddCardInput";
    } | {
        readonly _tag: "CompletedSaveBoard";
    } | {
        readonly _tag: "SubmittedNewCard";
    } | {
        readonly _tag: "ChangedNewCardTitle";
        readonly value: string;
    } | {
        readonly _tag: "ClickedAddCard";
        readonly columnId: string;
    } | {
        readonly _tag: "CompletedGenerateCardId";
        readonly cardId: string;
        readonly columnId: string;
        readonly title: string;
    } | {
        readonly _tag: "GotDragAndDropMessage";
        readonly message: {
            readonly _tag: "AdvancedAutoScrollFrame";
        } | {
            readonly _tag: "CancelledDrag";
        } | {
            readonly _tag: "CompletedFocusItem";
        } | {
            readonly _tag: "ConfirmedKeyboardDrop";
        } | {
            readonly _tag: "ReleasedPointer";
        } | {
            readonly _tag: "ActivatedKeyboardDrag";
            readonly itemId: string;
            readonly containerId: string;
            readonly index: number;
        } | {
            readonly _tag: "CompletedResolveKeyboardMove";
            readonly targetContainerId: string;
            readonly targetIndex: number;
        } | {
            readonly _tag: "MovedPointer";
            readonly screenX: number;
            readonly screenY: number;
            readonly clientX: number;
            readonly clientY: number;
            readonly maybeDropTarget: Option.Option<{
                readonly containerId: string;
                readonly index: number;
            }>;
        } | {
            readonly _tag: "PressedArrowKey";
            readonly direction: "Down" | "Left" | "NextContainer" | "PreviousContainer" | "Right" | "Up";
        } | {
            readonly _tag: "PressedDraggable";
            readonly itemId: string;
            readonly containerId: string;
            readonly index: number;
            readonly screenX: number;
            readonly screenY: number;
        };
    }, Readonly<{
        maybeDependencies: Option.Option<{
            readonly dragActivity: "Active" | "Idle";
        }>;
    }>, never>;
    readonly dragKeyboard: Subscription.Subscription<{
        readonly columns: readonly {
            readonly id: string;
            readonly name: string;
            readonly cards: readonly {
                readonly id: string;
                readonly title: string;
                readonly description: string;
                readonly sortKey: string;
            }[];
        }[];
        readonly dragAndDrop: {
            readonly id: string;
            readonly orientation: "Horizontal" | "Vertical";
            readonly activationThreshold: number;
            readonly dragState: {
                readonly _tag: "Idle";
            } | {
                readonly _tag: "Dragging";
                readonly itemId: string;
                readonly sourceContainerId: string;
                readonly sourceIndex: number;
                readonly origin: {
                    readonly screenX: number;
                    readonly screenY: number;
                };
                readonly current: {
                    readonly clientX: number;
                    readonly clientY: number;
                };
                readonly maybeDropTarget: Option.Option<{
                    readonly containerId: string;
                    readonly index: number;
                }>;
            } | {
                readonly _tag: "KeyboardDragging";
                readonly itemId: string;
                readonly sourceContainerId: string;
                readonly sourceIndex: number;
                readonly targetContainerId: string;
                readonly targetIndex: number;
            } | {
                readonly _tag: "Pending";
                readonly itemId: string;
                readonly containerId: string;
                readonly index: number;
                readonly origin: {
                    readonly screenX: number;
                    readonly screenY: number;
                };
            };
        };
        readonly maybeNewCardColumnId: Option.Option<string>;
        readonly newCardTitle: string;
        readonly announcement: string;
    }, {
        readonly _tag: "CancelledNewCard";
    } | {
        readonly _tag: "CompletedFocusAddCardInput";
    } | {
        readonly _tag: "CompletedSaveBoard";
    } | {
        readonly _tag: "SubmittedNewCard";
    } | {
        readonly _tag: "ChangedNewCardTitle";
        readonly value: string;
    } | {
        readonly _tag: "ClickedAddCard";
        readonly columnId: string;
    } | {
        readonly _tag: "CompletedGenerateCardId";
        readonly cardId: string;
        readonly columnId: string;
        readonly title: string;
    } | {
        readonly _tag: "GotDragAndDropMessage";
        readonly message: {
            readonly _tag: "AdvancedAutoScrollFrame";
        } | {
            readonly _tag: "CancelledDrag";
        } | {
            readonly _tag: "CompletedFocusItem";
        } | {
            readonly _tag: "ConfirmedKeyboardDrop";
        } | {
            readonly _tag: "ReleasedPointer";
        } | {
            readonly _tag: "ActivatedKeyboardDrag";
            readonly itemId: string;
            readonly containerId: string;
            readonly index: number;
        } | {
            readonly _tag: "CompletedResolveKeyboardMove";
            readonly targetContainerId: string;
            readonly targetIndex: number;
        } | {
            readonly _tag: "MovedPointer";
            readonly screenX: number;
            readonly screenY: number;
            readonly clientX: number;
            readonly clientY: number;
            readonly maybeDropTarget: Option.Option<{
                readonly containerId: string;
                readonly index: number;
            }>;
        } | {
            readonly _tag: "PressedArrowKey";
            readonly direction: "Down" | "Left" | "NextContainer" | "PreviousContainer" | "Right" | "Up";
        } | {
            readonly _tag: "PressedDraggable";
            readonly itemId: string;
            readonly containerId: string;
            readonly index: number;
            readonly screenX: number;
            readonly screenY: number;
        };
    }, Readonly<{
        maybeDependencies: Option.Option<{
            readonly dragActivity: "Active" | "Idle";
        }>;
    }>, never>;
    readonly autoScroll: Subscription.Subscription<{
        readonly columns: readonly {
            readonly id: string;
            readonly name: string;
            readonly cards: readonly {
                readonly id: string;
                readonly title: string;
                readonly description: string;
                readonly sortKey: string;
            }[];
        }[];
        readonly dragAndDrop: {
            readonly id: string;
            readonly orientation: "Horizontal" | "Vertical";
            readonly activationThreshold: number;
            readonly dragState: {
                readonly _tag: "Idle";
            } | {
                readonly _tag: "Dragging";
                readonly itemId: string;
                readonly sourceContainerId: string;
                readonly sourceIndex: number;
                readonly origin: {
                    readonly screenX: number;
                    readonly screenY: number;
                };
                readonly current: {
                    readonly clientX: number;
                    readonly clientY: number;
                };
                readonly maybeDropTarget: Option.Option<{
                    readonly containerId: string;
                    readonly index: number;
                }>;
            } | {
                readonly _tag: "KeyboardDragging";
                readonly itemId: string;
                readonly sourceContainerId: string;
                readonly sourceIndex: number;
                readonly targetContainerId: string;
                readonly targetIndex: number;
            } | {
                readonly _tag: "Pending";
                readonly itemId: string;
                readonly containerId: string;
                readonly index: number;
                readonly origin: {
                    readonly screenX: number;
                    readonly screenY: number;
                };
            };
        };
        readonly maybeNewCardColumnId: Option.Option<string>;
        readonly newCardTitle: string;
        readonly announcement: string;
    }, {
        readonly _tag: "CancelledNewCard";
    } | {
        readonly _tag: "CompletedFocusAddCardInput";
    } | {
        readonly _tag: "CompletedSaveBoard";
    } | {
        readonly _tag: "SubmittedNewCard";
    } | {
        readonly _tag: "ChangedNewCardTitle";
        readonly value: string;
    } | {
        readonly _tag: "ClickedAddCard";
        readonly columnId: string;
    } | {
        readonly _tag: "CompletedGenerateCardId";
        readonly cardId: string;
        readonly columnId: string;
        readonly title: string;
    } | {
        readonly _tag: "GotDragAndDropMessage";
        readonly message: {
            readonly _tag: "AdvancedAutoScrollFrame";
        } | {
            readonly _tag: "CancelledDrag";
        } | {
            readonly _tag: "CompletedFocusItem";
        } | {
            readonly _tag: "ConfirmedKeyboardDrop";
        } | {
            readonly _tag: "ReleasedPointer";
        } | {
            readonly _tag: "ActivatedKeyboardDrag";
            readonly itemId: string;
            readonly containerId: string;
            readonly index: number;
        } | {
            readonly _tag: "CompletedResolveKeyboardMove";
            readonly targetContainerId: string;
            readonly targetIndex: number;
        } | {
            readonly _tag: "MovedPointer";
            readonly screenX: number;
            readonly screenY: number;
            readonly clientX: number;
            readonly clientY: number;
            readonly maybeDropTarget: Option.Option<{
                readonly containerId: string;
                readonly index: number;
            }>;
        } | {
            readonly _tag: "PressedArrowKey";
            readonly direction: "Down" | "Left" | "NextContainer" | "PreviousContainer" | "Right" | "Up";
        } | {
            readonly _tag: "PressedDraggable";
            readonly itemId: string;
            readonly containerId: string;
            readonly index: number;
            readonly screenX: number;
            readonly screenY: number;
        };
    }, Readonly<{
        maybeDependencies: Option.Option<{
            readonly isDragging: boolean;
            readonly clientY: number;
        }>;
    }>, never>;
};
