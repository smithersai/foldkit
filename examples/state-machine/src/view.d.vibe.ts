import { Document, HtmlBuilder } from 'foldkit/html';
import { Message, type Model } from './main.ts';
export declare const view: (model: Model, h: HtmlBuilder<Message>) => Document;
