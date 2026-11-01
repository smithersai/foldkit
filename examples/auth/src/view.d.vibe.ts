import { type Document, HtmlBuilder } from 'foldkit/html';
import { Message } from './message.vibe';
import { Model } from './model.vibe';
export declare const view: (model: Model, h: HtmlBuilder<Message>) => Document;
