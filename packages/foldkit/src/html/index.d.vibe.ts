import { Data, Option, Schema } from 'effect';
import type { File } from '../file/index.js';
import type { MountAction } from '../mount/index.vibe';
import { beginReplayUnmountRender, endReplayUnmountRender, flushReplayUnmountsAfterPatchFailure } from '../onUnmountModule.js';
import { VNode } from '../vdom.vibe';
import { type ChildAttribute } from './childAttribute.vibe';
import { requireDispatch, setRuntime } from './runtimeSingleton.vibe';
import { type AnySubmodelView, type SubmodelConfig } from './submodel.js';
export { createKeyedLazy, createLazy } from './lazy.vibe';
export { beginRender as __beginRender, createBoundaryRegistry as __createBoundaryRegistry, } from './boundary.js';
export type { BoundaryRegistry } from './boundary.js';
export { childAttributes } from './childAttribute.vibe';
export type { ChildAttribute } from './childAttribute.vibe';
export { defineView } from './submodel.js';
export type { AnySubmodelView, SubmodelConfig, SubmodelView, } from './submodel.js';
/** Pushes a dispatch and runtime context frame for the duration of a render.
 *  The runtime calls this immediately before invoking a user `view` and
 *  matches it with {@link __clearRuntime} in a `finally` so an exception
 *  inside view code does not leak the frame to the next render. Test
 *  scaffolding that builds VNodes outside of a real program (Scene, Canvas
 *  view-only tests, Mount tests) uses the same pair. Nested frames are
 *  supported via an internal stack. */
export declare const __setRuntime: typeof setRuntime;
/** Pops the current dispatch and runtime context frame. Must be paired with a
 *  prior {@link __setRuntime} on the same call stack. */
export declare const __clearRuntime: () => void;
/** Returns the current dispatch function. Foldkit's `Canvas.view` reads this
 *  to build its synchronous pointer handlers, since it builds VNodes directly
 *  rather than going through the html factory. Most application code never
 *  needs to call this. */
export declare const __requireDispatch: typeof requireDispatch;
/**
 * The `id` of the DOM element that hosts the Foldkit DevTools shadow root.
 * Defined here (not in `devTools/`) because the `OnBlur` handler below uses it
 * to suppress blur Messages whose `relatedTarget` is this host (i.e. when
 * focus crosses into the DevTools UI). Surfaced publicly through
 * `foldkit/devtools-host` (not `foldkit/html`); the DevTools overlay imports it
 * from there when creating the host element, so the two stay in sync.
 */
export declare const DEVTOOLS_HOST_ID = "foldkit-devtools";
/**
 * Tag symbol attached to file-aware event handler functions so Scene test
 * helpers can distinguish `OnFileChange` from `OnChange` (both register on
 * the DOM `change` event) and `OnDropFiles` from `OnDrop` (both register on
 * the DOM `drop` event). Internal implementation detail. Consumer code
 * should never need to reference this directly.
 */
export declare const FileHandlerSymbol: unique symbol;
/** Type-level brand for file-aware event handler tags. */
export type FileHandlerSymbol = typeof FileHandlerSymbol;
/** Modifier key state extracted from a `KeyboardEvent`. */
export type KeyboardModifiers = Readonly<{
    shiftKey: boolean;
    ctrlKey: boolean;
    altKey: boolean;
    metaKey: boolean;
}>;
/** A virtual DOM element. Constructed synchronously by the element factories
 *  on {@link HtmlBuilder}. The runtime patches a `VNode` (or `null` to
 *  render nothing) into the application container. */
export type Html = VNode | null;
export type Child = Html | string;
/** Whether an event handler leaves the browser's default action in place or
 *  prevents it synchronously. */
export declare const DefaultAction: Schema.Literals<readonly ["Allow", "Prevent"]>;
/** Whether an event handler leaves the browser's default action in place or
 *  prevents it synchronously. */
export type DefaultAction = typeof DefaultAction.Type;
/** Whether an event continues through its DOM propagation path or stops after
 *  the handlers on its current element have run. */
export declare const EventPropagation: Schema.Literals<readonly ["Bubble", "Stop"]>;
/** Whether an event continues through its DOM propagation path or stops after
 *  the handlers on its current element have run. */
export type EventPropagation = typeof EventPropagation.Type;
/** Declarative controls for an `OnClick` handler. Omitted
 *  fields keep the browser default, allow the click to bubble, and leave focus
 *  unchanged. */
export declare const ClickOptions: Schema.Struct<{
    readonly defaultAction: Schema.optional<Schema.Literals<readonly ["Allow", "Prevent"]>>;
    readonly propagation: Schema.optional<Schema.Literals<readonly ["Bubble", "Stop"]>>;
    readonly focusSelector: Schema.optional<Schema.String>;
}>;
/** Declarative controls for an `OnClick` handler. Omitted
 *  fields keep the browser default, allow the click to bubble, and leave focus
 *  unchanged. */
export type ClickOptions = typeof ClickOptions.Type;
/** Text direction for the document root, applied to `dir` on the `<html>`
 *  element. `Auto` defers to the browser's first-strong-character heuristic. */
export declare const TextDirection: Schema.Literals<readonly ["Ltr", "Rtl", "Auto"]>;
/** Text direction for the document root, applied to `dir` on the `<html>`
 *  element. `Auto` defers to the browser's first-strong-character heuristic. */
export type TextDirection = typeof TextDirection.Type;
/** Maps a {@link TextDirection} to the lowercase value written to the `dir`
 *  attribute on the `<html>` element. Shared by the client runtime, which sets
 *  it after each render, and server rendering, which stamps it into the served
 *  shell so the direction is correct on first paint. */
export declare const textDirectionToAttribute: (direction: TextDirection) => 'ltr' | 'rtl' | 'auto';
/** The complete output of a page-owning view. The runtime patches `body` into
 *  the application container, writes `title` to `document.title`, and manages
 *  the optional document metadata.
 *
 *  Supplied `lang` and `dir` values are written to the `<html>` element. An
 *  omitted value leaves the current attribute unchanged, including a value
 *  from the served HTML or an earlier render. Drive both fields from the Model
 *  when the application can switch languages at runtime.
 *
 *  `canonical` has no address-bar default. Derive it from the typed route in
 *  the Model, where the application can decide which route and query values
 *  identify the page. If the view never supplies it, the runtime leaves a
 *  served `<link rel="canonical">` unchanged or keeps the document without one.
 *
 *  Before the client first writes `canonical` or `ogUrl`, it records the value
 *  already present on the corresponding element. A later omission restores
 *  that value, or removes the element if the runtime created it. During
 *  hydration, the recorded value may be metadata rendered for the initial
 *  route. `ogUrl` can be supplied independently; when omitted alongside an
 *  explicit `canonical`, it uses that canonical.
 *
 *  Server rendering returns only the canonical supplied by the view. It
 *  returns `ogUrl` when supplied or falls back to an explicit canonical.
 *
 *  This is the return type of a `makeApplication` view. An application embedded
 *  at a node should use `makeElement`; its view returns `Html` and never changes
 *  the `<head>` or `<html>` element. */
export type Document = Readonly<{
    title: string;
    lang?: string;
    dir?: TextDirection;
    canonical?: string;
    ogUrl?: string;
    body: Html;
}>;
/** Union of all valid HTML, SVG, and MathML tag names. */
export type TagName = 'a' | 'abbr' | 'address' | 'area' | 'article' | 'aside' | 'audio' | 'b' | 'base' | 'bdi' | 'bdo' | 'blockquote' | 'body' | 'br' | 'button' | 'canvas' | 'caption' | 'cite' | 'code' | 'col' | 'colgroup' | 'data' | 'datalist' | 'dd' | 'del' | 'details' | 'dfn' | 'dialog' | 'div' | 'dl' | 'dt' | 'em' | 'embed' | 'fieldset' | 'figcaption' | 'figure' | 'footer' | 'form' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'head' | 'header' | 'hgroup' | 'hr' | 'html' | 'i' | 'iframe' | 'img' | 'input' | 'ins' | 'kbd' | 'label' | 'legend' | 'li' | 'link' | 'main' | 'map' | 'mark' | 'menu' | 'meta' | 'meter' | 'nav' | 'noscript' | 'object' | 'ol' | 'optgroup' | 'option' | 'output' | 'p' | 'picture' | 'portal' | 'pre' | 'progress' | 'q' | 'rp' | 'rt' | 'ruby' | 's' | 'samp' | 'script' | 'search' | 'section' | 'select' | 'slot' | 'small' | 'source' | 'span' | 'strong' | 'style' | 'sub' | 'summary' | 'sup' | 'table' | 'tbody' | 'td' | 'template' | 'textarea' | 'tfoot' | 'th' | 'thead' | 'time' | 'title' | 'tr' | 'track' | 'u' | 'ul' | 'var' | 'video' | 'wbr' | 'animate' | 'animateMotion' | 'animateTransform' | 'circle' | 'clipPath' | 'defs' | 'desc' | 'ellipse' | 'feBlend' | 'feColorMatrix' | 'feComponentTransfer' | 'feComposite' | 'feConvolveMatrix' | 'feDiffuseLighting' | 'feDisplacementMap' | 'feDistantLight' | 'feDropShadow' | 'feFlood' | 'feFuncA' | 'feFuncB' | 'feFuncG' | 'feFuncR' | 'feGaussianBlur' | 'feImage' | 'feMerge' | 'feMergeNode' | 'feMorphology' | 'feOffset' | 'fePointLight' | 'feSpecularLighting' | 'feSpotLight' | 'feTile' | 'feTurbulence' | 'filter' | 'foreignObject' | 'g' | 'image' | 'line' | 'linearGradient' | 'marker' | 'mask' | 'metadata' | 'mpath' | 'path' | 'pattern' | 'polygon' | 'polyline' | 'radialGradient' | 'rect' | 'set' | 'stop' | 'svg' | 'switch' | 'symbol' | 'text' | 'textPath' | 'tspan' | 'use' | 'view' | 'annotation' | 'annotation-xml' | 'math' | 'maction' | 'menclose' | 'merror' | 'mfenced' | 'mfrac' | 'mglyph' | 'mi' | 'mlabeledtr' | 'mlongdiv' | 'mmultiscripts' | 'mn' | 'mo' | 'mover' | 'mpadded' | 'mphantom' | 'mprescripts' | 'mroot' | 'mrow' | 'ms' | 'mscarries' | 'mscarry' | 'msgroup' | 'msline' | 'mspace' | 'msqrt' | 'msrow' | 'mstack' | 'mstyle' | 'msub' | 'msubsup' | 'msup' | 'mtable' | 'mtd' | 'mtext' | 'mtr' | 'munder' | 'munderover' | 'semantics';
/** Opens a replay-render window. The runtime calls this immediately before a
 *  DevTools time-travel render and closes it with {@link __endReplayRender}
 *  afterward, so the `OnUnmount` module can defer live callbacks while the
 *  replayed tree is patched in. Without the gate the callback would
 *  enqueue a hygiene Message into live history during mere inspection of past
 *  state. */
export declare const __beginReplayRender: typeof beginReplayUnmountRender;
/** Closes the replay-render window opened by {@link __beginReplayRender}. */
export declare const __endReplayRender: typeof endReplayUnmountRender;
/** Dispatches the live `OnUnmount` callbacks deferred by a replay patch that
 *  failed and forced the runtime to discard the damaged DOM. */
