import { HashSet } from 'effect';
import type { Html, HtmlBuilder } from 'foldkit/html';
import { Menu, Tabs } from '@foldkit/ui';
import { Step } from '../domain/index.js';
import type { Message } from '../message.vibe';
import { type Model } from '../model.vibe';
export declare const stepTabButton: (tab: Tabs.TabInfo<Step.Step>, currentStep: Step.Step, stepsNeedingAttention: HashSet.HashSet<Step.Step>, h: HtmlBuilder<Message>) => Html;
export declare const stepMenu: (model: Model, stepsNeedingAttention: HashSet.HashSet<Step.Step>, toParentMessage: (message: Menu.Message) => Message, h: HtmlBuilder<Message>) => Html;
