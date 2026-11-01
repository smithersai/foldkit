import { Effect, Option, SubscriptionRef } from 'effect';
import * as Shared from '@typing-game/shared';
export declare const getById: (roomById: Shared.RoomById, id: string) => Effect.Effect<{
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
}, Shared.RoomNotFoundError, never>;
export declare const updateRoom: (roomByIdRef: SubscriptionRef.SubscriptionRef<Shared.RoomById>, roomId: string) => (f: (room: Shared.Room) => Shared.Room) => Effect.Effect<void, Shared.RoomNotFoundError, never>;
export declare const updateRoomStatus: (roomByIdRef: SubscriptionRef.SubscriptionRef<Shared.RoomById>, roomId: string) => (status: Shared.GameStatus) => Effect.Effect<void, Shared.RoomNotFoundError, never>;
