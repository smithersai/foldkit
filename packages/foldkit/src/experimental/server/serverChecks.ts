// Structural checks on rendered markup for `server.vibe`: what HTML parsing
// does to the served root, hydration handoff markers, framing, `<noscript>`
// modes and document structure. A check reports a refusal by throwing, and a
// plain function in VibeLang does not throw, so these live in plain
// TypeScript: `renderToString` runs them inside `Effect.try`, and
// `injectIntoTemplate` calls the `__assert` exports directly.
import type { DefaultTreeAdapterMap } from 'parse5'
import {
  html as Parse5Html,
  defaultTreeAdapter,
  parse,
  parseFragment,
} from 'parse5'

import { HYDRATION_BUILD_ATTRIBUTE } from '../../buildToken.js'
import {
  MATHML_NAMESPACE,
  SVG_NAMESPACE,
  parsedAttributeName,
} from '../../domReflection.js'
import type { Document } from '../../html/index.js'
import {
  FOLDKIT_APP_ATTRIBUTE,
  FOLDKIT_FLAGS_ATTRIBUTE,
} from '../../hydrationMarker.js'
import {
  HYDRATION_IDENTITY_ATTRIBUTE,
  HYDRATION_KEY_ATTRIBUTE,
} from '../../hydrationMarkers.js'
import { hasTrustedInnerHtml } from '../../propertyProvenance.js'
import type { VNode } from '../../snabbdom/vnode.js'
import { tagNameFromSelector } from '../../tagName.js'
import type { ParsedFragmentModes } from './fragment.js'
import { controlledValueContent } from './serialize.vibe'

const HTML_NAMESPACE = 'http://www.w3.org/1999/xhtml'

type Parse5ChildNode = DefaultTreeAdapterMap['childNode']
type Parse5Element = DefaultTreeAdapterMap['element']

const isParse5Element = (node: Parse5ChildNode): node is Parse5Element =>
  'tagName' in node

// Only ASCII whitespace is inter-element whitespace an HTML parser may add or
// drop without changing meaning. Trimming with String.prototype.trim would also
// treat a non-breaking space or other Unicode whitespace as ignorable, letting
// a visible text node the parser foster-parented out of the root (a stray
// ` ` a <table> spills before itself) slip past the single-root guard.
const ASCII_WHITESPACE_ONLY = /^[ \t\n\f\r]*$/
const isIgnorableText = (node: Parse5ChildNode): boolean =>
  node.nodeName === '#text' &&
  'value' in node &&
  ASCII_WHITESPACE_ONLY.test(node.value)

type VnodeChild =
  | Readonly<{ kind: 'Element'; vnode: VNode }>
  | Readonly<{ kind: 'Text'; text: string }>
  | Readonly<{ kind: 'Comment'; text: string }>

type ParsedChild =
  | Readonly<{ kind: 'Element'; element: Parse5Element }>
  | Readonly<{ kind: 'Text'; text: string }>
  | Readonly<{ kind: 'Comment'; text: string }>

// The children a vnode declares, with consecutive text merged into one run.
// The serializer emits adjacent text children back to back, so the parser
// reads them as a single text node; merging both sides makes them comparable.
// A zero-length run is dropped: the serializer emits no node for empty text,
// so the parser produces none either.
const normalizeVnodeChildren = (vnode: VNode): ReadonlyArray<VnodeChild> => {
  const children = vnode.children
  if (children === undefined) {
    return []
  }
  const items: globalThis.Array<VnodeChild> = []
  let text = ''
  const flush = (): void => {
    if (text !== '') {
      items.push({ kind: 'Text', text })
    }
    text = ''
  }
  for (const child of children) {
    if (typeof child === 'string') {
      text += child
      continue
    }
    const selector = child.sel
    if (selector === undefined || selector === '') {
      text += child.text ?? ''
    } else if (selector === '!') {
      flush()
      items.push({ kind: 'Comment', text: child.text ?? '' })
    } else {
      flush()
      items.push({ kind: 'Element', vnode: child })
    }
  }
  flush()
  return items
}

const normalizeParsedChildren = (
  node: Readonly<{ childNodes: ReadonlyArray<Parse5ChildNode> }>,
): ReadonlyArray<ParsedChild> => {
  const items: globalThis.Array<ParsedChild> = []
  let text = ''
  const flush = (): void => {
    if (text !== '') {
      items.push({ kind: 'Text', text })
    }
    text = ''
  }
  for (const child of node.childNodes) {
    if (isParse5Element(child)) {
      flush()
      items.push({ kind: 'Element', element: child })
    } else if (child.nodeName === '#text' && 'value' in child) {
      text += child.value
    } else if (child.nodeName === '#comment' && 'data' in child) {
      flush()
      items.push({ kind: 'Comment', text: child.data })
    }
  }
  flush()
  return items
}

