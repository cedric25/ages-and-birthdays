import type { Person } from '@/@types/Person'
import * as db from './db'
import * as localStorageHelper from '@/services/localStorage/localStorageHelper.js'
import { useAppStore } from '@/store/app/app.store'
import { useUserStore } from '@/store/user/user.store'

export async function addNewPerson({
  personId,
  personInfo,
}: {
  personId: string
  personInfo: Person
}) {
  const appStore = useAppStore()
  // 1- pinia store
  appStore.addNewImportantPerson(personInfo)
  const userStore = useUserStore()
  if (userStore.user) {
    appStore.setSyncingDb(true)
    // 2-a) Firebase
    await db.setNewImportantPerson(userStore.user.id, personId, personInfo)
    appStore.setSyncingDb(false)
    return
  }
  // 2-b) localStorage
  updateLocalStorageDb()
}

export async function updatePerson(personId: string, personToUpdate: Person) {
  const appStore = useAppStore()
  // 1- pinia store
  appStore.updatePerson(personId, personToUpdate)
  const userStore = useUserStore()
  if (userStore.user) {
    appStore.setSyncingDb(true)
    // 2-a) Firebase
    await db.setNewImportantPerson(userStore.user.id, personId, personToUpdate)
    appStore.setSyncingDb(false)
    return
  }
  // 2-b) localStorage
  updateLocalStorageDb()
}

export async function deletePerson(personId: string) {
  const appStore = useAppStore()
  // 1- pinia store
  appStore.deletePerson(personId)
  const userStore = useUserStore()
  if (userStore.user) {
    appStore.setSyncingDb(true)
    // 2-a) Firebase
    await db.setNewImportantPerson(userStore.user.id, personId, null)
    appStore.setSyncingDb(false)
    return
  }
  // 2-b) localStorage
  updateLocalStorageDb()
}

export async function addGroupToPerson(personId: string, groupToAdd: string) {
  const appStore = useAppStore()
  // 1- pinia store
  const updatedPerson = appStore.addGroupToPerson({
    personId,
    groupToAdd,
  })
  if (!updatedPerson) {
    return
  }
  const userStore = useUserStore()
  if (userStore.user) {
    appStore.setSyncingDb(true)
    // 2-a) Firebase
    await db.setNewImportantPerson(userStore.user.id, personId, updatedPerson)
    appStore.setSyncingDb(false)
    return
  }
  // 2-b) localStorage
  updateLocalStorageDb()
}

export async function removeGroupFromPerson(
  personId: string,
  groupToRemove: string
) {
  const appStore = useAppStore()
  // 1- pinia store
  const updatedPerson = appStore.removeGroupFromPerson({
    personId,
    groupToRemove,
  })
  if (!updatedPerson) {
    return
  }
  const userStore = useUserStore()
  if (userStore.user) {
    appStore.setSyncingDb(true)
    // 2-a) Firebase
    await db.setNewImportantPerson(userStore.user.id, personId, updatedPerson)
    appStore.setSyncingDb(false)
    return
  }
  // 2-b) localStorage
  updateLocalStorageDb()
}

function updateLocalStorageDb() {
  const appStore = useAppStore()
  localStorageHelper.setPersons(appStore.importantPersons)
}

/**
 * ----- ADMIN -----
 */

// Import from JSON
export function setAllDbPersons(allPersons: Person[]) {
  const appStore = useAppStore()
  appStore.setAllPersons(allPersons)
  updateDbPersons()
}

// Clear all list
export function removeAllPersons() {
  const appStore = useAppStore()
  appStore.removeAllPersons()
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
    updateLocalStorageDb()
  }
}
