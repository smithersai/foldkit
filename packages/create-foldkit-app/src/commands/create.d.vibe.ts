import { Effect, Option } from 'effect';
import { Prompt } from 'effect/cli';
import { type Example } from '../examples.js';
import { type Rendering } from '../rendering.vibe';
import { type PackageManager } from '../utils/packages.js';
type CreateInput = Readonly<{
    name: Option.Option<string>;
    rendering: Option.Option<Rendering>;
    example: Option.Option<Example>;
    packageManager: Option.Option<PackageManager>;
    maybeDependencyManifestsDirectory: Option.Option<string>;
}>;
export declare const create: (input: CreateInput) => Effect.Effect<string, string | Error | import("effect/PlatformError").PlatformError | import("effect/Schema").SchemaError, Prompt.Environment>;
export {};
