import { Html, HtmlBuilder } from 'foldkit/html';
import { DragAndDrop } from '@foldkit/ui';
import { Card } from '../domain/index.js';
import type { Message } from '../message.vibe';
import type { Model } from '../model.vibe';
export declare const cardView: (model: Model, card: Card.Card, columnId: string, index: number, toParentMessage: (message: DragAndDrop.Message) => Message, h: HtmlBuilder<Message>) => Html;
export declare const ghostCardView: (card: Card.Card, h: HtmlBuilder<Message>) => Html;
