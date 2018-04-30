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
    },
    mutations: {
      addNewImportantPerson(state, newPerson) {
        const newPersonIndex = state.importantPersons.length
        const newPersonWithId = Object.assign({}, newPerson, { id: newPersonIndex })
        state.importantPersons.push(newPersonWithId)
      },
      updatePerson(state, updatedPerson) {
        state.importantPersons[updatedPerson.id].name = updatedPerson.name
      },
      removeAllPersons(state) {
        state.importantPersons = []
      },
    },
    getters: {
      importantPersons(state) {
        return state.importantPersons
      },
    },
  })
}

export default createStore
