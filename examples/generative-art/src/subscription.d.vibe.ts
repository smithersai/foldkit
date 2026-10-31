import { Option } from "effect";
import { Subscription } from 'foldkit';
export declare const subscriptions: {
    readonly frame: {
        dependenciesSchema: import("effect/Schema").Struct<{
            readonly isActive: import("effect/Schema").Boolean;
        }>;
        modelToDependencies: (model: {
            readonly particles: readonly {
                readonly id: number;
                readonly trail: readonly {
                    readonly x: number;
                    readonly y: number;
                }[];
                readonly baseHue: number;
                readonly hueDriftPerSecond: number;
                readonly ageMs: number;
                readonly lifespanMs: number;
                readonly speed: number;
                readonly bornAtSeconds: number;
                readonly initialAngle: Option.Option<number>;
                readonly initialSpeedScale: number;
            }[];
            readonly nextId: number;
            readonly elapsedSeconds: number;
            readonly maybeMousePosition: Option.Option<{
                readonly x: number;
                readonly y: number;
            }>;
            readonly isRunning: boolean;
            readonly flowStrength: number;
            readonly flowStrengthSlider: {
                readonly id: string;
                readonly min: number;
                readonly max: number;
                readonly step: number;
                readonly dragState: {
                    readonly _tag: "Idle";
                } | {
                    readonly _tag: "Dragging";
                    readonly originValue: number;
                };
            };
            readonly noiseScale: number;
            readonly noiseScaleSlider: {
                readonly id: string;
                readonly min: number;
                readonly max: number;
                readonly step: number;
                readonly dragState: {
                    readonly _tag: "Idle";
                } | {
                    readonly _tag: "Dragging";
                    readonly originValue: number;
                };
            };
        }) => {
            isActive: boolean;
        };
        dependenciesToStream: ({ isActive }: {
            readonly isActive: boolean;
        }) => import("effect/Stream").Stream<{
            readonly _tag: "TickedFrame";
            readonly deltaTimeMs: number;
        }, never, never>;
    } & {
        readonly __subscription: never;
    };
} & {
    readonly flowStrengthSliderEscape: Subscription.Subscription<{
        readonly particles: readonly {
            readonly id: number;
            readonly trail: readonly {
                readonly x: number;
                readonly y: number;
            }[];
            readonly baseHue: number;
            readonly hueDriftPerSecond: number;
            readonly ageMs: number;
            readonly lifespanMs: number;
            readonly speed: number;
            readonly bornAtSeconds: number;
            readonly initialAngle: Option.Option<number>;
            readonly initialSpeedScale: number;
        }[];
        readonly nextId: number;
        readonly elapsedSeconds: number;
        readonly maybeMousePosition: Option.Option<{
            readonly x: number;
            readonly y: number;
        }>;
        readonly isRunning: boolean;
        readonly flowStrength: number;
        readonly flowStrengthSlider: {
            readonly id: string;
            readonly min: number;
            readonly max: number;
            readonly step: number;
            readonly dragState: {
                readonly _tag: "Idle";
            } | {
                readonly _tag: "Dragging";
                readonly originValue: number;
            };
        };
        readonly noiseScale: number;
        readonly noiseScaleSlider: {
            readonly id: string;
            readonly min: number;
            readonly max: number;
            readonly step: number;
            readonly dragState: {
                readonly _tag: "Idle";
            } | {
                readonly _tag: "Dragging";
                readonly originValue: number;
            };
        };
    }, {
        readonly _tag: "ClickedReset";
    } | {
        readonly _tag: "ClickedTogglePlay";
    } | {
        readonly _tag: "CompletedGenerateAmbientParticle";
        readonly x: number;
        readonly y: number;
        readonly baseHue: number;
        readonly hueDriftPerSecond: number;
        readonly lifespanMs: number;
        readonly speed: number;
        readonly initialAngle: Option.Option<number>;
        readonly initialSpeedScale: number;
    } | {
        readonly _tag: "CompletedGenerateBurstParticle";
        readonly x: number;
        readonly y: number;
        readonly baseHue: number;
        readonly hueDriftPerSecond: number;
        readonly lifespanMs: number;
        readonly speed: number;
        readonly initialAngle: Option.Option<number>;
        readonly initialSpeedScale: number;
    } | {
        readonly _tag: "GotFlowStrengthSliderMessage";
        readonly message: {
            readonly _tag: "CancelledDrag";
        } | {
            readonly _tag: "ReleasedDragPointer";
        } | {
            readonly _tag: "MovedDragPointer";
            readonly value: number;
        } | {
            readonly _tag: "PressedKeyboardNavigation";
            readonly direction: "Max" | "Min" | "PageDecrement" | "PageIncrement" | "StepDecrement" | "StepIncrement";
            readonly value: number;
        } | {
            readonly _tag: "PressedPointer";
            readonly value: number;
            readonly originValue: number;
        } | {
            readonly _tag: "PressedThumb";
            readonly originValue: number;
        };
    } | {
        readonly _tag: "GotNoiseScaleSliderMessage";
        readonly message: {
            readonly _tag: "CancelledDrag";
        } | {
            readonly _tag: "ReleasedDragPointer";
        } | {
            readonly _tag: "MovedDragPointer";
            readonly value: number;
        } | {
            readonly _tag: "PressedKeyboardNavigation";
            readonly direction: "Max" | "Min" | "PageDecrement" | "PageIncrement" | "StepDecrement" | "StepIncrement";
            readonly value: number;
        } | {
            readonly _tag: "PressedPointer";
            readonly value: number;
            readonly originValue: number;
        } | {
            readonly _tag: "PressedThumb";
            readonly originValue: number;
        };
    } | {
        readonly _tag: "MovedPointer";
        readonly x: number;
        readonly y: number;
    } | {
        readonly _tag: "PressedCanvas";
        readonly x: number;
        readonly y: number;
    } | {
        readonly _tag: "TickedFrame";
        readonly deltaTimeMs: number;
    }, Readonly<{
        maybeDependencies: Option.Option<{
            readonly dragActivity: "Active" | "Idle";
        }>;
    }>, never>;
    readonly flowStrengthSliderPointer: Subscription.Subscription<{
        readonly particles: readonly {
            readonly id: number;
            readonly trail: readonly {
                readonly x: number;
                readonly y: number;
            }[];
            readonly baseHue: number;
            readonly hueDriftPerSecond: number;
            readonly ageMs: number;
            readonly lifespanMs: number;
            readonly speed: number;
            readonly bornAtSeconds: number;
            readonly initialAngle: Option.Option<number>;
            readonly initialSpeedScale: number;
        }[];
        readonly nextId: number;
        readonly elapsedSeconds: number;
        readonly maybeMousePosition: Option.Option<{
            readonly x: number;
            readonly y: number;
        }>;
        readonly isRunning: boolean;
        readonly flowStrength: number;
        readonly flowStrengthSlider: {
            readonly id: string;
            readonly min: number;
            readonly max: number;
            readonly step: number;
            readonly dragState: {
                readonly _tag: "Idle";
            } | {
                readonly _tag: "Dragging";
                readonly originValue: number;
            };
        };
        readonly noiseScale: number;
        readonly noiseScaleSlider: {
            readonly id: string;
            readonly min: number;
            readonly max: number;
            readonly step: number;
            readonly dragState: {
                readonly _tag: "Idle";
            } | {
                readonly _tag: "Dragging";
                readonly originValue: number;
            };
        };
    }, {
        readonly _tag: "ClickedReset";
    } | {
        readonly _tag: "ClickedTogglePlay";
    } | {
        readonly _tag: "CompletedGenerateAmbientParticle";
        readonly x: number;
        readonly y: number;
        readonly baseHue: number;
        readonly hueDriftPerSecond: number;
        readonly lifespanMs: number;
        readonly speed: number;
        readonly initialAngle: Option.Option<number>;
        readonly initialSpeedScale: number;
    } | {
        readonly _tag: "CompletedGenerateBurstParticle";
        readonly x: number;
        readonly y: number;
        readonly baseHue: number;
        readonly hueDriftPerSecond: number;
        readonly lifespanMs: number;
        readonly speed: number;
        readonly initialAngle: Option.Option<number>;
        readonly initialSpeedScale: number;
    } | {
        readonly _tag: "GotFlowStrengthSliderMessage";
        readonly message: {
            readonly _tag: "CancelledDrag";
        } | {
            readonly _tag: "ReleasedDragPointer";
        } | {
            readonly _tag: "MovedDragPointer";
            readonly value: number;
        } | {
            readonly _tag: "PressedKeyboardNavigation";
            readonly direction: "Max" | "Min" | "PageDecrement" | "PageIncrement" | "StepDecrement" | "StepIncrement";
            readonly value: number;
        } | {
            readonly _tag: "PressedPointer";
            readonly value: number;
            readonly originValue: number;
        } | {
            readonly _tag: "PressedThumb";
            readonly originValue: number;
        };
    } | {
        readonly _tag: "GotNoiseScaleSliderMessage";
        readonly message: {
            readonly _tag: "CancelledDrag";
        } | {
            readonly _tag: "ReleasedDragPointer";
        } | {
            readonly _tag: "MovedDragPointer";
            readonly value: number;
        } | {
            readonly _tag: "PressedKeyboardNavigation";
            readonly direction: "Max" | "Min" | "PageDecrement" | "PageIncrement" | "StepDecrement" | "StepIncrement";
            readonly value: number;
        } | {
            readonly _tag: "PressedPointer";
            readonly value: number;
            readonly originValue: number;
        } | {
            readonly _tag: "PressedThumb";
            readonly originValue: number;
        };
    } | {
        readonly _tag: "MovedPointer";
        readonly x: number;
        readonly y: number;
    } | {
        readonly _tag: "PressedCanvas";
        readonly x: number;
        readonly y: number;
    } | {
        readonly _tag: "TickedFrame";
        readonly deltaTimeMs: number;
    }, Readonly<{
        maybeDependencies: Option.Option<{
            readonly dragActivity: "Active" | "Idle";
            readonly id: string;
            readonly min: number;
            readonly max: number;
        }>;
    }>, never>;
} & {
    readonly noiseScaleSliderEscape: Subscription.Subscription<{
        readonly particles: readonly {
            readonly id: number;
            readonly trail: readonly {
                readonly x: number;
                readonly y: number;
            }[];
            readonly baseHue: number;
            readonly hueDriftPerSecond: number;
            readonly ageMs: number;
            readonly lifespanMs: number;
            readonly speed: number;
            readonly bornAtSeconds: number;
            readonly initialAngle: Option.Option<number>;
            readonly initialSpeedScale: number;
        }[];
        readonly nextId: number;
        readonly elapsedSeconds: number;
        readonly maybeMousePosition: Option.Option<{
            readonly x: number;
            readonly y: number;
        }>;
        readonly isRunning: boolean;
        readonly flowStrength: number;
        readonly flowStrengthSlider: {
            readonly id: string;
            readonly min: number;
            readonly max: number;
            readonly step: number;
            readonly dragState: {
                readonly _tag: "Idle";
            } | {
                readonly _tag: "Dragging";
                readonly originValue: number;
            };
        };
        readonly noiseScale: number;
        readonly noiseScaleSlider: {
            readonly id: string;
            readonly min: number;
            readonly max: number;
            readonly step: number;
            readonly dragState: {
                readonly _tag: "Idle";
            } | {
                readonly _tag: "Dragging";
                readonly originValue: number;
            };
        };
    }, {
        readonly _tag: "ClickedReset";
    } | {
        readonly _tag: "ClickedTogglePlay";
    } | {
        readonly _tag: "CompletedGenerateAmbientParticle";
        readonly x: number;
        readonly y: number;
        readonly baseHue: number;
        readonly hueDriftPerSecond: number;
        readonly lifespanMs: number;
        readonly speed: number;
        readonly initialAngle: Option.Option<number>;
        readonly initialSpeedScale: number;
    } | {
        readonly _tag: "CompletedGenerateBurstParticle";
        readonly x: number;
        readonly y: number;
        readonly baseHue: number;
        readonly hueDriftPerSecond: number;
        readonly lifespanMs: number;
        readonly speed: number;
        readonly initialAngle: Option.Option<number>;
        readonly initialSpeedScale: number;
    } | {
        readonly _tag: "GotFlowStrengthSliderMessage";
        readonly message: {
            readonly _tag: "CancelledDrag";
        } | {
            readonly _tag: "ReleasedDragPointer";
        } | {
            readonly _tag: "MovedDragPointer";
            readonly value: number;
        } | {
            readonly _tag: "PressedKeyboardNavigation";
            readonly direction: "Max" | "Min" | "PageDecrement" | "PageIncrement" | "StepDecrement" | "StepIncrement";
            readonly value: number;
        } | {
            readonly _tag: "PressedPointer";
            readonly value: number;
            readonly originValue: number;
        } | {
            readonly _tag: "PressedThumb";
            readonly originValue: number;
        };
    } | {
        readonly _tag: "GotNoiseScaleSliderMessage";
        readonly message: {
            readonly _tag: "CancelledDrag";
        } | {
            readonly _tag: "ReleasedDragPointer";
        } | {
            readonly _tag: "MovedDragPointer";
            readonly value: number;
        } | {
            readonly _tag: "PressedKeyboardNavigation";
            readonly direction: "Max" | "Min" | "PageDecrement" | "PageIncrement" | "StepDecrement" | "StepIncrement";
            readonly value: number;
        } | {
            readonly _tag: "PressedPointer";
            readonly value: number;
            readonly originValue: number;
        } | {
            readonly _tag: "PressedThumb";
            readonly originValue: number;
        };
    } | {
        readonly _tag: "MovedPointer";
        readonly x: number;
        readonly y: number;
    } | {
        readonly _tag: "PressedCanvas";
        readonly x: number;
        readonly y: number;
    } | {
        readonly _tag: "TickedFrame";
        readonly deltaTimeMs: number;
    }, Readonly<{
        maybeDependencies: Option.Option<{
            readonly dragActivity: "Active" | "Idle";
        }>;
    }>, never>;
    readonly noiseScaleSliderPointer: Subscription.Subscription<{
        readonly particles: readonly {
            readonly id: number;
            readonly trail: readonly {
                readonly x: number;
                readonly y: number;
            }[];
            readonly baseHue: number;
            readonly hueDriftPerSecond: number;
            readonly ageMs: number;
            readonly lifespanMs: number;
            readonly speed: number;
            readonly bornAtSeconds: number;
            readonly initialAngle: Option.Option<number>;
            readonly initialSpeedScale: number;
        }[];
        readonly nextId: number;
        readonly elapsedSeconds: number;
        readonly maybeMousePosition: Option.Option<{
            readonly x: number;
            readonly y: number;
        }>;
        readonly isRunning: boolean;
        readonly flowStrength: number;
        readonly flowStrengthSlider: {
            readonly id: string;
            readonly min: number;
            readonly max: number;
            readonly step: number;
            readonly dragState: {
                readonly _tag: "Idle";
            } | {
                readonly _tag: "Dragging";
                readonly originValue: number;
            };
        };
        readonly noiseScale: number;
        readonly noiseScaleSlider: {
            readonly id: string;
            readonly min: number;
            readonly max: number;
            readonly step: number;
            readonly dragState: {
                readonly _tag: "Idle";
            } | {
                readonly _tag: "Dragging";
                readonly originValue: number;
            };
        };
    }, {
        readonly _tag: "ClickedReset";
    } | {
        readonly _tag: "ClickedTogglePlay";
    } | {
        readonly _tag: "CompletedGenerateAmbientParticle";
        readonly x: number;
        readonly y: number;
        readonly baseHue: number;
        readonly hueDriftPerSecond: number;
        readonly lifespanMs: number;
        readonly speed: number;
        readonly initialAngle: Option.Option<number>;
        readonly initialSpeedScale: number;
    } | {
        readonly _tag: "CompletedGenerateBurstParticle";
        readonly x: number;
        readonly y: number;
        readonly baseHue: number;
        readonly hueDriftPerSecond: number;
        readonly lifespanMs: number;
        readonly speed: number;
        readonly initialAngle: Option.Option<number>;
        readonly initialSpeedScale: number;
    } | {
        readonly _tag: "GotFlowStrengthSliderMessage";
        readonly message: {
            readonly _tag: "CancelledDrag";
        } | {
            readonly _tag: "ReleasedDragPointer";
        } | {
            readonly _tag: "MovedDragPointer";
            readonly value: number;
        } | {
            readonly _tag: "PressedKeyboardNavigation";
            readonly direction: "Max" | "Min" | "PageDecrement" | "PageIncrement" | "StepDecrement" | "StepIncrement";
            readonly value: number;
        } | {
            readonly _tag: "PressedPointer";
            readonly value: number;
            readonly originValue: number;
        } | {
            readonly _tag: "PressedThumb";
            readonly originValue: number;
        };
    } | {
        readonly _tag: "GotNoiseScaleSliderMessage";
        readonly message: {
            readonly _tag: "CancelledDrag";
        } | {
            readonly _tag: "ReleasedDragPointer";
        } | {
            readonly _tag: "MovedDragPointer";
            readonly value: number;
        } | {
            readonly _tag: "PressedKeyboardNavigation";
            readonly direction: "Max" | "Min" | "PageDecrement" | "PageIncrement" | "StepDecrement" | "StepIncrement";
            readonly value: number;
        } | {
            readonly _tag: "PressedPointer";
            readonly value: number;
            readonly originValue: number;
        } | {
            readonly _tag: "PressedThumb";
            readonly originValue: number;
        };
    } | {
        readonly _tag: "MovedPointer";
        readonly x: number;
        readonly y: number;
    } | {
        readonly _tag: "PressedCanvas";
        readonly x: number;
        readonly y: number;
    } | {
        readonly _tag: "TickedFrame";
        readonly deltaTimeMs: number;
    }, Readonly<{
        maybeDependencies: Option.Option<{
            readonly dragActivity: "Active" | "Idle";
            readonly id: string;
            readonly min: number;
            readonly max: number;
        }>;
    }>, never>;
};
