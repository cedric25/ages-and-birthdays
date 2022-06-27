import differenceInYears from 'date-fns/differenceInYears'
import differenceInMonths from 'date-fns/differenceInMonths'

export function computeAge(today, dateOfBirth) {
  if (dateOfBirth.getFullYear() === 1900) {
    return {
      value: null,
      unit: null,
    }
  }
  const diffYears = differenceInYears(today, dateOfBirth)
  if (diffYears > 0) {
    return {
      value: diffYears,
      unit: 'years',
    }
  }
  const diffMonths = differenceInMonths(today, dateOfBirth)
  return {
    value: diffMonths,
    unit: 'months',
  }
}
