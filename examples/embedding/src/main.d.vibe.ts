import { Effect, Schema } from 'effect';
import { Command, Port, Runtime, Subscription, type Update } from 'foldkit';
import { Html, HtmlBuilder } from 'foldkit/html';
export declare const Model: Schema.Struct<{
    readonly count: Schema.Number;
    readonly step: Schema.Number;
}>;
export type Model = typeof Model.Type;
export declare const Message: import("foldkit/message").MessageUnion<{
    readonly Ticked: {};
    readonly ClickedAdvance: {};
    readonly ChangedStep: {
        step: Schema.Number;
    };
    readonly CompletedReportCount: {};
}>;
export type Message = typeof Message.Type;
export declare const ports: {
    inbound: {
        stepChanged: Port.Inbound<number, number>;
    };
    outbound: {
        countChanged: Port.Outbound<number, number>;
    };
};
export declare const Flags: Schema.Struct<{
    readonly initialCount: Schema.Number;
}>;
export type Flags = typeof Flags.Type;
export declare const init: Runtime.ElementInit<Model, Message, Flags>;
export declare const ReportCount: Command.CommandDefinitionWithArgs<"ReportCount", {
    count: Schema.Number;
}, Effect.Effect<{
    readonly _tag: "CompletedReportCount";
}, never, never>>;
export declare const update: (model: Model, message: Message) => Readonly<{
    model: {
        readonly count: number;
        readonly step: number;
    };
    commands?: Update.Commands<{
        readonly _tag: "ClickedAdvance";
    } | {
        readonly _tag: "CompletedReportCount";
    } | {
        readonly _tag: "Ticked";
    } | {
        readonly _tag: "ChangedStep";
        readonly step: number;
    }, never>;
    outMessage?: never;
}>;
export declare const subscriptions: {
    readonly tick: Subscription.EntryWithoutKeepAlive<unknown, {
        readonly _tag: "Ticked";
    }, Record<string, never>, never> & {
        readonly __subscription: never;
    };
    readonly hostStep: Subscription.EntryWithoutKeepAlive<unknown, {
        readonly _tag: "ChangedStep";
        readonly step: number;
    }, Record<string, never>, never> & {
        readonly __subscription: never;
    };
};
export declare const view: (model: Model, h: HtmlBuilder<Message>) => Html;
export declare const makeElement: (container: HTMLElement, flags: Flags) => Readonly<{
    runtimeId: string;
    start: (preservedModel?: unknown) => Effect.Effect<void>;
    ports: {
        inbound: {
            stepChanged: Port.Inbound<number, number>;
        };
        outbound: {
            countChanged: Port.Outbound<number, number>;
        };
    };
    '~foldkit/RuntimeBoot'?: Readonly<{
        Flags: (flags: void) => void;
        Resources: (resources: never) => never;
        Kind: "Element";
    }>;
}>;
