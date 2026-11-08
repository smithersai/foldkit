import { spawnSync } from 'node:child_process'
import {
  existsSync,
  globSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  realpathSync,
  rmSync,
  writeFileSync,
} from 'node:fs'
import { createRequire } from 'node:module'
import {
  dirname,
  isAbsolute,
  join,
  matchesGlob,
  parse,
  relative,
  resolve,
  sep,
} from 'node:path'
import { pathToFileURL } from 'node:url'
import ts from 'typescript'

const require = createRequire(import.meta.url)
const catalog = JSON.parse(
  readFileSync(
    new URL('../.vibelang/effect-lint-codes.json', import.meta.url),
    'utf8',
  ),
)
const packageFile = require.resolve('vibelang/package.json')
const launcher = join(dirname(packageFile), 'bin/vibelang')
const installed = JSON.parse(readFileSync(packageFile, 'utf8')).version
const ruleNames = new Map(
  Object.keys(catalog.rules).map(name => [
    'effecttsgo/' +
      name
        .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
        .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
        .toLowerCase(),
    name,
  ]),
)
const off = Object.fromEntries(
  Object.keys(catalog.rules).map(name => [name, 'off']),
)
const slash = value => value.split(sep).join('/')

const readConfig = file => {
  const result = ts.readConfigFile(file, ts.sys.readFile)
  if (result.error) {
    throw new Error(
      ts.flattenDiagnosticMessageText(result.error.messageText, '\n'),
    )
  }
  return result.config
}

const extendedFile = (file, base) => {
  if (file.startsWith('.') || isAbsolute(file)) {
    return resolve(base, file)
  }
  return createRequire(join(base, 'package.json')).resolve(file)
}

export const nativeRules = rules =>
  Object.fromEntries(
    Object.entries(rules ?? {})
      .filter(([name]) => name.startsWith('effecttsgo/'))
      .map(([name, value]) => {
        const native = ruleNames.get(name)
        if (!native) {
          throw new Error(
            'Unknown rule in the pinned VibeLang lint catalog: ' + name,
          )
        }
        const severity = Array.isArray(value) ? value[0] : value
        if (![0, 1, 2, 'off', 'warn', 'error'].includes(severity)) {
          throw new Error('Unsupported Effect lint severity for ' + name)
        }
        return [native, severity === 0 || severity === 'off' ? 'off' : 'error']
      }),
  )

const absolutePattern = (base, pattern) => {
  if (pattern.startsWith('!')) {
    throw new Error(
      'Negated Effect lint ignore patterns require an explicit native policy',
    )
  }
  const absolute = pattern.startsWith('**/')
    ? join(parse(base).root, pattern)
    : resolve(base, pattern)
  return slash(absolute) + (pattern.endsWith('/') ? '/**/*' : '')
}

export function readPolicy(file, ancestors = new Set()) {
  const absolute = resolve(file)
  if (ancestors.has(absolute)) {
    throw new Error('Effect lint configuration extends itself: ' + file)
  }
  const parents = new Set([...ancestors, absolute])
  const config = readConfig(absolute)
  const base = dirname(absolute)
  const policy = { rules: {}, overrides: [], ignores: [] }
  for (const entry of [config.extends ?? []].flat()) {
    const inherited = readPolicy(extendedFile(entry, base), parents)
    Object.assign(policy.rules, inherited.rules)
    policy.overrides.push(...inherited.overrides)
    policy.ignores.push(...inherited.ignores)
  }
  Object.assign(policy.rules, nativeRules(config.rules))
  policy.overrides.push(
    ...(config.overrides ?? []).map(override => {
      const files = [override.files].flat()
      if (
        files.length === 0 ||
        files.some(file => typeof file !== 'string' || file.length === 0)
      ) {
        throw new Error('An Effect lint override must select at least one file')
      }
      return {
        include: files.map(pattern => absolutePattern(base, pattern)),
        options: { diagnosticSeverity: nativeRules(override.rules) },
      }
    }),
  )
  policy.ignores.push(
    ...(config.ignorePatterns ?? []).map(pattern =>
      absolutePattern(base, pattern),
    ),
  )
  return policy
}

export function nativeOptions(
  policy,
  root,
  paths = ['packages', 'examples', 'scripts'],
) {
  if (paths.length === 0) {
    throw new Error('Effect lint must select at least one source path')
  }
  return {
    name: '@effect/language-service',
    diagnosticSeverity: { ...off },
    overrides: [
      {
        include: paths.map(scope => slash(join(resolve(root, scope), '**/*'))),
        options: { diagnosticSeverity: policy.rules },
      },
      ...policy.overrides,
      ...(policy.ignores.length === 0
        ? []
        : [
            {
              include: policy.ignores,
              options: { diagnosticSeverity: { ...off } },
            },
          ]),
    ],
  }
}

const inheritedPlugins = (project, ancestors = new Set()) => {
  const file = resolve(project)
  if (ancestors.has(file)) {
    throw new Error('Project configuration extends itself: ' + project)
  }
  const next = new Set([...ancestors, file])
  const config = readConfig(file)
  let plugins
  for (const entry of [config.extends ?? []].flat()) {
    const inherited = inheritedPlugins(extendedFile(entry, dirname(file)), next)
    if (inherited !== undefined) plugins = inherited
  }
  return config.compilerOptions?.plugins ?? plugins
}

