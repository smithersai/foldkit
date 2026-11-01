import { type Document, type HtmlBuilder } from 'foldkit/html';
import { Message } from '../message.vibe';
import type { Model } from '../model.vibe';
export declare const view: (model: Model, h: HtmlBuilder<Message>) => Document;
