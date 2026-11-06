import { Array as Arr, DateTime, Effect, Option, Schema } from 'effect';
import * as Socket from 'effect/socket/Socket';
import { Command, ManagedResource, Runtime, Subscription, type Update } from 'foldkit';
import { Document, HtmlBuilder } from 'foldkit/html';
type ChatPull = Effect.Effect<Arr.NonEmptyReadonlyArray<string>, Socket.SocketError>;
type ChatConnection = {
    pull: ChatPull;
    write: Socket.Writer['write'];
};
export declare const ConnectionState: import("foldkit/schema").TaggedUnion<{
    readonly Disconnected: {};
    readonly Connecting: {};
    readonly Connected: {};
    readonly Error: {
        error: Schema.String;
    };
}>;
export type ConnectionState = typeof ConnectionState.Type;
export declare const Model: Schema.Struct<{
    readonly connection: import("foldkit/schema").TaggedUnion<{
        readonly Disconnected: {};
        readonly Connecting: {};
        readonly Connected: {};
        readonly Error: {
            error: Schema.String;
        };
    }>;
    readonly messages: Schema.$Array<Schema.Struct<{
        readonly text: Schema.String;
        readonly zoned: Schema.DateTimeZoned;
        readonly isSent: Schema.Boolean;
    }>>;
    readonly messageInput: Schema.String;
}>;
export type Model = typeof Model.Type;
export declare const Message: import("foldkit/message").MessageUnion<{
    readonly ClickedConnect: {};
    readonly ConnectedChatSocket: {};
    readonly DisconnectedChatSocket: {};
    readonly ReleasedChatSocket: {};
    readonly FailedConnectChatSocket: {
        error: Schema.String;
    };
    readonly FailedChatSocket: {
        error: Schema.String;
    };
    readonly FailedSendMessage: {
        error: Schema.String;
    };
    readonly UpdatedMessageInput: {
        value: Schema.String;
    };
    readonly SubmittedMessage: {};
    readonly SucceededSendMessage: {
        text: Schema.String;
    };
    readonly ReceivedMessage: {
        text: Schema.String;
    };
    readonly TimestampedMessage: {
        text: Schema.String;
        zoned: Schema.DateTimeZoned;
        isSent: Schema.Boolean;
    };
}>;
export type Message = typeof Message.Type;
export declare const update: (model: Model, message: Message) => Readonly<{
    model: {
        readonly connection: {
            readonly _tag: "Connected";
        } | {
            readonly _tag: "Connecting";
        } | {
            readonly _tag: "Disconnected";
        } | {
            readonly _tag: "Error";
            readonly error: string;
        };
        readonly messages: readonly {
            readonly text: string;
            readonly zoned: DateTime.Zoned;
            readonly isSent: boolean;
        }[];
        readonly messageInput: string;
    };
    commands?: Update.Commands<{
        readonly _tag: "ClickedConnect";
    } | {
        readonly _tag: "ConnectedChatSocket";
    } | {
        readonly _tag: "DisconnectedChatSocket";
    } | {
        readonly _tag: "ReleasedChatSocket";
    } | {
        readonly _tag: "SubmittedMessage";
    } | {
        readonly _tag: "FailedChatSocket";
        readonly error: string;
    } | {
        readonly _tag: "FailedConnectChatSocket";
        readonly error: string;
    } | {
        readonly _tag: "FailedSendMessage";
        readonly error: string;
    } | {
        readonly _tag: "ReceivedMessage";
        readonly text: string;
    } | {
        readonly _tag: "SucceededSendMessage";
        readonly text: string;
    } | {
        readonly _tag: "TimestampedMessage";
        readonly text: string;
        readonly zoned: DateTime.Zoned;
        readonly isSent: boolean;
    } | {
        readonly _tag: "UpdatedMessageInput";
        readonly value: string;
    }, ManagedResource.ManagedResourceService<"ChatSocket">>;
    outMessage?: never;
}>;
export declare const init: Runtime.ApplicationInit<Model, Message>;
export declare const TimestampSentMessage: Command.CommandDefinitionWithArgs<"TimestampSentMessage", {
    text: Schema.String;
}, Effect.Effect<{
    readonly _tag: "TimestampedMessage";
    readonly text: string;
    readonly zoned: DateTime.Zoned;
    readonly isSent: boolean;
}, never, never>>;
export declare const TimestampReceivedMessage: Command.CommandDefinitionWithArgs<"TimestampReceivedMessage", {
    text: Schema.String;
}, Effect.Effect<{
    readonly _tag: "TimestampedMessage";
    readonly text: string;
    readonly zoned: DateTime.Zoned;
    readonly isSent: boolean;
}, never, never>>;
export declare const SendMessage: Command.CommandDefinitionWithArgs<"SendMessage", {
    text: Schema.String;
}, Effect.Effect<{
    readonly _tag: "FailedSendMessage";
    readonly error: string;
} | {
    readonly _tag: "SucceededSendMessage";
    readonly text: string;
}, never, ManagedResource.ManagedResourceService<"ChatSocket">>>;
export declare const managedResources: {
    chatSocket: ManagedResource.Entry<{
        readonly connection: {
            readonly _tag: "Connected";
        } | {
            readonly _tag: "Connecting";
        } | {
            readonly _tag: "Disconnected";
        } | {
            readonly _tag: "Error";
            readonly error: string;
        };
        readonly messages: readonly {
            readonly text: string;
            readonly zoned: DateTime.Zoned;
            readonly isSent: boolean;
        }[];
        readonly messageInput: string;
    }, {
        readonly _tag: "ClickedConnect";
    } | {
        readonly _tag: "ConnectedChatSocket";
    } | {
        readonly _tag: "DisconnectedChatSocket";
    } | {
        readonly _tag: "ReleasedChatSocket";
    } | {
        readonly _tag: "SubmittedMessage";
    } | {
        readonly _tag: "FailedChatSocket";
        readonly error: string;
    } | {
        readonly _tag: "FailedConnectChatSocket";
        readonly error: string;
    } | {
        readonly _tag: "FailedSendMessage";
        readonly error: string;
    } | {
        readonly _tag: "ReceivedMessage";
        readonly text: string;
    } | {
        readonly _tag: "SucceededSendMessage";
        readonly text: string;
    } | {
        readonly _tag: "TimestampedMessage";
        readonly text: string;
        readonly zoned: DateTime.Zoned;
        readonly isSent: boolean;
    } | {
        readonly _tag: "UpdatedMessageInput";
        readonly value: string;
    }, Option.Option<null>, ChatConnection, ManagedResource.ManagedResourceService<"ChatSocket">, () => {
        readonly _tag: "ConnectedChatSocket";
    }>;
};
export declare const subscriptions: {
    readonly isConnected: Subscription.EntryWithoutKeepAlive<{
        readonly connection: {
            readonly _tag: "Connected";
        } | {
            readonly _tag: "Connecting";
        } | {
            readonly _tag: "Disconnected";
        } | {
            readonly _tag: "Error";
            readonly error: string;
        };
        readonly messages: readonly {
            readonly text: string;
            readonly zoned: DateTime.Zoned;
            readonly isSent: boolean;
        }[];
        readonly messageInput: string;
    }, {
        readonly _tag: "ClickedConnect";
    } | {
        readonly _tag: "ConnectedChatSocket";
    } | {
        readonly _tag: "DisconnectedChatSocket";
    } | {
        readonly _tag: "ReleasedChatSocket";
    } | {
        readonly _tag: "SubmittedMessage";
    } | {
        readonly _tag: "FailedChatSocket";
        readonly error: string;
    } | {
        readonly _tag: "FailedConnectChatSocket";
        readonly error: string;
    } | {
        readonly _tag: "FailedSendMessage";
        readonly error: string;
    } | {
        readonly _tag: "ReceivedMessage";
        readonly text: string;
    } | {
        readonly _tag: "SucceededSendMessage";
        readonly text: string;
    } | {
        readonly _tag: "TimestampedMessage";
        readonly text: string;
        readonly zoned: DateTime.Zoned;
        readonly isSent: boolean;
    } | {
        readonly _tag: "UpdatedMessageInput";
        readonly value: string;
    }, {
        readonly isConnected: boolean;
    }, ManagedResource.ManagedResourceService<"ChatSocket">> & {
        readonly __subscription: never;
    };
};
export declare const view: (model: Model, h: HtmlBuilder<Message>) => Document;
export {};
