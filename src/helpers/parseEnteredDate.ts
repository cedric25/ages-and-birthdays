import { Temporal } from '@js-temporal/polyfill'

export function parseEnteredDate(
  enteredDate: string
): Temporal.PlainDate | Temporal.PlainMonthDay | false {
  if (!enteredDate.trim()) {
    return false
  }
  try {
    // 1992-07-22
    return Temporal.PlainDate.from(enteredDate)
  } catch {}
  try {
    // 07-22
    return Temporal.PlainMonthDay.from(enteredDate)
  } catch {}
  // try {
  //   // 1992-07
  //   Temporal.PlainMonthDay.from(enteredDate)
  //   return enteredDate
  // } catch {}
  return false
}
