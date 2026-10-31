import { existsSync, readFileSync } from 'node:fs'
import parser from 'vibelang/eslint'

import foldkit from '../packages/oxlint-plugin-foldkit/dist/index.js'
// The repository's Oxlint configuration, read on each run: its rules and its
// overrides (a *.ts glob read as *.vibe) apply to .vibe files wherever ESLint
// or typescript-eslint has the rule. typescript-eslint's recommended rules
// stand in for Oxlint's default correctness rules unless the configuration
// turns that category off. Foldkit's own rules apply through the same plugin.
const read = name => {
  const url = new URL('../' + name, import.meta.url)
  return existsSync(url) ? readFileSync(url, 'utf8') : null
}
const text = read('.oxlintrc.json') ?? read('.oxlintrc.jsonc')
const oxlint = text
  ? JSON.parse(
      text
        .replace(
          /("(?:\\.|[^"\\])*")|\/\*[\s\S]*?\*\/|\/\/[^\n]*/g,
          (all, string) => string ?? '',
        )
        .replace(/,(\s*[}\]])/g, '$1'),
    )
  : {}
// typescript-eslint refuses TypeScript 7, so its rules join only where it loads.
const tseslint = await import('typescript-eslint').then(
  ({ default: loaded }) => loaded,
  () => null,
)
const core = await import('eslint/use-at-your-own-risk').then(
  ({ builtinRules }) => builtinRules,
  () => null,
)
const typed = new Set(Object.keys(tseslint?.plugin?.rules ?? {}))
const levels = {
  allow: 'off',
  deny: 'error',
  off: 'off',
  warn: 'warn',
  error: 'error',
  0: 'off',
  1: 'warn',
  2: 'error',
}
const rules = (settings = {}) =>
  Object.fromEntries(
    Object.entries(settings).flatMap(([name, setting]) => {
      const [level, ...options] = [setting].flat()
      const value = [levels[level] ?? level, ...options]
      const plugin = name.includes('/')
        ? name.slice(0, name.lastIndexOf('/'))
        : ''
      const rule = name.slice(name.lastIndexOf('/') + 1)
      if (plugin === 'foldkit') return [[name, value]]
      // A core rule typescript-eslint extends for TypeScript, as Oxlint's does, is typescript-eslint's.
      if (
        plugin === 'typescript' ||
        plugin === '@typescript-eslint' ||
        ((plugin === '' || plugin === 'eslint') && typed.has(rule))
      )
        return typed.has(rule) ? [['@typescript-eslint/' + rule, value]] : []
      if (plugin === '' || plugin === 'eslint')
        return !core || core.has(rule) ? [[rule, value]] : []
      return []
    }),
  )
const vibe = glob =>
  glob
    .replace(/\.\{([^}]*)\}$/, (all, list) =>
      list.split(',').some(e => /^[cm]?tsx?$/.test(e.trim())) ? '.vibe' : all,
    )
    .replace(/\.[cm]?tsx?$/, '.vibe')
const overrides = (oxlint.overrides ?? [])
  .map(override => ({
    files: [override.files]
      .flat()
      .filter(glob => vibe(glob) !== glob)
      .map(vibe),
    rules: rules(override.rules),
  }))
  .filter(
    override => override.files.length && Object.keys(override.rules).length,
  )
const correctness = levels[oxlint.categories?.correctness] !== 'off'
export default [
  { ignores: ['**/node_modules/**', '**/dist/**', '**/build/**'] },
  ...(correctness && tseslint
    ? tseslint.configs.recommended.map(config => ({
        ...config,
        files: ['**/*.vibe'],
      }))
    : []),
  {
    files: ['**/*.vibe'],
    languageOptions: { parser },
    plugins: {
      foldkit,
      ...(tseslint ? { '@typescript-eslint': tseslint.plugin } : {}),
    },
    rules: { 'no-debugger': 'error', ...rules(oxlint.rules) },
  },
  ...overrides,
]