// The children a controlled `<textarea>` or `<output>` serializes to. Both emit
// their `value` prop as text content (for a textarea the serializer's
// leading-newline padding and the parser's leading-newline strip cancel, so the
// parsed text is the value verbatim), which the walk represents as a single text
// run, empty value omitted. An uncontrolled element serializes its own children,
// so they are validated normally, rejecting element children the parser folds
// into text.
const expectedControlledChildren = (
  vnode: VNode,
): ReadonlyArray<VnodeChild> => {
  const content = controlledValueContent(vnode.data?.props)
  if (content === undefined) {
    return normalizeVnodeChildren(vnode)
  }
  return content === '' ? [] : [{ kind: 'Text', text: content }]
}

// <noscript> and <template> parse their children into a place the differ never
// walks (noscript content is raw text while scripting is enabled; template
// children live in a separate content fragment), so a view that puts elements in
// either can never hydrate. They surface here as an ordinary child-structure
// mismatch, so name the real cause rather than the generic table guidance.
const structureMismatch = (parsed: Parse5Element): Error => {
  const tagName = parsed.tagName.toLowerCase()
  if (tagName === 'noscript') {
    return new Error(
      '[foldkit] <noscript> content cannot be server-rendered as elements. A ' +
        'browser parses <noscript> as raw text while scripting is enabled, so ' +
        'the child elements the view declares arrive as one text node and ' +
        'hydration cannot converge. A <noscript> with plain text works; put ' +
        'richer fallback markup in the HTML shell instead.',
    )
  }
  if (tagName === 'template') {
    return new Error(
      '[foldkit] <template> content cannot be server-rendered. A browser holds ' +
        'template children in a separate content fragment the differ does not ' +
        'walk, so hydration cannot reconcile them. Keep <template> markup in ' +
        'the HTML shell rather than the view.',
    )
  }
  return new Error(
    `[foldkit] HTML parsing changed the child structure inside ` +
      `<${parsed.tagName}>. It inserts, moves, or drops nodes the view did ` +
      'not write (a <tbody> around a bare <tr> in a <table>, text ' +
      'foster-parented out of a <table>), which hydration would rebuild as a ' +
      'mismatch. Write the structure HTML parsing produces, such as explicit ' +
      'table sections.',
  )
}

const expectedParsedTagName = (vnode: VNode): string => {
  const tagName = tagNameFromSelector(vnode.sel ?? '')
  return vnode.data?.ns === undefined ? tagName.toLowerCase() : tagName
}

const foreignTagNameMismatch = (
  parsedTagName: string,
  authoredTagName: string,
): Error =>
  new Error(
    `[foldkit] HTML parsing changed the foreign-content tag ` +
      `<${authoredTagName}> to <${parsedTagName}>. SVG and MathML tag names ` +
      'are case-sensitive when the client creates them. Use the canonical ' +
      'tag spelling so the served and fresh client DOM agree.',
  )

// Compare the child structure the browser parsed against the structure the
// view declared, recursively. The top-level check rejects a root that splits
// into siblings; this rejects a parser correction inside the root, whether an
// inserted element (the `<tbody>` a browser adds around a bare `<tr>`) or
// foster-parented text, which hydration would otherwise see as a whole-subtree
// mismatch.
const assertStructureMatches = (parsed: Parse5Element, vnode: VNode): void => {
  // `h.InnerHTML` owns an opaque, parser-produced subtree that the vnode does
  // not model as children, so it is left unwalked. A property that merely
  // carries the name is not that: the serializer emits the vnode's own children
  // for it, so they are walked like any others.
  if (hasTrustedInnerHtml(vnode.data?.props)) {
    assertInnerHtmlContextMatches(parsed, vnode)
    return
  }
  const parsedChildren = normalizeParsedChildren(parsed)
  const parsedTag = parsed.tagName.toLowerCase()
  const vnodeChildren =
    parsedTag === 'textarea' || parsedTag === 'output'
      ? expectedControlledChildren(vnode)
      : normalizeVnodeChildren(vnode)
  if (parsedChildren.length !== vnodeChildren.length) {
    throw structureMismatch(parsed)
  }
  for (const [index, parsedChild] of parsedChildren.entries()) {
    const vnodeChild = vnodeChildren[index]
    if (vnodeChild === undefined) {
      throw structureMismatch(parsed)
    }
    if (parsedChild.kind !== vnodeChild.kind) {
      throw structureMismatch(parsed)
    }
    if (parsedChild.kind === 'Element' && vnodeChild.kind === 'Element') {
      const expectedTag = expectedParsedTagName(vnodeChild.vnode)
      const expectedNamespace =
        typeof vnodeChild.vnode.data?.ns === 'string'
          ? vnodeChild.vnode.data.ns
          : HTML_NAMESPACE
      if (
        expectedNamespace !== HTML_NAMESPACE &&
        parsedChild.element.namespaceURI === expectedNamespace &&
        parsedChild.element.tagName !== expectedTag
      ) {
        throw foreignTagNameMismatch(parsedChild.element.tagName, expectedTag)
      }
      if (
        parsedChild.element.tagName !== expectedTag ||
        parsedChild.element.namespaceURI !== expectedNamespace
      ) {
        throw new Error(
          `[foldkit] HTML parsing produced <${parsedChild.element.tagName}> ` +
            `where the view declared <${expectedTag}> inside ` +
            `<${parsed.tagName}>. The browser inserts or reorders elements (a ` +
            '<tbody> around a bare <tr> in a <table>) that hydration would ' +
            'rebuild as a mismatch. Write the structure HTML parsing produces.',
        )
      }
      assertStructureMatches(parsedChild.element, vnodeChild.vnode)
    } else if (parsedChild.kind === 'Text' && vnodeChild.kind === 'Text') {
      if (parsedChild.text !== vnodeChild.text) {
        throw structureMismatch(parsed)
      }
    } else if (
      parsedChild.kind === 'Comment' &&
      vnodeChild.kind === 'Comment'
    ) {
      if (parsedChild.text !== vnodeChild.text) {
        throw structureMismatch(parsed)
      }
    }
  }
}

