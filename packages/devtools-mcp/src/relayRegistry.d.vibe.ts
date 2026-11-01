import { Effect, FileSystem, HashSet, Path, Ref } from 'effect';
import type { ChildProcessSpawner } from 'effect/process';
import { RelayRecord } from 'foldkit/devtools-protocol';
import { type RelayRegistryTrust } from './relayRegistryTrust.vibe';
export type RelayRegistryServices = FileSystem.FileSystem | Path.Path;
export type RelayRegistryReader = Readonly<{
    trust: RelayRegistryTrust;
    reportedRefusals: Ref.Ref<HashSet.HashSet<string>>;
}>;
type RootPathApi = Pick<Path.Path, 'isAbsolute' | 'relative' | 'sep'>;
export declare const isWithinRoot: (root: string, candidate: string, pathApi: RootPathApi) => boolean;
export declare const makeRelayRegistryReader: Effect.Effect<RelayRegistryReader>;
export declare const discoverRelays: (projectRoot: string, registryReader: RelayRegistryReader) => Effect.Effect<ReadonlyArray<RelayRecord>, never, RelayRegistryServices | ChildProcessSpawner.ChildProcessSpawner>;
export {};
