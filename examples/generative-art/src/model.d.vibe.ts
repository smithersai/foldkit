import { Schema } from "effect";
export declare const Point: Schema.Struct<{
    readonly x: Schema.Number;
    readonly y: Schema.Number;
}>;
export type Point = typeof Point.Type;
export declare const Particle: Schema.Struct<{
    readonly id: Schema.Number;
    readonly trail: Schema.$Array<Schema.Struct<{
        readonly x: Schema.Number;
        readonly y: Schema.Number;
    }>>;
    readonly baseHue: Schema.Number;
    readonly hueDriftPerSecond: Schema.Number;
    readonly ageMs: Schema.Number;
    readonly lifespanMs: Schema.Number;
    readonly speed: Schema.Number;
    readonly bornAtSeconds: Schema.Number;
    readonly initialAngle: Schema.Option<Schema.Number>;
    readonly initialSpeedScale: Schema.Number;
}>;
export type Particle = typeof Particle.Type;
export declare const Model: Schema.Struct<{
    readonly particles: Schema.$Array<Schema.Struct<{
        readonly id: Schema.Number;
        readonly trail: Schema.$Array<Schema.Struct<{
            readonly x: Schema.Number;
            readonly y: Schema.Number;
        }>>;
        readonly baseHue: Schema.Number;
        readonly hueDriftPerSecond: Schema.Number;
        readonly ageMs: Schema.Number;
        readonly lifespanMs: Schema.Number;
        readonly speed: Schema.Number;
        readonly bornAtSeconds: Schema.Number;
        readonly initialAngle: Schema.Option<Schema.Number>;
        readonly initialSpeedScale: Schema.Number;
    }>>;
    readonly nextId: Schema.Number;
    readonly elapsedSeconds: Schema.Number;
    readonly maybeMousePosition: Schema.Option<Schema.Struct<{
        readonly x: Schema.Number;
        readonly y: Schema.Number;
    }>>;
    readonly isRunning: Schema.Boolean;
    readonly flowStrength: Schema.Number;
    readonly flowStrengthSlider: Schema.Struct<{
        readonly id: Schema.String;
        readonly min: Schema.Number;
        readonly max: Schema.Number;
        readonly step: Schema.Number;
        readonly dragState: import("foldkit/schema").TaggedUnion<{
            readonly Idle: {};
            readonly Dragging: {
                originValue: Schema.Number;
            };
        }>;
    }>;
    readonly noiseScale: Schema.Number;
    readonly noiseScaleSlider: Schema.Struct<{
        readonly id: Schema.String;
        readonly min: Schema.Number;
        readonly max: Schema.Number;
        readonly step: Schema.Number;
        readonly dragState: import("foldkit/schema").TaggedUnion<{
            readonly Idle: {};
            readonly Dragging: {
                originValue: Schema.Number;
            };
        }>;
    }>;
}>;
export type Model = typeof Model.Type;
