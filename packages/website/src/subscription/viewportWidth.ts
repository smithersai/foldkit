import { Dom, Subscription } from 'foldkit'

import { Message } from '../message.vibe'
import { type Model } from '../model.vibe'
import { NARROW_VIEWPORT_QUERY } from '../viewport'

export const subscriptions = Subscription.make<Model, Message>()(_entry => ({
  viewportWidth: Subscription.persistentEntry(
    Dom.streamFromMediaQuery({
      query: NARROW_VIEWPORT_QUERY,
      mapMatches: isNarrow => Message.ChangedViewportWidth({ isNarrow }),
    }),
  ),
}))
