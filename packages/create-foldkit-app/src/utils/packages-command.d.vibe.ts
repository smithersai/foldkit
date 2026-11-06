import { Effect } from 'effect';
export declare const runCommand: (command: string, args: ReadonlyArray<string>, cwd: string, isWindows: boolean) => Effect.Effect<void, Error>;
