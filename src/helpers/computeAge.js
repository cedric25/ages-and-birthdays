import { differenceInYears, differenceInMonths } from 'date-fns'

export function computeAge(today, dateOfBirth) {
  if (dateOfBirth.getFullYear() === 1900) {
    return {
      value: null,
      unit: '',
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
