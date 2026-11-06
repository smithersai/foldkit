import { Effect, Option, Schema } from 'effect';
import { Command, ManagedResource, Runtime, type Update } from 'foldkit';
import { Document, HtmlBuilder } from 'foldkit/html';
export declare const EngineState: import("foldkit/schema").TaggedUnion<{
    readonly Off: {};
    readonly Booting: {};
    readonly Ready: {
        engineId: Schema.String;
    };
    readonly Failed: {
        reason: Schema.String;
    };
}>;
export declare const Model: Schema.Struct<{
    readonly engine: import("foldkit/schema").TaggedUnion<{
        readonly Off: {};
        readonly Booting: {};
        readonly Ready: {
            engineId: Schema.String;
        };
        readonly Failed: {
            reason: Schema.String;
        };
    }>;
    readonly computeCount: Schema.Number;
    readonly maybeSquareResult: Schema.Option<Schema.Number>;
}>;
export type Model = typeof Model.Type;
export declare const Message: import("foldkit/message").MessageUnion<{
    readonly ClickedStartEngine: {};
    readonly ClickedStopEngine: {};
    readonly StartedEngine: {
        engineId: Schema.String;
    };
    readonly StoppedEngine: {};
    readonly FailedStartEngine: {
        reason: Schema.String;
    };
    readonly ClickedCompute: {};
    readonly CompletedCompute: {
        result: Schema.Number;
    };
    readonly SkippedCompute: {};
}>;
export type Message = typeof Message.Type;
export declare const Compute: Command.CommandDefinitionWithArgs<"Compute", {
    value: Schema.Number;
}, Effect.Effect<{
    readonly _tag: "SkippedCompute";
} | {
    readonly _tag: "CompletedCompute";
    readonly result: number;
}, never, ManagedResource.ManagedResourceService<"ComputeEngine">>>;
export declare const update: (model: Model, message: Message) => Readonly<{
    model: {
        readonly engine: {
            readonly _tag: "Booting";
        } | {
            readonly _tag: "Off";
        } | {
            readonly _tag: "Failed";
            readonly reason: string;
        } | {
            readonly _tag: "Ready";
            readonly engineId: string;
        };
        readonly computeCount: number;
        readonly maybeSquareResult: Option.Option<number>;
    };
    commands?: Update.Commands<{
        readonly _tag: "ClickedCompute";
    } | {
        readonly _tag: "ClickedStartEngine";
    } | {
        readonly _tag: "ClickedStopEngine";
    } | {
        readonly _tag: "SkippedCompute";
    } | {
        readonly _tag: "StoppedEngine";
    } | {
        readonly _tag: "CompletedCompute";
        readonly result: number;
    } | {
        readonly _tag: "FailedStartEngine";
        readonly reason: string;
    } | {
        readonly _tag: "StartedEngine";
        readonly engineId: string;
    }, ManagedResource.ManagedResourceService<"ComputeEngine">>;
    outMessage?: never;
}>;
export declare const init: Runtime.ApplicationInit<Model, Message>;
export declare const managedResources: {
    engine: ManagedResource.Entry<{
        readonly engine: {
            readonly _tag: "Booting";
        } | {
            readonly _tag: "Off";
        } | {
            readonly _tag: "Failed";
            readonly reason: string;
        } | {
            readonly _tag: "Ready";
            readonly engineId: string;
        };
        readonly computeCount: number;
        readonly maybeSquareResult: Option.Option<number>;
    }, {
        readonly _tag: "ClickedCompute";
    } | {
        readonly _tag: "ClickedStartEngine";
    } | {
        readonly _tag: "ClickedStopEngine";
    } | {
        readonly _tag: "SkippedCompute";
    } | {
        readonly _tag: "StoppedEngine";
    } | {
        readonly _tag: "CompletedCompute";
        readonly result: number;
    } | {
        readonly _tag: "FailedStartEngine";
        readonly reason: string;
    } | {
        readonly _tag: "StartedEngine";
        readonly engineId: string;
    }, Option.Option<null>, {
        readonly engineId: string;
        readonly square: (value: number) => number;
    }, ManagedResource.ManagedResourceService<"ComputeEngine">, ({ engineId }: {
        readonly engineId: string;
        readonly square: (value: number) => number;
    }) => {
        readonly _tag: "StartedEngine";
        readonly engineId: string;
    }>;
};
export declare const view: (model: Model, h: HtmlBuilder<Message>) => Document;
