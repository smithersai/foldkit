import { Submodel } from 'foldkit'
import type { Html } from 'foldkit/html'

import { type CodeBlock } from '../../component'
import { slotDocPage } from '../../markdown'
import { type RenderHeadingLink, demoContainer } from '../../prose.vibe'
import * as FileDrop from './demo/fileDrop.vibe'
import raw from './fileDropPage.md'
import type { Message } from './message.vibe'
import type { Model } from './model.vibe'

const { tableOfContents, view: renderPage } = slotDocPage<'basic'>(
  raw,
  'ui/file-drop',
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
        basic: demoContainer(...FileDrop.basicDemo(model, h)),
      },
      renderCopyButton,
      renderSnippet,
      renderHeadingLink,
    }),
)
