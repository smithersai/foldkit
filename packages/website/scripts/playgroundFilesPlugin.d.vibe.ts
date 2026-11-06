import type { Plugin } from 'vite';
export declare const INCLUDED_EXTENSIONS: ReadonlySet<string>;
type DependencySpec = Readonly<Record<string, string>>;
export declare const PLAYGROUND_DEPENDENCY_OVERRIDES: DependencySpec;
export declare const buildExampleFileMap: (slug: string, versions: Readonly<Record<string, string>>, baseCompilerOptions: Readonly<Record<string, unknown>>, baseExclude: ReadonlyArray<string>, sourceDirectory?: string) => Promise<Record<string, string>>;
export declare const playgroundFilesPlugin: () => Plugin;
export declare const loadPlaygroundWorkspacePackageVersions: () => Promise<Readonly<Record<string, string>>>;
export declare const loadPlaygroundFiles: () => Promise<Readonly<Record<string, Readonly<{
    files: Readonly<Record<string, string>>;
}>>>>;
export {};
