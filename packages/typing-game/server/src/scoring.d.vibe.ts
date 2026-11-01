import { Effect, HashMap, Option, SubscriptionRef } from 'effect';
import * as Shared from '@typing-game/shared';
type ProgressByGamePlayer = HashMap.HashMap<Shared.GamePlayer, Shared.PlayerProgress>;
export declare const calculateScoreboard: (room: Shared.Room, progressByGamePlayer: ProgressByGamePlayer) => Effect.Effect<Shared.Scoreboard, never, never>;
export declare const getPlayerProgress: (progressByGamePlayerRef: SubscriptionRef.SubscriptionRef<ProgressByGamePlayer>, playerId: string, gameId: string) => Effect.Effect<Option.Option<Shared.PlayerProgress>, never, never>;
export {};
