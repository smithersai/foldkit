// Raw Web Fetch construction for `entry.vibe`. `Response` and `Headers` are
// host globals VibeLang code does not construct, so the HTML response for a
// rendered application is built here, in plain TypeScript.

/** The HTML `Response` for a rendered application: status 200 and a UTF-8
 * HTML content type unless the entry result set them. */
export const htmlResponse = (
  body: string,
  status: number | undefined,
  headersInit: HeadersInit | undefined,
): Response => {
  const headers = new Headers(headersInit)
  if (!headers.has('content-type')) {
    headers.set('content-type', 'text/html; charset=utf-8')
  }

  return new Response(body, {
    status: status ?? 200,
    headers,
  })
}
