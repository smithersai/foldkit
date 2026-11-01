import { Effect, HashMap, SubscriptionRef } from 'effect';
import { Rpc } from 'effect/rpc';
import { SecureRandom } from 'effect/crypto/SecureRandom';
import * as Shared from '@typing-game/shared';
type ProgressByGamePlayer = HashMap.HashMap<Shared.GamePlayer, Shared.PlayerProgress>;
export declare const startGame: (roomByIdRef: SubscriptionRef.SubscriptionRef<Shared.RoomById>, progressByGamePlayerRef: SubscriptionRef.SubscriptionRef<ProgressByGamePlayer>) => (payload: Rpc.Payload<typeof Shared.startGameRpc>) => Effect.Effect<undefined, Shared.RoomNotFoundError | Shared.UnauthorizedError, SecureRandom>;
export {};
