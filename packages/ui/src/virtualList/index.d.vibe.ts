import { Effect, Schema } from 'effect';
import { Update } from 'foldkit';
import * as Command from 'foldkit/command';
import { type ChildAttribute, type Html, type TagName } from 'foldkit/html';
import * as Mount from 'foldkit/mount';
import { type View as SubmodelView } from 'foldkit/submodel';
/** Alignment of a row within the viewport after a programmatic scroll. */
export declare const ScrollAlignment: Schema.Literals<readonly ["Start", "Center", "End", "Nearest"]>;
export type ScrollAlignment = typeof ScrollAlignment.Type;
/** Logical destination for initial and programmatic scrolling. */
export declare const ScrollTarget: import("foldkit/schema").TaggedUnion<{
    readonly Index: {
        index: Schema.Number;
    };
    readonly Key: {
        key: Schema.String;
    };
    readonly Offset: {
        offset: Schema.Number;
    };
    readonly End: {};
}>;
export type ScrollTarget = typeof ScrollTarget.Type;
/** Outcome of applying a logical scroll request after the view commits. */
export declare const ApplyScrollOutcome: import("foldkit/schema").TaggedUnion<{
    readonly Applied: {
        scrollTop: Schema.Number;
        scrollHeight: Schema.Number;
        containerHeight: Schema.Number;
        anchor: import("foldkit/schema").TaggedUnion<{
            readonly None: {};
            readonly Row: {
                key: Schema.String;
                index: Schema.Number;
                viewportOffset: Schema.Number;
            };
        }>;
    };
    readonly Skipped: {};
}>;
/** Schema for the virtual list's state. Tracks scroll position, container
 *  measurement, and any in-flight programmatic scroll. */
export declare const Model: Schema.Struct<{
    readonly id: Schema.String;
    readonly rowHeightPx: Schema.Number;
    readonly scrollTop: Schema.Number;
    readonly measurement: import("foldkit/schema").TaggedUnion<{
        readonly Unmeasured: {};
        readonly Measured: {
            containerWidth: Schema.Number;
            containerHeight: Schema.Number;
        };
    }>;
    readonly viewportAnchor: import("foldkit/schema").TaggedUnion<{
        readonly Offset: {
            scrollTop: Schema.Number;
        };
        readonly Row: {
            key: Schema.String;
            index: Schema.Number;
            viewportOffset: Schema.Number;
        };
        readonly End: {};
    }>;
    readonly measuredRowHeights: Schema.$Record<Schema.String, Schema.Number>;
    readonly layoutVersion: Schema.Number;
    readonly initialScroll: import("foldkit/schema").TaggedUnion<{
        readonly Applied: {};
        readonly Pending: {
            target: import("foldkit/schema").TaggedUnion<{
                readonly Index: {
                    index: Schema.Number;
                };
                readonly Key: {
                    key: Schema.String;
                };
                readonly Offset: {
                    offset: Schema.Number;
                };
                readonly End: {};
            }>;
            alignment: Schema.Literals<readonly ["Start", "Center", "End", "Nearest"]>;
        };
    }>;
    readonly endBehavior: import("foldkit/schema").TaggedUnion<{
        readonly PreserveAnchor: {};
        readonly Follow: {
            thresholdPx: Schema.Number;
        };
    }>;
    readonly pendingScroll: import("foldkit/schema").TaggedUnion<{
        readonly Idle: {};
        readonly Pending: {
            request: import("foldkit/schema").TaggedUnion<{
                readonly Target: {
                    target: import("foldkit/schema").TaggedUnion<{
                        readonly Index: {
                            index: Schema.Number;
                        };
                        readonly Key: {
                            key: Schema.String;
                        };
                        readonly Offset: {
                            offset: Schema.Number;
                        };
                        readonly End: {};
                    }>;
                    alignment: Schema.Literals<readonly ["Start", "Center", "End", "Nearest"]>;
                };
                readonly Anchor: {
                    anchor: import("foldkit/schema").TaggedUnion<{
                        readonly Offset: {
                            scrollTop: Schema.Number;
                        };
                        readonly Row: {
                            key: Schema.String;
                            index: Schema.Number;
                            viewportOffset: Schema.Number;
                        };
                        readonly End: {};
                    }>;
                };
            }>;
            version: Schema.Number;
        };
    }>;
    readonly pendingScrollVersion: Schema.Number;
}>;
export type Model = typeof Model.Type;
/** Union of all messages the virtual list component can produce. */
export declare const Message: import("foldkit/message").MessageUnion<{
    readonly ObservedContainerScroll: {
        scrollTop: Schema.Number;
        scrollHeight: Schema.Number;
        containerHeight: Schema.Number;
        anchor: import("foldkit/schema").TaggedUnion<{
            readonly None: {};
            readonly Row: {
                key: Schema.String;
                index: Schema.Number;
                viewportOffset: Schema.Number;
            };
        }>;
    };
    readonly ResizedContainer: {
        containerWidth: Schema.Number;
        containerHeight: Schema.Number;
    };
    readonly MeasuredRows: {
        measurements: Schema.$Array<Schema.Struct<{
            readonly key: Schema.String;
            readonly height: Schema.Number;
            readonly layoutVersion: Schema.Number;
        }>>;
    };
    readonly CompletedApplyScroll: {
        version: Schema.Number;
        outcome: import("foldkit/schema").TaggedUnion<{
            readonly Applied: {
                scrollTop: Schema.Number;
                scrollHeight: Schema.Number;
                containerHeight: Schema.Number;
                anchor: import("foldkit/schema").TaggedUnion<{
                    readonly None: {};
                    readonly Row: {
                        key: Schema.String;
                        index: Schema.Number;
                        viewportOffset: Schema.Number;
                    };
                }>;
            };
            readonly Skipped: {};
        }>;
    };
}>;
export type Message = typeof Message.Type;
/** Configuration for creating a virtual list model with `init`. */
export type InitConfig = Readonly<{
    id: string;
    rowHeightPx: number;
    initialScrollTop?: number;
    initialScroll?: Readonly<{
        target: ScrollTarget;
        alignment?: ScrollAlignment;
    }>;
    followEnd?: Readonly<{
        thresholdPx?: number;
    }>;
}>;
/** Creates an initial virtual list model from a config. The container starts
 *  in `Unmeasured` state until its Mount reports the first measurement. */
