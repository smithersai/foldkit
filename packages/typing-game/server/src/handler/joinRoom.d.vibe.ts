import { Effect, SubscriptionRef } from 'effect';
import { Rpc } from 'effect/rpc';
import { SecureRandom } from 'effect/crypto/SecureRandom';
import * as Shared from '@typing-game/shared';
export declare const joinRoom: (roomByIdRef: SubscriptionRef.SubscriptionRef<Shared.RoomById>) => (payload: Rpc.Payload<typeof Shared.joinRoomRpc>) => Effect.Effect<{
    player: {
        readonly id: string;
        readonly username: string;
    };
    room: {
        readonly id: string;
        readonly players: {
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
    };
}, Shared.RoomNotFoundError, SecureRandom>;
