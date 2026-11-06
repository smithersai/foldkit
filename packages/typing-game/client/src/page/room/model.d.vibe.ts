import { Option, Schema } from 'effect';
import { AsyncData } from 'foldkit';
export declare const RoomPlayerSession: Schema.Struct<{
    readonly roomId: Schema.String;
    readonly player: Schema.Struct<{
        readonly id: Schema.String;
        readonly username: Schema.String;
    }>;
}>;
export type RoomPlayerSession = typeof RoomPlayerSession.Type;
export declare const RoomPlayerSessionJsonString: Schema.fromJsonString<Schema.toCodecJson<Schema.Struct<{
    readonly roomId: Schema.String;
    readonly player: Schema.Struct<{
        readonly id: Schema.String;
        readonly username: Schema.String;
    }>;
}>>>;
export declare const RoomAsyncData: Readonly<{
    schema: Schema.Codec<AsyncData.AsyncData<{
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
    }, string>, AsyncData.AsyncDataEncoded<{
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
    }, string>, never, never>;
    Idle: typeof AsyncData.Idle;
    Loading: typeof AsyncData.Loading;
    Refreshing: (payload: Readonly<{
        data: {
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
    }>) => AsyncData.AsyncData<{
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
    Failure: (payload: Readonly<{
        error: string;
    }>) => AsyncData.AsyncData<{
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
    Stale: (payload: Readonly<{
        error: string;
        data: {
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
    }>) => AsyncData.AsyncData<{
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
    Success: (payload: Readonly<{
        data: {
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
    }>) => AsyncData.AsyncData<{
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
}>;
export type RoomAsyncData = typeof RoomAsyncData.schema.Type;
export declare const Model: Schema.Struct<{
    readonly roomAsyncData: Schema.Codec<AsyncData.AsyncData<{
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
    }, string>, AsyncData.AsyncDataEncoded<{
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
    }, string>, never, never>;
    readonly maybeSession: Schema.Option<Schema.Struct<{
        readonly roomId: Schema.String;
        readonly player: Schema.Struct<{
            readonly id: Schema.String;
            readonly username: Schema.String;
        }>;
    }>>;
    readonly userGameText: Schema.String;
    readonly charsTyped: Schema.Number;
    readonly username: Schema.String;
    readonly isRoomIdCopyIndicatorVisible: Schema.Boolean;
    readonly exitCountdownSecondsLeft: Schema.Number;
}>;
export type Model = typeof Model.Type;
export declare const capturesKeyboard: (model: Model) => boolean;