export declare const init: (config: InitConfig) => Model;
export declare const ApplyScroll: Command.CommandDefinitionWithArgs<"ApplyScroll", {
    id: Schema.String;
    request: import("foldkit/schema").TaggedUnion<{
        readonly Target: {
            target: import("foldkit/schema").TaggedUnion<{
                readonly Index: {
                    index: Schema.Number;
                };
                readonly Key: {
                    key: Schema.String;
                };
                readonly Offset: {
                    offset: Schema.Number;
                };
                readonly End: {};
            }>;
            alignment: Schema.Literals<readonly ["Start", "Center", "End", "Nearest"]>;
        };
        readonly Anchor: {
            anchor: import("foldkit/schema").TaggedUnion<{
                readonly Offset: {
                    scrollTop: Schema.Number;
                };
                readonly Row: {
                    key: Schema.String;
                    index: Schema.Number;
                    viewportOffset: Schema.Number;
                };
                readonly End: {};
            }>;
        };
    }>;
    version: Schema.Number;
}, Effect.Effect<{
    readonly _tag: "CompletedApplyScroll";
    readonly version: number;
    readonly outcome: {
        readonly _tag: "Skipped";
    } | {
        readonly _tag: "Applied";
        readonly scrollTop: number;
        readonly scrollHeight: number;
        readonly containerHeight: number;
        readonly anchor: {
            readonly _tag: "None";
        } | {
            readonly _tag: "Row";
            readonly key: string;
            readonly index: number;
            readonly viewportOffset: number;
        };
    };
}, never, never>>;
type ScrollReturn = Update.Return<Model, Message>;
/** Options shared by row-targeted programmatic scrolling helpers. */
export type ScrollToOptions = Readonly<{
    alignment?: ScrollAlignment;
}>;
/** Processes a VirtualList Message and returns the next Model and optional Commands. */
export declare const update: (model: Model, message: Message) => Readonly<{
    model: {
        readonly id: string;
        readonly rowHeightPx: number;
        readonly scrollTop: number;
        readonly measurement: {
            readonly _tag: "Unmeasured";
        } | {
            readonly _tag: "Measured";
            readonly containerWidth: number;
            readonly containerHeight: number;
        };
        readonly viewportAnchor: {
            readonly _tag: "End";
        } | {
            readonly _tag: "Offset";
            readonly scrollTop: number;
        } | {
            readonly _tag: "Row";
            readonly key: string;
            readonly index: number;
            readonly viewportOffset: number;
        };
        readonly measuredRowHeights: {
            readonly [x: string]: number;
        };
        readonly layoutVersion: number;
        readonly initialScroll: {
            readonly _tag: "Applied";
        } | {
            readonly _tag: "Pending";
            readonly target: {
                readonly _tag: "End";
            } | {
                readonly _tag: "Index";
                readonly index: number;
            } | {
                readonly _tag: "Key";
                readonly key: string;
            } | {
                readonly _tag: "Offset";
                readonly offset: number;
            };
            readonly alignment: "Center" | "End" | "Nearest" | "Start";
        };
        readonly endBehavior: {
            readonly _tag: "PreserveAnchor";
        } | {
            readonly _tag: "Follow";
            readonly thresholdPx: number;
        };
        readonly pendingScroll: {
            readonly _tag: "Idle";
        } | {
            readonly _tag: "Pending";
            readonly request: {
                readonly _tag: "Anchor";
                readonly anchor: {
                    readonly _tag: "End";
                } | {
                    readonly _tag: "Offset";
                    readonly scrollTop: number;
                } | {
                    readonly _tag: "Row";
                    readonly key: string;
                    readonly index: number;
                    readonly viewportOffset: number;
                };
            } | {
                readonly _tag: "Target";
                readonly target: {
                    readonly _tag: "End";
                } | {
                    readonly _tag: "Index";
                    readonly index: number;
                } | {
                    readonly _tag: "Key";
                    readonly key: string;
                } | {
                    readonly _tag: "Offset";
                    readonly offset: number;
                };
                readonly alignment: "Center" | "End" | "Nearest" | "Start";
            };
            readonly version: number;
        };
        readonly pendingScrollVersion: number;
    };
    commands?: Update.Commands<{
        readonly _tag: "CompletedApplyScroll";
        readonly version: number;
        readonly outcome: {
            readonly _tag: "Skipped";
        } | {
            readonly _tag: "Applied";
            readonly scrollTop: number;
            readonly scrollHeight: number;
            readonly containerHeight: number;
            readonly anchor: {
                readonly _tag: "None";
            } | {
                readonly _tag: "Row";
                readonly key: string;
                readonly index: number;
                readonly viewportOffset: number;
            };
        };
    } | {
        readonly _tag: "MeasuredRows";
        readonly measurements: readonly {
            readonly key: string;
            readonly height: number;
            readonly layoutVersion: number;
        }[];
    } | {
        readonly _tag: "ObservedContainerScroll";
        readonly scrollTop: number;
        readonly scrollHeight: number;
        readonly containerHeight: number;
        readonly anchor: {
            readonly _tag: "None";
        } | {
            readonly _tag: "Row";
            readonly key: string;
            readonly index: number;
            readonly viewportOffset: number;
        };
    } | {
        readonly _tag: "ResizedContainer";
        readonly containerWidth: number;
        readonly containerHeight: number;
    }, never>;
    outMessage?: never;
}>;
/** Programmatically scrolls to a logical target. */
export declare const scrollTo: (model: Model, target: ScrollTarget, options?: ScrollToOptions) => ScrollReturn;
/** Programmatically scrolls the container so the row at `index` is visible.
 *  The next view resolves the logical index with its current sizing mode, and
 *  the Command aligns the live rendered row. */
