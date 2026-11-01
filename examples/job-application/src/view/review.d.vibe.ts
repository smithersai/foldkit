import type { Html, HtmlBuilder } from 'foldkit/html';
import { Step } from '../domain/index.ts';
import { Message } from '../message.vibe';
import { type Model } from '../model.vibe';
export declare const review: (model: Model, attentionSteps: ReadonlyArray<Step.Step>, h: HtmlBuilder<Message>) => Html;
