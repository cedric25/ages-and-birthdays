import dayjs from 'dayjs'
import { YEAR_FOR_NO_YEAR } from '@/constants/constants'

export function computeAge(
  today: Date,
  dateOfBirth: Date
): {
  value: number
  unit: 'years' | 'months' | null
} | null {
  if (dateOfBirth.getFullYear() === YEAR_FOR_NO_YEAR) {
    return null
  }
  const diffYears = dayjs(today)
    .startOf('day')
    .diff(dayjs(dateOfBirth).startOf('day'), 'years')
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
