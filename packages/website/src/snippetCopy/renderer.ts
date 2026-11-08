import { type HtmlBuilder } from 'foldkit/html'

import { type CodeBlock } from '../component'
import { type Message } from './message.vibe'
import { type Model } from './model.vibe'
import { view } from './view.vibe'

export const renderer =
  <ParentMessage>(
    model: Model,
    toParentMessage: (message: Message) => ParentMessage,
    h: HtmlBuilder<ParentMessage>,
  ): CodeBlock.RenderCopyButton =>
  ({ id, text, ariaLabel, positionClass, variant }) =>
    h.submodel({
      slotId: `snippet-copy-${id}`,
      model,
      view,
      viewInputs: { snippetId: id, text, ariaLabel, positionClass, variant },
      toParentMessage,
    })
