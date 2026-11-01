import { Effect, Option, Schema } from "effect";
import { Command, Route, Runtime, Update } from 'foldkit';
import { Document, HtmlBuilder } from 'foldkit/html';
export declare const Sorting: import("foldkit/schema").TaggedUnion<{
    readonly Unsorted: {};
    readonly Ascending: {
        column: Schema.Literals<readonly ["Name", "Period", "Diet", "Length", "Weight"]>;
    };
    readonly Descending: {
        column: Schema.Literals<readonly ["Name", "Period", "Diet", "Length", "Weight"]>;
    };
}>;
export type Sorting = typeof Sorting.Type;
export declare const AppRoute: Route.RouteUnion<{
    readonly Browse: {
        search: Schema.Option<Schema.String>;
        sorting: import("foldkit/schema").TaggedUnion<{
            readonly Unsorted: {};
            readonly Ascending: {
                column: Schema.Literals<readonly ["Name", "Period", "Diet", "Length", "Weight"]>;
            };
            readonly Descending: {
                column: Schema.Literals<readonly ["Name", "Period", "Diet", "Length", "Weight"]>;
            };
        }>;
        diet: Schema.Option<Schema.Literals<readonly ["Carnivore", "Herbivore", "Omnivore"]>>;
        period: Schema.Option<Schema.Literals<readonly ["Triassic", "Jurassic", "Cretaceous"]>>;
    };
    readonly NotFound: {
        path: Schema.String;
    };
}>;
export type AppRoute = typeof AppRoute.Type;
export declare const browseRouter: Route.Router<{
    readonly _tag: "Browse";
    readonly search: Option.Option<string>;
    readonly sorting: {
        readonly _tag: "Unsorted";
    } | {
        readonly _tag: "Ascending";
        readonly column: "Diet" | "Length" | "Name" | "Period" | "Weight";
    } | {
        readonly _tag: "Descending";
        readonly column: "Diet" | "Length" | "Name" | "Period" | "Weight";
    };
    readonly diet: Option.Option<"Carnivore" | "Herbivore" | "Omnivore">;
    readonly period: Option.Option<"Cretaceous" | "Jurassic" | "Triassic">;
}>;
export declare const Model: Schema.Struct<{
    readonly route: Route.RouteUnion<{
        readonly Browse: {
            search: Schema.Option<Schema.String>;
            sorting: import("foldkit/schema").TaggedUnion<{
                readonly Unsorted: {};
                readonly Ascending: {
                    column: Schema.Literals<readonly ["Name", "Period", "Diet", "Length", "Weight"]>;
                };
                readonly Descending: {
                    column: Schema.Literals<readonly ["Name", "Period", "Diet", "Length", "Weight"]>;
                };
            }>;
            diet: Schema.Option<Schema.Literals<readonly ["Carnivore", "Herbivore", "Omnivore"]>>;
            period: Schema.Option<Schema.Literals<readonly ["Triassic", "Jurassic", "Cretaceous"]>>;
        };
        readonly NotFound: {
            path: Schema.String;
        };
    }>;
    readonly dietListbox: Schema.Struct<{
        readonly id: Schema.String;
        readonly isOpen: Schema.Boolean;
        readonly isAnimated: Schema.Boolean;
        readonly isModal: Schema.Boolean;
        readonly orientation: Schema.Literals<readonly ["Vertical", "Horizontal"]>;
        readonly animation: Schema.Struct<{
            readonly id: Schema.String;
            readonly isShowing: Schema.Boolean;
            readonly transitionState: Schema.Literals<readonly ["Idle", "EnterStart", "EnterAnimating", "LeaveStart", "LeaveAnimating"]>;
            readonly transitionGeneration: Schema.Number;
        }>;
        readonly maybeActiveItemIndex: Schema.Option<Schema.Number>;
        readonly activationTrigger: Schema.Literals<readonly ["Pointer", "Keyboard"]>;
        readonly searchQuery: Schema.String;
        readonly searchVersion: Schema.Number;
        readonly maybeLastPointerPosition: Schema.Option<Schema.Struct<{
            readonly screenX: Schema.Number;
            readonly screenY: Schema.Number;
        }>>;
        readonly maybeLastButtonPointerType: Schema.Option<Schema.String>;
    }>;
    readonly periodListbox: Schema.Struct<{
        readonly id: Schema.String;
        readonly isOpen: Schema.Boolean;
        readonly isAnimated: Schema.Boolean;
        readonly isModal: Schema.Boolean;
        readonly orientation: Schema.Literals<readonly ["Vertical", "Horizontal"]>;
        readonly animation: Schema.Struct<{
            readonly id: Schema.String;
            readonly isShowing: Schema.Boolean;
            readonly transitionState: Schema.Literals<readonly ["Idle", "EnterStart", "EnterAnimating", "LeaveStart", "LeaveAnimating"]>;
            readonly transitionGeneration: Schema.Number;
        }>;
        readonly maybeActiveItemIndex: Schema.Option<Schema.Number>;
        readonly activationTrigger: Schema.Literals<readonly ["Pointer", "Keyboard"]>;
        readonly searchQuery: Schema.String;
        readonly searchVersion: Schema.Number;
        readonly maybeLastPointerPosition: Schema.Option<Schema.Struct<{
            readonly screenX: Schema.Number;
            readonly screenY: Schema.Number;
        }>>;
        readonly maybeLastButtonPointerType: Schema.Option<Schema.String>;
    }>;
}>;
export type Model = typeof Model.Type;
export declare const Message: import("foldkit/message").MessageUnion<{
    readonly CompletedNavigateInternal: {};
    readonly CompletedLoadExternal: {};
    readonly CompletedReplaceFilters: {};
    readonly ClickedLink: {
        request: import("foldkit/schema").TaggedUnion<{
            readonly Internal: {
                url: Schema.Struct<{
                    readonly protocol: Schema.String;
                    readonly host: Schema.String;
                    readonly port: Schema.Option<Schema.String>;
                    readonly pathname: Schema.String;
                    readonly search: Schema.Option<Schema.String>;
                    readonly hash: Schema.Option<Schema.String>;
                }>;
            };
            readonly External: {
                href: Schema.String;
            };
        }>;
    };
    readonly ChangedUrl: {
        url: Schema.Struct<{
            readonly protocol: Schema.String;
            readonly host: Schema.String;
            readonly port: Schema.Option<Schema.String>;
            readonly pathname: Schema.String;
            readonly search: Schema.Option<Schema.String>;
            readonly hash: Schema.Option<Schema.String>;
        }>;
    };
    readonly ChangedSearchInput: {
        value: Schema.String;
    };
    readonly ClickedColumnHeader: {
        column: Schema.Literals<readonly ["Name", "Period", "Diet", "Length", "Weight"]>;
    };
    readonly GotDietListboxMessage: {
        message: import("foldkit/message").MessageUnion<{
            readonly Opened: {
                maybeActiveItemIndex: Schema.Option<Schema.Number>;
            };
            readonly Closed: {};
            readonly BlurredItems: {};
            readonly ActivatedItem: {
                index: Schema.Number;
                activationTrigger: Schema.Literals<readonly ["Pointer", "Keyboard"]>;
            };
            readonly DeactivatedItem: {};
            readonly SelectedItem: {
                item: Schema.String;
            };
            readonly MovedPointerOverItem: {
                index: Schema.Number;
                screenX: Schema.Number;
                screenY: Schema.Number;
            };
            readonly RequestedItemClick: {
                index: Schema.Number;
            };
            readonly Searched: {
                key: Schema.String;
                maybeTargetIndex: Schema.Option<Schema.Number>;
            };
            readonly CompletedDelayClearSearch: {
                version: Schema.Number;
            };
            readonly CompletedLockScroll: {};
            readonly CompletedUnlockScroll: {};
            readonly CompletedInertOthers: {};
            readonly CompletedRestoreInert: {};
            readonly CompletedFocusButton: {};
            readonly CompletedFocusItems: {};
            readonly CompletedScrollIntoView: {};
            readonly CompletedClickItem: {};
            readonly ClickedButton: {};
            readonly IgnoredMouseClick: {};
            readonly SuppressedSpaceScroll: {};
            readonly SuppressedItemCommit: {};
            readonly CompletedAnchorListbox: {};
            readonly CompletedPortalListboxBackdrop: {};
            readonly GotAnimationMessage: {
                message: import("foldkit/message").MessageUnion<{
                    readonly Showed: {};
                    readonly Hid: {};
                    readonly CompletedWaitForPaint: {
                        generation: Schema.Number;
                    };
                    readonly EndedAnimation: {
                        generation: Schema.Number;
                    };
                }>;
            };
            readonly PressedPointerOnButton: {
                pointerType: Schema.String;
                button: Schema.Number;
            };
        }>;
    };
    readonly GotPeriodListboxMessage: {
        message: import("foldkit/message").MessageUnion<{
            readonly Opened: {
                maybeActiveItemIndex: Schema.Option<Schema.Number>;
            };
            readonly Closed: {};
            readonly BlurredItems: {};
            readonly ActivatedItem: {
                index: Schema.Number;
                activationTrigger: Schema.Literals<readonly ["Pointer", "Keyboard"]>;
            };
            readonly DeactivatedItem: {};
            readonly SelectedItem: {
                item: Schema.String;
            };
            readonly MovedPointerOverItem: {
                index: Schema.Number;
                screenX: Schema.Number;
                screenY: Schema.Number;
            };
            readonly RequestedItemClick: {
                index: Schema.Number;
            };
            readonly Searched: {
                key: Schema.String;
                maybeTargetIndex: Schema.Option<Schema.Number>;
            };
            readonly CompletedDelayClearSearch: {
                version: Schema.Number;
            };
            readonly CompletedLockScroll: {};
            readonly CompletedUnlockScroll: {};
            readonly CompletedInertOthers: {};
            readonly CompletedRestoreInert: {};
            readonly CompletedFocusButton: {};
            readonly CompletedFocusItems: {};
            readonly CompletedScrollIntoView: {};
            readonly CompletedClickItem: {};
            readonly ClickedButton: {};
            readonly IgnoredMouseClick: {};
            readonly SuppressedSpaceScroll: {};
            readonly SuppressedItemCommit: {};
            readonly CompletedAnchorListbox: {};
            readonly CompletedPortalListboxBackdrop: {};
            readonly GotAnimationMessage: {
                message: import("foldkit/message").MessageUnion<{
                    readonly Showed: {};
                    readonly Hid: {};
                    readonly CompletedWaitForPaint: {
                        generation: Schema.Number;
                    };
                    readonly EndedAnimation: {
                        generation: Schema.Number;
                    };
                }>;
            };
            readonly PressedPointerOnButton: {
                pointerType: Schema.String;
                button: Schema.Number;
            };
        }>;
    };
}>;
export type Message = typeof Message.Type;
export declare const init: Runtime.RoutingApplicationInit<Model, Message>;
export declare const ReplaceFilters: Command.CommandDefinitionWithArgs<"ReplaceFilters", {
    search: Schema.Option<Schema.String>;
    sorting: import("foldkit/schema").TaggedUnion<{
        readonly Unsorted: {};
        readonly Ascending: {
            column: Schema.Literals<readonly ["Name", "Period", "Diet", "Length", "Weight"]>;
        };
        readonly Descending: {
            column: Schema.Literals<readonly ["Name", "Period", "Diet", "Length", "Weight"]>;
        };
    }>;
    diet: Schema.Option<Schema.Literals<readonly ["Carnivore", "Herbivore", "Omnivore"]>>;
    period: Schema.Option<Schema.Literals<readonly ["Triassic", "Jurassic", "Cretaceous"]>>;
}, Effect.Effect<{
    readonly _tag: "CompletedReplaceFilters";
}, never, never>>;
export declare const update: (model: Model, message: Message) => Readonly<{
    model: {
        readonly route: {
            readonly _tag: "Browse";
            readonly search: Option.Option<string>;
            readonly sorting: {
                readonly _tag: "Unsorted";
            } | {
                readonly _tag: "Ascending";
                readonly column: "Diet" | "Length" | "Name" | "Period" | "Weight";
            } | {
                readonly _tag: "Descending";
                readonly column: "Diet" | "Length" | "Name" | "Period" | "Weight";
            };
            readonly diet: Option.Option<"Carnivore" | "Herbivore" | "Omnivore">;
            readonly period: Option.Option<"Cretaceous" | "Jurassic" | "Triassic">;
        } | {
            readonly _tag: "NotFound";
            readonly path: string;
        };
        readonly dietListbox: {
            readonly id: string;
            readonly isOpen: boolean;
            readonly isAnimated: boolean;
            readonly isModal: boolean;
            readonly orientation: "Horizontal" | "Vertical";
            readonly animation: {
                readonly id: string;
                readonly isShowing: boolean;
                readonly transitionState: "EnterAnimating" | "EnterStart" | "Idle" | "LeaveAnimating" | "LeaveStart";
                readonly transitionGeneration: number;
            };
            readonly maybeActiveItemIndex: Option.Option<number>;
            readonly activationTrigger: "Keyboard" | "Pointer";
            readonly searchQuery: string;
            readonly searchVersion: number;
            readonly maybeLastPointerPosition: Option.Option<{
                readonly screenX: number;
                readonly screenY: number;
            }>;
            readonly maybeLastButtonPointerType: Option.Option<string>;
        };
        readonly periodListbox: {
            readonly id: string;
            readonly isOpen: boolean;
            readonly isAnimated: boolean;
            readonly isModal: boolean;
            readonly orientation: "Horizontal" | "Vertical";
            readonly animation: {
                readonly id: string;
                readonly isShowing: boolean;
                readonly transitionState: "EnterAnimating" | "EnterStart" | "Idle" | "LeaveAnimating" | "LeaveStart";
                readonly transitionGeneration: number;
            };
            readonly maybeActiveItemIndex: Option.Option<number>;
            readonly activationTrigger: "Keyboard" | "Pointer";
            readonly searchQuery: string;
            readonly searchVersion: number;
            readonly maybeLastPointerPosition: Option.Option<{
                readonly screenX: number;
                readonly screenY: number;
            }>;
            readonly maybeLastButtonPointerType: Option.Option<string>;
        };
    };
    commands?: Update.Commands<{
        readonly _tag: "CompletedLoadExternal";
    } | {
        readonly _tag: "CompletedNavigateInternal";
    } | {
        readonly _tag: "CompletedReplaceFilters";
    } | {
        readonly _tag: "ChangedSearchInput";
        readonly value: string;
    } | {
        readonly _tag: "ChangedUrl";
        readonly url: {
            readonly protocol: string;
            readonly host: string;
            readonly port: Option.Option<string>;
            readonly pathname: string;
            readonly search: Option.Option<string>;
            readonly hash: Option.Option<string>;
        };
    } | {
        readonly _tag: "ClickedColumnHeader";
        readonly column: "Diet" | "Length" | "Name" | "Period" | "Weight";
    } | {
        readonly _tag: "ClickedLink";
        readonly request: {
            readonly _tag: "External";
            readonly href: string;
        } | {
            readonly _tag: "Internal";
            readonly url: {
                readonly protocol: string;
                readonly host: string;
                readonly port: Option.Option<string>;
                readonly pathname: string;
                readonly search: Option.Option<string>;
                readonly hash: Option.Option<string>;
            };
        };
    } | {
        readonly _tag: "GotDietListboxMessage";
        readonly message: {
            readonly _tag: "BlurredItems";
        } | {
            readonly _tag: "ClickedButton";
        } | {
            readonly _tag: "Closed";
        } | {
            readonly _tag: "CompletedAnchorListbox";
        } | {
            readonly _tag: "CompletedClickItem";
        } | {
            readonly _tag: "CompletedFocusButton";
        } | {
            readonly _tag: "CompletedFocusItems";
        } | {
            readonly _tag: "CompletedInertOthers";
        } | {
            readonly _tag: "CompletedLockScroll";
        } | {
            readonly _tag: "CompletedPortalListboxBackdrop";
        } | {
            readonly _tag: "CompletedRestoreInert";
        } | {
            readonly _tag: "CompletedScrollIntoView";
        } | {
            readonly _tag: "CompletedUnlockScroll";
        } | {
            readonly _tag: "DeactivatedItem";
        } | {
            readonly _tag: "IgnoredMouseClick";
        } | {
            readonly _tag: "SuppressedItemCommit";
        } | {
            readonly _tag: "SuppressedSpaceScroll";
        } | {
            readonly _tag: "ActivatedItem";
            readonly index: number;
            readonly activationTrigger: "Keyboard" | "Pointer";
        } | {
            readonly _tag: "CompletedDelayClearSearch";
            readonly version: number;
        } | {
            readonly _tag: "GotAnimationMessage";
            readonly message: {
                readonly _tag: "Hid";
            } | {
                readonly _tag: "Showed";
            } | {
                readonly _tag: "CompletedWaitForPaint";
                readonly generation: number;
            } | {
                readonly _tag: "EndedAnimation";
                readonly generation: number;
            };
        } | {
            readonly _tag: "MovedPointerOverItem";
            readonly index: number;
            readonly screenX: number;
            readonly screenY: number;
        } | {
            readonly _tag: "Opened";
            readonly maybeActiveItemIndex: Option.Option<number>;
        } | {
            readonly _tag: "PressedPointerOnButton";
            readonly pointerType: string;
            readonly button: number;
        } | {
            readonly _tag: "RequestedItemClick";
            readonly index: number;
        } | {
            readonly _tag: "Searched";
            readonly key: string;
            readonly maybeTargetIndex: Option.Option<number>;
        } | {
            readonly _tag: "SelectedItem";
            readonly item: string;
        };
    } | {
        readonly _tag: "GotPeriodListboxMessage";
        readonly message: {
            readonly _tag: "BlurredItems";
        } | {
            readonly _tag: "ClickedButton";
        } | {
            readonly _tag: "Closed";
        } | {
            readonly _tag: "CompletedAnchorListbox";
        } | {
            readonly _tag: "CompletedClickItem";
        } | {
            readonly _tag: "CompletedFocusButton";
        } | {
            readonly _tag: "CompletedFocusItems";
        } | {
            readonly _tag: "CompletedInertOthers";
        } | {
            readonly _tag: "CompletedLockScroll";
        } | {
            readonly _tag: "CompletedPortalListboxBackdrop";
        } | {
            readonly _tag: "CompletedRestoreInert";
        } | {
            readonly _tag: "CompletedScrollIntoView";
        } | {
            readonly _tag: "CompletedUnlockScroll";
        } | {
            readonly _tag: "DeactivatedItem";
        } | {
            readonly _tag: "IgnoredMouseClick";
        } | {
            readonly _tag: "SuppressedItemCommit";
        } | {
            readonly _tag: "SuppressedSpaceScroll";
        } | {
            readonly _tag: "ActivatedItem";
            readonly index: number;
            readonly activationTrigger: "Keyboard" | "Pointer";
        } | {
            readonly _tag: "CompletedDelayClearSearch";
            readonly version: number;
        } | {
            readonly _tag: "GotAnimationMessage";
            readonly message: {
                readonly _tag: "Hid";
            } | {
                readonly _tag: "Showed";
            } | {
                readonly _tag: "CompletedWaitForPaint";
                readonly generation: number;
            } | {
                readonly _tag: "EndedAnimation";
                readonly generation: number;
            };
        } | {
            readonly _tag: "MovedPointerOverItem";
            readonly index: number;
            readonly screenX: number;
            readonly screenY: number;
        } | {
            readonly _tag: "Opened";
            readonly maybeActiveItemIndex: Option.Option<number>;
        } | {
            readonly _tag: "PressedPointerOnButton";
            readonly pointerType: string;
            readonly button: number;
        } | {
            readonly _tag: "RequestedItemClick";
            readonly index: number;
        } | {
            readonly _tag: "Searched";
            readonly key: string;
            readonly maybeTargetIndex: Option.Option<number>;
        } | {
            readonly _tag: "SelectedItem";
            readonly item: string;
        };
    }, never>;
    outMessage?: never;
}>;
export declare const view: (model: Model, h: HtmlBuilder<Message>) => Document;
