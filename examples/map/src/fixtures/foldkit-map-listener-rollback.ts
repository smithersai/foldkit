export const registrationFailures: ReadonlyArray<
  readonly [stage: 'map' | 'container', failure: unknown]
> = [
  ['map', undefined],
  ['map', null],
  ['map', false],
  ['container', 'listener registration failed'],
  ['container', new Error('listener registration failed')],
  ['container', Object.freeze({ reason: 'closed' })],
]
