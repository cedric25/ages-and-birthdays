import dayjs from 'dayjs'

export function computeAge(today, dateOfBirth) {
  if (dateOfBirth.getFullYear() === 1900) {
    return {
      value: null,
      unit: null,
    }
  }
  const diffYears = dayjs().diff(dateOfBirth, 'years')
  if (diffYears > 0) {
    return {
      value: diffYears,
      unit: 'years',
    }
  }
  const diffMonths = dayjs().diff(dateOfBirth, 'months')
  return {
    value: diffMonths,
    unit: 'months',
  }
}
