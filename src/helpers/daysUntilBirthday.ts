import differenceInCalendarDays from 'date-fns/differenceInCalendarDays'

export function daysUntilBirthday(birthday: Date): number {
  const today = new Date()
  let nextBirthday = new Date(birthday.getTime())
  nextBirthday.setFullYear(today.getFullYear())
  if (
    isDayMonthLater(
      { day1: nextBirthday.getDate(), month1: nextBirthday.getMonth() },
      { day2: today.getDate(), month2: today.getMonth() }
    )
  ) {
    nextBirthday.setFullYear(today.getFullYear())
    return differenceInCalendarDays(nextBirthday, today.getTime())
  }
  nextBirthday.setFullYear(today.getFullYear() + 1)
  return differenceInCalendarDays(nextBirthday, today.getTime())
}

function isDayMonthLater(
  { day1, month1 }: { day1: number; month1: number },
  { day2, month2 }: { day2: number; month2: number }
) {
  return month1 > month2 || (month1 === month2 && day1 >= day2)
}
