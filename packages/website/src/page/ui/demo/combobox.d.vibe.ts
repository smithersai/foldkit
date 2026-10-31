import { Option } from "effect";
import { type HtmlBuilder } from 'foldkit/html';
import { Combobox } from '@foldkit/ui';
import type { AnchorConfig } from '@foldkit/ui/combobox';
import { Message } from '../message.vibe';
import type { City } from '../model.vibe';
export declare const CityCombobox: Readonly<{
    view: import("foldkit/submodel").View<{
        readonly id: string;
        readonly isOpen: boolean;
        readonly isAnimated: boolean;
        readonly isModal: boolean;
        readonly nullable: boolean;
        readonly immediate: boolean;
        readonly selectInputOnFocus: boolean;
        readonly animation: {
            readonly id: string;
            readonly isShowing: boolean;
            readonly transitionState: "EnterAnimating" | "EnterStart" | "Idle" | "LeaveAnimating" | "LeaveStart";
            readonly transitionGeneration: number;
        };
        readonly maybeActiveItemIndex: Option.Option<number>;
        readonly activationTrigger: "Keyboard" | "Pointer";
        readonly inputValue: string;
        readonly maybeLastPointerPosition: Option.Option<{
            readonly screenX: number;
            readonly screenY: number;
        }>;
    }, {
        readonly _tag: "CompletedAnchorCombobox";
    } | {
        readonly _tag: "CompletedAttachComboboxPreventBlur";
    } | {
        readonly _tag: "CompletedAttachComboboxSelectOnFocus";
    } | {
        readonly _tag: "CompletedClickItem";
    } | {
        readonly _tag: "CompletedFocusInput";
    } | {
        readonly _tag: "CompletedInertOthers";
    } | {
        readonly _tag: "CompletedLockScroll";
    } | {
        readonly _tag: "CompletedPortalComboboxBackdrop";
    } | {
        readonly _tag: "CompletedRestoreInert";
    } | {
        readonly _tag: "CompletedScrollIntoView";
    } | {
        readonly _tag: "CompletedUnlockScroll";
    } | {
        readonly _tag: "DeactivatedItem";
    } | {
        readonly _tag: "SuppressedEmptyItemNavigation";
    } | {
        readonly _tag: "SuppressedItemCommit";
    } | {
        readonly _tag: "ActivatedItem";
        readonly index: number;
        readonly activationTrigger: "Keyboard" | "Pointer";
        readonly maybeImmediateSelection: Option.Option<{
            readonly item: string;
        }>;
    } | {
        readonly _tag: "BlurredInput";
        readonly restingInputValue: string;
        readonly isClearable: boolean;
    } | {
        readonly _tag: "Closed";
        readonly restingInputValue: string;
        readonly isClearable: boolean;
    } | {
        readonly _tag: "GotAnimationMessage";
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
        readonly _tag: "MovedPointerOverItem";
        readonly index: number;
        readonly screenX: number;
        readonly screenY: number;
    } | {
        readonly _tag: "Opened";
        readonly maybeActiveItemIndex: Option.Option<number>;
    } | {
        readonly _tag: "PressedToggleButton";
        readonly restingInputValue: string;
        readonly isClearable: boolean;
    } | {
        readonly _tag: "RequestedItemClick";
        readonly index: number;
    } | {
        readonly _tag: "SelectedItem";
        readonly item: string;
        readonly displayText: string;
        readonly wasSelected: boolean;
    } | {
        readonly _tag: "UpdatedInputValue";
        readonly value: string;
    }, Combobox.ViewInputs<"Johannesburg" | "Kyiv" | "Oxford" | "Plymouth" | "Quito" | "Wellington" | "Zurich">>;
    update: (model: Combobox.Model, message: Combobox.Message) => Readonly<{
        model: {
            readonly id: string;
            readonly isOpen: boolean;
            readonly isAnimated: boolean;
            readonly isModal: boolean;
            readonly nullable: boolean;
            readonly immediate: boolean;
            readonly selectInputOnFocus: boolean;
            readonly animation: {
                readonly id: string;
                readonly isShowing: boolean;
                readonly transitionState: "EnterAnimating" | "EnterStart" | "Idle" | "LeaveAnimating" | "LeaveStart";
                readonly transitionGeneration: number;
            };
            readonly maybeActiveItemIndex: Option.Option<number>;
            readonly activationTrigger: "Keyboard" | "Pointer";
            readonly inputValue: string;
            readonly maybeLastPointerPosition: Option.Option<{
                readonly screenX: number;
                readonly screenY: number;
            }>;
        };
        commands?: import("foldkit/update").Commands<{
            readonly _tag: "CompletedAnchorCombobox";
        } | {
            readonly _tag: "CompletedAttachComboboxPreventBlur";
        } | {
            readonly _tag: "CompletedAttachComboboxSelectOnFocus";
        } | {
            readonly _tag: "CompletedClickItem";
        } | {
            readonly _tag: "CompletedFocusInput";
        } | {
            readonly _tag: "CompletedInertOthers";
        } | {
            readonly _tag: "CompletedLockScroll";
        } | {
            readonly _tag: "CompletedPortalComboboxBackdrop";
        } | {
            readonly _tag: "CompletedRestoreInert";
        } | {
            readonly _tag: "CompletedScrollIntoView";
        } | {
            readonly _tag: "CompletedUnlockScroll";
        } | {
            readonly _tag: "DeactivatedItem";
        } | {
            readonly _tag: "SuppressedEmptyItemNavigation";
        } | {
            readonly _tag: "SuppressedItemCommit";
        } | {
            readonly _tag: "ActivatedItem";
            readonly index: number;
            readonly activationTrigger: "Keyboard" | "Pointer";
            readonly maybeImmediateSelection: Option.Option<{
                readonly item: string;
            }>;
        } | {
            readonly _tag: "BlurredInput";
            readonly restingInputValue: string;
            readonly isClearable: boolean;
        } | {
            readonly _tag: "Closed";
            readonly restingInputValue: string;
            readonly isClearable: boolean;
        } | {
            readonly _tag: "GotAnimationMessage";
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
            readonly _tag: "MovedPointerOverItem";
            readonly index: number;
            readonly screenX: number;
            readonly screenY: number;
        } | {
            readonly _tag: "Opened";
            readonly maybeActiveItemIndex: Option.Option<number>;
        } | {
            readonly _tag: "PressedToggleButton";
            readonly restingInputValue: string;
            readonly isClearable: boolean;
        } | {
            readonly _tag: "RequestedItemClick";
            readonly index: number;
        } | {
            readonly _tag: "SelectedItem";
            readonly item: string;
            readonly displayText: string;
            readonly wasSelected: boolean;
        } | {
            readonly _tag: "UpdatedInputValue";
            readonly value: string;
        }, never>;
        outMessage?: Combobox.OutMessage<"Johannesburg" | "Kyiv" | "Oxford" | "Plymouth" | "Quito" | "Wellington" | "Zurich">;
    }>;
    selectItem: (model: Combobox.Model, item: "Johannesburg" | "Kyiv" | "Oxford" | "Plymouth" | "Quito" | "Wellington" | "Zurich", displayText: string) => Readonly<{
        model: {
            readonly id: string;
            readonly isOpen: boolean;
            readonly isAnimated: boolean;
            readonly isModal: boolean;
            readonly nullable: boolean;
            readonly immediate: boolean;
            readonly selectInputOnFocus: boolean;
            readonly animation: {
                readonly id: string;
                readonly isShowing: boolean;
                readonly transitionState: "EnterAnimating" | "EnterStart" | "Idle" | "LeaveAnimating" | "LeaveStart";
                readonly transitionGeneration: number;
            };
            readonly maybeActiveItemIndex: Option.Option<number>;
            readonly activationTrigger: "Keyboard" | "Pointer";
            readonly inputValue: string;
            readonly maybeLastPointerPosition: Option.Option<{
                readonly screenX: number;
                readonly screenY: number;
            }>;
        };
        commands?: import("foldkit/update").Commands<{
            readonly _tag: "CompletedAnchorCombobox";
        } | {
            readonly _tag: "CompletedAttachComboboxPreventBlur";
        } | {
            readonly _tag: "CompletedAttachComboboxSelectOnFocus";
        } | {
            readonly _tag: "CompletedClickItem";
        } | {
            readonly _tag: "CompletedFocusInput";
        } | {
            readonly _tag: "CompletedInertOthers";
        } | {
            readonly _tag: "CompletedLockScroll";
        } | {
            readonly _tag: "CompletedPortalComboboxBackdrop";
        } | {
            readonly _tag: "CompletedRestoreInert";
        } | {
            readonly _tag: "CompletedScrollIntoView";
        } | {
            readonly _tag: "CompletedUnlockScroll";
        } | {
            readonly _tag: "DeactivatedItem";
        } | {
            readonly _tag: "SuppressedEmptyItemNavigation";
        } | {
            readonly _tag: "SuppressedItemCommit";
        } | {
            readonly _tag: "ActivatedItem";
            readonly index: number;
            readonly activationTrigger: "Keyboard" | "Pointer";
            readonly maybeImmediateSelection: Option.Option<{
                readonly item: string;
            }>;
        } | {
            readonly _tag: "BlurredInput";
            readonly restingInputValue: string;
            readonly isClearable: boolean;
        } | {
            readonly _tag: "Closed";
            readonly restingInputValue: string;
            readonly isClearable: boolean;
        } | {
            readonly _tag: "GotAnimationMessage";
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
            readonly _tag: "MovedPointerOverItem";
            readonly index: number;
            readonly screenX: number;
            readonly screenY: number;
        } | {
            readonly _tag: "Opened";
            readonly maybeActiveItemIndex: Option.Option<number>;
        } | {
            readonly _tag: "PressedToggleButton";
            readonly restingInputValue: string;
            readonly isClearable: boolean;
        } | {
            readonly _tag: "RequestedItemClick";
            readonly index: number;
        } | {
            readonly _tag: "SelectedItem";
            readonly item: string;
            readonly displayText: string;
            readonly wasSelected: boolean;
        } | {
            readonly _tag: "UpdatedInputValue";
            readonly value: string;
        }, never>;
        outMessage?: Combobox.OutMessage<"Johannesburg" | "Kyiv" | "Oxford" | "Plymouth" | "Quito" | "Wellington" | "Zurich">;
    }>;
    open: (model: Combobox.Model) => Readonly<{
        model: {
            readonly id: string;
            readonly isOpen: boolean;
            readonly isAnimated: boolean;
            readonly isModal: boolean;
            readonly nullable: boolean;
            readonly immediate: boolean;
            readonly selectInputOnFocus: boolean;
            readonly animation: {
                readonly id: string;
                readonly isShowing: boolean;
                readonly transitionState: "EnterAnimating" | "EnterStart" | "Idle" | "LeaveAnimating" | "LeaveStart";
                readonly transitionGeneration: number;
            };
            readonly maybeActiveItemIndex: Option.Option<number>;
            readonly activationTrigger: "Keyboard" | "Pointer";
            readonly inputValue: string;
            readonly maybeLastPointerPosition: Option.Option<{
                readonly screenX: number;
                readonly screenY: number;
            }>;
        };
        commands?: import("foldkit/update").Commands<{
            readonly _tag: "CompletedAnchorCombobox";
        } | {
            readonly _tag: "CompletedAttachComboboxPreventBlur";
        } | {
            readonly _tag: "CompletedAttachComboboxSelectOnFocus";
        } | {
            readonly _tag: "CompletedClickItem";
        } | {
            readonly _tag: "CompletedFocusInput";
        } | {
            readonly _tag: "CompletedInertOthers";
        } | {
            readonly _tag: "CompletedLockScroll";
        } | {
            readonly _tag: "CompletedPortalComboboxBackdrop";
        } | {
            readonly _tag: "CompletedRestoreInert";
        } | {
            readonly _tag: "CompletedScrollIntoView";
        } | {
            readonly _tag: "CompletedUnlockScroll";
        } | {
            readonly _tag: "DeactivatedItem";
        } | {
            readonly _tag: "SuppressedEmptyItemNavigation";
        } | {
            readonly _tag: "SuppressedItemCommit";
        } | {
            readonly _tag: "ActivatedItem";
            readonly index: number;
            readonly activationTrigger: "Keyboard" | "Pointer";
            readonly maybeImmediateSelection: Option.Option<{
                readonly item: string;
            }>;
        } | {
            readonly _tag: "BlurredInput";
            readonly restingInputValue: string;
            readonly isClearable: boolean;
        } | {
            readonly _tag: "Closed";
            readonly restingInputValue: string;
            readonly isClearable: boolean;
        } | {
            readonly _tag: "GotAnimationMessage";
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
            readonly _tag: "MovedPointerOverItem";
            readonly index: number;
            readonly screenX: number;
            readonly screenY: number;
        } | {
            readonly _tag: "Opened";
            readonly maybeActiveItemIndex: Option.Option<number>;
        } | {
            readonly _tag: "PressedToggleButton";
            readonly restingInputValue: string;
            readonly isClearable: boolean;
        } | {
            readonly _tag: "RequestedItemClick";
            readonly index: number;
        } | {
            readonly _tag: "SelectedItem";
            readonly item: string;
            readonly displayText: string;
            readonly wasSelected: boolean;
        } | {
            readonly _tag: "UpdatedInputValue";
            readonly value: string;
        }, never>;
        outMessage?: Combobox.OutMessage<"Johannesburg" | "Kyiv" | "Oxford" | "Plymouth" | "Quito" | "Wellington" | "Zurich">;
    }>;
    close: (model: Combobox.Model, restingInputValue: string) => Readonly<{
        model: {
            readonly id: string;
            readonly isOpen: boolean;
            readonly isAnimated: boolean;
            readonly isModal: boolean;
            readonly nullable: boolean;
            readonly immediate: boolean;
            readonly selectInputOnFocus: boolean;
            readonly animation: {
                readonly id: string;
                readonly isShowing: boolean;
                readonly transitionState: "EnterAnimating" | "EnterStart" | "Idle" | "LeaveAnimating" | "LeaveStart";
                readonly transitionGeneration: number;
            };
            readonly maybeActiveItemIndex: Option.Option<number>;
            readonly activationTrigger: "Keyboard" | "Pointer";
            readonly inputValue: string;
            readonly maybeLastPointerPosition: Option.Option<{
                readonly screenX: number;
                readonly screenY: number;
            }>;
        };
        commands?: import("foldkit/update").Commands<{
            readonly _tag: "CompletedAnchorCombobox";
        } | {
            readonly _tag: "CompletedAttachComboboxPreventBlur";
        } | {
            readonly _tag: "CompletedAttachComboboxSelectOnFocus";
        } | {
            readonly _tag: "CompletedClickItem";
        } | {
            readonly _tag: "CompletedFocusInput";
        } | {
            readonly _tag: "CompletedInertOthers";
        } | {
            readonly _tag: "CompletedLockScroll";
        } | {
            readonly _tag: "CompletedPortalComboboxBackdrop";
        } | {
            readonly _tag: "CompletedRestoreInert";
        } | {
            readonly _tag: "CompletedScrollIntoView";
        } | {
            readonly _tag: "CompletedUnlockScroll";
        } | {
            readonly _tag: "DeactivatedItem";
        } | {
            readonly _tag: "SuppressedEmptyItemNavigation";
        } | {
            readonly _tag: "SuppressedItemCommit";
        } | {
            readonly _tag: "ActivatedItem";
            readonly index: number;
            readonly activationTrigger: "Keyboard" | "Pointer";
            readonly maybeImmediateSelection: Option.Option<{
                readonly item: string;
            }>;
        } | {
            readonly _tag: "BlurredInput";
            readonly restingInputValue: string;
            readonly isClearable: boolean;
        } | {
            readonly _tag: "Closed";
            readonly restingInputValue: string;
            readonly isClearable: boolean;
        } | {
            readonly _tag: "GotAnimationMessage";
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
            readonly _tag: "MovedPointerOverItem";
            readonly index: number;
            readonly screenX: number;
            readonly screenY: number;
        } | {
            readonly _tag: "Opened";
            readonly maybeActiveItemIndex: Option.Option<number>;
        } | {
            readonly _tag: "PressedToggleButton";
            readonly restingInputValue: string;
            readonly isClearable: boolean;
        } | {
            readonly _tag: "RequestedItemClick";
            readonly index: number;
        } | {
            readonly _tag: "SelectedItem";
            readonly item: string;
            readonly displayText: string;
            readonly wasSelected: boolean;
        } | {
            readonly _tag: "UpdatedInputValue";
            readonly value: string;
        }, never>;
        outMessage?: Combobox.OutMessage<"Johannesburg" | "Kyiv" | "Oxford" | "Plymouth" | "Quito" | "Wellington" | "Zurich">;
    }>;
}>;
export declare const CityMultiCombobox: Readonly<{
    view: import("foldkit/submodel").View<{
        readonly id: string;
        readonly isOpen: boolean;
        readonly isAnimated: boolean;
        readonly isModal: boolean;
        readonly nullable: boolean;
        readonly immediate: boolean;
        readonly selectInputOnFocus: boolean;
        readonly animation: {
            readonly id: string;
            readonly isShowing: boolean;
            readonly transitionState: "EnterAnimating" | "EnterStart" | "Idle" | "LeaveAnimating" | "LeaveStart";
            readonly transitionGeneration: number;
        };
        readonly maybeActiveItemIndex: Option.Option<number>;
        readonly activationTrigger: "Keyboard" | "Pointer";
        readonly inputValue: string;
        readonly maybeLastPointerPosition: Option.Option<{
            readonly screenX: number;
            readonly screenY: number;
        }>;
    }, {
        readonly _tag: "CompletedAnchorCombobox";
    } | {
        readonly _tag: "CompletedAttachComboboxPreventBlur";
    } | {
        readonly _tag: "CompletedAttachComboboxSelectOnFocus";
    } | {
        readonly _tag: "CompletedClickItem";
    } | {
        readonly _tag: "CompletedFocusInput";
    } | {
        readonly _tag: "CompletedInertOthers";
    } | {
        readonly _tag: "CompletedLockScroll";
    } | {
        readonly _tag: "CompletedPortalComboboxBackdrop";
    } | {
        readonly _tag: "CompletedRestoreInert";
    } | {
        readonly _tag: "CompletedScrollIntoView";
    } | {
        readonly _tag: "CompletedUnlockScroll";
    } | {
        readonly _tag: "DeactivatedItem";
    } | {
        readonly _tag: "SuppressedEmptyItemNavigation";
    } | {
        readonly _tag: "SuppressedItemCommit";
    } | {
        readonly _tag: "ActivatedItem";
        readonly index: number;
        readonly activationTrigger: "Keyboard" | "Pointer";
        readonly maybeImmediateSelection: Option.Option<{
            readonly item: string;
        }>;
    } | {
        readonly _tag: "BlurredInput";
        readonly restingInputValue: string;
        readonly isClearable: boolean;
    } | {
        readonly _tag: "Closed";
        readonly restingInputValue: string;
        readonly isClearable: boolean;
    } | {
        readonly _tag: "GotAnimationMessage";
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
        readonly _tag: "MovedPointerOverItem";
        readonly index: number;
        readonly screenX: number;
        readonly screenY: number;
    } | {
        readonly _tag: "Opened";
        readonly maybeActiveItemIndex: Option.Option<number>;
    } | {
        readonly _tag: "PressedToggleButton";
        readonly restingInputValue: string;
        readonly isClearable: boolean;
    } | {
        readonly _tag: "RequestedItemClick";
        readonly index: number;
    } | {
        readonly _tag: "SelectedItem";
        readonly item: string;
        readonly displayText: string;
        readonly wasSelected: boolean;
    } | {
        readonly _tag: "UpdatedInputValue";
        readonly value: string;
    }, Combobox.Multi.ViewInputs<"Johannesburg" | "Kyiv" | "Oxford" | "Plymouth" | "Quito" | "Wellington" | "Zurich">>;
    update: (model: Combobox.Multi.Model, message: Combobox.Message) => Readonly<{
        model: {
            readonly id: string;
            readonly isOpen: boolean;
            readonly isAnimated: boolean;
            readonly isModal: boolean;
            readonly nullable: boolean;
            readonly immediate: boolean;
            readonly selectInputOnFocus: boolean;
            readonly animation: {
                readonly id: string;
                readonly isShowing: boolean;
                readonly transitionState: "EnterAnimating" | "EnterStart" | "Idle" | "LeaveAnimating" | "LeaveStart";
                readonly transitionGeneration: number;
            };
            readonly maybeActiveItemIndex: Option.Option<number>;
            readonly activationTrigger: "Keyboard" | "Pointer";
            readonly inputValue: string;
            readonly maybeLastPointerPosition: Option.Option<{
                readonly screenX: number;
                readonly screenY: number;
            }>;
        };
        commands?: import("foldkit/update").Commands<{
            readonly _tag: "CompletedAnchorCombobox";
        } | {
            readonly _tag: "CompletedAttachComboboxPreventBlur";
        } | {
            readonly _tag: "CompletedAttachComboboxSelectOnFocus";
        } | {
            readonly _tag: "CompletedClickItem";
        } | {
            readonly _tag: "CompletedFocusInput";
        } | {
            readonly _tag: "CompletedInertOthers";
        } | {
            readonly _tag: "CompletedLockScroll";
        } | {
            readonly _tag: "CompletedPortalComboboxBackdrop";
        } | {
            readonly _tag: "CompletedRestoreInert";
        } | {
            readonly _tag: "CompletedScrollIntoView";
        } | {
            readonly _tag: "CompletedUnlockScroll";
        } | {
            readonly _tag: "DeactivatedItem";
        } | {
            readonly _tag: "SuppressedEmptyItemNavigation";
        } | {
            readonly _tag: "SuppressedItemCommit";
        } | {
            readonly _tag: "ActivatedItem";
            readonly index: number;
            readonly activationTrigger: "Keyboard" | "Pointer";
            readonly maybeImmediateSelection: Option.Option<{
                readonly item: string;
            }>;
        } | {
            readonly _tag: "BlurredInput";
            readonly restingInputValue: string;
            readonly isClearable: boolean;
        } | {
            readonly _tag: "Closed";
            readonly restingInputValue: string;
            readonly isClearable: boolean;
        } | {
            readonly _tag: "GotAnimationMessage";
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
            readonly _tag: "MovedPointerOverItem";
            readonly index: number;
            readonly screenX: number;
            readonly screenY: number;
        } | {
            readonly _tag: "Opened";
            readonly maybeActiveItemIndex: Option.Option<number>;
        } | {
            readonly _tag: "PressedToggleButton";
            readonly restingInputValue: string;
            readonly isClearable: boolean;
        } | {
            readonly _tag: "RequestedItemClick";
            readonly index: number;
        } | {
            readonly _tag: "SelectedItem";
            readonly item: string;
            readonly displayText: string;
            readonly wasSelected: boolean;
        } | {
            readonly _tag: "UpdatedInputValue";
            readonly value: string;
        }, never>;
        outMessage?: Combobox.OutMessage<"Johannesburg" | "Kyiv" | "Oxford" | "Plymouth" | "Quito" | "Wellington" | "Zurich">;
    }>;
    selectItem: (model: Combobox.Multi.Model, item: "Johannesburg" | "Kyiv" | "Oxford" | "Plymouth" | "Quito" | "Wellington" | "Zurich") => Readonly<{
        model: {
            readonly id: string;
            readonly isOpen: boolean;
            readonly isAnimated: boolean;
            readonly isModal: boolean;
            readonly nullable: boolean;
            readonly immediate: boolean;
            readonly selectInputOnFocus: boolean;
            readonly animation: {
                readonly id: string;
                readonly isShowing: boolean;
                readonly transitionState: "EnterAnimating" | "EnterStart" | "Idle" | "LeaveAnimating" | "LeaveStart";
                readonly transitionGeneration: number;
            };
            readonly maybeActiveItemIndex: Option.Option<number>;
            readonly activationTrigger: "Keyboard" | "Pointer";
            readonly inputValue: string;
            readonly maybeLastPointerPosition: Option.Option<{
                readonly screenX: number;
                readonly screenY: number;
            }>;
        };
        commands?: import("foldkit/update").Commands<{
            readonly _tag: "CompletedAnchorCombobox";
        } | {
            readonly _tag: "CompletedAttachComboboxPreventBlur";
        } | {
            readonly _tag: "CompletedAttachComboboxSelectOnFocus";
        } | {
            readonly _tag: "CompletedClickItem";
        } | {
            readonly _tag: "CompletedFocusInput";
        } | {
            readonly _tag: "CompletedInertOthers";
        } | {
            readonly _tag: "CompletedLockScroll";
        } | {
            readonly _tag: "CompletedPortalComboboxBackdrop";
        } | {
            readonly _tag: "CompletedRestoreInert";
        } | {
            readonly _tag: "CompletedScrollIntoView";
        } | {
            readonly _tag: "CompletedUnlockScroll";
        } | {
            readonly _tag: "DeactivatedItem";
        } | {
            readonly _tag: "SuppressedEmptyItemNavigation";
        } | {
            readonly _tag: "SuppressedItemCommit";
        } | {
            readonly _tag: "ActivatedItem";
            readonly index: number;
            readonly activationTrigger: "Keyboard" | "Pointer";
            readonly maybeImmediateSelection: Option.Option<{
                readonly item: string;
            }>;
        } | {
            readonly _tag: "BlurredInput";
            readonly restingInputValue: string;
            readonly isClearable: boolean;
        } | {
            readonly _tag: "Closed";
            readonly restingInputValue: string;
            readonly isClearable: boolean;
        } | {
            readonly _tag: "GotAnimationMessage";
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
            readonly _tag: "MovedPointerOverItem";
            readonly index: number;
            readonly screenX: number;
            readonly screenY: number;
        } | {
            readonly _tag: "Opened";
            readonly maybeActiveItemIndex: Option.Option<number>;
        } | {
            readonly _tag: "PressedToggleButton";
            readonly restingInputValue: string;
            readonly isClearable: boolean;
        } | {
            readonly _tag: "RequestedItemClick";
            readonly index: number;
        } | {
            readonly _tag: "SelectedItem";
            readonly item: string;
            readonly displayText: string;
            readonly wasSelected: boolean;
        } | {
            readonly _tag: "UpdatedInputValue";
            readonly value: string;
        }, never>;
        outMessage?: Combobox.OutMessage<"Johannesburg" | "Kyiv" | "Oxford" | "Plymouth" | "Quito" | "Wellington" | "Zurich">;
    }>;
    open: (model: Combobox.Multi.Model) => Readonly<{
        model: {
            readonly id: string;
            readonly isOpen: boolean;
            readonly isAnimated: boolean;
            readonly isModal: boolean;
            readonly nullable: boolean;
            readonly immediate: boolean;
            readonly selectInputOnFocus: boolean;
            readonly animation: {
                readonly id: string;
                readonly isShowing: boolean;
                readonly transitionState: "EnterAnimating" | "EnterStart" | "Idle" | "LeaveAnimating" | "LeaveStart";
                readonly transitionGeneration: number;
            };
            readonly maybeActiveItemIndex: Option.Option<number>;
            readonly activationTrigger: "Keyboard" | "Pointer";
            readonly inputValue: string;
            readonly maybeLastPointerPosition: Option.Option<{
                readonly screenX: number;
                readonly screenY: number;
            }>;
        };
        commands?: import("foldkit/update").Commands<{
            readonly _tag: "CompletedAnchorCombobox";
        } | {
            readonly _tag: "CompletedAttachComboboxPreventBlur";
        } | {
            readonly _tag: "CompletedAttachComboboxSelectOnFocus";
        } | {
            readonly _tag: "CompletedClickItem";
        } | {
            readonly _tag: "CompletedFocusInput";
        } | {
            readonly _tag: "CompletedInertOthers";
        } | {
            readonly _tag: "CompletedLockScroll";
        } | {
            readonly _tag: "CompletedPortalComboboxBackdrop";
        } | {
            readonly _tag: "CompletedRestoreInert";
        } | {
            readonly _tag: "CompletedScrollIntoView";
        } | {
            readonly _tag: "CompletedUnlockScroll";
        } | {
            readonly _tag: "DeactivatedItem";
        } | {
            readonly _tag: "SuppressedEmptyItemNavigation";
        } | {
            readonly _tag: "SuppressedItemCommit";
        } | {
            readonly _tag: "ActivatedItem";
            readonly index: number;
            readonly activationTrigger: "Keyboard" | "Pointer";
            readonly maybeImmediateSelection: Option.Option<{
                readonly item: string;
            }>;
        } | {
            readonly _tag: "BlurredInput";
            readonly restingInputValue: string;
            readonly isClearable: boolean;
        } | {
            readonly _tag: "Closed";
            readonly restingInputValue: string;
            readonly isClearable: boolean;
        } | {
            readonly _tag: "GotAnimationMessage";
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
            readonly _tag: "MovedPointerOverItem";
            readonly index: number;
            readonly screenX: number;
            readonly screenY: number;
        } | {
            readonly _tag: "Opened";
            readonly maybeActiveItemIndex: Option.Option<number>;
        } | {
            readonly _tag: "PressedToggleButton";
            readonly restingInputValue: string;
            readonly isClearable: boolean;
        } | {
            readonly _tag: "RequestedItemClick";
            readonly index: number;
        } | {
            readonly _tag: "SelectedItem";
            readonly item: string;
            readonly displayText: string;
            readonly wasSelected: boolean;
        } | {
            readonly _tag: "UpdatedInputValue";
            readonly value: string;
        }, never>;
        outMessage?: Combobox.OutMessage<"Johannesburg" | "Kyiv" | "Oxford" | "Plymouth" | "Quito" | "Wellington" | "Zurich">;
    }>;
    close: (model: Combobox.Multi.Model) => Readonly<{
        model: {
            readonly id: string;
            readonly isOpen: boolean;
            readonly isAnimated: boolean;
            readonly isModal: boolean;
            readonly nullable: boolean;
            readonly immediate: boolean;
            readonly selectInputOnFocus: boolean;
            readonly animation: {
                readonly id: string;
                readonly isShowing: boolean;
                readonly transitionState: "EnterAnimating" | "EnterStart" | "Idle" | "LeaveAnimating" | "LeaveStart";
                readonly transitionGeneration: number;
            };
            readonly maybeActiveItemIndex: Option.Option<number>;
            readonly activationTrigger: "Keyboard" | "Pointer";
            readonly inputValue: string;
            readonly maybeLastPointerPosition: Option.Option<{
                readonly screenX: number;
                readonly screenY: number;
            }>;
        };
        commands?: import("foldkit/update").Commands<{
            readonly _tag: "CompletedAnchorCombobox";
        } | {
            readonly _tag: "CompletedAttachComboboxPreventBlur";
        } | {
            readonly _tag: "CompletedAttachComboboxSelectOnFocus";
        } | {
            readonly _tag: "CompletedClickItem";
        } | {
            readonly _tag: "CompletedFocusInput";
        } | {
            readonly _tag: "CompletedInertOthers";
        } | {
            readonly _tag: "CompletedLockScroll";
        } | {
            readonly _tag: "CompletedPortalComboboxBackdrop";
        } | {
            readonly _tag: "CompletedRestoreInert";
        } | {
            readonly _tag: "CompletedScrollIntoView";
        } | {
            readonly _tag: "CompletedUnlockScroll";
        } | {
            readonly _tag: "DeactivatedItem";
        } | {
            readonly _tag: "SuppressedEmptyItemNavigation";
        } | {
            readonly _tag: "SuppressedItemCommit";
        } | {
            readonly _tag: "ActivatedItem";
            readonly index: number;
            readonly activationTrigger: "Keyboard" | "Pointer";
            readonly maybeImmediateSelection: Option.Option<{
                readonly item: string;
            }>;
        } | {
            readonly _tag: "BlurredInput";
            readonly restingInputValue: string;
            readonly isClearable: boolean;
        } | {
            readonly _tag: "Closed";
            readonly restingInputValue: string;
            readonly isClearable: boolean;
        } | {
            readonly _tag: "GotAnimationMessage";
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
            readonly _tag: "MovedPointerOverItem";
            readonly index: number;
            readonly screenX: number;
            readonly screenY: number;
        } | {
            readonly _tag: "Opened";
            readonly maybeActiveItemIndex: Option.Option<number>;
        } | {
            readonly _tag: "PressedToggleButton";
            readonly restingInputValue: string;
            readonly isClearable: boolean;
        } | {
            readonly _tag: "RequestedItemClick";
            readonly index: number;
        } | {
            readonly _tag: "SelectedItem";
            readonly item: string;
            readonly displayText: string;
            readonly wasSelected: boolean;
        } | {
            readonly _tag: "UpdatedInputValue";
            readonly value: string;
        }, never>;
        outMessage?: Combobox.OutMessage<"Johannesburg" | "Kyiv" | "Oxford" | "Plymouth" | "Quito" | "Wellington" | "Zurich">;
    }>;
}>;
export declare const comboboxViewInputs: ({ inputValue, restingInputValue, anchor, wrapperClass, }: Readonly<{
    inputValue: string;
    restingInputValue: string;
    anchor?: AnchorConfig;
    wrapperClass?: string;
}>) => Omit<Combobox.ViewInputs<City>, 'maybeSelectedValue'>;
export declare const view: (comboboxModel: Combobox.Model, maybeSelectedCity: Option.Option<City>, h: HtmlBuilder<Message>) => import("foldkit/html").Html[];
export declare const nullableDemo: (comboboxNullableModel: Combobox.Model, maybeSelectedCity: Option.Option<City>, h: HtmlBuilder<Message>) => import("foldkit/html").Html[];
export declare const selectOnFocusDemo: (comboboxSelectOnFocusModel: Combobox.Model, maybeSelectedCity: Option.Option<City>, h: HtmlBuilder<Message>) => import("foldkit/html").Html[];
export declare const placementLockDemo: (comboboxPlacementLockModel: Combobox.Model, maybeSelectedCity: Option.Option<City>, h: HtmlBuilder<Message>) => import("foldkit/html").Html[];
export declare const multiDemo: (comboboxMultiModel: Combobox.Multi.Model, selectedCities: ReadonlyArray<City>, h: HtmlBuilder<Message>) => import("foldkit/html").Html[];
