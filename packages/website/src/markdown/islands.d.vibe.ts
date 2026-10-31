import * as Markdown from '@foldkit/markdown';
import type { DemoLabels } from './demoLabel.vibe';
import { type Slots } from './slots.vibe';
/**
 * The site's island views, paired with {@link islandAttributes} so attributes
 * arrive already decoded. `Snippet` renders a build-time highlighted source file
 * with the standard copy affordance; `Info` and `Warning` wrap nested markdown
 * in the prose callouts; `Cta` lays its nested links out as an action row;
 * `Demo` drops in a live, interactive demo the page has pre-built and keyed by
 * name; `Faq` hands its rendered children to the page's collapsible shell. The
 * page's slots live in the app Model, so the views close over `slots`; the copy
 * state rides inside the slots' renderers.
 *
 * A `::Snippet` name with no matching file under `src/snippet` renders nothing,
 * which the snippet registration test is there to catch. The views stay pure, so
 * a missing snippet reports at test time rather than warning from a render.
 */
export declare const docIslands: (slots: Slots<string>, demoLabels: DemoLabels, pageId: string) => Markdown.Islands;