export declare const __flushReplayUnmountsAfterPatchFailure: typeof flushReplayUnmountsAfterPatchFailure;
/** Key under which the OnMount attribute stamps a `{ name }` marker on the
 *  snabbdom `VNodeData`. Snabbdom passes unknown data fields through without
 *  rendering them to the DOM, so the marker is invisible at runtime but
 *  observable by VNode walkers (Scene tests). */
export declare const FOLDKIT_MOUNT_KEY: 'foldkitMount';
/** Marker stamped on `VNodeData[FOLDKIT_MOUNT_KEY]` for any element with an
 *  `OnMount` attribute. Carries the Mount Definition's name (and args) so test
 *  introspection can identify pending mounts. When the mount lives inside a
 *  Submodel boundary, it also carries that boundary's `toParentMessage` chain
 *  (innermost first), snapshotted at render time, so `Scene.Mount.resolve` can
 *  replay the lift the result travels through in production. Production keeps
 *  the Mount bound to the dispatcher owned by its acquiring render, then
 *  resolves that owner's latest chain when the Mount emits. */
export type FoldkitMountMarker = Readonly<{
    name: string;
    args?: Record<string, unknown>;
    messageMappers?: ReadonlyArray<(message: unknown) => unknown>;
}>;
/** Union of all HTML, SVG, and MathML attributes a virtual DOM element can carry.
 *
 *  When a Submodel publishes attribute groups to a consumer's `toView`
 *  slot, those attributes are wrapped via {@link childAttributes} into
 *  {@link ChildAttribute}, a distinct type that carries the Submodel's
 *  own dispatcher. Element constructors accept the union
 *  `ReadonlyArray<Attribute<Message> | ChildAttribute>`, so consumers
 *  can spread published bundles directly into their own attribute
 *  arrays. */
