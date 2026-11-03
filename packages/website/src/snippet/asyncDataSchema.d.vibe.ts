import { Schema } from 'effect';
import { AsyncData } from 'foldkit';
export declare const Model: Schema.Struct<{
    readonly notebooks: Schema.Codec<AsyncData.AsyncData<readonly any[], string>, AsyncData.AsyncDataEncoded<readonly any[], string>, never, never>;
    readonly notebookById: Schema.HashMap<any, Schema.Codec<AsyncData.AsyncData<unknown, string>, AsyncData.AsyncDataEncoded<unknown, string>, never, never>>;
    readonly allNotes: Schema.Codec<AsyncData.AsyncData<readonly any[], string>, AsyncData.AsyncDataEncoded<readonly any[], string>, never, never>;
    readonly notesByNotebook: Schema.HashMap<any, Schema.Codec<AsyncData.AsyncData<readonly any[], string>, AsyncData.AsyncDataEncoded<readonly any[], string>, never, never>>;
    readonly noteById: Schema.HashMap<any, Schema.Codec<AsyncData.AsyncData<unknown, string>, AsyncData.AsyncDataEncoded<unknown, string>, never, never>>;
}>;