// injectIntoTemplate splices the rendered root where <div id="root"></div> was,
// so a browser parses the served markup in a <div> (in body) insertion context.
// parseFragment defaults to a <template> context, whose insertion mode keeps
// table-section tags (<td>, <tr>, <caption>, ...) that an in-body parse
// foster-parents or drops. Reusing a real <div> context node makes this check
// model the true insertion point, so a table-section root is rejected here
// instead of silently escaping the application root on the served page.
const buildDivFragmentContext = (): Parse5Element => {
  const [onlyChild] = parseFragment('<div></div>').childNodes
  if (onlyChild === undefined || !isParse5Element(onlyChild)) {
    throw new Error(
      '[foldkit] internal: could not build the <div> parse context',
    )
  }
  return onlyChild
}
export const DIV_FRAGMENT_CONTEXT: Parse5Element = buildDivFragmentContext()

// After serialization, confirm the root closes cleanly. An unterminated element
// inside the root (an unclosed `<textarea>`, `<script>`, `<style>`, comment, or
// `<plaintext>`, typically from an incomplete `InnerHTML` fragment) does not end
// at the root's own close tag, so it would swallow the Flags payload, the client
// entry, and everything after the root when the served document is parsed. The
// per-element structure walk skips `InnerHTML` subtrees, so this parses the root
// markup with a trailing sentinel comment and requires the sentinel to survive
// as a top-level sibling: if the root consumed it, so would the rest of the page.
//
// NOTE: the parse runs twice, because `<noscript>` has two parser modes and the
// document has to survive both. With scripting enabled, the state a hydrating
// visitor's browser is in, noscript content is raw text. With scripting
// disabled, the state noscript exists to serve, the same content parses as HTML,
// so an unterminated element inside a noscript fallback swallows the rest of the
// page for exactly the visitors the fallback was written for. Both modes are
// checked, so a fallback that frames cleanly for one visitor cannot break the
// document for the other.
const TRAILING_SENTINEL_DATA = 'foldkit-trailing-boundary'
const TRAILING_SENTINEL = `<!--${TRAILING_SENTINEL_DATA}-->`

const closesCleanly = (html: string, isScriptingEnabled: boolean): boolean => {
  const fragment = parseFragment(
    DIV_FRAGMENT_CONTEXT,
    html + TRAILING_SENTINEL,
    {
      scriptingEnabled: isScriptingEnabled,
    },
  )
  const significant = fragment.childNodes.filter(node => !isIgnorableText(node))
  const last = significant[significant.length - 1]
  return (
    last !== undefined &&
    last.nodeName === '#comment' &&
    'data' in last &&
    last.data === TRAILING_SENTINEL_DATA
  )
}

// Framing is not the only thing `<noscript>` can break. An element the fallback
// leaves open does not have to reach the end of the document to do damage: with
// scripting disabled an unclosed `<form>` or `<table>` stops at the root's close
// tag, so the document still frames cleanly, while everything between it and
// that close tag is pulled inside the fallback and disappears from the page a
// visitor without JavaScript sees.
//
// The check is a comparison rather than a scan, because the two parser modes
// have to agree on everything except the one place they are meant to differ.
// The serialized root is parsed both ways and the trees compared, descending
// into every element except `<noscript>`, whose content is raw text in one mode
// and markup in the other by design. What must match is where each `<noscript>`
// sits and what follows it. Comparing the parsed output rather than the declared
// vnodes also covers a `<noscript>` that arrives inside an `h.InnerHTML`
// fragment, which no walk over the view's own children can see.
// `<noscript>` means something to the parser only in the HTML namespace. Inside
// SVG or MathML an element of that name is an ordinary foreign element whose
// content parses the same way in both modes, so skipping it there would leave a
// real HTML `<noscript>` nested below it unchecked. `<template>` holds its
// children in a separate content fragment rather than in `childNodes`, so its
// content is traversed explicitly; a fallback inside one is invisible otherwise,
// and declarative shadow DOM makes that content live in the page.
const isHtmlNoscript = (element: Parse5Element): boolean =>
  element.tagName.toLowerCase() === 'noscript' &&
  element.namespaceURI === HTML_NAMESPACE

