import { type UserConfig } from 'vite';
/** Tests whether an import refers to a package that must share Foldkit's
 * runtime instance.
 *
 * @internal
 */
export declare const isFoldkitSingletonPackageSpecifier: (specifier: string) => boolean;
/** Finds the installed packages an application's server render must bundle
 * and the Foldkit packages Vite must deduplicate.
 *
 * @internal
 */
export declare const crawlFoldkitPackages: (root: string, isBuild: boolean, viteUserConfig: UserConfig) => Promise<Readonly<{
    dedupe: Array<string>;
    noExternal: Array<string>;
}>>;
