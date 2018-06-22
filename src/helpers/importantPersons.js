import * as db from './db'
import * as localStorageHelper from './localStorageHelper'

export function setAllPersons({ state, commit }, allPersons) {
  commit('setAllPersons', allPersons)
  updateDbPersons(state, commit)
}

export function addNewPerson({ state, commit }, newPerson) {
  commit('addNewImportantPerson', newPerson)
  updateDbPersons(state, commit)
}

export function updatePerson({ state, commit }, updatedPerson) {
  commit('updatePerson', updatedPerson)
  updateDbPersons(state, commit)
}

export function deletePerson({ state, commit }, personId) {
  commit('deletePerson', personId)
  updateDbPersons(state, commit)
}

export function addGroupToPerson({ state, commit }, personId, groupToAdd) {
  commit('addGroupToPerson', {
    personId,
    groupToAdd,
  })
  updateDbPersons(state, commit)
}

export function removeGroupFromPerson({ state, commit }, personId, groupToRemove) {
  commit('removeGroupFromPerson', {
    personId,
    groupToRemove,
  })
  updateDbPersons(state, commit)
}

function updateDbPersons(state, commit) {
  if (state.user.user) {
    commit('syncingDb', true)
    db.setImportantPersons(state.user.user.id, state.app.importantPersons)
      .then(() => {
        commit('syncingDb', false)
      })
      .catch(err => {
        console.error('Sync importantPersons into Firebase', err)
        commit('syncingDb', false)
      })
  } else {
    localStorageHelper.setPersons(state.app.importantPersons)
  }
}
