import { Ref, Stream, SubscriptionRef } from "effect";
import { Rpc } from "effect/rpc";
import * as Shared from '@typing-game/shared';
import { PendingCleanupPlayerIds, ProgressByGamePlayer } from '../store.vibe';
export declare const subscribeToRoom: (roomByIdRef: SubscriptionRef.SubscriptionRef<Shared.RoomById>, progressByGamePlayerRef: SubscriptionRef.SubscriptionRef<ProgressByGamePlayer>, pendingCleanupPlayerIdsRef: Ref.Ref<PendingCleanupPlayerIds>) => (payload: Rpc.Payload<typeof Shared.subscribeToRoomRpc>) => Stream.Stream<Shared.RoomWithPlayerProgress, Shared.RoomNotFoundError>;
