import { Option } from 'effect';
import type { Html, HtmlBuilder } from 'foldkit/html';
import { Combobox, Dialog } from '@foldkit/ui';
import { Message } from '../message.vibe';
import type { City } from '../model.vibe';
export declare const view: (dialogModel: Dialog.Model, h: HtmlBuilder<Message>) => Html[];
export declare const overlayDialogDemo: (dialogModel: Dialog.Model, comboboxModel: Combobox.Model, maybeSelectedCity: Option.Option<City>, h: HtmlBuilder<Message>) => Html[];
export declare const nestedDialogDemo: (parentDialogModel: Dialog.Model, childDialogModel: Dialog.Model, h: HtmlBuilder<Message>) => Html[];
export declare const dialogAnimatedDemo: (dialogModel: Dialog.Model, h: HtmlBuilder<Message>) => Html[];
