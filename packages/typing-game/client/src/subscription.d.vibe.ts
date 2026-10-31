import { Option } from "effect";
import { Subscription } from 'foldkit';
export declare const subscriptions: {
    readonly homeKeyboard: Subscription.Subscription<{
        readonly route: {
            readonly _tag: "Home";
        } | {
            readonly _tag: "NotFound";
            readonly path: string;
        } | {
            readonly _tag: "Room";
            readonly roomId: string;
        };
        readonly home: {
            readonly homeStep: {
                readonly _tag: "EnterRoomId";
                readonly username: string;
                readonly roomId: string;
            } | {
                readonly _tag: "EnterUsername";
                readonly username: string;
            } | {
                readonly _tag: "SelectAction";
                readonly username: string;
                readonly selectedAction: "ChangeUsername" | "CreateRoom" | "JoinRoom";
            };
            readonly formError: Option.Option<string>;
        };
        readonly room: {
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
        };
    }, {
        readonly _tag: "CompletedLoadExternal";
    } | {
        readonly _tag: "CompletedNavigateInternal";
    } | {
        readonly _tag: "CompletedNavigateToRoom";
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
        readonly _tag: "GotHomeMessage";
        readonly message: {
            readonly _tag: "BlurredRoomIdInput";
        } | {
            readonly _tag: "BlurredUsernameInput";
        } | {
            readonly _tag: "CompletedFocusRoomIdInput";
        } | {
            readonly _tag: "CompletedFocusUsernameInput";
        } | {
            readonly _tag: "SubmittedJoinRoomForm";
        } | {
            readonly _tag: "SubmittedUsernameForm";
        } | {
            readonly _tag: "ChangedRoomId";
            readonly value: string;
        } | {
            readonly _tag: "ChangedUsername";
            readonly value: string;
        } | {
            readonly _tag: "FailedCreateRoom";
            readonly error: string;
        } | {
            readonly _tag: "FailedJoinRoom";
            readonly error: string;
        } | {
            readonly _tag: "PressedKey";
            readonly key: string;
        } | {
            readonly _tag: "SucceededCreateRoom";
            readonly roomId: string;
            readonly player: {
                readonly id: string;
                readonly username: string;
            };
        } | {
            readonly _tag: "SucceededJoinRoom";
            readonly roomId: string;
            readonly player: {
                readonly id: string;
                readonly username: string;
            };
        };
    } | {
        readonly _tag: "GotRoomMessage";
        readonly message: {
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
        };
    }, Readonly<{
        maybeDependencies: Option.Option<{
            readonly shouldCaptureKeyboard: boolean;
        }>;
    }>, never>;
} & {
    readonly roomKeyboard: Subscription.Subscription<{
        readonly route: {
            readonly _tag: "Home";
        } | {
            readonly _tag: "NotFound";
            readonly path: string;
        } | {
            readonly _tag: "Room";
            readonly roomId: string;
        };
        readonly home: {
            readonly homeStep: {
                readonly _tag: "EnterRoomId";
                readonly username: string;
                readonly roomId: string;
            } | {
                readonly _tag: "EnterUsername";
                readonly username: string;
            } | {
                readonly _tag: "SelectAction";
                readonly username: string;
                readonly selectedAction: "ChangeUsername" | "CreateRoom" | "JoinRoom";
            };
            readonly formError: Option.Option<string>;
        };
        readonly room: {
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
        };
    }, {
        readonly _tag: "CompletedLoadExternal";
    } | {
        readonly _tag: "CompletedNavigateInternal";
    } | {
        readonly _tag: "CompletedNavigateToRoom";
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
        readonly _tag: "GotHomeMessage";
        readonly message: {
            readonly _tag: "BlurredRoomIdInput";
        } | {
            readonly _tag: "BlurredUsernameInput";
        } | {
            readonly _tag: "CompletedFocusRoomIdInput";
        } | {
            readonly _tag: "CompletedFocusUsernameInput";
        } | {
            readonly _tag: "SubmittedJoinRoomForm";
        } | {
            readonly _tag: "SubmittedUsernameForm";
        } | {
            readonly _tag: "ChangedRoomId";
            readonly value: string;
        } | {
            readonly _tag: "ChangedUsername";
            readonly value: string;
        } | {
            readonly _tag: "FailedCreateRoom";
            readonly error: string;
        } | {
            readonly _tag: "FailedJoinRoom";
            readonly error: string;
        } | {
            readonly _tag: "PressedKey";
            readonly key: string;
        } | {
            readonly _tag: "SucceededCreateRoom";
            readonly roomId: string;
            readonly player: {
                readonly id: string;
                readonly username: string;
            };
        } | {
            readonly _tag: "SucceededJoinRoom";
            readonly roomId: string;
            readonly player: {
                readonly id: string;
                readonly username: string;
            };
        };
    } | {
        readonly _tag: "GotRoomMessage";
        readonly message: {
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
        };
    }, Readonly<{
        maybeDependencies: Option.Option<{
            readonly shouldCaptureKeyboard: boolean;
        }>;
    }>, import("./rpc.vibe").RoomsClient>;
    readonly roomStream: Subscription.Subscription<{
        readonly route: {
            readonly _tag: "Home";
        } | {
            readonly _tag: "NotFound";
            readonly path: string;
        } | {
            readonly _tag: "Room";
            readonly roomId: string;
        };
        readonly home: {
            readonly homeStep: {
                readonly _tag: "EnterRoomId";
                readonly username: string;
                readonly roomId: string;
            } | {
                readonly _tag: "EnterUsername";
                readonly username: string;
            } | {
                readonly _tag: "SelectAction";
                readonly username: string;
                readonly selectedAction: "ChangeUsername" | "CreateRoom" | "JoinRoom";
            };
            readonly formError: Option.Option<string>;
        };
        readonly room: {
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
        };
    }, {
        readonly _tag: "CompletedLoadExternal";
    } | {
        readonly _tag: "CompletedNavigateInternal";
    } | {
        readonly _tag: "CompletedNavigateToRoom";
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
        readonly _tag: "GotHomeMessage";
        readonly message: {
            readonly _tag: "BlurredRoomIdInput";
        } | {
            readonly _tag: "BlurredUsernameInput";
        } | {
            readonly _tag: "CompletedFocusRoomIdInput";
        } | {
            readonly _tag: "CompletedFocusUsernameInput";
        } | {
            readonly _tag: "SubmittedJoinRoomForm";
        } | {
            readonly _tag: "SubmittedUsernameForm";
        } | {
            readonly _tag: "ChangedRoomId";
            readonly value: string;
        } | {
            readonly _tag: "ChangedUsername";
            readonly value: string;
        } | {
            readonly _tag: "FailedCreateRoom";
            readonly error: string;
        } | {
            readonly _tag: "FailedJoinRoom";
            readonly error: string;
        } | {
            readonly _tag: "PressedKey";
            readonly key: string;
        } | {
            readonly _tag: "SucceededCreateRoom";
            readonly roomId: string;
            readonly player: {
                readonly id: string;
                readonly username: string;
            };
        } | {
            readonly _tag: "SucceededJoinRoom";
            readonly roomId: string;
            readonly player: {
                readonly id: string;
                readonly username: string;
            };
        };
    } | {
        readonly _tag: "GotRoomMessage";
        readonly message: {
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
        };
    }, Readonly<{
        maybeDependencies: Option.Option<{
            readonly maybeRoomStream: Option.Option<{
                readonly roomId: string;
                readonly playerId: string;
            }>;
        }>;
    }>, import("./rpc.vibe").RoomsClient>;
};
