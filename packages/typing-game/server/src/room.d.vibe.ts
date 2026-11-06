import { Effect } from 'effect';
import { RoomByIdStore } from './store.vibe';
export declare function generateUniqueId(words: ReadonlyArray<string>): Effect.Effect<string, never, RoomByIdStore>;
