import { Cause, Effect, Option, type Scope } from 'effect';
import type { RuntimeStatus } from './runtimeStatus.js';
/** The plain functions the runtime uses to buffer, drain, and gate Messages. */
export type MessageQueue<Message> = Readonly<{
    enqueueMessage: (message: Message) => void;
    enqueueMessageEffect: (message: Message) => Effect.Effect<void>;
    drainPendingMessages: () => void;
    resetDrainBudget: () => void;
    isAnyMessageDeferred: () => boolean;
    completeBoot: () => void;
}>;
/**
 * Builds the Message queue for one runtime. `enqueueMessage` buffers a
 * Message and drains the buffer on the spot, so update runs on the
 * dispatching stack with no fiber hop in between. The buffer, the gates,
 * and the drain are plain JavaScript on purpose: nothing on the
 * per-Message path goes through an Effect or a Ref. Until `completeBoot`
 * runs, Messages only buffer. Once the drains in one task have held the
 * stack for longer than the budget, the rest hands off to a new task so
 * the browser can paint, and the channel that schedules that task is
 * closed by the surrounding scope.
 */
export declare const makeMessageQueue: <Message>({ status, processMessage, crashWith, }: Readonly<{
    status: RuntimeStatus;
    processMessage: (message: Message) => void;
    crashWith: (cause: Cause.Cause<never>, maybeMessage: Option.Option<Message>) => Effect.Effect<void>;
}>) => Effect.Effect<MessageQueue<Message>, never, Scope.Scope>;
