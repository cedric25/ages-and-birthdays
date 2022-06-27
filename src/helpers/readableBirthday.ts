import dayjs from 'dayjs'
import { YEAR_FOR_NO_YEAR } from '@/constants/constants'

export function getReadableBirthday(birthday: Date): string {
  if (birthday.getFullYear() === YEAR_FOR_NO_YEAR) {
    return dayjs(birthday).format('D MMM')
  }
  return dayjs(birthday).format('D MMM YYYY')
}