export declare const scrollToIndex: (model: Model, index: number, options?: ScrollToOptions) => ScrollReturn;
/** Programmatically scrolls to the row whose `itemToKey` result matches
 *  `key`. The next view resolves the key against its current items. */
export declare const scrollToKey: (model: Model, key: string, options?: ScrollToOptions) => ScrollReturn;
/** Programmatically scrolls to an exact pixel offset from the start of the
 *  list. Negative offsets clamp to zero. */
export declare const scrollToOffset: (model: Model, offset: number) => ScrollReturn;
/** Programmatically scrolls to the end of the list. */
export declare const scrollToEnd: (model: Model) => ScrollReturn;
/** Notifies VirtualList that its parent-owned items changed. The next view
 *  resolves the stored stable-key anchor against the new items, and the
 *  Command restores that anchor after the DOM patch. */
export declare const informItemsChanged: (model: Model, itemKeys: ReadonlyArray<string>) => ScrollReturn;
/** Alignment of content when its total height is shorter than the viewport. */
export declare const ContentAlignment: Schema.Literals<readonly ["Start", "End"]>;
export type ContentAlignment = typeof ContentAlignment.Type;
/** Container-owned Mount that tracks scrolling, container resizing, and
 *  rendered row measurements for dynamic-height lists. */
