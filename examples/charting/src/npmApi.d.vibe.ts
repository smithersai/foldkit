import { Context, Effect, Layer, Schema } from 'effect';
import { HttpClient } from 'effect/http';
import type { PackageSpec } from './domain.vibe';
export declare const NpmDownloadDay: Schema.Struct<{
    readonly day: Schema.String;
    readonly downloads: Schema.Number;
}>;
export type NpmDownloadDay = typeof NpmDownloadDay.Type;
export declare const NpmDownloadsResponse: Schema.Struct<{
    readonly downloads: Schema.$Array<Schema.Struct<{
        readonly day: Schema.String;
        readonly downloads: Schema.Number;
    }>>;
}>;
export type NpmDownloadsResponse = typeof NpmDownloadsResponse.Type;
export declare const NpmVersionMetadata: Schema.Struct<{
    readonly dependencies: Schema.OptionFromOptional<Schema.$Record<Schema.String, Schema.String>>;
    readonly peerDependencies: Schema.OptionFromOptional<Schema.$Record<Schema.String, Schema.String>>;
}>;
export type NpmVersionMetadata = typeof NpmVersionMetadata.Type;
export declare const NpmPackument: Schema.Struct<{
    readonly name: Schema.String;
    readonly time: Schema.$Record<Schema.String, Schema.String>;
    readonly versions: Schema.$Record<Schema.String, Schema.Struct<{
        readonly dependencies: Schema.OptionFromOptional<Schema.$Record<Schema.String, Schema.String>>;
        readonly peerDependencies: Schema.OptionFromOptional<Schema.$Record<Schema.String, Schema.String>>;
    }>>;
    readonly 'dist-tags': Schema.Struct<{
        readonly latest: Schema.String;
    }>;
}>;
export type NpmPackument = typeof NpmPackument.Type;
declare const NpmApi_base: Context.ServiceClass<NpmApi, "charting/NpmApi", {
    fetchPackage(spec: PackageSpec): Effect.Effect<Readonly<{
        downloads: typeof NpmDownloadsResponse.Type;
        packument: typeof NpmPackument.Type;
    }>, Error>;
}>;
export declare class NpmApi extends NpmApi_base {
}
export declare const NpmApiLive: Layer.Layer<NpmApi, never, HttpClient.HttpClient>;
export {};
