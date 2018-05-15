export default {

  // --- Important persons ---

  setBirthdays(state, allBirthdays) {
    state.importantPersons = allBirthdays
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

  deletePerson(state, personToDelete) {
    state.importantPersons = state.importantPersons.filter(person => {
      return person.id !== personToDelete.id
    })
  },

  removeAllPersons(state) {
    state.importantPersons = []
  },

  // --- Groups ---

  setGroups(state, allGroups) {
    state.groups = allGroups
  },

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
