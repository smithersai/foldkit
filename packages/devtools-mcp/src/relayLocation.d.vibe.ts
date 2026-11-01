import { Effect, Option } from 'effect';
import type { ChildProcessSpawner } from 'effect/process';
import { type RelayRegistryReader, type RelayRegistryServices } from './relayRegistry.vibe';
export type Settings = Readonly<{
    maybeConfiguredPort: Option.Option<string>;
    maybeConfiguredHost: Option.Option<string>;
    projectRoot: string;
}>;
export type RelayTarget = Readonly<{
    key: string;
    url: string;
    maybeProjectRoot: Option.Option<string>;
}>;
export declare const loadSettings: Effect.Effect<Settings>;
export declare const configuredRelayUrl: (settings: Settings) => Option.Option<string>;
export declare const resolveRelayTargets: (settings: Settings, registryReader: RelayRegistryReader) => Effect.Effect<ReadonlyArray<RelayTarget>, never, RelayRegistryServices | ChildProcessSpawner.ChildProcessSpawner>;
