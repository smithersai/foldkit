import { Effect } from 'effect';
type InertAttribute = 'aria-hidden' | 'inert';
export declare const makeOutsideIsolation: () => Readonly<{
    update: (allowedElements: ReadonlyArray<HTMLElement>) => void;
    contains: (element: HTMLElement) => boolean;
    recordAttributeMutation: (element: HTMLElement, attributeName: InertAttribute) => void;
    dispose: () => void;
}>;
export declare const isolateOutsideElements: (allowedElements: ReadonlyArray<HTMLElement>) => (() => void);
/**
 * Marks all DOM elements outside the given selectors as `inert` and
 * `aria-hidden="true"`. Walks each allowed element up to `document.body`,
 * marking siblings that don't contain an allowed element. Reference counting
 * allows nested calls with different ids.
 *
 * Reusing an id acquires the replacement isolation before releasing the
 * previous one, so shared elements keep `inert` and `aria-hidden` throughout.
 * One `restoreInert` releases that id's isolation. Calling it before the
 * pending render commits discards the request.
 *
 * @example
 * ```typescript
 * Dom.inertOthers('my-menu', ['#menu-button', '#menu-items'])
 * ```
 */
export declare const inertOthers: (id: string, allowedSelectors: ReadonlyArray<string>) => Effect.Effect<void>;
/**
 * Restores all elements previously marked inert by `inertOthers` for the
 * given ID. Safe to call without a preceding `inertOthers`. Acts as a no-op
 * in that case.
 *
 * @example
 * ```typescript
 * Dom.restoreInert('my-menu')
 * ```
 */
export declare const restoreInert: (id: string) => Effect.Effect<void>;
export {};
