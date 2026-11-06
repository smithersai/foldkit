import { Array, Effect } from 'effect';
export declare const GAME_TEXTS: Array.NonEmptyReadonlyArray<string>;
export declare const generateGameText: (usedGameTexts: ReadonlyArray<string>) => Effect.Effect<string>;
