import { type Document, type HtmlBuilder } from 'foldkit/html';
import type { Message } from './message';
import type { Model } from './model';
export declare const view: (model: Model, h: HtmlBuilder<Message>) => Document;
