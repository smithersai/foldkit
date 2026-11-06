import { type Html, type HtmlBuilder } from 'foldkit/html';
import { Message } from '../message.vibe';
import type { Cell, Grid, HexColor, Model, PaletteIndex } from '../model.vibe';
import { type PaletteTheme } from '../palette.vibe';
export declare const EMPTY_PREVIEW_POSITIONS: ReadonlyArray<readonly [number, number]>;
export declare const computePreviewPositions: (model: Model) => ReadonlyArray<readonly [number, number]>;
export declare const computeFillPreview: (grid: Grid, startX: number, startY: number, fillColorIndex: PaletteIndex) => ReadonlyArray<readonly [number, number]>;
export declare const canvasView: (model: Model, theme: PaletteTheme, h: HtmlBuilder<Message>) => Html;
export declare const rowView: (row: ReadonlyArray<Cell>, y: number, previewColor: HexColor, previewPositions: ReadonlyArray<readonly [number, number]>, theme: PaletteTheme, h: HtmlBuilder<Message>) => Html;