const traversableContent = (
  element: Parse5Element,
): Readonly<{ childNodes: ReadonlyArray<Parse5ChildNode> }> => {
  if (
    element.tagName.toLowerCase() === 'template' &&
    element.namespaceURI === HTML_NAMESPACE &&
    'content' in element
  ) {
    const content = element.content
    if (
      typeof content === 'object' &&
      content !== null &&
      'childNodes' in content
    ) {
      /* eslint-disable-next-line @typescript-eslint/consistent-type-assertions */
      return content as Readonly<{ childNodes: ReadonlyArray<Parse5ChildNode> }>
    }
  }
  return element
}

const parsedChildrenAgree = (
  scripted: Readonly<{ childNodes: ReadonlyArray<Parse5ChildNode> }>,
  unscripted: Readonly<{ childNodes: ReadonlyArray<Parse5ChildNode> }>,
): boolean => {
  const scriptedChildren = normalizeParsedChildren(scripted)
  const unscriptedChildren = normalizeParsedChildren(unscripted)
  if (scriptedChildren.length !== unscriptedChildren.length) {
    return false
  }
  for (const [index, scriptedChild] of scriptedChildren.entries()) {
    const unscriptedChild = unscriptedChildren[index]
    if (unscriptedChild === undefined) {
      return false
    }
    if (scriptedChild.kind !== unscriptedChild.kind) {
      return false
    }
    if (
      scriptedChild.kind === 'Element' &&
      unscriptedChild.kind === 'Element'
    ) {
      const tagName = scriptedChild.element.tagName.toLowerCase()
      if (
        tagName !== unscriptedChild.element.tagName.toLowerCase() ||
        scriptedChild.element.namespaceURI !==
          unscriptedChild.element.namespaceURI ||
        !parsedAttributesAgree(scriptedChild.element, unscriptedChild.element)
      ) {
        return false
      }
      if (isHtmlNoscript(scriptedChild.element)) {
        continue
      }
      if (
        !parsedChildrenAgree(
          traversableContent(scriptedChild.element),
          traversableContent(unscriptedChild.element),
        )
      ) {
        return false
      }
    } else if (
      scriptedChild.kind === 'Text' &&
      unscriptedChild.kind === 'Text'
    ) {
      if (scriptedChild.text !== unscriptedChild.text) {
        return false
      }
    } else if (
      scriptedChild.kind === 'Comment' &&
      unscriptedChild.kind === 'Comment'
    ) {
      if (scriptedChild.text !== unscriptedChild.text) {
        return false
      }
    }
  }
  return true
}

const parsedAttributesAgree = (
  left: Parse5Element,
  right: Parse5Element,
): boolean => {
  const signature = (element: Parse5Element): ReadonlyArray<string> =>
    element.attrs
      .map(attribute =>
        JSON.stringify([
          attribute.namespace ?? '',
          attribute.prefix ?? '',
          attribute.name,
          attribute.value,
        ]),
      )
      .sort()
  const leftAttributes = signature(left)
  const rightAttributes = signature(right)
  return (
    leftAttributes.length === rightAttributes.length &&
    leftAttributes.every(
      (attribute, index) => attribute === rightAttributes[index],
    )
  )
}

const assertInnerHtmlContextMatches = (
  parsed: Parse5Element,
  vnode: VNode,
): void => {
  const innerHtml = vnode.data?.props?.['innerHTML']
  if (typeof innerHtml !== 'string') {
    return
  }
  const context = defaultTreeAdapter.createElement(
    parsed.tagName,
    parsed.namespaceURI,
    parsed.attrs.map(attribute => ({ ...attribute })),
  )
  const freshChildren = parseFragment(context, innerHtml, {
    scriptingEnabled: true,
  })
  if (parsedChildrenAgree(traversableContent(parsed), freshChildren)) {
    return
  }
  throw new Error(
    `[foldkit] h.InnerHTML on <${parsed.tagName}> parses differently when ` +
      'assigned to a fresh element than when the serialized page is parsed ' +
      'under its ancestors. Ancestor parser state can insert, move, or drop ' +
      'nodes from the server DOM (for example, a nested <form> is dropped ' +
      'under an existing form), so the server and client cannot describe one ' +
      'tree. Move the fragment outside that context or build the content with ' +
      'ordinary view children.',
  )
}

