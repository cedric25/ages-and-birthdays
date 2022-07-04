import { Temporal } from '@js-temporal/polyfill'
import type { Person } from '@/@types/Person'
import type { DateOfBirth } from '@/@types/DateOfBirth'

// Ex: en-US
const clientLocale = navigator.language

export function formatDateForInput(date: DateOfBirth) {
  if (date instanceof Temporal.PlainDate) {
    // return date.toLocaleString(clientLocale, {
    //   month: '2-digit',
    //   day: '2-digit',
    //   year: 'numeric',
    // })
    // If <input type="date">
    return date.toString()
  }

  // PlainMonthDay
  return date.toLocaleString(clientLocale, {
    calendar: date.calendar,
    month: '2-digit',
    day: '2-digit',
  })
}

export function formatDateForDisplay(date: Person['birthday']) {
  if (date instanceof Temporal.PlainDate) {
    return date.toLocaleString(clientLocale, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  // PlainMonthDay
  return date.toLocaleString(clientLocale, {
    calendar: date.calendar,
    month: 'short',
    day: 'numeric',
  })
}