export declare const ObserveVirtualList: Mount.MountDefinitionWithArgs<"ObserveVirtualList", {
    id: Schema.String;
}, {
    readonly _tag: "MeasuredRows";
    readonly measurements: readonly {
        readonly key: string;
        readonly height: number;
        readonly layoutVersion: number;
    }[];
} | {
    readonly _tag: "ObservedContainerScroll";
    readonly scrollTop: number;
    readonly scrollHeight: number;
    readonly containerHeight: number;
    readonly anchor: {
        readonly _tag: "None";
    } | {
        readonly _tag: "Row";
        readonly key: string;
        readonly index: number;
        readonly viewportOffset: number;
    };
} | {
    readonly _tag: "ResizedContainer";
    readonly containerWidth: number;
    readonly containerHeight: number;
}>;
/** Per-render view inputs passed to `view` via `h.submodel`'s `viewInputs` field.
 *
 *  VirtualList owns scroll and resize observation through a Mount on its
 *  container. Dynamic rows are measured by the same lifecycle owner. */
type BaseViewInputs<Item> = Readonly<{
    items: ReadonlyArray<Item>;
    itemToKey: (item: Item, index: number) => string;
    itemToView: (item: Item, index: number) => Html;
    overscan?: number;
    rowElement?: Exclude<TagName, 'textarea'>;
    containerClassName?: string;
    containerAttributes?: ReadonlyArray<ChildAttribute>;
    contentAlignment?: ContentAlignment;
}>;
/** Mutually exclusive configuration for fixed, exact variable, or measured
 *  dynamic row heights. */
export type RowHeightInputs<Item> = Readonly<{
    itemToRowHeightPx?: undefined;
    dynamicRowHeights?: undefined;
    itemToEstimatedRowHeightPx?: never;
}> | Readonly<{
    itemToRowHeightPx?: never;
    dynamicRowHeights: true;
    itemToEstimatedRowHeightPx?: (item: Item, index: number) => number;
}> | Readonly<{
    itemToRowHeightPx: (item: Item, index: number) => number;
    dynamicRowHeights?: never;
    itemToEstimatedRowHeightPx?: never;
}>;
export type ViewInputs<Item> = BaseViewInputs<Item> & RowHeightInputs<Item>;
/** Renders a virtualized list. Only items inside the viewport (plus an
 *  overscan buffer) are mounted; spacer elements above and below the
 *  slice keep the scrollbar's apparent total height correct.
 *
 *  Generic over `Item`: call as `VirtualList.view<MyItem>()` at the
 *  embed site to get a `SubmodelView` typed for your item type. The
 *  underlying view implementation is shared; the call only narrows the
 *  type. */
type ViewForItem<Item> = SubmodelView<Model, Message, ViewInputs<Item>>;
export declare const view: <Item>() => ViewForItem<Item>;
export {};
