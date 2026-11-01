import { Schema } from 'effect';
import type { Direction } from './direction.vibe';
import * as Position from './position.vibe';
export declare const INITIAL_LENGTH = 3;
export declare const Snake: Schema.NonEmptyArray<Schema.Struct<{
    readonly x: Schema.Number;
    readonly y: Schema.Number;
}>>;
export type Snake = typeof Snake.Type;
export declare const create: (startPos: Position.Position) => Snake;
export declare const move: (snake: Snake, direction: Direction) => Snake;
export declare const grow: (snake: Snake, direction: Direction) => Snake;
export declare const hasCollision: (snake: Snake) => boolean;
export declare const contains: (snake: Snake, pos: Position.Position) => boolean;
