import * as db from './db'
import * as localStorageHelper from '../services/localStorage/localStorageHelper.js'
import { useAppStore } from '@/store/app/app.store.js'
import { useUserStore } from '@/store/user/user.store.js'

export function setAllGroups(allGroups) {
  const appStore = useAppStore()
  appStore.setAllGroups(allGroups)
  updateDbGroups()
}

export function addGroup(groupName) {
  const appStore = useAppStore()
  appStore.addGroup(groupName)
  updateDbGroups()
}

export function deleteGroup(groupName) {
  const appStore = useAppStore()
  appStore.deleteGroup(groupName)
  updateDbGroups()
}

export function renameGroup(oldName, newName) {
  const appStore = useAppStore()
  appStore.renameGroup({
    oldName,
    newName,
  })
  updateDbGroups()
}

function updateDbGroups() {
  const userStore = useUserStore()
  const appStore = useAppStore()
  if (userStore.user) {
    appStore.syncingDb(true)
    db.setGroups(userStore.user.id, appStore.groups)
      .then(() => {
        appStore.setSyncingDb(false)
      })
      .catch(err => {
        console.error('Sync groups into Firebase', err)
        appStore.setSyncingDb(false)
      })
  } else {
    localStorageHelper.setGroups(appStore.groups)
  }
}
