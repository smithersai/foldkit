import { Schema } from "effect";
import { Rpc, RpcGroup } from "effect/rpc";
export declare const Waiting: Schema.TaggedStruct<"Waiting", {}>;
export declare const GetReady: Schema.TaggedStruct<"GetReady", {}>;
export declare const Countdown: Schema.TaggedStruct<"Countdown", {
    readonly secondsLeft: Schema.Number;
}>;
export declare const Playing: Schema.TaggedStruct<"Playing", {
    readonly secondsLeft: Schema.Number;
}>;
export declare const Finished: Schema.TaggedStruct<"Finished", {}>;
export type Waiting = typeof Waiting.Type;
export type GetReady = typeof GetReady.Type;
export type Countdown = typeof Countdown.Type;
export type Playing = typeof Playing.Type;
export type Finished = typeof Finished.Type;
export declare const GameStatus: Schema.Union<readonly [Schema.TaggedStruct<"Waiting", {}>, Schema.TaggedStruct<"GetReady", {}>, Schema.TaggedStruct<"Countdown", {
    readonly secondsLeft: Schema.Number;
}>, Schema.TaggedStruct<"Playing", {
    readonly secondsLeft: Schema.Number;
}>, Schema.TaggedStruct<"Finished", {}>]>;
export type GameStatus = typeof GameStatus.Type;
export declare const Player: Schema.Struct<{
    readonly id: Schema.String;
    readonly username: Schema.String;
}>;
export type Player = typeof Player.Type;
export declare const Game: Schema.Struct<{
    readonly id: Schema.String;
    readonly text: Schema.String;
}>;
export type Game = typeof Game.Type;
export declare const GamePlayer: Schema.Struct<{
    readonly gameId: Schema.String;
    readonly playerId: Schema.String;
}>;
export type GamePlayer = typeof GamePlayer.Type;
export declare const PlayerProgress: Schema.Struct<{
    readonly playerId: Schema.String;
    readonly gameId: Schema.String;
    readonly userText: Schema.String;
    readonly updatedAt: Schema.Number;
    readonly charsTyped: Schema.Number;
}>;
export type PlayerProgress = typeof PlayerProgress.Type;
export declare const PlayerScore: Schema.Struct<{
    readonly playerId: Schema.String;
    readonly username: Schema.String;
    readonly wpm: Schema.Number;
    readonly accuracy: Schema.Number;
    readonly charsTyped: Schema.Number;
    readonly correctChars: Schema.Number;
}>;
export type PlayerScore = typeof PlayerScore.Type;
export declare const Scoreboard: Schema.$Array<Schema.Struct<{
    readonly playerId: Schema.String;
    readonly username: Schema.String;
    readonly wpm: Schema.Number;
    readonly accuracy: Schema.Number;
    readonly charsTyped: Schema.Number;
    readonly correctChars: Schema.Number;
}>>;
export type Scoreboard = typeof Scoreboard.Type;
export declare const Room: Schema.Struct<{
    readonly id: Schema.String;
    readonly players: Schema.$Array<Schema.Struct<{
        readonly id: Schema.String;
        readonly username: Schema.String;
    }>>;
    readonly hostId: Schema.String;
    readonly status: Schema.Union<readonly [Schema.TaggedStruct<"Waiting", {}>, Schema.TaggedStruct<"GetReady", {}>, Schema.TaggedStruct<"Countdown", {
        readonly secondsLeft: Schema.Number;
    }>, Schema.TaggedStruct<"Playing", {
        readonly secondsLeft: Schema.Number;
    }>, Schema.TaggedStruct<"Finished", {}>]>;
    readonly maybeGame: Schema.Option<Schema.Struct<{
        readonly id: Schema.String;
        readonly text: Schema.String;
    }>>;
    readonly maybeScoreboard: Schema.Option<Schema.$Array<Schema.Struct<{
        readonly playerId: Schema.String;
        readonly username: Schema.String;
        readonly wpm: Schema.Number;
        readonly accuracy: Schema.Number;
        readonly charsTyped: Schema.Number;
        readonly correctChars: Schema.Number;
    }>>>;
    readonly createdAt: Schema.Number;
    readonly usedGameTexts: Schema.$Array<Schema.String>;
}>;
export type Room = typeof Room.Type;
export declare const RoomById: Schema.HashMap<Schema.String, Schema.Struct<{
    readonly id: Schema.String;
    readonly players: Schema.$Array<Schema.Struct<{
        readonly id: Schema.String;
        readonly username: Schema.String;
    }>>;
    readonly hostId: Schema.String;
    readonly status: Schema.Union<readonly [Schema.TaggedStruct<"Waiting", {}>, Schema.TaggedStruct<"GetReady", {}>, Schema.TaggedStruct<"Countdown", {
        readonly secondsLeft: Schema.Number;
    }>, Schema.TaggedStruct<"Playing", {
        readonly secondsLeft: Schema.Number;
    }>, Schema.TaggedStruct<"Finished", {}>]>;
    readonly maybeGame: Schema.Option<Schema.Struct<{
        readonly id: Schema.String;
        readonly text: Schema.String;
    }>>;
    readonly maybeScoreboard: Schema.Option<Schema.$Array<Schema.Struct<{
        readonly playerId: Schema.String;
        readonly username: Schema.String;
        readonly wpm: Schema.Number;
        readonly accuracy: Schema.Number;
        readonly charsTyped: Schema.Number;
        readonly correctChars: Schema.Number;
    }>>>;
    readonly createdAt: Schema.Number;
    readonly usedGameTexts: Schema.$Array<Schema.String>;
}>>;
export type RoomById = typeof RoomById.Type;
declare const RoomNotFoundError_base: Schema.Class<RoomNotFoundError, Schema.TaggedStruct<"RoomNotFoundError", {
    readonly roomId: Schema.String;
}>, import("effect/Cause").YieldableError>;
export declare class RoomNotFoundError extends RoomNotFoundError_base {
}
declare const UnauthorizedError_base: Schema.Class<UnauthorizedError, Schema.TaggedStruct<"UnauthorizedError", {
    readonly message: Schema.String;
}>, import("effect/Cause").YieldableError>;
export declare class UnauthorizedError extends UnauthorizedError_base {
}
export declare const RoomAndPlayer: Schema.Struct<{
    readonly player: Schema.Struct<{
        readonly id: Schema.String;
        readonly username: Schema.String;
    }>;
    readonly room: Schema.Struct<{
        readonly id: Schema.String;
        readonly players: Schema.$Array<Schema.Struct<{
            readonly id: Schema.String;
            readonly username: Schema.String;
        }>>;
        readonly hostId: Schema.String;
        readonly status: Schema.Union<readonly [Schema.TaggedStruct<"Waiting", {}>, Schema.TaggedStruct<"GetReady", {}>, Schema.TaggedStruct<"Countdown", {
            readonly secondsLeft: Schema.Number;
        }>, Schema.TaggedStruct<"Playing", {
            readonly secondsLeft: Schema.Number;
        }>, Schema.TaggedStruct<"Finished", {}>]>;
        readonly maybeGame: Schema.Option<Schema.Struct<{
            readonly id: Schema.String;
            readonly text: Schema.String;
        }>>;
        readonly maybeScoreboard: Schema.Option<Schema.$Array<Schema.Struct<{
            readonly playerId: Schema.String;
            readonly username: Schema.String;
            readonly wpm: Schema.Number;
            readonly accuracy: Schema.Number;
            readonly charsTyped: Schema.Number;
            readonly correctChars: Schema.Number;
        }>>>;
        readonly createdAt: Schema.Number;
        readonly usedGameTexts: Schema.$Array<Schema.String>;
    }>;
}>;
export type RoomAndPlayer = typeof RoomAndPlayer.Type;
export declare const RoomWithPlayerProgress: Schema.Struct<{
    readonly room: Schema.Struct<{
        readonly id: Schema.String;
        readonly players: Schema.$Array<Schema.Struct<{
            readonly id: Schema.String;
            readonly username: Schema.String;
        }>>;
        readonly hostId: Schema.String;
        readonly status: Schema.Union<readonly [Schema.TaggedStruct<"Waiting", {}>, Schema.TaggedStruct<"GetReady", {}>, Schema.TaggedStruct<"Countdown", {
            readonly secondsLeft: Schema.Number;
        }>, Schema.TaggedStruct<"Playing", {
            readonly secondsLeft: Schema.Number;
        }>, Schema.TaggedStruct<"Finished", {}>]>;
        readonly maybeGame: Schema.Option<Schema.Struct<{
            readonly id: Schema.String;
            readonly text: Schema.String;
        }>>;
        readonly maybeScoreboard: Schema.Option<Schema.$Array<Schema.Struct<{
            readonly playerId: Schema.String;
            readonly username: Schema.String;
            readonly wpm: Schema.Number;
            readonly accuracy: Schema.Number;
            readonly charsTyped: Schema.Number;
            readonly correctChars: Schema.Number;
        }>>>;
        readonly createdAt: Schema.Number;
        readonly usedGameTexts: Schema.$Array<Schema.String>;
    }>;
    readonly maybePlayerProgress: Schema.Option<Schema.Struct<{
        readonly playerId: Schema.String;
        readonly gameId: Schema.String;
        readonly userText: Schema.String;
        readonly updatedAt: Schema.Number;
        readonly charsTyped: Schema.Number;
    }>>;
}>;
export type RoomWithPlayerProgress = typeof RoomWithPlayerProgress.Type;
export declare const createRoomRpc: Rpc.Rpc<"createRoom", Schema.Struct<{
    readonly username: Schema.String;
}>, Schema.Struct<{
    readonly player: Schema.Struct<{
        readonly id: Schema.String;
        readonly username: Schema.String;
    }>;
    readonly room: Schema.Struct<{
        readonly id: Schema.String;
        readonly players: Schema.$Array<Schema.Struct<{
            readonly id: Schema.String;
            readonly username: Schema.String;
        }>>;
        readonly hostId: Schema.String;
        readonly status: Schema.Union<readonly [Schema.TaggedStruct<"Waiting", {}>, Schema.TaggedStruct<"GetReady", {}>, Schema.TaggedStruct<"Countdown", {
            readonly secondsLeft: Schema.Number;
        }>, Schema.TaggedStruct<"Playing", {
            readonly secondsLeft: Schema.Number;
        }>, Schema.TaggedStruct<"Finished", {}>]>;
        readonly maybeGame: Schema.Option<Schema.Struct<{
            readonly id: Schema.String;
            readonly text: Schema.String;
        }>>;
        readonly maybeScoreboard: Schema.Option<Schema.$Array<Schema.Struct<{
            readonly playerId: Schema.String;
            readonly username: Schema.String;
            readonly wpm: Schema.Number;
            readonly accuracy: Schema.Number;
            readonly charsTyped: Schema.Number;
            readonly correctChars: Schema.Number;
        }>>>;
        readonly createdAt: Schema.Number;
        readonly usedGameTexts: Schema.$Array<Schema.String>;
    }>;
}>, Schema.Never, never, never>;
export declare const joinRoomRpc: Rpc.Rpc<"joinRoom", Schema.Struct<{
    readonly username: Schema.String;
    readonly roomId: Schema.String;
}>, Schema.Struct<{
    readonly player: Schema.Struct<{
        readonly id: Schema.String;
        readonly username: Schema.String;
    }>;
    readonly room: Schema.Struct<{
        readonly id: Schema.String;
        readonly players: Schema.$Array<Schema.Struct<{
            readonly id: Schema.String;
            readonly username: Schema.String;
        }>>;
        readonly hostId: Schema.String;
        readonly status: Schema.Union<readonly [Schema.TaggedStruct<"Waiting", {}>, Schema.TaggedStruct<"GetReady", {}>, Schema.TaggedStruct<"Countdown", {
            readonly secondsLeft: Schema.Number;
        }>, Schema.TaggedStruct<"Playing", {
            readonly secondsLeft: Schema.Number;
        }>, Schema.TaggedStruct<"Finished", {}>]>;
        readonly maybeGame: Schema.Option<Schema.Struct<{
            readonly id: Schema.String;
            readonly text: Schema.String;
        }>>;
        readonly maybeScoreboard: Schema.Option<Schema.$Array<Schema.Struct<{
            readonly playerId: Schema.String;
            readonly username: Schema.String;
            readonly wpm: Schema.Number;
            readonly accuracy: Schema.Number;
            readonly charsTyped: Schema.Number;
            readonly correctChars: Schema.Number;
        }>>>;
        readonly createdAt: Schema.Number;
        readonly usedGameTexts: Schema.$Array<Schema.String>;
    }>;
}>, typeof RoomNotFoundError, never, never>;
export declare const getRoomByIdRpc: Rpc.Rpc<"getRoomById", Schema.Struct<{
    readonly roomId: Schema.String;
}>, Schema.Struct<{
    readonly id: Schema.String;
    readonly players: Schema.$Array<Schema.Struct<{
        readonly id: Schema.String;
        readonly username: Schema.String;
    }>>;
    readonly hostId: Schema.String;
    readonly status: Schema.Union<readonly [Schema.TaggedStruct<"Waiting", {}>, Schema.TaggedStruct<"GetReady", {}>, Schema.TaggedStruct<"Countdown", {
        readonly secondsLeft: Schema.Number;
    }>, Schema.TaggedStruct<"Playing", {
        readonly secondsLeft: Schema.Number;
    }>, Schema.TaggedStruct<"Finished", {}>]>;
    readonly maybeGame: Schema.Option<Schema.Struct<{
        readonly id: Schema.String;
        readonly text: Schema.String;
    }>>;
    readonly maybeScoreboard: Schema.Option<Schema.$Array<Schema.Struct<{
        readonly playerId: Schema.String;
        readonly username: Schema.String;
        readonly wpm: Schema.Number;
        readonly accuracy: Schema.Number;
        readonly charsTyped: Schema.Number;
        readonly correctChars: Schema.Number;
    }>>>;
    readonly createdAt: Schema.Number;
    readonly usedGameTexts: Schema.$Array<Schema.String>;
}>, typeof RoomNotFoundError, never, never>;
export declare const subscribeToRoomRpc: Rpc.Rpc<"subscribeToRoom", Schema.Struct<{
    readonly roomId: Schema.String;
    readonly playerId: Schema.String;
}>, import("effect/rpc/RpcSchema").Stream<Schema.Struct<{
    readonly room: Schema.Struct<{
        readonly id: Schema.String;
        readonly players: Schema.$Array<Schema.Struct<{
            readonly id: Schema.String;
            readonly username: Schema.String;
        }>>;
        readonly hostId: Schema.String;
        readonly status: Schema.Union<readonly [Schema.TaggedStruct<"Waiting", {}>, Schema.TaggedStruct<"GetReady", {}>, Schema.TaggedStruct<"Countdown", {
            readonly secondsLeft: Schema.Number;
        }>, Schema.TaggedStruct<"Playing", {
            readonly secondsLeft: Schema.Number;
        }>, Schema.TaggedStruct<"Finished", {}>]>;
        readonly maybeGame: Schema.Option<Schema.Struct<{
            readonly id: Schema.String;
            readonly text: Schema.String;
        }>>;
        readonly maybeScoreboard: Schema.Option<Schema.$Array<Schema.Struct<{
            readonly playerId: Schema.String;
            readonly username: Schema.String;
            readonly wpm: Schema.Number;
            readonly accuracy: Schema.Number;
            readonly charsTyped: Schema.Number;
            readonly correctChars: Schema.Number;
        }>>>;
        readonly createdAt: Schema.Number;
        readonly usedGameTexts: Schema.$Array<Schema.String>;
    }>;
    readonly maybePlayerProgress: Schema.Option<Schema.Struct<{
        readonly playerId: Schema.String;
        readonly gameId: Schema.String;
        readonly userText: Schema.String;
        readonly updatedAt: Schema.Number;
        readonly charsTyped: Schema.Number;
    }>>;
}>, typeof RoomNotFoundError>, Schema.Never, never, never>;
export declare const startGameRpc: Rpc.Rpc<"startGame", Schema.Struct<{
    readonly roomId: Schema.String;
    readonly playerId: Schema.String;
}>, Schema.Void, Schema.Union<readonly [typeof RoomNotFoundError, typeof UnauthorizedError]>, never, never>;
export declare const updatePlayerProgressRpc: Rpc.Rpc<"updatePlayerProgress", Schema.Struct<{
    readonly playerId: Schema.String;
    readonly gameId: Schema.String;
    readonly userText: Schema.String;
    readonly charsTyped: Schema.Number;
}>, Schema.Void, Schema.Never, never, never>;
export declare const RoomRpcs: RpcGroup.RpcGroup<Rpc.Rpc<"createRoom", Schema.Struct<{
    readonly username: Schema.String;
}>, Schema.Struct<{
    readonly player: Schema.Struct<{
        readonly id: Schema.String;
        readonly username: Schema.String;
    }>;
    readonly room: Schema.Struct<{
        readonly id: Schema.String;
        readonly players: Schema.$Array<Schema.Struct<{
            readonly id: Schema.String;
            readonly username: Schema.String;
        }>>;
        readonly hostId: Schema.String;
        readonly status: Schema.Union<readonly [Schema.TaggedStruct<"Waiting", {}>, Schema.TaggedStruct<"GetReady", {}>, Schema.TaggedStruct<"Countdown", {
            readonly secondsLeft: Schema.Number;
        }>, Schema.TaggedStruct<"Playing", {
            readonly secondsLeft: Schema.Number;
        }>, Schema.TaggedStruct<"Finished", {}>]>;
        readonly maybeGame: Schema.Option<Schema.Struct<{
            readonly id: Schema.String;
            readonly text: Schema.String;
        }>>;
        readonly maybeScoreboard: Schema.Option<Schema.$Array<Schema.Struct<{
            readonly playerId: Schema.String;
            readonly username: Schema.String;
            readonly wpm: Schema.Number;
            readonly accuracy: Schema.Number;
            readonly charsTyped: Schema.Number;
            readonly correctChars: Schema.Number;
        }>>>;
        readonly createdAt: Schema.Number;
        readonly usedGameTexts: Schema.$Array<Schema.String>;
    }>;
}>, Schema.Never, never, never> | Rpc.Rpc<"getRoomById", Schema.Struct<{
    readonly roomId: Schema.String;
}>, Schema.Struct<{
    readonly id: Schema.String;
    readonly players: Schema.$Array<Schema.Struct<{
        readonly id: Schema.String;
        readonly username: Schema.String;
    }>>;
    readonly hostId: Schema.String;
    readonly status: Schema.Union<readonly [Schema.TaggedStruct<"Waiting", {}>, Schema.TaggedStruct<"GetReady", {}>, Schema.TaggedStruct<"Countdown", {
        readonly secondsLeft: Schema.Number;
    }>, Schema.TaggedStruct<"Playing", {
        readonly secondsLeft: Schema.Number;
    }>, Schema.TaggedStruct<"Finished", {}>]>;
    readonly maybeGame: Schema.Option<Schema.Struct<{
        readonly id: Schema.String;
        readonly text: Schema.String;
    }>>;
    readonly maybeScoreboard: Schema.Option<Schema.$Array<Schema.Struct<{
        readonly playerId: Schema.String;
        readonly username: Schema.String;
        readonly wpm: Schema.Number;
        readonly accuracy: Schema.Number;
        readonly charsTyped: Schema.Number;
        readonly correctChars: Schema.Number;
    }>>>;
    readonly createdAt: Schema.Number;
    readonly usedGameTexts: Schema.$Array<Schema.String>;
}>, typeof RoomNotFoundError, never, never> | Rpc.Rpc<"joinRoom", Schema.Struct<{
    readonly username: Schema.String;
    readonly roomId: Schema.String;
}>, Schema.Struct<{
    readonly player: Schema.Struct<{
        readonly id: Schema.String;
        readonly username: Schema.String;
    }>;
    readonly room: Schema.Struct<{
        readonly id: Schema.String;
        readonly players: Schema.$Array<Schema.Struct<{
            readonly id: Schema.String;
            readonly username: Schema.String;
        }>>;
        readonly hostId: Schema.String;
        readonly status: Schema.Union<readonly [Schema.TaggedStruct<"Waiting", {}>, Schema.TaggedStruct<"GetReady", {}>, Schema.TaggedStruct<"Countdown", {
            readonly secondsLeft: Schema.Number;
        }>, Schema.TaggedStruct<"Playing", {
            readonly secondsLeft: Schema.Number;
        }>, Schema.TaggedStruct<"Finished", {}>]>;
        readonly maybeGame: Schema.Option<Schema.Struct<{
            readonly id: Schema.String;
            readonly text: Schema.String;
        }>>;
        readonly maybeScoreboard: Schema.Option<Schema.$Array<Schema.Struct<{
            readonly playerId: Schema.String;
            readonly username: Schema.String;
            readonly wpm: Schema.Number;
            readonly accuracy: Schema.Number;
            readonly charsTyped: Schema.Number;
            readonly correctChars: Schema.Number;
        }>>>;
        readonly createdAt: Schema.Number;
        readonly usedGameTexts: Schema.$Array<Schema.String>;
    }>;
}>, typeof RoomNotFoundError, never, never> | Rpc.Rpc<"startGame", Schema.Struct<{
    readonly roomId: Schema.String;
    readonly playerId: Schema.String;
}>, Schema.Void, Schema.Union<readonly [typeof RoomNotFoundError, typeof UnauthorizedError]>, never, never> | Rpc.Rpc<"subscribeToRoom", Schema.Struct<{
    readonly roomId: Schema.String;
    readonly playerId: Schema.String;
}>, import("effect/rpc/RpcSchema").Stream<Schema.Struct<{
    readonly room: Schema.Struct<{
        readonly id: Schema.String;
        readonly players: Schema.$Array<Schema.Struct<{
            readonly id: Schema.String;
            readonly username: Schema.String;
        }>>;
        readonly hostId: Schema.String;
        readonly status: Schema.Union<readonly [Schema.TaggedStruct<"Waiting", {}>, Schema.TaggedStruct<"GetReady", {}>, Schema.TaggedStruct<"Countdown", {
            readonly secondsLeft: Schema.Number;
        }>, Schema.TaggedStruct<"Playing", {
            readonly secondsLeft: Schema.Number;
        }>, Schema.TaggedStruct<"Finished", {}>]>;
        readonly maybeGame: Schema.Option<Schema.Struct<{
            readonly id: Schema.String;
            readonly text: Schema.String;
        }>>;
        readonly maybeScoreboard: Schema.Option<Schema.$Array<Schema.Struct<{
            readonly playerId: Schema.String;
            readonly username: Schema.String;
            readonly wpm: Schema.Number;
            readonly accuracy: Schema.Number;
            readonly charsTyped: Schema.Number;
            readonly correctChars: Schema.Number;
        }>>>;
        readonly createdAt: Schema.Number;
        readonly usedGameTexts: Schema.$Array<Schema.String>;
    }>;
    readonly maybePlayerProgress: Schema.Option<Schema.Struct<{
        readonly playerId: Schema.String;
        readonly gameId: Schema.String;
        readonly userText: Schema.String;
        readonly updatedAt: Schema.Number;
        readonly charsTyped: Schema.Number;
    }>>;
}>, typeof RoomNotFoundError>, Schema.Never, never, never> | Rpc.Rpc<"updatePlayerProgress", Schema.Struct<{
    readonly playerId: Schema.String;
    readonly gameId: Schema.String;
    readonly userText: Schema.String;
    readonly charsTyped: Schema.Number;
}>, Schema.Void, Schema.Never, never, never>>;
export type RoomRpcs = typeof RoomRpcs;
export {};
