import { AriaComponent } from 'echarts/components'
import { use } from 'echarts/core'

export const installAriaComponent = (): void => {
  use([AriaComponent])
}
