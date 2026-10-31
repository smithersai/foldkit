import { Array, Option, Schema } from 'effect';
import { type Rule, type RuleMessage } from './rule.vibe';
/** The `NotValidated` state: user hasn't interacted yet. */
export type NotValidated<A> = Readonly<{
    _tag: 'NotValidated';
    value: A;
}>;
/** The `Validating` state: async validation is in flight. */
export type Validating<A> = Readonly<{
    _tag: 'Validating';
    value: A;
}>;
/** The `Valid` state: every rule passed. */
export type Valid<A> = Readonly<{
    _tag: 'Valid';
    value: A;
}>;
/** The `Invalid` state: one or more rules failed. Carries a non-empty `errors` array. */
export type Invalid<A> = Readonly<{
    _tag: 'Invalid';
    value: A;
    errors: Array.NonEmptyReadonlyArray<string>;
}>;
/** The four-state union that represents a field's value in the Model. */
export type Field<A> = NotValidated<A> | Validating<A> | Valid<A> | Invalid<A>;
/** Constructs a `NotValidated` state. */
export declare const NotValidated: <A>(field: Readonly<{
    value: A;
}>) => NotValidated<A>;
/** Constructs a `Validating` state. */
export declare const Validating: <A>(field: Readonly<{
    value: A;
}>) => Validating<A>;
/** Constructs a `Valid` state. */
export declare const Valid: <A>(field: Readonly<{
    value: A;
}>) => Valid<A>;
/** Constructs an `Invalid` state. */
export declare const Invalid: <A>(field: Readonly<{
    value: A;
    errors: Array.NonEmptyReadonlyArray<string>;
}>) => Invalid<A>;
/** Builds the four-state `Field` Schema for a value of the given Schema. Put the
 *  result in your Model. The value Schema should match what the control
 *  actually holds as the user edits, not the type you parse it into:
 *  `Field(Schema.String)` for text inputs, `Field(Schema.Array(Schema.String))` for a
 *  multi-select. A scalar like a checkbox's boolean usually stays plain
 *  `Schema.Boolean` in the Model; wrap it in `Field` only when it needs the
 *  validation lifecycle. Validation rules stay separate, in a `makeRules`
 *  bundle. */
export declare const Field: <A, I>(valueSchema: Schema.Codec<A, I>) => Schema.Union<readonly [Schema.TaggedStruct<"NotValidated", {
    readonly value: Schema.Codec<A, I, never, never>;
}>, Schema.TaggedStruct<"Validating", {
    readonly value: Schema.Codec<A, I, never, never>;
}>, Schema.TaggedStruct<"Valid", {
    readonly value: Schema.Codec<A, I, never, never>;
}>, Schema.TaggedStruct<"Invalid", {
    readonly value: Schema.Codec<A, I, never, never>;
    readonly errors: Schema.NonEmptyArray<Schema.String>;
}>]>;
/** A field's validation rules: the required message (if any), the list of rules,
 *  and an empty predicate. Produced by `makeRules`; consumed by the module's
 *  operations (`validate`, `validateAll`, `isValid`, `isRequired`). The fields
 *  are accessible but treating them as stable is discouraged. Prefer the
 *  operations so internal shape changes don't break callers. */
export type Rules<A> = Readonly<{
    requiredMessage: Option.Option<RuleMessage<A>>;
    rules: ReadonlyArray<Rule<A>>;
    isEmpty: (value: A) => boolean;
}>;
/** Options accepted by `makeRules`. */
export type MakeRulesOptions<A> = Readonly<{
    /** When present, the field is required: empty values become `Invalid`
     *  with the given message, and `isValid` requires `Valid`. Absent
     *  means the field is optional: empty values stay `NotValidated`, and
     *  `isValid` accepts `Valid` or `NotValidated`. */
    required?: RuleMessage<A>;
    rules?: ReadonlyArray<Rule<A>>;
    /** Predicate for what counts as "empty" for this field. Defaults to empty
     *  string and empty array; every other value is treated as present. Pass
     *  `(value) => value.trim() === ''` to treat whitespace-only input as empty. */
    isEmpty?: (value: A) => boolean;
}>;
/** Creates a `Rules` bundle from options. The value type defaults to `string`;
 *  for other field values, annotate it: `makeRules<ReadonlyArray<Tag>>({ ... })`. */