export const assertNoscriptModesAgree = (
  fragments: ParsedFragmentModes,
): void => {
  if (parsedChildrenAgree(fragments.scripted, fragments.unscripted)) {
    return
  }
  throw new Error(
    '[foldkit] <noscript> content changes the rest of the page when a browser ' +
      'parses it with scripting disabled. Its content is raw text while ' +
      'scripting is enabled and ordinary HTML when it is not, so fallback ' +
      'markup that leaves an element open (a <form>, <table>, <textarea>, ' +
      '<style>, or comment) pulls the markup that follows the <noscript> ' +
      'inside it, and the visitors the fallback was written for never see it. ' +
      'Ensure the fallback is complete and balanced.',
  )
}

// Declarative shadow DOM is refused rather than modeled. A browser turns a
// `<template shadowrootmode>` into a shadow root as it parses, moving its
// content out of the light DOM entirely, which neither the parser these checks
// use nor hydration's own probe reproduces. The served page and the tree
// hydration reconciles would stop describing the same ownership structure.
//
// The scan runs on the rendered markup, so it covers a fragment that arrived
// through `h.InnerHTML` as well as elements the view declared. It descends into
// template content, where a nested declaration would otherwise sit unseen, and
// it parses both scripting modes, because a `<noscript>` holds raw text in one
// and live markup in the other.
const DECLARATIVE_SHADOW_ROOT_ATTRIBUTES: ReadonlyArray<string> = [
  'shadowrootmode',
  'shadowroot',
]

const declaresShadowRoot = (element: Parse5Element): boolean =>
  element.tagName.toLowerCase() === 'template' &&
  element.namespaceURI === HTML_NAMESPACE &&
  DECLARATIVE_SHADOW_ROOT_ATTRIBUTES.some(name =>
    element.attrs.some(attribute => attribute.name === name),
  )

// NOTE: one recursion per element. `traversableContent` returns a template's
// content fragment and the element itself for everything else, so descending
// into both it and the element visits an ordinary subtree twice, which doubles
// the work at every level. A tree the serializer accepts (depth up to 1000) took
// most of a second at depth 24 and would have blocked the event loop well before
// the depth limit.
const hasDeclarativeShadowRoot = (
  node: Readonly<{ childNodes: ReadonlyArray<Parse5ChildNode> }>,
): boolean =>
  node.childNodes.some(
    child =>
      isParse5Element(child) &&
      (declaresShadowRoot(child) ||
        hasDeclarativeShadowRoot(traversableContent(child))),
  )

export const __assertNoDeclarativeShadowRoot = (
  fragments: ParsedFragmentModes,
): void => {
  const declaresInEitherMode =
    hasDeclarativeShadowRoot(fragments.scripted) ||
    hasDeclarativeShadowRoot(fragments.unscripted)

  if (!declaresInEitherMode) {
    return
  }
  throw new Error(
    '[foldkit] A rendered <template> declares a shadow root, which server ' +
      'rendering does not support. A browser turns it into a shadow root ' +
      'while parsing, moving its content out of the light DOM, so the served ' +
      'page and the tree hydration reconciles no longer describe the same ' +
      'thing. Attach shadow roots from a custom element instead.',
  )
}

// A <base> parsed anywhere in the live HTML tree changes how every relative URL
// after it resolves, including the client entry a host writes after the rendered
// application. The browser applies a base element in body before hydration can
// remove it, so a view could redirect its own bootstrap module to another
// origin. Template content is inert and does not participate in URL resolution;
// declarative shadow templates are refused separately.
const hasLiveBaseElement = (
  node: Readonly<{ childNodes: ReadonlyArray<Parse5ChildNode> }>,
): boolean => {
  for (const child of node.childNodes) {
    if (!isParse5Element(child)) {
      continue
    }
    const tagName = child.tagName.toLowerCase()
    if (child.namespaceURI === HTML_NAMESPACE && tagName === 'base') {
      return true
    }
    if (child.namespaceURI === HTML_NAMESPACE && tagName === 'template') {
      continue
    }
    if (hasLiveBaseElement(child)) {
      return true
    }
  }
  return false
}

export const __assertNoLiveBaseElement = (
  fragments: ParsedFragmentModes,
): void => {
  const hasBaseInEitherMode =
    hasLiveBaseElement(fragments.scripted) ||
    hasLiveBaseElement(fragments.unscripted)

  if (!hasBaseInEitherMode) {
    return
  }
  throw new Error(
    '[foldkit] Rendered application markup contains a live HTML <base> ' +
      'element. A browser applies it before hydration, so it changes every ' +
      'relative URL that follows the application, including the client entry ' +
      'module, and can redirect startup to another origin. Put <base> in the ' +
      'HTML template head under host control instead.',
  )
}

