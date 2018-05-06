export default {

  // --- Important persons ---

  addNewImportantPerson(state, newPerson) {
    state.importantPersons.push(newPerson)
  },

  updatePerson(state, updatedPerson) {
    const personToUpdate = state.importantPersons.find(person => person.id = updatedPerson.id)
    personToUpdate.name = updatedPerson.name
    personToUpdate.birthday = updatedPerson.birthday
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

  addGroup(state, newGroupLabel) {
    state.groups.push(newGroupLabel)
  },

  deleteGroup(state, groupToDelete) {

    // Remove label from all persons having it
    state.importantPersons.forEach(person => {
      if (person.group === groupToDelete) {
        person.group = ''
      }
    })

    state.groups.splice(state.groups.indexOf(groupToDelete), 1)
  },
}
