import { Schema } from 'effect';
export declare const Message: import("foldkit/message").MessageUnion<{
    readonly CompletedNavigateInternal: {};
    readonly CompletedLoadExternal: {};
    readonly CompletedLogError: {};
    readonly ClickedLink: {
        request: import("foldkit/schema").TaggedUnion<{
            readonly Internal: {
                url: Schema.Struct<{
                    readonly protocol: Schema.String;
                    readonly host: Schema.String;
                    readonly port: Schema.Option<Schema.String>;
                    readonly pathname: Schema.String;
                    readonly search: Schema.Option<Schema.String>;
                    readonly hash: Schema.Option<Schema.String>;
                }>;
            };
            readonly External: {
                href: Schema.String;
            };
        }>;
    };
    readonly ChangedUrl: {
        url: Schema.Struct<{
            readonly protocol: Schema.String;
            readonly host: Schema.String;
            readonly port: Schema.Option<Schema.String>;
            readonly pathname: Schema.String;
            readonly search: Schema.Option<Schema.String>;
            readonly hash: Schema.Option<Schema.String>;
        }>;
    };
    readonly SucceededSaveSession: {};
    readonly FailedSaveSession: {
        error: Schema.String;
    };
    readonly SucceededClearSession: {};
    readonly FailedClearSession: {
        error: Schema.String;
    };
    readonly GotLoggedOutMessage: {
        message: import("foldkit/message").MessageUnion<{
            readonly GotLoginMessage: {
                message: import("foldkit/message").MessageUnion<{
                    readonly ChangedEmail: {
                        value: Schema.String;
                    };
                    readonly ChangedPassword: {
                        value: Schema.String;
                    };
                    readonly SubmittedForm: {};
                    readonly SucceededSimulateAuthRequest: {
                        session: Schema.Struct<{
                            readonly userId: Schema.String;
                            readonly email: Schema.String;
                            readonly name: Schema.String;
                        }>;
                    };
                    readonly FailedSimulateAuthRequest: {
                        error: Schema.String;
                    };
                }>;
            };
        }>;
    };
    readonly GotLoggedInMessage: {
        message: import("foldkit/message").MessageUnion<{
            readonly ClickedLogout: {};
        }>;
    };
}>;
export type Message = typeof Message.Type;
