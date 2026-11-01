import { Effect, Schema } from 'effect';
import { Command } from 'foldkit';
import type { Model } from './model.vibe';
export declare const SaveCanvas: Command.CommandDefinitionWithArgs<"SaveCanvas", {
    grid: Schema.$Array<Schema.$Array<Schema.Option<Schema.Literals<readonly [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]>>>>;
    gridSize: Schema.Number;
    paletteThemeIndex: Schema.Number;
    selectedColorIndex: Schema.Literals<readonly [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]>;
}, Effect.Effect<{
    readonly _tag: "CompletedSaveCanvas";
}, never, never>>;
export declare const saveCanvas: (model: Model) => Readonly<{
    name: "SaveCanvas";
    args: {
        readonly grid: readonly (readonly import("effect/Option").Option<0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15>[])[];
        readonly gridSize: number;
        readonly paletteThemeIndex: number;
        readonly selectedColorIndex: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15;
    };
    effect: Effect.Effect<{
        readonly _tag: "CompletedSaveCanvas";
    }, never, never>;
}>;
export declare const ExportPng: Command.CommandDefinitionWithArgs<"ExportPng", {
    grid: Schema.$Array<Schema.$Array<Schema.Option<Schema.Literals<readonly [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]>>>>;
    gridSize: Schema.Number;
    paletteThemeIndex: Schema.Number;
}, Effect.Effect<{
    readonly _tag: "SucceededExportPng";
} | {
    readonly _tag: "FailedExportPng";
    readonly error: string;
}, never, never>>;
