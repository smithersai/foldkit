import { Context, HashMap, HashSet, Layer, Ref, SubscriptionRef } from "effect";
import * as Shared from '@typing-game/shared';
type RoomId = string;
type RoomById = HashMap.HashMap<RoomId, Shared.Room>;
declare const RoomByIdStore_base: Context.ServiceClass<RoomByIdStore, "RoomByIdStore", {
    readonly '~effect/SubscriptionRef': SubscriptionRef.SubscriptionRef<RoomById>['~effect/SubscriptionRef'];
    readonly value: SubscriptionRef.SubscriptionRef<RoomById>['value'];
    readonly semaphore: SubscriptionRef.SubscriptionRef<RoomById>['semaphore'];
    readonly pubsub: SubscriptionRef.SubscriptionRef<RoomById>['pubsub'];
    readonly pipe: SubscriptionRef.SubscriptionRef<RoomById>['pipe'];
}>;
export declare class RoomByIdStore extends RoomByIdStore_base {
}
export declare const RoomByIdStoreLive: Layer.Layer<RoomByIdStore, never, never>;
export type ProgressByGamePlayer = HashMap.HashMap<Shared.GamePlayer, Shared.PlayerProgress>;
declare const ProgressByGamePlayerStore_base: Context.ServiceClass<ProgressByGamePlayerStore, "ProgressByGamePlayerStore", {
    readonly '~effect/SubscriptionRef': SubscriptionRef.SubscriptionRef<ProgressByGamePlayer>['~effect/SubscriptionRef'];
    readonly value: SubscriptionRef.SubscriptionRef<ProgressByGamePlayer>['value'];
    readonly semaphore: SubscriptionRef.SubscriptionRef<ProgressByGamePlayer>['semaphore'];
    readonly pubsub: SubscriptionRef.SubscriptionRef<ProgressByGamePlayer>['pubsub'];
    readonly pipe: SubscriptionRef.SubscriptionRef<ProgressByGamePlayer>['pipe'];
}>;
export declare class ProgressByGamePlayerStore extends ProgressByGamePlayerStore_base {
}
export declare const ProgressByGamePlayerStoreLive: Layer.Layer<ProgressByGamePlayerStore, never, never>;
type PlayerId = string;
export type PendingCleanupPlayerIds = HashSet.HashSet<PlayerId>;
declare const PendingCleanupPlayerIdsStore_base: Context.ServiceClass<PendingCleanupPlayerIdsStore, "PendingCleanupPlayerIdsStore", {
    readonly '~effect/Ref': Ref.Ref<PendingCleanupPlayerIds>['~effect/Ref'];
    readonly ref: Ref.Ref<PendingCleanupPlayerIds>['ref'];
    readonly pipe: Ref.Ref<PendingCleanupPlayerIds>['pipe'];
}>;
export declare class PendingCleanupPlayerIdsStore extends PendingCleanupPlayerIdsStore_base {
}
export declare const PendingCleanupPlayerIdsStoreLive: Layer.Layer<PendingCleanupPlayerIdsStore, never, never>;
export {};
