import { Context, Option } from 'effect';
import type { FocusDirection } from './dom.vibe';
export type ShowDialogOptions = Readonly<{
    focusSelector?: string;
    isModal?: boolean;
    allowedOutsideSelectors?: ReadonlyArray<string>;
}>;
export declare const showDialogElement: (element: HTMLDialogElement, options: ShowDialogOptions | undefined, maybeDialogRuntime: Option.Option<Context.Service.Shape<typeof DialogRuntime>>) => boolean;
export declare const closeDialogElement: (element: HTMLDialogElement) => boolean;
export declare const releaseDialogHygieneById: (id: string) => boolean;
export declare const scrollElementIntoViewIfNotVisible: (element: HTMLElement, block: ScrollLogicalPosition) => void;
export declare const advanceFocusFrom: (reference: HTMLElement, direction: FocusDirection) => boolean;
