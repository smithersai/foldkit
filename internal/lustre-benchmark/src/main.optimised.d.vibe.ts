import { Document, type HtmlBuilder } from 'foldkit/html';
import { Message, Model } from './main.vibe';
export declare const view: (model: Model, h: HtmlBuilder<Message>) => Document;
