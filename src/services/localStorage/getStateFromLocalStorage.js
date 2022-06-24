import store from '../../store/store.js'
import * as localStorageHelper from './localStorageHelper.js'

export function getStateFromLocalStorage() {
  const importantPersons = localStorageHelper.getPersons()
  const groups = localStorageHelper.getGroups()
  if (importantPersons) {
    store.commit('setAllPersons', JSON.parse(importantPersons))
  }
  if (groups) {
    store.commit('setAllGroups', JSON.parse(groups))
  }
}