export type Attribute<Message> = Data.TaggedEnum<{
    Key: {
        readonly value: string;
    };
    Class: {
        readonly value: string;
    };
    Id: {
        readonly value: string;
    };
    Title: {
        readonly value: string;
    };
    Lang: {
        readonly value: string;
    };
    Dir: {
        readonly value: string;
    };
    Tabindex: {
        readonly value: number;
    };
    Hidden: {
        readonly value: boolean;
    };
    Contenteditable: {
        readonly value: string;
    };
    Draggable: {
        readonly value: boolean;
    };
    Accesskey: {
        readonly value: string;
    };
    Translate: {
        readonly value: string;
    };
    Inert: {
        readonly value: boolean;
    };
    Popover: {
        readonly value: string;
    };
    Popovertarget: {
        readonly value: string;
    };
    Popovertargetaction: {
        readonly value: string;
    };
    OnClick: {
        readonly message: Message;
        readonly options?: ClickOptions;
    };
    OnDoubleClick: {
        readonly message: Message;
    };
    OnMouseDown: {
        readonly message: Message;
    };
    OnMouseUp: {
        readonly message: Message;
    };
    OnMouseEnter: {
        readonly message: Message;
    };
    OnMouseLeave: {
        readonly message: Message;
    };
    OnMouseOver: {
        readonly message: Message;
    };
    OnMouseOut: {
        readonly message: Message;
    };
    OnMouseMove: {
        readonly message: Message;
    };
    OnPointerMove: {
        readonly f: (screenX: number, screenY: number, pointerType: string) => Option.Option<Message>;
    };
    OnPointerLeave: {
        readonly f: (pointerType: string) => Option.Option<Message>;
    };
    OnPointerDown: {
        readonly f: (pointerType: string, button: number, screenX: number, screenY: number, timeStamp: number, clientX: number, clientY: number, pointerId: number, target: EventTarget | null) => Option.Option<Message>;
    };
    OnPointerUp: {
        readonly f: (screenX: number, screenY: number, pointerType: string, timeStamp: number) => Option.Option<Message>;
    };
    OnKeyDown: {
        readonly f: (key: string, modifiers: KeyboardModifiers) => Message;
    };
    OnKeyDownPreventDefault: {
        readonly f: (key: string, modifiers: KeyboardModifiers) => Option.Option<Message>;
    };
    OnKeyDownSelf: {
        readonly f: (key: string, modifiers: KeyboardModifiers) => Message;
    };
    OnKeyDownSelfPreventDefault: {
        readonly f: (key: string, modifiers: KeyboardModifiers) => Option.Option<Message>;
    };
    OnKeyDownFocus: {
        readonly f: (key: string, modifiers: KeyboardModifiers) => Option.Option<Readonly<{
            focusSelector: string;
            message: Message;
        }>>;
    };
    OnKeyUp: {
        readonly f: (key: string, modifiers: KeyboardModifiers) => Message;
    };
    OnKeyUpPreventDefault: {
        readonly f: (key: string, modifiers: KeyboardModifiers) => Option.Option<Message>;
    };
    OnKeyPress: {
        readonly f: (key: string, modifiers: KeyboardModifiers) => Message;
    };
    OnFocus: {
        readonly message: Message;
    };
    OnBlur: {
        readonly message: Message;
    };
    OnFocusEnter: {
        readonly message: Message;
    };
    OnFocusLeave: {
        readonly message: Message;
    };
    OnInput: {
        readonly f: (value: string) => Message;
    };
    OnChange: {
        readonly f: (value: string) => Message;
    };
    OnBeforeInput: {
        readonly f: (inputType: string, data: Option.Option<string>) => Message;
    };
    OnBeforeInputPreventDefault: {
        readonly f: (inputType: string, data: Option.Option<string>) => Option.Option<Message>;
    };
    OnFileChange: {
        readonly f: (files: ReadonlyArray<File>) => Message;
    };
    OnSubmit: {
        readonly message: Message;
    };
    OnReset: {
        readonly message: Message;
    };
    OnScroll: {
        readonly f: (scrollTop: number) => Message;
    };
    OnWheel: {
        readonly message: Message;
    };
    OnCopy: {
        readonly message: Message;
    };
    OnCut: {
        readonly message: Message;
    };
    OnPaste: {
        readonly message: Message;
    };
    OnPastePreventDefault: {
        readonly f: (text: string) => Option.Option<Message>;
    };
    OnCopyText: {
        readonly text: string;
    };
    OnCutText: {
        readonly text: string;
        readonly message: Message;
    };
    OnCancel: {
        readonly message: Message;
    };
    OnCancelPreventDefault: {
        readonly maybeCustomEventMessage: Option.Option<Message>;
    };
    OnToggle: {
        readonly f: (isOpen: boolean) => Message;
    };
    OnContextMenu: {
        readonly message: Message;
    };
    OnDragStart: {
        readonly message: Message;
    };
    OnDrag: {
        readonly message: Message;
    };
    OnDragEnd: {
        readonly message: Message;
    };
    OnDragEnter: {
        readonly message: Message;
    };
    OnDragLeave: {
        readonly message: Message;
    };
    OnDragOver: {
        readonly message: Message;
    };
    AllowDrop: {};
    OnDrop: {
        readonly message: Message;
    };
    OnDropFiles: {
        readonly f: (files: ReadonlyArray<File>) => Message;
    };
    OnTouchStart: {
        readonly message: Message;
    };
    OnTouchEnd: {
        readonly message: Message;
    };
    OnTouchMove: {
        readonly message: Message;
    };
    OnTouchCancel: {
        readonly message: Message;
    };
    OnAnimationStart: {
        readonly message: Message;
    };
    OnAnimationEnd: {
        readonly message: Message;
    };
    OnAnimationIteration: {
        readonly message: Message;
    };
    OnTransitionEnd: {
        readonly message: Message;
    };
    OnLoad: {
        readonly message: Message;
    };
    OnError: {
        readonly message: Message;
    };
    OnPlay: {
        readonly message: Message;
    };
    OnPause: {
        readonly message: Message;
    };
    OnEnded: {
        readonly message: Message;
    };
    OnTimeUpdate: {
        readonly message: Message;
    };
    OnVolumeChange: {
        readonly message: Message;
    };
    OnSelect: {
        readonly message: Message;
    };
    Value: {
        readonly value: string;
    };
    Checked: {
        readonly value: boolean;
    };
    Selected: {
        readonly value: boolean;
    };
    Open: {
        readonly value: boolean;
    };
    Placeholder: {
        readonly value: string;
    };
    Name: {
        readonly value: string;
    };
    Disabled: {
        readonly value: boolean;
    };
    Readonly: {
        readonly value: boolean;
    };
    Required: {
        readonly value: boolean;
    };
    Autofocus: {
        readonly value: boolean;
    };
    Spellcheck: {
        readonly value: boolean;
    };
    Autocorrect: {
        readonly value: string;
    };
    Autocapitalize: {
        readonly value: string;
    };
    InputMode: {
        readonly value: string;
    };
    EnterKeyHint: {
        readonly value: string;
    };
    Multiple: {
        readonly value: boolean;
    };
    Type: {
        readonly value: string;
    };
    Accept: {
        readonly value: string;
    };
    Autocomplete: {
        readonly value: string;
    };
    Pattern: {
        readonly value: string;
    };
    Maxlength: {
        readonly value: number;
    };
    Minlength: {
        readonly value: number;
    };
    Size: {
        readonly value: number;
    };
    Cols: {
        readonly value: number;
    };
    Rows: {
        readonly value: number;
    };
    Max: {
        readonly value: string;
    };
    Min: {
        readonly value: string;
    };
    Step: {
        readonly value: string;
    };
    For: {
        readonly value: string;
    };
    Href: {
        readonly value: string;
    };
    Src: {
        readonly value: string;
    };
    Alt: {
        readonly value: string;
    };
    Target: {
        readonly value: string;
    };
    Rel: {
        readonly value: string;
    };
    Download: {
        readonly value: string;
    };
    Action: {
        readonly value: string;
    };
    Method: {
        readonly value: string;
    };
    Enctype: {
        readonly value: string;
    };
    Novalidate: {
        readonly value: boolean;
    };
    Formaction: {
        readonly value: string;
    };
    Formmethod: {
        readonly value: string;
    };
    Formnovalidate: {
        readonly value: boolean;
    };
    Formtarget: {
        readonly value: string;
    };
    Formenctype: {
        readonly value: string;
    };
    Colspan: {
        readonly value: number;
    };
    Rowspan: {
        readonly value: number;
    };
    Scope: {
        readonly value: string;
    };
    Headers: {
        readonly value: string;
    };
    Span: {
        readonly value: number;
    };
    Start: {
        readonly value: number;
    };
    Reversed: {
        readonly value: boolean;
    };
    CiteAttr: {
        readonly value: string;
    };
    Datetime: {
        readonly value: string;
    };
    Wrap: {
        readonly value: string;
    };
    List: {
        readonly value: string;
    };
    FormAttr: {
        readonly value: string;
    };
    LabelAttr: {
        readonly value: string;
    };
    ContentAttr: {
        readonly value: string;
    };
    Charset: {
        readonly value: string;
    };
    HttpEquiv: {
        readonly value: string;
    };
    Srcset: {
        readonly value: string;
    };
    Sizes: {
        readonly value: string;
    };
    Loading: {
        readonly value: string;
    };
    Decoding: {
        readonly value: string;
    };
    Fetchpriority: {
        readonly value: string;
    };
    Crossorigin: {
        readonly value: string;
    };
    Referrerpolicy: {
        readonly value: string;
    };
    Integrity: {
        readonly value: string;
    };
    Hreflang: {
        readonly value: string;
    };
    Ping: {
        readonly value: string;
    };
    Sandbox: {
        readonly value: string;
    };
    Allow: {
        readonly value: string;
    };
    Srcdoc: {
        readonly value: string;
    };
    Autoplay: {
        readonly value: boolean;
    };
    Controls: {
        readonly value: boolean;
    };
    Loop: {
        readonly value: boolean;
    };
    Muted: {
        readonly value: boolean;
    };
    Poster: {
        readonly value: string;
    };
    Preload: {
        readonly value: string;
    };
    Playsinline: {
        readonly value: boolean;
    };
    High: {
        readonly value: number;
    };
    Low: {
        readonly value: number;
    };
    Optimum: {
        readonly value: number;
    };
    Usemap: {
        readonly value: string;
    };
    Ismap: {
        readonly value: boolean;
    };
    Role: {
        readonly value: string;
    };
    AriaLabel: {
        readonly value: string;
    };
    AriaLabelledBy: {
        readonly value: string;
    };
    AriaDescribedBy: {
        readonly value: string;
    };
    AriaHidden: {
        readonly value: boolean;
    };
    AriaExpanded: {
        readonly value: boolean;
    };
    AriaSelected: {
        readonly value: boolean;
    };
    AriaChecked: {
        readonly value: boolean | 'mixed';
    };
    AriaDisabled: {
        readonly value: boolean;
    };
    AriaRequired: {
        readonly value: boolean;
    };
    AriaInvalid: {
        readonly value: boolean;
    };
    AriaLive: {
        readonly value: string;
    };
    AriaControls: {
        readonly value: string;
    };
    AriaCurrent: {
        readonly value: string;
    };
    AriaOrientation: {
        readonly value: string;
    };
    AriaPressed: {
        readonly value: string;
    };
    AriaHasPopup: {
        readonly value: string;
    };
    AriaActiveDescendant: {
        readonly value: string;
    };
    AriaSort: {
        readonly value: string;
    };
    AriaMultiSelectable: {
        readonly value: boolean;
    };
    AriaModal: {
        readonly value: boolean;
    };
    AriaBusy: {
        readonly value: boolean;
    };
    AriaErrorMessage: {
        readonly value: string;
    };
    AriaRoleDescription: {
        readonly value: string;
    };
    AriaAtomic: {
        readonly value: boolean;
    };
    AriaAutocomplete: {
        readonly value: string;
    };
    AriaColcount: {
        readonly value: number;
    };
    AriaColindex: {
        readonly value: number;
    };
    AriaColspan: {
        readonly value: number;
    };
    AriaDescription: {
        readonly value: string;
    };
    AriaDetails: {
        readonly value: string;
    };
    AriaFlowto: {
        readonly value: string;
    };
    AriaKeyshortcuts: {
        readonly value: string;
    };
    AriaLevel: {
        readonly value: number;
    };
    AriaOwns: {
        readonly value: string;
    };
    AriaPlaceholder: {
        readonly value: string;
    };
    AriaPosinset: {
        readonly value: number;
    };
    AriaReadonly: {
        readonly value: boolean;
    };
    AriaRelevant: {
        readonly value: string;
    };
    AriaRowcount: {
        readonly value: number;
    };
    AriaRowindex: {
        readonly value: number;
    };
    AriaRowspan: {
        readonly value: number;
    };
    AriaSetsize: {
        readonly value: number;
    };
    AriaValuemax: {
        readonly value: number;
    };
    AriaValuemin: {
        readonly value: number;
    };
    AriaValuenow: {
        readonly value: number;
    };
    AriaValuetext: {
        readonly value: string;
    };
    Attribute: {
        readonly key: string;
        readonly value: string;
    };
    DataAttribute: {
        readonly key: string;
        readonly value: string;
    };
    Style: {
        readonly value: Record<string, string>;
    };
    InnerHTML: {
        readonly value: string;
    };
    ViewBox: {
        readonly value: string;
    };
    Xmlns: {
        readonly value: string;
    };
    Fill: {
        readonly value: string;
    };
    FillRule: {
        readonly value: string;
    };
    ClipRule: {
        readonly value: string;
    };
    Stroke: {
        readonly value: string;
    };
    StrokeWidth: {
        readonly value: string;
    };
    StrokeLinecap: {
        readonly value: string;
    };
    StrokeLinejoin: {
        readonly value: string;
    };
    D: {
        readonly value: string;
    };
    Cx: {
        readonly value: string;
    };
    Cy: {
        readonly value: string;
    };
    R: {
        readonly value: string;
    };
    X: {
        readonly value: string;
    };
    Y: {
        readonly value: string;
    };
    Width: {
        readonly value: string;
    };
    Height: {
        readonly value: string;
    };
    X1: {
        readonly value: string;
    };
    Y1: {
        readonly value: string;
    };
    X2: {
        readonly value: string;
    };
    Y2: {
        readonly value: string;
    };
    Points: {
        readonly value: string;
    };
    Transform: {
        readonly value: string;
    };
    Opacity: {
        readonly value: string;
    };
    StrokeDasharray: {
        readonly value: string;
    };
    StrokeDashoffset: {
        readonly value: string;
    };
    Dx: {
        readonly value: string;
    };
    Dy: {
        readonly value: string;
    };
    Rotate: {
        readonly value: string;
    };
    TextAnchor: {
        readonly value: string;
    };
    DominantBaseline: {
        readonly value: string;
    };
    AlignmentBaseline: {
        readonly value: string;
    };
    BaselineShift: {
        readonly value: string;
    };
    TextLength: {
        readonly value: string;
    };
    LengthAdjust: {
        readonly value: string;
    };
    FontFamily: {
        readonly value: string;
    };
    FontSize: {
        readonly value: string;
    };
    FontWeight: {
        readonly value: string;
    };
    FontStyle: {
        readonly value: string;
    };
    LetterSpacing: {
        readonly value: string;
    };
    WordSpacing: {
        readonly value: string;
    };
    TextDecoration: {
        readonly value: string;
    };
    WritingMode: {
        readonly value: string;
    };
    Rx: {
        readonly value: string;
    };
    Ry: {
        readonly value: string;
    };
    PathLength: {
        readonly value: string;
    };
    FillOpacity: {
        readonly value: string;
    };
    StrokeOpacity: {
        readonly value: string;
    };
    StrokeMiterlimit: {
        readonly value: string;
    };
    PaintOrder: {
        readonly value: string;
    };
    VectorEffect: {
        readonly value: string;
    };
    Color: {
        readonly value: string;
    };
    Visibility: {
        readonly value: string;
    };
    Display: {
        readonly value: string;
    };
    Overflow: {
        readonly value: string;
    };
    PointerEvents: {
        readonly value: string;
    };
    Cursor: {
        readonly value: string;
    };
    ShapeRendering: {
        readonly value: string;
    };
    TextRendering: {
        readonly value: string;
    };
    ImageRendering: {
        readonly value: string;
    };
    ClipPath: {
        readonly value: string;
    };
    Mask: {
        readonly value: string;
    };
    Filter: {
        readonly value: string;
    };
    ClipPathUnits: {
        readonly value: string;
    };
    MaskUnits: {
        readonly value: string;
    };
    MaskContentUnits: {
        readonly value: string;
    };
    FilterUnits: {
        readonly value: string;
    };
    PrimitiveUnits: {
        readonly value: string;
    };
    Offset: {
        readonly value: string;
    };
    StopColor: {
        readonly value: string;
    };
    StopOpacity: {
        readonly value: string;
    };
    GradientUnits: {
        readonly value: string;
    };
    GradientTransform: {
        readonly value: string;
    };
    SpreadMethod: {
        readonly value: string;
    };
    Fx: {
        readonly value: string;
    };
    Fy: {
        readonly value: string;
    };
    Fr: {
        readonly value: string;
    };
    PatternUnits: {
        readonly value: string;
    };
    PatternContentUnits: {
        readonly value: string;
    };
    PatternTransform: {
        readonly value: string;
    };
    MarkerStart: {
        readonly value: string;
    };
    MarkerMid: {
        readonly value: string;
    };
    MarkerEnd: {
        readonly value: string;
    };
    MarkerWidth: {
        readonly value: string;
    };
    MarkerHeight: {
        readonly value: string;
    };
    MarkerUnits: {
        readonly value: string;
    };
    RefX: {
        readonly value: string;
    };
    RefY: {
        readonly value: string;
    };
    Orient: {
        readonly value: string;
    };
    PreserveAspectRatio: {
        readonly value: string;
    };
    Prop: {
        readonly key: string;
        readonly value: unknown;
    };
    OnCustomEvent: {
        readonly name: string;
        readonly f: (event: CustomEvent<unknown>) => Option.Option<Message>;
    };
    OnMount: {
        readonly action: MountAction<Message, any>;
    };
    OnUnmount: {
        readonly message: Message;
    };
}>;
interface AttributeDefinition extends Data.TaggedEnum.WithGenerics<1> {
    readonly taggedEnum: Attribute<this['A']>;
}
declare const { Key, Class, Id, Title, Lang, Dir, Tabindex, Hidden, Contenteditable, Draggable, Accesskey, Translate, Inert, Popover, Popovertarget, Popovertargetaction, OnClick, OnDoubleClick, OnMouseDown, OnMouseUp, OnMouseEnter, OnMouseLeave, OnMouseOver, OnMouseOut, OnMouseMove, OnPointerMove, OnPointerLeave, OnPointerDown, OnPointerUp, OnKeyDown, OnKeyDownPreventDefault, OnKeyDownSelf, OnKeyDownSelfPreventDefault, OnKeyDownFocus, OnKeyUp, OnKeyUpPreventDefault, OnKeyPress, OnFocus, OnBlur, OnFocusEnter, OnFocusLeave, OnInput, OnChange, OnBeforeInput, OnBeforeInputPreventDefault, OnFileChange, OnSubmit, OnReset, OnScroll, OnWheel, OnCopy, OnCut, OnPaste, OnPastePreventDefault, OnCopyText, OnCutText, OnCancel, OnCancelPreventDefault, OnToggle, OnContextMenu, OnDragStart, OnDrag, OnDragEnd, OnDragEnter, OnDragLeave, OnDragOver, AllowDrop, OnDrop, OnDropFiles, OnTouchStart, OnTouchEnd, OnTouchMove, OnTouchCancel, OnAnimationStart, OnAnimationEnd, OnAnimationIteration, OnTransitionEnd, OnLoad, OnError, OnPlay, OnPause, OnEnded, OnTimeUpdate, OnVolumeChange, OnSelect, Value, Checked, Selected, Open, Placeholder, Name, Disabled, Readonly, Required, Autofocus, Spellcheck, Autocorrect, Autocapitalize, InputMode, EnterKeyHint, Multiple, Type, Accept, Autocomplete, Pattern, Maxlength, Minlength, Size, Cols, Rows, Max, Min, Step, For, Href, Src, Alt, Target, Rel, Download, Action, Method, Enctype, Novalidate, Formaction, Formmethod, Formnovalidate, Formtarget, Formenctype, Colspan, Rowspan, Scope, Headers, Span, Start, Reversed, CiteAttr, Datetime, Wrap, List, FormAttr, LabelAttr, ContentAttr, Charset, HttpEquiv, Srcset, Sizes, Loading, Decoding, Fetchpriority, Crossorigin, Referrerpolicy, Integrity, Hreflang, Ping, Sandbox, Allow, Srcdoc, Autoplay, Controls, Loop, Muted, Poster, Preload, Playsinline, High, Low, Optimum, Usemap, Ismap, Role, AriaLabel, AriaLabelledBy, AriaDescribedBy, AriaHidden, AriaExpanded, AriaSelected, AriaChecked, AriaDisabled, AriaRequired, AriaInvalid, AriaLive, AriaControls, AriaCurrent, AriaOrientation, AriaPressed, AriaHasPopup, AriaActiveDescendant, AriaSort, AriaMultiSelectable, AriaModal, AriaBusy, AriaErrorMessage, AriaRoleDescription, AriaAtomic, AriaAutocomplete, AriaColcount, AriaColindex, AriaColspan, AriaDescription, AriaDetails, AriaFlowto, AriaKeyshortcuts, AriaLevel, AriaOwns, AriaPlaceholder, AriaPosinset, AriaReadonly, AriaRelevant, AriaRowcount, AriaRowindex, AriaRowspan, AriaSetsize, AriaValuemax, AriaValuemin, AriaValuenow, AriaValuetext, Attribute, DataAttribute, Style, InnerHTML, ViewBox, Xmlns, Fill, FillRule, ClipRule, Stroke, StrokeWidth, StrokeLinecap, StrokeLinejoin, D, Cx, Cy, R, X, Y, Width, Height, X1, Y1, X2, Y2, Points, Transform, Opacity, StrokeDasharray, StrokeDashoffset, Dx, Dy, Rotate, TextAnchor, DominantBaseline, AlignmentBaseline, BaselineShift, TextLength, LengthAdjust, FontFamily, FontSize, FontWeight, FontStyle, LetterSpacing, WordSpacing, TextDecoration, WritingMode, Rx, Ry, PathLength, FillOpacity, StrokeOpacity, StrokeMiterlimit, PaintOrder, VectorEffect, Color, Visibility, Display, Overflow, PointerEvents, Cursor, ShapeRendering, TextRendering, ImageRendering, ClipPath, Mask, Filter, ClipPathUnits, MaskUnits, MaskContentUnits, FilterUnits, PrimitiveUnits, Offset, StopColor, StopOpacity, GradientUnits, GradientTransform, SpreadMethod, Fx, Fy, Fr, PatternUnits, PatternContentUnits, PatternTransform, MarkerStart, MarkerMid, MarkerEnd, MarkerWidth, MarkerHeight, MarkerUnits, RefX, RefY, Orient, PreserveAspectRatio, Prop, OnCustomEvent, OnMount, OnUnmount, }: Data.TaggedEnum.GenericConstructor<AttributeDefinition>;
export { Prop, OnCustomEvent };
export declare const customElement: <Message>() => (tagName: string) => (attributes?: ReadonlyArray<Attribute<Message> | ChildAttribute>, children?: ReadonlyArray<Child>) => Html;
type ElementFunction<Message> = (attributes: ReadonlyArray<Attribute<Message> | ChildAttribute>, children?: ReadonlyArray<Child>) => Html;
type VoidElementFunction<Message> = (attributes: ReadonlyArray<Attribute<Message> | ChildAttribute>) => Html;
/** An attribute accepted by textarea builders. Textarea content must use
 *  `h.Value`; innerHTML does not keep the live value tracking the Model after
 *  the field is dirty. */
