import { Option } from 'effect';
import type { EChartsType } from 'echarts/core';
export declare const setChart: (hostId: string, chart: EChartsType) => void;
export declare const getChart: (hostId: string) => Option.Option<EChartsType>;
export declare const removeChart: (hostId: string, chart: EChartsType) => void;
