import { Option } from 'effect';
import { Subscription } from 'foldkit';
import { RoomsClient } from '../../rpc.vibe';
export declare const subscriptions: {
    readonly roomStream: Subscription.EntryWithoutKeepAlive<{
        readonly roomAsyncData: import("foldkit/asyncData").AsyncData<{
            readonly id: string;
            readonly players: readonly {
                readonly id: string;
                readonly username: string;
            }[];
            readonly hostId: string;
            readonly status: {
                readonly _tag: "Finished";
            } | {
                readonly _tag: "GetReady";
            } | {
                readonly _tag: "Waiting";
            } | {
                readonly _tag: "Countdown";
                readonly secondsLeft: number;
            } | {
                readonly _tag: "Playing";
                readonly secondsLeft: number;
            };
            readonly maybeGame: Option.Option<{
                readonly id: string;
                readonly text: string;
            }>;
            readonly maybeScoreboard: Option.Option<readonly {
                readonly playerId: string;
                readonly username: string;
                readonly wpm: number;
                readonly accuracy: number;
                readonly charsTyped: number;
                readonly correctChars: number;
            }[]>;
            readonly createdAt: number;
            readonly usedGameTexts: readonly string[];
        }, string>;
        readonly maybeSession: Option.Option<{
            readonly roomId: string;
            readonly player: {
                readonly id: string;
                readonly username: string;
            };
        }>;
        readonly userGameText: string;
        readonly charsTyped: number;
        readonly username: string;
        readonly isRoomIdCopyIndicatorVisible: boolean;
        readonly exitCountdownSecondsLeft: number;
    }, {
        readonly _tag: "BlurredRoomPageUsernameInput";
    } | {
        readonly _tag: "ClickedCopyRoomId";
    } | {
        readonly _tag: "CompletedClearSession";
    } | {
        readonly _tag: "CompletedFocusRoomPageUsernameInput";
    } | {
        readonly _tag: "CompletedFocusUserGameTextInput";
    } | {
        readonly _tag: "CompletedNavigateHome";
    } | {
        readonly _tag: "CompletedSavePlayerSession";
    } | {
        readonly _tag: "CompletedUpdatePlayerProgress";
    } | {
        readonly _tag: "CompletedWaitBeforeHidingRoomIdCopiedIndicator";
    } | {
        readonly _tag: "CompletedWaitForExitCountdownInterval";
    } | {
        readonly _tag: "FailedCopyRoomId";
    } | {
        readonly _tag: "FailedFetchRoom";
    } | {
        readonly _tag: "FailedJoinRoom";
    } | {
        readonly _tag: "FailedStartGame";
    } | {
        readonly _tag: "SubmittedJoinRoomFromPage";
    } | {
        readonly _tag: "SucceededCopyRoomId";
    } | {
        readonly _tag: "SucceededStartGame";
    } | {
        readonly _tag: "ChangedRoomPageUsername";
        readonly value: string;
    } | {
        readonly _tag: "ChangedUserText";
        readonly value: string;
    } | {
        readonly _tag: "CompletedLoadSession";
        readonly maybeSession: Option.Option<{
            readonly roomId: string;
            readonly player: {
                readonly id: string;
                readonly username: string;
            };
        }>;
    } | {
        readonly _tag: "FailedStreamRoom";
        readonly error: string;
    } | {
        readonly _tag: "PressedKey";
        readonly key: string;
    } | {
        readonly _tag: "SucceededFetchRoom";
        readonly room: {
            readonly id: string;
            readonly players: readonly {
                readonly id: string;
                readonly username: string;
            }[];
            readonly hostId: string;
            readonly status: {
                readonly _tag: "Finished";
            } | {
                readonly _tag: "GetReady";
            } | {
                readonly _tag: "Waiting";
            } | {
                readonly _tag: "Countdown";
                readonly secondsLeft: number;
            } | {
                readonly _tag: "Playing";
                readonly secondsLeft: number;
            };
            readonly maybeGame: Option.Option<{
                readonly id: string;
                readonly text: string;
            }>;
            readonly maybeScoreboard: Option.Option<readonly {
                readonly playerId: string;
                readonly username: string;
                readonly wpm: number;
                readonly accuracy: number;
                readonly charsTyped: number;
                readonly correctChars: number;
            }[]>;
            readonly createdAt: number;
            readonly usedGameTexts: readonly string[];
        };
    } | {
        readonly _tag: "SucceededJoinRoom";
        readonly player: {
            readonly id: string;
            readonly username: string;
        };
    } | {
        readonly _tag: "UpdatedRoom";
        readonly room: {
            readonly id: string;
            readonly players: readonly {
                readonly id: string;
                readonly username: string;
            }[];
            readonly hostId: string;
            readonly status: {
                readonly _tag: "Finished";
            } | {
                readonly _tag: "GetReady";
            } | {
                readonly _tag: "Waiting";
            } | {
                readonly _tag: "Countdown";
                readonly secondsLeft: number;
            } | {
                readonly _tag: "Playing";
                readonly secondsLeft: number;
            };
            readonly maybeGame: Option.Option<{
                readonly id: string;
                readonly text: string;
            }>;
            readonly maybeScoreboard: Option.Option<readonly {
                readonly playerId: string;
                readonly username: string;
                readonly wpm: number;
                readonly accuracy: number;
                readonly charsTyped: number;
                readonly correctChars: number;
            }[]>;
            readonly createdAt: number;
            readonly usedGameTexts: readonly string[];
        };
        readonly maybePlayerProgress: Option.Option<{
            readonly playerId: string;
            readonly gameId: string;
            readonly userText: string;
            readonly updatedAt: number;
            readonly charsTyped: number;
        }>;
    }, {
        readonly maybeRoomStream: Option.Option<{
            readonly roomId: string;
            readonly playerId: string;
        }>;
    }, RoomsClient> & {
        readonly __subscription: never;
    };
    readonly roomKeyboard: Subscription.EntryWithoutKeepAlive<{
        readonly roomAsyncData: import("foldkit/asyncData").AsyncData<{
            readonly id: string;
            readonly players: readonly {
                readonly id: string;
                readonly username: string;
            }[];
            readonly hostId: string;
            readonly status: {
                readonly _tag: "Finished";
            } | {
                readonly _tag: "GetReady";
            } | {
                readonly _tag: "Waiting";
            } | {
                readonly _tag: "Countdown";
                readonly secondsLeft: number;
            } | {
                readonly _tag: "Playing";
                readonly secondsLeft: number;
            };
            readonly maybeGame: Option.Option<{
                readonly id: string;
                readonly text: string;
            }>;
            readonly maybeScoreboard: Option.Option<readonly {
                readonly playerId: string;
                readonly username: string;
                readonly wpm: number;
                readonly accuracy: number;
                readonly charsTyped: number;
                readonly correctChars: number;
            }[]>;
            readonly createdAt: number;
            readonly usedGameTexts: readonly string[];
        }, string>;
        readonly maybeSession: Option.Option<{
            readonly roomId: string;
            readonly player: {
                readonly id: string;
                readonly username: string;
            };
        }>;
        readonly userGameText: string;
        readonly charsTyped: number;
        readonly username: string;
        readonly isRoomIdCopyIndicatorVisible: boolean;
        readonly exitCountdownSecondsLeft: number;
    }, {
        readonly _tag: "BlurredRoomPageUsernameInput";
    } | {
        readonly _tag: "ClickedCopyRoomId";
    } | {
        readonly _tag: "CompletedClearSession";
    } | {
        readonly _tag: "CompletedFocusRoomPageUsernameInput";
    } | {
        readonly _tag: "CompletedFocusUserGameTextInput";
    } | {
        readonly _tag: "CompletedNavigateHome";
    } | {
        readonly _tag: "CompletedSavePlayerSession";
    } | {
        readonly _tag: "CompletedUpdatePlayerProgress";
    } | {
        readonly _tag: "CompletedWaitBeforeHidingRoomIdCopiedIndicator";
    } | {
        readonly _tag: "CompletedWaitForExitCountdownInterval";
    } | {
        readonly _tag: "FailedCopyRoomId";
    } | {
        readonly _tag: "FailedFetchRoom";
    } | {
        readonly _tag: "FailedJoinRoom";
    } | {
        readonly _tag: "FailedStartGame";
    } | {
        readonly _tag: "SubmittedJoinRoomFromPage";
    } | {
        readonly _tag: "SucceededCopyRoomId";
    } | {
        readonly _tag: "SucceededStartGame";
    } | {
        readonly _tag: "ChangedRoomPageUsername";
        readonly value: string;
    } | {
        readonly _tag: "ChangedUserText";
        readonly value: string;
    } | {
        readonly _tag: "CompletedLoadSession";
        readonly maybeSession: Option.Option<{
            readonly roomId: string;
            readonly player: {
                readonly id: string;
                readonly username: string;
            };
        }>;
    } | {
        readonly _tag: "FailedStreamRoom";
        readonly error: string;
    } | {
        readonly _tag: "PressedKey";
        readonly key: string;
    } | {
        readonly _tag: "SucceededFetchRoom";
        readonly room: {
            readonly id: string;
            readonly players: readonly {
                readonly id: string;
                readonly username: string;
            }[];
            readonly hostId: string;
            readonly status: {
                readonly _tag: "Finished";
            } | {
                readonly _tag: "GetReady";
            } | {
                readonly _tag: "Waiting";
            } | {
                readonly _tag: "Countdown";
                readonly secondsLeft: number;
            } | {
                readonly _tag: "Playing";
                readonly secondsLeft: number;
            };
            readonly maybeGame: Option.Option<{
                readonly id: string;
                readonly text: string;
            }>;
            readonly maybeScoreboard: Option.Option<readonly {
                readonly playerId: string;
                readonly username: string;
                readonly wpm: number;
                readonly accuracy: number;
                readonly charsTyped: number;
                readonly correctChars: number;
            }[]>;
            readonly createdAt: number;
            readonly usedGameTexts: readonly string[];
        };
    } | {
        readonly _tag: "SucceededJoinRoom";
        readonly player: {
            readonly id: string;
            readonly username: string;
        };
    } | {
        readonly _tag: "UpdatedRoom";
        readonly room: {
            readonly id: string;
            readonly players: readonly {
                readonly id: string;
                readonly username: string;
            }[];
            readonly hostId: string;
            readonly status: {
                readonly _tag: "Finished";
            } | {
                readonly _tag: "GetReady";
            } | {
                readonly _tag: "Waiting";
            } | {
                readonly _tag: "Countdown";
                readonly secondsLeft: number;
            } | {
                readonly _tag: "Playing";
                readonly secondsLeft: number;
            };
            readonly maybeGame: Option.Option<{
                readonly id: string;
                readonly text: string;
            }>;
            readonly maybeScoreboard: Option.Option<readonly {
                readonly playerId: string;
                readonly username: string;
                readonly wpm: number;
                readonly accuracy: number;
                readonly charsTyped: number;
                readonly correctChars: number;
            }[]>;
            readonly createdAt: number;
            readonly usedGameTexts: readonly string[];
        };
        readonly maybePlayerProgress: Option.Option<{
            readonly playerId: string;
            readonly gameId: string;
            readonly userText: string;
            readonly updatedAt: number;
            readonly charsTyped: number;
        }>;
    }, {
        readonly shouldCaptureKeyboard: boolean;
    }, RoomsClient> & {
        readonly __subscription: never;
    };
};