export type TextareaAttribute<Message> = Exclude<Attribute<Message>, Readonly<{
    _tag: 'InnerHTML';
}>>;
type TextValueElementFunction<Message> = (attributes: ReadonlyArray<TextareaAttribute<Message> | ChildAttribute>) => Html;
type KeyedElementFunction<Message> = (key: PropertyKey, attributes?: ReadonlyArray<Attribute<Message> | ChildAttribute>, children?: ReadonlyArray<Child>) => Html;
type KeyedTextValueElementFunction<Message> = (key: PropertyKey, attributes?: ReadonlyArray<TextareaAttribute<Message> | ChildAttribute>) => Html;
type KeyedFunction<Message> = <Name extends TagName>(tagName: Name) => Name extends 'textarea' ? KeyedTextValueElementFunction<Message> : KeyedElementFunction<Message>;
type HtmlElements<Message> = {
    a: ElementFunction<Message>;
    abbr: ElementFunction<Message>;
    address: ElementFunction<Message>;
    area: VoidElementFunction<Message>;
    article: ElementFunction<Message>;
    aside: ElementFunction<Message>;
    audio: ElementFunction<Message>;
    b: ElementFunction<Message>;
    base: VoidElementFunction<Message>;
    bdi: ElementFunction<Message>;
    bdo: ElementFunction<Message>;
    blockquote: ElementFunction<Message>;
    body: ElementFunction<Message>;
    br: VoidElementFunction<Message>;
    button: ElementFunction<Message>;
    canvas: ElementFunction<Message>;
    caption: ElementFunction<Message>;
    cite: ElementFunction<Message>;
    code: ElementFunction<Message>;
    col: VoidElementFunction<Message>;
    colgroup: ElementFunction<Message>;
    data: ElementFunction<Message>;
    datalist: ElementFunction<Message>;
    dd: ElementFunction<Message>;
    del: ElementFunction<Message>;
    details: ElementFunction<Message>;
    dfn: ElementFunction<Message>;
    dialog: ElementFunction<Message>;
    div: ElementFunction<Message>;
    dl: ElementFunction<Message>;
    dt: ElementFunction<Message>;
    em: ElementFunction<Message>;
    embed: VoidElementFunction<Message>;
    fieldset: ElementFunction<Message>;
    figcaption: ElementFunction<Message>;
    figure: ElementFunction<Message>;
    footer: ElementFunction<Message>;
    form: ElementFunction<Message>;
    h1: ElementFunction<Message>;
    h2: ElementFunction<Message>;
    h3: ElementFunction<Message>;
    h4: ElementFunction<Message>;
    h5: ElementFunction<Message>;
    h6: ElementFunction<Message>;
    head: ElementFunction<Message>;
    header: ElementFunction<Message>;
    hgroup: ElementFunction<Message>;
    hr: VoidElementFunction<Message>;
    html: ElementFunction<Message>;
    i: ElementFunction<Message>;
    iframe: ElementFunction<Message>;
    img: VoidElementFunction<Message>;
    input: VoidElementFunction<Message>;
    ins: ElementFunction<Message>;
    kbd: ElementFunction<Message>;
    label: ElementFunction<Message>;
    legend: ElementFunction<Message>;
    li: ElementFunction<Message>;
    link: VoidElementFunction<Message>;
    main: ElementFunction<Message>;
    map: ElementFunction<Message>;
    mark: ElementFunction<Message>;
    menu: ElementFunction<Message>;
    meta: VoidElementFunction<Message>;
    meter: ElementFunction<Message>;
    nav: ElementFunction<Message>;
    noscript: ElementFunction<Message>;
    object: ElementFunction<Message>;
    ol: ElementFunction<Message>;
    optgroup: ElementFunction<Message>;
    option: ElementFunction<Message>;
    output: ElementFunction<Message>;
    p: ElementFunction<Message>;
    picture: ElementFunction<Message>;
    portal: ElementFunction<Message>;
    pre: ElementFunction<Message>;
    progress: ElementFunction<Message>;
    q: ElementFunction<Message>;
    rp: ElementFunction<Message>;
    rt: ElementFunction<Message>;
    ruby: ElementFunction<Message>;
    s: ElementFunction<Message>;
    samp: ElementFunction<Message>;
    script: ElementFunction<Message>;
    search: ElementFunction<Message>;
    section: ElementFunction<Message>;
    select: ElementFunction<Message>;
    slot: ElementFunction<Message>;
    small: ElementFunction<Message>;
    source: VoidElementFunction<Message>;
    span: ElementFunction<Message>;
    strong: ElementFunction<Message>;
    style: ElementFunction<Message>;
    sub: ElementFunction<Message>;
    summary: ElementFunction<Message>;
    sup: ElementFunction<Message>;
    table: ElementFunction<Message>;
    tbody: ElementFunction<Message>;
    td: ElementFunction<Message>;
    template: ElementFunction<Message>;
    textarea: TextValueElementFunction<Message>;
    tfoot: ElementFunction<Message>;
    th: ElementFunction<Message>;
    thead: ElementFunction<Message>;
    time: ElementFunction<Message>;
    title: ElementFunction<Message>;
    tr: ElementFunction<Message>;
    track: VoidElementFunction<Message>;
    u: ElementFunction<Message>;
    ul: ElementFunction<Message>;
    var: ElementFunction<Message>;
    video: ElementFunction<Message>;
    wbr: VoidElementFunction<Message>;
    svg: ElementFunction<Message>;
    animate: ElementFunction<Message>;
    animateMotion: ElementFunction<Message>;
    animateTransform: ElementFunction<Message>;
    circle: ElementFunction<Message>;
    clipPath: ElementFunction<Message>;
    defs: ElementFunction<Message>;
    desc: ElementFunction<Message>;
    ellipse: ElementFunction<Message>;
    feBlend: ElementFunction<Message>;
    feColorMatrix: ElementFunction<Message>;
    feComponentTransfer: ElementFunction<Message>;
    feComposite: ElementFunction<Message>;
    feConvolveMatrix: ElementFunction<Message>;
    feDiffuseLighting: ElementFunction<Message>;
    feDisplacementMap: ElementFunction<Message>;
    feDistantLight: ElementFunction<Message>;
    feDropShadow: ElementFunction<Message>;
    feFlood: ElementFunction<Message>;
    feFuncA: ElementFunction<Message>;
    feFuncB: ElementFunction<Message>;
    feFuncG: ElementFunction<Message>;
    feFuncR: ElementFunction<Message>;
    feGaussianBlur: ElementFunction<Message>;
    feImage: ElementFunction<Message>;
    feMerge: ElementFunction<Message>;
    feMergeNode: ElementFunction<Message>;
    feMorphology: ElementFunction<Message>;
    feOffset: ElementFunction<Message>;
    fePointLight: ElementFunction<Message>;
    feSpecularLighting: ElementFunction<Message>;
    feSpotLight: ElementFunction<Message>;
    feTile: ElementFunction<Message>;
    feTurbulence: ElementFunction<Message>;
    filter: ElementFunction<Message>;
    foreignObject: ElementFunction<Message>;
    g: ElementFunction<Message>;
    image: ElementFunction<Message>;
    line: ElementFunction<Message>;
    linearGradient: ElementFunction<Message>;
    marker: ElementFunction<Message>;
    mask: ElementFunction<Message>;
    metadata: ElementFunction<Message>;
    mpath: ElementFunction<Message>;
    path: ElementFunction<Message>;
    pattern: ElementFunction<Message>;
    polygon: ElementFunction<Message>;
    polyline: ElementFunction<Message>;
    radialGradient: ElementFunction<Message>;
    rect: ElementFunction<Message>;
    set: ElementFunction<Message>;
    stop: ElementFunction<Message>;
    switch: ElementFunction<Message>;
    symbol: ElementFunction<Message>;
    text: ElementFunction<Message>;
    textPath: ElementFunction<Message>;
    tspan: ElementFunction<Message>;
    use: ElementFunction<Message>;
    view: ElementFunction<Message>;
    math: ElementFunction<Message>;
    annotation: ElementFunction<Message>;
    'annotation-xml': ElementFunction<Message>;
    maction: ElementFunction<Message>;
    menclose: ElementFunction<Message>;
    merror: ElementFunction<Message>;
    mfenced: ElementFunction<Message>;
    mfrac: ElementFunction<Message>;
    mglyph: ElementFunction<Message>;
    mi: ElementFunction<Message>;
    mlabeledtr: ElementFunction<Message>;
    mlongdiv: ElementFunction<Message>;
    mmultiscripts: ElementFunction<Message>;
    mn: ElementFunction<Message>;
    mo: ElementFunction<Message>;
    mover: ElementFunction<Message>;
    mpadded: ElementFunction<Message>;
    mphantom: ElementFunction<Message>;
    mprescripts: ElementFunction<Message>;
    mroot: ElementFunction<Message>;
    mrow: ElementFunction<Message>;
    ms: ElementFunction<Message>;
    mscarries: ElementFunction<Message>;
    mscarry: ElementFunction<Message>;
    msgroup: ElementFunction<Message>;
    msline: ElementFunction<Message>;
    mspace: ElementFunction<Message>;
    msqrt: ElementFunction<Message>;
    msrow: ElementFunction<Message>;
    mstack: ElementFunction<Message>;
    mstyle: ElementFunction<Message>;
    msub: ElementFunction<Message>;
    msubsup: ElementFunction<Message>;
    msup: ElementFunction<Message>;
    mtable: ElementFunction<Message>;
    mtd: ElementFunction<Message>;
    mtext: ElementFunction<Message>;
    mtr: ElementFunction<Message>;
    munder: ElementFunction<Message>;
    munderover: ElementFunction<Message>;
    semantics: ElementFunction<Message>;
};
type HtmlAttributes<Message> = {
    Key: (value: string) => {
        readonly _tag: 'Key';
        readonly value: string;
    };
    Class: (value: string) => {
        readonly _tag: 'Class';
        readonly value: string;
    };
    Id: (value: string) => {
        readonly _tag: 'Id';
        readonly value: string;
    };
    Title: (value: string) => {
        readonly _tag: 'Title';
        readonly value: string;
    };
    Lang: (value: string) => {
        readonly _tag: 'Lang';
        readonly value: string;
    };
    Dir: (value: string) => {
        readonly _tag: 'Dir';
        readonly value: string;
    };
    Tabindex: (value: number) => {
        readonly _tag: 'Tabindex';
        readonly value: number;
    };
    Hidden: (value: boolean) => {
        readonly _tag: 'Hidden';
        readonly value: boolean;
    };
    Contenteditable: (value: string) => {
        readonly _tag: 'Contenteditable';
        readonly value: string;
    };
    Draggable: (value: boolean) => {
        readonly _tag: 'Draggable';
        readonly value: boolean;
    };
    Accesskey: (value: string) => {
        readonly _tag: 'Accesskey';
        readonly value: string;
    };
    Translate: (value: string) => {
        readonly _tag: 'Translate';
        readonly value: string;
    };
    Inert: (value: boolean) => {
        readonly _tag: 'Inert';
        readonly value: boolean;
    };
    Popover: (value: string) => {
        readonly _tag: 'Popover';
        readonly value: string;
    };
    Popovertarget: (value: string) => {
        readonly _tag: 'Popovertarget';
        readonly value: string;
    };
    Popovertargetaction: (value: string) => {
        readonly _tag: 'Popovertargetaction';
        readonly value: string;
    };
    /** Dispatches `message` when the element is clicked. The optional controls
     *  can synchronously prevent the browser default, stop DOM propagation, and
     *  focus an existing element before dispatch. Omitted controls preserve the
     *  existing allow-and-bubble behavior.
     *
     *  `propagation: 'Stop'` still lets every click handler registered on the
     *  current element run, matching `Event.stopPropagation()`. It only prevents
     *  ancestor handlers from receiving the click.
     *
     *  `focusSelector` is for browser APIs that require focus during the
     *  originating user gesture, such as opening the iOS on-screen keyboard. The
     *  target must already exist. If the real input mounts after the Message
     *  changes the view, focus an always-present warmup input here, then return a
     *  `Dom.focus` Command from update to transfer focus after the real input
     *  mounts.
     *
     *  @example
     *  ```typescript
     *  h.OnClick(Message.ClickedExpand(), {
     *    defaultAction: 'Prevent',
     *    propagation: 'Stop',
     *  })
     *  ``` */
    OnClick: (message: Message, options?: ClickOptions) => {
        readonly _tag: 'OnClick';
        readonly message: Message;
        readonly options?: ClickOptions;
    };
    OnDoubleClick: (message: Message) => {
        readonly _tag: 'OnDoubleClick';
        readonly message: Message;
    };
    OnMouseDown: (message: Message) => {
        readonly _tag: 'OnMouseDown';
        readonly message: Message;
    };
    OnMouseUp: (message: Message) => {
        readonly _tag: 'OnMouseUp';
        readonly message: Message;
    };
    OnMouseEnter: (message: Message) => {
        readonly _tag: 'OnMouseEnter';
        readonly message: Message;
    };
    OnMouseLeave: (message: Message) => {
        readonly _tag: 'OnMouseLeave';
        readonly message: Message;
    };
    OnMouseOver: (message: Message) => {
        readonly _tag: 'OnMouseOver';
        readonly message: Message;
    };
    OnMouseOut: (message: Message) => {
        readonly _tag: 'OnMouseOut';
        readonly message: Message;
    };
    OnMouseMove: (message: Message) => {
        readonly _tag: 'OnMouseMove';
        readonly message: Message;
    };
    OnPointerMove: (toMaybeMessage: (screenX: number, screenY: number, pointerType: string) => Option.Option<Message>) => {
        readonly _tag: 'OnPointerMove';
        readonly f: (screenX: number, screenY: number, pointerType: string) => Option.Option<Message>;
    };
    OnPointerLeave: (toMaybeMessage: (pointerType: string) => Option.Option<Message>) => {
        readonly _tag: 'OnPointerLeave';
        readonly f: (pointerType: string) => Option.Option<Message>;
    };
    /** Dispatches an optional Message on pointerdown. The final callback
     *  arguments identify the pointer and its originating target, so a parent
     *  gesture handler can distinguish touches and ignore nested controls. */
    OnPointerDown: (toMaybeMessage: (pointerType: string, button: number, screenX: number, screenY: number, timeStamp: number, clientX: number, clientY: number, pointerId: number, target: EventTarget | null) => Option.Option<Message>) => {
        readonly _tag: 'OnPointerDown';
        readonly f: (pointerType: string, button: number, screenX: number, screenY: number, timeStamp: number, clientX: number, clientY: number, pointerId: number, target: EventTarget | null) => Option.Option<Message>;
    };
    OnPointerUp: (toMaybeMessage: (screenX: number, screenY: number, pointerType: string, timeStamp: number) => Option.Option<Message>) => {
        readonly _tag: 'OnPointerUp';
        readonly f: (screenX: number, screenY: number, pointerType: string, timeStamp: number) => Option.Option<Message>;
    };
    OnKeyDown: (toMessage: (key: string, modifiers: KeyboardModifiers) => Message) => {
        readonly _tag: 'OnKeyDown';
        readonly f: (key: string, modifiers: KeyboardModifiers) => Message;
    };
    OnKeyDownFocus: (toMaybeFocusAndMessage: (key: string, modifiers: KeyboardModifiers) => Option.Option<Readonly<{
        focusSelector: string;
        message: Message;
    }>>) => {
        readonly _tag: 'OnKeyDownFocus';
        readonly f: (key: string, modifiers: KeyboardModifiers) => Option.Option<Readonly<{
            focusSelector: string;
            message: Message;
        }>>;
    };
    OnKeyDownPreventDefault: (toMaybeMessage: (key: string, modifiers: KeyboardModifiers) => Option.Option<Message>) => {
        readonly _tag: 'OnKeyDownPreventDefault';
        readonly f: (key: string, modifiers: KeyboardModifiers) => Option.Option<Message>;
    };
    OnKeyDownSelf: (toMessage: (key: string, modifiers: KeyboardModifiers) => Message) => {
        readonly _tag: 'OnKeyDownSelf';
        readonly f: (key: string, modifiers: KeyboardModifiers) => Message;
    };
    OnKeyDownSelfPreventDefault: (toMaybeMessage: (key: string, modifiers: KeyboardModifiers) => Option.Option<Message>) => {
        readonly _tag: 'OnKeyDownSelfPreventDefault';
        readonly f: (key: string, modifiers: KeyboardModifiers) => Option.Option<Message>;
    };
    OnKeyUp: (toMessage: (key: string, modifiers: KeyboardModifiers) => Message) => {
        readonly _tag: 'OnKeyUp';
        readonly f: (key: string, modifiers: KeyboardModifiers) => Message;
    };
    OnKeyUpPreventDefault: (toMaybeMessage: (key: string, modifiers: KeyboardModifiers) => Option.Option<Message>) => {
        readonly _tag: 'OnKeyUpPreventDefault';
        readonly f: (key: string, modifiers: KeyboardModifiers) => Option.Option<Message>;
    };
    OnKeyPress: (toMessage: (key: string, modifiers: KeyboardModifiers) => Message) => {
        readonly _tag: 'OnKeyPress';
        readonly f: (key: string, modifiers: KeyboardModifiers) => Message;
    };
    OnFocus: (message: Message) => {
        readonly _tag: 'OnFocus';
        readonly message: Message;
    };
    OnBlur: (message: Message) => {
        readonly _tag: 'OnBlur';
        readonly message: Message;
    };
    /**
     * Dispatches `message` when focus enters this element's subtree from
     * outside it. Moving focus between descendants does not dispatch.
     *
     * This uses the bubbling `focusin` event, so the element itself does not
     * need to be focusable. Pair it with {@link OnFocusLeave} to model whether
     * a compound region such as an editor and its toolbar contains focus.
     */
    OnFocusEnter: (message: Message) => {
        readonly _tag: 'OnFocusEnter';
        readonly message: Message;
    };
    /**
     * Dispatches `message` when focus leaves this element's subtree. Moving
     * focus between descendants does not dispatch.
     *
     * This uses the bubbling `focusout` event and compares its related target
     * with the current element. The element itself does not need to be
     * focusable. Pair it with {@link OnFocusEnter} to model whether a compound
     * region such as an editor and its toolbar contains focus.
     */
    OnFocusLeave: (message: Message) => {
        readonly _tag: 'OnFocusLeave';
        readonly message: Message;
    };
    OnInput: (toMessage: (value: string) => Message) => {
        readonly _tag: 'OnInput';
        readonly f: (value: string) => Message;
    };
    OnChange: (toMessage: (value: string) => Message) => {
        readonly _tag: 'OnChange';
        readonly f: (value: string) => Message;
    };
    OnBeforeInput: (toMessage: (inputType: string, data: Option.Option<string>) => Message) => {
        readonly _tag: 'OnBeforeInput';
        readonly f: (inputType: string, data: Option.Option<string>) => Message;
    };
    OnBeforeInputPreventDefault: (toMaybeMessage: (inputType: string, data: Option.Option<string>) => Option.Option<Message>) => {
        readonly _tag: 'OnBeforeInputPreventDefault';
        readonly f: (inputType: string, data: Option.Option<string>) => Option.Option<Message>;
    };
    OnFileChange: (toMessage: (files: ReadonlyArray<File>) => Message) => {
        readonly _tag: 'OnFileChange';
        readonly f: (files: ReadonlyArray<File>) => Message;
    };
    OnSubmit: (message: Message) => {
        readonly _tag: 'OnSubmit';
        readonly message: Message;
    };
    OnReset: (message: Message) => {
        readonly _tag: 'OnReset';
        readonly message: Message;
    };
    OnScroll: (toMessage: (scrollTop: number) => Message) => {
        readonly _tag: 'OnScroll';
        readonly f: (scrollTop: number) => Message;
    };
    OnWheel: (message: Message) => {
        readonly _tag: 'OnWheel';
        readonly message: Message;
    };
    OnCopy: (message: Message) => {
        readonly _tag: 'OnCopy';
        readonly message: Message;
    };
    OnCut: (message: Message) => {
        readonly _tag: 'OnCut';
        readonly message: Message;
    };
    OnPaste: (message: Message) => {
        readonly _tag: 'OnPaste';
        readonly message: Message;
    };
    OnPastePreventDefault: (toMaybeMessage: (text: string) => Option.Option<Message>) => {
        readonly _tag: 'OnPastePreventDefault';
        readonly f: (text: string) => Option.Option<Message>;
    };
    OnCopyText: (text: string) => {
        readonly _tag: 'OnCopyText';
        readonly text: string;
    };
    OnCutText: (text: string, message: Message) => {
        readonly _tag: 'OnCutText';
        readonly text: string;
        readonly message: Message;
    };
    OnCancel: (message: Message) => {
        readonly _tag: 'OnCancel';
        readonly message: Message;
    };
    /** Prevents the default action of a `cancel` event. When a
     *  `customEventMessage` is provided, dispatches it only for a `CustomEvent`,
     *  allowing a synthetic cancel signal to be distinguished from the native
     *  event. Native `cancel` events never dispatch a Message. */
    OnCancelPreventDefault: (customEventMessage?: Message) => {
        readonly _tag: 'OnCancelPreventDefault';
        readonly maybeCustomEventMessage: Option.Option<Message>;
    };
    OnToggle: (toMessage: (isOpen: boolean) => Message) => {
        readonly _tag: 'OnToggle';
        readonly f: (isOpen: boolean) => Message;
    };
    OnContextMenu: (message: Message) => {
        readonly _tag: 'OnContextMenu';
        readonly message: Message;
    };
    OnDragStart: (message: Message) => {
        readonly _tag: 'OnDragStart';
        readonly message: Message;
    };
    OnDrag: (message: Message) => {
        readonly _tag: 'OnDrag';
        readonly message: Message;
    };
    OnDragEnd: (message: Message) => {
        readonly _tag: 'OnDragEnd';
        readonly message: Message;
    };
    OnDragEnter: (message: Message) => {
        readonly _tag: 'OnDragEnter';
        readonly message: Message;
    };
    OnDragLeave: (message: Message) => {
        readonly _tag: 'OnDragLeave';
        readonly message: Message;
    };
    OnDragOver: (message: Message) => {
        readonly _tag: 'OnDragOver';
        readonly message: Message;
    };
    AllowDrop: () => {
        readonly _tag: 'AllowDrop';
    };
    OnDrop: (message: Message) => {
        readonly _tag: 'OnDrop';
        readonly message: Message;
    };
    OnDropFiles: (toMessage: (files: ReadonlyArray<File>) => Message) => {
        readonly _tag: 'OnDropFiles';
        readonly f: (files: ReadonlyArray<File>) => Message;
    };
    OnTouchStart: (message: Message) => {
        readonly _tag: 'OnTouchStart';
        readonly message: Message;
    };
    OnTouchEnd: (message: Message) => {
        readonly _tag: 'OnTouchEnd';
        readonly message: Message;
    };
    OnTouchMove: (message: Message) => {
        readonly _tag: 'OnTouchMove';
        readonly message: Message;
    };
    OnTouchCancel: (message: Message) => {
        readonly _tag: 'OnTouchCancel';
        readonly message: Message;
    };
    OnAnimationStart: (message: Message) => {
        readonly _tag: 'OnAnimationStart';
        readonly message: Message;
    };
    OnAnimationEnd: (message: Message) => {
        readonly _tag: 'OnAnimationEnd';
        readonly message: Message;
    };
    OnAnimationIteration: (message: Message) => {
        readonly _tag: 'OnAnimationIteration';
        readonly message: Message;
    };
    OnTransitionEnd: (message: Message) => {
        readonly _tag: 'OnTransitionEnd';
        readonly message: Message;
    };
    OnLoad: (message: Message) => {
        readonly _tag: 'OnLoad';
        readonly message: Message;
    };
    OnError: (message: Message) => {
        readonly _tag: 'OnError';
        readonly message: Message;
    };
    OnPlay: (message: Message) => {
        readonly _tag: 'OnPlay';
        readonly message: Message;
    };
    OnPause: (message: Message) => {
        readonly _tag: 'OnPause';
        readonly message: Message;
    };
    OnEnded: (message: Message) => {
        readonly _tag: 'OnEnded';
        readonly message: Message;
    };
    OnTimeUpdate: (message: Message) => {
        readonly _tag: 'OnTimeUpdate';
        readonly message: Message;
    };
    OnVolumeChange: (message: Message) => {
        readonly _tag: 'OnVolumeChange';
        readonly message: Message;
    };
    OnSelect: (message: Message) => {
        readonly _tag: 'OnSelect';
        readonly message: Message;
    };
    Value: (value: string) => {
        readonly _tag: 'Value';
        readonly value: string;
    };
    Checked: (value: boolean) => {
        readonly _tag: 'Checked';
        readonly value: boolean;
    };
    Selected: (value: boolean) => {
        readonly _tag: 'Selected';
        readonly value: boolean;
    };
    Open: (value: boolean) => {
        readonly _tag: 'Open';
        readonly value: boolean;
    };
    Placeholder: (value: string) => {
        readonly _tag: 'Placeholder';
        readonly value: string;
    };
    Name: (value: string) => {
        readonly _tag: 'Name';
        readonly value: string;
    };
    Disabled: (value: boolean) => {
        readonly _tag: 'Disabled';
        readonly value: boolean;
    };
    Readonly: (value: boolean) => {
        readonly _tag: 'Readonly';
        readonly value: boolean;
    };
    Required: (value: boolean) => {
        readonly _tag: 'Required';
        readonly value: boolean;
    };
    Autofocus: (value: boolean) => {
        readonly _tag: 'Autofocus';
        readonly value: boolean;
    };
    Spellcheck: (value: boolean) => {
        readonly _tag: 'Spellcheck';
        readonly value: boolean;
    };
    Autocorrect: (value: string) => {
        readonly _tag: 'Autocorrect';
        readonly value: string;
    };
    Autocapitalize: (value: string) => {
        readonly _tag: 'Autocapitalize';
        readonly value: string;
    };
    InputMode: (value: string) => {
        readonly _tag: 'InputMode';
        readonly value: string;
    };
    EnterKeyHint: (value: string) => {
        readonly _tag: 'EnterKeyHint';
        readonly value: string;
    };
    Multiple: (value: boolean) => {
        readonly _tag: 'Multiple';
        readonly value: boolean;
    };
    Type: (value: string) => {
        readonly _tag: 'Type';
        readonly value: string;
    };
    Accept: (value: string) => {
        readonly _tag: 'Accept';
        readonly value: string;
    };
    Autocomplete: (value: string) => {
        readonly _tag: 'Autocomplete';
        readonly value: string;
    };
    Pattern: (value: string) => {
        readonly _tag: 'Pattern';
        readonly value: string;
    };
    Maxlength: (value: number) => {
        readonly _tag: 'Maxlength';
        readonly value: number;
    };
    Minlength: (value: number) => {
        readonly _tag: 'Minlength';
        readonly value: number;
    };
    Size: (value: number) => {
        readonly _tag: 'Size';
        readonly value: number;
    };
    Cols: (value: number) => {
        readonly _tag: 'Cols';
        readonly value: number;
    };
    Rows: (value: number) => {
        readonly _tag: 'Rows';
        readonly value: number;
    };
    Max: (value: string) => {
        readonly _tag: 'Max';
        readonly value: string;
    };
    Min: (value: string) => {
        readonly _tag: 'Min';
        readonly value: string;
    };
    Step: (value: string) => {
        readonly _tag: 'Step';
        readonly value: string;
    };
    For: (value: string) => {
        readonly _tag: 'For';
        readonly value: string;
    };
    Href: (value: string) => {
        readonly _tag: 'Href';
        readonly value: string;
    };
    Src: (value: string) => {
        readonly _tag: 'Src';
        readonly value: string;
    };
    Alt: (value: string) => {
        readonly _tag: 'Alt';
        readonly value: string;
    };
    Target: (value: string) => {
        readonly _tag: 'Target';
        readonly value: string;
    };
    Rel: (value: string) => {
        readonly _tag: 'Rel';
        readonly value: string;
    };
    Download: (value: string) => {
        readonly _tag: 'Download';
        readonly value: string;
    };
    Action: (value: string) => {
        readonly _tag: 'Action';
        readonly value: string;
    };
    Method: (value: string) => {
        readonly _tag: 'Method';
        readonly value: string;
    };
    Enctype: (value: string) => {
        readonly _tag: 'Enctype';
        readonly value: string;
    };
    Novalidate: (value: boolean) => {
        readonly _tag: 'Novalidate';
        readonly value: boolean;
    };
    Formaction: (value: string) => {
        readonly _tag: 'Formaction';
        readonly value: string;
    };
    Formmethod: (value: string) => {
        readonly _tag: 'Formmethod';
        readonly value: string;
    };
    Formnovalidate: (value: boolean) => {
        readonly _tag: 'Formnovalidate';
        readonly value: boolean;
    };
    Formtarget: (value: string) => {
        readonly _tag: 'Formtarget';
        readonly value: string;
    };
    Formenctype: (value: string) => {
        readonly _tag: 'Formenctype';
        readonly value: string;
    };
    Colspan: (value: number) => {
        readonly _tag: 'Colspan';
        readonly value: number;
    };
    Rowspan: (value: number) => {
        readonly _tag: 'Rowspan';
        readonly value: number;
    };
    Scope: (value: string) => {
        readonly _tag: 'Scope';
        readonly value: string;
    };
    Headers: (value: string) => {
        readonly _tag: 'Headers';
        readonly value: string;
    };
    Span: (value: number) => {
        readonly _tag: 'Span';
        readonly value: number;
    };
    Start: (value: number) => {
        readonly _tag: 'Start';
        readonly value: number;
    };
    Reversed: (value: boolean) => {
        readonly _tag: 'Reversed';
        readonly value: boolean;
    };
    CiteAttr: (value: string) => {
        readonly _tag: 'CiteAttr';
        readonly value: string;
    };
    Datetime: (value: string) => {
        readonly _tag: 'Datetime';
        readonly value: string;
    };
    Wrap: (value: string) => {
        readonly _tag: 'Wrap';
        readonly value: string;
    };
    List: (value: string) => {
        readonly _tag: 'List';
        readonly value: string;
    };
    FormAttr: (value: string) => {
        readonly _tag: 'FormAttr';
        readonly value: string;
    };
    LabelAttr: (value: string) => {
        readonly _tag: 'LabelAttr';
        readonly value: string;
    };
    ContentAttr: (value: string) => {
        readonly _tag: 'ContentAttr';
        readonly value: string;
    };
    Charset: (value: string) => {
        readonly _tag: 'Charset';
        readonly value: string;
    };
    HttpEquiv: (value: string) => {
        readonly _tag: 'HttpEquiv';
        readonly value: string;
    };
    Srcset: (value: string) => {
        readonly _tag: 'Srcset';
        readonly value: string;
    };
    Sizes: (value: string) => {
        readonly _tag: 'Sizes';
        readonly value: string;
    };
    Loading: (value: string) => {
        readonly _tag: 'Loading';
        readonly value: string;
    };
    Decoding: (value: string) => {
        readonly _tag: 'Decoding';
        readonly value: string;
    };
    Fetchpriority: (value: string) => {
        readonly _tag: 'Fetchpriority';
        readonly value: string;
    };
    Crossorigin: (value: string) => {
        readonly _tag: 'Crossorigin';
        readonly value: string;
    };
    Referrerpolicy: (value: string) => {
        readonly _tag: 'Referrerpolicy';
        readonly value: string;
    };
    Integrity: (value: string) => {
        readonly _tag: 'Integrity';
        readonly value: string;
    };
    Hreflang: (value: string) => {
        readonly _tag: 'Hreflang';
        readonly value: string;
    };
    Ping: (value: string) => {
        readonly _tag: 'Ping';
        readonly value: string;
    };
    Sandbox: (value: string) => {
        readonly _tag: 'Sandbox';
        readonly value: string;
    };
    Allow: (value: string) => {
        readonly _tag: 'Allow';
        readonly value: string;
    };
    Srcdoc: (value: string) => {
        readonly _tag: 'Srcdoc';
        readonly value: string;
    };
    Autoplay: (value: boolean) => {
        readonly _tag: 'Autoplay';
        readonly value: boolean;
    };
    Controls: (value: boolean) => {
        readonly _tag: 'Controls';
        readonly value: boolean;
    };
    Loop: (value: boolean) => {
        readonly _tag: 'Loop';
        readonly value: boolean;
    };
    Muted: (value: boolean) => {
        readonly _tag: 'Muted';
        readonly value: boolean;
    };
    Poster: (value: string) => {
        readonly _tag: 'Poster';
        readonly value: string;
    };
    Preload: (value: string) => {
        readonly _tag: 'Preload';
        readonly value: string;
    };
    Playsinline: (value: boolean) => {
        readonly _tag: 'Playsinline';
        readonly value: boolean;
    };
    High: (value: number) => {
        readonly _tag: 'High';
        readonly value: number;
    };
    Low: (value: number) => {
        readonly _tag: 'Low';
        readonly value: number;
    };
    Optimum: (value: number) => {
        readonly _tag: 'Optimum';
        readonly value: number;
    };
    Usemap: (value: string) => {
        readonly _tag: 'Usemap';
        readonly value: string;
    };
    Ismap: (value: boolean) => {
        readonly _tag: 'Ismap';
        readonly value: boolean;
    };
    Role: (value: string) => {
        readonly _tag: 'Role';
        readonly value: string;
    };
    AriaLabel: (value: string) => {
        readonly _tag: 'AriaLabel';
        readonly value: string;
    };
    AriaLabelledBy: (value: string) => {
        readonly _tag: 'AriaLabelledBy';
        readonly value: string;
    };
    AriaDescribedBy: (value: string) => {
        readonly _tag: 'AriaDescribedBy';
        readonly value: string;
    };
    AriaHidden: (value: boolean) => {
        readonly _tag: 'AriaHidden';
        readonly value: boolean;
    };
    AriaExpanded: (value: boolean) => {
        readonly _tag: 'AriaExpanded';
        readonly value: boolean;
    };
    AriaSelected: (value: boolean) => {
        readonly _tag: 'AriaSelected';
        readonly value: boolean;
    };
    AriaChecked: (value: boolean | 'mixed') => {
        readonly _tag: 'AriaChecked';
        readonly value: boolean | 'mixed';
    };
    AriaDisabled: (value: boolean) => {
        readonly _tag: 'AriaDisabled';
        readonly value: boolean;
    };
    AriaRequired: (value: boolean) => {
        readonly _tag: 'AriaRequired';
        readonly value: boolean;
    };
    AriaInvalid: (value: boolean) => {
        readonly _tag: 'AriaInvalid';
        readonly value: boolean;
    };
    AriaLive: (value: string) => {
        readonly _tag: 'AriaLive';
        readonly value: string;
    };
    AriaControls: (value: string) => {
        readonly _tag: 'AriaControls';
        readonly value: string;
    };
    AriaCurrent: (value: string) => {
        readonly _tag: 'AriaCurrent';
        readonly value: string;
    };
    AriaOrientation: (value: string) => {
        readonly _tag: 'AriaOrientation';
        readonly value: string;
    };
    AriaPressed: (value: string) => {
        readonly _tag: 'AriaPressed';
        readonly value: string;
    };
    AriaHasPopup: (value: string) => {
        readonly _tag: 'AriaHasPopup';
        readonly value: string;
    };
    AriaActiveDescendant: (value: string) => {
        readonly _tag: 'AriaActiveDescendant';
        readonly value: string;
    };
    AriaSort: (value: string) => {
        readonly _tag: 'AriaSort';
        readonly value: string;
    };
    AriaMultiSelectable: (value: boolean) => {
        readonly _tag: 'AriaMultiSelectable';
        readonly value: boolean;
    };
    AriaModal: (value: boolean) => {
        readonly _tag: 'AriaModal';
        readonly value: boolean;
    };
    AriaBusy: (value: boolean) => {
        readonly _tag: 'AriaBusy';
        readonly value: boolean;
    };
    AriaErrorMessage: (value: string) => {
        readonly _tag: 'AriaErrorMessage';
        readonly value: string;
    };
    AriaRoleDescription: (value: string) => {
        readonly _tag: 'AriaRoleDescription';
        readonly value: string;
    };
    AriaAtomic: (value: boolean) => {
        readonly _tag: 'AriaAtomic';
        readonly value: boolean;
    };
    AriaAutocomplete: (value: string) => {
        readonly _tag: 'AriaAutocomplete';
        readonly value: string;
    };
    AriaColcount: (value: number) => {
        readonly _tag: 'AriaColcount';
        readonly value: number;
    };
    AriaColindex: (value: number) => {
        readonly _tag: 'AriaColindex';
        readonly value: number;
    };
    AriaColspan: (value: number) => {
        readonly _tag: 'AriaColspan';
        readonly value: number;
    };
    AriaDescription: (value: string) => {
        readonly _tag: 'AriaDescription';
        readonly value: string;
    };
    AriaDetails: (value: string) => {
        readonly _tag: 'AriaDetails';
        readonly value: string;
    };
    AriaFlowto: (value: string) => {
        readonly _tag: 'AriaFlowto';
        readonly value: string;
    };
    AriaKeyshortcuts: (value: string) => {
        readonly _tag: 'AriaKeyshortcuts';
        readonly value: string;
    };
    AriaLevel: (value: number) => {
        readonly _tag: 'AriaLevel';
        readonly value: number;
    };
    AriaOwns: (value: string) => {
        readonly _tag: 'AriaOwns';
        readonly value: string;
    };
    AriaPlaceholder: (value: string) => {
        readonly _tag: 'AriaPlaceholder';
        readonly value: string;
    };
    AriaPosinset: (value: number) => {
        readonly _tag: 'AriaPosinset';
        readonly value: number;
    };
    AriaReadonly: (value: boolean) => {
        readonly _tag: 'AriaReadonly';
        readonly value: boolean;
    };
    AriaRelevant: (value: string) => {
        readonly _tag: 'AriaRelevant';
        readonly value: string;
    };
    AriaRowcount: (value: number) => {
        readonly _tag: 'AriaRowcount';
        readonly value: number;
    };
    AriaRowindex: (value: number) => {
        readonly _tag: 'AriaRowindex';
        readonly value: number;
    };
    AriaRowspan: (value: number) => {
        readonly _tag: 'AriaRowspan';
        readonly value: number;
    };
    AriaSetsize: (value: number) => {
        readonly _tag: 'AriaSetsize';
        readonly value: number;
    };
    AriaValuemax: (value: number) => {
        readonly _tag: 'AriaValuemax';
        readonly value: number;
    };
    AriaValuemin: (value: number) => {
        readonly _tag: 'AriaValuemin';
        readonly value: number;
    };
    AriaValuenow: (value: number) => {
        readonly _tag: 'AriaValuenow';
        readonly value: number;
    };
    AriaValuetext: (value: string) => {
        readonly _tag: 'AriaValuetext';
        readonly value: string;
    };
    Attribute: (key: string, value: string) => {
        readonly _tag: 'Attribute';
        readonly key: string;
        readonly value: string;
    };
    DataAttribute: (key: string, value: string) => {
        readonly _tag: 'DataAttribute';
        readonly key: string;
        readonly value: string;
    };
    Style: (value: Record<string, string>) => {
        readonly _tag: 'Style';
        readonly value: Record<string, string>;
    };
    InnerHTML: (value: string) => {
        readonly _tag: 'InnerHTML';
        readonly value: string;
    };
    ViewBox: (value: string) => {
        readonly _tag: 'ViewBox';
        readonly value: string;
    };
    Xmlns: (value: string) => {
        readonly _tag: 'Xmlns';
        readonly value: string;
    };
    Fill: (value: string) => {
        readonly _tag: 'Fill';
        readonly value: string;
    };
    FillRule: (value: string) => {
        readonly _tag: 'FillRule';
        readonly value: string;
    };
    ClipRule: (value: string) => {
        readonly _tag: 'ClipRule';
        readonly value: string;
    };
    Stroke: (value: string) => {
        readonly _tag: 'Stroke';
        readonly value: string;
    };
    StrokeWidth: (value: string) => {
        readonly _tag: 'StrokeWidth';
        readonly value: string;
    };
    StrokeLinecap: (value: string) => {
        readonly _tag: 'StrokeLinecap';
        readonly value: string;
    };
    StrokeLinejoin: (value: string) => {
        readonly _tag: 'StrokeLinejoin';
        readonly value: string;
    };
    D: (value: string) => {
        readonly _tag: 'D';
        readonly value: string;
    };
    Cx: (value: string) => {
        readonly _tag: 'Cx';
        readonly value: string;
    };
    Cy: (value: string) => {
        readonly _tag: 'Cy';
        readonly value: string;
    };
    R: (value: string) => {
        readonly _tag: 'R';
        readonly value: string;
    };
    X: (value: string) => {
        readonly _tag: 'X';
        readonly value: string;
    };
    Y: (value: string) => {
        readonly _tag: 'Y';
        readonly value: string;
    };
    Width: (value: string) => {
        readonly _tag: 'Width';
        readonly value: string;
    };
    Height: (value: string) => {
        readonly _tag: 'Height';
        readonly value: string;
    };
    X1: (value: string) => {
        readonly _tag: 'X1';
        readonly value: string;
    };
    Y1: (value: string) => {
        readonly _tag: 'Y1';
        readonly value: string;
    };
    X2: (value: string) => {
        readonly _tag: 'X2';
        readonly value: string;
    };
    Y2: (value: string) => {
        readonly _tag: 'Y2';
        readonly value: string;
    };
    Points: (value: string) => {
        readonly _tag: 'Points';
        readonly value: string;
    };
    Transform: (value: string) => {
        readonly _tag: 'Transform';
        readonly value: string;
    };
    Opacity: (value: string) => {
        readonly _tag: 'Opacity';
        readonly value: string;
    };
    StrokeDasharray: (value: string) => {
        readonly _tag: 'StrokeDasharray';
        readonly value: string;
    };
    StrokeDashoffset: (value: string) => {
        readonly _tag: 'StrokeDashoffset';
        readonly value: string;
    };
    Dx: (value: string) => {
        readonly _tag: 'Dx';
        readonly value: string;
    };
    Dy: (value: string) => {
        readonly _tag: 'Dy';
        readonly value: string;
    };
    Rotate: (value: string) => {
        readonly _tag: 'Rotate';
        readonly value: string;
    };
    TextAnchor: (value: string) => {
        readonly _tag: 'TextAnchor';
        readonly value: string;
    };
    DominantBaseline: (value: string) => {
        readonly _tag: 'DominantBaseline';
        readonly value: string;
    };
    AlignmentBaseline: (value: string) => {
        readonly _tag: 'AlignmentBaseline';
        readonly value: string;
    };
    BaselineShift: (value: string) => {
        readonly _tag: 'BaselineShift';
        readonly value: string;
    };
    TextLength: (value: string) => {
        readonly _tag: 'TextLength';
        readonly value: string;
    };
    LengthAdjust: (value: string) => {
        readonly _tag: 'LengthAdjust';
        readonly value: string;
    };
    FontFamily: (value: string) => {
        readonly _tag: 'FontFamily';
        readonly value: string;
    };
    FontSize: (value: string) => {
        readonly _tag: 'FontSize';
        readonly value: string;
    };
    FontWeight: (value: string) => {
        readonly _tag: 'FontWeight';
        readonly value: string;
    };
    FontStyle: (value: string) => {
        readonly _tag: 'FontStyle';
        readonly value: string;
    };
    LetterSpacing: (value: string) => {
        readonly _tag: 'LetterSpacing';
        readonly value: string;
    };
    WordSpacing: (value: string) => {
        readonly _tag: 'WordSpacing';
        readonly value: string;
    };
    TextDecoration: (value: string) => {
        readonly _tag: 'TextDecoration';
        readonly value: string;
    };
    WritingMode: (value: string) => {
        readonly _tag: 'WritingMode';
        readonly value: string;
    };
    Rx: (value: string) => {
        readonly _tag: 'Rx';
        readonly value: string;
    };
    Ry: (value: string) => {
        readonly _tag: 'Ry';
        readonly value: string;
    };
    PathLength: (value: string) => {
        readonly _tag: 'PathLength';
        readonly value: string;
    };
    FillOpacity: (value: string) => {
        readonly _tag: 'FillOpacity';
        readonly value: string;
    };
    StrokeOpacity: (value: string) => {
        readonly _tag: 'StrokeOpacity';
        readonly value: string;
    };
    StrokeMiterlimit: (value: string) => {
        readonly _tag: 'StrokeMiterlimit';
        readonly value: string;
    };
    PaintOrder: (value: string) => {
        readonly _tag: 'PaintOrder';
        readonly value: string;
    };
    VectorEffect: (value: string) => {
        readonly _tag: 'VectorEffect';
        readonly value: string;
    };
    Color: (value: string) => {
        readonly _tag: 'Color';
        readonly value: string;
    };
    Visibility: (value: string) => {
        readonly _tag: 'Visibility';
        readonly value: string;
    };
    Display: (value: string) => {
        readonly _tag: 'Display';
        readonly value: string;
    };
    Overflow: (value: string) => {
        readonly _tag: 'Overflow';
        readonly value: string;
    };
    PointerEvents: (value: string) => {
        readonly _tag: 'PointerEvents';
        readonly value: string;
    };
    Cursor: (value: string) => {
        readonly _tag: 'Cursor';
        readonly value: string;
    };
    ShapeRendering: (value: string) => {
        readonly _tag: 'ShapeRendering';
        readonly value: string;
    };
    TextRendering: (value: string) => {
        readonly _tag: 'TextRendering';
        readonly value: string;
    };
    ImageRendering: (value: string) => {
        readonly _tag: 'ImageRendering';
        readonly value: string;
    };
    ClipPath: (value: string) => {
        readonly _tag: 'ClipPath';
        readonly value: string;
    };
    Mask: (value: string) => {
        readonly _tag: 'Mask';
        readonly value: string;
    };
    Filter: (value: string) => {
        readonly _tag: 'Filter';
        readonly value: string;
    };
    ClipPathUnits: (value: string) => {
        readonly _tag: 'ClipPathUnits';
        readonly value: string;
    };
    MaskUnits: (value: string) => {
        readonly _tag: 'MaskUnits';
        readonly value: string;
    };
    MaskContentUnits: (value: string) => {
        readonly _tag: 'MaskContentUnits';
        readonly value: string;
    };
    FilterUnits: (value: string) => {
        readonly _tag: 'FilterUnits';
        readonly value: string;
    };
    PrimitiveUnits: (value: string) => {
        readonly _tag: 'PrimitiveUnits';
        readonly value: string;
    };
    Offset: (value: string) => {
        readonly _tag: 'Offset';
        readonly value: string;
    };
    StopColor: (value: string) => {
        readonly _tag: 'StopColor';
        readonly value: string;
    };
    StopOpacity: (value: string) => {
        readonly _tag: 'StopOpacity';
        readonly value: string;
    };
    GradientUnits: (value: string) => {
        readonly _tag: 'GradientUnits';
        readonly value: string;
    };
    GradientTransform: (value: string) => {
        readonly _tag: 'GradientTransform';
        readonly value: string;
    };
    SpreadMethod: (value: string) => {
        readonly _tag: 'SpreadMethod';
        readonly value: string;
    };
    Fx: (value: string) => {
        readonly _tag: 'Fx';
        readonly value: string;
    };
    Fy: (value: string) => {
        readonly _tag: 'Fy';
        readonly value: string;
    };
    Fr: (value: string) => {
        readonly _tag: 'Fr';
        readonly value: string;
    };
    PatternUnits: (value: string) => {
        readonly _tag: 'PatternUnits';
        readonly value: string;
    };
    PatternContentUnits: (value: string) => {
        readonly _tag: 'PatternContentUnits';
        readonly value: string;
    };
    PatternTransform: (value: string) => {
        readonly _tag: 'PatternTransform';
        readonly value: string;
    };
    MarkerStart: (value: string) => {
        readonly _tag: 'MarkerStart';
        readonly value: string;
    };
    MarkerMid: (value: string) => {
        readonly _tag: 'MarkerMid';
        readonly value: string;
    };
    MarkerEnd: (value: string) => {
        readonly _tag: 'MarkerEnd';
        readonly value: string;
    };
    MarkerWidth: (value: string) => {
        readonly _tag: 'MarkerWidth';
        readonly value: string;
    };
    MarkerHeight: (value: string) => {
        readonly _tag: 'MarkerHeight';
        readonly value: string;
    };
    MarkerUnits: (value: string) => {
        readonly _tag: 'MarkerUnits';
        readonly value: string;
    };
    RefX: (value: string) => {
        readonly _tag: 'RefX';
        readonly value: string;
    };
    RefY: (value: string) => {
        readonly _tag: 'RefY';
        readonly value: string;
    };
    Orient: (value: string) => {
        readonly _tag: 'Orient';
        readonly value: string;
    };
    PreserveAspectRatio: (value: string) => {
        readonly _tag: 'PreserveAspectRatio';
        readonly value: string;
    };
    OnMount: (action: MountAction<Message, any>) => {
        readonly _tag: 'OnMount';
        readonly action: MountAction<Message, any>;
    };
    OnUnmount: (message: Message) => {
        readonly _tag: 'OnUnmount';
        readonly message: Message;
    };
};
declare const messageUniverse: unique symbol;
/**
 * Phantom marker carrying the builder's Message universe invariantly, so a
 * builder from the wrong frame is rejected on this property rather than deep
 * inside the structural comparison of every element constructor. It exists only
 * to keep the diagnostic short and pointed at the cause.
 */
