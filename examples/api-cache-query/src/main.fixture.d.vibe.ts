import { Option } from 'effect';
import type { Post, PostDetail, Stats } from './data.vibe';
export declare const FETCHED_AT = 1750000000000;
export declare const fixturePosts: ReadonlyArray<Post>;
export declare const firstPostDetail: PostDetail;
export declare const fixtureStats: Stats;
export declare const loadingPostsModel: {
    readonly tabs: {
        readonly id: string;
        readonly maybeFocusedIndex: Option.Option<number>;
        readonly activationMode: "Automatic" | "Manual";
    };
    readonly activeTab: "Posts" | "Stats";
    readonly posts: {
        readonly data: import("foldkit/asyncData").AsyncData<{
            readonly posts: readonly {
                readonly id: string;
                readonly title: string;
                readonly excerpt: string;
            }[];
            readonly fetchedAt: number;
        }, string>;
        readonly generation: number;
    };
    readonly postDetails: {
        readonly generation: number;
        readonly entries: import("effect/HashMap").HashMap<string, {
            readonly args: {
                readonly postId: string;
            };
            readonly data: import("foldkit/asyncData").AsyncData<{
                readonly post: {
                    readonly id: string;
                    readonly title: string;
                    readonly author: string;
                    readonly body: string;
                };
                readonly fetchedAt: number;
            }, string>;
            readonly generation: number;
        }>;
    };
    readonly maybeSelectedPostId: Option.Option<string>;
    readonly stats: {
        readonly data: import("foldkit/asyncData").AsyncData<{
            readonly stats: {
                readonly activeUsers: number;
                readonly requestsPerSecond: number;
                readonly cacheHitRatePercent: number;
            };
            readonly fetchedAt: number;
        }, string>;
        readonly generation: number;
    };
};
export declare const loadedPostsModel: {
    readonly tabs: {
        readonly id: string;
        readonly maybeFocusedIndex: Option.Option<number>;
        readonly activationMode: "Automatic" | "Manual";
    };
    readonly activeTab: "Posts" | "Stats";
    readonly posts: {
        readonly data: import("foldkit/asyncData").AsyncData<{
            readonly posts: readonly {
                readonly id: string;
                readonly title: string;
                readonly excerpt: string;
            }[];
            readonly fetchedAt: number;
        }, string>;
        readonly generation: number;
    };
    readonly postDetails: {
        readonly generation: number;
        readonly entries: import("effect/HashMap").HashMap<string, {
            readonly args: {
                readonly postId: string;
            };
            readonly data: import("foldkit/asyncData").AsyncData<{
                readonly post: {
                    readonly id: string;
                    readonly title: string;
                    readonly author: string;
                    readonly body: string;
                };
                readonly fetchedAt: number;
            }, string>;
            readonly generation: number;
        }>;
    };
    readonly maybeSelectedPostId: Option.Option<string>;
    readonly stats: {
        readonly data: import("foldkit/asyncData").AsyncData<{
            readonly stats: {
                readonly activeUsers: number;
                readonly requestsPerSecond: number;
                readonly cacheHitRatePercent: number;
            };
            readonly fetchedAt: number;
        }, string>;
        readonly generation: number;
    };
};
export declare const failedPostsModel: {
    readonly tabs: {
        readonly id: string;
        readonly maybeFocusedIndex: Option.Option<number>;
        readonly activationMode: "Automatic" | "Manual";
    };
    readonly activeTab: "Posts" | "Stats";
    readonly posts: {
        readonly data: import("foldkit/asyncData").AsyncData<{
            readonly posts: readonly {
                readonly id: string;
                readonly title: string;
                readonly excerpt: string;
            }[];
            readonly fetchedAt: number;
        }, string>;
        readonly generation: number;
    };
    readonly postDetails: {
        readonly generation: number;
        readonly entries: import("effect/HashMap").HashMap<string, {
            readonly args: {
                readonly postId: string;
            };
            readonly data: import("foldkit/asyncData").AsyncData<{
                readonly post: {
                    readonly id: string;
                    readonly title: string;
                    readonly author: string;
                    readonly body: string;
                };
                readonly fetchedAt: number;
            }, string>;
            readonly generation: number;
        }>;
    };
    readonly maybeSelectedPostId: Option.Option<string>;
    readonly stats: {
        readonly data: import("foldkit/asyncData").AsyncData<{
            readonly stats: {
                readonly activeUsers: number;
                readonly requestsPerSecond: number;
                readonly cacheHitRatePercent: number;
            };
            readonly fetchedAt: number;
        }, string>;
        readonly generation: number;
    };
};
export declare const cachedFirstPostModel: {
    readonly tabs: {
        readonly id: string;
        readonly maybeFocusedIndex: Option.Option<number>;
        readonly activationMode: "Automatic" | "Manual";
    };
    readonly activeTab: "Posts" | "Stats";
    readonly posts: {
        readonly data: import("foldkit/asyncData").AsyncData<{
            readonly posts: readonly {
                readonly id: string;
                readonly title: string;
                readonly excerpt: string;
            }[];
            readonly fetchedAt: number;
        }, string>;
        readonly generation: number;
    };
    readonly postDetails: {
        readonly generation: number;
        readonly entries: import("effect/HashMap").HashMap<string, {
            readonly args: {
                readonly postId: string;
            };
            readonly data: import("foldkit/asyncData").AsyncData<{
                readonly post: {
                    readonly id: string;
                    readonly title: string;
                    readonly author: string;
                    readonly body: string;
                };
                readonly fetchedAt: number;
            }, string>;
            readonly generation: number;
        }>;
    };
    readonly maybeSelectedPostId: Option.Option<string>;
    readonly stats: {
        readonly data: import("foldkit/asyncData").AsyncData<{
            readonly stats: {
                readonly activeUsers: number;
                readonly requestsPerSecond: number;
                readonly cacheHitRatePercent: number;
            };
            readonly fetchedAt: number;
        }, string>;
        readonly generation: number;
    };
};
export declare const failedFirstPostModel: {
    readonly tabs: {
        readonly id: string;
        readonly maybeFocusedIndex: Option.Option<number>;
        readonly activationMode: "Automatic" | "Manual";
    };
    readonly activeTab: "Posts" | "Stats";
    readonly posts: {
        readonly data: import("foldkit/asyncData").AsyncData<{
            readonly posts: readonly {
                readonly id: string;
                readonly title: string;
                readonly excerpt: string;
            }[];
            readonly fetchedAt: number;
        }, string>;
        readonly generation: number;
    };
    readonly postDetails: {
        readonly generation: number;
        readonly entries: import("effect/HashMap").HashMap<string, {
            readonly args: {
                readonly postId: string;
            };
            readonly data: import("foldkit/asyncData").AsyncData<{
                readonly post: {
                    readonly id: string;
                    readonly title: string;
                    readonly author: string;
                    readonly body: string;
                };
                readonly fetchedAt: number;
            }, string>;
            readonly generation: number;
        }>;
    };
    readonly maybeSelectedPostId: Option.Option<string>;
    readonly stats: {
        readonly data: import("foldkit/asyncData").AsyncData<{
            readonly stats: {
                readonly activeUsers: number;
                readonly requestsPerSecond: number;
                readonly cacheHitRatePercent: number;
            };
            readonly fetchedAt: number;
        }, string>;
        readonly generation: number;
    };
};
export declare const loadingStatsModel: {
    readonly tabs: {
        readonly id: string;
        readonly maybeFocusedIndex: Option.Option<number>;
        readonly activationMode: "Automatic" | "Manual";
    };
    readonly activeTab: "Stats";
    readonly posts: {
        readonly data: import("foldkit/asyncData").AsyncData<{
            readonly posts: readonly {
                readonly id: string;
                readonly title: string;
                readonly excerpt: string;
            }[];
            readonly fetchedAt: number;
        }, string>;
        readonly generation: number;
    };
    readonly postDetails: {
        readonly generation: number;
        readonly entries: import("effect/HashMap").HashMap<string, {
            readonly args: {
                readonly postId: string;
            };
            readonly data: import("foldkit/asyncData").AsyncData<{
                readonly post: {
                    readonly id: string;
                    readonly title: string;
                    readonly author: string;
                    readonly body: string;
                };
                readonly fetchedAt: number;
            }, string>;
            readonly generation: number;
        }>;
    };
    readonly maybeSelectedPostId: Option.Option<string>;
    readonly stats: {
        readonly data: import("foldkit/asyncData").AsyncData<{
            readonly stats: {
                readonly activeUsers: number;
                readonly requestsPerSecond: number;
                readonly cacheHitRatePercent: number;
            };
            readonly fetchedAt: number;
        }, string>;
        readonly generation: number;
    };
};
export declare const loadedStatsModel: {
    readonly tabs: {
        readonly id: string;
        readonly maybeFocusedIndex: Option.Option<number>;
        readonly activationMode: "Automatic" | "Manual";
    };
    readonly activeTab: "Stats";
    readonly posts: {
        readonly data: import("foldkit/asyncData").AsyncData<{
            readonly posts: readonly {
                readonly id: string;
                readonly title: string;
                readonly excerpt: string;
            }[];
            readonly fetchedAt: number;
        }, string>;
        readonly generation: number;
    };
    readonly postDetails: {
        readonly generation: number;
        readonly entries: import("effect/HashMap").HashMap<string, {
            readonly args: {
                readonly postId: string;
            };
            readonly data: import("foldkit/asyncData").AsyncData<{
                readonly post: {
                    readonly id: string;
                    readonly title: string;
                    readonly author: string;
                    readonly body: string;
                };
                readonly fetchedAt: number;
            }, string>;
            readonly generation: number;
        }>;
    };
    readonly maybeSelectedPostId: Option.Option<string>;
    readonly stats: {
        readonly data: import("foldkit/asyncData").AsyncData<{
            readonly stats: {
                readonly activeUsers: number;
                readonly requestsPerSecond: number;
                readonly cacheHitRatePercent: number;
            };
            readonly fetchedAt: number;
        }, string>;
        readonly generation: number;
    };
};
export declare const refreshingStatsModel: {
    readonly tabs: {
        readonly id: string;
        readonly maybeFocusedIndex: Option.Option<number>;
        readonly activationMode: "Automatic" | "Manual";
    };
    readonly activeTab: "Stats";
    readonly posts: {
        readonly data: import("foldkit/asyncData").AsyncData<{
            readonly posts: readonly {
                readonly id: string;
                readonly title: string;
                readonly excerpt: string;
            }[];
            readonly fetchedAt: number;
        }, string>;
        readonly generation: number;
    };
    readonly postDetails: {
        readonly generation: number;
        readonly entries: import("effect/HashMap").HashMap<string, {
            readonly args: {
                readonly postId: string;
            };
            readonly data: import("foldkit/asyncData").AsyncData<{
                readonly post: {
                    readonly id: string;
                    readonly title: string;
                    readonly author: string;
                    readonly body: string;
                };
                readonly fetchedAt: number;
            }, string>;
            readonly generation: number;
        }>;
    };
    readonly maybeSelectedPostId: Option.Option<string>;
    readonly stats: {
        readonly data: import("foldkit/asyncData").AsyncData<{
            readonly stats: {
                readonly activeUsers: number;
                readonly requestsPerSecond: number;
                readonly cacheHitRatePercent: number;
            };
            readonly fetchedAt: number;
        }, string>;
        readonly generation: number;
    };
};
