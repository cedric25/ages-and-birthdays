import * as db from './db'

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
  db.setGroups(state.user.user.id, state.app.groups)
}
