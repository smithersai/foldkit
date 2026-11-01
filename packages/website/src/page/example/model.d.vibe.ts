import { Schema } from 'effect';
import { AsyncData } from 'foldkit';
export declare const CurrentSourcesAsyncData: Readonly<{
    schema: Schema.Codec<AsyncData.AsyncData<{
        readonly files: readonly {
            readonly path: string;
            readonly highlightedHtml: string;
            readonly rawCode: string;
        }[];
    }, string>, AsyncData.AsyncDataEncoded<{
        readonly files: readonly {
            readonly path: string;
            readonly highlightedHtml: string;
            readonly rawCode: string;
        }[];
    }, string>, never, never>;
    Idle: typeof AsyncData.Idle;
    Loading: typeof AsyncData.Loading;
    Refreshing: (payload: Readonly<{
        data: {
            readonly files: readonly {
                readonly path: string;
                readonly highlightedHtml: string;
                readonly rawCode: string;
            }[];
        };
    }>) => AsyncData.AsyncData<{
        readonly files: readonly {
            readonly path: string;
            readonly highlightedHtml: string;
            readonly rawCode: string;
        }[];
    }, string>;
    Failure: (payload: Readonly<{
        error: string;
    }>) => AsyncData.AsyncData<{
        readonly files: readonly {
            readonly path: string;
            readonly highlightedHtml: string;
            readonly rawCode: string;
        }[];
    }, string>;
    Stale: (payload: Readonly<{
        error: string;
        data: {
            readonly files: readonly {
                readonly path: string;
                readonly highlightedHtml: string;
                readonly rawCode: string;
            }[];
        };
    }>) => AsyncData.AsyncData<{
        readonly files: readonly {
            readonly path: string;
            readonly highlightedHtml: string;
            readonly rawCode: string;
        }[];
    }, string>;
    Success: (payload: Readonly<{
        data: {
            readonly files: readonly {
                readonly path: string;
                readonly highlightedHtml: string;
                readonly rawCode: string;
            }[];
        };
    }>) => AsyncData.AsyncData<{
        readonly files: readonly {
            readonly path: string;
            readonly highlightedHtml: string;
            readonly rawCode: string;
        }[];
    }, string>;
}>;
export declare const Model: Schema.Struct<{
    readonly sourceFileTabs: Schema.Struct<{
        readonly id: Schema.String;
        readonly maybeFocusedIndex: Schema.Option<Schema.Number>;
        readonly activationMode: Schema.Literals<readonly ["Automatic", "Manual"]>;
    }>;
    readonly maybeActiveSourceFilePath: Schema.Option<Schema.String>;
    readonly maybeExampleUrl: Schema.Option<Schema.String>;
    readonly isLivePreviewOpen: Schema.Boolean;
    readonly currentSources: Schema.Codec<AsyncData.AsyncData<{
        readonly files: readonly {
            readonly path: string;
            readonly highlightedHtml: string;
            readonly rawCode: string;
        }[];
    }, string>, AsyncData.AsyncDataEncoded<{
        readonly files: readonly {
            readonly path: string;
            readonly highlightedHtml: string;
            readonly rawCode: string;
        }[];
    }, string>, never, never>;
}>;
export type Model = typeof Model.Type;