export declare const makeRules: <A = string>(options?: MakeRulesOptions<A>) => Rules<A>;
/** Handles every field state. `onNotValidated`, `onValidating`, and `onValid`
 *  each receive the state's `value`; `onInvalid` alone receives the whole
 *  `{ value, errors }` payload object because `Invalid` carries two fields.
 *  Data-first with the field, or data-last for pipelines.
 *
 *  @example
 *  ```typescript
 *  FieldValidation.match(model.email, {
 *    onNotValidated: () => 'Not checked yet',
 *    onValidating: value => `Checking ${value}...`,
 *    onValid: () => 'Looks good',
 *    onInvalid: ({ errors }) => errors.join(', '),
 *  })
 *  ```
 */
export declare const match: {
    <A, B, C = B, D = B, F = B>(handlers: Readonly<{
        onNotValidated: (value: A) => B;
        onValidating: (value: A) => C;
        onValid: (value: A) => D;
        onInvalid: (payload: Readonly<{
            value: A;
            errors: Array.NonEmptyReadonlyArray<string>;
        }>) => F;
    }>): (self: Field<A>) => B | C | D | F;
    <A, B, C = B, D = B, F = B>(self: Field<A>, handlers: Readonly<{
        onNotValidated: (value: A) => B;
        onValidating: (value: A) => C;
        onValid: (value: A) => D;
        onInvalid: (payload: Readonly<{
            value: A;
            errors: Array.NonEmptyReadonlyArray<string>;
        }>) => F;
    }>): B | C | D | F;
};
/** Validates a new value and returns the next field state.
 *
 *  For required fields, an empty value produces `Invalid` with the
 *  required message. For optional fields, an empty value produces
 *  `NotValidated`. Non-empty values run through the field's rules;
 *  the first failure becomes `Invalid`, otherwise the result is `Valid`. */
export declare const validate: <A>(rules: Rules<A>) => (value: A) => Field<A>;
/** Like `validate` but collects every failing rule into the
 *  `Invalid` state's errors array instead of stopping at the first. */
export declare const validateAll: <A>(rules: Rules<A>) => (value: A) => Field<A>;
/** Returns true when the field's current state is acceptable given its
 *  rules. For required fields, only `Valid` returns `true`. For optional
 *  fields, `Valid` or `NotValidated` both return `true`. `Invalid` and
 *  `Validating` always return `false`.
 *
 *  The name is distinct from the `Valid` tag on purpose: `isValid`
 *  answers "is this state an acceptable result?", which for an optional
 *  field is broader than `_tag === 'Valid'`. For pattern-matching on the
 *  state itself, check the `_tag` directly. */
export declare const isValid: <A>(rules: Rules<A>) => (state: Field<A>) => boolean;
/** Returns true when the rules mark the field as required. Useful for
 *  rendering affordances like a `*` next to required field labels. */
export declare const isRequired: <A>(rules: Rules<A>) => boolean;
/** Returns true when the state's tag is `Invalid`. Tag-only predicate;
 *  unlike `!isValid(rules)(state)`, this does not treat `NotValidated`
 *  or `Validating` as errors. Use for "has the user seen a rule failure
 *  on this field?" affordances like red borders or per-step error
 *  indicators. */
export declare const isInvalid: (state: Field<unknown>) => boolean;
/** Returns true when every field is acceptable per its rules, by `isValid`.
 *  Each pair is a field's `[state, rules]`. The pairs in one call share a
 *  value type, so a call gates fields of a single type; for a form that mixes
 *  types, call `allValid` once per type and combine the results with `&&`.
 *  Use for form-level submit gates. */
export declare const allValid: <A>(pairs: ReadonlyArray<readonly [Field<A>, Rules<A>]>) => boolean;
/** Returns true when any state in the input has tag `Invalid`. Use for
 *  "this step/section has errors" affordances, independent of rules. */
export declare const anyInvalid: (states: ReadonlyArray<Field<unknown>>) => boolean;
