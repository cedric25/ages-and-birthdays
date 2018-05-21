import differenceInYears from 'date-fns/difference_in_years'
import differenceInMonths from 'date-fns/difference_in_months'

export function computeAge(today, dateOfBirth) {
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
