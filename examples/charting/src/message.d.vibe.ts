import { Schema } from "effect";
export declare const Message: import("foldkit/message").MessageUnion<{
    readonly GotChartModeRadioGroupMessage: {
        message: import("foldkit/message").MessageUnion<{
            readonly SelectedOption: {
                index: Schema.Number;
                value: Schema.String;
            };
            readonly FocusedOption: {
                index: Schema.Number;
            };
            readonly CompletedFocusOption: {};
        }>;
    };
    readonly GotPackageRadioGroupMessage: {
        message: import("foldkit/message").MessageUnion<{
            readonly SelectedOption: {
                index: Schema.Number;
                value: Schema.String;
            };
            readonly FocusedOption: {
                index: Schema.Number;
            };
            readonly CompletedFocusOption: {};
        }>;
    };
    readonly GotPeriodRadioGroupMessage: {
        message: import("foldkit/message").MessageUnion<{
            readonly SelectedOption: {
                index: Schema.Number;
                value: Schema.String;
            };
            readonly FocusedOption: {
                index: Schema.Number;
            };
            readonly CompletedFocusOption: {};
        }>;
    };
    readonly ClickedRefresh: {};
    readonly ClickedRetry: {};
    readonly ClickedChartDatum: {
        datumId: Schema.String;
    };
    readonly SucceededFetchTelemetry: {
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
    };
    readonly FailedFetchTelemetry: {
        error: Schema.String;
    };
    readonly SucceededMountChart: {
        hostId: Schema.String;
    };
    readonly FailedMountChart: {
        reason: Schema.String;
    };
    readonly SucceededSyncChart: {};
    readonly FailedSyncChart: {
        reason: Schema.String;
    };
}>;
export type Message = typeof Message.Type;
