import { Effect } from 'effect'
import * as fc from 'fast-check'
import { expect, test } from 'vitest'

import { ClearSession } from './command.vibe'
import { Session } from './domain/session.vibe'
import { logoutSessions } from './fixtures/foldkit-auth-child-update'
import { Message } from './message.vibe'
import { LoggedIn, LoggedOut } from './model.vibe'
import { AppRoute } from './route.vibe'
import { update } from './update.vibe'

const sessions = fc.oneof(
  fc.constantFrom(...logoutSessions),
  fc.record({ userId: fc.string(), email: fc.string(), name: fc.string() }),
)

test('child logout preserves the returned model, out message and commands', () => {
  fc.assert(
    fc.property(sessions, fc.boolean(), (fields, frozen) => {
      const session = Session.make(fields)
      const mutableModel = LoggedIn.init(AppRoute.Dashboard(), session)
      const model = frozen ? Object.freeze(mutableModel) : mutableModel
      const initialSession = model.session
      const message = LoggedIn.Message.ClickedLogout()
      const original = LoggedIn.update(model, message)
      expect(original.model).toBe(model)
      expect(original.outMessage?._tag).toBe('RequestedLogout')
      const step = update(model, Message.GotLoggedInMessage({ message }))
      expect(step.model).toEqual(LoggedOut.init(AppRoute.Home()))
      expect(step.commands?.map(command => command.name)).toEqual([
        ClearSession.name,
        'RedirectToHome',
      ])
      expect(
        step.commands?.every(command => Effect.isEffect(command.effect)),
      ).toBe(true)
      expect(model.session).toBe(initialSession)
      expect(model.session).toEqual(session)
      expect(model._tag).toBe('LoggedIn')
    }),
    { seed: 1873197, numRuns: 200 },
  )
})
