import MagicString, { type SourceMap } from 'magic-string'
import { createRequire } from 'node:module'
import { relative, resolve, sep } from 'node:path'
import { parseAst } from 'vite'

import { TraceMap, originalPositionFor } from '@jridgewell/trace-mapping'

const BRAND_MODULE_SPECIFIER = 'foldkit/brand'
const BRAND_EXPORT_NAME = 'brandViewResult'
const BRAND_IMPORT_ALIAS = '__foldkitBrandViewResult'
const FIRST_ALIAS_SUFFIX = 2
const FIRST_DUPLICATE_NAME_SUFFIX = 2
const DEFAULT_EXPORT_FUNCTION_NAME = 'default'
const ANONYMOUS_FUNCTION_NAME = 'anonymous'
const FOLDKIT_CORE_PATH_FRAGMENT = 'packages/foldkit/'
const VIRTUAL_MODULE_PREFIX = '\0'
const SCRIPT_FILE_PATTERN = /\.(?:ts|tsx|js|jsx|mts|mjs|vibe)$/

// AST

interface AstNode {
  readonly type: string
  readonly start: number
  readonly end: number
  readonly [field: string]: unknown
}

interface IdentifierNode extends AstNode {
  readonly type: 'Identifier'
  readonly name: string
}

interface PrivateIdentifierNode extends AstNode {
  readonly type: 'PrivateIdentifier'
  readonly name: string
}

interface LiteralNode extends AstNode {
  readonly type: 'Literal'
  readonly value: unknown
}

interface MemberExpressionNode extends AstNode {
  readonly type: 'MemberExpression'
  readonly object: AstNode
  readonly property: AstNode
  readonly computed: boolean
}

interface AssignmentExpressionNode extends AstNode {
  readonly type: 'AssignmentExpression'
  readonly left: AstNode
  readonly right: AstNode
}

interface FunctionNode extends AstNode {
  readonly body: AstNode
  readonly id?: AstNode | null
}

interface ReturnStatementNode extends AstNode {
  readonly type: 'ReturnStatement'
  readonly argument: AstNode | null
}

interface VariableDeclaratorNode extends AstNode {
  readonly type: 'VariableDeclarator'
  readonly id: AstNode
  readonly init: AstNode | null
}

interface NamedValueNode extends AstNode {
  readonly key: AstNode
  readonly value: AstNode
  readonly computed: boolean
}

const isAstNode = (value: unknown): value is AstNode =>
  typeof value === 'object' &&
  value !== null &&
  'type' in value &&
  typeof value.type === 'string'

const isIdentifier = (node: AstNode): node is IdentifierNode =>
  node.type === 'Identifier'

const isPrivateIdentifier = (node: AstNode): node is PrivateIdentifierNode =>
  node.type === 'PrivateIdentifier'

const isLiteral = (node: AstNode): node is LiteralNode =>
  node.type === 'Literal'

const isMemberExpression = (node: AstNode): node is MemberExpressionNode =>
  node.type === 'MemberExpression'

const isAssignmentExpression = (
  node: AstNode,
): node is AssignmentExpressionNode => node.type === 'AssignmentExpression'

const FUNCTION_NODE_TYPES: ReadonlySet<string> = new Set([
  'ArrowFunctionExpression',
  'FunctionExpression',
  'FunctionDeclaration',
])

const isFunctionNode = (node: AstNode): node is FunctionNode =>
  FUNCTION_NODE_TYPES.has(node.type)

const isReturnStatement = (node: AstNode): node is ReturnStatementNode =>
  node.type === 'ReturnStatement'

const isVariableDeclarator = (node: AstNode): node is VariableDeclaratorNode =>
  node.type === 'VariableDeclarator'

const NAMED_VALUE_NODE_TYPES: ReadonlySet<string> = new Set([
  'Property',
  'MethodDefinition',
  'PropertyDefinition',
])

const isNamedValueNode = (node: AstNode): node is NamedValueNode =>
  NAMED_VALUE_NODE_TYPES.has(node.type) &&
  isAstNode(node['key']) &&
  isAstNode(node['value'])

const walkChildNodes = (
  node: AstNode,
  visitChild: (child: AstNode) => void,
): void => {
  for (const [fieldName, fieldValue] of Object.entries(node)) {
    if (fieldName === 'parent') {
      continue
    }
    if (isAstNode(fieldValue)) {
      visitChild(fieldValue)
    } else if (Array.isArray(fieldValue)) {
      for (const element of fieldValue) {
        if (isAstNode(element)) {
          visitChild(element)
        }
      }
    }
  }
}

