import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      importantPersons: []
    },
    mutations: {
      addNewImportantPerson(state, newPerson) {
        state.importantPersons.push(newPerson)
      }
    },
    getters: {
      importantPersons(state) {
        return state.importantPersons
      }
    }
  })
}

export default createStore
