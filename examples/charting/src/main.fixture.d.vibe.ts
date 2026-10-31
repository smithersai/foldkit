import { Option } from "effect";
export declare const sampleTelemetry: {
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
export declare const loadingModel: {
    readonly telemetry: import("foldkit/asyncData").AsyncData<{
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
    }, string>;
    readonly chartMode: "Adoption" | "Ecosystem" | "Velocity";
    readonly chartModeRadioGroup: {
        readonly id: string;
        readonly maybeFocusedIndex: Option.Option<number>;
    };
    readonly selectedPackageId: "Core" | "Devtools" | "Ui" | "VitePlugin";
    readonly packageRadioGroup: {
        readonly id: string;
        readonly maybeFocusedIndex: Option.Option<number>;
    };
    readonly period: "LastEightWeeks" | "LastSixteenWeeks" | "LastYear";
    readonly periodRadioGroup: {
        readonly id: string;
        readonly maybeFocusedIndex: Option.Option<number>;
    };
    readonly maybeChartHostId: Option.Option<string>;
    readonly maybeChartError: Option.Option<string>;
    readonly maybeSelectedDatumId: Option.Option<string>;
};
export declare const readyModel: {
    readonly telemetry: import("foldkit/asyncData").AsyncData<{
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
    }, string>;
    readonly chartMode: "Adoption" | "Ecosystem" | "Velocity";
    readonly chartModeRadioGroup: {
        readonly id: string;
        readonly maybeFocusedIndex: Option.Option<number>;
    };
    readonly selectedPackageId: "Core" | "Devtools" | "Ui" | "VitePlugin";
    readonly packageRadioGroup: {
        readonly id: string;
        readonly maybeFocusedIndex: Option.Option<number>;
    };
    readonly period: "LastEightWeeks" | "LastSixteenWeeks" | "LastYear";
    readonly periodRadioGroup: {
        readonly id: string;
        readonly maybeFocusedIndex: Option.Option<number>;
    };
    readonly maybeChartHostId: Option.Option<string>;
    readonly maybeChartError: Option.Option<string>;
    readonly maybeSelectedDatumId: Option.Option<string>;
};
