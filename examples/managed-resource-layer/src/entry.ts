import { Runtime } from 'foldkit'

import {
  Message,
  Model,
  init,
  managedResources,
  update,
  view,
} from './main.vibe'

const application = Runtime.makeApplication({
  Model,
  init,
  update,
  view,
  managedResources,
  container: document.getElementById('root'),
  devTools: {
    Message,
  },
})

Runtime.run(application)