type MessageUniverse<Message> = Readonly<{
    [messageUniverse]: (message: Message) => Message;
}>;
/**
 * The typed Html builder a view builds DOM with: all HTML, SVG, and MathML
 * element constructors, attribute constructors, a `keyed` helper for keyed
 * elements, `empty` for rendering nothing, and `submodel` for embedding a
 * child Submodel.
 *
 * A builder cannot be constructed by application code. The runtime supplies
 * it to each view alongside the model, typed by the Message universe of the
 * frame that view renders in: the app's Message for the root view, the
 * Submodel's own Message inside a `Submodel.defineView`. Used in the frame
 * that supplied it, a handler built with it carries exactly the Messages that
 * frame's dispatcher can route, so a Message from another universe (the
 * classic case: a shared helper building an app-level Message inside a
 * Submodel) is a compile error at the handler call site.
 *
 * The type scopes where a builder is obtained, not where it is used. Carrying
 * one into another frame, by storing it or handing the builder itself to a
 * child through `viewInputs`, still compiles and still builds handlers that
 * frame cannot route. Thread `h` as a parameter; never store it.
 *
 * Pass `h` along as an ordinary parameter when extracting view helpers; a
 * memoized helper receives it through the `createLazy` args array. When a
 * child must render markup that belongs to an ancestor, the ancestor passes a
 * renderer that already closed over its own builder, not the builder, so the
 * handlers resolve in the ancestor's boundary. Where no builder is in scope
 * at all, typically module scope, use {@link inertHtml}.
 */
