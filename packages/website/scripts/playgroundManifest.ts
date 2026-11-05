// Keep the synchronous text-transform exception contract used by Vite.

const ROOT_ELEMENT_PATTERN = /<div\b[^>]*\bid="root"[^>]*>\s*<\/div>/

const ROOT_LOADING_MARKUP = `<div id="root"><div style="display:flex;align-items:center;justify-content:center;min-height:100vh;font-family:system-ui,-apple-system,sans-serif;font-size:14px;color:#9ca3af">Loading\u2026</div></div>`

export const rewriteWorkspaceSpec =
  (versions: Readonly<Record<string, string>>) =>
  (name: string, specifier: string): string => {
    if (!specifier.startsWith('workspace:')) {
      return specifier
    }

    const version = versions[name]

    if (version === undefined) {
      throw new Error(
        `[playground-files] ${name} uses ${specifier} but is not a public workspace package`,
      )
    }

    return version
  }

export const injectLoadingPlaceholder = (
  indexHtml: string,
  slug: string,
): string => {
  if (!ROOT_ELEMENT_PATTERN.test(indexHtml)) {
    throw new Error(
      `[playground-files] Could not find <div id="root"></div> in ${slug}/index.html to inject the playground loading placeholder. ` +
        `Ensure the example's index.html contains an empty root div.`,
    )
  }
  return indexHtml.replace(ROOT_ELEMENT_PATTERN, ROOT_LOADING_MARKUP)
}

type DependencySpec = Readonly<Record<string, string>>

type PackageJson = Readonly<{
  scripts?: Readonly<Record<string, string>>
  dependencies?: DependencySpec
  devDependencies?: DependencySpec
  optionalDependencies?: DependencySpec
  peerDependencies?: DependencySpec
  overrides?: DependencySpec
  [key: string]: unknown
}>

export type TsConfig = Readonly<{
  extends?: string
  vibelang?: Readonly<Record<string, unknown>>
  compilerOptions?: Readonly<Record<string, unknown>>
  include?: ReadonlyArray<string>
  exclude?: ReadonlyArray<string>
  [key: string]: unknown
}>

// NOTE: The playground keeps only the development dependencies its shipped
// commands execute: `vite`, the Foldkit plugins its Vite config loads, and
// `@tailwindcss/vite`. Omitting one produces a manifest whose own scripts
// cannot run in a clean WebContainer or disposable npm project.
const PLAYGROUND_DEV_DEPENDENCIES = new Set([
  '@foldkit/devtools',
  '@foldkit/vite-plugin',
  '@tailwindcss/vite',
  'tailwindcss',
  'vite',
  'vibelang',
  'vibelang-vite',
])

const nativePlaygroundScripts = (
  scripts: Readonly<Record<string, string>> | undefined,
): Readonly<Record<string, string>> | undefined =>
  scripts === undefined
    ? undefined
    : Object.fromEntries(
        Object.entries(scripts).map(
          ([name, command]): readonly [string, string] => [
            name,
            command === 'vite' || command.startsWith('vite ')
              ? command.replace(
                  /^vite\b/,
                  'node --import vibelang/register ./node_modules/vite/bin/vite.js --configLoader native',
                )
              : command,
          ],
        ),
      )

// NOTE: pinned exactly rather than as a caret range. A playground manifest is
// deployed with the site and installs from npm long afterward, so a range can
// resolve a future plugin release whose Foldkit peer floor is newer than the
// deployed site's package. An exact version installs what the site was built
// against, and a site rebuilt from the version commit is what moves it.
// NOTE: Rolldown 1.2.9's generated loader rejects its WASI binding because
// both export `__napiBindingTarget`. WebContainers must use the last compatible
// release until Rolldown publishes a matching loader and binding pair.
export const PLAYGROUND_DEPENDENCY_OVERRIDES: DependencySpec = {
  rolldown: '1.2.6',
}

const rewriteDependencyMap = (
  dependencies: DependencySpec | undefined,
  rewrite: (name: string, specifier: string) => string,
): DependencySpec | undefined => {
  if (dependencies === undefined) {
    return undefined
  }
  return Object.fromEntries(
    Object.entries(dependencies).map(([name, specifier]) => [
      name,
      rewrite(name, specifier),
    ]),
  )
}

const filterToRuntimeDevDependencies = (
  devDependencies: DependencySpec | undefined,
): DependencySpec | undefined => {
  if (devDependencies === undefined) {
    return undefined
  }
  const entries = Object.entries(devDependencies).filter(([name]) =>
    PLAYGROUND_DEV_DEPENDENCIES.has(name),
  )
  return entries.length === 0 ? undefined : Object.fromEntries(entries)
}

export const transformPackageJson = (
  raw: string,
  versions: Readonly<Record<string, string>>,
  native: boolean,
): string => {
  const packageJson: PackageJson = JSON.parse(raw)
  const rewrite = rewriteWorkspaceSpec(versions)
  const transformed = {
    ...packageJson,
    scripts: native
      ? nativePlaygroundScripts(packageJson.scripts)
      : packageJson.scripts,
    overrides: {
      ...(packageJson.overrides ?? {}),
      ...PLAYGROUND_DEPENDENCY_OVERRIDES,
    },
    dependencies: rewriteDependencyMap(packageJson.dependencies, rewrite),
    devDependencies: rewriteDependencyMap(
      filterToRuntimeDevDependencies(packageJson.devDependencies),
      rewrite,
    ),
    optionalDependencies: rewriteDependencyMap(
      packageJson.optionalDependencies,
      rewrite,
    ),
    peerDependencies: rewriteDependencyMap(
      packageJson.peerDependencies,
      rewrite,
    ),
  }
  return JSON.stringify(transformed, null, 2) + '\n'
}

export const transformTsConfig = (
  raw: string,
  baseCompilerOptions: Readonly<Record<string, unknown>>,
  baseExclude: ReadonlyArray<string>,
  dedupe: (values: ReadonlyArray<string>) => ReadonlyArray<string>,
): string => {
  const tsConfig: TsConfig = JSON.parse(raw)
  const merged = {
    compilerOptions: {
      ...baseCompilerOptions,
      ...(tsConfig.compilerOptions ?? {}),
    },
    ...(tsConfig.include ? { include: tsConfig.include } : {}),
    ...(tsConfig.vibelang ? { vibelang: tsConfig.vibelang } : {}),
    exclude: dedupe([...baseExclude, ...(tsConfig.exclude ?? [])]),
  }
  return JSON.stringify(merged, null, 2) + '\n'
}
