import Vuex from 'vuex'

/**
 * Example of 'importantPersons':
 * {
 *   1: {
 *     id: 1,
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
        const newPersonIndex = Object.keys(state.importantPersons).length
        const newPersonWithId = Object.assign({}, newPerson, { id: newPersonIndex })
        state.importantPersons = { ...state.importantPersons, [newPersonIndex]: newPersonWithId }
      },
      updatePerson(state, updatedPerson) {
        const nwPersonsList = { ...state.importantPersons }
        nwPersonsList[updatedPerson.id].name = updatedPerson.name
        // state.importantPersons[updatedPerson.id].name = updatedPerson.name
        // Vue.set(state.importantPersons[0], 'name', updatedPerson.name)
        state.importantPersons = nwPersonsList
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
