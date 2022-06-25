import * as db from './db'
import * as localStorageHelper from '@/services/localStorage/localStorageHelper.js'
import { useAppStore } from '@/store/app/app.store.js'
import { useUserStore } from '@/store/user/user.store.js'

export function setAllPersons(allPersons) {
  const appStore = useAppStore()
  appStore.setAllPersons(allPersons)
  updateDbPersons()
}

export function addNewPerson(newPerson) {
  const appStore = useAppStore()
  appStore.addNewImportantPerson(newPerson)
  updateDbPersons()
}

export function updatePerson(updatedPerson) {
  const appStore = useAppStore()
  appStore.updatePerson(updatedPerson)
  updateDbPersons()
}

export function deletePerson(personId) {
  const appStore = useAppStore()
  appStore.deletePerson(personId)
  updateDbPersons()
}

export function addGroupToPerson(personId, groupToAdd) {
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

export function removeGroupFromPerson(personId, groupToRemove) {
  const appStore = useAppStore()
  appStore.removeGroupFromPerson({
    personId,
    groupToRemove,
  })
  updateDbPersons()
}

function updateDbPersons() {
  const userStore = useUserStore()
  const appStore = useAppStore()
  if (userStore.user) {
    appStore.syncingDb(true)
    db.setImportantPersons(userStore.user.id, appStore.importantPersons)
      .then(() => {
        appStore.syncingDb(false)
      })
      .catch(err => {
        console.error('Sync importantPersons into Firebase', err)
        appStore.syncingDb(false)
      })
  } else {
    localStorageHelper.setPersons(appStore.importantPersons)
  }
}
