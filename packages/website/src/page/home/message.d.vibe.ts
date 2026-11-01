import { Schema } from 'effect';
export declare const Message: import("foldkit/message").MessageUnion<{
    readonly GotDemoTabsMessage: {
        message: import("foldkit/message").MessageUnion<{
            readonly SelectedTab: {
                index: Schema.Number;
                value: Schema.String;
            };
            readonly FocusedTab: {
                index: Schema.Number;
            };
            readonly CompletedFocusTab: {};
        }>;
    };
    readonly GotPlaygroundMenuMessage: {
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
                index: Schema.Number;
                item: Schema.String;
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
            readonly MovedPointerOverItem: {
                index: Schema.Number;
                screenX: Schema.Number;
                screenY: Schema.Number;
            };
            readonly CompletedFocusItems: {};
            readonly CompletedFocusButton: {};
            readonly CompletedLockScroll: {};
            readonly CompletedUnlockScroll: {};
            readonly CompletedInertOthers: {};
            readonly CompletedRestoreInert: {};
            readonly CompletedScrollIntoView: {};
            readonly CompletedClickItem: {};
            readonly ClickedButton: {};
            readonly IgnoredMouseClick: {};
            readonly SuppressedSpaceScroll: {};
            readonly CompletedAnchorMenu: {};
            readonly CompletedPortalMenuBackdrop: {};
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
                screenX: Schema.Number;
                screenY: Schema.Number;
                timeStamp: Schema.Number;
            };
            readonly ReleasedPointerOnItems: {
                screenX: Schema.Number;
                screenY: Schema.Number;
                timeStamp: Schema.Number;
            };
        }>;
    };
    readonly GotAsyncCounterDemoMessage: {
        message: import("foldkit/message").MessageUnion<{
            readonly ClickedDemoIncrement: {};
            readonly ChangedDemoResetDuration: {
                seconds: Schema.Number;
            };
            readonly ClickedDemoReset: {};
            readonly CompletedDelayAdvancePhase: {
                generation: Schema.Number;
            };
        }>;
    };
    readonly GotNotePlayerDemoMessage: {
        message: import("foldkit/message").MessageUnion<{
            readonly ChangedNoteInput: {
                value: Schema.String;
            };
            readonly GotNoteDurationMessage: {
                message: import("foldkit/message").MessageUnion<{
                    readonly SelectedOption: {
                        index: Schema.Number;
                        value: Schema.String;
                    };
                    readonly FocusedOption: {
                        index: Schema.Number;
                    };
                    readonly CompletedFocusOption: {};
                }>;
            };
            readonly ClickedPlay: {};
            readonly ClickedPause: {};
            readonly ClickedStop: {};
            readonly CompletedPlayNote: {
                noteIndex: Schema.Number;
            };
            readonly CompletedDelayAdvancePhase: {
                generation: Schema.Number;
            };
            readonly SucceededAcquireAudioContext: {};
            readonly FailedAcquireAudioContext: {};
            readonly ReleasedAudioContext: {};
        }>;
    };
    readonly UpdatedNewsletterEmail: {
        value: Schema.String;
    };
}>;
export type Message = typeof Message.Type;
export declare const OutMessage: import("foldkit/message").MessageUnion<{
    readonly SelectedPlaygroundExample: {
        exampleSlug: Schema.Literals<readonly ["counter", "counters", "todo", "stopwatch", "crash-view", "slow-warnings", "form", "job-application", "weather", "api-cache", "api-cache-query", "charting", "routing", "route-transitions", "interrupting-commands", "view-transitions", "query-sync", "snake", "auth", "shopping-cart", "state-machine", "pixel-art", "websocket-chat", "managed-resource-layer", "kanban", "map", "canvas-art", "generative-art", "web-components", "embedding", "ssg", "ssr", "ui-showcase", "personal-blog", "livestore"]>;
    };
    readonly UpdatedNewsletterEmail: {
        value: Schema.String;
    };
}>;
export type OutMessage = typeof OutMessage.Type;
