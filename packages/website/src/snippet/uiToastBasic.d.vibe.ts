import { Option, Schema } from 'effect';
import { Subscription, Update } from 'foldkit';
import { Toast as UiToast } from '@foldkit/ui';
export declare const Toast: {
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
        readonly payload: Schema.Codec<{
            readonly bodyText: string;
            readonly maybeLink: Option.Option<{
                readonly href: string;
                readonly text: string;
            }>;
        }, {
            readonly bodyText: string;
            readonly maybeLink: Option.Option<{
                readonly href: string;
                readonly text: string;
            }>;
        }, never, never>;
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
            readonly payload: Schema.Codec<{
                readonly bodyText: string;
                readonly maybeLink: Option.Option<{
                    readonly href: string;
                    readonly text: string;
                }>;
            }, {
                readonly bodyText: string;
                readonly maybeLink: Option.Option<{
                    readonly href: string;
                    readonly text: string;
                }>;
            }, never, never>;
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
                readonly payload: Schema.Codec<{
                    readonly bodyText: string;
                    readonly maybeLink: Option.Option<{
                        readonly href: string;
                        readonly text: string;
                    }>;
                }, {
                    readonly bodyText: string;
                    readonly maybeLink: Option.Option<{
                        readonly href: string;
                        readonly text: string;
                    }>;
                }, never, never>;
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
            readonly payload: Schema.Codec<{
                readonly bodyText: string;
                readonly maybeLink: Option.Option<{
                    readonly href: string;
                    readonly text: string;
                }>;
            }, {
                readonly bodyText: string;
                readonly maybeLink: Option.Option<{
                    readonly href: string;
                    readonly text: string;
                }>;
            }, never, never>;
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
            readonly payload: Schema.Codec<{
                readonly bodyText: string;
                readonly maybeLink: Option.Option<{
                    readonly href: string;
                    readonly text: string;
                }>;
            }, {
                readonly bodyText: string;
                readonly maybeLink: Option.Option<{
                    readonly href: string;
                    readonly text: string;
                }>;
            }, never, never>;
        }>;
    }>;
    readonly DismissedToast: import("foldkit/schema").CallableTaggedStruct<"DismissedToast", {
        readonly payload: Schema.Codec<{
            readonly bodyText: string;
            readonly maybeLink: Option.Option<{
                readonly href: string;
                readonly text: string;
            }>;
        }, {
            readonly bodyText: string;
            readonly maybeLink: Option.Option<{
                readonly href: string;
                readonly text: string;
            }>;
        }, never, never>;
    }>;
    readonly init: (config: Readonly<{
        id: string;
        defaultDuration?: import("effect/Duration").Input;
        swipeToDismiss?: Readonly<{
            threshold?: number;
            direction?: UiToast.SwipeDirection;
        }>;
    }>) => {
        readonly id: string;
        readonly defaultDuration: import("effect/Duration").Duration;
        readonly entries: readonly {
            readonly id: string;
            readonly variant: "Error" | "Info" | "Success" | "Warning";
            readonly animation: {
                readonly id: string;
                readonly isShowing: boolean;
                readonly transitionState: "EnterAnimating" | "EnterStart" | "Idle" | "LeaveAnimating" | "LeaveStart";
                readonly transitionGeneration: number;
            };
            readonly maybeDuration: Option.Option<import("effect/Duration").Duration>;
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
            readonly payload: {
                readonly bodyText: string;
                readonly maybeLink: Option.Option<{
                    readonly href: string;
                    readonly text: string;
                }>;
            };
        }[];
        readonly nextEntryKey: number;
        readonly maybeSwipeConfig: Option.Option<{
            readonly direction: "Left" | "Right";
            readonly threshold: number;
        }>;
    };
    readonly update: (model: {
        readonly id: string;
        readonly defaultDuration: import("effect/Duration").Duration;
        readonly entries: readonly {
            readonly id: string;
            readonly variant: "Error" | "Info" | "Success" | "Warning";
            readonly animation: {
                readonly id: string;
                readonly isShowing: boolean;
                readonly transitionState: "EnterAnimating" | "EnterStart" | "Idle" | "LeaveAnimating" | "LeaveStart";
                readonly transitionGeneration: number;
            };
            readonly maybeDuration: Option.Option<import("effect/Duration").Duration>;
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
            readonly payload: {
                readonly bodyText: string;
                readonly maybeLink: Option.Option<{
                    readonly href: string;
                    readonly text: string;
                }>;
            };
        }[];
        readonly nextEntryKey: number;
        readonly maybeSwipeConfig: Option.Option<{
            readonly direction: "Left" | "Right";
            readonly threshold: number;
        }>;
    }, message: {
        readonly _tag: "DismissedAll";
    } | {
        readonly _tag: "PressedEscape";
    } | {
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
            readonly maybeDuration: Option.Option<import("effect/Duration").Duration>;
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
            readonly payload: {
                readonly bodyText: string;
                readonly maybeLink: Option.Option<{
                    readonly href: string;
                    readonly text: string;
                }>;
            };
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
        readonly _tag: "ReleasedSwipePointer";
        readonly pointerId: number;
        readonly clientX: number;
    }) => Readonly<{
        model: {
            readonly id: string;
            readonly defaultDuration: import("effect/Duration").Duration;
            readonly entries: readonly {
                readonly id: string;
                readonly variant: "Error" | "Info" | "Success" | "Warning";
                readonly animation: {
                    readonly id: string;
                    readonly isShowing: boolean;
                    readonly transitionState: "EnterAnimating" | "EnterStart" | "Idle" | "LeaveAnimating" | "LeaveStart";
                    readonly transitionGeneration: number;
                };
                readonly maybeDuration: Option.Option<import("effect/Duration").Duration>;
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
                readonly payload: {
                    readonly bodyText: string;
                    readonly maybeLink: Option.Option<{
                        readonly href: string;
                        readonly text: string;
                    }>;
                };
            }[];
            readonly nextEntryKey: number;
            readonly maybeSwipeConfig: Option.Option<{
                readonly direction: "Left" | "Right";
                readonly threshold: number;
            }>;
        };
        commands?: Update.Commands<{
            readonly _tag: "DismissedAll";
        } | {
            readonly _tag: "PressedEscape";
        } | {
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
                readonly maybeDuration: Option.Option<import("effect/Duration").Duration>;
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
                readonly payload: {
                    readonly bodyText: string;
                    readonly maybeLink: Option.Option<{
                        readonly href: string;
                        readonly text: string;
                    }>;
                };
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
            readonly _tag: "ReleasedSwipePointer";
            readonly pointerId: number;
            readonly clientX: number;
        }, never>;
        outMessage?: {
            readonly _tag: "DismissedToast";
            readonly payload: {
                readonly bodyText: string;
                readonly maybeLink: Option.Option<{
                    readonly href: string;
                    readonly text: string;
                }>;
            };
        };
    }>;
    readonly show: (model: {
        readonly id: string;
        readonly defaultDuration: import("effect/Duration").Duration;
        readonly entries: readonly {
            readonly id: string;
            readonly variant: "Error" | "Info" | "Success" | "Warning";
            readonly animation: {
                readonly id: string;
                readonly isShowing: boolean;
                readonly transitionState: "EnterAnimating" | "EnterStart" | "Idle" | "LeaveAnimating" | "LeaveStart";
                readonly transitionGeneration: number;
            };
            readonly maybeDuration: Option.Option<import("effect/Duration").Duration>;
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
            readonly payload: {
                readonly bodyText: string;
                readonly maybeLink: Option.Option<{
                    readonly href: string;
                    readonly text: string;
                }>;
            };
        }[];
        readonly nextEntryKey: number;
        readonly maybeSwipeConfig: Option.Option<{
            readonly direction: "Left" | "Right";
            readonly threshold: number;
        }>;
    }, input: Readonly<{
        payload: {
            readonly bodyText: string;
            readonly maybeLink: Option.Option<{
                readonly href: string;
                readonly text: string;
            }>;
        };
        variant?: UiToast.Variant;
        duration?: import("effect/Duration").Input;
        sticky?: boolean;
    }>) => Readonly<{
        model: {
            readonly id: string;
            readonly defaultDuration: import("effect/Duration").Duration;
            readonly entries: readonly {
                readonly id: string;
                readonly variant: "Error" | "Info" | "Success" | "Warning";
                readonly animation: {
                    readonly id: string;
                    readonly isShowing: boolean;
                    readonly transitionState: "EnterAnimating" | "EnterStart" | "Idle" | "LeaveAnimating" | "LeaveStart";
                    readonly transitionGeneration: number;
                };
                readonly maybeDuration: Option.Option<import("effect/Duration").Duration>;
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
                readonly payload: {
                    readonly bodyText: string;
                    readonly maybeLink: Option.Option<{
                        readonly href: string;
                        readonly text: string;
                    }>;
                };
            }[];
            readonly nextEntryKey: number;
            readonly maybeSwipeConfig: Option.Option<{
                readonly direction: "Left" | "Right";
                readonly threshold: number;
            }>;
        };
        commands?: Update.Commands<{
            readonly _tag: "DismissedAll";
        } | {
            readonly _tag: "PressedEscape";
        } | {
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
                readonly maybeDuration: Option.Option<import("effect/Duration").Duration>;
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
                readonly payload: {
                    readonly bodyText: string;
                    readonly maybeLink: Option.Option<{
                        readonly href: string;
                        readonly text: string;
                    }>;
                };
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
            readonly _tag: "ReleasedSwipePointer";
            readonly pointerId: number;
            readonly clientX: number;
        }, never>;
        outMessage?: {
            readonly _tag: "DismissedToast";
            readonly payload: {
                readonly bodyText: string;
                readonly maybeLink: Option.Option<{
                    readonly href: string;
                    readonly text: string;
                }>;
            };
        };
    }>;
    readonly dismiss: (model: {
        readonly id: string;
        readonly defaultDuration: import("effect/Duration").Duration;
        readonly entries: readonly {
            readonly id: string;
            readonly variant: "Error" | "Info" | "Success" | "Warning";
            readonly animation: {
                readonly id: string;
                readonly isShowing: boolean;
                readonly transitionState: "EnterAnimating" | "EnterStart" | "Idle" | "LeaveAnimating" | "LeaveStart";
                readonly transitionGeneration: number;
            };
            readonly maybeDuration: Option.Option<import("effect/Duration").Duration>;
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
            readonly payload: {
                readonly bodyText: string;
                readonly maybeLink: Option.Option<{
                    readonly href: string;
                    readonly text: string;
                }>;
            };
        }[];
        readonly nextEntryKey: number;
        readonly maybeSwipeConfig: Option.Option<{
            readonly direction: "Left" | "Right";
            readonly threshold: number;
        }>;
    }, entryId: string) => Readonly<{
        model: {
            readonly id: string;
            readonly defaultDuration: import("effect/Duration").Duration;
            readonly entries: readonly {
                readonly id: string;
                readonly variant: "Error" | "Info" | "Success" | "Warning";
                readonly animation: {
                    readonly id: string;
                    readonly isShowing: boolean;
                    readonly transitionState: "EnterAnimating" | "EnterStart" | "Idle" | "LeaveAnimating" | "LeaveStart";
                    readonly transitionGeneration: number;
                };
                readonly maybeDuration: Option.Option<import("effect/Duration").Duration>;
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
                readonly payload: {
                    readonly bodyText: string;
                    readonly maybeLink: Option.Option<{
                        readonly href: string;
                        readonly text: string;
                    }>;
                };
            }[];
            readonly nextEntryKey: number;
            readonly maybeSwipeConfig: Option.Option<{
                readonly direction: "Left" | "Right";
                readonly threshold: number;
            }>;
        };
        commands?: Update.Commands<{
            readonly _tag: "DismissedAll";
        } | {
            readonly _tag: "PressedEscape";
        } | {
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
                readonly maybeDuration: Option.Option<import("effect/Duration").Duration>;
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
                readonly payload: {
                    readonly bodyText: string;
                    readonly maybeLink: Option.Option<{
                        readonly href: string;
                        readonly text: string;
                    }>;
                };
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
            readonly _tag: "ReleasedSwipePointer";
            readonly pointerId: number;
            readonly clientX: number;
        }, never>;
        outMessage?: {
            readonly _tag: "DismissedToast";
            readonly payload: {
                readonly bodyText: string;
                readonly maybeLink: Option.Option<{
                    readonly href: string;
                    readonly text: string;
                }>;
            };
        };
    }>;
    readonly dismissAll: (model: {
        readonly id: string;
        readonly defaultDuration: import("effect/Duration").Duration;
        readonly entries: readonly {
            readonly id: string;
            readonly variant: "Error" | "Info" | "Success" | "Warning";
            readonly animation: {
                readonly id: string;
                readonly isShowing: boolean;
                readonly transitionState: "EnterAnimating" | "EnterStart" | "Idle" | "LeaveAnimating" | "LeaveStart";
                readonly transitionGeneration: number;
            };
            readonly maybeDuration: Option.Option<import("effect/Duration").Duration>;
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
            readonly payload: {
                readonly bodyText: string;
                readonly maybeLink: Option.Option<{
                    readonly href: string;
                    readonly text: string;
                }>;
            };
        }[];
        readonly nextEntryKey: number;
        readonly maybeSwipeConfig: Option.Option<{
            readonly direction: "Left" | "Right";
            readonly threshold: number;
        }>;
    }) => Readonly<{
        model: {
            readonly id: string;
            readonly defaultDuration: import("effect/Duration").Duration;
            readonly entries: readonly {
                readonly id: string;
                readonly variant: "Error" | "Info" | "Success" | "Warning";
                readonly animation: {
                    readonly id: string;
                    readonly isShowing: boolean;
                    readonly transitionState: "EnterAnimating" | "EnterStart" | "Idle" | "LeaveAnimating" | "LeaveStart";
                    readonly transitionGeneration: number;
                };
                readonly maybeDuration: Option.Option<import("effect/Duration").Duration>;
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
                readonly payload: {
                    readonly bodyText: string;
                    readonly maybeLink: Option.Option<{
                        readonly href: string;
                        readonly text: string;
                    }>;
                };
            }[];
            readonly nextEntryKey: number;
            readonly maybeSwipeConfig: Option.Option<{
                readonly direction: "Left" | "Right";
                readonly threshold: number;
            }>;
        };
        commands?: Update.Commands<{
            readonly _tag: "DismissedAll";
        } | {
            readonly _tag: "PressedEscape";
        } | {
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
                readonly maybeDuration: Option.Option<import("effect/Duration").Duration>;
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
                readonly payload: {
                    readonly bodyText: string;
                    readonly maybeLink: Option.Option<{
                        readonly href: string;
                        readonly text: string;
                    }>;
                };
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
            readonly _tag: "ReleasedSwipePointer";
            readonly pointerId: number;
            readonly clientX: number;
        }, never>;
        outMessage?: {
            readonly _tag: "DismissedToast";
            readonly payload: {
                readonly bodyText: string;
                readonly maybeLink: Option.Option<{
                    readonly href: string;
                    readonly text: string;
                }>;
            };
        };
    }>;
    readonly subscriptions: {
        readonly swipePointer: Subscription.EntryWithoutKeepAlive<{
            readonly id: string;
            readonly defaultDuration: import("effect/Duration").Duration;
            readonly entries: readonly {
                readonly id: string;
                readonly variant: "Error" | "Info" | "Success" | "Warning";
                readonly animation: {
                    readonly id: string;
                    readonly isShowing: boolean;
                    readonly transitionState: "EnterAnimating" | "EnterStart" | "Idle" | "LeaveAnimating" | "LeaveStart";
                    readonly transitionGeneration: number;
                };
                readonly maybeDuration: Option.Option<import("effect/Duration").Duration>;
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
                readonly payload: {
                    readonly bodyText: string;
                    readonly maybeLink: Option.Option<{
                        readonly href: string;
                        readonly text: string;
                    }>;
                };
            }[];
            readonly nextEntryKey: number;
            readonly maybeSwipeConfig: Option.Option<{
                readonly direction: "Left" | "Right";
                readonly threshold: number;
            }>;
        }, {
            readonly _tag: "DismissedAll";
        } | {
            readonly _tag: "PressedEscape";
        } | {
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
                readonly maybeDuration: Option.Option<import("effect/Duration").Duration>;
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
                readonly payload: {
                    readonly bodyText: string;
                    readonly maybeLink: Option.Option<{
                        readonly href: string;
                        readonly text: string;
                    }>;
                };
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
            readonly defaultDuration: import("effect/Duration").Duration;
            readonly entries: readonly {
                readonly id: string;
                readonly variant: "Error" | "Info" | "Success" | "Warning";
                readonly animation: {
                    readonly id: string;
                    readonly isShowing: boolean;
                    readonly transitionState: "EnterAnimating" | "EnterStart" | "Idle" | "LeaveAnimating" | "LeaveStart";
                    readonly transitionGeneration: number;
                };
                readonly maybeDuration: Option.Option<import("effect/Duration").Duration>;
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
                readonly payload: {
                    readonly bodyText: string;
                    readonly maybeLink: Option.Option<{
                        readonly href: string;
                        readonly text: string;
                    }>;
                };
            }[];
            readonly nextEntryKey: number;
            readonly maybeSwipeConfig: Option.Option<{
                readonly direction: "Left" | "Right";
                readonly threshold: number;
            }>;
        }, {
            readonly _tag: "DismissedAll";
        } | {
            readonly _tag: "PressedEscape";
        } | {
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
                readonly maybeDuration: Option.Option<import("effect/Duration").Duration>;
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
                readonly payload: {
                    readonly bodyText: string;
                    readonly maybeLink: Option.Option<{
                        readonly href: string;
                        readonly text: string;
                    }>;
                };
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
    readonly swipeOffset: (swipeState: {
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
    }) => number;
    readonly view: import("foldkit/submodel").View<{
        readonly id: string;
        readonly defaultDuration: import("effect/Duration").Duration;
        readonly entries: readonly {
            readonly id: string;
            readonly variant: "Error" | "Info" | "Success" | "Warning";
            readonly animation: {
                readonly id: string;
                readonly isShowing: boolean;
                readonly transitionState: "EnterAnimating" | "EnterStart" | "Idle" | "LeaveAnimating" | "LeaveStart";
                readonly transitionGeneration: number;
            };
            readonly maybeDuration: Option.Option<import("effect/Duration").Duration>;
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
            readonly payload: {
                readonly bodyText: string;
                readonly maybeLink: Option.Option<{
                    readonly href: string;
                    readonly text: string;
                }>;
            };
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
            readonly maybeDuration: Option.Option<import("effect/Duration").Duration>;
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
            readonly payload: {
                readonly bodyText: string;
                readonly maybeLink: Option.Option<{
                    readonly href: string;
                    readonly text: string;
                }>;
            };
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
    }, Readonly<{
        position: UiToast.Position;
        entryToView: (entry: {
            readonly id: string;
            readonly variant: "Error" | "Info" | "Success" | "Warning";
            readonly animation: {
                readonly id: string;
                readonly isShowing: boolean;
                readonly transitionState: "EnterAnimating" | "EnterStart" | "Idle" | "LeaveAnimating" | "LeaveStart";
                readonly transitionGeneration: number;
            };
            readonly maybeDuration: Option.Option<import("effect/Duration").Duration>;
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
            readonly payload: {
                readonly bodyText: string;
                readonly maybeLink: Option.Option<{
                    readonly href: string;
                    readonly text: string;
                }>;
            };
        }, handlers: Readonly<{
            dismiss: ReadonlyArray<import("foldkit/html").ChildAttribute>;
        }>) => import("foldkit/html").Html;
        ariaLabel?: string;
        containerClassName?: string;
        entryClassName?: string;
    }>>;
};
export declare const subscriptions: {
    readonly swipePointer: Subscription.Subscription<{
        readonly toast: {
            readonly id: string;
            readonly defaultDuration: import("effect/Duration").Duration;
            readonly entries: readonly {
                readonly id: string;
                readonly variant: "Error" | "Info" | "Success" | "Warning";
                readonly animation: {
                    readonly id: string;
                    readonly isShowing: boolean;
                    readonly transitionState: "EnterAnimating" | "EnterStart" | "Idle" | "LeaveAnimating" | "LeaveStart";
                    readonly transitionGeneration: number;
                };
                readonly maybeDuration: Option.Option<import("effect/Duration").Duration>;
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
                readonly payload: {
                    readonly bodyText: string;
                    readonly maybeLink: Option.Option<{
                        readonly href: string;
                        readonly text: string;
                    }>;
                };
            }[];
            readonly nextEntryKey: number;
            readonly maybeSwipeConfig: Option.Option<{
                readonly direction: "Left" | "Right";
                readonly threshold: number;
            }>;
        };
        readonly maybeLastDismissedBody: Option.Option<string>;
    }, {
        readonly _tag: "ClickedSave";
    } | {
        readonly _tag: "GotToastMessage";
        readonly message: {
            readonly _tag: "DismissedAll";
        } | {
            readonly _tag: "PressedEscape";
        } | {
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
                readonly maybeDuration: Option.Option<import("effect/Duration").Duration>;
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
                readonly payload: {
                    readonly bodyText: string;
                    readonly maybeLink: Option.Option<{
                        readonly href: string;
                        readonly text: string;
                    }>;
                };
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
            readonly _tag: "ReleasedSwipePointer";
            readonly pointerId: number;
            readonly clientX: number;
        };
    }, Readonly<{
        maybeDependencies: Option.Option<{
            readonly isSwipeEnabled: boolean;
            readonly isAnyDragging: boolean;
        }>;
    }>, never>;
    readonly swipeEscape: Subscription.Subscription<{
        readonly toast: {
            readonly id: string;
            readonly defaultDuration: import("effect/Duration").Duration;
            readonly entries: readonly {
                readonly id: string;
                readonly variant: "Error" | "Info" | "Success" | "Warning";
                readonly animation: {
                    readonly id: string;
                    readonly isShowing: boolean;
                    readonly transitionState: "EnterAnimating" | "EnterStart" | "Idle" | "LeaveAnimating" | "LeaveStart";
                    readonly transitionGeneration: number;
                };
                readonly maybeDuration: Option.Option<import("effect/Duration").Duration>;
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
                readonly payload: {
                    readonly bodyText: string;
                    readonly maybeLink: Option.Option<{
                        readonly href: string;
                        readonly text: string;
                    }>;
                };
            }[];
            readonly nextEntryKey: number;
            readonly maybeSwipeConfig: Option.Option<{
                readonly direction: "Left" | "Right";
                readonly threshold: number;
            }>;
        };
        readonly maybeLastDismissedBody: Option.Option<string>;
    }, {
        readonly _tag: "ClickedSave";
    } | {
        readonly _tag: "GotToastMessage";
        readonly message: {
            readonly _tag: "DismissedAll";
        } | {
            readonly _tag: "PressedEscape";
        } | {
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
                readonly maybeDuration: Option.Option<import("effect/Duration").Duration>;
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
                readonly payload: {
                    readonly bodyText: string;
                    readonly maybeLink: Option.Option<{
                        readonly href: string;
                        readonly text: string;
                    }>;
                };
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
            readonly _tag: "ReleasedSwipePointer";
            readonly pointerId: number;
            readonly clientX: number;
        };
    }, Readonly<{
        maybeDependencies: Option.Option<{
            readonly isSwipeEnabled: boolean;
            readonly isAnyDragging: boolean;
        }>;
    }>, never>;
};
