import { Option } from 'effect';
import { Submodel } from 'foldkit';
import { type ResolvedTheme } from '../../colorScheme.vibe';
import { type CodeBlock } from '../../component/index.ts';
export declare const view: Submodel.View<{
    readonly demoTabs: {
        readonly id: string;
        readonly maybeFocusedIndex: Option.Option<number>;
        readonly activationMode: "Automatic" | "Manual";
    };
    readonly activeDemoTab: "Architecture" | "Note Player";
    readonly playgroundMenu: {
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
    readonly asyncCounterDemo: {
        readonly count: number;
        readonly isResetting: boolean;
        readonly resetDuration: number;
        readonly phase: "DurationMessage" | "DurationModel" | "DurationUpdate" | "Idle" | "IncrementMessage" | "IncrementModel" | "IncrementUpdate" | "ResetCommand" | "ResetCommandMessage" | "ResetCommandUpdate" | "ResetMessage" | "ResetModel" | "ResetUpdate";
        readonly generation: number;
        readonly messageLog: readonly string[];
    };
    readonly notePlayerDemo: {
        readonly noteInput: {
            readonly _tag: "Invalid";
            readonly value: string;
            readonly errors: readonly [string, ...string[]];
        } | {
            readonly _tag: "NotValidated";
            readonly value: string;
        } | {
            readonly _tag: "Valid";
            readonly value: string;
        } | {
            readonly _tag: "Validating";
            readonly value: string;
        };
        readonly noteDurationRadioGroup: {
            readonly id: string;
            readonly maybeFocusedIndex: Option.Option<number>;
        };
        readonly noteDuration: "Long" | "Medium" | "Short";
        readonly playbackState: {
            readonly _tag: "Idle";
        } | {
            readonly _tag: "Paused";
            readonly noteSequence: readonly ("A" | "B" | "C" | "D" | "E" | "F" | "G")[];
            readonly currentNoteIndex: number;
        } | {
            readonly _tag: "Playing";
            readonly noteSequence: readonly ("A" | "B" | "C" | "D" | "E" | "F" | "G")[];
            readonly currentNoteIndex: number;
        };
        readonly highlightPhase: "Idle" | "NoteCommand" | "NoteMessage" | "NoteModel" | "NoteUpdate" | "PauseMessage" | "PlayMessage" | "PlayModel" | "PlayUpdate";
        readonly generation: number;
        readonly messageLog: readonly string[];
        readonly audio: {
            readonly _tag: "Acquiring";
        } | {
            readonly _tag: "Ready";
        } | {
            readonly _tag: "Unavailable";
        };
    };
}, {
    readonly _tag: "GotAsyncCounterDemoMessage";
    readonly message: {
        readonly _tag: "ClickedDemoIncrement";
    } | {
        readonly _tag: "ClickedDemoReset";
    } | {
        readonly _tag: "ChangedDemoResetDuration";
        readonly seconds: number;
    } | {
        readonly _tag: "CompletedDelayAdvancePhase";
        readonly generation: number;
    };
} | {
    readonly _tag: "GotDemoTabsMessage";
    readonly message: {
        readonly _tag: "CompletedFocusTab";
    } | {
        readonly _tag: "FocusedTab";
        readonly index: number;
    } | {
        readonly _tag: "SelectedTab";
        readonly index: number;
        readonly value: string;
    };
} | {
    readonly _tag: "GotNotePlayerDemoMessage";
    readonly message: {
        readonly _tag: "ClickedPause";
    } | {
        readonly _tag: "ClickedPlay";
    } | {
        readonly _tag: "ClickedStop";
    } | {
        readonly _tag: "FailedAcquireAudioContext";
    } | {
        readonly _tag: "ReleasedAudioContext";
    } | {
        readonly _tag: "SucceededAcquireAudioContext";
    } | {
        readonly _tag: "ChangedNoteInput";
        readonly value: string;
    } | {
        readonly _tag: "CompletedDelayAdvancePhase";
        readonly generation: number;
    } | {
        readonly _tag: "CompletedPlayNote";
        readonly noteIndex: number;
    } | {
        readonly _tag: "GotNoteDurationMessage";
        readonly message: {
            readonly _tag: "CompletedFocusOption";
        } | {
            readonly _tag: "FocusedOption";
            readonly index: number;
        } | {
            readonly _tag: "SelectedOption";
            readonly index: number;
            readonly value: string;
        };
    };
} | {
    readonly _tag: "GotPlaygroundMenuMessage";
    readonly message: {
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
    };
} | {
    readonly _tag: "UpdatedNewsletterEmail";
    readonly value: string;
}, Readonly<{
    renderCopyButton: CodeBlock.RenderCopyButton;
    renderSnippet: CodeBlock.RenderSnippet;
    isNarrowViewport: boolean;
    maybeGitHubStarCount: Option.Option<number>;
    resolvedTheme: ResolvedTheme;
    isBrowserEnvironmentLoaded: boolean;
    newsletterEmail: string;
}>>;
