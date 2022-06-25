import { useAppStore } from '@/store/app/app.store.ts'
import * as localStorageHelper from './localStorageHelper.js'

export function getStateFromLocalStorage() {
  const importantPersons = localStorageHelper.getPersons()
  const groups = localStorageHelper.getGroups()
  const appStore = useAppStore()
  if (importantPersons) {
    appStore.setAllPersons(JSON.parse(importantPersons))
  }
  if (groups) {
    appStore.setAllGroups(JSON.parse(groups))
  }
}
