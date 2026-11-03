import { Deferred, Effect, HashMap, Ref } from 'effect';
import { type Response } from 'foldkit/devtools-protocol';
import type { RawData } from 'ws';
export type PendingResponses = HashMap.HashMap<string, Deferred.Deferred<typeof Response.Type, Error>>;
export declare const handleIncomingMessage: (raw: RawData, pendingResponsesRef: Ref.Ref<PendingResponses>) => Effect.Effect<void>;
