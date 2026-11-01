import { Schema } from 'effect';
import { Mount } from 'foldkit';
import type { Html } from 'foldkit/html';
import { HtmlBuilder } from 'foldkit/html';
import type { Telemetry } from '../domain.vibe';
import { Message } from '../message.vibe';
import type { Model } from '../model.vibe';
export declare const CHART_HOST_ID = "charting-chart";
export declare const MountChart: Mount.MountDefinitionWithArgs<"MountChart", {
    hostId: Schema.String;
}, {
    readonly _tag: "ClickedChartDatum";
    readonly datumId: string;
} | {
    readonly _tag: "FailedMountChart";
    readonly reason: string;
} | {
    readonly _tag: "SucceededMountChart";
    readonly hostId: string;
}>;
export declare const chartPanelView: (model: Model, telemetry: Telemetry, h: HtmlBuilder<Message>) => Html;
export declare const chartFooterView: (model: Model, telemetry: Telemetry, h: HtmlBuilder<Message>) => Html;
export declare const chartFooterLabel: (model: Model, telemetry: Telemetry) => string;
export declare const chartStatusView: (model: Model, h: HtmlBuilder<Message>) => Html;
