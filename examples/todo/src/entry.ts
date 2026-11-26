import { Runtime } from 'foldkit'

import { Flags, Message, Model, flags, init, update, view } from './main.vibe'

const application = Runtime.makeApplication({
  Model,
  Flags,
  init,
  update,
  view,
  container: document.getElementById('root'),
  devTools: {
    Message,
  },
})

Runtime.run(application, { flags })
