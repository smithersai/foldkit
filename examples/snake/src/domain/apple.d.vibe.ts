import { Effect } from "effect";
import * as Snake from './snake.vibe';
export declare const generatePosition: (snake: Snake.Snake) => Effect.Effect<{
    readonly x: number;
    readonly y: number;
}, never, never>;
