import { spawnSync } from 'node:child_process'
import {
  mkdtempSync,
  readFileSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { expect, test } from 'vitest'

import corpus from './fixtures/foldkit-intersection-observer-boundary.json'
import source from './subscription/activeSection.vibe?raw'

const runner = `
import assert from "node:assert/strict"
import { Effect, Exit, Fiber, Stream } from "effect"
import fc from "fast-check"
import { subscribe } from "./dist/observer.js"
await fc.assert(fc.asyncProperty(fc.jsonValue(), fc.integer({ min: 1, max: 5 }), async (defect, count) => {
 const sections = Array.from({ length: count }, (_, index) => "s"+index)
 for (const outcome of ["success", "constructor", "observe", "disconnect", "interrupt"]) {
  for (let replay=0; replay<2; replay++) {
   const events=[]
   let deliver
   let started
   const ready = new Promise(resolve => { started=resolve })
   globalThis.document={ getElementById: id => { events.push("lookup:"+id); return { id } } }
   globalThis.IntersectionObserver=class {
    constructor(callback, options) {
     events.push("make")
     assert.deepEqual(options,{ rootMargin:"-100px 0px -80% 0px" })
     if(outcome==="constructor") throw defect
     deliver=callback
    }
    observe(target) {
     events.push("observe:"+target.id)
     if(outcome==="observe"&&target.id===sections.at(-1)) throw defect
     if(target.id===sections.at(-1)) started()
    }
    disconnect() {
     events.push("disconnect")
     if(outcome==="disconnect") throw defect
    }
   }
   const program=Stream.runCollect(Stream.take(subscribe({ sections }),1))
   const fiber=Effect.runFork(program)
   let exit
   if(outcome==="constructor"||outcome==="observe"){
    exit=await Effect.runPromise(Fiber.await(fiber))
    assert.equal(Exit.isFailure(exit),true)
    assert.equal(exit.cause.reasons.find(reason=>reason._tag==="Die").defect,defect)
    assert.equal(events.includes("disconnect"),false)
   } else {
    await ready
    if(outcome==="interrupt") { await Effect.runPromise(Fiber.interrupt(fiber)); exit=await Effect.runPromise(Fiber.await(fiber)) }
    else {
     deliver([{isIntersecting:true,target:{id:sections[0]}}])
     exit=await Effect.runPromise(Fiber.await(fiber))
    }
    assert.equal(events.filter(event=>event==="disconnect").length,1)
    if(outcome==="success"){
     assert.equal(Exit.isSuccess(exit),true)
     assert.equal(exit.value[0].sectionId,sections[0])
    } else {
     assert.equal(Exit.isFailure(exit),true)
     const reason=exit.cause.reasons.find(reason=>reason._tag===(outcome==="disconnect"?"Die":"Interrupt"))
     assert.ok(reason)
     if(outcome==="disconnect") assert.equal(reason.defect,defect)
    }
   }
   assert.deepEqual(events.slice(0,outcome==="constructor"?1:1+count*2),[
    "make",...(outcome==="constructor"?[]:sections.flatMap(id=>["lookup:"+id,"observe:"+id]))
   ])
  }
 }
}),{seed:${corpus.seed},numRuns:${corpus.runs}})
console.log("OBSERVER_BOUNDARY_PROPERTY 100 models, 1000 exits; acquisition, release, replay and defect identity")
`

test('observer acquisition preserves ordering and failure cleanup', () => {
  const directory = mkdtempSync(join(tmpdir(), 'foldkit-observer-boundary-'))
  try {
    symlinkSync(
      join(process.cwd(), 'node_modules'),
      join(directory, 'node_modules'),
    )
    const expression = source.match(
      /dependenciesToStream: \(\{ sections \}\) =>([\s\S]*?),\n    \},/,
    )?.[1]
    expect(expression).toBeDefined()
    const platformImport = (
      source.match(/^import[\s\S]*?from ['"][^'"]+['"]/gm) ?? []
    )
      .filter(
        line =>
          line.includes('activeSection.platform.ts') ||
          line.includes('experimental/platform-browser'),
      )
      .join('\n')
    const platformFile = join(
      process.cwd(),
      'src/subscription/activeSection.platform.ts',
    )
    writeFileSync(
      join(directory, 'activeSection.platform.ts'),
      readFileSync(platformFile, 'utf8'),
    )
    writeFileSync(
      join(directory, 'browserDocument.ts'),
      readFileSync(join(process.cwd(), 'src/browserDocument.ts'), 'utf8'),
    )
    writeFileSync(
      join(directory, 'observer.vibe'),
      `
import { Array as Arr, Iterable as Iter } from "effect"
import { defineMessageUnion } from "foldkit/message"
${platformImport}
const Message = defineMessageUnion({ ChangedActiveSection: { sectionId: Schema.String } })
const Render = { afterCommit: Effect.void }
import { elementWithId } from "./browserDocument.ts"
export const subscribe = ({ sections }: { sections: ReadonlyArray<string> }) => ${expression}
`,
    )
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
        files: ['observer.vibe'],
      }),
    )
    writeFileSync(join(directory, 'package.json'), '{"type":"module"}')
    const compiled = spawnSync(
      join(process.cwd(), 'node_modules/.bin/vibelang'),
      [
        '--singleThreaded',
        '-p',
        join(directory, 'tsconfig.json'),
        '--pretty',
        'false',
      ],
      { encoding: 'utf8', timeout: 30000 },
    )
    expect(compiled.status, compiled.stdout + compiled.stderr).toBe(0)
    writeFileSync(join(directory, 'run.mjs'), runner)
    const executed = spawnSync(process.execPath, [join(directory, 'run.mjs')], {
      encoding: 'utf8',
      timeout: 20000,
      maxBuffer: 4 * 1024 * 1024,
    })
    expect(executed.status, executed.stdout + executed.stderr).toBe(0)
  } finally {
    rmSync(directory, { recursive: true, force: true })
  }
})
