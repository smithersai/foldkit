import { Effect, HashMap, SubscriptionRef } from 'effect';
import { Rpc } from 'effect/rpc';
import * as Shared from '@typing-game/shared';
type ProgressByGamePlayer = HashMap.HashMap<Shared.GamePlayer, Shared.PlayerProgress>;
export declare const updatePlayerProgress: (progressByGamePlayerRef: SubscriptionRef.SubscriptionRef<ProgressByGamePlayer>) => (payload: Rpc.Payload<typeof Shared.updatePlayerProgressRpc>) => Effect.Effect<void, never, never>;
export {};
