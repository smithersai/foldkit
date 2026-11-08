import { Runtime } from 'foldkit'

import { Model, init, update, view } from './main.vibe'

const application = Runtime.makeApplication({
  Model,
  init,
  update,
  view,
  container: document.getElementById('root'),
  devTools: false,
})

Runtime.run(application)
