import type { Html, HtmlBuilder } from 'foldkit/html';
import { Message } from '../message.js';
import type { Grid } from '../model.vibe';
import { type PaletteTheme } from '../palette.vibe';
export declare const historyPanelView: (undoStack: ReadonlyArray<Grid>, redoStack: ReadonlyArray<Grid>, grid: Grid, gridSize: number, theme: PaletteTheme, h: HtmlBuilder<Message>) => Html;