const parseProgram = (code: string): AstNode | null => {
  try {
    const program: unknown = parseAst(code)
    if (isAstNode(program)) {
      return program
    }
    return null
  } catch {
    return null
  }
}

// ELIGIBILITY

export const stripQuery = (id: string): string => {
  const [pathWithoutQuery] = id.split('?')
  return pathWithoutQuery ?? id
}

// NOTE: a query another loader owns requests the file as text or as an asset
// (`?raw`, `?url`, `?worker`, the website's `?highlighted`), so the code Vite
// hands this transform is not the module's code and must not be branded: it
// stays with its loader. Module requests carrying Vite's cache and import
// markers (`?v=`, `?t=`, `?import`) keep their view identity.
const ASSET_QUERY_KEYS: ReadonlySet<string> = new Set([
  'raw',
  'highlighted',
  'url',
  'inline',
  'no-inline',
  'worker',
  'sharedworker',
  'init',
])

export const hasAssetQuery = (id: string): boolean => {
  const queryStart = id.indexOf('?')
  if (queryStart === -1) {
    return false
  }
  return Array.from(new URLSearchParams(id.slice(queryStart + 1)).keys()).some(
    key => ASSET_QUERY_KEYS.has(key),
  )
}

export const toPosixPath = (filePath: string): string =>
  filePath.split(sep).join('/')

const NODE_MODULES_SEGMENT_PATTERN = /(?:^|\/)node_modules(?:\/|$)/

const BRAND_MODULE_STATEMENT_TYPES: ReadonlySet<string> = new Set([
  'ImportDeclaration',
  'ExportNamedDeclaration',
  'ExportAllDeclaration',
])

const isBrandModuleStatement = (statement: AstNode): boolean => {
  if (!BRAND_MODULE_STATEMENT_TYPES.has(statement.type)) {
    return false
  }
  const source = statement['source']
  return (
    isAstNode(source) &&
    isLiteral(source) &&
    source.value === BRAND_MODULE_SPECIFIER
  )
}

const isAlreadyBranded = (program: AstNode): boolean => {
  const body = program['body']
  if (!Array.isArray(body)) {
    return false
  }
  return body.some(
    statement => isAstNode(statement) && isBrandModuleStatement(statement),
  )
}

const isEligibleModuleId = (
  id: string,
  isFoldkitCoreResolved: boolean,
): boolean => {
  if (id.startsWith(VIRTUAL_MODULE_PREFIX) || hasAssetQuery(id)) {
    return false
  }
  const strippedId = stripQuery(id)
  const normalizedId = toPosixPath(strippedId)
  if (NODE_MODULES_SEGMENT_PATTERN.test(normalizedId)) {
    return false
  }
  if (
    normalizedId.endsWith('.d.vibe.ts') ||
    !SCRIPT_FILE_PATTERN.test(strippedId)
  ) {
    return false
  }
  // NOTE: the unanchored `packages/foldkit/` fragment is a best-effort
  // fallback, applied only when the installed foldkit package could not be
  // resolved. When it was resolved, the plugin's precise `foldkitPackageRoot`
  // gate already excluded core, so re-applying the fragment here would wrongly
  // un-brand a consumer whose own app path merely contains the segment (a
  // workspace named `foldkit`, a vendored fork holding app code).
  if (isFoldkitCoreResolved) {
    return true
  }
  return !normalizedId.includes(FOLDKIT_CORE_PATH_FRAGMENT)
}

// NAMING

type FunctionCollection = Readonly<{
  functionNodes: ReadonlyArray<FunctionNode>
  parentByNode: ReadonlyMap<AstNode, AstNode>
}>

const collectFunctionNodes = (program: AstNode): FunctionCollection => {
  const functionNodes: Array<FunctionNode> = []
  const parentByNode = new Map<AstNode, AstNode>()
  const visitNode = (node: AstNode): void => {
    if (isFunctionNode(node)) {
      functionNodes.push(node)
    }
    walkChildNodes(node, child => {
      parentByNode.set(child, node)
      visitNode(child)
    })
  }
  visitNode(program)
  const orderedFunctionNodes = [...functionNodes].sort(
    (first, second) => first.start - second.start,
  )
  return { functionNodes: orderedFunctionNodes, parentByNode }
}

