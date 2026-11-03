import { Option } from 'effect';
import { type Html, type HtmlBuilder } from 'foldkit/html';
import { Menu } from '@foldkit/ui';
import { Message, type ThemePreference } from '../message.vibe';
export declare const ThemeMenu: Readonly<{
    view: import("foldkit/submodel").View<{
        readonly id: string;
        readonly isOpen: boolean;
        readonly isAnimated: boolean;
        readonly isModal: boolean;
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
        readonly maybePointerOrigin: Option.Option<{
            readonly screenX: number;
            readonly screenY: number;
            readonly timeStamp: number;
        }>;
    }, {
        readonly _tag: "BlurredItems";
    } | {
        readonly _tag: "ClickedButton";
    } | {
        readonly _tag: "Closed";
    } | {
        readonly _tag: "CompletedAnchorMenu";
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
        readonly _tag: "CompletedPortalMenuBackdrop";
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
        readonly screenX: number;
        readonly screenY: number;
        readonly timeStamp: number;
    } | {
        readonly _tag: "ReleasedPointerOnItems";
        readonly screenX: number;
        readonly screenY: number;
        readonly timeStamp: number;
    } | {
        readonly _tag: "RequestedItemClick";
        readonly index: number;
    } | {
        readonly _tag: "Searched";
        readonly key: string;
        readonly maybeTargetIndex: Option.Option<number>;
    } | {
        readonly _tag: "SelectedItem";
        readonly index: number;
        readonly item: string;
    }, Readonly<{
        items: readonly ("Dark" | "Light" | "System")[];
        itemToConfig: (item: "Dark" | "Light" | "System", context: Readonly<{
            isActive: boolean;
            isDisabled: boolean;
        }>) => Readonly<{
            className?: string;
            content: Html;
        }>;
        isItemDisabled?: (item: "Dark" | "Light" | "System", index: number) => boolean;
        itemToSearchText?: (item: "Dark" | "Light" | "System", index: number) => string;
        isButtonDisabled?: boolean;
        buttonContent: Html;
        buttonClassName?: string;
        buttonAttributes?: readonly Readonly<{
            readonly __childAttribute: true;
            readonly attribute: unknown;
            readonly dispatch: import("../../node_modules/foldkit/dist/html/runtimeSingleton").DispatchSync;
            readonly resolveUnmount: (message: unknown) => () => void;
            readonly boundaryMappers: ReadonlyArray<(message: unknown) => unknown>;
            readonly resolveMountDispatch?: import("../../node_modules/foldkit/dist/html/runtimeSingleton").MountDispatchResolver;
        }>[];
        itemsClassName?: string;
        itemsAttributes?: readonly Readonly<{
            readonly __childAttribute: true;
            readonly attribute: unknown;
            readonly dispatch: import("../../node_modules/foldkit/dist/html/runtimeSingleton").DispatchSync;
            readonly resolveUnmount: (message: unknown) => () => void;
            readonly boundaryMappers: ReadonlyArray<(message: unknown) => unknown>;
            readonly resolveMountDispatch?: import("../../node_modules/foldkit/dist/html/runtimeSingleton").MountDispatchResolver;
        }>[];
        itemsScrollClassName?: string;
        itemsScrollAttributes?: readonly Readonly<{
            readonly __childAttribute: true;
            readonly attribute: unknown;
            readonly dispatch: import("../../node_modules/foldkit/dist/html/runtimeSingleton").DispatchSync;
            readonly resolveUnmount: (message: unknown) => () => void;
            readonly boundaryMappers: ReadonlyArray<(message: unknown) => unknown>;
            readonly resolveMountDispatch?: import("../../node_modules/foldkit/dist/html/runtimeSingleton").MountDispatchResolver;
        }>[];
        backdropClassName?: string;
        backdropAttributes?: readonly Readonly<{
            readonly __childAttribute: true;
            readonly attribute: unknown;
            readonly dispatch: import("../../node_modules/foldkit/dist/html/runtimeSingleton").DispatchSync;
            readonly resolveUnmount: (message: unknown) => () => void;
            readonly boundaryMappers: ReadonlyArray<(message: unknown) => unknown>;
            readonly resolveMountDispatch?: import("../../node_modules/foldkit/dist/html/runtimeSingleton").MountDispatchResolver;
        }>[];
        className?: string;
        attributes?: readonly Readonly<{
            readonly __childAttribute: true;
            readonly attribute: unknown;
            readonly dispatch: import("../../node_modules/foldkit/dist/html/runtimeSingleton").DispatchSync;
            readonly resolveUnmount: (message: unknown) => () => void;
            readonly boundaryMappers: ReadonlyArray<(message: unknown) => unknown>;
            readonly resolveMountDispatch?: import("../../node_modules/foldkit/dist/html/runtimeSingleton").MountDispatchResolver;
        }>[];
        itemGroupKey?: (item: "Dark" | "Light" | "System", index: number) => string;
        groupToHeading?: (groupKey: string) => Menu.GroupHeading | undefined;
        groupClassName?: string;
        groupAttributes?: readonly Readonly<{
            readonly __childAttribute: true;
            readonly attribute: unknown;
            readonly dispatch: import("../../node_modules/foldkit/dist/html/runtimeSingleton").DispatchSync;
            readonly resolveUnmount: (message: unknown) => () => void;
            readonly boundaryMappers: ReadonlyArray<(message: unknown) => unknown>;
            readonly resolveMountDispatch?: import("../../node_modules/foldkit/dist/html/runtimeSingleton").MountDispatchResolver;
        }>[];
        separatorClassName?: string;
        separatorAttributes?: readonly Readonly<{
            readonly __childAttribute: true;
            readonly attribute: unknown;
            readonly dispatch: import("../../node_modules/foldkit/dist/html/runtimeSingleton").DispatchSync;
            readonly resolveUnmount: (message: unknown) => () => void;
            readonly boundaryMappers: ReadonlyArray<(message: unknown) => unknown>;
            readonly resolveMountDispatch?: import("../../node_modules/foldkit/dist/html/runtimeSingleton").MountDispatchResolver;
        }>[];
        anchor?: Menu.AnchorConfig;
        ariaLabel?: string;
        ariaLabelledBy?: string;
    }>>;
    update: (model: Menu.Model, message: Menu.Message) => Readonly<{
        model: {
            readonly id: string;
            readonly isOpen: boolean;
            readonly isAnimated: boolean;
            readonly isModal: boolean;
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
            readonly maybePointerOrigin: Option.Option<{
                readonly screenX: number;
                readonly screenY: number;
                readonly timeStamp: number;
            }>;
        };
        commands?: import("foldkit/update").Commands<{
            readonly _tag: "BlurredItems";
        } | {
            readonly _tag: "ClickedButton";
        } | {
            readonly _tag: "Closed";
        } | {
            readonly _tag: "CompletedAnchorMenu";
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
            readonly _tag: "CompletedPortalMenuBackdrop";
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
            readonly screenX: number;
            readonly screenY: number;
            readonly timeStamp: number;
        } | {
            readonly _tag: "ReleasedPointerOnItems";
            readonly screenX: number;
            readonly screenY: number;
            readonly timeStamp: number;
        } | {
            readonly _tag: "RequestedItemClick";
            readonly index: number;
        } | {
            readonly _tag: "Searched";
            readonly key: string;
            readonly maybeTargetIndex: Option.Option<number>;
        } | {
            readonly _tag: "SelectedItem";
            readonly index: number;
            readonly item: string;
        }, never>;
        outMessage?: Readonly<{
            readonly _tag: 'Selected';
            readonly value: "Dark" | "Light" | "System";
            readonly index: number;
        }>;
    }>;
    selectItem: (model: Menu.Model, item: "Dark" | "Light" | "System", index: number) => Readonly<{
        model: {
            readonly id: string;
            readonly isOpen: boolean;
            readonly isAnimated: boolean;
            readonly isModal: boolean;
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
            readonly maybePointerOrigin: Option.Option<{
                readonly screenX: number;
                readonly screenY: number;
                readonly timeStamp: number;
            }>;
        };
        commands?: import("foldkit/update").Commands<{
            readonly _tag: "BlurredItems";
        } | {
            readonly _tag: "ClickedButton";
        } | {
            readonly _tag: "Closed";
        } | {
            readonly _tag: "CompletedAnchorMenu";
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
            readonly _tag: "CompletedPortalMenuBackdrop";
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
            readonly screenX: number;
            readonly screenY: number;
            readonly timeStamp: number;
        } | {
            readonly _tag: "ReleasedPointerOnItems";
            readonly screenX: number;
            readonly screenY: number;
            readonly timeStamp: number;
        } | {
            readonly _tag: "RequestedItemClick";
            readonly index: number;
        } | {
            readonly _tag: "Searched";
            readonly key: string;
            readonly maybeTargetIndex: Option.Option<number>;
        } | {
            readonly _tag: "SelectedItem";
            readonly index: number;
            readonly item: string;
        }, never>;
        outMessage?: Readonly<{
            readonly _tag: 'Selected';
            readonly value: "Dark" | "Light" | "System";
            readonly index: number;
        }>;
    }>;
    open: (model: Menu.Model) => Readonly<{
        model: {
            readonly id: string;
            readonly isOpen: boolean;
            readonly isAnimated: boolean;
            readonly isModal: boolean;
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
            readonly maybePointerOrigin: Option.Option<{
                readonly screenX: number;
                readonly screenY: number;
                readonly timeStamp: number;
            }>;
        };
        commands?: import("foldkit/update").Commands<{
            readonly _tag: "BlurredItems";
        } | {
            readonly _tag: "ClickedButton";
        } | {
            readonly _tag: "Closed";
        } | {
            readonly _tag: "CompletedAnchorMenu";
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
            readonly _tag: "CompletedPortalMenuBackdrop";
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
            readonly screenX: number;
            readonly screenY: number;
            readonly timeStamp: number;
        } | {
            readonly _tag: "ReleasedPointerOnItems";
            readonly screenX: number;
            readonly screenY: number;
            readonly timeStamp: number;
        } | {
            readonly _tag: "RequestedItemClick";
            readonly index: number;
        } | {
            readonly _tag: "Searched";
            readonly key: string;
            readonly maybeTargetIndex: Option.Option<number>;
        } | {
            readonly _tag: "SelectedItem";
            readonly index: number;
            readonly item: string;
        }, never>;
        outMessage?: Readonly<{
            readonly _tag: 'Selected';
            readonly value: "Dark" | "Light" | "System";
            readonly index: number;
        }>;
    }>;
    close: (model: Menu.Model) => Readonly<{
        model: {
            readonly id: string;
            readonly isOpen: boolean;
            readonly isAnimated: boolean;
            readonly isModal: boolean;
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
            readonly maybePointerOrigin: Option.Option<{
                readonly screenX: number;
                readonly screenY: number;
                readonly timeStamp: number;
            }>;
        };
        commands?: import("foldkit/update").Commands<{
            readonly _tag: "BlurredItems";
        } | {
            readonly _tag: "ClickedButton";
        } | {
            readonly _tag: "Closed";
        } | {
            readonly _tag: "CompletedAnchorMenu";
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
            readonly _tag: "CompletedPortalMenuBackdrop";
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
            readonly screenX: number;
            readonly screenY: number;
            readonly timeStamp: number;
        } | {
            readonly _tag: "ReleasedPointerOnItems";
            readonly screenX: number;
            readonly screenY: number;
            readonly timeStamp: number;
        } | {
            readonly _tag: "RequestedItemClick";
            readonly index: number;
        } | {
            readonly _tag: "Searched";
            readonly key: string;
            readonly maybeTargetIndex: Option.Option<number>;
        } | {
            readonly _tag: "SelectedItem";
            readonly index: number;
            readonly item: string;
        }, never>;
        outMessage?: Readonly<{
            readonly _tag: 'Selected';
            readonly value: "Dark" | "Light" | "System";
            readonly index: number;
        }>;
    }>;
}>;
export declare const view: (menu: Menu.Model, maybeActivePreference: Option.Option<ThemePreference>, h: HtmlBuilder<Message>) => Html;
