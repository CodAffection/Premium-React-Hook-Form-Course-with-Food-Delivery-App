export const roundTo2DecimalPoint = (value: number) =>
  Math.round((value + Number.EPSILON) * 100) / 100