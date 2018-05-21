import differenceInYears from 'date-fns/difference_in_years'
import differenceInMonths from 'date-fns/difference_in_months'

export function computeAge(today, dateOfBirth) {
  return differenceInYears(today, dateOfBirth)
}

export function computeAgeMonths(today, dateOfBirth) {
  return differenceInMonths(today, dateOfBirth)
}
