import { Context, DateTime, Effect, Layer, Option, Schema } from 'effect';
import { HttpClient } from 'effect/http';
export declare const GitHubRepositoryResponse: Schema.Struct<{
    readonly stargazers_count: Schema.Number;
    readonly forks_count: Schema.Number;
    readonly watchers_count: Schema.Number;
    readonly open_issues_count: Schema.Number;
    readonly pushed_at: Schema.String;
    readonly default_branch: Schema.String;
}>;
export type GitHubRepositoryResponse = typeof GitHubRepositoryResponse.Type;
export declare const GitHubContributorResponse: Schema.Struct<{
    readonly login: Schema.String;
    readonly contributions: Schema.Number;
    readonly avatar_url: Schema.OptionFromOptional<Schema.String>;
}>;
export type GitHubContributorResponse = typeof GitHubContributorResponse.Type;
export declare const GitHubIssueResponse: Schema.Struct<{
    readonly pull_request: Schema.OptionFromOptional<Schema.Unknown>;
}>;
export declare const GitHubPullRequestResponse: Schema.Struct<{
    readonly id: Schema.Number;
}>;
export type GitHubPullRequestResponse = typeof GitHubPullRequestResponse.Type;
export declare const GitHubReleaseResponse: Schema.Struct<{
    readonly published_at: Schema.OptionFromOptional<Schema.String>;
}>;
export declare const GitHubStarHistoryResponse: Schema.Struct<{
    readonly week: Schema.Number;
    readonly total: Schema.Number;
    readonly days: Schema.$Array<Schema.Number>;
}>;
export type GitHubStarHistoryResponse = typeof GitHubStarHistoryResponse.Type;
export declare const GitHubCommitActivityResponse: Schema.Struct<{
    readonly week: Schema.Number;
    readonly total: Schema.Number;
}>;
export type GitHubCommitActivityResponse = typeof GitHubCommitActivityResponse.Type;
export type GitHubStatResult<A> = Readonly<{
    data: Option.Option<A>;
    warnings: ReadonlyArray<string>;
}>;
declare const GitHubApi_base: Context.ServiceClass<GitHubApi, "charting/GitHubApi", {
    readonly fetchRepository: Effect.Effect<typeof GitHubRepositoryResponse.Type, Error>;
    readonly fetchContributors: Effect.Effect<ReadonlyArray<typeof GitHubContributorResponse.Type>, Error>;
    readonly fetchIssues: Effect.Effect<ReadonlyArray<typeof GitHubIssueResponse.Type>, Error>;
    readonly fetchPullRequests: Effect.Effect<ReadonlyArray<typeof GitHubPullRequestResponse.Type>, Error>;
    fetchReleases(yearCutoff: DateTime.Utc): Effect.Effect<ReadonlyArray<typeof GitHubReleaseResponse.Type>, Error>;
    fetchStarHistory(yearCutoff: DateTime.Utc): Effect.Effect<ReadonlyArray<typeof GitHubStarHistoryResponse.Type>, Error>;
    readonly fetchCommitActivity: Effect.Effect<GitHubStatResult<ReadonlyArray<typeof GitHubCommitActivityResponse.Type>>>;
}>;
export declare class GitHubApi extends GitHubApi_base {
}
export declare const GitHubApiLive: Layer.Layer<GitHubApi, never, HttpClient.HttpClient>;
export {};
