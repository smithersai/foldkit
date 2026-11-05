// @vitest-environment node
import { spawnSync } from 'node:child_process'
import { mkdtempSync, rmSync, symlinkSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { expect, test } from 'vitest'

import corpus from './fixtures/foldkit-snippet-native-matches.json'
import notes from './snippet/asyncDataMap.vibe?raw'
import cart from './snippet/domainModule.vibe?raw'
import field from './snippet/fieldValidationAsync.vibe?raw'
import toast from './snippet/uiToastBasic.vibe?raw'

const matchExpression = (source: string, subject: string): string => {
  const begin = source.indexOf('match (' + subject + ')')
  expect(begin).toBeGreaterThanOrEqual(0)
  const opening = source.indexOf('{', begin)
  let depth = 0
  let quote = ''
  for (let index = opening; index < source.length; index++) {
    const character = source.charAt(index)
    if (quote) {
      if (character === '\\') index++
      else if (character === quote) quote = ''
    } else if (character === '"' || character === "'" || character === '`')
      quote = character
    else if (character === '{') depth++
    else if (character === '}' && --depth === 0)
      return source.slice(begin, index + 1)
  }
  throw new Error('The native match expression is incomplete')
}

test('native excerpt matches preserve branch selection and unchanged values', () => {
  const directory = mkdtempSync(join(tmpdir(), 'foldkit-snippet-matches-'))
  try {
    symlinkSync(
      join(process.cwd(), 'node_modules'),
      join(directory, 'node_modules'),
    )
    writeFileSync(
      join(directory, 'notes.vibe'),
      notes +
        `
type Note = { readonly id: string; readonly maybeNotebookId: Option.Option<string> }
type Notes = AsyncData.AsyncData<ReadonlyArray<Note>, string>
type Model = { readonly allNotes: Notes; readonly notesByNotebook: HashMap.HashMap<string, Notes> }
`,
    )
    writeFileSync(
      join(directory, 'item.vibe'),
      `
export schema Item { readonly id: string }
export schema CartItem { readonly item: Item; readonly quantity: number }
`,
    )
    writeFileSync(
      join(directory, 'cart.vibe'),
      cart.replace("from './item'", "from './item.vibe'"),
    )
    writeFileSync(
      join(directory, 'branches.vibe'),
      `
import { Option } from "effect"
import { Command, Update } from "foldkit"
import { Validating, type Field } from "foldkit/fieldValidation"
import { modifyFields } from "foldkit/struct"
import { inertHtml as h } from "foldkit/html"
type Model = { readonly email: Field<string>; readonly emailValidationId: number }
const Completed = Schema.TaggedStruct("Completed", { validationId: Schema.Number })
type Message = typeof Completed.Type
const CheckEmailAvailable = Command.define("CheckEmailAvailable", {
  args: { email: Schema.String, validationId: Schema.Number },
  messages: [Completed],
  execute: effect ({ validationId }) => {
    return try Effect.orDie(Effect.try({ try: () => Completed.make({ validationId }), catch: error => error }))
  }
})
export const check = (syncResult: Field<string>, model: Model, value: string): Update.Return<Model, Message> => {
  const validationId = model.emailValidationId + 1
  return ` +
        matchExpression(field, 'syncResult') +
        `
}
export const link = (entry: { readonly payload: { readonly maybeLink: Option.Option<{ readonly href: string; readonly text: string }> } }) => ` +
        matchExpression(toast, 'entry.payload.maybeLink'),
    )
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
        files: ['notes.vibe', 'cart.vibe', 'branches.vibe'],
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
    expect(compiled.stdout + compiled.stderr).not.toMatch(/EK48[0-9]+/)
    writeFileSync(
      join(directory, 'run.mjs'),
      `
import assert from "node:assert/strict"
import { Array as Arr, HashMap, Option } from "effect"
import { AsyncData } from "foldkit"
import { Invalid, NotValidated, Valid, Validating } from "foldkit/fieldValidation"
import { modifyFields } from "foldkit/struct"
import { inertHtml as h } from "foldkit/html"
import fc from "fast-check"
import { prependNewNote } from "./dist/notes.js"
import { addItem, removeItem, totalItems } from "./dist/cart.js"
import { check, link } from "./dist/branches.js"
const states = data => [
  AsyncData.Idle(), AsyncData.Loading(), AsyncData.Failure({ error: "failure" }),
  AsyncData.Success({ data }), AsyncData.Refreshing({ data }), AsyncData.Stale({ data, error: "stale" })
]
await fc.assert(fc.asyncProperty(fc.string(), fc.string(), fc.boolean(), fc.array(fc.string(), { maxLength: 12 }), async (id, text, some, ids) => {
  const maybeNotebookId = some ? Option.some("book") : Option.none()
  const note = { id, maybeNotebookId }
  const list = ids.map(id => ({ id, maybeNotebookId: Option.none() }))
  for (const state of states(list)) {
    const model = { allNotes: state, notesByNotebook: HashMap.make(["book", state]) }
    const expected = Option.match(maybeNotebookId, {
      onNone: () => modifyFields(model, { allNotes: value => AsyncData.map(value, values => Arr.prepend(values, note)) }),
      onSome: notebookId => modifyFields(model, { notesByNotebook: values => HashMap.modify(values, notebookId, value => AsyncData.map(value, values => Arr.prepend(values, note))) })
    })
    const result = prependNewNote(note)(model)
    assert.deepEqual(result, expected)
    assert.equal(some ? result.allNotes : result.notesByNotebook, some ? model.allNotes : model.notesByNotebook)
  }
  const item = { id }
  const cart = ids.map((id, index) => ({ item: { id }, quantity: index + 1 }))
  const expectedCart = cart.some(entry => entry.item.id === id)
    ? cart.map(entry => entry.item.id === id ? { ...entry, quantity: entry.quantity + 1 } : entry)
    : [...cart, { item, quantity: 1 }]
  assert.deepEqual(addItem(item)(cart), expectedCart)
  assert.deepEqual(removeItem(id)(cart), cart.filter(entry => entry.item.id !== id))
  assert.equal(totalItems(cart), cart.reduce((total, entry) => total + entry.quantity, 0))
  for (const state of [NotValidated({ value: text }), Validating({ value: text }), Valid({ value: text }), Invalid({ value: text, errors: ["invalid"] })]) {
    const model = { email: NotValidated({ value: "before" }), emailValidationId: 7 }
    const result = check(state, model, text)
    assert.equal(result.model.emailValidationId, 8)
    if (state._tag === "Valid") {
      assert.deepEqual(result.model.email, Validating({ value: text }))
      assert.equal(result.commands.length, 1)
      assert.deepEqual(result.commands[0].args, { email: text, validationId: 8 })
    } else {
      assert.equal(result.model.email, state)
      assert.equal(result.commands, undefined)
    }
    assert.equal(model.emailValidationId, 7)
  }
  const maybeLink = some ? Option.some({ href: id, text }) : Option.none()
  assert.deepEqual(link({ payload: { maybeLink } }), Option.match(maybeLink, {
    onNone: () => [],
    onSome: ({ href, text }) => [h.a([h.Class("text-sm underline"), h.Href(href)], [text])]
  }))
}), { seed: ${corpus.seed}, numRuns: ${corpus.runs} })
console.log("SNIPPET_MATCH_PROPERTY 200 cases across six AsyncData states, four field states, carts and links")
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
