import type { Age } from '@/@types/Age'

const IS_BABY_BEFORE_AGE_IN_YEARS = 3

export function isBaby(age: Age) {
  return age.unit === 'months' || age.value < IS_BABY_BEFORE_AGE_IN_YEARS
}
