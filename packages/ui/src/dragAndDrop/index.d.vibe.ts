import { Effect, Equivalence, Option, Schema, Stream } from 'effect';
import * as Command from 'foldkit/command';
import { type Attribute, type HtmlBuilder } from 'foldkit/html';
import * as Subscription from 'foldkit/subscription';
import * as Update from 'foldkit/update';
declare const DropTarget: Schema.Struct<{
    readonly containerId: Schema.String;
    readonly index: Schema.Number;
}>;
/** Schema for the current pointer or keyboard drag phase. */
export declare const DragState: import("foldkit/schema").TaggedUnion<{
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
/** Current pointer or keyboard drag phase. */
export type DragState = typeof DragState.Type;
/** Schema for the drag-and-drop component's state, tracking its unique ID, orientation, and current drag phase. */
export declare const Model: Schema.Struct<{
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
export type Model = typeof Model.Type;
/** Union of all messages the drag-and-drop component can produce. */
export declare const Message: import("foldkit/message").MessageUnion<{
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
export type Message = typeof Message.Type;
/** Union of all out-messages the drag-and-drop component can emit to its parent. */
export declare const OutMessage: import("foldkit/message").MessageUnion<{
    readonly Reordered: {
        itemId: Schema.String;
        fromContainerId: Schema.String;
        fromIndex: Schema.Number;
        toContainerId: Schema.String;
        toIndex: Schema.Number;
    };
    readonly Cancelled: {};
}>;
export type OutMessage = typeof OutMessage.Type;
export type InitConfig = Readonly<{
    id: string;
    orientation?: 'Horizontal' | 'Vertical';
    activationThreshold?: number;
}>;
/** Creates an initial drag-and-drop model. Starts idle with Vertical orientation and a 5px activation threshold by default. */
export declare const init: (config: InitConfig) => Model;
/** Focuses a draggable item by ID after a keyboard move, drop, or cancel. */
export declare const FocusItem: Command.CommandDefinitionWithArgs<"FocusItem", {
    itemId: Schema.String;
}, Effect.Effect<{
    readonly _tag: "CompletedFocusItem";
}, never, never>>;
/** Resolves the next keyboard drag position by querying the DOM for adjacent sortable items and containers. */
export declare const ResolveKeyboardMove: Command.CommandDefinitionWithArgs<"ResolveKeyboardMove", {
    itemId: Schema.String;
    currentContainerId: Schema.String;
    currentIndex: Schema.Number;
    direction: Schema.Literals<readonly ["Up", "Down", "Left", "Right", "NextContainer", "PreviousContainer"]>;
}, Effect.Effect<{
    readonly _tag: "CompletedResolveKeyboardMove";
    readonly targetContainerId: string;
    readonly targetIndex: number;
}, never, never>>;
/** Processes a drag-and-drop Message and returns the next Model, optional
 *  Commands, and an optional OutMessage for the parent. */
export declare const update: (model: Model, message: Message) => Readonly<{
    model: {
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
    commands?: Update.Commands<{
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
    }, never>;
    outMessage?: {
        readonly _tag: "Cancelled";
    } | {
        readonly _tag: "Reordered";
        readonly itemId: string;
        readonly fromContainerId: string;
        readonly fromIndex: number;
        readonly toContainerId: string;
        readonly toIndex: number;
    };
}>;
/** Document-level subscriptions for pointer and keyboard events during drag operations. */
export declare const subscriptions: {
    readonly documentPointer: Subscription.EntryWithoutKeepAlive<{
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
    }, {
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
    }, {
        readonly dragActivity: "Active" | "Idle";
        readonly orientation: "Horizontal" | "Vertical";
    }, never> & {
        readonly __subscription: never;
    };
    readonly documentEscape: Subscription.EntryWithoutKeepAlive<{
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
    }, {
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
    }, {
        readonly dragActivity: "Active" | "Idle";
    }, never> & {
        readonly __subscription: never;
    };
    readonly documentKeyboard: Subscription.EntryWithoutKeepAlive<{
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
    }, {
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
    }, {
        readonly dragActivity: "Active" | "Idle";
    }, never> & {
        readonly __subscription: never;
    };
    readonly autoScroll: {
        readonly dependenciesSchema: Schema.Schema<{
            readonly isDragging: boolean;
            readonly clientY: number;
        }> & {
            readonly fields: Schema.Struct.Fields;
        };
        readonly modelToDependencies: (model: {
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
        }) => {
            readonly isDragging: boolean;
            readonly clientY: number;
        };
        readonly keepAliveEquivalence: Equivalence.Equivalence<{
            readonly isDragging: boolean;
            readonly clientY: number;
        }>;
        readonly dependenciesToStream: (dependencies: {
            readonly isDragging: boolean;
            readonly clientY: number;
        }, readDependencies: () => {
            readonly isDragging: boolean;
            readonly clientY: number;
        }) => Stream.Stream<{
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
        }, never, never>;
    } & {
        readonly __subscription: never;
    };
};
/** Messages the draggable view helper can dispatch. */
export type DraggableMessage = typeof Message.PressedDraggable.Type | typeof Message.ActivatedKeyboardDrag.Type;
/** Configuration for creating draggable attributes with `draggable`. */
export type DraggableConfig<ParentMessage> = Readonly<{
    model: Model;
    toParentMessage: (message: DraggableMessage) => ParentMessage;
    itemId: string;
    containerId: string;
    index: number;
}>;
/** Returns attributes the parent attaches to a draggable element. Handles pointer-down, keyboard activation, and ARIA. */
export declare const draggable: <ParentMessage>(config: DraggableConfig<ParentMessage>, h: HtmlBuilder<ParentMessage>) => ReadonlyArray<Attribute<ParentMessage>>;
/** Returns attributes the parent attaches to a droppable container element.
 *  Handler-free, so the bundle is built with `inertHtml` and spreads into
 *  any Message universe's attribute array. */
export declare const droppable: (containerId: string, label?: string) => ReadonlyArray<Attribute<never>>;
/** Returns attributes the parent attaches to a sortable item element.
 *  Typically combined with `draggable`. Handler-free, so the bundle is built
 *  with `inertHtml` and spreads into any Message universe's attribute
 *  array. */
export declare const sortable: (itemId: string) => ReadonlyArray<Attribute<never>>;
/** Returns positioning styles for the ghost element, or None when not dragging with a pointer. */
export declare const ghostStyle: (model: Model) => Option.Option<Record<string, string>>;
/** Returns true when the component is actively dragging (pointer or keyboard). */
export declare const isDragging: ({ dragState: { _tag } }: Model) => boolean;
/** Returns the ID of the item currently being dragged or pending, if any. */
export declare const maybeDraggedItemId: (model: Model) => Option.Option<string>;
/** Returns the current drop target, if any. Populated during pointer drag (from collision detection) and keyboard drag (from resolved position). */
export declare const maybeDropTarget: (model: Model) => Option.Option<typeof DropTarget.Type>;
export {};
