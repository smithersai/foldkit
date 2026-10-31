import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import * as ts from 'typescript'

import { readForcedEffectEntries } from '../packages/vite-plugin-foldkit/test/forcedEffectEntries.ts'

const FOLDKIT_DIST = 'packages/foldkit/dist'
const PLUGIN_FILE = 'packages/vite-plugin-foldkit/src/index.ts'
const LIST_NAME = 'FORCE_INCLUDED_EFFECT_ENTRIES'

// Check emitted runtime imports: VibeLang's implicit namespaces and direct
// Effect subpaths are absent from a TypeScript-only source scan.
const collectRuntimeFiles = (dir: string): ReadonlyArray<string> => {
  const out: Array<string> = []
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) {
      out.push(...collectRuntimeFiles(full))
    } else if (entry.endsWith('.js')) {
      out.push(full)
    }
  }
  return out
}

const extractEffectEntries = (file: string): ReadonlySet<string> => {
  const sourceFile = ts.createSourceFile(
    file,
    readFileSync(file, 'utf8'),
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.JS,
  )
  const entries = new Set<string>()
  ts.forEachChild(sourceFile, node => {
    if (
      !ts.isImportDeclaration(node) ||
      !ts.isStringLiteral(node.moduleSpecifier)
    )
      return
    const specifier = node.moduleSpecifier.text
    if (specifier.startsWith('effect/')) {
      entries.add(specifier)
      return
    }
    if (specifier !== 'effect') return
    entries.add('effect')
    const bindings = node.importClause?.namedBindings
    if (bindings && ts.isNamedImports(bindings)) {
      for (const binding of bindings.elements) {
        const name = (binding.propertyName ?? binding.name).text
        if (/^[A-Z]/.test(name)) entries.add(`effect/${name}`)
      }
    }
  })
  return entries
}

if (!existsSync(FOLDKIT_DIST)) {
  console.error(
    'Build Foldkit first with pnpm build:packages; the prebundle guard checks emitted JavaScript, including VibeLang imports.',
  )
  process.exit(1)
}

const files = collectRuntimeFiles(FOLDKIT_DIST)
if (files.length === 0) {
  console.error(
    'No Foldkit runtime JavaScript found. Run pnpm build:packages before checking Effect prebundling.',
  )
  process.exit(1)
}

const required = new Set<string>()
for (const file of files) {
  for (const entry of extractEffectEntries(file)) required.add(entry)
}
const included = new Set(readForcedEffectEntries())
if (!included.has('effect')) {
  console.error(`ERROR: ${LIST_NAME} in ${PLUGIN_FILE} must include 'effect'.`)
  process.exit(1)
}

const missing = [...required].filter(entry => !included.has(entry)).sort()
if (missing.length > 0) {
  console.error(
    `ERROR: built Foldkit imports are missing from ${LIST_NAME} in ${PLUGIN_FILE}:`,
  )
  for (const entry of missing) console.error(`  '${entry}',`)
  console.error(
    'Include every runtime Effect entry so Vite prebundles it before serving the client.',
  )
  process.exit(1)
}
console.log(
  `OK: ${required.size} Effect entries verified across ${files.length} built runtime files, including VibeLang output.`,
)
