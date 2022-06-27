import { YEAR_FOR_NO_YEAR } from '@/constants/constants'
import { computeAge } from '@/helpers/computeAge'

export function getReadableAge(birthday: Date): string | null {
  if (birthday.getFullYear() === YEAR_FOR_NO_YEAR) {
    return null
  }
  const age = computeAge(new Date(), birthday) as {
    value: number
    unit: 'years' | 'months' | null
  }
  if (age.value === 0) {
    return 'New born!'
  }
  if (age.unit === 'years') {
    return `${age.value}y old`
  }
  if (age.unit === 'months') {
    if (age.value === 1) {
      return '1 month old'
    }
    return `${age.value} months old`
  }
  return null
}
