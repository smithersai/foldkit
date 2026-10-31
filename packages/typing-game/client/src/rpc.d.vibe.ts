import { Context, Layer } from "effect";
import { RpcClient, RpcClientError } from "effect/rpc";
import { RoomRpcs } from '@typing-game/shared';
type RoomsRpcClient = RpcClient.FromGroup<typeof RoomRpcs, RpcClientError.RpcClientError>;
declare const RoomsClient_base: Context.ServiceClass<RoomsClient, "RoomsClient", {
    readonly createRoom: RoomsRpcClient['createRoom'];
    readonly joinRoom: RoomsRpcClient['joinRoom'];
    readonly getRoomById: RoomsRpcClient['getRoomById'];
    readonly subscribeToRoom: RoomsRpcClient['subscribeToRoom'];
    readonly startGame: RoomsRpcClient['startGame'];
    readonly updatePlayerProgress: RoomsRpcClient['updatePlayerProgress'];
}>;
export declare class RoomsClient extends RoomsClient_base {
}
export declare const RoomsClientLive: Layer.Layer<RoomsClient, never, never>;
export {};
