import { Effect, Option, Schema } from 'effect';
import { Command } from 'foldkit';
export declare const FetchTelemetry: Command.CommandDefinitionNoArgs<"FetchTelemetry", Effect.Effect<{
    readonly _tag: "FailedFetchTelemetry";
    readonly error: string;
} | {
    readonly _tag: "SucceededFetchTelemetry";
    readonly telemetry: {
        readonly fetchedAt: number;
        readonly repository: {
            readonly stars: number;
            readonly forks: number;
            readonly watchers: number;
            readonly openIssues: number;
            readonly openPullRequests: number;
            readonly visibleContributors: number;
            readonly pushedAt: string;
            readonly defaultBranch: string;
        };
        readonly packages: readonly {
            readonly id: "Core" | "Devtools" | "Ui" | "VitePlugin";
            readonly npmName: string;
            readonly displayName: string;
            readonly role: string;
            readonly latestVersion: string;
            readonly publishedAt: string;
            readonly totalDownloads: number;
            readonly lastWeekDownloads: number;
            readonly dependencyCount: number;
            readonly downloadsByWeek: readonly {
                readonly weekStart: string;
                readonly downloads: number;
            }[];
        }[];
        readonly weeks: readonly {
            readonly weekStart: string;
            readonly cumulativeStars: number;
            readonly commits: number;
            readonly releases: number;
        }[];
        readonly dependencyEdges: readonly {
            readonly source: "Core" | "Devtools" | "Ui" | "VitePlugin";
            readonly target: "Core" | "Devtools" | "Ui" | "VitePlugin";
            readonly kind: "Dependency" | "PeerDependency";
        }[];
        readonly topContributors: readonly {
            readonly login: string;
            readonly contributions: number;
            readonly avatarUrl: Option.Option<string>;
        }[];
        readonly warnings: readonly string[];
    };
}, never, never>>;
export declare const SyncChart: Command.CommandDefinitionWithArgs<"SyncChart", {
    hostId: Schema.String;
    telemetry: Schema.Struct<{
        readonly fetchedAt: Schema.Number;
        readonly repository: Schema.Struct<{
            readonly stars: Schema.Number;
            readonly forks: Schema.Number;
            readonly watchers: Schema.Number;
            readonly openIssues: Schema.Number;
            readonly openPullRequests: Schema.Number;
            readonly visibleContributors: Schema.Number;
            readonly pushedAt: Schema.String;
            readonly defaultBranch: Schema.String;
        }>;
        readonly packages: Schema.$Array<Schema.Struct<{
            readonly id: Schema.Literals<readonly ["Core", "Ui", "Devtools", "VitePlugin"]>;
            readonly npmName: Schema.String;
            readonly displayName: Schema.String;
            readonly role: Schema.String;
            readonly latestVersion: Schema.String;
            readonly publishedAt: Schema.String;
            readonly totalDownloads: Schema.Number;
            readonly lastWeekDownloads: Schema.Number;
            readonly dependencyCount: Schema.Number;
            readonly downloadsByWeek: Schema.$Array<Schema.Struct<{
                readonly weekStart: Schema.String;
                readonly downloads: Schema.Number;
            }>>;
        }>>;
        readonly weeks: Schema.$Array<Schema.Struct<{
            readonly weekStart: Schema.String;
            readonly cumulativeStars: Schema.Number;
            readonly commits: Schema.Number;
            readonly releases: Schema.Number;
        }>>;
        readonly dependencyEdges: Schema.$Array<Schema.Struct<{
            readonly source: Schema.Literals<readonly ["Core", "Ui", "Devtools", "VitePlugin"]>;
            readonly target: Schema.Literals<readonly ["Core", "Ui", "Devtools", "VitePlugin"]>;
            readonly kind: Schema.Literals<readonly ["Dependency", "PeerDependency"]>;
        }>>;
        readonly topContributors: Schema.$Array<Schema.Struct<{
            readonly login: Schema.String;
            readonly contributions: Schema.Number;
            readonly avatarUrl: Schema.Option<Schema.String>;
        }>>;
        readonly warnings: Schema.$Array<Schema.String>;
    }>;
    chartMode: Schema.Literals<readonly ["Adoption", "Velocity", "Ecosystem"]>;
    selectedPackageId: Schema.Literals<readonly ["Core", "Ui", "Devtools", "VitePlugin"]>;
    period: Schema.Literals<readonly ["LastEightWeeks", "LastSixteenWeeks", "LastYear"]>;
    maybeSelectedDatumId: Schema.Option<Schema.String>;
}, Effect.Effect<{
    readonly _tag: "SucceededSyncChart";
} | {
    readonly _tag: "FailedSyncChart";
    readonly reason: string;
}, never, never>>;
