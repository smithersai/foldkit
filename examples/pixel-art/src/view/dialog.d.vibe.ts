import { Option } from "effect";
import type { Html, HtmlBuilder } from 'foldkit/html';
import { Dialog } from '@foldkit/ui';
import { Message } from '../message.js';
export declare const errorDialogView: (errorDialog: typeof Dialog.Model.Type, maybeExportError: Option.Option<string>, h: HtmlBuilder<Message>) => Html;
export declare const gridSizeConfirmDialogView: (gridSizeConfirmDialog: typeof Dialog.Model.Type, maybePendingGridSize: Option.Option<number>, h: HtmlBuilder<Message>) => Html;
