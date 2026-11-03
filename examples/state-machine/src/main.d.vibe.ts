import { Effect, Option, Schema } from 'effect';
import { Command, Runtime, Update } from 'foldkit';
import { Machine } from 'foldkit/experimental';
import { RadioGroup } from '@foldkit/ui';
export declare const Discount: Schema.Struct<{
    readonly code: Schema.String;
    readonly percentOff: Schema.Number;
}>;
export type Discount = typeof Discount.Type;
export declare const Promo: import("foldkit/schema").TaggedUnion<{
    readonly NoPromo: {};
    readonly AppliedPromo: {
        discount: Schema.Struct<{
            readonly code: Schema.String;
            readonly percentOff: Schema.Number;
        }>;
    };
    readonly RejectedPromo: {};
}>;
export declare const CheckoutState: import("foldkit/schema").TaggedUnion<{
    readonly Cart: {
        isShippingRequired: Schema.Boolean;
    };
    readonly Shipping: {
        isShippingRequired: Schema.Boolean;
    };
    readonly Payment: {
        isPaymentMethodSelected: Schema.Boolean;
        isShippingRequired: Schema.Boolean;
    };
    readonly Review: {
        isPaymentMethodSelected: Schema.Boolean;
        isShippingRequired: Schema.Boolean;
        isTermsAccepted: Schema.Boolean;
        promo: import("foldkit/schema").TaggedUnion<{
            readonly NoPromo: {};
            readonly AppliedPromo: {
                discount: Schema.Struct<{
                    readonly code: Schema.String;
                    readonly percentOff: Schema.Number;
                }>;
            };
            readonly RejectedPromo: {};
        }>;
        promoCodeInput: Schema.String;
    };
    readonly Placing: {
        isShippingRequired: Schema.Boolean;
        maybeDiscount: Schema.Option<Schema.Struct<{
            readonly code: Schema.String;
            readonly percentOff: Schema.Number;
        }>>;
    };
    readonly Confirmed: {
        isShippingRequired: Schema.Boolean;
        maybeDiscount: Schema.Option<Schema.Struct<{
            readonly code: Schema.String;
            readonly percentOff: Schema.Number;
        }>>;
        orderId: Schema.String;
    };
    readonly Cancelled: {
        isShippingRequired: Schema.Boolean;
    };
}>;
export declare const TransitionLogEntry: Schema.Struct<{
    readonly id: Schema.Number;
    readonly summary: Schema.String;
}>;
export type TransitionLogEntry = typeof TransitionLogEntry.Type;
export declare const HARDCOVER_EDITION = "Hardcover";
export declare const EBOOK_EDITION = "E-book";
export declare const EDITIONS: ReadonlyArray<string>;
export declare const editionName: (isShippingRequired: boolean) => string;
export declare const EditionRadioGroup: Readonly<{
    view: import("foldkit/submodel").View<{
        readonly id: string;
        readonly maybeFocusedIndex: Option.Option<number>;
    }, {
        readonly _tag: "CompletedFocusOption";
    } | {
        readonly _tag: "FocusedOption";
        readonly index: number;
    } | {
        readonly _tag: "SelectedOption";
        readonly index: number;
        readonly value: string;
    }, Readonly<{
        options: readonly string[];
        selectedValue: Option.Option<string>;
        ariaLabel: string;
        toView: (render: Readonly<{
            group: readonly Readonly<{
                readonly __childAttribute: true;
                readonly attribute: unknown;
                readonly dispatch: import("../node_modules/foldkit/dist/html/runtimeSingleton").DispatchSync;
                readonly resolveUnmount: (message: unknown) => () => void;
                readonly boundaryMappers: ReadonlyArray<(message: unknown) => unknown>;
                readonly resolveMountDispatch?: import("../node_modules/foldkit/dist/html/runtimeSingleton").MountDispatchResolver;
            }>[];
            options: readonly Readonly<{
                value: string;
                index: number;
                isSelected: boolean;
                isActive: boolean;
                isDisabled: boolean;
                isReadOnly: boolean;
                option: readonly Readonly<{
                    readonly __childAttribute: true;
                    readonly attribute: unknown;
                    readonly dispatch: import("../node_modules/foldkit/dist/html/runtimeSingleton").DispatchSync;
                    readonly resolveUnmount: (message: unknown) => () => void;
                    readonly boundaryMappers: ReadonlyArray<(message: unknown) => unknown>;
                    readonly resolveMountDispatch?: import("../node_modules/foldkit/dist/html/runtimeSingleton").MountDispatchResolver;
                }>[];
                label: readonly Readonly<{
                    readonly __childAttribute: true;
                    readonly attribute: unknown;
                    readonly dispatch: import("../node_modules/foldkit/dist/html/runtimeSingleton").DispatchSync;
                    readonly resolveUnmount: (message: unknown) => () => void;
                    readonly boundaryMappers: ReadonlyArray<(message: unknown) => unknown>;
                    readonly resolveMountDispatch?: import("../node_modules/foldkit/dist/html/runtimeSingleton").MountDispatchResolver;
                }>[];
                description: readonly Readonly<{
                    readonly __childAttribute: true;
                    readonly attribute: unknown;
                    readonly dispatch: import("../node_modules/foldkit/dist/html/runtimeSingleton").DispatchSync;
                    readonly resolveUnmount: (message: unknown) => () => void;
                    readonly boundaryMappers: ReadonlyArray<(message: unknown) => unknown>;
                    readonly resolveMountDispatch?: import("../node_modules/foldkit/dist/html/runtimeSingleton").MountDispatchResolver;
                }>[];
            }>[];
            selectedValue: Option.Option<string>;
            hiddenInput: readonly Readonly<{
                readonly __childAttribute: true;
                readonly attribute: unknown;
                readonly dispatch: import("../node_modules/foldkit/dist/html/runtimeSingleton").DispatchSync;
                readonly resolveUnmount: (message: unknown) => () => void;
                readonly boundaryMappers: ReadonlyArray<(message: unknown) => unknown>;
                readonly resolveMountDispatch?: import("../node_modules/foldkit/dist/html/runtimeSingleton").MountDispatchResolver;
            }>[];
        }>) => import("foldkit/html").Html;
        orientation?: RadioGroup.Orientation;
        isOptionDisabled?: (value: string, index: number) => boolean;
        hasOptionDescription?: (value: string, index: number) => boolean;
        isDisabled?: boolean;
        isReadOnly?: boolean;
        name?: string;
    }>>;
    update: (model: RadioGroup.Model, message: RadioGroup.Message) => Readonly<{
        model: {
            readonly id: string;
            readonly maybeFocusedIndex: Option.Option<number>;
        };
        commands?: Update.Commands<{
            readonly _tag: "CompletedFocusOption";
        } | {
            readonly _tag: "FocusedOption";
            readonly index: number;
        } | {
            readonly _tag: "SelectedOption";
            readonly index: number;
            readonly value: string;
        }, never>;
        outMessage?: Readonly<{
            readonly _tag: 'Selected';
            readonly value: string;
            readonly index: number;
        }>;
    }>;
}>;
export declare const Model: Schema.Struct<{
    readonly checkout: import("foldkit/schema").TaggedUnion<{
        readonly Cart: {
            isShippingRequired: Schema.Boolean;
        };
        readonly Shipping: {
            isShippingRequired: Schema.Boolean;
        };
        readonly Payment: {
            isPaymentMethodSelected: Schema.Boolean;
            isShippingRequired: Schema.Boolean;
        };
        readonly Review: {
            isPaymentMethodSelected: Schema.Boolean;
            isShippingRequired: Schema.Boolean;
            isTermsAccepted: Schema.Boolean;
            promo: import("foldkit/schema").TaggedUnion<{
                readonly NoPromo: {};
                readonly AppliedPromo: {
                    discount: Schema.Struct<{
                        readonly code: Schema.String;
                        readonly percentOff: Schema.Number;
                    }>;
                };
                readonly RejectedPromo: {};
            }>;
            promoCodeInput: Schema.String;
        };
        readonly Placing: {
            isShippingRequired: Schema.Boolean;
            maybeDiscount: Schema.Option<Schema.Struct<{
                readonly code: Schema.String;
                readonly percentOff: Schema.Number;
            }>>;
        };
        readonly Confirmed: {
            isShippingRequired: Schema.Boolean;
            maybeDiscount: Schema.Option<Schema.Struct<{
                readonly code: Schema.String;
                readonly percentOff: Schema.Number;
            }>>;
            orderId: Schema.String;
        };
        readonly Cancelled: {
            isShippingRequired: Schema.Boolean;
        };
    }>;
    readonly editionRadioGroup: Schema.Struct<{
        readonly id: Schema.String;
        readonly maybeFocusedIndex: Schema.Option<Schema.Number>;
    }>;
    readonly transitionLog: Schema.$Array<Schema.Struct<{
        readonly id: Schema.Number;
        readonly summary: Schema.String;
    }>>;
    readonly nextTransitionLogId: Schema.Number;
}>;
export type Model = typeof Model.Type;
export declare const Message: import("foldkit/message").MessageUnion<{
    readonly ClickedContinue: {};
    readonly ClickedBack: {};
    readonly ClickedCancel: {};
    readonly ClickedPlaceOrder: {};
    readonly ClickedStartOver: {};
    readonly ToggledPaymentMethod: {
        isSelected: Schema.Boolean;
    };
    readonly SelectedEdition: {
        isShippingRequired: Schema.Boolean;
    };
    readonly GotEditionRadioGroupMessage: {
        message: import("foldkit/message").MessageUnion<{
            readonly SelectedOption: {
                index: Schema.Number;
                value: Schema.String;
            };
            readonly FocusedOption: {
                index: Schema.Number;
            };
            readonly CompletedFocusOption: {};
        }>;
    };
    readonly ToggledTermsAccepted: {
        isAccepted: Schema.Boolean;
    };
    readonly UpdatedPromoCode: {
        value: Schema.String;
    };
    readonly SubmittedPromoCode: {};
    readonly SucceededPlaceOrder: {
        orderId: Schema.String;
    };
}>;
export type Message = typeof Message.Type;
export declare const PlaceOrder: Command.CommandDefinitionWithArgs<"PlaceOrder", {
    isShippingRequired: Schema.Boolean;
}, Effect.Effect<{
    readonly _tag: "SucceededPlaceOrder";
    readonly orderId: string;
}, never, never>>;
export declare const promoToMaybeDiscount: (promo: typeof Promo.Type) => Option.Option<Discount>;
export declare const isReviewReady: (review: typeof CheckoutState.Review.Type) => boolean;
export declare const reviewToMaybeDiscount: (review: typeof CheckoutState.Review.Type) => Option.Option<Discount>;
export declare const checkoutMachine: Readonly<{
    initial: {
        readonly _tag: "Cancelled";
        readonly isShippingRequired: boolean;
    } | {
        readonly _tag: "Cart";
        readonly isShippingRequired: boolean;
    } | {
        readonly _tag: "Confirmed";
        readonly isShippingRequired: boolean;
        readonly maybeDiscount: Option.Option<{
            readonly code: string;
            readonly percentOff: number;
        }>;
        readonly orderId: string;
    } | {
        readonly _tag: "Payment";
        readonly isPaymentMethodSelected: boolean;
        readonly isShippingRequired: boolean;
    } | {
        readonly _tag: "Placing";
        readonly isShippingRequired: boolean;
        readonly maybeDiscount: Option.Option<{
            readonly code: string;
            readonly percentOff: number;
        }>;
    } | {
        readonly _tag: "Review";
        readonly isPaymentMethodSelected: boolean;
        readonly isShippingRequired: boolean;
        readonly isTermsAccepted: boolean;
        readonly promo: {
            readonly _tag: "NoPromo";
        } | {
            readonly _tag: "RejectedPromo";
        } | {
            readonly _tag: "AppliedPromo";
            readonly discount: {
                readonly code: string;
                readonly percentOff: number;
            };
        };
        readonly promoCodeInput: string;
    } | {
        readonly _tag: "Shipping";
        readonly isShippingRequired: boolean;
    };
    stateTags: readonly ("Cancelled" | "Cart" | "Confirmed" | "Payment" | "Placing" | "Review" | "Shipping")[];
    edges: readonly Readonly<{
        from: "Cancelled" | "Cart" | "Confirmed" | "Payment" | "Placing" | "Review" | "Shipping";
        messageTag: "ClickedBack" | "ClickedCancel" | "ClickedContinue" | "ClickedPlaceOrder" | "ClickedStartOver" | "GotEditionRadioGroupMessage" | "SelectedEdition" | "SubmittedPromoCode" | "SucceededPlaceOrder" | "ToggledPaymentMethod" | "ToggledTermsAccepted" | "UpdatedPromoCode";
        target: "Cancelled" | "Cart" | "Confirmed" | "Payment" | "Placing" | "Review" | "Shipping";
        guard: Machine.EdgeGuard;
    }>[];
    transition: (state: {
        readonly _tag: "Cancelled";
        readonly isShippingRequired: boolean;
    } | {
        readonly _tag: "Cart";
        readonly isShippingRequired: boolean;
    } | {
        readonly _tag: "Confirmed";
        readonly isShippingRequired: boolean;
        readonly maybeDiscount: Option.Option<{
            readonly code: string;
            readonly percentOff: number;
        }>;
        readonly orderId: string;
    } | {
        readonly _tag: "Payment";
        readonly isPaymentMethodSelected: boolean;
        readonly isShippingRequired: boolean;
    } | {
        readonly _tag: "Placing";
        readonly isShippingRequired: boolean;
        readonly maybeDiscount: Option.Option<{
            readonly code: string;
            readonly percentOff: number;
        }>;
    } | {
        readonly _tag: "Review";
        readonly isPaymentMethodSelected: boolean;
        readonly isShippingRequired: boolean;
        readonly isTermsAccepted: boolean;
        readonly promo: {
            readonly _tag: "NoPromo";
        } | {
            readonly _tag: "RejectedPromo";
        } | {
            readonly _tag: "AppliedPromo";
            readonly discount: {
                readonly code: string;
                readonly percentOff: number;
            };
        };
        readonly promoCodeInput: string;
    } | {
        readonly _tag: "Shipping";
        readonly isShippingRequired: boolean;
    }, message: {
        readonly _tag: "ClickedBack";
    } | {
        readonly _tag: "ClickedCancel";
    } | {
        readonly _tag: "ClickedContinue";
    } | {
        readonly _tag: "ClickedPlaceOrder";
    } | {
        readonly _tag: "ClickedStartOver";
    } | {
        readonly _tag: "SubmittedPromoCode";
    } | {
        readonly _tag: "GotEditionRadioGroupMessage";
        readonly message: {
            readonly _tag: "CompletedFocusOption";
        } | {
            readonly _tag: "FocusedOption";
            readonly index: number;
        } | {
            readonly _tag: "SelectedOption";
            readonly index: number;
            readonly value: string;
        };
    } | {
        readonly _tag: "SelectedEdition";
        readonly isShippingRequired: boolean;
    } | {
        readonly _tag: "SucceededPlaceOrder";
        readonly orderId: string;
    } | {
        readonly _tag: "ToggledPaymentMethod";
        readonly isSelected: boolean;
    } | {
        readonly _tag: "ToggledTermsAccepted";
        readonly isAccepted: boolean;
    } | {
        readonly _tag: "UpdatedPromoCode";
        readonly value: string;
    }) => Readonly<{
        model: {
            readonly _tag: "Cancelled";
            readonly isShippingRequired: boolean;
        } | {
            readonly _tag: "Cart";
            readonly isShippingRequired: boolean;
        } | {
            readonly _tag: "Confirmed";
            readonly isShippingRequired: boolean;
            readonly maybeDiscount: Option.Option<{
                readonly code: string;
                readonly percentOff: number;
            }>;
            readonly orderId: string;
        } | {
            readonly _tag: "Payment";
            readonly isPaymentMethodSelected: boolean;
            readonly isShippingRequired: boolean;
        } | {
            readonly _tag: "Placing";
            readonly isShippingRequired: boolean;
            readonly maybeDiscount: Option.Option<{
                readonly code: string;
                readonly percentOff: number;
            }>;
        } | {
            readonly _tag: "Review";
            readonly isPaymentMethodSelected: boolean;
            readonly isShippingRequired: boolean;
            readonly isTermsAccepted: boolean;
            readonly promo: {
                readonly _tag: "NoPromo";
            } | {
                readonly _tag: "RejectedPromo";
            } | {
                readonly _tag: "AppliedPromo";
                readonly discount: {
                    readonly code: string;
                    readonly percentOff: number;
                };
            };
            readonly promoCodeInput: string;
        } | {
            readonly _tag: "Shipping";
            readonly isShippingRequired: boolean;
        };
        commands?: Update.Commands<{
            readonly _tag: "ClickedBack";
        } | {
            readonly _tag: "ClickedCancel";
        } | {
            readonly _tag: "ClickedContinue";
        } | {
            readonly _tag: "ClickedPlaceOrder";
        } | {
            readonly _tag: "ClickedStartOver";
        } | {
            readonly _tag: "SubmittedPromoCode";
        } | {
            readonly _tag: "GotEditionRadioGroupMessage";
            readonly message: {
                readonly _tag: "CompletedFocusOption";
            } | {
                readonly _tag: "FocusedOption";
                readonly index: number;
            } | {
                readonly _tag: "SelectedOption";
                readonly index: number;
                readonly value: string;
            };
        } | {
            readonly _tag: "SelectedEdition";
            readonly isShippingRequired: boolean;
        } | {
            readonly _tag: "SucceededPlaceOrder";
            readonly orderId: string;
        } | {
            readonly _tag: "ToggledPaymentMethod";
            readonly isSelected: boolean;
        } | {
            readonly _tag: "ToggledTermsAccepted";
            readonly isAccepted: boolean;
        } | {
            readonly _tag: "UpdatedPromoCode";
            readonly value: string;
        }, never>;
        outMessage?: never;
    }>;
    step: (state: {
        readonly _tag: "Cancelled";
        readonly isShippingRequired: boolean;
    } | {
        readonly _tag: "Cart";
        readonly isShippingRequired: boolean;
    } | {
        readonly _tag: "Confirmed";
        readonly isShippingRequired: boolean;
        readonly maybeDiscount: Option.Option<{
            readonly code: string;
            readonly percentOff: number;
        }>;
        readonly orderId: string;
    } | {
        readonly _tag: "Payment";
        readonly isPaymentMethodSelected: boolean;
        readonly isShippingRequired: boolean;
    } | {
        readonly _tag: "Placing";
        readonly isShippingRequired: boolean;
        readonly maybeDiscount: Option.Option<{
            readonly code: string;
            readonly percentOff: number;
        }>;
    } | {
        readonly _tag: "Review";
        readonly isPaymentMethodSelected: boolean;
        readonly isShippingRequired: boolean;
        readonly isTermsAccepted: boolean;
        readonly promo: {
            readonly _tag: "NoPromo";
        } | {
            readonly _tag: "RejectedPromo";
        } | {
            readonly _tag: "AppliedPromo";
            readonly discount: {
                readonly code: string;
                readonly percentOff: number;
            };
        };
        readonly promoCodeInput: string;
    } | {
        readonly _tag: "Shipping";
        readonly isShippingRequired: boolean;
    }, message: {
        readonly _tag: "ClickedBack";
    } | {
        readonly _tag: "ClickedCancel";
    } | {
        readonly _tag: "ClickedContinue";
    } | {
        readonly _tag: "ClickedPlaceOrder";
    } | {
        readonly _tag: "ClickedStartOver";
    } | {
        readonly _tag: "SubmittedPromoCode";
    } | {
        readonly _tag: "GotEditionRadioGroupMessage";
        readonly message: {
            readonly _tag: "CompletedFocusOption";
        } | {
            readonly _tag: "FocusedOption";
            readonly index: number;
        } | {
            readonly _tag: "SelectedOption";
            readonly index: number;
            readonly value: string;
        };
    } | {
        readonly _tag: "SelectedEdition";
        readonly isShippingRequired: boolean;
    } | {
        readonly _tag: "SucceededPlaceOrder";
        readonly orderId: string;
    } | {
        readonly _tag: "ToggledPaymentMethod";
        readonly isSelected: boolean;
    } | {
        readonly _tag: "ToggledTermsAccepted";
        readonly isAccepted: boolean;
    } | {
        readonly _tag: "UpdatedPromoCode";
        readonly value: string;
    }) => Machine.TransitionResult<{
        readonly _tag: "Cancelled";
        readonly isShippingRequired: boolean;
    } | {
        readonly _tag: "Cart";
        readonly isShippingRequired: boolean;
    } | {
        readonly _tag: "Confirmed";
        readonly isShippingRequired: boolean;
        readonly maybeDiscount: Option.Option<{
            readonly code: string;
            readonly percentOff: number;
        }>;
        readonly orderId: string;
    } | {
        readonly _tag: "Payment";
        readonly isPaymentMethodSelected: boolean;
        readonly isShippingRequired: boolean;
    } | {
        readonly _tag: "Placing";
        readonly isShippingRequired: boolean;
        readonly maybeDiscount: Option.Option<{
            readonly code: string;
            readonly percentOff: number;
        }>;
    } | {
        readonly _tag: "Review";
        readonly isPaymentMethodSelected: boolean;
        readonly isShippingRequired: boolean;
        readonly isTermsAccepted: boolean;
        readonly promo: {
            readonly _tag: "NoPromo";
        } | {
            readonly _tag: "RejectedPromo";
        } | {
            readonly _tag: "AppliedPromo";
            readonly discount: {
                readonly code: string;
                readonly percentOff: number;
            };
        };
        readonly promoCodeInput: string;
    } | {
        readonly _tag: "Shipping";
        readonly isShippingRequired: boolean;
    }, {
        readonly _tag: "ClickedBack";
    } | {
        readonly _tag: "ClickedCancel";
    } | {
        readonly _tag: "ClickedContinue";
    } | {
        readonly _tag: "ClickedPlaceOrder";
    } | {
        readonly _tag: "ClickedStartOver";
    } | {
        readonly _tag: "SubmittedPromoCode";
    } | {
        readonly _tag: "GotEditionRadioGroupMessage";
        readonly message: {
            readonly _tag: "CompletedFocusOption";
        } | {
            readonly _tag: "FocusedOption";
            readonly index: number;
        } | {
            readonly _tag: "SelectedOption";
            readonly index: number;
            readonly value: string;
        };
    } | {
        readonly _tag: "SelectedEdition";
        readonly isShippingRequired: boolean;
    } | {
        readonly _tag: "SucceededPlaceOrder";
        readonly orderId: string;
    } | {
        readonly _tag: "ToggledPaymentMethod";
        readonly isSelected: boolean;
    } | {
        readonly _tag: "ToggledTermsAccepted";
        readonly isAccepted: boolean;
    } | {
        readonly _tag: "UpdatedPromoCode";
        readonly value: string;
    }, never>;
    reachableFrom: (tag: "Cancelled" | "Cart" | "Confirmed" | "Payment" | "Placing" | "Review" | "Shipping") => ReadonlySet<"Cancelled" | "Cart" | "Confirmed" | "Payment" | "Placing" | "Review" | "Shipping">;
    unreachableStates: (extraRoots?: readonly ("Cancelled" | "Cart" | "Confirmed" | "Payment" | "Placing" | "Review" | "Shipping")[] | undefined) => readonly ("Cancelled" | "Cart" | "Confirmed" | "Payment" | "Placing" | "Review" | "Shipping")[];
    deadTransitions: (extraRoots?: readonly ("Cancelled" | "Cart" | "Confirmed" | "Payment" | "Placing" | "Review" | "Shipping")[] | undefined) => readonly Readonly<{
        edge: Readonly<{
            from: "Cancelled" | "Cart" | "Confirmed" | "Payment" | "Placing" | "Review" | "Shipping";
            messageTag: "ClickedBack" | "ClickedCancel" | "ClickedContinue" | "ClickedPlaceOrder" | "ClickedStartOver" | "GotEditionRadioGroupMessage" | "SelectedEdition" | "SubmittedPromoCode" | "SucceededPlaceOrder" | "ToggledPaymentMethod" | "ToggledTermsAccepted" | "UpdatedPromoCode";
            target: "Cancelled" | "Cart" | "Confirmed" | "Payment" | "Placing" | "Review" | "Shipping";
            guard: Machine.EdgeGuard;
        }>;
        reason: Machine.DeadTransitionReason;
    }>[];
    toMermaid: () => string;
}>;
export declare const initialModel: {
    readonly checkout: {
        readonly _tag: "Cancelled";
        readonly isShippingRequired: boolean;
    } | {
        readonly _tag: "Cart";
        readonly isShippingRequired: boolean;
    } | {
        readonly _tag: "Confirmed";
        readonly isShippingRequired: boolean;
        readonly maybeDiscount: Option.Option<{
            readonly code: string;
            readonly percentOff: number;
        }>;
        readonly orderId: string;
    } | {
        readonly _tag: "Payment";
        readonly isPaymentMethodSelected: boolean;
        readonly isShippingRequired: boolean;
    } | {
        readonly _tag: "Placing";
        readonly isShippingRequired: boolean;
        readonly maybeDiscount: Option.Option<{
            readonly code: string;
            readonly percentOff: number;
        }>;
    } | {
        readonly _tag: "Review";
        readonly isPaymentMethodSelected: boolean;
        readonly isShippingRequired: boolean;
        readonly isTermsAccepted: boolean;
        readonly promo: {
            readonly _tag: "NoPromo";
        } | {
            readonly _tag: "RejectedPromo";
        } | {
            readonly _tag: "AppliedPromo";
            readonly discount: {
                readonly code: string;
                readonly percentOff: number;
            };
        };
        readonly promoCodeInput: string;
    } | {
        readonly _tag: "Shipping";
        readonly isShippingRequired: boolean;
    };
    readonly editionRadioGroup: {
        readonly id: string;
        readonly maybeFocusedIndex: Option.Option<number>;
    };
    readonly transitionLog: readonly {
        readonly id: number;
        readonly summary: string;
    }[];
    readonly nextTransitionLogId: number;
};
export declare const init: Runtime.ApplicationInit<Model, Message>;
type UpdateReturn = Update.Return<Model, Message>;
export declare const TRANSITION_LOG_LIMIT = 20;
export declare const update: (model: Model, message: Message) => UpdateReturn;
export {};
