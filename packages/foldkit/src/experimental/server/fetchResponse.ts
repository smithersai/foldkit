// Raw Web Fetch construction and the document-source invariant for
// `fetch.vibe`. `Response` and `Headers` are host globals VibeLang code does
// not construct, and a plain function in VibeLang does not throw, so these
// helpers live here, in plain TypeScript.
import { varyWith, varyWithAccept } from './host.js'
import type { RenderedApplication } from './server.vibe'

export const withNegotiatedVary = (response: Response): Response => {
  const headers = new Headers(response.headers)
  headers.set(
    'vary',
    varyWith(
      varyWithAccept(headers.get('vary') ?? undefined),
      'Sec-Fetch-Dest',
    ),
  )
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  })
}

export const emptyResponse = (
  status: number,
  headers?: HeadersInit,
): Response => {
  if (headers === undefined) {
    return new Response(null, { status })
  }
  return new Response(null, { status, headers })
}

export const documentFrom = (
  options: Readonly<{
    renderDocument?: ((application: RenderedApplication) => string) | undefined
    template?: string | undefined
  }>,
): string | ((application: RenderedApplication) => string) => {
  const { renderDocument, template } = options

  if (typeof renderDocument === 'function' && template === undefined) {
    return renderDocument
  } else if (typeof template === 'string' && renderDocument === undefined) {
    return template
  } else {
    throw new Error(
      '[foldkit] handleRequest requires exactly one document source: a renderDocument function or an HTML template string.',
    )
  }
}
