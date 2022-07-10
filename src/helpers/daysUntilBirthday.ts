import { Temporal } from '@js-temporal/polyfill'
import type { Person } from '@/@types/Person'

export function daysUntilBirthday(birthday: Person['birthday']): number | null {
  const today = Temporal.Now.instant()
  const todayPlainDate = today
    .toZonedDateTimeISO(Temporal.Now.timeZone())
    .toPlainDate()

  const thisYearBirthday = getThisYearBirthday(birthday)

  if (Temporal.PlainDate.compare(todayPlainDate, thisYearBirthday) > 0) {
    const nextYearBirthday = getNextYearBirthday(birthday)

    const diffUntilBirthdayThisYear = todayPlainDate.until(nextYearBirthday)
    return diffUntilBirthdayThisYear.days
  }

  const diffUntilBirthdayNextYear = todayPlainDate.until(thisYearBirthday)
  return diffUntilBirthdayNextYear.days
}

function getThisYearBirthday(birthday: Person['birthday']) {
  if (birthday instanceof Temporal.PlainDate) {
    return birthday.with({ year: new Date().getFullYear() })
  }
  // if (birthday instanceof Temporal.PlainMonthDay) {
  return birthday.toPlainDate({ year: new Date().getFullYear() })
  // }
}

function getNextYearBirthday(birthday: Person['birthday']) {
  if (birthday instanceof Temporal.PlainDate) {
    return birthday.with({ year: new Date().getFullYear() + 1 })
  }
  // if (birthday instanceof Temporal.PlainMonthDay) {
  return birthday.toPlainDate({ year: new Date().getFullYear() + 1 })
  // }
}
