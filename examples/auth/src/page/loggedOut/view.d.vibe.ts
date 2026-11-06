import { Submodel } from 'foldkit';
export declare const view: Submodel.View<{
    readonly _tag: "LoggedOut";
    readonly route: {
        readonly _tag: "Home";
    } | {
        readonly _tag: "Login";
    } | {
        readonly _tag: "NotFound";
        readonly path: string;
    };
    readonly loginModel: {
        readonly email: {
            readonly _tag: "Invalid";
            readonly value: string;
            readonly errors: readonly [string, ...string[]];
        } | {
            readonly _tag: "NotValidated";
            readonly value: string;
        } | {
            readonly _tag: "Valid";
            readonly value: string;
        } | {
            readonly _tag: "Validating";
            readonly value: string;
        };
        readonly password: {
            readonly _tag: "Invalid";
            readonly value: string;
            readonly errors: readonly [string, ...string[]];
        } | {
            readonly _tag: "NotValidated";
            readonly value: string;
        } | {
            readonly _tag: "Valid";
            readonly value: string;
        } | {
            readonly _tag: "Validating";
            readonly value: string;
        };
        readonly isSubmitting: boolean;
    };
}, {
    readonly _tag: "GotLoginMessage";
    readonly message: {
        readonly _tag: "SubmittedForm";
    } | {
        readonly _tag: "ChangedEmail";
        readonly value: string;
    } | {
        readonly _tag: "ChangedPassword";
        readonly value: string;
    } | {
        readonly _tag: "FailedSimulateAuthRequest";
        readonly error: string;
    } | {
        readonly _tag: "SucceededSimulateAuthRequest";
        readonly session: {
            readonly userId: string;
            readonly email: string;
            readonly name: string;
        };
    };
}, void>;
