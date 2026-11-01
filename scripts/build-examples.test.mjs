import fc from 'fast-check'
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import {
  existsSync,
  lstatSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from 'node:fs'
import { tmpdir } from 'node:os'
import { join, relative } from 'node:path'
import { test } from 'node:test'
const root = join(import.meta.dirname, '..')
const extension = existsSync(join(root, 'scripts/build-examples.vibe'))
  ? 'vibe'
  : 'ts'
const scriptSource = readFileSync(
  join(root, 'scripts/build-examples.' + extension),
  'utf8',
)
const base = mkdtempSync(join(tmpdir(), 'foldkit-build-examples-'))
const entries = [
  { slug: 'spa-a', livePreview: 'Spa' },
  { slug: 'spa-b', livePreview: 'Spa' },
  { slug: 'static-a', livePreview: 'Prerendered' },
  { slug: 'spa-c', livePreview: 'Spa' },
  { slug: 'static-b', livePreview: 'Prerendered' },
  { slug: 'play', livePreview: 'PlaygroundOnly' },
  { slug: 'unavailable', livePreview: 'Unavailable' },
]
const childSource = `import{appendFileSync,mkdirSync,writeFileSync}from'node:fs';import{join,basename}from'node:path';
const slug=basename(process.cwd()),args=process.argv.slice(2),outIndex=args.indexOf('--outDir'),out=outIndex<0?join(process.cwd(),'dist/client'):args[outIndex+1];
appendFileSync(process.env.PROBE_TRACE,JSON.stringify({kind:'start',slug,args,id:process.env.FOLDKIT_BUILD_ID??null})+'\\n');
setTimeout(()=>{if(slug===process.env.PROBE_FAIL){appendFileSync(process.env.PROBE_TRACE,JSON.stringify({kind:'failed',slug})+'\\n');process.exitCode=7;return}
mkdirSync(join(out,'nested'),{recursive:true});writeFileSync(join(out,'index.html'),(process.env.PROBE_BOM==='1'?'\ufeff':'')+'<head></head><body>'+slug+'</body>');
writeFileSync(join(out,'nested/next.html'),'<head></head><body>nested</body>');writeFileSync(join(out,'note.txt'),'untouched');
process.stdout.write('\\ufefffirst\\nsecond\\n');process.stderr.write('warning\\n');
appendFileSync(process.env.PROBE_TRACE,JSON.stringify({kind:'done',slug})+'\\n')},slug===process.env.PROBE_FAIL?5:15);
`
const files = dir => {
  const values = {}
  if (!existsSync(dir)) return values
  const visit = p => {
    for (const f of readdirSync(p)) {
      const next = join(p, f),
        s = lstatSync(next)
      if (s.isDirectory()) visit(next)
      else if (s.isFile())
        values[relative(dir, next)] = readFileSync(next, 'base64')
    }
  }
  visit(dir)
  return values
}
function execute(source, ext, input) {
  rmSync(base, { recursive: true, force: true })
  mkdirSync(join(base, 'scripts'), { recursive: true })
  mkdirSync(join(base, 'bin'), { recursive: true })
  mkdirSync(join(base, 'packages/website/src/page/example'), {
    recursive: true,
  })
  symlinkSync(join(root, 'node_modules'), join(base, 'node_modules'), 'dir')
  writeFileSync(join(base, 'package.json'), '{"type":"module"}')
  writeFileSync(
    join(base, 'tsconfig.json'),
    '{"compilerOptions": {"target": "ES2022", "module": "ESNext", "moduleResolution": "Bundler", "strict": true, "skipLibCheck": true, "allowImportingTsExtensions": true, "noEmit": true}, "include": ["scripts/*.ts", "scripts/*.vibe", "packages/**/*.vibe"]}',
  )
  writeFileSync(join(base, 'scripts/build-examples.' + ext), source)
  writeFileSync(
    join(base, 'scripts/example-bridge.js'),
    '// actual fixture bridge\n',
  )
  writeFileSync(
    join(base, 'packages/website/src/page/example/meta.vibe'),
    'export const examples: ReadonlyArray<{slug:string;livePreview:"Spa"|"Prerendered"|"PlaygroundOnly"|"Unavailable"}> = ' +
      JSON.stringify(entries) +
      '\n',
  )
  writeFileSync(join(base, 'bin/pnpm'), '#!/usr/bin/env node\n' + childSource, {
    mode: 0o755,
  })
  for (const e of entries)
    mkdirSync(join(base, 'examples', e.slug, 'dist/client'), {
      recursive: true,
    })
  const out = join(base, 'packages/website/public/example-apps-embed')
  mkdirSync(out, { recursive: true })
  writeFileSync(join(out, 'old.txt'), 'old')
  const trace = join(base, 'trace.jsonl'),
    env = {
      ...process.env,
      PATH: join(base, 'bin') + ':' + process.env.PATH,
      PROBE_TRACE: trace,
      PROBE_BOM: input.bom ? '1' : '0',
      PROBE_FAIL: input.fail ?? '',
    }
  delete env.FOLDKIT_BUILD_ID
  if (input.id !== null) env.FOLDKIT_BUILD_ID = input.id
  const args = input.only === null ? [] : ['--only', input.only]
  const proc = spawnSync(
    process.execPath,
    [
      '--import',
      'vibelang/register',
      join(base, 'scripts/build-examples.' + ext),
      ...args,
    ],
    { cwd: base, env, encoding: 'utf8', maxBuffer: 4 * 1024 * 1024 },
  )
  assert.equal(proc.signal, null, proc.stderr)
  const events = existsSync(trace)
    ? readFileSync(trace, 'utf8')
        .trim()
        .split('\n')
        .filter(Boolean)
        .map(x => JSON.parse(x))
    : []
  return {
    status: proc.status,
    stdout: proc.stdout,
    stderr: proc.stderr,
    events,
    output: files(out),
  }
}
function check(input) {
  const actual = execute(scriptSource, extension, input)
  const only = new Set(
    input.only === null ? [] : input.only.split(',').filter(Boolean),
  )
  const eligible = entries.filter(
    e =>
      ['Spa', 'Prerendered'].includes(e.livePreview) &&
      (only.size === 0 || only.has(e.slug)),
  )
  const failed = eligible.some(e => e.slug === input.fail)
  const expectedStarted = failed ? eligible.slice(0, 4) : eligible
  const started = actual.events.filter(e => e.kind === 'start')
  assert.equal(actual.status, failed ? 1 : 0, actual.stderr)
  assert.deepEqual(
    started.map(e => e.slug).sort(),
    expectedStarted.map(e => e.slug).sort(),
  )
  assert.equal(Object.hasOwn(actual.output, 'old.txt'), only.size > 0)
  const decode = name => Buffer.from(actual.output[name], 'base64').toString()
  for (const e of expectedStarted) {
    const row = started.find(row => row.slug === e.slug)
    assert.deepEqual(row.args.slice(0, 5), [
      'exec',
      'vite',
      'build',
      '--base',
      '/example-apps-embed/' + e.slug + '/',
    ])
    if (e.livePreview === 'Spa') {
      assert.deepEqual(row.args.slice(5), [
        '--outDir',
        join(base, 'packages/website/public/example-apps-embed', e.slug),
      ])
      assert.equal(row.id, input.id)
    } else {
      assert.equal(row.args.length, 5)
      if (input.id !== null && input.id !== '') assert.equal(row.id, input.id)
      else
        assert.match(
          row.id,
          /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/,
        )
    }
    if (e.slug === input.fail) {
      assert.ok(
        actual.events.some(x => x.kind === 'failed' && x.slug === e.slug),
      )
      assert.ok(!Object.hasOwn(actual.output, e.slug + '/bridge.js'))
    } else {
      assert.ok(
        actual.events.some(x => x.kind === 'done' && x.slug === e.slug),
        'siblings finish before CLI exit',
      )
      assert.equal(decode(e.slug + '/bridge.js'), '// actual fixture bridge\n')
      assert.equal(
        decode(e.slug + '/index.html'),
        (input.bom ? '\ufeff' : '') +
          '<head><script src="bridge.js"></script></head><body>' +
          e.slug +
          '</body>',
      )
      assert.equal(
        decode(e.slug + '/nested/next.html'),
        '<head><script src="bridge.js"></script></head><body>nested</body>',
      )
      assert.equal(decode(e.slug + '/note.txt'), 'untouched')
      for (const line of ['\ufefffirst', 'second', 'warning'])
        assert.ok(
          actual.stdout.includes('[' + e.slug + '] ' + line),
          JSON.stringify(actual.stdout),
        )
    }
  }
  if (!failed)
    assert.ok(
      actual.stdout.includes('Built ' + eligible.length + ' examples into '),
    )
}
const corpus = JSON.parse(
  readFileSync(
    join(
      root,
      'scripts/fixtures/build-examples/foldkit-build-example-cli.json',
    ),
    'utf8',
  ),
)
test('native example build CLI preserves output, IDs, batching and failure cleanup', () => {
  try {
    for (const input of corpus) check(input)
    const arb = fc.record({
      only: fc.option(
        fc.constantFrom(
          'spa-a',
          'static-a',
          'spa-b,static-b',
          'unknown',
          '',
          'spa-a,spa-c',
        ),
        { nil: null },
      ),
      id: fc.option(fc.constantFrom('', 'provided', 'id with space', '0'), {
        nil: null,
      }),
      bom: fc.boolean(),
      fail: fc.constant(null),
    })
    fc.assert(fc.property(arb, check), { seed: 413911, numRuns: 100 })
  } finally {
    rmSync(base, { recursive: true, force: true })
  }
})