const discoverProjects = root => {
  const result = spawnSync(
    'pnpm',
    ['list', '--recursive', '--depth', '-1', '--json'],
    {
      cwd: root,
      encoding: 'utf8',
    },
  )
  if (result.status !== 0) {
    throw new Error(
      result.stderr ||
        result.error?.message ||
        'Cannot list workspace projects',
    )
  }
  const projects = JSON.parse(result.stdout)
    .filter(pkg =>
      /^(packages|examples)\//.test(slash(relative(root, pkg.path))),
    )
    .filter(
      pkg =>
        globSync('**/*.{ts,tsx,mts,cts,vibe,vibex}', {
          cwd: pkg.path,
          exclude: ['node_modules/**', '**/node_modules/**', 'dist/**'],
        }).length,
    )
    .map(pkg =>
      ['vibe.config.json', 'tsconfig.json']
        .map(name => join(pkg.path, name))
        .find(existsSync),
    )
  projects.push(join(root, 'scripts/tsconfig.json'))
  if (projects.some(project => !project)) {
    throw new Error('A VibeLang workspace package has no project configuration')
  }
  return [...new Set(projects)].sort()
}

export function lintProjects({
  root,
  config,
  projects,
  paths = ['packages', 'examples', 'scripts'],
}) {
  if (installed !== catalog.version) {
    throw new Error(
      'Regenerate the Effect lint catalog for vibelang@' + installed,
    )
  }
  const policy = readPolicy(config)
  const plugin = nativeOptions(policy, root, paths)
  const store = join(root, '.pnpm-store')
  mkdirSync(store, { recursive: true })
  const temporary = mkdtempSync(join(store, 'vibelang-effect-lint-'))
  const covered = new Set()
  let status = 0
  try {
    for (const [index, project] of projects.entries()) {
      const file = join(temporary, index + '.json')
      writeFileSync(
        file,
        JSON.stringify({
          extends: resolve(project),
          compilerOptions: {
            noEmit: true,
            plugins: [
              ...(inheritedPlugins(project) ?? []).filter(
                entry => entry.name !== plugin.name,
              ),
              plugin,
            ],
          },
        }),
      )
      process.stdout.write(
        '[vibe-effect-lint] ' + slash(relative(root, project)) + '\n',
      )
      const listed = spawnSync(
        process.execPath,
        [launcher, '--listFilesOnly', '-p', file, '--pretty', 'false'],
        { cwd: root, encoding: 'utf8', maxBuffer: 128 * 1024 * 1024 },
      )
      if (listed.error || listed.status !== 0) {
        throw listed.error ?? new Error(listed.stdout + listed.stderr)
      }
      for (const source of listed.stdout.split(/\r?\n/)) {
        if (/\.vibex?$/.test(source) && existsSync(resolve(root, source))) {
          covered.add(realpathSync(resolve(root, source)))
        }
      }
      const startedAt = performance.now()
      const result = spawnSync(
        process.execPath,
        [launcher, 'lint', '-p', file, '--pretty', 'false'],
        { cwd: root, encoding: 'utf8', maxBuffer: 128 * 1024 * 1024 },
      )
      process.stdout.write(result.stdout ?? '')
      process.stderr.write(result.stderr ?? '')
      if (result.error) throw result.error
      status = Math.max(status, result.status ?? 1)
      process.stdout.write(
        '[vibe-effect-lint] exit=' +
          (result.status ?? result.signal ?? 1) +
          ' elapsedMs=' +
          Math.round(performance.now() - startedAt) +
          '\n',
      )
    }
    const selected = new Set()
    for (const scope of paths) {
      for (const source of globSync(join(scope, '**/*.{vibe,vibex}'), {
        cwd: root,
        exclude: [
          'node_modules/**',
          '**/node_modules/**',
          '.pnpm-store/**',
          '**/.pnpm-store/**',
        ],
      })) {
        const file = resolve(root, source)
        if (
          !policy.ignores.some(pattern => matchesGlob(slash(file), pattern))
        ) {
          selected.add(realpathSync(file))
        }
      }
    }
    for (const source of selected) {
      if (!covered.has(source)) {
        process.stderr.write(
          slash(relative(root, source)) +
            ' not linted: no selected project includes it\n',
        )
        status = 1
      }
    }
    process.stdout.write(
      '[vibe-effect-lint] checked ' + selected.size + ' .vibe files\n',
    )
  } finally {
    rmSync(temporary, { recursive: true, force: true })
  }
  return status
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(resolve(process.argv[1])).href
) {
  const root = process.cwd()
  const projects = []
  const paths = []
  let config = join(root, '.oxlintrc.effect.json')
  for (let index = 2; index < process.argv.length; index++) {
    const argument = process.argv[index]
    if (
      argument === '--project' ||
      argument === '--config' ||
      argument === '--path'
    ) {
      const value = process.argv[++index]
      if (!value) throw new Error('Missing value for ' + argument)
      if (argument === '--project') projects.push(resolve(value))
      else if (argument === '--path') paths.push(value)
      else config = resolve(value)
    } else {
      throw new Error('Unknown argument: ' + argument)
    }
  }
  process.exitCode = lintProjects({
    root,
    config,
    projects: projects.length ? projects : discoverProjects(root),
    paths: paths.length ? paths : ['packages', 'examples', 'scripts'],
  })
}
