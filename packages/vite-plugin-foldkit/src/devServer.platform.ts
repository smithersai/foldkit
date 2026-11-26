// The platform code of devServer.vibe, which a .vibe file does not import as
// a value (EK4402): the relay's HMAC proofs over node:crypto, its plain HTTP
// listener over node:http, and the host console for socket errors that fire
// outside any fiber.

import { createHmac, timingSafeEqual } from 'node:crypto'
import {
  type IncomingMessage,
  type Server,
  type ServerResponse,
  createServer as createHttpServer,
} from 'node:http'
import type { AddressInfo } from 'node:net'
import { trusted } from 'vibelang-runtime'

const RELAY_TOKEN_PARAMETER = 'token'
const RELAY_CHALLENGE_HEADER = 'x-foldkit-relay-challenge'
const RELAY_CLIENT_PROOF_HEADER = 'x-foldkit-relay-client-proof'
const RELAY_CHALLENGE_PATTERN = /^[0-9a-f]{64}$/
const RELAY_PROOF_PATTERN = /^[0-9a-f]{64}$/
const UPGRADE_REQUIRED = 426
const UPGRADE_REQUIRED_BODY = 'Upgrade Required'

const isString = (value: unknown): value is string => typeof value === 'string'

export const requestPresentsToken = trusted(
  (url: URL, token: string): boolean => {
    const presented = url.searchParams.get(RELAY_TOKEN_PARAMETER)
    if (presented === null) {
      return false
    }
    const expected = Buffer.from(token, 'utf8')
    const actual = Buffer.from(presented, 'utf8')
    return (
      expected.length === actual.length && timingSafeEqual(expected, actual)
    )
  },
  [],
)

export const computeRelayProof = trusted(
  (token: string, role: 'client' | 'server', challenge: string): string =>
    createHmac('sha256', token).update(`${role}:${challenge}`).digest('hex'),
  [],
)

/** The challenge a relay client sent, when it is well formed. */
export const requestChallenge = trusted(
  (request: IncomingMessage): string | undefined => {
    const challenge = request.headers[RELAY_CHALLENGE_HEADER]
    return isString(challenge) && RELAY_CHALLENGE_PATTERN.test(challenge)
      ? challenge
      : undefined
  },
  [],
)

export const requestPresentsProof = trusted(
  (request: IncomingMessage, token: string): boolean => {
    const challenge = requestChallenge(request)
    const presented = request.headers[RELAY_CLIENT_PROOF_HEADER]

    if (
      challenge === undefined ||
      !isString(presented) ||
      !RELAY_PROOF_PATTERN.test(presented)
    ) {
      return false
    }

    const expected = Buffer.from(
      computeRelayProof(token, 'client', challenge),
      'hex',
    )
    const actual = Buffer.from(presented, 'hex')

    return timingSafeEqual(expected, actual)
  },
  [],
)

const answerPlainRequest = (
  _request: IncomingMessage,
  response: ServerResponse,
): void => {
  response
    .writeHead(UPGRADE_REQUIRED, {
      Connection: 'Upgrade',
      Upgrade: 'websocket',
      'Content-Type': 'text/plain',
      'Content-Length': Buffer.byteLength(UPGRADE_REQUIRED_BODY),
    })
    .end(UPGRADE_REQUIRED_BODY)
}

/** An HTTP server that answers every plain request with 426 and leaves upgrades to its listeners. */
export const createRelayHttpServer = (): Server =>
  createHttpServer(answerPlainRequest)

/** Reports a socket error that fires outside any fiber. */
export const reportRelayError = (message: string, error: unknown): void => {
  console.error(message, error)
}

export const requireRelayTcpAddress = (
  address: AddressInfo | string | null,
  noBoundPort: string,
): AddressInfo => {
  if (address === null || typeof address === 'string') {
    throw new Error(noBoundPort)
  }
  return address
}
