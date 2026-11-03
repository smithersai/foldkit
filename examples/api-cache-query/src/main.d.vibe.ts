import { Option, Schema } from 'effect';
import { AsyncData, Runtime, Subscription, Update } from 'foldkit';
import { Query } from 'foldkit/experimental';
import { Document, Html, HtmlBuilder } from 'foldkit/html';
import { Tabs } from '@foldkit/ui';
export declare const TABS_ID = "api-cache-query-tabs";
export declare const postsQuery: Query.Query<"Posts", {
    readonly posts: readonly {
        readonly id: string;
        readonly title: string;
        readonly excerpt: string;
    }[];
    readonly fetchedAt: number;
}, {
    readonly posts: readonly {
        readonly id: string;
        readonly title: string;
        readonly excerpt: string;
    }[];
    readonly fetchedAt: number;
}, string, string, never>;
export declare const statsQuery: Query.Query<"Stats", {
    readonly stats: {
        readonly activeUsers: number;
        readonly requestsPerSecond: number;
        readonly cacheHitRatePercent: number;
    };
    readonly fetchedAt: number;
}, {
    readonly stats: {
        readonly activeUsers: number;
        readonly requestsPerSecond: number;
        readonly cacheHitRatePercent: number;
    };
    readonly fetchedAt: number;
}, string, string, never>;
export declare const postQuery: Query.KeyedQuery<"Post", {
    readonly post: {
        readonly id: string;
        readonly title: string;
        readonly author: string;
        readonly body: string;
    };
    readonly fetchedAt: number;
}, {
    readonly post: {
        readonly id: string;
        readonly title: string;
        readonly author: string;
        readonly body: string;
    };
    readonly fetchedAt: number;
}, string, string, {
    postId: Schema.String;
}, never>;
export declare const AppTabs: Readonly<{
    view: import("foldkit/submodel").View<{
        readonly id: string;
        readonly maybeFocusedIndex: Option.Option<number>;
        readonly activationMode: "Automatic" | "Manual";
    }, {
        readonly _tag: "CompletedFocusTab";
    } | {
        readonly _tag: "FocusedTab";
        readonly index: number;
    } | {
        readonly _tag: "SelectedTab";
        readonly index: number;
        readonly value: string;
    }, Readonly<{
        tabs: readonly ("Posts" | "Stats")[];
        selectedValue: "Posts" | "Stats";
        ariaLabel: string;
        toView: (render: Readonly<{
            tablist: readonly Readonly<{
                readonly __childAttribute: true;
                readonly attribute: unknown;
                readonly dispatch: import("../node_modules/foldkit/dist/html/runtimeSingleton").DispatchSync;
                readonly resolveUnmount: (message: unknown) => () => void;
                readonly boundaryMappers: ReadonlyArray<(message: unknown) => unknown>;
                readonly resolveMountDispatch?: import("../node_modules/foldkit/dist/html/runtimeSingleton").MountDispatchResolver;
            }>[];
            tabs: readonly Readonly<{
                value: "Posts" | "Stats";
                index: number;
                isActive: boolean;
                isFocused: boolean;
                isDisabled: boolean;
                tab: readonly Readonly<{
                    readonly __childAttribute: true;
                    readonly attribute: unknown;
                    readonly dispatch: import("../node_modules/foldkit/dist/html/runtimeSingleton").DispatchSync;
                    readonly resolveUnmount: (message: unknown) => () => void;
                    readonly boundaryMappers: ReadonlyArray<(message: unknown) => unknown>;
                    readonly resolveMountDispatch?: import("../node_modules/foldkit/dist/html/runtimeSingleton").MountDispatchResolver;
                }>[];
                panel: readonly Readonly<{
                    readonly __childAttribute: true;
                    readonly attribute: unknown;
                    readonly dispatch: import("../node_modules/foldkit/dist/html/runtimeSingleton").DispatchSync;
                    readonly resolveUnmount: (message: unknown) => () => void;
                    readonly boundaryMappers: ReadonlyArray<(message: unknown) => unknown>;
                    readonly resolveMountDispatch?: import("../node_modules/foldkit/dist/html/runtimeSingleton").MountDispatchResolver;
                }>[];
            }>[];
            activeIndex: number;
        }>) => Html;
        isTabDisabled?: (value: "Posts" | "Stats", index: number) => boolean;
        orientation?: Tabs.Orientation;
        panelMount?: Tabs.PanelMount;
    }>>;
    update: (model: Tabs.Model, message: Tabs.Message) => Readonly<{
        model: {
            readonly id: string;
            readonly maybeFocusedIndex: Option.Option<number>;
            readonly activationMode: "Automatic" | "Manual";
        };
        commands?: Update.Commands<{
            readonly _tag: "CompletedFocusTab";
        } | {
            readonly _tag: "FocusedTab";
            readonly index: number;
        } | {
            readonly _tag: "SelectedTab";
            readonly index: number;
            readonly value: string;
        }, never>;
        outMessage?: Readonly<{
            readonly _tag: 'Selected';
            readonly value: "Posts" | "Stats";
            readonly index: number;
        }>;
    }>;
}>;
export declare const Model: Schema.Struct<{
    readonly tabs: Schema.Struct<{
        readonly id: Schema.String;
        readonly maybeFocusedIndex: Schema.Option<Schema.Number>;
        readonly activationMode: Schema.Literals<readonly ["Automatic", "Manual"]>;
    }>;
    readonly activeTab: Schema.Literals<readonly ["Posts", "Stats"]>;
    readonly posts: Schema.Struct<{
        readonly data: Schema.Codec<AsyncData.AsyncData<{
            readonly posts: readonly {
                readonly id: string;
                readonly title: string;
                readonly excerpt: string;
            }[];
            readonly fetchedAt: number;
        }, string>, AsyncData.AsyncDataEncoded<{
            readonly posts: readonly {
                readonly id: string;
                readonly title: string;
                readonly excerpt: string;
            }[];
            readonly fetchedAt: number;
        }, string>, never, never>;
        readonly generation: Schema.Number;
    }>;
    readonly postDetails: Schema.Struct<{
        readonly generation: Schema.Number;
        readonly entries: Schema.HashMap<Schema.String, Schema.Struct<{
            readonly args: Schema.Struct<{
                postId: Schema.String;
            }>;
            readonly data: Schema.Codec<AsyncData.AsyncData<{
                readonly post: {
                    readonly id: string;
                    readonly title: string;
                    readonly author: string;
                    readonly body: string;
                };
                readonly fetchedAt: number;
            }, string>, AsyncData.AsyncDataEncoded<{
                readonly post: {
                    readonly id: string;
                    readonly title: string;
                    readonly author: string;
                    readonly body: string;
                };
                readonly fetchedAt: number;
            }, string>, never, never>;
            readonly generation: Schema.Number;
        }>>;
    }>;
    readonly maybeSelectedPostId: Schema.Option<Schema.String>;
    readonly stats: Schema.Struct<{
        readonly data: Schema.Codec<AsyncData.AsyncData<{
            readonly stats: {
                readonly activeUsers: number;
                readonly requestsPerSecond: number;
                readonly cacheHitRatePercent: number;
            };
            readonly fetchedAt: number;
        }, string>, AsyncData.AsyncDataEncoded<{
            readonly stats: {
                readonly activeUsers: number;
                readonly requestsPerSecond: number;
                readonly cacheHitRatePercent: number;
            };
            readonly fetchedAt: number;
        }, string>, never, never>;
        readonly generation: Schema.Number;
    }>;
}>;
export type Model = typeof Model.Type;
export declare const Message: import("foldkit/message").MessageUnion<{
    readonly GotTabsMessage: {
        message: import("foldkit/message").MessageUnion<{
            readonly SelectedTab: {
                index: Schema.Number;
                value: Schema.String;
            };
            readonly FocusedTab: {
                index: Schema.Number;
            };
            readonly CompletedFocusTab: {};
        }>;
    };
    readonly GotPostsMessage: {
        message: import("foldkit/message").MessageUnion<{
            readonly CompletedFetch: {
                generation: Schema.Number;
                result: Schema.Result<Schema.Codec<{
                    readonly posts: readonly {
                        readonly id: string;
                        readonly title: string;
                        readonly excerpt: string;
                    }[];
                    readonly fetchedAt: number;
                }, {
                    readonly posts: readonly {
                        readonly id: string;
                        readonly title: string;
                        readonly excerpt: string;
                    }[];
                    readonly fetchedAt: number;
                }, never, never>, Schema.Codec<string, string, never, never>>;
            };
        }>;
    };
    readonly GotStatsMessage: {
        message: import("foldkit/message").MessageUnion<{
            readonly CompletedFetch: {
                generation: Schema.Number;
                result: Schema.Result<Schema.Codec<{
                    readonly stats: {
                        readonly activeUsers: number;
                        readonly requestsPerSecond: number;
                        readonly cacheHitRatePercent: number;
                    };
                    readonly fetchedAt: number;
                }, {
                    readonly stats: {
                        readonly activeUsers: number;
                        readonly requestsPerSecond: number;
                        readonly cacheHitRatePercent: number;
                    };
                    readonly fetchedAt: number;
                }, never, never>, Schema.Codec<string, string, never, never>>;
            };
        }>;
    };
    readonly GotPostMessage: {
        message: import("foldkit/message").MessageUnion<{
            readonly CompletedFetch: {
                args: Schema.Struct<{
                    postId: Schema.String;
                }>;
                generation: Schema.Number;
                result: Schema.Result<Schema.Codec<{
                    readonly post: {
                        readonly id: string;
                        readonly title: string;
                        readonly author: string;
                        readonly body: string;
                    };
                    readonly fetchedAt: number;
                }, {
                    readonly post: {
                        readonly id: string;
                        readonly title: string;
                        readonly author: string;
                        readonly body: string;
                    };
                    readonly fetchedAt: number;
                }, never, never>, Schema.Codec<string, string, never, never>>;
            };
        }>;
    };
    readonly ClickedPost: {
        postId: Schema.String;
    };
    readonly ClickedBackToPosts: {};
    readonly ClickedRefreshPosts: {};
    readonly ClickedRetryPosts: {};
    readonly ClickedRetryPost: {
        postId: Schema.String;
    };
    readonly ClickedRefreshStats: {};
    readonly ClickedRetryStats: {};
    readonly TickedStatsRefreshInterval: {};
}>;
export type Message = typeof Message.Type;
export declare const update: (model: Model, message: Message) => Readonly<{
    model: {
        readonly tabs: {
            readonly id: string;
            readonly maybeFocusedIndex: Option.Option<number>;
            readonly activationMode: "Automatic" | "Manual";
        };
        readonly activeTab: "Posts" | "Stats";
        readonly posts: {
            readonly data: AsyncData.AsyncData<{
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
                readonly data: AsyncData.AsyncData<{
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
            readonly data: AsyncData.AsyncData<{
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
    commands?: Update.Commands<{
        readonly _tag: "ClickedBackToPosts";
    } | {
        readonly _tag: "ClickedRefreshPosts";
    } | {
        readonly _tag: "ClickedRefreshStats";
    } | {
        readonly _tag: "ClickedRetryPosts";
    } | {
        readonly _tag: "ClickedRetryStats";
    } | {
        readonly _tag: "TickedStatsRefreshInterval";
    } | {
        readonly _tag: "ClickedPost";
        readonly postId: string;
    } | {
        readonly _tag: "ClickedRetryPost";
        readonly postId: string;
    } | {
        readonly _tag: "GotPostMessage";
        readonly message: {
            readonly _tag: "CompletedFetch";
            readonly args: {
                readonly postId: string;
            };
            readonly generation: number;
            readonly result: import("effect/Result").Result<{
                readonly post: {
                    readonly id: string;
                    readonly title: string;
                    readonly author: string;
                    readonly body: string;
                };
                readonly fetchedAt: number;
            }, string>;
        };
    } | {
        readonly _tag: "GotPostsMessage";
        readonly message: {
            readonly _tag: "CompletedFetch";
            readonly generation: number;
            readonly result: import("effect/Result").Result<{
                readonly posts: readonly {
                    readonly id: string;
                    readonly title: string;
                    readonly excerpt: string;
                }[];
                readonly fetchedAt: number;
            }, string>;
        };
    } | {
        readonly _tag: "GotStatsMessage";
        readonly message: {
            readonly _tag: "CompletedFetch";
            readonly generation: number;
            readonly result: import("effect/Result").Result<{
                readonly stats: {
                    readonly activeUsers: number;
                    readonly requestsPerSecond: number;
                    readonly cacheHitRatePercent: number;
                };
                readonly fetchedAt: number;
            }, string>;
        };
    } | {
        readonly _tag: "GotTabsMessage";
        readonly message: {
            readonly _tag: "CompletedFocusTab";
        } | {
            readonly _tag: "FocusedTab";
            readonly index: number;
        } | {
            readonly _tag: "SelectedTab";
            readonly index: number;
            readonly value: string;
        };
    }, never>;
    outMessage?: never;
}>;
export declare const init: Runtime.ApplicationInit<Model, Message>;
export declare const subscriptions: {
    readonly revalidateStats: Subscription.EntryWithoutKeepAlive<{
        readonly tabs: {
            readonly id: string;
            readonly maybeFocusedIndex: Option.Option<number>;
            readonly activationMode: "Automatic" | "Manual";
        };
        readonly activeTab: "Posts" | "Stats";
        readonly posts: {
            readonly data: AsyncData.AsyncData<{
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
                readonly data: AsyncData.AsyncData<{
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
            readonly data: AsyncData.AsyncData<{
                readonly stats: {
                    readonly activeUsers: number;
                    readonly requestsPerSecond: number;
                    readonly cacheHitRatePercent: number;
                };
                readonly fetchedAt: number;
            }, string>;
            readonly generation: number;
        };
    }, {
        readonly _tag: "ClickedBackToPosts";
    } | {
        readonly _tag: "ClickedRefreshPosts";
    } | {
        readonly _tag: "ClickedRefreshStats";
    } | {
        readonly _tag: "ClickedRetryPosts";
    } | {
        readonly _tag: "ClickedRetryStats";
    } | {
        readonly _tag: "TickedStatsRefreshInterval";
    } | {
        readonly _tag: "ClickedPost";
        readonly postId: string;
    } | {
        readonly _tag: "ClickedRetryPost";
        readonly postId: string;
    } | {
        readonly _tag: "GotPostMessage";
        readonly message: {
            readonly _tag: "CompletedFetch";
            readonly args: {
                readonly postId: string;
            };
            readonly generation: number;
            readonly result: import("effect/Result").Result<{
                readonly post: {
                    readonly id: string;
                    readonly title: string;
                    readonly author: string;
                    readonly body: string;
                };
                readonly fetchedAt: number;
            }, string>;
        };
    } | {
        readonly _tag: "GotPostsMessage";
        readonly message: {
            readonly _tag: "CompletedFetch";
            readonly generation: number;
            readonly result: import("effect/Result").Result<{
                readonly posts: readonly {
                    readonly id: string;
                    readonly title: string;
                    readonly excerpt: string;
                }[];
                readonly fetchedAt: number;
            }, string>;
        };
    } | {
        readonly _tag: "GotStatsMessage";
        readonly message: {
            readonly _tag: "CompletedFetch";
            readonly generation: number;
            readonly result: import("effect/Result").Result<{
                readonly stats: {
                    readonly activeUsers: number;
                    readonly requestsPerSecond: number;
                    readonly cacheHitRatePercent: number;
                };
                readonly fetchedAt: number;
            }, string>;
        };
    } | {
        readonly _tag: "GotTabsMessage";
        readonly message: {
            readonly _tag: "CompletedFocusTab";
        } | {
            readonly _tag: "FocusedTab";
            readonly index: number;
        } | {
            readonly _tag: "SelectedTab";
            readonly index: number;
            readonly value: string;
        };
    }, {
        readonly isStatsRefreshActive: boolean;
    }, never> & {
        readonly __subscription: never;
    };
};
export declare const view: (model: Model, h: HtmlBuilder<Message>) => Document;
