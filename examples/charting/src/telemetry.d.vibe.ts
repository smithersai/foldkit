import { Effect, Option } from "effect";
import { ContributorSummary, DependencyEdge, PackageSnapshot, Telemetry, WeeklyTelemetry } from './domain.vibe';
import type { PackageId, PackageSpec } from './domain.vibe';
import type { GitHubCommitActivityResponse, GitHubContributorResponse, GitHubIssueResponse, GitHubPullRequestResponse, GitHubReleaseResponse, GitHubRepositoryResponse, GitHubStarHistoryResponse, GitHubStatResult } from './githubApi.vibe';
import { GitHubApi } from './githubApi.vibe';
import type { NpmDownloadsResponse, NpmPackument, NpmVersionMetadata } from './npmApi.vibe';
import { NpmApi } from './npmApi.vibe';
import { type WeeklyCount } from './weeks.vibe';
export type RawPackageData = Readonly<{
    spec: PackageSpec;
    downloads: typeof NpmDownloadsResponse.Type;
    packument: typeof NpmPackument.Type;
}>;
export type RawTelemetry = Readonly<{
    fetchedAt: number;
    repository: typeof GitHubRepositoryResponse.Type;
    contributors: ReadonlyArray<typeof GitHubContributorResponse.Type>;
    issues: ReadonlyArray<typeof GitHubIssueResponse.Type>;
    pullRequests: ReadonlyArray<typeof GitHubPullRequestResponse.Type>;
    releases: ReadonlyArray<typeof GitHubReleaseResponse.Type>;
    starHistory: ReadonlyArray<typeof GitHubStarHistoryResponse.Type>;
    commitActivity: GitHubStatResult<ReadonlyArray<typeof GitHubCommitActivityResponse.Type>>;
    packageData: ReadonlyArray<RawPackageData>;
}>;
export declare const dependencyEdgesForPackage: (packageId: PackageId, metadata: NpmVersionMetadata) => ReadonlyArray<typeof DependencyEdge.Type>;
export declare const packageSnapshotFromResponses: (spec: PackageSpec, downloads: typeof NpmDownloadsResponse.Type, packument: typeof NpmPackument.Type, weekStarts: ReadonlyArray<string>) => Readonly<{
    snapshot: typeof PackageSnapshot.Type;
    edges: ReadonlyArray<typeof DependencyEdge.Type>;
}>;
export declare const weeklyStars: (starHistory: ReadonlyArray<typeof GitHubStarHistoryResponse.Type>, weekStarts: ReadonlyArray<string>) => ReadonlyArray<WeeklyCount>;
export declare const cumulativeStarsByWeek: (currentStars: number, starHistory: ReadonlyArray<typeof GitHubStarHistoryResponse.Type>, weekStarts: ReadonlyArray<string>) => ReadonlyArray<WeeklyCount>;
export declare const weeklyCommitTotals: (maybeCommitActivity: Option.Option<ReadonlyArray<typeof GitHubCommitActivityResponse.Type>>, weekStarts: ReadonlyArray<string>) => ReadonlyArray<WeeklyCount>;
export declare const weeklyReleaseTotals: (releases: ReadonlyArray<typeof GitHubReleaseResponse.Type>, weekStarts: ReadonlyArray<string>) => ReadonlyArray<WeeklyCount>;
export declare const makeWeeklyTelemetry: (weekStarts: ReadonlyArray<string>, cumulativeStars: ReadonlyArray<WeeklyCount>, commits: ReadonlyArray<WeeklyCount>, releases: ReadonlyArray<WeeklyCount>) => ReadonlyArray<typeof WeeklyTelemetry.Type>;
export declare const contributorSummary: (contributor: GitHubContributorResponse) => typeof ContributorSummary.Type;
export declare const fetchRawTelemetry: Effect.Effect<RawTelemetry, Error, GitHubApi | NpmApi>;
export declare const transformTelemetry: (raw: RawTelemetry) => typeof Telemetry.Type;
