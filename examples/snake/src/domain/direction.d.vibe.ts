import { Schema } from "effect";
export declare const Direction: Schema.Literals<readonly ["Up", "Down", "Left", "Right"]>;
export type Direction = typeof Direction.Type;
export declare const opposite: (direction: Direction) => Direction;
export declare const isOpposite: (a: Direction, b: Direction) => boolean;
