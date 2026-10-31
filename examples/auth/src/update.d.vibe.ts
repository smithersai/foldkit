import { Effect, Option } from "effect";
import { Command, Update } from 'foldkit';
import { Message } from './message.vibe';
import { Model } from './model.vibe';
export declare const RedirectToLogin: Command.CommandDefinitionNoArgs<"RedirectToLogin", Effect.Effect<{
    readonly _tag: "CompletedNavigateInternal";
}, never, never>>;
export declare const RedirectToDashboard: Command.CommandDefinitionNoArgs<"RedirectToDashboard", Effect.Effect<{
    readonly _tag: "CompletedNavigateInternal";
}, never, never>>;
export declare const update: (model: Model, message: Message) => Readonly<{
    model: {
        readonly _tag: "LoggedIn";
        readonly route: {
            readonly _tag: "Dashboard";
        } | {
            readonly _tag: "Settings";
        } | {
            readonly _tag: "NotFound";
            readonly path: string;
        };
        readonly session: {
            readonly userId: string;
            readonly email: string;
            readonly name: string;
        };
    } | {
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
    };
    commands?: Update.Commands<{
        readonly _tag: "CompletedLoadExternal";
    } | {
        readonly _tag: "CompletedLogError";
    } | {
        readonly _tag: "CompletedNavigateInternal";
    } | {
        readonly _tag: "SucceededClearSession";
    } | {
        readonly _tag: "SucceededSaveSession";
    } | {
        readonly _tag: "ChangedUrl";
        readonly url: {
            readonly protocol: string;
            readonly host: string;
            readonly port: Option.Option<string>;
            readonly pathname: string;
            readonly search: Option.Option<string>;
            readonly hash: Option.Option<string>;
        };
    } | {
        readonly _tag: "ClickedLink";
        readonly request: {
            readonly _tag: "External";
            readonly href: string;
        } | {
            readonly _tag: "Internal";
            readonly url: {
                readonly protocol: string;
                readonly host: string;
                readonly port: Option.Option<string>;
                readonly pathname: string;
                readonly search: Option.Option<string>;
                readonly hash: Option.Option<string>;
            };
        };
    } | {
        readonly _tag: "FailedClearSession";
        readonly error: string;
    } | {
        readonly _tag: "FailedSaveSession";
        readonly error: string;
    } | {
        readonly _tag: "GotLoggedInMessage";
        readonly message: {
            readonly _tag: "ClickedLogout";
        };
    } | {
        readonly _tag: "GotLoggedOutMessage";
        readonly message: {
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
        };
    }, never>;
    outMessage?: never;
}>;
