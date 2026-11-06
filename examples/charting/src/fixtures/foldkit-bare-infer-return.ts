export const inferenceCases = [
  'const identity = <A>(value: A) => value',
  'const sum = (value: number = 0) => value + 1',
  'const curried = (left: number) => (right: number) => left + right',
  'const destruct = ({ value }: { value: number }) => value',
  'const values = items.map((item) => item.value)',
]
