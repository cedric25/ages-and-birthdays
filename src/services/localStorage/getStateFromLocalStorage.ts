import { Temporal } from '@js-temporal/polyfill'
import type { Person } from '@/@types/Person'
import { useAppStore } from '@/store/app/app.store'
import * as localStorageHelper from './localStorageHelper.js'

export function getStateFromLocalStorage() {
  const importantPersonsJson = localStorageHelper.getPersons()
  const groups = localStorageHelper.getGroups()
  const appStore = useAppStore()
  if (importantPersonsJson) {
    const importantPersons = JSON.parse(importantPersonsJson)
    const persons: Person[] = []
    for (const person of importantPersons) {
      persons.push({
        ...person,
        // TEMP (before having '1992-07-22' or '07-22' in DB
        // Convert UTC ISO date strings to Temporal
        birthday: getDateOfBirthAsTemporal(person.birthday),
      })
    }
    appStore.setAllPersons(persons)
  }
  if (groups) {
    appStore.setAllGroups(JSON.parse(groups))
  }
}

// Input example: 1960-02-03T00:00:00.000Z
function getDateOfBirthAsTemporal(utcIsoDateString: string) {
  const date = new Date(utcIsoDateString)
  if (date.getFullYear() === 1896) {
    return Temporal.PlainMonthDay.from(
      `${String(date.getMonth() + 1).padStart(2, '0')}-${String(
        date.getDate()
      ).padStart(2, '0')}`
    )
  }
  return Temporal.PlainDate.from(
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      '0'
    )}-${String(date.getDate()).padStart(2, '0')}`
  )
}
