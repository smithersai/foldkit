import { Effect } from 'effect';
export declare const preserveModel: (id: string, encodedModel: unknown, isReloadFlush: boolean) => void;
export declare const resolvePreservedModel: (runtimeId: string) => Effect.Effect<unknown>;
