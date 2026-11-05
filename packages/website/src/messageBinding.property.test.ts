// @vitest-environment node
import fc from 'fast-check'
import { spawnSync } from 'node:child_process'
import { mkdtempSync, rmSync, symlinkSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { expect, test } from 'vitest'

import corpus from './fixtures/foldkit-message-prelude-binding.json'
import s0 from './snippet/antiPatternEffectInUpdateGood.vibe?raw'
import s1 from './snippet/antiPatternInterruptReplacementBad.vibe?raw'
import s2 from './snippet/antiPatternInterruptReplacementGood.vibe?raw'
import s3 from './snippet/commandInterruptReplacement.vibe?raw'
import s4 from './snippet/fieldValidationAsync.vibe?raw'
import s5 from './snippet/informingSubmodelsParent.vibe?raw'
import s6 from './snippet/lintNoDirectSubmodelStateUpdate.vibe?raw'
import s7 from './snippet/lintNoImpureCallAtDecisionTime.vibe?raw'
import s8 from './snippet/lintRequireFoldForChildUpdateResult.vibe?raw'
import s9 from './snippet/outMessageFoldChild.vibe?raw'
import s10 from './snippet/outMessageParentHandle.vibe?raw'
import s11 from './snippet/release0167FoldChildAt.vibe?raw'
import s12 from './snippet/submodelFoldChild.vibe?raw'
import s13 from './snippet/submodelFoldChildStep.vibe?raw'
import s14 from './snippet/submodelUpdateDelegation.vibe?raw'
import s15 from './snippet/uiVirtualListChat.vibe?raw'
import s16 from './snippet/uiVirtualListVariable.vibe?raw'

test('binds application messages explicitly across excerpt lookup sites', () => {
  const directory = mkdtempSync(join(tmpdir(), 'foldkit-command-defect-'))
  try {
    symlinkSync(
      join(process.cwd(), 'node_modules'),
      join(directory, 'node_modules'),
    )
    const sources = [
      s0,
      s1,
      s2,
      s3,
      s4,
      s5,
      s6,
      s7,
      s8,
      s9,
      s10,
      s11,
      s12,
      s13,
      s14,
      s15,
      s16,
    ]
    expect(sources).toHaveLength(corpus.files.length)
    writeFileSync(
      join(directory, 'message.vibe'),
      `
import { defineMessageUnion } from "foldkit/message"
export const Message = defineMessageUnion({
  Accepted: { value: Schema.String },
  Rejected: { value: Schema.String }
})
`,
    )
    const programFiles: Array<string> = []
    for (let index = 0; index < corpus.runs; index++) {
      const source = sources[index % sources.length]
      if (source === undefined) throw new Error('Missing excerpt source')
      const imported =
        source.match(/^import \{ Message \} from ['"]\.\/message['"]/m)?.[0] ??
        ''
      const prefix = imported.replace(/(['"])\.\/message\1/, '"./message.vibe"')
      const filename = 'case' + index + '.vibe'
      programFiles.push(filename)
      writeFileSync(
        join(directory, filename),
        prefix +
          `
export const select = (value: string, rejected: boolean): string =>
  Message.match(rejected ? Message.Rejected({ value }) : Message.Accepted({ value }), {
    Accepted: ({ value }) => value,
    Rejected: ({ value }) => value
  })
`,
      )
    }
    writeFileSync(join(directory, 'package.json'), '{"type":"module"}')
    writeFileSync(
      join(directory, 'tsconfig.json'),
      JSON.stringify({
        compilerOptions: {
          strict: true,
          skipLibCheck: true,
          module: 'ESNext',
          moduleResolution: 'Bundler',
          target: 'ESNext',
          types: [],
          outDir: 'dist',
          rewriteRelativeImportExtensions: true,
        },
        files: programFiles,
      }),
    )
    const compiled = spawnSync(
      join(process.cwd(), 'node_modules/.bin/vibelang'),
      [
        '--singleThreaded',
        '-p',
        join(directory, 'tsconfig.json'),
        '--pretty',
        'false',
      ],
      { encoding: 'utf8', timeout: 30_000 },
    )
    expect(compiled.status, compiled.stdout + compiled.stderr).toBe(0)
    writeFileSync(
      join(directory, 'run.mjs'),
      `
import assert from "node:assert/strict"
import { Effect, Exit } from "effect"
import fc from "fast-check"
const values = ${JSON.stringify(fc.sample(fc.string(), { seed: corpus.seed, numRuns: corpus.runs }))}
for (let index = 0; index < values.length; index++) {
  const { select } = await import("./dist/case" + index + ".js")
  for (const rejected of [false, true]) assert.equal(select(values[index], rejected), values[index])
}
console.log("MESSAGE_BINDING_PROPERTY 100 consumers across17actual imports, 200 variant selections")

`,
    )
    const executed = spawnSync(process.execPath, [join(directory, 'run.mjs')], {
      encoding: 'utf8',
      timeout: 20_000,
    })
    expect(executed.status, executed.stdout + executed.stderr).toBe(0)
  } finally {
    rmSync(directory, { recursive: true, force: true })
  }
})
