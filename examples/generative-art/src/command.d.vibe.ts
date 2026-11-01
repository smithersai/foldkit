import { Effect, Option, Schema } from 'effect';
import { Command } from 'foldkit';
export declare const GenerateAmbientParticle: Command.CommandDefinitionNoArgs<"GenerateAmbientParticle", Effect.Effect<{
    readonly _tag: "CompletedGenerateAmbientParticle";
    readonly x: number;
    readonly y: number;
    readonly baseHue: number;
    readonly hueDriftPerSecond: number;
    readonly lifespanMs: number;
    readonly speed: number;
    readonly initialAngle: Option.Option<number>;
    readonly initialSpeedScale: number;
}, never, never>>;
export declare const GenerateBurstParticle: Command.CommandDefinitionWithArgs<"GenerateBurstParticle", {
    x: Schema.Number;
    y: Schema.Number;
    angle: Schema.Number;
    hueAnchor: Schema.Number;
}, Effect.Effect<{
    readonly _tag: "CompletedGenerateBurstParticle";
    readonly x: number;
    readonly y: number;
    readonly baseHue: number;
    readonly hueDriftPerSecond: number;
    readonly lifespanMs: number;
    readonly speed: number;
    readonly initialAngle: Option.Option<number>;
    readonly initialSpeedScale: number;
}, never, never>>;
