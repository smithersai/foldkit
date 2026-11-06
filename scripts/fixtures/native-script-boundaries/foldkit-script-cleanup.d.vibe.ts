import { Effect } from "effect";
export declare const cleanupProgram: (failBody: boolean, failCleanup: boolean, bodyError: unknown, cleanupError: unknown, record: (stage: string) => void) => Effect.Effect<string, unknown, never>;
