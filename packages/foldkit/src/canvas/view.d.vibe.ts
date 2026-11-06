import { type Html, type HtmlBuilder } from '../html/index.vibe';
import type { Point, Shape } from './shape.vibe';
/**
 * Configuration for `Canvas.view`. Pointer handlers are optional and
 * receive a `Point` already translated to the canvas's internal coordinate
 * space (the `width` and `height` passed here), independent of how the
 * canvas is sized in CSS.
 */
export type ViewConfig<Message> = Readonly<{
    width: number;
    height: number;
    shapes: ReadonlyArray<Shape>;
    className?: string | undefined;
    onPointerDown?: ((point: Point) => Message) | undefined;
    onPointerMove?: ((point: Point) => Message) | undefined;
    onPointerUp?: ((point: Point) => Message) | undefined;
}>;
/**
 * A virtual DOM `<canvas>` element backed by a declarative scene description.
 * The insert hook captures the 2D context and paints the initial scene; the
 * postpatch hook re-paints on every render. The canvas is a pure function of
 * `shapes`. Same shapes produce the same pixels.
 *
 * The trailing `h` fixes `Message` to the calling view's frame; the pointer
 * handlers dispatch through that frame at fire time, so passing the builder
 * that built the surrounding view is what makes the handler types truthful.
 *
 * @example
 * ```typescript
 * Canvas.view(
 *   {
 *     width: 400,
 *     height: 300,
 *     shapes: [
 *       Canvas.Rect({ x: 0, y: 0, width: 400, height: 300, fill: '#000' }),
 *       Canvas.Circle({ x: 200, y: 150, radius: 50, fill: '#f0a' }),
 *     ],
 *     onPointerDown: ({ x, y }) => ClickedCanvas({ x, y }),
 *   },
 *   h,
 * )
 * ```
 */
export declare const view: <Message>(config: ViewConfig<NoInfer<Message>>, _h: HtmlBuilder<Message>) => Html;
