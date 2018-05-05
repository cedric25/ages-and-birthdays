import Vuex from 'vuex'

/**
 * Example of 'importantPersons':
 * {
 *   [
 *     id: 1,
 *     name: 'Cedric',
 *   ]
 * }
 */

const createStore = () => {
  return new Vuex.Store({
    state: {
      importantPersons: [],
      groups: ['Family', 'Friends'],
    },
    mutations: {
      addNewImportantPerson(state, newPerson) {
        state.importantPersons.push(newPerson)
      },
      updatePerson(state, updatedPerson) {
        state.importantPersons[updatedPerson.id].name = updatedPerson.name
        state.importantPersons[updatedPerson.id].birthday = updatedPerson.birthday
      },
      deletePerson(state, personToDelete) {
        state.importantPersons = state.importantPersons.filter(person => {
          return person.id !== personToDelete.id
        })
      },
      removeAllPersons(state) {
        state.importantPersons = []
      },
      addGroup(state, newGroupLabel) {
        state.groups.push(newGroupLabel)
      },
    },
    getters: {
      importantPersons(state) {
        return state.importantPersons
      },
      groups(state) {
        return state.groups
      },
    },
  })
}

export default createStore
