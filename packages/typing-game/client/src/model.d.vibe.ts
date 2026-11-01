import { Schema } from 'effect';
export declare const Model: Schema.Struct<{
    readonly route: import("foldkit/route").RouteUnion<{
        readonly Home: {};
        readonly Room: {
            roomId: Schema.String;
        };
        readonly NotFound: {
            path: Schema.String;
        };
    }>;
    readonly home: Schema.Struct<{
        readonly homeStep: import("foldkit/schema").TaggedUnion<{
            readonly EnterUsername: {
                username: Schema.String;
            };
            readonly SelectAction: {
                username: Schema.String;
                selectedAction: Schema.Literals<readonly ["CreateRoom", "JoinRoom", "ChangeUsername"]>;
            };
            readonly EnterRoomId: {
                username: Schema.String;
                roomId: Schema.String;
            };
        }>;
        readonly formError: Schema.Option<Schema.String>;
    }>;
    readonly room: Schema.Struct<{
        readonly roomAsyncData: Schema.Codec<import("foldkit/asyncData").AsyncData<{
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
            readonly maybeGame: import("effect/Option").Option<{
                readonly id: string;
                readonly text: string;
            }>;
            readonly maybeScoreboard: import("effect/Option").Option<readonly {
                readonly playerId: string;
                readonly username: string;
                readonly wpm: number;
                readonly accuracy: number;
                readonly charsTyped: number;
                readonly correctChars: number;
            }[]>;
            readonly createdAt: number;
            readonly usedGameTexts: readonly string[];
        }, string>, import("foldkit/asyncData").AsyncDataEncoded<{
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
            readonly maybeGame: import("effect/Option").Option<{
                readonly id: string;
                readonly text: string;
            }>;
            readonly maybeScoreboard: import("effect/Option").Option<readonly {
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
}>;
export type Model = typeof Model.Type;
