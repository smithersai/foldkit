// Host constructor and Node-kind checks keep their original lookup phase.
export const isStyleDeclaration = (
  value: unknown,
): value is CSSStyleDeclaration => value instanceof CSSStyleDeclaration

export const isSelectElement = (value: unknown): value is HTMLSelectElement =>
  value instanceof HTMLSelectElement

export const isTextNode = (node: Node): node is Text =>
  node.nodeType === Node.TEXT_NODE

export const isCommentNode = (node: Node): node is Comment =>
  node.nodeType === Node.COMMENT_NODE

export const isElementNode = (node: Node): node is Element =>
  node.nodeType === Node.ELEMENT_NODE
