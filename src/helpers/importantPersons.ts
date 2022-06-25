import type { Person } from '@/@types/Person'
import * as db from './db'
import * as localStorageHelper from '@/services/localStorage/localStorageHelper.js'
import { useAppStore } from '@/store/app/app.store'
import { useUserStore } from '@/store/user/user.store'

export function setAllPersons(allPersons: Person[]) {
  const appStore = useAppStore()
  appStore.setAllPersons(allPersons)
  updateDbPersons()
}

export function addNewPerson(newPerson: Person) {
  const appStore = useAppStore()
  appStore.addNewImportantPerson(newPerson)
  updateDbPersons()
}

export function updatePerson(updatedPerson: Person) {
  const appStore = useAppStore()
  appStore.updatePerson(updatedPerson)
  updateDbPersons()
}

export function deletePerson(personId: string) {
  const appStore = useAppStore()
  appStore.deletePerson(personId)
  updateDbPersons()
}

export function addGroupToPerson(personId: string, groupToAdd: string) {
  const appStore = useAppStore()
  appStore.addGroupToPerson({
    personId,
    groupToAdd,
  })
  updateDbPersons()
}

export function removeAllPersons() {
  const appStore = useAppStore()
  appStore.removeAllPersons()
  updateDbPersons()
}

export function removeGroupFromPerson(personId: string, groupToRemove: string) {
  const appStore = useAppStore()
  appStore.removeGroupFromPerson({
    personId,
    groupToRemove,
  })
  updateDbPersons()
}

async function updateDbPersons() {
  const userStore = useUserStore()
  const appStore = useAppStore()
  if (userStore.user) {
    appStore.setSyncingDb(true)
    try {
      await db.setImportantPersons(userStore.user.id, appStore.importantPersons)
      appStore.setSyncingDb(false)
    } catch (err) {
      console.error('Sync importantPersons into Firebase', err)
      appStore.setSyncingDb(false)
    }
  } else {
    localStorageHelper.setPersons(appStore.importantPersons)
  }
}
