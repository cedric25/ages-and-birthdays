import Vue from 'vue'

import { importFromGoogleMutations } from './importFromGoogleMutations'

export const mutations = {
  ...importFromGoogleMutations,

  // ------------------------- IMPORTANT PERSONS -------------------------

  setAllPersons(state, allPersons) {
    state.importantPersons = allPersons
  },

  addNewImportantPerson(state, newPerson) {
    state.importantPersons.push(newPerson)
  },

  updatePerson(state, newInfo) {
    state.importantPersons.forEach((person, index) => {
      if (person.id === newInfo.id) {
        const updatedPerson = Object.assign(
          {},
          person,
          { name: newInfo.name },
          { birthday: newInfo.birthday }
        )
        Vue.set(state.importantPersons, index, updatedPerson)
      }
    })
  },

  addGroupToPerson(state, { personId, groupToAdd }) {
    const personToUpdate = state.importantPersons.find(person => person.id === personId)

    let newGroupsList = (personToUpdate.groups || []).concat([groupToAdd])

    const updatedPerson = Object.assign({}, personToUpdate, { groups: newGroupsList })

    let newPersonsList = state.importantPersons.filter(person => {
      return person.id !== personId
    })
    newPersonsList.push(updatedPerson)

    state.importantPersons = newPersonsList
  },

  removeGroupFromPerson(state, { personId, groupToRemove }) {
    const personToUpdate = state.importantPersons.find(person => person.id === personId)
    personToUpdate.groups = personToUpdate.groups.filter(group => group !== groupToRemove)
  },

  deletePerson(state, personId) {
    state.importantPersons = state.importantPersons.filter(person => {
      return person.id !== personId
    })
  },

  removeAllPersons(state) {
    state.importantPersons = []
  },

  // ------------------------- GROUPS -------------------------

  setAllGroups(state, allGroups) {
    state.groups = allGroups
  },

  addGroup(state, newGroupLabel) {
    const groups = state.groups
    groups.push(newGroupLabel)
    const sortedGroups = groups.sort((groupOne, groupTwo) => {
      return groupOne.toLowerCase().localeCompare(groupTwo.toLowerCase())
    })
    state.groups = sortedGroups
  },

  deleteGroup(state, groupToDelete) {
    // Remove group from all persons having it
    state.importantPersons.forEach(person => {
      if (person.groups && person.groups.includes(groupToDelete)) {
        person.groups = person.groups.filter(group => group !== groupToDelete)
      }
    })

    state.groups.splice(state.groups.indexOf(groupToDelete), 1)
  },

  renameGroup(state, { oldName, newName }) {
    const currentGroups = state.groups
    currentGroups.splice(currentGroups.indexOf(oldName), 1)
    currentGroups.push(newName)
    state.groups = currentGroups

    state.importantPersons.forEach(person => {
      if (person.groups && person.groups.includes(oldName)) {
        person.groups = person.groups.map(group => {
          if (group === oldName) {
            return newName
          }
          return group
        })
      }
    })
  },

  // ------------------------- MISC -------------------------

  syncingDb(state, isSyncing) {
    state.isSyncingDb = isSyncing
  },
}
