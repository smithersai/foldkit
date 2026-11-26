import { Submodel } from 'foldkit'
import type { Html } from 'foldkit/html'

import { type CodeBlock } from '../../component'
import { slotDocPage } from '../../markdown'
import { type RenderHeadingLink, demoContainer } from '../../prose.vibe'
import * as Toast from './demo/toast.vibe'
import type { Message } from './message.vibe'
import type { Model } from './model.vibe'
import raw from './toastPage.md'

const { tableOfContents, view: renderPage } = slotDocPage<'demo'>(
  raw,
  'ui/toast',
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
        demo: demoContainer(
          ...Toast.demo(model.toastDemo, model.maybeLastDismissedToastTitle, h),
        ),
      },
      renderCopyButton,
      renderSnippet,
      renderHeadingLink,
    }),
)
