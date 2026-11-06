import { Effect } from 'effect';
import * as Path from 'effect/Path';
export declare function directoryFromModuleUrl(moduleUrl: URL): Effect.Effect<string, never, Path.Path>;
