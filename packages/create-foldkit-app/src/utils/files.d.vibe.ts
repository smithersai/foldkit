import { Effect, FileSystem, Path, PlatformError } from 'effect';
import { type Scaffold } from '../rendering.vibe';
import { type PackageManager } from './packages.ts';
export declare const createProject: (name: string, projectPath: string, scaffold: Scaffold, packageManager: PackageManager) => Effect.Effect<void, PlatformError.PlatformError, FileSystem.FileSystem | Path.Path>;
export declare const applyPackageManager: (readme: string, packageManager: PackageManager) => string;
