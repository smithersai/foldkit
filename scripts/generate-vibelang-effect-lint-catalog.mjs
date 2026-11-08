import { readFileSync, writeFileSync } from 'node:fs'

const version = '0.0.13'
const source =
  'https://raw.githubusercontent.com/smithersai/vibelang/0af26a5fbc85b4fb596d1f44db8b0e2df21a5be6/docs/tools/lint-code-assignments.json'
const input = process.argv[2]
const response = input ? undefined : await fetch(source)
if (response && !response.ok) {
  throw new Error(
    'Cannot read the pinned VibeLang lint catalog: ' + response.status,
  )
}
const rules = input
  ? JSON.parse(readFileSync(input, 'utf8'))
  : await response.json()
writeFileSync(
  new URL('../.vibelang/effect-lint-codes.json', import.meta.url),
  JSON.stringify({ version, source, rules }, null, 2) + '\n',
)
