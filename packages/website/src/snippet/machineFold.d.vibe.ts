import { Schema } from 'effect';
import { Update } from 'foldkit';
import { Message } from './machineDefinition.vibe';
export declare const Model: Schema.Struct<{
    readonly checkout: import("foldkit/schema").TaggedUnion<{
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
    readonly isHelpOpen: Schema.Boolean;
}>;
export type Model = typeof Model.Type;
export declare const initialModel: {
    readonly checkout: {
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
    readonly isHelpOpen: boolean;
};
export declare const foldCheckout: Update.Fold<{
    readonly checkout: {
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
    readonly isHelpOpen: boolean;
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
export declare const update: (model: Model, message: Message) => Update.Return<Model, Message>;