const namedKeyText = (key: AstNode): string | undefined => {
  if (isIdentifier(key) || isPrivateIdentifier(key)) {
    return key.name
  }
  if (isLiteral(key) && typeof key.value === 'string') {
    return key.value
  }
  return undefined
}

const rawFunctionName = (
  functionNode: FunctionNode,
  parentByNode: ReadonlyMap<AstNode, AstNode>,
): string => {
  if (
    functionNode.id !== null &&
    functionNode.id !== undefined &&
    isIdentifier(functionNode.id)
  ) {
    return functionNode.id.name
  }
  const parent = parentByNode.get(functionNode)
  if (parent === undefined) {
    return ANONYMOUS_FUNCTION_NAME
  }
  if (
    isVariableDeclarator(parent) &&
    parent.init === functionNode &&
    isIdentifier(parent.id)
  ) {
    return parent.id.name
  }
  if (
    isNamedValueNode(parent) &&
    parent.value === functionNode &&
    !parent.computed
  ) {
    return namedKeyText(parent.key) ?? ANONYMOUS_FUNCTION_NAME
  }
  if (parent.type === 'ExportDefaultDeclaration') {
    return DEFAULT_EXPORT_FUNCTION_NAME
  }
  if (
    isAssignmentExpression(parent) &&
    parent.right === functionNode &&
    isMemberExpression(parent.left) &&
    !parent.left.computed &&
    isIdentifier(parent.left.property)
  ) {
    return parent.left.property.name
  }
  return ANONYMOUS_FUNCTION_NAME
}

// NOTE: a view identity names a source position, and a source position outlives
// the code that occupied it. Hydration compares identities to decide whether the
// server DOM and the client's first render describe the same logical element, so
// an identity that stays the same while the function's body changes tells it two
// different views are the same one: a stale page's `<input name="email">` is
// adopted by a new build's `<input name="ssn">`, and the value the visitor typed
// before hydration is carried into a field that means something else and submits
// under a new name. That is what the deployment's build id answers: it is
// compared before hydration reads anything the page carries, so a page from a
// build whose views mean something else is refused as a whole.
//
// An identity carries no digest of the module's source, and must not. Mixing
// one in would make a changed view rebuild its own subtree, which is the reason
// to want it, but the identity is emitted into the client bundle every visitor
// downloads, and a truncated hash of a whole source file is a check against that
// file's contents. A build that tree-shakes a low-entropy server-only value out
// of the client (a PIN behind `import.meta.env.SSR`) would still ship a digest
// of the source that contained it, and the value could be recovered by hashing
// candidates until one matched. The build id costs nothing to compare and
// reveals nothing about the source. `check:packed-ssr-consumer` asserts the
// absence against a real built bundle.
const assignFunctionIds = (
  functionNodes: ReadonlyArray<FunctionNode>,
  parentByNode: ReadonlyMap<AstNode, AstNode>,
  modulePath: string,
): ReadonlyMap<FunctionNode, string> => {
  const functionIds = new Map<FunctionNode, string>()
  const occurrenceCountsByName = new Map<string, number>()
  for (const functionNode of functionNodes) {
    const functionName = rawFunctionName(functionNode, parentByNode)
    const occurrenceCount = (occurrenceCountsByName.get(functionName) ?? 0) + 1
    occurrenceCountsByName.set(functionName, occurrenceCount)
    const uniqueFunctionName =
      occurrenceCount < FIRST_DUPLICATE_NAME_SUFFIX
        ? functionName
        : `${functionName}~${occurrenceCount}`
    functionIds.set(functionNode, `${modulePath}#${uniqueFunctionName}`)
  }
  return functionIds
}

// WRAPS

type Wrap = Readonly<{
  target: AstNode
  functionId: string
}>

const ownReturnArguments = (functionBody: AstNode): Array<AstNode> => {
  const returnArguments: Array<AstNode> = []
  const collectFromNode = (node: AstNode): void => {
    if (isFunctionNode(node)) {
      return
    }
    if (isReturnStatement(node)) {
      if (node.argument !== null && node.argument !== undefined) {
        returnArguments.push(node.argument)
      }
      return
    }
    walkChildNodes(node, collectFromNode)
  }
  walkChildNodes(functionBody, collectFromNode)
  return returnArguments
}

