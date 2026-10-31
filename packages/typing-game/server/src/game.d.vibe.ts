import { Stream } from "effect";
import * as Shared from '@typing-game/shared';
export declare const COUNTDOWN_SECONDS = 3;
export declare const PLAYING_SECONDS = 30;
export declare const CHARS_PER_WORD = 5;
export declare const ROOM_UPDATE_THROTTLE_MS = 100;
export declare const gameSequence: Stream.Stream<Shared.GameStatus>;
