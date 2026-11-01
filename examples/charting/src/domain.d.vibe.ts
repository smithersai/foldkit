import { Option, Schema } from 'effect';
export declare const ChartMode: Schema.Literals<readonly ["Adoption", "Velocity", "Ecosystem"]>;
export type ChartMode = typeof ChartMode.Type;
export declare const chartModes: ReadonlyArray<ChartMode>;
export declare const Period: Schema.Literals<readonly ["LastEightWeeks", "LastSixteenWeeks", "LastYear"]>;
export type Period = typeof Period.Type;
export declare const periods: ReadonlyArray<Period>;
export declare const PackageId: Schema.Literals<readonly ["Core", "Ui", "Devtools", "VitePlugin"]>;
export type PackageId = typeof PackageId.Type;
export declare const packageIds: ReadonlyArray<PackageId>;
export declare const PackageSpec: Schema.Struct<{
    readonly id: Schema.Literals<readonly ["Core", "Ui", "Devtools", "VitePlugin"]>;
    readonly npmName: Schema.String;
    readonly displayName: Schema.String;
    readonly role: Schema.String;
}>;
export type PackageSpec = typeof PackageSpec.Type;
export declare const packageSpecs: ReadonlyArray<PackageSpec>;
export declare const WeeklyTelemetry: Schema.Struct<{
    readonly weekStart: Schema.String;
    readonly cumulativeStars: Schema.Number;
    readonly commits: Schema.Number;
    readonly releases: Schema.Number;
}>;
export type WeeklyTelemetry = typeof WeeklyTelemetry.Type;
export declare const WeeklyDownloads: Schema.Struct<{
    readonly weekStart: Schema.String;
    readonly downloads: Schema.Number;
}>;
export type WeeklyDownloads = typeof WeeklyDownloads.Type;
export declare const PackageSnapshot: Schema.Struct<{
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
}>;
export type PackageSnapshot = typeof PackageSnapshot.Type;
export declare const DependencyEdge: Schema.Struct<{
    readonly source: Schema.Literals<readonly ["Core", "Ui", "Devtools", "VitePlugin"]>;
    readonly target: Schema.Literals<readonly ["Core", "Ui", "Devtools", "VitePlugin"]>;
    readonly kind: Schema.Literals<readonly ["Dependency", "PeerDependency"]>;
}>;
export type DependencyEdge = typeof DependencyEdge.Type;
export declare const ContributorSummary: Schema.Struct<{
    readonly login: Schema.String;
    readonly contributions: Schema.Number;
    readonly avatarUrl: Schema.Option<Schema.String>;
}>;
export type ContributorSummary = typeof ContributorSummary.Type;
export declare const RepositorySnapshot: Schema.Struct<{
    readonly stars: Schema.Number;
    readonly forks: Schema.Number;
    readonly watchers: Schema.Number;
    readonly openIssues: Schema.Number;
    readonly openPullRequests: Schema.Number;
    readonly visibleContributors: Schema.Number;
    readonly pushedAt: Schema.String;
    readonly defaultBranch: Schema.String;
}>;
export type RepositorySnapshot = typeof RepositorySnapshot.Type;
export declare const Telemetry: Schema.Struct<{
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
export type Telemetry = typeof Telemetry.Type;
export declare const periodLabels: Record<Period, string>;
export declare const packageIdToSpec: (packageId: PackageId) => PackageSpec;
export declare const visibleWeeks: (telemetry: Telemetry, period: Period) => ReadonlyArray<WeeklyTelemetry>;
export declare const totalDownloads: (telemetry: Telemetry) => number;
export declare const totalCommits: (telemetry: Telemetry) => number;
export declare const findPackageSnapshot: (telemetry: Telemetry, packageId: PackageId) => Option.Option<PackageSnapshot>;
