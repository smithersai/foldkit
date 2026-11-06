import { Duration, Effect, Option, Schema } from 'effect';
import * as Command from 'foldkit/command';
import * as Subscription from 'foldkit/subscription';
import * as Update from 'foldkit/update';
import { type InitConfig, SwipeState, type Variant } from './schema.vibe';
/** Input for `show()`. `payload` is the consumer-defined content shape for an
 *  entry. Omit `duration` to use the container's `defaultDuration`; pass
 *  `sticky: true` to skip auto-dismiss entirely. */
export type ShowInput<A> = Readonly<{
    payload: A;
    variant?: Variant;
    duration?: Duration.Input;
    sticky?: boolean;
}>;
/** Waits for an entry's auto-dismiss duration, then emits a versioned
 *  `CompletedWaitBeforeDismissal` Message so update can ignore stale timers. */
export declare const WaitBeforeDismissal: Command.CommandDefinitionWithArgs<"WaitBeforeDismissal", {
    entryId: Schema.String;
    version: Schema.Number;
    duration: Schema.DurationFromMillis;
}, Effect.Effect<{
    readonly _tag: "CompletedWaitBeforeDismissal";
    readonly entryId: string;
    readonly version: number;
}, never, never>>;
/** Waits for a short or cancelled swipe to animate back, then emits
 *  `CompletedWaitForSwipeSettled` so update can clear `Settling`. */
export declare const WaitForSwipeSettled: Command.CommandDefinitionWithArgs<"WaitForSwipeSettled", {
    entryId: Schema.String;
    version: Schema.Number;
}, Effect.Effect<{
    readonly _tag: "CompletedWaitForSwipeSettled";
    readonly entryId: string;
    readonly version: number;
}, never, never>>;
/** Horizontal offset in pixels for an entry's swipe state. `Dragging`
 *  reports the distance travelled from the press point; `Dismissing` reports
 *  the offset the release left behind; `Idle` and `Settling` report zero. */
export declare const swipeOffset: (swipeState: typeof SwipeState.Type) => number;
/** Factory that binds Toast's runtime (update fn, helpers, commands) to a
 *  specific payload schema. Called by `make` in index.ts; inner helpers close
 *  over the payload-specific Entry / Model / Added types so generics don't
 *  have to propagate through every helper signature.
 *
 *  @internal Consumers should use `Toast.make(PayloadSchema)`. This is
 *  only exported so `index.ts` can wire the view into the bound runtime. */
