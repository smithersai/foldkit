import { Deferred, Effect, FiberMap, Option, Schema } from 'effect';
import { Command, ManagedResource, Mount, Submodel, Update } from 'foldkit';
export declare const Model: Schema.Struct<{
    readonly slug: Schema.String;
    readonly state: import("foldkit/schema").TaggedUnion<{
        readonly Idle: {};
        readonly Booting: {};
        readonly Booted: {
            preview: import("foldkit/schema").TaggedUnion<{
                readonly Loading: {
                    previewUrl: Schema.String;
                };
                readonly Loaded: {
                    previewUrl: Schema.String;
                };
            }>;
        };
        readonly Failed: {
            reason: Schema.String;
        };
    }>;
    readonly files: Schema.$Record<Schema.String, Schema.String>;
    readonly fileTabs: Schema.Struct<{
        readonly id: Schema.String;
        readonly maybeFocusedIndex: Schema.Option<Schema.Number>;
        readonly activationMode: Schema.Literals<readonly ["Automatic", "Manual"]>;
    }>;
    readonly activeFilePath: Schema.String;
    readonly dirtyPaths: Schema.$Array<Schema.String>;
    readonly lastWriteError: Schema.Option<Schema.String>;
}>;
export type Model = typeof Model.Type;
export declare const Message: import("foldkit/message").MessageUnion<{
    readonly BootedPlayground: {
        previewUrl: Schema.String;
    };
    readonly FailedBootPlayground: {
        reason: Schema.String;
    };
    readonly ReleasedPlayground: {};
    readonly LoadedPlaygroundPreview: {
        previewUrl: Schema.String;
    };
    readonly GotFileTabsMessage: {
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
    readonly EditedPlaygroundFile: {
        path: Schema.String;
        content: Schema.String;
    };
    readonly SucceededMountPlaygroundEditor: {};
    readonly FailedMountPlaygroundEditor: {
        reason: Schema.String;
    };
    readonly ScheduledWritePlaygroundFile: {};
    readonly FailedWritePlaygroundFile: {
        reason: Schema.String;
    };
    readonly CompletedWaitForPlaygroundServerFailure: {
        reason: Schema.String;
    };
}>;
export type Message = typeof Message.Type;
export declare const init: (slug: string) => Model;
declare const WebContainerPlayground: ManagedResource.ManagedResource<Readonly<{
    container: import("@webcontainer/api").WebContainer;
    previewUrl: string;
    pendingWrites: FiberMap.FiberMap<string, void, never>;
    serverFailure: Deferred.Deferred<never, Error>;
}>, ManagedResource.ManagedResourceService<"WebContainerPlayground">>;
export type WebContainerPlaygroundService = ManagedResource.ServiceOf<typeof WebContainerPlayground>;
export declare const managedResources: {
    webContainerPlayground: ManagedResource.Entry<{
        readonly slug: string;
        readonly state: {
            readonly _tag: "Booting";
        } | {
            readonly _tag: "Idle";
        } | {
            readonly _tag: "Booted";
            readonly preview: {
                readonly _tag: "Loaded";
                readonly previewUrl: string;
            } | {
                readonly _tag: "Loading";
                readonly previewUrl: string;
            };
        } | {
            readonly _tag: "Failed";
            readonly reason: string;
        };
        readonly files: {
            readonly [x: string]: string;
        };
        readonly fileTabs: {
            readonly id: string;
            readonly maybeFocusedIndex: Option.Option<number>;
            readonly activationMode: "Automatic" | "Manual";
        };
        readonly activeFilePath: string;
        readonly dirtyPaths: readonly string[];
        readonly lastWriteError: Option.Option<string>;
    }, {
        readonly _tag: "ReleasedPlayground";
    } | {
        readonly _tag: "ScheduledWritePlaygroundFile";
    } | {
        readonly _tag: "SucceededMountPlaygroundEditor";
    } | {
        readonly _tag: "BootedPlayground";
        readonly previewUrl: string;
    } | {
        readonly _tag: "CompletedWaitForPlaygroundServerFailure";
        readonly reason: string;
    } | {
        readonly _tag: "EditedPlaygroundFile";
        readonly path: string;
        readonly content: string;
    } | {
        readonly _tag: "FailedBootPlayground";
        readonly reason: string;
    } | {
        readonly _tag: "FailedMountPlaygroundEditor";
        readonly reason: string;
    } | {
        readonly _tag: "FailedWritePlaygroundFile";
        readonly reason: string;
    } | {
        readonly _tag: "GotFileTabsMessage";
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
        readonly _tag: "LoadedPlaygroundPreview";
        readonly previewUrl: string;
    }, Option.Option<{
        readonly slug: string;
    }>, Readonly<{
        container: import("@webcontainer/api").WebContainer;
        previewUrl: string;
        pendingWrites: FiberMap.FiberMap<string, void, never>;
        serverFailure: Deferred.Deferred<never, Error>;
    }>, ManagedResource.ManagedResourceService<"WebContainerPlayground">, ({ previewUrl }: Readonly<{
        container: import("@webcontainer/api").WebContainer;
        previewUrl: string;
        pendingWrites: FiberMap.FiberMap<string, void, never>;
        serverFailure: Deferred.Deferred<never, Error>;
    }> | Readonly<{
        container: import("@webcontainer/api").WebContainer;
        previewUrl: string;
        pendingWrites: FiberMap.FiberMap<string, void, never>;
        serverFailure: Deferred.Deferred<never, Error>;
    }>) => {
        readonly _tag: "BootedPlayground";
        readonly previewUrl: string;
    }>;
};
export declare const PlaygroundEditor: Mount.MountDefinitionWithArgs<"PlaygroundEditor", {
    path: Schema.String;
    initialContent: Schema.String;
    files: Schema.$Record<Schema.String, Schema.String>;
}, {
    readonly _tag: "SucceededMountPlaygroundEditor";
} | {
    readonly _tag: "EditedPlaygroundFile";
    readonly path: string;
    readonly content: string;
} | {
    readonly _tag: "FailedMountPlaygroundEditor";
    readonly reason: string;
}>;
export declare const WaitForPlaygroundServerFailure: Command.CommandDefinitionNoArgs<"WaitForPlaygroundServerFailure", Effect.Effect<{
    readonly _tag: "CompletedWaitForPlaygroundServerFailure";
    readonly reason: string;
}, never, ManagedResource.ManagedResourceService<"WebContainerPlayground">>>;
export declare const WritePlaygroundFile: Command.CommandDefinitionWithArgs<"WritePlaygroundFile", {
    path: Schema.String;
    content: Schema.String;
}, Effect.Effect<{
    readonly _tag: "ScheduledWritePlaygroundFile";
} | {
    readonly _tag: "FailedWritePlaygroundFile";
    readonly reason: string;
}, never, ManagedResource.ManagedResourceService<"WebContainerPlayground">>>;
export declare const update: (model: Model, message: Message) => Readonly<{
    model: {
        readonly slug: string;
        readonly state: {
            readonly _tag: "Booting";
        } | {
            readonly _tag: "Idle";
        } | {
            readonly _tag: "Booted";
            readonly preview: {
                readonly _tag: "Loaded";
                readonly previewUrl: string;
            } | {
                readonly _tag: "Loading";
                readonly previewUrl: string;
            };
        } | {
            readonly _tag: "Failed";
            readonly reason: string;
        };
        readonly files: {
            readonly [x: string]: string;
        };
        readonly fileTabs: {
            readonly id: string;
            readonly maybeFocusedIndex: Option.Option<number>;
            readonly activationMode: "Automatic" | "Manual";
        };
        readonly activeFilePath: string;
        readonly dirtyPaths: readonly string[];
        readonly lastWriteError: Option.Option<string>;
    };
    commands?: Update.Commands<{
        readonly _tag: "ReleasedPlayground";
    } | {
        readonly _tag: "ScheduledWritePlaygroundFile";
    } | {
        readonly _tag: "SucceededMountPlaygroundEditor";
    } | {
        readonly _tag: "BootedPlayground";
        readonly previewUrl: string;
    } | {
        readonly _tag: "CompletedWaitForPlaygroundServerFailure";
        readonly reason: string;
    } | {
        readonly _tag: "EditedPlaygroundFile";
        readonly path: string;
        readonly content: string;
    } | {
        readonly _tag: "FailedBootPlayground";
        readonly reason: string;
    } | {
        readonly _tag: "FailedMountPlaygroundEditor";
        readonly reason: string;
    } | {
        readonly _tag: "FailedWritePlaygroundFile";
        readonly reason: string;
    } | {
        readonly _tag: "GotFileTabsMessage";
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
        readonly _tag: "LoadedPlaygroundPreview";
        readonly previewUrl: string;
    }, ManagedResource.ManagedResourceService<"WebContainerPlayground">>;
    outMessage?: never;
}>;
export declare const view: Submodel.View<{
    readonly slug: string;
    readonly state: {
        readonly _tag: "Booting";
    } | {
        readonly _tag: "Idle";
    } | {
        readonly _tag: "Booted";
        readonly preview: {
            readonly _tag: "Loaded";
            readonly previewUrl: string;
        } | {
            readonly _tag: "Loading";
            readonly previewUrl: string;
        };
    } | {
        readonly _tag: "Failed";
        readonly reason: string;
    };
    readonly files: {
        readonly [x: string]: string;
    };
    readonly fileTabs: {
        readonly id: string;
        readonly maybeFocusedIndex: Option.Option<number>;
        readonly activationMode: "Automatic" | "Manual";
    };
    readonly activeFilePath: string;
    readonly dirtyPaths: readonly string[];
    readonly lastWriteError: Option.Option<string>;
}, {
    readonly _tag: "ReleasedPlayground";
} | {
    readonly _tag: "ScheduledWritePlaygroundFile";
} | {
    readonly _tag: "SucceededMountPlaygroundEditor";
} | {
    readonly _tag: "BootedPlayground";
    readonly previewUrl: string;
} | {
    readonly _tag: "CompletedWaitForPlaygroundServerFailure";
    readonly reason: string;
} | {
    readonly _tag: "EditedPlaygroundFile";
    readonly path: string;
    readonly content: string;
} | {
    readonly _tag: "FailedBootPlayground";
    readonly reason: string;
} | {
    readonly _tag: "FailedMountPlaygroundEditor";
    readonly reason: string;
} | {
    readonly _tag: "FailedWritePlaygroundFile";
    readonly reason: string;
} | {
    readonly _tag: "GotFileTabsMessage";
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
    readonly _tag: "LoadedPlaygroundPreview";
    readonly previewUrl: string;
}, Readonly<{
    maybeIsPlaygroundSupported: Option.Option<boolean>;
}>>;
export {};
