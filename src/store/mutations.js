export default {

  // --- Important persons ---

  setAllPersons(state, allPersons) {
    state.importantPersons = allPersons
  },

  addNewImportantPerson(state, newPerson) {
    state.importantPersons.push(newPerson)
  },

  updatePerson(state, newInfo) {

    const personToUpdate = state.importantPersons.find(person => person.id === newInfo.id)

    const updatedPerson = Object.assign({}, personToUpdate,
      { name: newInfo.name },
      { birthday: newInfo.birthday }
    )

    let newPersonsList = state.importantPersons.filter(person => {
      return person.id !== newInfo.id
    })
    newPersonsList.push(updatedPerson)

    state.importantPersons = newPersonsList
  },

  addGroupToPerson(state, { personId, groupToAdd }) {

    const personToUpdate = state.importantPersons.find(person => person.id === personId)

    let newGroupsList = (personToUpdate.groups || []).concat([groupToAdd])

    const updatedPerson = Object.assign({}, personToUpdate,
      { groups: newGroupsList },
    )

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

  deletePerson(state, personToDelete) {
    state.importantPersons = state.importantPersons.filter(person => {
      return person.id !== personToDelete.id
    })
  },

  removeAllPersons(state) {
    state.importantPersons = []
  },

  // --- Groups ---

  setAllGroups(state, allGroups) {
    state.groups = allGroups
  },

  addGroup(state, newGroupLabel) {
    state.groups.push(newGroupLabel)
  },

  deleteGroup(state, groupToDelete) {

    // Remove label from all persons having it
    state.importantPersons.forEach(person => {
      if (person.groups && person.groups.includes(groupToDelete)) {
        person.groups = person.groups.filter(group => group !== groupToDelete)
      }
    })

    state.groups.splice(state.groups.indexOf(groupToDelete), 1)
  },
}
