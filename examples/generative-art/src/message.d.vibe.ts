import { Schema } from 'effect';
export declare const Message: import("foldkit/message").MessageUnion<{
    readonly TickedFrame: {
        deltaTimeMs: Schema.Number;
    };
    readonly CompletedGenerateAmbientParticle: {
        x: Schema.Number;
        y: Schema.Number;
        baseHue: Schema.Number;
        hueDriftPerSecond: Schema.Number;
        lifespanMs: Schema.Number;
        speed: Schema.Number;
        initialAngle: Schema.Option<Schema.Number>;
        initialSpeedScale: Schema.Number;
    };
    readonly CompletedGenerateBurstParticle: {
        x: Schema.Number;
        y: Schema.Number;
        baseHue: Schema.Number;
        hueDriftPerSecond: Schema.Number;
        lifespanMs: Schema.Number;
        speed: Schema.Number;
        initialAngle: Schema.Option<Schema.Number>;
        initialSpeedScale: Schema.Number;
    };
    readonly PressedCanvas: {
        x: Schema.Number;
        y: Schema.Number;
    };
    readonly MovedPointer: {
        x: Schema.Number;
        y: Schema.Number;
    };
    readonly ClickedTogglePlay: {};
    readonly ClickedReset: {};
    readonly GotFlowStrengthSliderMessage: {
        message: import("foldkit/message").MessageUnion<{
            readonly PressedThumb: {
                originValue: Schema.Number;
            };
            readonly PressedPointer: {
                value: Schema.Number;
                originValue: Schema.Number;
            };
            readonly MovedDragPointer: {
                value: Schema.Number;
            };
            readonly ReleasedDragPointer: {};
            readonly CancelledDrag: {};
            readonly PressedKeyboardNavigation: {
                direction: Schema.Literals<readonly ["StepDecrement", "StepIncrement", "PageDecrement", "PageIncrement", "Min", "Max"]>;
                value: Schema.Number;
            };
        }>;
    };
    readonly GotNoiseScaleSliderMessage: {
        message: import("foldkit/message").MessageUnion<{
            readonly PressedThumb: {
                originValue: Schema.Number;
            };
            readonly PressedPointer: {
                value: Schema.Number;
                originValue: Schema.Number;
            };
            readonly MovedDragPointer: {
                value: Schema.Number;
            };
            readonly ReleasedDragPointer: {};
            readonly CancelledDrag: {};
            readonly PressedKeyboardNavigation: {
                direction: Schema.Literals<readonly ["StepDecrement", "StepIncrement", "PageDecrement", "PageIncrement", "Min", "Max"]>;
                value: Schema.Number;
            };
        }>;
    };
}>;
export type Message = typeof Message.Type;
