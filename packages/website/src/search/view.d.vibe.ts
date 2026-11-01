import { Option } from 'effect';
import { Submodel } from 'foldkit';
export declare const view: Submodel.View<{
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
}, {
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
}, void>;
