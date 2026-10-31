import { Context, Effect, Fiber, Schema } from 'effect';
import { CommandDefinitionTypeId } from '../brand.js';
/** The result of interrupting a key. `Outcome.Interrupted` means at least one
 * in-flight Command was stopped and will not dispatch its result Message.
 * `Outcome.NotFound` means no Command held the key. The interrupt operation
 * itself cannot fail. */
export declare const Outcome: import("../../schema/index.js").TaggedUnion<{
    readonly Interrupted: {};
    readonly NotFound: {};
}>;
/** The result of interrupting a key. `Outcome.Interrupted` means at least one
 * in-flight Command was stopped and will not dispatch its result Message.
 * `Outcome.NotFound` means no Command held the key. The interrupt operation
 * itself cannot fail. */
export type Outcome = typeof Outcome.Type;
/** @internal The per-runtime-instance map from interrupt key to the fibers
 *  of the interruptible Commands currently holding it. A key is an address,
 *  not a lock: any number of invocations may hold one key concurrently, and
 *  dispatching under a held key never interrupts anything. Commands register
 *  under their key for the duration of their Effect; Interrupt Commands look
 *  the key up and interrupt every holder. Internal to the runtime. */
export type __Registry = Readonly<{
    lookup: (key: string) => ReadonlyArray<Fiber.Fiber<unknown, unknown>>;
    register: (key: string, fiber: Fiber.Fiber<unknown, unknown>) => void;
    release: (key: string, fiber: Fiber.Fiber<unknown, unknown>) => void;
    interrupt: (key: string) => Effect.Effect<Outcome>;
}>;
/** @internal Creates an interrupt registry. The runtime creates one per
 *  instance and provides it through {@link __CurrentRegistry}. Internal to
 *  the runtime. */
export declare const __makeRegistry: () => __Registry;
/** Reference through which the runtime provides the current instance's
 *  interrupt registry to Command Effects. A Reference has a default value, so
 *  reading it never adds a service requirement; the default is a shared
 *  registry for Effects run outside a runtime (unit tests). Internal to the
 *  runtime. */
export declare const __CurrentRegistry: Context.Reference<Readonly<{
    lookup: (key: string) => ReadonlyArray<Fiber.Fiber<unknown, unknown>>;
    register: (key: string, fiber: Fiber.Fiber<unknown, unknown>) => void;
    release: (key: string, fiber: Fiber.Fiber<unknown, unknown>) => void;
    interrupt: (key: string) => Effect.Effect<Outcome>;
}>>;
export declare const __registerKeyWhileRunning: <A, E, R>(key: string, effect: Effect.Effect<A, E, R>) => Effect.Effect<A, E, R>;
/** An Interrupt Command definition derived from an interruptible Command
 *  definition with no declared args. Call as `Definition.Interrupt(toMessage)`
 *  to produce a Command that interrupts every holder of the definition's key. */
export interface InterruptDefinitionNoArgs<Name extends string> {
    readonly [CommandDefinitionTypeId]: CommandDefinitionTypeId;
    readonly name: `${Name}.Interrupt`;
    <ToMessage>(toMessage: (outcome: Outcome) => ToMessage): Readonly<{
        name: `${Name}.Interrupt`;
        interruptsKey: string;
        effect: Effect.Effect<ToMessage>;
    }>;
}
/** An Interrupt Command definition derived from an interruptible Command
 *  definition with declared args. Call as
 *  `Definition.Interrupt(keyArgs, toMessage)` to produce a Command that
 *  interrupts every holder of the key derived from `keyArgs`. */
export interface InterruptDefinitionWithArgs<Name extends string, KeyArgs> {
    readonly [CommandDefinitionTypeId]: CommandDefinitionTypeId;
    readonly name: `${Name}.Interrupt`;
    <ToMessage>(keyArgs: KeyArgs, toMessage: (outcome: Outcome) => ToMessage): Readonly<{
        name: `${Name}.Interrupt`;
        args: KeyArgs;
        interruptsKey: string;
        effect: Effect.Effect<ToMessage>;
    }>;
}
/** An interruptible Command definition with no declared args; its key is the
 *  Command name. Call as `Definition()` to produce a Command instance; use
 *  `Definition.Interrupt` to build the Command that stops it. */
export interface DefinitionNoArgs<Name extends string, Eff extends Effect.Effect<any, any, any>> {
    readonly [CommandDefinitionTypeId]: CommandDefinitionTypeId;
    readonly name: Name;
    readonly Interrupt: InterruptDefinitionNoArgs<Name>;
    (): Readonly<{
        name: Name;
        key: string;
        effect: Eff;
    }>;
}
/** An interruptible Command definition with declared args and a key derived
 *  from them, namespaced by the Command name. Call as `Definition(args)` to
 *  produce a Command instance; use `Definition.Interrupt` to build the
 *  Command that stops every holder of a specific key. */
export interface DefinitionWithArgs<Name extends string, Fields extends Schema.Struct.Fields, KeyArgs extends object, Eff extends Effect.Effect<any, any, any>> {
    readonly [CommandDefinitionTypeId]: CommandDefinitionTypeId;
    readonly name: Name;
    readonly Interrupt: InterruptDefinitionWithArgs<Name, KeyArgs>;
    (args: Schema.Schema.Type<Schema.Struct<Fields>>): Readonly<{
        name: Name;
        args: Schema.Schema.Type<Schema.Struct<Fields>>;
        key: string;
        effect: Eff;
    }>;
}
/** An interruptible Command definition with declared args but no `toKey`, so
 *  its key is the Command name, exactly like the no-args form. Call as
 *  `Definition(args)` to produce a Command instance; use `Definition.Interrupt`
 *  to build the Command that stops it. Reach for this when a Command takes args
 *  yet at most one invocation is meaningfully in flight, so its invocations need
 *  nothing to distinguish them. */
export interface DefinitionWithArgsNameKeyed<Name extends string, Fields extends Schema.Struct.Fields, Eff extends Effect.Effect<any, any, any>> {
    readonly [CommandDefinitionTypeId]: CommandDefinitionTypeId;
    readonly name: Name;
    readonly Interrupt: InterruptDefinitionNoArgs<Name>;
    (args: Schema.Schema.Type<Schema.Struct<Fields>>): Readonly<{
        name: Name;
        args: Schema.Schema.Type<Schema.Struct<Fields>>;
        key: string;
        effect: Eff;
    }>;
}
/** @internal Builds the `Interrupt` constructor for an interruptible definition
 *  whose key is the Command name. Internal to the Command module. */
export declare const __makeInterruptDefinitionNoArgs: (name: string, key: string) => unknown;
/** @internal Builds the `Interrupt` constructor for an interruptible definition
 *  whose key is derived from its args. Internal to the Command module. */
export declare const __makeInterruptDefinitionWithArgs: (name: string, toFullKey: (keyArgs: any) => string) => unknown;
