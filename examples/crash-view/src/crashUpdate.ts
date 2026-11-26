import type { Update } from 'foldkit'

import type { Message, Model } from './main.vibe'

export const update = (
  _model: Model,
  _message: Message,
): Update.Return<Model, Message> => {
  throw new Error('This is a simulated crash!')
}
