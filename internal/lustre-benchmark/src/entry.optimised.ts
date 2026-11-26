import { Runtime } from 'foldkit'

import { view } from './main.optimised.vibe'
import { Model, init, update } from './main.vibe'

const application = Runtime.makeApplication({
  Model,
  init,
  update,
  view,
  container: document.getElementById('root'),
  devTools: false,
})

Runtime.run(application)
