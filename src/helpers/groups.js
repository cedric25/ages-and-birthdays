import * as db from './db'
import * as localStorageHelper from './localStorageHelper'

export function addGroup({ state, commit }, groupName) {
  commit('addGroup', groupName)
  updateDbGroups(state)
}

export function deleteGroup({ state, commit }, groupName) {
  commit('deleteGroup', groupName)
  updateDbGroups(state)
}

export function renameGroup({ state, commit }, oldName, newName) {
  commit('renameGroup', {
    oldName,
    newName,
  })
  updateDbGroups(state)
}

function updateDbGroups(state) {
  if (state.user.user) {
    db.setGroups(state.user.user.id, state.app.groups)
  } else {
    localStorageHelper.setGroups(state.app.groups)
  }
}
