import { Submodel } from 'foldkit'
import type { Html } from 'foldkit/html'

import { type CodeBlock } from '../../component'
import { slotDocPage } from '../../markdown'
import { type RenderHeadingLink, demoContainer } from '../../prose.vibe'
import * as Textarea from './demo/textarea'
import type { Message } from './message.vibe'
import type { Model } from './model.vibe'
import raw from './textareaPage.md'

const { tableOfContents, view: renderPage } = slotDocPage<'basic' | 'disabled'>(
  raw,
  'ui/textarea',
)

export { tableOfContents }

type ViewInputs = Readonly<{
  renderCopyButton: CodeBlock.RenderCopyButton
  renderSnippet: CodeBlock.RenderSnippet
  renderHeadingLink: RenderHeadingLink
}>

export const view = Submodel.defineView<Model, Message, ViewInputs>(
  (model, { renderCopyButton, renderSnippet, renderHeadingLink }, h): Html =>
    renderPage({
      demos: {
        basic: demoContainer(...Textarea.basicDemo(model, h)),
        disabled: demoContainer(...Textarea.disabledDemo(model, h)),
      },
      renderCopyButton,
      renderSnippet,
      renderHeadingLink,
    }),
)
