import { Option } from 'effect';
import type { EChartsOption } from 'echarts/types/dist/shared';
import { type ChartMode, type PackageId, type Period, type Telemetry } from './domain.vibe';
export { registerEcharts } from './registerEcharts.ts';
export type ChartOptionArgs = Readonly<{
    telemetry: Telemetry;
    chartMode: ChartMode;
    selectedPackageId: PackageId;
    period: Period;
    maybeSelectedDatumId: Option.Option<string>;
}>;
export declare const makeChartOption: (args: ChartOptionArgs) => EChartsOption;
export declare const selectedDatumLabel: (telemetry: Telemetry, maybeSelectedDatumId: Option.Option<string>) => Option.Option<string>;
