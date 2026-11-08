// Raw Web Fetch construction for `entry.server.vibe`. `Response` is a host
// global VibeLang code does not construct, so the preflight answer is built
// here, in plain TypeScript.

/** The empty 204 answer to a CORS preflight, naming the methods the host answers. */
export const preflightResponse = (allow: string): Response =>
  new Response(null, {
    status: 204,
    headers: { allow },
  })
