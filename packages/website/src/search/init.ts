import { Update } from 'foldkit'

import { Dialog } from '@foldkit/ui'

import type { Message } from './message.vibe'
import type { Model } from './model.vibe'
import { SearchState } from './model.vibe'

export type InitReturn = Update.Return<Model, Message>

export const init = (): InitReturn => ({
  model: {
    dialog: Dialog.init({ id: 'search-dialog' }),
    query: '',
    searchState: SearchState.Idle(),
    activeResultIndex: -1,
  },
})
