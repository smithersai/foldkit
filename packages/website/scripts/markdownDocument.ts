import { SITE_URL } from '../src/route.vibe'

// EXTRACTION

const TEXT_NODE_TYPE = 3
const ELEMENT_NODE_TYPE = 1

const isElementNode = (node: Node): node is Element =>
  node.nodeType === ELEMENT_NODE_TYPE

export const extractMarkdownFromRenderedDocument = (
  renderedDocument: Document,
  siteUrl: string = SITE_URL,
): string => {
  const root = renderedDocument.querySelector('[data-pagefind-body]')
  if (root === null) {
    return ''
  }

  const SKIP_TAGS = new Set([
    'SCRIPT',
    'STYLE',
    'SVG',
    'NOSCRIPT',
    'BUTTON',
    'INPUT',
    'IFRAME',
  ])

  const isSkippedElement = (element: Element): boolean =>
    SKIP_TAGS.has(element.tagName) ||
    element.getAttribute('aria-hidden') === 'true' ||
    element.hasAttribute('data-llm-ignore')

  const collapseWhitespace = (text: string): string =>
    text.replace(/[\t\n\r ]+/g, ' ')

  const resolveHref = (href: string): string => {
    if (href.length === 0) {
      return ''
    }
    if (href.startsWith('/')) {
      return `${siteUrl}${href}`
    }
    return href
  }

  const collectInline = (node: Node): string => {
    if (node.nodeType === TEXT_NODE_TYPE) {
      return collapseWhitespace(node.textContent ?? '')
    }
    if (!isElementNode(node)) {
      return ''
    }
    if (isSkippedElement(node)) {
      return ''
    }
    const tag = node.tagName.toLowerCase()
    const inner = globalThis.Array.from(node.childNodes)
      .map(collectInline)
      .join('')
      .replace(/ {2,}/g, ' ')

    switch (tag) {
      case 'a': {
        const href = node.getAttribute('href') ?? ''
        const trimmed = inner.trim()
        if (trimmed.length === 0) {
          return ''
        }
        return `[${trimmed}](${resolveHref(href)})`
      }
      case 'code': {
        const trimmed = inner.trim()
        return trimmed.length === 0 ? '' : `\`${trimmed}\``
      }
      case 'strong':
      case 'b': {
        const trimmed = inner.trim()
        return trimmed.length === 0 ? '' : `**${trimmed}**`
      }
      case 'em':
      case 'i': {
        const trimmed = inner.trim()
        return trimmed.length === 0 ? '' : `_${trimmed}_`
      }
      case 'br': {
        return ' '
      }
      default: {
        return inner
      }
    }
  }

  const detectLanguage = (element: Element): string => {
    const candidates = [
      element,
      ...globalThis.Array.from(element.querySelectorAll('*')),
    ]
    for (const candidate of candidates) {
      const className = candidate.getAttribute('class') ?? ''
      const match = className.match(/language-([\w+-]+)/)
      if (match !== null && match[1] !== undefined) {
        return match[1] === 'plaintext' ? '' : match[1]
      }
      const dataLang = candidate.getAttribute('data-language')
      if (dataLang !== null && dataLang.length > 0) {
        return dataLang === 'plaintext' ? '' : dataLang
      }
    }
    return ''
  }

  const extractCodeBlock = (element: Element): string => {
    const codeElement = element.querySelector('code')
    const source = codeElement ?? element
    const text = (source.textContent ?? '').replace(/\n+$/, '')
    const language = detectLanguage(element)
    const labelCarrier = element.closest('[data-llm-label]')
    const label = labelCarrier?.getAttribute('data-llm-label') ?? ''
    const labelPrefix = label.length > 0 ? `**${label}**\n\n` : ''
    return `${labelPrefix}\`\`\`${language}\n${text}\n\`\`\``
  }

  const extractCaptionedCodeBlock = (element: Element): string => {
    const label = element.getAttribute('data-llm-label') ?? ''
    const codeElement = element.querySelector('pre')
    if (label.length === 0 || codeElement === null) {
      throw new Error(
        `Captioned code block "${label}" rendered without a label or source.`,
      )
    }
    return extractCodeBlock(element)
  }

  const indentBlock = (text: string, indent: string): string =>
    text
      .split('\n')
      .map(line => (line.length === 0 ? line : `${indent}${line}`))
      .join('\n')

  const extractList = (element: Element, ordered: boolean): string => {
    const lines: globalThis.Array<string> = []
    let index = 1
    for (const child of globalThis.Array.from(element.children)) {
      if (child.tagName !== 'LI') {
        continue
      }
      if (isSkippedElement(child)) {
        continue
      }
      const marker = ordered ? `${index}. ` : '- '
      const body = extractBlocks(child).trim()
      const indent = ' '.repeat(marker.length)
      const indented = body
        .split('\n')
        .map((line, lineIndex) =>
          lineIndex === 0 || line.length === 0 ? line : `${indent}${line}`,
        )
        .join('\n')
      lines.push(`${marker}${indented}`)
      if (ordered) {
        index += 1
      }
    }
    return lines.join('\n')
  }

  const extractBlocks = (parent: Element): string => {
    const parts: globalThis.Array<string> = []
    for (const node of globalThis.Array.from(parent.childNodes)) {
      if (node.nodeType === TEXT_NODE_TYPE) {
        const text = collapseWhitespace(node.textContent ?? '').trim()
        if (text.length > 0) {
          parts.push(text)
        }
        continue
      }
      if (!isElementNode(node)) {
        continue
      }
      if (isSkippedElement(node)) {
        continue
      }
      if (node.hasAttribute('data-llm-label')) {
        parts.push(extractCaptionedCodeBlock(node))
        continue
      }
      const tag = node.tagName.toLowerCase()

      switch (tag) {
        case 'h1':
        case 'h2':
        case 'h3':
        case 'h4':
        case 'h5':
        case 'h6': {
          const level = Number(tag.slice(1))
          const inline = collectInline(node).trim()
          if (inline.length > 0) {
            parts.push(`${'#'.repeat(level)} ${inline}`)
          }
          break
        }
        case 'p': {
          const inline = collectInline(node).trim()
          if (inline.length > 0) {
            parts.push(inline)
          }
          break
        }
        case 'pre': {
          parts.push(extractCodeBlock(node))
          break
        }
        case 'ul': {
          const list = extractList(node, false)
          if (list.length > 0) {
            parts.push(list)
          }
          break
        }
        case 'ol': {
          const list = extractList(node, true)
          if (list.length > 0) {
            parts.push(list)
          }
          break
        }
        case 'blockquote': {
          const inner = extractBlocks(node).trim()
          if (inner.length > 0) {
            parts.push(indentBlock(inner, '> '))
          }
          break
        }
        case 'hr': {
          parts.push('---')
          break
        }
        case 'br': {
          break
        }
        case 'span':
        case 'em':
        case 'strong':
        case 'a':
        case 'code': {
          const inline = collectInline(node).trim()
          if (inline.length > 0) {
            parts.push(inline)
          }
          break
        }
        default: {
          const nested = extractBlocks(node)
          if (nested.length > 0) {
            parts.push(nested)
          }
          break
        }
      }
    }
    return parts.join('\n\n')
  }

  const markdown = extractBlocks(root)
    .replace(/\n{3,}/g, '\n\n')
    .trim()

  const captionCounts = new Map<string, number>()
  for (const figure of root.querySelectorAll('figure')) {
    const caption = figure.querySelector('figcaption')
    const codeBlock = figure.querySelector('pre')
    if (caption === null || codeBlock === null) {
      continue
    }
    const label = collapseWhitespace(caption.textContent ?? '').trim()
    if (label.length === 0) {
      continue
    }
    captionCounts.set(label, (captionCounts.get(label) ?? 0) + 1)
  }

  for (const [label, expectedCount] of captionCounts) {
    const marker = `**${label}**\n\n\`\`\``
    const exportedCount = markdown.split(marker).length - 1
    if (exportedCount < expectedCount) {
      throw new Error(
        `Captioned code block "${label}" was not followed by a fenced source block in exported Markdown.`,
      )
    }
  }

  return markdown
}
