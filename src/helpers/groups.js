import * as db from './db'
import * as localStorageHelper from '../services/localStorage/localStorageHelper.js'

export function setAllGroups({ state, commit }, allGroups) {
  commit('setAllGroups', allGroups)
  updateDbGroups(state, commit)
}

export function addGroup({ state, commit }, groupName) {
  commit('addGroup', groupName)
  updateDbGroups(state, commit)
}

export function deleteGroup({ state, commit }, groupName) {
  commit('deleteGroup', groupName)
  updateDbGroups(state, commit)
}

export function renameGroup({ state, commit }, oldName, newName) {
  commit('renameGroup', {
    oldName,
    newName,
  })
  updateDbGroups(state, commit)
}

function updateDbGroups(state, commit) {
  if (state.user.user) {
    commit('syncingDb', true)
    db.setGroups(state.user.user.id, state.app.groups)
      .then(() => {
        commit('syncingDb', false)
      })
      .catch(err => {
        console.error('Sync groups into Firebase', err)
        commit('syncingDb', false)
      })
  } else {
    localStorageHelper.setGroups(state.app.groups)
  }
}
