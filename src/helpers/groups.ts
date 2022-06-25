import type { Group } from '@/@types/Group'
import * as db from './db.js'
import * as localStorageHelper from '../services/localStorage/localStorageHelper.js'
import { useAppStore } from '@/store/app/app.store'
import { useUserStore } from '@/store/user/user.store'

export function setAllGroups(allGroups: Group[]) {
  const appStore = useAppStore()
  appStore.setAllGroups(allGroups)
  updateDbGroups()
}

export function addGroup(groupName: string) {
  const appStore = useAppStore()
  appStore.addGroup(groupName)
  updateDbGroups()
}

export function deleteGroup(groupName: string) {
  const appStore = useAppStore()
  appStore.deleteGroup(groupName)
  updateDbGroups()
}

export function renameGroup(oldName: string, newName: string) {
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
    appStore.setSyncingDb(true)
    db.setGroups(userStore.user.id, appStore.groups)
      .then(() => {
        appStore.setSyncingDb(false)
      })
      .catch((err: any) => {
        console.error('Sync groups into Firebase', err)
        appStore.setSyncingDb(false)
      })
  } else {
    localStorageHelper.setGroups(appStore.groups)
  }
}
