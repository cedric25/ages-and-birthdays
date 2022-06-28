import type { Person } from '@/@types/Person'
import { useAppStore } from '@/store/app/app.store'
import * as localStorageHelper from './localStorageHelper.js'

export function getStateFromLocalStorage() {
  console.log('-> getStateFromLocalStorage')
  const importantPersonsJson = localStorageHelper.getPersons()
  const groups = localStorageHelper.getGroups()
  const appStore = useAppStore()
  if (importantPersonsJson) {
    const importantPersons = JSON.parse(importantPersonsJson)
    const persons: Person[] = []
    for (const person of importantPersons) {
      persons.push({
        ...person,
        birthday: new Date(person.birthday),
      })
    }
    appStore.setAllPersons(persons)
  }
  if (groups) {
    appStore.setAllGroups(JSON.parse(groups))
  }
}
