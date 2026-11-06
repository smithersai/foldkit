import { Html, HtmlBuilder } from 'foldkit/html';
import { Column } from '../domain/index.ts';
import { Message } from '../message.vibe';
import type { Model } from '../model.vibe';
export declare const columnView: (model: Model, column: Column.Column, toParentMessage: (message: Message) => Message, h: HtmlBuilder<Message>) => Html;
