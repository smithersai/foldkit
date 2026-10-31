import { Plugin } from 'effect-oxlint'

import { acquireReleaseConstructsInAcquireBody } from './rules/acquire-release-constructs-in-acquire-body.vibe'
import { commandBindingMatchesName } from './rules/command-binding-matches-name.vibe'
import { commandDefinePascalConst } from './rules/command-define-pascal-const.vibe'
import { gotPrefixRequiresSubmodelPayload } from './rules/got-prefix-requires-submodel-payload.vibe'
import { gotSubmodelMessageName } from './rules/got-submodel-message-name.vibe'
import { gotWrapperCarriesOnlyRouting } from './rules/got-wrapper-carries-only-routing.vibe'
import { keyedRequiredForMappedRows } from './rules/keyed-required-for-mapped-rows.vibe'
import { lazyViewStableReferences } from './rules/lazy-view-stable-references.vibe'
import { mountFactoryMustUseElement } from './rules/mount-factory-must-use-element.vibe'
import { noArrayIndexViewKeys } from './rules/no-array-index-view-keys.vibe'
import { noChildMessageConstructionInRoot } from './rules/no-child-message-construction-in-root.vibe'
import { noDirectSubmodelStateUpdate } from './rules/no-direct-submodel-state-update.vibe'
import { noDisablingDevGuardrails } from './rules/no-disabling-dev-guardrails.vibe'
import { noDuplicateOnmountPerElement } from './rules/no-duplicate-onmount-per-element.vibe'
import { noEmptyChildrenArray } from './rules/no-empty-children-array.vibe'
import { noEmptyCommandsArray } from './rules/no-empty-commands-array.vibe'
import { noEmptyObjectTaggedCall } from './rules/no-empty-object-tagged-call.vibe'
import { noEmptyToParentOutMessage } from './rules/no-empty-to-parent-out-message.vibe'
import { noHandRolledCommandStruct } from './rules/no-hand-rolled-command-struct.vibe'
import { noHardcodedRouteStrings } from './rules/no-hardcoded-route-strings.vibe'
import { noImpureCallAtDecisionTime } from './rules/no-impure-call-at-decision-time.vibe'
import { noModuleLevelMutableState } from './rules/no-module-level-mutable-state.vibe'
import { noNonportableServerGlobals } from './rules/no-nonportable-server-globals.vibe'
import { noNoopMessage } from './rules/no-noop-message.vibe'
import { noPreventDefaultInStreamOperator } from './rules/no-prevent-default-in-stream-operator.vibe'
import { noRawDomEventAttributes } from './rules/no-raw-dom-event-attributes.vibe'
import { noRouteQueryConstructorDefault } from './rules/no-route-query-constructor-default.vibe'
import { noSpreadInModifyFields } from './rules/no-spread-in-modify-fields.vibe'
import { noSwitchOnMessageTag } from './rules/no-switch-on-message-tag.vibe'
import { preferCallableMessageConstructor } from './rules/prefer-callable-message-constructor.vibe'
import { preferCommandMapmessage } from './rules/prefer-command-mapmessage.vibe'
import { preferEffectModuleNames } from './rules/prefer-effect-module-names.vibe'
import { preferOptionOverNullableInModel } from './rules/prefer-option-over-nullable-in-model.vibe'
import { requireFoldForChildUpdateResult } from './rules/require-fold-for-child-update-result.vibe'
import { requireRelForExternalLink } from './rules/require-rel-for-external-link.vibe'
import { selectionSubmodelFactoryAtModuleScope } from './rules/selection-submodel-factory-at-module-scope.vibe'
import { wrapChildOutputInGotMessage } from './rules/wrap-child-output-in-got-message.vibe'

