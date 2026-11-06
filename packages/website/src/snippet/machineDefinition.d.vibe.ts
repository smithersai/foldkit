import { Schema } from 'effect';
import { Machine } from 'foldkit/experimental';
export declare const CheckoutState: import("foldkit/schema").TaggedUnion<{
    readonly Cart: {
        isShippingRequired: Schema.Boolean;
    };
    readonly Shipping: {};
    readonly Payment: {
        isShippingRequired: Schema.Boolean;
    };
    readonly Review: {
        isShippingRequired: Schema.Boolean;
    };
    readonly Cancelled: {};
}>;
export type CheckoutState = typeof CheckoutState.Type;
export declare const Message: import("foldkit/message").MessageUnion<{
    readonly SelectedEdition: {
        isShippingRequired: Schema.Boolean;
    };
    readonly ClickedContinue: {};
    readonly ClickedBack: {};
    readonly ClickedCancel: {};
    readonly ToggledHelp: {
        isOpen: Schema.Boolean;
    };
}>;
export type Message = typeof Message.Type;
export declare const checkoutMachine: Readonly<{
    initial: {
        readonly _tag: "Cancelled";
    } | {
        readonly _tag: "Shipping";
    } | {
        readonly _tag: "Cart";
        readonly isShippingRequired: boolean;
    } | {
        readonly _tag: "Payment";
        readonly isShippingRequired: boolean;
    } | {
        readonly _tag: "Review";
        readonly isShippingRequired: boolean;
    };
    stateTags: readonly ("Cancelled" | "Cart" | "Payment" | "Review" | "Shipping")[];
    edges: readonly Readonly<{
        from: "Cancelled" | "Cart" | "Payment" | "Review" | "Shipping";
        messageTag: "ClickedBack" | "ClickedCancel" | "ClickedContinue" | "SelectedEdition" | "ToggledHelp";
        target: "Cancelled" | "Cart" | "Payment" | "Review" | "Shipping";
        guard: Machine.EdgeGuard;
    }>[];
    transition: (state: {
        readonly _tag: "Cancelled";
    } | {
        readonly _tag: "Shipping";
    } | {
        readonly _tag: "Cart";
        readonly isShippingRequired: boolean;
    } | {
        readonly _tag: "Payment";
        readonly isShippingRequired: boolean;
    } | {
        readonly _tag: "Review";
        readonly isShippingRequired: boolean;
    }, message: {
        readonly _tag: "ClickedBack";
    } | {
        readonly _tag: "ClickedCancel";
    } | {
        readonly _tag: "ClickedContinue";
    } | {
        readonly _tag: "SelectedEdition";
        readonly isShippingRequired: boolean;
    } | {
        readonly _tag: "ToggledHelp";
        readonly isOpen: boolean;
    }) => Readonly<{
        model: {
            readonly _tag: "Cancelled";
        } | {
            readonly _tag: "Shipping";
        } | {
            readonly _tag: "Cart";
            readonly isShippingRequired: boolean;
        } | {
            readonly _tag: "Payment";
            readonly isShippingRequired: boolean;
        } | {
            readonly _tag: "Review";
            readonly isShippingRequired: boolean;
        };
        commands?: import("foldkit/update").Commands<{
            readonly _tag: "ClickedBack";
        } | {
            readonly _tag: "ClickedCancel";
        } | {
            readonly _tag: "ClickedContinue";
        } | {
            readonly _tag: "SelectedEdition";
            readonly isShippingRequired: boolean;
        } | {
            readonly _tag: "ToggledHelp";
            readonly isOpen: boolean;
        }, never>;
        outMessage?: never;
    }>;
    step: (state: {
        readonly _tag: "Cancelled";
    } | {
        readonly _tag: "Shipping";
    } | {
        readonly _tag: "Cart";
        readonly isShippingRequired: boolean;
    } | {
        readonly _tag: "Payment";
        readonly isShippingRequired: boolean;
    } | {
        readonly _tag: "Review";
        readonly isShippingRequired: boolean;
    }, message: {
        readonly _tag: "ClickedBack";
    } | {
        readonly _tag: "ClickedCancel";
    } | {
        readonly _tag: "ClickedContinue";
    } | {
        readonly _tag: "SelectedEdition";
        readonly isShippingRequired: boolean;
    } | {
        readonly _tag: "ToggledHelp";
        readonly isOpen: boolean;
    }) => Machine.TransitionResult<{
        readonly _tag: "Cancelled";
    } | {
        readonly _tag: "Shipping";
    } | {
        readonly _tag: "Cart";
        readonly isShippingRequired: boolean;
    } | {
        readonly _tag: "Payment";
        readonly isShippingRequired: boolean;
    } | {
        readonly _tag: "Review";
        readonly isShippingRequired: boolean;
    }, {
        readonly _tag: "ClickedBack";
    } | {
        readonly _tag: "ClickedCancel";
    } | {
        readonly _tag: "ClickedContinue";
    } | {
        readonly _tag: "SelectedEdition";
        readonly isShippingRequired: boolean;
    } | {
        readonly _tag: "ToggledHelp";
        readonly isOpen: boolean;
    }, never>;
    reachableFrom: (tag: "Cancelled" | "Cart" | "Payment" | "Review" | "Shipping") => ReadonlySet<"Cancelled" | "Cart" | "Payment" | "Review" | "Shipping">;
    unreachableStates: (extraRoots?: readonly ("Cancelled" | "Cart" | "Payment" | "Review" | "Shipping")[] | undefined) => readonly ("Cancelled" | "Cart" | "Payment" | "Review" | "Shipping")[];
    deadTransitions: (extraRoots?: readonly ("Cancelled" | "Cart" | "Payment" | "Review" | "Shipping")[] | undefined) => readonly Readonly<{
        edge: Readonly<{
            from: "Cancelled" | "Cart" | "Payment" | "Review" | "Shipping";
            messageTag: "ClickedBack" | "ClickedCancel" | "ClickedContinue" | "SelectedEdition" | "ToggledHelp";
            target: "Cancelled" | "Cart" | "Payment" | "Review" | "Shipping";
            guard: Machine.EdgeGuard;
        }>;
        reason: Machine.DeadTransitionReason;
    }>[];
    toMermaid: () => string;
}>;
