import fc from 'fast-check'
import { IncomingMessage, ServerResponse } from 'node:http'
import { Socket } from 'node:net'
import { expect, it } from 'vitest'

import { requireRelayTcpAddress } from '../src/devServer.platform.ts'
import { trackHeaderWrites } from '../src/ssr.platform.ts'

it('records header writes and restores the original methods exactly', () => {
  fc.assert(
    fc.property(
      fc.array(
        fc.record({
          name: fc.constantFrom('X-Test', 'x-OTHER', 'Cache-Control'),
          operation: fc.constantFrom('set', 'append', 'remove'),
          value: fc.stringMatching(/^[a-z0-9]{0,20}$/),
        }),
        { maxLength: 30 },
      ),
      operations => {
        const response = new ServerResponse(new IncomingMessage(new Socket()))
        const methods = [
          response.setHeader,
          response.appendHeader,
          response.removeHeader,
        ]
        const tracked = trackHeaderWrites(response)
        const expected = new Set<string>()
        for (const { name, operation, value } of operations) {
          expected.add(name.toLowerCase())
          if (operation === 'set')
            expect(response.setHeader(name, value)).toBe(response)
          else if (operation === 'append')
            expect(response.appendHeader(name, value)).toBe(response)
          else response.removeHeader(name)
          expect(tracked.names).toEqual(expected)
        }
        tracked.stop()
        expect([
          response.setHeader,
          response.appendHeader,
          response.removeHeader,
        ]).toEqual(methods)
        response.setHeader('X-After-Stop', 'value')
        expect(tracked.names.has('x-after-stop')).toBe(false)
      },
    ),
    { seed: 189003, numRuns: 300 },
  )
})

it('keeps the bound address identity and the unbound failure message', () => {
  fc.assert(
    fc.property(
      fc.integer({ min: 0, max: 65535 }),
      fc.string(),
      (port, message) => {
        const address = { address: '127.0.0.1', family: 'IPv4', port }
        expect(requireRelayTcpAddress(address, message)).toBe(address)
        for (const unbound of [null, 'socket-path']) {
          expect(() => requireRelayTcpAddress(unbound, message)).toThrow(
            new Error(message),
          )
        }
      },
    ),
    { seed: 189004, numRuns: 200 },
  )
})
