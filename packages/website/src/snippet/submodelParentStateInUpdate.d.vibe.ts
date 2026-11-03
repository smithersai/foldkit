import { Message as SettingsMessage } from './message';
import type { Model as SettingsModel } from './model';
import type { User } from './user';
type Context = Readonly<{
    currentUser: User;
}>;
export declare const update: (model: SettingsModel, message: SettingsMessage, context: Context) => any;
export {};