// A page the rendered markup is placed into, with a probe element standing
// where the application root goes. Parsing the whole document is what makes a
// structural escape visible: `<html>` and `<body>` start tags inside the markup
// are dropped by a fragment parse, so a check that only ever sees a fragment
// reads them as harmless. A browser instead merges their attributes onto the
// document's own elements and hoists their content, which puts them outside the
// application's ownership entirely.
const DOCUMENT_PROBE_ID = 'foldkit-document-probe'
const DOCUMENT_PROBE_PREFIX =
  '<!doctype html><html><head><title>probe</title></head><body><div id="' +
  DOCUMENT_PROBE_ID +
  '">'
const DOCUMENT_PROBE_SUFFIX = '</div></body></html>'

const childElementsOf = (
  node: Readonly<{ childNodes: ReadonlyArray<Parse5ChildNode> }>,
): ReadonlyArray<Parse5Element> => node.childNodes.filter(isParse5Element)

const findByTag = (
  node: Readonly<{ childNodes: ReadonlyArray<Parse5ChildNode> }>,
  tagName: string,
): Parse5Element | undefined =>
  childElementsOf(node).find(
    element => element.tagName.toLowerCase() === tagName,
  )

const escapesDocumentStructure = (
  html: string,
  scriptingEnabled: boolean,
): boolean => {
  const document = parse(
    `${DOCUMENT_PROBE_PREFIX}${html}${DOCUMENT_PROBE_SUFFIX}`,
    { scriptingEnabled },
  )
  const documentElement = findByTag(document, 'html')
  if (documentElement === undefined) {
    return true
  }
  const head = findByTag(documentElement, 'head')
  const body = findByTag(documentElement, 'body')
  if (head === undefined || body === undefined) {
    return true
  }
  const probe = childElementsOf(body)[0]
  return (
    documentElement.attrs.length > 0 ||
    body.attrs.length > 0 ||
    head.attrs.length > 0 ||
    childElementsOf(head).length !== 1 ||
    childElementsOf(body).length !== 1 ||
    probe === undefined ||
    probe.attrs.find(attribute => attribute.name === 'id')?.value !==
      DOCUMENT_PROBE_ID
  )
}

export const __assertNoDocumentStructureEscape = (html: string): void => {
  if (![true, false].some(mode => escapesDocumentStructure(html, mode))) {
    return
  }
  throw new Error(
    '[foldkit] The rendered markup changes the document it is placed into. ' +
      'An <html>, <head>, <body>, or <frameset> tag inside it, typically from ' +
      'an InnerHTML fragment, is not rendered where it is written: a browser ' +
      "merges its attributes onto the page's own elements and hoists its " +
      'content out of the application root, so the result is neither the ' +
      'markup the view wrote nor anything the application owns. Remove those ' +
      'tags from the fragment.',
  )
}

export const assertRootClosesCleanly = (html: string): void => {
  if (closesCleanly(html, true) && closesCleanly(html, false)) {
    return
  }
  throw new Error(
    '[foldkit] The rendered root does not close cleanly. An unterminated ' +
      'element (an unclosed <textarea>, <script>, <style>, comment, or ' +
      '<plaintext>, typically inside an InnerHTML fragment) would swallow the ' +
      'Flags payload, the client entry, and the rest of the document when the ' +
      'page is parsed. The check covers <noscript> fallback markup with ' +
      'scripting disabled too, where the content parses as HTML rather than as ' +
      'raw text. Ensure InnerHTML fragments are complete and balanced.',
  )
}

// The tags that name a document's own structure. A browser builds these from
// the served document, not from markup spliced into it: a `<body>` or `<head>`
// start tag encountered inside the document body is dropped and its children
// are hoisted, an `<html>` start tag only merges its attributes onto the
// document element, and `<frameset>` replaces the body outright. A view rooted
// at one of them therefore serializes to markup no template can hold, so it is
// refused by name rather than surfacing later as a parser-rearranged root.
const DOCUMENT_STRUCTURE_TAGS: ReadonlySet<string> = new Set([
  'body',
  'frameset',
  'head',
  'html',
])

export const assertRootIsNotDocumentStructure = (
  root: NonNullable<Document['body']>,
): void => {
  const tagName = tagNameFromSelector(root.sel ?? '').toLowerCase()
  if (!DOCUMENT_STRUCTURE_TAGS.has(tagName)) {
    return
  }
  throw new Error(
    `[foldkit] The view root is <${tagName}>, which names the structure of a ` +
      'document rather than content placed into one. A browser builds those ' +
      'elements from the document it parses, so the tag is dropped, merged, ' +
      'or replaces the body when the rendered markup is spliced into a ' +
      'template, and the served root is not the element the view wrote. This ' +
      'holds for static output too. Root the view at an ordinary element ' +
      'such as a <div> or <main>, and set the document title, lang, and dir ' +
      'through the Document the view returns.',
  )
}

const RESERVED_HANDOFF_ATTRIBUTES: ReadonlySet<string> = new Set([
  FOLDKIT_APP_ATTRIBUTE,
  HYDRATION_BUILD_ATTRIBUTE,
  FOLDKIT_FLAGS_ATTRIBUTE,
  HYDRATION_KEY_ATTRIBUTE,
  HYDRATION_IDENTITY_ATTRIBUTE,
])

