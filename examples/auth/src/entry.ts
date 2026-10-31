import { Runtime } from 'foldkit'

import { Flags, flags, init } from './main.ts'
import { Message } from './message.vibe'
import { Model } from './model.vibe'
import { update } from './update.vibe'
import { view } from './view.vibe'

const application = Runtime.makeApplication({
  Model,
  Flags,
  init,
  update,
  view,
  container: document.getElementById('root'),
  routing: {
    onUrlRequest: request => Message.ClickedLink({ request }),
    onUrlChange: url => Message.ChangedUrl({ url }),
  },
  devTools: {
    Message,
  },
})

Runtime.run(application, { flags })
