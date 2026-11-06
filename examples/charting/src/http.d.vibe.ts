import { Effect, Schema } from "effect";
import { HttpClient } from "effect/http";
export declare const isSuccessfulStatus: (status: number) => boolean;
export declare const errorMessage: (error: unknown) => string;
export declare const makeUrl: (url: string, params: Readonly<globalThis.Record<string, string>>) => string;
export declare const encodePackageName: (packageName: string) => string;
export declare const fetchJson: (client: HttpClient.HttpClient) => <A, I>(schema: Schema.Codec<A, I>) => (url: string, headers?: Readonly<globalThis.Record<string, string>>) => Effect.Effect<A, Error>;
