import { runRule, throwStmt } from 'effect-oxlint/testing'
import { describe, expect, it } from 'vitest'

import { nativeRule } from './corpus/foldkit-native-rule-create.vibe'

describe('native VibeLang rule integration', () => {
  it('runs native setup and visitor callbacks through the plugin boundary', () => {
    const diagnostics = runRule(nativeRule, 'ThrowStatement', throwStmt())
    expect(diagnostics).toHaveLength(1)
    expect(diagnostics[0]?.diagnostic.message).toBe('native Foldkit callback')
  })
})
