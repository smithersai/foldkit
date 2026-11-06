import { Effect, Schema } from 'effect';
export declare const Post: Schema.Struct<{
    readonly id: Schema.String;
    readonly title: Schema.String;
    readonly excerpt: Schema.String;
}>;
export type Post = typeof Post.Type;
export declare const PostDetail: Schema.Struct<{
    readonly id: Schema.String;
    readonly title: Schema.String;
    readonly author: Schema.String;
    readonly body: Schema.String;
}>;
export type PostDetail = typeof PostDetail.Type;
export declare const Stats: Schema.Struct<{
    readonly activeUsers: Schema.Number;
    readonly requestsPerSecond: Schema.Number;
    readonly cacheHitRatePercent: Schema.Number;
}>;
export type Stats = typeof Stats.Type;
export declare const FLAKY_POST_ID = "flaky-connection";
export declare const fetchPosts: Effect.Effect<{
    readonly id: string;
    readonly title: string;
    readonly excerpt: string;
}[], never, never>;
export declare const fetchPostDetail: (postId: string) => Effect.Effect<PostDetail, string>;
export declare const fetchStats: Effect.Effect<{
    readonly activeUsers: number;
    readonly requestsPerSecond: number;
    readonly cacheHitRatePercent: number;
}, never, never>;
