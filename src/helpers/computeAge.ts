import dayjs from 'dayjs'

export function computeAge(
  today: Date,
  dateOfBirth: Date
): {
  value: number
  unit: 'years' | 'months' | null
} | null {
  if (dateOfBirth.getFullYear() === 1900) {
    return null
  }
  const diffYears = dayjs(today).diff(dateOfBirth, 'years')
  if (diffYears > 0) {
    return {
      value: diffYears,
      unit: 'years',
    }
  }
  const diffMonths = dayjs(today).diff(dateOfBirth, 'months')
  return {
    value: diffMonths,
    unit: 'months',
  }
}
