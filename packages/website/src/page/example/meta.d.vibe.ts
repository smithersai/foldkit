import { Option, Schema } from "effect";
type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';
export declare const ExampleSlug: Schema.Literals<readonly ["counter", "counters", "todo", "stopwatch", "crash-view", "slow-warnings", "form", "job-application", "weather", "api-cache", "api-cache-query", "charting", "routing", "route-transitions", "interrupting-commands", "view-transitions", "query-sync", "snake", "auth", "shopping-cart", "state-machine", "pixel-art", "websocket-chat", "managed-resource-layer", "kanban", "map", "canvas-art", "generative-art", "web-components", "embedding", "ssg", "ssr", "ui-showcase", "personal-blog", "livestore"]>;
export type ExampleSlug = typeof ExampleSlug.Type;
export type LivePreview = 'Spa' | 'Prerendered' | 'PlaygroundOnly' | 'Unavailable';
export type ExampleMeta = Readonly<{
    slug: ExampleSlug;
    title: string;
    description: string;
    difficulty: Difficulty;
    tags: ReadonlyArray<string>;
    hasRouting: boolean;
    livePreview: LivePreview;
}>;
export declare const examples: ReadonlyArray<ExampleMeta>;
export declare const exampleSlugs: ReadonlyArray<ExampleSlug>;
export declare const runnableExampleSlugs: ReadonlyArray<ExampleSlug>;
export declare const findBySlug: (slug: string) => Option.Option<ExampleMeta>;
export {};
