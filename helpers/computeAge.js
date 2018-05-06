import differenceInYears from 'date-fns/difference_in_years'

export default function computeAge(today, dateOfBirth) {
  return differenceInYears(today, dateOfBirth)
}
