import { Valid } from 'foldkit/fieldValidation'
import {
  Command,
  expect,
  given,
  role,
  scene,
  submit,
  text,
} from 'foldkit/scene'
import { modifyFields } from 'foldkit/struct'
import { describe, test } from 'vitest'

import { SaveSession } from './command.vibe'
import { Session } from './domain/session.vibe'
import { Message } from './message.vibe'
import { LoggedOut } from './model.vibe'
import {
  Message as LoginMessage,
  SimulateAuthRequest,
  initModel as initLoginModel,
} from './page/loggedOut/page/login.vibe'
import { AppRoute } from './route.vibe'
import { RedirectToDashboard, update } from './update.vibe'
import { view } from './view.vibe'

const validModel = LoggedOut.Model({
  route: AppRoute.Login(),
  loginModel: modifyFields(initLoginModel(), {
    email: () => Valid({ value: 'alice@example.com' }),
    password: () => Valid({ value: 'password' }),
  }),
})

const aliceSession = Session.make({
  userId: '1',
  email: 'alice@example.com',
  name: 'alice',
})

describe('login flow', () => {
  test('successful login saves the session and lands on the dashboard', () => {
    scene(
      { update, view },
      given(validModel),
      submit(role('form')),
      Command.expectExact(SimulateAuthRequest),
      Command.resolve(
        SimulateAuthRequest,
        LoginMessage.SucceededSimulateAuthRequest({ session: aliceSession }),
      ),
      Command.expectExact(SaveSession, RedirectToDashboard),
      Command.resolveAll(
        [SaveSession, Message.SucceededSaveSession()],
        [RedirectToDashboard, Message.CompletedNavigateInternal()],
      ),
      expect(text('Welcome back, alice!')).toExist(),
    )
  })
})