export declare const makeRuntime: <A, I>(payloadSchema: Schema.Codec<A, I>) => {
    readonly Entry: Schema.Struct<{
        readonly id: Schema.String;
        readonly variant: Schema.Literals<readonly ["Info", "Success", "Warning", "Error"]>;
        readonly animation: Schema.Struct<{
            readonly id: Schema.String;
            readonly isShowing: Schema.Boolean;
            readonly transitionState: Schema.Literals<readonly ["Idle", "EnterStart", "EnterAnimating", "LeaveStart", "LeaveAnimating"]>;
            readonly transitionGeneration: Schema.Number;
        }>;
        readonly maybeDuration: Schema.Option<Schema.DurationFromMillis>;
        readonly pendingDismissVersion: Schema.Number;
        readonly isHovered: Schema.Boolean;
        readonly swipeState: import("foldkit/schema").TaggedUnion<{
            readonly Idle: {};
            readonly Dragging: {
                pointerId: Schema.Number;
                startX: Schema.Number;
                currentX: Schema.Number;
            };
            readonly Settling: {
                offsetX: Schema.Number;
            };
            readonly Dismissing: {
                offsetX: Schema.Number;
                direction: Schema.Literals<readonly ["Left", "Right"]>;
            };
        }>;
        readonly swipeVersion: Schema.Number;
        readonly payload: Schema.Codec<A, I, never, never>;
    }>;
    readonly Model: Schema.Struct<{
        readonly id: Schema.String;
        readonly defaultDuration: Schema.DurationFromMillis;
        readonly entries: Schema.$Array<Schema.Struct<{
            readonly id: Schema.String;
            readonly variant: Schema.Literals<readonly ["Info", "Success", "Warning", "Error"]>;
            readonly animation: Schema.Struct<{
                readonly id: Schema.String;
                readonly isShowing: Schema.Boolean;
                readonly transitionState: Schema.Literals<readonly ["Idle", "EnterStart", "EnterAnimating", "LeaveStart", "LeaveAnimating"]>;
                readonly transitionGeneration: Schema.Number;
            }>;
            readonly maybeDuration: Schema.Option<Schema.DurationFromMillis>;
            readonly pendingDismissVersion: Schema.Number;
            readonly isHovered: Schema.Boolean;
            readonly swipeState: import("foldkit/schema").TaggedUnion<{
                readonly Idle: {};
                readonly Dragging: {
                    pointerId: Schema.Number;
                    startX: Schema.Number;
                    currentX: Schema.Number;
                };
                readonly Settling: {
                    offsetX: Schema.Number;
                };
                readonly Dismissing: {
                    offsetX: Schema.Number;
                    direction: Schema.Literals<readonly ["Left", "Right"]>;
                };
            }>;
            readonly swipeVersion: Schema.Number;
            readonly payload: Schema.Codec<A, I, never, never>;
        }>>;
        readonly nextEntryKey: Schema.Number;
        readonly maybeSwipeConfig: Schema.Option<Schema.Struct<{
            readonly direction: Schema.Literals<readonly ["Left", "Right"]>;
            readonly threshold: Schema.Number;
        }>>;
    }>;
    readonly Message: import("foldkit/message").MessageUnion<{
        readonly Added: {
            readonly entry: Schema.Struct<{
                readonly id: Schema.String;
                readonly variant: Schema.Literals<readonly ["Info", "Success", "Warning", "Error"]>;
                readonly animation: Schema.Struct<{
                    readonly id: Schema.String;
                    readonly isShowing: Schema.Boolean;
                    readonly transitionState: Schema.Literals<readonly ["Idle", "EnterStart", "EnterAnimating", "LeaveStart", "LeaveAnimating"]>;
                    readonly transitionGeneration: Schema.Number;
                }>;
                readonly maybeDuration: Schema.Option<Schema.DurationFromMillis>;
                readonly pendingDismissVersion: Schema.Number;
                readonly isHovered: Schema.Boolean;
                readonly swipeState: import("foldkit/schema").TaggedUnion<{
                    readonly Idle: {};
                    readonly Dragging: {
                        pointerId: Schema.Number;
                        startX: Schema.Number;
                        currentX: Schema.Number;
                    };
                    readonly Settling: {
                        offsetX: Schema.Number;
                    };
                    readonly Dismissing: {
                        offsetX: Schema.Number;
                        direction: Schema.Literals<readonly ["Left", "Right"]>;
                    };
                }>;
                readonly swipeVersion: Schema.Number;
                readonly payload: Schema.Codec<A, I, never, never>;
            }>;
        };
        readonly Dismissed: {
            entryId: Schema.String;
        };
        readonly DismissedAll: {};
        readonly CompletedWaitBeforeDismissal: {
            entryId: Schema.String;
            version: Schema.Number;
        };
        readonly HoveredEntry: {
            entryId: Schema.String;
        };
        readonly LeftEntry: {
            entryId: Schema.String;
        };
        readonly GotAnimationMessage: {
            entryId: Schema.String;
            message: import("foldkit/message").MessageUnion<{
                readonly Showed: {};
                readonly Hid: {};
                readonly CompletedWaitForPaint: {
                    generation: Schema.Number;
                };
                readonly EndedAnimation: {
                    generation: Schema.Number;
                };
            }>;
        };
        readonly PressedEntryPointer: {
            entryId: Schema.String;
            pointerId: Schema.Number;
            clientX: Schema.Number;
        };
        readonly MovedSwipePointer: {
            pointerId: Schema.Number;
            clientX: Schema.Number;
        };
        readonly ReleasedSwipePointer: {
            pointerId: Schema.Number;
            clientX: Schema.Number;
        };
        readonly CancelledSwipe: {
            pointerId: Schema.Number;
        };
        readonly PressedEscape: {};
        readonly CompletedWaitForSwipeSettled: {
            entryId: Schema.String;
            version: Schema.Number;
        };
    }>;
    readonly OutMessage: import("foldkit/message").MessageUnion<{
        readonly DismissedToast: {
            readonly payload: Schema.Codec<A, I, never, never>;
        };
    }>;
    readonly Added: import("foldkit/schema").CallableTaggedStruct<"Added", {
        readonly entry: Schema.Struct<{
            readonly id: Schema.String;
            readonly variant: Schema.Literals<readonly ["Info", "Success", "Warning", "Error"]>;
            readonly animation: Schema.Struct<{
                readonly id: Schema.String;
                readonly isShowing: Schema.Boolean;
                readonly transitionState: Schema.Literals<readonly ["Idle", "EnterStart", "EnterAnimating", "LeaveStart", "LeaveAnimating"]>;
                readonly transitionGeneration: Schema.Number;
            }>;
            readonly maybeDuration: Schema.Option<Schema.DurationFromMillis>;
            readonly pendingDismissVersion: Schema.Number;
            readonly isHovered: Schema.Boolean;
            readonly swipeState: import("foldkit/schema").TaggedUnion<{
                readonly Idle: {};
                readonly Dragging: {
                    pointerId: Schema.Number;
                    startX: Schema.Number;
                    currentX: Schema.Number;
                };
                readonly Settling: {
                    offsetX: Schema.Number;
                };
                readonly Dismissing: {
                    offsetX: Schema.Number;
                    direction: Schema.Literals<readonly ["Left", "Right"]>;
                };
            }>;
            readonly swipeVersion: Schema.Number;
            readonly payload: Schema.Codec<A, I, never, never>;
        }>;
    }>;
    readonly DismissedToast: import("foldkit/schema").CallableTaggedStruct<"DismissedToast", {
        readonly payload: Schema.Codec<A, I, never, never>;
    }>;
    readonly init: (config: InitConfig) => {
        readonly id: string;
        readonly defaultDuration: Duration.Duration;
        readonly entries: readonly {
            readonly id: string;
            readonly variant: "Error" | "Info" | "Success" | "Warning";
            readonly animation: {
                readonly id: string;
                readonly isShowing: boolean;
                readonly transitionState: "EnterAnimating" | "EnterStart" | "Idle" | "LeaveAnimating" | "LeaveStart";
                readonly transitionGeneration: number;
            };
            readonly maybeDuration: Option.Option<Duration.Duration>;
            readonly pendingDismissVersion: number;
            readonly isHovered: boolean;
            readonly swipeState: {
                readonly _tag: "Idle";
            } | {
                readonly _tag: "Dismissing";
                readonly offsetX: number;
                readonly direction: "Left" | "Right";
            } | {
                readonly _tag: "Dragging";
                readonly pointerId: number;
                readonly startX: number;
                readonly currentX: number;
            } | {
                readonly _tag: "Settling";
                readonly offsetX: number;
            };
            readonly swipeVersion: number;
            readonly payload: A;
        }[];
        readonly nextEntryKey: number;
        readonly maybeSwipeConfig: Option.Option<{
            readonly direction: "Left" | "Right";
            readonly threshold: number;
        }>;
    };
    readonly update: (model: {
        readonly id: string;
        readonly defaultDuration: Duration.Duration;
        readonly entries: readonly {
            readonly id: string;
            readonly variant: "Error" | "Info" | "Success" | "Warning";
            readonly animation: {
                readonly id: string;
                readonly isShowing: boolean;
                readonly transitionState: "EnterAnimating" | "EnterStart" | "Idle" | "LeaveAnimating" | "LeaveStart";
                readonly transitionGeneration: number;
            };
            readonly maybeDuration: Option.Option<Duration.Duration>;
            readonly pendingDismissVersion: number;
            readonly isHovered: boolean;
            readonly swipeState: {
                readonly _tag: "Idle";
            } | {
                readonly _tag: "Dismissing";
                readonly offsetX: number;
                readonly direction: "Left" | "Right";
            } | {
                readonly _tag: "Dragging";
                readonly pointerId: number;
                readonly startX: number;
                readonly currentX: number;
            } | {
                readonly _tag: "Settling";
                readonly offsetX: number;
            };
            readonly swipeVersion: number;
            readonly payload: A;
        }[];
        readonly nextEntryKey: number;
        readonly maybeSwipeConfig: Option.Option<{
            readonly direction: "Left" | "Right";
            readonly threshold: number;
        }>;
    }, message: {
        readonly _tag: "Added";
        readonly entry: {
            readonly id: string;
            readonly variant: "Error" | "Info" | "Success" | "Warning";
            readonly animation: {
                readonly id: string;
                readonly isShowing: boolean;
                readonly transitionState: "EnterAnimating" | "EnterStart" | "Idle" | "LeaveAnimating" | "LeaveStart";
                readonly transitionGeneration: number;
            };
            readonly maybeDuration: Option.Option<Duration.Duration>;
            readonly pendingDismissVersion: number;
            readonly isHovered: boolean;
            readonly swipeState: {
                readonly _tag: "Idle";
            } | {
                readonly _tag: "Dismissing";
                readonly offsetX: number;
                readonly direction: "Left" | "Right";
            } | {
                readonly _tag: "Dragging";
                readonly pointerId: number;
                readonly startX: number;
                readonly currentX: number;
            } | {
                readonly _tag: "Settling";
                readonly offsetX: number;
            };
            readonly swipeVersion: number;
            readonly payload: A;
        };
    } | {
        readonly _tag: "CancelledSwipe";
        readonly pointerId: number;
    } | {
        readonly _tag: "CompletedWaitBeforeDismissal";
        readonly entryId: string;
        readonly version: number;
    } | {
        readonly _tag: "CompletedWaitForSwipeSettled";
        readonly entryId: string;
        readonly version: number;
    } | {
        readonly _tag: "Dismissed";
        readonly entryId: string;
    } | {
        readonly _tag: "DismissedAll";
    } | {
        readonly _tag: "GotAnimationMessage";
        readonly entryId: string;
        readonly message: {
            readonly _tag: "Hid";
        } | {
            readonly _tag: "Showed";
        } | {
            readonly _tag: "CompletedWaitForPaint";
            readonly generation: number;
        } | {
            readonly _tag: "EndedAnimation";
            readonly generation: number;
        };
    } | {
        readonly _tag: "HoveredEntry";
        readonly entryId: string;
    } | {
        readonly _tag: "LeftEntry";
        readonly entryId: string;
    } | {
        readonly _tag: "MovedSwipePointer";
        readonly pointerId: number;
        readonly clientX: number;
    } | {
        readonly _tag: "PressedEntryPointer";
        readonly entryId: string;
        readonly pointerId: number;
        readonly clientX: number;
    } | {
        readonly _tag: "PressedEscape";
    } | {
        readonly _tag: "ReleasedSwipePointer";
        readonly pointerId: number;
        readonly clientX: number;
    }) => Readonly<{
        model: {
            readonly id: string;
            readonly defaultDuration: Duration.Duration;
            readonly entries: readonly {
                readonly id: string;
                readonly variant: "Error" | "Info" | "Success" | "Warning";
                readonly animation: {
                    readonly id: string;
                    readonly isShowing: boolean;
                    readonly transitionState: "EnterAnimating" | "EnterStart" | "Idle" | "LeaveAnimating" | "LeaveStart";
                    readonly transitionGeneration: number;
                };
                readonly maybeDuration: Option.Option<Duration.Duration>;
                readonly pendingDismissVersion: number;
                readonly isHovered: boolean;
                readonly swipeState: {
                    readonly _tag: "Idle";
                } | {
                    readonly _tag: "Dismissing";
                    readonly offsetX: number;
                    readonly direction: "Left" | "Right";
                } | {
                    readonly _tag: "Dragging";
                    readonly pointerId: number;
                    readonly startX: number;
                    readonly currentX: number;
                } | {
                    readonly _tag: "Settling";
                    readonly offsetX: number;
                };
                readonly swipeVersion: number;
                readonly payload: A;
            }[];
            readonly nextEntryKey: number;
            readonly maybeSwipeConfig: Option.Option<{
                readonly direction: "Left" | "Right";
                readonly threshold: number;
            }>;
        };
        commands?: Update.Commands<{
            readonly _tag: "Added";
            readonly entry: {
                readonly id: string;
                readonly variant: "Error" | "Info" | "Success" | "Warning";
                readonly animation: {
                    readonly id: string;
                    readonly isShowing: boolean;
                    readonly transitionState: "EnterAnimating" | "EnterStart" | "Idle" | "LeaveAnimating" | "LeaveStart";
                    readonly transitionGeneration: number;
                };
                readonly maybeDuration: Option.Option<Duration.Duration>;
                readonly pendingDismissVersion: number;
                readonly isHovered: boolean;
                readonly swipeState: {
                    readonly _tag: "Idle";
                } | {
                    readonly _tag: "Dismissing";
                    readonly offsetX: number;
                    readonly direction: "Left" | "Right";
                } | {
                    readonly _tag: "Dragging";
                    readonly pointerId: number;
                    readonly startX: number;
                    readonly currentX: number;
                } | {
                    readonly _tag: "Settling";
                    readonly offsetX: number;
                };
                readonly swipeVersion: number;
                readonly payload: A;
            };
        } | {
            readonly _tag: "CancelledSwipe";
            readonly pointerId: number;
        } | {
            readonly _tag: "CompletedWaitBeforeDismissal";
            readonly entryId: string;
            readonly version: number;
        } | {
            readonly _tag: "CompletedWaitForSwipeSettled";
            readonly entryId: string;
            readonly version: number;
        } | {
            readonly _tag: "Dismissed";
            readonly entryId: string;
        } | {
            readonly _tag: "DismissedAll";
        } | {
            readonly _tag: "GotAnimationMessage";
            readonly entryId: string;
            readonly message: {
                readonly _tag: "Hid";
            } | {
                readonly _tag: "Showed";
            } | {
                readonly _tag: "CompletedWaitForPaint";
                readonly generation: number;
            } | {
                readonly _tag: "EndedAnimation";
                readonly generation: number;
            };
        } | {
            readonly _tag: "HoveredEntry";
            readonly entryId: string;
        } | {
            readonly _tag: "LeftEntry";
            readonly entryId: string;
        } | {
            readonly _tag: "MovedSwipePointer";
            readonly pointerId: number;
            readonly clientX: number;
        } | {
            readonly _tag: "PressedEntryPointer";
            readonly entryId: string;
            readonly pointerId: number;
            readonly clientX: number;
        } | {
            readonly _tag: "PressedEscape";
        } | {
            readonly _tag: "ReleasedSwipePointer";
            readonly pointerId: number;
            readonly clientX: number;
        }, never>;
        outMessage?: {
            readonly _tag: "DismissedToast";
            readonly payload: A;
        };
    }>;
    readonly show: (model: {
        readonly id: string;
        readonly defaultDuration: Duration.Duration;
        readonly entries: readonly {
            readonly id: string;
            readonly variant: "Error" | "Info" | "Success" | "Warning";
            readonly animation: {
                readonly id: string;
                readonly isShowing: boolean;
                readonly transitionState: "EnterAnimating" | "EnterStart" | "Idle" | "LeaveAnimating" | "LeaveStart";
                readonly transitionGeneration: number;
            };
            readonly maybeDuration: Option.Option<Duration.Duration>;
            readonly pendingDismissVersion: number;
            readonly isHovered: boolean;
            readonly swipeState: {
                readonly _tag: "Idle";
            } | {
                readonly _tag: "Dismissing";
                readonly offsetX: number;
                readonly direction: "Left" | "Right";
            } | {
                readonly _tag: "Dragging";
                readonly pointerId: number;
                readonly startX: number;
                readonly currentX: number;
            } | {
                readonly _tag: "Settling";
                readonly offsetX: number;
            };
            readonly swipeVersion: number;
            readonly payload: A;
        }[];
        readonly nextEntryKey: number;
        readonly maybeSwipeConfig: Option.Option<{
            readonly direction: "Left" | "Right";
            readonly threshold: number;
        }>;
    }, input: ShowInput<A>) => Readonly<{
        model: {
            readonly id: string;
            readonly defaultDuration: Duration.Duration;
            readonly entries: readonly {
                readonly id: string;
                readonly variant: "Error" | "Info" | "Success" | "Warning";
                readonly animation: {
                    readonly id: string;
                    readonly isShowing: boolean;
                    readonly transitionState: "EnterAnimating" | "EnterStart" | "Idle" | "LeaveAnimating" | "LeaveStart";
                    readonly transitionGeneration: number;
                };
                readonly maybeDuration: Option.Option<Duration.Duration>;
                readonly pendingDismissVersion: number;
                readonly isHovered: boolean;
                readonly swipeState: {
                    readonly _tag: "Idle";
                } | {
                    readonly _tag: "Dismissing";
                    readonly offsetX: number;
                    readonly direction: "Left" | "Right";
                } | {
                    readonly _tag: "Dragging";
                    readonly pointerId: number;
                    readonly startX: number;
                    readonly currentX: number;
                } | {
                    readonly _tag: "Settling";
                    readonly offsetX: number;
                };
                readonly swipeVersion: number;
                readonly payload: A;
            }[];
            readonly nextEntryKey: number;
            readonly maybeSwipeConfig: Option.Option<{
                readonly direction: "Left" | "Right";
                readonly threshold: number;
            }>;
        };
        commands?: Update.Commands<{
            readonly _tag: "Added";
            readonly entry: {
                readonly id: string;
                readonly variant: "Error" | "Info" | "Success" | "Warning";
                readonly animation: {
                    readonly id: string;
                    readonly isShowing: boolean;
                    readonly transitionState: "EnterAnimating" | "EnterStart" | "Idle" | "LeaveAnimating" | "LeaveStart";
                    readonly transitionGeneration: number;
                };
                readonly maybeDuration: Option.Option<Duration.Duration>;
                readonly pendingDismissVersion: number;
                readonly isHovered: boolean;
                readonly swipeState: {
                    readonly _tag: "Idle";
                } | {
                    readonly _tag: "Dismissing";
                    readonly offsetX: number;
                    readonly direction: "Left" | "Right";
                } | {
                    readonly _tag: "Dragging";
                    readonly pointerId: number;
                    readonly startX: number;
                    readonly currentX: number;
                } | {
                    readonly _tag: "Settling";
                    readonly offsetX: number;
                };
                readonly swipeVersion: number;
                readonly payload: A;
            };
        } | {
            readonly _tag: "CancelledSwipe";
            readonly pointerId: number;
        } | {
            readonly _tag: "CompletedWaitBeforeDismissal";
            readonly entryId: string;
            readonly version: number;
        } | {
            readonly _tag: "CompletedWaitForSwipeSettled";
            readonly entryId: string;
            readonly version: number;
        } | {
            readonly _tag: "Dismissed";
            readonly entryId: string;
        } | {
            readonly _tag: "DismissedAll";
        } | {
            readonly _tag: "GotAnimationMessage";
            readonly entryId: string;
            readonly message: {
                readonly _tag: "Hid";
            } | {
                readonly _tag: "Showed";
            } | {
                readonly _tag: "CompletedWaitForPaint";
                readonly generation: number;
            } | {
                readonly _tag: "EndedAnimation";
                readonly generation: number;
            };
        } | {
            readonly _tag: "HoveredEntry";
            readonly entryId: string;
        } | {
            readonly _tag: "LeftEntry";
            readonly entryId: string;
        } | {
            readonly _tag: "MovedSwipePointer";
            readonly pointerId: number;
            readonly clientX: number;
        } | {
            readonly _tag: "PressedEntryPointer";
            readonly entryId: string;
            readonly pointerId: number;
            readonly clientX: number;
        } | {
            readonly _tag: "PressedEscape";
        } | {
            readonly _tag: "ReleasedSwipePointer";
            readonly pointerId: number;
            readonly clientX: number;
        }, never>;
        outMessage?: {
            readonly _tag: "DismissedToast";
            readonly payload: A;
        };
    }>;
    readonly dismiss: (model: {
        readonly id: string;
        readonly defaultDuration: Duration.Duration;
        readonly entries: readonly {
            readonly id: string;
            readonly variant: "Error" | "Info" | "Success" | "Warning";
            readonly animation: {
                readonly id: string;
                readonly isShowing: boolean;
                readonly transitionState: "EnterAnimating" | "EnterStart" | "Idle" | "LeaveAnimating" | "LeaveStart";
                readonly transitionGeneration: number;
            };
            readonly maybeDuration: Option.Option<Duration.Duration>;
            readonly pendingDismissVersion: number;
            readonly isHovered: boolean;
            readonly swipeState: {
                readonly _tag: "Idle";
            } | {
                readonly _tag: "Dismissing";
                readonly offsetX: number;
                readonly direction: "Left" | "Right";
            } | {
                readonly _tag: "Dragging";
                readonly pointerId: number;
                readonly startX: number;
                readonly currentX: number;
            } | {
                readonly _tag: "Settling";
                readonly offsetX: number;
            };
            readonly swipeVersion: number;
            readonly payload: A;
        }[];
        readonly nextEntryKey: number;
        readonly maybeSwipeConfig: Option.Option<{
            readonly direction: "Left" | "Right";
            readonly threshold: number;
        }>;
    }, entryId: string) => Readonly<{
        model: {
            readonly id: string;
            readonly defaultDuration: Duration.Duration;
            readonly entries: readonly {
                readonly id: string;
                readonly variant: "Error" | "Info" | "Success" | "Warning";
                readonly animation: {
                    readonly id: string;
                    readonly isShowing: boolean;
                    readonly transitionState: "EnterAnimating" | "EnterStart" | "Idle" | "LeaveAnimating" | "LeaveStart";
                    readonly transitionGeneration: number;
                };
                readonly maybeDuration: Option.Option<Duration.Duration>;
                readonly pendingDismissVersion: number;
                readonly isHovered: boolean;
                readonly swipeState: {
                    readonly _tag: "Idle";
                } | {
                    readonly _tag: "Dismissing";
                    readonly offsetX: number;
                    readonly direction: "Left" | "Right";
                } | {
                    readonly _tag: "Dragging";
                    readonly pointerId: number;
                    readonly startX: number;
                    readonly currentX: number;
                } | {
                    readonly _tag: "Settling";
                    readonly offsetX: number;
                };
                readonly swipeVersion: number;
                readonly payload: A;
            }[];
            readonly nextEntryKey: number;
            readonly maybeSwipeConfig: Option.Option<{
                readonly direction: "Left" | "Right";
                readonly threshold: number;
            }>;
        };
        commands?: Update.Commands<{
            readonly _tag: "Added";
            readonly entry: {
                readonly id: string;
                readonly variant: "Error" | "Info" | "Success" | "Warning";
                readonly animation: {
                    readonly id: string;
                    readonly isShowing: boolean;
                    readonly transitionState: "EnterAnimating" | "EnterStart" | "Idle" | "LeaveAnimating" | "LeaveStart";
                    readonly transitionGeneration: number;
                };
                readonly maybeDuration: Option.Option<Duration.Duration>;
                readonly pendingDismissVersion: number;
                readonly isHovered: boolean;
                readonly swipeState: {
                    readonly _tag: "Idle";
                } | {
                    readonly _tag: "Dismissing";
                    readonly offsetX: number;
                    readonly direction: "Left" | "Right";
                } | {
                    readonly _tag: "Dragging";
                    readonly pointerId: number;
                    readonly startX: number;
                    readonly currentX: number;
                } | {
                    readonly _tag: "Settling";
                    readonly offsetX: number;
                };
                readonly swipeVersion: number;
                readonly payload: A;
            };
        } | {
            readonly _tag: "CancelledSwipe";
            readonly pointerId: number;
        } | {
            readonly _tag: "CompletedWaitBeforeDismissal";
            readonly entryId: string;
            readonly version: number;
        } | {
            readonly _tag: "CompletedWaitForSwipeSettled";
            readonly entryId: string;
            readonly version: number;
        } | {
            readonly _tag: "Dismissed";
            readonly entryId: string;
        } | {
            readonly _tag: "DismissedAll";
        } | {
            readonly _tag: "GotAnimationMessage";
            readonly entryId: string;
            readonly message: {
                readonly _tag: "Hid";
            } | {
                readonly _tag: "Showed";
            } | {
                readonly _tag: "CompletedWaitForPaint";
                readonly generation: number;
            } | {
                readonly _tag: "EndedAnimation";
                readonly generation: number;
            };
        } | {
            readonly _tag: "HoveredEntry";
            readonly entryId: string;
        } | {
            readonly _tag: "LeftEntry";
            readonly entryId: string;
        } | {
            readonly _tag: "MovedSwipePointer";
            readonly pointerId: number;
            readonly clientX: number;
        } | {
            readonly _tag: "PressedEntryPointer";
            readonly entryId: string;
            readonly pointerId: number;
            readonly clientX: number;
        } | {
            readonly _tag: "PressedEscape";
        } | {
            readonly _tag: "ReleasedSwipePointer";
            readonly pointerId: number;
            readonly clientX: number;
        }, never>;
        outMessage?: {
            readonly _tag: "DismissedToast";
            readonly payload: A;
        };
    }>;
    readonly dismissAll: (model: {
        readonly id: string;
        readonly defaultDuration: Duration.Duration;
        readonly entries: readonly {
            readonly id: string;
            readonly variant: "Error" | "Info" | "Success" | "Warning";
            readonly animation: {
                readonly id: string;
                readonly isShowing: boolean;
                readonly transitionState: "EnterAnimating" | "EnterStart" | "Idle" | "LeaveAnimating" | "LeaveStart";
                readonly transitionGeneration: number;
            };
            readonly maybeDuration: Option.Option<Duration.Duration>;
            readonly pendingDismissVersion: number;
            readonly isHovered: boolean;
            readonly swipeState: {
                readonly _tag: "Idle";
            } | {
                readonly _tag: "Dismissing";
                readonly offsetX: number;
                readonly direction: "Left" | "Right";
            } | {
                readonly _tag: "Dragging";
                readonly pointerId: number;
                readonly startX: number;
                readonly currentX: number;
            } | {
                readonly _tag: "Settling";
                readonly offsetX: number;
            };
            readonly swipeVersion: number;
            readonly payload: A;
        }[];
        readonly nextEntryKey: number;
        readonly maybeSwipeConfig: Option.Option<{
            readonly direction: "Left" | "Right";
            readonly threshold: number;
        }>;
    }) => Readonly<{
        model: {
            readonly id: string;
            readonly defaultDuration: Duration.Duration;
            readonly entries: readonly {
                readonly id: string;
                readonly variant: "Error" | "Info" | "Success" | "Warning";
                readonly animation: {
                    readonly id: string;
                    readonly isShowing: boolean;
                    readonly transitionState: "EnterAnimating" | "EnterStart" | "Idle" | "LeaveAnimating" | "LeaveStart";
                    readonly transitionGeneration: number;
                };
                readonly maybeDuration: Option.Option<Duration.Duration>;
                readonly pendingDismissVersion: number;
                readonly isHovered: boolean;
                readonly swipeState: {
                    readonly _tag: "Idle";
                } | {
                    readonly _tag: "Dismissing";
                    readonly offsetX: number;
                    readonly direction: "Left" | "Right";
                } | {
                    readonly _tag: "Dragging";
                    readonly pointerId: number;
                    readonly startX: number;
                    readonly currentX: number;
                } | {
                    readonly _tag: "Settling";
                    readonly offsetX: number;
                };
                readonly swipeVersion: number;
                readonly payload: A;
            }[];
            readonly nextEntryKey: number;
            readonly maybeSwipeConfig: Option.Option<{
                readonly direction: "Left" | "Right";
                readonly threshold: number;
            }>;
        };
        commands?: Update.Commands<{
            readonly _tag: "Added";
            readonly entry: {
                readonly id: string;
                readonly variant: "Error" | "Info" | "Success" | "Warning";
                readonly animation: {
                    readonly id: string;
                    readonly isShowing: boolean;
                    readonly transitionState: "EnterAnimating" | "EnterStart" | "Idle" | "LeaveAnimating" | "LeaveStart";
                    readonly transitionGeneration: number;
                };
                readonly maybeDuration: Option.Option<Duration.Duration>;
                readonly pendingDismissVersion: number;
                readonly isHovered: boolean;
                readonly swipeState: {
                    readonly _tag: "Idle";
                } | {
                    readonly _tag: "Dismissing";
                    readonly offsetX: number;
                    readonly direction: "Left" | "Right";
                } | {
                    readonly _tag: "Dragging";
                    readonly pointerId: number;
                    readonly startX: number;
                    readonly currentX: number;
                } | {
                    readonly _tag: "Settling";
                    readonly offsetX: number;
                };
                readonly swipeVersion: number;
                readonly payload: A;
            };
        } | {
            readonly _tag: "CancelledSwipe";
            readonly pointerId: number;
        } | {
            readonly _tag: "CompletedWaitBeforeDismissal";
            readonly entryId: string;
            readonly version: number;
        } | {
            readonly _tag: "CompletedWaitForSwipeSettled";
            readonly entryId: string;
            readonly version: number;
        } | {
            readonly _tag: "Dismissed";
            readonly entryId: string;
        } | {
            readonly _tag: "DismissedAll";
        } | {
            readonly _tag: "GotAnimationMessage";
            readonly entryId: string;
            readonly message: {
                readonly _tag: "Hid";
            } | {
                readonly _tag: "Showed";
            } | {
                readonly _tag: "CompletedWaitForPaint";
                readonly generation: number;
            } | {
                readonly _tag: "EndedAnimation";
                readonly generation: number;
            };
        } | {
            readonly _tag: "HoveredEntry";
            readonly entryId: string;
        } | {
            readonly _tag: "LeftEntry";
            readonly entryId: string;
        } | {
            readonly _tag: "MovedSwipePointer";
            readonly pointerId: number;
            readonly clientX: number;
        } | {
            readonly _tag: "PressedEntryPointer";
            readonly entryId: string;
            readonly pointerId: number;
            readonly clientX: number;
        } | {
            readonly _tag: "PressedEscape";
        } | {
            readonly _tag: "ReleasedSwipePointer";
            readonly pointerId: number;
            readonly clientX: number;
        }, never>;
        outMessage?: {
            readonly _tag: "DismissedToast";
            readonly payload: A;
        };
    }>;
    readonly subscriptions: {
        readonly swipePointer: Subscription.EntryWithoutKeepAlive<{
            readonly id: string;
            readonly defaultDuration: Duration.Duration;
            readonly entries: readonly {
                readonly id: string;
                readonly variant: "Error" | "Info" | "Success" | "Warning";
                readonly animation: {
                    readonly id: string;
                    readonly isShowing: boolean;
                    readonly transitionState: "EnterAnimating" | "EnterStart" | "Idle" | "LeaveAnimating" | "LeaveStart";
                    readonly transitionGeneration: number;
                };
                readonly maybeDuration: Option.Option<Duration.Duration>;
                readonly pendingDismissVersion: number;
                readonly isHovered: boolean;
                readonly swipeState: {
                    readonly _tag: "Idle";
                } | {
                    readonly _tag: "Dismissing";
                    readonly offsetX: number;
                    readonly direction: "Left" | "Right";
                } | {
                    readonly _tag: "Dragging";
                    readonly pointerId: number;
                    readonly startX: number;
                    readonly currentX: number;
                } | {
                    readonly _tag: "Settling";
                    readonly offsetX: number;
                };
                readonly swipeVersion: number;
                readonly payload: A;
            }[];
            readonly nextEntryKey: number;
            readonly maybeSwipeConfig: Option.Option<{
                readonly direction: "Left" | "Right";
                readonly threshold: number;
            }>;
        }, {
            readonly _tag: "Added";
            readonly entry: {
                readonly id: string;
                readonly variant: "Error" | "Info" | "Success" | "Warning";
                readonly animation: {
                    readonly id: string;
                    readonly isShowing: boolean;
                    readonly transitionState: "EnterAnimating" | "EnterStart" | "Idle" | "LeaveAnimating" | "LeaveStart";
                    readonly transitionGeneration: number;
                };
                readonly maybeDuration: Option.Option<Duration.Duration>;
                readonly pendingDismissVersion: number;
                readonly isHovered: boolean;
                readonly swipeState: {
                    readonly _tag: "Idle";
                } | {
                    readonly _tag: "Dismissing";
                    readonly offsetX: number;
                    readonly direction: "Left" | "Right";
                } | {
                    readonly _tag: "Dragging";
                    readonly pointerId: number;
                    readonly startX: number;
                    readonly currentX: number;
                } | {
                    readonly _tag: "Settling";
                    readonly offsetX: number;
                };
                readonly swipeVersion: number;
                readonly payload: A;
            };
        } | {
            readonly _tag: "CancelledSwipe";
            readonly pointerId: number;
        } | {
            readonly _tag: "CompletedWaitBeforeDismissal";
            readonly entryId: string;
            readonly version: number;
        } | {
            readonly _tag: "CompletedWaitForSwipeSettled";
            readonly entryId: string;
            readonly version: number;
        } | {
            readonly _tag: "Dismissed";
            readonly entryId: string;
        } | {
            readonly _tag: "DismissedAll";
        } | {
            readonly _tag: "GotAnimationMessage";
            readonly entryId: string;
            readonly message: {
                readonly _tag: "Hid";
            } | {
                readonly _tag: "Showed";
            } | {
                readonly _tag: "CompletedWaitForPaint";
                readonly generation: number;
            } | {
                readonly _tag: "EndedAnimation";
                readonly generation: number;
            };
        } | {
            readonly _tag: "HoveredEntry";
            readonly entryId: string;
        } | {
            readonly _tag: "LeftEntry";
            readonly entryId: string;
        } | {
            readonly _tag: "MovedSwipePointer";
            readonly pointerId: number;
            readonly clientX: number;
        } | {
            readonly _tag: "PressedEntryPointer";
            readonly entryId: string;
            readonly pointerId: number;
            readonly clientX: number;
        } | {
            readonly _tag: "PressedEscape";
        } | {
            readonly _tag: "ReleasedSwipePointer";
            readonly pointerId: number;
            readonly clientX: number;
        }, {
            readonly isSwipeEnabled: boolean;
            readonly isAnyDragging: boolean;
        }, never> & {
            readonly __subscription: never;
        };
        readonly swipeEscape: Subscription.EntryWithoutKeepAlive<{
            readonly id: string;
            readonly defaultDuration: Duration.Duration;
            readonly entries: readonly {
                readonly id: string;
                readonly variant: "Error" | "Info" | "Success" | "Warning";
                readonly animation: {
                    readonly id: string;
                    readonly isShowing: boolean;
                    readonly transitionState: "EnterAnimating" | "EnterStart" | "Idle" | "LeaveAnimating" | "LeaveStart";
                    readonly transitionGeneration: number;
                };
                readonly maybeDuration: Option.Option<Duration.Duration>;
                readonly pendingDismissVersion: number;
                readonly isHovered: boolean;
                readonly swipeState: {
                    readonly _tag: "Idle";
                } | {
                    readonly _tag: "Dismissing";
                    readonly offsetX: number;
                    readonly direction: "Left" | "Right";
                } | {
                    readonly _tag: "Dragging";
                    readonly pointerId: number;
                    readonly startX: number;
                    readonly currentX: number;
                } | {
                    readonly _tag: "Settling";
                    readonly offsetX: number;
                };
                readonly swipeVersion: number;
                readonly payload: A;
            }[];
            readonly nextEntryKey: number;
            readonly maybeSwipeConfig: Option.Option<{
                readonly direction: "Left" | "Right";
                readonly threshold: number;
            }>;
        }, {
            readonly _tag: "Added";
            readonly entry: {
                readonly id: string;
                readonly variant: "Error" | "Info" | "Success" | "Warning";
                readonly animation: {
                    readonly id: string;
                    readonly isShowing: boolean;
                    readonly transitionState: "EnterAnimating" | "EnterStart" | "Idle" | "LeaveAnimating" | "LeaveStart";
                    readonly transitionGeneration: number;
                };
                readonly maybeDuration: Option.Option<Duration.Duration>;
                readonly pendingDismissVersion: number;
                readonly isHovered: boolean;
                readonly swipeState: {
                    readonly _tag: "Idle";
                } | {
                    readonly _tag: "Dismissing";
                    readonly offsetX: number;
                    readonly direction: "Left" | "Right";
                } | {
                    readonly _tag: "Dragging";
                    readonly pointerId: number;
                    readonly startX: number;
                    readonly currentX: number;
                } | {
                    readonly _tag: "Settling";
                    readonly offsetX: number;
                };
                readonly swipeVersion: number;
                readonly payload: A;
            };
        } | {
            readonly _tag: "CancelledSwipe";
            readonly pointerId: number;
        } | {
            readonly _tag: "CompletedWaitBeforeDismissal";
            readonly entryId: string;
            readonly version: number;
        } | {
            readonly _tag: "CompletedWaitForSwipeSettled";
            readonly entryId: string;
            readonly version: number;
        } | {
            readonly _tag: "Dismissed";
            readonly entryId: string;
        } | {
            readonly _tag: "DismissedAll";
        } | {
            readonly _tag: "GotAnimationMessage";
            readonly entryId: string;
            readonly message: {
                readonly _tag: "Hid";
            } | {
                readonly _tag: "Showed";
            } | {
                readonly _tag: "CompletedWaitForPaint";
                readonly generation: number;
            } | {
                readonly _tag: "EndedAnimation";
                readonly generation: number;
            };
        } | {
            readonly _tag: "HoveredEntry";
            readonly entryId: string;
        } | {
            readonly _tag: "LeftEntry";
            readonly entryId: string;
        } | {
            readonly _tag: "MovedSwipePointer";
            readonly pointerId: number;
            readonly clientX: number;
        } | {
            readonly _tag: "PressedEntryPointer";
            readonly entryId: string;
            readonly pointerId: number;
            readonly clientX: number;
        } | {
            readonly _tag: "PressedEscape";
        } | {
            readonly _tag: "ReleasedSwipePointer";
            readonly pointerId: number;
            readonly clientX: number;
        }, {
            readonly isSwipeEnabled: boolean;
            readonly isAnyDragging: boolean;
        }, never> & {
            readonly __subscription: never;
        };
    };
    readonly swipeOffset: typeof swipeOffset;
};
