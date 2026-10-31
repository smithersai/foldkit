import { Schema } from "effect";
/** A 2D point in canvas-local coordinates. */
export declare const Point: Schema.Struct<{
    readonly x: Schema.Number;
    readonly y: Schema.Number;
}>;
/** A 2D point in canvas-local coordinates. */
export type Point = typeof Point.Type;
/** Move the path cursor to a point without drawing. */
export declare const MoveTo: import("../schema/index.js").CallableTaggedStruct<"MoveTo", {
    x: Schema.Number;
    y: Schema.Number;
}>;
/** Move the path cursor to a point without drawing. */
export type MoveTo = typeof MoveTo.Type;
/** Draw a straight line from the cursor to a point. */
export declare const LineTo: import("../schema/index.js").CallableTaggedStruct<"LineTo", {
    x: Schema.Number;
    y: Schema.Number;
}>;
/** Draw a straight line from the cursor to a point. */
export type LineTo = typeof LineTo.Type;
/** Draw a quadratic Bezier curve from the cursor through a control point to an end point. */
export declare const QuadTo: import("../schema/index.js").CallableTaggedStruct<"QuadTo", {
    cpx: Schema.Number;
    cpy: Schema.Number;
    x: Schema.Number;
    y: Schema.Number;
}>;
/** Draw a quadratic Bezier curve from the cursor through a control point to an end point. */
export type QuadTo = typeof QuadTo.Type;
/** Draw a cubic Bezier curve from the cursor through two control points to an end point. */
export declare const BezierTo: import("../schema/index.js").CallableTaggedStruct<"BezierTo", {
    cp1x: Schema.Number;
    cp1y: Schema.Number;
    cp2x: Schema.Number;
    cp2y: Schema.Number;
    x: Schema.Number;
    y: Schema.Number;
}>;
/** Draw a cubic Bezier curve from the cursor through two control points to an end point. */
export type BezierTo = typeof BezierTo.Type;
/** Close the current path by drawing a line back to its starting point. */
export declare const Close: import("../schema/index.js").CallableTaggedStruct<"Close", {}>;
/** Close the current path by drawing a line back to its starting point. */
export type Close = typeof Close.Type;
/** A single drawing instruction within a `Path` shape. */
export declare const PathInstruction: Schema.Union<readonly [import("../schema/index.js").CallableTaggedStruct<"MoveTo", {
    x: Schema.Number;
    y: Schema.Number;
}>, import("../schema/index.js").CallableTaggedStruct<"LineTo", {
    x: Schema.Number;
    y: Schema.Number;
}>, import("../schema/index.js").CallableTaggedStruct<"QuadTo", {
    cpx: Schema.Number;
    cpy: Schema.Number;
    x: Schema.Number;
    y: Schema.Number;
}>, import("../schema/index.js").CallableTaggedStruct<"BezierTo", {
    cp1x: Schema.Number;
    cp1y: Schema.Number;
    cp2x: Schema.Number;
    cp2y: Schema.Number;
    x: Schema.Number;
    y: Schema.Number;
}>, import("../schema/index.js").CallableTaggedStruct<"Close", {}>]>;
/** A single drawing instruction within a `Path` shape. */
export type PathInstruction = typeof PathInstruction.Type;
/** Stroke cap style: how the ends of an open stroked subpath are rendered. */
export declare const LineCap: Schema.Literals<readonly ["Butt", "Round", "Square"]>;
/** Stroke cap style: how the ends of an open stroked subpath are rendered. */
export type LineCap = typeof LineCap.Type;
/** Stroke join style: how two connected stroked segments meet. */
export declare const LineJoin: Schema.Literals<readonly ["Miter", "Round", "Bevel"]>;
/** Stroke join style: how two connected stroked segments meet. */
export type LineJoin = typeof LineJoin.Type;
/** Horizontal alignment of a `Text` shape relative to its anchor x coordinate. */
export declare const TextAlign: Schema.Literals<readonly ["Left", "Center", "Right", "Start", "End"]>;
/** Horizontal alignment of a `Text` shape relative to its anchor x coordinate. */
export type TextAlign = typeof TextAlign.Type;
/** Vertical alignment of a `Text` shape relative to its anchor y coordinate. */
export declare const TextBaseline: Schema.Literals<readonly ["Top", "Middle", "Bottom", "Alphabetic", "Hanging", "Ideographic"]>;
/** Vertical alignment of a `Text` shape relative to its anchor y coordinate. */
export type TextBaseline = typeof TextBaseline.Type;
/** An axis-aligned rectangle. */
export declare const Rect: import("../schema/index.js").CallableTaggedStruct<"Rect", {
    x: Schema.Number;
    y: Schema.Number;
    width: Schema.Number;
    height: Schema.Number;
    fill: Schema.optional<Schema.String>;
    stroke: Schema.optional<Schema.String>;
    lineWidth: Schema.optional<Schema.Number>;
}>;
/** An axis-aligned rectangle. */
export type Rect = typeof Rect.Type;
/** A filled or stroked circle. */
export declare const Circle: import("../schema/index.js").CallableTaggedStruct<"Circle", {
    x: Schema.Number;
    y: Schema.Number;
    radius: Schema.Number;
    fill: Schema.optional<Schema.String>;
    stroke: Schema.optional<Schema.String>;
    lineWidth: Schema.optional<Schema.Number>;
}>;
/** A filled or stroked circle. */
export type Circle = typeof Circle.Type;
/** A path built from a sequence of `PathInstruction`s. */
export declare const Path: import("../schema/index.js").CallableTaggedStruct<"Path", {
    instructions: Schema.$Array<Schema.Union<readonly [import("../schema/index.js").CallableTaggedStruct<"MoveTo", {
        x: Schema.Number;
        y: Schema.Number;
    }>, import("../schema/index.js").CallableTaggedStruct<"LineTo", {
        x: Schema.Number;
        y: Schema.Number;
    }>, import("../schema/index.js").CallableTaggedStruct<"QuadTo", {
        cpx: Schema.Number;
        cpy: Schema.Number;
        x: Schema.Number;
        y: Schema.Number;
    }>, import("../schema/index.js").CallableTaggedStruct<"BezierTo", {
        cp1x: Schema.Number;
        cp1y: Schema.Number;
        cp2x: Schema.Number;
        cp2y: Schema.Number;
        x: Schema.Number;
        y: Schema.Number;
    }>, import("../schema/index.js").CallableTaggedStruct<"Close", {}>]>>;
    fill: Schema.optional<Schema.String>;
    stroke: Schema.optional<Schema.String>;
    lineWidth: Schema.optional<Schema.Number>;
    lineCap: Schema.optional<Schema.Literals<readonly ["Butt", "Round", "Square"]>>;
    lineJoin: Schema.optional<Schema.Literals<readonly ["Miter", "Round", "Bevel"]>>;
}>;
/** A path built from a sequence of `PathInstruction`s. */
export type Path = typeof Path.Type;
/** A single line of text drawn with a font, fill, and optional stroke. */
export declare const Text: import("../schema/index.js").CallableTaggedStruct<"Text", {
    x: Schema.Number;
    y: Schema.Number;
    content: Schema.String;
    font: Schema.optional<Schema.String>;
    fill: Schema.optional<Schema.String>;
    stroke: Schema.optional<Schema.String>;
    lineWidth: Schema.optional<Schema.Number>;
    align: Schema.optional<Schema.Literals<readonly ["Left", "Center", "Right", "Start", "End"]>>;
    baseline: Schema.optional<Schema.Literals<readonly ["Top", "Middle", "Bottom", "Alphabetic", "Hanging", "Ideographic"]>>;
}>;
/** A single line of text drawn with a font, fill, and optional stroke. */
export type Text = typeof Text.Type;
/**
 * A scene-graph node that applies a 2D transform and global alpha to a list of
 * child shapes. Transforms compose multiplicatively when groups are nested.
 *
 * Defined via the `interface` form so the recursion (`shapes: ReadonlyArray<Shape>`
 * where `Shape` includes `Group` itself) resolves under TypeScript's lazy
 * interface evaluation. The matching runtime Schema uses `Schema.suspend`.
 */
export interface Group extends Readonly<{
    readonly _tag: 'Group';
    readonly shapes: ReadonlyArray<Shape>;
    readonly translate?: Point | undefined;
    readonly rotate?: number | undefined;
    readonly scale?: Point | undefined;
    readonly opacity?: number | undefined;
}> {
}
/**
 * A drawable scene-graph node. Composing `Group` recursively builds a tree;
 * the painter walks the tree depth-first, applying transforms via
 * `ctx.save` / `ctx.restore`.
 */
export type Shape = typeof Rect.Type | typeof Circle.Type | typeof Path.Type | typeof Text.Type | Group;
/** Construct a `Group` shape that wraps its children in a transformed scope. */
export declare const Group: import("../schema/index.js").CallableTaggedStruct<"Group", {
    shapes: Schema.$Array<Schema.Schema<Shape>>;
    translate: Schema.optional<Schema.Struct<{
        readonly x: Schema.Number;
        readonly y: Schema.Number;
    }>>;
    rotate: Schema.optional<Schema.Number>;
    scale: Schema.optional<Schema.Struct<{
        readonly x: Schema.Number;
        readonly y: Schema.Number;
    }>>;
    opacity: Schema.optional<Schema.Number>;
}>;
