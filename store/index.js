import Vuex from 'vuex'

/**
 * Example of 'importantPersons':
 * {
 *   1: {
 *     name: 'Cedric',
 *   }
 * }
 */

const createStore = () => {
  return new Vuex.Store({
    state: {
      importantPersons: {},
    },
    mutations: {
      addNewImportantPerson(state, newPerson) {
        state.importantPersons.push(newPerson)
      },
      removeAllPersons(state) {
        state.importantPersons = {}
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
