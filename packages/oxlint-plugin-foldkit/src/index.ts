import { Plugin } from 'effect-oxlint'

import { acquireReleaseConstructsInAcquireBody } from '#native/rules/acquire-release-constructs-in-acquire-body'
import { commandBindingMatchesName } from '#native/rules/command-binding-matches-name'
import { commandDefinePascalConst } from '#native/rules/command-define-pascal-const'
import { gotPrefixRequiresSubmodelPayload } from '#native/rules/got-prefix-requires-submodel-payload'
import { gotSubmodelMessageName } from '#native/rules/got-submodel-message-name'
import { gotWrapperCarriesOnlyRouting } from '#native/rules/got-wrapper-carries-only-routing'
import { keyedRequiredForMappedRows } from '#native/rules/keyed-required-for-mapped-rows'
import { lazyViewStableReferences } from '#native/rules/lazy-view-stable-references'
import { mountFactoryMustUseElement } from '#native/rules/mount-factory-must-use-element'
import { noArrayIndexViewKeys } from '#native/rules/no-array-index-view-keys'
import { noChildMessageConstructionInRoot } from '#native/rules/no-child-message-construction-in-root'
import { noDirectSubmodelStateUpdate } from '#native/rules/no-direct-submodel-state-update'
import { noDisablingDevGuardrails } from '#native/rules/no-disabling-dev-guardrails'
import { noDuplicateOnmountPerElement } from '#native/rules/no-duplicate-onmount-per-element'
import { noEmptyChildrenArray } from '#native/rules/no-empty-children-array'
import { noEmptyCommandsArray } from '#native/rules/no-empty-commands-array'
import { noEmptyObjectTaggedCall } from '#native/rules/no-empty-object-tagged-call'
import { noEmptyToParentOutMessage } from '#native/rules/no-empty-to-parent-out-message'
import { noHandRolledCommandStruct } from '#native/rules/no-hand-rolled-command-struct'
import { noHardcodedRouteStrings } from '#native/rules/no-hardcoded-route-strings'
import { noImpureCallAtDecisionTime } from '#native/rules/no-impure-call-at-decision-time'
import { noModuleLevelMutableState } from '#native/rules/no-module-level-mutable-state'
import { noNonportableServerGlobals } from '#native/rules/no-nonportable-server-globals'
import { noNoopMessage } from '#native/rules/no-noop-message'
import { noPreventDefaultInStreamOperator } from '#native/rules/no-prevent-default-in-stream-operator'
import { noRawDomEventAttributes } from '#native/rules/no-raw-dom-event-attributes'
import { noRouteQueryConstructorDefault } from '#native/rules/no-route-query-constructor-default'
import { noSpreadInModifyFields } from '#native/rules/no-spread-in-modify-fields'
import { noSwitchOnMessageTag } from '#native/rules/no-switch-on-message-tag'
import { preferCallableMessageConstructor } from '#native/rules/prefer-callable-message-constructor'
import { preferCommandMapmessage } from '#native/rules/prefer-command-mapmessage'
import { preferEffectModuleNames } from '#native/rules/prefer-effect-module-names'
import { preferOptionOverNullableInModel } from '#native/rules/prefer-option-over-nullable-in-model'
import { requireFoldForChildUpdateResult } from '#native/rules/require-fold-for-child-update-result'
import { requireRelForExternalLink } from '#native/rules/require-rel-for-external-link'
import { selectionSubmodelFactoryAtModuleScope } from '#native/rules/selection-submodel-factory-at-module-scope'
import { wrapChildOutputInGotMessage } from '#native/rules/wrap-child-output-in-got-message'

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
