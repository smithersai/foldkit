import { Schema } from 'effect';
export declare const Deployment: import("foldkit/schema").TaggedUnion<{
    readonly Production: {};
    readonly Canary: {
        commit: Schema.NonEmptyString;
    };
}>;
export type Deployment = typeof Deployment.Type;
export declare const deploymentFromCanaryCommit: (canaryCommit: string | undefined) => Deployment;
export declare const isTelemetryEnabled: (deployment: Deployment) => boolean;
export declare const deployment: {
    readonly _tag: "Production";
} | {
    readonly _tag: "Canary";
    readonly commit: string;
};
