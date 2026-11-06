import { BarChart, GraphChart, LineChart } from 'echarts/charts'
import {
  AriaComponent,
  DataZoomComponent,
  GridComponent,
  LegendComponent,
  MarkLineComponent,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
} from 'echarts/components'
import * as echarts from 'echarts/core'
import { LabelLayout, UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'

export const registerEcharts = (): typeof echarts => {
  echarts.use([
    AriaComponent,
    BarChart,
    CanvasRenderer,
    DataZoomComponent,
    GraphChart,
    GridComponent,
    LabelLayout,
    LegendComponent,
    LineChart,
    MarkLineComponent,
    TitleComponent,
    ToolboxComponent,
    TooltipComponent,
    UniversalTransition,
  ])

  return echarts
}
