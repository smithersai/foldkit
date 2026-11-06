import { Schema } from 'effect';
import * as Direction from './direction.vibe';
export declare const Position: Schema.Struct<{
    readonly x: Schema.Number;
    readonly y: Schema.Number;
}>;
export type Position = typeof Position.Type;
export declare const equivalence: import("effect/Equivalence").Equivalence<{
    readonly x: number;
    readonly y: number;
}>;
export declare const wrap: ({ x, y }: Position) => Position;
export declare const move: (pos: Position, direction: Direction.Direction) => Position;
