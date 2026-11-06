import { createRequire } from 'node:module'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ts = createRequire(
  resolve(dirname(fileURLToPath(import.meta.url)), '../../../package.json'),
)('typescript')
const semanticFlags =
  ts.NodeFlags.Const |
  ts.NodeFlags.Let |
  ts.NodeFlags.Using |
  ts.NodeFlags.AwaitUsing |
  ts.NodeFlags.Namespace |
  ts.NodeFlags.GlobalAugmentation

// Compare declaration syntax and documentation. Generated failure metadata and
// emitter whitespace do not change the TypeScript API.
export const declarationContract = input => {
  const source = String(input)
  const file = ts.createSourceFile(
    'contract.d.ts',
    source,
    ts.ScriptTarget.Latest,
    true,
  )
  if (file.parseDiagnostics.length)
    throw new Error('Invalid declaration fixture')
  const comment = value =>
    typeof value === 'string'
      ? value.trim()
      : value === undefined
        ? ''
        : Array.from(value, shape)
  const generated = tag =>
    tag.tagName.text === 'throws' &&
    tag.typeExpression?.type.kind === ts.SyntaxKind.NeverKeyword
  const shape = node => {
    const children = []
    ts.forEachChild(node, child => {
      children.push(shape(child))
    })
    const value = { kind: node.kind, children }
    if (node.flags & semanticFlags) value.flags = node.flags & semanticFlags
    if (typeof node.text === 'string' && node.kind !== ts.SyntaxKind.SourceFile)
      value.text = node.text
    for (const flag of [
      'isTypeOnly',
      'isTypeOf',
      'isNameFirst',
      'isBracketed',
    ]) {
      if (typeof node[flag] === 'boolean') value[flag] = node[flag]
    }
    if (node.comment !== undefined) value.comment = comment(node.comment)
    const docs = (node.jsDoc ?? [])
      .map(doc => ({
        comment: comment(doc.comment),
        tags: Array.from(doc.tags ?? [])
          .filter(tag => !generated(tag))
          .map(shape),
      }))
      .filter(doc => doc.comment !== '' || doc.tags.length !== 0)
    if (docs.length) value.docs = docs
    return value
  }
  const references = field => file[field].map(reference => reference.fileName)
  return JSON.stringify({
    syntax: shape(file),
    references: references('referencedFiles'),
    types: references('typeReferenceDirectives'),
    libs: references('libReferenceDirectives'),
    noDefaultLib: file.hasNoDefaultLib,
  })
}
