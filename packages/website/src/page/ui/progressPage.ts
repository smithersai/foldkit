import { Submodel } from 'foldkit'
import type { Html } from 'foldkit/html'

import { type CodeBlock } from '../../component'
import { slotDocPage } from '../../markdown'
import { type RenderHeadingLink, demoContainer } from '../../prose.vibe'
import * as Progress from './demo/progress'
import type { Message } from './message.vibe'
import type { Model } from './model.vibe'
import raw from './progressPage.md'

const { tableOfContents, view: renderPage } = slotDocPage<
  'basic' | 'indeterminate'
>(raw, 'ui/progress')

export { tableOfContents }

type ViewInputs = Readonly<{
  renderCopyButton: CodeBlock.RenderCopyButton
  renderSnippet: CodeBlock.RenderSnippet
  renderHeadingLink: RenderHeadingLink
}>

export const view = Submodel.defineView<Model, Message, ViewInputs>(
  (_model, { renderCopyButton, renderSnippet, renderHeadingLink }, h): Html =>
    renderPage({
      demos: {
        basic: demoContainer(...Progress.basicDemo(h)),
        indeterminate: demoContainer(...Progress.indeterminateDemo(h)),
      },
      renderCopyButton,
      renderSnippet,
      renderHeadingLink,
    }),
)