const basePlugin = Plugin.define({
  name: 'foldkit',
  specifier: '@foldkit/oxlint-plugin',
  rules: {
    'acquire-release-constructs-in-acquire-body':
      acquireReleaseConstructsInAcquireBody,
    'command-binding-matches-name': commandBindingMatchesName,
    'command-define-pascal-const': commandDefinePascalConst,
    'got-prefix-requires-submodel-payload': gotPrefixRequiresSubmodelPayload,
    'got-submodel-message-name': gotSubmodelMessageName,
    'got-wrapper-carries-only-routing': gotWrapperCarriesOnlyRouting,
    'keyed-required-for-mapped-rows': keyedRequiredForMappedRows,
    'lazy-view-stable-references': lazyViewStableReferences,
    'mount-factory-must-use-element': mountFactoryMustUseElement,
    'no-array-index-view-keys': noArrayIndexViewKeys,
    'no-child-message-construction-in-root': noChildMessageConstructionInRoot,
    'no-direct-submodel-state-update': noDirectSubmodelStateUpdate,
    'no-disabling-dev-guardrails': noDisablingDevGuardrails,
    'no-duplicate-onmount-per-element': noDuplicateOnmountPerElement,
    'no-empty-children-array': noEmptyChildrenArray,
    'no-empty-commands-array': noEmptyCommandsArray,
    'no-empty-to-parent-out-message': noEmptyToParentOutMessage,
    'no-empty-object-tagged-call': noEmptyObjectTaggedCall,
    'no-hand-rolled-command-struct': noHandRolledCommandStruct,
    'no-hardcoded-route-strings': noHardcodedRouteStrings,
    'no-impure-call-at-decision-time': noImpureCallAtDecisionTime,
    'no-module-level-mutable-state': noModuleLevelMutableState,
    'no-nonportable-server-globals': noNonportableServerGlobals,
    'no-noop-message': noNoopMessage,
    'no-prevent-default-in-stream-operator': noPreventDefaultInStreamOperator,
    'no-raw-dom-event-attributes': noRawDomEventAttributes,
    'no-route-query-constructor-default': noRouteQueryConstructorDefault,
    'no-spread-in-modify-fields': noSpreadInModifyFields,
    'no-switch-on-message-tag': noSwitchOnMessageTag,
    'prefer-callable-message-constructor': preferCallableMessageConstructor,
    'prefer-command-mapmessage': preferCommandMapmessage,
    'prefer-effect-module-names': preferEffectModuleNames,
    'prefer-option-over-nullable-in-model': preferOptionOverNullableInModel,
    'require-fold-for-child-update-result': requireFoldForChildUpdateResult,
    'require-rel-for-external-link': requireRelForExternalLink,
    'selection-submodel-factory-at-module-scope':
      selectionSubmodelFactoryAtModuleScope,
    'wrap-child-output-in-got-message': wrapChildOutputInGotMessage,
  },
})

type Override = Readonly<{
  files: Array<string>
  excludeFiles?: Array<string>
  rules: Record<string, Plugin.RuleSeverity>
}>

type OverriddenConfig = Plugin.OxlintConfig & {
  overrides: Array<Override>
}

const testFilePatterns = [
  '**/*.test.ts',
  '**/*.test.tsx',
  '**/*.spec.ts',
  '**/*.spec.tsx',
]

const serverFilePatterns = [
  '**/entry.server.ts',
  '**/entry.server.tsx',
  '**/server/**/*.ts',
  '**/server/**/*.tsx',
  '**/prerender.ts',
  '**/prerender.tsx',
]

const entryFilePatterns = [
  '**/entry.ts',
  '**/entry.tsx',
  '**/entry.client.ts',
  '**/entry.client.tsx',
  '**/entry.server.ts',
  '**/entry.server.tsx',
]

const decisionTimeRuleId = 'foldkit/no-impure-call-at-decision-time'

const serverOverride: Override = {
  files: serverFilePatterns,
  excludeFiles: testFilePatterns,
  rules: {
    'foldkit/no-nonportable-server-globals': 'error',
    [decisionTimeRuleId]: 'off',
  },
}

const entryOverride: Override = {
  files: entryFilePatterns,
  excludeFiles: testFilePatterns,
  rules: {
    [decisionTimeRuleId]: 'off',
  },
}

const rulesApplicableToTests = new Set([
  'foldkit/acquire-release-constructs-in-acquire-body',
  'foldkit/no-switch-on-message-tag',
  'foldkit/prefer-effect-module-names',
])

// Most Foldkit rules police application definitions. Tests exercise those
// definitions rather than write them, so those rules are inert at best and
// invert at worst (a test may legitimately hardcode a route or hand-roll a
// Command struct). Rules for syntax written directly in tests remain enabled.
const testOverride = (config: Plugin.OxlintConfig): Override => ({
  files: testFilePatterns,
  rules: Object.fromEntries(
    Object.keys(config.rules)
      .filter(id => !rulesApplicableToTests.has(id))
      .map((id): [string, Plugin.RuleSeverity] => [id, 'off']),
  ),
})

const withOverrides = (config: Plugin.OxlintConfig): OverriddenConfig => ({
  ...config,
  rules: {
    ...config.rules,
    'foldkit/no-nonportable-server-globals': 'off',
  },
  overrides: [serverOverride, entryOverride, testOverride(config)],
})

export default {
  ...basePlugin,
  configs: {
    recommended: withOverrides(basePlugin.configs.recommended),
    all: withOverrides(basePlugin.configs.all),
  },
}
