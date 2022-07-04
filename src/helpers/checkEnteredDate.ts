import { Temporal } from '@js-temporal/polyfill'

export function checkEnteredDate(enteredDate: string): string | false {
  console.log('enteredDate', enteredDate)
  if (!enteredDate.trim()) {
    return false
  }
  try {
    // 1992-07-22
    Temporal.PlainDate.from(enteredDate)
    return enteredDate
  } catch {}
  try {
    // 07-22
    Temporal.PlainMonthDay.from(enteredDate)
    return enteredDate
  } catch {}
  // try {
  //   // 1992-07
  //   Temporal.PlainMonthDay.from(enteredDate)
  //   return enteredDate
  // } catch {}
  return false
}
