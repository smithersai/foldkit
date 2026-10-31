import { Runtime } from 'foldkit'

import { registerEcharts } from './echarts.vibe'
import { init } from './init.vibe'
import { Message } from './message'
import { Model } from './model.vibe'
import { update } from './update.vibe'
import { view } from './view/index'

registerEcharts()

const application = Runtime.makeApplication({
  Model,
  init,
  update,
  view,
  container: document.getElementById('root'),
  devTools: {
    Message,
  },
})

Runtime.run(application)