export type HtmlBuilder<Message> = MessageUniverse<Message> & HtmlElements<Message> & HtmlAttributes<Message> & Readonly<{
    empty: null;
    keyed: KeyedFunction<Message>;
    submodel: <View extends AnySubmodelView>(config: SubmodelConfig<View, Message>) => Html;
}>;
/** @internal Returns the process-wide builder singleton retyped to a frame's
 *  Message. Only the runtime, the Scene test harness, and the framework's own
 *  tests call this, each immediately before invoking a view under the frame
 *  that Message belongs to. `h.submodel` does not: it receives the singleton
 *  as a parameter, which is what keeps `index.ts` and `submodel.ts` free of a
 *  runtime import cycle. Application code receives builders exclusively as
 *  view parameters. */
export declare const __htmlBuilder: <Message>() => HtmlBuilder<Message>;
/**
 * Builder whose Message universe is empty. Its Message type is `never`, so
 * every event-handler constructor is uncallable and nothing built with it can
 * dispatch a Message. Elements, attributes, and keying behave exactly as they
 * do on any other builder, and the markup itself is free to vary with runtime
 * data. Inert describes what the result can do, not how it is computed.
 *
 * Inert to Foldkit's dispatch, not to the browser. A raw DOM attribute still
 * does whatever the browser makes of it, which is exactly how the default
 * crash view gets a working reload button:
 * `h.Attribute('onclick', 'location.reload()')`. What `never` rules out is a
 * Message reaching `update`, not every possible behavior.
 *
 * Use it where no builder is in scope, which in practice means module scope
 * and the frameless renders the framework performs itself:
 *
 * ```ts
 * import { inertHtml as ih } from 'foldkit/html'
 *
 * const PagefindBody = ih.DataAttribute('pagefind-body', '')
 * ```
 *
 * Attributes it produces are `Attribute<never>`, so they flow into any
 * Message universe by covariance. That makes it the right builder for
 * library code emitting handler-free attribute bundles for arbitrary apps.
 *
 * Inside a view, use the view's own `h` parameter. A view already holds a
 * builder, and reaching past it for this one is the habit that made a
 * caller-chosen Message type possible in the first place.
 */
export declare const inertHtml: HtmlBuilder<never>;
