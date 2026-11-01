import { Schema } from 'effect';
import { AsyncData } from 'foldkit';
export declare const TelemetryAsyncData: Readonly<{
    schema: Schema.Codec<AsyncData.AsyncData<{
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
            readonly avatarUrl: import("effect/Option").Option<string>;
        }[];
        readonly warnings: readonly string[];
    }, string>, AsyncData.AsyncDataEncoded<{
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
            readonly avatarUrl: import("effect/Option").Option<string>;
        }[];
        readonly warnings: readonly string[];
    }, string>, never, never>;
    Idle: typeof AsyncData.Idle;
    Loading: typeof AsyncData.Loading;
    Refreshing: (payload: Readonly<{
        data: {
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
                readonly avatarUrl: import("effect/Option").Option<string>;
            }[];
            readonly warnings: readonly string[];
        };
    }>) => AsyncData.AsyncData<{
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
            readonly avatarUrl: import("effect/Option").Option<string>;
        }[];
        readonly warnings: readonly string[];
    }, string>;
    Failure: (payload: Readonly<{
        error: string;
    }>) => AsyncData.AsyncData<{
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
            readonly avatarUrl: import("effect/Option").Option<string>;
        }[];
        readonly warnings: readonly string[];
    }, string>;
    Stale: (payload: Readonly<{
        error: string;
        data: {
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
                readonly avatarUrl: import("effect/Option").Option<string>;
            }[];
            readonly warnings: readonly string[];
        };
    }>) => AsyncData.AsyncData<{
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
            readonly avatarUrl: import("effect/Option").Option<string>;
        }[];
        readonly warnings: readonly string[];
    }, string>;
    Success: (payload: Readonly<{
        data: {
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
                readonly avatarUrl: import("effect/Option").Option<string>;
            }[];
            readonly warnings: readonly string[];
        };
    }>) => AsyncData.AsyncData<{
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
            readonly avatarUrl: import("effect/Option").Option<string>;
        }[];
        readonly warnings: readonly string[];
    }, string>;
}>;
export declare const Model: Schema.Struct<{
    readonly telemetry: Schema.Codec<AsyncData.AsyncData<{
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
            readonly avatarUrl: import("effect/Option").Option<string>;
        }[];
        readonly warnings: readonly string[];
    }, string>, AsyncData.AsyncDataEncoded<{
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
            readonly avatarUrl: import("effect/Option").Option<string>;
        }[];
        readonly warnings: readonly string[];
    }, string>, never, never>;
    readonly chartMode: Schema.Literals<readonly ["Adoption", "Velocity", "Ecosystem"]>;
    readonly chartModeRadioGroup: Schema.Struct<{
        readonly id: Schema.String;
        readonly maybeFocusedIndex: Schema.Option<Schema.Number>;
    }>;
    readonly selectedPackageId: Schema.Literals<readonly ["Core", "Ui", "Devtools", "VitePlugin"]>;
    readonly packageRadioGroup: Schema.Struct<{
        readonly id: Schema.String;
        readonly maybeFocusedIndex: Schema.Option<Schema.Number>;
    }>;
    readonly period: Schema.Literals<readonly ["LastEightWeeks", "LastSixteenWeeks", "LastYear"]>;
    readonly periodRadioGroup: Schema.Struct<{
        readonly id: Schema.String;
        readonly maybeFocusedIndex: Schema.Option<Schema.Number>;
    }>;
    readonly maybeChartHostId: Schema.Option<Schema.String>;
    readonly maybeChartError: Schema.Option<Schema.String>;
    readonly maybeSelectedDatumId: Schema.Option<Schema.String>;
}>;
export type Model = typeof Model.Type;