const wrapTargets = (functionNode: FunctionNode): Array<AstNode> => {
  if (functionNode.body.type === 'BlockStatement') {
    return ownReturnArguments(functionNode.body)
  }
  return [functionNode.body]
}

const collectWraps = (
  functionNodes: ReadonlyArray<FunctionNode>,
  functionIds: ReadonlyMap<FunctionNode, string>,
): Array<Wrap> => {
  const wraps: Array<Wrap> = []
  for (const functionNode of functionNodes) {
    const functionId = functionIds.get(functionNode)
    if (functionId === undefined) {
      continue
    }
    for (const target of wrapTargets(functionNode)) {
      wraps.push({ target, functionId })
    }
  }
  return wraps
}

const isDirectiveStatement = (node: AstNode): boolean =>
  node.type === 'ExpressionStatement' && typeof node['directive'] === 'string'

const hashbangEndOffset = (program: AstNode): number => {
  const hashbang = program['hashbang']
  if (isAstNode(hashbang)) {
    return hashbang.end
  }
  return 0
}

const importInsertionOffset = (program: AstNode): number => {
  const body = program['body']
  if (!Array.isArray(body)) {
    return hashbangEndOffset(program)
  }
  let offset = hashbangEndOffset(program)
  for (const statement of body) {
    if (!isAstNode(statement) || !isDirectiveStatement(statement)) {
      break
    }
    offset = statement.end
  }
  return offset
}

const uniqueBrandAlias = (code: string): string => {
  if (!code.includes(BRAND_IMPORT_ALIAS)) {
    return BRAND_IMPORT_ALIAS
  }
  for (let suffix = FIRST_ALIAS_SUFFIX; ; suffix += 1) {
    const candidate = `${BRAND_IMPORT_ALIAS}${suffix}`
    if (!code.includes(candidate)) {
      return candidate
    }
  }
}

export type NativeSource = Readonly<{
  map: string
  url: string
  parserRoot: string
}>

const nativeFunctionIds = (
  code: string,
  compiledFunctions: ReadonlyArray<FunctionNode>,
  compiledParents: ReadonlyMap<AstNode, AstNode>,
  modulePath: string,
  source: NativeSource,
): ReadonlyMap<FunctionNode, string> => {
  const map = new TraceMap(source.map, source.url)
  const requireFromRoot = createRequire(
    resolve(source.parserRoot, 'package.json'),
  )
  const parser: unknown = requireFromRoot('vibelang/eslint')
  if (
    typeof parser !== 'object' ||
    parser === null ||
    !('parseForESLint' in parser) ||
    typeof parser.parseForESLint !== 'function'
  ) {
    throw new Error('Native view identity requires the vibelang/eslint parser')
  }
  const parseNative = parser.parseForESLint
  const sourceFunctions = new Map<
    string,
    Readonly<{
      text: string
      functions: ReadonlyArray<FunctionNode>
      ids: ReadonlyMap<FunctionNode, string>
    }>
  >()
  for (const [index, sourcePath] of map.resolvedSources.entries()) {
    const text = map.sourcesContent?.[index]
    if (!sourcePath.endsWith('.vibe') || text === null || text === undefined)
      continue
    const parsed: unknown = parseNative(text, { filePath: sourcePath })
    if (
      typeof parsed !== 'object' ||
      parsed === null ||
      !('ast' in parsed) ||
      !isAstNode(parsed.ast)
    ) {
      throw new Error('Native view identity could not parse original source')
    }
    // The compiler's ESTree includes lowered match helpers. Their empty source
    // header distinguishes them from actual source functions, including IIFEs.
    const normalize = (node: AstNode): AstNode => {
      const fields: Record<string, unknown> = {}
      for (const [key, value] of Object.entries(node)) {
        if (key === 'parent') continue
        fields[key] = isAstNode(value)
          ? normalize(value)
          : Array.isArray(value)
            ? value.map(item => (isAstNode(item) ? normalize(item) : item))
            : value
      }
      const range = node['range']
      const start =
        Array.isArray(range) && typeof range[0] === 'number'
          ? range[0]
          : node.start
      const end =
        Array.isArray(range) && typeof range[1] === 'number'
          ? range[1]
          : node.end
      return { ...fields, type: node.type, start, end }
    }
    const collection = collectFunctionNodes(normalize(parsed.ast))
    const functions = collection.functionNodes.filter(node => {
      if (node.body.start <= node.start) return false
      const header = text.slice(node.start, node.body.start)
      const parent = collection.parentByNode.get(node)
      return (
        header.includes('=>') ||
        /\b(?:function|fn)\b/.test(header) ||
        (parent !== undefined &&
          isNamedValueNode(parent) &&
          (parent.type === 'MethodDefinition' || parent['method'] === true))
      )
    })
    sourceFunctions.set(sourcePath, {
      text,
      functions,
      ids: assignFunctionIds(functions, collection.parentByNode, modulePath),
    })
  }
  if (sourceFunctions.size === 0) {
    throw new Error(
      'Native view identity requires original .vibe sources and source content in the compiler source map',
    )
  }
  const ids = new Map<FunctionNode, string>()
  const mappedOwner = (offset: number): string | undefined => {
    const prefix = code.slice(0, offset)
    const lineStart = prefix.lastIndexOf('\n') + 1
    const position = originalPositionFor(map, {
      line: prefix.split('\n').length,
      column: offset - lineStart,
    })
    if (
      position.source === null ||
      position.line === null ||
      position.column === null
    )
      return undefined
    const original = sourceFunctions.get(position.source)
    if (original === undefined) return undefined
    const lines = original.text.split('\n')
    const sourceOffset =
      lines
        .slice(0, position.line - 1)
        .reduce((sum, line) => sum + line.length + 1, 0) + position.column
    const owner = original.functions
      .filter(node => node.start <= sourceOffset && sourceOffset < node.end)
      .sort(
        (left, right) => left.end - left.start - (right.end - right.start),
      )[0]
    return owner === undefined ? undefined : original.ids.get(owner)
  }
  for (const node of compiledFunctions) {
    let owner = mappedOwner(node.start) ?? mappedOwner(node.body.start)
    let parent = compiledParents.get(node)
    while (owner === undefined && parent !== undefined) {
      if (isFunctionNode(parent)) owner = ids.get(parent)
      parent = compiledParents.get(parent)
    }
    if (owner !== undefined) ids.set(node, owner)
  }
  return ids
}

