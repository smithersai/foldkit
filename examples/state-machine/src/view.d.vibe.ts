import { Document, HtmlBuilder } from 'foldkit/html';
import { Message, type Model } from './main.js';
export declare const view: (model: Model, h: HtmlBuilder<Message>) => Document;