const reservedHandoffAttributeIn = (
  node: Readonly<{ childNodes: ReadonlyArray<Parse5ChildNode> }>,
): string | undefined => {
  for (const child of node.childNodes) {
    if (!isParse5Element(child)) {
      continue
    }
    const marker = child.attrs.find(attribute =>
      RESERVED_HANDOFF_ATTRIBUTES.has(attribute.name),
    )
    if (marker !== undefined) {
      return marker.name
    }
    const nested = reservedHandoffAttributeIn(traversableContent(child))
    if (nested !== undefined) {
      return nested
    }
  }
  return undefined
}

const hasScriptElement = (
  node: Readonly<{ childNodes: ReadonlyArray<Parse5ChildNode> }>,
): boolean =>
  node.childNodes.some(
    child =>
      isParse5Element(child) &&
      (child.tagName.toLowerCase() === 'script' ||
        hasScriptElement(traversableContent(child))),
  )

const assertNodeDoesNotAuthorReservedContent = (node: VNode): void => {
  const attrs = node.data?.attrs
  if (attrs !== undefined) {
    for (const name of Object.keys(attrs)) {
      const parsedName = parsedAttributeName(node.data?.ns, name)
      if (RESERVED_HANDOFF_ATTRIBUTES.has(parsedName)) {
        throw new Error(
          `[foldkit] The view authored ${parsedName}, which is reserved for ` +
            'Foldkit\u2019s server-to-client hydration handoff. Application ' +
            'markup cannot own root, build, Flags, key, or identity markers. ' +
            'Remove the attribute.',
        )
      }
    }
  }
  const innerHtml = node.data?.props?.['innerHTML']
  if (typeof innerHtml === 'string' && hasTrustedInnerHtml(node.data?.props)) {
    const tagName = expectedParsedTagName(node)
    const namespace =
      node.data?.ns === SVG_NAMESPACE
        ? Parse5Html.NS.SVG
        : node.data?.ns === MATHML_NAMESPACE
          ? Parse5Html.NS.MATHML
          : Parse5Html.NS.HTML
    const context = defaultTreeAdapter.createElement(tagName, namespace, [])
    const parsedFragments = [true, false].map(scriptingEnabled =>
      parseFragment(context, innerHtml, { scriptingEnabled }),
    )
    const marker = parsedFragments
      .map(reservedHandoffAttributeIn)
      .find(candidate => candidate !== undefined)
    if (marker !== undefined) {
      throw new Error(
        `[foldkit] h.InnerHTML on <${tagName}> authored ${marker}, which is ` +
          'reserved for Foldkit\u2019s server-to-client hydration handoff. ' +
          'Application markup cannot own root, build, Flags, key, or identity ' +
          'markers. Remove the attribute.',
      )
    }
    if (parsedFragments.some(hasScriptElement)) {
      throw new Error(
        `[foldkit] h.InnerHTML on <${tagName}> contains a <script> element. ` +
          'A script element created while parsing served HTML is not ' +
          'equivalent to one created by assigning innerHTML. Executable forms ' +
          'can run only on the server path, and other script types have ' +
          'type-specific processing that Foldkit does not model. Foldkit ' +
          'therefore refuses classic, module, import-map, speculation-rules, ' +
          'and data-block scripts at this boundary. Build the script as an ' +
          'ordinary view element or move it to the HTML template instead.',
      )
    }
  }
}

export const assertViewDoesNotAuthorReservedContent = (root: VNode): void => {
  const pendingNodes: globalThis.Array<VNode> = [root]
  for (
    let node = pendingNodes.pop();
    node !== undefined;
    node = pendingNodes.pop()
  ) {
    assertNodeDoesNotAuthorReservedContent(node)

    const { children } = node

    if (children !== undefined) {
      for (let index = children.length - 1; index >= 0; index--) {
        const child = children[index]
        if (child !== undefined && typeof child !== 'string') {
          pendingNodes.push(child)
        }
      }
    }
  }
}

const elementsAtAndBelow = (
  element: Parse5Element,
): ReadonlyArray<Parse5Element> => {
  const elements: globalThis.Array<Parse5Element> = [element]
  for (const child of traversableContent(element).childNodes) {
    if (isParse5Element(child)) {
      elements.push(...elementsAtAndBelow(child))
    }
  }
  return elements
}

const elementsCarrying = (
  root: Parse5Element,
  attributeName: string,
): ReadonlyArray<Parse5Element> =>
  elementsAtAndBelow(root).filter(element =>
    element.attrs.some(attribute => attribute.name === attributeName),
  )

