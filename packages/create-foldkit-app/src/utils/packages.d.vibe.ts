import { Data, Effect, FileSystem, Option, Path, Schema } from 'effect';
import { type Scaffold } from '../rendering.vibe';
export type PackageManager = 'pnpm' | 'npm' | 'yarn' | 'bun';
export declare const installCommand: (packageManager: PackageManager) => string;
export declare const devCommand: (packageManager: PackageManager) => string;
export declare const runScriptCommand: (packageManager: PackageManager, script: string) => string;
declare const ReleaseManifest: Schema.Struct<{
    readonly schemaVersion: Schema.Literal<1>;
    readonly channel: Schema.Literals<readonly ["stable", "canary"]>;
    readonly sourceCommit: Schema.String;
    readonly packages: Schema.$Record<Schema.String, Schema.String>;
    readonly dependencies: Schema.$Record<Schema.String, Schema.String>;
}>;
type ReleaseManifest = typeof ReleaseManifest.Type;
type UnresolvedSpec = Data.TaggedEnum<{
    Keep: {
        readonly version: string;
    };
    Release: {};
    Workspace: {};
}>;
declare const UnresolvedSpec: Data.TaggedEnum.Constructor<{
    readonly _tag: "Keep";
    readonly version: string;
} | {
    readonly _tag: "Release";
} | {
    readonly _tag: "Workspace";
}>;
/**
 * Build the runtime dependency map for a scaffolded project from an example's
 * raw `dependencies`. Concrete versions are kept and workspace versions are
 * marked for lookup in the CLI release manifest. Workspace packages absent
 * from that public release set are dropped during resolution.
 */
export declare const buildUnresolvedDeps: (exampleDeps: Record<string, string>) => Record<string, UnresolvedSpec>;
/**
 * Build the devDependency map for a scaffolded project by merging the always-on
 * template tooling and any extra scaffold devDependencies with the example's
 * own `devDependencies`. A concrete version from the example wins over a
 * release marker for the same package.
 */
export declare const buildUnresolvedDevDeps: (exampleDevDeps: Record<string, string>, extraDevDependencies: ReadonlyArray<string>) => Record<string, UnresolvedSpec>;
/**
 * The repo example whose `package.json` supplies a scaffold's dependency
 * versions. An SPA scaffold reads from its chosen starter example; the SSG and
 * SSR scaffolds read from the reference apps their overlay files mirror.
 */
export declare const dependencyExample: (scaffold: Scaffold) => string;
/**
 * The devDependencies a scaffold needs beyond the template tooling and the
 * example's own list. The server-rendered scaffolds ship Node build
 * scripts, so they need `@types/node` to typecheck.
 */
export declare const scaffoldDevDependencies: (scaffold: Scaffold) => ReadonlyArray<string>;
/**
 * The git ref in the Foldkit repository that matches a CLI release manifest.
 * A stable release is tagged `foldkit@<version>` at promotion, so the ref is
 * that tag for the manifest's `foldkit` package. A canary release is
 * commit-addressed and never tagged, so the ref is its source commit.
 */
export declare const foldkitSubtreeRef: (manifest: typeof ReleaseManifest.Type) => string;
/**
 * The subtree ref for the release manifest bundled with this CLI. The create
 * command resolves it before scaffolding, so a broken manifest fails before
 * any files are created, then prints it in the success message so the user
 * vendors the Foldkit repository at the release the scaffold installs.
 */
export declare const readFoldkitSubtreeRef: Effect.Effect<string, import("effect/PlatformError").PlatformError | Schema.SchemaError, FileSystem.FileSystem | Path.Path>;
export declare const installDependencies: (projectPath: string, packageManager: PackageManager, scaffold: Scaffold, maybeDependencyManifestsDirectory: Option.Option<string>) => Effect.Effect<void, string | Error | import("effect/PlatformError").PlatformError | Schema.SchemaError, FileSystem.FileSystem | Path.Path>;
export {};
