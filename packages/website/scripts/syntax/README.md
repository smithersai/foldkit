# VibeLang grammar

`VibeLang.tmLanguage.json` is an unchanged copy of
`editors/vscode/syntaxes/VibeLang.tmLanguage.json` from the VibeLang repository
at `7f7f6bc956bd`, matching this migration's compiler. The VibeLang website
uses the same grammar with Shiki.

Update this asset from that canonical source when upgrading the compiler;
do not edit the generated grammar here. `nativeHighlight.ts` registers its
`vibe` name and `vibelang` alias through Shiki's public API.

`NOTICE` retains the TypeScript grammar's upstream MIT license.
`LICENSE.VIBELANG` retains the license for VibeLang's additions.