const assertNoReservedHandoffMarkers = (root: Parse5Element): void => {
  const marker = [...RESERVED_HANDOFF_ATTRIBUTES].find(
    attributeName => elementsCarrying(root, attributeName).length > 0,
  )
  if (marker === undefined) {
    return
  }
  throw new Error(
    `[foldkit] Static output contains ${marker}, which is reserved for ` +
      'Foldkit\u2019s server-to-client hydration handoff. A render that no ' +
      'client will hydrate must not carry hydration markers.',
  )
}

// After serialization, parse the stamped root markup with the same HTML parser
// a browser uses and require it to describe exactly one element: the stamped
// root, with the tag and namespace the view produced. A view can serialize a
// structurally invalid shape the parser rearranges (a block element inside a
// `<p>`, a stray element inside a `<table>`, an HTML element inside `<svg>`),
// moving nodes outside the element the client hydrates. Hydration owns only
// that root, so it cannot remove escaped siblings; rejecting here keeps the
// invariant that the served root parses back to the single intended element.
// The single element the served markup parses back to, or a refusal naming what
// the parser did to it instead.
const parsedRootOf = (
  fragment: DefaultTreeAdapterMap['documentFragment'],
  root: NonNullable<Document['body']>,
): Parse5Element => {
  const significant = fragment.childNodes.filter(node => !isIgnorableText(node))
  const only = significant[0]
  if (
    significant.length !== 1 ||
    only === undefined ||
    !isParse5Element(only)
  ) {
    throw new Error(
      '[foldkit] The rendered root serialized to markup that HTML parsing ' +
        'splits into more than one top-level node. An element the parser ' +
        'moves out of its parent (a block element inside a <p>, a stray ' +
        'element inside a <table>, or an HTML element inside an <svg>) ' +
        'leaves content outside the application root. Keep the view root a ' +
        'single, structurally valid element tree.',
    )
  }
  const expectedTag = expectedParsedTagName(root)
  const expectedNamespace =
    typeof root.data?.ns === 'string' ? root.data.ns : HTML_NAMESPACE
  if (
    expectedNamespace !== HTML_NAMESPACE &&
    only.namespaceURI === expectedNamespace &&
    only.tagName !== expectedTag
  ) {
    throw foreignTagNameMismatch(only.tagName, expectedTag)
  }
  if (only.tagName !== expectedTag || only.namespaceURI !== expectedNamespace) {
    throw new Error(
      '[foldkit] HTML parsing reinterpreted the rendered root as a ' +
        `<${only.tagName}>, not the view's <${expectedTag}>. Keep the view ` +
        'root a single, structurally valid element.',
    )
  }
  return only
}

// After serialization, parse the root markup with the same HTML parser a browser
// uses and require it to describe the tree the view wrote. A view can serialize
// a structurally invalid shape the parser rearranges (a block element inside a
// `<p>`, a bare `<tr>` in a `<table>`, text foster-parented out of a table),
// moving or dropping nodes the view declared.
//
// This runs for a static render too. Hydration is what would otherwise rebuild a
// reshaped subtree, so without it a dropped subtree is simply lost, with nothing
// left to notice. What stays conditional is the marker check below: only a
// hydratable render emits a stamp for the parser to move.
export const assertParsedRootMatchesView = (
  fragment: DefaultTreeAdapterMap['documentFragment'],
  root: NonNullable<Document['body']>,
): void => {
  const parsed = parsedRootOf(fragment, root)
  assertNoReservedHandoffMarkers(parsed)
  assertStructureMatches(parsed, root)
}

export const assertSingleStampedRoot = (
  fragment: DefaultTreeAdapterMap['documentFragment'],
  runtimeId: string,
  buildId: string,
  root: NonNullable<Document['body']>,
): void => {
  const only = parsedRootOf(fragment, root)
  const applicationMarkers = elementsCarrying(only, FOLDKIT_APP_ATTRIBUTE)
  const buildMarkers = elementsCarrying(only, HYDRATION_BUILD_ATTRIBUTE)
  const flagsMarkers = elementsCarrying(only, FOLDKIT_FLAGS_ATTRIBUTE)
  const stamp = only.attrs.find(
    attribute => attribute.name === FOLDKIT_APP_ATTRIBUTE,
  )
  const buildStamp = only.attrs.find(
    attribute => attribute.name === HYDRATION_BUILD_ATTRIBUTE,
  )
  if (
    applicationMarkers.length !== 1 ||
    applicationMarkers[0] !== only ||
    stamp?.value !== runtimeId ||
    buildMarkers.length !== 1 ||
    buildMarkers[0] !== only ||
    buildStamp?.value !== buildId ||
    flagsMarkers.length !== 0
  ) {
    throw new Error(
      '[foldkit] The rendered root does not carry exactly one Foldkit root ' +
        'and build marker on the root itself, or application markup contains ' +
        'a reserved root, build, or Flags marker below it. The client could ' +
        'resolve an ambiguous root or payload and refuse the page. Remove ' +
        'application-authored data-foldkit handoff markers.',
    )
  }
  assertStructureMatches(only, root)
}
