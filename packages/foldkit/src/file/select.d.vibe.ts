import { Effect, Option } from 'effect';
import type { File } from './file.vibe';
/**
 * Opens the native file picker allowing a single file to be selected. Resolves
 * with `Option.some(file)` if the user picked one, or `Option.none()` if they
 * cancelled. Mirrors Elm's `File.Select.file`.
 *
 * The `accept` argument is a list of MIME types or file extensions that
 * restrict what the picker shows. Pass an empty array to allow any file.
 *
 * @example
 * ```typescript
 * SelectResume(
 *   File.select(['application/pdf']).pipe(
 *     Effect.map(
 *       Option.match({
 *         onNone: () => CancelledSelectResume(),
 *         onSome: file => CompletedSelectResume({ file }),
 *       }),
 *     ),
 *   ),
 * )
 * ```
 */
export declare const select: (accept: ReadonlyArray<string>) => Effect.Effect<Option.Option<File>>;
/**
 * Opens the native file picker allowing multiple files to be selected at
 * once. Resolves with the array of selected files, or an empty array if the
 * user cancelled. Mirrors Elm's `File.Select.files`.
 *
 * @example
 * ```typescript
 * SelectAttachments(
 *   File.selectMultiple(['image/*', 'application/pdf']).pipe(
 *     Effect.map(files => CompletedSelectAttachments({ files })),
 *   ),
 * )
 * ```
 */
export declare const selectMultiple: (accept: ReadonlyArray<string>) => Effect.Effect<ReadonlyArray<File>>;
