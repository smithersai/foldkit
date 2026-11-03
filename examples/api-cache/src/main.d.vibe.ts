import { Effect, HashMap, Option, Schema } from 'effect';
import { AsyncData, Command, Runtime, Subscription, Update } from 'foldkit';
import { Document, Html, HtmlBuilder } from 'foldkit/html';
import { Tabs } from '@foldkit/ui';
export declare const TABS_ID = "api-cache-tabs";
export declare const PostsData: Readonly<{
    schema: Schema.Codec<AsyncData.AsyncData<{
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
    Idle: typeof AsyncData.Idle;
    Loading: typeof AsyncData.Loading;
    Refreshing: (payload: Readonly<{
        data: {
            readonly posts: readonly {
                readonly id: string;
                readonly title: string;
                readonly excerpt: string;
            }[];
            readonly fetchedAt: number;
        };
    }>) => AsyncData.AsyncData<{
        readonly posts: readonly {
            readonly id: string;
            readonly title: string;
            readonly excerpt: string;
        }[];
        readonly fetchedAt: number;
    }, string>;
    Failure: (payload: Readonly<{
        error: string;
    }>) => AsyncData.AsyncData<{
        readonly posts: readonly {
            readonly id: string;
            readonly title: string;
            readonly excerpt: string;
        }[];
        readonly fetchedAt: number;
    }, string>;
    Stale: (payload: Readonly<{
        error: string;
        data: {
            readonly posts: readonly {
                readonly id: string;
                readonly title: string;
                readonly excerpt: string;
            }[];
            readonly fetchedAt: number;
        };
    }>) => AsyncData.AsyncData<{
        readonly posts: readonly {
            readonly id: string;
            readonly title: string;
            readonly excerpt: string;
        }[];
        readonly fetchedAt: number;
    }, string>;
    Success: (payload: Readonly<{
        data: {
            readonly posts: readonly {
                readonly id: string;
                readonly title: string;
                readonly excerpt: string;
            }[];
            readonly fetchedAt: number;
        };
    }>) => AsyncData.AsyncData<{
        readonly posts: readonly {
            readonly id: string;
            readonly title: string;
            readonly excerpt: string;
        }[];
        readonly fetchedAt: number;
    }, string>;
}>;
export declare const PostDetailData: Readonly<{
    schema: Schema.Codec<AsyncData.AsyncData<{
        readonly detail: {
            readonly id: string;
            readonly title: string;
            readonly author: string;
            readonly body: string;
        };
        readonly fetchedAt: number;
    }, string>, AsyncData.AsyncDataEncoded<{
        readonly detail: {
            readonly id: string;
            readonly title: string;
            readonly author: string;
            readonly body: string;
        };
        readonly fetchedAt: number;
    }, string>, never, never>;
    Idle: typeof AsyncData.Idle;
    Loading: typeof AsyncData.Loading;
    Refreshing: (payload: Readonly<{
        data: {
            readonly detail: {
                readonly id: string;
                readonly title: string;
                readonly author: string;
                readonly body: string;
            };
            readonly fetchedAt: number;
        };
    }>) => AsyncData.AsyncData<{
        readonly detail: {
            readonly id: string;
            readonly title: string;
            readonly author: string;
            readonly body: string;
        };
        readonly fetchedAt: number;
    }, string>;
    Failure: (payload: Readonly<{
        error: string;
    }>) => AsyncData.AsyncData<{
        readonly detail: {
            readonly id: string;
            readonly title: string;
            readonly author: string;
            readonly body: string;
        };
        readonly fetchedAt: number;
    }, string>;
    Stale: (payload: Readonly<{
        error: string;
        data: {
            readonly detail: {
                readonly id: string;
                readonly title: string;
                readonly author: string;
                readonly body: string;
            };
            readonly fetchedAt: number;
        };
    }>) => AsyncData.AsyncData<{
        readonly detail: {
            readonly id: string;
            readonly title: string;
            readonly author: string;
            readonly body: string;
        };
        readonly fetchedAt: number;
    }, string>;
    Success: (payload: Readonly<{
        data: {
            readonly detail: {
                readonly id: string;
                readonly title: string;
                readonly author: string;
                readonly body: string;
            };
            readonly fetchedAt: number;
        };
    }>) => AsyncData.AsyncData<{
        readonly detail: {
            readonly id: string;
            readonly title: string;
            readonly author: string;
            readonly body: string;
        };
        readonly fetchedAt: number;
    }, string>;
}>;
export declare const StatsData: Readonly<{
    schema: Schema.Codec<AsyncData.AsyncData<{
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
    Idle: typeof AsyncData.Idle;
    Loading: typeof AsyncData.Loading;
    Refreshing: (payload: Readonly<{
        data: {
            readonly stats: {
                readonly activeUsers: number;
                readonly requestsPerSecond: number;
                readonly cacheHitRatePercent: number;
            };
            readonly fetchedAt: number;
        };
    }>) => AsyncData.AsyncData<{
        readonly stats: {
            readonly activeUsers: number;
            readonly requestsPerSecond: number;
            readonly cacheHitRatePercent: number;
        };
        readonly fetchedAt: number;
    }, string>;
    Failure: (payload: Readonly<{
        error: string;
    }>) => AsyncData.AsyncData<{
        readonly stats: {
            readonly activeUsers: number;
            readonly requestsPerSecond: number;
            readonly cacheHitRatePercent: number;
        };
        readonly fetchedAt: number;
    }, string>;
    Stale: (payload: Readonly<{
        error: string;
        data: {
            readonly stats: {
                readonly activeUsers: number;
                readonly requestsPerSecond: number;
                readonly cacheHitRatePercent: number;
            };
            readonly fetchedAt: number;
        };
    }>) => AsyncData.AsyncData<{
        readonly stats: {
            readonly activeUsers: number;
            readonly requestsPerSecond: number;
            readonly cacheHitRatePercent: number;
        };
        readonly fetchedAt: number;
    }, string>;
    Success: (payload: Readonly<{
        data: {
            readonly stats: {
                readonly activeUsers: number;
                readonly requestsPerSecond: number;
                readonly cacheHitRatePercent: number;
            };
            readonly fetchedAt: number;
        };
    }>) => AsyncData.AsyncData<{
        readonly stats: {
            readonly activeUsers: number;
            readonly requestsPerSecond: number;
            readonly cacheHitRatePercent: number;
        };
        readonly fetchedAt: number;
    }, string>;
}>;
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
    readonly posts: Schema.Codec<AsyncData.AsyncData<{
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
    readonly postDetailById: Schema.HashMap<Schema.String, Schema.Codec<AsyncData.AsyncData<{
        readonly detail: {
            readonly id: string;
            readonly title: string;
            readonly author: string;
            readonly body: string;
        };
        readonly fetchedAt: number;
    }, string>, AsyncData.AsyncDataEncoded<{
        readonly detail: {
            readonly id: string;
            readonly title: string;
            readonly author: string;
            readonly body: string;
        };
        readonly fetchedAt: number;
    }, string>, never, never>>;
    readonly maybeSelectedPostId: Schema.Option<Schema.String>;
    readonly stats: Schema.Codec<AsyncData.AsyncData<{
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
    readonly ClickedPost: {
        postId: Schema.String;
    };
    readonly ClickedBackToPosts: {};
    readonly ClickedInvalidatePosts: {};
    readonly ClickedRetryPosts: {};
    readonly ClickedRetryPostDetail: {
        postId: Schema.String;
    };
    readonly ClickedRefreshStats: {};
    readonly ClickedRetryStats: {};
    readonly TickedRevalidateStats: {};
    readonly SettledFetchPosts: {
        result: Schema.Result<Schema.Struct<{
            readonly posts: Schema.$Array<Schema.Struct<{
                readonly id: Schema.String;
                readonly title: Schema.String;
                readonly excerpt: Schema.String;
            }>>;
            readonly fetchedAt: Schema.Number;
        }>, Schema.String>;
    };
    readonly SettledFetchPostDetail: {
        postId: Schema.String;
        result: Schema.Result<Schema.Struct<{
            readonly detail: Schema.Struct<{
                readonly id: Schema.String;
                readonly title: Schema.String;
                readonly author: Schema.String;
                readonly body: Schema.String;
            }>;
            readonly fetchedAt: Schema.Number;
        }>, Schema.String>;
    };
    readonly SettledFetchStats: {
        result: Schema.Result<Schema.Struct<{
            readonly stats: Schema.Struct<{
                readonly activeUsers: Schema.Number;
                readonly requestsPerSecond: Schema.Number;
                readonly cacheHitRatePercent: Schema.Number;
            }>;
            readonly fetchedAt: Schema.Number;
        }>, Schema.String>;
    };
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
        readonly posts: AsyncData.AsyncData<{
            readonly posts: readonly {
                readonly id: string;
                readonly title: string;
                readonly excerpt: string;
            }[];
            readonly fetchedAt: number;
        }, string>;
        readonly postDetailById: HashMap.HashMap<string, AsyncData.AsyncData<{
            readonly detail: {
                readonly id: string;
                readonly title: string;
                readonly author: string;
                readonly body: string;
            };
            readonly fetchedAt: number;
        }, string>>;
        readonly maybeSelectedPostId: Option.Option<string>;
        readonly stats: AsyncData.AsyncData<{
            readonly stats: {
                readonly activeUsers: number;
                readonly requestsPerSecond: number;
                readonly cacheHitRatePercent: number;
            };
            readonly fetchedAt: number;
        }, string>;
    };
    commands?: Update.Commands<{
        readonly _tag: "ClickedBackToPosts";
    } | {
        readonly _tag: "ClickedInvalidatePosts";
    } | {
        readonly _tag: "ClickedRefreshStats";
    } | {
        readonly _tag: "ClickedRetryPosts";
    } | {
        readonly _tag: "ClickedRetryStats";
    } | {
        readonly _tag: "TickedRevalidateStats";
    } | {
        readonly _tag: "ClickedPost";
        readonly postId: string;
    } | {
        readonly _tag: "ClickedRetryPostDetail";
        readonly postId: string;
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
    } | {
        readonly _tag: "SettledFetchPostDetail";
        readonly postId: string;
        readonly result: import("effect/Result").Result<{
            readonly detail: {
                readonly id: string;
                readonly title: string;
                readonly author: string;
                readonly body: string;
            };
            readonly fetchedAt: number;
        }, string>;
    } | {
        readonly _tag: "SettledFetchPosts";
        readonly result: import("effect/Result").Result<{
            readonly posts: readonly {
                readonly id: string;
                readonly title: string;
                readonly excerpt: string;
            }[];
            readonly fetchedAt: number;
        }, string>;
    } | {
        readonly _tag: "SettledFetchStats";
        readonly result: import("effect/Result").Result<{
            readonly stats: {
                readonly activeUsers: number;
                readonly requestsPerSecond: number;
                readonly cacheHitRatePercent: number;
            };
            readonly fetchedAt: number;
        }, string>;
    }, never>;
    outMessage?: never;
}>;
export declare const init: Runtime.ApplicationInit<Model, Message>;
export declare const FetchPosts: Command.CommandDefinitionNoArgs<"FetchPosts", Effect.Effect<{
    readonly _tag: "SettledFetchPosts";
    readonly result: import("effect/Result").Result<{
        readonly posts: readonly {
            readonly id: string;
            readonly title: string;
            readonly excerpt: string;
        }[];
        readonly fetchedAt: number;
    }, string>;
}, never, never>>;
export declare const FetchPostDetail: Command.CommandDefinitionWithArgs<"FetchPostDetail", {
    postId: Schema.String;
}, Effect.Effect<{
    readonly _tag: "SettledFetchPostDetail";
    readonly postId: string;
    readonly result: import("effect/Result").Result<{
        readonly detail: {
            readonly id: string;
            readonly title: string;
            readonly author: string;
            readonly body: string;
        };
        readonly fetchedAt: number;
    }, string>;
}, never, never>>;
export declare const FetchStats: Command.CommandDefinitionNoArgs<"FetchStats", Effect.Effect<{
    readonly _tag: "SettledFetchStats";
    readonly result: import("effect/Result").Result<{
        readonly stats: {
            readonly activeUsers: number;
            readonly requestsPerSecond: number;
            readonly cacheHitRatePercent: number;
        };
        readonly fetchedAt: number;
    }, string>;
}, never, never>>;
export declare const subscriptions: {
    readonly revalidateStats: Subscription.EntryWithoutKeepAlive<{
        readonly tabs: {
            readonly id: string;
            readonly maybeFocusedIndex: Option.Option<number>;
            readonly activationMode: "Automatic" | "Manual";
        };
        readonly activeTab: "Posts" | "Stats";
        readonly posts: AsyncData.AsyncData<{
            readonly posts: readonly {
                readonly id: string;
                readonly title: string;
                readonly excerpt: string;
            }[];
            readonly fetchedAt: number;
        }, string>;
        readonly postDetailById: HashMap.HashMap<string, AsyncData.AsyncData<{
            readonly detail: {
                readonly id: string;
                readonly title: string;
                readonly author: string;
                readonly body: string;
            };
            readonly fetchedAt: number;
        }, string>>;
        readonly maybeSelectedPostId: Option.Option<string>;
        readonly stats: AsyncData.AsyncData<{
            readonly stats: {
                readonly activeUsers: number;
                readonly requestsPerSecond: number;
                readonly cacheHitRatePercent: number;
            };
            readonly fetchedAt: number;
        }, string>;
    }, {
        readonly _tag: "ClickedBackToPosts";
    } | {
        readonly _tag: "ClickedInvalidatePosts";
    } | {
        readonly _tag: "ClickedRefreshStats";
    } | {
        readonly _tag: "ClickedRetryPosts";
    } | {
        readonly _tag: "ClickedRetryStats";
    } | {
        readonly _tag: "TickedRevalidateStats";
    } | {
        readonly _tag: "ClickedPost";
        readonly postId: string;
    } | {
        readonly _tag: "ClickedRetryPostDetail";
        readonly postId: string;
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
    } | {
        readonly _tag: "SettledFetchPostDetail";
        readonly postId: string;
        readonly result: import("effect/Result").Result<{
            readonly detail: {
                readonly id: string;
                readonly title: string;
                readonly author: string;
                readonly body: string;
            };
            readonly fetchedAt: number;
        }, string>;
    } | {
        readonly _tag: "SettledFetchPosts";
        readonly result: import("effect/Result").Result<{
            readonly posts: readonly {
                readonly id: string;
                readonly title: string;
                readonly excerpt: string;
            }[];
            readonly fetchedAt: number;
        }, string>;
    } | {
        readonly _tag: "SettledFetchStats";
        readonly result: import("effect/Result").Result<{
            readonly stats: {
                readonly activeUsers: number;
                readonly requestsPerSecond: number;
                readonly cacheHitRatePercent: number;
            };
            readonly fetchedAt: number;
        }, string>;
    }, {
        readonly isObservingStats: boolean;
    }, never> & {
        readonly __subscription: never;
    };
};
export declare const view: (model: Model, h: HtmlBuilder<Message>) => Document;
