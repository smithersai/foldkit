import { Option } from 'effect';
import { Html, type HtmlBuilder } from 'foldkit/html';
import { type ResolvedTheme } from '../../colorScheme.vibe';
import { CodeBlock } from '../../component/index.ts';
import { type Message } from './message.vibe';
export declare const HERO_SECTION_ID = "hero";
export declare const contentView: (renderCopyButton: CodeBlock.RenderCopyButton, renderSnippet: CodeBlock.RenderSnippet, demoTabsView: Html, emailSignupView: Html, playgroundMenuView: Html, maybeGitHubStarCount: Option.Option<number>, resolvedTheme: ResolvedTheme, isBrowserEnvironmentLoaded: boolean, h: HtmlBuilder<Message>) => Html;
