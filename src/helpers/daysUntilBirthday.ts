import dayjs from 'dayjs'

export function daysUntilBirthday(birthday: Date): number {
  const today = dayjs().startOf('day')
  let nextBirthday = dayjs(birthday).year(dayjs().year())
  if (nextBirthday.isBefore(today)) {
    nextBirthday = nextBirthday.add(1, 'year')
  }
  return nextBirthday.diff(today, 'days')
}
