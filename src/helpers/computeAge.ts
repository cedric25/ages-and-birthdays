import { Temporal } from '@js-temporal/polyfill'
import type { Person } from '@/@types/Person'

export function computeAge(
  today: Date,
  dateOfBirth: Person['birthday']
): {
  value: number
  unit: 'years' | 'months' | null
} | null {
  if (!(dateOfBirth instanceof Temporal.PlainDate)) {
    return null
  }

  const todayPlainDate = today
    .toTemporalInstant()
    .toZonedDateTimeISO(Temporal.Now.timeZone())
    .toPlainDate()
  const diff = dateOfBirth.until(todayPlainDate, {
    largestUnit: 'year',
  })

  if (diff.years === 0) {
    return {
      value: diff.months,
      unit: 'months',
    }
  }
  return {
    value: diff.years,
    unit: 'years',
  }
}
