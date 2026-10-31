import {
  Command,
  click,
  expect,
  given,
  role,
  scene,
  text,
  withViewInputs,
} from 'foldkit/scene'
import { describe, test } from 'vitest'

import { init } from './init.vibe'
import { Message } from './message.vibe'
import {
  CopySnippet,
  WaitBeforeHidingCopiedIndicator,
  update,
} from './update.vibe'
import { view } from './view.vibe'

const snippetId = 'counter-example'

const sceneView = withViewInputs(view, {
  snippetId,
  text: 'const count = 0',
  ariaLabel: 'Copy counter state',
  positionClass: 'top-2 right-2',
  variant: 'Header',
})

describe('snippet copy', () => {
  test('copies a snippet and clears its confirmation after the delay', () => {
    scene(
      { update, view: sceneView() },
      given(init().model),
      expect(text('Copied')).not.toExist(),
      expect(role('button', { name: 'Copy counter state' })).toHaveAttr(
        'type',
        'button',
      ),
      click(role('button', { name: 'Copy counter state' })),
      Command.resolve(CopySnippet, Message.SucceededCopySnippet({ snippetId })),
      expect(text('Copied')).toExist(),
      Command.resolve(
        WaitBeforeHidingCopiedIndicator,
        Message.CompletedWaitBeforeHidingCopiedIndicator({ snippetId }),
      ),
      expect(text('Copied')).not.toExist(),
    )
  })
})
