const cut = (
  source: string,
  begin: number,
  opening: number,
  first: boolean,
): string => {
  let depth = 0
  let quote = ''
  let lineComment = false
  let blockComment = false
  for (let index = opening; index < source.length; index++) {
    const character = source.charAt(index)
    const next = source.charAt(index + 1)
    if (lineComment) {
      if (character === '\n') lineComment = false
      continue
    }
    if (blockComment) {
      if (character === '*' && next === '/') {
        blockComment = false
        index++
      }
      continue
    }
    if (quote) {
      if (character === '\\') index++
      else if (character === quote) quote = ''
    } else if (character === '/' && next === '/') {
      lineComment = true
      index++
    } else if (character === '/' && next === '*') {
      blockComment = true
      index++
    } else if (character === '"' || character === "'" || character === '`')
      quote = character
    else if ('({['.includes(character)) depth++
    else if (')}]'.includes(character)) {
      depth--
      if (first && depth === 0) return source.slice(begin, index + 1)
    } else if (character === ',' && depth === 0)
      return source.slice(begin, index).trim()
  }
  throw new Error('The snippet expression is incomplete')
}

export const callAt = (source: string, name: string): string => {
  const begin = source.indexOf(name + '(')
  if (begin < 0) throw new Error('Missing snippet call: ' + name)
  return cut(source, begin, source.indexOf('(', begin), true)
}

export const blockAfter = (source: string, marker: string): string => {
  const begin = source.indexOf('effect {', source.indexOf(marker))
  if (begin < 0) throw new Error('Missing native effect block: ' + marker)
  return cut(source, begin, source.indexOf('{', begin), true)
}

export const expressionAfter = (source: string, marker: RegExp): string => {
  const found = marker.exec(source)
  if (!found) throw new Error('Missing snippet expression: ' + marker.source)
  const begin = found.index + found[0].length
  return cut(source, begin, begin, false)
}
