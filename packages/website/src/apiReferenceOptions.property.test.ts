// @vitest-environment node
import { spawnSync } from 'node:child_process'
import { mkdtempSync, rmSync, symlinkSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { expect, test } from 'vitest'

import corpus from './fixtures/foldkit-api-reference-option-matches.json'
import source from './page/apiReference/domain.vibe?raw'
import printer from './page/apiReference/typeToString.vibe?raw'
import typedoc from './page/apiReference/typedoc.vibe?raw'

test('keeps optional API data and getter order with native choices', () => {
  const directory = mkdtempSync(join(tmpdir(), 'foldkit-api-options-'))
  try {
    symlinkSync(
      join(process.cwd(), 'node_modules'),
      join(directory, 'node_modules'),
    )
    writeFileSync(
      join(directory, 'domain.vibe'),
      source +
        `
export { parseSignatures, parseType, collectFromItems, collectModules,
  parseParameter, itemToDescription, itemToSourceUrl, parseItemsAsModule,
  itemFingerprintEntries, variableQualifiedName }
`,
    )
    writeFileSync(join(directory, 'typedoc.vibe'), typedoc)
    writeFileSync(join(directory, 'typeToString.vibe'), printer)
    writeFileSync(join(directory, 'package.json'), '{"type":"module"}')
    writeFileSync(
      join(directory, 'tsconfig.json'),
      JSON.stringify({
        compilerOptions: {
          strict: true,
          skipLibCheck: true,
          module: 'ESNext',
          moduleResolution: 'Bundler',
          target: 'ESNext',
          types: [],
          outDir: '.',
          rewriteRelativeImportExtensions: true,
        },
        files: ['domain.vibe'],
      }),
    )
    const compiled = spawnSync(
      join(process.cwd(), 'node_modules/.bin/vibelang'),
      [
        '--singleThreaded',
        '-p',
        join(directory, 'tsconfig.json'),
        '--pretty',
        'false',
      ],
      { encoding: 'utf8', timeout: 30_000 },
    )
    expect(compiled.status, compiled.stdout + compiled.stderr).toBe(0)
    expect(compiled.stdout + compiled.stderr).not.toMatch(/EK4839/)
    writeFileSync(
      join(directory, 'run.mjs'),
      `
import assert from 'node:assert/strict'
import fc from 'fast-check'
import { Option, Schema } from 'effect'
import * as actual from './domain.js'
import { typeToString, typeDefFromChildren } from './typeToString.js'
import { Kind, TypeDocItem } from './typedoc.js'
const decode = Schema.decodeUnknownSync(TypeDocItem)
const referenceSignatures = (schemas, item) => Option.match(item.signatures, {
  onNone: () => [],
  onSome: signatures => signatures.map(signature => ({
    parameters: Option.match(signature.parameters, {
      onNone: () => [],
      onSome: parameters => parameters.map(actual.parseParameter(schemas)),
    }),
    returnType: typeToString(signature.type, 0, schemas),
    typeParameters: Option.match(signature.typeParameters, {
      onNone: () => [],
      onSome: parameters => parameters.map(({ name }) => name),
    }),
  })),
})
const referenceType = (schemas, item) => ({
  name: item.name, description: actual.itemToDescription(item),
  typeDefinition: Option.match(item.type, {
    onNone: () => typeDefFromChildren(item.children, schemas),
    onSome: () => typeToString(item.type, 0, schemas),
  }),
  sourceUrl: actual.itemToSourceUrl(item),
})
const referenceItems = (path, items) => items.flatMap(item =>
  item.kind === Kind.Variable ? actual.itemFingerprintEntries(actual.variableQualifiedName(path, item.name), item) :
  item.kind === Kind.Namespace ? Option.match(item.children, {
    onNone: () => [], onSome: children => referenceItems(path + '/' + item.name, children),
  }) : [])
const referenceModules = (schemas, path, children) => {
  const namespaces = children.filter(item => item.kind === Kind.Namespace)
  const direct = children.filter(item => item.kind !== Kind.Namespace)
  const nested = namespaces.flatMap(namespace => Option.match(namespace.children, {
    onNone: () => [], onSome: children => referenceModules(schemas, path + '/' + namespace.name, children),
  }))
  return direct.length ? [actual.parseItemsAsModule(schemas, path, direct), ...nested] : nested
}
function tracked(input) {
  const events = []
  const item = { ...input }
  const watch = (target, key, name, value) => Object.defineProperty(target, key, {
    configurable: true, enumerable: true, get() { events.push(name); return value },
  })
  const signatures = Option.map(input.signatures, signatures => signatures.map((signature, index) => {
    const value = { ...signature }
    for (const field of ['parameters', 'type', 'typeParameters']) watch(value, field, index + ':' + field, signature[field])
    return value
  }))
  watch(item, 'signatures', 'signatures', signatures)
  watch(item, 'type', 'type', input.type)
  watch(item, 'children', 'children', input.children)
  return { item, events }
}
const descriptor = (id, name, kind) => ({ id, name, kind, variant: 'declaration' })
const inputs = fc.record({
  signatures: fc.option(fc.array(fc.record({
    parameters: fc.option(fc.array(fc.constantFrom('string', 'number'), { maxLength: 4 }), { nil: undefined }),
    types: fc.option(fc.array(fc.string({ maxLength: 8 }), { maxLength: 4 }), { nil: undefined }),
    result: fc.option(fc.constantFrom('string', 'number'), { nil: undefined }),
  }), { maxLength: 4 }), { nil: undefined }),
  type: fc.option(fc.constantFrom('string', 'number'), { nil: undefined }),
  depth: fc.integer({ min: 0, max: 4 }), missingChildren: fc.boolean(),
})
await fc.assert(fc.asyncProperty(inputs, async input => {
  let next = 1
  const item = decode({
    ...descriptor(next++, 'entry', Kind.Function),
    type: input.type === undefined ? undefined : { type: 'intrinsic', name: input.type },
    signatures: input.signatures?.map((signature, index) => ({
      ...descriptor(next++, 'signature' + index, Kind.CallSignature),
      parameters: signature.parameters?.map((name, i) => ({
        ...descriptor(next++, 'arg' + i, Kind.Parameter), type: { type: 'intrinsic', name },
      })),
      typeParameters: signature.types?.map(name => descriptor(next++, name, Kind.TypeParameter)),
      type: signature.result === undefined ? undefined : { type: 'intrinsic', name: signature.result },
    })),
  })
  const schemas = new Map()
  for (const [call, reference] of [[actual.parseSignatures, referenceSignatures], [actual.parseType(schemas), value => referenceType(schemas, value)]]) {
    const left = tracked(item), right = tracked(item)
    const actualValue = call === actual.parseSignatures ? call(schemas, left.item) : call(left.item)
    const expected = reference === referenceSignatures ? reference(schemas, right.item) : reference(right.item)
    assert.deepEqual(actualValue, expected)
    assert.deepEqual(left.events, right.events)
  }
  const member = decode({
    ...descriptor(next++, 'Model', Kind.Variable),
    type: { type: 'reference', name: 'Struct',
      target: { packageName: 'effect', packagePath: 'Schema.ts', qualifiedName: 'Struct' },
      typeArguments: [{ type: 'reflection', declaration: {
        ...descriptor(next++, 'shape', Kind.TypeLiteral),
        children: [{ ...descriptor(next++, 'value', Kind.Property), type: { type: 'intrinsic', name: 'string' } }],
      } }],
    },
  })
  let children = [item, member]
  for (let level = 0; level < input.depth; level++) {
    const namespace = decode(descriptor(next++, 'Nested' + level, Kind.Namespace))
    children = [{ ...namespace, children: input.missingChildren ? Option.none() : Option.some(children) }]
  }
  assert.deepEqual(actual.collectFromItems('Root', children), referenceItems('Root', children))
  assert.deepEqual(actual.collectModules(schemas, 'Root', children), referenceModules(schemas, 'Root', children))
}), { seed: ${corpus.seed}, numRuns: ${corpus.runs} })
console.log('API_OPTIONS_PROPERTY 200 nested models, four kernels, None/Some/empty and exact getter order')
`,
    )
    const executed = spawnSync(process.execPath, [join(directory, 'run.mjs')], {
      encoding: 'utf8',
      timeout: 20_000,
    })
    expect(executed.status, executed.stdout + executed.stderr).toBe(0)
  } finally {
    rmSync(directory, { recursive: true, force: true })
  }
})