export const transformCode = (
  code: string,
  id: string,
  root: string,
  options?: Readonly<{
    isFoldkitCoreResolved?: boolean
  }>,
  nativeSource?: () => NativeSource,
): Readonly<{ code: string; map: SourceMap }> | null => {
  if (!isEligibleModuleId(id, options?.isFoldkitCoreResolved ?? false)) {
    return null
  }
  const program = parseProgram(code)
  if (program === null) {
    return null
  }
  if (code.includes(BRAND_MODULE_SPECIFIER) && isAlreadyBranded(program)) {
    return null
  }
  const { functionNodes, parentByNode } = collectFunctionNodes(program)
  // Keep existing owners stable when a TypeScript module migrates to VibeLang.
  const modulePath = toPosixPath(relative(root, stripQuery(id))).replace(
    /\.vibe(?=\.js$|$)/,
    stripQuery(id).endsWith('.vibe') ? '.ts' : '',
  )
  const functionIds =
    nativeSource === undefined
      ? assignFunctionIds(functionNodes, parentByNode, modulePath)
      : nativeFunctionIds(
          code,
          functionNodes,
          parentByNode,
          modulePath,
          nativeSource(),
        )
  const wraps = collectWraps(functionNodes, functionIds)
  if (wraps.length === 0) {
    return null
  }
  const brandAlias = uniqueBrandAlias(code)
  const sourceText = new MagicString(code)
  // NOTE: applied in descending target order so that when a nested wrap ends
  // exactly where its enclosing wrap ends (`return () => x`), the inner
  // closer is appended first and the calls nest correctly.
  const orderedWraps = [...wraps].sort(
    (first, second) => second.target.start - first.target.start,
  )
  for (const { target, functionId } of orderedWraps) {
    sourceText.appendLeft(target.start, `${brandAlias}((`)
    sourceText.appendRight(target.end, `), ${JSON.stringify(functionId)})`)
  }
  const importStatement = `import { ${BRAND_EXPORT_NAME} as ${brandAlias} } from '${BRAND_MODULE_SPECIFIER}'\n`
  const insertionOffset = importInsertionOffset(program)
  if (insertionOffset === 0) {
    sourceText.prepend(importStatement)
  } else {
    sourceText.appendLeft(insertionOffset, `\n${importStatement}`)
  }
  return {
    code: sourceText.toString(),
    map: sourceText.generateMap({ hires: 'boundary' }),
  }
}
