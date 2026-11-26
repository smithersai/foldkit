// A Fetch handler whose module takes a while to load, as a bundled
// application does.
await new Promise(resolveDelay => setTimeout(resolveDelay, 400))

export default {
  async fetch() {
    return new Response('ready')
  },
}
