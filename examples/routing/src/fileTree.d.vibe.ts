import { Array, Option, Schema } from 'effect';
export type File = typeof File.Type;
export type Directory = Readonly<{
    _tag: 'Directory';
    name: string;
    entries: ReadonlyArray<FileTreeEntry>;
}>;
export type FileTreeEntry = File | Directory;
export declare const File: import("foldkit/schema").CallableTaggedStruct<"File", {
    name: Schema.String;
    sizeInBytes: Schema.Number;
}>;
export declare const Directory: import("foldkit/schema").CallableTaggedStruct<"Directory", {
    name: Schema.String;
    entries: Schema.$Array<Schema.suspend<Schema.Codec<FileTreeEntry, FileTreeEntry, never, never>>>;
}>;
export declare const FileTreeEntry: Schema.Union<readonly [import("foldkit/schema").CallableTaggedStruct<"File", {
    name: Schema.String;
    sizeInBytes: Schema.Number;
}>, import("foldkit/schema").CallableTaggedStruct<"Directory", {
    name: Schema.String;
    entries: Schema.$Array<Schema.suspend<Schema.Codec<FileTreeEntry, FileTreeEntry, never, never>>>;
}>]>;
export declare const fileTree: ReadonlyArray<FileTreeEntry>;
export declare const findEntry: (path: Array.NonEmptyReadonlyArray<string>) => Option.Option<FileTreeEntry>;
export declare const formatFileSize: (sizeInBytes: number) => string;
