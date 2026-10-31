import { Schema } from "effect";
import { Runtime, Subscription, type Update } from 'foldkit';
import { type Document, HtmlBuilder } from 'foldkit/html';
export declare const SlowWarningReport: Schema.Struct<{
    readonly phase: Schema.Literals<readonly ["Update", "View", "Patch", "SubscriptionDependencies"]>;
    readonly durationMs: Schema.Number;
    readonly thresholdMs: Schema.Number;
    readonly trigger: Schema.String;
    readonly details: Schema.String;
}>;
export type SlowWarningReport = typeof SlowWarningReport.Type;
export declare const SlowWarning: Schema.Struct<{
    readonly phase: Schema.Literals<readonly ["Update", "View", "Patch", "SubscriptionDependencies"]>;
    readonly durationMs: Schema.Number;
    readonly thresholdMs: Schema.Number;
    readonly trigger: Schema.String;
    readonly details: Schema.String;
    readonly id: Schema.Number;
}>;
export type SlowWarning = typeof SlowWarning.Type;
export declare const Model: Schema.Struct<{
    readonly activeWorkload: Schema.Literals<readonly ["Idle", "Update", "View", "Patch", "SubscriptionDependencies"]>;
    readonly nextWarningId: Schema.Number;
    readonly warnings: Schema.$Array<Schema.Struct<{
        readonly phase: Schema.Literals<readonly ["Update", "View", "Patch", "SubscriptionDependencies"]>;
        readonly durationMs: Schema.Number;
        readonly thresholdMs: Schema.Number;
        readonly trigger: Schema.String;
        readonly details: Schema.String;
        readonly id: Schema.Number;
    }>>;
    readonly patchRows: Schema.Number;
    readonly patchRun: Schema.Number;
}>;
export type Model = typeof Model.Type;
export declare const Message: import("foldkit/message").MessageUnion<{
    readonly ClickedRunUpdateWork: {};
    readonly ClickedRunViewWork: {};
    readonly ClickedRunPatchWork: {};
    readonly ClickedRunSubscriptionDependenciesWork: {};
    readonly ClickedClearWarnings: {};
    readonly RecordedSlowWarning: {
        report: Schema.Struct<{
            readonly phase: Schema.Literals<readonly ["Update", "View", "Patch", "SubscriptionDependencies"]>;
            readonly durationMs: Schema.Number;
            readonly thresholdMs: Schema.Number;
            readonly trigger: Schema.String;
            readonly details: Schema.String;
        }>;
    };
}>;
export type Message = typeof Message.Type;
export declare const handleSlow: (context: Runtime.SlowContext<Model, Message>) => void;
export declare const update: (model: Model, message: Message) => Readonly<{
    model: {
        readonly activeWorkload: "Idle" | "Patch" | "SubscriptionDependencies" | "Update" | "View";
        readonly nextWarningId: number;
        readonly warnings: readonly {
            readonly phase: "Patch" | "SubscriptionDependencies" | "Update" | "View";
            readonly durationMs: number;
            readonly thresholdMs: number;
            readonly trigger: string;
            readonly details: string;
            readonly id: number;
        }[];
        readonly patchRows: number;
        readonly patchRun: number;
    };
    commands?: Update.Commands<{
        readonly _tag: "ClickedClearWarnings";
    } | {
        readonly _tag: "ClickedRunPatchWork";
    } | {
        readonly _tag: "ClickedRunSubscriptionDependenciesWork";
    } | {
        readonly _tag: "ClickedRunUpdateWork";
    } | {
        readonly _tag: "ClickedRunViewWork";
    } | {
        readonly _tag: "RecordedSlowWarning";
        readonly report: {
            readonly phase: "Patch" | "SubscriptionDependencies" | "Update" | "View";
            readonly durationMs: number;
            readonly thresholdMs: number;
            readonly trigger: string;
            readonly details: string;
        };
    }, never>;
    outMessage?: never;
}>;
export declare const init: Runtime.ApplicationInit<Model, Message>;
export declare const subscriptions: {
    readonly slowWarnings: Subscription.EntryWithoutKeepAlive<unknown, {
        readonly _tag: "RecordedSlowWarning";
        readonly report: {
            readonly phase: "Patch" | "SubscriptionDependencies" | "Update" | "View";
            readonly durationMs: number;
            readonly thresholdMs: number;
            readonly trigger: string;
            readonly details: string;
        };
    }, Record<string, never>, never> & {
        readonly __subscription: never;
    };
    readonly burnCpuDuringDependencyExtraction: Subscription.EntryWithoutKeepAlive<{
        readonly activeWorkload: "Idle" | "Patch" | "SubscriptionDependencies" | "Update" | "View";
        readonly nextWarningId: number;
        readonly warnings: readonly {
            readonly phase: "Patch" | "SubscriptionDependencies" | "Update" | "View";
            readonly durationMs: number;
            readonly thresholdMs: number;
            readonly trigger: string;
            readonly details: string;
            readonly id: number;
        }[];
        readonly patchRows: number;
        readonly patchRun: number;
    }, {
        readonly _tag: "ClickedClearWarnings";
    } | {
        readonly _tag: "ClickedRunPatchWork";
    } | {
        readonly _tag: "ClickedRunSubscriptionDependenciesWork";
    } | {
        readonly _tag: "ClickedRunUpdateWork";
    } | {
        readonly _tag: "ClickedRunViewWork";
    } | {
        readonly _tag: "RecordedSlowWarning";
        readonly report: {
            readonly phase: "Patch" | "SubscriptionDependencies" | "Update" | "View";
            readonly durationMs: number;
            readonly thresholdMs: number;
            readonly trigger: string;
            readonly details: string;
        };
    }, {
        readonly activeWorkload: "Idle" | "Patch" | "SubscriptionDependencies" | "Update" | "View";
    }, never> & {
        readonly __subscription: never;
    };
};
export declare const view: (model: Model, h: HtmlBuilder<Message>) => Document;
