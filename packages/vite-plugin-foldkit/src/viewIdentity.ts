import { type SourceMap } from 'magic-string'
import { existsSync, readFileSync, realpathSync } from 'node:fs'
import { createRequire } from 'node:module'
import { join, resolve } from 'node:path'
import { type Plugin } from 'vite'

import {
  stripQuery,
  toPosixPath,
  transformCode,
} from './viewIdentityTransform.js'

const BRAND_MODULE_SPECIFIER = 'foldkit/brand'
const FOLDKIT_PACKAGE_NAME = 'foldkit'

// TRANSFORM

/** Result of {@link transformViewIdentity}: rewritten code plus a source map. */
export type ViewIdentityTransformResult = Readonly<{
  code: string
  map: SourceMap
}>

/**
 * Brands the return value of every function in a module with that function's
 * identity via `brandViewResult` from `foldkit/brand`.
 *
 * Identities are `${posixRelativePathFromRoot}#${functionName}`, with the
 * function name taken from, in order: the function's own id (declarations and
 * named function expressions), the variable a function expression is bound
 * to, the non-computed key of an
 * object property, class method, or class field, `default` for an
 * export-default function, the member name of an `x.y = fn` assignment, and
 * `anonymous` otherwise. Duplicate names within a module are disambiguated in
 * source order with `~2`, `~3`, and so on, so ids are fully deterministic.
 *
 * Expression-body arrows have their body wrapped in the branding call; block
 * bodies have every `return` argument belonging directly to the function
 * wrapped (nested functions instrument their own returns, and bare `return`
 * is untouched). Branding is set-if-absent on vnodes at runtime, so wrapping
 * every function, including async and generator functions and functions that
 * never produce a vnode, is inert outside view results.
 *
 * Skips foldkit core modules: if the element factory's own returns were
 * branded, every vnode would carry an identity at construction and
 * set-if-absent would neutralize the feature. Core under `node_modules` is
 * always skipped. The plugin resolves the installed foldkit package and passes
 * `isFoldkitCoreResolved`; when it resolved, the plugin's precise package-root
 * gate is authoritative and the coarse `packages/foldkit/` path fragment is
 * left to the resolution-failed fallback, so a consumer whose own path merely
 * contains that segment is still branded.
 *
 * Skips modules whose parsed program imports or re-exports the
 * `foldkit/brand` specifier: packages such as `@foldkit/ui` and
 * `@foldkit/devtools` brand their dist at package build time, and pnpm
 * symlink realpaths can surface that dist outside `node_modules`, where the
 * module-id checks alone would let a build wrap the same returns twice. A
 * module that merely mentions the specifier in a comment or string is still
 * branded; the raw-text check is only a fast negative prefilter.
 *
 * Returns `null` when the module needs no changes.
 */
export const transformViewIdentity = (
  code: string,
  id: string,
  root: string,
  options?: Readonly<{
    isFoldkitCoreResolved?: boolean
  }>,
): ViewIdentityTransformResult | null => transformCode(code, id, root, options)

// RESOLUTION

// NOTE: `requireFromRoot.resolve('foldkit')` cannot produce a path here:
// foldkit's export map is ESM-only, so resolving it under require conditions
// throws ERR_PACKAGE_PATH_NOT_EXPORTED. Walking the require resolution
// candidate directories locates the package without touching the export map.
const resolveFoldkitPackageRoot = (root: string): string | undefined => {
  const requireFromRoot = createRequire(resolve(root, 'noop.js'))
  const candidateDirectories =
    requireFromRoot.resolve.paths(FOLDKIT_PACKAGE_NAME) ?? []
  for (const candidateDirectory of candidateDirectories) {
    const packageDirectory = join(candidateDirectory, FOLDKIT_PACKAGE_NAME)
    if (existsSync(join(packageDirectory, 'package.json'))) {
      try {
        return realpathSync(packageDirectory)
      } catch {
        return packageDirectory
      }
    }
  }
  return undefined
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null

const resolveBrandModulePath = (root: string): string | undefined => {
  const packageRoot = resolveFoldkitPackageRoot(root)
  if (packageRoot === undefined) {
    return undefined
  }
  try {
    const packageJson: unknown = JSON.parse(
      readFileSync(join(packageRoot, 'package.json'), 'utf8'),
    )
    if (!isRecord(packageJson) || !isRecord(packageJson['exports'])) {
      return undefined
    }
    const brandExportEntry = packageJson['exports']['./brand']
    const importTarget = isRecord(brandExportEntry)
      ? brandExportEntry['import']
      : brandExportEntry
    if (typeof importTarget !== 'string') {
      return undefined
    }
    const brandModulePath = join(packageRoot, importTarget)
    if (existsSync(brandModulePath)) {
      return brandModulePath
    }
    return undefined
  } catch {
    return undefined
  }
}

const isUnderDirectory = (posixPath: string, posixDirectory: string): boolean =>
  posixPath === posixDirectory || posixPath.startsWith(`${posixDirectory}/`)

// PLUGIN

/**
 * Vite plugin that applies {@link transformViewIdentity} to application
 * modules in both dev and build. Skips `node_modules`, virtual modules,
 * non-script files, and foldkit core itself, resolved from the config root so
 * that configs aliasing `foldkit` straight into `packages/foldkit/src` are
 * excluded too. `@foldkit/ui` and `@foldkit/devtools` modules are branded on
 * purpose.
 *
 * Also pins `foldkit/brand` to the installed package's brand module via a
 * `resolve.alias` entry, so the injected import keeps resolving in configs
 * whose own `foldkit` alias would otherwise swallow the subpath.
 */
export const foldkitViewIdentity = (): Plugin => {
  let resolvedRoot = process.cwd()
  let foldkitPackageRoot: string | undefined
  return {
    name: 'foldkit:view-identity',
    config: userConfig => {
      const brandModulePath = resolveBrandModulePath(
        userConfig.root ?? process.cwd(),
      )
      if (brandModulePath === undefined) {
        return undefined
      }
      // NOTE: returned as an array because Vite's mergeAlias puts array
      // entries from a plugin ahead of the user's aliases; object-form
      // entries would land after a user's bare `foldkit` alias and the
      // injected specifier would be rewritten into a nonexistent path.
      return {
        resolve: {
          alias: [
            { find: BRAND_MODULE_SPECIFIER, replacement: brandModulePath },
          ],
        },
      }
    },
    configResolved: config => {
      resolvedRoot = config.root
      const packageRoot = resolveFoldkitPackageRoot(config.root)
      foldkitPackageRoot =
        packageRoot === undefined ? undefined : toPosixPath(packageRoot)
    },
    transform(code, id) {
      if (
        foldkitPackageRoot !== undefined &&
        isUnderDirectory(toPosixPath(stripQuery(id)), foldkitPackageRoot)
      ) {
        return null
      }
      return transformCode(
        code,
        id,
        resolvedRoot,
        {
          isFoldkitCoreResolved: foldkitPackageRoot !== undefined,
        },
        stripQuery(id).endsWith('.vibe')
          ? () => ({
              map: JSON.stringify(this.getCombinedSourcemap()),
              url: stripQuery(id),
              parserRoot: resolvedRoot,
            })
          : undefined,
      )
    },
  }
}
