import tseslint from 'typescript-eslint'
import parser from 'vibelang/eslint'
export default [
  { ignores: ['**/node_modules/**', '**/dist/**', '**/build/**'] },
  ...tseslint.configs.recommended.map(config => ({
    ...config,
    files: ['**/*.vibe'],
  })),
  {
    files: ['**/*.vibe'],
    languageOptions: { parser },
    rules: { 'no-debugger': 'error' },
  },
  // .oxlintrc.json turns no-explicit-any off for packages/foldkit/src/**/*.ts; the .vibe files beside them follow the same rule.
  {
    files: ['packages/foldkit/src/**/*.vibe'],
    rules: { '@typescript-eslint/no-explicit-any': 'off' },
  },
]
