import * as db from './db'
import * as localStorageHelper from './localStorageHelper'

export function addNewPerson({ state, commit }, newPerson) {
  commit('addNewImportantPerson', newPerson)
  updateDbPersons(state)
}

export function updatePerson({ state, commit }, updatedPerson) {
  commit('updatePerson', updatedPerson)
  updateDbPersons(state)
}

export function deletePerson({ state, commit }, personId) {
  commit('deletePerson', personId)
  updateDbPersons(state)
}

export function addGroupToPerson({ state, commit }, personId, groupToAdd) {
  commit('addGroupToPerson', {
    personId,
    groupToAdd,
  })
  updateDbPersons(state)
}

export function removeGroupFromPerson({ state, commit }, personId, groupToRemove) {
  commit('removeGroupFromPerson', {
    personId,
    groupToRemove,
  })
  updateDbPersons(state)
}

function updateDbPersons(state) {
  if (state.user.user) {
    db.setImportantPersons(state.user.user.id, state.app.importantPersons)
  } else {
    localStorageHelper.setPersons(state.app.importantPersons)
  }
}
