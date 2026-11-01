import { Effect, Option, SubscriptionRef } from 'effect';
import { SecureRandom } from 'effect/crypto';
import { Rpc } from 'effect/rpc';
import * as Shared from '@typing-game/shared';
export declare const createRoom: (roomByIdRef: SubscriptionRef.SubscriptionRef<Shared.RoomById>) => (payload: Rpc.Payload<typeof Shared.createRoomRpc>) => Effect.Effect<{
    player: {
        readonly id: string;
        readonly username: string;
    };
    room: {
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
}, never, import("../store.vibe").RoomByIdStore | SecureRandom.SecureRandom>;
