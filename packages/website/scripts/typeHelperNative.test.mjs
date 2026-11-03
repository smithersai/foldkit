import { spawnSync } from 'node:child_process'
import {
  cpSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'

const scripts = dirname(fileURLToPath(import.meta.url))
const website = resolve(scripts, '..')
const root = resolve(website, '../..')
const compiler = join(root, 'node_modules/vibelang/native/vibelang')
const corpus = JSON.parse(
  readFileSync(
    join(scripts, 'fixtures/foldkit-type-helper-native.json'),
    'utf8',
  ),
)
const currentPath = join(website, 'src/page/apiReference/typeToString.vibe')
const current = readFileSync(
  existsSync(currentPath)
    ? currentPath
    : join(website, 'src/page/apiReference/typeToString.ts'),
  'utf8',
)
const codec = readFileSync(
  join(website, 'src/page/apiReference/typedoc.vibe'),
  'utf8',
)
const temporary = mkdtempSync(join(scripts, '.type-helper-'))
const source = join(temporary, 'source')
const results = join(temporary, 'results')
mkdirSync(join(source, 'src'), { recursive: true })
mkdirSync(results, { recursive: true })
let compileText
const declarations = []
const run = mutant => {
  const args = [join(source, 'verify.mjs')]
  if (mutant) args.push('--mutant')
  const result = spawnSync(process.execPath, args, {
    cwd: source,
    encoding: 'utf8',
    timeout: 30000,
    maxBuffer: 16 * 1024 * 1024,
  })
  expect(result.error, result.stdout + result.stderr).toBeUndefined()
  writeFileSync(
    join(results, mutant ? 'mutant.log' : 'positive.log'),
    (result.stdout ?? '') + (result.stderr ?? ''),
  )
  return result
}
beforeAll(() => {
  const start = current.indexOf('export const typeDefFromChildren')
  expect(start).toBeGreaterThanOrEqual(0)
  const tail = current.slice(start)
  expect(tail.match(/'unknown'/g)).toHaveLength(1)
  const mutant = current.slice(0, start) + tail.replace("'unknown'", "'{}'")
  for (const [name, file, text] of [
    ['original', 'typeToString.ts', corpus.originalSource],
    ['legacy', 'typeToString.vibe', corpus.legacySource],
    ['native', 'typeToString.vibe', current],
    ['mutant', 'typeToString.vibe', mutant],
  ]) {
    const directory = join(source, 'src', name)
    mkdirSync(directory, { recursive: true })
    writeFileSync(join(directory, file), text)
    writeFileSync(join(directory, 'typedoc.vibe'), codec)
  }
  writeFileSync(join(source, 'src/typedoc.vibe'), codec)
  writeFileSync(join(source, 'src/contracts.ts'), corpus.contracts)
  writeFileSync(join(source, 'src/mutant-contract.ts'), corpus.mutantContract)
  const files = [
    'original/typeToString.ts',
    'legacy/typeToString.vibe',
    'native/typeToString.vibe',
    'mutant/typeToString.vibe',
    'typedoc.vibe',
    'contracts.ts',
    'mutant-contract.ts',
  ]
  const config = join(source, 'tsconfig.json')
  writeFileSync(
    config,
    JSON.stringify({
      extends: join(website, 'tsconfig.json'),
      files: files.map(file => join(source, 'src', file)),
      include: [],
      exclude: [],
    }),
  )
  const args = [
    '-p',
    config,
    '--singleThreaded',
    '--incremental',
    'false',
    '--composite',
    'false',
    '--pretty',
    'false',
    '--noEmit',
    'false',
    '--declaration',
    'true',
    '--declarationMap',
    'false',
    '--sourceMap',
    'false',
    '--rewriteRelativeImportExtensions',
    'true',
    '--rootDir',
    join(source, 'src'),
    '--outDir',
    join(source, '.helper-output'),
  ]
  const compiled = spawnSync(compiler, args, {
    cwd: root,
    encoding: 'utf8',
    timeout: 30000,
    maxBuffer: 16 * 1024 * 1024,
    env: { ...process.env, GOMAXPROCS: '2' },
  })
  compileText = (compiled.stdout ?? '') + (compiled.stderr ?? '')
  writeFileSync(join(results, 'compile.log'), compileText)
  expect(compiled.error, compileText).toBeUndefined()
  expect(compiled.status, compileText).toBe(0)
  for (const side of ['original', 'legacy', 'native', 'mutant'])
    declarations.push(
      readFileSync(
        join(source, '.helper-output', side, 'typeToString.d.ts'),
        'utf8',
      ),
    )
  writeFileSync(join(source, 'verify.mjs'), verifyScript)
}, 60000)
afterAll(() => {
  if (process.env.FOLDKIT_TYPE_HELPER_PROOF_DIR) {
    mkdirSync(process.env.FOLDKIT_TYPE_HELPER_PROOF_DIR, { recursive: true })
    cpSync(temporary, process.env.FOLDKIT_TYPE_HELPER_PROOF_DIR, {
      recursive: true,
    })
  }
  rmSync(temporary, { recursive: true, force: true })
})
describe('native choices in the TypeDoc formatter', () => {
  test('has no TypeScript-style choice diagnostic in the actual helper', () => {
    expect(
      compileText
        .split('\n')
        .filter(
          line =>
            line.includes('native/typeToString.vibe') &&
            /\bEK48\d+\b/.test(line),
        ),
      compileText,
    ).toEqual([])
  })
  test('retains raw declarations and bidirectional contracts', () => {
    expect(new Set(declarations).size).toBe(1)
  })
  test('preserves all type kinds, nested outputs and getter traces', () => {
    const result = run(false)
    expect(result.status, result.stdout + result.stderr).toBe(0)
    const line = result.stdout
      .split('\n')
      .find(value => value.startsWith('TYPE_HELPER_PROPERTY '))
    expect(line).toBeDefined()
    expect(
      JSON.parse(line.slice('TYPE_HELPER_PROPERTY '.length)),
    ).toMatchObject({
      propertyRuns: 1,
      seed: corpus.seed,
      generatedModels: corpus.numRuns,
      fixedModels: 28,
      comparedModels: 1028,
      actualFormatterCalls: 8724,
      getterReads: 11148,
      exactLegacyAndNativeOutputs: true,
      exactGetterTraces: true,
      parameterSubjectGetterCounts: [1, 1, 1],
      allInputsDecodedByRealTypeDocCodec: true,
    })
  })
  test('rejects the compiled wrong-empty-alias mutant for its output', () => {
    const result = run(true)
    expect(result.status).toBe(1)
    expect(result.stderr).toContain("actual: '{}'")
    expect(result.stderr).toContain("expected: 'unknown'")
  })
})

const verifyScript = String.raw`import assert from "node:assert/strict";import fs from "node:fs";import fc from "fast-check";import {Option,Schema} from "effect";
import * as O from "./.helper-output/original/typeToString.js";import * as L from "./.helper-output/legacy/typeToString.js";import * as N from "./.helper-output/native/typeToString.js";import {TypeDocItem,Kind} from "./.helper-output/typedoc.js";
const flags={isOptional:false,isPrivate:false,isProtected:false,isRest:false,isStatic:false};
const item=(name,type,children,signatures)=>({id:1,name,variant:"declaration",kind:Kind.Property,flags,type,children,signatures});
const param=(name,type,optional=false)=>({id:2,name,variant:"param",kind:Kind.Parameter,flags:{...flags,isOptional:optional},type});
const signature=(parameters,type)=>({id:3,name:"__call",variant:"signature",kind:Kind.CallSignature,parameters,type});
const clean=x=>JSON.parse(JSON.stringify(x));const decode=Schema.decodeUnknownSync(TypeDocItem);const tracked=new Set(["parameters","children","signatures","typeArguments"]);
function instrument(v,trace,path="root"){if(v===null||typeof v!=="object")return v;if(Option.isOption(v))return Option.isSome(v)?Option.some(instrument(v.value,trace,path+".value")):Option.none();if(Array.isArray(v))return v.map((x,i)=>instrument(x,trace,path+"["+i+"]"));const out={};for(const [k,x] of Object.entries(v)){const value=instrument(x,trace,path+"."+k);if(tracked.has(k))Object.defineProperty(out,k,{enumerable:true,configurable:true,get(){trace.push(path+"."+k);return value}});else out[k]=value}return out}
function namedMap(model,mode){const out=new Map();let i=0;function walk(v){if(v===null||typeof v!=="object")return;if(Option.isOption(v)){if(Option.isSome(v))walk(v.value);return}if(Array.isArray(v)){for(const x of v)walk(x);return}if(v.type==="reflection"&&Option.isSome(v.declaration)&&Option.isSome(v.declaration.value.children)&&v.declaration.value.children.value.length){const children=v.declaration.value.children.value;if(mode===1||mode===2&&i%2===0)out.set(O.reflectionFingerprint(children),"Qualified.Model"+i);i++}for(const x of Object.values(v))walk(x)}walk(model);out.set("__unrelated__","Unrelated.Type");return out}
let models=0,calls=0,getterReads=0;const seenKinds=new Set();
const kindNames=new Set(["intrinsic","literal","reference","array","rest","tuple","union","intersection","reflection","typeOperator","mapped","conditional","indexedAccess","query","templateLiteral","inferred","predicate","unknown"]);
function census(v){if(v===null||typeof v!=="object")return;if(typeof v.type==="string"&&kindNames.has(v.type))seenKinds.add(v.type);for(const x of Object.values(v))if(Array.isArray(x))x.forEach(census);else census(x)}
function execute(mod,encoded,depth,names){const trace=[],model=instrument(decode(encoded),trace);const values=[mod.typeToString(model.type,depth,names),mod.typeDefFromChildren(model.children,names)];calls+=2;values.push(Option.isSome(model.children)?(calls++,mod.reflectionFingerprint(model.children.value)):null);getterReads+=trace.length;return {values,trace}}
function compare(input){const encoded=clean(input.root),snapshot=JSON.stringify(encoded),names=namedMap(decode(encoded),input.mapMode);census(encoded);const original=execute(O,encoded,input.depth,names),legacy=execute(L,encoded,input.depth,names),native=execute(N,encoded,input.depth,names);assert.deepEqual(legacy.values,original.values);assert.deepEqual(native.values,original.values);assert.deepEqual(legacy.trace,original.trace);assert.deepEqual(native.trace,original.trace);assert.equal(JSON.stringify(encoded),snapshot);models++}
if(process.argv.includes("--mutant")){const M=await import("./.helper-output/mutant/typeToString.js");assert.deepEqual(M.typeDefFromChildren(Option.none()),O.typeDefFromChildren(Option.none()));throw Error("typed wrong-empty-alias mutant was not rejected")}
const str=fc.string({maxLength:14}),opt=a=>fc.option(a,{nil:undefined});
const leaf=fc.oneof(fc.record({type:fc.constant("intrinsic"),name:fc.constantFrom("string","number","boolean","unknown","never","void")}),fc.record({type:fc.constant("literal"),value:fc.oneof(str,fc.integer(),fc.boolean(),fc.constant(null))}),fc.record({type:fc.constant("reference"),name:str}),fc.record({type:fc.constant("inferred"),name:str}),fc.constant({type:"predicate"}),fc.constant({type:"unknown"}));
const paramArb=inner=>fc.tuple(str,opt(inner),fc.boolean()).map(([name,type,optional])=>param(name,type,optional));
const sigArb=inner=>fc.tuple(opt(fc.array(paramArb(inner),{maxLength:3})),opt(inner)).map(([parameters,type])=>signature(parameters,type));
const simpleItem=inner=>fc.tuple(str,opt(inner)).map(([name,type])=>item(name,type));
const itemArb=inner=>fc.tuple(str,opt(inner),opt(fc.array(simpleItem(inner),{maxLength:2})),opt(fc.array(sigArb(inner),{maxLength:2}))).map(([name,type,children,signatures])=>item(name,type,children,signatures));
function level(inner){return fc.oneof(leaf,fc.record({type:fc.constant("reference"),name:str,typeArguments:opt(fc.array(inner,{maxLength:3})),target:opt(fc.oneof(fc.integer({min:0,max:100}),fc.record({packageName:str,packagePath:fc.constantFrom("/effect/Schema.ts","/project/Model.ts"),qualifiedName:str})))}),fc.record({type:fc.constantFrom("array","rest"),elementType:inner}),fc.record({type:fc.constant("tuple"),elements:fc.array(inner,{maxLength:3})}),fc.record({type:fc.constantFrom("union","intersection"),types:fc.array(inner,{maxLength:3})}),fc.record({type:fc.constant("reflection"),declaration:opt(itemArb(inner))}),fc.record({type:fc.constant("typeOperator"),operator:fc.constantFrom("keyof","readonly","unique"),target:inner}),fc.record({type:fc.constant("mapped"),parameter:str,parameterType:inner,templateType:inner,readonlyModifier:opt(fc.constantFrom("+","-"))}),fc.record({type:fc.constant("conditional"),checkType:inner,extendsType:inner,trueType:inner,falseType:inner}),fc.record({type:fc.constant("indexedAccess"),objectType:inner,indexType:inner}),fc.record({type:fc.constant("query"),queryType:inner}),fc.record({type:fc.constant("templateLiteral"),head:str,tail:fc.array(fc.tuple(inner,str),{maxLength:3})}))}
const one=level(leaf),two=level(one);
const modelArb=fc.tuple(opt(two),opt(fc.array(itemArb(one),{maxLength:3})),fc.integer({min:0,max:3}),fc.integer({min:0,max:2})).map(([type,children,depth,mapMode])=>({root:item("Root",type,children),depth,mapMode}));
const text={type:"intrinsic",name:"string"},num={type:"intrinsic",name:"number"};
const reflection=(children,signatures)=>({type:"reflection",declaration:item("Shape",undefined,children,signatures)});
const types=[text,{type:"literal",value:"a"},{type:"literal",value:{keys:["x","y"],n:1}},{type:"reference",name:"Box"},{type:"reference",name:"Box",typeArguments:[]},{type:"reference",name:"Box",typeArguments:[text,num]},{type:"array",elementType:text},{type:"rest",elementType:text},{type:"tuple",elements:[]},{type:"tuple",elements:[text,num]},{type:"union",types:[text,num]},{type:"intersection",types:[text,num]},{type:"reflection"},reflection([],undefined),reflection([item("alpha",text),item("beta",num)],undefined),reflection(undefined,[signature(undefined,text)]),reflection(undefined,[signature([],num)]),reflection(undefined,[signature([param("a",text,true),param("b",num)],text)]),{type:"typeOperator",operator:"keyof",target:text},{type:"mapped",parameter:"K",parameterType:text,templateType:num,readonlyModifier:"+"},{type:"conditional",checkType:text,extendsType:num,trueType:text,falseType:num},{type:"indexedAccess",objectType:text,indexType:num},{type:"query",queryType:text},{type:"templateLiteral",head:"prefix",tail:[[text,"/"],[num,"suffix"]]},{type:"inferred",name:"A"},{type:"predicate"},{type:"unknown"}];
const fixed=[{root:item("Empty"),depth:0,mapMode:0},...types.map((type,i)=>({root:item("Root",type,i%2?[]:[item("child",type)]),depth:i%3,mapMode:i%3}))];
fs.writeFileSync(new URL("./foldkit-type-helper-native-choices-corpus.json",import.meta.url),JSON.stringify(fixed,null,2)+"\n");
for(const model of fixed)compare(model);
fc.assert(fc.property(modelArb,compare),{seed:5311380,numRuns:1000});
const getterModel=clean(item("OnlyType",reflection(undefined,[signature([param("a",text)],text)])));
const getterCounts=[];
for(const mod of [O,L,N]){const trace=[],model=instrument(decode(getterModel),trace);mod.typeToString(model.type,0,new Map());calls++;const n=trace.filter(x=>x.endsWith(".parameters")).length;assert.equal(n,1);getterCounts.push(n)}
console.log("TYPE_HELPER_PROPERTY "+JSON.stringify({propertyRuns:1,generatedModels:1000,fixedModels:fixed.length,comparedModels:models,actualFormatterCalls:calls,getterReads,seed:5311380,typeKinds:[...seenKinds].sort(),exactLegacyAndNativeOutputs:true,exactGetterTraces:true,parameterSubjectGetterCounts:getterCounts,allInputsDecodedByRealTypeDocCodec:true}));
`
