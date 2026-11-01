import { Effect, Option, Schema } from 'effect';
import { AsyncData, Command, Submodel, Update } from 'foldkit';
import { CodeBlock } from '../../component/index.js';
import type { TableOfContentsEntry } from '../../tableOfContentsEntry.js';
import { Message } from './message.vibe';
import { type Model } from './model.vibe';
import { ExampleSources } from './sources.vibe';
export { Message } from './message.vibe';
export { CurrentSourcesAsyncData, Model } from './model.vibe';
/** Loads the source files for the example identified by `slug`, producing the
 *  loaded sources on success or a failure Message when the fetch does not
 *  complete. */
export declare const LoadExampleSources: Command.CommandDefinitionWithArgs<"LoadExampleSources", {
    slug: Schema.String;
}, Effect.Effect<{
    readonly _tag: "FailedLoadExampleSources";
    readonly error: string;
} | {
    readonly _tag: "SucceededLoadExampleSources";
    readonly sources: {
        readonly files: readonly {
            readonly path: string;
            readonly highlightedHtml: string;
            readonly rawCode: string;
        }[];
    };
}, never, never>>;
type UpdateReturn = Update.Return<Model, Message>;
export declare const init: () => UpdateReturn;
export declare const boot: (maybeInitialSlug: Option.Option<string>, maybeExampleSources?: Option.Option<typeof ExampleSources.Type>) => UpdateReturn;
export declare const update: (model: Model, message: Message) => Readonly<{
    model: {
        readonly sourceFileTabs: {
            readonly id: string;
            readonly maybeFocusedIndex: Option.Option<number>;
            readonly activationMode: "Automatic" | "Manual";
        };
        readonly maybeActiveSourceFilePath: Option.Option<string>;
        readonly maybeExampleUrl: Option.Option<string>;
        readonly isLivePreviewOpen: boolean;
        readonly currentSources: AsyncData.AsyncData<{
            readonly files: readonly {
                readonly path: string;
                readonly highlightedHtml: string;
                readonly rawCode: string;
            }[];
        }, string>;
    };
    commands?: Update.Commands<{
        readonly _tag: "ChangedExampleUrl";
        readonly url: string;
    } | {
        readonly _tag: "FailedLoadExampleSources";
        readonly error: string;
    } | {
        readonly _tag: "GotSourceFileTabsMessage";
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
        readonly _tag: "RequestedExampleSources";
        readonly slug: string;
    } | {
        readonly _tag: "SucceededLoadExampleSources";
        readonly sources: {
            readonly files: readonly {
                readonly path: string;
                readonly highlightedHtml: string;
                readonly rawCode: string;
            }[];
        };
    } | {
        readonly _tag: "ToggledLivePreview";
        readonly isOpen: boolean;
    }, never>;
    outMessage?: never;
}>;
export declare const informRouteChanged: (model: Model, slug: string) => Readonly<{
    model: {
        readonly sourceFileTabs: {
            readonly id: string;
            readonly maybeFocusedIndex: Option.Option<number>;
            readonly activationMode: "Automatic" | "Manual";
        };
        readonly maybeActiveSourceFilePath: Option.Option<string>;
        readonly maybeExampleUrl: Option.Option<string>;
        readonly isLivePreviewOpen: boolean;
        readonly currentSources: AsyncData.AsyncData<{
            readonly files: readonly {
                readonly path: string;
                readonly highlightedHtml: string;
                readonly rawCode: string;
            }[];
        }, string>;
    };
    commands?: Update.Commands<{
        readonly _tag: "ChangedExampleUrl";
        readonly url: string;
    } | {
        readonly _tag: "FailedLoadExampleSources";
        readonly error: string;
    } | {
        readonly _tag: "GotSourceFileTabsMessage";
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
        readonly _tag: "RequestedExampleSources";
        readonly slug: string;
    } | {
        readonly _tag: "SucceededLoadExampleSources";
        readonly sources: {
            readonly files: readonly {
                readonly path: string;
                readonly highlightedHtml: string;
                readonly rawCode: string;
            }[];
        };
    } | {
        readonly _tag: "ToggledLivePreview";
        readonly isOpen: boolean;
    }, never>;
    outMessage?: never;
}>;
/**
 * Renders one example app: its header, the live preview, and the source files
 * behind a Tabs Submodel.
 *
 * The page is dispatched through `h.submodel`, so it takes the snippet renderer
 * from its parent rather than building the interactive boundaries itself. The
 * renderer runs in the parent's boundary, so its Messages are wrapped for the
 * parent instead of being rejected by this page's `toParentMessage`.
 */
export declare const view: Submodel.View<{
    readonly sourceFileTabs: {
        readonly id: string;
        readonly maybeFocusedIndex: Option.Option<number>;
        readonly activationMode: "Automatic" | "Manual";
    };
    readonly maybeActiveSourceFilePath: Option.Option<string>;
    readonly maybeExampleUrl: Option.Option<string>;
    readonly isLivePreviewOpen: boolean;
    readonly currentSources: AsyncData.AsyncData<{
        readonly files: readonly {
            readonly path: string;
            readonly highlightedHtml: string;
            readonly rawCode: string;
        }[];
    }, string>;
}, {
    readonly _tag: "ChangedExampleUrl";
    readonly url: string;
} | {
    readonly _tag: "FailedLoadExampleSources";
    readonly error: string;
} | {
    readonly _tag: "GotSourceFileTabsMessage";
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
    readonly _tag: "RequestedExampleSources";
    readonly slug: string;
} | {
    readonly _tag: "SucceededLoadExampleSources";
    readonly sources: {
        readonly files: readonly {
            readonly path: string;
            readonly highlightedHtml: string;
            readonly rawCode: string;
        }[];
    };
} | {
    readonly _tag: "ToggledLivePreview";
    readonly isOpen: boolean;
}, Readonly<{
    slug: string;
    isNarrowViewport: boolean;
    renderSnippet: CodeBlock.RenderSnippet;
}>>;
export declare const tableOfContents: ReadonlyArray<TableOfContentsEntry>;
