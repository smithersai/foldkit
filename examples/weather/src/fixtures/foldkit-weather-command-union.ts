export const weatherCommandCases = [
  { zipCode: '90210', found: true, temperature: 72.4 },
  { zipCode: '00000', found: false, temperature: 0 },
  { zipCode: '01010', found: true, temperature: -17.5 },
] as const
