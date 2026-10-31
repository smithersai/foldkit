import { Effect, Option, Schema } from "effect";
import { Command, Update } from 'foldkit';
import { Message } from './message.vibe';
import type { Model } from './model.vibe';
import { PagefindService } from './pagefind.vibe';
export declare const SEARCH_INPUT_ID = "search-input";
export declare const KEYBOARD_WARMUP_INPUT_ID = "search-keyboard-warmup";
export declare const FetchSearchResults: Command.CommandDefinitionWithArgs<"FetchSearchResults", {
    query: Schema.String;
}, Effect.Effect<{
    readonly _tag: "CompletedFetchSearchResults";
    readonly results: readonly {
        readonly url: string;
        readonly title: string;
        readonly excerpt: string;
        readonly section: string;
        readonly kind: string;
    }[];
    readonly query: string;
}, never, PagefindService>>;
export declare const ScrollToResult: Command.CommandDefinitionWithArgs<"ScrollToResult", {
    index: Schema.Number;
}, Effect.Effect<{
    readonly _tag: "CompletedScrollToResult";
}, never, never>>;
export declare const NavigateToResult: Command.CommandDefinitionWithArgs<"NavigateToResult", {
    url: Schema.String;
}, Effect.Effect<{
    readonly _tag: "CompletedNavigateToResult";
}, never, never>>;
export declare const FocusSearchInput: Command.CommandDefinitionNoArgs<"FocusSearchInput", Effect.Effect<{
    readonly _tag: "CompletedFocusSearchInput";
}, never, never>>;
export type UpdateReturn = Update.Return<Model, Message, PagefindService>;
export declare const open: (model: Model) => UpdateReturn;
export declare const update: (model: Model, message: Message) => Readonly<{
    model: {
        readonly dialog: {
            readonly id: string;
            readonly isOpen: boolean;
            readonly isAnimated: boolean;
            readonly animation: {
                readonly id: string;
                readonly isShowing: boolean;
                readonly transitionState: "EnterAnimating" | "EnterStart" | "Idle" | "LeaveAnimating" | "LeaveStart";
                readonly transitionGeneration: number;
            };
            readonly maybeFocusSelector: Option.Option<string>;
        };
        readonly query: string;
        readonly searchState: {
            readonly _tag: "Idle";
        } | {
            readonly _tag: "Loading";
            readonly results: readonly {
                readonly url: string;
                readonly title: string;
                readonly excerpt: string;
                readonly section: string;
                readonly kind: string;
            }[];
        } | {
            readonly _tag: "Ok";
            readonly results: readonly {
                readonly url: string;
                readonly title: string;
                readonly excerpt: string;
                readonly section: string;
                readonly kind: string;
            }[];
        };
        readonly activeResultIndex: number;
    };
    commands?: Update.Commands<{
        readonly _tag: "ClearedSearchQuery";
    } | {
        readonly _tag: "CompletedFocusSearchInput";
    } | {
        readonly _tag: "CompletedNavigateToResult";
    } | {
        readonly _tag: "CompletedScrollToResult";
    } | {
        readonly _tag: "CompletedFetchSearchResults";
        readonly results: readonly {
            readonly url: string;
            readonly title: string;
            readonly excerpt: string;
            readonly section: string;
            readonly kind: string;
        }[];
        readonly query: string;
    } | {
        readonly _tag: "GotSearchDialogMessage";
        readonly message: {
            readonly _tag: "CompletedCloseDialog";
        } | {
            readonly _tag: "CompletedReleaseDialogResources";
        } | {
            readonly _tag: "FailedAcquireResources";
        } | {
            readonly _tag: "FailedShowDialog";
        } | {
            readonly _tag: "RequestedClose";
        } | {
            readonly _tag: "RequestedOpen";
        } | {
            readonly _tag: "SucceededAcquireResources";
        } | {
            readonly _tag: "SucceededShowDialog";
        } | {
            readonly _tag: "Unmounted";
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
        };
    } | {
        readonly _tag: "PressedArrowKey";
        readonly direction: "Down" | "Up";
    } | {
        readonly _tag: "SelectedSearchResult";
        readonly url: string;
    } | {
        readonly _tag: "UpdatedSearchQuery";
        readonly query: string;
    }, PagefindService>;
    outMessage?: never;
}>;
export declare const informRouteChanged: (model: Model) => UpdateReturn;
