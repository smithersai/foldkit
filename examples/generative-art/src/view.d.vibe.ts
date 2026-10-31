import { Document, HtmlBuilder } from 'foldkit/html';
import { Message } from './message.js';
import type { Model } from './model.vibe';
export declare const view: (model: Model, h: HtmlBuilder<Message>) => Document;
